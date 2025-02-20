import ScanButton from './components/ScanButtonMobile.jsx'
import './App.css'
import DataFetching from './components/ApiData'
import { FiGrid } from 'react-icons/fi'
import reactLogo from './assets/G2KTitle.png';

function App() {

 
  return (
    <div>
      <div className='container'>
        <div className="title ">
          <img src={reactLogo} alt="React Logo" />
        </div>
        <div>
          <ScanButton  label="Scan" />
        </div>
        <div>
          <DataFetching />
        </div>
        <div className="garage-outer-section text-center"> v
        </div>
        <div className="garage-section text-center">
          <FiGrid className="garage-icon" />
          <span className="garage-text">My Garage</span>
        </div>
        <div className="garage-down-section text-center">

        </div>
      </div>
      <footer className="footer">
        <div className='footer-text'>
          <p className="m-0">Good2Know is a Trademark of 123 Oy</p>
          <p>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
