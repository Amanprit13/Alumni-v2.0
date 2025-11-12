// src/app/blog/tech-evolution/page.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const postData = {
  title: 'The Evolution of Tech: An Alumni Perspective',
  date: 'June 10, 2024',
  author: 'Tech Alumni Group',
  content: `
    <p class="text-lg text-gray-700 leading-relaxed mb-6">The tech industry is in a constant state of flux, and our tech-savvy alumni have been at the forefront of this evolution. This article takes a deep dive into the rapid changes, as seen through the eyes of alumni who are building groundbreaking technologies and shaping the future.</p>
    <h2 class="text-3xl text-gray-700 font-bold mt-10 mb-4 font-serif">Key Innovations and Trends</h2>
    <ul class="list-disc list-inside space-y-2 text-gray-700">
      <li><strong>AI and Machine Learning:</strong> How AI is being integrated into everyday products and services.</li>
      <li><strong>Cybersecurity:</strong> The increasing importance of digital security in a connected world.</li>
      <li><strong>Sustainable Technology:</strong> Innovations focused on reducing the environmental impact of technology.</li>
    </ul>
    <p class="text-lg text-gray-700 leading-relaxed mt-6">Our alumni are not just observing these changes; they are driving them. Their contributions are a testament to the innovative spirit of our community.</p>
  `,
  image: 'https://images.unsplash.com/photo-1518770660439-463ff874835e?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  relatedPosts: [
    { title: 'Beyond the Classroom: Lifelong Learning Opportunities', link: '/blog/lifelong-learning' },
    { title: 'The Power of Alumni Mentorship: A Success Story', link: '/blog/alumni-mentorship-success' },
    { title: 'Sustainable Living: Alumni Initiatives Making a Difference', link: '/blog/sustainable-living-initiatives' },
  ]
};

const SocialShareButtons = () => (
  <div className="flex items-center space-x-4">
    <span className="text-gray-600 font-semibold">Share:</span>
    <a href="https://twitter.com/intent/tweet?url=YOUR_URL_HERE" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Share on X"></svg>
    </a>
    <a href="https://www.linkedin.com/sharing/share-offsite/?url=YOUR_URL_HERE" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Share on LinkedIn"></svg>
    </a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=YOUR_URL_HERE" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-label="Share on Facebook"></svg>
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
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
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