// src/app/news/research-breakthrough-emily-white/page.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const postData = {
  title: 'Research Breakthrough by Dr. Emily White (Class of 1998)',
  subtitle: 'A pivotal research paper in quantum computing could redefine the future of technology.',
  date: 'June 20, 2024',
  author: 'Alumni Association',
  content: `
    <p class="text-lg text-gray-700 leading-relaxed mb-6">Dr. Emily White, a distinguished alumna from the Class of 1998, has made a monumental contribution to the field of quantum computing. Her latest research, published in the journal "Quantum Perspectives," introduces a new algorithm that significantly reduces the error rate in quantum calculations, a major hurdle in the development of practical quantum computers.</p>
    <h2 class="text-3xl font-bold mt-10 mb-4 font-serif">A Quantum Leap Forward</h2>
    <p class="text-lg text-gray-700 leading-relaxed mb-6">This breakthrough is the culmination of years of dedicated work by Dr. White and her team. The new algorithm, which she developed based on her doctoral research, promises to unlock new possibilities in drug discovery, financial modeling, and materials science by making quantum computations more reliable and efficient.</p>
    <blockquote class="text-xl italic text-gray-600 border-l-4 border-blue-500 pl-6 my-8">
      "It's a step toward making the incredible potential of quantum computing a tangible reality. I’m incredibly grateful for the foundational knowledge and curiosity I developed during my time here."
    </blockquote>
    <p class="text-lg text-gray-700 leading-relaxed mt-6">Dr. White’s achievement is a source of great pride for our entire community. Her work exemplifies the spirit of innovation and intellectual rigor that our alumni carry into their professional lives.</p>
  `,
  image: 'https://images.unsplash.com/photo-1582216654877-c9189c44766e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  relatedPosts: [
    { title: 'New Mentorship Program Launched for Current Students', link: '/news/mentorship-program-launch' },
    { title: 'Alumni Spotlight: Innovator of the Year', link: '/news/alumni-spotlight-sarah-chen' },
    { title: 'Annual Alumni Reunion Gala Announced!', link: '/news/annual-gala' },
  ]
};

const SocialShareButtons = () => (
  <div className="flex items-center space-x-4">
    <span className="text-gray-600 font-semibold">Share:</span>
    <a href="https://twitter.com/intent/tweet?url=YOUR_URL_HERE" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Share on X">
        <path d="M22.46 6c-.85.38-1.78.65-2.75.76a4.91 4.91 0 002.16-2.67 9.8 9.8 0 01-3.1 1.18c-.79-.84-1.92-1.37-3.21-1.37-2.43 0-4.4 2.1-4.4 4.7a4.67 4.67 0 00.12 1.09c-4.14-.21-7.8-2.3-10.25-5.46a4.84 4.84 0 00-.65 2.4c0 1.63.83 3.07 2.1 3.91a4.68 4.68 0 01-2.02-.55v.06a4.4 4.4 0 003.54 4.34 4.7 4.7 0 01-2 .08c.56 1.7 2.17 2.92 4.09 2.96A9.43 9.43 0 011 18.29a13.31 13.31 0 007.25 2.2c8.7 0 13.4-7.53 13.4-14.07v-.63c.92-.68 1.7-1.53 2.33-2.5z"></path>
      </svg>
    </a>
    <a href="https://www.linkedin.com/sharing/share-offsite/?url=YOUR_URL_HERE" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Share on LinkedIn">
        <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-5 14h-2v-5h-2v5H9V8h2v1.5a4.7 4.7 0 014.5-2.5c2.9 0 4.5 1.9 4.5 5.5v5.5H15v-5.5c0-.8-.1-1.2-.5-1.5-.4-.3-.8-.5-1.5-.5a4.3 4.3 0 00-3 1.2V17zM7 8h2v9H7V8zm-2 5a2 2 0 11-2-2 2 2 0 012 2z"></path>
      </svg>
    </a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL_HERE" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Share on Facebook">
        <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.65 9.12 8.44 9.87V15.22H7.44v-3.21h2.56V9.56c0-2.52 1.54-3.89 3.78-3.89 1.08 0 2.24.19 2.24.19v2.47h-1.25c-1.24 0-1.61.77-1.61 1.57v1.86h2.8l-.45 3.21H13v6.65c4.8-.75 8.44-4.88 8.44-9.87z"></path>
      </svg>
    </a>
  </div>
);

const RelatedPosts = ({ posts }) => (
  <aside className="mt-16 pt-8 border-t border-gray-200">
    <h3 className="text-3xl font-bold mb-6 font-serif">More News</h3>
    <ul className="space-y-4">
      {posts.map((post, index) => (
        <li key={index}>
          <Link href={post.link} className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200">
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  </aside>
);

export default function NewsArticlePage() {
  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      <main className="container mx-auto px-4 py-16 lg:py-24 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="text-center mb-12">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">
              {postData.date}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-gray-900 mb-4 font-serif">
              {postData.title}
            </h1>
            <p className="text-lg text-gray-500 font-light mb-4">{postData.subtitle}</p>
            <p className="text-sm text-gray-400">By <span className="font-semibold text-gray-600">{postData.author}</span></p>
          </div>
          <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden shadow-lg">
            <img src={postData.image} alt={postData.title} className="w-full h-full object-cover" />
          </div>
          <div className="prose max-w-none mx-auto">
            <div dangerouslySetInnerHTML={{ __html: postData.content }} />
          </div>
          <div className="mt-12 flex items-center justify-between">
            <Link href="/news" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              All News
            </Link>
            <SocialShareButtons />
          </div>
          <RelatedPosts posts={postData.relatedPosts} />
        </motion.div>
      </main>
    </div>
  );
}