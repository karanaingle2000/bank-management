// components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaMoneyBillWave, FaEnvelope, FaUser , FaSearch } from 'react-icons/fa';  

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="./public/images/banklogo.jpg" alt="Bank Logo" className="h-10 mr-3 object-cover rounded" />  
          <h1 className="text-white text-2xl">Magdha Bank</h1>
        </div>
        <div className="flex items-start ml-auto space-x-10">
          <Link to="/" className="text-white hover:text-gray-300 flex items-center">
            <FaHome className="mr-1" /> Home
          </Link>
          <Link to="/about" className="text-white hover:text-gray-300 flex items-center">
            <FaInfoCircle className="mr-1" /> About
          </Link>
          <Link to="/loans" className="text-white hover:text-gray-300 flex items-center">
            <FaMoneyBillWave className="mr-1" /> Loans
          </Link>
          <Link to="/contact" className="text-white hover:text-gray-300 flex items-center">
            <FaEnvelope className="mr-1" /> Contact Us
          </Link>
          <Link to="/login" className="text-white hover:text-gray-300 flex items-center">
            <FaUser  className="mr-1" /> Login
          </Link>
        </div>
        <div className="flex items-center ml-24 space-x-4">
          <button className="text-white hover:text-gray-300 relative">
            <FaSearch />
            {/* Optional: Add a tooltip or modal for search functionality */}
          </button>
          <Link to="/login" className="text-white hover:text-gray-300">
            <FaUser  />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;