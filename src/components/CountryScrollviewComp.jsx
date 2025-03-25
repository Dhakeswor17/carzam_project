import React from "react";

function CountryScrollviewComp({ countries, onCountrySelect }) {
    return (
        <div style={{ marginTop: "20px" }}>
            <h2>Select a Country</h2>
            <div
                style={{
                    maxHeight: "200px", 
                    overflowY: "scroll", 
                    border: "1px solid #ccc", 
                    padding: "10px", 
                }}
            >
                {countries.map((country, index) => (
                    <p
                        key={index}
                        style={{ cursor: "pointer" }}
                        onClick={() => onCountrySelect(country)}
                    >
                        {country}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default CountryScrollviewComp;