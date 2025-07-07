import React from "react";
import { FaUserShield, FaRegHandshake, FaRegLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

const values = [
    { icon: <FaUserShield className="w-8 h-8 text-cyan-400" />, title: "Integrity", desc: "We uphold the highest standards of integrity in all our actions." },
    { icon: <FaRegHandshake className="w-8 h-8 text-cyan-400" />, title: "Client Focus", desc: "We put our clients first and tailor our solutions to their needs." },
    { icon: <FaRegLightbulb className="w-8 h-8 text-cyan-400" />, title: "Innovation", desc: "We constantly seek new ways to stay ahead of emerging threats." },
];

const timeline = [
    { year: "2018", event: "Webifant Security founded by cybersecurity veterans." },
    { year: "2019", event: "Launched 24/7 Security Operations Center." },
    { year: "2021", event: "Expanded services to include compliance and training." },
    { year: "2023", event: "Recognized as a trusted partner by 65+ organizations." },
];

export default function About() {
    return (
        <div className="bg-gray-950 text-white min-h-screen">
            <section className="py-16 px-4 max-w-4xl mx-auto text-center">
                <h1 className="text-4xl font-bold text-cyan-400 mb-6">About Webifant Security</h1>
                <p className="text-lg text-gray-200 mb-8">
                    Webifant Security is dedicated to providing robust, reliable, and human-driven cybersecurity solutions for organizations of all sizes. Our team brings decades of experience in protecting digital assets, responding to incidents, and building resilient infrastructures.
                </p>
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {values.map( ( v, i ) => (
                        <motion.div key={i} whileHover={{ scale: 1.04 }} className="bg-gray-900 rounded-lg p-6 shadow-md flex flex-col items-center">
                            {v.icon}
                            <h3 className="text-xl font-semibold text-cyan-400 mb-2 mt-4">{v.title}</h3>
                            <p className="text-gray-300">{v.desc}</p>
                        </motion.div>
                    ) )}
                </div>
                <h2 className="text-2xl font-bold text-cyan-300 mb-4">Our Story</h2>
                <div className="flex flex-col items-center">
                    {timeline.map( ( t, i ) => (
                        <div key={i} className="flex items-center mb-4">
                            <div className="w-24 text-cyan-400 font-bold text-lg">{t.year}</div>
                            <div className="h-2 w-2 rounded-full bg-cyan-400 mx-4"></div>
                            <div className="text-gray-200 text-left">{t.event}</div>
                        </div>
                    ) )}
                </div>
            </section>
        </div>
    );
} 