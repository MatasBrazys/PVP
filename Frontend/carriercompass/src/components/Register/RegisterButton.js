import React from 'react';
import '../../styles/RegisterButton.css';

const RegisterButton = ({ isSubmitting }) => {
  return (
    <button
      type="submit"
      className="register-button"
      aria-label="Register account"
      disabled={isSubmitting}
    >
      {isSubmitting ? 'Registering...' : 'Register'}
    </button>
  );
};

export default RegisterButton; 