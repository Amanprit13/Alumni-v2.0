"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Mock Data and Fetch Logic ---
// We simulate data fetching for infinite scroll
const initialPosts = [
    {
        id: 1,
        title: 'Navigating Your First Job After Graduation',
        category: 'Career',
        date: 'July 12, 2024',
        author: 'Dr. Emily Carter',
        snippet: 'Dr. Emily Carter shares essential tips for recent graduates entering the professional world, from resume building to networking and making a strong first impression.',
        image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit-crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        link: '/blog/navigating-your-first-job'
    },
    {
        id: 2,
        title: 'The Power of Alumni Mentorship: A Success Story',
        category: 'Mentorship',
        date: 'July 8, 2024',
        author: 'AlumniConnect Team',
        snippet: 'Read about how our mentorship program transformed the career path of a young alumna, thanks to the invaluable guidance of an experienced mentor.',
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2940&auto=format&fit-crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        link: '/blog/alumni-mentorship-success'
    },
    {
        id: 3,
        title: 'Sustainable Living: Alumni Initiatives Making a Difference',
        category: 'Sustainability',
        date: 'June 30, 2024',
        author: 'Sarah Green',
        snippet: 'Discover inspiring sustainability projects led by our alumni, impacting communities globally with innovative solutions.',
        image: 'https://extension.harvard.edu/wp-content/uploads/sites/8/2020/08/sustainability-solar-1024x680.jpg',
        link: '/blog/sustainable-living-initiatives'
    },
];

const loadMorePosts = (currentCount) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            // Mock posts to load next
            const newPosts = [
                {
                    id: currentCount + 1,
                    title: 'Investing in Your Future: Financial Planning for Young Professionals',
                    category: 'Finance',
                    date: 'June 25, 2024',
                    author: 'Michael Lee, CFA',
                    snippet: 'Financial expert and alumnus Michael Lee provides actionable advice on budgeting, savings, and investments for a secure future.',
                    image: 'https://wellspringfinancialpartners.com/wp-content/uploads/2024/02/How-to-Build-a-Strong-Financial-Foundation-scaled.jpg',
                    link: '/blog/financial-planning'
                },
                {
                    id: currentCount + 2,
                    title: 'Beyond the Classroom: Lifelong Learning Opportunities',
                    category: 'Education',
                    date: 'June 18, 2024',
                    author: 'Prof. David Kim',
                    snippet: 'Professor David Kim discusses the importance of continuous learning and resources available to alumni for professional development.',
                    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2940&auto=format&fit-crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
                    link: '/blog/lifelong-learning'
                },
                {
                    id: currentCount + 3,
                    title: 'The Evolution of Tech: An Alumni Perspective',
                    category: 'Technology',
                    date: 'June 10, 2024',
                    author: 'Tech Alumni Group',
                    snippet: 'A deep dive into the rapid changes in the tech industry, as seen through the eyes of our tech-savvy alumni and their groundbreaking contributions.',
                    image: 'https://images.squarespace-cdn.com/content/v1/584ee3cc2994cac9e545aadd/7f35eb6d-376e-4364-b1f4-92e64d53b8f4/Distrubuted+Enterprise.png',
                    link: '/blog/tech-evolution'
                },
            ];

            // Stop loading after 6 posts (initial 3 + 3 new) for demonstration
            if (currentCount < 6) {
                resolve(newPosts);
            } else {
                resolve([]); // No more data
            }
        }, 1500); // Simulate network delay
    });
};
// --- End Mock Data and Fetch Logic ---

export default function BlogPage() {
    const [posts, setPosts] = useState(initialPosts);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // --- Infinite Scroll Logic (Manual Implementation using useEffect) ---
    const fetchMoreData = async () => {
        // Prevent simultaneous fetches or fetches when no more data exists
        if (isLoading || !hasMore) return;

        setIsLoading(true);

        // Fetch new data
        const newPosts = await loadMorePosts(posts.length);
        const combinedPosts = [...posts, ...newPosts];

        // Update state
        setPosts(combinedPosts);

        // If no new posts were returned, mark hasMore as false
        if (newPosts.length === 0) {
            setHasMore(false);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        // Function to check if the user has scrolled near the bottom
        const handleScroll = () => {
            // Check if user is near the bottom of the page (500px threshold from the bottom)
            const isNearBottom = (
                window.innerHeight + document.documentElement.scrollTop >=
                document.documentElement.offsetHeight - 500
            );

            // Trigger fetch only if near bottom, still has data, and not currently loading
            if (isNearBottom && hasMore && !isLoading) {
                fetchMoreData();
            }
        };

        // Attach the scroll listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount to prevent memory leaks
        return () => window.removeEventListener('scroll', handleScroll);
        
    // Dependencies ensure the handler uses the latest values for state variables
    }, [hasMore, isLoading, posts.length]);
    // --- End Infinite Scroll Logic ---


    // Framer Motion Variants
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

    const categoryColors = {
        'Career': 'bg-rose-100 text-rose-800',
        'Mentorship': 'bg-sky-100 text-sky-800',
        'Sustainability': 'bg-emerald-100 text-emerald-800',
        'Finance': 'bg-amber-100 text-amber-800',
        'Education': 'bg-purple-100 text-purple-800',
        'Technology': 'bg-orange-100 text-orange-800',
    };

    // Newsletter CTA component for reuse
    const NewsletterCTA = () => (
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mt-24 p-8 md:p-16 bg-[#002e50] rounded-2xl shadow-2xl overflow-hidden relative"
        >
            {/* Background pattern for interest */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <defs>
                        <pattern id="dot-pattern" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                            <circle cx="2" cy="2" r="1.5" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dot-pattern)" />
                </svg>
            </div>

            <div className="relative text-center max-w-4xl mx-auto">
                <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight leading-tight font-serif">
                    Insights Delivered
                </h3>
                <p className="text-xl text-sky-100 mb-8 font-light">
                    Get the latest articles, exclusive alumni interviews, and career tips sent straight to your inbox every week.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <input
                        type="email"
                        placeholder="Your professional email address"
                        className="w-full sm:w-80 p-3 rounded-full text-neutral-800 border-2 border-transparent focus:ring-4 focus:ring-sky-200/50 shadow-md transition-all duration-300 bg-white"
                    />
                    {/* Using standard <a> tag instead of Next.js Link */}
                    <a href="#" className="flex items-center justify-center bg-rose-500 text-white font-semibold py-3 px-8 rounded-full shadow-xl hover:bg-rose-400 transition-colors duration-200 transform hover:scale-105">
                        Subscribe Now
                    </a>
                </div>
            </div>
        </motion.div>
    );

    return (
        // The main container now sets the full page background gradient
        <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 text-neutral-900 font-sans antialiased">

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-rose-200/50 rounded-full blur-[100px]"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-sky-200/50 rounded-full blur-[100px]"></div>
                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-neutral-800 mb-4 tracking-tight drop-shadow-lg font-serif">
                        Insights & Inspiration
                    </h1>
                    <p className="text-lg sm:text-xl text-neutral-600 font-light max-w-2xl mx-auto">
                        A curated collection of wisdom, stories, and achievements from our esteemed alumni, updated weekly.
                    </p>
                </div>
            </motion.div>

            {/* Main Content Area */}
            <main className="container mx-auto px-4 py-8 lg:py-12 max-w-7xl">

                {/* Search Section */}
                <section className="mb-16">
                    <div className="relative w-full max-w-4xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search for topics, authors, or keywords..."
                            className="w-full pl-12 pr-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-gray-200 focus:border-gray-300 transition-all duration-300 shadow-md text-neutral-700 placeholder-neutral-400"
                        />
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </section>

                {/* Blog Post Grid */}
                <div>
                    <motion.section
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 xl:gap-12"
                    >
                        <AnimatePresence>
                            {posts.map((post, index) => {
                                const isFeatured = index === 0;
                                return (
                                    <motion.article
                                        key={post.id}
                                        variants={itemVariants}
                                        whileHover={{ y: -6, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)" }}
                                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        className="bg-white rounded-xl shadow-xl border border-neutral-100 overflow-hidden flex flex-col hover:border-rose-200 transition-all duration-200"
                                    >
                                        {/* Using standard <a> tag instead of Next.js Link */}
                                        <a href={post.link} className="block group h-full flex flex-col">
                                            {post.image && (
                                                <div className="relative w-full h-56 overflow-hidden">
                                                    <motion.img
                                                        src={post.image}
                                                        alt={post.title}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ duration: 0.5 }}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                                                    />
                                                    {/* Featured Tag */}
                                                    {isFeatured && (
                                                        <div className="absolute top-4 right-4 bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md animate-pulse">
                                                            Featured
                                                        </div>
                                                    )}
                                                    {/* Category Tag */}
                                                    <span className={`absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md ${categoryColors[post.category]}`}>
                                                        {post.category}
                                                    </span>
                                                </div>
                                            )}
                                            <div className="p-6 md:p-8 flex flex-col flex-grow">
                                                <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest mb-2">
                                                    {post.date}
                                                </span>
                                                <h2 className="text-xl md:text-2xl font-bold text-neutral-900 mb-3 leading-snug group-hover:text-rose-500 transition-colors duration-200 font-serif">
                                                    {post.title}
                                                </h2>
                                                <p className="text-neutral-700 text-base mb-6 flex-grow leading-relaxed line-clamp-3">
                                                    {post.snippet}
                                                </p>
                                                <div className="flex items-center text-rose-500 font-semibold hover:text-rose-700 transition-colors duration-200 mt-auto">
                                                    Read More
                                                    <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h16M13 5l7 7-7 7"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </a>
                                    </motion.article>
                                );
                            })}
                        </AnimatePresence>
                    </motion.section>

                    {/* Manual Infinite Scroll Messages */}
                    {isLoading && (
                        <h4 className="text-center text-lg text-neutral-500 font-light py-8 animate-pulse">
                            Loading more articles...
                        </h4>
                    )}
                    {!hasMore && !isLoading && (
                        <p className="text-center text-lg text-neutral-500 font-light py-8">
                            That's all the current content for now!
                        </p>
                    )}
                    {/* Add a fallback message if the initial load fails or posts is empty */}
                    {!isLoading && posts.length === 0 && (
                        <p className="text-center text-lg text-neutral-500 font-light py-8">
                            No blog posts found. Please check back later!
                        </p>
                    )}
                </div>

            </main>
        </div>
    );
}
