"use client";

// Replaced the Heroicon import with a simple text-based arrow to avoid build errors.
// import { ChevronRightIcon } from '@heroicons/react/20/solid'; // <-- No longer needed

// Data for the main Resource Sections
const resourceSections = [
  {
    title: "On-Demand Webinars & Workshops",
    description: "Access our exclusive library of professional development videos, covering everything from leadership skills to industry trends.",
    iconBg: "bg-pink-100",
    iconColor: "text-pink-600",
    linkText: "Browse All Webinars (150+)",
    linkUrl: "/resources/webinars",
  },
  {
    title: "Career & Interview Toolkit",
    description: "Download guides, templates, and expert-vetted resources for job searching, salary negotiation, and career transitions.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    linkText: "Explore the Toolkit",
    linkUrl: "/resources/toolkit",
  },
  {
    title: "Academic & Library Access",
    description: "Benefit from discounted or free access to university research databases, journals, and continuing education programs.",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    linkText: "View Access Details",
    linkUrl: "/resources/library-access",
  },
  {
    title: "Faculty Insights Blog",
    description: "Read new articles and research snippets from current and emeritus faculty members on cutting-edge topics in your field.",
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    linkText: "Read Latest Posts",
    linkUrl: "/resources/blog",
  },
];

// --- Sub-component for a Featured Resource Card ---
// FIX: Added 'linkUrl' to the destructured props list to resolve the runtime error.
const ResourceCard = ({ title, description, iconBg, iconColor, linkText, linkUrl }) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition duration-300 hover:shadow-2xl hover:border-pink-300 transform hover:scale-[1.01]">
    <div className={`h-10 w-10 ${iconBg} rounded-full flex items-center justify-center mb-4`}>
      {/* Placeholder Icon - Using 'R' for Resource */}
      <span className={`font-bold text-lg ${iconColor}`}>R</span> 
    </div>
    
    <h3 className="text-xl font-bold text-[#0A192F] mb-3">{title}</h3>
    <p className="text-gray-600 mb-6">{description}</p>
    
    {/* Link Button using the blue accent color */}
    <a 
      href={linkUrl} // This is where the fixed prop is used
      className={`flex items-center text-blue-500 hover:text-blue-700 font-semibold transition duration-150 group`}
    >
      {linkText}
      {/* Using a simple arrow character */}
      <span className="ml-1 text-xl group-hover:translate-x-1 transition duration-150">&rarr;</span>
      {/* If Heroicons is installed, you can use: <ChevronRightIcon className="h-5 w-5 ml-1 group-hover:translate-x-1 transition duration-150" /> */}
    </a>
  </div>
);


const LearningResourcesPage = () => {
  return (
    // Primary Background and Text Colors
    <div className="mx-auto py-20 px-6 sm:px-12 lg:px-28 bg-[#F9FAFB] text-[#0A192F] min-h-screen"> 
      
      {/* 1. Header & Introduction */}
      <header className="mb-16"> 
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#0A192F] mb-4 tracking-tight">
          Lifelong Learning & Resources
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-5xl leading-relaxed">
          Your success is our continuous commitment. Access exclusive career services, digital resources, and expert insights designed to support your journey.
        </p>
      </header>
      
      {/* 2. Featured Resources Grid */}
      <h2 className="text-4xl mx-10 font-bold text-[#0A192F] mb-10 border-b border-gray-200 pb-4">
        Exclusive Resource Library
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 mx-10">
        {resourceSections.map((section, index) => (
          <ResourceCard key={index} {...section} />
        ))}
      </div>

      {/* 3. Dedicated Skill-Building Section (Callout Box) */}
      <div className="bg-indigo-50 p-10 rounded-2xl shadow-inner border-l-4 border-indigo-400 mb-16">
        <h2 className="text-3xl font-bold text-indigo-800 mb-4">
          Need to Up-Skill Fast?
        </h2>
        <p className="text-xl text-indigo-700 mb-6">
          Explore our partnerships for discounted enrollment in Professional Certificate Programs and high-demand tech bootcamps.
        </p>
        {/* Call-to-Action Button using the Pink accent */}
        <button 
          className="bg-pink-500 hover:bg-pink-600 text-white text-lg font-semibold py-3.5 px-8 rounded-full shadow-lg transition duration-300 transform hover:scale-[1.02]"
        >
          View Partner Programs &rarr;
        </button>
      </div>
      
      {/* 4. Alumni Job Board Teaser (Connects to Career/Mentorship theme) */}
      <h2 className="text-3xl font-bold text-[#0A192F] mb-6">
        Alumni Job Board & Opportunities
      </h2>
      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 flex justify-between items-center">
        <div>
          <p className="text-xl text-gray-700 mb-1">
            Browse 1,200+ exclusive job postings from alumni-owned businesses and corporate partners.
          </p>
          <p className="text-gray-500">
            Post a job or find your next opportunity—powered by your network.
          </p>
        </div>
        <a 
          href="/jobs" 
          className="flex-shrink-0 border-2 border-blue-400 text-blue-500 hover:bg-blue-50 text-lg font-semibold py-3 px-8 rounded-full transition duration-300"
        >
          Go to Job Board
        </a>
      </div>

    </div>
  );
};

export default LearningResourcesPage;