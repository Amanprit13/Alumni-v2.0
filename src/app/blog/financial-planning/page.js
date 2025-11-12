// src/app/blog/financial-planning/page.jsx
"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const postData = {
  title: 'Investing in Your Future: Financial Planning for Young Professionals',
  date: 'June 25, 2024',
  author: 'Michael Lee, CFA',
  content: `
    <p class="text-lg text-gray-700 leading-relaxed mb-6">Financial expert and alumnus Michael Lee provides actionable advice on budgeting, savings, and investments for a secure future. This article breaks down complex financial concepts into simple, manageable steps, helping young professionals build a strong financial foundation.</p>
    <h2 class="text-3xl text-gray-700 font-bold mt-10 mb-4 font-serif">Top 3 Financial Tips</h2>
    <ul class="list-disc list-inside space-y-2 text-gray-700">
      <li><strong>Start Early:</strong> The power of compounding works best when you start investing as soon as possible.</li>
      <li><strong>Create a Budget:</strong> Understand where your money is going to take control of your spending.</li>
      <li><strong>Diversify Your Portfolio:</strong> Don’t put all your eggs in one basket. Spread your investments across different asset classes.</li>
    </ul>
    <p class="text-lg text-gray-700 leading-relaxed mt-6">Financial independence is a journey, not a destination. By taking these steps, you can secure your future and achieve your long-term financial goals.</p>
  `,
  image: 'https://images.unsplash.com/photo-1621293673030-c081e8932ef2?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  relatedPosts: [
    { title: 'Beyond the Classroom: Lifelong Learning Opportunities', link: '/blog/lifelong-learning' },
    { title: 'Navigating Your First Job After Graduation', link: '/blog/navigating-your-first-job' },
    { title: 'The Power of Alumni Mentorship: A Success Story', link: '/blog/alumni-mentorship-success' },
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