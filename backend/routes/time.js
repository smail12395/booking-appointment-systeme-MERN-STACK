// backend/routes/time.js
import express from "express";
import fetch from "node-fetch"; // if Node < 18
const router = express.Router();

const TIME_APIS = [
  "https://worldtimeapi.org/api/timezone/Africa/Casablanca",
  "https://www.timeapi.io/api/Time/current/zone?timeZone=Africa/Casablanca",
  "https://timeapi.io/api/TimeZone/zone?timeZone=Africa/Casablanca"
];

router.get("/morocco-time", async (req, res) => {
  for (const url of TIME_APIS) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);

      if (!response.ok) throw new Error(`Failed with ${response.status}`);

      const data = await response.json();
      const dateTimeStr = data.datetime || data.dateTime || data.currentDateTime;

      if (dateTimeStr) {
        return res.json({ success: true, datetime: dateTimeStr });
      }
    } catch (err) {
      console.warn(`Time API failed (${url}):`, err.message);
    }
  }

  // All APIs failed → fallback to server's local time
  return res.json({
    success: false,
    datetime: new Date().toISOString(),
    message:
      "Unable to fetch official Morocco time. Falling back to server time."
  });
});

export default router;
