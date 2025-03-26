import React from 'react';
import '../../styles/InputField.css';

const InputField = ({ label, type = "text", id, required = true, error }) => {
  return (
    <div className="input-container">
      <label htmlFor={id} className="input-label">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        required={required}
        className={`input-field ${error ? 'input-error' : ''}`}
        aria-label={label}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && <div className="error-text">{error}</div>}
    </div>
  );
};

export default InputField; 