import React from 'react';
import '../styles/RegisterButton.css';

const RegisterButton = () => {
  return (
    <button
      type="submit"
      className="register-button"
      aria-label="Register account"
    >
      Register
    </button>
  );
};

export default RegisterButton;