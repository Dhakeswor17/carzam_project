import '../src/styles/LoadingScreen.css';
import reactLogo from './assets/G2KTitle.png';
import appLogo from './assets/image1.png'; 
import CheckListComp from './components/CheckListComp';

import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import InfoScreen from './infopage.jsx';
import carData from './components/mimicdata.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

// const carData = { 
//     license_plate: "XYZ-789",
//     vehicle_health: 7,
//     safety_rating: 8,
//     market_value: 22000,
//     common_issues: {
//         "Engine Misfire": "12%",
//         "Oil Leak": "9%",
//         "Battery Drain": "6%"
//     },
//     basic_info: {
//         make: "Mazda",
//         model: "CX-5",
//         year: 2020,
//         type: "SUV",
//         fuel: "Gasoline",
//         transmission: "Automatic"
//     },
//     yearly_maintenance_cost: 700
// };

function LoadingScreen() {
    const [checks, setChecks] = useState([false, false, false]);
    const [isLicensePlateFound, setIsLicensePlateFound] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const searchQuery = location.state?.searchQuery;

    useEffect(() => {
        const timer1 = setTimeout(() => setChecks([true, false, false]), 1000);
        const timer2 = setTimeout(() => setChecks([true, true, false]), 2000);
        const timer3 = setTimeout(() => setChecks([true, true, true]), 3000);

        // Simulate license plate check
        setTimeout(() => {
            if (searchQuery === carData.license_plate) {
                setIsLicensePlateFound(true);
            } else {
                setError("License plate not found");
                setIsLicensePlateFound(false);
            }
            setLoading(false); // Stop loading after 3 seconds
        }, 3000);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [searchQuery]);

    const handleSearchAgain = () => {
        navigate("/"); // Navigate back to the home page to search again
    };

    return (
        <div>
            <div className='container col d-flex flex-column align-items-center justify-content-top p-3 '>
                <div className="title mb-4">
                    <img src={reactLogo} alt="React Logo" />
                </div>
                <div className='logo col d-flex flex-column align-items-center justify-content-center'>
                    {loading ? (
                        <>
                            <div className="circle-logo">
                                <img className="app-logo" src={appLogo} alt="App Logo" />
                            </div>
                            <p>Loading...</p>
                            <CheckListComp checks={checks} />
                        </>
                    ) : (
                        <>
                            {isLicensePlateFound ? (
                                <div className="car-details card p-4">
                                    <h2 className="card-title">Car Details</h2>
                                    <div className="car-info">
                                        {/* <p><strong>Make:</strong> {carData.basic_info.make}</p>
                                        <p><strong>Model:</strong> {carData.basic_info.model}</p>
                                        <p><strong>Year:</strong> {carData.basic_info.year}</p>
                                        <p><strong>Type:</strong> {carData.basic_info.type}</p>
                                        <p><strong>Fuel:</strong> {carData.basic_info.fuel}</p>
                                        <p><strong>Transmission:</strong> {carData.basic_info.transmission}</p>
                                        <p><strong>Vehicle Health:</strong> {carData.vehicle_health}</p>
                                        <p><strong>Safety Rating:</strong> {carData.safety_rating}</p>
                                        <p><strong>Market Value:</strong> ${carData.market_value}</p>
                                        <p><strong>Yearly Maintenance Cost:</strong> ${carData.yearly_maintenance_cost}</p> */}
                                        {
                                             <InfoScreen />
                                        }
                                    </div>
                                    <h3>Common Issues</h3>
                                    <ul className="common-issues">
                                        {Object.entries(carData.common_issues).map(([issue, percentage]) => (
                                            <li key={issue}><strong>{issue}:</strong> {percentage}</li>
                                        ))}
                                    </ul>
                                    <Button variant="primary" onClick={handleSearchAgain} className="mt-3">
                                        Search Again
                                    </Button>
                                </div>
                            ) : (
                                <div className="error-message card p-4">
                                    <p style={{ color: "red" }}>{error}</p>
                                    <Button variant="primary" onClick={handleSearchAgain} className="mt-3">
                                        Search Again
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            {/* <footer className="footer p-3 d-flex justify-content-center bottom-0 position-fixed">
                <div className='footer-text mt-5'>
                    <p className="m-0">Good2Know is a Trademark of 123 Oy</p>
                    <p>
                        <a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a>
                    </p>
                </div>
            </footer> */}
        </div>
    );
}

export default LoadingScreen;