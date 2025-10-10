import React from "react";
import { assets } from "../assets/assets";
import { FaCheckCircle, FaUsers, FaLightbulb } from "react-icons/fa";
import Translated from "../components/Translated";

const About = () => {
  return (
    <section className="bg-gray-50 py-16 px-5 md:px-16 relative overflow-hidden">
  {/* Background gradient / decorative shapes */}
  <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
  <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>

  <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
    {/* Left: Image first */}
    <div className="flex-1 relative w-full max-w-md md:max-w-lg">
      <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-700">
        <img
          src={assets.about_image}
          alt="About"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent mix-blend-multiply"></div>
      </div>
      {/* Floating badge */}
      <div className="absolute -bottom-6 right-4 bg-primary text-white px-4 py-2 rounded-xl shadow-lg transform rotate-2 animate-bounce">
        <Translated text="Trusted by 1000+ users" />
      </div>
    </div>

    {/* Right: Text */}
    <div className="flex-1 space-y-6">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 relative inline-block group">
        <Translated text="About Our Platform" />
        <span className="absolute left-0 -bottom-1 w-0 h-1 bg-primary transition-all group-hover:w-full"></span>
      </h2>
      <p className="text-gray-600 text-base md:text-lg leading-relaxed">
        <Translated text="We provide seamless booking experiences with modern tools and a focus on efficiency. Our platform allows you to book appointments with ease while keeping you informed with real-time updates." />
      </p>
    </div>
  </div>

  {/* Separate Feature Cards Section */}
  <div className="max-w-7xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
    <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md h-full transition-transform hover:-translate-y-2 hover:shadow-lg">
      <FaCheckCircle className="text-primary text-3xl mb-3" />
      <h3 className="font-semibold text-gray-900">
        <Translated text="Reliable" />
      </h3>
      <p className="text-gray-500 text-sm mt-2">
        <Translated text="Our service ensures accurate scheduling every time." />
      </p>
    </div>

    <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md h-full transition-transform hover:-translate-y-2 hover:shadow-lg">
      <FaUsers className="text-primary text-3xl mb-3" />
      <h3 className="font-semibold text-gray-900">
        <Translated text="User-Friendly" />
      </h3>
      <p className="text-gray-500 text-sm mt-2">
        <Translated text="Intuitive interface designed for everyone to navigate easily." />
      </p>
    </div>

    <div className="flex flex-col items-center text-center bg-white p-6 rounded-xl shadow-md h-full transition-transform hover:-translate-y-2 hover:shadow-lg">
      <FaLightbulb className="text-primary text-3xl mb-3 animate-spin-slow" />
      <h3 className="font-semibold text-gray-900">
        <Translated text="Innovative" />
      </h3>
      <p className="text-gray-500 text-sm mt-2">
        <Translated text="Constantly evolving with smart solutions and modern features." />
      </p>
    </div>
  </div>
</section>

  );
};

export default About;
