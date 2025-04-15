import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translations";
import "../../styles/ProfilePage.css";
import Loader from "../../components/General/Loader";
import { Outlet, NavLink, useNavigate } from "react-router-dom";

const SidebarLayout = () => {
  const navigate = useNavigate();
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const [isLoading, setIsLoading] = useState(true); // ⬅️ Add loading state
  const token = localStorage.getItem("token");

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
        setIsLoading(false); // ⬅️ Token is valid
      } catch (error) {
        console.error("Authentication failed:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    verifyToken();
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (isLoading) {
    return <Loader/> // ⬅️ Show loading or spinner
  }

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
