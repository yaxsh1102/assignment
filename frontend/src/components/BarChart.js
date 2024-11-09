import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const months = [
  { name: "January", number: 1 },
  { name: "February", number: 2 },
  { name: "March", number: 3 },
  { name: "April", number: 4 },
  { name: "May", number: 5 },
  { name: "June", number: 6 },
  { name: "July", number: 7 },
  { name: "August", number: 8 },
  { name: "September", number: 9 },
  { name: "October", number: 10 },
  { name: "November", number: 11 },
  { name: "December", number: 12 }
];

function BarChart() {
  const [month, setMonth] = useState(8);
  const [barData, setBarData] = useState([]); 

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/v1/get-bar-graph?month=${month}`)
      .then((response) => {
        if (Array.isArray(response.data.data)) { 
          setBarData(response.data.data); 
        } else {
          console.error("Expected an array, but got", response.data.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [month]);

  const chartData = {
    labels: barData.map((item) => item.range),
    datasets: [
      {
        label: "Count",
        data: barData.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Data Range Count",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Count",
        },
      },
      x: {
        title: {
          display: true,
          text: "Range",
        },
      },
    },
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="flex items-center justify-center my-4">
        <select
          className="w-44 h-10 px-4 rounded-lg text-center outline-none"
          value={month}
          onChange={handleMonthChange}
        >
          <option value="">Select Month</option>
          {months.map((monthItem) => (
            <option key={monthItem.number} value={monthItem.number}>
              {monthItem.name}
            </option>
          ))}
        </select>
      </div>

      {barData.length > 0 && (
        <div style={{ height: "400px", width: "60%" }}>
          <Bar data={chartData} options={options} />
        </div>
      )}
    </div>
  );
}

export default BarChart;
