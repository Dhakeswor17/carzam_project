
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRef, useState } from 'react';
import '../styles/ScanButtonMobile.css';
import { useNavigate } from 'react-router-dom';

/* eslint-disable react/prop-types */
function Button({ label }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");


  const handleButtonClick = () => {


    if (fileInputRef.current) {
      fileInputRef.current.click();
    }



  };

  // Handle the selected (or captured) file
  const handleFileChange = async (event) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      const file = files[0];
      console.log('Captured file:', file);
  
      const formData = new FormData();
      formData.append('image', file);
  
      try {
        const response = await fetch('http://localhost:5000/upload', {
          method: 'POST',
          body: formData,
        });
  
        const result = await response.json();
        const licensePlate = result.parsedResponse.license_plate;
        const country = result.parsedResponse.license_plate_country;
  
        console.log('Response from backend:', licensePlate, country);
  
      
        navigate("/loading", {
          state: {
            searchQuery: licensePlate,
            selectedCountry: country
          }
        });
  
      } catch (error) {
        console.error('Error uploading file:', error);
        setError("Failed to upload file");
      }
    }
  };

  return (
    <>
      <button className="scan-button" onClick={handleButtonClick}>
        {label || 'Click Me'}
      </button>

     
      
    </>
  );
}

export default Button;
