import React, { useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import "../styles/DragAndDrop.css"; // Import CSS

const DragAndDrop = () => {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [files, setFiles] = useState([]);
  const [activeButton, setActiveButton] = useState("general"); // Track active button
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showResults, setShowResults] = useState(false); // Results section state
  const dropdownRef = useRef(null); // Reference for dropdown

  const jobOptions = [
    { value: "Developer", label: "Software Developer" },
    { value: "Designer", label: "UI/UX Designer" },
    { value: "Data-scientist", label: "Data Scientist" },
    { value: "Devops", label: "DevOps Engineer" }
  ];

  const handleJobSelection = (job) => {
    setSelectedJobs((prev) =>
      prev.includes(job) ? prev.filter((j) => j !== job) : [...prev, job]
    );
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  // Dropzone configuration
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    onDrop: (acceptedFiles) => {
      const filteredFiles = acceptedFiles.filter((file) =>
        ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(file.type)
      );

      if (filteredFiles.length !== acceptedFiles.length) {
        alert("Some files were rejected! Only PDF and Word documents are allowed.");
      }

      setFiles((prevFiles) => [...prevFiles, ...filteredFiles]); // Append only valid files
    },
  });

  // Remove a file from the list
  const removeFile = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  // Handle form submission with loading transition
  const handleSubmit = () => {
    setIsLoading(true); // Show loading screen
    setTimeout(() => {
      setIsLoading(false); // Hide loading after 2 seconds
      setShowResults(true); // Show results section
    }, 5000); // Simulated loading delay
  };

  return (
    <div className="container">
      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen">
          <h2 className="loading-text">Processing...</h2>
          <div className="spinner"></div>

        </div>

      )}

      {/* Show Results Section after submission */}
      {!isLoading && showResults && (
        <div className="results-section">
          <h2>Results</h2>
          <p>Your CV has been successfully processed!</p>
          <textarea className="result-textarea"></textarea>

          {/* Užtikrina, kad mygtukas bus po textarea */}
          <button className="go-back-button" onClick={() => setShowResults(false)}>
            Go Back
          </button>
        </div>
      )}


      {/* Show Drag and Drop Section when not in results or loading state */}
      {!isLoading && !showResults && (
        <>
          <div className="button-group">
            <div className={`toggle-background ${activeButton === "it-job" ? "slide-right" : "slide-left"}`}></div>
            <button
              onClick={() => {
                setShowDropdown(true);
                setActiveButton("it-job");
              }}
              className={`toggle-button ${activeButton === "it-job" ? "active" : ""}`}
            >
              Select IT Job
            </button>
            <button
              onClick={() => {
                setShowDropdown(false);
                setActiveButton("general");
              }}
              className={`toggle-button ${activeButton === "general" ? "active" : ""}`}
            >
              General
            </button>
          </div>

          {showDropdown && (
            <div className="custom-dropdown" ref={dropdownRef}>
              <button className="dropdown-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
                {selectedJobs.length > 0 ? selectedJobs.join(", ") : "Select IT Job"}
              </button>

              {dropdownOpen && (
                <div className="dropdown-menu">
                  {jobOptions.map((job) => (
                    <label key={job.value} className="dropdown-item">
                      <input
                        type="checkbox"
                        value={job.value}
                        checked={selectedJobs.includes(job.value)}
                        onChange={(e) => handleJobSelection(e.target.value)}
                      />
                      {job.label}
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Drag and Drop Area */}
          <div {...getRootProps()} className="dropzone">
            <input {...getInputProps()} />
            <img src="https://placehold.co/120x120" alt="Upload Icon" className="upload-icon"></img>
            <h2>Drag and Drop Your CV here</h2>
            <p>or</p>
            <button className="select-file">Select file</button>
          </div>

          {/* Uploaded Files List */}
          {files.length > 0 && (
            <div className="file-list">
              <h3>Uploaded Files:</h3>
              <ul>
                {files.map((file, index) => (
                  <li key={index} className="file-item">
                    <span>{file.name}</span>
                    <button onClick={() => removeFile(file.name)} className="remove-file">
                      ✖
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Submit Button */}
          {/* Submit Button */}
          <button className="submit-button" onClick={handleSubmit} disabled={files.length === 0}>
            Submit
          </button>

        </>
      )}
    </div>
  );
};

export default DragAndDrop;
