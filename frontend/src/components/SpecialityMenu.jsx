import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
  return (
    <div id="speciality" className="py-16 px-6 md:px-10 lg:px-20 bg-gray-50">
      {/* Title */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-center md:text-left text-gray-800">
        Find By Speciality
      </h1>
      <p className="mt-4 text-sm sm:text-base lg:text-lg text-gray-600 max-w-3xl mx-auto md:mx-0">
        Discover doctors by their speciality. Choose the one that fits your needs and book your appointment easily online.
      </p>

      {/* Speciality Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mt-10">
      {specialityData.map((item, index) => (
        <Link 
          key={index}
          onClick={()=>scrollTo(0,0)}
          to={`/doctors/${item.speciality}`}
          className="flex flex-col items-center bg-white shadow-lg rounded-xl p-4 hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
        >
          <img src={item.image} alt={item.speciality} className="w-20 h-20 sm:w-24 sm:h-24 mb-2" />
          <p className="text-center text-sm sm:text-base font-medium text-gray-800">
            {item.speciality}
          </p>
        </Link>
      ))}

      </div>
    </div>
  )
}
export default SpecialityMenu
