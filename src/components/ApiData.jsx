import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import './ApiData.css'
import { FiArrowRight } from "react-icons/fi";
import { useNavigate } from 'react-router-dom';


function DataFetching() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
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

    useEffect(() => {
        if (!searchQuery) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);
            navigation("/loading");
            

            //try {
            const baseUrl = "https://regcheck.org.uk/api/reg.asmx";
            const apiUrl = `${baseUrl}/Check${selectedCountry}?RegistrationNumber=${searchQuery}&username=g2kdev`;

            console.log("Fetching:", apiUrl);

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
            </div> 
    );
}

export default DataFetching;