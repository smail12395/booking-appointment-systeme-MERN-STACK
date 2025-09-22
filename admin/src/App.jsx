import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AdminContext } from './context/AdminContext'
import Navbar from './compnents/Navbar'
import Sidebar from './compnents/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/admin/Dashboard'
import AllAppointements from './pages/admin/AllAppointements'
import AddDoctor from './pages/admin/AddDoctor'
import DoctorList from './pages/admin/DoctorList'
import { DoctorContext } from './context/DoctorContext'
import DoctorDashboard from './pages/doctor/DoctorDashboard'
import DoctorAppointements from './pages/doctor/DoctorAppointements'
import DoctorProfile from './pages/doctor/DoctorProfile'

const App = () => {
  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext)
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]'> 
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          {/* ADMIN ROUTE */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointements' element={<AllAppointements />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorList />} />
          {/* ADMIN ROUTE */}
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointements' element={<DoctorAppointements />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  )
}

export default App