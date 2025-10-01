import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Doctors from './pages/doctors'
import Contact from './pages/contact'
import About from './pages/about'
import Login from './pages/login'
import MyProfile from './pages/MyProfile'
import MyAppointement from './pages/MyAppointement'
import Appointement from './pages/Appointement'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import BookingSlots from './pages/BookingSlots'
import { ToastContainer, toast } from 'react-toastify';
import NotFound from './pages/NotFound';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <hr />
      <Routes>
        <Route path="not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/' element={<Home />} />
        <Route path='/doctors' element={<Doctors />} />  
        <Route path='/doctors/:speciality' element={<Doctors />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/about' element={<About />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-profile' element={<MyProfile />} />
        <Route path='/my-appointement' element={<MyAppointement />} />
        <Route path='/appointement/:docId' element={<Appointement />} />
        <Route path='/booking' element={<BookingSlots />} />
        

        <Route path='/:docLastName' element={<Appointement />} />
        
      </Routes>
      <Footer />
    </div>
  )
}

export default App