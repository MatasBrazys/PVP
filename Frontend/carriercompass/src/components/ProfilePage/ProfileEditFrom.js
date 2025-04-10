import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translations";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/ProfilePage.css";

const ProfileForm = () => {
  const [name, setName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");
  const [changePassword, setChangePassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAndFetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/user/get_User/${token}`);
        const data = response.data;
        setName(data.name || "");
        setLastName(data.last_name || "");
        setEmail(data.email || "");

      } catch (error) {
        console.error("Token or data fetch failed:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    verifyAndFetchUser();
  }, [navigate, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    

    setLoading(true);

    try {
      const payload = {
        token,
        name,
        last_name,
        email,
        current_password: changePassword ? currentPassword : null,
        new_password: changePassword ? newPassword : null,
        repeat_password: changePassword ? repeatNewPassword : null
      };

      const response = await axios.put("http://localhost:8000/user/user_update", payload);
      alert("Paskyros informacija sėkmingai atnaujinta!");
      setChangePassword(false); // paslėpti slaptažodžio laukelius po atnaujinimo

    } catch (error) {
      setError("Klaida: " + (error.response?.data?.detail || error.message));
    }

    setLoading(false);
  };

  return (
    <form className="personal-info-card" onSubmit={handleSubmit}>
      
      <div className="personal-info-header">
        <h2 className="personal-info-title">{t.editTitle}</h2>
      </div>

      <div className="personal-info-grid">
        <div className="info-item">
          <label className="info-label" htmlFor="name">{t.userName}</label>
          <input
            id="name"
            type="text"
            className="input-modern"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="info-item">
          <label className="info-label" htmlFor="surname">{t.surname}</label>
          <input
            id="last_name"
            type="text"
            className="input-modern"
            value={last_name}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="info-item">
          <label className="info-label" htmlFor="email">{t.email}</label>
          <input
            id="email"
            type="email"
            className="input-modern"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="info-item" style={{ gridColumn: "1 / -1" }}>
          <div className="personal-info-header">
            <h2 className="personal-info-title">{t.editChangePasswordTitle}</h2>
          </div>
          {error && <div className="error-message">{error}</div>}
        </div>

        <div className="info-item">
          <label className="info-label" htmlFor="current-password">{t.editCurrentPassword}</label>
          <input
            id="current-password"
            type="password"
            className="input-modern"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={!changePassword}
          />
        </div>
        <div className="info-item">
          <label className="info-label" htmlFor="new-password">{t.editNewPassword}</label>
          <input
            id="new-password"
            type="password"
            className="input-modern"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={!changePassword}
          />
        </div>
        <div className="info-item">
          <label className="info-label" htmlFor="repeat-password">{t.editRepeatNewPassword}</label>
          <input
            id="repeat-password"
            type="password"
            className="input-modern"
            value={repeatNewPassword}
            onChange={(e) => setRepeatNewPassword(e.target.value)}
            disabled={!changePassword}
          />
        </div>
      </div>
      <div className="edit-button-container">
        <label className="custom-checkbox-label">
          <input
            type="checkbox"
            className="custom-checkbox"
            checked={changePassword}
            onChange={() => {
              const newValue = !changePassword;
              setChangePassword(newValue);
              if (!newValue) {
                setCurrentPassword("");
                setNewPassword("");
                setRepeatNewPassword("");
              }
            }}

          />
          {t.editChangePasswordTitle}
        </label>

        <button type="submit" className="edit-button" disabled={loading}>
          {loading ? t.saving : t.saveChanges}
        </button>
      </div>

    </form>
  );
};

export default ProfileForm;
