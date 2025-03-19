import React, { useEffect } from "react";
import "../../styles/Home.css";

const HeroSection = () => {
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
        <h1>Paversk savo įgūdžius pranašumu – tobulink savo CV ir atrask savo potencialą.</h1>
        <p>Gauk personalizuotas rekomendacijas, testus ir darbo pasiūlymus</p>
        <button className="hero-button">Pabandyk dabar</button>
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