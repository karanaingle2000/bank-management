// components/Hero.js
import React from 'react';

const Hero = () => {
  return (
    <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: "url('https://example.com/hero-image.jpg')" }}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative flex items-center justify-center h-full">
        <h2 className="text-white text-4xl font-bold">Welcome to Our Bank</h2>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">Get Started</button>
      </div>
    </div>
  );
};

export default Hero;