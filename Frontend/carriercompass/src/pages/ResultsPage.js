import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CVRecommendations from "../components/ResultPage/CV-recommendations";
import ResultsSection from "../components/DragAndDropPage/ResultsDisplay";

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fileUrl, analysis } = location.state || {};
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  const handleGoBack = () => {
    navigate("/dragAndDrop");
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsSidebarOpen(false); // Close sidebar after selecting
  };

  return (
    <div className="result-page-container">
      {/* Sidebar */}
      <div className={`result-page-sidebar ${isSidebarOpen ? "result-page-open" : "result-page-closed"}`}>
        
        <button
        className="result-page-toggle-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{ color: "#383838" }} // Change color dynamically
      >
        {isSidebarOpen ? "«" : "»"}
        </button>
        <nav>
          <ul>
            <li onClick={() => handleNavigation("/dashboard")}>Dashboard</li>
            <li onClick={() => handleNavigation("/settings")}>Settings</li>
            <li onClick={() => handleNavigation("/profile")}>Profile</li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="result-page-main-content">
 
        
        {analysis ? (
          <ResultsSection analysis={analysis} onGoBack={handleGoBack} />
        ) : (
          <p>No analysis data available.</p>
        )}
        
        {fileUrl ? <CVRecommendations fileUrl={fileUrl} /> : <p>No file URL provided.</p>}
      </div>
    </div>
  );
};

export default ResultPage;
