import React from "react";
import "../../styles/Home.css";

const steps = [
    {
      id: 1,
      title: "Įkelkite savo CV",
      description: "Drag-and-drop arba pasirinkite failą, kurį norite analizuoti.",
      image: "https://placehold.co/120x120",
    },
    {
      id: 2,
      title: "Gaukite personalizuotas rekomendacijas",
      description: "Sistema analizuoja jūsų CV ir pateikia 5 sritis, kuriose galite tobulėti.",
      image: "https://placehold.co/120x120",
    },
    {
      id: 3,
      title: "Pasirinkite norimą tobulėjimo sritį ar darbą",
      description: "Išsirinkite, kur norite tobulėti – sritį arba pasirinkite dominančią darbo poziciją.",
      image: "https://placehold.co/120x120",
    },
    {
      id: 4,
      title: "Atraskite rekomendacijas ir darbo pasiūlymus",
      description: "Sistema pateikia personalizuotas mokymų rekomendacijas (video, užduotys), taip pat darbo skelbimus, atitinkančius jūsų tikslus.",
      image: "https://placehold.co/120x120",
    },
  ];
  
  const HowToUse = () => {
    return (
      <div className="how-to-use-container">
        <h1 className="title">Kaip naudotis įrankiu?</h1>
        <div className="timeline">
          <div className="timeline-line"></div>
          {steps.map((step, index) => (
            <div key={step.id} className={`step-container ${index % 2 === 0 ? "left" : "right"}`}>
              <div className="step-content">
                <div className="step-number">{step.id} Žingsnis</div>
                <h2>{step.title}</h2>
                <p>{step.description}</p>
              </div>
              <div className="step-icon">
                <img src={step.image} alt={`Step ${step.id}`} />
              </div>
              <div className="timeline-circle"></div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default HowToUse;