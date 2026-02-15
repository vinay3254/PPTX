import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [step, setStep] = useState('email'); // email → otp → reset → success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  // ===============================
  // STEP 1 — SEND OTP
  // ===============================
  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/auth/forgot-password', { email });
      setMessage('OTP sent to your email.');
      setStep('otp');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // STEP 2 — VERIFY OTP
  // ===============================
  const handleOtpSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const response = await api.post('/auth/verify-otp', { email, otp });

    if (response.data.verified) {
      localStorage.setItem(`otp_${email}`, otp);
      setStep('reset');
    } else {
      setError('Invalid OTP');
    }

  } catch (err) {
    setError(err.response?.data?.message || 'Invalid OTP');
  } finally {
    setLoading(false);
  }
};


  // ===============================
  // STEP 3 — RESET PASSWORD
  // ===============================
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await api.post('/auth/reset-password', {
        email,
        otp,
        newPassword
      });

      setStep('success');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: 'var(--primary-dark)' }}>
      <div className="max-w-md w-full">
        <div className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg p-8">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold" style={{ color: 'var(--accent-gold)' }}>
              Reset Password
            </h2>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">
              {message}
            </div>
          )}

          {/* ========================= */}
          {/* SUCCESS SCREEN */}
          {/* ========================= */}
          {step === 'success' && (
            <div className="text-center">
              <div className="bg-green-100 text-green-700 px-4 py-3 rounded mb-4">
                Password reset successfully! You can now login.
              </div>
              <Link to="/login" className="btn-primary px-6 py-2 rounded">
                Go to Login
              </Link>
            </div>
          )}

          {/* ========================= */}
          {/* RESET PASSWORD STEP */}
          {/* ========================= */}
          {step === 'reset' && (
            <form onSubmit={handlePasswordReset} className="space-y-6">

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded"
                required
              />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </form>
          )}

          {/* ========================= */}
          {/* OTP STEP */}
          {/* ========================= */}
          {step === 'otp' && (
            <form onSubmit={handleOtpSubmit} className="space-y-6">

              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded text-center tracking-widest"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </form>
          )}

          {/* ========================= */}
          {/* EMAIL STEP */}
          {/* ========================= */}
          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-6">

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 text-white rounded"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3"
              >
                {loading ? 'Sending...' : 'Send OTP'}
              </button>
            </form>
          )}

          {step !== 'success' && (
            <div className="mt-6 text-center">
              <Link to="/login" className="text-blue-400">
                Back to Login
              </Link>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
