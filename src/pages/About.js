import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaUsers, FaAward, FaCheck, FaArrowRight, FaLock } from "react-icons/fa";
import imageConfig from '../assets/images/imageConfig.json';
import founderImage from '../assets/images/founder.PNG';
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';

export default function About() {
    const testimonials = [
        {
            quote: "Webifant Security transformed the way I view cybersecurity. As a small e-commerce business owner, I was constantly worried about someone hacking into my system and stealing customer cards or rerouting orders. I have seen this happen to a friend. But Hassan and Riaz put my mind at ease. They conducted a thorough vulnerability assessment and set up robust defenses that have kept my business safe ever since. It's great to work with a company that actually cares about my success and security!",
            author: "Monica Ly",
            position: "e-Commerce Store Owner, USA",
            image: null
        },
        {
            quote: "Our SaaS app was growing rapidly, and security became a top priority. Webifant Security not only provided a comprehensive security audit but also worked with our developers to implement the solutions efficiently. Their team is highly professional, responsive, and always willing to go the extra mile to explain complex issues. Their service is well worth the investment!",
            author: "GrowthCab",
            position: "Italy",
            image: null
        },
        {
            quote: "Working with Webifant Security was a game-changer for our platform. Our system handles a large volume of sensitive student data, and we needed experts who could ensure the safety of both our users and the integrity of our platform. Their penetration testing was top-notch, and their recommendations were practical and easy to implement. I'd recommend them to any tech startup looking for a security partner!",
            author: "Olatunbosun Olalekan",
            position: "The Learnaholics Academy, Russian Federation",
            image: null
        },
        {
            quote: "The team of certified experts provided exceptional cybersecurity solutions, significantly enhancing our security posture and empowering our staff with valuable knowledge to navigate an increasingly complex threat landscape.",
            author: "Deborah Adeleye",
            position: "COO, SafeMeetings Tech Ltd",
            image: null
        },
        {
            quote: "I scanned our website with Webifant's AI and was astounded by our exposure rate. Knowing that helped to get a handle on things. The cherry on top has been the pleasure of getting nice bonuses for referring my software manufacturing clients to try the service.",
            author: "Justin Weiss",
            position: "Founder, Machine Mythology (USA)",
            image: null
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
                            About Us
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Your trusted partner in cybersecurity, protecting businesses from evolving digital threats
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl font-bold text-cyan-400 mb-6">
                                Your Safety in the Cyber Jungle
                            </h2>
                            <p className="text-lg text-gray-300 mb-6">
                                Cyber-attacks don't happen out of nowhere. Your daily emails, file share, sign ins, and transactions open the door. Threat actors may also be attracted to your customer growth and business success. But here is the silver lining. Every threat starts with a whisper. The key is catching it before it turns into a shout.
                            </p>
                            <p className="text-lg text-gray-300 mb-8">
                                Starting a business takes guts, ambition, and a willingness to risk it all. We understand the stakes and partner with you to build a security posture that grows with your ambition.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <img
                                src={imageConfig.imageMap['about-image.jpg'].url}
                                alt="Cybersecurity protection"
                                className="w-full h-96 object-cover rounded-lg shadow-2xl"
                                onError={( e ) => {
                                    e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop";
                                }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gray-900">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-gray-800 p-8 rounded-lg"
                        >
                            <div className="text-4xl font-bold text-cyan-400 mb-2">120+</div>
                            <div className="text-gray-400">Clients Served Globally</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-gray-800 p-8 rounded-lg"
                        >
                            <div className="text-4xl font-bold text-cyan-400 mb-2">11+</div>
                            <div className="text-gray-400">Cyber Security Experts</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-gray-800 p-8 rounded-lg"
                        >
                            <div className="text-4xl font-bold text-cyan-400 mb-2">0+</div>
                            <div className="text-gray-400">Cyber Security Projects</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Founder's Story */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            {/* Enhanced Founder Image Container */}
                            <div className="relative group">
                                {/* Background Glow Effect */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>

                                {/* Main Image Container */}
                                <div className="relative bg-gray-900 rounded-2xl p-4 shadow-2xl">
                                    {/* Professional Frame */}
                                    <div className="relative overflow-hidden rounded-xl pt-8">
                                        <img
                                            src={founderImage}
                                            alt="Founder - Webifant Security"
                                            className="w-full h-auto max-h-[500px] object-cover rounded-xl transform group-hover:scale-105 transition-all duration-500 shadow-2xl"
                                            onError={( e ) => {
                                                e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=700&fit=crop&crop=face";
                                            }}
                                        />

                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/30 via-transparent to-transparent rounded-xl"></div>

                                        {/* Professional Badge */}
                                        <div className="absolute top-4 right-4 bg-cyan-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                                            Founder & CEO
                                        </div>

                                        {/* Decorative Elements */}
                                        <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                                            <span className="text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">Live</span>
                                        </div>
                                    </div>

                                    {/* Image Caption */}
                                    <div className="mt-4 text-center">
                                        <h3 className="text-xl font-bold text-cyan-400 mb-1">Bayo Hassan Adesokan</h3>
                                        <p className="text-gray-400 text-sm">Founder & CEO, Webifant Security</p>
                                    </div>
                                </div>

                                {/* Floating Security Icons */}
                                <motion.div
                                    animate={{
                                        y: [0, -10, 0],
                                        rotate: [0, 5, -5, 0],
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute -top-2 -right-2 bg-gray-800 p-2 rounded-full shadow-lg"
                                >
                                    <FaShieldAlt className="text-cyan-400 text-lg" />
                                </motion.div>

                                <motion.div
                                    animate={{
                                        y: [0, 10, 0],
                                        rotate: [0, -5, 5, 0],
                                    }}
                                    transition={{
                                        duration: 5,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute -bottom-2 -left-2 bg-gray-800 p-2 rounded-full shadow-lg"
                                >
                                    <FaLock className="text-blue-400 text-lg" />
                                </motion.div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl font-bold text-cyan-400 mb-6">
                                From the Founder's Desk
                            </h2>
                            <blockquote className="text-lg text-gray-300 mb-6 italic border-l-4 border-cyan-400 pl-6">
                                "Starting a business takes guts, ambition, and a willingness to risk it all. That’s the spirit that drives our work at Webifant Security. We exist to protect founders and teams who are building the future—so they can scale without fear."
                            </blockquote>
                            <a
                                href="https://linkedin.com/company/webifant"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-cyan-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition duration-300 inline-flex items-center gap-2"
                            >
                                Connect on LinkedIn <FaArrowRight />
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-20 bg-gray-900">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-cyan-400 mb-6">
                            What Our Clients are Saying
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Real feedback from businesses we've helped secure
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map( ( testimonial, index ) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: index * 0.1 }}
                                className="bg-gray-800 rounded-lg p-8"
                            >
                                <div className="flex items-start mb-6">
                                    {testimonial.image ? (
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.author}
                                            className="w-16 h-16 rounded-full object-cover mr-4"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-gray-600 mr-4 flex items-center justify-center">
                                            <span className="text-gray-300 text-xl font-bold">
                                                {testimonial.author.charAt(0)}
                                            </span>
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="text-lg font-bold text-cyan-300">
                                            {testimonial.author}
                                        </h4>
                                        <p className="text-gray-400 text-sm">
                                            {testimonial.position}
                                        </p>
                                    </div>
                                </div>
                                <blockquote className="text-gray-300 italic">
                                    "{testimonial.quote}"
                                </blockquote>
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
                            Ready to Secure Your Business?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Contact us today to discuss your security needs and protect your business from cyber threats
                        </p>
                        <Link
                            to="/contact"
                            className="bg-cyan-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-300 transition duration-300 inline-flex items-center gap-2"
                        >
                            Talk to us now <FaArrowRight />
                        </Link>
                    </motion.div>
                </div>
            </section>
            {/* Footer */}
            <Footer />
        </div>
    );
} 