// src/app/events/[slug]/page.js

"use client";

import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Head from 'next/head';

// Hardcoded event data
// NOTE: For a real application, you'd fetch this from a database or API.
const allEvents = [
    { id: 1, title: 'Alumni Reunion Gala', date: 'October 26, 2025', location: 'City Convention Center', description: 'An elegant night of celebration and reconnection for all alumni.', longDescription: 'Join us for an unforgettable evening of dinner, dancing, and networking. This annual gala is the perfect opportunity to reconnect with old friends, make new connections, and celebrate the accomplishments of our community. The night will feature a keynote speaker, live music, and a silent auction to support our scholarship fund.', link: '/events/reunion-gala', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2670&auto=format&fit-crop', category: 'Social', isPast: false },
    { id: 2, title: 'Career Networking Workshop', date: 'September 15, 2025', location: 'Online (Zoom)', description: 'A virtual workshop on networking and career growth in the modern tech landscape.', longDescription: 'This interactive workshop will provide valuable insights into building a professional network in the digital age. Learn best practices for virtual networking, leveraging platforms like LinkedIn, and preparing for career transitions. The session will include breakout rooms for small-group discussions and Q&A with industry experts.', link: '/events/tech-workshop', image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2670&auto=format&fit-crop', category: 'Workshop', isPast: false },
    { id: 3, title: 'Community Garden Project', date: 'August 20, 2025', location: 'Local Community Garden', description: 'Join fellow alumni for a day of community service and gardening.', longDescription: 'Roll up your sleeves and give back to the community! We\'ll be spending the day planting flowers, weeding gardens, and helping with general maintenance at the local community garden. It\'s a great way to meet new people and contribute to a greener, more beautiful neighborhood.', link: '/events/volunteer-day', image: 'https://images.unsplash.com/photo-1518621764377-50a78619a997?q=80&w=2670&auto=format&fit-crop', category: 'Volunteer', isPast: false },
    { id: 4, title: 'Guest Lecture: The Future of AI', date: 'July 28, 2025', location: 'University Auditorium', description: 'A fascinating lecture by a leading expert on the future of artificial intelligence.', longDescription: 'Dr. Evelyn Reed, a renowned expert in machine learning, will deliver a compelling lecture on the transformative power of artificial intelligence. She will discuss recent breakthroughs, ethical considerations, and the future impact of AI on society and various industries. A Q&A session will follow the lecture.', link: '/events/ai-lecture', image: 'https://images.unsplash.com/photo-1620712949543-f119e7a468d6?q=80&w=2670&auto=format&fit-crop', category: 'Lecture', isPast: false },
    { id: 5, title: 'Virtual Book Club Meeting', date: 'July 22, 2025', location: 'Online (Google Meet)', description: 'Discuss a bestselling novel with fellow book lovers in a friendly, virtual setting.', longDescription: 'This month\'s book is "The Midnight Library." Join us for a lively discussion and share your thoughts on the themes, characters, and message of the novel. New members are always welcome!', link: '/events/book-club', image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=2670&auto=format&fit-crop', category: 'Social', isPast: false },
    { id: 6, title: 'Spring Career Fair', date: 'April 10, 2025', location: 'University Gymnasium', description: 'A career fair connecting students and alumni with top companies.', longDescription: 'This fair is a key opportunity for students and alumni to engage with recruiters from leading companies in various sectors. The event will feature company booths, resume workshops, and a panel discussion on career development. Dress for success and bring your resume!', link: '/events/spring-career-fair-recap', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit-crop', category: 'Networking', isPast: true },
    { id: 7, title: 'Alumni Holiday Mixer', date: 'December 15, 2024', location: 'Alumni Hall', description: 'A festive gathering to celebrate the holiday season with food, drinks, and good company.', longDescription: 'Get into the holiday spirit with fellow alumni! This festive mixer will include a catered buffet, a cash bar, and a photo booth. It\'s a relaxed and social setting to catch up with old friends and make new ones before the year ends.', link: '/events/holiday-mixer-recap', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19a4247?q=80&w=2574&auto=format&fit-crop', category: 'Social', isPast: true },
];

const ClockIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>);
const LocationIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
const BackIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>);

export default function EventDetailPage({ params }) {
    const { slug } = params;

    const event = allEvents.find(e => e.link.includes(slug));

    if (!event) {
        return notFound();
    }

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
                                {event.category} Event
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
                            
                            {event.isPast ? (
                                <span className="inline-block px-6 py-3 rounded-full font-semibold text-white bg-rose-500 opacity-80">
                                    This event has already passed.
                                </span>
                            ) : (
                                <motion.a
                                    href="#" // Replace with an actual registration link
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center space-x-2 px-8 py-4 bg-sky-500 text-white rounded-full font-semibold transition-all duration-300 hover:bg-sky-400 hover:shadow-lg group"
                                >
                                    <span>Register Now</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" /><path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                </motion.a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}