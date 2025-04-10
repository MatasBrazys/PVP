import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translations";
import "../../styles/ProfilePage.css";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const SidebarLayout = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`http://localhost:8000/user/verify-token/${token}`);
        if (!response.ok) {
          throw new Error("Invalid token");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        localStorage.removeItem("token");
        navigate("/login");
      } finally {

      }
    };

    verifyToken();
  }, [navigate, token]);



  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-sidebar">
          <h2 className="profile-top-section">{t.navTitle}</h2>
          <nav className="profile-nav">
            <NavLink to="/profile/user-data" className="profile-title-section">{t.myData}</NavLink>
            <NavLink to="/profile/edit-profile" className="profile-title-section">{t.editProfile}</NavLink>
            <NavLink to="/profile/billing" className="profile-title-section">{t.payments}</NavLink>
          </nav>
          <button className="logout-button" onClick={handleLogout}>
            {t.logout}
          </button>
        </div>
        <div className="profile-main-content">
          <div className="profile-content-wrapper">
            <Outlet /> {/* Protected child routes */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarLayout;
