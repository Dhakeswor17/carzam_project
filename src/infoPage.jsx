import { useState } from 'react';
import reactLogo from './assets/G2KTitle.png';
import cardata from './components/mimicdata.jsx';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import InfoMainImage from './assets/image1.png';
import IssueBlob from './components/issueBlob.jsx';
import VehicleHealth from './components/VehicleHealthBlob.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/styles/colors.scss';
import '../src/styles/infopage.css';
import { useNavigate } from 'react-router-dom';

function InfoScreen() {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    const handleSearchAgain = () => {
        navigate("/");
    };

    return (
        <div className='container-fluid col d-flex flex-column align-items-center pt-5 bg-background-element'>
            <div className="TitleLogo mb-4">
                <img src={reactLogo} alt="React Logo" className="img-fluid" style={{ maxWidth: '300px' }} />
            </div>
            <div className="InfoMainImage d-flex flex-column align-items-center mb-5 w-100">
                <h2 className='mb-4'>{cardata.license_plate}</h2>
                <div className="car-image-container" style={{ width: '100%', maxWidth: '600px' }}>
                    <img
                        src={InfoMainImage}
                        className="img-fluid car-image"
                        alt="Vehicle"
                        style={{
                            width: '100%',
                            height: 'auto',
                            objectFit: 'contain',
                            maskImage: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)",
                            WebkitMaskImage: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)"
                        }}
                    />
                </div>
            </div>
            {/* Rest of your component remains the same */}
        </div>
    );
}

export default InfoScreen;