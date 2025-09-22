import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from "../context/AppContext"
import axios from 'axios'
import { toast } from 'react-toastify'

const MyAppointement = () => {
  const { backendUrl, token, getDoctorsData  } = useContext(AppContext)

  const [appointements,setAppointements] = useState([])
  const months = ['','Jan','Feb','Mar','Apr','May', 'Jun', 'Aug', 'Sep','Oct', 'Nov', 'Dec']
  const slotDateFormat = (slotDate)=>{
    const dateArray = slotDate.split('/')
    return dateArray[0] + ' ' + months[Number(dateArray[1])-1] + ' '+dateArray[2]
  }

const getUserAppointements = async () => {
  try {
    const { data } = await axios.get(
      backendUrl + '/api/user/appointements',
      { headers: { token } }
    ); // <-- IMPORTANT: add await here

    if (data.success) {
      setAppointements(data.appointements.reverse());
      console.log(data.appointements);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

const cancelAppointement = async (appointementId) => {
  try {
    const {data} = await axios.post(backendUrl + '/api/user/cancel-appointement', {appointementId},{headers:{token}})
    if(data.success){
      toast.success(data.message)
      getUserAppointements()
      getDoctorsData()
    }else {
      toast.error(data.message)
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
}

  useEffect(()=>{
    if(token){
      getUserAppointements()
    }
  },[token])
  return (
    <div>
      <p>My Appointement</p>
      <div>
{
   appointements.map((item, index) => (
     <div key={index} className="p-4 border rounded-md shadow-md mb-4">
       <div>
         <img src={item.docData.image} alt={item.name} className="w-20 h-20 rounded-full object-cover" />
       </div>
       <div>
         <p className="font-bold text-lg">{item.docData.name}</p>
         <p className="text-gray-600">{item.docData.speciality}</p>
         <p className="mt-2">Address:</p>
         <p>{item.docData.address.line1}</p>
         <p>{item.docData.address.line2}</p>
         <p className="mt-2">
           <span className="font-semibold">Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
         </p>
       </div>
       <div className="flex gap-2 mt-4">
         {!item.cancelled && !item.isCompleted && <button onClick={()=>toast.error('this geature not available')} className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/80">Pay Online</button>}
         {!item.cancelled && !item.isCompleted && <button onClick={()=>{cancelAppointement(item._id)}} className="px-4 py-2 bg-white text-red-600 border-[1px] border-red-600 rounded-md hover:bg-red-600 hover:text-white duration-300">Cancel</button>}
         {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
         {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}
       </div>
     </div>
   ))
}

      </div>
    </div>
  )
}

export default MyAppointement