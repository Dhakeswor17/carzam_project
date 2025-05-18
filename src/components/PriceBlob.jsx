import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import 'bootstrap/dist/css/bootstrap.min.css';
import './PriceBlob.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function PriceBlob({ data }) {
  // Transform the data into correct format for Chart.js
  const chartData = {
    labels: data?.prices?.labels || [],
    datasets: [
      {
        label: data?.prices?.datasets?.label || 'Car Prices',
        data: data?.prices?.datasets?.data || [],
        backgroundColor: data?.prices?.datasets?.backgroundColor || [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 99, 132, 0.6)'
        ],
        barPercentage: 0.6,
        categoryPercentage: 0.6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: { 
          color: 'white', 
          textAlign: "center" 
        },
        grid: {
          color: "rgba(230, 230, 230, 0.08)",
        },
      },
      y: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: "rgba(230, 230, 230, 0.08)",
        },
      },
    },
  };

  if (!data?.prices) {
    return (
      <div className="ListIssues">
        <p style={{color: 'white'}}>Price data not available</p>
      </div>
    );
  }

  return (
    <div className="ListIssues">
      <Bar 
        data={chartData} 
        options={options} 
        width={380} 
        height={230} 
      />
    </div>
  );
}

export default PriceBlob;