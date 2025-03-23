import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import '../styles/colors.scss';
import '../styles/ApiData.css';
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';
import carData from './mimicdata.jsx';

function DataFetching() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [isLicensePlateFound, setIsLicensePlateFound] = useState(false);
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

    const handleButtonClick = () => {
        if (!selectedCountry || !inputValue.trim()) return;
        const fullLicensePlate = inputValue;
        setSearchQuery(fullLicensePlate);
    };

    useEffect(() => {
        if (!searchQuery) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            navigation("/loading", { state: { searchQuery } });

            setTimeout(() => {
                if (searchQuery === carData.license_plate) {
                    setIsLicensePlateFound(true);
                    navigation("/info"); // Navigate to the InfoScreen route
                } else {
                    setError("License plate not found");
                    setIsLicensePlateFound(false);
                }
                setLoading(false);
            }, 3000);
        };

        fetchData();
    }, [searchQuery, navigation]);

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