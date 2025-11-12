"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { scholarships, testimonials, donorSpotlight, donationCampaign } from './scholarshipsData';

// Accordion component for the FAQ section
const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-neutral-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left font-semibold text-neutral-800 focus:outline-none"
      >
        <span>{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
          </svg>
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="pb-4 text-neutral-600 leading-relaxed"
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Scholarship Card component
const ScholarshipCard = ({ scholarship }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="bg-neutral-50 p-6 rounded-xl shadow-lg border border-neutral-200"
  >
    <h3 className="text-2xl font-bold text-sky-700 mb-2">{scholarship.name}</h3>
    <p className="text-lg text-neutral-600 mb-2">{scholarship.description}</p>
    <div className="flex items-center mb-1">
      <span className="font-semibold text-neutral-800">Amount:</span>
      <span className="ml-2 text-emerald-600 font-bold">{scholarship.amount}</span>
    </div>
    <div className="flex items-center mb-1">
      <span className="font-semibold text-neutral-800">Type:</span>
      <span className="ml-2 text-neutral-600">{scholarship.type}</span>
    </div>
    <div className="flex items-center mb-1">
      <span className="font-semibold text-neutral-800">Field:</span>
      <span className="ml-2 text-neutral-600">{scholarship.field}</span>
    </div>
    <div className="flex items-center">
      <span className="font-semibold text-neutral-800">Deadline:</span>
      <span className="ml-2 text-neutral-600">{scholarship.deadline}</span>
    </div>
  </motion.div>
);

export default function ScholarshipPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [filterField, setFilterField] = useState('All');
  const [filteredScholarships, setFilteredScholarships] = useState(scholarships);

  useEffect(() => {
    const result = scholarships.filter(scholarship => {
      const matchesSearch = scholarship.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          scholarship.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === 'All' || scholarship.type === filterType;
      const matchesField = filterField === 'All' || scholarship.field === filterField;
      return matchesSearch && matchesType && matchesField;
    });
    setFilteredScholarships(result);
  }, [searchTerm, filterType, filterField]);

  const progressPercentage = Math.min(
    (donationCampaign.raised / donationCampaign.goal) * 100,
    100
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
  };

  const faqs = [
    {
      question: "Who is eligible to apply for a scholarship?",
      answer: "Scholarships are open to all currently enrolled, full-time undergraduate and graduate students at [Your Institution Name]. Specific scholarships may have additional criteria, so please review each listing carefully."
    },
    {
      question: "What is the application deadline?",
      answer: "The application window for the upcoming academic year is from [Month Day] to [Month Day], [Year]. All materials must be submitted by the final deadline."
    },
    {
      question: "What documents are required for the application?",
      answer: "Required documents typically include academic transcripts, letters of recommendation, a personal statement or essay, and a completed online application form."
    },
    {
      question: "How are scholarship recipients selected?",
      answer: "Recipients are selected based on a combination of academic merit, financial need, leadership potential, and community involvement, as outlined in the specific scholarship criteria."
    }
  ];

  const formatRupees = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-5xl w-full bg-white rounded-xl shadow-2xl p-8 space-y-8 transform transition-all duration-300 hover:scale-[1.005]"
      >
        {/* Header and Introduction */}
        <h1 className="text-4xl font-extrabold text-neutral-900 text-center mb-6">
          Alumni Scholarship Program
        </h1>
        <p className="text-center text-lg text-neutral-700 mb-8">
          The Alumni Scholarship Program is dedicated to supporting deserving students in their academic journey, thanks to the generous contributions of our alumni community.
        </p>

        {/* Key Metrics Section */}
        <motion.section
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
        >
          <div className="bg-sky-50 p-6 rounded-lg shadow-sm border border-sky-200">
            <h3 className="text-4xl font-extrabold text-sky-600 mb-1">100+</h3>
            <p className="text-neutral-600">Students Supported</p>
          </div>
          <div className="bg-emerald-50 p-6 rounded-lg shadow-sm border border-emerald-200">
            <h3 className="text-4xl font-extrabold text-emerald-600 mb-1">₹50 Lakh+</h3>
            <p className="text-neutral-600">Total Funds Awarded</p>
          </div>
          <div className="bg-amber-50 p-6 rounded-lg shadow-sm border border-amber-200">
            <h3 className="text-4xl font-extrabold text-amber-600 mb-1">20+</h3>
            <p className="text-neutral-600">Years of Impact</p>
          </div>
        </motion.section>

        {/* Donor Spotlight Section */}
        <motion.section
          variants={itemVariants}
          className="bg-neutral-100 p-6 rounded-lg shadow-md border border-neutral-200 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6"
        >
          <div className="w-32 h-32 flex-shrink-0 rounded-full overflow-hidden shadow-lg border-2 border-rose-500">
            <img src={donorSpotlight.image} alt={donorSpotlight.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-neutral-800 mb-2">Donor Spotlight: {donorSpotlight.name}</h2>
            <p className="text-neutral-700 mb-3 italic">"{donorSpotlight.quote}"</p>
            <p className="text-sm text-neutral-600">{donorSpotlight.bio}</p>
          </div>
        </motion.section>

        {/* Donation Goal and Tiered System */}
        <motion.section
          variants={itemVariants}
          className="bg-neutral-100 p-6 rounded-lg shadow-md border border-neutral-200"
        >
          <h2 className="text-2xl font-bold text-neutral-800 text-center mb-4">Help Us Reach Our Goal</h2>
          <div className="flex justify-between text-neutral-600 font-semibold mb-2">
            <span>Raised: {formatRupees(donationCampaign.raised)}</span>
            <span>Goal: {formatRupees(donationCampaign.goal)}</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-4 mb-4 overflow-hidden">
            <motion.div
              className="bg-emerald-500 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {donationCampaign.tiers.map((tier, index) => (
              <motion.div
                key={index}
                className="bg-white border-2 border-emerald-300 rounded-lg p-4 cursor-pointer text-center hover:bg-emerald-50 transition-colors duration-200"
                whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
              >
                <h3 className="text-xl font-bold text-emerald-600">{formatRupees(tier.amount)}</h3>
                <p className="text-sm text-neutral-600 mt-1">{tier.description}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/donation" className="inline-block bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:from-teal-600 hover:to-cyan-700 hover:scale-105 transition-all duration-300 ease-in-out transform">
              Donate Now
            </Link>
          </div>
        </motion.section>

        {/* Search and Filter Section */}
        <motion.section
          variants={itemVariants}
          className="bg-neutral-100 p-6 rounded-lg shadow-md border border-neutral-200 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4"
        >
          <input
            type="text"
            placeholder="Search scholarships..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-1/2 p-3 rounded-md border border-neutral-300 focus:ring-2 focus:ring-rose-500"
          />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="w-full sm:w-1/4 p-3 rounded-md border border-neutral-300 focus:ring-2 focus:ring-rose-500"
          >
            <option value="All">All Types</option>
            <option value="Merit-Based">Merit-Based</option>
            <option value="Need-Based">Need-Based</option>
          </select>
          <select
            value={filterField}
            onChange={(e) => setFilterField(e.target.value)}
            className="w-full sm:w-1/4 p-3 rounded-md border border-neutral-300 focus:ring-2 focus:ring-rose-500"
          >
            <option value="All">All Fields</option>
            <option value="STEM">STEM</option>
            <option value="Social Sciences">Social Sciences</option>
            <option value="Arts & Humanities">Arts & Humanities</option>
            <option value="Business">Business</option>
          </select>
        </motion.section>

        {/* Scholarship Listings */}
        <motion.section
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {filteredScholarships.length > 0 ? (
            filteredScholarships.map(scholarship => (
              <ScholarshipCard key={scholarship.id} scholarship={scholarship} />
            ))
          ) : (
            <div className="md:col-span-2 text-center text-neutral-500 py-8">
              No scholarships found matching your criteria.
            </div>
          )}
        </motion.section>

        {/* Testimonial Carousel Section */}
        <motion.section
          variants={itemVariants}
          className="bg-neutral-100 p-6 rounded-lg shadow-md border border-neutral-200"
        >
          <h2 className="text-2xl font-bold text-neutral-800 mb-4 text-center">What Our Community Says</h2>
          <div className="relative overflow-hidden">
            <div className="flex space-x-4 animate-scroll">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="min-w-[calc(100%-1.5rem)] md:min-w-[48%] flex-shrink-0 bg-white p-6 rounded-lg shadow-sm border border-neutral-100">
                  <p className="text-neutral-700 italic mb-3">"{testimonial.quote}"</p>
                  <p className="text-right font-medium text-sky-600">- {testimonial.author}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* FAQ Section with Accordion */}
        <motion.section
          variants={itemVariants}
          className="bg-neutral-100 p-6 rounded-lg shadow-md border border-neutral-200"
        >
          <h2 className="text-2xl font-bold text-neutral-800 mb-4 text-center">Frequently Asked Questions</h2>
          <div className="divide-y divide-neutral-300">
            {faqs.map((faq, index) => (
              <Accordion key={index} title={faq.question} content={faq.answer} />
            ))}
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
}