import { createContext, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

export const AdminContext = createContext()

const AdminContextProider = (props) => {
    const [aToken, setAToken] = useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'')

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [doctors, setDoctors] = useState([])
    const [appointements,setAppointements] = useState([])
    const [dashData,setDashData] = useState(false)

    const getAllDoctors = async () => {
        try {
            const {data}  = await axios.post(backendUrl + '/api/admin/all-doctors' , {} , {headers:{aToken}})
            if (data.success){
                setDoctors(data.doctors)
                console.log(data.doctors);
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            
        }
    }

    const changeAailability = async (docId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/change-availability', {docId}, {headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }

    const getAllappointements = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/appointements', {headers:{aToken}})
            if(data.success){
                setAppointements(data.appointements)
                console.log(data.appointements)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const cancelAppointement = async (appointementId) => {
        try {
            const {data} = await axios.post(backendUrl + '/api/admin/cancel-appointement', {appointementId}, {headers:{aToken}})
            if(data.success){
                toast.success(data.message)
                getAllappointements()
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getDashData = async ()=> {
        try {
            const {data} = await axios.get(backendUrl + '/api/admin/dashboard', {headers:{aToken}})
            if(data.success){
                setDashData(data.dashData)
                console.log(data.dashData);
                
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(data.message)
        }
    }

    const value = {
        aToken, setAToken,
        backendUrl,doctors,
        getAllDoctors, changeAailability,
        appointements,setAppointements,
        getAllappointements,
        cancelAppointement,
        dashData,setDashData,
        getDashData

    }
    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProider