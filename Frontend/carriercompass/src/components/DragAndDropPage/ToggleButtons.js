import React from "react";

const ToggleButtons = ({ activeButton, setActiveButton }) => (
    <div className="button-group">
      <div className={`toggle-background ${activeButton === "it-job" ? "slide-right" : "slide-left"}`}></div>
      <button
        onClick={() => setActiveButton("it-job")} // Nebesetinam showDropdown
        className={`toggle-button ${activeButton === "it-job" ? "active" : ""}`}
      >
        Select IT Job
      </button>
      <button
        onClick={() => setActiveButton("general")}
        className={`toggle-button ${activeButton === "general" ? "active" : ""}`}
      >
        General
      </button>
    </div>
  );
  
  export default ToggleButtons;  