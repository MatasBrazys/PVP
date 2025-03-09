import React, { useState } from "react";
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
  const [showDropdown, setShowDropdown] = useState(false); // Pridėjau šią būseną
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysis, setAnalysis] = useState(null);

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
      const response = await axios.post("http://127.0.0.1:8000/analyze-cv/", formData, {
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
    <div className="container">
      {isLoading && <LoadingScreen />}
      {!isLoading && showResults && (
        <ResultsSection analysis={analysis} onGoBack={() => setShowResults(false)} />
      )}
      {!isLoading && !showResults && (
        <>
          <ToggleButtons
            activeButton={activeButton}
            setActiveButton={setActiveButton}
            setShowDropdown={setShowDropdown} // Perduodame į ToggleButtons
          />
          {activeButton === "it-job" && (
            <JobSelection
              selectedJobs={selectedJobs}
              handleJobSelection={handleJobSelection}
              showDropdown={showDropdown} // Perduodame JobSelection
              setShowDropdown={setShowDropdown} // Perduodame JobSelection
            />
          )}
          <FileUpload file={file} setFile={setFile} />
          <button className="submit-button" onClick={handleSubmit} disabled={!file}>
            Submit
          </button>
        </>
      )}
    </div>
  );
};

export default DragAndDrop;
