import React, { useState } from "react";
import "../../styles/PricingPlans.css";

const plans = {
  Monthly: [
    {
      name: "Free",
      price: "0.00€",
      features: [
        "2 kreditai per mėnesį",
        "Pagrindinė CV analizė (tik 1 CV analizė)",
        "Bendros rekomendacijos (be personalizacijos)",
        "Nėra prieigos prie mokymų",
        "Nėra prieigos prie darbo pasiūlymų",
      ],
    },
    {
      name: "Basic",
      price: "15.00€",
      features: [
        "100 kreditai per mėnesį",
        "5 išplėstinės CV analizės",
        "Personalizuotos rekomendacijos (ribota)",
        "Prieiga prie 5 pasirinktų mokymų",
        "20 darbo pasiūlymų per mėnesį",
      ],
    },
    {
      name: "Pro",
      price: "25.00€",
      features: [
        "500 kreditų per mėnesį",
        "Neribota CV analizė",
        "Neribotos personalizuotos mokymų rekomendacijos",
        "Prieiga prie 10 pasirinktų mokymų",
        "Prieiga prie realaus laiko darbo pasiūlymų",
      ],
    },
  ],
  Annually: [
    {
      name: "Free",
      price: "0.00€",
      features: [
        "2 kreditai per mėnesį",
        "Pagrindinė CV analizė (tik 1 CV analizė)",
        "Bendros rekomendacijos (be personalizacijos)",
        "Nėra prieigos prie mokymų",
        "Nėra prieigos prie darbo pasiūlymų",
      ],
    },
    {
      name: "Basic",
      price: "150.00€",
      features: [
        "100 kreditai per mėnesį",
        "5 išplėstinės CV analizės",
        "Personalizuotos rekomendacijos (ribota)",
        "Prieiga prie 5 pasirinktų mokymų",
        "20 darbo pasiūlymų per mėnesį",
      ],
    },
    {
      name: "Pro",
      price: "250.00€",
      features: [
        "500 kreditų per mėnesį",
        "Neribota CV analizė",
        "Neribotos personalizuotos mokymų rekomendacijos",
        "Prieiga prie 10 pasirinktų mokymų",
        "Prieiga prie realaus laiko darbo pasiūlymų",
      ],
    },
  ],
};

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("Monthly");

  return (
    <div className="pricing-page">
      <div className="plan-hero-container">
        <h3 className="plan-hero-subtitle">AI Tool Planai</h3>
        <h1 className="plan-hero-title">Pasirink sau tinkamą planą</h1>

        {/* Toggle Button Group */}
        <div className="plan-button-group">
          <div
            className={`plan-toggle-background ${
              selectedPlan === "Annually" ? "plan-slide-left" : "plan-slide-right"
            }`}
          ></div>
          <button
            className={`plan-toggle-button ${selectedPlan === "Annually" ? "active" : ""}`}
            onClick={() => setSelectedPlan("Annually")}
          >
            Annually
          </button>
          <button
            className={`plan-toggle-button ${selectedPlan === "Monthly" ? "active" : ""}`}
            onClick={() => setSelectedPlan("Monthly")}
          >
            Monthly
          </button>
        </div>
      </div>

      {/* Pricing Cards Section */}
      <div className="pricing-container">
        {plans[selectedPlan].map((plan, index) => (
          <div className="pricing-card" key={index}>
            <h2 className="plan-name">{plan.name}</h2>
            <p className="plan-price">{plan.price}</p>
            <ul className="plan-features">
              {plan.features.map((feature, i) => (
                <li key={i}>
                  <img src="https://placehold.co/30x30" alt="check" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
