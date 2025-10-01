import { useState } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const DoctorContext = createContext()

const DoctorContextProider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [dToken,setDToken] = useState(localStorage.getItem('dToken')?localStorage.getItem('dToken'):'') 
    const [appointements,setAppointements] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    const getAppointements = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/appointements', {headers:{dToken}})
            if(data.success){
                setAppointements(data.appointements)
                console.log(data.appointements)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

    const completeAppointement = async (appointementId) => {
        try{
            const {data} = await axios.post(backendUrl + '/api/doctor/complete-appointement',{appointementId},{headers:{dToken}})
            if(data.success){
                toast.success(data.message)
                getAppointements()
            } else {
                toast.error(data.message)
            }
        } catch (error){
            console.log(error);
            toast.error(error.message)
        }
    }

    const cancelAppointement = async (appointementId) => {
        try{
            const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointement',{appointementId},{headers:{dToken}})
            if(data.success){
                toast.success(data.message)
                getAppointements()
            } else {
                toast.error(data.message)
            }
        } catch (error){
            console.log(error);
            toast.error(error.message)
        }
    }

    const getDashData = async () => {
         try {
            const {data} = await axios.get(backendUrl + '/api/doctor/dashboard',{headers:{dToken}})
            if(data.success){
               setDashData(data.dashData)
               console.log(data.dashData);
            } else { 
                toast.error(data.message)
            }
         } catch (error) {
            console.log(error);
            toast.error(error.message)
         }
    }

    const getProfileData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/profile',{headers:{dToken}})
            if(data.success){
                setProfileData(data.profileData)
                console.log(data.profileData)
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }

const reportUser = async (appointementId) => {
  try {
    const { data } = await axios.post(
      backendUrl + "/api/doctor/report-user",
      { appointementId },
      { headers: { dToken } }
    );
    if (data.success) {
      toast.success(data.message);
      getAppointements();
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

     
    const value = {
        dToken,setDToken,
        backendUrl,
        appointements,setAppointements,
        getAppointements,
        completeAppointement,
        cancelAppointement,
        dashData,setDashData,
        getDashData,
        profileData,setProfileData,
        getProfileData,
        reportUser
    }
    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProider