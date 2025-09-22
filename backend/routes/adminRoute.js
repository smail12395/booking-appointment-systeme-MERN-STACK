import express from 'express'
import { addDoctor, allDoctors, appointementCancel, appointementsAdmin, loginAdmin, adminDashboard } from '../controlers/adminControler.js'
import upload from '../midlewares/multer.js'
import authAdmin from '../midlewares/authAdmin.js'
import { changeAvailability } from '../controlers/doctorControler.js'

const adminRouter = express.Router()

adminRouter.post('/add-doctor', authAdmin, upload.single('image'), addDoctor)
adminRouter.post('/login',loginAdmin)
adminRouter.post('/all-doctors', authAdmin,allDoctors)
adminRouter.post('/change-availability', authAdmin,changeAvailability)
adminRouter.get('/appointements', authAdmin,appointementsAdmin)
adminRouter.post('/cancel-appointement', authAdmin,appointementCancel)
adminRouter.get('/dashboard', authAdmin,adminDashboard)

export default adminRouter;
