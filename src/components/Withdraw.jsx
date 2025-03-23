import React, { useState } from 'react';
import axios from 'axios';

const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const password = localStorage.getItem('password');
  const accountNo = localStorage.getItem('accountNo');

  const handleWithdraw = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/bank/withdraw', null, { params: { accountNo, amount ,password} }); // Replace with actual account number
      alert('Withdrawal successful!');
    } catch (error) {
      alert('Error withdrawing money.');
    }
  };

  return (
    <form onSubmit={handleWithdraw} className="max-w-md mx-auto p-4">
      <h2 className="text-2xl mb-4">Withdraw Money</h2>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="border p-2 mb-4 w-full"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full">Withdraw</button>
    </form>
  );
};

export default Withdraw;