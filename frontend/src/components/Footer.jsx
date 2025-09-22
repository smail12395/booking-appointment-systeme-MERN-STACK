import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 px-6 sm:px-12 lg:px-20 py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-16">

        {/* Left Section */}
        <div className="md:w-1/3 flex flex-col gap-3">
          <img src={assets.logo} alt="Logo" className="w-32 md:w-36" />
          <p className="text-xs md:text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas laborum perspiciatis repellat rem. Minus repudiandae, reiciendis eveniet perferendis deserunt.
          </p>
        </div>

        {/* Center Section */}
        <div className="md:w-1/3 flex flex-col gap-3">
          <h3 className="font-semibold text-sm md:text-base">COMPANY</h3>
          <ul className="flex flex-col gap-1 text-xs md:text-sm">
            <li className="hover:text-primary cursor-pointer transition">Home</li>
            <li className="hover:text-primary cursor-pointer transition">About us</li>
            <li className="hover:text-primary cursor-pointer transition">Contact us</li>
            <li className="hover:text-primary cursor-pointer transition">Privacy Policy</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="md:w-1/3 flex flex-col gap-3">
          <h3 className="font-semibold text-sm md:text-base">GET IN TOUCH</h3>
          <ul className="flex flex-col gap-1 text-xs md:text-sm">
            <li className="cursor-pointer hover:text-primary transition">+212 6 12 34 56 78</li>
            <li className="cursor-pointer hover:text-primary transition">smailkindle@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-300" />

      {/* Copyright */}
      <p className="text-center text-gray-500 text-xs md:text-sm">
        © 2025 Your Company. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
