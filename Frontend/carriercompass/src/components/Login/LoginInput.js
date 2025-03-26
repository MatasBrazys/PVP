import React from 'react';
import '../../styles/InputField.css';

const LoginInput = ({ label, type = "text", id, required = true }) => {
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
        className="input-field"
        aria-label={label}
      />
    </div>
  );
};

export default LoginInput;
  