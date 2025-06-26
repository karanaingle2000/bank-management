import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [accountNo, setAccountNo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:8080/api/bank/forgot-password', { accountNo });
      if (response.status === 200) {
        setSuccess('A password reset link has been sent to your email.');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex min-h-screen p-14 bg-gray-100">
      <div className="flex items-center justify-center w-full p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Forgot Password</h2>
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4">
              <input
                type="text"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                placeholder="Account Number"
                className="border border-gray-300 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 transition duration-300">
              Send Reset Link
            </button>
          </form>
          {error && < p className="text-red-500 mt-4 text-center font-semibold">{error}</p>}
          {success && <p className="text-green-500 mt-4 text-center font-semibold">{success}</p>}
          <p className="mt-4 text-center">
            Remembered your password? 
            <button     
              onClick={() => navigate('/login')}
              className="text-blue-500 underline ml-1"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;