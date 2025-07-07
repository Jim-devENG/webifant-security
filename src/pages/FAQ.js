import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown } from "react-icons/fa";

const faqs = [
    {
        q: "What makes Webifant Security different?",
        a: "Our team combines decades of hands-on experience with a relentless focus on client success. We offer personalized service, rapid response, and transparent communication at every step.",
    },
    {
        q: "Is your monitoring really 24/7?",
        a: "Yes! Our Security Operations Center is staffed around the clock, every day of the year, to ensure your business is always protected.",
    },
    {
        q: "Do you offer remote services?",
        a: "Yes, most of our services are available remotely for your convenience and safety.",
    },
    {
        q: "How do I get started?",
        a: "Contact us through our website or email, and our team will guide you through the next steps based on your needs.",
    },
    {
        q: "Do you offer training for employees?",
        a: "Absolutely! We provide tailored training sessions to help your staff recognize and respond to security threats.",
    },
];

export default function FAQ() {
    const [open, setOpen] = useState( null );
    return (
        <div className="bg-gray-950 text-white min-h-screen">
            <section className="py-16 px-4 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">Frequently Asked Questions</h1>
                <div className="space-y-4">
                    {faqs.map( ( faq, idx ) => (
                        <div key={idx} className="bg-gray-900 rounded-lg shadow-md">
                            <button onClick={() => setOpen( open === idx ? null : idx )} className="w-full flex justify-between items-center p-6 text-left focus:outline-none">
                                <span className="text-xl font-semibold text-cyan-300">{faq.q}</span>
                                <FaChevronDown className={`w-5 h-5 ml-2 transition-transform ${open === idx ? 'rotate-180' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {open === idx && (
                                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden px-6 pb-6">
                                        <p className="text-gray-200">{faq.a}</p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) )}
                </div>
                <div className="mt-12 text-center">
                    <p className="text-gray-300 mb-2">Still have questions?</p>
                    <a href="/contact" className="inline-block bg-cyan-400 text-gray-900 font-bold px-6 py-2 rounded hover:bg-cyan-300 transition">Contact Us</a>
                </div>
            </section>
        </div>
    );
} 