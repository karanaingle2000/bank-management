// components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle, FaMoneyBillWave, FaEnvelope, FaUser , FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // State to manage mobile menu

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="./public/images/banklogo.jpg" alt="Bank Logo" className="h-10 mr-3 object-cover rounded" />
          <h1 className="text-white text-2xl">Magdha Bank</h1>
        </div>
        <div className="hidden md:flex items-center ml-auto space-x-10">
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
        <div className="flex items-center ml-auto md:hidden">
          <button onClick={toggleMenu} className="text-white hover:text-gray-300">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-gray-800 p-4`}>
        <Link to="/" className="text-white hover:text-gray-300 block py-2">
          <FaHome className="mr-1" /> Home
        </Link>
        <Link to="/about" className="text-white hover:text-gray-300 block py-2">
          <FaInfoCircle className="mr-1" /> About
        </Link>
        <Link to="/loans" className="text-white hover:text-gray-300 block py-2">
          <FaMoneyBillWave className="mr-1" /> Loans
        </Link>
        <Link to="/contact" className="text-white hover:text-gray-300 block py-2">
          <FaEnvelope className="mr-1" /> Contact Us
        </Link>
        <Link to="/login" className="text-white hover:text-gray-300 block py-2">
          <FaUser  className="mr-1" /> Login
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;