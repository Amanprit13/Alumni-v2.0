"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// --- Icon components (unchanged) ---
const HomeIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l9-9 9 9M5 10v10a1 1 0 001 1h3a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h3a1 1 0 001-1v-10"></path>
    </svg>
);

const InfoIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
);

const CalendarIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
    </svg>
);

const BookIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5S19.832 5.477 21 6.253v13C19.832 18.477 18.246 18 16.5 18s-3.332.477-4.5 1.253"></path>
    </svg>
);

const HeartIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
    </svg>
);

const LayoutGridIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
    </svg>
);

const UserIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
    </svg>
);

const LogoutIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-12 5v-10a2 2 0 012-2h10a2 2 0 012 2v10a2 2 0 01-2 2h-10a2 2 0 01-2-2z"></path>
    </svg>
);

const LightbulbIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
    </svg>
);

const GamepadIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m4 14l7-7-7-7"></path>
    </svg>
);

const ChatIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 4v-4z"></path>
    </svg>
);

const NewspaperIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2zM11 6h2v2h-2V6zm0 4h2v2h-2v-2zm0 4h2v2h-2v-2z"></path>
    </svg>
);

const MailIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.893 5.262A2 2 0 0012 14a2 2 0 001.107-.378L21 8m-1 12H4a2 2 0 01-2-2V6a2 2 0 012-2h16a2 2 0 012 2v12a2 2 0 01-2 2z"></path>
    </svg>
);

const GridIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path>
    </svg>
);

const BriefcaseIcon = () => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.582 23.582 0 0112 15c-3.183 0-6.22-1.04-8.255-2.745M21 13.255V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-5.745m18 0A2.25 2.25 0 0021 10.5V7.5a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 7.5v3M9 6h6"></path>
    </svg>
);
// --- End Icon components ---

// NavBar Component
export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isExplorePopoverOpen, setIsExplorePopoverOpen] = useState(false);
    const exploreRef = useRef(null);
    const popoverTimeoutRef = useRef(null);
    const router = useRouter();

    // Use localStorage to determine login state
    const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;
    

    const handleLogout = () => {
        localStorage.removeItem('userEmail');
        setIsOpen(false); // Close mobile menu
        setIsExplorePopoverOpen(false); // Close popover
        router.push('/login'); // Redirect to login after logout
    };

    // Function to toggle the mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Handler for mouse entering/leaving the explore area (desktop only)
    const handleMouseEnterExplore = () => {
        clearTimeout(popoverTimeoutRef.current);
        setIsExplorePopoverOpen(true);
    };

    const handleMouseLeaveExplore = () => {
        popoverTimeoutRef.current = setTimeout(() => {
            setIsExplorePopoverOpen(false);
        }, 200);
    };

    // Handler for clicks on the Explore button (mobile only)
    const handleMobileExploreClick = () => {
        setIsExplorePopoverOpen(!isExplorePopoverOpen);
    };

    // Close mobile menu and popover when a link is clicked
    const handleNavLinkClick = () => {
        setIsOpen(false);
        setIsExplorePopoverOpen(false);
    };

    // Close the popover if a click occurs outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (exploreRef.current && !exploreRef.current.contains(event.target)) {
                setIsExplorePopoverOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <nav className="bg-gradient-to-r from-blue-900 to-indigo-950 shadow-2xl py-4 px-6 md:px-8">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo/Site Title */}
                <Link href="/" className="text-white text-3xl font-extrabold tracking-tight rounded-lg p-2 hover:bg-blue-900 transition-colors duration-300">
                    AlumniConnect
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex items-center space-x-4">
                    <NavLink href="/" onClick={handleNavLinkClick} icon={<HomeIcon />}>Home</NavLink>
                    <NavLink href="/about" onClick={handleNavLinkClick} icon={<InfoIcon />}>About Us</NavLink>
                    <NavLink href="/events" onClick={handleNavLinkClick} icon={<CalendarIcon />}>Events</NavLink>
                    <NavLink href="/blog" onClick={handleNavLinkClick} icon={<BookIcon />}>Blog</NavLink>
                    <NavLink href="/donation" onClick={handleNavLinkClick} icon={<HeartIcon />}>Donation</NavLink>

                    {/* Desktop Explore Popover Trigger */}
                    <div
                        className="relative"
                        onMouseEnter={handleMouseEnterExplore}
                        onMouseLeave={handleMouseLeaveExplore}
                        ref={exploreRef}
                    >
                        <button
                            className="text-white text-base font-medium px-3 py-1.5 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300 ease-in-out flex items-center"
                            aria-label="Explore more pages"
                        >
                            <GridIcon />
                            <span className="ml-2">Explore</span>
                            <svg className={`ml-2 w-4 h-4 transition-transform duration-300 ${isExplorePopoverOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        {/* Popover Content */}
                        {isExplorePopoverOpen && (
                            <div className="absolute left-1/2 transform -translate-x-1/2 mt-3 w-72 bg-blue-800/90 backdrop-blur-md rounded-lg shadow-2xl py-4 z-20 border border-blue-700 origin-top scale-100 transition-all duration-300 ease-out animate-fade-in-up">
                                <div className="grid grid-cols-2 gap-y-3 gap-x-2 px-4">
                                    <PopoverNavLink href="/dashboard" onLinkClick={handleNavLinkClick} icon={<LayoutGridIcon />}>Dashboard</PopoverNavLink>
                                    <PopoverNavLink href="/scholarship" onLinkClick={handleNavLinkClick} icon={<BookIcon />}>Scholarship</PopoverNavLink>
                                    <PopoverNavLink href="/startup" onLinkClick={handleNavLinkClick} icon={<LightbulbIcon />}>Start Up</PopoverNavLink>
                                    <PopoverNavLink href="/games-quiz" onLinkClick={handleNavLinkClick} icon={<GamepadIcon />}>Games & Leaderboard</PopoverNavLink>
                                    <PopoverNavLink href="/chat" onLinkClick={handleNavLinkClick} icon={<ChatIcon />}>Chat Box</PopoverNavLink>
                                    <PopoverNavLink href="/jobs" onLinkClick={handleNavLinkClick} icon={<BriefcaseIcon />}>Jobs</PopoverNavLink>
                                </div>
                            </div>
                        )}
                    </div>

                    <NavLink href="/news" onClick={handleNavLinkClick} icon={<NewspaperIcon />}>News</NavLink>
                    <NavLink href="/contact" onClick={handleNavLinkClick} icon={<MailIcon />}>Contact</NavLink>

                    {/* Call to Action & Profile/Logout - CONDITIONAL RENDERING */}
                    {userEmail ? (
                        <>
                            {/* Logged In State: Profile Link */}
                            <Link href="/profile" className="ml-4 w-10 h-10 flex items-center justify-center bg-teal-400 text-blue-900 rounded-full border-2 border-teal-300 shadow-lg hover:bg-teal-300 transition-colors duration-300" aria-label="User Profile">
                                <UserIcon />
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white font-semibold py-2 px-4 rounded-full shadow-xl hover:bg-red-600 hover:scale-105 transition-all duration-300 ease-in-out transform flex items-center"
                            >
                                <LogoutIcon />
                                <span className="ml-1.5">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            {/* Logged Out State: Join Us Button */}
                            <Link href="/register" className="bg-gradient-to-r from-teal-400 to-cyan-500 text-white font-semibold py-2 px-6 rounded-full shadow-xl hover:from-teal-500 hover:to-cyan-600 hover:scale-105 transition-all duration-300 ease-in-out transform">
                                Join Us
                            </Link>
                            {/* Logged Out State: Login Link (User Icon) */}
                            <Link href="/login" onClick={handleNavLinkClick} className="ml-4 w-10 h-10 flex items-center justify-center bg-blue-700 rounded-full border-2 border-blue-300 shadow-lg hover:bg-blue-600 transition-colors duration-300" aria-label="Login">
                                <UserIcon />
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button
                        onClick={toggleMenu}
                        className="text-white focus:outline-none focus:ring-2 focus:ring-white p-2 rounded-md transition-all duration-300"
                        aria-label="Toggle navigation"
                    >
                        {isOpen ? (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        ) : (
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isOpen && (
                <div className="md:hidden mt-4 bg-blue-800 rounded-lg shadow-xl p-4 space-y-3">
                    <MobileNavLink href="/" onClick={handleNavLinkClick} icon={<HomeIcon />}>Home</MobileNavLink>
                    <MobileNavLink href="/about" onClick={handleNavLinkClick} icon={<InfoIcon />}>About Us</MobileNavLink>
                    <MobileNavLink href="/events" onClick={handleNavLinkClick} icon={<CalendarIcon />}>Events</MobileNavLink>
                    <MobileNavLink href="/blog" onClick={handleNavLinkClick} icon={<BookIcon />}>Blog</MobileNavLink>
                    <MobileNavLink href="/donation" onClick={handleNavLinkClick} icon={<HeartIcon />}>Donation</MobileNavLink>

                    {/* Mobile Explore Section - now a button that expands */}
                    <div className="relative">
                        <button
                            onClick={handleMobileExploreClick}
                            className="w-full text-left text-white text-base font-medium py-2.5 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 flex justify-between items-center"
                            aria-label="Explore more pages"
                        >
                            <div className="flex items-center">
                                <GridIcon />
                                <span className="ml-2">Explore More</span>
                            </div>
                            <svg className={`ml-2 w-4 h-4 transition-transform duration-300 ${isExplorePopoverOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>
                        {isExplorePopoverOpen && (
                            <div className="mt-2 bg-blue-700 rounded-md py-2 px-2 space-y-2 border border-blue-600">
                                <MobileNavLink href="/dashboard" onClick={handleNavLinkClick} icon={<LayoutGridIcon />}>Dashboard</MobileNavLink>
                                <MobileNavLink href="/scholarship" onClick={handleNavLinkClick} icon={<BookIcon />}>Scholarship</MobileNavLink>
                                <MobileNavLink href="/startup" onClick={handleNavLinkClick} icon={<LightbulbIcon />}>Start Up</MobileNavLink>
                                <MobileNavLink href="/games-quiz" onClick={handleNavLinkClick} icon={<GamepadIcon />}>Games & Leaderboard</MobileNavLink>
                                <MobileNavLink href="/chat" onClick={handleNavLinkClick} icon={<ChatIcon />}>Chat Box</MobileNavLink>
                                <MobileNavLink href="/jobs" onClick={handleNavLinkClick} icon={<BriefcaseIcon />}>Jobs</MobileNavLink>
                            </div>
                        )}
                    </div>

                    <MobileNavLink href="/news" onClick={handleNavLinkClick} icon={<NewspaperIcon />}>News</MobileNavLink>
                    <MobileNavLink href="/contact" onClick={handleNavLinkClick} icon={<MailIcon />}>Contact</MobileNavLink>

                    {/* Mobile: Logged In/Out buttons */}
                    {userEmail ? (
                        <>
                            <MobileNavLink href="/profile" onClick={handleNavLinkClick} icon={<UserIcon />}>Profile</MobileNavLink>
                            <button
                                onClick={handleLogout}
                                className="w-full text-center bg-red-500 text-white font-semibold py-3 px-6 rounded-full shadow-md hover:bg-red-600 transition-colors duration-300 ease-in-out transform flex items-center justify-center"
                            >
                                <LogoutIcon />
                                <span className="ml-2">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <MobileNavLink href="/login" onClick={handleNavLinkClick} icon={<UserIcon />}>Login</MobileNavLink>
                            <Link href="/register" className="w-full bg-white text-blue-700 font-semibold py-3 px-6 rounded-full shadow-md hover:bg-blue-100 transition-colors duration-300 ease-in-out transform text-center">
                                Join Us
                            </Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}

// Helper component for desktop navigation links (unchanged)
function NavLink({ href, children, icon, onClick }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="text-white text-base font-medium hover:text-blue-300 transition-all duration-300 ease-in-out flex items-center group transform hover:scale-105 relative
                     before:content-[''] before:absolute before:bottom-0 before:left-1/2 before:-translate-x-1/2 before:w-0 before:h-0.5 before:bg-blue-300 before:rounded-full before:transition-all before:duration-300
                     hover:before:w-full"
        >
            {icon && <span className="mr-1.5 group-hover:scale-110 transition-transform duration-200">{icon}</span>}
            {children}
        </Link>
    );
}

// Helper component for mobile navigation links (unchanged)
function MobileNavLink({ href, onClick, children, icon }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className="block text-white text-base font-medium py-2.5 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 flex items-center"
        >
            {icon && <span className="mr-2.5">{icon}</span>}
            {children}
        </Link>
    );
}

// Helper component for links within the Explore Popover (unchanged)
function PopoverNavLink({ href, onLinkClick, children, icon }) {
    return (
        <Link
            href={href}
            onClick={onLinkClick}
            className="flex items-center text-white text-sm font-medium p-2 rounded-md hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105"
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </Link>
    );
}