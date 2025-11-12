"use client";

import React, { useState, useEffect } from 'react';
// import Link from 'next/link'; // Removed: Using <a> tags for self-contained React
// import Head from 'next/head'; // Removed: Using standard HTML structure
import { motion, AnimatePresence } from 'framer-motion';

// Hardcoded event data
const allEvents = [
    { id: 1, title: 'Alumni Reunion Gala', date: 'October 26, 2025', location: 'City Convention Center', description: 'An elegant night of celebration and reconnection for all alumni.', link: '/events/reunion-gala', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit-crop', category: 'Social', isPast: false },
    { id: 2, title: 'Career Networking Workshop', date: 'September 15, 2025', location: 'Online (Zoom)', description: 'A virtual workshop on networking and career growth in the modern tech landscape.', link: '/events/career-workshop', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit-crop', category: 'Workshop', isPast: false },
    { id: 3, title: 'Community Garden Project', date: 'August 20, 2025', location: 'Local Community Garden', description: 'Join fellow alumni for a day of community service and gardening.', link: '/events/garden-project', image: 'data:image/jpeg;base64,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', category: 'Volunteer', isPast: false },
    { id: 4, title: 'Guest Lecture: The Future of AI', date: 'July 28, 2025', location: 'University Auditorium', description: 'A fascinating lecture by a leading expert on the future of artificial intelligence.', link: '/events/ai-lecture', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrsk1SojF9bsOfBawGzaxxpqErynbQ4hzjKw&s', category: 'Lecture', isPast: false },
    { id: 5, title: 'Virtual Book Club Meeting', date: 'July 22, 2025', location: 'Online (Google Meet)', description: 'Discuss a bestselling novel with fellow book lovers in a friendly, virtual setting.', link: '/events/book-club', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2670&auto=format&fit-crop', category: 'Social', isPast: false },
    { id: 6, title: 'Spring Career Fair', date: 'April 10, 2025', location: 'University Gymnasium', description: 'A career fair connecting students and alumni with top companies.', link: '/events/career-fair-recap', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit-crop', category: 'Networking', isPast: true },
    { id: 7, title: 'Alumni Holiday Mixer', date: 'December 15, 2024', location: 'Alumni Hall', description: 'A festive gathering to celebrate the holiday season with food, drinks, and good company.', link: '/events/holiday-mixer-recap', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19a4247?q=80&w=2574&auto=format&fit-crop', category: 'Social', isPast: true },
];

const categories = ['ALL', 'Social', 'Workshop', 'Volunteer', 'Lecture', 'Networking'];

// Re-usable icons (Lucide icons are assumed available in a React context)
const SearchIcon = (props) => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
const ClockIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const LocationIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
const ShareIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186A4.486 4.486 0 0112 10.5a4.486 4.486 0 014.783 2.313m-4.783-2.313A4.486 4.486 0 007.217 13.907m1-4.636A2.25 2.25 0 1015 10.907m-4.783 2.186A4.486 4.486 0 0012 13.5a4.486 4.486 0 004.783-2.313m-4.783 2.186a4.486 4.486 0 010 4.372m0-4.372a4.486 4.486 0 00-4.783 2.313m4.783-2.313A4.486 4.486 0 0112 10.5a4.486 4.486 0 014.783-2.313m-4.783 2.186a4.486 4.486 0 000 4.372" /></svg>);
const ClearIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>);

const calculateTimeLeft = (targetDate) => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }
    return timeLeft;
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 12 } }
};

const skeletonLoaderVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const skeletonItemVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
};

const SkeletonCard = () => (
    <motion.div
        variants={skeletonItemVariants}
        className="h-80 bg-neutral-100 rounded-xl shadow-lg border border-neutral-200 animate-pulse"
    />
);

export default function EventsPage() {
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');
    const [showPastEvents, setShowPastEvents] = useState(false);
    const [showUpcomingEvents, setShowUpcomingEvents] = useState(true);
    const [sortOrder, setSortOrder] = useState('newest');

    useEffect(() => {
        // Simulate a data fetch delay
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Determine the next upcoming event for the featured banner
    const nextUpcomingEvent = allEvents.find(event => !event.isPast);

    const [timeLeft, setTimeLeft] = useState(
        nextUpcomingEvent ? calculateTimeLeft(nextUpcomingEvent.date) : {}
    );

    useEffect(() => {
        const timer = setTimeout(() => {
            if (nextUpcomingEvent) {
                setTimeLeft(calculateTimeLeft(nextUpcomingEvent.date));
            }
        }, 1000);
        return () => clearTimeout(timer);
    });

    const timerComponents = [];
    Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval] && timeLeft[interval] !== 0) {
            return;
        }
        timerComponents.push(
            <span key={interval} className="flex flex-col items-center">
                <span className="text-3xl md:text-5xl font-extrabold tracking-tighter text-sky-600">
                    {timeLeft[interval] < 10 ? `0${timeLeft[interval]}` : timeLeft[interval]}
                </span>
                <span className="text-sm font-light text-neutral-500 uppercase">{interval.slice(0, 1)}</span>
            </span>
        );
    });

    // Sort the events based on the selected order
    const sortedEvents = [...allEvents].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    // Filter events based on search term, category, and timeframe
    const filteredEvents = sortedEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'ALL' || event.category.toLowerCase() === selectedCategory.toLowerCase();

        // Filter based on the Upcoming/Past toggles
        const matchesTimeframe = (showPastEvents && event.isPast) || (showUpcomingEvents && !event.isPast);

        // If both are toggled off, show no results (or show all, depending on desired behavior. Sticking to no results here)
        if (!showPastEvents && !showUpcomingEvents) return false;

        return matchesSearch && matchesCategory && matchesTimeframe;
    });

    const handleShare = (event) => {
        // Fallback text copy method as navigator.clipboard.writeText() can fail in iframes
        const tempUrl = window.location.origin + event.link;
        const el = document.createElement('textarea');
        el.value = tempUrl;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        console.log(`Event link copied to clipboard: ${tempUrl}`);
    };

    const handleTimeframeChange = (type) => {
        if (type === 'upcoming') {
            setShowUpcomingEvents(true);
            setShowPastEvents(false);
        } else if (type === 'past') {
            setShowPastEvents(true);
            setShowUpcomingEvents(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans antialiased relative">
            {/* The canvas environment handles the <head> section, so no need for 'next/head' */}
            <style>{`
                body { font-family: 'Inter', sans-serif; }
                /* Custom scrollbar for aesthetics */
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-track { background: #f1f1f1; }
                ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                ::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
            `}</style>
            <script src="https://cdn.tailwindcss.com"></script>


            {/* Background Gradient Shapes for Visual Interest */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute inset-0 bg-neutral-50/90"></div>
                <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-rose-200/50 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-sky-200/50 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 container mx-auto max-w-7xl py-12 md:py-16 px-4 sm:px-6 lg:px-8">

                {/* Header Section */}
                <header className="mb-12 md:mb-16 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight text-neutral-900"
                    >
                        Alumni Events
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-neutral-500 mt-4 max-w-2xl mx-auto"
                    >
                        Discover new opportunities, reconnect with old friends, and stay engaged with our community.
                    </motion.p>
                </header>

                {/* Featured Event / Countdown Banner */}
                {nextUpcomingEvent && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mb-12 md:mb-16 p-3 rounded-3xl shadow-2xl border border-neutral-200 bg-gradient-to-br from-neutral-100 to-white overflow-hidden"
                    >
                        <div className="p-6 md:p-10 bg-white rounded-2xl">
                            <div className="grid grid-cols-1 lg:grid-cols-5 items-center gap-8">
                                <div className="relative overflow-hidden rounded-xl lg:col-span-2 group">
                                    <img
                                        src={nextUpcomingEvent.image}
                                        alt={nextUpcomingEvent.title}
                                        className="w-full h-auto object-cover min-h-[200px] aspect-[4/3] lg:aspect-square transition-all duration-700 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-black/10 transition-all duration-300 group-hover:bg-transparent"></div>
                                </div>
                                <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-3">
                                    <span className="text-sm font-bold tracking-widest text-sky-600 mb-2 uppercase border border-sky-200 bg-sky-50 px-3 py-1 rounded-full">Next Up</span>
                                    <h2 className="text-3xl md:text-5xl font-extrabold text-neutral-900 mb-4 tracking-tight leading-snug">{nextUpcomingEvent.title}</h2>

                                    {/* Countdown Timer */}
                                    <div className="flex space-x-6 md:space-x-10 mb-6 bg-neutral-100 p-4 md:p-6 rounded-xl border border-neutral-200 shadow-inner">
                                        {timerComponents.length ? timerComponents : (
                                            <span className="text-xl md:text-3xl font-semibold text-neutral-500">Event is Live!</span>
                                        )}
                                    </div>

                                    <p className="text-neutral-600 mb-6 max-w-lg">{nextUpcomingEvent.description}</p>
                                    {/* Link replaced with <a> */}
                                    <a href={nextUpcomingEvent.link} className="inline-flex items-center space-x-3 px-8 py-3 bg-sky-500 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:bg-sky-600 hover:shadow-lg hover:shadow-sky-300 group">
                                        <span>Details & RSVP</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" /><path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Filter UI - IMPROVED STRUCTURE */}
                <div className="mb-12 p-6 md:p-8 rounded-2xl bg-white shadow-xl shadow-neutral-100 border border-neutral-200">
                    <h2 className="text-xl font-bold text-neutral-800 mb-6 border-b pb-4">Filter & Sort Events</h2>

                    <div className="flex flex-col gap-6 md:gap-8">

                        {/* 1. Search Bar (Full width) */}
                        <div>
                            <h3 className="text-sm font-medium text-neutral-600 mb-2">Search by Keyword</h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by title, description, or location..."
                                    className="w-full pl-12 pr-12 py-3.5 bg-neutral-100 text-neutral-800 rounded-lg border border-neutral-300 focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all placeholder:text-neutral-500 text-base"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                {/* Icons positioned perfectly centered vertically */}
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
                                    <SearchIcon className="w-5 h-5" />
                                </div>
                                {searchTerm && (
                                    <motion.button
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                                        onClick={() => setSearchTerm('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-800 transition-colors"
                                        aria-label="Clear search"
                                    >
                                        <ClearIcon />
                                    </motion.button>
                                )}
                            </div>
                        </div>

                        {/* 2. Categories/Filters (Full width wrapping) */}
                        <div>
                            <h3 className="text-sm font-medium text-neutral-600 mb-2">Filter by Category</h3>
                            <div className="flex flex-wrap gap-2">
                                {categories.map(category => (
                                    <motion.button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm ${selectedCategory.toLowerCase() === category.toLowerCase()
                                                ? 'bg-sky-600 text-white shadow-sky-300/70'
                                                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border border-neutral-200'
                                            }`}
                                    >
                                        {category}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* 3. Sorting and Timeframe Toggles (Grouped actions, separated by border) */}
                        <div className="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

                            {/* Sort Dropdown */}
                            <div className="flex items-center gap-3 w-full sm:w-auto">
                                <h3 className="text-sm font-medium text-neutral-600 whitespace-nowrap">Sort By:</h3>
                                <div className="flex space-x-2">
                                    <motion.button
                                        onClick={() => setSortOrder('newest')}
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors duration-300 shadow-sm border ${sortOrder === 'newest'
                                                ? 'bg-sky-600 text-white shadow-sky-300/70 border-sky-600'
                                                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-300'
                                            }`}
                                    >
                                        Newest
                                    </motion.button>
                                    <motion.button
                                        onClick={() => setSortOrder('oldest')}
                                        whileTap={{ scale: 0.95 }}
                                        className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors duration-300 shadow-sm border ${sortOrder === 'oldest'
                                                ? 'bg-sky-600 text-white shadow-sky-300/70 border-sky-600'
                                                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-300'
                                            }`}
                                    >
                                        Oldest
                                    </motion.button>
                                </div>
                            </div>

                            {/* Upcoming/Past Buttons Group */}
                            <div className="flex space-x-2 w-full sm:w-auto">
                                <motion.button
                                    onClick={() => handleTimeframeChange('upcoming')}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 shadow-sm border ${showUpcomingEvents && !showPastEvents
                                            ? 'bg-rose-600 text-white shadow-rose-300/70 border-rose-600'
                                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-300'
                                        }`}
                                >
                                    Upcoming Events
                                </motion.button>

                                <motion.button
                                    onClick={() => handleTimeframeChange('past')}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-300 shadow-sm border ${showPastEvents && !showUpcomingEvents
                                            ? 'bg-rose-600 text-white shadow-rose-300/70 border-rose-600'
                                            : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 border-neutral-300'
                                        }`}
                                >
                                    Past Events
                                </motion.button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Event Cards Grid */}
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                    <AnimatePresence mode="wait">
                        {loading ? (
                            <motion.div
                                key="loading"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={skeletonLoaderVariants}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                            >
                                {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="events"
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={containerVariants}
                                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                            >
                                {filteredEvents.length > 0 ? (
                                    filteredEvents.map((event) => (
                                        <motion.div
                                            key={event.id}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.03, y: -5 }}
                                            className="group relative bg-white rounded-xl shadow-lg border border-neutral-200 hover:border-sky-500 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-neutral-200/50"
                                        >
                                            {/* Link replaced with <a> */}
                                            <a href={event.link} className="block">
                                                <div className="relative w-full aspect-video">
                                                    <img
                                                        src={event.image}
                                                        alt={event.title}
                                                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-black/10 transition-all duration-300 group-hover:bg-transparent"></div>

                                                    {/* Upcoming Tag */}
                                                    {!event.isPast && (
                                                        <motion.div
                                                            initial={{ scale: 0 }}
                                                            animate={{ scale: 1 }}
                                                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                                            className="absolute top-4 right-4 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md"
                                                        >
                                                            {event.id === nextUpcomingEvent.id ? 'Featured' : event.category}
                                                        </motion.div>
                                                    )}

                                                    {/* Past Event Overlay */}
                                                    {event.isPast && (
                                                        <div className="absolute inset-0 bg-neutral-900/40 flex items-center justify-center">
                                                            <span className="text-white text-base font-bold px-4 py-2 bg-neutral-800/80 rounded-full uppercase tracking-wider">Past Event</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="p-6 relative">
                                                    <h3 className="text-xl font-extrabold text-neutral-900 mb-2 tracking-tight line-clamp-2 group-hover:text-sky-600 transition-colors duration-300">{event.title}</h3>
                                                    <p className="text-neutral-500 text-sm mb-4 line-clamp-3">{event.description}</p>

                                                    <div className="flex flex-col gap-2 text-neutral-600 text-sm">
                                                        <span className="flex items-center gap-2 font-medium"><ClockIcon className="text-sky-500" /> {event.date}</span>
                                                        <span className="flex items-center gap-2 font-medium"><LocationIcon className="text-rose-500" /> {event.location}</span>
                                                    </div>

                                                    {/* Hover Bottom Border Accent */}
                                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-sky-500 to-rose-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                                </div>
                                            </a>

                                            {/* Share Button (Moves to bottom on hover) */}
                                            <div className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md z-10 transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:top-auto group-hover:bottom-4">
                                                <button
                                                    onClick={(e) => { e.preventDefault(); handleShare(event); }}
                                                    className="text-neutral-500 hover:text-sky-500 transition-colors"
                                                    aria-label="Share event"
                                                >
                                                    <ShareIcon />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="col-span-full">
                                        <motion.p
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5 }}
                                            className="text-center text-neutral-500 py-12 text-lg italic border-2 border-dashed border-neutral-300 rounded-xl"
                                        >
                                            No events found matching your current filters. Try adjusting your search or category selections.
                                        </motion.p>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
