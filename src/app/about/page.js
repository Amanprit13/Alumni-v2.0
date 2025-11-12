// "use client"; // This directive marks the component as a client component

// import React from 'react';
// import Link from 'next/link';

// export default function AboutUsPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
//       <div className="max-w-5xl w-full bg-white rounded-xl shadow-2xl p-8 space-y-8 transform transition-all duration-300 hover:scale-[1.005]">
//         <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
//           About AlumniConnect
//         </h1>

//         <p className="text-center text-lg text-gray-700 mb-8">
//           AlumniConnect is dedicated to fostering a vibrant and supportive community among our esteemed graduates. We believe in the power of connection, shared experiences, and collective growth.
//         </p>

//         {/* Mission Section */}
//         <section className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
//           <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
//             <svg className="w-7 h-7 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5a3 3 0 00-3-3V1a1 1 0 00-1-1H7a1 1 0 00-1 1v1a3 3 0 00-3 3v5m-1 0h16a2 2 0 012 2v2a2 2 0 01-2 2H2a2 2 0 01-2-2v-2a2 2 0 012-2z"></path></svg>
//             Our Mission
//           </h2>
//           <p className="text-gray-700 leading-relaxed">
//             Our mission is to create a lifelong bond between our alumni and the institution, providing a platform for networking, professional development, and meaningful engagement. We strive to empower our graduates to achieve their full potential and contribute positively to society.
//           </p>
//         </section>

//         {/* Vision Section */}
//         <section className="bg-green-50 p-6 rounded-lg shadow-md border border-green-200">
//           <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
//             <svg className="w-7 h-7 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
//             Our Vision
//           </h2>
//           <p className="text-gray-700 leading-relaxed">
//             To be the leading global alumni network, recognized for fostering innovation, leadership, and social responsibility, and for consistently enriching the lives of our alumni and the wider community.
//           </p>
//         </section>

//         {/* Values Section */}
//         <section className="bg-yellow-50 p-6 rounded-lg shadow-md border border-yellow-200">
//           <h2 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center">
//             <svg className="w-7 h-7 mr-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
//             Our Values
//           </h2>
//           <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
//             <li><span className="font-semibold text-gray-800">Community:</span> Building strong, supportive relationships.</li>
//             <li><span className="font-semibold text-gray-800">Excellence:</span> Striving for the highest standards in all endeavors.</li>
//             <li><span className="font-semibold text-gray-800">Innovation:</span> Embracing new ideas and creative solutions.</li>
//             <li><span className="font-semibold text-gray-800">Integrity:</span> Operating with honesty, transparency, and respect.</li>
//             <li><span className="font-semibold text-gray-800">Impact:</span> Making a positive difference in the world.</li>
//           </ul>
//         </section>

//         {/* Our Team Section (Placeholder) */}
//         <section className="bg-gray-50 p-6 rounded-lg shadow-md border border-gray-200">
//           <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Meet Our Team (Coming Soon!)</h2>
//           <p className="text-center text-gray-700">
//             We are a passionate team dedicated to serving our alumni. Details about our team members and their roles will be available here shortly.
//           </p>
//           <div className="flex justify-center flex-wrap gap-6 mt-6">
//             {/* Placeholder for team member cards */}
//             <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">Photo</div>
//             <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">Photo</div>
//             <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs">Photo</div>
//           </div>
//         </section>

//         <div className="mt-8 text-center">
//           <p className="text-lg text-gray-700 mb-4">Ready to connect or have questions?</p>
//           <Link href="/register" className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-800 hover:scale-105 transition-all duration-300 ease-in-out transform mr-4">
//             Join Our Community
//           </Link>
//           <Link href="/contact" className="inline-block bg-white text-blue-700 font-semibold py-3 px-8 rounded-full shadow-lg border border-blue-700 hover:bg-blue-50 hover:scale-105 transition-all duration-300 ease-in-out transform">
//             Contact Us
//           </Link>
//         </div>

//         <div className="mt-12 text-center">
//           <Link href="/" className="font-medium text-blue-600 hover:text-blue-500">
//             &larr; Back to Home
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion'; 


// --- Timeline Data ---
const historyTimeline = [
  { year: 2005, title: 'Founding Year', detail: 'AlumniConnect was officially established with a focus on career mentorship.' },
  { year: 2010, title: 'First Scholarship Fund', detail: 'Launched the inaugural Annual Scholarship Fund, raising $500K in the first year.' },
  { year: 2015, title: 'Global Expansion', detail: 'Opened international chapters and hosted our first European alumni reunion event.' },
  { year: 2022, title: 'Digital Transformation', detail: 'Launched the new AlumniConnect platform (this website!) featuring the Jobs Board and Chat Box.' },
  { year: 2024, title: 'Startup Hub Launch', detail: 'Created the Start Up Hub to connect entrepreneurs with seed funding and experienced mentors.' },
];

// --- Timeline Component ---
const Timeline = ({ timelineData }) => (
  <div className="relative border-l border-gray-200 ml-4 md:ml-6">
    {timelineData.map((item, index) => (
      <div key={index} className="mb-8 ml-6">
        <span className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -left-3 ring-8 ring-white">
          <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
        </span>
        <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900">{item.title}</h3>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-400">{item.year}</time>
        <p className="text-base font-normal text-gray-600">{item.detail}</p>
      </div>
    ))}
  </div>
);


// --- Main About Us Component ---
export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-5xl w-full bg-white rounded-xl shadow-2xl p-8 space-y-8 transform transition-all duration-300">
        
        <h1 className="text-5xl font-extrabold text-gray-900 text-center mb-4 border-b pb-4">
          About AlumniConnect 🏛️
        </h1>

        <p className="text-center text-xl text-gray-700 mb-8">
          AlumniConnect is dedicated to fostering a vibrant and supportive community among our esteemed graduates. We believe in the power of connection, shared experiences, and collective growth.
        </p>

        {/* --- Mission & Vision Grid --- */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Mission Section */}
          <section className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
              <svg className="w-7 h-7 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-1.25-3M15 10V5a3 3 0 00-3-3V1a1 1 0 00-1-1H7a1 1 0 00-1 1v1a3 3 0 00-3 3v5m-1 0h16a2 2 0 012 2v2a2 2 0 01-2 2H2a2 2 0 01-2-2v-2a2 2 0 012-2z"></path></svg>
              Our Mission
            </h2>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to create a lifelong bond between our alumni and the institution, providing a platform for networking, professional development, and meaningful engagement. We strive to empower our graduates to achieve their full potential and contribute positively to society.
            </p>
          </section>

          {/* Vision Section (FIXED THE PARSING ERROR HERE) */}
          <section className="bg-green-50 p-6 rounded-lg shadow-md border border-green-200">
            <h2 className="text-2xl font-bold text-green-800 mb-4 flex items-center">
              <svg className="w-7 h-7 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              Our Vision
            </h2>
            <p className="text-gray-700 leading-relaxed">
              To be the leading global alumni network, recognized for fostering innovation, leadership, and social responsibility, and for consistently enriching the lives of our alumni and the wider community.
            </p>
          </section>
        </div>

        {/* --- History Timeline Section (Enhanced) --- */}
        <section className="bg-indigo-50 p-8 rounded-xl shadow-inner">
          <h2 className="text-3xl font-bold text-indigo-800 mb-8 text-center">
            Our History & Milestones
          </h2>
          <Timeline timelineData={historyTimeline} />
        </section>

        {/* Values Section */}
        <section className="bg-yellow-50 p-6 rounded-lg shadow-md border border-yellow-200">
          <h2 className="text-2xl font-bold text-yellow-800 mb-4 flex items-center">
            <svg className="w-7 h-7 mr-3 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
            Our Values
          </h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
            <li><span className="font-semibold text-gray-800">Community:</span> Building strong, supportive relationships.</li>
            <li><span className="font-semibold text-gray-800">Excellence:</span> Striving for the highest standards in all endeavors.</li>
            <li><span className="font-semibold text-gray-800">Innovation:</span> Embracing new ideas and creative solutions.</li>
            <li><span className="font-semibold text-gray-800">Integrity:</span> Operating with honesty, transparency, and respect.</li>
            <li><span className="font-semibold text-gray-800">Impact:</span> Making a positive difference in the world.</li>
          </ul>
        </section>

        {/* Our Team Section */}
        <section className="p-6 rounded-lg">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Meet Our Leadership</h2>
          <div className="flex justify-center flex-wrap gap-10">
            {/* Team Member Card Placeholder Structure */}
            {['Jane Doe', 'John Smith', 'Dr. Alice Chen'].map((name, index) => (
                <div key={index} className="flex flex-col items-center w-40 text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm shadow-lg border-4 border-white">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                    </div>
                    <p className="font-semibold text-gray-900 mt-3">{name}</p>
                    <p className="text-sm text-blue-600">
                        {index === 0 ? 'President' : index === 1 ? 'Vice President' : 'Treasurer'}
                    </p>
                </div>
            ))}
          </div>
          <div className="mt-6 text-center">
             <Link href="/team" className="font-medium text-blue-600 hover:text-blue-500 hover:underline">
               View All Board Members &rarr;
             </Link>
          </div>
        </section>


        {/* --- Call to Action --- */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-lg text-gray-700 mb-4">Ready to connect or have questions?</p>
          <div className="flex justify-center flex-wrap gap-4">
            <Link href="/register" className="inline-block bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:from-blue-700 hover:to-indigo-800 hover:scale-[1.02] transition-all duration-300 ease-in-out transform">
              Join Our Community
            </Link>
            <Link href="/contact" className="inline-block bg-white text-blue-700 font-semibold py-3 px-8 rounded-full shadow-lg border-2 border-blue-700 hover:bg-blue-50 hover:scale-[1.02] transition-all duration-300 ease-in-out transform">
              Contact Us
            </Link>
          </div>
        </div>
        {/* <motion.div
        // Framer Motion animation for entrance
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="mt-24 p-8 md:p-16 bg-[#002e50] rounded-2xl shadow-2xl overflow-hidden relative">
       
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

        {/* <div className="relative text-center max-w-4xl mx-auto">
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
                {/* Using standard <a> tag for the submit button */}
                {/* <a href="#" className="flex items-center justify-center bg-rose-500 text-white font-semibold py-3 px-8 rounded-full shadow-xl hover:bg-rose-400 transition-colors duration-200 transform hover:scale-105">
                    Subscribe Now
                </a>
            </div>
        </div> */}
    {/* </motion.div> */}
      </div>
    </div>
  );
}

