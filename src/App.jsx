import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScanButton from './components/ScanButtonMobile.jsx';
import '../src/styles/App.css';
import DataFetching from './components/ApiData';
import { FiGrid } from 'react-icons/fi';
import reactLogo from './assets/G2KTitle.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import DragAndDrop from './components/DragAndDropComp.jsx';
import LoadingScreen from './LoadingScreen';
import InfoScreen from './infoPage.jsx';

function MainApp() {
    return (
        <div>
            <div className='container col d-flex flex-column align-items-center justify-content-center '>
                <div className="title mb-4">
                    <img src={reactLogo} alt="React Logo" />
                </div>
                <div className='d-none d-lg-block mb-3'>
                    <DragAndDrop />
                </div>
                <div className='d-lg-none d-block'>
                    <ScanButton label="Scan" />
                </div>
                <div>
                    <DataFetching />
                </div>
                <div className="garage-outer-section mt-5 d-md-none" />
                <div className="garage-section d-flex align-items-center justify-content-center m-1 py-2 px-3 mb-md-5 position-relative">
                    <FiGrid className="garage-icon row-6 me-2" />
                    <span className="garage-text row-6">My Garage</span>
                </div>
                <div className="garage-down-section mb-5 d-md-none " />
            </div>
            <footer className="footer p-3 d-flex justify-content-center bottom-0 position-fixed">
                <div className='footer-text mt-5'>
                    <p className="m-0">Good2Know is a Trademark of 123 Oy</p>
                    <p>
                        <a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a>
                    </p>
                </div>
            </footer>
        </div>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainApp />} />
                <Route path="/loading" element={<LoadingScreen />} />
                <Route path="/info" element={<InfoScreen />} />
            </Routes>
        </Router>
    );
}

export default App;