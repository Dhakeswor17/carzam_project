import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import '../styles/colors.scss';
import '../styles/ApiData.css';
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

function DataFetching() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [inputValue, setInputValue] = useState("");
    const navigation = useNavigate();

    const countries = [
        "Denmark",
        "Finland",
        "Netherlands",
        "Norway",
        "Sweden",
        "Portugal",
        "Italy",
        "France",
        "Spain",
        "USA",
        "Australia",
    ];

    const getCountryPrefix = (country) => {
        return country.slice(0, 3).toUpperCase();
    };

    const handleCountryChange = (e) => {
        const country = e.target.value;
        setSelectedCountry(country);
    };

    const handleButtonClick = async () => {
        if (!selectedCountry || !inputValue.trim()) return;
        
        setLoading(true);
        setError(null);
        
        try {
            // Navigate to loading screen immediately with the search parameters
            navigation("/loading", { 
                state: { 
                    searchQuery: inputValue, 
                    selectedCountry 
                } 
            });
        } catch (err) {
            setError("Failed to initiate search");
            setLoading(false);
        }
    };

    return (
        <div className='col form-section mb-5 d-flex flex-column justify-content-center'>
            <select
                className='col countrySelector p-3 mb-4 rounded'
                value={selectedCountry}
                onChange={handleCountryChange}
            >
                <option value="" disabled>Select a country</option>
                {countries.map((country) => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>
            <div className="license-plate-input-container">
                <div className="country-prefix-box">
                    {selectedCountry ? getCountryPrefix(selectedCountry) : "---"}
                </div>
                <input
                    className='license-plate-input'
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type licence plate"
                    disabled={!selectedCountry}
                    onKeyDown={(e) => e.key === 'Enter' && handleButtonClick()}
                />
                <button
                    className='searchButton'
                    onClick={handleButtonClick}
                    disabled={loading || !selectedCountry || !inputValue.trim()}
                >
                    <FiArrowRight />
                </button>
            </div>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
        </div>
    );
}

export default DataFetching;