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
  const [adhar, setAdhar] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [occupation, setOccupation] = useState('');
  const [dob, setDob] = useState('');
  const [pin, setPin] = useState('');
  const [photoPath, setPhotoPath] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [recipientAccountNo, setRecipientAccountNo] = useState('');
  const [transferError, setTransferError] = useState(null);
  const [transferSuccess, setTransferSuccess] = useState(null);
  const password = localStorage.getItem('password');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAccountInfo = async () => {
      setLoading(true);
      try {
        if (!accountNo) {
          throw new Error('Account number is not set. Please log in again.');
        }

        const balanceResponse = await axios.get('http://localhost:8080/api/bank/balance', {
          params: { accountNo, password }
        });
        setBalance(balanceResponse.data);

        const customerResponse = await axios.get('http://localhost:8080/api/bank/customer', {
          params: { accountNo }
        });
        setCustomerInfo(customerResponse.data);
        setAccountHolderName(customerResponse.data.fullName);
        setAdhar(customerResponse.data.aadharNo);
        setPhone(customerResponse.data.phoneNo);
        setAddress(customerResponse.data.address);
        setOccupation(customerResponse.data.occupation);
        setDob(customerResponse.data.dob);
        setPin(customerResponse.data.password);
        setPhotoPath(customerResponse.data.photoPath);   

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
    navigate('/withdraw'); // Adjust the route as necessary
  };

  const handleTransaction = () => {
    navigate('/transaction');
  };

  const handleTransfer = async () => {
    setTransferError(null);
    setTransferSuccess(null);
    
    try {
        const response = await axios.post('http://localhost:8080/api/bank/transfer', {
            fromAccountNo: accountNo,
            toAccountNo: recipientAccountNo,
            amount: parseFloat(transferAmount),
            password: password  
        });

        setTransferSuccess(response.data);  
        setTransferAmount('');  
        setRecipientAccountNo(''); 
    } catch (error) {
        const errorMessage = error.response?.data?.message || 'Transfer failed. Please try again.';
        setTransferError(errorMessage);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gradient-to-r from-blue-800 to-blue-600 p-4 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-lg font-bold">Banking Dashboard</h1>
          <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition duration-300">
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto p-4">
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Account Overview */}
            <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
              <h2 className="text-lg font-semibold text-gray-700">Account Overview</h2>
              <div className="mt-4">
                <p className="text-gray-600">Balance: <span className="font-bold text-green-600">${balance}</span></p>
                <p className="text-gray-600">Account No: {accountNo}</p>
              </div>
              {photoPath && (
                <div className="mt-4">
                  <img 
                    src={`http://localhost:8080/uploads/${photoPath}`} 
                    alt="Account Holder" 
                    className="w-32 h-32 rounded-full border-4 border-blue-500 shadow-lg" 
                    onError={(e) => { e.target.onerror = null; e.target.src = './images/banklogo.jpg'; }}  
                  />
                </div>
              )}
              <div className="mt-4 flex space-x-4">
                <button onClick={handleDeposit} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition duration-300">
                  Deposit
                </button>
                <button onClick={handleWithdraw} className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded transition duration-300">
                  Withdraw
                </button>
                <button onClick={handleTransaction} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300">
                  Transactions
                </button>
              </div>
            </div>

            {/* Card 2: Quick Transfer */}
<div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
  <h2 className="text-lg font-semibold text-gray-700">Quick Transfer</h2>
  <input
      className="w-full p-2 mb-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Recipient Account No"
      type="text"
      value={recipientAccountNo}
      onChange={(e) => setRecipientAccountNo(e.target.value)}
  />
  <input
      className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Enter amount"
      type="number"
      value={transferAmount}
      onChange={(e) => setTransferAmount(e.target.value)}
  />
  
  {/* Predefined Amount Buttons */}
  <div className="flex flex-wrap gap-2 mb-4">
    {[100, 200, 500, 1000, 2000, 5000].map((amount) => (
      <button
        key={amount}
        onClick={() => setTransferAmount(amount)}
        className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded transition duration-300"
      >
        ${amount}
      </button>
    ))}
  </div>

  <button
      onClick={handleTransfer}
      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-300"
  >
      Send Money
  </button>
  {transferError && <p className="text-red-500 mt-2">{transferError}</p>}
  {transferSuccess && <p className="text-green-500 mt-2">{transferSuccess}</p>}
</div>

            {/* Card 3: Customer Information */}
            <div className="bg-white rounded-lg shadow-lg p-6 transition-transform transform hover:scale-105">
              <h2 className="text-lg font-semibold text-gray-700">Customer Information</h2>
              <button onClick={toggleInfo} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition duration-300">
                {showInfo ? 'Hide Info' : 'Show Info'}
              </button>
              {showInfo && customerInfo && (
                <div className="mt-4 p-4 border border-gray-300 rounded bg-gray-50">
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
                        <td className="border px-4 py-2">Account No</td>
                        <td className="border px-4 py-2">{accountNo}</td>
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
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gradient-to-r from-blue-800 to-blue-600 p-4 text-white mt-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2023 Banking App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;