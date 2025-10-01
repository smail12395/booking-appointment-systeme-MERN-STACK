import express from 'express'
import cors from  'cors'
import 'dotenv/config'
import connectDB from './config/mongoDb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import doctorRouter from './routes/doctorRoute.js'
import userRoute from './routes/userRoute.js'
import './jobs/emailReminder.js'

//app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//middlewares
app.use(express.json())
app.use(cors())

//API endpoints
app.use('/api/admin', adminRouter)
app.use('/api/doctor', doctorRouter)
app.use('/api/user', userRoute)

app.get('/', (req,res)=>{
    res.send("Woorking")

})

app.listen(port,() =>{
    console.log('lestining at', port)
})