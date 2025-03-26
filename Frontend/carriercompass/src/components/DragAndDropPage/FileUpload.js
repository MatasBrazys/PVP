import React from "react";
import { useDropzone } from "react-dropzone";

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
    <div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        
        {file ? (
          <h2 className="uploaded-file-name">Selected file: {file.name}</h2>
        ) : (
          <>
            <img src="https://placehold.co/120x120" alt="Upload Icon" className="upload-icon" />
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
