import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const [accountHolderName, setAccountHolderName] = useState('');
  const [accountNo, setAccountNo] = useState(localStorage.getItem('accountNo'));
  const [showInfo, setShowInfo] = useState(false);
  const [customerInfo, setCustomerInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [adhar, setAdhar] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
 const [dob, setDob] = useState('');
  const password = localStorage.getItem('password');
  const [pin, setPin] = useState('');

  useEffect(() => {
    const fetchAccountInfo = async () => {
      setLoading(true);
      try {
        if (!accountNo) {
          throw new Error('Account number is not set. Please log in again.');
        }

        // Make sure to include the password in the request
        const balanceResponse = await axios.get('http://localhost:8080/api/bank/balance', {
          params: { accountNo, password } // Include password here
        });
        setBalance(balanceResponse.data);

        const customerResponse = await axios.get('http://localhost:8080/api/bank/customer', {
          params: { accountNo }
        });
        console.log(customerResponse.data);
        setCustomerInfo(customerResponse.data);
        setAccountHolderName(customerResponse.data.fullName);
        setAdhar(customerResponse.data.aadharNo);
        setPhone(customerResponse.data.phoneNo);
        setAddress(customerResponse.data.address);
        setOccupation(customerResponse.data.occupation);
        setDob(customerResponse.data.dob);
        setPin(customerResponse.data.password);
        
      } catch (error) {
        console.error('Error fetching account information:', error);
        const errorMessage = error.response?.data?.message || 'Failed to fetch account information. Please try again later.';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountInfo();
  }, [accountNo, password]);

  const handleLogout = () => {
    localStorage.removeItem('accountNo');
    localStorage.removeItem('password');
    navigate('/login');
  };

  const toggleInfo = () => {
    setShowInfo(!showInfo);
  };

  const handleDeposit = () => {
    navigate('/deposite');
  };

  const handleWithdraw = () => {
    navigate('/withdraw');
  };

  const handleUpdateInfo = () => {
    navigate('/update');
  };
  const handleTransction = () => {
    navigate('/transaction');
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Banking App</h1>
          <button onClick={handleLogout} className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded">
            Logout
          </button>
        </div>
      </header>
      <div className="container mx-auto p-4">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div>
            <h2 className="text-xl font-semibold">Account Holder: {accountHolderName}</h2>
            <p className="text-lg">Balance: ${balance}</p>
            <p className="text-lg">Account No: {accountNo}</p>

            <button onClick={toggleInfo} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
              {showInfo ? 'Hide Info' : 'Show Info'}
            </button>
            {showInfo && customerInfo && (
              <div className="mt-4 p-4 border border-gray-300 rounded">
                <h3 className="font-bold">Customer Information</h3>
                <table className="min-w-full mt-2">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2">Field</th>
                      <th className="px-4 py-2">Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border px-4 py-2">Name</td>
                      <td className="border px-4 py-2">{accountHolderName}</td>
                    </tr>
 <tr>
                      <td className="border px-4 py-2">Adhar No</td>
                      <td className="border px-4 py-2">{adhar}</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Phone</td>
                      <td className="border px-4 py-2">{phone}</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Address</td>
                      <td className="border px-4 py-2">{address}</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Occupation</td>
                      <td className="border px-4 py-2">{occupation}</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Date Of Birth</td>
                      <td className="border px-4 py-2">{dob}</td>
                    </tr>
                    <tr>
                      <td className="border px-4 py-2">Your Pin :</td>
                      <td className="border px-4 py-2">{pin}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
            <div className="mt-4 flex space-x-4">
              <button onClick={handleDeposit} className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded">
                Deposit
              </button>
              <button onClick={handleWithdraw} className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded">
                Withdraw
              </button>
              <button onClick={handleUpdateInfo} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Update Info
              </button>
              <button onClick={handleTransction} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded">
                Show Transction 
              </button>
            </div>
          </div>
        )}
      </div>
      <footer className="bg-blue-600 p-4 text-white mt-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Banking App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;