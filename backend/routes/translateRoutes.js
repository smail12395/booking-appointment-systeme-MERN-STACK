import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/", async (req, res) => {
  const { text, targetLang } = req.body;
  try {
    // Example: Google Translate free unofficial API
    const response = await axios.get("https://translate.googleapis.com/translate_a/single", {
      params: {
        client: "gtx",
        sl: "auto",
        tl: targetLang,
        dt: "t",
        q: text,
      },
    });

    const translatedText = response.data[0][0][0];
    res.json({ translatedText });
  } catch (err) {
    console.error("Translation API error:", err.message);
    res.json({ translatedText: text }); // fallback
  }
});

export default router;
