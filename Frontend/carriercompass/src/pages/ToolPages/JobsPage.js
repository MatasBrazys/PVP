import React from "react";
import Top5Jobs from "../../components/ResultPage/Top5Jobs";
import JobList from "../../components/ResultPage/JobListings";


const JobsPage = () => {
  return (
    <div>
      <Top5Jobs />
      <JobList />
    </div>
  );
};

export default JobsPage;
