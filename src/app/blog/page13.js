"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';

// Mock data to simulate fetching more blog posts
const initialPosts = [
  {
    id: 1,
    title: 'Navigating Your First Job After Graduation',
    category: 'Career',
    date: 'July 12, 2024',
    author: 'Dr. Emily Carter',
    snippet: 'Dr. Emily Carter shares essential tips for recent graduates entering the professional world, from resume building to networking and making a strong first impression.',
    image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/blog/navigating-your-first-job'
  },
  {
    id: 2,
    title: 'The Power of Alumni Mentorship: A Success Story',
    category: 'Mentorship',
    date: 'July 8, 2024',
    author: 'AlumniConnect Team',
    snippet: 'Read about how our mentorship program transformed the career path of a young alumna, thanks to the invaluable guidance of an experienced mentor.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/blog/alumni-mentorship-success'
  },
  {
    id: 3,
    title: 'Sustainable Living: Alumni Initiatives Making a Difference',
    category: 'Sustainability',
    date: 'June 30, 2024',
    author: 'Sarah Green',
    snippet: 'Discover inspiring sustainability projects led by our alumni, impacting communities globally with innovative solutions.',
    image: 'https://images.unsplash.com/photo-1532982823810-74913c3327f2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    link: '/blog/sustainable-living-initiatives'
  },
];

const loadMorePosts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const morePosts = [
        {
          id: 4,
          title: 'Investing in Your Future: Financial Planning for Young Professionals',
          category: 'Finance',
          date: 'June 25, 2024',
          author: 'Michael Lee, CFA',
          snippet: 'Financial expert and alumnus Michael Lee provides actionable advice on budgeting, savings, and investments for a secure future.',
          image: 'https://images.unsplash.com/photo-1621293673030-c081e8932ef2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          link: '/blog/financial-planning'
        },
        {
          id: 5,
          title: 'Beyond the Classroom: Lifelong Learning Opportunities',
          category: 'Education',
          date: 'June 18, 2024',
          author: 'Prof. David Kim',
          snippet: 'Professor David Kim discusses the importance of continuous learning and resources available to alumni for professional development.',
          image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          link: '/blog/lifelong-learning'
        },
        {
          id: 6,
          title: 'The Evolution of Tech: An Alumni Perspective',
          category: 'Technology',
          date: 'June 10, 2024',
          author: 'Tech Alumni Group',
          snippet: 'A deep dive into the rapid changes in the tech industry, as seen through the eyes of our tech-savvy alumni and their groundbreaking contributions.',
          image: 'https://images.unsplash.com/photo-1518770660439-463ff874835e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          link: '/blog/tech-evolution'
        },
      ];
      resolve(morePosts);
    }, 1500); // Simulate network delay
  });
};

export default function BlogPage() {
  const [posts, setPosts] = useState(initialPosts);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = async () => {
    const newPosts = await loadMorePosts();
    setPosts((prevPosts) => [...prevPosts, ...newPosts]);
    if (posts.length + newPosts.length >= 6) {
      setHasMore(false);
    }
  };

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
    'Career': 'bg-rose-300',
    'Mentorship': 'bg-sky-300',
    'Sustainability': 'bg-emerald-300',
    'Finance': 'bg-amber-300',
    'Education': 'bg-purple-300',
    'Technology': 'bg-orange-300',
  };

  return (
    // The main container now sets the full page background gradient
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 text-neutral-900 font-sans antialiased">

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-rose-200/50 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-sky-200/50 rounded-full blur-[100px]"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-neutral-800 mb-4 tracking-tight drop-shadow-lg font-serif">
            Insights & Inspiration
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 font-light max-w-2xl mx-auto">
            A curated collection of wisdom, stories, and achievements from our esteemed alumni, updated weekly.
          </p>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-16 lg:py-24 max-w-7xl">
        <section className="flex flex-col sm:flex-row items-center justify-between mb-16 space-y-4 sm:space-y-0 sm:space-x-8">
          <div className="relative w-full sm:w-2/3">
            <input
              type="text"
              placeholder="Search for topics, authors, or keywords..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-neutral-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all duration-200 shadow-sm text-neutral-700"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
          <a href="#" className="w-full sm:w-1/3 text-center bg-sky-500 text-white font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-sky-400 transition-colors duration-200 transform hover:-translate-y-1 hover:scale-105">
            Subscribe for Weekly Updates
          </a>
        </section>
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4 className="text-center text-neutral-500 font-light py-8">Loading more articles...</h4>}
          endMessage={<p className="text-center text-neutral-500 font-light py-8">That's all for now!</p>}
        >
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
                    whileHover={{ y: -6, boxShadow: "0 15px 30px rgba(0, 0, 0, 0.08)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    // Removed bg-white here to allow the page's background to show through
                    className="relative rounded-xl shadow-lg border border-neutral-100 overflow-hidden flex flex-col"
                  >
                    <Link href={post.link} className="block group">
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
                          {isFeatured && (
                            <div className="absolute top-4 right-4 bg-yellow-200 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md animate-pulse">
                              Featured
                            </div>
                          )}
                          <span className={`absolute top-4 left-4 text-neutral-800 text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md ${categoryColors[post.category]}`}>
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
                        <p className="text-neutral-700 text-base mb-6 flex-grow leading-relaxed">
                          {post.snippet}
                        </p>
                        <div className="flex items-center text-rose-500 font-semibold hover:text-rose-700 transition-colors duration-200">
                          <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7-7m-7 7h18"></path>
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                );
              })}
            </AnimatePresence>
            <motion.article
              key="newsletter-cta"
              variants={itemVariants}
              // This newsletter card remains a solid color for contrast
              className="md:col-span-1 lg:col-span-1 bg-sky-500 text-white p-8 md:p-12 rounded-xl shadow-lg my-auto text-center flex flex-col justify-center"
            >
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Don't Miss Out!</h3>
              <p className="text-lg mb-6 max-w-2xl mx-auto">
                Get the latest articles and exclusive insights from our alumni delivered straight to your inbox every week.
              </p>
              <a href="#" className="inline-block bg-white text-sky-500 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-neutral-100 transition-colors duration-200 transform hover:scale-105">
                Join the Community
              </a>
            </motion.article>
          </motion.section>
        </InfiniteScroll>
        <div className="mt-20 text-center">
          <Link href="/" className="inline-flex items-center font-medium text-neutral-600 hover:text-neutral-900 transition-colors duration-200 group">
            <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}