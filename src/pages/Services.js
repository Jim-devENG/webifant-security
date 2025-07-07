import React from "react";
import { motion } from "framer-motion";
import { ShieldCheckIcon, UserGroupIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import { FaRegLightbulb, FaHandshake, FaBuilding } from "react-icons/fa";

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

export default function Services() {
    return (
        <div className="bg-gray-950 text-white min-h-screen">
            <section className="py-16 px-4 max-w-6xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-cyan-400 mb-6">Our Services</h1>
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
            {/* Why Choose Us Section */}
            <section className="py-16 bg-gradient-to-r from-gray-900 via-gray-950 to-gray-900">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-6 text-cyan-300">Why Choose Webifant?</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-gray-900 rounded-lg p-6 shadow-md">
                            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Expertise</h3>
                            <p className="text-gray-300">Decades of hands-on experience in cybersecurity, incident response, and compliance.</p>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-6 shadow-md">
                            <h3 className="text-xl font-semibold text-cyan-400 mb-2">24/7 Support</h3>
                            <p className="text-gray-300">Our Security Operations Center is always on, ready to respond to any threat, any time.</p>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-6 shadow-md">
                            <h3 className="text-xl font-semibold text-cyan-400 mb-2">Client Focus</h3>
                            <p className="text-gray-300">We tailor our solutions to your needs and provide transparent, proactive communication.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
} 