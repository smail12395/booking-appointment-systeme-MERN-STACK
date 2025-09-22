import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-between bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 rounded-xl px-6 sm:px-10 lg:px-20 py-10 md:py-16 overflow-hidden text-white">
      
      {/*--------- Left Side --------------*/}
      <div className="md:w-1/2 flex flex-col justify-center gap-6 md:gap-8">
        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">
          Book Appointment <br /> With Trusted Doctors
        </h1>

        {/* Profiles + Description */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <img
            src={assets.group_profiles}
            alt="profiles"
            className="w-28 sm:w-32 lg:w-40 rounded-full"
          />
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-md">
            Find trusted doctors and book your appointment easily. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Ipsa, aliquid!
          </p>
        </div>

        {/* Call to Action */}
        <a
          href="#speciality"
          className="inline-flex items-center justify-center gap-3 bg-white text-primary font-semibold px-5 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-300 w-full sm:w-auto"
        >
          Book Appointment
          <img src={assets.arrow_icon} alt="arrow" className="w-5 h-5" />
        </a>
      </div>

      {/*--------- Right Side --------------*/}
      <div className="md:w-1/2 flex justify-center mb-6 md:mb-0">
        <img
          src={assets.header_img}
          alt="doctor"
          className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl drop-shadow-2xl rounded-xl"
        />
      </div>
    </div>
  )
}

export default Header
