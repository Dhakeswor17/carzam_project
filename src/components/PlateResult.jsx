// src/components/PlateResult.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// Example car data (can be replaced with your actual data source)
const carDatabase = [
    { license_plate: "ABC123", make: "Toyota", model: "Corolla", year: 2020 },
    { license_plate: "XYZ789", make: "Ford", model: "Fiesta", year: 2018 },
    { license_plate: "G2KDEV", make: "Tesla", model: "Model 3", year: 2023 }
];

function PlateResult({ plateNumber }) {
    const [loadingStep, setLoadingStep] = useState(0);
    const [status, setStatus] = useState(null); // 'found', 'not-found'
    const [carInfo, setCarInfo] = useState(null);

    useEffect(() => {
        if (!plateNumber) return;

        const checkPlate = async () => {
            for (let i = 1; i <= 3; i++) {
                await new Promise(res => setTimeout(res, 700)); // Simulate delay
                setLoadingStep(i);
            }

            const foundCar = carDatabase.find(car => car.license_plate.toLowerCase() === plateNumber.toLowerCase());

            if (foundCar) {
                setStatus('found');
                setCarInfo(foundCar);
            } else {
                setStatus('not-found');
            }
        };

        checkPlate();
    }, [plateNumber]);

    const getDotColor = (step) => {
        if (loadingStep >= step) {
            return status === 'found' ? 'text-success' : (status === 'not-found' ? 'text-danger' : 'text-white');
        }
        return 'text-white';
    };

    return (
        <div className="text-center mt-4">
            <p>Loading...</p>
            <p className={`${getDotColor(1)}`}>● Getting data from source 1...</p>
            <p className={`${getDotColor(2)}`}>● Getting data from source 2...</p>
            <p className={`${getDotColor(3)}`}>● Getting data from source 3...</p>

            {status === 'found' && carInfo && (
                <div className="mt-3 p-3 border rounded bg-light">
                    <h5>Car Information</h5>
                    <p><strong>Plate:</strong> {carInfo.license_plate}</p>
                    <p><strong>Make:</strong> {carInfo.make}</p>
                    <p><strong>Model:</strong> {carInfo.model}</p>
                    <p><strong>Year:</strong> {carInfo.year}</p>
                </div>
            )}

            {status === 'not-found' && (
                <div className="mt-3 text-danger">
                    <p>No information found for plate <strong>{plateNumber}</strong></p>
                </div>
            )}
        </div>
    );
}

export default PlateResult;
