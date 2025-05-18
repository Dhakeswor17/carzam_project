import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Collapse from 'react-bootstrap/Collapse';
import InfoMainImage from './assets/image1.png';
import IssueBlob from './components/issueBlob.jsx';
import Price from './components/PriceBlob.jsx';
import VehicleHealth from './components/VehicleHealthBlob.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './infoPage.css';
import { useNavigate } from 'react-router-dom';

function InfoScreen({ data }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className='container-fluid'>
      
      <div className="full-width-car">
        <h2 className='mb-3'>{data?.basic_info?.Carmake} {data?.basic_info?.Carmodel}</h2>
        <img src={data?.image_url} alt="Vehicle" />
      </div>

      
      <div className="content-center">
        {/* Basic Info Section */}
        <div className="section-spacing">
          <Button
            onClick={() => setOpen(!open)}
            className="basic-info-btn btn-primary"
            aria-expanded={open}
          >
            Basic info
          </Button>
          
          <Collapse in={open}>
            <Card className="info-card">
              <ul className="list-unstyled">
                <li><strong>Brand:</strong> {data?.basic_info?.Carmake}</li>
                <li><strong>Model:</strong> {data?.basic_info?.Carmodel}</li>
                <li><strong>Year:</strong> {data?.basic_info?.RegistrationYear}</li>
                <li><strong>Type:</strong> {data?.basic_info?.BodyType}</li>
                <li><strong>Fuel:</strong> {data?.basic_info?.FuelType}</li>
                <li><strong>Transmission:</strong> {data?.basic_info?.Transmission}</li>
              </ul>
            </Card>
          </Collapse>
        </div>

        {/* Vehicle Rating */}
        <div className="section-spacing">
          <VehicleHealth 
            healthScore={data?.vehicle_health} 
            safetyRating={data?.safety_rating} 
          />
        </div>

        {/* Market Value */}
        <div className="section-spacing">
          <h3>Market Value</h3>
          <div className="price-container">
            <Price data={data} />
          </div>
        </div>

        {/* Common Issues */}
        <div className="section-spacing">
          <IssueBlob issues={data?.common_issues} />
        </div>

        {/* Search Again Button */}
        <div className="section-spacing">
          <Button 
            variant="primary"
            size="lg"
            onClick={() => navigate("/")}
            className="mt-4 mb-5"
          >
            Search Again
          </Button>
        </div>
      </div>

      
      <footer className="full-width-footer">
        <div>
          <p className="mb-2">Good2Know is a Trademark of 123 Oy</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default InfoScreen;
