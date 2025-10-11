import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/mongoDb.js";
import connectCloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRoute from "./routes/userRoute.js";
import translateRoutes from "./routes/translateRoutes.js";
import timeRoutes from "./routes/time.js";
import "./jobs/emailReminder.js";

const app = express();
const port = process.env.PORT || 4000;

connectDB();
connectCloudinary();

app.use(express.json());

// ✅ إعداد CORS الصحيح
const allowedOrigins = [
  "http://localhost:5173",
  "https://booking-appointment-systeme-mern-stack-213w-f9mhn3jln.vercel.app",
  "https://booking-appointment-systeme-mern-stack-p1yr6kd8v.vercel.app",
  "https://booking-appointment-systeme-mern-st.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ Routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRoute);
app.use("/api/translate", translateRoutes);
app.use("/api/time", timeRoutes);

// ✅ Root Route
app.get("/", (req, res) => {
  res.send("Backend Working ✅");
});

// ✅ Start Server
app.listen(port, () => console.log(`Server running on port ${port}`));
