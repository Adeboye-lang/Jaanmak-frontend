import { Truck, RefreshCw, MapPin, Clock } from 'lucide-react';

const ShippingReturns = () => {
    return (
        <div className="min-h-screen bg-[#FFF9F9] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Shipping & Returns</h1>
                    <p className="text-gray-500 text-lg font-light">Our policies on getting your products to you, and back if needed.</p>
                </div>

                <div className="grid gap-12">
                    {/* Shipping Section */}
                    <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-pink-50">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-pink-50 rounded-2xl text-pink-500">
                                <Truck className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-serif font-bold text-gray-900">Shipping Info</h2>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-8">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <MapPin className="w-4 h-4 text-pink-400" /> Delivery Areas
                                    </h3>
                                    <p className="text-gray-600 font-light leading-relaxed">
                                        We currently deliver to all states in Nigeria. Shipping costs vary by location and are calculated at checkout based on your delivery address.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-pink-400" /> Processing Time
                                    </h3>
                                    <p className="text-gray-600 font-light leading-relaxed">
                                        Orders are typically processed within 1-2 business days. You will receive a confirmation email once your order has been shipped with tracking information.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-pink-50/50 rounded-[2rem] p-8">
                                <h3 className="font-serif font-bold text-gray-900 mb-6">Delivery Estimates</h3>
                                <ul className="space-y-4">
                                    <li className="flex justify-between items-center border-b border-pink-100 pb-3 last:border-0 last:pb-0">
                                        <span className="font-medium text-gray-700">Lagos</span>
                                        <span className="text-pink-600 font-bold">3-5 business days</span>
                                    </li>
                                    <li className="flex justify-between items-center border-b border-pink-100 pb-3 last:border-0 last:pb-0">
                                        <span className="font-medium text-gray-700">Abuja</span>
                                        <span className="text-pink-600 font-bold">2-3 business days</span>
                                    </li>
                                    <li className="flex justify-between items-center border-b border-pink-100 pb-3 last:border-0 last:pb-0">
                                        <span className="font-medium text-gray-700">Major cities</span>
                                        <span className="text-pink-600 font-bold">3-5 business days</span>
                                    </li>
                                    <li className="flex justify-between items-center border-b border-pink-100 pb-3 last:border-0 last:pb-0">
                                        <span className="font-medium text-gray-700">Remote areas</span>
                                        <span className="text-pink-600 font-bold">5-7 business days</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-gray-100">
                            <h3 className="font-bold text-gray-900 mb-3">Shipping Costs</h3>
                            <p className="text-gray-600 font-light leading-relaxed">
                                Shipping costs are calculated based on your delivery state and the weight of your order. You can view the exact shipping cost during checkout.
                            </p>
                        </div>
                    </section>

                    {/* Returns Section */}
                    <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-pink-50">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-pink-50 rounded-2xl text-pink-500">
                                <RefreshCw className="w-6 h-6" />
                            </div>
                            <h2 className="text-3xl font-serif font-bold text-gray-900">Returns Policy</h2>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                                <p className="text-gray-600 italic text-center">
                                    "We carefully examine every product before shipping. We want you to receive the best version of our product."
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-8">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-3">Non-Returnable Items</h3>
                                    <p className="text-gray-600 font-light leading-relaxed mb-4">
                                        Due to hygiene, we cannot accept returns unless the item is defective. To qualify for exchange/repair you must:
                                    </p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center gap-2 text-gray-600 font-light">
                                            <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                                            Not open or use the product
                                        </li>
                                        <li className="flex items-center gap-2 text-gray-600 font-light">
                                            <span className="w-1.5 h-1.5 rounded-full bg-pink-400"></span>
                                            Not manipulate the product in any way
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h3 className="font-bold text-gray-900 mb-3">How to Return</h3>
                                    <ol className="space-y-3 list-decimal list-inside text-gray-600 font-light">
                                        <li>Email <span className="font-medium text-pink-600">Juneangelbw@gmail.com</span> immediately.</li>
                                        <li>We must examine the product before approval.</li>
                                        <li>If approved, you can request a replacement or store credit.</li>
                                    </ol>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">Defective Items</h3>
                                    <p className="text-gray-600 font-light text-sm leading-relaxed">
                                        Notify us within 48 hours of receipt. Complaints must be made within 7 days of delivery, and shipped back within 7 days of approval.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 mb-2">Refunds</h3>
                                    <p className="text-gray-600 font-light text-sm leading-relaxed">
                                        We do not issue cash refunds due to the hygienic nature of our products. Store credit will be issued instead.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default ShippingReturns;
