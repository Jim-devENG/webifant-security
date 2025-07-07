import React from "react";
import { motion } from "framer-motion";

const posts = [
    {
        title: "How to Spot a Phishing Email",
        excerpt: "Learn the telltale signs of phishing emails and how to protect your organization from social engineering attacks.",
        date: "2024-04-10",
        image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80"
    },
    {
        title: "Why Every Business Needs a Security Assessment",
        excerpt: "Discover the benefits of regular vulnerability assessments and how they can prevent costly breaches.",
        date: "2024-03-22",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80"
    },
];

export default function Blog() {
    return (
        <div className="bg-gray-950 text-white min-h-screen">
            <section className="py-16 px-4 max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-cyan-400 mb-8 text-center">Webifant Security Blog</h1>
                <div className="grid gap-8 md:grid-cols-2">
                    {posts.map( ( post, idx ) => (
                        <motion.div key={idx} whileHover={{ scale: 1.03 }} className="bg-gray-900 rounded-lg p-6 shadow-md flex flex-col">
                            <img src={post.image} alt={post.title} className="rounded mb-4 h-40 object-cover" />
                            <h2 className="text-2xl font-semibold text-cyan-300 mb-2">{post.title}</h2>
                            <p className="text-gray-200 mb-2">{post.excerpt}</p>
                            <span className="text-gray-400 text-sm mb-2">{post.date}</span>
                            <a href="#" className="text-cyan-400 hover:underline mt-auto">Read More</a>
                        </motion.div>
                    ) )}
                </div>
            </section>
        </div>
    );
} 