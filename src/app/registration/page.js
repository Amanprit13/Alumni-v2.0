// src/app/registration/page.js (for Next.js 13+ App Router)
// or pages/registration.js (for older Pages Router)

"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';

const BackIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

export default function RegistrationPage() {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        guests: 0
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the data to a backend or a service.
        console.log('Registration Form Submitted:', formData);
        setIsSubmitted(true);
    };

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans antialiased relative">
            <Head>
                <title>Event Registration</title>
            </Head>

            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-neutral-50/90"></div>
                <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-rose-200/50 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-sky-200/50 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 container mx-auto max-w-2xl py-16 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link href="/events/reunion-gala" className="inline-flex items-center space-x-2 text-neutral-500 hover:text-sky-500 transition-colors mb-8 group">
                        <BackIcon />
                        <span className="font-semibold">Back to Event</span>
                    </Link>

                    <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden p-8 md:p-12">
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div
                                    key="thank-you"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center py-12"
                                >
                                    <h2 className="text-3xl md:text-4xl font-extrabold font-serif text-sky-500 mb-4">
                                        Thank You for Registering! 🎉
                                    </h2>
                                    <p className="text-lg text-neutral-600 mb-4">
                                        Your spot has been successfully reserved. We look forward to seeing you at the event!
                                    </p>
                                    <p className="text-sm text-neutral-500">
                                        A confirmation email has been sent to your inbox.
                                    </p>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.5 }}
                                    onSubmit={handleSubmit}
                                >
                                    <h1 className="text-3xl md:text-4xl font-extrabold font-serif text-neutral-900 mb-6 text-center">
                                        Event Registration
                                    </h1>
                                    <p className="text-md text-neutral-600 mb-8 text-center">
                                        Please fill out the form below to secure your spot at the event.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-neutral-700">Full Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-2 bg-neutral-100 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-neutral-700">Email Address</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-2 bg-neutral-100 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                                            />
                                        </div>
                                        <div className="col-span-full md:col-span-1">
                                            <label htmlFor="phone" className="block text-sm font-medium text-neutral-700">Phone Number (Optional)</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-2 bg-neutral-100 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                                            />
                                        </div>
                                        <div className="col-span-full md:col-span-1">
                                            <label htmlFor="guests" className="block text-sm font-medium text-neutral-700">Number of Guests</label>
                                            <input
                                                type="number"
                                                id="guests"
                                                name="guests"
                                                min="0"
                                                max="10"
                                                required
                                                value={formData.guests}
                                                onChange={handleChange}
                                                className="mt-1 block w-full px-4 py-2 bg-neutral-100 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-500 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    
                                    <motion.button
                                        type="submit"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full mt-10 px-6 py-3 bg-sky-500 text-white rounded-full font-semibold transition-all duration-300 hover:bg-sky-400 hover:shadow-lg"
                                    >
                                        Complete Registration
                                    </motion.button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}