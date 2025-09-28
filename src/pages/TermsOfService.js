import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLock, FaExclamationTriangle, FaCopyright, FaExternalLinkAlt, FaEdit } from "react-icons/fa";

export default function TermsOfService() {
    return (
        <div className="bg-gray-950 text-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl font-bold text-cyan-400 mb-6">
                            Terms of Service
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Webifant Security - Professional Cybersecurity Solutions
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="space-y-12">

                        {/* Privacy Policy Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-gray-900 rounded-lg p-8 border border-gray-700"
                        >
                            <div className="flex items-center mb-6">
                                <FaLock className="text-cyan-400 text-2xl mr-3" />
                                <h2 className="text-3xl font-bold text-cyan-300">Privacy Policy</h2>
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                We respect your privacy—no ifs, ands, or buts. Any personal information you share with us (like your name, email, or anything else) stays secure and private. We won't sell, trade, or give away your data to any third parties unless we're required by law (or if it's absolutely necessary for delivering our services).
                            </p>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                We use cookies to improve your experience on our site, but don't worry—no creepy tracking here. You can always turn off cookies through your browser settings if that's your style.
                            </p>

                            <div className="bg-gray-800 rounded-lg p-6 mt-6">
                                <h3 className="text-xl font-semibold text-cyan-300 mb-4">Information Collection</h3>
                                <p className="text-gray-300 mb-4">Personal Information We may collect personally identifiable information (PII) that you voluntarily provide, including but not limited to:</p>
                                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                                    <li>Name</li>
                                    <li>Email address</li>
                                    <li>Telephone number</li>
                                    <li>Company name</li>
                                    <li>Job title</li>
                                </ul>
                                <p className="text-gray-300 mt-4">We may collect data on your interactions with our website and services, including:</p>
                                <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                                    <li>IP address</li>
                                    <li>Browser type and version</li>
                                    <li>Pages visited</li>
                                    <li>Duration of visit</li>
                                    <li>Referring website</li>
                                </ul>
                            </div>
                        </motion.div>

                        {/* Limitation of Liability Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="bg-gray-900 rounded-lg p-8 border border-gray-700"
                        >
                            <div className="flex items-center mb-6">
                                <FaExclamationTriangle className="text-cyan-400 text-2xl mr-3" />
                                <h2 className="text-3xl font-bold text-cyan-300">Limitation of Liability</h2>
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                We've got your back when it comes to security, but we've got to be real with you—no system is foolproof. The world of cybersecurity is constantly changing, and new threats pop up everyday. While we work hard to protect your digital facilities and assets, Webifant isn't liable for any damages, losses, or disruptions resulting from issues outside of our control.
                            </p>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                We'll help you as much as we can, but we can't promise the impossible. In legal speak: Webifant is not responsible for any indirect, incidental, or consequential damages arising from the use of our services or website, even if we've been advised of the possibility of such damages. You agree to use our services at your own risk.
                            </p>
                        </motion.div>

                        {/* No Guarantees Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-gray-900 rounded-lg p-8 border border-gray-700"
                        >
                            <div className="flex items-center mb-6">
                                <FaShieldAlt className="text-cyan-400 text-2xl mr-3" />
                                <h2 className="text-3xl font-bold text-cyan-300">No Guarantees, but We Do Our Best</h2>
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                We're all about providing top-notch security solutions, but cybersecurity is a constantly evolving battlefield. While we offer expert advice and services to protect you, we can't guarantee a 100% bulletproof system (no one can, really). That being said, we put our all into keeping your information safe and secure, and we'll always be transparent about the risks.
                            </p>
                        </motion.div>

                        {/* Intellectual Property Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="bg-gray-900 rounded-lg p-8 border border-gray-700"
                        >
                            <div className="flex items-center mb-6">
                                <FaCopyright className="text-cyan-400 text-2xl mr-3" />
                                <h2 className="text-3xl font-bold text-cyan-300">Intellectual Property</h2>
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Everything you see on our website—content, design, logos, and all that good stuff—belongs to us. Feel free to browse and enjoy, but don't copy, steal, or use any of it without our permission. If you're dying to share something, reach out and let's chat!
                            </p>
                        </motion.div>

                        {/* External Links Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-gray-900 rounded-lg p-8 border border-gray-700"
                        >
                            <div className="flex items-center mb-6">
                                <FaExternalLinkAlt className="text-cyan-400 text-2xl mr-3" />
                                <h2 className="text-3xl font-bold text-cyan-300">External Links</h2>
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                Sometimes, we'll link to other websites for your convenience or reference. However, once you leave our site, we're not responsible for what happens on those external pages. Make sure to review their privacy policies and terms, as they might differ from ours.
                            </p>
                        </motion.div>

                        {/* Changes Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            className="bg-gray-900 rounded-lg p-8 border border-gray-700"
                        >
                            <div className="flex items-center mb-6">
                                <FaEdit className="text-cyan-400 text-2xl mr-3" />
                                <h2 className="text-3xl font-bold text-cyan-300">Changes to Our Terms</h2>
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed">
                                We're always growing and evolving (and so are the laws), so we might update this disclaimer from time to time. Don't worry, we'll make sure you know about any big changes. Keep an eye out, and check back whenever you're curious.
                            </p>
                        </motion.div>

                        {/* Contact Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                            className="bg-gradient-to-r from-cyan-600 to-cyan-800 rounded-lg p-8 text-center"
                        >
                            <h2 className="text-2xl font-bold text-white mb-4">Questions About Our Terms?</h2>
                            <p className="text-cyan-100 mb-6">
                                If you have any questions about these terms or our privacy policy, don't hesitate to reach out.
                            </p>
                            <div className="space-y-2 text-cyan-100">
                                <p>📧 Email: <a href="mailto:support@webifant.com" className="text-white hover:underline">support@webifant.com</a></p>
                                <p>📞 Phone: <a href="tel:+19085205559" className="text-white hover:underline">+1 (908) 520-5559</a></p>
                                <p>📍 Address: 260, South Plainfield, NJ 07080, USA</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
} 