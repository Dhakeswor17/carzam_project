import React, { useState, useEffect } from 'react';
import './ApiData.css'
import { FiArrowRight } from "react-icons/fi";


function DataFetching() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [inputValue, setInputValue] = useState("");

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
    }, [searchQuery]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleButtonClick = () => {
        if (!inputValue.trim()) return;
        setSearchQuery(inputValue);
    };

    return (

        
            <div className='form-section'>
                <select className='countrySelector' value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                    {countries.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
                <div>
                    <input
                        className='inputField'
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Type licence plate"
                    />

                    <button className='searchButton' onClick={handleButtonClick} disabled={loading}>
                        <FiArrowRight />

                    </button>
                </div>

                {loading && <p>Loading...</p>}
                {error && <p style={{ color: "red" }}>Error: {error}</p>}
            </div>
       
    );
}

export default DataFetching;