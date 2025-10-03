import React, { useState } from "react";
import { assets } from "../assets/assets";

const translations = {
  en: {
    company: "COMPANY",
    home: "Home",
    about: "About us",
    contact: "Contact us",
    privacy: "Privacy Policy",
    getInTouch: "GET IN TOUCH",
    phone: "+212 6 12 34 56 78",
    email: "smailkindle@gmail.com",
    description: "We provide professional booking services with modern tools and excellent customer support. Your appointments made easy and reliable.",
    copyright: "© 2025 Your Company. All rights reserved.",
  },
  fr: {
    company: "ENTREPRISE",
    home: "Accueil",
    about: "À propos",
    contact: "Contactez-nous",
    privacy: "Politique de confidentialité",
    getInTouch: "NOUS CONTACTER",
    phone: "+212 6 12 34 56 78",
    email: "smailkindle@gmail.com",
    description: "Nous offrons des services de réservation professionnels avec des outils modernes et un support client excellent. Vos rendez-vous deviennent simples et fiables.",
    copyright: "© 2025 Votre entreprise. Tous droits réservés.",
  },
  ar: {
    company: "الشركة",
    home: "الرئيسية",
    about: "من نحن",
    contact: "اتصل بنا",
    privacy: "سياسة الخصوصية",
    getInTouch: "تواصل معنا",
    phone: "+212 6 12 34 56 78",
    email: "smailkindle@gmail.com",
    description: "نقدم خدمات حجز احترافية بأدوات حديثة ودعم عملاء ممتاز. مواعيدك أصبحت سهلة وموثوقة.",
    copyright: "© 2025 شركتك. كل الحقوق محفوظة.",
  },
};

const Footer = () => {
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  const t = (key) => translations[lang][key] || key;

  return (
    <footer className="bg-white text-gray-700 px-6 sm:px-12 lg:px-20 py-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8 md:gap-16">
        {/* Left Section */}
        <div className="md:w-1/3 flex flex-col gap-3">
          <img src={assets.logo} alt="Logo" className="w-32 md:w-36" />
          <p className="text-xs md:text-sm">{t("description")}</p>
        </div>

        {/* Center Section */}
        <div className="md:w-1/3 flex flex-col gap-3">
          <h3 className="font-semibold text-sm md:text-base">{t("company")}</h3>
          <ul className="flex flex-col gap-1 text-xs md:text-sm">
            <li className="hover:text-primary cursor-pointer transition">{t("home")}</li>
            <li className="hover:text-primary cursor-pointer transition">{t("about")}</li>
            <li className="hover:text-primary cursor-pointer transition">{t("contact")}</li>
            <li className="hover:text-primary cursor-pointer transition">{t("privacy")}</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="md:w-1/3 flex flex-col gap-3">
          <h3 className="font-semibold text-sm md:text-base">{t("getInTouch")}</h3>
          <ul className="flex flex-col gap-1 text-xs md:text-sm">
            <li className="cursor-pointer hover:text-primary transition">{t("phone")}</li>
            <li className="cursor-pointer hover:text-primary transition">{t("email")}</li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-300" />

      {/* Copyright */}
      <p className="text-center text-gray-500 text-xs md:text-sm">{t("copyright")}</p>
    </footer>
  );
};

export default Footer;
