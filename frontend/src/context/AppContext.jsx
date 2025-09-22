import React, { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AppContext = createContext();  // make sure () is here

const AppContextProvider = (props) => {
  const currencySymbole = "MAD";
  const startTime = "7:00";
  const endTime = "16:30";
  const slotInterval = 30;
  const changeSys = "AM/PM";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState([])
  const [userData, setUserData] = useState(false)


  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)


  const getDoctorsData = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/doctor/list')
      if (data.success){
        setDoctors(data.doctors)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const loadUserProfileData = async () => {
    try {
      const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers:{token}})
      if (data.success) {
        setUserData(data.userData)
      }else {
        toast.error(data.error)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)     
    }
  }

  useEffect(()=>{
    loadUserProfileData()
  },[])

  useEffect(()=>{
    if (token) {
      loadUserProfileData()
    } else {
      setUserData(false)
    }
  },[token])

useEffect(() => {
  getDoctorsData();
}, []);

  const value = {
    doctors,
    getDoctorsData,
    currencySymbole,
    startTime,
    endTime,
    slotInterval,
    changeSys,
    token, setToken,
    backendUrl,
    userData, setUserData,
    loadUserProfileData
  };

  useEffect(()=>{
    getDoctorsData()
  },[])

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
