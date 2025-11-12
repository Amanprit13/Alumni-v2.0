// src/app/volunteer/page.jsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    volunteerArea: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you would handle form submission to a backend
    console.log('Volunteer form submitted:', formData);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 md:p-12 rounded-xl shadow-2xl text-center max-w-lg w-full"
        >
          <div className="text-green-500 mb-6">
            <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Thank You!
          </h1>
          <p className="text-lg text-gray-700 mb-6">
            Your interest in volunteering has been received. We'll be in touch with more information shortly.
          </p>
          <Link href="/" className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-md hover:bg-blue-700 transition-colors duration-200">
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex flex-col items-center py-12 px-4 font-sans antialiased">
      {/* Hero Section */}
      <div className="text-center py-16 px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Make a Difference
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
            Your time and talent can create a lasting impact. Join our network of alumni volunteers and give back to the community and our university.
          </p>
        </motion.div>
      </div>

      <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl p-8 sm:p-10 transform transition-all duration-300 hover:scale-[1.005]">
        {/* Volunteer Opportunities Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Ways to Get Involved</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Mentor a Student</h3>
              <p className="text-gray-700">Guide a current student on their career path through our mentorship program.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Join an Event Committee</h3>
              <p className="text-gray-700">Help organize our annual reunion, galas, or networking events.</p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Community Service</h3>
              <p className="text-gray-700">Participate in our service days to support local non-profits and causes.</p>
            </div>
          </div>
        </section>

        {/* Volunteer Form Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-50 p-8 rounded-xl shadow-inner"
        >
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Sign Up to Volunteer</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label htmlFor="volunteerArea" className="block text-sm font-medium text-gray-700 mb-1">
                Area of Interest
              </label>
              <select
                id="volunteerArea"
                name="volunteerArea"
                value={formData.volunteerArea}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
              >
                <option value="">Select an area...</option>
                <option value="Mentorship">Mentorship Program</option>
                <option value="Event Planning">Event Planning & Coordination</option>
                <option value="Community Service">Community Service Projects</option>
                <option value="Fundraising">Fundraising</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                Tell us a little about yourself
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition-colors"
              ></textarea>
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              Submit
            </motion.button>
          </form>
        </motion.section>

        <div className="mt-8 text-center">
          <Link href="/" className="font-medium text-gray-600 hover:text-gray-900">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}