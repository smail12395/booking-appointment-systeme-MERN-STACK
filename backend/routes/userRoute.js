import express from 'express'
import { bookAppointement, cancelAppointement, getProfile, listAppointement, loginUser, registerUser, updateProfile } from '../controlers/userControler.js'
import authUser from '../midlewares/authUser.js'
import upload from '../midlewares/multer.js'

const userRoute = express.Router()

userRoute.post('/register', registerUser)
userRoute.post('/login', loginUser)

userRoute.get('/get-profile', authUser, getProfile)
userRoute.post('/update-profile', upload.single('image'),authUser, updateProfile)
userRoute.post('/book-appointement', authUser, bookAppointement)
userRoute.get('/appointements', authUser, listAppointement)
userRoute.post('/cancel-appointement', authUser, cancelAppointement)

export default userRoute