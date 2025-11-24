import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FFF0F5] border-t border-pink-100 text-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          <div className="space-y-8 md:col-span-1">
            <Link to="/" className="block">
              <img src="/logo.png" alt="JAANMAK LTD" className="h-28 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" />
            </Link>
            <p className="text-base text-gray-600 leading-relaxed font-light font-sans max-w-xs">
              Experience the certainty of <span className="font-medium text-pink-900">uncompromising quality</span> in every aspect of your life.
            </p>
            <div className="flex space-x-5">
              <a href="https://www.instagram.com/dr.janea_?igsh=MWdobjY4dTA3NHBiNA==" target="_blank" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-pink-400 hover:bg-pink-200 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/share/1BDrsStyPh/" target="_blank" className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-pink-400 hover:bg-pink-200 hover:text-white transition-all duration-300 shadow-sm hover:shadow-md">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold mb-8 text-gray-900 relative inline-block">
              Customer Care
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-pink-300 rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-base font-medium font-sans">
              <li><Link to="/faq" className="text-gray-600 hover:text-pink-600 hover:pl-2 transition-all duration-300 block">FAQ</Link></li>
              <li><Link to="/shipping" className="text-gray-600 hover:text-pink-600 hover:pl-2 transition-all duration-300 block">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-pink-600 hover:pl-2 transition-all duration-300 block">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold mb-8 text-gray-900 relative inline-block">
              Legal
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-pink-300 rounded-full"></span>
            </h3>
            <ul className="space-y-4 text-base font-medium font-sans">
              <li><Link to="/terms" className="text-gray-600 hover:text-pink-600 hover:pl-2 transition-all duration-300 block">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-pink-600 hover:pl-2 transition-all duration-300 block">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-serif font-bold mb-8 text-gray-900 relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-pink-300 rounded-full"></span>
            </h3>
            <ul className="space-y-5 text-base text-gray-600 font-sans">
              <li className="flex items-start group">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-400 mr-4 shadow-sm group-hover:bg-pink-50 transition-colors shrink-0">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="mt-2 group-hover:text-pink-700 transition-colors">JUNEANGELBW@GMAIL.COM</span>
              </li>
              <li className="flex items-start group">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-400 mr-4 shadow-sm group-hover:bg-pink-50 transition-colors shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="mt-2 group-hover:text-pink-700 transition-colors">+234 906 931 2431</span>
              </li>
              <li className="flex items-start group">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-pink-400 mr-4 shadow-sm group-hover:bg-pink-50 transition-colors shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="mt-2 group-hover:text-pink-700 transition-colors">10, Bentell Garden, Lokogoma, Abuja</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-pink-200 mt-20 pt-10 text-center">
          <p className="text-sm text-gray-500 font-light tracking-wide">&copy; {new Date().getFullYear()} Jaanmak Nig. Ltd. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
