import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translations";
import "../../styles/ResultsPage.css";
const jobs = [
  {
    title: "Frontend Developer",
    match: 87,
    description:
      "Jūsų stiprios HTML, CSS ir React žinios kartu su patirtimi kuriant vartotojo sąsajas leidžia jums lengvai prisitaikyti prie šios pozicijos.",
  },
  {
    title: "Full Stack Developer",
    match: 82,
    description:
      "Jūs turite patirties tiek su backend (C#, Java), tiek su frontend technologijomis, o tai leidžia jums kurti pilnai funkcionalias sistemas.",
  },
  {
    title: "Data Analyst",
    match: 75,
    description:
      "Jūsų geras MySQL pagrindų supratimas ir analitinis mąstymas leidžia dirbti su dideliais duomenų rinkiniais.",
  },
  {
    title: "Software Engineer",
    match: 73,
    description:
      "Jūsų geri algoritmų ir duomenų struktūrų pagrindai bei stiprūs problemų sprendimo įgūdžiai leidžia jums efektyviai kurti programinę įrangą.",
  },
  {
    title: "IT Support Specialist",
    match: 70,
    description:
      "Jūsų geri techninės pagalbos įgūdžiai ir gebėjimas diagnozuoti bei spręsti problemas leidžia jums efektyviai padėti vartotojams.",
  },
];

const JobCard = ({ title, match, description }) => {
  const { language } = useContext(LanguageContext);
  const t = translations[language]; // Get translations for the selected language
  return (
    <div className="job-card-unique">
      <h2>{title}</h2>
      <p className="match-unique">{t.Matching}: {match}%</p>
      <div className="progress-container-unique">
        <div className="progress-bar-unique">
          <div className="progress-unique" style={{ width: `${match}%` }}></div>
        </div>
      </div>
      <p className="description-unique">{description}</p>
    </div>
  );
};


export default function JobMatch() {
  const { language } = useContext(LanguageContext);
  const t = translations[language]; // Get translations for the selected language
  return (
    <div className="container-unique">
      <h1>{t.top5JobsTitle}</h1>
      <div className="job-list-unique">
        {jobs.map((job, index) => (
          <JobCard key={index} {...job} />
        ))}
      </div>
    </div>
  );
}
