import React from "react";
import { assets } from "../assets/assets";
import { FaCheckCircle, FaUsers, FaLightbulb } from "react-icons/fa";

const About = () => {
  return (
    <section className="bg-gray-50 py-16 px-5 md:px-16 relative overflow-hidden">
      {/* Background gradient / decorative shapes */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse"></div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">
        {/* Left: Text Content */}
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 relative inline-block group">
            About Our Platform
            <span className="absolute left-0 -bottom-1 w-0 h-1 bg-primary transition-all group-hover:w-full"></span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            We provide seamless booking experiences with modern tools and a 
            focus on efficiency. Our platform allows you to book appointments 
            with ease while keeping you informed with real-time updates.
          </p>

          {/* Feature Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-md transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <FaCheckCircle className="text-primary text-3xl mt-1 animate-bounce" />
              <div>
                <h3 className="font-semibold text-gray-900">Reliable</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Our service ensures accurate scheduling every time.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-md transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <FaUsers className="text-primary text-3xl mt-1 animate-pulse" />
              <div>
                <h3 className="font-semibold text-gray-900">User-Friendly</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Intuitive interface designed for everyone to navigate easily.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-white p-4 rounded-xl shadow-md transform transition duration-500 hover:scale-105 hover:shadow-xl">
              <FaLightbulb className="text-primary text-3xl mt-1 animate-spin-slow" />
              <div>
                <h3 className="font-semibold text-gray-900">Innovative</h3>
                <p className="text-gray-500 text-sm mt-1">
                  Constantly evolving with smart solutions and modern features.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="flex-1 relative w-full max-w-md md:max-w-lg">
          <div className="relative overflow-hidden rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-700">
            <img
              src={assets.about_image}
              alt="About"
              className="w-full h-full object-cover"
            />
            {/* Decorative overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent mix-blend-multiply"></div>
          </div>

          {/* Floating info badge */}
          <div className="absolute -bottom-6 right-4 bg-primary text-white px-4 py-2 rounded-xl shadow-lg transform rotate-2 animate-bounce">
            Trusted by 1000+ users
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
