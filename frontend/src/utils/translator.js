export const translateText = async (text, targetLang) => {
  if (!text) return "";
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/translate`, {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, targetLang }),
    });
    const data = await res.json();
    return data.translatedText || text;
  } catch (err) {
    console.error("Translation failed:", err);
    return text;
  }
};
