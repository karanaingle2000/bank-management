import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUser , FaLock } from 'react-icons/fa'; // Importing icons

const Login = () => {
  const [accountNo, setAccountNo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:8080/api/bank/login', {
        accountNo,
        password
      });

      if (response.status === 200) {
        localStorage.setItem('accountNo', accountNo);
        localStorage.setItem('password', password);
        navigate('/dashboard');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid account number or password.');
      } else {
        setError('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen p-14 bg-gray-100">
      <div className="hidden lg:flex lg:w-1/2 bg-cover bg-center" style={{ backgroundImage: "url('./public/images/banklogin.jpg')" }}></div>
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md transform transition-all duration-500 hover:scale-105">
          <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Login to Your Account</h2>
          <form onSubmit={handleLogin}>
            <div className="relative mb-4">
              <FaUser  className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={accountNo}
                onChange={(e) => setAccountNo(e.target.value)}
                placeholder="Account Number"
                className="border border-gray-300 pl-10 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="relative mb-4">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="border border-gray-300 pl-10 p-2 w-full rounded transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600 transition duration-300 flex items-center justify-center" disabled={loading}>
              {loading ? (
                <span className="loader"></span> // Add a loader here
              ) : (
                'Login'
              )}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4 text-center font-semibold">{error}</p>}
          <p className="mt-4 text-center">
            Don't have an account? 
            <button 
              onClick={() => navigate('/register')}
              className="text-blue-500 underline ml-1"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;