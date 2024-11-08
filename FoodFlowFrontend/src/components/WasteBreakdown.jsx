import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';

ChartJS.register(ArcElement, Tooltip, Legend);

const WasteBreakdown = () => {
  // Fake data for yesterday's food waste
  const mealData = {
    breakfast: [
      { item: 'Pancakes', waste: 1.2 },
      { item: 'Eggs', waste: 0.8 },
      { item: 'Toast', waste: 0.5 },
      { item: 'Fruit Salad', waste: 0.3 },
      { item: 'Coffee', waste: 0.4 },
    ],
    lunch: [
      { item: 'Rice', waste: 2.0 },
      { item: 'Chicken', waste: 1.5 },
      { item: 'Salad', waste: 0.7 },
      { item: 'Bread', waste: 0.6 },
      { item: 'Soup', waste: 0.9 },
    ],
    dinner: [
      { item: 'Pasta', waste: 1.5 },
      { item: 'Steak', waste: 1.0 },
      { item: 'Vegetables', waste: 0.6 },
      { item: 'Bread', waste: 0.5 },
      { item: 'Wine', waste: 0.3 },
    ],
  };

  const [mealTime, setMealTime] = useState('breakfast'); // Default is showing all meals

  // Function to generate pie chart data based on selected meal
  const getChartData = (meal) => {
    const items = mealData[meal] || [];
    const labels = items.map((item) => item.item);
    const data = items.map((item) => item.waste);

    // Generate colors based on waste value (from red to orange)
    const getColor = (value) => {
      const red = Math.min(255, 200 + (1 - value) * 105);  // Ensure red reaches dark red
      const green = Math.max(0, (1 - value) * 200);       // Green decreases as waste increases
      const blue = 0;                                    // Blue stays 0 to keep it in the red spectrum
      return `rgb(${red}, ${green}, ${blue})`;
    };
    // Apply color mapping to each segment
    const backgroundColor = data.map((waste) => getColor(waste));

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor,
          hoverBackgroundColor: backgroundColor,
          // Same for hover effect
        },
      ],
    };
  };

  // Handle button click to filter data by meal time
  const handleButtonClick = (meal) => {
    setMealTime(meal);
  };

  return (
    <div className="w-full px-4 bg-white rounded-lg relative flex  items-start space-x-4">
      {/* Left side: Pie chart */}
      
      <div className="w-[70%] h-[450px] flex justify-center items-center relative">
        {mealTime !== 'all' ? (
          <Pie
            data={getChartData(mealTime)}
            options={{
              responsive: true,
              rotation: 210, // Start the chart from the top
              circumference: 300, // Make it a 3/4 donut
              cutout: '70%', // Hollow center (the size of the hole)
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (tooltipItem) => {
                      return `${tooltipItem.label}: ${tooltipItem.raw} kg`; // Label showing the waste in kg
                    },
                  },
                },
                legend: {
                  position: 'right', // Position legend to the right
                  align: 'middle', // Align items at the top of the container
                  labels: {
                    boxWidth: 10, // Set boxWidth to make the strip slimmer
                    padding: 20,
                    font: {
                      family: 'Montserrat', // Set font family for the Y-axis title
                      
                      weight: 'bold'             // Set font size for the Y-axis title
                    },  // Space between the box and text
                    usePointStyle: true, // Use a circle style for labels
                    generateLabels: (chart) => {
                      return chart.data.labels.map((label, i) => {
                        const wasteAmount = chart.data.datasets[0].data[i];
                        return {
                          text: `${label}: ${wasteAmount} kg`, // Display item name and waste amount
                          fillStyle: chart.data.datasets[0].backgroundColor[i], // Use the color for each item
                          strokeStyle: chart.data.datasets[0].backgroundColor[i],
                        };
                      });
                    },
                  },
                },
              },
              maintainAspectRatio: false,
            }}
          />
        
        ) : (
          <p className="text-xl font-semibold text-gray-500">Select a meal to view the waste breakdown</p>
          
        )}<h1 className='absolute font-semibold text-2xl text-gray-500 left-14' >
          Yesterdays Waste
        </h1>
      </div>

      {/* Right side: 3 buttons stacked on top of each other */}
      <div className="flex flex-col space-y-4 w-[30%] pt-24 ">
        <div
          className="flex justify-center items-center border-2 p-2 bg-gray-100 cursor-pointer rounded-md"
          onClick={() => handleButtonClick('breakfast')}
        >
          Breakfast
        </div>
        <div
          className="flex justify-center items-center border-2 p-2 bg-gray-100 cursor-pointer rounded-md"
          onClick={() => handleButtonClick('lunch')}
        >
          Lunch
        </div>
        <div
          className="flex justify-center items-center border-2 p-2 bg-gray-100 cursor-pointer rounded-md"
          onClick={() => handleButtonClick('dinner')}
        >
          Dinner
        </div>
      </div>
    </div>
  );
};

export default WasteBreakdown;
