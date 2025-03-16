import React from 'react';
import '../../styles/LoginButton.css';
import { Link } from 'react-router-dom';

const LoginButton = () => {
  return (
    <div className="login-actions">
      <Link to="/register" className="register-link">
        New Here? Register
      </Link>
      
      <button
        type="submit"
        className="login-button"
        aria-label="Login to account"
      >
        Sign In
      </button>
      
      <Link 
        to="#" 
        className="forgot-password-link"
        onClick={(e) => {
          e.preventDefault();
          alert('Password reset functionality coming soon');
        }}
      >
        Forgot Password
      </Link>
    </div>
  );
};

export default LoginButton;
  