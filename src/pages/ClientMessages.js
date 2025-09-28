import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaUser, FaClock, FaCheck, FaCheckDouble, FaReply, FaTimes } from "react-icons/fa";
import { getClientMessages, sendMessage, markMessageAsRead, listenToMessages } from "../firebase/communicationService";

export default function ClientMessages() {
    const [messages, setMessages] = useState( [] );
    const [newMessage, setNewMessage] = useState( "" );
    const [isLoading, setIsLoading] = useState( true );
    const [isSending, setIsSending] = useState( false );
    const [selectedMessage, setSelectedMessage] = useState( null );
    const [showReplyModal, setShowReplyModal] = useState( false );

    const clientId = localStorage.getItem( "clientUid" );

    useEffect( () => {
        if ( clientId ) {
            loadMessages();
            // Set up real-time listener
            const unsubscribe = listenToMessages( clientId, ( updatedMessages ) => {
                setMessages( updatedMessages );
                setIsLoading( false );
            } );

            return () => unsubscribe();
        }
    }, [clientId] );

    const loadMessages = async () => {
        try {
            const messagesData = await getClientMessages( clientId );
            setMessages( messagesData );
        } catch ( error ) {
            console.error( "Error loading messages:", error );
        } finally {
            setIsLoading( false );
        }
    };

    const handleSendMessage = async ( e ) => {
        e.preventDefault();
        if ( !newMessage.trim() ) return;

        setIsSending( true );
        try {
            await sendMessage( clientId, "admin", newMessage );
            setNewMessage( "" );
        } catch ( error ) {
            console.error( "Error sending message:", error );
        } finally {
            setIsSending( false );
        }
    };

    const handleMarkAsRead = async ( messageId ) => {
        try {
            await markMessageAsRead( messageId );
        } catch ( error ) {
            console.error( "Error marking message as read:", error );
        }
    };

    const formatDate = ( timestamp ) => {
        const date = new Date( timestamp );
        const now = new Date();
        const diffInHours = ( now - date ) / ( 1000 * 60 * 60 );

        if ( diffInHours < 24 ) {
            return date.toLocaleTimeString( [], { hour: '2-digit', minute: '2-digit' } );
        } else {
            return date.toLocaleDateString();
        }
    };

    const isToday = ( timestamp ) => {
        const date = new Date( timestamp );
        const today = new Date();
        return date.toDateString() === today.toDateString();
    };

    const isYesterday = ( timestamp ) => {
        const date = new Date( timestamp );
        const yesterday = new Date();
        yesterday.setDate( yesterday.getDate() - 1 );
        return date.toDateString() === yesterday.toDateString();
    };

    const getDateHeader = ( timestamp ) => {
        if ( isToday( timestamp ) ) {
            return "Today";
        } else if ( isYesterday( timestamp ) ) {
            return "Yesterday";
        } else {
            return new Date( timestamp ).toLocaleDateString();
        }
    };

    if ( isLoading ) {
        return (
            <div className="bg-gray-950 text-white min-h-screen p-8">
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-950 text-white min-h-screen">
            <div className="max-w-4xl mx-auto p-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-cyan-400 mb-2">Messages</h1>
                    <p className="text-gray-400">Communicate with our security team</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Message List */}
                    <div className="lg:col-span-1 bg-gray-900 rounded-lg p-6">
                        <h2 className="text-xl font-semibold text-white mb-4">Conversations</h2>

                        {messages.length === 0 ? (
                            <div className="text-center py-8">
                                <p className="text-gray-400">No messages yet</p>
                                <p className="text-gray-500 text-sm mt-2">Start a conversation with our team</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {messages.map( ( message, index ) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        onClick={() => {
                                            setSelectedMessage( message );
                                            if ( !message.read ) {
                                                handleMarkAsRead( message.id );
                                            }
                                        }}
                                        className={`p-4 rounded-lg cursor-pointer transition ${selectedMessage?.id === message.id
                                                ? "bg-cyan-400/20 border border-cyan-400"
                                                : "bg-gray-800 hover:bg-gray-700"
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-cyan-400/20 p-2 rounded-full">
                                                    <FaUser className="text-cyan-400" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-semibold">
                                                        {message.adminId === "admin" ? "Security Team" : "Admin"}
                                                    </p>
                                                    <p className="text-gray-400 text-sm truncate max-w-[200px]">
                                                        {message.message}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                {!message.read && (
                                                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                                                )}
                                                <span className="text-gray-500 text-xs">
                                                    {formatDate( message.timestamp )}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) )}
                            </div>
                        )}
                    </div>

                    {/* Message Detail */}
                    <div className="lg:col-span-2 bg-gray-900 rounded-lg p-6">
                        {selectedMessage ? (
                            <div className="h-full flex flex-col">
                                {/* Message Header */}
                                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <div className="bg-cyan-400/20 p-3 rounded-full">
                                            <FaUser className="text-cyan-400 text-xl" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-semibold">
                                                {selectedMessage.adminId === "admin" ? "Security Team" : "Admin"}
                                            </h3>
                                            <p className="text-gray-400 text-sm">
                                                {formatDate( selectedMessage.timestamp )}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        {selectedMessage.read ? (
                                            <FaCheckDouble className="text-green-400" />
                                        ) : (
                                            <FaCheck className="text-gray-400" />
                                        )}
                                        <button
                                            onClick={() => setShowReplyModal( true )}
                                            className="text-cyan-400 hover:text-cyan-300 p-2"
                                        >
                                            <FaReply />
                                        </button>
                                    </div>
                                </div>

                                {/* Message Content */}
                                <div className="flex-1">
                                    <div className="bg-gray-800 rounded-lg p-4 mb-4">
                                        <p className="text-white">{selectedMessage.message}</p>
                                    </div>
                                </div>

                                {/* Send Message Form */}
                                <form onSubmit={handleSendMessage} className="mt-4">
                                    <div className="flex space-x-4">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={( e ) => setNewMessage( e.target.value )}
                                            placeholder="Type your message..."
                                            className="flex-1 bg-gray-800 border border-gray-700 rounded px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                                        />
                                        <button
                                            type="submit"
                                            disabled={isSending || !newMessage.trim()}
                                            className="bg-cyan-400 text-gray-900 px-6 py-3 rounded hover:bg-cyan-300 transition disabled:opacity-50"
                                        >
                                            {isSending ? (
                                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900"></div>
                                            ) : (
                                                <FaPaperPlane />
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="h-full flex items-center justify-center">
                                <div className="text-center">
                                    <FaUser className="text-gray-400 text-4xl mx-auto mb-4" />
                                    <p className="text-gray-400">Select a message to view details</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Reply Modal */}
            {showReplyModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-900 rounded-lg p-6 w-full max-w-md"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">Reply to Message</h3>
                            <button
                                onClick={() => setShowReplyModal( false )}
                                className="text-gray-400 hover:text-white"
                            >
                                <FaTimes />
                            </button>
                        </div>

                        <div className="mb-4">
                            <p className="text-gray-400 text-sm mb-2">Original Message:</p>
                            <div className="bg-gray-800 rounded p-3">
                                <p className="text-white text-sm">{selectedMessage?.message}</p>
                            </div>
                        </div>

                        <form onSubmit={handleSendMessage}>
                            <textarea
                                value={newMessage}
                                onChange={( e ) => setNewMessage( e.target.value )}
                                placeholder="Type your reply..."
                                rows="4"
                                className="w-full bg-gray-800 border border-gray-700 rounded px-4 py-3 text-white focus:border-cyan-400 focus:outline-none mb-4"
                            />
                            <div className="flex gap-4">
                                <button
                                    type="submit"
                                    disabled={isSending || !newMessage.trim()}
                                    className="flex-1 bg-cyan-400 text-gray-900 py-2 rounded hover:bg-cyan-300 transition disabled:opacity-50"
                                >
                                    {isSending ? "Sending..." : "Send Reply"}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowReplyModal( false )}
                                    className="flex-1 bg-gray-600 text-white py-2 rounded hover:bg-gray-700 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </div>
    );
} 