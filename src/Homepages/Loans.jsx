// components/Loans.js
import React, { useState } from 'react';

const loanOptions = [
  {
    title: "Personal Loans",
    description: "Flexible loans for personal expenses.",
    details: "Personal loans can be used for various purposes, including debt consolidation, home improvements, and unexpected expenses. They typically have fixed interest rates and repayment terms. The application process is straightforward, and funds can be disbursed quickly. Personal loans are unsecured, meaning you don't need to provide collateral. Loan amounts can range from $1,000 to $50,000, with repayment terms of 1 to 5 years.",
    interestRate: "10% APR",
    duration: "1 to 5 years",
    image: "./public/images/personalloan.jpg",
  },
  {
    title: "Home Loans",
    description: "Competitive rates for purchasing your dream home.",
    details: "Home loans are designed for purchasing real estate. They usually come with lower interest rates compared to personal loans and can be paid over a long period. Home loans can be fixed-rate or adjustable-rate, allowing you to choose the best option for your financial situation. The loan amount is typically based on the property's value, and you may need to provide a down payment. Repayment terms can range from 15 to 30 years.",
    interestRate: "3.5% APR",
    duration: "15 to 30 years",
    image: "./public/images/homeloan.jpg",
  },
  {
    title: "Car Loans",
    description: "Financing options for your new vehicle.",
    details: "Car loans help you purchase a vehicle by providing the necessary funds upfront. You repay the loan amount over time, usually with interest. Car loans can be secured by the vehicle itself, which may result in lower interest rates. Loan amounts typically range from $5,000 to $100,000, depending on the vehicle's price. Repayment terms usually vary from 3 to 7 years.",
    interestRate: "5% APR",
    duration: "3 to 7 years",
    image: "./public/images/carloan.webp",
  },
  {
    title: "Education Loans",
    description: "Support for your educational aspirations.",
    details: "Education loans cover tuition fees, books, and living expenses while you study. They often have flexible repayment options, allowing you to start repaying after graduation. Interest rates can be lower than personal loans, and some loans offer deferment options while you are in school. Loan amounts can vary based on the institution and program, with repayment terms typically ranging from 5 to 15 years.",
    interestRate: "4% APR",
    duration: "5 to 15 years",
    image: "./public/images/educationloan.webp",
  },
  {
    title: "Business Loans",
    description: "Funding solutions for your business needs.",
    details: "Business loans provide capital for starting or expanding a business. They can be used for equipment, inventory, or operational costs. Business loans can be secured or unsecured, depending on the amount and type of financing. Interest rates may vary based on the business's creditworthiness and the loan's terms. Loan amounts can range from $5,000 to several million dollars, with repayment terms typically between 1 to 10 years.",
    interestRate: "7% APR",
    duration: "1 to 10 years",
    image: "./public/images/business.jpg",
  },
  {
    title: "Medical Loans",
    description: "Financial assistance for medical expenses.",
    details: "Medical loans can help cover the costs of medical treatments, surgeries, or procedures that are not covered by insurance. These loans often have flexible repayment options and can be used for both planned and emergency medical expenses. Interest rates are typically competitive, and the application process is quick. Loan amounts can vary based on the treatment required, with repayment terms ranging from 1 to 5 years.",
    interestRate: "8% APR",
    duration: "1 to 5 years",
    image: "./public/images/medicalloan.jpg",
  },
  {
    title: "Travel Loans",
    description: "Loans to fund your travel adventures.",
    details: "Travel loans can help you finance your dream vacation or travel plans, allowing you to pay for flights, accommodations, and activities. These loans typically have flexible repayment terms and can be used for both domestic and international travel. Interest rates may vary based on your credit score and the loan amount. Loan amounts can range from $1,000 to $20,000, with repayment terms of 1 to 5 years.",
    interestRate: "9% APR",
    duration: "1 to 5 years",
    image: "./public/images/travalloan.avif",
  },
  {
    title: "Wedding Loans",
    description: "Financial support for your dream wedding.",
    details: "Wedding loans can help cover the costs of your wedding, including venue, catering, and other expenses. These loans often have flexible repayment options and can be tailored to fit your budget. Interest rates are typically competitive, and the application process is straightforward. Loan amounts can range from $1,000 to $50,000, with repayment terms of 1 to 5 years.",
    interestRate: "6% APR",
    duration: "1 to 5 years",
    image: "./public/images/weddingloan.png",
  },
  {
    title: "Debt Consolidation Loans",
    description: "Combine multiple debts into a single loan.",
    details: "Debt consolidation loans allow you to combine several debts into one loan with a single monthly payment, often at a lower interest rate. This can simplify your finances and help you manage your payments more effectively. Interest rates may vary based on your credit score and the total amount of debt being consolidated. Loan amounts can range from $1,000 to $50,000, with repayment terms typically between 2 to 5 years.",
    interestRate: "5.5% APR",
    duration: "2 to 5 years",
    image: "./public/images/debtloan.webp",
  },
  {
    title: "Green Loans",
    description: "Loans for eco-friendly projects.",
    details: "Green loans are designed to finance environmentally friendly projects, such as solar panel installations or energy-efficient home upgrades. These loans often come with lower interest rates and favorable terms to encourage sustainable practices. Loan amounts can vary based on the project, with repayment terms typically ranging from 5 to 15 years.",
    interestRate: "4.5% APR",
    duration: "5 to 15 years",
    image: "./public/images/greenloan.jpg",
  },
];

const Loans = () => {
  const [selectedLoan, setSelectedLoan] = useState(null);

  const handleLearnMore = (loan) => {
    setSelectedLoan(loan);
  };

  const closeModal = () => {
    setSelectedLoan(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">Loan Options</h2>
      <p className="mb-4">
        We offer a variety of loan options to suit your needs:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {loanOptions.map((loan, index) => (
          <div key={index} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
            <img src={loan.image} alt={loan.title} className="w-full h-72 object-cover rounded mb-2" />
            <h3 className="text-xl font-semibold">{loan.title}</h3>
            <p>{loan.description}</p>
            <p className="text-gray-600">Interest Rate: {loan.interestRate}</p>
            <p className="text-gray-600">Duration: {loan.duration}</p>
            <button 
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer mt-2"
              onClick={() => handleLearnMore(loan)}
            >
              Learn More
            </button>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition cursor-pointer mt-4">
              Apply for a Loan
            </button>
          </div>
        ))}
      </div>

      {/* Modal for displaying more information about the selected loan */}
      {selectedLoan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h3 className="text-2xl font-semibold">{selectedLoan.title}</h3>
            <img src={selectedLoan.image} alt={selectedLoan.title} className="w-full h-96 object-cover rounded mb-2" />

            <p>{selectedLoan.details}</p>
            <p className="text-gray-600">Interest Rate: {selectedLoan.interestRate}</p>
            <p className="text-gray-600">Duration: {selectedLoan.duration}</p>
            <button 
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Loans;