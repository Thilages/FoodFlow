import { useState } from 'react';
import { mealData } from './constant';
import axios from 'axios';
import PredictSalesAndCovers from './Weather';

function DailyEntry() {




  const [selectedDay, setSelectedDay] = useState('monday');
  const [selectedMeal, setSelectedMeal] = useState('breakfast');
  const [foodWasteData, setFoodWasteData] = useState([]);
  const [foodPrepared, setFoodPrepared] = useState('');
  const [foodWaste, setFoodWaste] = useState('');
  const [currentDishIndex, setCurrentDishIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);





  const handleDayChange = (e) => {
    setSelectedDay(e.target.value);
    setCurrentDishIndex(0);
    setFoodWasteData([]);
    setIsFinished(false);
  };

  const handleMealChange = (meal) => {
    setSelectedMeal(meal);
    setCurrentDishIndex(0);
    setIsFinished(false);
  };

  const handlePreparedChange = (e) => {
    setFoodPrepared(e.target.value);
  };

  const handleWasteChange = (e) => {
    setFoodWaste(e.target.value);
  };

  const handleSaveWaste = () => {
    const currentMeal = mealData[selectedDay][selectedMeal];
    const updatedMeal = [...currentMeal];
    updatedMeal[currentDishIndex].waste = foodWaste;
    mealData[selectedDay][selectedMeal] = updatedMeal;

    setFoodWasteData([
      ...foodWasteData,
      { dish: updatedMeal[currentDishIndex].item, prepared: foodPrepared, waste: foodWaste },
    ]);

    if (currentDishIndex < updatedMeal.length - 1) {
      setCurrentDishIndex(currentDishIndex + 1);
    } else {
      setCurrentDishIndex(0);
      setIsFinished(true);
    }

    setFoodPrepared('');
    setFoodWaste('');
  };

  const handleUpload = async () => {
    try {
      // Make a POST request to your Flask server using Axios
      const response = await axios.post('http://127.0.0.1:5000/upload', foodWasteData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log('Data uploaded successfully:', response.data);
        alert('Data uploaded successfully!');
      } else {
        console.error('Failed to upload data:', response.statusText);
        alert('Failed to upload data. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('Error uploading data. Please check your server connection.');
    }

    // Reset the form after uploading
    setIsFinished(false);
    setFoodWasteData([]);
  };
  const handleCancel = () => {
    setIsFinished(false);
    setFoodWasteData([]);
  };

  if (isFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r p-8 font-[Montserrat]">
        <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg space-y-8 p-12">
          <header className="text-center">
            <h1 className="text-4xl font-bold text-yellow-600">Thank You!</h1>
            <p className="text-lg text-gray-700 mt-2">
              Your food waste data has been recorded successfully.
            </p>
          </header>
          <div className="text-center mt-8 space-x-4">
            <button
              className="py-3 px-6 bg-yellow-600 text-white font-semibold rounded-lg"
              onClick={handleUpload}
            >
              Upload Data
            </button>
            <button
              className="py-3 px-6 bg-gray-300 text-gray-800 font-semibold rounded-lg"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r p-8 font-[Montserrat]">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg space-y-8 p-12">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-yellow-600">Daily Food Waste Tracker</h1>
        </header>

        {/* Weather Section */}
        {/* <PredictSalesAndCovers /> */}

        <div className="flex justify-between items-start space-x-8">
          <div className="w-2/3">
            <div className="mb-6">
              <label htmlFor="day-select" className="block text-xl font-semibold text-gray-700 mb-2">Select Day</label>
              <select
                id="day-select"
                className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                value={selectedDay}
                onChange={handleDayChange}
              >
                {Object.keys(mealData).map((day) => (
                  <option key={day} value={day}>
                    {day.charAt(0).toUpperCase() + day.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-between mb-6 px-12">
              {['breakfast', 'lunch', 'dinner'].map((meal) => (
                <button
                  key={meal}
                  className={`px-8 py-2 text-lg font-semibold text-white rounded-lg ${selectedMeal === meal ? 'bg-yellow-300 border-4 text-orange-500 border-orange-500' : 'bg-orange-500'}`}
                  onClick={() => handleMealChange(meal)}
                >
                  {meal.charAt(0).toUpperCase() + meal.slice(1)}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Dish: {mealData[selectedDay][selectedMeal][currentDishIndex].item}</h3>
              <div className='flex gap-7'>
                <input
                  id='foodPreparedInput'
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter food prepared in kg"
                  value={foodPrepared}
                  onChange={handlePreparedChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      document.getElementById('foodWasteInput').focus();
                    }
                  }}
                />
                <input
                  id="foodWasteInput"
                  type="number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  placeholder="Enter food waste in kg"
                  value={foodWaste}
                  onChange={handleWasteChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSaveWaste();
                      e.preventDefault();
                      document.getElementById('foodPreparedInput').focus();
                    }
                  }}
                />
              </div>
            </div>

            <button
              className="w-full py-3 bg-gradient-to-r from-orange-400 to-yellow-500 text-white text-xl font-semibold rounded-lg"
              onClick={handleSaveWaste}
            >
              Save Waste & Next
            </button>
          </div>

          <div className="w-1/3 bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Recorded Data</h3>
            <ul className="space-y-3">
              {foodWasteData.map((entry, index) => (
                <li key={index} className="flex justify-between">
                  <span>{entry.dish}</span> <span>{entry.prepared}kg prepared, {entry.waste}kg wasted</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>

  );
}

export default DailyEntry;