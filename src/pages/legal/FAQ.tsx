import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: "How do I track my order?",
            answer: "You can track your order by visiting our Dashboard > Track Order page and entering your order number. You will also receive tracking information via email once your order ships."
        },
        {
            question: "What payment methods do you accept?",
            answer: "We accept all major credit cards, debit cards, and bank transfers. Payment is processed securely through our payment gateway, Paystack."
        },
        {
            question: "Do you ship internationally?",
            answer: (
                <span>
                    Currently, we primarily ship within Nigeria. However, residents outside Nigeria who wish to make an order should message us via Whatsapp at <span className="text-pink-600 font-bold">+234 906 931 2431</span> or send an email to <span className="text-pink-600 font-bold">JUNEANGELBW@GMAIL.COM</span>.
                </span>
            )
        },
        {
            question: "How can I contact customer service?",
            answer: "You can reach our customer service team via email at JUNEANGELBW@GMAIL.COM or call us at +234 906 931 2431. You can also use our contact form on the Contact page."
        },
        {
            question: "What is your return policy?",
            answer: "We accept returns within 14 days of delivery for defective items. Please visit our Shipping & Returns page for more details on eligibility."
        }
    ];

    return (
        <div className="min-h-screen bg-[#FFF9F9] py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-pink-100 text-pink-500 mb-6">
                        <HelpCircle className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">Help Center</h1>
                    <p className="text-gray-500 text-lg font-light">Everything you need to know about our products and services.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${openIndex === index ? 'border-pink-200 shadow-[0_10px_40px_rgba(255,182,193,0.2)]' : 'border-white shadow-sm hover:border-pink-100'}`}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full px-8 py-6 text-left flex items-center justify-between focus:outline-none"
                            >
                                <span className={`font-serif font-bold text-lg ${openIndex === index ? 'text-pink-600' : 'text-gray-800'}`}>
                                    {faq.question}
                                </span>
                                <span className={`ml-6 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-pink-500' : 'text-gray-400'}`}>
                                    <ChevronDown className="w-5 h-5" />
                                </span>
                            </button>
                            <div
                                className={`transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <div className="px-8 pb-8 text-gray-600 leading-relaxed font-light">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center bg-white/60 backdrop-blur-sm rounded-[2rem] p-8 border border-white shadow-sm">
                    <p className="text-gray-600 mb-4">Still have questions?</p>
                    <Link to="/contact" className="inline-flex items-center justify-center px-8 py-3 bg-gray-900 text-white font-medium rounded-full hover:bg-pink-600 transition-colors duration-300 shadow-lg hover:shadow-pink-200/50">
                        Contact Support
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FAQ;
