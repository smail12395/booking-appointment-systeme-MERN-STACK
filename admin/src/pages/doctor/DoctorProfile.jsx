import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const {dToken, profileData, setProfileData, getProfileData, backendUrl} = useContext(DoctorContext)
  const {currency} = useContext(AppContext)
  const [isEdit,setIsEdit] = useState(false)
  const updateProfile = async () => {
    try{
      const updateData = {
        address:profileData.address,
        fees:profileData.fees,
        available:profileData.available,
      }
      const {data} = await axios.post(backendUrl + '/api/doctor/update-profile',updateData,{headers:{dToken}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch(error){
      toast.error(error.message)
      console.log(error)
    }
  }
  useEffect(()=>{
    if(dToken){
      getProfileData()
    }
  },[dToken])
   return profileData && (
    <div>
      
<div className="flex flex-col lg:flex-row gap-6 m-5">
  {/* Doctor Image */}
  <div className="flex justify-center lg:justify-start">
   <img
     className="bg-primary/80 w-40 h-40 sm:w-52 sm:h-52 lg:w-56 lg:h-56 rounded-2xl shadow-md object-cover mx-auto lg:mx-0"
     src={profileData.image}
     alt=""
   />
  </div>

  {/* Doctor Info */}
  <div className="flex-1 border border-stone-200 rounded-2xl p-6 sm:p-8 bg-white shadow-sm">
    {/* Doctor Data name, Degree, Experience */}
    <p className="flex items-center gap-2 text-2xl sm:text-3xl font-semibold text-gray-800">
      {profileData.name}
    </p>

    <div className="flex flex-wrap items-center gap-2 mt-2 text-gray-600">
      <p className="text-sm sm:text-base font-medium">{profileData.degree}</p>
      <span className="text-gray-400">•</span>
      <p className="text-sm sm:text-base">{profileData.speciality}</p>
      <button className="ml-auto text-xs sm:text-sm px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
        {profileData.experience}
      </button>
    </div>

    {/* About */}
    <div className="mt-4">
      <p className="text-sm sm:text-base font-semibold text-gray-700">About:</p>
      <p className="text-sm sm:text-base text-gray-600">{profileData.about}</p>
    </div>

    {/* Fees */}
    <p className="mt-4 text-sm sm:text-base font-medium text-gray-700">
      Appointment fees:{" "}
      <span className="text-primary font-semibold">
        {isEdit? <input type="number" value={profileData.fees} onChange={(e)=>{setProfileData(prev => ({...prev, fees:e.target.value}))}} /> :profileData.fees} {currency}
      </span>
    </p>

    {/* Address */}
    <div className="mt-4">
      <p className="text-sm sm:text-base font-semibold text-gray-700">Address:</p>
      <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
        {isEdit? <input type="text" onChange={(e)=>{setProfileData(prev => ({...prev,address:{...prev.address,line1:e.target.value}}))}} value={profileData.address.line1} /> :profileData.address.line1}
        <br />
        {isEdit? <input type="text" onChange={(e)=>{setProfileData(prev => ({...prev,address:{...prev.address,line2:e.target.value}}))}} value={profileData.address.line2} /> :profileData.address.line2}
      </p>
    </div>

    {/* Availability */}
    <div className="mt-4 flex items-center gap-2">
      <input
        onChange={()=>{isEdit && setProfileData(prev => ({...prev,available: !prev.available }))} }
        checked={profileData.available}
        type="checkbox"
        id="available"
        className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
      />
      <label htmlFor="available" className="text-sm sm:text-base text-gray-700">
        Available
      </label>
    </div>

    {/* Edit Button */}
    {
      isEdit
       ? <button onClick={updateProfile} className="mt-6 w-full sm:w-auto px-5 py-2 text-sm sm:text-base bg-primary text-white rounded-xl shadow hover:bg-primary/90 transition">
          Save
        </button>
       : <button onClick={()=>{setIsEdit(true)}} className="mt-6 w-full sm:w-auto px-5 py-2 text-sm sm:text-base bg-primary text-white rounded-xl shadow hover:bg-primary/90 transition">
           Edit
         </button>
    }

  </div>
</div>


    </div>
  )
}

export default DoctorProfile