import React from "react";
import { motion } from "framer-motion";
import { CheckCircleIcon, ShieldCheckIcon, UserGroupIcon } from "@heroicons/react/24/solid";
import { FaBuilding, FaHandshake, FaRegLightbulb } from "react-icons/fa";

const logos = [
    "Adobe", "Airfrance", "Comcast", "Fuji", "HPE", "Intuit", "J&J", "Uber"
];

const stats = [
    { label: "Organizations Protected", value: "65+" },
    { label: "24/7 Monitoring", value: "100%" },
    { label: "Avg. Response Time", value: "< 5 min" },
    { label: "Client Satisfaction", value: "97.5%" },
];

const services = [
    {
        icon: <ShieldCheckIcon className="w-8 h-8 text-cyan-400" />, title: "Managed Security Monitoring", desc: "24/7 monitoring by our expert SOC team. We detect and respond to threats in real time, keeping your business safe and compliant."
    },
    {
        icon: <FaRegLightbulb className="w-8 h-8 text-cyan-400" />, title: "Vulnerability Assessment", desc: "Comprehensive scanning and analysis to identify and address weaknesses in your systems before attackers can exploit them."
    },
    {
        icon: <CheckCircleIcon className="w-8 h-8 text-cyan-400" />, title: "Incident Response", desc: "Rapid containment and remediation of security incidents. Our team is available around the clock to minimize impact and restore operations quickly."
    },
    {
        icon: <FaHandshake className="w-8 h-8 text-cyan-400" />, title: "Consulting & Training", desc: "Tailored security consulting, employee training, and policy development to strengthen your organization’s security posture."
    },
    {
        icon: <UserGroupIcon className="w-8 h-8 text-cyan-400" />, title: "Penetration Testing", desc: "Simulated attacks by certified professionals to uncover vulnerabilities and provide actionable recommendations for improvement."
    },
    {
        icon: <FaBuilding className="w-8 h-8 text-cyan-400" />, title: "Compliance & Policy", desc: "Guidance and support to help you meet regulatory requirements and industry standards."
    },
];

const testimonials = [
    {
        quote: "Professional, thorough, and always available. Webifant is our trusted partner for all things cybersecurity.",
        name: "CIO, Fintech Company"
    },
    {
        quote: "Their rapid response and expertise saved us from a major incident. Highly recommended!",
        name: "IT Director, Healthcare Provider"
    },
];

const blogPosts = [
    {
        title: "How to Spot a Phishing Email",
        excerpt: "Learn the telltale signs of phishing emails and how to protect your organization from social engineering attacks.",
        date: "2024-04-10",
    },
    {
        title: "Why Every Business Needs a Security Assessment",
        excerpt: "Discover the benefits of regular vulnerability assessments and how they can prevent costly breaches.",
        date: "2024-03-22",
    },
];

export default function Home() {
    return (
        <div className="bg-gray-950 text-white min-h-screen">
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-4 bg-gradient-to-br from-cyan-500/30 via-blue-700/30 to-gray-900 animate-gradient-x pt-24 pb-16">
                <motion.h1 initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-5xl md:text-7xl font-extrabold mb-4 text-cyan-400 drop-shadow-lg">
                    Webifant Security: Unbeatable Online Protection
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="text-2xl md:text-3xl mb-8 max-w-2xl mx-auto text-gray-200">
                    Shield your business with real-time, expert-driven cybersecurity. Trusted by 65+ organizations worldwide.
                </motion.p>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <a href="/contact" className="px-10 py-4 bg-cyan-400 text-gray-900 font-bold rounded-lg shadow-lg hover:bg-cyan-300 transition transform hover:scale-105 flex items-center gap-2">
                        Get Started
                    </a>
                    <a href="#trusted" className="px-10 py-4 border border-cyan-400 text-cyan-400 font-bold rounded-lg hover:bg-cyan-900 transition transform hover:scale-105 flex items-center gap-2">
                        See Who Trusts Us
                    </a>
                </div>
            </section>
            {/* Trusted By Logos */}
            <section id="trusted" className="py-8 bg-gray-900">
                <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-8 opacity-80">
                    {logos.map( ( logo, i ) => (
                        <div key={i} className="text-gray-400 text-lg font-semibold opacity-70 hover:opacity-100 transition">{logo}</div>
                    ) )}
                </div>
            </section>
            {/* Stats Section */}
            <section className="py-12 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {stats.map( ( stat, i ) => (
                        <div key={i} className="flex flex-col items-center">
                            <span className="text-4xl font-bold text-cyan-400">{stat.value}</span>
                            <span className="text-gray-300 mt-2 text-lg">{stat.label}</span>
                        </div>
                    ) )}
                </div>
            </section>
            {/* Services Grid */}
            <section className="py-16 px-4 max-w-6xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-8 text-cyan-300">Our Services</h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {services.map( ( service, i ) => (
                        <motion.div key={i} whileHover={{ scale: 1.04 }} className="bg-gray-900 rounded-xl p-8 shadow-lg border-l-4 border-cyan-400 flex flex-col items-center">
                            {service.icon}
                            <h3 className="text-xl font-bold text-cyan-400 mb-2 mt-4">{service.title}</h3>
                            <p className="text-gray-300">{service.desc}</p>
                        </motion.div>
                    ) )}
                </div>
            </section>
            {/* Testimonials */}
            <section className="py-16 bg-gray-900">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-cyan-300 text-center">What Our Clients Say</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map( ( t, i ) => (
                            <motion.div key={i} whileHover={{ scale: 1.03 }} className="bg-gray-800 rounded-lg p-8 shadow-md">
                                <p className="text-lg text-gray-100 italic mb-4">“{t.quote}”</p>
                                <span className="text-cyan-400 font-semibold">{t.name}</span>
                            </motion.div>
                        ) )}
                    </div>
                </div>
            </section>
            {/* Blog Preview */}
            <section className="py-16 px-4 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-8 text-cyan-300 text-center">From Our Blog</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {blogPosts.map( ( post, i ) => (
                        <motion.div key={i} whileHover={{ scale: 1.03 }} className="bg-gray-900 rounded-lg p-6 shadow-md">
                            <h3 className="text-2xl font-semibold text-cyan-400 mb-2">{post.title}</h3>
                            <p className="text-gray-200 mb-2">{post.excerpt}</p>
                            <span className="text-gray-400 text-sm">{post.date}</span>
                        </motion.div>
                    ) )}
                </div>
            </section>
        </div>
    );
} 