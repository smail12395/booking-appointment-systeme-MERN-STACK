import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-6xl w-full bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col lg:flex-row">
        
        {/* Left: Contact Form */}
        <div className="lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Get in Touch
          </h2>
          <p className="text-gray-600 mb-6">
            Have questions or want to work together? Fill out the form below and we'll get back to you!
          </p>

          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none transition resize-none"
            ></textarea>
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-transform transform hover:scale-105 active:scale-95"
            >
              Send Message
            </button>
          </form>

          {/* Optional contact info blocks */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg hover:bg-primary/10 transition">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 8V7l-3 2-2-1-3 2v5l3 2 2-1 3 2v-1l-3-2v-3l3-2z" />
              </svg>
              <span className="text-gray-700">smailkindle4@gmail.com</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-lg hover:bg-primary/10 transition">
              <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27c1.21.49 2.53.76 3.89.76a1 1 0 011 1V21a1 1 0 01-1 1C10.07 22 2 13.93 2 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.36.27 2.68.76 3.89a1 1 0 01-.27 1.11l-2.37 2.37z" />
              </svg>
              <span className="text-gray-700">+212 600 123 456</span>
            </div>
          </div>
        </div>

        {/* Right: Image */}
        <div className="lg:w-1/2 relative">
          <img
            src={assets.contact_image}
            alt="Contact Us"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
