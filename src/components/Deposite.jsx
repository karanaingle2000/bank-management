import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';


const Deposit = () => {
  const [accountNo, setAccountNo] = useState(localStorage.getItem('accountNo') || '');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const password = localStorage.getItem('password');
  const navigate = useNavigate();


  const handleDeposit = async (e) => {
    e.preventDefault();
    setError('');

    if (!accountNo || !amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid account number and a positive amount.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/bank/deposit', null, {
        params: { accountNo, amount: parseFloat(amount), password }
      });

      if (response.status === 200) {
        alert('Deposit successful!');
        setAmount(''); // Reset only the amount
      } else {
        setError(response.data || 'Deposit failed. Please try again.');
      }
    } catch (error) {
      console.error('Error depositing money:', error);
      setError(error.response?.data || 'Error depositing money. Please check your account number and amount.');
    }
  };
  const handleback = () => {
    navigate('/dashboard');
  };

  return (
    <form onSubmit={handleDeposit} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Deposit Money</h2>
      <input
        type="text"
        value={accountNo}
        onChange={(e) => setAccountNo(e.target.value)}
        placeholder="Account Number"
        className="border p-2 mb-4 w-full"
        required
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="border p-2 mb-4 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Deposit</button>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      <button onClick={handleback} className="bg-blue-500 text-white p-2 w-full">Back</button>

    </form>
  );
};

export default Deposit;