import React from "react";
import { motion } from "framer-motion";
import { FaUserShield, FaLaptopCode, FaUsers, FaRegSmile } from "react-icons/fa";

const positions = [
    { icon: <FaUserShield className="w-8 h-8 text-cyan-400" />, title: "Security Analyst", desc: "Monitor, analyze, and respond to security events and incidents." },
    { icon: <FaLaptopCode className="w-8 h-8 text-cyan-400" />, title: "Penetration Tester", desc: "Simulate attacks to uncover vulnerabilities and help clients improve their defenses." },
    { icon: <FaUsers className="w-8 h-8 text-cyan-400" />, title: "Client Success Manager", desc: "Ensure our clients get the most value from our services and support." },
];

export default function Careers() {
    return (
        <div className="bg-gray-950 text-white min-h-screen">
            <section className="py-16 px-4 max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold text-cyan-400 mb-6 text-center">Careers at Webifant Security</h1>
                <p className="text-lg text-gray-200 mb-8 text-center">We're always looking for talented people. Email your CV and a short introduction to <a href="mailto:careers@webifant.com" className="text-cyan-300 hover:underline">careers@webifant.com</a>.</p>
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {positions.map( ( pos, i ) => (
                        <motion.div key={i} whileHover={{ scale: 1.04 }} className="bg-gray-900 rounded-lg p-6 shadow-md flex flex-col items-center">
                            {pos.icon}
                            <h3 className="text-xl font-semibold text-cyan-400 mb-2 mt-4">{pos.title}</h3>
                            <p className="text-gray-300">{pos.desc}</p>
                        </motion.div>
                    ) )}
                </div>
                <div className="bg-gray-900 rounded-lg p-6 shadow-md text-center">
                    <FaRegSmile className="w-8 h-8 text-cyan-400 mx-auto mb-2" />
                    <h2 className="text-xl font-semibold text-cyan-400 mb-2">Our Culture</h2>
                    <p className="text-gray-300">We value curiosity, teamwork, and a passion for protecting others. Don't see your role? Reach out anyway—we'd love to hear from you!</p>
                </div>
            </section>
        </div>
    );
} 