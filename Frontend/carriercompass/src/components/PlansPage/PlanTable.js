import React, { useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";
import translations from "../../translations";
import "../../styles/PricingPlans.css";
import checkIcon from "../../images/check.png";
import crossIcon from "../../images/minus.png";

const plansTable = [
    {
        planName: "Free",
        planUse: "2",
        tablefeatures: {
            "Pagrindinė CV analizė": true,
            "Išplėstinės CV analizės": false,
            "Bendros rekomendacijos": true,
            "Personalizuotos rekomendacijos": false,
            "Prieiga prie mokymų": false,
            "Darbo pasiūlymų per mėnesį": false,
        },
    },
    {
        planName: "Basic",
        planUse: "20",
        tablefeatures: {
            "Pagrindinė CV analizė": true,
            "Išplėstinės CV analizės": true,
            "Bendros rekomendacijos": true,
            "Personalizuotos rekomendacijos": true,
            "Prieiga prie mokymų": true,
            "Darbo pasiūlymų per mėnesį": false,
        },
    },
    {
        planName: "Pro",
        planUse: "Neribotas",
        tablefeatures: {
            "Pagrindinė CV analizė": true,
            "Išplėstinės CV analizės": true,
            "Bendros rekomendacijos": true,
            "Personalizuotos rekomendacijos": true,
            "Prieiga prie mokymų": true,
            "Prieiga prie darbo pasiūlymų": true,
        },
    },
];

const PricingTable = () => {
    const { language } = useContext(LanguageContext);
    const t = translations[language]; // Get translations for the selected language

    const allFeatures = Object.keys(plansTable[0].tablefeatures);

    return (
        <div className="pricing-table-container">
            <h2>{t.featuresTableTitle}</h2>
            <table className="pricing-table">
                <thead>
                    <tr>
                        <th>{t.usagePerMonth}</th>
                        {plansTable.map((plan, index) => (
                            <th key={index}>{plan.planName}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{t.usagePerMonth}</td>
                        {plansTable.map((plan, index) => (
                            <td className="feature-text" key={index}>
                                {plan.planUse === "Neribotas" ? t.unlimited : plan.planUse}
                            </td>
                        ))}
                    </tr>

                    {allFeatures.map((feature, index) => (
                        <tr key={index}>
                            <td>{t.featuresTable[feature] || feature}</td>
                            {plansTable.map((plan, i) => (
                                <td key={i} className="feature-cell">
                                    <img src={plan.tablefeatures[feature] ? checkIcon : crossIcon} alt={plan.tablefeatures[feature] ? "✔" : "❌"} />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default PricingTable;
