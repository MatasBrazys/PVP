import React, { useState } from "react";
import "../styles/Header.css";
import logo from "../images/logo CareerCompass.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="header">
      <div className="logo-container">
        <a href="#"><img src={logo} alt="CareerCompass Logo" className="logo" /></a>
      </div>

      {/* Hamburger Menu */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Navigation Links */}
      <div className="nav-links">
        <a href="#" className="nav-item">Pagrindinis</a>
        <a href="#" className="nav-item">Planai</a>
        <a href="#kontaktai" className="nav-item">Kontaktai</a>
      </div>

      {/* Account Button */}
      <div className="account-button">
        <a href="#" className="account-button-text">Mano paskyra</a>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <a href="#" className="nav-item" onClick={() => setMenuOpen(false)}>Pagrindinis</a>
        <a href="#" className="nav-item" onClick={() => setMenuOpen(false)}>Planai</a>
        <a href="#" className="nav-item" onClick={() => setMenuOpen(false)}>Kontaktai</a>
        <a href="#" className="nav-item" onClick={() => setMenuOpen(false)}>Mano paskyra</a>
      </div>
    </div>
  );
};

export default Header;
