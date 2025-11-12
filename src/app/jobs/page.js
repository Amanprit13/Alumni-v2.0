"use client"; // This directive marks the component as a Client Component

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Job Card Component
const JobCard = ({ job, onSave, isSaved, openDetails }) => {
  const getJobTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'full-time':
        return 'bg-green-100 text-green-800';
      case 'part-time':
        return 'bg-blue-100 text-blue-800';
      case 'contract':
        return 'bg-purple-100 text-purple-800';
      case 'internship':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    // Check if the date is in a Firestore/MongoDB timestamp format or ISO string
    const date = dateString?.seconds ? new Date(dateString.seconds * 1000) : new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'N/A';
    }
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const isExternal = job.source && job.source !== 'Alumni';

  return (
    <div
      className={`relative p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer ${job.isFeatured ? 'bg-indigo-50 border-indigo-300' : 'bg-white'}`} 
      onClick={() => openDetails(job)}
    >
      {job.isFeatured && (
        <span className="absolute top-0 right-0 mt-4 mr-4 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full uppercase shadow">
          Featured
        </span>
      )}
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-2xl font-bold text-indigo-800">{job.title}</h2>
          <p className="text-lg text-gray-700"><strong>Company:</strong> {job.company}</p>
        </div>
        <div className="flex space-x-2 flex-wrap justify-end">
            {isExternal && (
                <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 shadow">
                    Source: {job.source}
                </span>
            )}
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${getJobTypeColor(job.jobType)}`}>
            {job.jobType}
          </span>
          <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {job.location}
          </span>
        </div>
      </div>
      <p className="text-gray-700 mb-3 line-clamp-2">{job.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">Posted: {formatDate(job.postedDate)}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSave(job.id);
          }}
          className={`px-4 py-2 text-sm rounded-full transition-colors ${isSaved ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
        >
          {isSaved ? 'Unsave' : 'Save Job'}
        </button>
      </div>
    </div>
  );
};

// Main Job Board Component
const JobBoardPage = () => {
  const [jobPostings, setJobPostings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [filterJobType, setFilterJobType] = useState('');
  const [selectedJob, setSelectedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([]);
  const [showSavedJobs, setShowSavedJobs] = useState(false);
  const [showReferralModal, setShowReferralModal] = useState(false);

  // NEW MOCK DATA: 13 jobs sourced from LinkedIn and Naukri.com
  const newExternalJobs = [
    {
        id: 'li-99001',
        title: 'Senior Full Stack Developer',
        company: 'Innovate Solutions Inc.',
        location: 'Remote (US/CAN)',
        jobType: 'Full-time',
        description: 'Lead development for our core SaaS product. Must have 5+ years experience in React and Python/Django. Join a fast-growing, fully remote team.',
        postedDate: new Date(Date.now() - 86400000).toISOString(), 
        contactEmail: 'N/A',
        isFeatured: false,
        source: 'LinkedIn',
        requirements: ['5+ years of experience', 'React, Python, Django', 'Cloud experience (AWS/Azure)'],
        externalApplyLink: 'https://linkedin.com/jobs/99001' 
    },
    {
        id: 'nk-77002',
        title: 'Data Scientist - GenAI Focus',
        company: 'Tech Mahindra',
        location: 'Bangalore, India',
        jobType: 'Contract',
        description: 'Seeking a Data Scientist with a passion for Generative AI. Develop and deploy models in a production environment. Strong statistics and machine learning background is essential.',
        postedDate: new Date(Date.now() - 43200000).toISOString(), 
        contactEmail: 'N/A',
        isFeatured: false,
        source: 'Naukri.com',
        requirements: ['3+ years in Data Science', 'Proficiency in Python and PyTorch/TensorFlow', 'Experience with LLMs'],
        externalApplyLink: 'https://naukri.com/jobs/77002'
    },
    {
        id: 'li-1030',
        title: 'Product Manager, Growth',
        company: 'FastTrack Labs',
        location: 'New York, NY',
        jobType: 'Full-time',
        description: 'Drive user acquisition and retention for a leading fintech platform. Requires 4+ years in product management, focus on A/B testing and analytics.',
        postedDate: new Date(Date.now() - (3 * 86400000)).toISOString(), 
        contactEmail: 'N/A',
        isFeatured: false,
        source: 'LinkedIn',
        externalApplyLink: 'https://linkedin.com/jobs/1030'
    },
    {
        id: 'nk-2051',
        title: 'Digital Marketing Intern',
        company: 'Wipro Technologies',
        location: 'Pune, India',
        jobType: 'Internship',
        description: 'Assist the marketing team with social media campaigns and content creation. Excellent written communication skills required. Great opportunity for recent grads.',
        postedDate: new Date(Date.now() - (1 * 86400000)).toISOString(), 
        contactEmail: 'N/A',
        isFeatured: false,
        source: 'Naukri.com',
        externalApplyLink: 'https://naukri.com/jobs/2051'
    },
    {
        id: 'li-4011',
        title: 'Cloud Security Engineer',
        company: 'AzureGuard',
        location: 'Remote (Europe)',
        jobType: 'Contract',
        description: 'Immediate contract opportunity for an expert in Azure and AWS security practices. Focus on compliance and vulnerability management.',
        postedDate: new Date(Date.now() - (7 * 86400000)).toISOString(), 
        contactEmail: 'N/A',
        isFeatured: false,
        source: 'LinkedIn',
        externalApplyLink: 'https://linkedin.com/jobs/4011'
    },
    {
        id: 'nk-6003',
        title: 'Financial Analyst - FP&A',
        company: 'HDFC Bank',
        location: 'Mumbai, India',
        jobType: 'Full-time',
        description: 'Responsible for budgeting, forecasting, and financial planning & analysis (FP&A). CA/MBA Finance qualification preferred.',
        postedDate: new Date(Date.now() - (2 * 86400000)).toISOString(), 
        contactEmail: 'N/A',
        isFeatured: false,
        source: 'Naukri.com',
        externalApplyLink: 'https://naukri.com/jobs/6003'
    },
    {
        id: 'li-7004',
        title: 'UX/UI Designer (Mid-Level)',
        company: 'DesignFlow Agency',
        location: 'London, UK',
        jobType: 'Part-time',
        description: 'Creative designer needed for part-time work on mobile and web application interfaces. Portfolio submission is mandatory.',
        postedDate: new Date(Date.now() - (5 * 86400000)).toISOString(), 
        contactEmail: 'N/A',
        isFeatured: false,
        source: 'LinkedIn',
        externalApplyLink: 'https://linkedin.com/jobs/7004'
    },
    {
        id: 'nk-8005',
        title: 'Java Developer - Core Banking',
        company: 'TCS',
        location: 'Chennai, India',
        jobType: 'Full-time',
        description: 'Hiring experienced Java developers for core banking application maintenance and new feature development. 4-7 years experience needed.',
        postedDate: new Date(Date.now() - (10 * 86400000)).toISOString(), 
        contactEmail: 'N/A',
        isFeatured: false,
        source: 'Naukri.com',
        externalApplyLink: 'https://naukri.com/jobs/8005'
    },
    {
        id: 'li-9006',
        title: 'VP of Engineering',
        company: 'ScaleUp Tech',
        location: 'San Francisco, CA',
        jobType: 'Full-time',
        description: 'Lead and scale a global engineering team. Must have prior experience managing 50+ engineers and defining technical strategy.',
        postedDate: new Date(Date.now() - (15 * 86400000)).toISOString(), 
        contactEmail: 'N/A',
        isFeatured: false,
        source: 'LinkedIn',
        externalApplyLink: 'https://linkedin.com/jobs/9006'
    },
    {
        id: 'nk-1007',
        title: 'HR Recruiter - IT Services',
        company: 'Infosys',
        location: 'Bangalore, India',
        jobType: 'Full-time',
        description: 'Talent acquisition role focused on sourcing and hiring skilled IT professionals for various projects. 2+ years of experience in IT recruitment preferred.',
        postedDate: new Date(Date.now() - (6 * 86400000)).toISOString(), 
        contactEmail: 'N/A',
        isFeatured: false,
        source: 'Naukri.com',
        externalApplyLink: 'https://naukri.com/jobs/1007'
    },
    {
        id: 'li-1108',
        title: 'Bilingual Customer Support (Spanish)',
        company: 'Global Connect',
        location: 'Dallas, TX',
        jobType: 'Part-time',
        description: 'Provide customer support via chat and email in both English and Spanish. Flexible part-time hours available.',
        postedDate: new Date(Date.now() - (4 * 86400000)).toISOString(), 
        contactEmail: 'N/A',
        isFeatured: false,
        source: 'LinkedIn',
        externalApplyLink: 'https://linkedin.com/jobs/1108'
    },
    {
        id: 'nk-1209',
        title: 'Project Coordinator',
        company: 'L&T Construction',
        location: 'Delhi NCR, India',
        jobType: 'Contract',
        description: 'Coordinate project activities, resources, and equipment. Strong organizational and time management skills are a must.',
        postedDate: new Date(Date.now() - (1 * 86400000)).toISOString(), 
        contactEmail: 'N/A',
        isFeatured: false,
        source: 'Naukri.com',
        externalApplyLink: 'https://naukri.com/jobs/1209'
    },
    {
        id: 'li-1310',
        title: 'Entry-Level Accountant',
        company: 'KPMG',
        location: 'Chicago, IL',
        jobType: 'Internship',
        description: 'A structured internship program in the audit division. Ideal for current students or recent accounting graduates.',
        postedDate: new Date(Date.now() - (2 * 86400000)).toISOString(), 
        contactEmail: 'N/A',
        isFeatured: false,
        source: 'LinkedIn',
        externalApplyLink: 'https://linkedin.com/jobs/1310'
    }
  ];

  // useEffect hook to fetch jobs from the Python backend on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Fetch internal/alumni jobs from the Python backend
        const response = await axios.get('http://localhost:5000/api/jobs'); 
        
        // Ensure internal jobs have the source property
        const internalJobs = response.data.map(job => ({ 
            ...job, 
            source: job.source || 'Alumni', 
            externalApplyLink: job.externalApplyLink || null 
        }));
                               
        // Combine internal jobs with the new external mock data
        const allJobs = internalJobs.concat(newExternalJobs);
                               
        setJobPostings(allJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
        // Fallback to only external mock jobs if backend fails
        setJobPostings(newExternalJobs);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Filtered job postings based on search term, location, and job type
  const filteredJobs = (showSavedJobs ? jobPostings.filter(job => savedJobs.includes(job.id)) : jobPostings).filter(job => {
    const matchesSearch = (job.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (job.company?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (job.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    const matchesLocation = filterLocation === '' || (job.location?.toLowerCase() || '').includes(filterLocation.toLowerCase());
    const matchesJobType = filterJobType === '' || (job.jobType?.toLowerCase() || '') === filterJobType.toLowerCase();
    
    return matchesSearch && matchesLocation && matchesJobType;
  });

  // Separate featured jobs for a dedicated section
  const featuredJobs = filteredJobs.filter(job => job.isFeatured);
  const nonFeaturedJobs = filteredJobs.filter(job => !job.isFeatured);

  const handleSaveJob = (jobId) => {
    setSavedJobs(prevSavedJobs => {
      if (prevSavedJobs.includes(jobId)) {
        return prevSavedJobs.filter(id => id !== jobId);
      } else {
        return [...prevSavedJobs, jobId];
      }
    });
  };

  const openJobDetails = (job) => {
    setSelectedJob(job);
  };

  const closeJobDetails = () => {
    setSelectedJob(null);
  };

  const handleReferral = () => {
    setShowReferralModal(true);
  };
  
  // Render loading state while data is being fetched
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-xl text-indigo-700 animate-pulse">Loading jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 font-sans text-gray-800 p-4 flex flex-col items-center">

      <div className="container mx-auto max-w-4xl bg-white rounded-xl shadow-2xl p-6 mt-8">
        <h1 className="text-4xl font-bold text-center text-indigo-700 mb-8">Alumni Job Board & External Listings</h1>

        {/* Search and Filter Section (unchanged) */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg shadow-inner flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <input
            type="text"
            placeholder="Search by title, company, or description..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <input
            type="text"
            placeholder="Filter by location (e.g., Remote, NYC)..."
            className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={filterLocation}
            onChange={(e) => setFilterLocation(e.target.value)}
          />
          <select
            className="flex-grow px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={filterJobType}
            onChange={(e) => setFilterJobType(e.target.value)}
          >
            <option value="">All Job Types</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        {/* Saved Jobs Button (unchanged) */}
        <div className="text-center mb-8">
          <button
            onClick={() => setShowSavedJobs(!showSavedJobs)}
            className={`px-8 py-3 rounded-full text-lg font-semibold transition-all shadow-lg transform hover:scale-105 ${showSavedJobs ? 'bg-indigo-600 text-white hover:bg-indigo-700' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
          >
            {showSavedJobs ? 'Show All Jobs' : `Show Saved Jobs (${savedJobs.length})`}
          </button>
        </div>

        {/* Featured Jobs Section (unchanged) */}
        {featuredJobs.length > 0 && !showSavedJobs && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">⭐ Featured Alumni Jobs ⭐</h2>
            <div className="space-y-6">
              {featuredJobs.map(job => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSave={handleSaveJob}
                  isSaved={savedJobs.includes(job.id)}
                  openDetails={openJobDetails}
                />
              ))}
            </div>
          </div>
        )}
        
        {/* Main Job Listings (unchanged) */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-indigo-700 mb-4 text-center">{showSavedJobs ? 'Your Saved Jobs' : 'All Job Listings'}</h2>
          {nonFeaturedJobs.length > 0 ? (
            nonFeaturedJobs.map(job => (
              <JobCard
                key={job.id}
                job={job}
                onSave={handleSaveJob}
                isSaved={savedJobs.includes(job.id)}
                openDetails={openJobDetails}
              />
            ))
          ) : (
            <p className="text-center text-gray-600 text-xl mt-10">
              {showSavedJobs ? 'You have no saved jobs.' : 'No job postings found matching your criteria.'}
            </p>
          )}
        </div>
      </div>

      {/* Job Details Modal - Logic updated to handle External Apply Links */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={closeJobDetails}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-3xl font-bold text-indigo-800 mb-3">{selectedJob.title}</h2>
            <p className="text-xl text-gray-700 mb-2"><strong>Company:</strong> {selectedJob.company}</p>
            <p className="text-lg text-gray-600 mb-2"><strong>Location:</strong> {selectedJob.location}</p>
            <p className="text-lg text-gray-600 mb-4"><strong>Job Type:</strong> {selectedJob.jobType}</p>
            {selectedJob.source && (
                <p className="text-lg text-red-600 mb-4">
                    <strong>Source:</strong> {selectedJob.source}
                </p>
            )}
            <p className="text-gray-700 mb-4 whitespace-pre-wrap">{selectedJob.description}</p>
            
            {selectedJob.requirements && selectedJob.requirements.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-700">Requirements:</h4>
                <ul className="list-disc list-inside text-gray-600 ml-4">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <p className="text-sm text-gray-500 mb-5">Posted: {new Date(selectedJob.postedDate).toLocaleDateString()}</p>
            
            <div className="flex space-x-4">
                {selectedJob.externalApplyLink ? (
                    // Show external link for LinkedIn/Naukri jobs
                    <a
                      href={selectedJob.externalApplyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-lg text-lg"
                    >
                      Apply on {selectedJob.source}
                    </a>
                ) : (
                    // Show mailto for internal/alumni jobs
                    <a
                      href={`mailto:${selectedJob.contactEmail}`}
                      className="inline-block bg-indigo-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-600 transition-colors shadow-md text-lg"
                    >
                      Apply Now (Email)
                    </a>
                )}
                
                {/* Referral Button only makes sense for internal network jobs */}
                {selectedJob.source === 'Alumni' && (
                    <button
                      onClick={handleReferral}
                      className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-gray-300 transition-colors shadow-md text-lg"
                    >
                      Refer an Alumni
                    </button>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Referral Modal (unchanged) */}
      {showReferralModal && selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative">
            <button
              onClick={() => setShowReferralModal(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 text-3xl font-bold"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-indigo-800 mb-4 text-center">Refer an Alumni for {selectedJob.title}</h2>
            <p className="text-center text-gray-600 mb-6">
              Share this job opportunity with a fellow alumni from your network.
            </p>
            <form className="space-y-4">
              <div>
                <label htmlFor="referralEmail" className="block text-sm font-medium text-gray-700">Recipient's Email</label>
                <input
                  type="email"
                  id="referralEmail"
                  name="referralEmail"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="alumni@email.com"
                />
              </div>
              <div>
                <label htmlFor="referralMessage" className="block text-sm font-medium text-gray-700">Message (Optional)</label>
                <textarea
                  id="referralMessage"
                  name="referralMessage"
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="e.g., 'Hey, I saw this job and thought of you!'"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md font-semibold hover:bg-indigo-700 transition-colors shadow-md"
              >
                Send Referral
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobBoardPage;