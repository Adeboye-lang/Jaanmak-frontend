import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { api } from '../services/api';


const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showVerification, setShowVerification] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [verificationPin, setVerificationPin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic Validation
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      if (isLogin) {
        const userData = await api.auth.login(email, password);
        const user = { id: userData._id, name: userData.name, email: userData.email, token: userData.token, role: userData.isAdmin ? 'admin' as const : 'customer' as const, isAdmin: userData.isAdmin, address: userData.address, city: userData.city, state: userData.state, phone: userData.phone };
        login(user);
        if (user.role === 'admin') navigate('/admin/dashboard'); else navigate('/');
      } else {
        // Registration Flow
        if (!name.trim()) {
          setError("Full Name is required.");
          setLoading(false);
          return;
        }
        await api.auth.register({ name, email, password });
        setShowVerification(true);
        setLoading(false);
      }
    } catch (err: any) {
      console.error("Auth error:", err);
      setError(err.message || (isLogin ? "Invalid email or password." : "Registration failed."));
      setLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userData = await api.auth.verifyEmail(email, verificationPin);
      const user = { id: userData._id, name: userData.name, email: userData.email, token: userData.token, role: userData.isAdmin ? 'admin' as const : 'customer' as const, isAdmin: userData.isAdmin, address: userData.address, city: userData.city, state: userData.state, phone: userData.phone };
      login(user);
      if (user.role === 'admin') navigate('/admin/dashboard'); else navigate('/');
    } catch (err: any) {
      setError(err.message || "Verification failed.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-16 bg-gradient-to-br from-pink-50 via-white to-rose-50">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2 tracking-tight">
              {showVerification ? 'Verify Email' : (isLogin ? 'Welcome Back' : 'Join Our Family')}
            </h2>
            <p className="text-gray-500 text-sm font-light">
              {showVerification
                ? `We sent a PIN to ${email}. Please enter it below.`
                : (isLogin ? 'We missed you! Please sign in.' : 'Create an account to start your journey.')}
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm text-center animate-fade-in">
              {error}
            </div>
          )}

          {showVerification ? (
            <form className="mt-8 space-y-6" onSubmit={handleVerification}>
              <div className="space-y-1">
                <input
                  type="text"
                  placeholder="Enter 6-digit PIN"
                  value={verificationPin}
                  onChange={e => setVerificationPin(e.target.value)}
                  maxLength={6}
                  className="w-full px-6 py-4 bg-white border border-pink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent placeholder-gray-400 text-center text-2xl tracking-widest transition-all duration-300"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </button>
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setShowVerification(false)}
                  className="text-sm text-gray-500 hover:text-pink-600"
                >
                  Back to Login
                </button>
              </div>
            </form>
          ) : (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="space-y-1">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-6 py-4 bg-white border border-pink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent placeholder-gray-400 transition-all duration-300"
                  />
                </div>
              )}
              <div className="space-y-1">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-6 py-4 bg-white border border-pink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent placeholder-gray-400 transition-all duration-300"
                />
              </div>
              <div className="space-y-1">
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-6 py-4 bg-white border border-pink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-transparent placeholder-gray-400 transition-all duration-300"
                />
              </div>

              {isLogin && (
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-pink-500 hover:text-pink-600 text-sm font-medium transition-colors"
                  >
                    Forgot Password?
                  </Link>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></span>
                    <span className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></span>
                  </span>
                ) : (isLogin ? 'Sign In' : 'Create Account')}
              </button>
            </form>
          )}

          {!showVerification && (
            <div className="mt-8 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-gray-500 hover:text-pink-600 transition-colors text-sm"
              >
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <span className="font-bold underline decoration-pink-300 underline-offset-4">
                  {isLogin ? 'Sign Up' : 'Log In'}
                </span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=2070&auto=format&fit=crop"
          alt="Skincare Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-900/60 to-transparent flex items-end p-16">
          <div className="text-white">
            <h3 className="text-4xl font-serif font-bold mb-4">Unlock Your Natural Glow</h3>
            <p className="text-lg font-light opacity-90">Experience the transformative power of premium skincare designed just for you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
