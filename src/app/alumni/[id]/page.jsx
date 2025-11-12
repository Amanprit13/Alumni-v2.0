// File: /src/app/alumni/[id]/page.jsx
"use client";
import React from 'react';
import { MapPin, Briefcase, GraduationCap, Mail } from 'lucide-react';

// --- Placeholder Data (ALL 9 Alumni MUST BE HERE for lookup) ---
const initialAlumniData = [
    { id: 1, name: "Dr. Anya Sharma", title: "Lead Research Scientist", company: "Innovate Labs", year: 2005, location: "San Francisco, CA", industry: "Biotech", mentor: true, email: "anya@example.com", avatar: "https://placehold.co/150x150/1e3a8a/ffffff?text=AS" },
    { id: 2, name: "Mark Chen", title: "CEO & Founder", company: "Quantum Core", year: 2010, location: "New York, NY", industry: "FinTech", mentor: true, email: "mark@example.com", avatar: "https://placehold.co/150x150/374151/ffffff?text=MC" },
    { id: 3, name: "Sarah Khan", title: "Product Designer", company: "EcoBridge", year: 2018, location: "Seattle, WA", industry: "Sustainability", mentor: false, email: "sarah@example.com", avatar: "https://placehold.co/150x150/9ca3af/ffffff?text=SK" },
    
    // Indian Alumni (Amanprit Kaur)
    { id: 7, name: "Amanprit Kaur", title: "Head of AI Strategy", company: "Tech Mahindra", year: 2009, location: "Mumbai, India", industry: "Tech", mentor: true, email: "amanprit@example.com", avatar: "https://placehold.co/150x150/d97706/ffffff?text=AK" },
    { id: 8, name: "Ravi Shankar", title: "Venture Capital Partner", company: "Nexus Ventures", year: 1995, location: "Bangalore, India", industry: "Venture Capital", mentor: true, email: "ravi@example.com", avatar: "https://placehold.co/150x150/10b981/ffffff?text=RS" },
    { id: 9, name: "Priya Menon", title: "Brand Manager", company: "Hindustan Unilever", year: 2016, location: "Chennai, India", industry: "Consumer Goods", mentor: false, email: "priya@example.com", avatar: "https://placehold.co/150x150/f97316/ffffff?text=PM" },
    
    // Remaining Global Alumni
    { id: 4, name: "David Lee", title: "Venture Partner", company: "Ascend Capital", year: 1998, location: "Boston, MA", industry: "Venture Capital", mentor: true, email: "david@example.com", avatar: "https://placehold.co/150x150/4f46e5/ffffff?text=DL" },
    { id: 5, name: "Emily White", title: "Marketing Director", company: "Global Tech", year: 2013, location: "London, UK", industry: "Tech", mentor: false, email: "emily@example.com", avatar: "https://placehold.co/150x150/4b5563/ffffff?text=EW" },
    { id: 6, name: "John Smith", title: "Civil Engineer", company: "City Works", year: 2007, location: "San Francisco, CA", industry: "Engineering", mentor: true, email: "john@example.com", avatar: "https://placehold.co/150x150/6b7280/ffffff?text=JS" },
];

// --- Main Dynamic Page Component ---
const AlumniProfilePage = ({ params }) => {
    // 1. Get the dynamic ID from the URL parameters
    // Next.js passes the dynamic segment name (id) as a property in params
    const alumniId = parseInt(params.id); 

    // 2. Find the profile matching the ID
    const profile = initialAlumniData.find(a => a.id === alumniId);

    if (!profile) {
        return (
            <div className="text-center py-20">
                <h1 className="text-4xl font-extrabold text-red-600">404</h1>
                <p className="text-xl text-neutral-600 mt-2">Alumni profile not found (ID: {alumniId}).</p>
            </div>
        );
    }

    // 3. Render the Profile Details
    return (
        <div className="min-h-screen bg-neutral-50 py-16 px-6">
            <div className="container mx-auto max-w-4xl bg-white p-10 md:p-16 rounded-2xl shadow-2xl border border-indigo-100">
                
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 border-b pb-8 mb-8">
                    <img 
                        src={profile.avatar} 
                        alt={profile.name} 
                        className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg flex-shrink-0" 
                    />
                    <div>
                        <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight flex items-center">
                            {profile.name}
                            {profile.mentor && (
                                <span className="ml-4 px-3 py-1 text-sm font-bold rounded-full bg-indigo-100 text-indigo-700 uppercase">Mentor</span>
                            )}
                        </h1>
                        <p className="text-xl text-indigo-700 font-semibold mt-1">{profile.title}</p>
                        <p className="text-lg text-neutral-600 mt-1">at {profile.company}</p>
                    </div>
                </div>

                {/* Details Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-10 text-neutral-700 text-lg">
                    <p className="flex items-center"><MapPin className="h-6 w-6 mr-3 text-indigo-600" /> Location: <span className="font-medium ml-2">{profile.location}</span></p>
                    <p className="flex items-center"><GraduationCap className="h-6 w-6 mr-3 text-indigo-600" /> Class: <span className="font-medium ml-2">{profile.year}</span></p>
                    <p className="flex items-center"><Briefcase className="h-6 w-6 mr-3 text-indigo-600" /> Industry: <span className="font-medium ml-2">{profile.industry}</span></p>
                    <p className="flex items-center"><Mail className="h-6 w-6 mr-3 text-indigo-600" /> Email: <span className="font-medium ml-2">{profile.email}</span></p>
                </div>
                
                {/* Connect Button */}
                <div className="mt-10 pt-8 border-t">
                    <button
                        onClick={() => alert(`Connecting with ${profile.name}`)}
                        className="w-full md:w-auto bg-indigo-700 text-white px-8 py-3 rounded-xl text-lg font-semibold hover:bg-indigo-800 transition-colors shadow-lg"
                    >
                        Connect with {profile.name}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AlumniProfilePage;