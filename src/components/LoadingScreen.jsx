import './LoadingScreen.css'
import reactLogo from './assets/G2KTitle.png';
import appLogo from './assets/G2KLogo.png';
import CheckList from './components/CheckListComp';
import 'bootstrap/dist/css/bootstrap.min.css';
import CheckListComp from './components/CheckListComp';

function LoadingScreen() {


  return (
    <div>
      <div className='container col d-flex flex-column align-items-center justify-content-top p-3 '>
        <div className="title mb-4">
          <img src={reactLogo} alt="React Logo" />
        </div>
        <div className='logo col d-flex flex-column align-items-center justify-content-center'>
            <img className="app-logo" src={appLogo} alt="App Logo" />
            <p>Loading...</p>
            <CheckList/>
        </div>
        </div>
            <footer className="footer p-3 d-flex justify-content-center bottom-0 position-fixed" >
        <div className='footer-text mt-5' >
          <p className="m-0">Good2Know is a Trademark of 123 Oy</p>
          <p>
            <a href="#">Privacy Policy</a> | <a href="#">Terms of Use</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LoadingScreen
