"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
// Hardcoded event data
const allEvents = [
    { id: 1, title: 'Alumni Reunion Gala', date: 'October 26, 2025', location: 'City Convention Center', description: 'An elegant night of celebration and reconnection for all alumni.', link: '/events/reunion-gala', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit-crop', category: 'Social', isPast: false },
    { id: 2, title: 'Career Networking Workshop', date: 'September 15, 2025', location: 'Online (Zoom)', description: 'A virtual workshop on networking and career growth in the modern tech landscape.', link: '/events/workshops/career-networking', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit-crop', category: 'Workshop', isPast: false },
    { id: 3, title: 'Community Garden Project', date: 'August 20, 2025', location: 'Local Community Garden', description: 'Join fellow alumni for a day of community service and gardening.', link: '/events/volunteer-day', image: 'https://images.unsplash.com/photo-1518621764377-50a78619a997?q=80&w=2670&auto=format&fit-crop', category: 'Volunteer', isPast: false },
    { id: 4, title: 'Guest Lecture: The Future of AI', date: 'July 28, 2025', location: 'University Auditorium', description: 'A fascinating lecture by a leading expert on the future of artificial intelligence.', link: '/events/ai-lecture', image: 'https://images.unsplash.com/photo-1620712949543-f119e7a468d6?q=80&w=2670&auto=format&fit-crop', category: 'Lecture', isPast: false },
    { id: 5, title: 'Virtual Book Club Meeting', date: 'July 22, 2025', location: 'Online (Google Meet)', description: 'Discuss a bestselling novel with fellow book lovers in a friendly, virtual setting.', link: '/events/book-club', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2670&auto=format&fit-crop', category: 'Social', isPast: false },
    { id: 6, title: 'Spring Career Fair', date: 'April 10, 2025', location: 'University Gymnasium', description: 'A career fair connecting students and alumni with top companies.', link: '/events/spring-career-fair-recap', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit-crop', category: 'Networking', isPast: true },
    { id: 7, title: 'Alumni Holiday Mixer', date: 'December 15, 2024', location: 'Alumni Hall', description: 'A festive gathering to celebrate the holiday season with food, drinks, and good company.', link: '/events/holiday-mixer-recap', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19a4247?q=80&w=2574&auto=format&fit-crop', category: 'Social', isPast: true },
];

const categories = ['ALL', 'Social', 'Workshop', 'Volunteer', 'Lecture', 'Networking'];

// Re-usable icons
const SearchIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>);
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
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 10 } }
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
        className="h-80 bg-neutral-100 rounded-lg shadow-lg border border-neutral-200 animate-pulse"
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
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

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
                <span className="text-3xl md:text-5xl font-semibold tracking-tighter text-sky-500">
                    {timeLeft[interval] < 10 ? `0${timeLeft[interval]}` : timeLeft[interval]}
                </span>
                <span className="text-sm font-light text-neutral-500 uppercase">{interval.slice(0, 1)}</span>
            </span>
        );
    });

    const sortedEvents = [...allEvents].sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    const filteredEvents = sortedEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            event.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'ALL' || event.category.toLowerCase() === selectedCategory.toLowerCase();
        
        // Logic to handle both filters
        const matchesTimeframe = (showPastEvents && event.isPast) || (showUpcomingEvents && !event.isPast);
        
        return matchesSearch && matchesCategory && matchesTimeframe;
    });

    // const handleClearFilters = () => {
    //     setSearchTerm('');
    //     setSelectedCategory('ALL');
    //     setShowPastEvents(false);
    //     setShowUpcomingEvents(true);
    //     setSortOrder('newest');
    // };

    const handleShare = (event) => {
        if (navigator.share) {
            navigator.share({
                title: event.title,
                text: event.description,
                url: `${window.location.origin}${event.link}`,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(`${window.location.origin}${event.link}`).then(() => {
                alert("Event link copied to clipboard!");
            });
        }
    };

    const handleTimeframeChange = (type) => {
        if (type === 'upcoming') {
            setShowUpcomingEvents(true);
            setShowPastEvents(false);
        } else if (type === 'past') {
            setShowPastEvents(true);
            setShowUpcomingEvents(false);
        } else {
            setShowUpcomingEvents(true);
            setShowPastEvents(true);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-50 text-neutral-800 font-sans antialiased relative">
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap" rel="stylesheet" />
            </Head>

            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-neutral-50/90"></div>
                <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-rose-200/50 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-sky-200/50 rounded-full blur-[100px]"></div>
            </div>

            <div className="relative z-10 container mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
                <header className="mb-16 text-center">
                    <motion.h1
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-extrabold tracking-tight font-serif text-neutral-900"
                    >
                        Alumni Events
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-neutral-500 mt-4 font-sans max-w-2xl mx-auto"
                    >
                        A curated list of our upcoming and past gatherings. Discover new opportunities, reconnect with old friends, and stay engaged with our community.
                    </motion.p>
                </header>

                {nextUpcomingEvent && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="mb-16 p-2 rounded-2xl shadow-xl border border-neutral-200 bg-gradient-to-br from-neutral-100 to-white"
                    >
                        <div className="p-8 bg-white rounded-xl">
                            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                                <div className="relative overflow-hidden rounded-lg">
                                    <img
                                        src={nextUpcomingEvent.image}
                                        alt={nextUpcomingEvent.title}
                                        className="w-full h-auto object-cover grayscale transition-all duration-500 hover:grayscale-0 hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-white/70 transition-all duration-300 group-hover:bg-transparent"></div>
                                </div>
                                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                                    <span className="text-xl md:text-2xl font-bold text-sky-500 mb-2 font-serif">Next Event</span>
                                    <h2 className="text-3xl md:text-4xl font-extrabold text-neutral-900 mb-4 tracking-tight leading-tight">{nextUpcomingEvent.title}</h2>
                                    <div className="flex space-x-6 md:space-x-8 mb-6">
                                        {timerComponents.length ? timerComponents : (
                                            <span className="text-3xl md:text-5xl font-semibold text-neutral-500">00</span>
                                        )}
                                    </div>
                                    <p className="text-neutral-500 mb-4">{nextUpcomingEvent.description}</p>
                                    <Link href={nextUpcomingEvent.link} className="inline-flex items-center space-x-2 px-6 py-3 bg-sky-500 text-white rounded-full font-semibold transition-all duration-300 hover:bg-sky-400 hover:shadow-lg group">
                                        <span>Register Now</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" /><path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div className="mb-12 p-6 rounded-xl bg-white shadow-lg border border-neutral-200">
                    <h2 className="text-lg font-semibold text-neutral-800 mb-4">Find Your Event</h2>
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="relative flex-grow w-full">
                            <input
                                type="text"
                                placeholder="Search events..."
                                className="w-full pl-12 pr-12 py-3 bg-neutral-100 text-neutral-800 rounded-full border border-neutral-200 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all placeholder:text-neutral-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"><SearchIcon /></div>
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-800 transition-colors">
                                    <ClearIcon />
                                </button>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {categories.map(category => (
                                <motion.button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    whileTap={{ scale: 0.95 }}
                                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                        selectedCategory === category.toLowerCase() ? 'bg-sky-500 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                    }`}
                                >
                                    {category}
                                </motion.button>
                            ))}
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <select
                                    className="w-full min-w-[150px] px-4 py-3 bg-neutral-100 text-neutral-800 rounded-full border border-neutral-200 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all appearance-none"
                                    value={sortOrder}
                                    onChange={(e) => setSortOrder(e.target.value)}
                                >
                                    <option value="newest">Newest First</option>
                                    <option value="oldest">Oldest First</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                </div>
                            </div>
                            
                            <motion.button
                                onClick={() => handleTimeframeChange('upcoming')}
                                whileTap={{ scale: 0.95 }}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                    showUpcomingEvents && !showPastEvents ? 'bg-rose-500 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                }`}
                            >
                                Upcoming
                            </motion.button>

                            <motion.button
                                onClick={() => handleTimeframeChange('past')}
                                whileTap={{ scale: 0.95 }}
                                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                                    showPastEvents && !showUpcomingEvents ? 'bg-rose-500 text-white' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                }`}
                            >
                                Past
                            </motion.button>

                            {/* <button onClick={handleClearFilters} className="px-4 py-2 rounded-full text-sm font-semibold bg-rose-500 text-white hover:bg-rose-400 transition-colors duration-300">
                                Clear
                            </button> */}
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            key="loading"
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={skeletonLoaderVariants}
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
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
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        >
                            {filteredEvents.length > 0 ? (
                                filteredEvents.map((event) => (
                                    <motion.div
                                        key={event.id}
                                        variants={itemVariants}
                                        whileHover={{ scale: 1.03, y: -5 }}
                                        className="group relative bg-white rounded-lg shadow-lg border border-neutral-200 hover:border-sky-500 transition-all duration-300 overflow-hidden"
                                    >
                                        <Link href={event.link} className="block">
                                            <div className="relative w-full aspect-video">
                                                <img
                                                    src={event.image}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-white/20 transition-all duration-300 group-hover:bg-transparent"></div>
                                                {event.id === nextUpcomingEvent.id && (
                                                    <motion.div
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                                        className="absolute top-4 right-4 bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase"
                                                    >
                                                        Upcoming
                                                    </motion.div>
                                                )}
                                                {event.isPast && !showUpcomingEvents && (
                                                    <div className="absolute bottom-4 left-4 bg-neutral-200/80 text-neutral-500 text-xs font-bold px-3 py-1 rounded-full uppercase">
                                                        Past Event
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-6 relative">
                                                <h3 className="text-lg font-semibold text-neutral-900 mb-1 tracking-tight">{event.title}</h3>
                                                <p className="text-neutral-500 text-sm mb-4 line-clamp-2">{event.description}</p>
                                                <div className="flex flex-col gap-2 text-neutral-500 text-sm">
                                                    <span className="flex items-center gap-2"><ClockIcon /> {event.date}</span>
                                                    <span className="flex items-center gap-2"><LocationIcon /> {event.location}</span>
                                                </div>
                                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-sky-500 to-rose-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                                            </div>
                                        </Link>
                                        <div className="absolute top-4 left-4 p-2 bg-neutral-100 rounded-full shadow-md z-10 transition-all duration-300 opacity-0 group-hover:opacity-100">
                                            <button onClick={() => handleShare(event)} className="text-neutral-500 hover:text-sky-500 transition-colors">
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
                                        className="text-center text-neutral-500 py-12"
                                    >
                                        No events found matching your criteria.
                                    </motion.p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}