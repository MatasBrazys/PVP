import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../../styles/JobListingPage.css';
import Loader from "../../components/General/Loader";

const JobListing = () => {
  const { id_Jobs } = useParams(); // <-- get job ID from URL
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await fetch(`http://localhost:8000/jobs/job_listing/${id_Jobs}`);
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Failed to fetch job:", error);
      }
    };

    fetchJob();
  }, [id_Jobs]);

  if (!job) return <div><Loader/> </div>;

  const {
    title,
    image,
    company,
    city,
    salary,
    link,
    description
  } = job;

  return (
    <div className="listing-wrapper">
      <div className="listing-banner-bg"></div>
      <div className="listing-container">
        <div className="listing-header">
          <div className="listing-text">
            <h1 className="listing-title">{title}</h1>
            <div className="listing-subinfo">
              <span className="listing-company">{company}</span>
              <span className="listing-city">{city}</span>
            </div>
            <div className="listing-salary">{salary}</div>
          </div>
          <img src={image} alt={title} className="listing-image" />
        </div>

        <hr className="listing-divider" />

        <div className="listing-description">
          {description.split('\n').map((line, i) => {
            if (line.endsWith(';')) {
              return <li key={i} className="listing-bullet">{line.replace(';', '').trim()}</li>;
            } else if (line.includes('**')) {
              return <p key={i} className="listing-bold">{line.replace(/\*\*/g, '').trim()}</p>;
            } else if (line.trim().length === 0) {
              return <br key={i} />;
            } else {
              return <p key={i}>{line}</p>;
            }
          })}
        </div>

        <div className="listing-button-box">
          <a href={link} className="listing-cta" target="_blank" rel="noopener noreferrer">
            Siųsti CV dabar
          </a>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
