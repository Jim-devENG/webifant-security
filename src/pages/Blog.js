import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendar, FaUser, FaArrowRight, FaSearch } from "react-icons/fa";
import { getAllPosts } from "../firebase/blogService";

export default function Blog() {
    const [posts, setPosts] = useState( [] );
    const [filteredPosts, setFilteredPosts] = useState( [] );
    const [searchTerm, setSearchTerm] = useState( "" );
    const [selectedTag, setSelectedTag] = useState( "" );
    const [isLoading, setIsLoading] = useState( true );
    const [tags, setTags] = useState( [] );

    useEffect( () => {
        loadPosts();
    }, [] );

    const loadPosts = async () => {
        setIsLoading( true );
        try {
            const allPosts = await getAllPosts();
            setPosts( allPosts );
            setFilteredPosts( allPosts );

            // Extract unique tags
            const allTags = new Set();
            allPosts.forEach( post => {
                if ( post.frontmatter.tags ) {
                    post.frontmatter.tags.forEach( tag => allTags.add( tag ) );
                }
            } );
            setTags( Array.from( allTags ) );
        } catch ( error ) {
            console.error( 'Error loading posts:', error );
        } finally {
            setIsLoading( false );
        }
    };

    useEffect( () => {
        let filtered = posts;

        // Filter by search term
        if ( searchTerm ) {
            filtered = filtered.filter( post =>
                post.frontmatter.title.toLowerCase().includes( searchTerm.toLowerCase() ) ||
                post.frontmatter.excerpt.toLowerCase().includes( searchTerm.toLowerCase() ) ||
                post.frontmatter.author.toLowerCase().includes( searchTerm.toLowerCase() )
            );
        }

        // Filter by tag
        if ( selectedTag ) {
            filtered = filtered.filter( post =>
                post.frontmatter.tags && post.frontmatter.tags.includes( selectedTag )
            );
        }

        setFilteredPosts( filtered );
    }, [posts, searchTerm, selectedTag] );

    const clearFilters = () => {
        setSearchTerm( "" );
        setSelectedTag( "" );
    };

    if ( isLoading ) {
        return (
            <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                    <p>Loading blog posts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-950 text-white min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h1 className="text-5xl font-bold text-cyan-400 mb-6">
                            Security Blog
                        </h1>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Stay informed about the latest cybersecurity threats, best practices, and industry insights from our security experts.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-8 border-b border-gray-800">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                        {/* Search */}
                        <div className="relative flex-1 max-w-md">
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search posts..."
                                value={searchTerm}
                                onChange={( e ) => setSearchTerm( e.target.value )}
                                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-400"
                            />
                        </div>

                        {/* Tags Filter */}
                        <div className="flex flex-wrap gap-2">
                            {tags.map( ( tag ) => (
                                <button
                                    key={tag}
                                    onClick={() => setSelectedTag( selectedTag === tag ? "" : tag )}
                                    className={`px-3 py-1 rounded-full text-sm transition ${selectedTag === tag
                                            ? "bg-cyan-400 text-gray-900"
                                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        }`}
                                >
                                    {tag}
                                </button>
                            ) )}
                        </div>

                        {/* Clear Filters */}
                        {( searchTerm || selectedTag ) && (
                            <button
                                onClick={clearFilters}
                                className="text-cyan-400 hover:text-cyan-300 transition"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="py-16">
                <div className="max-w-6xl mx-auto px-4">
                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-16">
                            <h3 className="text-2xl font-bold text-gray-400 mb-4">
                                {posts.length === 0 ? "No posts yet" : "No posts found"}
                            </h3>
                            <p className="text-gray-500">
                                {posts.length === 0
                                    ? "Check back soon for our first security insights!"
                                    : "Try adjusting your search or filter criteria."
                                }
                            </p>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredPosts.map( ( post, index ) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300"
                                >
                                    <div className="aspect-video bg-gray-800 relative overflow-hidden">
                                        <img
                                            src={post.frontmatter.image}
                                            alt={post.frontmatter.title}
                                            className="w-full h-full object-cover"
                                            onError={( e ) => {
                                                e.target.src = "https://via.placeholder.com/400x225/1f2937/6b7280?text=Security+Blog";
                                            }}
                                        />
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center text-sm text-gray-400 mb-3">
                                            <FaCalendar className="mr-2" />
                                            {post.frontmatter.date}
                                            <FaUser className="ml-4 mr-2" />
                                            {post.frontmatter.author}
                                        </div>

                                        <h3 className="text-xl font-bold text-cyan-300 mb-3 line-clamp-2">
                                            {post.frontmatter.title}
                                        </h3>

                                        <p className="text-gray-400 mb-4 line-clamp-3">
                                            {post.frontmatter.excerpt}
                                        </p>

                                        {post.frontmatter.tags && post.frontmatter.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {post.frontmatter.tags.slice( 0, 3 ).map( ( tag ) => (
                                                    <span
                                                        key={tag}
                                                        className="px-2 py-1 bg-gray-800 text-cyan-400 text-xs rounded"
                                                    >
                                                        {tag}
                                                    </span>
                                                ) )}
                                            </div>
                                        )}

                                        <Link
                                            to={`/blog/${post.slug}`}
                                            className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition group"
                                        >
                                            Read More
                                            <FaArrowRight className="ml-2 group-hover:translate-x-1 transition" />
                                        </Link>
                                    </div>
                                </motion.article>
                            ) )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
} 