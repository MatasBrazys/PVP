import React from "react";

const ResultsDisplay = ({ analysis, onGoBack }) => (
  <div className="results-section">
    <h2>Results</h2>
    <p>Your CV has been successfully processed!</p>
    {analysis && <textarea className="result-textarea">{analysis}</textarea>}
    <button className="go-back-button" onClick={onGoBack}>Go Back</button>
  </div>
);

export default ResultsDisplay;
