"use client"; // This directive marks the component as a client component

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NewsPage() {
  const newsArticles = [
    {
      id: 1,
      title: 'Alumni Spotlight: Innovator of the Year',
      date: 'July 10, 2024',
      snippet: 'Meet Sarah Chen, Class of 2005, who was recently honored as "Innovator of the Year" for her groundbreaking work in sustainable energy solutions.',
      link: '/news/alumni-spotlight-sarah-chen',
      image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 2,
      title: 'Annual Alumni Reunion Gala Announced!',
      date: 'July 5, 2024',
      snippet: 'Mark your calendars! Our annual Alumni Reunion Gala will be held on October 26th. Early bird tickets available now.',
      link: '/news/annual-gala',
      image: 'https://images.pexels.com/photos/1578330/pexels-photo-1578330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 3,
      title: 'New Mentorship Program Launched for Current Students',
      date: 'June 28, 2024',
      snippet: 'The Alumni Association is proud to announce a new mentorship program connecting experienced alumni with current students.',
      link: '/news/mentorship-program-launch',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 4,
      title: 'Research Breakthrough by Dr. Emily White (Class of 1998)',
      date: 'June 20, 2024',
      snippet: 'Dr. Emily White, a distinguished alumna, has published a pivotal research paper in quantum computing.',
      link: '/news/research-breakthrough-emily-white',
      image: 'https://images.pexels.com/photos/5989178/pexels-photo-5989178.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: 5,
      title: 'Alumni Volunteer Day: Making a Difference in the Community',
      date: 'June 15, 2024',
      snippet: 'Our alumni came together for a day of community service, demonstrating the power of our network.',
      link: '/news/volunteer',
      image: 'https://images.pexels.com/photos/6646917/pexels-photo-6646917.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
  ];

  const featuredArticle = newsArticles[0];
  const otherArticles = newsArticles.slice(1);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = otherArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.snippet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* Hero and Search Section */}
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Alumni News & Announcements
          </h1>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Stay connected with the latest achievements, events, and stories from our global alumni network.
          </p>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search news or topics..."
              className="w-full pl-12 pr-4 py-3 rounded-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm text-gray-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-16 lg:py-24 max-w-7xl">
        {/* Featured Article Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-50 rounded-xl shadow-lg overflow-hidden mb-16"
        >
          <Link href={featuredArticle.link} className="block group">
            <div className="md:flex md:items-center">
              <div className="md:w-1/2 h-64 md:h-96 relative">
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6 md:p-8">
                  <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow-md">
                    Featured
                  </span>
                </div>
              </div>
              <div className="md:w-1/2 p-6 md:p-8">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">
                  {featuredArticle.date}
                </p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors duration-200">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-700 mt-4 text-base md:text-lg">
                  {featuredArticle.snippet}
                </p>
                <div className="mt-4 flex items-center text-blue-500 font-medium hover:text-blue-700 transition-colors duration-200">
                  Read More
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Other News Articles Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.length > 0 ? (
            filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * (article.id) }}
                className="bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <Link href={article.link} className="block group">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2 leading-snug group-hover:text-blue-600 transition-colors duration-200">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-500 mb-3">{article.date}</p>
                    <p className="text-gray-700 text-base mb-4">{article.snippet}</p>
                    <div className="text-blue-600 hover:underline font-medium flex items-center">
                      Read More
                      <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-10">
              <p className="text-gray-500 text-lg">No articles found matching your search.</p>
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 bg-blue-600 text-white p-8 md:p-12 rounded-xl shadow-lg text-center"
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Join the Alumni Newsletter</h3>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Get the latest alumni news and exclusive updates delivered straight to your inbox every week.
          </p>
          <a href="#" className="inline-block bg-white text-blue-600 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
            Subscribe Now
          </a>
        </motion.div>

        <div className="mt-12 text-center">
          <Link href="/" className="font-medium text-gray-600 hover:text-gray-900">
            &larr; Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}