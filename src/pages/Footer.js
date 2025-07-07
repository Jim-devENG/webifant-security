import React from "react";
import { FaEnvelope, FaPhone, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-10 px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8">
                <div>
                    <div className="text-2xl font-bold text-cyan-400 mb-2">Webifant Security</div>
                    <p className="mb-4">Unbeatable Online Protection</p>
                    <div className="flex gap-4 mt-2">
                        <a href="#" className="hover:text-cyan-400"><FaLinkedin size={22} /></a>
                        <a href="#" className="hover:text-cyan-400"><FaTwitter size={22} /></a>
                        <a href="#" className="hover:text-cyan-400"><FaFacebook size={22} /></a>
                    </div>
                </div>
                <div>
                    <div className="font-semibold text-cyan-300 mb-2">Platform</div>
                    <ul className="space-y-1">
                        <li><a href="/services" className="hover:text-cyan-400">Services</a></li>
                        <li><a href="/about" className="hover:text-cyan-400">About</a></li>
                        <li><a href="/careers" className="hover:text-cyan-400">Careers</a></li>
                        <li><a href="/blog" className="hover:text-cyan-400">Blog</a></li>
                    </ul>
                </div>
                <div>
                    <div className="font-semibold text-cyan-300 mb-2">Resources</div>
                    <ul className="space-y-1">
                        <li><a href="/faq" className="hover:text-cyan-400">FAQ</a></li>
                        <li><a href="/legal" className="hover:text-cyan-400">Legal & Privacy</a></li>
                        <li><a href="/contact" className="hover:text-cyan-400">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <div className="font-semibold text-cyan-300 mb-2">Contact</div>
                    <div className="flex items-center mb-2"><FaEnvelope className="mr-2 text-cyan-400" /> <a href="mailto:info@webifant.com" className="hover:text-cyan-400">info@webifant.com</a></div>
                    <div className="flex items-center mb-2"><FaPhone className="mr-2 text-cyan-400" /> <span className="text-white">(555) 123-4567</span></div>
                </div>
            </div>
            <div className="text-center text-gray-500 text-sm mt-8">© {new Date().getFullYear()} Webifant Security. All rights reserved.</div>
        </footer>
    );
} 