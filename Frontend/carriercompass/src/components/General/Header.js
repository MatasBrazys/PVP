import React, { useState, useEffect, useRef } from "react";
import "../../styles/Header.css";
import logo from "../../images/logo CareerCompass.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  // Detect scroll and change background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className={`header-container ${scrolled ? "scrolled" : ""}`}>
      <div className="header">
        <div className="logo-container">
          <a href="/">
            <img src={logo} alt="CareerCompass Logo" className="logo" />
          </a>
        </div>

        {/* Hamburger Menu */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>

        {/* Navigation Links (Desktop) */}
        <div className="nav-links">
          <a href="/" className="nav-item">Pagrindinis</a>
          <a href="/Plan" className="nav-item">Planai</a>
          <a href="#kontaktai" className="nav-item">Kontaktai</a>
          <a href="/dragAndDrop" className="nav-item">Tool</a>
        </div>

        {/* Account Button (Desktop) */}
        <div className="account-button">
          <a href="/login" className="account-button-text">Mano paskyra</a>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`} ref={menuRef}>
          <a href="/" className="nav-item" onClick={() => setMenuOpen(false)}>Pagrindinis</a>
          <a href="/Plan" className="nav-item" onClick={() => setMenuOpen(false)}>Planai</a>
          <a href="#kontaktai" className="nav-item" onClick={() => setMenuOpen(false)}>Kontaktai</a>
          <a href="/dragAndDrop" className="nav-item" onClick={() => setMenuOpen(false)}>Tool</a>
          <a href="#" className="nav-item" onClick={() => setMenuOpen(false)}>Mano paskyra</a>
        </div>
      </div>
    </div>
  );
};

export default Header;
