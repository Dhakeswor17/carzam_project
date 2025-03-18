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




function InfoScreen() {
    const [open, setOpen] = useState(false);


    return (
        <>
            <div className='container-fluid col d-flex flex-column align-items-center pt-5 bg-background-element'>
                <div className="TitleLogo mb-4">
                    <img src={reactLogo} alt="React Logo" />
                </div>
                <div className="InfoMainImage d-flex flex-column align-items-center me-1 mb-5">
                    <h2 className='mb-5'>{cardata.license_plate}</h2>
                    <img
                        src={InfoMainImage}
                        style={{
                            maskImage: "linear-gradient( rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)",
                            WebkitMaskImage: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 1) 60%, rgba(0, 0, 0, 0) 100%)"
                        }} />
                </div>
                <div className='mt-3 d-flex flex-column align-items-center'>
                    <Button
                        onClick={() => setOpen(!open)}
                        aria-controls="example-collapse-text"
                        className='mt-3  btn btn-primary'
                        style={{ width: '350px' }}
                        aria-expanded={open}
                    >
                        Basic info
                    </Button>
                    <div style={{ minHeight: '100px', width: 'auto', marginBottom: '20px', position: 'static' }}>
                        <Collapse in={open} dimension="width">
                            <div id="example-collapse-text">
                                <Card className='mt-4 bg-background-element' body style={{ width: '250px' }}>
                                    <ul>Brand: {cardata.basic_info.make}</ul>
                                    <ul>Model: {cardata.basic_info.model}</ul>
                                    <ul>Year: {cardata.basic_info.year}</ul>
                                    <ul>Type: {cardata.basic_info.type}</ul>
                                    <ul>Fuel: {cardata.basic_info.fuel}</ul>
                                    <ul>Transmission: {cardata.basic_info.transmission}</ul>
                                </Card>
                            </div>
                        </Collapse>
                    </div>
                    <div className=' mb-5'>
                        <VehicleHealth />
                    </div>
                    <div className=' mb-5'>
                        <IssueBlob />
                    </div>

                </div>
                <footer className="footer p-3 d-flex justify-content-center bottom-0" >
                    <div className='footer-text mt-5' >
                        <p className="m-0">Good2Know is a Trademark of 123 Oy</p>
                        <p>
                            <a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a>
                        </p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default InfoScreen