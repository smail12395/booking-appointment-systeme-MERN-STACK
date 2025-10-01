import doctorModel from "../models/doctorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointementModel from "../models/appointementModel.js";
import userModel from "../models/userModel.js";

const changeAvailability = async (req, res) => {
    try {
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({success:true, message:'Availability chenged'})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

const doctorList = async (req, res)=>{
    try {
        const doctors = await doctorModel.find({}, { password: 0, email: 0 });
        res.json({success:true, doctors})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//API for doctor Login
const loginDoctor = async (req,res) => {
    try {
        const {email, password} = req.body
        const doctor = await doctorModel.findOne({email})

        if(!doctor){
            return res.json({success:false,message:'email or password false'})
        }

        const isMatch = await bcrypt.compare(password, doctor.password)
        if(isMatch) {
            const token = jwt.sign({id:doctor._id}, process.env.JWT_SECRET)
            res.json({success:true, token})
        } else {
            res.json({success:false,message:'email or password false'})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//API to get doctor appointements for doctor panel
const appointementsDoctor = async (req, res) => {
    try {
        const docId = req.doctor.docId
        const appointements = await appointementModel.find({docId})
        res.json({success:true, appointements})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// API to mark appointement complete for doctor panel 
const appointementComplete = async (req, res) => {
    try {
        const docId = req.doctor.docId;
        const { appointementId } = req.body;
        const appointementData = await appointementModel.findById(appointementId);

        if (appointementData && appointementData.docId === docId) {
            await appointementModel.findByIdAndUpdate(appointementId, { isCompleted: true });
            return res.json({ success: true, message: 'Appointment completed' });
        } else {
            return res.json({ success: false, message: 'Mark failed' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


// Cancel appointment API with slot freeing and auto-cleanup
const appointementCancel = async (req, res) => {
    try {
        const docId = req.doctor.docId;
        const { appointementId } = req.body;
        const appointementData = await appointementModel.findById(appointementId);

        if (appointementData && appointementData.docId === docId) {
            // Mark appointment cancelled
            await appointementModel.findByIdAndUpdate(appointementId, { cancelled: true });

            const slotDate = appointementData.slotDate;
            const slotTime = appointementData.slotTime;

            // Step 1: remove the slot from that date
            await doctorModel.updateOne(
                { _id: docId },
                { $pull: { [`slots_booked.${slotDate}`]: slotTime } }
            );

            // Step 2: cleanup if array is empty
            const doctor = await doctorModel.findById(docId);
            if (doctor.slots_booked[slotDate] && doctor.slots_booked[slotDate].length === 0) {
                await doctorModel.updateOne(
                    { _id: docId },
                    { $unset: { [`slots_booked.${slotDate}`]: "" } }
                );
            }

            return res.json({ success: true, message: 'Appointment cancelled & slot freed' });
        } else {
            return res.json({ success: false, message: 'cancellation failed' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};


//API to get dashboard data to doctor panel
const doctorDashboard = async (req,res) => {
    try {
        const docId = req.doctor.docId
        const appointements = await appointementModel.find({docId})
        let earning = 0
        appointements.map((item,index)=>{
            if(item.isCompleted){
                earning+=item.amount
            }
        })
        let patients = []
        appointements.map((item,index)=>{
            if(!patients.includes(item.userId)){
                patients.push(item.userId)
            }
        })
        const dashData = {
            earning,
            appointements: appointements.length,
            patients: patients.length,
            latestAppointements: appointements.reverse().slice(0,5)
        }
        res.json({success:true, dashData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//API to get doctor profile for doctor panel
const doctorProfile = async (req,res) => {
    try {
        const docId = req.doctor.docId
        const profileData = await doctorModel.findById(docId).select('-password')
        res.json({success:true,profileData})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//API to Update doctor profile data for admin panel
const updateDoctorProfile = async (req,res) => {
    try {
        const docId = req.doctor.docId
        const {fees, address, available} = req.body
        await doctorModel.findByIdAndUpdate(docId,{fees,address,available})
        res.json({success:true, message:'Profile updated'})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

// API to report user
const reportUser = async (req, res) => {
  try {
    const docId = req.doctor.docId;
    const { appointementId } = req.body;

    // get appointment data
    const appointementData = await appointementModel.findById(appointementId);
    if (!appointementData || appointementData.docId !== docId) {
      return res.json({ success: false, message: "Invalid appointment" });
    }

    const userId = appointementData.userId;
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    // increment report count
    userData.isReported = (userData.isReported || 0) + 1;
    await userData.save();

    return res.json({ success: true, message: "User reported successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { reportUser };


export {changeAvailability, 
        doctorList, 
        loginDoctor, 
        appointementsDoctor, 
        appointementCancel, 
        appointementComplete,
        doctorDashboard,
        doctorProfile,
        updateDoctorProfile
    }