"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// New component for a simple, clear success message
const DonationSuccessScreen = () => (
    <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center p-12 text-center bg-white rounded-3xl shadow-2xl"
    >
        <svg className="w-24 h-24 text-sky-500 mb-6 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-4xl font-extrabold text-neutral-800 mb-2 font-serif">Thank You for Your Generosity! 🎉</h2>
        <p className="text-xl text-neutral-600 mb-4 font-sans">Your incredible support makes a world of difference.</p>
        <p className="text-neutral-500 mb-8 max-w-md font-sans">
            A confirmation receipt has been sent to your email. Your contribution directly fuels our mission and helps shape a brighter future for our community.
        </p>
        <Link href="/" className="inline-block px-8 py-4 text-lg font-bold text-white bg-gradient-to-r from-sky-500 to-rose-500 rounded-full shadow-lg hover:from-sky-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105">
            Explore More Impact
        </Link>
    </motion.div>
);

export default function DonationPage() {
    const [donationAmount, setDonationAmount] = useState('');
    const [donationType, setDonationType] = useState('money');
    const [moneyDonationFrequency, setMoneyDonationFrequency] = useState('one-time');
    const [itemDonationCategory, setItemDonationCategory] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [skillCategory, setSkillCategory] = useState('');
    const [skillDescription, setSkillDescription] = useState('');
    const [donorName, setDonorName] = useState('');
    const [donorEmail, setDonorEmail] = useState('');
    const [donationPurpose, setDonationPurpose] = useState('scholarship_fund');
    const [acknowledgePublicly, setAcknowledgePublicly] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [donationProgress, setDonationProgress] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccessScreen, setShowSuccessScreen] = useState(false);

    useEffect(() => {
        setDonationProgress(75);
    }, []);

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            setDonationAmount(value);
        }
    };

    const handlePresetAmountClick = (amount) => {
        setDonationAmount(amount.toString());
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage('');
        setMessageType('');

        if (!donorName || !donorEmail) {
            setMessage('Please enter your name and email.');
            setMessageType('error');
            setIsSubmitting(false);
            return;
        }
        if (!/\S+@\S+\.\S+/.test(donorEmail)) {
            setMessage('Please enter a valid email address.');
            setMessageType('error');
            setIsSubmitting(false);
            return;
        }
        if (!donationPurpose) {
            setMessage('Please select a donation purpose.');
            setMessageType('error');
            setIsSubmitting(false);
            return;
        }

        let donationData = {
            name: donorName,
            email: donorEmail,
            purpose: donationPurpose,
            donationType: donationType,
            acknowledgePublicly: acknowledgePublicly,
        };

        if (donationType === 'money') {
            if (!donationAmount || parseFloat(donationAmount) <= 0) {
                setMessage('Please enter a valid donation amount.');
                setMessageType('error');
                setIsSubmitting(false);
                return;
            }
            donationData = {
                ...donationData,
                amount: parseFloat(donationAmount),
                moneyDonationFrequency: moneyDonationFrequency,
            };
            
            try {
                setMessage('Processing your donation...');
                setMessageType('info');
                // Simulate network request
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                console.log("Simulated donation data sent:", donationData);
                
                setMessage(''); 
                setShowSuccessScreen(true);
                
                setDonationProgress(prevProgress => Math.min(prevProgress + 5, 100));

            } catch (error) {
                console.error('Simulated payment failed:', error);
                setMessage('Simulated payment failed. Please try again.');
                setMessageType('error');
            }
            setIsSubmitting(false);
            return;
        } 
        
        if (donationType === 'items') {
            if (!itemDonationCategory) {
                setMessage('Please select an item category.');
                setMessageType('error');
                setIsSubmitting(false);
                return;
            }
            if (!itemDescription) {
                setMessage('Please provide a description for your item donation.');
                setMessageType('error');
                setIsSubmitting(false);
                return;
            }
            donationData = {
                ...donationData,
                itemCategory: itemDonationCategory,
                itemDescription: itemDescription,
            };
        } else if (donationType === 'time_skills') {
            if (!skillCategory) {
                setMessage('Please select a skill/time category.');
                setMessageType('error');
                setIsSubmitting(false);
                return;
            }
            if (!skillDescription) {
                setMessage('Please describe your offer (e.g., specific skills, availability).');
                setMessageType('error');
                setIsSubmitting(false);
                return;
            }
            donationData = {
                ...donationData,
                skillCategory: skillCategory,
                skillDescription: skillDescription,
            };
        }

        console.log('Donation Data:', donationData);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            let successMsg = 'Thank you for your generous contribution! Your support means a lot.';
            if (donationType === 'items') {
                successMsg += ' We will contact you shortly to arrange pickup/drop-off.';
            } else if (donationType === 'time_skills') {
                successMsg += ' We will be in touch to discuss your offer further.';
            }
            setMessage(successMsg);
            setMessageType('success');
            
            // Clear the form after submission
            setDonationAmount('');
            setMoneyDonationFrequency('one-time');
            setItemDonationCategory('');
            setItemDescription('');
            setSkillCategory('');
            setSkillDescription('');
            setDonorName('');
            setDonorEmail('');
            setDonationPurpose('scholarship_fund');
            setAcknowledgePublicly(false);
            
        } catch (error) {
            console.error('Network error during donation:', error);
            setMessage('Network error. Please try again later.');
            setMessageType('error');
        }
        setIsSubmitting(false);
    };

    const getImpactStatement = (amount) => {
        const statements = {
            '250': 'can fund one student for a week of online learning.',
            '500': 'can provide a textbook and stationery for one student.',
            '1000': 'can cover the cost of a workshop for 15 students.',
            '2500': 'can sponsor a student\'s entire semester tuition.',
            '5000': 'can help a family with an annual scholarship.',
        };
        return statements[amount] || '';
    };

    const inputClasses = "mt-1 block w-full px-5 py-3 border-2 border-neutral-200 rounded-xl shadow-inner-sm focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-lg transition-all duration-300 ease-in-out";
    const labelClasses = "block text-sm font-semibold text-neutral-700 mb-2 font-sans";
    const sectionContainerClasses = "p-10 bg-white rounded-3xl shadow-lg border border-neutral-100 backdrop-blur-sm bg-opacity-80";

    return (
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8 font-sans antialiased relative overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-neutral-50/90"></div>
                <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-rose-200/50 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-sky-200/50 rounded-full blur-[100px]"></div>
            </div>

            <AnimatePresence mode="wait">
                {showSuccessScreen ? (
                    <DonationSuccessScreen key="success" />
                ) : (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="relative z-10 max-w-7xl w-full bg-white rounded-3xl shadow-2xl p-12 space-y-12 transform transition-all duration-500 hover:shadow-3xl"
                    >
                        <header className="text-center mb-10">
                            <h1 className="text-5xl font-extrabold text-neutral-900 mb-4 font-serif">
                                Empower a Brighter Future
                            </h1>
                            <p className="text-xl text-neutral-600 max-w-2xl mx-auto font-sans">
                                Your generosity, big or small, creates a ripple effect of positive change.
                                Choose your way to contribute and join our mission to make a lasting impact.
                            </p>
                        </header>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                            <div className="space-y-10">
                                <div className="p-8 bg-gradient-to-br from-sky-50 to-rose-50 rounded-3xl shadow-xl border border-neutral-200">
                                    <h2 className="text-3xl font-bold text-neutral-800 mb-4 text-center font-serif">Our Progress</h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-center">
                                        <div className="space-y-2">
                                            <p className="text-6xl font-extrabold text-sky-600 leading-none">{donationProgress}%</p>
                                            <p className="text-lg font-medium text-neutral-700 font-sans">of Scholarship Goal Reached</p>
                                            <div className="w-full bg-sky-200 rounded-full h-4 mt-2">
                                                <div className="bg-sky-600 h-4 rounded-full transition-all duration-700 ease-in-out" style={{width: `${donationProgress}%`}}></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <p className="text-6xl font-extrabold text-rose-600 leading-none">120+</p>
                                            <p className="text-lg font-medium text-neutral-700 font-sans">Books Donated</p>
                                            <div className="w-full bg-rose-200 rounded-full h-4 mt-9">
                                                <div className="bg-rose-600 h-4 rounded-full" style={{width: '60%'}}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-neutral-500 mt-6 text-center font-sans">
                                        *Data updated weekly.
                                    </p>
                                </div>
                                
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-bold text-neutral-800 text-center font-serif">Stories of Impact</h2>
                                    <div className="space-y-6">
                                        <div className="bg-neutral-50 p-8 rounded-3xl shadow-lg border border-neutral-100 transform hover:scale-[1.01] transition-transform duration-300">
                                            <p className="text-neutral-700 italic mb-4 font-sans leading-relaxed">"The alumni scholarship was a game-changer. It allowed me to pursue my passion in renewable energy without the stress of financial burdens. I'm now living my dream."</p>
                                            <p className="text-right font-bold text-sky-600 font-serif">- Aisha K., Class of 2023</p>
                                        </div>
                                        <div className="bg-neutral-50 p-8 rounded-3xl shadow-lg border border-neutral-100 transform hover:scale-[1.01] transition-transform duration-300">
                                            <p className="text-neutral-700 italic mb-4 font-sans leading-relaxed">"The donated books completely transformed our small community library. Children now have access to a world of knowledge and adventure they never had before. Thank you!"</p>
                                            <p className="text-right font-bold text-sky-600 font-serif">- Local NGO Partner</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-10">
                                {message && (
                                    <div className={`p-5 rounded-2xl text-center font-bold font-sans animate-fade-in ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                        {message}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-12">
  {/* Contribution Section */}
  <div className="p-8 bg-white border border-neutral-200 rounded-2xl shadow-md space-y-6">
    <h3 className="text-2xl font-bold text-neutral-900 font-serif border-b pb-4">
      Select Your Contribution
    </h3>

    {/* Contribution Type */}
    <div>
      <label className="block text-lg font-semibold text-neutral-800 mb-3">
        Choose Your Method
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { value: "money", label: "Money" },
          { value: "items", label: "Items" },
          { value: "time_skills", label: "Time & Skills" },
        ].map(({ value, label }) => (
          <label
            key={value}
            className={`flex items-center p-4 border-2 rounded-xl shadow-sm cursor-pointer transition-all duration-200 ${
              donationType === value
                ? "bg-sky-50 border-sky-500 ring-2 ring-sky-400"
                : "border-neutral-200 hover:bg-neutral-50"
            }`}
          >
            <input
              type="radio"
              className="form-radio text-sky-600 h-6 w-6"
              name="mainDonationType"
              value={value}
              checked={donationType === value}
              onChange={() => setDonationType(value)}
            />
            <span className="ml-3 text-lg font-medium text-neutral-800 font-sans">
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>

    {/* Conditional Forms */}
    {donationType === "money" && (
      <div className="space-y-8">
        {/* Preset Amounts */}
        <div>
          <label className="block text-lg font-semibold text-neutral-800 mb-3">
            Donation Amount (INR)
          </label>
          <div className="flex flex-wrap gap-3">
            {["250", "500", "1000", "2500", "5000"].map((amount) => (
              <div key={amount} className="group relative">
                <button
                  type="button"
                  onClick={() => handlePresetAmountClick(amount)}
                  className={`px-6 py-3 border-2 rounded-full text-lg font-bold transition-all duration-200 ${
                    donationAmount === amount
                      ? "bg-sky-600 text-white border-sky-700 shadow-md scale-105"
                      : "bg-neutral-100 text-neutral-700 border-neutral-300 hover:bg-neutral-200"
                  }`}
                >
                  ₹{amount}
                </button>
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-neutral-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  {getImpactStatement(amount)}
                </div>
              </div>
            ))}
          </div>
          <input
            type="text"
            id="donationAmount"
            name="donationAmount"
            value={donationAmount}
            onChange={handleAmountChange}
            required
            className="mt-4 w-full rounded-xl border border-neutral-300 px-4 py-3 text-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-400 text-red-500"
            placeholder="Enter custom amount (e.g., 2000)"
          />
        </div>

        {/* Frequency */}
        <div>
          <label className="block text-lg font-semibold text-neutral-800 mb-3">
            Donation Frequency
          </label>
          <div className="flex space-x-6">
            {["one-time", "monthly"].map((freq) => (
              <label key={freq} className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio text-sky-600 h-5 w-5"
                  name="moneyDonationFrequency"
                  value={freq}
                  checked={moneyDonationFrequency === freq}
                  onChange={() => setMoneyDonationFrequency(freq)}
                />
                <span className="ml-2 text-lg text-neutral-700 capitalize">
                  {freq.replace("-", " ")}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    )}

    {donationType === "items" && (
      <div className="space-y-8">
        <div>
          <label className="block text-lg font-semibold text-neutral-800 mb-3">
            Item Category
          </label>
          <select
            id="itemDonationCategory"
            name="itemDonationCategory"
            value={itemDonationCategory}
            onChange={(e) => setItemDonationCategory(e.target.value)}
            required
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-400 text-red-500"
          >
            <option value="">Select a category</option>
            <option value="books">Books</option>
            <option value="clothes">Clothes</option>
            <option value="stationery">Stationery</option>
            <option value="electronics">Electronics</option>
            <option value="other_items">Other Items</option>
          </select>
        </div>
        <div>
          <label className="block text-lg font-semibold text-neutral-800 mb-3">
            Item Description / Quantity
          </label>
          <textarea
            id="itemDescription"
            name="itemDescription"
            rows="4"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            required
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-400 text-red-500"
            placeholder="e.g., 5 novels in good condition, a set of lab equipment..."
          ></textarea>
        </div>
      </div>
    )}

    {donationType === "time_skills" && (
      <div className="space-y-8">
        <div>
          <label className="block text-lg font-semibold text-neutral-800 mb-3">
            Skill/Time Category
          </label>
          <select
            id="skillCategory"
            name="skillCategory"
            value={skillCategory}
            onChange={(e) => setSkillCategory(e.target.value)}
            required
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-400 text-red-500"
          >
            <option value="">Select a category</option>
            <option value="mentorship">Mentorship</option>
            <option value="guest_lecture">Guest Lecture/Workshop</option>
            <option value="pro_bono">Pro-Bono Professional Services</option>
            <option value="event_volunteering">Event Volunteering</option>
            <option value="community_service">Community Service</option>
            <option value="other_skills">Other Skills/Time Offer</option>
          </select>
        </div>
        <div>
          <label className="block text-lg font-semibold text-neutral-800 mb-3">
            Describe Your Offer / Availability
          </label>
          <textarea
            id="skillDescription"
            name="skillDescription"
            rows="4"
            value={skillDescription}
            onChange={(e) => setSkillDescription(e.target.value)}
            required
            className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-400 text-red-500"
            placeholder="e.g., Offer 2 hours/month for career coaching..."
          ></textarea>
        </div>
      </div>
    )}
  </div>

  {/* Donor Info */}
  <div className="p-8 bg-white border border-neutral-200 rounded-2xl shadow-md space-y-6">
    <h3 className="text-2xl font-bold text-neutral-900 font-serif border-b pb-4">
      Your Information
    </h3>
    <div className="grid gap-6 md:grid-cols-2">
      <div className="col-span-2">
        <label className="block text-lg font-semibold text-neutral-800 mb-3">
          Where to Direct Your Support
        </label>
        <select
          id="donationPurpose"
          name="donationPurpose"
          value={donationPurpose}
          onChange={(e) => setDonationPurpose(e.target.value)}
          required
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-400 text-red-500"
        >
          <option value="scholarship_fund">Alumni Scholarship Fund</option>
          <option value="student_innovation">
            Student Innovation & Project Fund
          </option>
          <option value="community_outreach">
            Local Community Outreach Programs
          </option>
          <option value="campus_development">
            Campus Modernization & Development
          </option>
          <option value="alumni_events">Alumni Networking Events</option>
          <option value="ngo_partners">Support Partner NGOs</option>
          <option value="general_support">General Support</option>
        </select>
      </div>
      <div>
        <label className="block text-lg font-semibold text-neutral-800 mb-3">
          Your Name
        </label>
        <input
          type="text"
          id="donorName"
          name="donorName"
          value={donorName}
          onChange={(e) => setDonorName(e.target.value)}
          required
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-400 text-red-500"
          placeholder="Full Name"
        />
      </div>
      <div>
        <label className="block text-lg font-semibold text-neutral-800 mb-3">
          Your Email
        </label>
        <input
          type="email"
          id="donorEmail"
          name="donorEmail"
          value={donorEmail}
          onChange={(e) => setDonorEmail(e.target.value)}
          required
          className="w-full rounded-xl border border-neutral-300 px-4 py-3 text-lg focus:border-sky-500 focus:ring-2 focus:ring-sky-400 text-red-500"
          placeholder="email@example.com"
        />
      </div>
    </div>
    <div className="flex items-center">
      <input
        id="acknowledgePublicly"
        name="acknowledgePublicly"
        type="checkbox"
        checked={acknowledgePublicly}
        onChange={(e) => setAcknowledgePublicly(e.target.checked)}
        className="h-6 w-6 text-sky-600 rounded-md focus:ring-sky-500 border-neutral-300"
      />
      <label
        htmlFor="acknowledgePublicly"
        className="ml-3 text-neutral-700 font-medium select-none"
      >
        Acknowledge my contribution publicly on the "Wall of Supporters"
      </label>
    </div>
  </div>

  {/* Submit */}
  <div>
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full py-5 px-6 text-xl font-bold rounded-full text-white bg-gradient-to-r from-sky-500 to-rose-500 shadow-lg transition-all duration-300 ${
        isSubmitting
          ? "bg-neutral-400 cursor-not-allowed"
          : "hover:from-sky-600 hover:to-rose-600 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-sky-400"
      }`}
    >
      {isSubmitting ? "Processing..." : `Donate ₹${donationAmount || "0"}`}
    </button>
  </div>
</form>

                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}