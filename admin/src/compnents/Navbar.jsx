import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
    const {aToken,setAToken} = useContext(AdminContext)
    const {dToken,setDToken} = useContext(DoctorContext)


    const navigate = useNavigate()

    const logout = () => {
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }
  return (
<div className="flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3">
    <div className="flex items-center gap-2 sm:gap-3">
        <img src={assets.admin_logo} alt="" className="h-30 w-30 max-sm:w-20 max-sm:h-20 object-contain" />
        <p className="text-sm sm:text-base font-medium tracking-wide text-gray-700 italic">
            {aToken ? (
                <span className="text-primary px-2 border border-primary py-0.5 rounded-full ">Admin</span>
            ) : (
                <span className="text-green-600 px-2 border border-green-text-green-600 py-0.5 rounded-full">Doctor</span>
            )}
        </p>
    </div>
    <button 
    onClick={logout}
    className="bg-primary text-white px-3 py-1.5 sm:px-5 sm:py-2 rounded-md sm:rounded-lg text-sm sm:text-base font-medium shadow hover:opacity-90 transition">
        Logout
    </button>
</div>



  )
}

export default Navbar