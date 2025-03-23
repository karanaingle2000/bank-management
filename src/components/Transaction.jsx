// src/Transaction.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [accountNo, setAccountNo] = useState(localStorage.getItem('accountNo'));
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTransactions = async () => {
            if (!accountNo) {
                setError("Account number is not set.");
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get('http://localhost:8080/api/bank/transactions', {
                    params: { accountNo }
                });
                setTransactions(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, [accountNo]);  

    const handlePrint = () => {
        window.print();
    };

    if (loading) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4 text-center">Transaction History</h1>
            <div className="flex justify-between mb-4">
                <button 
                    onClick={() => navigate('/dashboard')}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
                >
                    Go Back to Dashboard
                </button>
                <button 
                    onClick={handlePrint}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-200"
                >
                    Print Transactions
                </button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-900 shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-blue-600 text-white">
                        <tr>
                            <th className="py-3 px-4 border-b border-gray-300">Transaction ID</th>
                            <th className="py-3 px-4 border-b border-gray-300">Account No</th>
                            <th className="py-3 px-4 border-b border-gray-800">Amount</th>
                            <th className="py-3 px-4 border-b border-gray-300">Date</th>
                            <th className="py-3 px-4 border-b border-gray-300">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id} className="hover:bg-gray-100 transition duration-200">
                                <td className="py-3 text-center px-4 border-b border-gray-700">{transaction.id}</td>
                                <td className="py-3 text-center px-4 border-b border-gray-300">{transaction.accountNo}</td>
                                <td className="py-3 text-center px-4 border-b border-gray-300  font-semibold text-green-600">{transaction.amount}</td>
                                <td className="py-3 text-center px-4 border-b border-gray-300">{new Date(transaction.timestamp).toLocaleDateString()}</td>  
                                <td className="py-3 text-center px-4 border-b border-gray-300">{transaction.type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Transaction;