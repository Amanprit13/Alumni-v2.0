// src/app/blog/[slug]/page.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Mock data for a single post.
// In a real application, you would use 'slug' from the URL to fetch
// the corresponding data from a database or API.
const postData = {
  title: 'Navigating Your First Job After Graduation',
  date: 'July 12, 2024',
  author: 'Dr. Emily Carter',
  content: `
    <p class="text-lg text-gray-700 leading-relaxed mb-6">Entering the professional world after graduation can be both exhilarating and daunting. Dr. Emily Carter, a seasoned career counselor and alumna, shares her top tips for making a seamless transition from academia to the workforce. This article covers everything from optimizing your resume to mastering the art of the interview.</p>
    <h2 class="text-3xl text-gray-700 font-bold mt-10 mb-4 font-serif">Key Takeaways for Graduates</h2>
    <ul class="list-disc list-inside space-y-2 text-gray-700">
      <li><strong>Resume Optimization:</strong> Focus on quantifiable achievements rather than just responsibilities.</li>
      <li><strong>Networking Skills:</strong> Build genuine connections with professionals in your field.</li>
      <li><strong>First Impressions:</strong> Always be punctual and prepared, and follow up with a thank-you note.</li>
    </ul>
    <p class="text-lg text-gray-700 leading-relaxed mt-6">Remember, your first job is not just a role; it’s the foundation of your career. Embrace the learning process, seek out mentorship, and don’t be afraid to ask questions. The alumni network is here to support you every step of the way.</p>
  `,
  image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  relatedPosts: [
    { title: 'The Power of Alumni Mentorship: A Success Story', link: '/blog/mentorship-success' },
    { title: 'Beyond the Classroom: Lifelong Learning Opportunities', link: '/blog/lifelong-learning' },
    { title: 'Investing in Your Future: Financial Planning', link: '/blog/financial-planning' },
  ]
};

const SocialShareButtons = () => (
  <div className="flex items-center space-x-4">
    <span className="text-gray-600 font-semibold">Share:</span>
    <a href="https://twitter.com/intent/tweet?url=YOUR_URL_HERE" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.85.38-1.78.65-2.75.76a4.91 4.91 0 002.16-2.67 9.8 9.8 0 01-3.1 1.18c-.79-.84-1.92-1.37-3.21-1.37-2.43 0-4.4 2.1-4.4 4.7a4.67 4.67 0 00.12 1.09c-4.14-.21-7.8-2.3-10.25-5.46a4.84 4.84 0 00-.65 2.4c0 1.63.83 3.07 2.1 3.91a4.68 4.68 0 01-2.02-.55v.06a4.4 4.4 0 003.54 4.34 4.7 4.7 0 01-2 .08c.56 1.7 2.17 2.92 4.09 2.96A9.43 9.43 0 011 18.29a13.31 13.31 0 007.25 2.2c8.7 0 13.4-7.53 13.4-14.07v-.63c.92-.68 1.7-1.53 2.33-2.5z"/></svg>
    </a>
    <a href="https://www.linkedin.com/sharing/share-offsite/?url=YOUR_URL_HERE" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14zm-5 14h-2v-5h-2v5H9V8h2v1.5a4.7 4.7 0 014.5-2.5c2.9 0 4.5 1.9 4.5 5.5v5.5H15v-5.5c0-.8-.1-1.2-.5-1.5-.4-.3-.8-.5-1.5-.5a4.3 4.3 0 00-3 1.2V17zM7 8h2v9H7V8zm-2 5a2 2 0 11-2-2 2 2 0 012 2z"/></svg>
    </a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL_HERE" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.65 9.12 8.44 9.87V15.22H7.44v-3.21h2.56V9.56c0-2.52 1.54-3.89 3.78-3.89 1.08 0 2.24.19 2.24.19v2.47h-1.25c-1.24 0-1.61.77-1.61 1.57v1.86h2.8l-.45 3.21H13v6.65c4.8-.75 8.44-4.88 8.44-9.87z"/></svg>
    </a>
  </div>
);

const RelatedPosts = ({ posts }) => (
  <aside className="mt-16 pt-8 border-t border-gray-200">
    <h3 className="text-3xl text-gray-700 font-bold mb-6 font-serif">Related Articles</h3>
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

export default function BlogPostPage() {
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
            <p className="text-lg text-gray-500">By <span className="font-semibold text-gray-700">{postData.author}</span></p>
          </div>
          <div className="relative w-full h-[400px] mb-12 rounded-xl overflow-hidden shadow-lg">
            <img src={postData.image} alt={postData.title} className="w-full h-full object-cover" />
          </div>
          <div className="prose max-w-none mx-auto">
            <div dangerouslySetInnerHTML={{ __html: postData.content }} />
          </div>
          <div className="mt-12 flex items-center justify-between">
            <Link href="/blog" className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              All Articles
            </Link>
            <SocialShareButtons />
          </div>
          <RelatedPosts posts={postData.relatedPosts} />
        </motion.div>
      </main>
    </div>
  );
}