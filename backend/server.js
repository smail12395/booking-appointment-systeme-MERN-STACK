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

// ✅ 1. استخدم regex يسمح بأي subdomain من vercel.app
app.use(
  cors({
    origin: [
      /\.vercel\.app$/, // أي نطاق فرعي من vercel.app
      "https://booking-appointment-systeme-mern-st.vercel.app",
      "http://localhost:5173", // في حال التجربة محليًا
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);


// ✅ 3. Routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRoute);
app.use("/api/translate", translateRoutes);
app.use("/api/time", timeRoutes);

// ✅ 5. Root
app.get("/", (req, res) => {
  res.send("Working ✅");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
