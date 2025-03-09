// components/LoadingScreen.js
import React from "react";

const LoadingScreen = () => (
  <div className="loading-screen">
    <h2 className="loading-text">It will take a moment CV is being processed</h2>
    <div className="spinner"></div>
  </div>
);

export default LoadingScreen;