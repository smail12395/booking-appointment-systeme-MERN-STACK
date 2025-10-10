// utils/timeHelpers.js
export const fetchMoroccoTime = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/time/morocco-time`);

    if (!res.ok) {
      console.warn("Backend failed, using local device time");
      alert("⚠️ Unable to fetch Morocco time. Using your device time instead.");
      return new Date();
    }

    const data = await res.json();

    if (!data.success) {
      alert("⚠️ Unable to fetch Morocco time. Please check your device clock.");
    }

    return new Date(data.datetime);
  } catch (err) {
    console.error("Fetch error:", err);
    alert("⚠️ Unable to fetch Morocco time. Using your device time instead.");
    return new Date();
  }
};
