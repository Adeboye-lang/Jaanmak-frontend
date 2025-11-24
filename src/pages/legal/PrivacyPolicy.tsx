import { Shield, Lock, Eye, Server } from 'lucide-react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-[#FFF9F9] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Privacy Policy</h1>
                    <p className="text-gray-500 text-lg font-light">Your trust is our priority.</p>
                </div>

                <div className="grid gap-8">
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-pink-50">
                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-pink-50 rounded-2xl text-pink-500 flex-shrink-0">
                                <Shield className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Our Commitment</h2>
                                <p className="text-gray-600 font-light leading-relaxed">
                                    At JAANMAK LTD, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-pink-50">
                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-pink-50 rounded-2xl text-pink-500 flex-shrink-0">
                                <Eye className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Information We Collect</h2>
                                <p className="text-gray-600 font-light leading-relaxed">
                                    We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support. This may include your name, email address, phone number, and shipping address.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-pink-50">
                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-pink-50 rounded-2xl text-pink-500 flex-shrink-0">
                                <Server className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                                <p className="text-gray-600 font-light leading-relaxed">
                                    We use the information we collect to process your orders, communicate with you about your account, send you promotional offers (if you opted in), and improve our services.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-pink-50">
                        <div className="flex items-start gap-6">
                            <div className="p-4 bg-pink-50 rounded-2xl text-pink-500 flex-shrink-0">
                                <Lock className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Data Security</h2>
                                <p className="text-gray-600 font-light leading-relaxed">
                                    We implement appropriate security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. We do not store full credit card numbers on our servers; payment processing is handled by our secure partner, Paystack.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
