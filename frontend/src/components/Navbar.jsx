import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const {token, setToken, userData} = useContext(AppContext)

  const logout = ()=>{
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className="relative">
      {/* Overlay (blur + dark background) */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20"
          onClick={() => setMenuOpen(false)}
        />
      )}

      {/* Navbar */}
      <div className="flex items-center justify-between gap-8 relative z-30">
        {/* Logo */}
        <img onClick={()=>navigate('/')} className="w-44 cursor-pointer m-2" src={assets.logo} alt="Logo" />

        {/* Desktop Menu */}
        <ul className="hidden md:flex justify-center items-center gap-4 font-medium">
          <NavLink to="/" className="text-center">
            <li className="py-1">Home</li>
            <hr className="border-none outline-none h-0.5 bg-primary m-auto w-3/5 hidden " />
          </NavLink>

          <NavLink to="/doctors" className="text-center">
            <li className="py-1">Doctors</li>
            <hr className="border-none outline-none h-0.5 bg-primary m-auto w-3/5 hidden " />
          </NavLink>

          <NavLink to="/about" className="text-center">
            <li className="py-1">About</li>
            <hr className="border-none outline-none h-0.5 bg-primary m-auto w-3/5 hidden " />
          </NavLink>

          <NavLink to="/contact" className="text-center">
            <li className="py-1">Contact</li>
            <hr className="border-none outline-none h-0.5 bg-primary m-auto w-3/5 hidden " />
          </NavLink>
        </ul>

        

        {/* Right section (button + hamburger) */}
        <div className="flex items-center gap-4">
          {
            token && userData
             ?<div className="flex items-center gap-2 cursor-pointer group relative">
                <img className="w-8 rounded-full" src={userData.image} alt="" />
                <img className="max-md:hidden" src={assets.dropdown_icon} alt="" />
                <div className="absolute top-0 right-0 text-base font-medium text-gray-600 z-20 hidden sm:group-hover:block">
                  <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4">
                    <p onClick={()=>navigate('/my-profile')} className="hover:text-black cursor-pointer">My profile</p>
                    <p onClick={()=>navigate('/my-appointement')} className="hover:text-black cursor-pointer">My Appointement</p>
                    <p onClick={logout} className="hover:text-black cursor-pointer">logout</p>
                  </div>
                </div>
             </div>
             :<button className="   bg-primary text-white    font-medium   rounded-full    shadow-md    hover:bg-blue-600    transition    active:scale-95 /* Mobile (smallest) */ max-sm:text-xs max-sm:px-3 max-sm:py-1.5 max-sm:rounded-md /* Small screens & tablets */ sm:text-sm sm:px-4 sm:py-2 /* Larger screens */ md:text-base md:px-6 md:py-2.5"
               onClick={()=>navigate('/login')} >
               Create Account
               </button>
          }
        



          {/* Hamburger (mobile only) */}
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
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
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
<ul className="flex flex-col items-start gap-4 font-medium px-6">
  <NavLink
    to="/"
    onClick={() => setMenuOpen(false)}
    className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'font-bold' : ''}`}
  >
    {({ isActive }) => (
      <>
        {isActive && <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>}
        <li>Home</li>
      </>
    )}
  </NavLink>

  <NavLink
    to="/doctors"
    onClick={() => setMenuOpen(false)}
    className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'font-bold' : ''}`}
  >
    {({ isActive }) => (
      <>
        {isActive && <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>}
        <li>Doctors</li>
      </>
    )}
  </NavLink>

  <NavLink
    to="/about"
    onClick={() => setMenuOpen(false)}
    className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'font-bold' : ''}`}
  >
    {({ isActive }) => (
      <>
        {isActive && <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>}
        <li>About</li>
      </>
    )}
  </NavLink>

  <NavLink
    to="/contact"
    onClick={() => setMenuOpen(false)}
    className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'font-bold' : ''}`}
  >
    {({ isActive }) => (
      <>
        {isActive && <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>}
        <li>Contact</li>
      </>
    )}
  </NavLink>

  {token && (
    <>
      <NavLink
        to="/my-appointement"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'font-bold' : ''}`}
      >
        {({ isActive }) => (
          <>
            {isActive && <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>}
            <li>My appointment</li>
          </>
        )}
      </NavLink>

      <NavLink
        to="/my-profile"
        onClick={() => setMenuOpen(false)}
        className={({ isActive }) => `flex items-center gap-2 ${isActive ? 'font-bold' : ''}`}
      >
        {({ isActive }) => (
          <>
            {isActive && <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>}
            <li>My profile</li>
          </>
        )}
      </NavLink>
    </>
  )}

  <NavLink
    onClick={() => { logout(); setMenuOpen(false); }}
    className="flex items-center gap-2"
  >
    <li>Logout</li>
  </NavLink>
</ul>


      </div>
    </div>
  );
};

export default Navbar;
