import React from "react";
import "../styles/Home.css";

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <img src={require("../images/homePageImage.jpg")} alt="Hero Background" className="hero-image" />

      <div className="hero-content">
        <h1>Paversk savo įgūdžius pranašumu – tobulink savo CV ir atrask savo potencialą.</h1>
        <p>Gauk personalizuotas rekomendacijas, testus ir darbo pasiūlymus</p>
        <a>
        <button className="hero-button">Pabandyk dabar</button>
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
