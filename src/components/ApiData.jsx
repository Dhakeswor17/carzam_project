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
}


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

    useEffect(() => {
        if (!searchQuery) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            navigation("/loading", { state: { searchQuery } }); // Pass searchQuery to LoadingScreen

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
            //const response = await fetch(apiUrl);
            //if (!response.ok) throw new Error("Failed to fetch data");

            //const text = await response.text(); 
            //const parser = new DOMParser();
            //const xmlDoc = parser.parseFromString(text, "text/xml");


            //const vehicleData = xmlDoc.getElementsByTagName("vehicleJson")[0]?.textContent;
            //const parsedData = vehicleData ? JSON.parse(vehicleData) : null;

            //setData(parsedData);
            // } catch (error) {
            //   console.error("Error fetching XML:", error);
            // setError(error.message);
            //} finally {
            //  setLoading(false);
            //}
        };

        fetchData();
    }, [searchQuery, navigation]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleButtonClick = () => {
        if (!inputValue.trim()) return;
        setSearchQuery(inputValue);
    };

    return (
        <div className='col form-section mb-5 d-flex flex-column justify-content-center'>
            <select className='col countrySelector p-3 mb-4 rounded' value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                {countries.map((country) => (
                    <option key={country} value={country}>
                        {country}
                    </option>
                ))}
            </select>
            <div>
                <input
                    className='col inputField p-3 mt-3 rounded'
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Type licence plate"
                />

                <button className='col searchButton p-3 ms-3 rounded' onClick={handleButtonClick} disabled={loading}>
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