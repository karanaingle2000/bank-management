// components/Hero.js
import React from 'react';
import { useEffect, useState } from 'react';

const Hero = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeIn(true);
    }, 100); // Delay for fade-in effect
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-[740px] bg-cover bg-center" style={{ backgroundImage: "url('./images/homebank.webp')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className={`relative flex flex-col items-center justify-center h-full text-center p-4 transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <h2 className="text-white text-4xl font-bold mb-2">Welcome to Our Bank</h2>
        <p className="text-black text-2xl mb-4">
          Your trusted partner for financial growth and security. We offer a variety of services to meet your needs.
        </p>
        <p className="text-white text-md mb-4">
          From personal loans to investment advice, we are here to help you achieve your financial goals.
        </p>
        <p className="text-white text-md mb-4">
          Experience our user-friendly online banking platform and 24/7 customer support.
        </p>
        <button className="mt-4 bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition">
          Get Started
        </button>
        <p className="text-white text-sm mt-4">
          Join us today and experience exceptional banking services tailored just for you.
        </p>
      </div>
    </div>
  );
};

export default Hero;