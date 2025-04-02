import React, { useContext,useEffect } from "react";
import "../../styles/Home.css";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translations";


const HeroSection = () => {
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    const particles = document.querySelector(".particles");
    for (let i = 0; i < 30; i++) {
      let particle = document.createElement("div");
      particle.className = "particle";
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDuration = `${2 + Math.random() * 3}s`;
      particles.appendChild(particle);
    }
  }, []);

  return (
    <div className="hero-section">
      {/* Animated Background */}
      <div className="animated-bg"></div>
      <div className="particles"></div>

      <div className="hero-content">
        <h1>{translations[language].heroTitle}</h1>
        <p>{translations[language].heroDescription}</p>
        <button className="hero-button">{translations[language].heroButton}</button>
      </div>

      {/* Right Side 3D Animated CV Document */}
      <div className="hero-graphic">
        <div className="cv-document">
          <div className="cv-header"></div>
          <div className="cv-line"></div>
          <div className="cv-line"></div>
          <div className="cv-line"></div>
          <div className="cv-footer"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;