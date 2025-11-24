import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, KeyRound, CheckCircle, Loader2 } from 'lucide-react';
import { api } from '../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [pin, setPin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<'email' | 'reset'>('email');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      await api.auth.forgotPassword(email);
      setMessage('Password reset PIN sent to your email.');
      setStep('reset');
    } catch (err: any) {
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      await api.auth.resetPassword(email, pin, password);
      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#FFF9F9]">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-50 via-white to-rose-50 opacity-60 z-0"></div>
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-pink-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-rose-200/20 rounded-full blur-3xl"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-md w-full space-y-8 relative z-10"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
              className="flex justify-center mb-6"
            >
              <div className="p-4 bg-gradient-to-tr from-pink-100 to-white rounded-full shadow-lg shadow-pink-100/50 ring-1 ring-pink-50">
                <KeyRound className="w-8 h-8 text-pink-500" />
              </div>
            </motion.div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-3 tracking-tight">
              {step === 'email' ? 'Forgot Password?' : 'Reset Password'}
            </h2>
            <p className="text-gray-500 text-sm font-light leading-relaxed">
              {step === 'email'
                ? "Don't worry, it happens to the best of us. Enter your email and we'll help you recover your account."
                : "Enter the 6-digit PIN sent to your email and create a new password."}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/80 backdrop-blur-xl py-8 px-6 shadow-[0_20px_40px_rgba(255,192,203,0.2)] rounded-3xl border border-white/50"
          >
            {message && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl flex items-center text-sm">
                <CheckCircle className="h-4 w-4 mr-2 flex-shrink-0" />
                {message}
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm text-center">
                {error}
              </div>
            )}

            {step === 'email' ? (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="space-y-1 group">
                  <label htmlFor="email" className="sr-only">Email Address</label>
                  <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.01]">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white/50 border border-pink-100 rounded-xl focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-50/50 placeholder-gray-400 text-gray-900 transition-all duration-300"
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold rounded-xl shadow-lg shadow-pink-200/50 hover:shadow-xl hover:shadow-pink-300/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Send Reset PIN'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetSubmit} className="space-y-6">
                <div className="space-y-1 group">
                  <label htmlFor="pin" className="sr-only">6-Digit PIN</label>
                  <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.01]">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <KeyRound className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                    </div>
                    <input
                      id="pin"
                      type="text"
                      required
                      maxLength={6}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white/50 border border-pink-100 rounded-xl focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-50/50 placeholder-gray-400 text-gray-900 transition-all duration-300 tracking-widest font-mono text-lg"
                      placeholder="123456"
                    />
                  </div>
                </div>

                <div className="space-y-1 group">
                  <label htmlFor="password" className="sr-only">New Password</label>
                  <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.01]">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white/50 border border-pink-100 rounded-xl focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-50/50 placeholder-gray-400 text-gray-900 transition-all duration-300"
                      placeholder="New Password"
                    />
                  </div>
                </div>

                <div className="space-y-1 group">
                  <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                  <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.01]">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-pink-500 transition-colors" />
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-white/50 border border-pink-100 rounded-xl focus:outline-none focus:border-pink-300 focus:ring-4 focus:ring-pink-50/50 placeholder-gray-400 text-gray-900 transition-all duration-300"
                      placeholder="Confirm Password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold rounded-xl shadow-lg shadow-pink-200/50 hover:shadow-xl hover:shadow-pink-300/50 hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center"
                >
                  {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Reset Password'}
                </button>

                <div className="text-center pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('email')}
                    className="text-sm text-pink-600 hover:text-pink-500 font-medium"
                  >
                    Resend PIN?
                  </button>
                </div>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-pink-50 text-center">
              <Link
                to="/login"
                className="text-gray-400 hover:text-pink-600 font-medium flex items-center justify-center gap-2 transition-colors text-sm group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Login
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
            alt="Pink Silk Aesthetic"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/40 via-pink-900/10 to-transparent flex items-end p-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-white backdrop-blur-md bg-white/10 p-8 rounded-3xl border border-white/20 shadow-2xl"
          >
            <h3 className="text-4xl font-serif font-bold mb-4 leading-tight">Recover Your <br />Inner Glow</h3>
            <p className="text-lg font-light text-pink-50/90 leading-relaxed">
              Your security is our priority. We'll help you get back to your beauty journey safely and quickly.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;