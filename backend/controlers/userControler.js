import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import {v2 as cloudinary} from 'cloudinary'
import doctorModel from '../models/doctorModel.js'
import appointementModel from '../models/appointementModel.js'
// API to register user 
const registerUser = async (req, res) => {
    try {
        const {name, email, password, phoneNumber} = req.body

        if(!name || !email || !password){
            return res.json({success:false, message:'Missinf details'})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false, message:'Enter Valid Email'})
        }
        if (password.length < 4) {
            return res.json({success:false, message:'Enter a Strong password'})
        }
        if(!validator.isMobilePhone(phoneNumber, "ar-MA")){
            return res.json({success:false, message:'Enter a valid Moroccan phone number'})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const userData = {
            name, 
            email, 
            password:hashedPassword,
            phoneNumber,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({id:user._id }, process.env.JWT_SECRET)
        res.json({success:true,token})

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// API for user Login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const user = await userModel.findOne({email})

        if(!user) {
            return res.json({success:false,message:error.message})
        } 
        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch) {
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)
            res.json({success:true,token})
        } else {
            res.json({success:false,message:'Invalid credencials'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:'User does not exist'})
    }
}

// API to get user profile Data
const getProfile = async (req, res) => { 
    try { 
        const {userId} = req.user   // <- changed from req.body
        const userData = await userModel.findById(userId).select('-password') 
        res.json({success:true, userData}) 
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    } 
}

// API to UPDATE user profile
const updateProfile = async (req, res) => {
    const  { name, phoneNumber, address, dob, gender } = req.body
    const userId = req.user.userId
    
    const imageFile = req.file

    if (!name || !phoneNumber|| !address || !dob || !gender) {
        return res.json({success:false, message:'Data Missing'})
    }
    if (!name || !phoneNumber|| !address || !dob || !gender || gender === "Not Selected") {
        return res.json({success:false, message:'Please select a valid gender'})
     }

    await userModel.findByIdAndUpdate(userId, {name,phoneNumber,address: JSON.parse(address),dob,gender})

    if(imageFile) {
        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:'image'})
        const imageURL = imageUpload.secure_url

        await userModel.findByIdAndUpdate(userId, {image:imageURL})
    }
    res.json({success:true, message:'Profile updated'})
}

//API to BOOK Appointement 
const bookAppointement = async (req, res) => {
    try {
        const { docId, slotDate, slotTime, } = req.body
        const userId = req.user.userId;
        const docData = await doctorModel.findById(docId).select('-password')
        // Check if doctor is availlable
        if(!docData.available){
            return res.json({success:false, message:'doctor not available'})
        }

        let slots_booked = docData.slots_booked
        // Check for slots availability
        if(slots_booked[slotDate]){
            if(slots_booked[slotDate].includes(slotTime)){
                return res.json({success:false, message:'Slot not available'})
            } else {
                slots_booked[slotDate].push(slotTime)
            }
        } else {
            slots_booked[slotDate] = []
            slots_booked[slotDate].push(slotTime)
        }

        const userData = await userModel.findById(userId).select('-password')
        delete docData.slots_booked
        let appointementData = {
            userId,
            docId,
            userData,
            docData,
            amount:docData.fees,
            slotTime,
            slotDate,
            date: Date.now()
        }
        const newAppointement = new appointementModel(appointementData)
        await newAppointement.save()

        // Save new slots Data in docData
        await doctorModel.findByIdAndUpdate(docId,{slots_booked})

        res.json({success:true, message:'appointement booked'})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
    }
}

// API to get user appointement for frontend my-appointement page
const listAppointement = async (req, res) => {
    try {
        const userId = req.user.userId;
        const appointements = await appointementModel.find({ userId }); // filter object
        res.json({ success: true, appointements });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to cancel Appointement 
const cancelAppointement = async (req, res) => {
    try{
        const {appointementId} = req.body
        const userId = req.user.userId;
        const appointementData = await appointementModel.findById(appointementId)

        // Verify appointement User 
        if(appointementData.userId !== userId){
            return res.json({success:false, message:'Unauthorized Action'})
        } 
        await appointementModel.findByIdAndUpdate(appointementId,{cancelled:true})

        // releasing doctor slot
        const {docId, slotDate, slotTime} = appointementData

        const doctorData = await doctorModel.findById(docId)
        let slots_booked = doctorData.slots_booked
        slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime)
        await doctorModel.findByIdAndUpdate(docId, {slots_booked})
        res.json({success:true, message:'appointment cancelled'})
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {registerUser, loginUser, getProfile, updateProfile, bookAppointement, listAppointement, cancelAppointement}