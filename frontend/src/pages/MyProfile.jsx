import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import {assets} from '../assets/assets'
import { toast } from 'react-toastify'
import axios from 'axios'
const MyProfile = () => {
  const {userData, setUserData, token, backendUrl, loadUserProfileData} = useContext(AppContext)
  
  const [isEdit, setIsEdit] = useState(false)
  const [image, setImage] = useState(false)
  const updateUserProfileData = async () => {
    try {
      const formData = new FormData()
      formData.append('name', userData.name)
      formData.append('phoneNumber', userData.phoneNumber)
      formData.append('address', JSON.stringify(userData.address))
      formData.append('gender', userData.gender)
      formData.append('dob', userData.dob)
      image && formData.append('image', image)

      const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {headers:{token}})
      if(data.success){
        toast.success(data.message)
        await loadUserProfileData()
        setIsEdit(false)
        setImage(false)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  return userData && (
<div className="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6 transition duration-300 hover:shadow-2xl">
  {
    isEdit
    ? <label htmlFor="image">
      <div className='inline-block relative cursor-pointer '>
        <img className='w-36 rounded opacity-75 ' src={image? URL.createObjectURL(image) : userData.image} alt="" />
        <img className='w-10 absolute bottom-12 right-12' src={image? '' : assets.upload_icon} alt="" />
        <input onChange={(e)=>{setImage(e.target.files[0])}} type="file" id="image" hidden/>
      </div>
    </label>
    : <img
        src={userData.image}
        alt=""
        className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-primary shadow-md"
      />
  }
  

  {isEdit ? (
    <input
      type="text"
      value={userData.name}
      onChange={e =>
        setUserData(prev => ({ ...prev, name: e.target.value }))
      }
      className="w-full text-xl font-semibold text-center border-b-2 border-gray-300 focus:border-primary outline-none"
    />
  ) : (
    <p className="text-xl font-bold text-center text-gray-800">{userData.name}</p>
  )}

  <hr className="border-gray-200" />

  {/* Contact Info */}
  <div className="space-y-4">
    <p className="text-lg font-semibold text-primary">CONTACT INFORMATION</p>
    <div className="space-y-3">
      <p className="text-gray-600">Email Id:</p>
      <p className="text-gray-800">{userData.email}</p>

      <p className="text-gray-600">Phone Number:</p>
      {isEdit ? (
        <input
          type="text"
          value={userData.phoneNumber}
          onChange={e =>
            setUserData(prev => ({ ...prev, phoneNumber: e.target.value }))
          }
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      ) : (
        <p className="text-gray-800">{userData.phoneNumber}</p>
      )}

      <p className="text-gray-600">Address:</p>
      {isEdit ? (
        <p className="space-y-2">
          <input
            onChange={e =>
              setUserData(prev => ({
                ...prev,
                address: { ...prev.address, line1: e.target.value },
              }))
            }
            value={userData.address.line1}
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary mb-2"
          />
          <input
            onChange={e =>
              setUserData(prev => ({
                ...prev,
                address: { ...prev.address, line2: e.target.value },
              }))
            }
            value={userData.address.line2}
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </p>
      ) : (
        <p className="text-gray-800">
          {userData.address.line1}
          <br />
          {userData.address.line2}
        </p>
      )}
    </div>
  </div>

  {/* Basic Info */}
  <div className="space-y-4">
    <p className="text-lg font-semibold text-primary">BASIC INFORMATION</p>
    <div className="space-y-3">
      <p className="text-gray-600">Gender</p>
      {isEdit ? (
        <select
          onChange={e =>
            setUserData(prev => ({ ...prev, gender: e.target.value }))
          }
          value={userData.gender}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option value="Not Selected">Not Selected</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      ) : (
        <p className="text-gray-800">{userData.gender}</p>
      )}

      <p className="text-gray-600">Birth Day</p>
      {isEdit ? (
        <input
          type="date"
          onChange={e =>
            setUserData(prev => ({ ...prev, dob: e.target.value }))
          }
          value={userData.dob}
          className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
      ) : (
        <p className="text-gray-800">{userData.dob}</p>
      )}
    </div>
  </div>

  {/* Buttons */}
  <div className="flex justify-center">
    {isEdit ? (
      <button
        
        onClick={updateUserProfileData}
        className="px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition-transform transform hover:scale-105"
      >
        Save Information
      </button>
    ) : (
      <button
        onClick={() => setIsEdit(true)}
        className="px-6 py-2 bg-primary text-white rounded-lg shadow hover:bg-primary/90 transition-transform transform hover:scale-105"
      >
        Edit
      </button>
    )}
  </div>
</div>

  )
}

export default MyProfile