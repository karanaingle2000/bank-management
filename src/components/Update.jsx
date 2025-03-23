import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser , FaIdCard, FaBriefcase, FaLock, FaPhone } from 'react-icons/fa';

const Update = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    aadharNo: '',
    panNo: '',
    address: '',
    dob: '',
    occupation: '',
    phoneNo: '',
    password: ''
  });
  const [accountNo, setAccountNo] = useState(localStorage.getItem('accountNo'));
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const customerResponse = await axios.get('http://localhost:8080/api/bank/customer', {
          params: { accountNo }
        });
        console.log (customerResponse.data);
        setFormData({
          fullName: customerResponse.data.fullName || '',
          aadharNo: customerResponse.data.aadharNo || '',
          panNo: customerResponse.data.panNo || '',
          address: customerResponse.data.address || '',
          dob: customerResponse.data.dob || '',
          occupation: customerResponse.data.occupation || '',
          phoneNo: customerResponse.data.phoneNo || '',
          password:    customerResponse.data.password || '',
        });
      } catch (error) {
        setError('Failed to fetch user data. Please try again.');
      }
    };

    fetchUserData();
  }, [accountNo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
    setSuccess('');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('http://localhost:8080/api/bank/customer1',accountNo, formData);
      if (response.status === 200) {
        setSuccess('Information updated successfully!');
        setError('');
      }
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data) {
        setError(`Update failed: ${error.response.data}`);
      } else {
        setError('Update failed. Please try again.');
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('./public/images/banklogin.jpg')" }}></div>
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Update Information</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
          <form onSubmit={handleUpdate}>
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
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password (leave blank to keep unchanged)"
                className="border border-gray-300 pl-10 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 transition duration-300">
              Update Information
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update; 