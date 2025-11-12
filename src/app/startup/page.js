"use client";
import React, { useState, useEffect, useRef } from 'react';
import {
  Users, Calendar, Heart, GraduationCap, ArrowRight, Menu, X, LogIn,
  Briefcase, MapPin, CalendarDays, Link2, DollarSign, Rocket, BookOpenText // Lucide Icons
} from 'lucide-react';

// -
// 1. Custom Hook for Scroll Animation (Intersection Observer)
// -

const useInView = (options) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        // Optionally stop observing once it's visible
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


// -
// 2. Utility Components (Using the Hook)
// -

/**
 * Feature Card Component: Clean, Lifted Effect
 */
/**
 * Feature Card Component: Clean, Lifted Effect (UPDATED TO ACCEPT href)
 */
const FeatureCard = ({ icon: Icon, title, description, delay = 0, href }) => { // < ADDED href HERE
    const [ref, inView] = useInView({ threshold: 0.1 });
    const animationClass = inView ? `animate-fade-in-up delay-${delay}` : 'opacity-0';

    return (
        <div 
            ref={ref}
            className={`bg-white p-8 rounded-2xl shadow-xl transition-all duration-500 transform hover:translate-y-[-8px] hover:shadow-2xl group border border-transparent hover:border-indigo-400 ${animationClass}`}
        >
            <div className="text-indigo-600 mb-6 text-5xl flex justify-center">
                <div className="p-4 bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors duration-300">
                    <Icon className="h-10 w-10" />
                </div>
            </div>
            <h3 className="text-xl font-extrabold text-neutral-900 mb-3 text-center tracking-tight">{title}</h3>
            <p className="text-neutral-500 text-center text-base font-light">{description}</p>
            {/* USE THE href PROP HERE: */}
            <a href={href} className="mt-5 inline-flex items-center justify-center w-full text-indigo-600 font-semibold group-hover:text-indigo-700 transition duration-300 text-sm">
                Explore <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
            </a>
        </div>
    );
};
/**
 * Testimonial Card Component: Clean Border Accent
 */
const TestimonialCard = ({ quote, name, title, year, avatarUrl, delay = 0 }) => {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const animationClass = inView ? `animate-fade-in-up delay-${delay}` : 'opacity-0';

  return (
    <div
      ref={ref}
      className={`bg-white p-7 rounded-2xl shadow-lg border-t-6 border-teal-500/70 transform hover:shadow-2xl hover:translate-y-[-4px] transition-all duration-300 flex flex-col h-full ${animationClass}`}
    >
      <p className="text-neutral-700 mb-6 italic leading-relaxed text-base font-light">"{quote}"</p>
      <div className="flex items-center mt-auto">
        <img src={avatarUrl} alt={name} className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-teal-300" />
        <div>
          <h4 className="font-bold text-teal-800 tracking-tight">{name}</h4>
          <p className="text-xs text-neutral-500 font-medium">| {title} | Class of {year}</p>
        </div>
      </div>
    </div>
  );
};

/**
 * Event Card Component: Enhanced Focus on Date/Details
 */
const EventCard = ({ title, date, location, delay = 0 }) => {
  const [ref, inView] = useInView({ threshold: 0.2 });
  const animationClass = inView ? `animate-fade-in-up delay-${delay}` : 'opacity-0';

  return (
    <div
      ref={ref}
      className={`bg-white p-6 rounded-2xl shadow-lg border border-neutral-200 hover:shadow-xl transition-all duration-300 flex flex-col h-full hover:border-teal-500 ${animationClass}`}
    >
      <h4 className="text-xl font-bold text-neutral-900 mb-4 leading-snug tracking-tight">{title}</h4>
      <div className="mt-auto space-y-3">
        <p className="text-neutral-600 text-sm flex items-center font-medium">
          <CalendarDays className="h-4 w-4 mr-3 text-teal-500 flex-shrink-0" />
          <span className="text-neutral-800">{date}</span>
        </p>
        <p className="text-neutral-600 text-sm flex items-center font-medium">
          <MapPin className="h-4 w-4 mr-3 text-indigo-500 flex-shrink-0" />
          {location}
        </p>
      </div>
      <button className="mt-6 w-full bg-neutral-100 text-neutral-800 text-sm font-semibold py-3 rounded-lg hover:bg-teal-50 hover:text-teal-600 transition-colors duration-300">
        Register Now
      </button>
    </div>
  );
};

/**
 * Startup Spotlight Card Component: Modern Logo Hover
 */
const StartupSpotlightCard = ({ name, founder, round, logoUrl, delay = 0 }) => {
  const [ref, inView] = useInView({ threshold: 0.5 });
  const animationClass = inView ? `animate-fade-in-up delay-${delay}` : 'opacity-0';

  return (
    <div
      ref={ref}
      className={`bg-white p-5 rounded-xl shadow-md border border-neutral-200 hover:border-amber-500 transition-all duration-300 flex flex-col justify-between items-center text-center group transform hover:scale-[1.05] ${animationClass}`}
    >
      <img src={logoUrl} alt={name} className="w-16 h-16 object-contain mb-3 filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-80 group-hover:opacity-100" />
      <h4 className="text-lg font-extrabold text-neutral-900 leading-tight tracking-tight">{name}</h4>
      <p className="text-xs text-neutral-500 mt-1 mb-3 font-light">{founder}</p>
      <span className="inline-block px-3 py-1 text-xs font-bold rounded-lg bg-amber-100 text-amber-700">
        {round}
      </span>
    </div>
  );
};


// -
// 3. Data & Main Component
// -

const App = () => {
  // Data placeholders
  const icons = {
    connect: Users,
    events: Calendar,
    career: Briefcase,
  };

  const testimonials = [
    {
      quote: "AlumniConnect helped me land my dream job through a connection with a fellow graduate. The network is incredibly powerful!",
      name: "Jane Doe",
      title: "Software Engineer",
      year: "2015",
      avatarUrl: "https://placehold.co/256x256/7c3aed/ffffff?text=JD"
    },
    {
      quote: "I reconnected with my roommate from college after 10 years! It's amazing to have a platform dedicated to our community.",
      name: "John Smith",
      title: "Marketing Manager",
      year: "2013",
      avatarUrl: "https://placehold.co/256x256/10b981/ffffff?text=JS"
    },
    {
      quote: "The career resources and mentorship program are top-notch. I highly recommend this platform to all graduates.",
      name: "Emily White",
      title: "Product Designer",
      year: "2018",
      avatarUrl: "https://placehold.co/256x256/f97316/ffffff?text=EW"
    }
  ];

  const upcomingEvents = [
    { title: "Annual Alumni Gala", date: "October 15, 2025", location: "Grand Ballroom, City Center" },
    { title: "Career Workshop: Future-Proof Your Skills", date: "November 5, 2025", location: "Online Webinar" },
    { title: "Class of 2010 Reunion", date: "December 1, 2025", location: "Campus Main Hall" },
  ];

  const alumniStartups = [
    { name: "Innovate Labs", founder: "Dr. Anya Sharma", round: "Series A", logoUrl: "https://placehold.co/100x100/374151/ffffff?text=IL" },
    { name: "Quantum Core", founder: "Mark Chen", round: "Seed Funding", logoUrl: "https://placehold.co/100x100/374151/ffffff?text=QC" },
    { name: "EcoBridge", founder: "Sarah Khan", round: "Pre-Seed", logoUrl: "https://placehold.co/100x100/374151/ffffff?text=EB" },
    { name: "FinTech Pro", founder: "David Lee", round: "Series B", logoUrl: "https://placehold.co/100x100/374151/ffffff?text=FP" },
  ];

  const alumniSpotlight = {
    name: "Dr. Anya Sharma",
    classYear: "2005",
    occupation: "Lead Research Scientist, Innovate Labs",
    quote: "The connections I made through the alumni network were instrumental in funding my most critical research. This community is a springboard for innovation.",
    imageUrl: "https://placehold.co/800x800/4f46e5/ffffff?text=Anya+Sharma"
  };

  const [spotlightRef, spotlightInView] = useInView({ threshold: 0.3 });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.5 });


  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-800">

      {/* Global styles for Inter font and smooth scrolling */}
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        body { font-family: 'Inter', sans-serif; }
        
        /* New definition to make animation reusable and delayed */
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        /* Tailwind delay utilities for scroll effects */
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
      `}</style>

      {/************************************
        1. Hero Section (Immediate Animation)
      ************************************/}
      <section className="relative flex flex-col items-center justify-center py-32 md:py-48 px-6 text-center bg-gradient-to-br from-indigo-50 to-neutral-50 overflow-hidden">
        <div className="container mx-auto max-w-6xl relative z-10">
          <span className="inline-block px-4 py-1 mb-4 text-xs font-bold uppercase tracking-widest rounded-full bg-teal-100 text-teal-700 animate-fade-in-up">
            Your Global Alumni Network
          </span>
          <h1 className="text-6xl md:text-8xl font-extrabold leading-none text-neutral-900 mb-6 tracking-tighter animate-fade-in-up delay-100">
            Connect, <span className="text-indigo-600">Innovate,</span> Grow.
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 mb-14 max-w-4xl mx-auto font-light animate-fade-in-up delay-200">
            Access exclusive career opportunities, fuel alumni ventures, and stay linked to the community that shaped you.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 animate-fade-in-up delay-300">
            <a href="#innovation-section" className="bg-indigo-600 text-white px-10 py-4 rounded-lg text-xl font-extrabold hover:bg-indigo-700 transition-all shadow-xl transform hover:scale-[1.03] active:scale-100">
              Explore Startups
            </a>
            <a href="#events-section" className="bg-white text-indigo-600 border-2 border-indigo-600 px-10 py-4 rounded-lg text-xl font-extrabold hover:bg-indigo-50 transition-all shadow-xl transform hover:scale-[1.03] active:scale-100">
              Upcoming Events
            </a>
          </div>
        </div>
      </section>

      

      {/************************************
        2. Upcoming Events Section 
      ************************************/}
      <section className="py-24 px-6 bg-neutral-100" id="events-section">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-extrabold text-center text-neutral-900 mb-4 tracking-tight">
            Don't Miss Out
          </h2>
          <p className="text-lg text-center text-neutral-600 mb-16 max-w-3xl mx-auto font-light">
            Your calendar of the next three chapter meetings, reunions, and professional webinars.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <EventCard key={index} {...event} delay={index * 100} />
            ))}
          </div>
          <div className="text-center mt-16">
            <a href="/events" className="inline-flex items-center bg-teal-600 text-white px-10 py-4 rounded-lg text-xl font-bold hover:bg-teal-700 transition-all shadow-xl transform hover:scale-[1.02]">
              View All 50+ Events
              <ArrowRight className="w-5 h-5 ml-3" />
            </a>
          </div>
        </div>
      </section>

      

      {/************************************
        3. Features Section (Value Proposition)
      ************************************/}
      <section className="py-24 px-6 bg-white" id="features-section">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-extrabold text-center text-neutral-900 mb-4 tracking-tight">
            Your Three Keys to Success
          </h2>
          <p className="text-lg text-center text-neutral-600 mb-16 max-w-3xl mx-auto font-light">
            Leverage the power of your lifelong alumni community with these core benefits.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
           <FeatureCard
    icon={icons.connect}
    title="Global Directory"
    description="Find and connect with classmates, mentors, and industry leaders by location, company, or graduation year."
    href="../directory" /* CORRECTED: Use /directory for application root */
    delay={0}
/>
            <FeatureCard
              icon={icons.events}
              title="Lifelong Learning"
              description="Access exclusive webinars, skill-building workshops, and premium content to stay ahead in your field."
              href="../LearningResources"
              delay={100}
            />
            <FeatureCard
              icon={icons.career}
              title="Mentorship Access"
              description="Join our official mentorship program, both as a mentee seeking guidance or a seasoned professional giving back."
              href="../mentorship"
              delay={200}
            />
          </div>
        </div>
      </section>

      

      {/************************************
        4. Alumni Founders & Innovation (Startup Hub)
      ************************************/}
      <section className="py-24 px-6 bg-neutral-100 text-neutral-800" id="innovation-section">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-5xl font-extrabold text-center mb-4 text-amber-700 tracking-tighter">
            Fueling the Next Generation of Startups
          </h2>
          <p className="text-xl text-center text-neutral-600 mb-16 max-w-4xl mx-auto font-light">
            Connect with investors, secure funding, and find specialized talent within our dedicated startup ecosystem.
          </p>

          {/* Startup Portfolio/Showcase */}
          <h3 className="text-2xl font-bold text-center text-neutral-900 mb-8 pt-8 border-t border-neutral-300">
            Alumni Fund Portfolio Highlights
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-16">
            {alumniStartups.map((startup, index) => (
              <StartupSpotlightCard key={index} {...startup} delay={index * 100} />
            ))}
          </div>
          {/* End Startup Portfolio/Showcase */}


          {/* Startup Action Cards (No need for delay props here, let's keep it simple) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {/* Startup Funding Card (Primary Amber Accent) */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-8 border-amber-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl">
              <div className="text-amber-600 mb-5 flex items-center justify-center">
                <Rocket className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-extrabold text-neutral-900 mb-3 text-center tracking-tight">Alumni Seed Fund</h3>
              <p className="text-neutral-600 text-center mb-8 font-light">Access the exclusive Seed Fund and Pitch Competition designed to back high-potential ventures.</p>
              <button className="w-full bg-amber-500 text-neutral-900 px-8 py-3 rounded-lg text-lg font-bold hover:bg-amber-600 transition-all shadow-lg">
                Apply for Funding
              </button>
            </div>

            {/* Investor/Mentor Network Card (Indigo Accent) */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-8 border-indigo-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl">
              <div className="text-indigo-600 mb-5 flex items-center justify-center">
                <DollarSign className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-extrabold text-neutral-900 mb-3 text-center tracking-tight">Mentor & Investor Network</h3>
              <p className="text-neutral-600 text-center mb-8 font-light">Browse successful alumni mentors and angel investors dedicated to guiding the next wave of innovators.</p>
              <button className="w-full bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-indigo-700 transition-all shadow-lg">
                Connect with Mentors
              </button>
            </div>

            {/* Startup Resources Card (Teal Accent - Funnel to Job Board) */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border-t-8 border-teal-500 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl">
              <div className="text-teal-600 mb-5 flex items-center justify-center">
                <BookOpenText className="h-12 w-12" />
              </div>
              <h3 className="text-2xl font-extrabold text-neutral-900 mb-3 text-center tracking-tight">Startup Talent & Resources</h3>
              <p className="text-neutral-600 text-center mb-8 font-light">Find top alumni talent on our dedicated Job Board and access essential software discounts and legal templates.</p>
              <a href="/job-board" className="w-full bg-teal-500 text-white px-8 py-3 rounded-lg text-lg font-bold hover:bg-teal-600 transition-all shadow-lg inline-flex items-center justify-center">
                Visit Job Board <Briefcase className="w-5 h-5 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      

      {/************************************
        5. Alumni Testimonials Section 
      ************************************/}
      <section className="py-24 px-6 bg-teal-50">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-4xl font-extrabold text-center text-neutral-900 mb-4 tracking-tight">
            The Power of Community
          </h2>
          <p className="text-lg text-center text-neutral-600 mb-16 max-w-3xl mx-auto font-light">
            Hear directly from members who have leveraged the network to transform their careers and lives.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} delay={index * 100} />
            ))}
          </div>
        </div>
      </section>

      

      {/************************************
        6. Alumni Spotlight Section 
      ************************************/}
      <section className="py-24 px-6 bg-white">
        <div ref={spotlightRef} className={`container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-12 items-center gap-16 transition-opacity duration-1000 ${spotlightInView ? 'opacity-100' : 'opacity-0'}`}>

          <div className="md:col-span-4 flex justify-center order-1 md:order-1 animate-fade-in-up">
            <div className="p-2 bg-indigo-500 rounded-full shadow-2xl transition-transform duration-500 hover:scale-105">
              <img
                src={alumniSpotlight.imageUrl}
                alt={alumniSpotlight.name}
                className="rounded-full w-72 h-72 md:w-80 md:h-80 object-cover"
              />
            </div>

          </div>

          <div className="md:col-span-8 order-2 md:order-2 text-center md:text-left">
            <span className="text-lg font-extrabold uppercase tracking-wider text-teal-600 block mb-3 animate-fade-in-up delay-100">Featured Alumna</span>
            <h2 className="text-5xl font-extrabold text-neutral-900 mb-4 tracking-tighter animate-fade-in-up delay-200">{alumniSpotlight.name}</h2>
            <p className="text-xl font-bold text-indigo-500 mb-8 animate-fade-in-up delay-300">{alumniSpotlight.occupation} (Class of {alumniSpotlight.classYear})</p>
            <blockquote className="border-l-4 border-amber-500 pl-6 py-4 bg-neutral-50 rounded-r-lg shadow-inner animate-fade-in-up delay-400">
              <p className="text-2xl italic text-neutral-700 leading-snug font-medium">"{alumniSpotlight.quote}"</p>
            </blockquote>
            <a href="#" className="mt-8 inline-flex items-center text-indigo-600 font-extrabold group text-lg hover:text-indigo-700 transition animate-fade-in-up delay-500">
              Read Her Full Success Story
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition duration-200" />
            </a>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default App;