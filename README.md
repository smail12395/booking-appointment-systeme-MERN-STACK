# MERN Project

This project contains:
- `frontend/` React app
- `backend/` Express server with MongoDB
- `admin/` Admin dashboard

## Setup
1. Clone repo
2. Run `npm install` in each folder
3. install vite tailwind => `npm install -D tailwindcss@3.4.15 postcss autoprefixer` and then `npx tailwindcss init -p`
4. Add `.env` files in backend and frontend (not included in repo)
5. Start backend: `npm run server`
6. 4. Start frontend: `npm run dev`
7. Start frontend/admin: `npm run dev`


📧 Email Reminder Setup

This document explains how to set up and use the Email Reminder Worker in this project so patients receive appointment reminders with the App/Clinic name as the sender.

🔹 1. Install Dependencies

Make sure nodemailer, luxon, and node-cron are installed in the backend.

These handle email sending, time management, and scheduling.

🔹 2. Configure Environment Variables

Inside your .env file, add the following values:

EMAIL_HOST → Your SMTP provider (e.g., smtp.gmail.com)

EMAIL_PORT → Usually 465 (secure) or 587 (TLS)

EMAIL_USER → The email address you’ll send from

EMAIL_PASS → App password (not your personal password)

EMAIL_FROM → How the sender name appears (e.g. Doctor Clinic <yourappemail@example.com>)

This ensures emails come from your App/Clinic name, not a random Gmail username.

🔹 3. How the Worker Runs

The Email Reminder Worker checks today’s appointments.

If a patient has an appointment, they’ll receive a reminder email.

The sender line will show your App/Clinic name.

🔹 4. Scheduling Options

By default, reminders run at 08:00 AM every day.

You can change the schedule using cron expressions.

Example: every hour, or once daily in the morning.

🔹 5. Manual Testing

There’s a test endpoint (/test-reminder) available.

Visiting it will trigger the reminder worker immediately.

Use this to confirm emails are working before going live.

🔹 6. Deployment Notes

For production, use a domain email (info@yourclinic.com) for professional branding instead of a Gmail.

Make sure your hosting allows outbound SMTP connections.
