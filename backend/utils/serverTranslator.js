import axios from "axios";

export const translateServerText = async (text, targetLang) => {
  try {
    const response = await axios.get("https://translate.googleapis.com/translate_a/single", {
      params: {
        client: "gtx",
        sl: "auto",
        tl: targetLang,
        dt: "t",
        q: text,
      },
    });
    return response.data[0][0][0];
  } catch (err) {
    console.error("Backend translation failed:", err.message);
    return text;
  }
};
