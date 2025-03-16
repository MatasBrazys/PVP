import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';
import '../../styles/RegisterPage.css';
import InputField from './InputField';
import RegisterButton from './RegisterButton';
import logo from '../../images/logo CareerCompass.svg';

const RegisterPage = () => {
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();

    const validateForm = (data) => {
      const newErrors = {};
      
      // Check if name is empty
      if (!data.name.trim()) {
        newErrors.name = "Name is required";
      }
      
      // Check if surname is empty
      if (!data.last_name.trim()) {
        newErrors.surname = "Surname is required";
      }
      
      // Check if email is valid
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!data.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!emailRegex.test(data.email)) {
        newErrors.email = "Please enter a valid email address";
      }
      
      // Check if password is valid (at least 6 characters)
      if (!data.password) {
        newErrors.password = "Password is required";
      } else if (data.password.length < 6) {
        newErrors.password = "Password must be at least 6 characters long";
      }
      
      return newErrors;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      const data = {
        name: document.getElementById('name').value,
        last_name: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      };

      // Validate form
      const formErrors = validateForm(data);
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        setIsSubmitting(false);
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        
        if (!response.ok) {
          // Handle server errors
          if (result.detail && result.detail.includes("already registered")) {
            setErrors({ email: "This email is already registered" });
          } else {
            setErrors({ general: result.detail || "Registration failed. Please try again." });
          }
          console.error('Registration error:', result);
        } else {
          // Registration successful
          console.log('Registration successful:', result);
          // Redirect to login page
          navigate('/login');
        }
      } catch (error) {
        console.error('Error:', error);
        setErrors({ general: "An error occurred. Please try again later." });
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <main className="register-page">
        <div className="register-container">
          <img
            src={logo}
            alt="Registration page logo"
            className="register-logo"
          />
  
          <form onSubmit={handleSubmit} className="register-form" aria-label="Registration form">
            {errors.general && <div className="error-message">{errors.general}</div>}
            
            <section className="form-section">
              <div className="input-wrapper">
                <InputField 
                  label="Name" 
                  id="name" 
                  error={errors.name}
                />
              </div>
  
              <div className="input-wrapper">
                <InputField 
                  label="Surname" 
                  id="surname" 
                  error={errors.surname}
                />
              </div>
  
              <div className="input-wrapper">
                <InputField 
                  label="Email" 
                  type="email" 
                  id="email" 
                  error={errors.email}
                />
              </div>
  
              <div className="input-wrapper">
                <InputField 
                  label="Password" 
                  type="password" 
                  id="password" 
                  error={errors.password}
                />
              </div>
            </section>
  
            <div className="button-wrapper">
              <RegisterButton isSubmitting={isSubmitting} />
            </div>
          </form>
        </div>
      </main>
    );
  };
  
  export default RegisterPage; 