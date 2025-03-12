import React, { useState, useEffect } from "react";
import "../styles/DragAndDrop.css";
import axios from "axios";
import LoadingScreen from "../components/DragAndDropPage/LoadingScreen";
import ResultsSection from "../components/DragAndDropPage/ResultsDisplay";
import JobSelection from "../components/DragAndDropPage/JobSelection";
import FileUpload from "../components/DragAndDropPage/FileUpload";
import ToggleButtons from "../components/DragAndDropPage/ToggleButtons";

const DragAndDrop = () => {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [file, setFile] = useState(null);
  const [activeButton, setActiveButton] = useState("general");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [showComponents, setShowComponents] = useState(false);

  // Delay component appearance slightly for smooth effect
  useEffect(() => {
    setTimeout(() => setShowComponents(true), 100);
  }, []);

  const handleJobSelection = (job) => {
    setSelectedJobs((prev) =>
      prev.includes(job) ? prev.filter((j) => j !== job) : [...prev, job]
    );
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("No file selected!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setIsLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/cv/analyze-cv/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error("Error analyzing CV:", error);
      alert("Failed to analyze CV.");
    } finally {
      setIsLoading(false);
    }

    setShowResults(true);
  };

  return (
    <div className="drag-and-drop-container">
      {isLoading && <div className="fade-in"><LoadingScreen /></div>}

      {!isLoading && showResults && (
        <div className="fade-in">
           <ResultsSection analysis={analysis} onGoBack={() => setShowResults(false)} />
          
        </div>
      )}

      {!isLoading && !showResults && showComponents && (
        <>
          <div className="fade-in">
            <ToggleButtons
              activeButton={activeButton}
              setActiveButton={setActiveButton}
              setShowDropdown={setShowDropdown}
            />
          </div>

          {activeButton === "it-job" && (
            <div className="fade-in">
              <JobSelection
                selectedJobs={selectedJobs}
                handleJobSelection={handleJobSelection}
                showDropdown={showDropdown}
                setShowDropdown={setShowDropdown}
              />
            </div>
          )}

          <div className="fade-in">
            <FileUpload file={file} setFile={setFile} />
          </div>

          <button className="submit-button fade-in" onClick={handleSubmit} disabled={!file}>
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default DragAndDrop;
