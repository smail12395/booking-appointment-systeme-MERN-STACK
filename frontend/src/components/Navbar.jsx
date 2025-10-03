import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import Translated from "../components/Translated";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");
  const navigate = useNavigate();
  const { token, setToken, userData } = useContext(AppContext);

  const translations = {
    en: {
      Home: "Home",
      Doctors: "Doctors",
      About: "About",
      Contact: "Contact",
      "My profile": "My profile",
      "My appointment": "My appointment",
      Logout: "Logout",
      "Create Account": "Create Account",
    },
    fr: {
      Home: "Accueil",
      Doctors: "Médecins",
      About: "À propos",
      Contact: "Contact",
      "My profile": "Mon profil",
      "My appointment": "Mes rendez-vous",
      Logout: "Se déconnecter",
      "Create Account": "Créer un compte",
    },
    ar: {
      Home: "الرئيسية",
      Doctors: "الأطباء",
      About: "حول",
      Contact: "اتصل بنا",
      "My profile": "ملفي الشخصي",
      "My appointment": "مواعيدي",
      Logout: "تسجيل الخروج",
      "Create Account": "إنشاء حساب",
    },
  };

  const t = (text) => translations[lang][text] || text;

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
  };

  const changeLang = (newLang) => {
    localStorage.setItem("lang", newLang);
    setLang(newLang);
    window.location.reload();
  };

  return (
    <div className="relative">
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Navbar */}
      <div className="flex items-center justify-between gap-8 relative z-30">
        <img
          onClick={() => navigate("/")}
          className="w-44 cursor-pointer m-2"
          src={assets.logo}
          alt="Logo"
        />

        {/* Desktop Menu */}
        <ul className="hidden md:flex justify-center items-center gap-4 font-medium">
          {["Home", "Doctors", "About", "Contact"].map((item) => (
            <NavLink key={item} to={`/${item === "Home" ? "" : item.toLowerCase()}`} className="text-center">
              <li className="py-1">{t(item)}</li>
              <hr className="border-none outline-none h-0.5 bg-primary m-auto w-3/5 hidden" />
            </NavLink>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {token && userData ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img className="w-8 rounded-full" src={userData.image} alt="" />
              <img className="max-md:hidden" src={assets.dropdown_icon} alt="" />
              <div className="absolute top-0 right-0 text-base font-medium text-gray-600 z-20 hidden sm:group-hover:block">
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                  <p onClick={() => navigate("/my-profile")} className="hover:text-black cursor-pointer">
                    {t("My profile")}
                  </p>
                  <p onClick={() => navigate("/my-appointement")} className="hover:text-black cursor-pointer">
                    {t("My appointment")}
                  </p>
                  <p onClick={logout} className="hover:text-black cursor-pointer">
                    {t("Logout")}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="bg-primary text-white font-medium rounded-full shadow-md hover:bg-blue-600 transition active:scale-95 max-sm:text-xs max-sm:px-3 max-sm:py-1.5 max-sm:rounded-md sm:text-sm sm:px-4 sm:py-2 md:text-base md:px-6 md:py-2.5"
              onClick={() => navigate("/login")}
            >
              {t("Create Account")}
            </button>
          )}

          {/* Hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(true)}
            aria-label="Open Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Language Selector */}
      <div className="flex gap-2 mt-3 mb-2">
        {["en", "fr", "ar"].map((lng) => (
          <button
            key={lng}
            onClick={() => changeLang(lng)}
            className={`px-3 py-1 text-xs rounded-md border font-medium transition-all ${
              lang === lng ? "bg-primary text-white" : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {lng.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 transform transition-transform duration-300 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMenuOpen(false)} aria-label="Close Menu">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <ul className="flex flex-col items-start gap-4 font-medium px-6">
          {["Home", "Doctors", "About", "Contact"].map((item) => (
            <NavLink
              key={item}
              to={`/${item === "Home" ? "" : item.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) => `flex items-center gap-2 ${isActive ? "font-bold" : ""}`}
            >
              {({ isActive }) => (
                <>
                  {isActive && <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>}
                  <li>{t(item)}</li>
                </>
              )}
            </NavLink>
          ))}

          {token && (
            <>
              <NavLink
                to="/my-appointement"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => `flex items-center gap-2 ${isActive ? "font-bold" : ""}`}
              >
                {({ isActive }) => (
                  <>
                    {isActive && <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>}
                    <li>{t("My appointment")}</li>
                  </>
                )}
              </NavLink>

              <NavLink
                to="/my-profile"
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => `flex items-center gap-2 ${isActive ? "font-bold" : ""}`}
              >
                {({ isActive }) => (
                  <>
                    {isActive && <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>}
                    <li>{t("My profile")}</li>
                  </>
                )}
              </NavLink>
            </>
          )}

          {token && (
            <NavLink onClick={() => { logout(); setMenuOpen(false); }} className="flex items-center gap-2">
              <li>{t("Logout")}</li>
            </NavLink>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
