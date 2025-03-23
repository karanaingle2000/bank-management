// components/Content.js
import React from 'react';

const Content = () => {
  return (
    <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold">About Us</h3>
        <p>Learn more about our bank and our values.</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold">Loans</h3>
        <p>Explore our loan options tailored for you.</p>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h3 className="text-xl font-semibold">Contact Us</h3>
        <p>Get in touch with our customer service.</p>
      </div>
    </div>
  );
};

export default Content;