import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'

const DoctorList = () => {
  const {doctors, aToken, getAllDoctors, changeAailability} = useContext(AdminContext)

  useEffect(()=>{
    if(aToken){
      getAllDoctors()
    }
  },[aToken])
  return (
<div className="m-5 max-h-[90vh] overflow-y-scroll">
  <h1 className="text-2xl font-bold text-gray-800 mb-4">All Doctors</h1>
  <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
    {doctors.map((item, index) => (
      <div
        className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group m-2 shadow-sm hover:shadow-md transition-shadow duration-300"
        key={index}
      >
        <img
          className="bg-indigo-50 w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
          src={item.image}
          alt={item.name}
        />
        <div className="p-3 space-y-1">
          <p className="text-lg font-semibold text-gray-700 group-hover:text-indigo-600">
            {item.name}
          </p>
          <p className="text-sm text-gray-500 italic">{item.speciality}</p>
          <div className="flex items-center gap-2 mt-2">
            <input
              onChange={()=>{changeAailability(item._id)}}
              type="checkbox"
              checked={item.available}
              className="accent-indigo-500 w-4 h-4"
              readOnly
            />
            <p
              className={`text-sm font-medium ${
                item.available ? "text-green-600" : "text-red-500"
              }`}
            >
              {item.available ? "Available" : "Unavailable"}
            </p>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>

  )
}

export default DoctorList