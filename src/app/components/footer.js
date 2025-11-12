// components/shared/Footer.js

import Link from 'next/link';
import React from 'react';

// Data structure for the navigation links
const footerLinks = [
  {
    title: 'Discover',
    links: [
      { name: 'Events Calendar', href: '/events' },
      { name: 'Blog & News', href: '/blog' },
      { name: 'Games & Quiz', href: '/games-quiz' },
    ],
  },
  {
    title: 'Career & Support',
    links: [
      { name: 'Jobs Board', href: '/jobs' },
      { name: 'Start Up Hub', href: '/startup' },
      { name: 'Scholarships', href: '/scholarship' },
      { name: 'Dashboard', href: '/dashboard' },
    ],
  },
  {
    title: 'Engage',
    links: [
      { name: 'About Us', href: '/about-us' },
      { name: 'Contact Us', href: '/contact' },
      { name: 'Chat Box', href: '/chat-box' },
      { name: 'Make a Donation ❤️', href: '/donation', emphasis: true }, // Highlight donation
    ],
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white border-t border-blue-700 mt-16">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          
          {/* 1. Logo and Mission Statement */}
          <div className="col-span-2 md:col-span-2 space-y-4">
            <Link href="/" className="text-2xl font-bold text-blue-400 hover:text-blue-300 transition duration-200">
                AlumniConnect
            </Link>
            <p className="text-gray-400 text-sm max-w-sm">
              Connecting graduates worldwide to foster lifelong learning, career development, and community impact.
            </p>
            <div className="flex space-x-4">
                {/* Placeholder Social Icons */}
                <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-blue-500"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM4 11h4v10H4zM6 7a2 2 0 100-4 2 2 0 000 4z"/></svg></a>
                <a href="#" aria-label="Facebook" className="text-gray-400 hover:text-blue-500"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.873v-7.777H7.077v-2.096h2.234V9.82c0-2.203 1.352-3.803 3.883-3.803 1.096 0 2.241.195 2.241.195v2.465h-1.26a1.954 1.954 0 00-1.554.646c-.579.791-.58 1.936-.58 2.658V14h2.77l-.443 2.096h-2.327v7.777C18.343 21.128 22 16.991 22 12z"/></svg></a>
                <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-blue-500"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557a9.833 9.833 0 01-2.828.775 4.918 4.918 0 002.166-2.724 9.864 9.864 0 01-3.131 1.195 4.921 4.921 0 00-8.384 4.482A13.923 13.923 0 013.2 4.773a4.92 4.92 0 001.523 6.574A4.908 4.908 0 013.33 10.37V10.4a4.919 4.919 0 003.947 4.823A4.9 4.9 0 015 15.111a4.935 4.935 0 004.6 3.4A9.854 9.854 0 012 19.897a13.92 13.92 0 007.545 2.21A13.924 13.924 0 0022 10.076z"/></svg></a>
            </div>
          </div>

          {/* 2. Navigation Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400 border-b border-blue-600 pb-1">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.href} 
                      className={`text-sm hover:text-blue-300 transition duration-200 ${link.emphasis ? 'font-bold text-red-400 hover:text-red-300' : 'text-gray-400'}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* 3. Copyright and Legal */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} AlumniConnect. All rights reserved. 
            <Link href="/privacy" className="ml-4 hover:text-blue-400">Privacy Policy</Link> | 
            <Link href="/terms" className="ml-4 hover:text-blue-400">Terms of Service</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}