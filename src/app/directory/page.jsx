"use client";
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
    Search, MapPin, Briefcase, GraduationCap, Users, User, ChevronDown, Filter, X 
} from 'lucide-react';

// --- Reusing the Intersection Observer Hook for smooth entry ---

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
// 1. Data Setup (Placeholder Alumni Data)
// ----------------------------------------------------------------------

const initialAlumniData = [
    // Existing Global Alumni
    { id: 1, name: "Dr. Anya Sharma", title: "Lead Research Scientist", company: "Innovate Labs", year: 2005, location: "San Francisco, CA", industry: "Biotech", mentor: true, avatar: "https://placehold.co/100x100/1e3a8a/ffffff?text=AS" },
    { id: 2, name: "Mark Chen", title: "CEO & Founder", company: "Quantum Core", year: 2010, location: "New York, NY", industry: "FinTech", mentor: true, avatar: "https://placehold.co/100x100/374151/ffffff?text=MC" },
    { id: 3, name: "Sarah Khan", title: "Product Designer", company: "EcoBridge", year: 2018, location: "Seattle, WA", industry: "Sustainability", mentor: false, avatar: "https://placehold.co/100x100/9ca3af/ffffff?text=SK" },
    
    // Indian Alumni: Amanprit Kaur and others
    { id: 7, name: "Amanprit Kaur", title: "Head of AI Strategy", company: "Tech Mahindra", year: 2009, location: "Mumbai, India", industry: "Tech", mentor: true, avatar: "https://placehold.co/100x100/d97706/ffffff?text=AK" },
    { id: 8, name: "Ravi Shankar", title: "Venture Capital Partner", company: "Nexus Ventures", year: 1995, location: "Bangalore, India", industry: "Venture Capital", mentor: true, avatar: "https://placehold.co/100x100/10b981/ffffff?text=RS" },
    { id: 9, name: "Priya Menon", title: "Brand Manager", company: "Hindustan Unilever", year: 2016, location: "Chennai, India", industry: "Consumer Goods", mentor: false, avatar: "https://placehold.co/100x100/f97316/ffffff?text=PM" },
    
    // Remaining Global Alumni
    { id: 4, name: "David Lee", title: "Venture Partner", company: "Ascend Capital", year: 1998, location: "Boston, MA", industry: "Venture Capital", mentor: true, avatar: "https://placehold.co/100x100/4f46e5/ffffff?text=DL" },
    { id: 5, name: "Emily White", title: "Marketing Director", company: "Global Tech", year: 2013, location: "London, UK", industry: "Tech", mentor: false, avatar: "https://placehold.co/100x100/4b5563/ffffff?text=EW" },
    { id: 6, name: "John Smith", title: "Civil Engineer", company: "City Works", year: 2007, location: "San Francisco, CA", industry: "Engineering", mentor: true, avatar: "https://placehold.co/100x100/6b7280/ffffff?text=JS" },
];

const industryOptions = ['Biotech', 'FinTech', 'Sustainability', 'Venture Capital', 'Tech', 'Engineering', 'Education', 'Healthcare', 'Consumer Goods'];
const locationOptions = ['San Francisco, CA', 'New York, NY', 'Seattle, WA', 'Boston, MA', 'London, UK', 'Mumbai, India', 'Bangalore, India', 'Chennai, India', 'Remote'];

// ----------------------------------------------------------------------
// 2. Utility Components
// ----------------------------------------------------------------------

/**
 * Clean, Classy Profile Card for Search Results - FIXED TYPO (alumnus -> alumni)
 */
const ProfileCard = ({ alumni, delay = 0 }) => {
    const [ref, inView] = useInView({ threshold: 0.1 });
    const animationClass = inView ? `animate-fade-in-up delay-${delay}` : 'opacity-0';

    return (
        <div 
            ref={ref}
            className={`bg-white p-8 rounded-2xl shadow-xl border border-neutral-100 hover:shadow-2xl transition-all duration-300 transform hover:translate-y-[-4px] flex items-center space-x-6 ${animationClass}`}
        >
            <img 
                src={alumni.avatar} 
                alt={alumni.name} 
                className="w-16 h-16 rounded-full object-cover border-2 border-indigo-300 flex-shrink-0 shadow-md" 
            />
            <div className="flex-grow">
                <h3 className="text-xl font-extrabold text-neutral-900 tracking-tight flex items-center">
                    {alumni.name}
                    {alumni.mentor && (
                        <span className="ml-3 px-3 py-1 text-xs font-bold rounded-full bg-indigo-100 text-indigo-700 uppercase">Mentor</span>
                    )}
                </h3>
                <p className="text-sm text-neutral-600 font-medium mt-1">{alumni.title} at {alumni.company}</p>
                <div className="flex items-center space-x-4 text-sm text-neutral-500 mt-2">
                    <span className="flex items-center"><GraduationCap className="h-4 w-4 mr-1.5" /> Class of {alumni.year}</span>
                    <span className="flex items-center"><MapPin className="h-4 w-4 mr-1.5" /> {alumni.location}</span>
                </div>
            </div>
            <div className="flex flex-col space-y-3 flex-shrink-0">
                <a 
                    href={`/alumni/${alumni.id}`} 
                    className="bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-800 transition-colors shadow-md"
                >
                    View Profile
                </a>
                <button 
                    onClick={() => alert(`Initiating chat with ${alumni.name}`)}
                    className="bg-neutral-100 text-neutral-800 px-5 py-2 rounded-lg text-sm font-semibold hover:bg-neutral-200 transition-colors"
                >
                    Connect
                </button>
            </div>
        </div>
    );
};

/**
 * Filter Group Component for the Sidebar
 */
const FilterGroup = ({ title, options, selected, onToggle, type = 'checkbox' }) => (
    <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-neutral-100">
        <h4 className="text-lg font-extrabold text-neutral-900 mb-4 flex items-center space-x-2">
            <Filter className="h-5 w-5 text-indigo-600" />
            <span>{title}</span>
        </h4>
        <div className="space-y-3">
            {options.map((option) => (
                <label key={option} className="flex items-center space-x-3 cursor-pointer text-neutral-700 hover:text-indigo-700 transition-colors">
                    <input
                        type={type}
                        checked={selected.includes(option)}
                        onChange={() => onToggle(option)}
                        className="h-5 w-5 text-indigo-600 border-neutral-300 rounded focus:ring-indigo-500"
                    />
                    <span className="font-medium text-sm">{option}</span>
                </label>
            ))}
        </div>
    </div>
);


// ----------------------------------------------------------------------
// 3. Main Directory Component
// ----------------------------------------------------------------------

const AlumniDirectory = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        industries: [],
        locations: [],
        mentorStatus: false,
    });
    const [minYear, setMinYear] = useState(1990); 
    const [maxYear, setMaxYear] = useState(new Date().getFullYear());

    // --- Filtering Logic ---
    const filteredAlumni = useMemo(() => {
        return initialAlumniData.filter(alumni => { // <-- NOTE: Using alumni variable here
            // 1. Search Term Filter
            const matchesSearch = alumni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  alumni.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                  alumni.company.toLowerCase().includes(searchTerm.toLowerCase());

            // 2. Industry Filter
            const matchesIndustry = filters.industries.length === 0 || filters.industries.includes(alumni.industry);

            // 3. Location Filter
            const matchesLocation = filters.locations.length === 0 || filters.locations.includes(alumni.location);

            // 4. Mentor Status Filter
            const matchesMentor = !filters.mentorStatus || alumni.mentor === true;

            // 5. Year Filter (Simple range check)
            const matchesYear = alumni.year >= minYear && alumni.year <= maxYear;

            return matchesSearch && matchesIndustry && matchesLocation && matchesMentor && matchesYear;
        });
    }, [searchTerm, filters, minYear, maxYear]);
    
    // --- Handlers ---
    const handleToggleFilter = (key, value) => {
        setFilters(prev => {
            const current = prev[key];
            if (Array.isArray(current)) {
                return {
                    ...prev,
                    [key]: current.includes(value) ? current.filter(v => v !== value) : [...current, value],
                };
            }
            return prev;
        });
    };

    const handleClearFilters = () => {
        setFilters({
            industries: [],
            locations: [],
            mentorStatus: false,
        });
        setMinYear(1990);
        setMaxYear(new Date().getFullYear());
        setSearchTerm('');
    };

    // --- Component Render ---
    return (
        <div className="min-h-screen font-sans text-neutral-800" style={{ background: 'linear-gradient(180deg, #FFFFFF 0%, #F8F9FB 100%)' }}>
            
            {/* Header Section (Reusing Classy Vibe) */}
            <header className="bg-white py-24 px-6 border-b border-indigo-100">
                <div className="container mx-auto max-w-7xl">
                    <h1 className="text-6xl font-extrabold text-neutral-900 tracking-tighter mb-4">
                        Global Alumni <span className="text-indigo-800">Directory</span>
                    </h1>
                    <p className="text-xl text-neutral-600 max-w-4xl font-light">
                        Search and connect with over 10,000 alumni by location, industry, company, and graduation year.
                    </p>
                </div>
            </header>

            {/* Main Content: Sidebar + Results */}
            <div className="container mx-auto max-w-7xl py-16 px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* --- 1. Sidebar (Filters) --- */}
                    <aside className="lg:col-span-4 space-y-10">
                        <div className="flex justify-between items-center pb-3 border-b border-neutral-200">
                            <h3 className="text-2xl font-extrabold text-neutral-900 flex items-center space-x-3">
                                <Filter className="h-6 w-6 text-indigo-700" />
                                <span>Filter Alumni</span>
                            </h3>
                            <button onClick={handleClearFilters} className="text-sm font-semibold text-neutral-500 hover:text-indigo-600 flex items-center transition-colors">
                                <X className="h-4 w-4 mr-1" />
                                Clear All
                            </button>
                        </div>
                        
                        {/* Industry Filter */}
                        <FilterGroup
                            title="Industry Focus"
                            options={industryOptions}
                            selected={filters.industries}
                            onToggle={(val) => handleToggleFilter('industries', val)}
                        />

                        {/* Location Filter */}
                        <FilterGroup
                            title="Location"
                            options={locationOptions}
                            selected={filters.locations}
                            onToggle={(val) => handleToggleFilter('locations', val)}
                        />

                        {/* Graduation Year Filter (Example) */}
                        <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-neutral-100">
                            <h4 className="text-lg font-extrabold text-neutral-900 mb-5 flex items-center space-x-2">
                                <GraduationCap className="h-5 w-5 text-indigo-600" />
                                <span>Graduation Year Range</span>
                            </h4>
                            <div className="space-y-4">
                                <div className="flex space-x-4">
                                    <input
                                        type="number"
                                        placeholder="Min Year"
                                        value={minYear}
                                        onChange={(e) => setMinYear(parseInt(e.target.value) || 1900)}
                                        className="w-full p-3 border border-neutral-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                                    />
                                    <input
                                        type="number"
                                        placeholder="Max Year"
                                        value={maxYear}
                                        onChange={(e) => setMaxYear(parseInt(e.target.value) || new Date().getFullYear())}
                                        className="w-full p-3 border border-neutral-300 rounded-lg focus:border-indigo-500 focus:ring-indigo-500 transition-colors"
                                    />
                                </div>
                                <p className="text-xs text-neutral-500">Currently filtering from {minYear} to {maxYear}.</p>
                            </div>
                        </div>

                        {/* Mentor Status Filter */}
                        <div className="mb-8 p-6 bg-white rounded-xl shadow-lg border border-neutral-100">
                            <h4 className="text-lg font-extrabold text-neutral-900 mb-4 flex items-center space-x-2">
                                <Users className="h-5 w-5 text-indigo-600" />
                                <span>Mentorship Status</span>
                            </h4>
                            <label className="flex items-center space-x-3 cursor-pointer text-neutral-700 hover:text-indigo-700 transition-colors">
                                <input
                                    type="checkbox"
                                    checked={filters.mentorStatus}
                                    onChange={() => setFilters(prev => ({ ...prev, mentorStatus: !prev.mentorStatus }))}
                                    className="h-5 w-5 text-indigo-600 border-neutral-300 rounded focus:ring-indigo-500"
                                />
                                <span className="font-medium text-base">Only show available Mentors</span>
                            </label>
                        </div>

                    </aside>
                    
                    {/* --- 2. Main Results Area --- */}
                    <main className="lg:col-span-8">
                        
                        {/* Search Bar */}
                        <div className="relative mb-10 shadow-lg rounded-xl border border-neutral-200">
                            <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 h-6 w-6 text-neutral-400" />
                            <input
                                type="text"
                                placeholder="Search alumni by Name, Title, or Company..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full p-5 pl-14 text-xl font-light border-0 focus:ring-4 focus:ring-indigo-100 rounded-xl transition-all"
                            />
                        </div>

                        {/* Results Count */}
                        <h2 className="text-3xl font-bold text-neutral-900 mb-8 tracking-tight">
                            Showing <span className="text-indigo-700">{filteredAlumni.length}</span> Alumni Profiles
                        </h2>
                        
                        {/* Alumni Profiles List */}
                        <div className="space-y-8">
                            {filteredAlumni.length > 0 ? (
                                filteredAlumni.map((alumni, index) => (
                                    <ProfileCard key={alumni.id} alumni={alumni} delay={index * 50} />
                                ))
                            ) : (
                                <div className="text-center p-16 bg-white rounded-2xl shadow-xl border border-neutral-200">
                                    <Users className="h-16 w-16 text-neutral-300 mx-auto mb-6" />
                                    <p className="text-xl text-neutral-600 font-medium">No alumni matched your current search and filter criteria.</p>
                                    <button onClick={handleClearFilters} className="mt-6 text-indigo-700 font-bold hover:text-indigo-800 transition-colors">
                                        Clear Filters to see all profiles.
                                    </button>
                                </div>
                            )}
                        </div>
                        
                    </main>
                </div>
            </div>

            {/* Footer Placeholder (You should integrate the global footer here) */}
            <div className="bg-neutral-900 h-20"></div>

        </div>
    );
};

export default AlumniDirectory;