// src/app/events/volunteer-day/page.js

"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Head from 'next/head';

const ClockIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const LocationIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinecap="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
const BackIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

export default function VolunteerDayPage() {
    const event = {
        title: 'Community Garden Project',
        date: 'August 20, 2025',
        location: 'Local Community Garden',
        longDescription: 'Join fellow alumni for a day of community service and gardening. We\'ll be planting new flowers, tilling the soil, and preparing the garden beds for the fall season. All skill levels are welcome! This is a great opportunity to give back to the community and connect with other alumni in a relaxed, outdoor setting. Lunch and tools will be provided.',
        image: 'https://images.unsplash.com/photo-1518621764377-50a78619a997?q=80&w=2670&auto=format&fit-crop',
        category: 'Volunteer'
    };

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans antialiased relative">
            <Head>
                <title>{event.title}</title>
            </Head>

            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-neutral-50/90"></div>
                <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-rose-200/50 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-sky-200/50 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 container mx-auto max-w-5xl py-16 px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Link href="/events" className="inline-flex items-center space-x-2 text-neutral-500 hover:text-sky-500 transition-colors mb-8 group">
                        <BackIcon />
                        <span className="font-semibold">Back to All Events</span>
                    </Link>

                    <div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
                        <div className="w-full aspect-video overflow-hidden">
                            <img
                                src={event.image}
                                alt={event.title}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="p-8 md:p-12">
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="text-xl md:text-2xl font-bold text-sky-500 mb-2 font-serif block"
                            >
                                {event.category}
                            </motion.span>
                            
                            <motion.h1
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-4 tracking-tight leading-tight"
                            >
                                {event.title}
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex flex-col md:flex-row md:items-center md:space-x-8 text-neutral-500 mb-8"
                            >
                                <span className="flex items-center gap-2"><ClockIcon /> {event.date}</span>
                                <span className="flex items-center gap-2"><LocationIcon /> {event.location}</span>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="text-lg text-neutral-600 leading-relaxed mb-8"
                            >
                                {event.longDescription}
                            </motion.p>
                            
                            <motion.a
                                href="/registration" 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center space-x-2 px-8 py-4 bg-sky-500 text-white rounded-full font-semibold transition-all duration-300 hover:bg-sky-400 hover:shadow-lg group"
                            >
                                <span>Register Now</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" /><path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                            </motion.a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}