export const fetchMoroccoTime = async () => {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/time/morocco-time`);
    const data = await res.json();
    if (data.success && data.datetime) return new Date(data.datetime);
  } catch (err) {
    console.warn("Failed to fetch Morocco time from server:", err.message);
  }

  return new Date(); // fallback to client time
};