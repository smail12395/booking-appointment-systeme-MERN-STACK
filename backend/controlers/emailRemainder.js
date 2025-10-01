import nodemailer from "nodemailer";
import { DateTime } from "luxon";
import appointementModel from "../models/appointementModel.js";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

async function emailReminderWorker() {
  try {
    console.log("🔄 [EmailReminderWorker] Starting worker...");

    const now = DateTime.now().setZone(process.env.TZ);
    const today = now.toFormat("d/L/yyyy"); 

    console.log(`[EmailReminderWorker] Current date/time: ${now.toISO()}`);
    console.log(`[EmailReminderWorker] Looking for appointments on: ${today}`);

    const appointments = await appointementModel.find({
      slotDate: { $in: [today, now.toFormat("dd/LL/yyyy")] }, 
      cancelled: false,
      isCompleted: false,
      "userData.isReported": { $lt: 4 },
    });

    console.log(`[EmailReminderWorker] Appointments fetched: ${appointments.length}`);

    for (const appt of appointments) {
      try {
        // جرّب أكثر من صيغة للتاريخ
        let appointmentDateTime =
          DateTime.fromFormat(`${appt.slotDate} ${appt.slotTime}`, "d/L/yyyy hh:mm a", {
            zone: process.env.TZ,
          });

        if (!appointmentDateTime.isValid) {
          appointmentDateTime = DateTime.fromFormat(
            `${appt.slotDate} ${appt.slotTime}`,
            "dd/LL/yyyy hh:mm a",
            { zone: process.env.TZ }
          );
        }

        const diffHours = appointmentDateTime.diff(now, "hours").hours;

        if (diffHours > 0 && diffHours <= 3) {
          console.log(
            `[EmailReminderWorker] Sending email to ${appt.userData.name} (${appt.userData.email}) - Appointment in ${diffHours.toFixed(2)} hours`
          );

          await transporter.sendMail({
            from: `${appt.docData.name} <${process.env.FROM_EMAIL}>`,
            to: appt.userData.email,
            subject: "Appointment Reminder",
            text: `Hello ${appt.userData.name}, you have an appointment with Dr. ${appt.docData.name} today at ${appt.slotTime}.`,
          });

          console.log(`[EmailReminderWorker] Email sent successfully to ${appt.userData.email}`);
        } else {
          console.log(
            `[EmailReminderWorker] Skipping appointment at ${appt.slotTime} - Not within 3 hours`
          );
        }
      } catch (err) {
        console.error(`[EmailReminderWorker] Error processing appointment:`, err);
      }
    }

    console.log("🔄 [EmailReminderWorker] Worker finished successfully.\n");
  } catch (error) {
    console.error("[EmailReminderWorker] General error:", error);
  }
}

export default emailReminderWorker;
