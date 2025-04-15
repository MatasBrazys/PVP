import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translations";
import Loader from "../../components/General/Loader";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";

const CVRecommendationsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-pen-icon sidebar-icons">
    <path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
    <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
    <circle cx="10" cy="7" r="4" />
  </svg>
);

const CaseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-briefcase-icon sidebar-icons">
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>
);

const BooksIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-copy-icon sidebar-icons">
    <path d="M2 16V4a2 2 0 0 1 2-2h11" />
    <path d="M22 18H11a2 2 0 1 0 0 4h10.5a.5.5 0 0 0 .5-.5v-15a.5.5 0 0 0-.5-.5H11a2 2 0 0 0-2 2v12" />
    <path d="M5 14H4a2 2 0 1 0 0 4h1" />
  </svg>
);

const ResultsPage = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [isLoading, setIsLoading] = useState(true); // ⬅️ Add loading state
  const token = localStorage.getItem("token");
  // Navigate to default tab on first visit to /results
  useEffect(() => {
    if (location.pathname === "/results") {
      navigate("/results/CVRecommendationsPage");
    }
  }, [location.pathname, navigate]);
  // useEffect(() => {

  //   const verifyToken = async () => {
  //     if (!token) {
  //       navigate("/login");
  //       return;
  //     }

  //     try {
  //       const response = await fetch(`http://localhost:8000/user/verify-token/${token}`);
  //       if (!response.ok) {
  //         throw new Error("Invalid token");
  //       }
  //       setIsLoading(false); // ⬅️ Token is valid
  //     } catch (error) {
  //       console.error("Authentication failed:", error);
  //       localStorage.removeItem("token");
  //       navigate("/login");
  //     }
  //   };

  //   verifyToken();
  // }, [navigate, token]);


  // if (isLoading) {
  //   return <Loader /> // ⬅️ Show loading or spinner
  // }
  return (
    <div className="result-page-container">
      {/* Sidebar */}
      <div className={`result-page-sidebar ${isSidebarOpen ? "result-page-open" : "result-page-closed"}`}>
        <div className={`sidebar-toggle-container ${isSidebarOpen ? "" : "sidebar-closed-icons"}`}>
          <button className="result-page-toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? "«" : "»"}
          </button>

          {!isSidebarOpen && window.innerWidth <= 768 && (
            <div className="sidebar-icons">
              <CVRecommendationsIcon onClick={() => navigate("/results/CVRecommendationsPage")} />
              <CaseIcon onClick={() => navigate("/results/JobsPage")} />
              <BooksIcon onClick={() => navigate("/results/Courses")} />
            </div>
          )}
        </div>

        <nav className={isSidebarOpen ? "" : "hidden"}>
          <ul>
            <li>
              <NavLink to="/results/CVRecommendationsPage" className={({ isActive }) => (isActive ? "active" : "")}>
                <div className="sidebar-item-content">
                  <CVRecommendationsIcon />
                  {isSidebarOpen && <span>{t.CVRecommendationsTitle}</span>}
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/results/JobsPage" className={({ isActive }) => (isActive ? "active" : "")}>
                <div className="sidebar-item-content">
                  <CaseIcon />
                  {isSidebarOpen && <span>{t.jobNavTitle}</span>}
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/results/Courses" className={({ isActive }) => (isActive ? "active" : "")}>
                <div className="sidebar-item-content">
                  <BooksIcon />
                  {isSidebarOpen && <span>{t.courseRecommendationsTitle}</span>}
                </div>
              </NavLink>
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