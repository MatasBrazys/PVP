import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const ResultsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    if (location.pathname === "/results") {
      navigate("/results/CVRecommendationsPage");
    }
  }, [location.pathname, navigate]);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="result-page-container">
      {/* Sidebar */}
      <div className={`result-page-sidebar ${isSidebarOpen ? "result-page-open" : "result-page-closed"}`}>
        <div className={`sidebar-toggle-container ${isSidebarOpen ? "" : "sidebar-closed-icons"}`}>
          <button
            className="result-page-toggle-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? "«" : "»"}
          </button>

          {!isSidebarOpen && window.innerWidth <= 768 && (
            <div className="sidebar-icons">
              <img src="https://placehold.co/30x30" alt="CV" onClick={() => handleNavigation("/results/CVRecommendationsPage")} />
              <img src="https://placehold.co/30x30" alt="Jobs" onClick={() => handleNavigation("/results/JobsPage")} />
              <img src="https://placehold.co/30x30" alt="Courses" onClick={() => handleNavigation("/results/Courses")} />
            </div>
          )}
        </div>

        <nav className={isSidebarOpen ? "" : "hidden"}>
          <ul>
            <li onClick={() => handleNavigation("/results/CVRecommendationsPage")}>
              <div className="sidebar-item-content">
                <img src="https://placehold.co/30x30" alt="CV" />
                {isSidebarOpen && <span>CV Tobulinimo rekomendacijos</span>}
              </div>
            </li>
            <li onClick={() => handleNavigation("/results/JobsPage")}>
              <div className="sidebar-item-content">
                <img src="https://placehold.co/30x30" alt="Jobs" />
                {isSidebarOpen && <span>Tinkamiausi darbai ir darbo pasiūlymai</span>}
              </div>
            </li>
            <li onClick={() => handleNavigation("/results/Courses")}>
              <div className="sidebar-item-content">
                <img src="https://placehold.co/30x30" alt="Courses" />
                {isSidebarOpen && <span>Kursai ir mokymo medžiaga</span>}
              </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="result-page-main-content">
        <Outlet />
      </div>
    </div>
  );
};


export default ResultsPage;
