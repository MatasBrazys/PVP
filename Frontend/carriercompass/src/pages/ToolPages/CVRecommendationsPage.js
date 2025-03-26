import React from "react";
import { useLocation } from "react-router-dom";
import CVRecommendations from "../../components/ResultPage/CV-recommendations";

const CVRecommendationsPage = () => {
  const location = useLocation();
  const fileUrl = location.state?.fileUrl || localStorage.getItem("fileUrl"); // Gauti iš localStorage


  return (
    <div>
      <CVRecommendations fileUrl={fileUrl} />
     
    </div>
    
  );
};

export default CVRecommendationsPage;
