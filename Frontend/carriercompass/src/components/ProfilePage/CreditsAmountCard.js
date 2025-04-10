import React, { useState, useEffect, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translations";
import "../../styles/ProfilePage.css"; // Make sure to import your CSS
import { useNavigate } from "react-router-dom";

const CreditsCard = () => {
    const [credits, setCredits] = useState(100);  // Default value, you can fetch this from your API
    const maxCredits = 100;  // Max credits
    const navigate = useNavigate();

    const { language } = useContext(LanguageContext);
    const t = translations[language];

    useEffect(() => {
        // You can replace this with actual logic to fetch the user's credits
        const fetchCredits = async () => {
            try {
                // Assuming an API response that gives you the current credits
                // const response = await axios.get("http://localhost:8000/user/credits");
                // setCredits(response.data.credits);  // Set credits from API response

                // For now, this is just simulating an API fetch with static data
                // Example:
                // setCredits(42); 
            } catch (error) {
                console.error("Error fetching credits", error);
            }
        };

        fetchCredits();
    }, []); // Empty dependency array to run the fetch once on component mount

    const getBarColor = (value) => {
        if (value > 70) return "#4caf50"; // Green
        if (value > 30) return "#ffc107"; // Yellow
        return "#f44336"; // Red
    };

    return (

        <div className="credits-card">
            <div className="credits-header">
                <h2 className="credits-title">{t.creditsTitle}</h2>
                <button className="get-plan-button" style={{ marginTop: "-20px" }}onClick={() => navigate("/Plan")}>
                    <svg
                        className="plan-icon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <rect x="2" y="5" width="20" height="14" rx="2" />
                        <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                    {t.getPlanButton}
                </button>

            </div>
            <div className="credits-amount">
                <p className="credits-amount-text">{t.creditText1} {credits} / {maxCredits} {t.creditText2}</p>
            </div>
            <div className="credits-progress-bar">
                <div
                    className="credits-progress-fill"
                    style={{
                        width: `${(credits / maxCredits) * 100}%`,
                        backgroundColor: getBarColor(credits),
                    }}
                ></div>
            </div>
        </div>
    );
};

export default CreditsCard;
