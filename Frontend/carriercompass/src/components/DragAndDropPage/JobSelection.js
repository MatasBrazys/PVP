import React, { useRef, useEffect } from "react";

const JobSelection = ({ selectedJobs, setSelectedJobs, handleJobSelection, showDropdown, setShowDropdown }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const jobOptions = [
    { value: "Developer", label: "Software Developer" },
    { value: "Designer", label: "UI/UX Designer" },
    { value: "Data-scientist", label: "Data Scientist" },
    { value: "Devops", label: "DevOps Engineer" }
  ];

  return (
    <div className="custom-dropdown" ref={dropdownRef}>
      <button className="dropdown-toggle" onClick={() => setShowDropdown(!showDropdown)}>
        {selectedJobs.length > 0 ? selectedJobs.join(", ") : "Select IT Job"}
      </button>

      {showDropdown && (
        <div className="dropdown-menu" >
          {jobOptions.map((job) => (
            <label key={job.value} className="dropdown-item">
              <input
                type="checkbox"
                value={job.value}
                checked={selectedJobs.includes(job.value)}
                onChange={() => handleJobSelection(job.value)}
              />
              {job.label}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobSelection;
