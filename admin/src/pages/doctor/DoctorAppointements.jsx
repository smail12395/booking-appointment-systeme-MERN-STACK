import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointements = () => {
  const { dToken, appointements, getAppointements, completeAppointement, cancelAppointement, reportUser } = useContext(DoctorContext)
  const { calculateAge, slotDateFormat, currency } = useContext(AppContext)
  const [openMenu, setOpenMenu] = useState(null) // track which row menu is open

  useEffect(() => {
    if (dToken) {
      getAppointements()
    }
  }, [dToken])

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm min-h-[50vh] max-h-[80vh] overflow-y-scroll'>

<div className="max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr_0.5fr] gap-1 py-3 px-6 border-b">
  <p>#</p>
  <p>Patient</p>
  <p>phone number</p>
  <p>Age</p>
  <p>Date & Time</p>
  <p>Fees</p>
  <p>Actions</p>
  <p></p> {/* new column header for dots */}
</div>

{appointements.slice().reverse().map((item, index) => (
  <div
    key={index}
    className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_1fr_1fr_0.5fr] gap-1 items-center py-3 px-6 border-b hover:bg-gray-50 relative'
  >
    <p className='max-sm:hidden'>{index + 1}</p>
    <div className='flex items-center gap-2'>
      <img className='w-8 rounded-full' src={item.userData.image} alt="" /> 
      <p>{item.userData.name}</p>
    </div>
    <div>
      <p className='text-xs inline border border-primary px-2 rounded-full'>
        {item.userData.phoneNumber}
      </p>
    </div>
    <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
    <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
    <p>{currency} {item.amount}</p>

    {/* Actions */}
    <div className="flex items-center gap-6">
      {item.cancelled ? (
        <p className='text-red-400 text-xs font-medium'>Cancelled</p>
      ) : item.isCompleted ? (
        <p className='text-green-400 text-xs font-medium'>Completed</p>
      ) : (
        <div className='flex gap-6'>
          <img
            onClick={() => cancelAppointement(item._id)}
            className='w-10 cursor-pointer'
            src={assets.cancel_icon}
            alt="Cancel"
          />
          <img
            onClick={() => completeAppointement(item._id)}
            className='w-10 cursor-pointer'
            src={assets.tick_icon}
            alt="Complete"
          />
        </div>
      )}
    </div>

    {/* Three dots menu */}
    <div className="relative">
      <button
        className="px-2 py-1 text-gray-600 hover:text-black text-xl"
        onClick={() => setOpenMenu(openMenu === index ? null : index)}
      >
        ⋮
      </button>
      {openMenu === index && (
        <div className="absolute right-0 mt-2 w-28 bg-white border rounded shadow-lg z-10">
          <button
            onClick={() => {
              reportUser(item._id)
              setOpenMenu(null)
            }}
            className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            Report
          </button>
        </div>
      )}
    </div>
  </div>
))}


      </div>
    </div>
  )
}

export default DoctorAppointements
