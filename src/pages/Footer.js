import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaPhone, FaLinkedin, FaWhatsapp, FaMapMarkerAlt, FaInstagram } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
                <div>
                    <div className="text-2xl font-bold text-cyan-400 mb-2">Webifant Security</div>
                    <p className="mb-4">Experience unbeatable online protection of your legacy</p>
                    <p className="text-sm mb-4">Webifant Cybersecurity is a leading provider of comprehensive cybersecurity solutions, offering advanced threat detection, risk management, and tailored security strategies.</p>
                    <div className="flex gap-4 mt-2">
                        <a href="https://linkedin.com/company/webifant" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition"><FaLinkedin size={22} /></a>
                        <a href="https://wa.me/19085205559" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition"><FaWhatsapp size={22} /></a>
                        <a href="https://instagram.com/webifant" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition"><FaInstagram size={22} /></a>
                    </div>
                </div>
                <div>
                    <div className="font-semibold text-cyan-300 mb-2">Navigation</div>
                    <ul className="space-y-1">
                        <li><Link to="/" className="hover:text-cyan-400 transition">Home</Link></li>
                        <li><Link to="/about" className="hover:text-cyan-400 transition">About Us</Link></li>
                        <li><Link to="/services" className="hover:text-cyan-400 transition">Services</Link></li>
                        <li><Link to="/blog" className="hover:text-cyan-400 transition">Blog</Link></li>
                        <li><Link to="/contact" className="hover:text-cyan-400 transition">Contact</Link></li>
                        <li><Link to="/faq" className="hover:text-cyan-400 transition">FAQ</Link></li>
                        <li><Link to="/careers" className="hover:text-cyan-400 transition">Careers</Link></li>
                        <li><Link to="/legal" className="hover:text-cyan-400 transition">Legal</Link></li>
                    </ul>
                </div>
                <div>
                    <div className="font-semibold text-cyan-300 mb-2">Services</div>
                    <ul className="space-y-1">
                        <li><Link to="/services" className="hover:text-cyan-400 transition">Cybersecurity Assessments</Link></li>
                        <li><Link to="/services" className="hover:text-cyan-400 transition">Digital Forensics</Link></li>
                        <li><Link to="/services" className="hover:text-cyan-400 transition">Security Management</Link></li>
                        <li><Link to="/services" className="hover:text-cyan-400 transition">Consulting and Training</Link></li>
                        <li><Link to="/services" className="hover:text-cyan-400 transition">Tailored Security Solutions</Link></li>
                        <li><Link to="/services" className="hover:text-cyan-400 transition">Penetration Testing</Link></li>
                    </ul>
                </div>
                <div>
                    <div className="font-semibold text-cyan-300 mb-2">Contact</div>
                    <div className="space-y-2">
                        <div className="flex items-center">
                            <FaPhone className="mr-2 text-cyan-400" />
                            <a href="tel:+19085205559" className="text-white hover:text-cyan-400 transition">+1 (908) 520-5559</a>
                        </div>
                        <div className="flex items-center">
                            <FaEnvelope className="mr-2 text-cyan-400" />
                            <a href="mailto:hello@webifant.com" className="hover:text-cyan-400 transition">hello@webifant.com</a>
                        </div>
                        <div className="flex items-start">
                            <FaMapMarkerAlt className="mr-2 text-cyan-400 mt-1" />
                            <div>
                                <div className="text-white text-sm">US Office:</div>
                                <div className="text-xs">260, South Plainfield, NJ 07080, USA</div>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <FaMapMarkerAlt className="mr-2 text-cyan-400 mt-1" />
                            <div>
                                <div className="text-white text-sm">Nigeria Office:</div>
                                <div className="text-xs">2, Lane 8, Irede Estate, Ibadan.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-center text-gray-500 text-sm mt-8">
                Copyright © Fortified 2024. All Rights Reserved
            </div>
        </footer>
    );
} 