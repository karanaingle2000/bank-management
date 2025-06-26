import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importing from 'react-router-dom'
import Register from './components/Register';
import Dashboard from './components/Dashbord';
import Deposit from './components/Deposite';
import Withdraw from './components/Withdraw';
import Login from './components/Login';
import Home from './components/Home';
import About from './Homepages/About';
import Loans from './Homepages/Loans';
import Contact from './Homepages/Contact';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Update from './components/update';
import Transaction from './components/Transaction';
import ForgotPassword from './components/ForgotPassword';
  

const App = () => {
  return (
    <Router>
      <Navbar  />
      <div className="App">
        <Routes>
          <Route path="/about" element={<About />} /> 
          <Route path="/loans" element={<Loans />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/update" element={<Update />} />
          <Route path="/transaction" element={<Transaction />} />  
          <Route path="/forgot-password" element={<ForgotPassword />} />
 

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />  
          <Route path="/deposite" element={<Deposit />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/login" element={<Login />} /> 
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;