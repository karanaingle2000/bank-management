import React, { useState } from 'react';
import axios from 'axios';
import { FaUser , FaIdCard, FaBriefcase, FaLock, FaPhone, FaEnvelope } from 'react-icons/fa';
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
    email: '', // New field for email
    state: '',
    district: '',
    subDistrict: '',
    villageOrCity: '',
    pincode: '',
    landmark: ''
  });

  const [photo, setPhoto] = useState(null);
  const [otp, setOtp] = useState(''); // State for OTP
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
    setSuccess('');
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    if (photo) {
      formDataToSend.append('photo', photo);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/bank/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      if (response.status === 200) {
        setSuccess(response.data.message);
        setAccountNo(response.data.accountNo);
        setFormData({
          fullName: '',
          aadharNo: '',
          panNo: '',
          address: '',
          dob: '',
          occupation: '',
          password: '',
          phoneNo: '',
          email: '', // Reset email
          
        });
        setPhoto(null);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(`Registration failed: ${error.response.data}`);
      } else {
        setError('Registration failed. Please try again.');
      }
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleVerifyOtp = async () => {
    // Implement OTP verification logic here
    try {
      const response = await axios.post('http://localhost:8080/api/bank/verify-otp', { otp });
      if (response.status === 200) {
        setSuccess('OTP verified successfully!');
      }
    } catch (error) {
      setError('OTP verification failed. Please try again.');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('./public/images/banklogin.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Bank Registration</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          {accountNo && <p className="text-blue-500 mb-4">Your Account Number: {accountNo}</p>}
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
              <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
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
                minLength={10}
                maxLength={10}
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
            {/* OTP input field */}
            <div className="relative mb-4">
              <input
                type="text"
                name="otp"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter OTP"
                className="border border-gray-300 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button type="button" onClick={handleVerifyOtp} className="bg-yellow-500 text-white p-2 w-full rounded hover:bg-yellow-600 transition duration-300">
              Verify OTP
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 transition duration-300 mt-4">
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