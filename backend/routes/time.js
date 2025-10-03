// backend/routes/time.js
import express from "express";
import fetch from "node-fetch"; // if Node.js < 18, otherwise built-in fetch
const router = express.Router();

const TIME_APIS = [
  "https://worldtimeapi.org/api/timezone/Africa/Casablanca",
  "https://www.timeapi.io/api/Time/current/zone?timeZone=Africa/Casablanca",
  "https://worldclockapi.com/api/json/cet/now"
];

router.get("/morocco-time", async (req, res) => {
  for (const url of TIME_APIS) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);

      if (!response.ok) throw new Error("Failed to fetch time");
      const data = await response.json();

      let dateTimeStr = data.datetime || data.dateTime || data.currentDateTime;
      if (!dateTimeStr) continue;

      return res.json({ success: true, datetime: dateTimeStr });
    } catch (err) {
      console.warn(`API failed (${url}):`, err.message);
    }
  }

  // fallback to server time
  return res.json({ success: true, datetime: new Date().toISOString() });
});

export default router;
