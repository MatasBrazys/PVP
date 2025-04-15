import React from "react";
import "../../styles/Loader.css";


const loader = () => {
    return (
        <div>
            <div className="dots-loader-container">
                <div className="dots-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>
    );
};

export default loader;
