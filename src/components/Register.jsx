import React, { useState } from 'react';
import axios from 'axios';
import { FaUser , FaIdCard, FaBriefcase, FaLock, FaPhone } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    aadharNo: '',
    panNo: '',
    address: '',
    dob: '',
    occupation: '',
    password: '',
    phoneNo: '',
    state: '',          // New field for state
    district: '',       // New field for district
    subDistrict: '',    // New field for sub-district
    villageOrCity: '',  // New field for village or city
    pincode: '',        // New field for pincode
    landmark: ''        // New field for landmark
  });

  const [photo, setPhoto] = useState(null); // State to hold the uploaded photo
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [accountNo, setAccountNo] = useState(''); // State to hold the generated account number
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
    setSuccess('');
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]); // Set the selected file
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (photo) {
      formDataToSend.append('photo', photo); // Append the photo file
    }

    try {
      const response = await axios.post('http://localhost:8080/api/bank/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setSuccess(response.data.message); // Set success message
        setAccountNo(response.data.accountNo); // Set the generated account number
        setFormData({
          fullName: '',
          aadharNo: '',
          panNo: '',
          address: '',
          dob: '',
          occupation: '',
          password: '',
          phoneNo: '',
          state: '',
          district: '',
          subDistrict: '',
          villageOrCity: '',
          pincode: '',
          landmark: ''
        });
        setPhoto(null); // Reset photo state
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(`Registration failed: ${error.response.data}`);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };
  const handleLogin = () => {
    navigate('/login'); 
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('./public/images/banklogin.jpg')" }}></div>
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Bank Registration</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          {accountNo && <p className="text-blue-500 mb-4">Your Account Number: {accountNo}</p>} {/* Display the account number */}
          <form onSubmit={handleRegister}>
            <div className="relative mb-4">
              <FaUser  className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                className="border border-gray-300 pl-10 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative mb-4">
              <FaIdCard className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="aadharNo"
                value={formData.aadharNo}
                onChange={handleChange}
                placeholder="Aadhar Number"
                className="border border-gray-300 pl-10 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={12}
                required
              />
            </div>
            <div className="relative mb-4">
              <FaIdCard className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="panNo"
                value={formData.panNo}
                onChange={handleChange}
                placeholder="PAN Number"
                className="border border-gray-300 pl-10 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={10}
                required
              />
            </div>
            <div className="relative mb-4">
              <FaBriefcase className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                placeholder="Occupation"
                className="border border-gray-300 pl-10 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative mb-4">
              <FaPhone className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
                placeholder="Phone Number"
                className="border border-gray-300 pl-10 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                className="border border-gray-300 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative mb-4">
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="border border-gray-300 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
           
            <div className="relative mb-4">
              <input
                type="file"
                name="photo"
                onChange={handleFileChange}
                placeholder='Upload Photo'
                className="border border-gray-300 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* New fields for state, district, sub-district, village/city, pincode, and landmark */}
            <div className="relative mb-4">
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className="border border-gray-300 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="District"
                className="border border-gray-300 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="subDistrict"
                value={formData.subDistrict}
                onChange={handleChange}
                placeholder="Sub-District"
                className="border border-gray-300 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="villageOrCity"
                value={formData.villageOrCity}
                onChange={handleChange}
                placeholder="Village/City"
                className="border border-gray-300 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="Pincode"
                className="border border-gray-300 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                placeholder="Landmark"
                className="border border-gray-300 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative mb-4">
              <FaUser  className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="branch"
                // value={formData.fullName}
                // onChange={handleChange}
                placeholder="Branch Name"
                className="border border-gray-300 pl-10 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative mb-4">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="border border-gray-300 pl-10 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                minLength={4}
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 transition duration-300">
              Register
            </button>
            
          </form>
          <br />
          <button onClick={handleLogin} className="mt-4 bg-green-500 text-white p-2 w-full rounded hover:bg-green-600 transition duration-300">
              Go to Login Page
            </button>
          
            
          
        </div>
      </div>
    </div>
  );
};

export default Register;