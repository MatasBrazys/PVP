import React from "react";
import { useDropzone } from "react-dropzone";

const DropIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg"
    width="120" height="120" 
    viewBox="0 0 24 24" fill="none" 
    stroke="currentColor" strokeWidth="2" 
    strokeLinecap="round" strokeLinejoin="round" 
    className="upload-icon">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 8v8" />
    <path d="m8 12 4 4 4-4" />
  </svg>
);

const FileUpload = ({ file, setFile }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        setFile(acceptedFiles[0]);
      } else {
        alert("Only PDF and Word documents are allowed.");
      }
    },
  });

  return (
    <div className="dropzone-container">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        
        {file ? (
          <h2 className="uploaded-file-name">Selected file: {file.name}</h2>
        ) : (
          <>
            <DropIcon />  {/* <-- Directly render the SVG here */}
            <h2>Drag and Drop Your CV here</h2>
          </>
        )}

        <p>or</p>
        <button className="select-file">{file ? "Change file" : "Select file"}</button>
      </div>
    </div>
  );
};

export default FileUpload;
