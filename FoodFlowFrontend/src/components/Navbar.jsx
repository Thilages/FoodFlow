import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className=" text-gray-600 shadow-md border-2 border-gray-400">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-blue-300">
          FoodFlow
          </Link>
        </div>
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-blue-300 transition duration-300">
            Home
          </Link>
          <Link to="/daily-entry" className="hover:text-blue-300 transition duration-300">
            Daily Entry
          </Link>
          <Link to="/weather" className="hover:text-blue-300 transition duration-300">
            Sales Prediction
          </Link>
          
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
