import React, { useState } from 'react';

const loanOptions = [
  {
    title: "Personal Loans",
    description: "Flexible loans for personal expenses.",
    details: "Personal loans can be used for various purposes, including debt consolidation, home improvements, and unexpected expenses. They typically have fixed interest rates and repayment terms. The application process is straightforward, and funds can be disbursed quickly. Personal loans are unsecured, meaning you don't need to provide collateral. Loan amounts can range from $1,000 to $50,000, with repayment terms of 1 to 5 years.",
    interestRate: "10% APR",
    duration: "1 to 5 years",
    image: "/images/personalloan.jpg",
  },
  {
    title: "Home Loans",
    description: "Competitive rates for purchasing your dream home.",
    details: "Home loans are designed for purchasing real estate. They usually come with lower interest rates compared to personal loans and can be paid over a long period. Home loans can be fixed-rate or adjustable-rate, allowing you to choose the best option for your financial situation. The loan amount is typically based on the property's value, and you may need to provide a down payment. Repayment terms can range from 15 to 30 years.",
    interestRate: "3.5% APR",
    duration: "15 to 30 years",
    image: "/images/homeloan.jpg",
  },
  {
    title: "Car Loans",
    description: "Financing options for your new vehicle.",
    details: "Car loans help you purchase a vehicle by providing the necessary funds upfront. You repay the loan amount over time, usually with interest. Car loans can be secured by the vehicle itself, which may result in lower interest rates. Loan amounts typically range from $5,000 to $100,000, depending on the vehicle's price. Repayment terms usually vary from 3 to 7 years.",
    interestRate: "5% APR",
    duration: "3 to 7 years",
    image: "./images/carloan.webp",
  },
  {
    title: "Education Loans",
    description: "Support for your educational aspirations.",
    details: "Education loans cover tuition fees, books, and living expenses while you study. They often have flexible repayment options, allowing you to start repaying after graduation. Interest rates can be lower than personal loans, and some loans offer deferment options while you are in school. Loan amounts can vary based on the institution and program, with repayment terms typically ranging from 5 to 15 years.",
    interestRate: "4% APR",
    duration: "5 to 15 years",
    image: "./images/educationloan.webp",
  },
  {
    title: "Business Loans",
    description: "Funding solutions for your business needs.",
    details: "Business loans provide capital for starting or expanding a business. They can be used for equipment, inventory, or operational costs. Business loans can be secured or unsecured, depending on the amount and type of financing. Interest rates may vary based on the business's creditworthiness and the loan's terms. Loan amounts can range from $5,000 to several million dollars, with repayment terms typically between 1 to 10 years.",
    interestRate: "7% APR",
    duration: "1 to 10 years",
    image: "./images/business.jpg",
  },
  {
    title: "Medical Loans",
    description: "Financial assistance for medical expenses.",
    details: "Medical loans can help cover the costs of medical treatments, surgeries, or procedures that are not covered by insurance. These loans often have flexible repayment options and can be used for both planned and emergency medical expenses. Interest rates are typically competitive, and the application process is quick. Loan amounts can vary based on the treatment required, with repayment terms ranging from 1 to 5 years.",
    interestRate: "8% APR",
    duration: "1 to 5 years",
    image: "./images/medicalloan.jpg",
  },
  {
    title: "Travel Loans",
    description: "Loans to fund your travel adventures.",
    details: "Travel loans can help you finance your dream vacation or travel plans, allowing you to pay for flights, accommodations, and activities. These loans typically have flexible repayment terms and can be used for both domestic and international travel. Interest rates may vary based on your credit score and the loan amount. Loan amounts can range from $1,000 to $20,000, with repayment terms of 1 to 5 years.",
    interestRate: "9% APR",
    duration: "1 to 5 years",
    image: "./images/travalloan.avif",
  },
  {
    title: "Wedding Loans",
    description: "Financial support for your dream wedding.",
    details: "Wedding loans can help cover the costs of your wedding, including venue, catering, and other expenses. These loans often have flexible repayment options and can be tailored to fit your budget. Interest rates are typically competitive, and the application process is straightforward. Loan amounts can range from $1,000 to $50,000, with repayment terms of 1 to 5 years.",
    interestRate: "6% APR",
    duration: "1 to 5 years",
    image: "./images/weddingloan.png",
  },
  {
    title: "Debt Consolidation Loans",
    description: "Combine multiple debts into a single loan.",
    details: "Debt consolidation loans allow you to combine several debts into one loan with a single monthly payment, often at a lower interest rate. This can simplify your finances and help you manage your payments more effectively. Interest rates may vary based on your credit score and the total amount of debt being consolidated. Loan amounts can range from $1,000 to $50,000, with repayment terms typically between 2 to 5 years.",
    interestRate: "5.5% APR",
    duration: "2 to 5 years",
    image: "./images/debtloan.webp",
  },
  {
    title: "Green Loans",
    description: "Loans for eco-friendly projects.",
    details: "Green loans are designed to finance environmentally friendly projects, such as solar panel installations or energy-efficient home upgrades. These loans often come with lower interest rates and favorable terms to encourage sustainable practices. Loan amounts can vary based on the project, with repayment terms typically ranging from 5 to 15 years.",
    interestRate: "4.5% APR",
    duration: "5 to 15 years",
    image: "./greenloan.jpg",
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
    <div className="container mx-auto p-6 bg-gray-100">
      <h2 className="text-4xl font-bold text-center text-blue-800 mb-6">Loan Options</h2>
      <p className="text-center text-gray-700 mb-6">
        We offer a variety of loan options to suit your needs:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {loanOptions.map((loan, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
            <img src={loan.image} alt={loan.title} className="w-full h-48 object-cover rounded-t-lg mb-4" />
            <h3 className="text-2xl font-semibold text-blue-600">{loan.title}</h3>
            <p className="text-gray-600 mb-2">{loan.description}</p>
            <p className="text-gray-500">Interest Rate: <span className="font-bold">{loan.interestRate}</span></p>
            <p className="text-gray-500">Duration: <span className="font-bold">{loan.duration}</span></p>
            <div className="mt-4 space-y-2">
              <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300 cursor-pointer w-full"
                onClick={() => handleLearnMore(loan)}
              >
                Learn More
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300 cursor-pointer w-full">
                Apply for a Loan
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedLoan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
            <h3 className="text-3xl font-semibold text-blue-600">{selectedLoan.title}</h3>
            <img src={selectedLoan.image} alt={selectedLoan.title} className="w-full h-64 object-cover rounded-lg mb-4" />

            <p className="text-gray-700 mb-4">{selectedLoan.details}</p>
            <p className="text-gray-500">Interest Rate: <span className="font-bold">{selectedLoan.interestRate}</span></p>
            <p className="text-gray-500">Duration: <span className="font-bold">{selectedLoan.duration}</span></p>
            <button 
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-300"
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