import React from "react";
import "../../styles/PricingPlans.css";
import checkIcon from "../../images/check.png"; // Replace with your actual path
import crossIcon from "../../images/minus.png"; // Replace with your actual path

const plans = [
    {
        name: "Free",
        use: "2",
        features: {
            "Pagrindinė CV analizė": true,
            "Išplėstinės CV analizės": false,
            "Bendros rekomendacijos": true,
            "Personalizuotos rekomendacijos": false,
            "Prieiga prie mokymų": false,
            "Darbo pasiūlymų per mėnesį": false,
        },
    },
    {
        name: "Basic",
        use: "20",
        features: {
            "Pagrindinė CV analizė": true,
            "Išplėstinės CV analizės": true,
            "Bendros rekomendacijos": true,
            "Personalizuotos rekomendacijos": true,
            "Prieiga prie mokymų": true,
            "Darbo pasiūlymų per mėnesį": false,
        },
    },
    {
        name: "Pro",
        use: "Neribotas",
        features: {
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
    const allFeatures = Object.keys(plans[0].features);

    return (
        <div className="pricing-table-container">
            <h2>Pagrinidnės funkcijos</h2>
            <table className="pricing-table">
                <thead>
                    <tr>
                        <th>Funkcijos</th>
                        {plans.map((plan, index) => (
                            <th key={index}>{plan.name} </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    
                        <td> Panaudojimai per mėnesį </td>
                        {plans.map((plan, index) => (
                            <td className="feature-text" key={index}>{plan.use} </td>
                        ))}
                    
                    {allFeatures.map((feature, index) => (

                        <tr key={index}>
                            <td>{feature}</td>
                            {plans.map((plan, i) => (

                                <td key={i} className="feature-cell">
                                    <img src={plan.features[feature] ? checkIcon : crossIcon} alt={plan.features[feature] ? "✔" : "❌"} />
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
