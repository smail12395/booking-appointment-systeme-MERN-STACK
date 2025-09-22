import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
    const navigate = useNavigate();
  return (
    <section className="m-8 relative bg-gradient-to-r from-primary/90 to-blue-500 text-white rounded-2xl px-6 md:px-12 lg:px-20 py-8 md:py-12 shadow-lg flex items-center justify-between">
      {/* Left Side */}
      <div className="flex flex-col items-start gap-5 max-w-xl z-10">
        <h1 className="text-3xl md:text-5xl font-bold leading-tight">
          Book Your Appointment <br className="hidden md:block" />
          With Trusted Doctors
        </h1>
        <p className="text-base md:text-lg text-white/90">
          Get access to top healthcare professionals and book your appointment
          in just a few clicks. Fast, easy, and reliable.
        </p>
        <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className="bg-white text-primary font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-100 transition transform hover:scale-105">
          Create Account
        </button>
      </div>

      {/* Floating Image (Desktop only) */}
      <div className="hidden lg:block">
        <img
          src={assets.appointment_img}
          alt="Appointment"
          className="absolute -top-10 right-10 w-[340px] drop-shadow-2xl"
        />
      </div>
    </section>
  );
};

export default Banner;
