import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCalendar, FaUser, FaArrowRight, FaSearch, FaSort, FaFilter, FaChevronLeft, FaChevronRight, FaEye, FaClock, FaTag } from "react-icons/fa";
import { getAllPosts } from "../firebase/blogService";
import Header from './Header';
import Footer from './Footer';

export default function Blog() {
    const [posts, setPosts] = useState( [] );
    const [filteredPosts, setFilteredPosts] = useState( [] );
    const [searchTerm, setSearchTerm] = useState( "" );
    const [selectedTag, setSelectedTag] = useState( "" );
    const [sortBy, setSortBy] = useState( "date" );
    const [sortOrder, setSortOrder] = useState( "desc" );
    const [isLoading, setIsLoading] = useState( true );
    const [tags, setTags] = useState( [] );

    // Pagination states
    const [currentPage, setCurrentPage] = useState( 1 );
    const [postsPerPage] = useState( 9 );
    const [showFilters, setShowFilters] = useState( false );

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

        // Sort posts
        filtered.sort( ( a, b ) => {
            let aValue, bValue;

            switch ( sortBy ) {
                case "date":
                    aValue = new Date( a.frontmatter.date );
                    bValue = new Date( b.frontmatter.date );
                    break;
                case "title":
                    aValue = a.frontmatter.title.toLowerCase();
                    bValue = b.frontmatter.title.toLowerCase();
                    break;
                case "author":
                    aValue = a.frontmatter.author.toLowerCase();
                    bValue = b.frontmatter.author.toLowerCase();
                    break;
                default:
                    aValue = new Date( a.frontmatter.date );
                    bValue = new Date( b.frontmatter.date );
            }

            if ( sortOrder === "asc" ) {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        } );

        setFilteredPosts( filtered );
        setCurrentPage( 1 ); // Reset to first page when filters change
    }, [posts, searchTerm, selectedTag, sortBy, sortOrder] );

    const clearFilters = () => {
        setSearchTerm( "" );
        setSelectedTag( "" );
        setSortBy( "date" );
        setSortOrder( "desc" );
    };

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice( indexOfFirstPost, indexOfLastPost );
    const totalPages = Math.ceil( filteredPosts.length / postsPerPage );

    const paginate = ( pageNumber ) => {
        setCurrentPage( pageNumber );
        window.scrollTo( { top: 0, behavior: 'smooth' } );
    };

    const getPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        if ( totalPages <= maxVisiblePages ) {
            for ( let i = 1;i <= totalPages;i++ ) {
                pageNumbers.push( i );
            }
        } else {
            if ( currentPage <= 3 ) {
                for ( let i = 1;i <= 4;i++ ) {
                    pageNumbers.push( i );
                }
                pageNumbers.push( '...' );
                pageNumbers.push( totalPages );
            } else if ( currentPage >= totalPages - 2 ) {
                pageNumbers.push( 1 );
                pageNumbers.push( '...' );
                for ( let i = totalPages - 3;i <= totalPages;i++ ) {
                    pageNumbers.push( i );
                }
            } else {
                pageNumbers.push( 1 );
                pageNumbers.push( '...' );
                for ( let i = currentPage - 1;i <= currentPage + 1;i++ ) {
                    pageNumbers.push( i );
                }
                pageNumbers.push( '...' );
                pageNumbers.push( totalPages );
            }
        }

        return pageNumbers;
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
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-20 pt-32">
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
                    <div className="flex flex-col gap-4">
                        {/* Search and Sort Row */}
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

                            {/* Sort Controls */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <FaSort className="text-gray-400" />
                                    <select
                                        value={sortBy}
                                        onChange={( e ) => setSortBy( e.target.value )}
                                        className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white focus:outline-none focus:border-cyan-400"
                                    >
                                        <option value="date">Date</option>
                                        <option value="title">Title</option>
                                        <option value="author">Author</option>
                                    </select>
                                    <button
                                        onClick={() => setSortOrder( sortOrder === "asc" ? "desc" : "asc" )}
                                        className="bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white hover:bg-gray-700 transition"
                                    >
                                        {sortOrder === "asc" ? "↑" : "↓"}
                                    </button>
                                </div>

                                <button
                                    onClick={() => setShowFilters( !showFilters )}
                                    className="flex items-center gap-2 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white hover:bg-gray-700 transition"
                                >
                                    <FaFilter />
                                    Filters
                                </button>

                                {/* Clear Filters */}
                                {( searchTerm || selectedTag ) && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-cyan-400 hover:text-cyan-300 transition"
                                    >
                                        Clear All
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Filters Row */}
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="flex flex-wrap gap-2"
                            >
                                {tags.map( ( tag ) => (
                                    <button
                                        key={tag}
                                        onClick={() => setSelectedTag( selectedTag === tag ? "" : tag )}
                                        className={`px-3 py-1 rounded-full text-sm transition flex items-center gap-1 ${selectedTag === tag
                                            ? "bg-cyan-400 text-gray-900"
                                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            }`}
                                    >
                                        <FaTag className="text-xs" />
                                        {tag}
                                    </button>
                                ) )}
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Results Summary */}
            <section className="py-4 border-b border-gray-800">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex justify-between items-center text-sm text-gray-400">
                        <div className="flex items-center gap-4">
                            <span>Showing {indexOfFirstPost + 1}-{Math.min( indexOfLastPost, filteredPosts.length )} of {filteredPosts.length} posts</span>
                            {searchTerm && <span>• Search: "{searchTerm}"</span>}
                            {selectedTag && <span>• Tag: {selectedTag}</span>}
                        </div>
                        <div className="flex items-center gap-2">
                            <FaClock className="text-xs" />
                            <span>Sorted by {sortBy} ({sortOrder})</span>
                        </div>
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
                        <>
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {currentPosts.map( ( post, index ) => (
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

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-12 flex justify-center">
                                    <nav className="flex items-center space-x-2">
                                        {/* Previous Page */}
                                        <button
                                            onClick={() => paginate( currentPage - 1 )}
                                            disabled={currentPage === 1}
                                            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                        >
                                            <FaChevronLeft />
                                        </button>

                                        {/* Page Numbers */}
                                        {getPageNumbers().map( ( number, index ) => (
                                            <button
                                                key={index}
                                                onClick={() => typeof number === 'number' ? paginate( number ) : null}
                                                disabled={typeof number !== 'number'}
                                                className={`px-3 py-2 rounded transition ${number === currentPage
                                                        ? 'bg-cyan-400 text-gray-900'
                                                        : typeof number === 'number'
                                                            ? 'bg-gray-800 border border-gray-700 text-white hover:bg-gray-700'
                                                            : 'text-gray-400 cursor-default'
                                                    }`}
                                            >
                                                {number}
                                            </button>
                                        ) )}

                                        {/* Next Page */}
                                        <button
                                            onClick={() => paginate( currentPage + 1 )}
                                            disabled={currentPage === totalPages}
                                            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
                                        >
                                            <FaChevronRight />
                                        </button>
                                    </nav>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
            {/* Footer */}
            <Footer />
        </div>
    );
} 