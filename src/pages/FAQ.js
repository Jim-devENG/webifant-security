import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaShieldAlt, FaUsers, FaClock, FaGlobe, FaRocket, FaSearch, FaQuestionCircle, FaArrowRight, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Header from './Header';
import Footer from './Footer';

const faqs = [
    {
        q: "What makes Webifant Security different?",
        a: "Our team combines decades of hands-on experience with a relentless focus on client success. We offer personalized service, rapid response, and transparent communication at every step.",
        category: "Services",
        icon: FaShieldAlt
    },
    {
        q: "Is your monitoring really 24/7?",
        a: "Yes! Our Security Operations Center is staffed around the clock, every day of the year, to ensure your business is always protected.",
        category: "Monitoring",
        icon: FaClock
    },
    {
        q: "Do you offer remote services?",
        a: "Yes, most of our services are available remotely for your convenience and safety.",
        category: "Services",
        icon: FaGlobe
    },
    {
        q: "How do I get started?",
        a: "Contact us through our website or email, and our team will guide you through the next steps based on your needs.",
        category: "Getting Started",
        icon: FaRocket
    },
    {
        q: "Do you offer training for employees?",
        a: "Absolutely! We provide tailored training sessions to help your staff recognize and respond to security threats.",
        category: "Training",
        icon: FaUsers
    },
    {
        q: "What types of businesses do you serve?",
        a: "We serve businesses of all sizes, from startups to enterprise-level organizations across various industries.",
        category: "Services",
        icon: FaShieldAlt
    },
    {
        q: "How quickly can you respond to security incidents?",
        a: "Our average response time is under 15 minutes for critical incidents, with immediate alerts and 24/7 support.",
        category: "Response",
        icon: FaRocket
    },
    {
        q: "Do you provide compliance reports?",
        a: "Yes, we provide detailed compliance reports and documentation to help meet regulatory requirements.",
        category: "Compliance",
        icon: FaShieldAlt
    }
];

const categories = ["All", "Services", "Monitoring", "Getting Started", "Training", "Response", "Compliance"];

export default function FAQ() {
    const [open, setOpen] = useState( null );
    const [selectedCategory, setSelectedCategory] = useState( "All" );
    const [searchTerm, setSearchTerm] = useState( "" );
    const [currentPage, setCurrentPage] = useState( 1 );
    const [itemsPerPage, setItemsPerPage] = useState( 5 );

    const filteredFaqs = faqs.filter( faq => {
        const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
        const matchesSearch = faq.q.toLowerCase().includes( searchTerm.toLowerCase() ) ||
            faq.a.toLowerCase().includes( searchTerm.toLowerCase() );
        return matchesCategory && matchesSearch;
    } );

    // Pagination logic
    const totalPages = Math.ceil( filteredFaqs.length / itemsPerPage );
    const startIndex = ( currentPage - 1 ) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentFaqs = filteredFaqs.slice( startIndex, endIndex );

    // Reset to first page when filters change
    React.useEffect( () => {
        setCurrentPage( 1 );
    }, [selectedCategory, searchTerm] );

    const goToPage = ( page ) => {
        setCurrentPage( page );
        setOpen( null ); // Close any open FAQ when changing pages
    };

    const goToPreviousPage = () => {
        if ( currentPage > 1 ) {
            goToPage( currentPage - 1 );
        }
    };

    const goToNextPage = () => {
        if ( currentPage < totalPages ) {
            goToPage( currentPage + 1 );
        }
    };

    // Generate page numbers with ellipsis
    const getPageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;

        if ( totalPages <= maxVisiblePages ) {
            for ( let i = 1;i <= totalPages;i++ ) {
                pages.push( i );
            }
        } else {
            if ( currentPage <= 3 ) {
                for ( let i = 1;i <= 4;i++ ) {
                    pages.push( i );
                }
                pages.push( '...' );
                pages.push( totalPages );
            } else if ( currentPage >= totalPages - 2 ) {
                pages.push( 1 );
                pages.push( '...' );
                for ( let i = totalPages - 3;i <= totalPages;i++ ) {
                    pages.push( i );
                }
            } else {
                pages.push( 1 );
                pages.push( '...' );
                for ( let i = currentPage - 1;i <= currentPage + 1;i++ ) {
                    pages.push( i );
                }
                pages.push( '...' );
                pages.push( totalPages );
            }
        }

        return pages;
    };

    return (
        <div className="bg-gray-950 text-white min-h-screen">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="relative py-20 px-4 pt-32 overflow-hidden">
                {/* Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 to-blue-900/20"></div>
                <motion.div
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-20 right-20 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl"
                ></motion.div>
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, -5, 5, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-20 left-20 w-24 h-24 bg-blue-400/10 rounded-full blur-xl"
                ></motion.div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center space-x-2 bg-cyan-400/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <FaQuestionCircle />
                            <span>FAQ</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Frequently Asked
                            <span className="text-cyan-400"> Questions</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                            Find answers to common questions about our cybersecurity services,
                            monitoring capabilities, and how we protect your business.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4 mb-8">
                        {/* Search Bar */}
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search questions..."
                                value={searchTerm}
                                onChange={( e ) => setSearchTerm( e.target.value )}
                                className="w-full pl-12 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-400 transition-colors"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map( ( category ) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory( category )}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                        ? 'bg-cyan-400 text-gray-900'
                                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                        }`}
                                >
                                    {category}
                                </button>
                            ) )}
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                    >
                        {currentFaqs.map( ( faq, idx ) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="bg-gray-900 rounded-xl border border-gray-800 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden group"
                            >
                                <button
                                    onClick={() => setOpen( open === idx ? null : idx )}
                                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none group-hover:bg-gray-800/50 transition-colors"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className="p-2 bg-cyan-400/10 rounded-lg group-hover:bg-cyan-400/20 transition-colors">
                                            <faq.icon className="text-cyan-400 text-lg" />
                                        </div>
                                        <div className="flex-1">
                                            <span className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">
                                                {faq.q}
                                            </span>
                                            <div className="mt-1">
                                                <span className="inline-block bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded">
                                                    {faq.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <FaChevronDown
                                        className={`w-5 h-5 ml-4 text-gray-400 transition-transform duration-300 ${open === idx ? 'rotate-180 text-cyan-400' : ''
                                            }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {open === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-6 pb-6 border-t border-gray-800">
                                                <p className="text-gray-300 leading-relaxed pt-4">
                                                    {faq.a}
                                                </p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ) )}
                    </motion.div>

                    {/* Pagination Controls */}
                    {filteredFaqs.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mt-8"
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                {/* Results Summary */}
                                <div className="text-gray-400 text-sm">
                                    Showing {startIndex + 1} to {Math.min( endIndex, filteredFaqs.length )} of {filteredFaqs.length} questions
                                </div>

                                {/* Items Per Page */}
                                <div className="flex items-center space-x-2">
                                    <span className="text-gray-400 text-sm">Show:</span>
                                    <select
                                        value={itemsPerPage}
                                        onChange={( e ) => {
                                            setItemsPerPage( Number( e.target.value ) );
                                            setCurrentPage( 1 );
                                        }}
                                        className="bg-gray-800 border border-gray-700 text-white text-sm rounded-lg px-3 py-1 focus:outline-none focus:border-cyan-400"
                                    >
                                        <option value={3}>3</option>
                                        <option value={5}>5</option>
                                        <option value={10}>10</option>
                                        <option value={15}>15</option>
                                    </select>
                                    <span className="text-gray-400 text-sm">per page</span>
                                </div>
                            </div>

                            {/* Page Navigation */}
                            {totalPages > 1 && (
                                <div className="flex items-center justify-center space-x-2 mt-6">
                                    {/* Previous Button */}
                                    <button
                                        onClick={goToPreviousPage}
                                        disabled={currentPage === 1}
                                        className={`p-2 rounded-lg text-sm font-medium transition-all duration-300 ${currentPage === 1
                                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                            }`}
                                    >
                                        Previous
                                    </button>

                                    {/* Page Numbers */}
                                    <div className="flex items-center space-x-1">
                                        {getPageNumbers().map( ( page, index ) => (
                                            <button
                                                key={index}
                                                onClick={() => typeof page === 'number' && goToPage( page )}
                                                disabled={page === '...'}
                                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${page === currentPage
                                                        ? 'bg-cyan-400 text-gray-900'
                                                        : page === '...'
                                                            ? 'text-gray-500 cursor-default'
                                                            : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        ) )}
                                    </div>

                                    {/* Next Button */}
                                    <button
                                        onClick={goToNextPage}
                                        disabled={currentPage === totalPages}
                                        className={`p-2 rounded-lg text-sm font-medium transition-all duration-300 ${currentPage === totalPages
                                                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                                                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                                            }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* No Results */}
                    {filteredFaqs.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-12"
                        >
                            <FaQuestionCircle className="text-6xl text-gray-600 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-400 mb-2">No questions found</h3>
                            <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Contact CTA Section */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-2xl p-8 border border-cyan-400/20"
                    >
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-cyan-400 mb-4">
                                Still Have Questions?
                            </h2>
                            <p className="text-gray-300 text-lg">
                                Our team is here to help you with any specific questions about our services.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            <div className="text-center">
                                <div className="bg-cyan-400/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <FaEnvelope className="text-cyan-400 text-xl" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">Email Us</h3>
                                <p className="text-gray-400 text-sm">hello@webifant.com</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-cyan-400/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <FaPhone className="text-cyan-400 text-xl" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">Call Us</h3>
                                <p className="text-gray-400 text-sm">+1 (555) 123-4567</p>
                            </div>
                            <div className="text-center">
                                <div className="bg-cyan-400/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                    <FaMapMarkerAlt className="text-cyan-400 text-xl" />
                                </div>
                                <h3 className="text-white font-semibold mb-2">Visit Us</h3>
                                <p className="text-gray-400 text-sm">New York, NY</p>
                            </div>
                        </div>

                        <div className="text-center">
                            <a
                                href="/contact"
                                className="inline-flex items-center space-x-2 bg-cyan-400 text-gray-900 font-bold px-8 py-3 rounded-lg hover:bg-cyan-300 transition-colors"
                            >
                                <span>Contact Us</span>
                                <FaArrowRight />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
} 