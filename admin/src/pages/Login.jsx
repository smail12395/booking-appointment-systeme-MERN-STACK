import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'

const Login = () => {
    const [state, setState] = useState('Admin')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {setAToken,backendUrl} = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)

    const onSubmitHandler = async (event)=>{
        event.preventDefault()
        try {
            if(state === 'Admin'){
                const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
                if (data.success){
                    localStorage.setItem('aToken',data.token)
                    setAToken(data.token)
                    console.log(data);
                    
                }else {
                    toast.error(data.message)
                    
                }
            }else {

              const {data} = await axios.post(backendUrl + '/api/doctor/login', {email,password})
              if (data.success){
                    localStorage.setItem('dToken',data.token)
                    setDToken(data.token)
                    console.log(data.token);
                    
                }else {
                    toast.error(data.message)
                    
                }

            }
        } catch (error) {
            
        }
    }

  return (
<form onSubmit={onSubmitHandler} className="flex justify-center items-center min-h-screen bg-slate-100">
  <div className="bg-white shadow-lg rounded-xl p-6 w-96">
    <p className="text-2xl font-semibold text-center text-primary mb-6">
      <span>{state === 'Admin'? 'Admin' : 'Doctor'} Login</span>
    </p>

    <div className="mb-4">
      <p className="text-sm font-medium text-gray-700">Email</p>
      <input 
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
        type="email" 
        required 
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
      />
    </div>                

    <div className="mb-6">
      <p className="text-sm font-medium text-gray-700">Password</p>
      <input 
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}}
        type="password" 
        required 
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
      />
    </div>

    <button 
      className="w-full bg-primary text-white py-2 rounded-lg font-medium hover:bg-primary transition"
    >
      Login
    </button>
    {
        state === 'Admin'
        ? <p className='m-2 p-1'>Doctor Login? <span className='text-primary underline cursor-pointer' onClick={()=>{setState('Doctor')}}>Click here</span></p>
        : <p className='m-2 p-1'>Admin Login?  <span className='text-primary underline cursor-pointer' onClick={()=>{setState('Admin')}}>Click here</span></p>
    }
  </div>
</form>

  )
}

export default Login