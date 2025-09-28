import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaEnvelopeOpen, FaClock, FaCheckCircle, FaExclamationTriangle, FaTrash } from 'react-icons/fa';
import { emailService } from '../firebase/emailService';

const NotificationHistory = ( { userEmail } ) => {
    const [notifications, setNotifications] = useState( [] );
    const [isLoading, setIsLoading] = useState( true );
    const [filter, setFilter] = useState( 'all' ); // all, unread, read

    useEffect( () => {
        if ( userEmail ) {
            loadNotifications();
        }
    }, [userEmail] );

    const loadNotifications = async () => {
        try {
            setIsLoading( true );
            const history = await emailService.getNotificationHistory( userEmail );
            setNotifications( history );
        } catch ( error ) {
            console.error( 'Error loading notifications:', error );
        } finally {
            setIsLoading( false );
        }
    };

    const markAsRead = async ( notificationId ) => {
        try {
            await emailService.markNotificationAsRead( notificationId );
            // Update local state
            setNotifications( prev =>
                prev.map( notification =>
                    notification.id === notificationId
                        ? { ...notification, readAt: new Date() }
                        : notification
                )
            );
        } catch ( error ) {
            console.error( 'Error marking notification as read:', error );
        }
    };

    const getStatusIcon = ( status ) => {
        switch ( status ) {
            case 'sent':
                return <FaCheckCircle className="text-green-500" />;
            case 'pending':
                return <FaClock className="text-yellow-500" />;
            case 'failed':
                return <FaExclamationTriangle className="text-red-500" />;
            default:
                return <FaEnvelope className="text-gray-500" />;
        }
    };

    const getTypeIcon = ( type ) => {
        switch ( type ) {
            case 'commission':
                return <span className="text-green-400">💰</span>;
            case 'payout':
                return <span className="text-blue-400">💳</span>;
            case 'welcome':
                return <span className="text-purple-400">🎉</span>;
            case 'service_completion':
                return <span className="text-orange-400">✅</span>;
            default:
                return <span className="text-gray-400">📧</span>;
        }
    };

    const formatDate = ( timestamp ) => {
        if ( !timestamp ) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date( timestamp );
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    };

    const filteredNotifications = notifications.filter( notification => {
        if ( filter === 'unread' ) return !notification.readAt;
        if ( filter === 'read' ) return notification.readAt;
        return true;
    } );

    if ( isLoading ) {
        return (
            <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Email Notifications</h3>
                <div className="flex items-center space-x-2">
                    <select
                        value={filter}
                        onChange={( e ) => setFilter( e.target.value )}
                        className="border border-gray-300 rounded-md px-3 py-1 text-sm"
                    >
                        <option value="all">All</option>
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                    </select>
                    <button
                        onClick={loadNotifications}
                        className="text-cyan-600 hover:text-cyan-700 text-sm"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            {/* Notifications List */}
            {filteredNotifications.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                    <FaEnvelope className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <p>No notifications found</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {filteredNotifications.map( ( notification ) => (
                        <div
                            key={notification.id}
                            className={`bg-white border rounded-lg p-4 shadow-sm ${notification.readAt ? 'opacity-75' : 'border-l-4 border-l-cyan-400'
                                }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3 flex-1">
                                    {/* Type Icon */}
                                    <div className="text-xl">
                                        {getTypeIcon( notification.type )}
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <h4 className="font-medium text-gray-900 truncate">
                                                {notification.subject}
                                            </h4>
                                            <div className="flex items-center space-x-1">
                                                {getStatusIcon( notification.status )}
                                                {!notification.readAt && (
                                                    <FaEnvelope className="text-cyan-500 text-xs" />
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-sm text-gray-600 mb-2">
                                            {notification.message.replace( /<[^>]*>/g, '' ).substring( 0, 100 )}...
                                        </p>

                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                            <span>Sent: {formatDate( notification.createdAt )}</span>
                                            {notification.sentAt && (
                                                <span>Delivered: {formatDate( notification.sentAt )}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex items-center space-x-2 ml-4">
                                    {!notification.readAt && (
                                        <button
                                            onClick={() => markAsRead( notification.id )}
                                            className="text-cyan-600 hover:text-cyan-700 text-sm"
                                            title="Mark as read"
                                        >
                                            <FaEnvelopeOpen />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="mt-2">
                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${notification.status === 'sent' ? 'bg-green-100 text-green-800' :
                                        notification.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            notification.status === 'failed' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                    }`}>
                                    {notification.status}
                                </span>
                                <span className="ml-2 text-xs text-gray-500 capitalize">
                                    {notification.type.replace( '_', ' ' )}
                                </span>
                            </div>
                        </div>
                    ) )}
                </div>
            )}

            {/* Stats */}
            <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold text-gray-900">
                            {notifications.length}
                        </div>
                        <div className="text-sm text-gray-600">Total</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-cyan-600">
                            {notifications.filter( n => !n.readAt ).length}
                        </div>
                        <div className="text-sm text-gray-600">Unread</div>
                    </div>
                    <div>
                        <div className="text-2xl font-bold text-green-600">
                            {notifications.filter( n => n.status === 'sent' ).length}
                        </div>
                        <div className="text-sm text-gray-600">Delivered</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationHistory; 