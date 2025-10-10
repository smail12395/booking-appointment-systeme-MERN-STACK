import { createServer } from 'vercel-node-server';
import express from 'express';
import cors from 'cors';
import userRoute from './routes/userRoute.js';
import translateRoutes from "./routes/translateRoutes.js";
import timeRoutes from "./routes/time.js";
import './jobs/emailReminder.js';
import { connectDB, connectCloudinary } from './config.js';

const app = express();

// connect to DB and Cloudinary
connectDB();
connectCloudinary();

app.use(express.json());
app.use(cors({
  origin: ["https://booking-appointment-systeme-mern-st-iota.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true
}));

app.options("*", cors());

// routes
app.use('/api/user', userRoute)
app.use("/api/translate", translateRoutes);
app.use("/api/time", timeRoutes);

app.get('/', (req,res)=> res.send("Working"));

export default createServer(app);
