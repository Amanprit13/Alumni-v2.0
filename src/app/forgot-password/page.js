"use client"; // This directive marks the component as a client component

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(''); // Clear previous messages
    setMessageType('');

    if (!email) {
      setMessage('Please enter your email address.');
      setMessageType('error');
      return;
    }

    // Basic email format validation
    if (!/\S+@\S+\.\S+/.test(email)) {
      setMessage('Please enter a valid email address.');
      setMessageType('error');
      return;
    }

    // Simulate password reset request
    console.log('Password reset request for:', email);
    setMessage('If your email is registered, a password reset link has been sent.');
    setMessageType('success');

    // In a real application, you would send this email to your backend
    // which would then send a password reset link to the user's email.
    setTimeout(() => {
      setEmail(''); // Clear email field
      setMessage(''); // Clear message after a while
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased">
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl p-8 space-y-8 transform transition-all duration-300 hover:scale-[1.01]">
        <div>
          <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
            Forgot Your Password?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email address below and we'll send you a link to reset your password.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {message && (
            <div className={`p-3 rounded-md text-center ${messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {message}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Send Reset Link
            </button>
          </div>
        </form>
        <div className="text-center text-sm text-gray-600">
          Remember your password?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
