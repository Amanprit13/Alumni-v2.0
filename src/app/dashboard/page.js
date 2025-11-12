"use client"; // This directive marks the component as a Client Component

import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';

const AlumniDashboard = () => {
  // Simulated Data (can be replaced with actual backend data later)
  const [recentChats, setRecentChats] = useState([
    { id: 'chat1', sender: 'Alice', message: 'Great discussion on career paths today!', timestamp: '2024-07-17T10:30:00Z' },
    { id: 'chat2', sender: 'Bob', message: 'Anyone attending the alumni mixer next month?', timestamp: '2024-07-17T09:15:00Z' },
    { id: 'chat3', sender: 'Charlie', message: 'Looking for recommendations for a good book on leadership.', timestamp: '2024-07-16T18:00:00Z' },
  ]);

  const [upcomingEvents, setUpcomingEvents] = useState([
    { id: 'event1', name: 'Annual Alumni Gala', date: '2024-09-20', location: 'Grand Ballroom' },
    { id: 'event2', name: 'Career Networking Workshop', date: '2024-08-15', location: 'Online' },
    { id: 'event3', name: 'University Sports Day', date: '2024-10-05', location: 'Campus Stadium' },
  ]);

  const [userStats, setUserStats] = useState({
    totalAlumni: 12500,
    activeUsersLastMonth: 3500,
    newMembersThisQuarter: 150,
  });

  // Placeholder for job postings count (would come from job board data)
  const [totalJobPostings, setTotalJobPostings] = useState(5); // Example value

  // Format date for display
  const formatDate = useCallback((isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }, []);

  const formatRelativeTime = useCallback((isoString) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) return `${diffMinutes}m ago`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 font-sans text-gray-800 p-4 flex flex-col items-center">
      <Head>
        <title>Alumni Dashboard</title>
        <meta name="description" content="Alumni network overview dashboard." />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className="container mx-auto max-w-6xl bg-white rounded-xl shadow-2xl p-8 mt-8">
        <h1 className="text-4xl font-bold text-center text-purple-700 mb-10">Alumni Network Dashboard</h1>

        {/* Key Metrics Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-indigo-100 p-6 rounded-lg shadow-md border border-indigo-200 text-center">
            <h2 className="text-xl font-semibold text-indigo-800 mb-2">Total Alumni</h2>
            <p className="text-5xl font-bold text-indigo-600">{userStats.totalAlumni.toLocaleString()}</p>
          </div>
          <div className="bg-green-100 p-6 rounded-lg shadow-md border border-green-200 text-center">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Active Users (Last Month)</h2>
            <p className="text-5xl font-bold text-green-600">{userStats.activeUsersLastMonth.toLocaleString()}</p>
          </div>
          <div className="bg-yellow-100 p-6 rounded-lg shadow-md border border-yellow-200 text-center">
            <h2 className="text-xl font-semibold text-yellow-800 mb-2">New Members (This Quarter)</h2>
            <p className="text-5xl font-bold text-yellow-600">{userStats.newMembersThisQuarter}</p>
          </div>
          <div className="bg-red-100 p-6 rounded-lg shadow-md border border-red-200 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">Open Job Postings</h2>
            <p className="text-5xl font-bold text-red-600">{totalJobPostings}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Chats Section */}
          <div className="bg-blue-50 p-6 rounded-lg shadow-md border border-blue-200">
            <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Recent Chat Activity</h2>
            {recentChats.length > 0 ? (
              <div className="space-y-4">
                {recentChats.map(chat => (
                  <div key={chat.id} className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
                    <p className="font-semibold text-gray-900">{chat.sender}</p>
                    <p className="text-gray-700 text-sm mb-1">{chat.message}</p>
                    <p className="text-xs text-gray-500 text-right">{formatRelativeTime(chat.timestamp)}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 text-lg">No recent chat activity.</p>
            )}
          </div>

          {/* Upcoming Events Section */}
          <div className="bg-purple-50 p-6 rounded-lg shadow-md border border-purple-200">
            <h2 className="text-2xl font-bold text-purple-800 mb-6 text-center">Upcoming Events</h2>
            {upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="bg-white p-4 rounded-lg shadow-sm border border-purple-100">
                    <h3 className="text-lg font-semibold text-gray-900">{event.name}</h3>
                    <p className="text-gray-700 text-sm">Date: {formatDate(event.date)}</p>
                    <p className="text-gray-700 text-sm">Location: {event.location}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 text-lg">No upcoming events.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlumniDashboard;
