import React, { useState, useEffect } from "react";
import "../../styles/ResultsPage.css";

const recommendations = [
  "Perfrazuokite patirtį pabrėžiant pasiekimus, o ne užduotis.",
  "Pridėkite sertifikatus, susijusius su web development (React, Node.js).",
  "Pridėkite daugiau išsamių projektų, kurie atspindėtų jūsų techninius įgūdžius.",
  "Paryškinkite svarbiausius pasiekimus – Naudokite aiškius ir konkrečius rodiklius, pvz., „Padidinau svetainės našumą 30% optimizuodamas React komponentus“.",
  "Optimizuokite formatavimą – Naudokite aiškią hierarchiją (antraštės, punktai), kad darbdavys greitai rastų svarbiausią informaciją.",
  "Įtraukite atitinkamus raktažodžius – Pridėkite terminus, kuriuos dažniausiai naudoja darbdaviai jūsų srityje, kad CV būtų lengviau randamas automatizuotose sistemose."
];

const CVRecommendations = ({ fileUrl }) => {
  const [cvUrl, setCvUrl] = useState(localStorage.getItem("cvUrl") || fileUrl);

  useEffect(() => {
    if (fileUrl) {
      localStorage.setItem("cvUrl", fileUrl);
      setCvUrl(fileUrl);
    }
  }, [fileUrl]);

  return (
    <div className="cv-recommendations-container">
      <h1 className="cv-recommendations-title">CV tobulinimo rekomendacijos</h1>
      <div className="cv-recommendations-content">
        {cvUrl ? (
          <div className="pdf-container">
            <iframe
              src={`${cvUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              title="PDF Viewer"
            />
          </div>
        ) : (
          <p>PDF nerastas. Įkelkite failą.</p>
        )}
        <div className="cv-recommendations-list">
          {recommendations.map((rec, index) => (
            <div key={index} className="cv-recommendation-card">
              <img src={require("../../images/check.png")} className="cv-recommendation-checkbox" alt="check" />
              <p className="cv-recommendation-text">{rec}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CVRecommendations;
