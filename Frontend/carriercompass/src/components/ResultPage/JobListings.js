import React from "react";
import "../../styles/ResultsPage.css";


const jobs = [
    {
      image: "https://placehold.co/64",
      title: "Front-end programuotojas",
      description: "Kuriame modernias, interaktyvias ir patogias vartotojo sąsajas.",
      location: "Vilnius",
      link: "https://example.com/job1",
    },
    {
      image: "https://placehold.co/64",
      title: "Back-end programuotojas",
      description: "Darbas su serverio pusės logika ir duomenų bazėmis.",
      location: "Kaunas",
      link: "https://example.com/job2",
    },
];

const JobCard = ({ job }) => {
    return (
      <div className="job-card-custom full-width">
        <img
          src={job.image}
          alt={job.title}
          className="job-image-custom"
        />
        <div className="job-info-custom">
          <h2 className="job-title-custom">{job.title}</h2>
          <p className="job-description-custom">{job.description}</p>
        </div>
        <div className="job-action-custom">
          <p className="job-location-custom">{job.location}</p>
          <a
            href={job.link}
            target="_blank"
            rel="noopener noreferrer"
            className="job-button-custom"
          >
            Peržiūrėti
          </a>
        </div>
      </div>
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
    
  return (<div className="job-container">
  <h2 className="job-container-title">Rezultatai</h2>
  <JobList jobs={jobs} />
</div>)
};

export default ResultsPage;
