const carData = {
    license_plate: "XYZ-789",
    vehicle_health: 7,
    safety_rating: 8,
    prices: {
        labels: ["Min Price", "Avg Price", "Max Price"],
        datasets: [
            {
                label: "Car Prices",
                data: [15000, 25000, 35000], 
                backgroundColor: ["rgba(75,192,192,0.6)", "rgba(54,162,235,0.6)", "rgba(255,99,132,0.6)"],
                barPercentage: 0.6, // ✅ Move it inside dataset
                categoryPercentage: 0.6, // ✅ Move it inside dataset
            }
        ]
    },
    common_issues: {
        "Engine Misfire": 50,
        "Oil Leak": 20,
        "Battery Drain": 70,
        "Brake Wear": 100,
        "Transmission Slippage": 17,
        "AC Malfunction": 5,
        "Electrical Issues": 13,
        "Tire Pressure Loss": 7
    },
    basic_info: {
        make: "Mazda",
        model: "CX-5",
        year: 2020,
        type: "SUV",
        fuel: "Gasoline",
        transmission: "Automatic"
    },
    yearly_maintenance_cost: 700
};

export default carData;