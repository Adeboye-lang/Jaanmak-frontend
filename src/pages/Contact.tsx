import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Send, Loader2, AlertCircle, CheckCircle2, HelpCircle, Truck, } from 'lucide-react';
import { api } from '../services/api';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await api.contact.send(formData);
      setSubmitted(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to send message. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F9] font-sans relative overflow-hidden">
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-pink-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10 animate-blob"></div>
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-orange-100/40 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -z-10 animate-blob animation-delay-2000"></div>

      {/* Header Section */}
      <div className="relative bg-white/50 backdrop-blur-sm border-b border-pink-100 pt-20 pb-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="text-pink-600 font-bold tracking-[0.3em] uppercase text-xs mb-4 block animate-fade-in">Get In Touch</span>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-gray-900 mb-6">We're Here For You</h1>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed">
            Whether you have a question about our products, need skincare advice, or just want to share your journey, we are listening.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 mb-24 relative z-10">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-pink-100/50 border border-white overflow-hidden flex flex-col lg:flex-row">

          {/* Contact Information Side */}
          <div className="lg:w-2/5 bg-gray-900 text-white p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-pink-600 rounded-full mix-blend-overlay filter blur-3xl opacity-20"></div>

            <div className="relative z-10 h-full flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-serif font-bold mb-8">Contact Information</h2>
                <p className="text-gray-300 font-light mb-12 leading-relaxed">
                  Reach out to us directly or fill out the form. We ensure every message is handled with care.
                </p>

                <div className="space-y-8">
                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-pink-600 transition-colors duration-300">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Phone</h3>
                      <p className="text-gray-300 font-light">+234 906 931 2431</p>
                      <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9am - 6pm</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-pink-600 transition-colors duration-300">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Email</h3>
                      <p className="text-gray-300 font-light break-all">JUNEANGELBW@GMAIL.COM</p>
                      <p className="text-xs text-gray-500 mt-1">We reply within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-pink-600 transition-colors duration-300">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Location</h3>
                      <p className="text-gray-300 font-light">10, Bentell Garden, Lokogoma,<br />Abuja, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-8 border-t border-white/10">
                <h4 className="font-serif font-bold mb-4 text-pink-400">Quick Support</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <Link to="/faq" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <HelpCircle className="h-4 w-4" /> FAQ
                  </Link>
                  <Link to="/shipping" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <Truck className="h-4 w-4" /> Shipping Info
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:w-3/5 p-10 md:p-16 bg-white">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center animate-fade-in">
                <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-8 shadow-sm animate-bounce">
                  <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>
                <h3 className="text-3xl font-serif font-bold text-gray-900 mb-4">Message Received</h3>
                <p className="text-gray-500 mb-10 leading-relaxed max-w-md mx-auto">
                  Thank you for contacting JAANMAK. We have sent a confirmation to your email and will be in touch shortly.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: '', email: '', message: '' }); }}
                  className="px-10 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-pink-600 transition-all shadow-lg hover:shadow-pink-200"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mb-2">Send us a Message</h3>
                  <p className="text-gray-500 font-light">Fill out the form below and we'll get back to you.</p>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1 group-focus-within:text-pink-600 transition-colors">Your Name</label>
                    <input
                      required
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border-b-2 border-gray-200 px-4 py-3 focus:border-pink-500 outline-none transition-all bg-transparent placeholder-gray-300 text-gray-900 text-lg"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1 group-focus-within:text-pink-600 transition-colors">Email Address</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border-b-2 border-gray-200 px-4 py-3 focus:border-pink-500 outline-none transition-all bg-transparent placeholder-gray-300 text-gray-900 text-lg"
                      placeholder="jane@example.com"
                    />
                  </div>
                </div>

                <div className="group">
                  <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2 ml-1 group-focus-within:text-pink-600 transition-colors">Your Message</label>
                  <textarea
                    required
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-2xl px-6 py-4 focus:ring-2 focus:ring-pink-100 focus:border-pink-400 outline-none transition-all bg-gray-50 focus:bg-white resize-none placeholder-gray-300 text-gray-900"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-5 bg-gray-900 text-white font-bold rounded-2xl hover:bg-pink-600 transition-all shadow-xl hover:shadow-pink-200 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-lg"
                  >
                    {loading ? <Loader2 className="animate-spin h-5 w-5" /> : <Send className="h-5 w-5" />}
                    {loading ? 'Sending Message...' : 'Send Message'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Contact;