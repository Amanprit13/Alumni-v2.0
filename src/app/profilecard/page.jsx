"use client";
import React, { useRef, useEffect, useState } from 'react';
import { MapPin, GraduationCap, Users } from 'lucide-react';

// --- Intersection Observer Hook (Reused for animation) ---
// Note: If you have this hook defined globally, you can remove it here.
const useInView = (options) => {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setInView(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [options]);

    return [ref, inView];
};

// ----------------------------------------------------------------------
// ProfileCard Component
// ----------------------------------------------------------------------

/**
 * Clean, Classy Profile Card for Search Results
 * * @param {Object} alumni - The alumni data object.
 * @param {number} alumni.id - Unique ID.
 * @param {string} alumni.name - Full name.
 * @param {string} alumni.title - Current job title.
 * @param {string} alumni.company - Current company.
 * @param {number} alumni.year - Graduation year.
 * @param {string} alumni.location - Current location.
 * @param {boolean} alumni.mentor - Mentorship status.
 * @param {string} alumni.avatar - URL for the profile picture.
 * @param {number} delay - Animation delay in milliseconds.
 */
const ProfileCard = ({ alumni, delay = 0 }) => {
    // Uses the hook for the fade-in animation
    const [ref, inView] = useInView({ threshold: 0.1 });
    // Tailwind class for staggered animation
    const animationClass = inView ? `animate-fade-in-up delay-${delay}` : 'opacity-0';

    if (!alumni) return null; // Safety check

    return (
        <div 
            ref={ref}
            className={`bg-white p-8 rounded-2xl shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-300 transform hover:translate-y-[-4px] flex items-center space-x-6 ${animationClass}`}
        >
            {/* Avatar */}
            <img 
                src={alumni.avatar} 
                alt={alumni.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-300 flex-shrink-0 shadow-md" 
            />
            
            {/* Profile Details */}
            <div className="flex-grow">
                <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight flex items-center">
                    {alumni.name}
                    {/* Mentor Tag */}
                    {alumni.mentor && (
                        <span className="ml-3 px-3 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700 uppercase">Mentor</span>
                    )}
                </h3>
                {/* Title and Company */}
                <p className="text-sm text-neutral-600 font-medium mt-1">{alumni.title} at {alumni.company}</p>
                
                {/* Location and Year */}
                <div className="flex items-center space-x-4 text-sm text-neutral-500 mt-2">
                    <span className="flex items-center"><GraduationCap className="h-4 w-4 mr-1.5" /> Class of {alumni.year}</span>
                    <span className="flex items-center"><MapPin className="h-4 w-4 mr-1.5" /> {alumni.location}</span>
                </div>
            </div>
            
            {/* Actions */}
            <div className="flex flex-col space-y-3 flex-shrink-0">
                <a 
                    href={`/alumni/${alumni.id}`} 
                    className="bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-800 transition-colors shadow-md text-center"
                >
                    View Profile
                </a>
                <button 
                    onClick={() => alert(`Initiating chat with ${alumni.name}`)}
                    className="bg-neutral-100 text-neutral-800 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-neutral-200 transition-colors text-center"
                >
                    Connect
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;