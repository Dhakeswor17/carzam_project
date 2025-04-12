import '../src/styles/LoadingScreen.css';
import reactLogo from './assets/G2KTitle.png';
import appLogo from './assets/image1.png'; 
import CheckListComp from './components/CheckListComp';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import InfoScreen from './infopage.jsx';
import carData from './components/mimicdata.jsx';

function LoadingScreen() {
    const [checks, setChecks] = useState([false, false, false]);
    const [isLicensePlateFound, setIsLicensePlateFound] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const searchQuery = location.state?.searchQuery;

    useEffect(() => {
        let timeoutId;
        
        // Immediate check for license plate
        if (searchQuery === carData.license_plate) {
            setIsLicensePlateFound(true);
            setChecks([true, true, true]);
            setLoading(false);
        } else {
            // Set timeout for 30 seconds if plate not found
            timeoutId = setTimeout(() => {
                setError("License plate not found");
                setIsLicensePlateFound(false);
                setLoading(false);
            }, 30000); // 30 seconds
        }

        return () => {
            clearTimeout(timeoutId);
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
                            <CheckListComp checks={checks} isLicensePlateFound={isLicensePlateFound} />
                        </>
                    ) : (
                        <>
                            {isLicensePlateFound ? (
                                <div className=' mb-5'>
                                    <InfoScreen />
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
        </div>
    );
}

export default LoadingScreen;