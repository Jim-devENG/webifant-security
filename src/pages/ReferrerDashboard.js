import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    getReferrerById,
    getReferralsByReferrerId,
    getReferrerRewards,
    getReferrerAnalytics,
    subscribeToReferrer,
    subscribeToReferrals,
    subscribeToRewards,
    subscribeToAnalytics
} from '../firebase/referrerService';
import { ReferrerLink } from '../components/ReferrerTracker';
import Header from './Header';
import PaymentDashboard from '../components/PaymentDashboard';
import NotificationHistory from '../components/NotificationHistory';

const ReferrerDashboard = () => {
    const [referrer, setReferrer] = useState( null );
    const [referrals, setReferrals] = useState( [] );
    const [rewards, setRewards] = useState( [] );
    const [analytics, setAnalytics] = useState( null );
    const [timeRange, setTimeRange] = useState( '30d' );
    const [isLoading, setIsLoading] = useState( true );
    const [activeTab, setActiveTab] = useState( 'overview' );
    const [copyNotification, setCopyNotification] = useState( false );
    const [copiedItem, setCopiedItem] = useState( '' );
    const [unsubscribers, setUnsubscribers] = useState( [] );

    useEffect( () => {
        // Clean up previous listeners
        unsubscribers.forEach( unsubscribe => unsubscribe() );
        setUnsubscribers( [] );

        const referrerId = localStorage.getItem( 'referrerId' ) ||
            new URLSearchParams( window.location.search ).get( 'id' );

        if ( !referrerId ) {
            setIsLoading( false );
            return;
        }

        console.log( 'Setting up real-time listeners for referrer ID:', referrerId );

        const newUnsubscribers = [];

        // Subscribe to referrer data
        const referrerUnsubscribe = subscribeToReferrer( referrerId, ( referrerData ) => {
            if ( referrerData ) {
                setReferrer( referrerData );
                console.log( 'Real-time referrer data updated:', referrerData );
            } else {
                setReferrer( null );
            }
            setIsLoading( false );
        } );
        newUnsubscribers.push( referrerUnsubscribe );

        // Subscribe to referrals
        const referralsUnsubscribe = subscribeToReferrals( referrerId, ( referralsData ) => {
            setReferrals( referralsData );
            console.log( 'Real-time referrals data updated:', referralsData.length, 'referrals' );
        } );
        newUnsubscribers.push( referralsUnsubscribe );

        // Subscribe to rewards
        const rewardsUnsubscribe = subscribeToRewards( referrerId, ( rewardsData ) => {
            setRewards( rewardsData );
            console.log( 'Real-time rewards data updated:', rewardsData.length, 'rewards' );
        } );
        newUnsubscribers.push( rewardsUnsubscribe );

        // Subscribe to analytics
        const analyticsUnsubscribe = subscribeToAnalytics( referrerId, timeRange, ( analyticsData ) => {
            setAnalytics( analyticsData );
            console.log( 'Real-time analytics data updated:', analyticsData );
        } );
        newUnsubscribers.push( analyticsUnsubscribe );

        setUnsubscribers( newUnsubscribers );

        // Cleanup function
        return () => {
            newUnsubscribers.forEach( unsubscribe => unsubscribe() );
        };
    }, [timeRange] );

    const formatDate = ( timestamp ) => {
        if ( !timestamp ) return 'N/A';
        const date = timestamp.toDate ? timestamp.toDate() : new Date( timestamp );
        return date.toLocaleDateString();
    };

    const formatCurrency = ( amount ) => {
        return new Intl.NumberFormat( 'en-US', {
            style: 'currency',
            currency: 'USD'
        } ).format( amount );
    };

    const getStatusColor = ( status ) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            successful: 'bg-green-100 text-green-800',
            failed: 'bg-red-100 text-red-800',
            cancelled: 'bg-gray-100 text-gray-800'
        };
        return colors[status] || colors.pending;
    };

    if ( isLoading ) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if ( !referrer ) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Referrer Not Found</h2>
                    <p className="text-gray-600 mb-6">Please check your referrer ID or contact support.</p>

                    {/* Debug information */}
                    <div className="bg-gray-100 p-4 rounded-lg mb-6 text-left max-w-md mx-auto">
                        <h3 className="font-semibold mb-2">Debug Information:</h3>
                        <p className="text-sm text-gray-700">
                            <strong>URL ID:</strong> {new URLSearchParams( window.location.search ).get( 'id' ) || 'None'}<br />
                            <strong>LocalStorage ID:</strong> {localStorage.getItem( 'referrerId' ) || 'None'}<br />
                            <strong>LocalStorage Code:</strong> {localStorage.getItem( 'referrerCode' ) || 'None'}
                        </p>
                    </div>

                    <div className="space-y-3">
                        <a
                            href="/referrer-registration"
                            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Register as Referrer
                        </a>
                        <br />
                        <a
                            href="/"
                            className="inline-block text-blue-600 hover:text-blue-700 transition-colors"
                        >
                            Go to Homepage
                        </a>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            {/* Header */}
            <div className="bg-white shadow pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="py-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="flex items-center space-x-3">
                                    <h1 className="text-3xl font-bold text-gray-900">Referrer Dashboard</h1>
                                    <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span>Live</span>
                                    </div>
                                </div>
                                <p className="mt-1 text-sm text-gray-500">
                                    Welcome back, {referrer.name || referrer.email}
                                </p>
                            </div>
                            <div className="flex items-center space-x-4">
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Your Referrer Code</p>
                                    <p className="text-lg font-mono font-bold text-blue-600">
                                        {referrer.referrerCode}
                                    </p>
                                </div>
                                <ReferrerLink
                                    referrerCode={referrer.referrerCode}
                                    className="text-sm"
                                >
                                    Copy Link
                                </ReferrerLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <nav className="flex space-x-8">
                        {[
                            { id: 'overview', name: 'Overview' },
                            { id: 'referrals', name: 'Referrals' },
                            { id: 'rewards', name: 'Rewards' },
                            { id: 'payments', name: 'Payments' },
                            { id: 'notifications', name: 'Notifications' },
                            { id: 'analytics', name: 'Analytics' }
                        ].map( ( tab ) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab( tab.id )}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                {tab.name}
                            </button>
                        ) )}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {activeTab === 'overview' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Referrer Code Section */}
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-6 mb-8">
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Your Referral Link</h2>
                                    <p className="text-blue-100">Share this link with potential clients - when they click it and register, you'll earn commissions!</p>
                                </div>

                                {/* Full Referral Link */}
                                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-blue-100 text-sm mb-2">Complete Referral Link:</p>
                                            <div className="bg-white bg-opacity-10 rounded px-3 py-2">
                                                <span className="text-white font-mono text-sm break-all">
                                                    {window.location.origin}/client-registration?ref={referrer.referrerCode}
                                                </span>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                const fullLink = `${window.location.origin}/client-registration?ref=${referrer.referrerCode}`;
                                                navigator.clipboard.writeText( fullLink );
                                                setCopiedItem( 'referral link' );
                                                setCopyNotification( true );
                                                setTimeout( () => setCopyNotification( false ), 2000 );
                                            }}
                                            className="ml-4 bg-white bg-opacity-30 hover:bg-opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 flex-shrink-0"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            <span>Copy Link</span>
                                        </button>
                                    </div>
                                </div>

                                {/* Referrer Code Only */}
                                <div className="bg-white bg-opacity-10 rounded-lg p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex-1">
                                            <p className="text-blue-100 text-sm mb-2">Just the Referrer Code:</p>
                                            <span className="text-xl font-mono font-bold text-white tracking-wider">
                                                {referrer.referrerCode}
                                            </span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText( referrer.referrerCode );
                                                setCopiedItem( 'referrer code' );
                                                setCopyNotification( true );
                                                setTimeout( () => setCopyNotification( false ), 2000 );
                                            }}
                                            className="ml-4 bg-white bg-opacity-30 hover:bg-opacity-50 text-white px-3 py-1 rounded-md text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                            <span>Copy Code</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Copy Notification Toast */}
                        {copyNotification && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="fixed top-20 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center space-x-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>{copiedItem === 'referral link' ? 'Referral link copied!' : 'Referrer code copied!'}</span>
                            </motion.div>
                        )}

                        {/* Stats Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Total Referrals</p>
                                        <p className="text-2xl font-semibold text-gray-900">{referrer.totalReferrals}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-green-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Successful</p>
                                        <p className="text-2xl font-semibold text-gray-900">{referrer.successfulReferrals}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-yellow-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 15.586 6H12z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Conversion Rate</p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {referrer.totalReferrals > 0
                                                ? Math.round( ( referrer.successfulReferrals / referrer.totalReferrals ) * 100 )
                                                : 0}%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className="w-8 h-8 bg-purple-500 rounded-md flex items-center justify-center">
                                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">Total Earnings</p>
                                        <p className="text-2xl font-semibold text-gray-900">
                                            {formatCurrency( referrer.totalEarnings )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Recent Activity</h3>
                            </div>
                            <div className="p-6">
                                {referrals.slice( 0, 5 ).length > 0 ? (
                                    <div className="space-y-4">
                                        {referrals.slice( 0, 5 ).map( ( referral ) => (
                                            <div key={referral.id} className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {referral.referredName || referral.referredEmail}
                                                    </p>
                                                    <p className="text-sm text-gray-500">
                                                        {referral.serviceType} • {formatDate( referral.createdAt )}
                                                    </p>
                                                </div>
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor( referral.status )}`}>
                                                    {referral.status}
                                                </span>
                                            </div>
                                        ) )}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-center py-4">No recent activity</p>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'referrals' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">All Referrals</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Referred Person
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Service
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Reward
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {referrals.map( ( referral ) => (
                                            <tr key={referral.id}>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div>
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {referral.referredName || 'N/A'}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {referral.referredEmail}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {referral.serviceType}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatDate( referral.createdAt )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor( referral.status )}`}>
                                                        {referral.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {referral.status === 'successful' ? formatCurrency( referral.reward || 50 ) : '-'}
                                                </td>
                                            </tr>
                                        ) )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'rewards' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-white rounded-lg shadow">
                            <div className="px-6 py-4 border-b border-gray-200">
                                <h3 className="text-lg font-medium text-gray-900">Rewards & Earnings</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Date
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Referral
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Amount
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {rewards.map( ( reward ) => (
                                            <tr key={reward.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {formatDate( reward.createdAt )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {reward.referralId}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                    {formatCurrency( reward.amount )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor( reward.status )}`}>
                                                        {reward.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ) )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'payments' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <PaymentDashboard referrerId={referrer.id} />
                    </motion.div>
                )}

                {activeTab === 'notifications' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <NotificationHistory userEmail={referrer.email} />
                    </motion.div>
                )}

                {activeTab === 'analytics' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-medium text-gray-900">Analytics</h3>
                                <select
                                    value={timeRange}
                                    onChange={( e ) => setTimeRange( e.target.value )}
                                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                                >
                                    <option value="7d">Last 7 days</option>
                                    <option value="30d">Last 30 days</option>
                                    <option value="90d">Last 90 days</option>
                                </select>
                            </div>

                            {analytics && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Recent Referrals</h4>
                                        <p className="text-2xl font-bold text-gray-900">{analytics.recentReferrals}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <h4 className="text-sm font-medium text-gray-500 mb-2">Conversion Rate</h4>
                                        <p className="text-2xl font-bold text-gray-900">{analytics.conversionRate}%</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default ReferrerDashboard; 