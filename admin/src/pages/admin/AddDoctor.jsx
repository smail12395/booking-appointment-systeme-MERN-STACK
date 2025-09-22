import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'

const AddDoctor = () => {
    const [docImg,setDocImg] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [experience,setExperience] = useState('1 Year')
    const [fees,setFees] = useState('')
    const [about,setAbout] = useState('')
    const [Speciality,setSpeciality] = useState('General Physycien')
    const [degree,setDegree] = useState('')
    const [address1,setAddress1] = useState('')
    const [address2,setAddress2] = useState('')

    const {backendUrl, aToken} = useContext(AdminContext)

    const onSubmitHandler = async (event) => {
        event.preventDefault()
        try {
            if (!docImg) {
                return toast.error('image not selected')
            }
            const formData = new FormData()
            formData.append('image', docImg)
            formData.append('name', name)
            formData.append('email',email)
            formData.append('password', password)
            formData.append('experience', experience)
            formData.append('fees', Number(fees))
            formData.append('about', about)
            formData.append('speciality', Speciality)
            formData.append('degree', degree)
            formData.append('address', JSON.stringify({line1:address1, line2:address2}))

            // Log DATA
            formData.forEach((value,key)=>{
                console.log(`${key} : ${value}`);
                
            })

            const {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData, {headers:{aToken}})

            if (data.success) {
                toast.success(data.message)
                setDocImg(false)
                setName('')
                setPassword('')
                setSpeciality('')
                setFees('')
                setExperience('')
                setEmail('')
                setDegree('')
                setAddress2('')
                setAddress1('')
                setAbout('')
            } else{
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
        }
    }



    return (
<form onSubmit={onSubmitHandler} className="bg-white p-6 rounded-xl shadow-lg max-w-6xl mx-auto w-full">
    <p className="text-2xl font-semibold text-gray-800 mb-6">Add Doctor</p>

    <div className="flex flex-col lg:flex-row gap-6 overflow-y-scroll max-h-[80vh]">
        {/* Left side: Upload image */}
        <div className="flex flex-col items-center gap-3 lg:w-1/3 border-dashed border-2 border-gray-300 p-4 rounded-lg">
            <label htmlFor="doc-img" className="cursor-pointer">
                <img  src={docImg ? URL.createObjectURL(docImg) :assets.upload_area} alt="" className="w-32 h-32 object-contain rounded-full" />
            </label>
            <input onChange={(e)=>setDocImg(e.target.files[0])} type="file" id='doc-img' hidden />
            <p className="text-center text-gray-600 text-sm">Upload doctor <br />picture</p>
        </div>

        {/* Right side: Doctor info */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                <div className="mb-3">
                    <p className="text-gray-700 font-medium">Doctor Name</p>
                    <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name' required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div className="mb-3">
                    <p className="text-gray-700 font-medium">Doctor Email</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder='Email' required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div className="mb-3">
                    <p className="text-gray-700 font-medium">Doctor Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder='Password' required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div className="mb-3">
                    <p className="text-gray-700 font-medium">Doctor Experience</p>
                    <select onChange={(e)=>setExperience(e.target.value)} value={experience} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none">
                        <option value="1 year">1 year</option>
                        <option value="2 year">2 year</option>
                        <option value="3 year">3 year</option>
                        <option value="4 year">4 year</option>
                        <option value="5 year">5 year</option>
                        <option value="6 year">6 year</option>
                        <option value="7 year">7 year</option>
                        <option value="8 year">8 year</option>
                        <option value="9 year">9 year</option>
                        <option value="10 year">10 year</option>
                    </select>
                </div>
                <div className="mb-3">
                    <p className="text-gray-700 font-medium">Fees</p>
                    <input onChange={(e)=>setFees(e.target.value)} value={fees} type="number" placeholder='fees' required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>           
            </div>

            <div>
                <div className="mb-3">
                    <p className="text-gray-700 font-medium">Speciality</p>
                    <select onChange={(e)=>setSpeciality(e.target.value)} value={Speciality} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none">
                        <option value="General Physycien">General Physycien</option>
                        <option value="General Physycien">General Physycien</option>
                        <option value="General Physycien">General Physycien</option>
                        <option value="General Physycien">General Physycien</option>
                        <option value="General Physycien">General Physycien</option>
                        <option value="General Physycien">General Physycien</option>
                    </select>
                </div>
                <div className="mb-3">
                    <p className="text-gray-700 font-medium">Education</p>
                    <input onChange={(e)=>setDegree(e.target.value)} value={degree} type="text" placeholder='Education' required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div className="mb-3">
                    <p className="text-gray-700 font-medium">Address</p>
                    <input onChange={(e)=>setAddress1(e.target.value)} value={address1} type="text" placeholder='Address 1' required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none mb-2" />
                    <input onChange={(e)=>setAddress2(e.target.value)} value={address2} type="text" placeholder='Address 2' required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>
                <div className="mb-3">
                    <p className="text-gray-700 font-medium">About Doctor</p>
                    <textarea onChange={(e)=>setAbout(e.target.value)} value={about} rows={5} placeholder='Write about doctor' required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none" />
                </div>

                <button type='submit' className="bg-primary text-white px-4 py-2 rounded-md font-medium shadow hover:opacity-90 transition w-full mt-2">
                    Add Doctor
                </button>
            </div>
        </div>
    </div>
</form>

    )
}

export default AddDoctor