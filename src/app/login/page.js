"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setError('');
        // For now, redirect to a dashboard or home page
        router.push('/dashboard'); // You can create a dashboard page later
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Unable to connect to server. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            autoComplete="email"
          />
        </div>
        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            autoComplete="current-password"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit" className="submitButton" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <style jsx>{`
        .container {
          max-width: 400px;
          margin: 50px auto;
          padding: 20px;
          text-align: center;
        }

        .form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .formGroup {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .formGroup label {
          margin-bottom: 5px;
          font-weight: bold;
        }

        .formGroup input {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 16px;
        }

        .error {
          color: red;
          font-size: 14px;
        }

        .submitButton {
          padding: 10px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }

        .submitButton:hover:not(:disabled) {
          background-color: #005bb5;
        }

        .submitButton:disabled {
          background-color: #6c757d;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}