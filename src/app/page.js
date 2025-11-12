// // // src/app/page.js
// // // This is the corrected path

// // export default function HomePage() {
// //   return (
// //     <div className="min-h-screen bg-gray-100 font-sans antialiased">
// //    {/* Render the NavBar component here */}
// //       <main className="container p-6 md:p-8">
// //         <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Alumni Network!</h1>
// //         <p className="text-lg text-gray-600">
// //           This is the main content of your home page.
// //         </p>
// //         {/* Add more home page specific content here */}
// //       </main>
// //     </div>
// //   );
// // }


// // app/page.js

// // import Link from 'next/link';

// // // --- Configuration Data ---
// // // Define the data for all your primary feature pages
// // const features = [
// //   { title: 'Dashboard', icon: '📊', description: 'Your personalized alumni portal.', link: '/dashboard' },
// //   { title: 'Events', icon: '📅', description: 'Upcoming reunions, webinars, and meetups.', link: '/events' },
// //   { title: 'Jobs Board', icon: '💼', description: 'Find or post career opportunities.', link: '/jobs' },
// //   { title: 'Donation', icon: '❤️', description: 'Securely support scholarships and programs.', link: '/donation' },
// //   { title: 'Scholarship', icon: '🎓', description: 'Apply for or view available grants.', link: '/scholarship' },
// //   { title: 'Start Up Hub', icon: '💡', description: 'Connect entrepreneurs with mentors and resources.', link: '/start-up' },
// //   { title: 'Blog & News', icon: '📰', description: 'Latest updates and inspiring stories.', link: '/blog' },
// //   { title: 'Games & Quiz', icon: '🕹️', description: 'Fun ways to connect and compete.', link: '/games-quiz' },
// //   { title: 'Chat Box', icon: '💬', description: 'Real-time conversation with other alumni.', link: '/chat-box' },
// // ];


// // // --- Sub-Components (Nested) ---

// // const HeroSection = ({ title, subtitle, ctaText, ctaLink }) => (
// //   <section className="hero-section text-white bg-blue-800 py-24 text-center" 
// //            style={{ backgroundImage: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("/images/alumni-hero-bg.jpg")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
// //     <div className="container mx-auto px-4">
// //       <h1 className="text-5xl md:text-6xl font-extrabold mb-4">{title}</h1>
// //       <p className="text-xl md:text-2xl mb-10 opacity-90">{subtitle}</p>
// //       <Link href={ctaLink} passHref>
// //         <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-10 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
// //           {ctaText}
// //         </button>
// //       </Link>
// //     </div>
// //   </section>
// // );

// // const FeatureGrid = () => (
// //   <section className="feature-grid py-16 bg-white">
// //     <div className="container mx-auto px-4">
// //       <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
// //         Explore Our Alumni Features
// //       </h2>
      
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 mx-20">
// //         {features.map((feature) => (
// //           <Link key={feature.link} href={feature.link} passHref>
// //             <div className="bg-gray-50 hover:bg-blue-50 border border-gray-200 p-6 rounded-xl shadow-md transition duration-300 transform hover:-translate-y-1 cursor-pointer">
// //               <p className="text-4xl mb-3">{feature.icon}</p>
// //               <h3 className="text-xl font-semibold mb-2 text-blue-700">{feature.title}</h3>
// //               <p className="text-sm text-gray-600">{feature.description}</p>
// //             </div>
// //           </Link>
// //         ))}
// //       </div>
// //     </div>
// //   </section>
// // );

// // const DonationCallout = ({ message, link }) => (
// //   <section className="donation-callout py-16 bg-yellow-100 text-center border-t border-b border-yellow-200">
// //     <h2 className="text-3xl font-bold text-yellow-800 mb-4">Support the Network 🤝</h2>
// //     <p className="text-lg mb-6 max-w-2xl text-amber-600 mx-auto">{message}</p>
// //     <Link href={link} passHref>
// //       <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-105">
// //         Make a Donation
// //       </button>
// //     </Link>
// //     <p className="mt-4 text-sm text-yellow-700">
// //         **Relevant:** Your contribution is handled by the secure backend system we've previously discussed.
// //     </p>
// //   </section>
// // );


// // // --- Main Home Component ---

// // /**
// //  * The single Next.js Home Page component for the alumni website.
// //  */
// // export default function HomePage() {
// //   return (
// //     <main>
// //       {/* 1. Hero Section */}
// //       <HeroSection 
// //         title="Alumni Network: Reconnect, Grow, Achieve."
// //         subtitle="Explore everything the network has to offer, from career development to social events."
// //         ctaText="Go to Dashboard"
// //         ctaLink="/dashboard"
// //       />

// //       {/* 2. Feature Grid - Central Navigation for all key pages */}
// //       <FeatureGrid />

// //       {/* 3. Donation Call-to-Action */}
// //       <DonationCallout 
// //         message="Your contribution directly supports scholarships, start-up grants, and community development initiatives."
// //         link="/donation"
// //       />

// //       {/* 4. Events Preview / Teaser (Simplified) */}
// //       <section className="py-16 bg-gray-50 text-center">
// //         <h2 className="text-4xl font-bold mb-4 text-gray-800">Upcoming Events</h2>
// //         <p className="text-lg mb-6 text-gray-600">
// //           Don't miss the next Annual Gala or the monthly Tech Talk webinar.
// //         </p>
// //         <Link href="/events" passHref>
// //             <button className="text-blue-600 hover:text-blue-800 font-semibold py-2 px-4 rounded transition duration-300">
// //                 View All Events →
// //             </button>
// //         </Link>
// //       </section>

// //       {/* 5. About Us/Mission Statement */}
// //       <section className="py-12 text-center bg-white border-t border-gray-100">
// //         <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
// //         <p className="max-w-3xl mx-auto px-4 text-gray-600">
// //           Building a strong, lifelong relationship between the university and its alumni to foster professional growth, mentorship, and global community support.
// //         </p>
// //         <Link href="/about-us" passHref>
// //              <button className="text-sm mt-3 text-blue-500 hover:underline">Read Our Full Story</button>
// //         </Link>
// //       </section>
// //     </main>
// //   );
// // }

//  'use client'; 

//  import React from 'react';
//  import Link from 'next/link';
//  import { motion } from 'framer-motion';
//  import {
//      UsersIcon,
//      ChartBarIcon,
//      CalendarIcon,
//      BriefcaseIcon,
//      HeartIcon,
//      AcademicCapIcon,
//      LightBulbIcon,
//      NewspaperIcon,
//      PuzzlePieceIcon,
//      ChatBubbleLeftRightIcon,
//      EyeIcon,
//      ArrowRightIcon,
//      ClockIcon,
//      MapPinIcon,
//  } from '@heroicons/react/24/outline';

//  // =================================================================
//  // --- Configuration Data (Alumni Network Theme) ---
//  // Note: Colors updated to align with the EventsPage Sky/Rose theme.
//  // =================================================================

//  // Theme Colors
//  const PRIMARY_COLOR = "sky"; // sky-700 for dark text/buttons, sky-500 for accents
//  const SECONDARY_COLOR = "rose"; // rose-600 for high-impact/donation calls

//  const featureIconMap = {
//      'Alumni Directory': UsersIcon,
//      'Dashboard': ChartBarIcon,
//      'Events': CalendarIcon,
//     'Jobs Board': BriefcaseIcon,
//     'Donation': HeartIcon,
//     'Scholarship': AcademicCapIcon,
//     'Start Up Hub': LightBulbIcon,
//     'Blog': NewspaperIcon,
//     'News': NewspaperIcon,
//     'Games & Quiz': PuzzlePieceIcon,
//     'Chat Box': ChatBubbleLeftRightIcon,
// };

// const features = [
//     { title: 'Alumni Directory', description: 'Search and connect with over 10,000 global alumni.', link: '/directory' },
//     { title: 'Dashboard', description: 'Your personalized alumni portal.', link: '/dashboard' },
//     { title: 'Events', description: 'Upcoming reunions, webinars, and meetups.', link: '/events' },
//     { title: 'Jobs Board', description: 'Find or post career opportunities.', link: '/jobs' },
//     { title: 'Donation', description: 'Securely support scholarships and programs.', link: '/donation', highlight: true },
//     { title: 'Scholarship', description: 'Apply for or view available grants.', link: '/scholarship' },
//     { title: 'Start Up Hub', description: 'Connect entrepreneurs with mentors and resources.', link: '/start-up' },
//     { title: 'Blog', description: 'Latest updates and inspiring stories.', link: '/blog' },
//     { title: 'News', description: 'Latest community achievements, campus highlights, and event info.', link: '/NewsPage' },
//     { title: 'Games & Quiz', description: 'Fun ways to connect and compete.', link: '/games-quiz' },
//     { title: 'Chat Box', description: 'Real-time conversation with other alumni.', link: '/chat-box' },
// ];

// const historyTimeline = [
//     { year: 2005, title: 'Founding Year', detail: 'AlumniConnect was officially established with a focus on career mentorship.' },
//     { year: 2010, title: 'First Scholarship Fund', detail: 'Launched the inaugural Annual Scholarship Fund, raising $500K in the first year.' },
//     { year: 2015, title: 'Global Expansion', detail: 'Opened international chapters and hosted our first European alumni reunion event.' },
//     { year: 2022, title: 'Digital Transformation', detail: 'Launched the new AlumniConnect platform (this website!) featuring the Jobs Board and Chat Box.' },
//     { year: 2024, title: 'Startup Hub Launch', detail: 'Created the Start Up Hub to connect entrepreneurs with seed funding and experienced mentors.' },
// ];

// // Stats colors updated to align with new theme
// const impactStats = [
//     { value: "₹5M+", label: "Raised Annually", color: `text-${PRIMARY_COLOR}-700`, icon: AcademicCapIcon },
//     { value: "450+", label: "Students Supported", color: `text-${SECONDARY_COLOR}-700`, icon: UsersIcon }, 
//     { value: "10K", label: "Volunteer Hours", color: "text-slate-600", icon: ClockIcon }, 
// ];

// // --- Animation Variants ---
// const sectionVariants = {
//     hidden: { opacity: 0, y: 40 },
//     visible: {
//         opacity: 1,
//         y: 0,
//         transition: {
//             duration: 0.8,
//             ease: [0.25, 0.46, 0.45, 0.94],
//             staggerChildren: 0.08,
//             when: "beforeChildren"
//         }
//     }
// };

// const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
// };


// // =================================================================
// // --- Sub-Components ---
// // =================================================================

// const HeroSection = ({ title, subtitle, ctaText, ctaLink }) => (
//     <section 
//         className="hero-section text-white py-48 lg:py-64 text-center relative overflow-hidden bg-neutral-900" 
//         style={{ 
//             backgroundImage: 'url("/images/alumni-hero-bg.jpg")', // Assuming this image exists
//             backgroundSize: 'cover', 
//             backgroundPosition: 'center',
//             clipPath: 'polygon(0 0, 100% 0, 100% 95%, 0 100%)' 
//         }}
//     >
//         {/* Dark overlay for authority - slightly lighter and using primary color tint */}
//         <div className={`absolute inset-0 bg-neutral-900 opacity-70`}></div>
//         {/* Subtle accent gradient */}
//         <div className={`absolute inset-0 bg-gradient-to-tr from-${PRIMARY_COLOR}-900/10 to-slate-900/10`}></div>

//         <div className="container mx-auto px-4 relative z-10 max-w-7xl">
//             <motion.h1 
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.9 }}
//                 className="text-6xl md:text-7xl font-extrabold mb-6 font-serif leading-tight tracking-tighter drop-shadow-lg"
//             >
//                 {title}
//             </motion.h1>
//             <motion.p
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.9, delay: 0.2 }}
//                 className="text-xl md:text-2xl mb-16 max-w-4xl mx-auto opacity-90 font-light"
//             >
//                 {subtitle}
//             </motion.p>
//             <motion.div
//                 initial={{ opacity: 0, scale: 0.8 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//             >
//                 <Link href={ctaLink} passHref>
//                     {/* Primary Button: Vibrant Sky Blue */}
//                     <button className={`bg-${PRIMARY_COLOR}-600 hover:bg-${PRIMARY_COLOR}-700 text-white font-bold py-4 px-12 rounded-full shadow-2xl transition duration-300 transform hover:scale-105 text-lg uppercase tracking-wider focus:ring-4 focus:ring-${PRIMARY_COLOR}-400 focus:ring-offset-4 focus:ring-offset-neutral-900`}>
//                         {ctaText}
//                     </button>
//                 </Link>
//             </motion.div>
//         </div>
//     </section>
// );

// const DonationCallout = ({ message, link }) => (
//     <section className="donation-callout -mt-10 py-20 relative z-20"> 
//         <div className="max-w-6xl mx-auto px-4 text-center">
//             <motion.div
//                 variants={sectionVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.5 }}
//                 // LIGHT Subtle Gradient for a 'premium brochure' feel, now with Rose accent
//                 className={`p-10 md:p-16 rounded-[2.5rem] shadow-3xl bg-gradient-to-br from-white to-${SECONDARY_COLOR}-50 text-neutral-900 transform hover:scale-[1.005] transition-transform duration-500 border border-${SECONDARY_COLOR}-200`}
//             >
//                 <h2 className={`text-4xl lg:text-5xl font-extrabold mb-4 font-serif text-${SECONDARY_COLOR}-800`}>Make a Difference Today</h2>
//                 <p className="text-xl mb-10 opacity-90 max-w-4xl mx-auto font-light text-slate-700">
//                     {message}
//                 </p>
//                 <Link href={link} passHref>
//                     <motion.button
//                         variants={itemVariants}
//                         // Button Style: White text on Rose Red (Secondary/Impact Color)
//                         className={`bg-${SECONDARY_COLOR}-600 text-white font-bold py-4 px-12 rounded-full shadow-2xl transition duration-300 transform hover:scale-105 hover:bg-${SECONDARY_COLOR}-700 text-lg uppercase tracking-wide focus:ring-4 focus:ring-${SECONDARY_COLOR}-500 focus:ring-offset-4 focus:ring-offset-${SECONDARY_COLOR}-50`}
//                     >
//                         <HeartIcon className="w-5 h-5 mr-2 inline-block" /> Donate Securely
//                     </motion.button>
//                 </Link>
//                 <p className="mt-6 text-sm text-slate-500 tracking-wide">
//                     100% of your gift goes directly to funded programs.
//                 </p>
//             </motion.div>
//         </div>
//     </section>
// );

// const FeatureGrid = () => (
//     <motion.section 
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.1 }}
//         className="feature-grid pt-24 pb-32 bg-white"
//     >
//         <div className="container mx-auto px-4 max-w-7xl">
//             <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-20 text-gray-800 font-serif">
//                 Explore The Alumni Hub
//             </motion.h2>
            
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//                 {features.map((feature) => {
//                     const IconComponent = featureIconMap[feature.title];
//                     const isDonation = feature.link === '/donation';
                    
//                     // Determine colors based on accent type
//                     const iconColor = isDonation ? `${SECONDARY_COLOR}-800` : `${PRIMARY_COLOR}-700`;
//                     const bgColor = isDonation ? `${SECONDARY_COLOR}-50` : 'white';
//                     const hoverBg = isDonation ? `${SECONDARY_COLOR}-100` : 'neutral-50';
//                     const borderColor = isDonation ? `${SECONDARY_COLOR}-200` : 'neutral-100';
//                     const textColor = isDonation ? `${SECONDARY_COLOR}-900` : 'gray-900';
//                     const descColor = isDonation ? `${SECONDARY_COLOR}-800` : 'gray-600';
                    
//                     return (
//                         <motion.div variants={itemVariants} key={feature.link}>
//                             <Link href={feature.link} passHref>
//                                 <motion.div 
//                                     whileHover={{ scale: 1.03, boxShadow: "0 18px 35px -5px rgba(0, 0, 0, 0.08)" }}
//                                     className={`
//                                         p-8 rounded-3xl shadow-xl transition duration-300 cursor-pointer h-full border 
//                                         bg-${bgColor} hover:bg-${hoverBg} border-${borderColor}
//                                     `}
//                                 >
//                                     <IconComponent 
//                                         className={`w-10 h-10 mb-4 text-${iconColor}`} 
//                                     />
//                                     <h3 className={`text-xl font-bold mb-2 text-${textColor} font-sans`}>{feature.title}</h3>
//                                     <p className={`text-base text-${descColor}`}>
//                                         {feature.description}
//                                     </p>
//                                     {isDonation && (
//                                         <span className={`mt-3 inline-block text-xs font-bold bg-${SECONDARY_COLOR}-600 text-white px-3 py-1 rounded-full shadow-md uppercase tracking-wider`}>
//                                             High Impact
//                                         </span>
//                                     )}
//                                 </motion.div>
//                             </Link>
//                         </motion.div>
//                     );
//                 })}
//             </div>
//         </div>
//     </motion.section>
// );

// const ImpactPreviewSection = () => (
//     <motion.section 
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.3 }}
//         className="impact-preview py-32 bg-neutral-50 border-t border-b border-neutral-100"
//     >
//         <div className="container mx-auto px-4 text-center max-w-7xl">
//             <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-800 mb-4 font-serif">
//                 Measuring Your Contribution
//             </motion.h2>
//             <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-20 max-w-4xl mx-auto">
//                 Every contribution fuels real, measurable progress in student lives and community projects.
//             </motion.p>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
//                 {impactStats.map((stat, index) => {
//                     const IconComponent = stat.icon;
//                     return (
//                         <motion.div
//                             key={index}
//                             variants={itemVariants}
//                             // Clean white blocks with sharp shadows
//                             className="p-12 bg-white rounded-3xl shadow-xl border border-neutral-200 text-center space-y-4 transition-all duration-300 hover:shadow-2xl transform hover:scale-[1.01]"
//                         >
//                             <IconComponent className={`w-14 h-14 mx-auto ${stat.color}`} />
//                             <p className={`text-7xl font-extrabold ${stat.color} leading-none tracking-tight`}>
//                                 {stat.value}
//                             </p>
//                             <p className="text-xl font-medium text-neutral-700 font-sans mt-2 uppercase tracking-wider">{stat.label}</p>
//                         </motion.div>
//                     );
//                 })}
//             </div>
//             <Link href="/impact" passHref>
//                 <motion.button variants={itemVariants} className={`mt-20 inline-flex items-center text-lg font-semibold text-${PRIMARY_COLOR}-700 hover:text-${PRIMARY_COLOR}-800 transition-colors border-b-2 border-${PRIMARY_COLOR}-700 pb-1`}>
//                     View Full Impact Report <ArrowRightIcon className="w-5 h-5 ml-2" />
//                 </motion.button>
//             </Link>
//         </div>
//     </motion.section>
// );

// const MissionVision = () => (
//     <motion.section 
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.1 }}
//         className="mission-vision-grid pt-32 pb-32 bg-white"
//     >
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-20 text-gray-800 font-serif">Our Core Values</motion.h2>
//             <div className="grid md:grid-cols-2 gap-12">
//                 <motion.div variants={itemVariants} className="bg-neutral-50 p-10 rounded-3xl shadow-lg border border-neutral-100 hover:shadow-xl transition-shadow duration-300">
//                     <h3 className="text-2xl font-bold text-neutral-800 mb-4 flex items-center font-serif">
//                         <MapPinIcon className={`w-8 h-8 mr-3 text-${PRIMARY_COLOR}-600`} />
//                         Our Mission
//                     </h3>
//                     <p className="text-gray-700 leading-relaxed text-lg">
//                         Our mission is to create a lifelong bond between our alumni and the institution, providing a platform for networking, professional development, and meaningful engagement. We strive to empower our graduates to achieve their full potential and contribute positively to society.
//                     </p>
//                 </motion.div>

//                 <motion.div variants={itemVariants} className="bg-neutral-50 p-10 rounded-3xl shadow-lg border border-neutral-100 hover:shadow-xl transition-shadow duration-300">
//                     <h3 className="text-2xl font-bold text-neutral-800 mb-4 flex items-center font-serif">
//                         <EyeIcon className={`w-8 h-8 mr-3 text-${SECONDARY_COLOR}-600`} />
//                         Our Vision
//                     </h3>
//                     <p className="text-gray-700 leading-relaxed text-lg">
//                         To be the leading global alumni network, recognized for fostering innovation, leadership, and social responsibility, and for consistently enriching the lives of our alumni and the wider community.
//                     </p>
//                 </motion.div>
//             </div>
//         </div>
//     </motion.section>
// );

// const HistorySection = () => (
//     <motion.section 
//         variants={sectionVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, amount: 0.1 }}
//         className="history-section py-32 bg-gray-50 border-t border-neutral-200"
//     >
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
//             <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-20 text-gray-800 font-serif">
//                 Our History & Milestones
//             </motion.h2>
//             <div className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100">
//                 <Timeline timelineData={historyTimeline} />
//             </div>
//         </div>
//     </motion.section>
// );

// const Timeline = ({ timelineData }) => (
//     <div className={`relative border-l-4 border-${PRIMARY_COLOR}-200 ml-4 md:ml-6`}>
//         {historyTimeline.map((item, index) => (
//             <motion.div key={index} variants={itemVariants} className="mb-12 ml-8">
//                 <span className={`absolute flex items-center justify-center w-8 h-8 bg-${PRIMARY_COLOR}-600 rounded-full -left-4 ring-8 ring-white shadow-md`}>
//                     <ClockIcon className="w-4 h-4 text-white" />
//                 </span>
//                 <h3 className="mb-1 text-xl font-semibold text-gray-900 font-serif">{item.title}</h3>
//                 <time className={`block mb-2 text-base font-medium leading-none text-${PRIMARY_COLOR}-500`}>{item.year}</time>
//                 <p className="text-base font-normal text-gray-700">{item.detail}</p>
//             </motion.div>
//         ))}
//     </div>
// );

// const NewsletterSubscription = () => {
//     return (
//         <motion.section 
//             variants={sectionVariants}
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, amount: 0.2 }}
//             className="newsletter-cta pt-20 pb-40 bg-white"
//         >
//             <div className="max-w-7xl mx-auto px-4">
//                 <motion.div
//                 variants={itemVariants}
//                 // Subtle Dark Background: Deep Sky/Slate for contrast on footer-like section
//                 className={`p-10 md:p-20 bg-red-100 rounded-3xl shadow-2xl overflow-hidden relative`}
//                 >
                
//                 <div className="absolute inset-0 opacity-10 pointer-events-none">
//                     <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
//                         <defs>
//                             <pattern id="dot-pattern-sky" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
//                                 <circle cx="2" cy="2" r="1.5" fill="white" />
//                             </pattern>
//                         </defs>
//                         <rect width="100%" height="100%" fill="url(#dot-pattern-sky)" />
//                     </svg>
//                 </div>

//                 <div className="relative text-center max-w-4xl mx-auto">
//                     <h3 className="text-4xl md:text-5xl font-extrabold text-blue-950 mb-4 tracking-tight leading-tight font-serif">
//                         Insights Delivered
//                     </h3>
//                     <p className="text-xl text-sky-500 mb-10 font-light">
//                         Get the latest articles, exclusive alumni interviews, and career tips sent straight to your inbox every week.
//                     </p>
//                     <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                         <input
//                             type="email"
//                             placeholder="Your professional email address"
//                             // Focus ring uses the Primary Color for consistency
//                             className={`w-full sm:w-80 p-4 rounded-full text-neutral-800 border-2 border-transparent focus:ring-4 focus:ring-${PRIMARY_COLOR}-400/50 shadow-lg transition-all duration-300 bg-white`}
//                         />
//                         <a href="#" className={`flex items-center justify-center bg-${SECONDARY_COLOR}-600 text-white font-semibold py-4 px-8 rounded-full shadow-xl hover:bg-${SECONDARY_COLOR}-700 transition-colors duration-200 transform hover:scale-105 text-lg`}>
//                             Subscribe Now
//                         </a>
//                     </div>
//                 </div>
//                 </motion.div>
//             </div>
//         </motion.section>
//     );
// };


// // =================================================================
// // --- Main Home Component ---
// // =================================================================

// export default function HomePage() {
//     return (
//         <main className="min-h-screen bg-white antialiased">
//             {/* 1. Hero Section */}
//             <HeroSection 
//                 title="Alumni Network: Reconnect, Grow, Achieve."
//                 subtitle="Explore everything the network has to offer, from career development to social events."
//                 ctaText="Go to Dashboard"
//                 ctaLink="/dashboard"
//             />
            
//             {/* 2. Donation Call-to-Action (Now Rose/Secondary Accent) */}
//             <DonationCallout 
//                 message="Your contribution directly supports scholarships, start-up grants, and community development initiatives, shaping the future of our institution."
//                 link="/donation"
//             />
            
//             {/* 3. Feature Grid */}
//             <FeatureGrid />

//             {/* 4. Impact Preview Section (Light Gray BG) */}
//             <ImpactPreviewSection />

//             {/* 5. Mission & Vision (Light Gray Cards) */}
//             <MissionVision />

//             {/* 6. History Timeline (Light Gray BG) */}
//             <HistorySection />

//             {/* 7. Events Preview / Teaser */}
//             <motion.section 
//                 variants={sectionVariants}
//                 initial="hidden"
//                 whileInView="visible"
//                 viewport={{ once: true, amount: 0.1 }}
//                 className="py-24 bg-white text-center border-t border-neutral-100"
//             >
//                 <motion.h2 variants={itemVariants} className="text-4xl font-bold mb-4 text-gray-800 font-serif">Upcoming Events</motion.h2>
//                 <motion.p variants={itemVariants} className="text-lg mb-8 text-gray-600 max-w-2xl mx-auto">
//                     Stay connected! Don't miss the next Annual Gala, chapter meetups, or the monthly Tech Talk webinar.
//                 </motion.p>
//                 <Link href="/events" passHref>
//                     <motion.button 
//                         variants={itemVariants}
//                         // Button uses Primary Color for coherence with the Events link
//                         className={`inline-flex items-center text-lg font-semibold text-${PRIMARY_COLOR}-700 hover:text-${PRIMARY_COLOR}-800 py-3 px-8 rounded-full border-2 border-${PRIMARY_COLOR}-700 hover:bg-${PRIMARY_COLOR}-50 transition duration-300 shadow-md`}
//                     >
//                         View All Events <ArrowRightIcon className="w-5 h-5 ml-2" />
//                     </motion.button>
//                 </Link>
//             </motion.section>

//             {/* 8. Newsletter Subscription (Dark block for visual break) */}
//             <NewsletterSubscription />
            
//         </main>
//     );
// }


// // app/page.js

// // app/page.js
// // Note: This code assumes Tailwind CSS is configured for styling.




'use client'; 

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    UsersIcon,
    ChartBarIcon,
    CalendarIcon,
    BriefcaseIcon,
    HeartIcon,
    AcademicCapIcon,
    LightBulbIcon,
    NewspaperIcon,
    PuzzlePieceIcon,
    ChatBubbleLeftRightIcon,
    EyeIcon,
    ArrowRightIcon,
    ClockIcon,
    MapPinIcon,
    BookOpenIcon,
    UserIcon,
    ArrowTrendingUpIcon,
    SparklesIcon,
    MapIcon,
    PencilSquareIcon
} from '@heroicons/react/24/outline';

// =================================================================
// --- Configuration Data (Alumni Network Theme) ---
// =================================================================

// Theme Colors
const PRIMARY_COLOR = "sky"; // sky-700 for dark text/buttons, sky-500 for accents
const SECONDARY_COLOR = "rose"; // rose-600 for high-impact/donation calls

const featureIconMap = {
    'Alumni Directory': UsersIcon,
    'Dashboard': ChartBarIcon,
    'Events': CalendarIcon,
    'Jobs Board': BriefcaseIcon,
    'Donation': HeartIcon,
    'Scholarship': AcademicCapIcon,
    'Start Up Hub': LightBulbIcon,
    'Blog': PencilSquareIcon,
    'News': NewspaperIcon,
    'Games & Quiz': PuzzlePieceIcon,
    'Chat Box': ChatBubbleLeftRightIcon,
};

const features = [
    { title: 'Alumni Directory', description: 'Search and connect with over 10,000 global alumni.', link: '/directory' },
    { title: 'Dashboard', description: 'Your personalized alumni portal.', link: '/dashboard' },
    { title: 'Events', description: 'Upcoming reunions, webinars, and meetups.', link: '/events' },
    { title: 'Jobs Board', description: 'Find or post career opportunities.', link: '/jobs' },
    { title: 'Donation', description: 'Securely support scholarships and programs.', link: '/donation', highlight: true },
    { title: 'Scholarship', description: 'Apply for or view available grants.', link: '/scholarship' },
    { title: 'Start Up Hub', description: 'Connect entrepreneurs with mentors and resources.', link: '/start-up' },
    { title: 'Blog', description: 'Latest updates and inspiring stories.', link: '/blog' },
    { title: 'News', description: 'Latest community achievements, campus highlights, and event info.', link: '/NewsPage' },
    // ⭐ Games & Quiz feature confirmed and maintained based on your component.
    { title: 'Games & Quiz', description: 'Challenge yourself and compete for the Cognitive Challenge Arena leaderboard.', link: '/games-quiz' },
    { title: 'Chat Box', description: 'Real-time conversation with other alumni.', link: '/chat-box' },
];

const historyTimeline = [
    { year: 2005, title: 'Founding Year', detail: 'AlumniConnect was officially established with a focus on career mentorship.' },
    { year: 2010, title: 'First Scholarship Fund', detail: 'Launched the inaugural Annual Scholarship Fund, raising $500K in the first year.' },
    { year: 2015, title: 'Global Expansion', detail: 'Opened international chapters and hosted our first European alumni reunion event.' },
    { year: 2022, title: 'Digital Transformation', detail: 'Launched the new AlumniConnect platform (this website!) featuring the Jobs Board and Chat Box.' },
    { year: 2024, title: 'Startup Hub Launch', detail: 'Created the Start Up Hub to connect entrepreneurs with seed funding and experienced mentors.' },
];

const impactStats = [
    { value: "₹5M+", label: "Raised Annually", color: `text-${PRIMARY_COLOR}-800`, icon: AcademicCapIcon },
    { value: "450+", label: "Students Supported", color: `text-${SECONDARY_COLOR}-800`, icon: UsersIcon }, 
    { value: "10K", label: "Volunteer Hours", color: "text-slate-600", icon: ClockIcon }, 
];

// --- Mock Data for Blog Preview ---
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
        title: 'Funding Your Dream: A Guide to the Startup Hub',
        category: 'Startups',
        date: 'June 25, 2024',
        author: 'Innovation Desk',
        snippet: 'Everything you need to know to leverage the AlumniConnect Start Up Hub, from application tips to securing your first round of seed funding.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsSRv00HK7qGahD5-AL3lon4-rFAJ80-Qizw&s',
        link: '/blog/startup-hub-guide'
    },
];

// --- Mock Data from Dashboard Component (Reflecting Directory Data) ---
const userStats = {
    totalAlumni: 12500, 
    activeUsersLastMonth: 3500, 
    newMembersThisQuarter: 150, 
};

const totalJobPostings = 5; // Example value

// Events list 
const upcomingEvents = [
    { id: 'event1', name: 'Annual Alumni Gala', date: 'Nov 20, 2025', location: 'Grand Ballroom' },
    { id: 'event2', name: 'Career Networking Workshop', date: 'Dec 15, 2025', location: 'Online' },
    { id: 'event3', name: 'University Sports Day', date: 'Jan 05, 2026', location: 'Campus Stadium' },
    { id: 'event4', name: 'Annual Alumni Gala (Next Year)', date: 'Jan 20, 2026', location: 'Grand Ballroom' },
    { id: 'event5', name: 'Career Networking Workshop (Next Year)', date: 'Feb 15, 2026', location: 'Online' },
];


// --- Animation Variants ---
const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            staggerChildren: 0.08,
            when: "beforeChildren"
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } }
};


// =================================================================
// --- DASHBOARD PREVIEW COMPONENTS ---
// =================================================================

const StatCard = ({ label, value, icon: Icon, color, link }) => (
    <Link href={link} passHref>
        <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.1)" }}
            className={`p-6 rounded-2xl shadow-lg border border-neutral-100 bg-white hover:bg-neutral-50 transition-all duration-300 cursor-pointer`}
        >
            <div className="flex items-center space-x-4">
                <Icon className={`w-8 h-8 ${color}`} />
                <div>
                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{label}</p>
                    <p className={`text-3xl font-bold ${color}`}>{value}</p>
                </div>
            </div>
        </motion.div>
    </Link>
);

const EventCard = ({ event }) => (
    <motion.div variants={itemVariants}>
        <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 shadow-sm flex items-start space-x-3">
            <CalendarIcon className={`w-6 h-6 text-${PRIMARY_COLOR}-600 flex-shrink-0 mt-0.5`} />
            <div>
                <h4 className="text-base font-semibold text-gray-900">{event.name}</h4>
                <div className="flex items-center text-sm text-gray-500 mt-0.5">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    <span className='mr-3'>{event.date}</span>
                    <MapIcon className="w-4 h-4 mr-1" />
                    <span>{event.location}</span>
                </div>
            </div>
        </div>
    </motion.div>
);

const DashboardPreviewSection = () => (
    <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="dashboard-preview -mt-10 pt-32 pb-24 bg-neutral-50 relative z-10 border-b border-neutral-200"
    >
        <div className="container mx-auto px-4 max-w-7xl">
            <motion.div variants={itemVariants} className="text-center mb-16">
                <span className={`text-sm font-semibold uppercase tracking-widest text-${PRIMARY_COLOR}-600`}>
                    Live Network Snapshot
                </span>
                <h2 className="text-4xl font-bold text-gray-800 mt-2 font-serif">
                    Your Alumni Dashboard
                </h2>
            </motion.div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <StatCard 
                    label="Total Alumni"
                    value={userStats.totalAlumni.toLocaleString()}
                    icon={UsersIcon}
                    color={`text-${PRIMARY_COLOR}-700`}
                    link="/directory"
                />
                <StatCard 
                    label="Active Last Month"
                    value={userStats.activeUsersLastMonth.toLocaleString()}
                    icon={ArrowTrendingUpIcon}
                    color={`text-green-600`}
                    link="/dashboard"
                />
                <StatCard 
                    label="New Members Qtr"
                    value={userStats.newMembersThisQuarter}
                    icon={SparklesIcon}
                    color={`text-yellow-600`}
                    link="/dashboard"
                />
                <StatCard 
                    label="Open Jobs"
                    value={totalJobPostings}
                    icon={BriefcaseIcon}
                    color={`text-red-600`}
                    link="/jobs"
                />
            </div>

            {/* Events Preview */}
            <motion.div 
                variants={sectionVariants}
                className="max-w-4xl mx-auto p-8 rounded-3xl shadow-2xl bg-white border border-neutral-100"
            >
                <motion.h3 variants={itemVariants} className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center font-serif">
                    <CalendarIcon className={`w-7 h-6 mr-2 text-${PRIMARY_COLOR}-600`} />
                    Next Upcoming Events
                </motion.h3>
                <div className="space-y-4">
                    {upcomingEvents.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
                <motion.div variants={itemVariants} className="text-center mt-8">
                    <Link href="/events" passHref>
                        <button className={`inline-flex items-center text-base font-semibold text-${PRIMARY_COLOR}-700 hover:text-${PRIMARY_COLOR}-800 transition-colors border-b-2 border-${PRIMARY_COLOR}-700 pb-0.5`}>
                            View All Events <ArrowRightIcon className="w-4 h-4 ml-1" />
                        </button>
                    </Link>
                </motion.div>
            </motion.div>

        </div>
    </motion.section>
);


// =================================================================
// --- Remaining Components ---
// =================================================================

const HeroSection = ({ title, subtitle, ctaText, ctaLink }) => (
    <section 
        className="hero-section text-white py-48 lg:py-64 text-center relative overflow-hidden bg-neutral-900" 
        style={{ 
            backgroundImage: 'url("/images/alumni-hero-bg.jpg")',
            backgroundSize: 'cover', 
            backgroundPosition: 'center',
            clipPath: 'polygon(0 0, 100% 0, 100% 95%, 0 100%)' 
        }}
    >
        <div className={`absolute inset-0 bg-neutral-900 opacity-70`}></div>
        <div className={`absolute inset-0 bg-gradient-to-tr from-${PRIMARY_COLOR}-900/10 to-slate-900/10`}></div>
        <div className="container mx-auto px-4 relative z-10 max-w-7xl">
            <motion.h1 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className="text-6xl md:text-7xl font-extrabold mb-6 font-serif leading-tight tracking-tighter drop-shadow-lg"
            >
                {title}
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.2 }}
                className="text-xl md:text-2xl mb-16 max-w-4xl mx-auto opacity-90 font-light"
            >
                {subtitle}
            </motion.p>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                <Link href={ctaLink} passHref>
                    <button className={`bg-${PRIMARY_COLOR}-600 hover:bg-${PRIMARY_COLOR}-700 text-white font-bold py-4 px-12 rounded-full shadow-2xl transition duration-300 transform hover:scale-105 text-lg uppercase tracking-wider focus:ring-4 focus:ring-${PRIMARY_COLOR}-400 focus:ring-offset-4 focus:ring-offset-neutral-900`}>
                        {ctaText}
                    </button>
                </Link>
            </motion.div>
        </div>
    </section>
);

const DonationCallout = ({ message, link }) => (
    <section className="donation-callout py-20 relative z-20"> 
        <div className="max-w-6xl mx-auto px-4 text-center">
            <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                className={`p-10 md:p-16 rounded-[2.5rem] shadow-3xl bg-gradient-to-br from-white to-${SECONDARY_COLOR}-50 text-neutral-900 transform hover:scale-[1.005] transition-transform duration-500 border border-${SECONDARY_COLOR}-200`}
            >
                <h2 className={`text-4xl lg:text-5xl font-extrabold mb-4 font-serif text-${SECONDARY_COLOR}-800`}>Make a Difference Today</h2>
                <p className="text-xl mb-10 opacity-90 max-w-4xl mx-auto font-light text-slate-700">
                    {message}
                </p>
                <Link href={link} passHref>
                    <motion.button
                        variants={itemVariants}
                        className={`bg-${SECONDARY_COLOR}-600 text-white font-bold py-4 px-12 rounded-full shadow-2xl transition duration-300 transform hover:scale-105 hover:bg-${SECONDARY_COLOR}-700 text-lg uppercase tracking-wide focus:ring-4 focus:ring-${SECONDARY_COLOR}-500 focus:ring-offset-4 focus:ring-offset-${SECONDARY_COLOR}-50`}
                    >
                        <HeartIcon className="w-5 h-5 mr-2 inline-block" /> Donate Securely
                    </motion.button>
                </Link>
                <p className="mt-6 text-sm text-slate-500 tracking-wide">
                    100% of your gift goes directly to funded programs.
                </p>
            </motion.div>
        </div>
    </section>
);

const FeatureGrid = () => (
    <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="feature-grid pt-24 pb-32 bg-white"
    >
        <div className="container mx-auto px-4 max-w-7xl">
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-20 text-gray-800 font-serif">
                Explore The Alumni Hub
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {features.map((feature) => {
                    const IconComponent = featureIconMap[feature.title];
                    const isDonation = feature.link === '/donation';
                    
                    const iconColor = isDonation ? `${SECONDARY_COLOR}-800` : `${PRIMARY_COLOR}-700`;
                    const bgColor = isDonation ? `${SECONDARY_COLOR}-50` : 'white';
                    const hoverBg = isDonation ? `${SECONDARY_COLOR}-100` : 'neutral-50';
                    const borderColor = isDonation ? `${SECONDARY_COLOR}-200` : 'neutral-100';
                    const textColor = isDonation ? `${SECONDARY_COLOR}-900` : 'gray-900';
                    const descColor = isDonation ? `${SECONDARY_COLOR}-800` : 'gray-600';
                    
                    return (
                        <motion.div variants={itemVariants} key={feature.link}>
                            <Link href={feature.link} passHref>
                                <motion.div 
                                    whileHover={{ scale: 1.03, boxShadow: "0 18px 35px -5px rgba(0, 0, 0, 0.08)" }}
                                    className={`
                                        p-8 rounded-3xl shadow-xl transition duration-300 cursor-pointer h-full flex flex-col justify-between border 
                                        bg-${bgColor} hover:bg-${hoverBg} border-${borderColor}
                                    `}
                                >
                                    <div>
                                        <IconComponent 
                                            className={`w-10 h-10 mb-4 text-${iconColor}`} 
                                        />
                                        <h3 className={`text-xl font-bold mb-2 text-gray-700 font-sans`}>{feature.title}</h3>
                                        <p className={`text-base text-${descColor}`}>
                                            {feature.description}
                                        </p>
                                    </div>
                                    {isDonation && (
                                        <span className={`mt-4 inline-block text-xs font-bold bg-${SECONDARY_COLOR}-600 text-white px-3 py-1 rounded-full shadow-md uppercase tracking-wider`}>
                                            High Impact
                                        </span>
                                    )}
                                </motion.div>
                            </Link>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    </motion.section>
);

const ImpactPreviewSection = () => (
    <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="impact-preview py-32 bg-neutral-50 border-t border-b border-neutral-100"
    >
        <div className="container mx-auto px-4 text-center max-w-7xl">
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-gray-800 mb-4 font-serif">
                Measuring Your Contribution
            </motion.h2>
            <motion.p variants={itemVariants} className="text-xl text-gray-600 mb-20 max-w-4xl mx-auto">
                Every contribution fuels real, measurable progress in student lives and community projects.
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {impactStats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="p-12 bg-white rounded-3xl shadow-xl border border-neutral-200 text-center space-y-4 transition-all duration-300 hover:shadow-2xl transform hover:scale-[1.01]"
                        >
                            <IconComponent className={`w-14 h-14 mx-auto ${stat.color}`} />
                            <p className={`text-7xl font-extrabold ${stat.color} leading-none tracking-tight`}>
                                {stat.value}
                            </p>
                            <p className="text-xl font-medium text-neutral-700 font-sans mt-2 uppercase tracking-wider">{stat.label}</p>
                        </motion.div>
                    );
                })}
            </div>
            <Link href="/impact" passHref>
                <motion.button variants={itemVariants} className={`mt-20 inline-flex items-center text-lg font-semibold text-${PRIMARY_COLOR}-700 hover:text-${PRIMARY_COLOR}-800 transition-colors border-b-2 border-${PRIMARY_COLOR}-700 pb-1`}>
                    View Full Impact Report <ArrowRightIcon className="w-5 h-5 ml-2" />
                </motion.button>
            </Link>
        </div>
    </motion.section>
);

const BlogPreviewCard = ({ post }) => (
    <motion.div variants={itemVariants}>
        <Link href={post.link} passHref>
            <motion.div 
                whileHover={{ scale: 1.05, boxShadow: "0 18px 40px -5px rgba(0, 0, 0, 0.15)" }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl transition duration-300 h-full flex flex-col cursor-pointer border border-neutral-100"
            >
                <div className="relative h-48 w-full">
                    <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                    />
                    <span className={`absolute top-4 right-4 bg-${PRIMARY_COLOR}-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md`}>
                        {post.category}
                    </span>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-sky-700 transition-colors duration-200 font-serif">
                        {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{post.snippet}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500 pt-3 border-t border-neutral-100 mt-auto">
                        <span className="flex items-center">
                            <ClockIcon className="w-4 h-4 mr-1.5 text-sky-500" />
                            {post.date}
                        </span>
                        <span className="flex items-center">
                            <UserIcon className="w-4 h-4 mr-1.5 text-sky-500" />
                            {post.author}
                        </span>
                    </div>
                </div>
            </motion.div>
        </Link>
    </motion.div>
);

const BlogPreviewSection = () => (
    <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="blog-preview py-32 bg-white"
    >
        <div className="container mx-auto px-4 max-w-7xl">
            <motion.div variants={itemVariants} className="text-center mb-16">
                <span className={`text-sm font-semibold uppercase tracking-widest text-${PRIMARY_COLOR}-600`}>
                    Latest Insights & Stories
                </span>
                <h2 className="text-4xl font-bold text-gray-800 mt-2 font-serif">
                    The Alumni Blog
                </h2>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {initialPosts.slice(0, 3).map((post) => (
                    <BlogPreviewCard key={post.id} post={post} />
                ))}
            </div>

            <motion.div variants={itemVariants} className="text-center mt-20">
                <Link href="/blog" passHref>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        className={`inline-flex items-center text-lg font-semibold bg-${PRIMARY_COLOR}-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-${PRIMARY_COLOR}-700 transition duration-300 uppercase tracking-wider`}
                    >
                        <BookOpenIcon className="w-5 h-5 mr-2" /> Read All Articles
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    </motion.section>
);

const MissionVision = () => (
    <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="mission-vision-grid pt-32 pb-32 bg-white"
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-20 text-gray-800 font-serif">Our Core Values</motion.h2>
            <div className="grid md:grid-cols-2 gap-12">
                <motion.div variants={itemVariants} className="bg-neutral-50 p-10 rounded-3xl shadow-lg border border-neutral-100 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-neutral-800 mb-4 flex items-center font-serif">
                        <MapPinIcon className={`w-8 h-8 mr-3 text-${PRIMARY_COLOR}-600`} />
                        Our Mission
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        Our mission is to create a lifelong bond between our alumni and the institution, providing a platform for networking, professional development, and meaningful engagement. We strive to empower our graduates to achieve their full potential and contribute positively to society.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants} className="bg-neutral-50 p-10 rounded-3xl shadow-lg border border-neutral-100 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-2xl font-bold text-neutral-800 mb-4 flex items-center font-serif">
                        <EyeIcon className={`w-8 h-8 mr-3 text-${SECONDARY_COLOR}-600`} />
                        Our Vision
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-lg">
                        To be the leading global alumni network, recognized for fostering innovation, leadership, and social responsibility, and for consistently enriching the lives of our alumni and the wider community.
                    </p>
                </motion.div>
            </div>
        </div>
    </motion.section>
);

const HistorySection = () => (
    <motion.section 
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="history-section py-32 bg-gray-50 border-t border-neutral-200"
    >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center mb-20 text-gray-800 font-serif">
                Our History & Milestones
            </motion.h2>
            <div className="bg-white p-12 rounded-3xl shadow-2xl border border-gray-100">
                <Timeline timelineData={historyTimeline} />
            </div>
        </div>
    </motion.section>
);

const Timeline = ({ timelineData }) => (
    <div className={`relative border-l-4 border-${PRIMARY_COLOR}-200 ml-4 md:ml-6`}>
        {historyTimeline.map((item, index) => (
            <motion.div key={index} variants={itemVariants} className="mb-12 ml-8">
                <span className={`absolute flex items-center justify-center w-8 h-8 bg-${PRIMARY_COLOR}-600 rounded-full -left-4 ring-8 ring-white shadow-md`}>
                    <ClockIcon className="w-4 h-4 text-white" />
                </span>
                <h3 className="mb-1 text-xl font-semibold text-gray-900 font-serif">{item.title}</h3>
                <time className={`block mb-2 text-base font-medium leading-none text-${PRIMARY_COLOR}-500`}>{item.year}</time>
                <p className="text-base font-normal text-gray-700">{item.detail}</p>
            </motion.div>
        ))}
    </div>
);

const NewsletterSubscription = () => {
    return (
        <motion.section 
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="newsletter-cta pt-20 pb-40 bg-white"
        >
            <div className="max-w-7xl mx-auto px-4">
                <motion.div
                variants={itemVariants}
                // Using PRIMARY_COLOR theme for background and text
                className={`p-10 md:p-20 bg-${PRIMARY_COLOR}-50 rounded-3xl shadow-2xl overflow-hidden relative`}
                >
                
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <defs>
                            <pattern id="dot-pattern-sky" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                                <circle cx="2" cy="2" r="1.5" fill="white" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#dot-pattern-sky)" />
                    </svg>
                </div>

                </motion.div>
            </div>
        </motion.section>
    );
};


// =================================================================
// --- Main Home Component ---
// =================================================================

/**
 * The single Next.js Home Page component for the alumni website.
 */
export default function HomePage() {
    return (
        <main className="min-h-screen bg-white antialiased overflow-hidden">
            {/* 1. Hero Section */}
            <HeroSection 
                title="Alumni Network: Reconnect, Grow, Achieve."
                subtitle="Explore everything the network has to offer, from career development to social events."
                ctaText="Go to Dashboard"
                ctaLink="/dashboard"
            />
            
            {/* 2. Dashboard Preview Section */}
            <DashboardPreviewSection />

            {/* 3. Donation Call-to-Action (Now Rose/Secondary Accent) */}
            <DonationCallout 
                message="Your contribution directly supports scholarships, start-up grants, and community development initiatives, shaping the future of our institution."
                link="/donation"
            />
            
            {/* 4. Feature Grid */}
            <FeatureGrid />

            {/* 5. Impact Preview Section (Light Gray BG) */}
            <ImpactPreviewSection />

            {/* 6. Blog Preview Section */}
            <BlogPreviewSection />

            {/* 7. Mission & Vision (Light Gray Cards) */}
            <MissionVision />

            {/* 8. History Timeline (Light Gray BG) */}
            <HistorySection />
           
        </main>
    );
}