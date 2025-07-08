import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendar, FaUser, FaArrowLeft, FaTag } from "react-icons/fa";
import { getPostBySlug } from "../firebase/blogService";
import ReactMarkdown from "react-markdown";

export default function BlogPost() {
    const { slug } = useParams();
    const [post, setPost] = useState( null );
    const [isLoading, setIsLoading] = useState( true );
    const [error, setError] = useState( null );

    useEffect( () => {
        loadPost();
    }, [slug] );

    const loadPost = async () => {
        setIsLoading( true );
        setError( null );

        try {
            const postData = await getPostBySlug( slug );
            if ( postData ) {
                setPost( postData );
            } else {
                setError( "Post not found" );
            }
        } catch ( error ) {
            console.error( 'Error loading post:', error );
            setError( "Error loading post" );
        } finally {
            setIsLoading( false );
        }
    };

    if ( isLoading ) {
        return (
            <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                    <p>Loading post...</p>
                </div>
            </div>
        );
    }

    if ( error || !post ) {
        return (
            <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <h1 className="text-3xl font-bold text-red-400 mb-4">Post Not Found</h1>
                    <p className="text-gray-400 mb-8">
                        {error || "The blog post you're looking for doesn't exist."}
                    </p>
                    <Link
                        to="/blog"
                        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition"
                    >
                        <FaArrowLeft className="mr-2" />
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-950 text-white min-h-screen">
            {/* Hero Section */}
            <section className="relative h-96 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950 z-10"></div>
                <img
                    src={post.frontmatter.image}
                    alt={post.frontmatter.title}
                    className="w-full h-full object-cover"
                    onError={( e ) => {
                        e.target.src = "https://via.placeholder.com/1200x400/1f2937/6b7280?text=Security+Blog";
                    }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 z-5"></div>

                <div className="absolute bottom-0 left-0 right-0 z-20 p-8">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className="flex items-center text-sm text-gray-300 mb-4">
                                <FaCalendar className="mr-2" />
                                {post.frontmatter.date}
                                <FaUser className="ml-6 mr-2" />
                                {post.frontmatter.author}
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                {post.frontmatter.title}
                            </h1>

                            <p className="text-xl text-gray-300 max-w-3xl">
                                {post.frontmatter.excerpt}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex justify-between items-center mb-8">
                        <Link
                            to="/blog"
                            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition"
                        >
                            <FaArrowLeft className="mr-2" />
                            Back to Blog
                        </Link>

                        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                            <div className="flex items-center gap-2">
                                <FaTag className="text-gray-400" />
                                <div className="flex gap-2">
                                    {post.frontmatter.tags.map( ( tag ) => (
                                        <span
                                            key={tag}
                                            className="px-3 py-1 bg-gray-800 text-cyan-400 text-sm rounded-full"
                                        >
                                            {tag}
                                        </span>
                                    ) )}
                                </div>
                            </div>
                        )}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="prose prose-invert prose-lg max-w-none"
                    >
                        <div className="bg-gray-900 rounded-lg p-8">
                            <ReactMarkdown
                                components={{
                                    h1: ( { children } ) => (
                                        <h1 className="text-3xl font-bold text-cyan-400 mb-6">{children}</h1>
                                    ),
                                    h2: ( { children } ) => (
                                        <h2 className="text-2xl font-bold text-cyan-300 mb-4 mt-8">{children}</h2>
                                    ),
                                    h3: ( { children } ) => (
                                        <h3 className="text-xl font-bold text-cyan-200 mb-3 mt-6">{children}</h3>
                                    ),
                                    p: ( { children } ) => (
                                        <p className="text-gray-300 mb-4 leading-relaxed">{children}</p>
                                    ),
                                    ul: ( { children } ) => (
                                        <ul className="list-disc list-inside text-gray-300 mb-4 space-y-2">{children}</ul>
                                    ),
                                    ol: ( { children } ) => (
                                        <ol className="list-decimal list-inside text-gray-300 mb-4 space-y-2">{children}</ol>
                                    ),
                                    li: ( { children } ) => (
                                        <li className="text-gray-300">{children}</li>
                                    ),
                                    strong: ( { children } ) => (
                                        <strong className="font-bold text-white">{children}</strong>
                                    ),
                                    em: ( { children } ) => (
                                        <em className="italic text-gray-200">{children}</em>
                                    ),
                                    code: ( { children } ) => (
                                        <code className="bg-gray-800 text-cyan-400 px-2 py-1 rounded text-sm">{children}</code>
                                    ),
                                    pre: ( { children } ) => (
                                        <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
                                    ),
                                    blockquote: ( { children } ) => (
                                        <blockquote className="border-l-4 border-cyan-400 pl-4 italic text-gray-300 mb-4">{children}</blockquote>
                                    ),
                                    a: ( { href, children } ) => (
                                        <a href={href} className="text-cyan-400 hover:text-cyan-300 underline" target="_blank" rel="noopener noreferrer">
                                            {children}
                                        </a>
                                    ),
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        </div>
                    </motion.div>

                    {/* Author Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-12 bg-gray-900 rounded-lg p-6 border border-gray-800"
                    >
                        <h3 className="text-xl font-bold text-cyan-400 mb-4">About the Author</h3>
                        <div className="flex items-center">
                            <div className="w-12 h-12 bg-cyan-400 rounded-full flex items-center justify-center text-gray-900 font-bold text-lg mr-4">
                                {post.frontmatter.author.charAt( 0 ).toUpperCase()}
                            </div>
                            <div>
                                <p className="font-semibold text-white">{post.frontmatter.author}</p>
                                <p className="text-gray-400">Security Expert at Webifant Security</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
} 