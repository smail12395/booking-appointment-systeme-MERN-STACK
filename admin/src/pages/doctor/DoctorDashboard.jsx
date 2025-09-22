import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import {assets} from '../../assets/assets'
import { AppContext } from '../../context/AppContext'

const DoctorDashboard = () => {
  const {dashData, setDashData, getDashData, dToken, completeAppointement, cancelAppointement} = useContext(DoctorContext)
  const {currency, slotDateFormat} = useContext(AppContext)
  useEffect(()=>{
    if(dToken){
      getDashData()
    }
  },[dToken])

  return dashData && (
    <div className='m-5'>
            <div className='flex flex-wrap gap-3'>
      
              <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img className='w-14' src={assets.earning_icon} alt="" />
                <div>
                  <p>{dashData.earning} {currency}</p>
                  <p>Earning</p>
                </div>
              </div>
      
              <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img className='w-14' src={assets.appointments_icon} alt="" />
                <div>
                  <p>{dashData.appointements}</p>
                  <p>Appointments</p>
                </div>
              </div>
      
              <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
                <img className='w-14' src={assets.patients_icon} alt="" />
                <div>
                  <p>{dashData.patients}</p>
                  <p>Patients</p>
                </div>
              </div>
            </div>

           <div className='bg-white'>
              <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
                <img src={assets.list_icon} alt="" />
                <p className='font-semibold'>Latest Booking</p>
              </div>
      
              <div className='pt-4 border-t-0 '>
                {
                  dashData.latestAppointements.map((item,index)=> (
                    <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                      <img className='rounded-full w-10' src={item.userData.image} alt="" />
                      <div className='flex-1 text-sm '>
                        <p className='text-gray-600 font-medium' >{item.userData.name}</p>
                        <p className='text-gray-600 ' >{slotDateFormat(item.slotDate) }</p>
                      </div>
                       {
                        item.cancelled
                        ? <p className='text-red-400 text-xs font-meduim'>Cancelled</p>
                        : item.isCompleted
                          ? <p className='text-green-400 text-xs font-meduim'>Copleted</p>
                          : <div className='flex'>
                              <img onClick={()=>{cancelAppointement(item._id)}} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                              <img onClick={()=>{completeAppointement(item._id)}} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                            </div>
                      }
                    </div>
                  ))
                }
              </div>
            </div>
    </div>
  )
}

export default DoctorDashboard