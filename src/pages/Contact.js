import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaEnvelope, FaPhone, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa";

export default function Contact() {
    const [form, setForm] = useState( { name: "", email: "", message: "" } );
    const [submitted, setSubmitted] = useState( false );

    function handleChange( e ) {
        setForm( { ...form, [e.target.name]: e.target.value } );
    }

    function handleSubmit( e ) {
        e.preventDefault();
        setSubmitted( true );
    }

    return (
        <div className="bg-gray-950 text-white min-h-screen">
            <section className="py-16 px-4 max-w-xl mx-auto">
                <h1 className="text-4xl font-bold text-cyan-400 mb-6 text-center">Contact Us</h1>
                <p className="text-lg text-gray-200 mb-6 text-center">Reach us 24/7 for urgent incidents or general inquiries. Our team is ready to help.</p>
                {submitted ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-green-900 text-green-300 p-4 rounded-lg text-center">Thank you for reaching out! We'll get back to you soon.</motion.div>
                ) : (
                    <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <div>
                            <label className="block text-gray-300 mb-1" htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" required className="w-full p-2 rounded bg-gray-800 text-white" value={form.name} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-1" htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" required className="w-full p-2 rounded bg-gray-800 text-white" value={form.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="block text-gray-300 mb-1" htmlFor="message">Message</label>
                            <textarea id="message" name="message" required className="w-full p-2 rounded bg-gray-800 text-white" rows={5} value={form.message} onChange={handleChange}></textarea>
                        </div>
                        <button type="submit" className="bg-cyan-400 text-gray-900 font-bold px-6 py-2 rounded hover:bg-cyan-300 transition">Send Message</button>
                    </motion.form>
                )}
                <div className="mt-8 text-gray-400 text-center space-y-2">
                    <div><FaEnvelope className="inline mr-2 text-cyan-400" /> <a href="mailto:info@webifant.com" className="hover:text-cyan-400">info@webifant.com</a></div>
                    <div><FaPhone className="inline mr-2 text-cyan-400" /> <span className="text-white">(555) 123-4567</span></div>
                    <div className="flex justify-center gap-4 mt-4">
                        <a href="#" className="hover:text-cyan-400"><FaLinkedin size={24} /></a>
                        <a href="#" className="hover:text-cyan-400"><FaTwitter size={24} /></a>
                        <a href="#" className="hover:text-cyan-400"><FaFacebook size={24} /></a>
                    </div>
                </div>
            </section>
        </div>
    );
} 