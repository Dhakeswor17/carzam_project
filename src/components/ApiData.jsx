import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import './ApiData.css';
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';

const carData = {
    license_plate: "XYZ-789",
    vehicle_health: 7,
    safety_rating: 8,
    market_value: 22000,
    common_issues: {
        "Engine Misfire": "12%",
        "Oil Leak": "9%",
        "Battery Drain": "6%"
    },
    basic_info: {
        make: "Mazda",
        model: "CX-5",
        year: 2020,
        type: "SUV",
        fuel: "Gasoline",
        transmission: "Automatic"
    },
    yearly_maintenance_cost: 700
};

function DataFetching() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [data, setData] = useState(null);
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

    // Get the first three letters of the selected country
    const getCountryPrefix = (country) => {
        return country.slice(0, 3).toUpperCase();
    };

    // Handle country selection
    const handleCountryChange = (e) => {
        const country = e.target.value;
        setSelectedCountry(country);
    };

    // Handle search button click
    const handleButtonClick = () => {
        if (!selectedCountry || !inputValue.trim()) return;
        const fullLicensePlate = `${getCountryPrefix(selectedCountry)} ${inputValue}`;
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
                    setData(carData);
                    setIsLicensePlateFound(true);
                } else {
                    setError("License plate not found");
                    setIsLicensePlateFound(false);
                }
                setLoading(false);
            }, 3000); // Simulate a 3-second delay
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
                {/* Country prefix box inside the input field */}
                <div className="country-prefix-box">
                    {selectedCountry ? getCountryPrefix(selectedCountry) : "---"}
                </div>
                {/* License plate input field */}
                <input
                    className='license-plate-input'
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type licence plate"
                    disabled={!selectedCountry}
                />
                {/* Search button */}
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
            {data && (
                <div>
                    <h2>Car Details</h2>
                    <p>Make: {data.basic_info.make}</p>
                    <p>Model: {data.basic_info.model}</p>
                    <p>Year: {data.basic_info.year}</p>
                    <p>Type: {data.basic_info.type}</p>
                    <p>Fuel: {data.basic_info.fuel}</p>
                    <p>Transmission: {data.basic_info.transmission}</p>
                    <p>Vehicle Health: {data.vehicle_health}</p>
                    <p>Safety Rating: {data.safety_rating}</p>
                    <p>Market Value: {data.market_value}</p>
                    <p>Yearly Maintenance Cost: {data.yearly_maintenance_cost}</p>
                    <h3>Common Issues</h3>
                    <ul>
                        {Object.entries(data.common_issues).map(([issue, percentage]) => (
                            <li key={issue}>{issue}: {percentage}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DataFetching;