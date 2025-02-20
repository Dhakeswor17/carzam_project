

import { useRef } from 'react';
import './ScanButtonMobile.css';

/* eslint-disable react/prop-types */
function Button({ label }) {
  
  const fileInputRef = useRef(null);

  
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle the selected (or captured) file
  const handleFileChange = (event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      console.log('Captured file:', file);
      
    }
  };

  return (
    <>
      <button className="scan-button" onClick={handleButtonClick}>
        {label || 'Click Me'}
      </button>

      {/* Hidden file input to open camera on mobile */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
}

export default Button;
