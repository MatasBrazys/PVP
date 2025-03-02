import React from 'react';  
import '../styles/RegisterPage.css';
import InputField from '../components/InputField';
import RegisterButton from '../components/RegisterButton';
import logo from '../images/logo CareerCompass.svg';

const RegisterPage = () => {
    const handleSubmit = (e) => {
      e.preventDefault();
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
            <section className="form-section">
              <div className="input-wrapper">
                <InputField label="Name" id="name" />
              </div>
  
              <div className="input-wrapper">
                <InputField label="Surname" id="surname" />
              </div>
  
              <div className="input-wrapper">
                <InputField label="Email" type="email" id="email" />
              </div>
  
              <div className="input-wrapper">
                <InputField label="Password" type="password" id="password" />
              </div>
            </section>
  
            <div className="button-wrapper">
              <RegisterButton />
            </div>
          </form>
        </div>
      </main>
    );
  };
  
  export default RegisterPage;
  