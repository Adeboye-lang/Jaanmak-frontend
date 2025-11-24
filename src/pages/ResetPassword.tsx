import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, ArrowRight, CheckCircle, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { api } from '../services/api';

const ResetPassword: React.FC = () => {
   const [params] = useSearchParams();
   const navigate = useNavigate();

   const [pin, setPin] = useState('');
   const [password, setPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');
   const [showPassword, setShowPassword] = useState(false);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [success, setSuccess] = useState(false);

   const email = params.get('email');

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (!email) {
         setError('Invalid link. Please request a new password reset link.');
         return;
      }

      if (pin.length !== 6) {
         setError('Please enter a valid 6-digit PIN.');
         return;
      }

      if (password.length < 6) {
         setError('Password must be at least 6 characters long.');
         return;
      }

      if (password !== confirmPassword) {
         setError('Passwords do not match.');
         return;
      }

      setLoading(true);
      try {
         await api.auth.resetPassword(email, pin, password);
         setSuccess(true);
         setTimeout(() => {
            navigate('/login');
         }, 3000);
      } catch (err: any) {
         setError(err.message || 'Failed to reset password. Please try again.');
      } finally {
         setLoading(false);
      }
   };

   if (!email) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-[#FFF9F9] px-4">
            <div className="text-center max-w-md">
               <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-8 h-8 text-red-500" />
               </div>
               <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Invalid Link</h2>
               <p className="text-gray-600 mb-6">This password reset link is invalid or has expired.</p>
               <Link to="/forgot-password" className="text-pink-600 font-medium hover:underline">
                  Request a new link
               </Link>
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen flex bg-white">
         {/* Left Side - Form */}
         <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12 relative">
            <Link to="/" className="absolute top-8 left-8 lg:left-12">
               <img src="/logo.png" alt="JAANMAK" className="h-12 w-auto" />
            </Link>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="max-w-md w-full mx-auto"
            >
               <div className="mb-10">
                  <h1 className="text-4xl font-serif font-bold text-gray-900 mb-3">Reset Password</h1>
                  <p className="text-gray-500">Enter the PIN sent to your email and your new password.</p>
               </div>

               {success ? (
                  <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="bg-green-50 p-8 rounded-2xl text-center border border-green-100"
                  >
                     <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                     </div>
                     <h3 className="text-xl font-bold text-gray-900 mb-2">Password Reset!</h3>
                     <p className="text-gray-600 mb-6">Your password has been successfully updated. Redirecting to login...</p>
                     <Link to="/login" className="inline-flex items-center text-green-700 font-bold hover:underline">
                        Go to Login Now <ArrowRight className="ml-2 w-4 h-4" />
                     </Link>
                  </motion.div>
               ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                     {error && (
                        <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-600 text-sm">
                           <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                           <span>{error}</span>
                        </div>
                     )}

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Reset PIN</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400" />
                           </div>
                           <input
                              type="text"
                              value={pin}
                              onChange={(e) => setPin(e.target.value)}
                              maxLength={6}
                              className="block w-full pl-11 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none font-mono tracking-widest"
                              placeholder="123456"
                              required
                           />
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400" />
                           </div>
                           <input
                              type={showPassword ? "text" : "password"}
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="block w-full pl-11 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none"
                              placeholder="••••••••"
                              required
                           />
                           <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                           >
                              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                           </button>
                        </div>
                     </div>

                     <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                        <div className="relative">
                           <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Lock className="h-5 w-5 text-gray-400" />
                           </div>
                           <input
                              type={showPassword ? "text" : "password"}
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="block w-full pl-11 pr-12 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all outline-none"
                              placeholder="••••••••"
                              required
                           />
                        </div>
                     </div>

                     <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center py-4 px-6 border border-transparent rounded-xl shadow-lg text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-bold text-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                     >
                        {loading ? (
                           <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                           <>Reset Password <ArrowRight className="ml-2 w-5 h-5" /></>
                        )}
                     </button>
                  </form>
               )}
            </motion.div>
         </div>

         {/* Right Side - Image */}
         <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-pink-50">
            <img
               src="https://images.unsplash.com/photo-1556228552-523d0d4d8d75?q=80&w=2574&auto=format&fit=crop"
               alt="Skincare aesthetics"
               className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex flex-col justify-end p-16 text-white">
               <h2 className="text-4xl font-serif font-bold mb-4">Secure & Private</h2>
               <p className="text-lg text-white/90 max-w-md">
                  Your security is our priority. Reset your password to regain access to your personalized skincare journey.
               </p>
            </div>
         </div>
      </div>
   );
};

export default ResetPassword;
