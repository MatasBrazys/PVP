import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translations";
import '../../styles/Home.css';

const BottomHeader = () => {
    const { language } = useContext(LanguageContext);
  return (
    <div className="bottom-header-container">
      <div className="bottom-header-header-text">
        {translations[language].bottomHeaderText}
      </div>
      <div className="bottom-header-button-container">
        <button className="bottom-header-button">{translations[language].heroButton}</button>
      </div>
    </div>
  );
};

export default BottomHeader;
