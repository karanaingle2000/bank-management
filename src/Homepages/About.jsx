// components/About.js
import React from 'react';

const teamMembers = [
  {
    name: "Karan Ingle",
    title: "Chairman of the Board",
    image: "./public/images/karan.jpeg",  
    bio: "Karan has over 3 years of experience in the banking industry. Under his leadership, the bank has grown significantly and has become a trusted name in financial services. He is dedicated to ensuring that the bank remains customer-focused and innovative."
  },
  {
    name: "Rishi Patil",
    title: "CEO",
    image: "./public/images/ceo.jpg",  
    bio: "Rishi has been with the bank for over 15 years, leading various initiatives to enhance customer experience and operational efficiency. Her vision is to make banking accessible and convenient for everyone."
  },
  {
    name: "Megha Kahadke",
    title: "CFO",
    image: "./public/images/meghaa.jpeg",  
    bio: "Megha oversees the bank's financial operations and strategy. With a strong background in finance, she ensures the bank's stability and growth while managing risks effectively."
  },
  {
    name: "Abhijit Ingle",
    title: "Head of Marketing",
    image: "./public/images/marketing.jpg",  
    bio: "Abhijit is responsible for the bank's marketing strategies and brand management. She has a passion for connecting with customers and promoting the bank's services."
  },
  {
    name: "Shankar Devkar",
    title: "Head of Customer Service",
    image: "./public/images/customer_service.jpg",  
    bio: "Shankar leads the customer service team, ensuring that all clients receive exceptional support. He believes in building strong relationships with customers to enhance their banking experience."
  },
];

const About = () => {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-4">About Us</h2>
      <img src="./public/images/abbank.jpg" alt="Bank Building" className="w-full h-64 object-cover rounded mb-4" />
      <p className="mb-4">
        We are a leading bank committed to providing our customers with the best financial services. Our mission is to help you achieve your financial goals through personalized banking solutions.
      </p>
      <p className="mb-4">
        With a team of experienced professionals, we offer a wide range of services including savings accounts, loans, investment options, and more. Our customer-centric approach ensures that we meet your needs effectively and efficiently.
      </p>
      <p className="mb-4">
        Our bank has been serving the community for over 20 years, and we pride ourselves on our commitment to integrity, transparency, and excellence. We believe in building long-lasting relationships with our clients and providing them with the tools they need to succeed financially.
      </p>
      <p className="mb-4">
        Join us today and experience the difference in banking! Whether you are looking to save for the future, invest in your dreams, or secure a loan, we are here to help you every step of the way.
      </p>

      <h3 className="text-2xl font-bold mt-8 mb-4">Meet Our Team</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white p-4 rounded shadow">
            <img src={member.image} alt={member.name} className="w-32 h-32 object-cover rounded-full mb-2 mx-auto" />
            <h4 className="text-xl font-semibold text-center">{member.name}</h4>
            <p className="text-gray-600 text-center">{member.title}</p>
            <p className="mt-2 text-center">{member.bio}</p>
          </div>
        ))}
      </div>

      <h3 className="text-2xl font-bold mt-8 mb-4">Our Services</h3>
      <ul className="list-disc list-inside mb-4">
        <li>Savings Accounts</li>
        <li>Personal Loans</li>
        <li>Home Loans</li>
        <li>Business Loans</li>
        <li>Investment Services</li>
        <li>Insurance Products</li>
        <li>Online Banking</li>
      </ul>
      <p>
        We are committed to providing our customers with a comprehensive range of financial products and services tailored to meet their individual needs.
      </p>
    </div>
  );
};

export default About;