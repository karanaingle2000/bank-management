// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 p-6 text-white text-center">
      <div className="container mx-auto">
        <p className="text-lg font-semibold mb-2">&copy; 2023 Bank Name. All rights reserved.</p>
        <div className="mt-4">
          <h3 className="text-xl font-bold mb-1">Contact Information</h3>
          <p className="text-sm">
            Email: 
            <a 
              href="mailto:karanaingle@2000gmail.com" 
              className="underline hover:text-gray-300 ml-1"
            >
              karanaingle@2000gmail.com
            </a>
          </p>
          <p className="text-sm">
            Phone: 
            <a 
              href="tel:9022895592" 
              className="underline hover:text-gray-300 ml-1"
            >
              9022895592
            </a>
          </p>
          <p className="text-sm">Address: 123 Main St, City, Country</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;