import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import translations from "../translations";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom
import "../styles/DragAndDrop.css";
import axios from "axios";
import LoadingScreen from "../components/DragAndDropPage/LoadingScreen";

import JobSelection from "../components/DragAndDropPage/JobSelection";
import FileUpload from "../components/DragAndDropPage/FileUpload";
import ToggleButtons from "../components/DragAndDropPage/ToggleButtons";


const DragAndDrop = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] 
  const navigate = useNavigate(); // Initialize navigate
  const [selectedJobs, setSelectedJobs] = useState([]);
  const [file, setFile] = useState(null);
  const [activeButton, setActiveButton] = useState("general");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [showComponents, setShowComponents] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

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
      navigate("/results", { state: { fileUrl: URL.createObjectURL(file), analysis: response.data.analysis } }); // Passing both fileUrl and analysis
      // navigate("/results", { state: { fileUrl: URL.createObjectURL(file) } });

    } catch (error) {
      console.error("Error analyzing CV:", error);
      alert("Failed to analyze CV.");
    } finally {
      setIsLoading(false);
    }

    setShowResults(true);
    
  };

  const handleFileChange = (selectedFile) => {
    if (selectedFile) {
      // Sukuriame FileReader, kad paverstume failą į base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result; // base64 koduotas failas
        setFile(selectedFile);
        setFileUrl(base64data);
        localStorage.setItem("fileUrl", base64data); // Išsaugome base64 į localStorage
      };
      reader.readAsDataURL(selectedFile); // Paverčiame į base64
    }
  };
  

  const handleRemoveFile = () => {
    setFile(null);
    setFileUrl(null);
  };

  return (
    <div className="drag-and-drop-container">
      {isLoading && <div className="fade-in"><LoadingScreen /></div>}

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
            <FileUpload file={file} setFile={handleFileChange} removeFile={handleRemoveFile} />            
          </div>

          <button className="submit-button fade-in" onClick={handleSubmit} disabled={!file}>
            {t.Submit}
          </button>
        </>
      )}
    </div>
  );
};

export default DragAndDrop;
