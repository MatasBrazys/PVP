import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translations";


const LoadingScreen = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations["en"]; // Fallback to English

  return (
    <div className="loading-screen">
      <h2 className="loading-text">{t.loadingMessage}</h2>
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingScreen;
