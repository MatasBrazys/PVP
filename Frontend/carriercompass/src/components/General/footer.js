import React from "react";
import "../../styles/Footer.css";
import logo2 from "../../images/logo CareerCompass white.svg";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* AI TOOL Section */}
        <div className="footer-section">
          <div className="logo-container2">
            <a href="/"><img src={logo2} alt="CareerCompass Logo2" className="logo2" /></a>
            </div>
        </div>

        {/* Pagalba Section */}
        <div className="footer-section">
          <div className="footer-title">Pagalba</div>
          <ul className="footer-list">
            <li><a href="#">Planai</a></li>
            <li><a href="#">Privatumo politika</a></li>
            <li><a href="#">Slapukų politika</a></li>
          </ul>
        </div>

        {/* Kontaktai Section */}
        <div className="footer-section"id="kontaktai">
          <div className="footer-title">Kontaktai</div>
          <p className="footer-text-conntact"><strong>Adresas:</strong> Laisvės al. 12, Kaunas</p>
          <p className="footer-text-conntact"><strong>Telefonas:</strong> +370 612 34567</p>
          <p className="footer-text-conntact"><strong>El. paštas:</strong> info@puslapis.lt</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
