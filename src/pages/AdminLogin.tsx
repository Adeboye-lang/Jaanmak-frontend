import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';

import { api } from '../services/api';

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      const userData = await api.auth.login(email, password);
      if (userData && userData.isAdmin) {
        login({ id: userData._id, name: userData.name, email: userData.email, token: userData.token, role: 'admin', isAdmin: true });
        navigate('/admin/dashboard');
      } else { setError('Access Denied'); }
    } catch (err) { setError('Invalid credentials'); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9F9] relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-rose-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <div className="max-w-md w-full bg-white/80 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(255,182,193,0.3)] border border-white/50 relative z-10">
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-pink-50 rounded-2xl mb-4">
            <img src="/logo.png" alt="Logo" className="h-12 w-auto opacity-80" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-900">Admin Portal</h2>
          <p className="text-gray-500 mt-2 font-light">Sign in to manage your store</p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm text-center font-medium animate-shake">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@jaanmak.com"
              className="w-full px-6 py-4 bg-white border border-pink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all placeholder:text-gray-300"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 ml-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-6 py-4 bg-white border border-pink-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-300 transition-all placeholder:text-gray-300"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gray-900 text-white rounded-2xl font-bold shadow-lg hover:bg-gray-800 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
          >
            {loading ? 'Authenticating...' : 'Access Dashboard'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <a href="/" className="text-sm text-gray-400 hover:text-pink-500 transition-colors">Return to Store</a>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;
