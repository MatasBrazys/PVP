import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translations";
import "../../styles/ResultsPage.css";


const jobs = [
    {
      image: "https://placehold.co/64",
      title: "Front-end programuotojas",
      company: "Google",
      location: "Vilnius",
      salary:"3000€",
      link: "https://example.com/job1",
    },
    {
      image: "https://placehold.co/64",
      title: "Back-end programuotojas",
      company: "Skype",
      location: "Kaunas",
      salary:"3000€",
      link: "https://example.com/job2",
    },
];

const JobCard = ({ job }) => {

    return (
      <a href="#"className="job-card-custom full-width">
        <img
          src={job.image}
          alt={job.title}
          className="job-image-custom"
        />
        <div className="job-info-custom">
          <h2 className="job-title-custom">{job.title}</h2>
          <p className="job-company-custom">{job.company}</p>
        </div>
        <div className="job-action-custom">
          <p className="job-location-custom">{job.location}</p>
          <div
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="job-salary-custom"
          >
            {job.salary}
          </div>
        </div>
      </a>
    );
  };
  
  const JobList = ({ jobs }) => {
    return (
      <div className="job-list-custom">
        {jobs.map((job, index) => (
          <JobCard key={index} job={job} />
        ))}
      </div>
    );
  };

const ResultsPage = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language]; // Get translations for the selected language
  return (<div className="job-container">
  <h2 className="job-container-title">{t.results}</h2>
  <JobList jobs={jobs} />
</div>)
};

export default ResultsPage;
