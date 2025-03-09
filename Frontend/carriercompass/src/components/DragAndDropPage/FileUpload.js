import React from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ file, setFile, removeFile }) => {
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
  removeFile = () => {
    setFile(null);
  };
  return (
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <img src="https://placehold.co/120x120" alt="Upload Icon" className="upload-icon" />
        <h2>Drag and Drop Your CV here</h2>
        <p>or</p>
        <button className="select-file">Select file</button>
      </div>
      {file && (
        <div className="file-list">
          <h3>Uploaded file:</h3>
          <div className="file-item">
            <span>{file.name}</span>
            <button onClick={removeFile} className="remove-file">✖</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;