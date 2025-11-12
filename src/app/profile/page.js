"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const BACKEND_URL = 'http://localhost:5000';

  const userEmail = typeof window !== 'undefined' ? localStorage.getItem('userEmail') : null;

  const showCustomMessage = (msg, type) => {
    setMessage(msg);
    setMessageType(type);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userEmail) {
        showCustomMessage('Please log in to view your profile.', 'error');
        router.push('/login');
        return;
      }

      setMessage('');
      setMessageType('');
      setIsLoading(true);

      try {
        const response = await fetch(`${BACKEND_URL}/api/profile/${userEmail}`);
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        const data = await response.json();
        setUserData(data);
        setEditData({
          fullName: data.name,
          email: data.email,
          graduationYear: data.graduationYear,
          degreeProgram: data.degree,
          occupation: data.occupation,
          company: data.company,
          city: data.city,
          country: data.country,
          bio: data.bio,
          profilePicture: data.profilePicture,
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
        showCustomMessage('Failed to load profile. Please try again.', 'error');
        setUserData({});
        setEditData({});
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userEmail, BACKEND_URL, router]);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setMessage('');
    setMessageType('');
    setIsLoading(true);

    if (!userEmail) {
      showCustomMessage('Authentication error. Please log in again.', 'error');
      setIsLoading(false);
      return;
    }

    console.log('Sending update data:', {
      fullName: editData.fullName,
      graduationYear: editData.graduationYear,
      degreeProgram: editData.degreeProgram,
      occupation: editData.occupation,
      company: editData.company,
      city: editData.city,
      country: editData.country,
      bio: editData.bio,
      profilePicture: editData.profilePicture,
    });

    try {
      const response = await fetch(`${BACKEND_URL}/api/profile/${userEmail}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: editData.fullName,
          graduationYear: editData.graduationYear,
          degreeProgram: editData.degreeProgram,
          occupation: editData.occupation,
          company: editData.company,
          city: editData.city,
          country: editData.country,
          bio: editData.bio,
          profilePicture: editData.profilePicture,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Server response:', errorData);
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const result = await response.json();
      setUserData({
        ...editData,
        name: editData.fullName,
        degree: editData.degreeProgram,
        location: `${editData.city || ''}, ${editData.country || ''}`.trim(', '),
      });
      setIsEditing(false);
      showCustomMessage(result.message || 'Profile updated successfully!', 'success');
    } catch (error) {
      console.error('Error saving profile:', error);
      showCustomMessage('Failed to update profile. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      fullName: userData.name,
      email: userData.email,
      graduationYear: userData.graduationYear,
      degreeProgram: userData.degree,
      occupation: userData.occupation,
      company: userData.company,
      city: userData.city,
      country: userData.country,
      bio: userData.bio,
      profilePicture: userData.profilePicture,
    });
    setIsEditing(false);
    setMessage('');
    setMessageType('');
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    router.push('/login');
  };

  if (userData === null || isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
        <p className="text-xl text-gray-700">Loading profile...</p>
      </div>
    );
  }

  if (Object.keys(userData).length === 0 && messageType === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 text-center">
          <p className="text-xl text-red-700 mb-4">{message}</p>
          <Link href="/" className="font-medium text-blue-600 hover:text-blue-500">
            &larr; Back to Home
          </Link>
          <button
            onClick={() => router.push('/login')}
            className="mt-4 bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-2xl p-8 space-y-8 transform transition-all duration-300 hover:scale-[1.005]">
        <div className="flex justify-end">
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
        {showModal && (
          <div className={`p-3 rounded-md text-center ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message}
            <button
              onClick={() => setShowModal(false)}
              className="ml-4 text-sm font-medium focus:outline-none"
            >
              &times;
            </button>
          </div>
        )}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          <div className="flex-shrink-0">
            <img
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 shadow-md"
              src={userData.profilePicture}
              alt={`${userData.name}'s profile`}
              onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/128x128/ADD8E6/000000?text=User'; }}
            />
            {isEditing && (
              <input
                type="text"
                name="profilePicture"
                placeholder="Profile Picture URL"
                value={editData.profilePicture || ''}
                onChange={handleEditChange}
                className="mt-3 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
              {userData.name || 'Unknown User'}
            </h1>
            <p className="text-lg text-gray-700 mb-1">{userData.occupation || 'Occupation'} at {userData.company || 'Company'}</p>
            <p className="text-md text-gray-600 mb-4">{userData.location || 'Location'}</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Alumni</span>
              <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">{userData.graduationYear || 'Year'}</span>
              <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">{userData.degree || 'Degree'}</span>
            </div>
            <p className="text-gray-800 leading-relaxed max-w-prose">
              {userData.bio || 'No bio available.'}
            </p>
            <div className="mt-6">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
                >
                  Edit Profile
                </button>
              ) : (
                <div className="space-x-4">
                  <button
                    onClick={handleSave}
                    className="bg-green-600 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      'Save Changes'
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-400 text-white font-semibold py-2 px-6 rounded-full shadow-md hover:bg-gray-500 transition-all duration-300 transform hover:scale-105"
                    disabled={isLoading}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {isEditing && editData && (
          <div className="mt-8 pt-8 border-t border-gray-200 space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800">Edit Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="editFullName" className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  id="editFullName"
                  name="fullName"
                  value={editData.fullName || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="editEmail" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="editEmail"
                  name="email"
                  value={editData.email || ''}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed sm:text-sm"
                  disabled
                />
              </div>
              <div>
                <label htmlFor="editGraduationYear" className="block text-sm font-medium text-gray-700">Graduation Year</label>
                <input
                  type="text"
                  id="editGraduationYear"
                  name="graduationYear"
                  value={editData.graduationYear || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="editDegreeProgram" className="block text-sm font-medium text-gray-700">Degree/Program</label>
                <input
                  type="text"
                  id="editDegreeProgram"
                  name="degreeProgram"
                  value={editData.degreeProgram || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="editOccupation" className="block text-sm font-medium text-gray-700">Occupation</label>
                <input
                  type="text"
                  id="editOccupation"
                  name="occupation"
                  value={editData.occupation || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="editCompany" className="block text-sm font-medium text-gray-700">Company</label>
                <input
                  type="text"
                  id="editCompany"
                  name="company"
                  value={editData.company || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="editCity" className="block text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  id="editCity"
                  name="city"
                  value={editData.city || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={isLoading}
                />
              </div>
              <div>
                <label htmlFor="editCountry" className="block text-sm font-medium text-gray-700">Country</label>
                <input
                  type="text"
                  id="editCountry"
                  name="country"
                  value={editData.country || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={isLoading}
                />
              </div>
              <div className="md:col-span-2">
                <label htmlFor="editBio" className="block text-sm font-medium text-gray-700">Bio</label>
                <textarea
                  id="editBio"
                  name="bio"
                  rows="3"
                  value={editData.bio || ''}
                  onChange={handleEditChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  disabled={isLoading}
                ></textarea>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-800 font-medium">Attended "Alumni Reunion 2024"</p>
              <p className="text-gray-600 text-sm">June 15, 2024</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-800 font-medium">Posted a new article on "Future of AI"</p>
              <p className="text-gray-600 text-sm">May 20, 2024</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/" className="font-medium text-blue-600 hover:text-blue-500">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}