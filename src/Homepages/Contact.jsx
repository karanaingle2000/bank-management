import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append("access_key", "1992a3a8-0c16-4242-91ad-6bc6d1e6280a");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());

      if (res.success) {
        console.log("Success", res);
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setError('Failed to send message. Please try again later.');
      }
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="hidden lg:block">
        <img src="./public/images/contactus.jpg" alt="Bank" className="w-full h-full object-cover rounded-lg" />
      </div>
      <div className="bg-white p-6 rounded shadow-lg border border-gray-300">
        <h2 className="text-3xl font-bold mb-4 text-center">Contact Us</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-gray-700" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Submit Form
          </button>
          {success && <p className="text-green-500 mt-4">Message sent successfully!</p>}
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
      </div>
      {/* New Contact Information Section */}
      <div className="bg-white p-6 rounded shadow-lg border border-gray-300 mt-4 lg:mt-0">
        <h2 className="text-3xl font-bold mb-4 text-center">Contact Information</h2>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Email</h3>
          <p className="text-gray-700">karanaingle@2000gmail.com</p>
        </div>
        <div className="mb-4">
          <h3 className ="text-xl font-semibold mb-2">Phone Number</h3>
          <p className="text-gray-700">9022895592</p>
        </div>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2">Address</h3>
          <p className="text-gray-700">123 Main St, City, Country</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;