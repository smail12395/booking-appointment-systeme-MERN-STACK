import { useEffect, useState } from "react";
import { translateText } from "../utils/translator.js";

const Translated = ({ text }) => {
  const [translated, setTranslated] = useState(text);

  useEffect(() => {
    const doTranslate = async () => {
      const lang = localStorage.getItem("lang") || "en";
      if (lang === "en") {
        setTranslated(text);
        return;
      }
      const t = await translateText(text, lang);
      setTranslated(t);
    };
    doTranslate();
  }, [text]);

  return <>{translated}</>;
};

export default Translated;
