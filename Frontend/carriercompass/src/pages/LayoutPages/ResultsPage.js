import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
const CVRecommendationsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" 
  width="24" height="24" 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  stroke-width="2" stroke-linecap="round" 
  stroke-linejoin="round" 
  class="lucide lucide-user-pen-icon lucide-user-pen">
    <path d="M11.5 15H7a4 4 0 0 0-4 4v2"/>
    <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>
    <circle cx="10" cy="7" r="4"/></svg>
);
const CaseIcon = () => (

  <svg xmlns="http://www.w3.org/2000/svg" 
  width="24" 
  height="24" 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  stroke-width="2" 
  stroke-linecap="round" 
  stroke-linejoin="round" 
  class="lucide lucide-briefcase-icon lucide-briefcase">
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    <rect width="20" height="14" x="2" y="6" rx="2"/></svg>
);
const BooksIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" 
  width="24" 
  height="24" 
  viewBox="0 0 24 24" 
  fill="none" 
  stroke="currentColor" 
  stroke-width="2" 
  stroke-linecap="round" 
  stroke-linejoin="round" 
  class="lucide lucide-book-copy-icon lucide-book-copy">
    <path d="M2 16V4a2 2 0 0 1 2-2h11"/>
    <path d="M22 18H11a2 2 0 1 0 0 4h10.5a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5H11a2 2 0 0 0-2 2v12"/>
    <path d="M5 14H4a2 2 0 1 0 0 4h1"/></svg>
);
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
              <CVRecommendationsIcon alt="CV" onClick={() => handleNavigation("/results/CVRecommendationsPage")} />
              <CaseIcon src="https://placehold.co/30x30" alt="Jobs" onClick={() => handleNavigation("/results/JobsPage")} />
              <BooksIcon src="https://placehold.co/30x30" alt="Courses" onClick={() => handleNavigation("/results/Courses")} />
            </div>
          )}
        </div>

        <nav className={isSidebarOpen ? "" : "hidden"}>
          <ul>
            <li onClick={() => handleNavigation("/results/CVRecommendationsPage")}>
              <div className="sidebar-item-content">
              <CVRecommendationsIcon  alt="CV"/>

                {isSidebarOpen && <span>CV Tobulinimo rekomendacijos</span>}
              </div>
            </li>
            <li onClick={() => handleNavigation("/results/JobsPage")}>
              <div className="sidebar-item-content">
              <CaseIcon alt="Jobs"/>

                {isSidebarOpen && <span>Tinkamiausi darbai ir darbo pasiūlymai</span>}
              </div>
            </li>
            <li onClick={() => handleNavigation("/results/Courses")}>
              <div className="sidebar-item-content">
              <BooksIcon alt="Courses"/>
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
