import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import DailyEntry from './pages/DailyEntry';
import WeeklyRecommendations from './pages/WeeklyRecommendations';
import WeatherApp from './Weather';
import PredictSalesAndCovers from './pages/Weather';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily-entry" element={<DailyEntry />} />
          <Route path="/weekly-recommendations" element={<WeeklyRecommendations />} />
          <Route path='/weather' element={<PredictSalesAndCovers/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
