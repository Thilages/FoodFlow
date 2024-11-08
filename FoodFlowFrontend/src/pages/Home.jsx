import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { GiKnifeFork } from "react-icons/gi";
import { FaTrashAlt, FaChartLine, FaDollarSign,FaRupeeSign } from "react-icons/fa";
import WasteBreakdown from '../components/WasteBreakDown';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const HomePage = () => {
  const lastWeekData = {
    totalPrepared: 1500,
    totalWasted: 280,
    weeklyChange: -15,
    savings: 1520,
  };

  const wasteTrendData = {
    labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    datasets: [
      {
        label: 'Food Waste (kg)',
        data: [53, 77, 41, 88, 64, 36, 29], 
        borderColor: '#FF8800', 
        backgroundColor: (context) => {
          const value = context.raw;
          // Use a gradient based on the value for color intensity
          const maxValue = 130; // Set the maximum value for color intensity
          const intensity = (value / maxValue) * 255; // Calculate intensity
          return `rgb(${255 + intensity}, ${intensity}, 0)`; // Gradient from red to yellow
        },
        borderWidth: 1, // Thinner border
        fill: true,
        categoryPercentage: 0.8, // Adjust bar width
        barThickness: 35,

        // Reduced thickness of the bars
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false, // Hide legend if not needed
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.raw} kg`,
          // Customize tooltip label
        },
        titleFont: {
          family: 'Montserrat', // Set font family for tooltip title
          size: 18,             // Set font size for tooltip title
        },
        bodyFont: {
          family: 'Montserrat', // Set font family for tooltip body
          size: 16,             // Set font size for tooltip body
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Waste (kg)',
          font: {
            family: 'Montserrat', // Set font family for the Y-axis title
            size: 16,
            weight: 'bold'             // Set font size for the Y-axis title
          },
        },
        grid: {
          color: '#e0e0e0',
          lineWidth: 1,
          borderDash: [4, 4],
          drawBorder: false,
        },
        ticks: {
          stepSize: 20,
          font: {
            family: 'Montserrat', // Set font family for Y-axis labels
            size: 14,             // Set font size for Y-axis labels
          },
        },
      },
      x: {
        grid: {
          display: false,
        },

        ticks: {
          font: {
            family: 'Montserrat', // Set font family for X-axis labels
            size: 14,             // Set font size for X-axis labels
          },
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 20,
      },
    },
    maintainAspectRatio: false, // Allow manual height adjustment
  };

  return (
    <div className=" container mx-auto p-6 font-[Montserrat]">
      {/* Last Week's Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8 ">
        {/* Total Food Prepared Card */}
        <div className="bg-gradient-to-r from-orange-400 to-yellow-500 hover:scale-105 transition-transform duration-200 text-white p-4 rounded-lg shadow-md flex justify-between">
          <div>
            <p className="text-4xl font-bold">{lastWeekData.totalPrepared} kg</p>
            <h2 className="text-lg font-semibold">Total Food Prepared</h2>
          </div>
          <GiKnifeFork size={64} className="text-white mt-10" />
        </div>

        {/* Total Food Wasted Card */}
        <div className="bg-transparent p-4 rounded-lg shadow-2xl flex justify-between border-2 hover:scale-105 transition-transform duration-200 border-gray-200">
          <div>
            <p className="text-4xl text-gray-700 font-bold">{lastWeekData.totalWasted} kg</p>
            <h2 className="text-lg font-semibold">Total Food Wasted</h2>
          </div>
          <FaTrashAlt size={64} className="text-gray-700 mt-10" />
        </div>

        {/* Weekly Waste Reduction Card */}
        <div className="bg-transparent p-4 rounded-lg shadow-2xl flex justify-between border-2 hover:scale-105 transition-transform duration-200 border-gray-200">
          <div>
            <p className="text-4xl text-gray-700 font-bold">{lastWeekData.weeklyChange}%</p>
            <h2 className="text-lg font-semibold">Waste Reduction</h2>
          </div>
          <FaChartLine size={64} className="text-gray-700 mt-10" />
        </div>

        {/* Savings from Last Week Card */}
        <div className="bg-transparent p-4 rounded-lg shadow-2xl flex justify-between border-2 hover:scale-105 transition-transform duration-200 border-gray-200">
          <div>
            <p className="text-4xl text-gray-700 font-bold">₹{lastWeekData.savings}</p>
            <h2 className="text-lg font-semibold">Weekly Savings</h2>
          </div>
          <FaRupeeSign  size={64} className="text-gray-700 mt-10" />
        </div>
      </div>

      <div className='flex'>
        {/* Waste Reduction Trend Bar Chart */}

        <div className="w-[100%] h-[380px] p-4 bg-white rounded-lg  relative">
          <div className='flex justify-between'>
            <div className='text-2xl font-semibold text-gray-700 ml-3 mb-16'>Weekly Wastage</div>
            <div className='flex text-center'>
              <div className='mr-5'>
                <h1 className='text-gray-700 font-light'>Average Waste</h1>
                <h1 className='text-2xl font-semibold text-orange-600'>30Kg</h1>
              </div>
              <div>
                <h1 className='text-gray-700 font-light'>People Count</h1>
                <h1 className='text-2xl font-semibold text-yellow-600'>987</h1></div>
            </div>
          </div>
          <Bar data={wasteTrendData} options={chartOptions} />
          {/* <h1 className="absolute top-[10px] left-4 font-semibold text-orange-800">Waste Trend</h1> */}
        </div>
        <div className='w-full h-full   border-gray-200'>
          <WasteBreakdown/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
