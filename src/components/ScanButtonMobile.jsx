'import { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

/* eslint-disable react/prop-types */
function Button({ label }) {
  
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      console.log('Captured file:', file);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <button 
        className="btn btn-dark rounded-circle d-flex align-items-center justify-content-center position-relative border-0" 
        onClick={handleButtonClick} 
        style={{
          width: '150px', 
          height: '150px', 
          background: 'radial-gradient(circle at center, rgba(0, 171, 249, 0.6) 0%, #2d2d2d 55%)',
          boxShadow: '0 0 20px rgba(0, 171, 249, 0.4)',
          color: '#fff',
          fontSize: '1.4rem',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => e.target.style.background = 'radial-gradient(circle at center, rgba(0, 171, 249, 0.8) 0%, #2d2d2d 70%)'}
        onMouseOut={(e) => e.target.style.background = 'radial-gradient(circle at center, rgba(0, 171, 249, 0.6) 0%, #2d2d2d 55%)'}
      >
        {label || 'Scan'}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
}

export default Button;
