import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaClock, FaUser, FaBuilding, FaIndustry, FaUsers, FaShieldAlt, FaCheckCircle, FaArrowRight } from "react-icons/fa";
import { createLead } from "../firebase/leadService";
import Header from './Header';
import Footer from './Footer';

export default function Contact() {
    const [formData, setFormData] = useState( {
        name: "",
        email: "",
        phone: "",
        company: "",
        industry: "",
        companySize: "",
        message: "",
        securityNeeds: []
    } );
    const [isLoading, setIsLoading] = useState( false );
    const [submitStatus, setSubmitStatus] = useState( null );

    const industries = [
        "Technology",
        "Healthcare",
        "Financial Services",
        "Manufacturing",
        "Retail",
        "Education",
        "Government",
        "Non-Profit",
        "Other"
    ];

    const companySizes = [
        "1-10 employees",
        "11-50 employees",
        "51-100 employees",
        "101-500 employees",
        "500+ employees"
    ];

    const securityNeeds = [
        "Vulnerability Assessment",
        "Penetration Testing",
        "Security Monitoring",
        "Incident Response",
        "Employee Training",
        "Compliance Management",
        "Policy Development",
        "Digital Forensics"
    ];

    const handleChange = ( e ) => {
        setFormData( {
            ...formData,
            [e.target.name]: e.target.value
        } );
    };

    const handleCheckboxChange = ( value ) => {
        setFormData( prev => ( {
            ...prev,
            securityNeeds: prev.securityNeeds.includes( value )
                ? prev.securityNeeds.filter( item => item !== value )
                : [...prev.securityNeeds, value]
        } ) );
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setIsLoading( true );
        setSubmitStatus( null );

        try {
            await createLead( formData );
            setSubmitStatus( "success" );
            setFormData( {
                name: "",
                email: "",
                phone: "",
                company: "",
                industry: "",
                companySize: "",
                message: "",
                securityNeeds: []
            } );
        } catch ( error ) {
            setSubmitStatus( "error" );
            console.error( "Error submitting form:", error );
        } finally {
            setIsLoading( false );
        }
    };

    return (
        <div className="bg-gray-950 text-white min-h-screen">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 py-20 pt-32">
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Ready to secure your digital assets? Contact our cybersecurity experts today for a comprehensive security assessment.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-gray-900 rounded-lg p-8"
                    >
                        <h2 className="text-2xl font-bold text-cyan-400 mb-6">Request a Consultation</h2>

                        {submitStatus === "success" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-green-900/20 border border-green-400 text-green-400 px-4 py-3 rounded mb-6 flex items-center gap-2"
                            >
                                <FaCheckCircle />
                                Thank you! We'll contact you within 24 hours.
                            </motion.div>
                        )}

                        {submitStatus === "error" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-red-900/20 border border-red-400 text-red-400 px-4 py-3 rounded mb-6"
                            >
                                Something went wrong. Please try again.
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Full Name *</label>
                                    <div className="relative">
                                        <FaUser className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-10 py-3 text-white focus:border-cyan-400 focus:outline-none"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Email Address *</label>
                                    <div className="relative">
                                        <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-10 py-3 text-white focus:border-cyan-400 focus:outline-none"
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                                    <div className="relative">
                                        <FaPhone className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-10 py-3 text-white focus:border-cyan-400 focus:outline-none"
                                            placeholder="Enter your phone"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Company Name *</label>
                                    <div className="relative">
                                        <FaBuilding className="absolute left-3 top-3 text-gray-400" />
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-10 py-3 text-white focus:border-cyan-400 focus:outline-none"
                                            placeholder="Enter company name"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Industry</label>
                                    <div className="relative">
                                        <FaIndustry className="absolute left-3 top-3 text-gray-400" />
                                        <select
                                            name="industry"
                                            value={formData.industry}
                                            onChange={handleChange}
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-10 py-3 text-white focus:border-cyan-400 focus:outline-none"
                                        >
                                            <option value="">Select industry</option>
                                            {industries.map( industry => (
                                                <option key={industry} value={industry}>{industry}</option>
                                            ) )}
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-400 text-sm mb-2">Company Size</label>
                                    <div className="relative">
                                        <FaUsers className="absolute left-3 top-3 text-gray-400" />
                                        <select
                                            name="companySize"
                                            value={formData.companySize}
                                            onChange={handleChange}
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-10 py-3 text-white focus:border-cyan-400 focus:outline-none"
                                        >
                                            <option value="">Select company size</option>
                                            {companySizes.map( size => (
                                                <option key={size} value={size}>{size}</option>
                                            ) )}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-3">Security Services Needed</label>
                                <div className="grid md:grid-cols-2 gap-3">
                                    {securityNeeds.map( need => (
                                        <label key={need} className="flex items-center space-x-3 cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={formData.securityNeeds.includes( need )}
                                                onChange={() => handleCheckboxChange( need )}
                                                className="w-4 h-4 text-cyan-400 bg-gray-800 border-gray-700 rounded focus:ring-cyan-400"
                                            />
                                            <span className="text-gray-300 text-sm">{need}</span>
                                        </label>
                                    ) )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm mb-2">Message</label>
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    rows="4"
                                    className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                                    placeholder="Tell us about your security needs..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-cyan-400 text-gray-900 py-4 rounded-lg hover:bg-cyan-300 transition flex items-center justify-center gap-2 disabled:opacity-50 font-semibold"
                            >
                                {isLoading ? "Sending..." : "Request Consultation"}
                                <FaArrowRight />
                            </button>
                        </form>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-8"
                    >
                        <div>
                            <h2 className="text-2xl font-bold text-cyan-400 mb-6">Contact Information</h2>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-cyan-400/20 p-3 rounded-full">
                                        <FaEnvelope className="text-cyan-400 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Email</h3>
                                        <p className="text-gray-400">info@webinfant.com</p>
                                        <p className="text-gray-400">support@webinfant.com</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-cyan-400/20 p-3 rounded-full">
                                        <FaPhone className="text-cyan-400 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Phone</h3>
                                        <p className="text-gray-400">+1 (555) 123-4567</p>
                                        <p className="text-gray-400">Emergency: +1 (555) 999-8888</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-cyan-400/20 p-3 rounded-full">
                                        <FaMapMarkerAlt className="text-cyan-400 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Address</h3>
                                        <p className="text-gray-400">123 Security Street</p>
                                        <p className="text-gray-400">Cyber City, CC 12345</p>
                                        <p className="text-gray-400">United States</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-cyan-400/20 p-3 rounded-full">
                                        <FaClock className="text-cyan-400 text-xl" />
                                    </div>
                                    <div>
                                        <h3 className="text-white font-semibold">Business Hours</h3>
                                        <p className="text-gray-400">Monday - Friday: 9:00 AM - 6:00 PM</p>
                                        <p className="text-gray-400">Saturday: 10:00 AM - 4:00 PM</p>
                                        <p className="text-gray-400">Sunday: Closed</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Why Choose Us */}
                        <div className="bg-gray-900 rounded-lg p-6">
                            <h3 className="text-xl font-bold text-cyan-400 mb-4">Why Choose Webifant Security?</h3>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <FaShieldAlt className="text-cyan-400 mt-1" />
                                    <div>
                                        <h4 className="text-white font-semibold">Expert Team</h4>
                                        <p className="text-gray-400 text-sm">Certified cybersecurity professionals with years of experience</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <FaShieldAlt className="text-cyan-400 mt-1" />
                                    <div>
                                        <h4 className="text-white font-semibold">24/7 Support</h4>
                                        <p className="text-gray-400 text-sm">Round-the-clock security monitoring and incident response</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <FaShieldAlt className="text-cyan-400 mt-1" />
                                    <div>
                                        <h4 className="text-white font-semibold">Custom Solutions</h4>
                                        <p className="text-gray-400 text-sm">Tailored security strategies for your specific needs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            {/* Footer */}
            <Footer />
        </div>
    );
} 