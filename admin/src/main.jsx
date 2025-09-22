import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AdminContextProider from './context/AdminContext.jsx'
import DoctorContextProider from './context/DoctorContext.jsx'
import AppContextProider from './context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AdminContextProider>
      <DoctorContextProider>
        <AppContextProider>
            <App />
        </AppContextProider>
      </DoctorContextProider>
    </AdminContextProider>
  </BrowserRouter>,
)
