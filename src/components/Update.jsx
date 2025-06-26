import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaUser, FaIdCard, FaBriefcase, FaLock, FaPhone, FaHome, FaCalendarAlt } from 'react-icons/fa';

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
  const [accountNo, setAccountNo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const storedAccountNo = localStorage.getItem('accountNo');
    if (storedAccountNo) {
      setAccountNo(storedAccountNo);
      fetchUserData(storedAccountNo);
    } else {
      setError('No account number found. Please login again.');
    }
  }, []);

  const fetchUserData = async (accNo) => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/api/bank/customer', {
        params: { accountNo: accNo }
      });
      
      setFormData({
        fullName: response.data.fullName || '',
        aadharNo: response.data.aadharNo || '',
        panNo: response.data.panNo || '',
        address: response.data.address || '',
        dob: response.data.dob ? response.data.dob.split('T')[0] : '',
        occupation: response.data.occupation || '',
        phoneNo: response.data.phoneNo || '',
      });
      setError('');
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Failed to fetch user data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    const aadharRegex = /^\d{12}$/;
    const panRegex = /[A-Z]{5}[0-9]{4}[A-Z]{1}/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formData.fullName.trim()) errors.fullName = 'Full Name is required';
    if (!formData.aadharNo.trim()) errors.aadharNo = 'Aadhar Number is required';
    else if (!aadharRegex.test(formData.aadharNo)) errors.aadharNo = 'Invalid Aadhar Number';
    if (!formData.panNo.trim()) errors.panNo = 'PAN Number is required';
    else if (!panRegex.test(formData.panNo)) errors.panNo = 'Invalid PAN Number';
    if (!formData.address.trim()) errors.address = 'Address is required';
    if (!formData.dob) errors.dob = 'Date of Birth is required';
    else {
      const dobDate = new Date(formData.dob);
      const currentDate = new Date();
      const minAgeDate = new Date();
      minAgeDate.setFullYear(currentDate.getFullYear() - 18);
      
      if (dobDate > minAgeDate) errors.dob = 'You must be at least 18 years old';
    }
    if (!formData.phoneNo.trim()) errors.phoneNo = 'Phone Number is required';
    else if (!phoneRegex.test(formData.phoneNo)) errors.phoneNo = 'Invalid Phone Number';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (error) setError('');
    if (success) setSuccess('');
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.put('http://localhost:8080/api/bank/customer1', { 
        accountNo,
        ...formData
      });

      if (response.status === 200) {
        setSuccess('Information updated successfully!');
        setError('');
        // Refresh the data to ensure consistency
        fetchUserData(accountNo);
      }
    } catch (error) {
      console.error('Update error:', error);
      if (error.response && error.response.data) {
        setError(`Update failed: ${error.response.data.message || error.response.data}`);
      } else {
        setError('Update failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !formData.fullName) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-700">Loading your information...</p>
        </div>
      </div>
    );
  }

  if (error && !accountNo) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <div className="text-red-500 mb-4">
            <FaUser className="mx-auto text-4xl" />
            <p className="mt-2 font-bold">Authentication Error</p>
          </div>
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.href = '/login'}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 items-center justify-center">
        <div className="text-white p-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Update Your Profile</h1>
          <p className="text-xl mb-6">Keep your information up to date for seamless banking experience</p>
          <div className="animate-bounce">
            <FaUser className="text-6xl mx-auto opacity-80" />
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-center w-full lg:w-1/2 p-4 sm:p-8">
        <div className="bg-white rounded-lg shadow-xl p-6 sm:p-8 w-full max-w-lg transform transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Personal Information
          </h2>
          
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
              <p>{error}</p>
            </div>
          )}
          
          {success && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
              <p>{success}</p>
            </div>
          )}

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`border ${validationErrors.fullName ? 'border-red-500' : 'border-gray-300'} pl-10 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  disabled={isLoading}
                />
              </div>
              {validationErrors.fullName && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.fullName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 mb-1">Aadhar Number</label>
                <div className="relative">
                  <FaIdCard className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="aadharNo"
                    value={formData.aadharNo}
                    onChange={handleChange}
                    className={`border ${validationErrors.aadharNo ? 'border-red-500' : 'border-gray-300'} pl-10 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    maxLength="12"
                    disabled={isLoading}
                  />
                </div>
                {validationErrors.aadharNo && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.aadharNo}</p>
                )}
              </div>

              <div>
                <label className="block text-gray-700 mb-1">PAN Number</label>
                <div className="relative">
                  <FaIdCard className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="panNo"
                    value={formData.panNo}
                    onChange={handleChange}
                    className={`border ${validationErrors.panNo ? 'border-red-500' : 'border-gray-300'} pl-10 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    maxLength="10"
                    disabled={isLoading}
                  />
                </div>
                {validationErrors.panNo && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.panNo}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Occupation</label>
              <div className="relative">
                <FaBriefcase className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleChange}
                  className={`border ${validationErrors.occupation ? 'border-red-500' : 'border-gray-300'} pl-10 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  disabled={isLoading}
                />
              </div>
              {validationErrors.occupation && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.occupation}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Phone Number</label>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="tel"
                  name="phoneNo"
                  value={formData.phoneNo}
                  onChange={handleChange}
                  className={`border ${validationErrors.phoneNo ? 'border-red-500' : 'border-gray-300'} pl-10 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  maxLength="10"
                  disabled={isLoading}
                />
              </div>
              {validationErrors.phoneNo && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.phoneNo}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Address</label>
              <div className="relative">
                <FaHome className="absolute left-3 top-3 text-gray-400" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  className={`border ${validationErrors.address ? 'border-red-500' : 'border-gray-300'} pl-10 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  disabled={isLoading}
                ></textarea>
              </div>
              {validationErrors.address && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.address}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 mb-1">Date of Birth</label>
              <div className="relative">
                <FaCalendarAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="date"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className={`border ${validationErrors.dob ? 'border-red-500' : 'border-gray-300'} pl-10 p-2 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  disabled={isLoading}
                />
              </div>
              {validationErrors.dob && (
                <p className="text-red-500 text-sm mt-1">{validationErrors.dob}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-md text-white font-semibold ${isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} transition duration-300`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating...
                </span>
              ) : (
                'Update Information'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
