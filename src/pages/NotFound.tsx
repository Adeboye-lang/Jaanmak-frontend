import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound: React.FC = () => {
    return (
        <div className="min-h-screen bg-[#FFF9F9] flex items-center justify-center px-4 py-20">
            <div className="max-w-2xl w-full text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-[10rem] font-serif font-bold text-pink-100 leading-none select-none">
                        404
                    </h1>
                    <div className="relative -mt-16 mb-8">
                        <h2 className="text-4xl font-serif font-bold text-gray-900">Page Not Found</h2>
                    </div>

                    <p className="text-xl text-gray-600 mb-10 max-w-md mx-auto">
                        Oops! It seems like the page you're looking for has vanished into thin air (or maybe it never existed).
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/"
                            className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-full font-bold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Back to Home
                        </Link>
                        <Link
                            to="/skincare"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 border border-gray-200 rounded-full font-bold hover:bg-pink-50 hover:border-pink-200 hover:text-pink-700 transition-all shadow-sm hover:shadow-md"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2" />
                            Browse Skincare
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
