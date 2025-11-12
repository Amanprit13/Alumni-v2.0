"use client";

import { useState, useEffect, Fragment } from 'react';
import MentorCard from './card'; // Assuming MentorCard is in the same directory
import { Briefcase, Zap, Check, ChevronsUpDown } from 'lucide-react';
import { Listbox, Transition } from '@headlessui/react'; // <-- Headless UI Import

// ---------------------------------------------
// Data and Fetch logic 
// ---------------------------------------------

const MOCK_MENTORS_DATA = [
    { id: '1', name: 'Dr. Jane Doe', industry: 'Tech', skills: ['Leadership', 'Startups', 'Venture Capital'], gradYear: 2005, bio: 'Seasoned CTO with a passion for guiding new founders and driving innovation.' },
    { id: '2', name: 'John Smith', industry: 'Finance', skills: ['Data Science', 'Investing', 'Risk Mgmt'], gradYear: 2012, bio: 'Financial analyst helping others navigate career pivots and market dynamics.' },
    { id: '3', name: 'Sara Connor', industry: 'Non-Profit', skills: ['Fundraising', 'Strategy', 'Community'], gradYear: 1998, bio: 'Executive Director focused on scalable social impact initiatives.' },
    { id: '4', name: 'Alan Turing', industry: 'Tech', skills: ['AI/ML', 'Startups', 'Data Science'], gradYear: 2010, bio: 'Expert in Machine Learning and ethical AI practices.' },
    { id: '5', name: 'Priya Sharma', industry: 'Healthcare', skills: ['Biotech', 'Innovation', 'Strategy'], gradYear: 2015, bio: 'Leading research in Biotech and patient-centered solutions.' },
];

const getUniqueOptions = (key) => {
    const allValues = MOCK_MENTORS_DATA.flatMap(m => Array.isArray(m[key]) ? m[key] : [m[key]]);
    return Array.from(new Set(allValues)).filter(Boolean).sort();
};

const INDUSTRY_OPTIONS = getUniqueOptions('industry');
const SKILL_OPTIONS = getUniqueOptions('skills');

const fetchMentors = async (filters) => {
    await new Promise(resolve => setTimeout(resolve, 500)); 
    return MOCK_MENTORS_DATA.filter(mentor => {
        const matchesIndustry = !filters.industry || mentor.industry === filters.industry;
        const matchesSkill = !filters.skill || mentor.skills.includes(filters.skill);
        return matchesIndustry && matchesSkill;
    });
};

// ---------------------------------------------
// INLINE CUSTOM SELECT COMPONENT
// ---------------------------------------------

const CustomSelect = ({ label, options, selected, onChange, icon: Icon }) => {
  return (
    <Listbox value={selected} onChange={onChange}>
      <div className="relative">
        {/* Button */}
        <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-3 pl-10 pr-10 text-left shadow-md border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-opacity-75 sm:text-sm">
          {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" aria-hidden="true" />}
          <span className="block truncate font-medium text-base text-[#0A192F]">
            {selected || label}
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronsUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>

        {/* Options Panel */}
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
            {/* "All" option to clear the filter */}
            <Listbox.Option
                value=""
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                  }`
                }
            >
                All {label.split(' ').pop()} 
            </Listbox.Option>

            {/* Mapping through the provided options */}
            {options.map((option, optionIdx) => (
              <Listbox.Option
                key={optionIdx}
                className={({ active }) =>
                  `relative cursor-pointer select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-indigo-100 text-indigo-900' : 'text-gray-900'
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {option}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                        <Check className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};


// ---------------------------------------------
// MentorshipPage Component
// ---------------------------------------------

const MentorshipPage = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({ industry: '', skill: '' });

    useEffect(() => {
        setLoading(true);
        fetchMentors(filters).then((data) => {
            setMentors(data);
            setLoading(false);
        });
    }, [filters]);
    
    // Handlers for the CustomSelect component
    const handleIndustryChange = (value) => setFilters({ ...filters, industry: value });
    const handleSkillChange = (value) => setFilters({ ...filters, skill: value });

    return (
        // PRIMARY BACKGROUND: Off-White/Light Gray (#F9FAFB), Deep Navy Text (#0A192F)
        <div className="mx-auto py-20 px-16 xl:px-24 bg-[#F9FAFB] text-[#0A192F] min-h-screen"> 
            
            {/* 1. Header & Introduction */}
            <header className="mb-20"> 
                <h1 className="text-6xl font-extrabold text-[#0A192F] mb-4">
                    Alumni Mentorship Network
                </h1>
                <p className="text-2xl text-gray-600 max-w-4xl leading-relaxed">
                    Tap into the expertise of your fellow alumni or pay it forward by guiding the next generation. Our network is built on trust and professional growth.
                </p>
            </header>
            
            {/* 2. Call-to-Action Buttons - Using Indigo for the primary button */}
            <div className="flex space-x-6 mb-20"> 
                <button className="bg-indigo-100 hover:bg-indigo-200 text-[#0A192F] text-lg font-semibold py-3.5 px-10 rounded-full shadow-lg transition duration-300 border border-indigo-300 transform hover:scale-[1.02]">
                    Sign Up to Mentor &rarr;
                </button>
                <button className="border-2 border-blue-400 text-blue-500 hover:bg-blue-50 text-lg font-semibold py-3.5 px-10 rounded-full transition duration-300">
                    Mentorship Guidelines
                </button>
            </div>

            {/* 3. Search and Filter Area - USING THE NEW CUSTOM SELECTS */}
            <div className="bg-white p-10 rounded-xl shadow-xl mb-20 border border-gray-100">
                <h2 className="text-3xl font-bold mb-8 text-[#0A192F]">Find Your Mentor</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    
                    {/* Industry Filter */}
                    <CustomSelect 
                        label="Filter by Industry"
                        options={INDUSTRY_OPTIONS}
                        selected={filters.industry}
                        onChange={handleIndustryChange}
                        icon={Briefcase}
                    />

                    {/* Skill Filter */}
                    <CustomSelect 
                        label="Filter by Skill"
                        options={SKILL_OPTIONS}
                        selected={filters.skill}
                        onChange={handleSkillChange}
                        icon={Zap}
                    />
                    
                </div>
            </div>

            {/* 4. Mentor Directory */}
            <h2 className="text-4xl font-bold text-[#0A192F] mb-12">Available Mentors ({mentors.length})</h2>
            
            {loading && <p className="text-center py-12 text-gray-500">Loading mentor profiles...</p>}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {!loading && mentors.length > 0 ? (
                    mentors.map((mentor) => (
                        <MentorCard key={mentor.id} mentor={mentor} />
                    ))
                ) : (
                    !loading && (
                        <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-lg">
                            <p className="text-xl text-gray-600 font-medium">No mentors match your current filters. Try broadening your search!</p>
                        </div>
                    )
                )}
            </div>

        </div>
    );
};

export default MentorshipPage;