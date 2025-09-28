import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaSearch, FaCogs, FaGraduationCap, FaTools, FaArrowRight, FaCheck } from "react-icons/fa";
import imageConfig from '../assets/images/imageConfig.json';
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

export default function Services() {
    const services = [
        {
            title: "Cybersecurity Assessments",
            description: "Security assessment is about reviewing your operations to spot vulnerable areas for threat actors to exploit. We conduct comprehensive evaluations to identify and address security gaps.",
            features: [
                "Vulnerability assessments",
                "Penetration testing",
                "Security audits",
                "Risk analysis",
                "Compliance reviews"
            ],
            icon: FaShieldAlt,
            image: imageConfig.imageMap['cybersecurity-assessments.jpg'].url
        },
        {
            title: "Digital Forensics",
            description: "In the event of a cyber attack, digital forensics is crucial to understand what happened, how it happened, and how to prevent it from happening again.",
            features: [
                "Incident investigation",
                "Data recovery",
                "Evidence preservation",
                "Expert witness testimony",
                "Forensic reporting"
            ],
            icon: FaSearch,
            image: imageConfig.imageMap['digital-forensics.jpg'].url
        },
        {
            title: "Security Management",
            description: "Real-Time Monitoring: Protect your business proactively with our 24/7 continuous monitoring services. We identify and respond to threats before they can cause damage.",
            features: [
                "24/7 monitoring",
                "Threat detection",
                "Incident response",
                "Security operations center",
                "Real-time alerts"
            ],
            icon: FaCogs,
            image: imageConfig.imageMap['security-management.jpg'].url
        },
        {
            title: "Consulting and Training",
            description: "We offer expert advice and strategic guidance to enhance your cybersecurity strategy. When you need specialized knowledge, we're here to help.",
            features: [
                "Security strategy development",
                "Employee training programs",
                "Security awareness campaigns",
                "Policy development",
                "Compliance guidance"
            ],
            icon: FaGraduationCap,
            image: imageConfig.imageMap['consulting-training.jpg'].url
        },
        {
            title: "Tailored Security Solutions",
            description: "No two organizations have the same security needs, and we get that. That's why we create customized security solutions that fit your specific requirements.",
            features: [
                "Custom security architecture",
                "Industry-specific solutions",
                "Scalable security frameworks",
                "Integration support",
                "Ongoing optimization"
            ],
            icon: FaTools,
            image: imageConfig.imageMap['tailored-solutions.jpg'].url
        },
        {
            title: "AI Scanner",
            description: "Automatically scan your website and get real-time updates on your website's safety.",
            features: [
                "Continuous website scanning",
                "Immediate risk alerts",
                "Simple setup",
                "Actionable recommendations",
                "Weekly summaries"
            ],
            icon: FaShieldAlt,
            image: imageConfig.imageMap['cybersecurity-assessments.jpg'].url,
            externalLink: "https://www.webifant.ai"
        }
    ];

    return (
        <div className="bg-gray-950 text-white min-h-screen">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 pt-32">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl font-bold text-cyan-400 mb-6">
                            Our Services
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Professional security solutions designed to protect your business from modern cyber threats
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {services.map( ( service, index ) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300"
                            >
                                <div className="h-64 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                        onError={( e ) => {
                                            e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop";
                                        }}
                                    />
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center mb-4">
                                        <div className="text-cyan-400 mr-4">
                                            <service.icon className="text-3xl" />
                                        </div>
                                        <h3 className="text-2xl font-bold text-cyan-300">
                                            {service.title}
                                        </h3>
                                    </div>
                                    <p className="text-gray-400 mb-6 text-lg">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-3 mb-6">
                                        {service.features.map( ( feature, featureIndex ) => (
                                            <li key={featureIndex} className="flex items-center text-gray-300">
                                                <FaCheck className="text-cyan-400 mr-3 flex-shrink-0" />
                                                {feature}
                                            </li>
                                        ) )}
                                    </ul>
                                    {service.externalLink ? (
                                        <a
                                            href={service.externalLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-cyan-400 hover:text-cyan-300 transition duration-300 flex items-center gap-2"
                                        >
                                            Visit Webifant AI <FaArrowRight className="text-sm" />
                                        </a>
                                    ) : (
                                        <Link
                                            to="/contact"
                                            className="text-cyan-400 hover:text-cyan-300 transition duration-300 flex items-center gap-2"
                                        >
                                            Discuss Your Security <FaArrowRight className="text-sm" />
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        ) )}
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-gray-900">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-cyan-400 mb-6">
                            Why Choose Webifant Security?
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Certified experts with unmatched security expertise and proven track record
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Certified Experts",
                                description: "Our team includes certified ethical hackers, cybersecurity professionals, and industry experts with years of experience.",
                                icon: FaShieldAlt
                            },
                            {
                                title: "24/7 Support",
                                description: "Round-the-clock security monitoring and support to ensure your business is protected at all times.",
                                icon: FaCogs
                            },
                            {
                                title: "Proven Results",
                                description: "Track record of successfully protecting businesses from cyber threats and preventing security breaches.",
                                icon: FaCheck
                            }
                        ].map( ( feature, index ) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="text-center"
                            >
                                <div className="text-cyan-400 mb-4">
                                    <feature.icon className="text-4xl mx-auto" />
                                </div>
                                <h3 className="text-xl font-bold text-cyan-300 mb-3">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-400">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ) )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-bold text-cyan-400 mb-6">
                            Discuss Your Security Needs
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Book an assessment or a digital forensics engagement with our team
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/contact"
                                className="bg-cyan-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-300 transition duration-300 inline-flex items-center gap-2"
                            >
                                Discuss Your Security <FaArrowRight />
                            </Link>
                            <Link
                                to="/contact"
                                className="bg-transparent border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transition duration-300 inline-flex items-center gap-2"
                            >
                                Book an Assessment <FaArrowRight />
                            </Link>
                            <Link
                                to="/contact"
                                className="bg-transparent border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transition duration-300 inline-flex items-center gap-2"
                            >
                                Book a Digital Forensics <FaArrowRight />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* Footer */}
            <Footer />
        </div>
    );
} 