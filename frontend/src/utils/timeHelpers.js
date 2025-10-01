

const TIME_APIS = [
  "https://worldtimeapi.org/api/timezone/Africa/Casablanca",
  "https://www.timeapi.io/api/Time/current/zone?timeZone=Africa/Casablanca",
  "https://worldclockapi.com/api/json/cet/now"
];

export const fetchMoroccoTime = async () => {
  for (const url of TIME_APIS) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeout);
      if (!res.ok) throw new Error("Failed to fetch time");

      const data = await res.json();
      if (data.datetime) return new Date(data.datetime);
      if (data.dateTime) return new Date(data.dateTime);
      if (data.currentDateTime) return new Date(data.currentDateTime);
    } catch (err) {
      console.warn(`API failed (${url}):`, err.message);
    }
  }
  return new Date(); // fallback
};
