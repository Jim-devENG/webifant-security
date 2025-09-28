import React from "react";
import { FaLock, FaUserShield, FaEnvelope } from "react-icons/fa";
import Header from './Header';
import Footer from './Footer';

export default function Legal() {
    return (
        <div className="bg-gray-950 text-white min-h-screen">
            {/* Header */}
            <Header />

            <section className="py-16 px-4 max-w-3xl mx-auto pt-32">
                <h1 className="text-4xl font-bold text-cyan-400 mb-6 text-center">Legal & Privacy</h1>
                <div className="bg-gray-900 rounded-lg p-6 shadow-md mb-8">
                    <div className="flex items-center mb-2"><FaLock className="w-6 h-6 text-cyan-400 mr-2" /><h2 className="text-2xl font-semibold text-cyan-300">Privacy Policy</h2></div>
                    <p className="text-gray-200 mb-4">We take your privacy seriously. This page outlines our data handling policies, your rights, and how we keep your data secure. For details, see our full privacy policy below.</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-6 shadow-md mb-8">
                    <div className="flex items-center mb-2"><FaUserShield className="w-6 h-6 text-cyan-400 mr-2" /><h2 className="text-2xl font-semibold text-cyan-300">Your Rights</h2></div>
                    <p className="text-gray-200 mb-4">You can request data deletion at any time by emailing <a href="mailto:privacy@webifant.com" className="text-cyan-300 hover:underline">privacy@webifant.com</a>.</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-6 shadow-md mb-8">
                    <div className="flex items-center mb-2"><FaLock className="w-6 h-6 text-cyan-400 mr-2" /><h2 className="text-2xl font-semibold text-cyan-300">Disclaimer & Limitation of Liability</h2></div>
                    <p className="text-gray-200 mb-4">Webifant Security provides services as described and does not guarantee absolute protection against all threats. By using our services, you agree to our terms and conditions.</p>
                </div>
                <div className="bg-gray-900 rounded-lg p-6 shadow-md">
                    <div className="flex items-center mb-2"><FaEnvelope className="w-6 h-6 text-cyan-400 mr-2" /><h2 className="text-2xl font-semibold text-cyan-300">Contact</h2></div>
                    <p className="text-gray-200">For legal inquiries, contact <a href="mailto:info@webifant.com" className="text-cyan-300 hover:underline">info@webifant.com</a>.</p>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
} 