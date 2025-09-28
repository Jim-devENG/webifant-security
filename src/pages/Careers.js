import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserShield, FaLaptopCode, FaUsers, FaRegSmile, FaRocket, FaGlobe, FaGraduationCap, FaHeart, FaArrowRight, FaEnvelope, FaLinkedin, FaGithub, FaShieldAlt, FaClock, FaDollarSign, FaHome, FaBrain, FaHandshake, FaLightbulb, FaAward, FaUsers as FaTeam, FaChartLine, FaLock, FaNetworkWired, FaDatabase, FaMobile, FaDesktop, FaCloud, FaBriefcase, FaMapMarkerAlt } from "react-icons/fa";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import Header from './Header';
import Footer from './Footer';

const departments = ["All", "Security Operations", "Security Testing", "Client Relations", "Engineering", "Research & Development", "Marketing", "Sales"];

const benefits = [
    {
        icon: FaHome,
        title: "Remote First",
        description: "Work from anywhere with our flexible remote work policy"
    },
    {
        icon: FaDollarSign,
        title: "Competitive Pay",
        description: "Attractive salaries with performance-based bonuses"
    },
    {
        icon: FaHeart,
        title: "Health & Wellness",
        description: "Comprehensive health, dental, and vision insurance"
    },
    {
        icon: FaGraduationCap,
        title: "Learning & Growth",
        description: "Continuous learning with training budgets and certifications"
    },
    {
        icon: FaClock,
        title: "Flexible Hours",
        description: "Work-life balance with flexible scheduling options"
    },
    {
        icon: FaAward,
        title: "Career Growth",
        description: "Clear career paths and advancement opportunities"
    }
];

const values = [
    {
        icon: FaBrain,
        title: "Innovation",
        description: "We constantly push boundaries to stay ahead of emerging threats"
    },
    {
        icon: FaHandshake,
        title: "Integrity",
        description: "Trust and transparency in everything we do"
    },
    {
        icon: FaTeam,
        title: "Collaboration",
        description: "We succeed together through teamwork and mutual support"
    },
    {
        icon: FaLightbulb,
        title: "Excellence",
        description: "We strive for excellence in every project and interaction"
    }
];

export default function Careers() {
    const [selectedPosition, setSelectedPosition] = useState( null );
    const [selectedDepartment, setSelectedDepartment] = useState( "All" );
    const [positions, setPositions] = useState( [] );
    const [isLoading, setIsLoading] = useState( true );
    const [currentPage, setCurrentPage] = useState( 1 );
    const [jobsPerPage] = useState( 5 );

    useEffect( () => {
        const loadPositions = async () => {
            try {
                const positionsRef = collection( db, "careers" );
                onSnapshot( positionsRef, ( snapshot ) => {
                    const positionsData = snapshot.docs.map( doc => ( {
                        id: doc.id,
                        ...doc.data()
                    } ) );
                    setPositions( positionsData );
                    setIsLoading( false );
                } );
            } catch ( error ) {
                console.error( "Error loading positions:", error );
                setIsLoading( false );
            }
        };

        loadPositions();
    }, [] );

    const filteredPositions = selectedDepartment === "All"
        ? positions
        : positions.filter( pos => pos.department === selectedDepartment );

    // Pagination logic
    const totalPages = Math.ceil( filteredPositions.length / jobsPerPage );
    const startIndex = ( currentPage - 1 ) * jobsPerPage;
    const endIndex = startIndex + jobsPerPage;
    const currentJobs = filteredPositions.slice( startIndex, endIndex );

    // Reset to first page when department changes
    useEffect( () => {
        setCurrentPage( 1 );
    }, [selectedDepartment] );

    const goToPage = ( page ) => {
        setCurrentPage( page );
        setSelectedPosition( null ); // Close any open job when changing pages
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

                <div className="max-w-6xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center space-x-2 bg-cyan-400/10 text-cyan-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                            <FaRocket />
                            <span>Join Our Team</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
                            Build the Future of
                            <span className="text-cyan-400"> Cybersecurity</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                            Join our mission to protect businesses worldwide. We're looking for passionate
                            individuals who want to make a difference in the cybersecurity landscape.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:careers@webifant.com"
                                className="bg-cyan-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition duration-300 inline-flex items-center gap-2"
                            >
                                Apply Now <FaArrowRight />
                            </a>
                            <a
                                href="#openings"
                                className="bg-transparent border-2 border-cyan-400 text-cyan-400 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transition duration-300"
                            >
                                View Openings
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Company Values */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-3xl font-bold text-cyan-400 mb-4">Our Values</h2>
                        <p className="text-gray-300 text-lg">The principles that guide everything we do</p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map( ( value, index ) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-cyan-400/50 transition-all duration-300 group"
                            >
                                <div className="bg-cyan-400/10 p-3 rounded-lg w-fit mb-4 group-hover:bg-cyan-400/20 transition-colors">
                                    <value.icon className="text-cyan-400 text-2xl" />
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                                <p className="text-gray-300">{value.description}</p>
                            </motion.div>
                        ) )}
                    </div>
                </div>
            </section>

            {/* Job Openings */}
            <section id="openings" className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-3xl font-bold text-cyan-400 mb-4">Open Positions</h2>
                        <p className="text-gray-300 text-lg">Join our growing team of cybersecurity experts</p>
                    </motion.div>

                    {/* Department Filter */}
                    <div className="flex flex-wrap justify-center gap-2 mb-8">
                        {departments.map( ( dept ) => (
                            <button
                                key={dept}
                                onClick={() => setSelectedDepartment( dept )}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${selectedDepartment === dept
                                    ? 'bg-cyan-400 text-gray-900'
                                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                    }`}
                            >
                                {dept}
                            </button>
                        ) )}
                    </div>

                    {/* Job Listings */}
                    <div className="space-y-4">
                        {currentJobs.map( ( position, index ) => (
                            <motion.div
                                key={position.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-gray-900 rounded-xl border border-gray-800 hover:border-cyan-400/50 transition-all duration-300 overflow-hidden group"
                            >
                                <div className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4">
                                            <div className="p-2 bg-cyan-400/10 rounded-lg group-hover:bg-cyan-400/20 transition-colors">
                                                <FaBriefcase className="text-cyan-400 text-2xl" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-white group-hover:text-cyan-300 transition-colors">
                                                    {position.title}
                                                </h3>
                                                <div className="flex flex-wrap gap-2 mt-2">
                                                    <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                                                        {position.department}
                                                    </span>
                                                    <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                                                        {position.location}
                                                    </span>
                                                    <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                                                        {position.type}
                                                    </span>
                                                    <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                                                        {position.experience}
                                                    </span>
                                                </div>
                                                <p className="text-gray-300 mt-3">{position.description}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => setSelectedPosition( selectedPosition === position.id ? null : position.id )}
                                            className="bg-cyan-400 text-gray-900 px-4 py-2 rounded-lg font-medium hover:bg-cyan-300 transition-colors"
                                        >
                                            {selectedPosition === position.id ? 'Hide Details' : 'View Details'}
                                        </button>
                                    </div>

                                    <AnimatePresence>
                                        {selectedPosition === position.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="mt-6 pt-6 border-t border-gray-800"
                                            >
                                                <div className="grid md:grid-cols-2 gap-6">
                                                    <div>
                                                        <h4 className="text-lg font-semibold text-cyan-400 mb-3">Responsibilities</h4>
                                                        <ul className="space-y-2">
                                                            {position.responsibilities?.map( ( resp, idx ) => (
                                                                <li key={idx} className="flex items-start">
                                                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0 mr-3"></div>
                                                                    <span className="text-gray-300 text-sm">{resp}</span>
                                                                </li>
                                                            ) )}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h4 className="text-lg font-semibold text-cyan-400 mb-3">Requirements</h4>
                                                        <ul className="space-y-2">
                                                            {position.requirements?.map( ( req, idx ) => (
                                                                <li key={idx} className="flex items-start">
                                                                    <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 flex-shrink-0 mr-3"></div>
                                                                    <span className="text-gray-300 text-sm">{req}</span>
                                                                </li>
                                                            ) )}
                                                        </ul>
                                                    </div>
                                                </div>
                                                {position.benefits?.length > 0 && (
                                                    <div className="mt-6 pt-6 border-t border-gray-800">
                                                        <h4 className="text-lg font-semibold text-cyan-400 mb-3">Benefits</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {position.benefits.map( ( benefit, idx ) => (
                                                                <span key={idx} className="bg-cyan-400/10 text-cyan-400 text-xs px-3 py-1 rounded-full">
                                                                    {benefit}
                                                                </span>
                                                            ) )}
                                                        </div>
                                                    </div>
                                                )}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ) )}
                    </div>

                    {/* Pagination Controls */}
                    {totalPages > 1 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="mt-8"
                        >
                            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                {/* Results Summary */}
                                <div className="text-gray-400 text-sm">
                                    Showing {startIndex + 1} to {Math.min( endIndex, filteredPositions.length )} of {filteredPositions.length} jobs
                                </div>

                                {/* Page Navigation */}
                                <div className="flex items-center space-x-2">
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
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 px-4 bg-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-3xl font-bold text-cyan-400 mb-6">
                            Ready to Join Our Mission?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Don't see the perfect role? We're always looking for talented individuals.
                            Send us your resume and tell us how you can contribute to our mission.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="mailto:careers@webifant.com"
                                className="bg-cyan-400 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition duration-300 inline-flex items-center gap-2"
                            >
                                <FaEnvelope />
                                Send Application
                            </a>
                            <a
                                href="https://linkedin.com/company/webifant"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-transparent border-2 border-cyan-400 text-cyan-400 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transition duration-300 inline-flex items-center gap-2"
                            >
                                <FaLinkedin />
                                Follow Us
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