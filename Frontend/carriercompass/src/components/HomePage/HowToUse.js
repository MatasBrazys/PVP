import React from "react";
import "../../styles/Home.css";
import UploadPurple from "../../images/UploadPurple.png";
import Brains from "../../images/brain-circuit.png";
import Assessment from "../../images/assessment.png";
import Job from "../../images/business-growth.png";

const steps = [
    {
      id: 1,
      title: "Įkelkite savo CV",
      description: "Drag-and-drop arba pasirinkite failą, kurį norite analizuoti.",
      image: UploadPurple,
    },
    {
      id: 2,
      title: "Gaukite personalizuotas rekomendacijas",
      description: "Sistema analizuoja jūsų CV ir pateikia 5 sritis, kuriose galite tobulėti.",
      image: Brains,
    },
    {
      id: 3,
      title: "Pasirinkite norimą tobulėjimo sritį ar darbą",
      description: "Išsirinkite, kur norite tobulėti – sritį arba pasirinkite dominančią darbo poziciją.",
      image: Assessment,
    },
    {
      id: 4,
      title: "Atraskite rekomendacijas ir darbo pasiūlymus",
      description: "Sistema pateikia personalizuotas mokymų rekomendacijas (video, užduotys), taip pat darbo skelbimus, atitinkančius jūsų tikslus.",
      image: Job,
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