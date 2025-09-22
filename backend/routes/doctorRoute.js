import express from 'express';
import { doctorList, loginDoctor, appointementsDoctor, appointementCancel, appointementComplete,doctorDashboard,doctorProfile, updateDoctorProfile } from '../controlers/doctorControler.js';
import authDoctor from '../midlewares/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.get('/list', doctorList);
doctorRouter.post('/login', loginDoctor);
doctorRouter.get('/appointements', authDoctor, appointementsDoctor);
doctorRouter.post('/complete-appointement', authDoctor, appointementComplete);
doctorRouter.post('/cancel-appointement', authDoctor, appointementCancel);
doctorRouter.get('/dashboard', authDoctor, doctorDashboard);
doctorRouter.get('/profile', authDoctor, doctorProfile);
doctorRouter.post('/update-profile', authDoctor, updateDoctorProfile);

export default doctorRouter;
