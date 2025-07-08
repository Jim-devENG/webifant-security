import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaSignOutAlt, FaEye } from "react-icons/fa";
import { getAllPosts, createPost, updatePost, deletePost, generateSlug } from "../firebase/blogService";
import { signOutUser } from "../firebase/authService";

const schema = yup.object( {
    title: yup.string().required( "Title is required" ),
    excerpt: yup.string().required( "Excerpt is required" ),
    author: yup.string().required( "Author is required" ),
    image: yup.string().required( "Image URL is required" ),
    tags: yup.string(),
} ).required();

export default function AdminDashboard( { onLogout } ) {
    const [posts, setPosts] = useState( [] );
    const [isCreating, setIsCreating] = useState( false );
    const [editingPost, setEditingPost] = useState( null );
    const [content, setContent] = useState( "" );
    const [isSubmitting, setIsSubmitting] = useState( false );
    const [isLoading, setIsLoading] = useState( true );

    const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm( {
        resolver: yupResolver( schema )
    } );

    useEffect( () => {
        loadPosts();
    }, [] );

    const loadPosts = async () => {
        setIsLoading( true );
        try {
            const allPosts = await getAllPosts();
            setPosts( allPosts );
        } catch ( error ) {
            console.error( 'Error loading posts:', error );
        } finally {
            setIsLoading( false );
        }
    };

    const handleCreateNew = () => {
        setIsCreating( true );
        setEditingPost( null );
        reset();
        setContent( "" );
    };

    const handleEdit = ( post ) => {
        setEditingPost( post );
        setIsCreating( false );
        setValue( "title", post.frontmatter.title );
        setValue( "excerpt", post.frontmatter.excerpt );
        setValue( "author", post.frontmatter.author );
        setValue( "image", post.frontmatter.image );
        setValue( "tags", post.frontmatter.tags?.join( ", " ) || "" );
        setContent( post.content );
    };

    const handleDelete = async ( postId ) => {
        if ( window.confirm( "Are you sure you want to delete this post?" ) ) {
            try {
                await deletePost( postId );
                await loadPosts();
                alert( "Post deleted successfully!" );
            } catch ( error ) {
                alert( "Error deleting post: " + error.message );
            }
        }
    };

    const onSubmit = async ( data ) => {
        setIsSubmitting( true );

        try {
            const postData = {
                title: data.title,
                excerpt: data.excerpt,
                author: data.author,
                image: data.image,
                tags: data.tags ? data.tags.split( "," ).map( tag => tag.trim() ) : [],
                date: new Date().toISOString().split( 'T' )[0],
                content: content,
                slug: editingPost ? editingPost.slug : generateSlug( data.title )
            };

            if ( editingPost ) {
                await updatePost( editingPost.id, postData );
                alert( "Post updated successfully!" );
            } else {
                await createPost( postData );
                alert( "Post created successfully!" );
            }

            setIsCreating( false );
            setEditingPost( null );
            reset();
            setContent( "" );
            await loadPosts();
        } catch ( error ) {
            alert( "Error saving post: " + error.message );
        } finally {
            setIsSubmitting( false );
        }
    };

    const handleLogout = async () => {
        try {
            await signOutUser();
            onLogout();
        } catch ( error ) {
            console.error( 'Error signing out:', error );
            onLogout();
        }
    };

    if ( isLoading ) {
        return (
            <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                    <p>Loading posts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-950 text-white min-h-screen">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-800 p-4">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-cyan-400">Admin Dashboard</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={handleCreateNew}
                            className="bg-cyan-400 text-gray-900 px-4 py-2 rounded hover:bg-cyan-300 transition flex items-center gap-2"
                        >
                            <FaPlus /> New Post
                        </button>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition flex items-center gap-2"
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto p-4">
                {/* Blog Post Form */}
                {( isCreating || editingPost ) && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-900 rounded-lg p-6 mb-8"
                    >
                        <h2 className="text-xl font-bold text-cyan-400 mb-4">
                            {isCreating ? "Create New Post" : "Edit Post"}
                        </h2>

                        <form onSubmit={handleSubmit( onSubmit )} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-300 mb-2">Title</label>
                                    <input
                                        {...register( "title" )}
                                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-400"
                                    />
                                    {errors.title && (
                                        <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2">Author</label>
                                    <input
                                        {...register( "author" )}
                                        className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-400"
                                    />
                                    {errors.author && (
                                        <p className="text-red-400 text-sm mt-1">{errors.author.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Excerpt</label>
                                <textarea
                                    {...register( "excerpt" )}
                                    rows={3}
                                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-400"
                                />
                                {errors.excerpt && (
                                    <p className="text-red-400 text-sm mt-1">{errors.excerpt.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Image URL</label>
                                <input
                                    {...register( "image" )}
                                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-400"
                                />
                                {errors.image && (
                                    <p className="text-red-400 text-sm mt-1">{errors.image.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Tags (comma-separated)</label>
                                <input
                                    {...register( "tags" )}
                                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-400"
                                    placeholder="security, phishing, training"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Content (Markdown)</label>
                                <textarea
                                    value={content}
                                    onChange={( e ) => setContent( e.target.value )}
                                    rows={15}
                                    className="w-full p-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-cyan-400 font-mono text-sm"
                                    placeholder="# Your Post Title

## Introduction
Write your content here using markdown...

## Section 1
- Point 1
- Point 2

## Conclusion
Your conclusion here."
                                />
                            </div>

                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-cyan-400 text-gray-900 px-6 py-2 rounded hover:bg-cyan-300 transition disabled:opacity-50"
                                >
                                    {isSubmitting ? "Saving..." : "Save Post"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsCreating( false );
                                        setEditingPost( null );
                                        reset();
                                        setContent( "" );
                                    }}
                                    className="bg-gray-700 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                )}

                {/* Posts List */}
                <div className="bg-gray-900 rounded-lg p-6">
                    <h2 className="text-xl font-bold text-cyan-400 mb-4">All Posts</h2>
                    {posts.length === 0 ? (
                        <p className="text-gray-400 text-center py-8">No posts yet. Create your first post!</p>
                    ) : (
                        <div className="space-y-4">
                            {posts.map( ( post, index ) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-gray-800 rounded-lg p-4 flex justify-between items-center"
                                >
                                    <div>
                                        <h3 className="text-lg font-semibold text-cyan-300">{post.frontmatter.title}</h3>
                                        <p className="text-gray-400 text-sm">{post.frontmatter.date} • {post.frontmatter.author}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <a
                                            href={`/blog/${post.slug}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-500 transition"
                                        >
                                            <FaEye />
                                        </a>
                                        <button
                                            onClick={() => handleEdit( post )}
                                            className="bg-yellow-600 text-white p-2 rounded hover:bg-yellow-500 transition"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() => handleDelete( post.id )}
                                            className="bg-red-600 text-white p-2 rounded hover:bg-red-500 transition"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </motion.div>
                            ) )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
} 