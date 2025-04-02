import React, { useState, useContext } from "react";
import "../../styles/PricingPlans.css";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translations";


const Pricing = () => {
  const { language } = useContext(LanguageContext);
  const [selectedPlan, setSelectedPlan] = useState("Monthly");

  // Correcting the way plans are fetched
  const selectedPlans = translations[language].plan[selectedPlan];

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <div className="plan-hero-container">
        <h3 className="plan-hero-subtitle">{translations[language].plansHeroTitle}</h3>
        <h1 className="plan-hero-title">{translations[language].plansHeroSubTitle}</h1>

        {/* Toggle Button Group */}
        <div className="plan-button-group">
          <div
            className={`plan-toggle-background ${selectedPlan === "Annually" ? "plan-slide-left" : "plan-slide-right"}`}
          ></div>
          <button
            className={`plan-toggle-button ${selectedPlan === "Annually" ? "active" : ""}`}
            onClick={() => setSelectedPlan("Annually")}
          >
            {translations[language].planTypeAnnually}
          </button>
          <button
            className={`plan-toggle-button ${selectedPlan === "Monthly" ? "active" : ""}`}
            onClick={() => setSelectedPlan("Monthly")}
          >
            {translations[language].planTypeMonth}
          </button>
        </div>
      </div>

      {/* Pricing Section */}
      <div key={selectedPlan} className="pricing-container fade-effect">
        {selectedPlans.map((plan, index) => (
          <div className="pricing-card" key={index}>
            <h2 className="plan-name">{plan.name}</h2>
            <p className="plan-price">{plan.price}</p>
            <hr className="plan-divider"></hr>
            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i}>
                  <img src={require("../../images/check.png")} alt="check" className="plan-check-icon" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="plan-footer">
              <button className="plan-button">{translations[language].planButton}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


export default Pricing;
