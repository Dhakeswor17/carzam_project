import '../src/styles/LoadingScreen.css';
import reactLogo from './assets/G2KTitle.png';
import appLogo from './assets/image1.png'; 
import CheckListComp from './components/CheckListComp';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import InfoScreen from './infopage.jsx';
import { getInfo } from './components/api.jsx';

function LoadingScreen() {
    const [checks, setChecks] = useState([false, false, false]);
    const [isLicensePlateFound, setIsLicensePlateFound] = useState(false);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [carData, setCarData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();
    const searchQuery = location.state?.searchQuery;
    const selectedCountry = location.state?.selectedCountry;

    useEffect(() => { 
        const fetchData = async () => {
            try {
                if (searchQuery && selectedCountry) {
                    const data = await getInfo(selectedCountry, searchQuery);
                    console.log("✅ Fetched car data:", data);
                    setCarData(data);
                    setIsLicensePlateFound(true);
                }
            } catch (err) {
                console.error("Error fetching car info:", err);
                setError("Failed to fetch vehicle data");
                setIsLicensePlateFound(false);
            } finally {
                setLoading(false);
            }
        };

        // Start the visual loading sequence
        const timer1 = setTimeout(() => setChecks([true, false, false]), 1000);
        const timer2 = setTimeout(() => setChecks([true, true, false]), 2000);
        const timer3 = setTimeout(() => setChecks([true, true, true]), 3000);

        fetchData();

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, [searchQuery, selectedCountry]);

    const handleSearchAgain = () => {
        navigate("/");
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
                            {carData ? (
                                <div className=' mb-5'>
                                    <InfoScreen data={carData} />
                                    <Button variant="primary" onClick={handleSearchAgain} className="mt-3">
                                        Search Again
                                    </Button>
                                </div>
                            ) : (
                                <div className="error-message card p-4">
                                    <p style={{ color: "red" }}>{error || "No data available"}</p>
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