import React, { useState } from 'react';
import axios from 'axios';
import { FaRupeeSign, FaUserAlt } from 'react-icons/fa'; // Import icons from react-icons

function PredictSalesAndCovers() {
  const [weatherData, setWeatherData] = useState({
    apparent_temperature: '',
    humidity: '',
    precip_intensity_max: '',
    precip_max_time: '',
    summary: '0',
    recent_30_days: '0',
  });
  const [salesPrediction, setSalesPrediction] = useState(null);
  const [coversPrediction, setCoversPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    setWeatherData({
      ...weatherData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle the form submission and call the Flask server
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', weatherData);

      // Handle the response from the Flask server
      const { inside_sales, inside_covers } = response.data;
      setSalesPrediction(inside_sales);
      setCoversPrediction(inside_covers);
    } catch (err) {
      setError('Error fetching predictions from the server');
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen p-8 font-[Montserrat]">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg p-12">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-yellow-600 mb-5">Sales and Customers Prediction</h1>
        </header>

        <div className="flex space-x-12">
          {/* Left Side - Data Entry Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-xl font-semibold text-gray-700 mb-2">Apparent Temperature</label>
                <input
                  type="text"
                  name="apparent_temperature"
                  value={weatherData.apparent_temperature}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-xl font-semibold text-gray-700 mb-2">Humidity</label>
                <input
                  type="text"
                  name="humidity"
                  value={weatherData.humidity}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-xl font-semibold text-gray-700 mb-2">Precipitation Intensity Max</label>
                <input
                  type="text"
                  name="precip_intensity_max"
                  value={weatherData.precip_intensity_max}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <div>
                <label className="block text-xl font-semibold text-gray-700 mb-2">Precipitation Max Time</label>
                <input
                  type="text"
                  name="precip_max_time"
                  value={weatherData.precip_max_time}
                  onChange={handleChange}
                  required
                  className="w-full p-3 bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-orange-400 to-yellow-500 text-white text-xl font-semibold rounded-lg"
              >
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </form>
          </div>

          {/* Right Side - Predictions with Icons */}
          <div className="flex-1 space-y-8">
            {error && <p className="text-red-600 text-center">{error}</p>}

            {salesPrediction && coversPrediction && (
              <div className="space-y-8 text-center">
                {/* Revenue Prediction Card */}
                <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 space-y-4 flex-grow pt-20 ">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <FaRupeeSign className="h-12 w-12 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-700">Revenue Generation Prediction</h2>
                    <p className="text-xl text-gray-700">{salesPrediction}</p>
                  </div>
                </div>

                {/* Customer Prediction Card */}
                <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 space-y-4 flex-grow">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <FaUserAlt className="h-12 w-12 text-yellow-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-700">Customer Prediction</h2>
                    <p className="text-xl text-gray-700">{coversPrediction}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PredictSalesAndCovers;
