import React from "react";
import "../../styles/ResultsPage.css";

const recommendations = [
  {
    title: "React – The Complete Guide",
    subtitle: "Video",
    image: "https://placehold.co/100x100",
    link: "https://example.com/video1"
  },
  {
    title: "SQL for Data Science",
    subtitle: "Kursas",
    image: "https://placehold.co/100x100",
    link: "https://example.com/video2"
  },
  {
    title: "LeetCode – Algorithms Challenges",
    subtitle: "Užduotys",
    image: "https://placehold.co/100x100",
    link: "https://example.com/video3"
  },
  {
    title: "Python",
    subtitle: "Kursas",
    image: "https://placehold.co/100x100",
    link: "https://example.com/video4"
  }
];

const ResultsPage = () => {
  return (
    <div className="learning-results-container">
      <h2 className="learning-results-title">Mokymosi rekomendacijos</h2>
      <div className="learning-cards-wrapper">
        {recommendations.map((rec, index) => (
          <div key={index} className="learning-card">
            <img src={rec.image} alt={rec.title} className="learning-card-image" />
            <h3 className="learning-card-title">{rec.title}</h3>
            <p className="learning-card-subtitle">{rec.subtitle}</p>
            <a href={rec.link} target="_blank" rel="noopener noreferrer" className="learning-card-button">
              Peržiūrėti
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsPage;