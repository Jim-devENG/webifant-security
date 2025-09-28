import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShieldAlt, FaChartLine, FaExclamationTriangle, FaCheckCircle, FaClock, FaDownload, FaFileAlt, FaUserShield, FaClipboardList, FaClipboardCheck, FaFileContract, FaAward, FaRocket, FaTarget, FaBullseye, FaServer, FaNetworkWired, FaDatabase, FaMobile, FaDesktop, FaCloud, FaShieldVirus, FaLock, FaUnlock, FaTimes, FaBell, FaCog, FaSignOutAlt, FaEye, FaEdit, FaPlus, FaTrash, FaSearch, FaFilter, FaSort, FaCalendar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaIndustry, FaUsers, FaBuilding, FaChartBar, FaExclamationCircle, FaCheckDouble, FaArrowRight, FaArrowLeft, FaRefresh, FaSync, FaInfoCircle, FaQuestionCircle, FaBook, FaGraduationCap, FaTools, FaCertificate, FaClipboard, FaFileMedical, FaBug, FaHackerrank, FaUserSecret, FaUserTie, FaUserGraduate, FaUserCog, FaUserCheck, FaUserTimes, FaUserPlus, FaUserMinus, FaUserEdit, FaUserLock, FaUserUnlock, FaUserClock } from "react-icons/fa";
import { collection, onSnapshot, query, where, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase/config";
import { cybersecurityServices, securityMetrics } from "../data/cybersecurityServices";
import Header from './Header';

export default function ClientDashboard() {

    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState( "overview" );
    const [isLoading, setIsLoading] = useState( true );
    const [user, setUser] = useState( null );
    const [clientProfile, setClientProfile] = useState( null );
    const [services, setServices] = useState( [] );
    const [compliance, setCompliance] = useState( [] );
    const [incidents, setIncidents] = useState( [] );
    const [notifications, setNotifications] = useState( [] );
    const [securityMetrics, setSecurityMetrics] = useState( {
        overallRiskScore: 0,
        totalVulnerabilities: 0,
        securityIncidents: 0,
        averageResponseTime: "0 minutes",
        complianceScore: 0,
        uptime: 99.9,
        lastScan: new Date().toISOString().split( 'T' )[0],
        nextScan: new Date( Date.now() + 7 * 24 * 60 * 60 * 1000 ).toISOString().split( 'T' )[0]
    } );

    // Service categories for filtering
    const serviceCategories = [
        { id: "all", name: "All Services", icon: FaTools },
        { id: "assessment", name: "Assessment", icon: FaClipboardList },
        { id: "monitoring", name: "Monitoring", icon: FaEye },
        { id: "training", name: "Training", icon: FaGraduationCap },
        { id: "forensics", name: "Forensics", icon: FaSearch },
        { id: "consulting", name: "Consulting", icon: FaUserTie },
        { id: "management", name: "Management", icon: FaCog }
    ];

    useEffect( () => {

        // Check if user is authenticated
        const clientUid = localStorage.getItem( 'clientUid' );

        if ( !clientUid ) {
            navigate( '/client-login' );
            return;
        }

        // Set user info
        const userInfo = {
            uid: clientUid,
            email: localStorage.getItem( 'clientEmail' ),
            name: localStorage.getItem( 'clientName' )
        };
        setUser( userInfo );

        // Setup real-time listeners
        setupServicesListener( clientUid );
        setupComplianceListener( clientUid );
        setupIncidentsListener( clientUid );
        setupNotificationsListener( clientUid );
        setupClientProfileListener( clientUid );

        setIsLoading( false );
    }, [navigate] );

    const setupServicesListener = ( uid ) => {
        const servicesRef = collection( db, 'client-services' );
        const q = query( servicesRef, where( 'clientId', '==', uid ), orderBy( 'createdAt', 'desc' ) );

        const unsubscribe = onSnapshot( q, ( snapshot ) => {
            const updatedServices = snapshot.docs.map( doc => ( {
                id: doc.id,
                ...doc.data()
            } ) );

            setServices( updatedServices );
            calculateSecurityMetrics( updatedServices );
        }, ( error ) => {
            console.error( 'Error listening to services:', error );
        } );

        return () => unsubscribe();
    };

    const setupComplianceListener = ( uid ) => {
        const complianceRef = collection( db, 'compliance' );
        const q = query( complianceRef, where( 'clientId', '==', uid ), orderBy( 'createdAt', 'desc' ) );

        const unsubscribe = onSnapshot( q, ( snapshot ) => {
            const updatedCompliance = snapshot.docs.map( doc => ( {
                id: doc.id,
                ...doc.data()
            } ) );

            setCompliance( updatedCompliance );
        }, ( error ) => {
            console.error( 'Error listening to compliance:', error );
        } );

        return () => unsubscribe();
    };

    const setupIncidentsListener = ( uid ) => {
        const incidentsRef = collection( db, 'incidents' );
        const q = query( incidentsRef, where( 'clientId', '==', uid ), orderBy( 'createdAt', 'desc' ) );

        const unsubscribe = onSnapshot( q, ( snapshot ) => {
            const updatedIncidents = snapshot.docs.map( doc => ( {
                id: doc.id,
                ...doc.data()
            } ) );

            setIncidents( updatedIncidents );
        }, ( error ) => {
            console.error( 'Error listening to incidents:', error );
        } );

        return () => unsubscribe();
    };

    const setupNotificationsListener = ( uid ) => {
        const notificationsRef = collection( db, 'client-notifications' );
        const q = query( notificationsRef, where( 'clientId', '==', uid ), orderBy( 'createdAt', 'desc' ), limit( 10 ) );

        const unsubscribe = onSnapshot( q, ( snapshot ) => {
            const updatedNotifications = snapshot.docs.map( doc => ( {
                id: doc.id,
                ...doc.data()
            } ) );

            setNotifications( updatedNotifications );
        }, ( error ) => {
            console.error( 'Error listening to notifications:', error );
        } );

        return () => unsubscribe();
    };

    const setupClientProfileListener = ( uid ) => {
        const clientRef = collection( db, 'clients' );
        const q = query( clientRef, where( 'uid', '==', uid ) );

        const unsubscribe = onSnapshot( q, ( snapshot ) => {
            if ( !snapshot.empty ) {
                const clientData = snapshot.docs[0].data();
                setClientProfile( clientData );
            }
        }, ( error ) => {
            console.error( 'Error listening to client profile:', error );
        } );

        return () => unsubscribe();
    };

    const calculateSecurityMetrics = ( clientServices ) => {
        if ( !clientServices || clientServices.length === 0 ) return;

        const totalServices = clientServices.length;
        const completedServices = clientServices.filter( service => service.status === 'completed' ).length;
        const inProgressServices = clientServices.filter( service => service.status === 'in-progress' ).length;
        const pendingServices = clientServices.filter( service => service.status === 'pending' ).length;

        // Calculate average risk score
        const avgRiskScore = clientServices.reduce( ( sum, service ) => sum + ( service.riskScore || 0 ), 0 ) / totalServices;

        // Calculate total vulnerabilities
        const totalVulnerabilities = clientServices.reduce( ( sum, service ) => sum + ( service.vulnerabilitiesFound || 0 ), 0 );

        // Calculate average compliance score
        const avgComplianceScore = clientServices.reduce( ( sum, service ) => sum + ( service.complianceScore || 0 ), 0 ) / totalServices;

        // Calculate average response time
        const avgResponseTime = clientServices.reduce( ( sum, service ) => sum + ( parseInt( service.responseTime ) || 0 ), 0 ) / totalServices;

        setSecurityMetrics( {
            overallRiskScore: Math.round( avgRiskScore ),
            totalVulnerabilities,
            securityIncidents: incidents.length,
            averageResponseTime: `${Math.round( avgResponseTime )} minutes`,
            complianceScore: Math.round( avgComplianceScore ),
            uptime: 99.7,
            lastScan: new Date().toISOString().split( 'T' )[0],
            nextScan: new Date( Date.now() + 7 * 24 * 60 * 60 * 1000 ).toISOString().split( 'T' )[0],
            totalServices,
            completedServices,
            inProgressServices,
            pendingServices
        } );
    };

    const getStatusColor = ( status ) => {
        switch ( status?.toLowerCase() ) {
            case 'completed':
            case 'resolved':
            case 'passed':
                return 'text-green-400 bg-green-900/20';
            case 'in-progress':
            case 'investigating':
            case 'in progress':
                return 'text-yellow-400 bg-yellow-900/20';
            case 'pending':
            case 'open':
                return 'text-blue-400 bg-blue-900/20';
            case 'critical':
            case 'failed':
                return 'text-red-400 bg-red-900/20';
            default:
                return 'text-gray-400 bg-gray-900/20';
        }
    };

    const getStatusIcon = ( status ) => {
        switch ( status?.toLowerCase() ) {
            case 'completed':
            case 'resolved':
            case 'passed':
                return <FaCheckCircle className="text-green-400" />;
            case 'in-progress':
            case 'investigating':
            case 'in progress':
                return <FaClock className="text-yellow-400" />;
            case 'pending':
            case 'open':
                return <FaClock className="text-blue-400" />;
            case 'critical':
            case 'failed':
                return <FaExclamationTriangle className="text-red-400" />;
            default:
                return <FaClock className="text-gray-400" />;
        }
    };

    const getSeverityColor = ( severity ) => {
        switch ( severity?.toLowerCase() ) {
            case 'critical':
                return 'text-red-400 bg-red-900/20';
            case 'high':
                return 'text-orange-400 bg-orange-900/20';
            case 'medium':
                return 'text-yellow-400 bg-yellow-900/20';
            case 'low':
                return 'text-green-400 bg-green-900/20';
            default:
                return 'text-gray-400 bg-gray-900/20';
        }
    };

    const getComplianceColor = ( score ) => {
        if ( score >= 90 ) return 'text-green-400';
        if ( score >= 70 ) return 'text-yellow-400';
        return 'text-red-400';
    };

    const handleLogout = () => {
        localStorage.removeItem( 'clientUid' );
        localStorage.removeItem( 'clientEmail' );
        localStorage.removeItem( 'clientName' );
        localStorage.removeItem( 'clientAuthenticated' );
        navigate( '/client-login' );
    };

    const renderOverview = () => (
        <div className="space-y-6 w-full">
            {/* Welcome Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-cyan-900/20 to-blue-900/20 rounded-lg p-6 border border-cyan-500/20 w-full"
            >
                <div className="flex items-center justify-between w-full">
                    <div className="text-left flex-1">
                        <h2 className="text-2xl font-bold text-white mb-2">
                            Welcome back, {clientProfile?.name || user?.name || 'Client'}!
                        </h2>
                        <p className="text-gray-400">
                            Your cybersecurity dashboard is up to date. Here's what's happening with your security posture.
                        </p>
                    </div>
                    <div className="text-right ml-4">
                        <div className="text-3xl font-bold text-cyan-400">
                            {securityMetrics.uptime}%
                        </div>
                        <div className="text-sm text-gray-400">System Uptime</div>
                    </div>
                </div>
            </motion.div>

            {/* Security Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    {
                        title: "Overall Risk Score",
                        value: securityMetrics.overallRiskScore,
                        unit: "",
                        color: "text-red-400",
                        bgColor: "bg-red-900/20",
                        icon: FaExclamationTriangle
                    },
                    {
                        title: "Total Vulnerabilities",
                        value: securityMetrics.totalVulnerabilities,
                        unit: "",
                        color: "text-orange-400",
                        bgColor: "bg-orange-900/20",
                        icon: FaBug
                    },
                    {
                        title: "Security Incidents",
                        value: securityMetrics.securityIncidents,
                        unit: "",
                        color: "text-yellow-400",
                        bgColor: "bg-yellow-900/20",
                        icon: FaExclamationCircle
                    },
                    {
                        title: "Average Response Time",
                        value: securityMetrics.averageResponseTime,
                        unit: "",
                        color: "text-cyan-400",
                        bgColor: "bg-cyan-900/20",
                        icon: FaClock
                    }
                ].map( ( metric, index ) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`${metric.bgColor} rounded-lg p-6 border border-gray-700`}
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm">{metric.title}</p>
                                <p className={`text-2xl font-bold ${metric.color}`}>
                                    {metric.value}{metric.unit}
                                </p>
                            </div>
                            <metric.icon className={`text-2xl ${metric.color}`} />
                        </div>
                    </motion.div>
                ) )}
            </div>

            {/* Recent Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-700"
            >
                <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
                <div className="space-y-4">
                    {services.slice( 0, 5 ).map( ( service, index ) => (
                        <div key={service.id || index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                            <div className="flex items-center space-x-4">
                                {getStatusIcon( service.status )}
                                <div>
                                    <p className="text-white font-medium">{service.serviceName}</p>
                                    <p className="text-gray-400 text-sm">{service.description}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor( service.status )}`}>
                                    {service.status}
                                </span>
                                <p className="text-gray-400 text-sm mt-1">{service.updatedAt}</p>
                            </div>
                        </div>
                    ) )}
                </div>
            </motion.div>
        </div>
    );

    const renderServices = () => (
        <div className="space-y-6">
            {/* Services Overview */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-700"
            >
                <h3 className="text-xl font-semibold text-white mb-6">Your Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map( ( service, index ) => (
                        <motion.div
                            key={service.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-semibold text-white">{service.serviceName}</h4>
                                {getStatusIcon( service.status )}
                            </div>
                            <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Status:</span>
                                    <span className={`${getStatusColor( service.status )} px-2 py-1 rounded text-xs`}>
                                        {service.status}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Risk Score:</span>
                                    <span className="text-white">{service.riskScore || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Last Updated:</span>
                                    <span className="text-white">{service.updatedAt}</span>
                                </div>
                            </div>
                        </motion.div>
                    ) )}
                </div>
            </motion.div>
        </div>
    );

    const renderCompliance = () => (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-700"
            >
                <h3 className="text-xl font-semibold text-white mb-6">Compliance Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {compliance.map( ( item, index ) => (
                        <motion.div
                            key={item.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-semibold text-white">{item.framework}</h4>
                                <FaCertificate className="text-cyan-400 text-xl" />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Score:</span>
                                    <span className={`${getComplianceColor( item.score )} font-semibold`}>
                                        {item.score}%
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Status:</span>
                                    <span className={`${getStatusColor( item.status )} px-2 py-1 rounded text-xs`}>
                                        {item.status}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Last Audit:</span>
                                    <span className="text-white">{item.lastAudit}</span>
                                </div>
                            </div>
                        </motion.div>
                    ) )}
                </div>
            </motion.div>
        </div>
    );

    const renderIncidents = () => (
        <div className="space-y-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gray-900 rounded-lg p-6 border border-gray-700"
            >
                <h3 className="text-xl font-semibold text-white mb-6">Security Incidents</h3>
                <div className="space-y-4">
                    {incidents.map( ( incident, index ) => (
                        <motion.div
                            key={incident.id || index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-semibold text-white">{incident.title}</h4>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getSeverityColor( incident.severity )}`}>
                                    {incident.severity}
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm mb-4">{incident.description}</p>
                            <div className="flex justify-between text-sm text-gray-400">
                                <span>Reported: {incident.reportedAt}</span>
                                <span>Status: {incident.status}</span>
                            </div>
                        </motion.div>
                    ) )}
                </div>
            </motion.div>
        </div>
    );

    const renderProfile = () => (
        <div className="space-y-6">
            {clientProfile && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-900 rounded-lg p-6 border border-gray-700"
                >
                    <h3 className="text-xl font-semibold text-white mb-6">Company Profile</h3>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-1">Company Name</label>
                                <p className="text-white">{clientProfile.company}</p>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-1">Industry</label>
                                <p className="text-white">{clientProfile.industry}</p>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-1">Company Size</label>
                                <p className="text-white">{clientProfile.companySize}</p>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-1">Phone</label>
                                <p className="text-white">{clientProfile.phone}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-1">Email</label>
                                <p className="text-white">{clientProfile.email}</p>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-1">Website</label>
                                <p className="text-white">{clientProfile.website || 'Not provided'}</p>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-1">Annual Security Budget</label>
                                <p className="text-white">{clientProfile.annualSecurityBudget || 'Not specified'}</p>
                            </div>

                            <div>
                                <label className="block text-gray-400 text-sm font-medium mb-1">Number of Users</label>
                                <p className="text-white">{clientProfile.userCount || 'Not specified'}</p>
                            </div>
                        </div>
                    </div>

                    {clientProfile.securityNeeds && clientProfile.securityNeeds.length > 0 && (
                        <div className="mt-6">
                            <label className="block text-gray-400 text-sm font-medium mb-2">Security Needs</label>
                            <div className="flex flex-wrap gap-2">
                                {clientProfile.securityNeeds.map( ( need, index ) => (
                                    <span key={index} className="px-3 py-1 bg-cyan-900/20 text-cyan-400 text-sm rounded-full">
                                        {need}
                                    </span>
                                ) )}
                            </div>
                        </div>
                    )}

                    {clientProfile.complianceFrameworks && clientProfile.complianceFrameworks.length > 0 && (
                        <div className="mt-6">
                            <label className="block text-gray-400 text-sm font-medium mb-2">Compliance Frameworks</label>
                            <div className="flex flex-wrap gap-2">
                                {clientProfile.complianceFrameworks.map( ( framework, index ) => (
                                    <span key={index} className="px-3 py-1 bg-blue-900/20 text-blue-400 text-sm rounded-full">
                                        {framework}
                                    </span>
                                ) )}
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );

    const renderContent = () => {
        switch ( activeTab ) {
            case "overview":
                return renderOverview();
            case "services":
            case "services-all":
                return renderServices();
            case "compliance":
                return renderCompliance();
            case "incidents":
                return renderIncidents();
            case "profile":
                return renderProfile();
            default:
                return renderOverview();
        }
    };

    if ( isLoading ) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-950 flex flex-col">
            {/* Header */}
            <header className="bg-gray-900 border-b border-gray-700 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <FaShieldAlt className="text-cyan-400 text-2xl mr-3" />
                            <h1 className="text-xl font-bold text-white">Webifant Security</h1>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button className="relative p-2 text-gray-400 hover:text-white">
                                    <FaBell className="text-xl" />
                                    {notifications.filter( n => !n.read ).length > 0 && (
                                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                            {notifications.filter( n => !n.read ).length}
                                        </span>
                                    )}
                                </button>
                            </div>

                            <div className="flex items-center space-x-2">
                                <div className="text-right">
                                    <p className="text-sm text-white">{user?.name || 'Client'}</p>
                                    <p className="text-xs text-gray-400">{user?.email || 'client@example.com'}</p>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="p-2 text-gray-400 hover:text-white transition"
                                >
                                    <FaSignOutAlt />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation */}
            <nav className="bg-gray-900 border-b border-gray-700 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {[
                            { id: "overview", name: "Overview", icon: FaChartLine },
                            { id: "services", name: "Services", icon: FaTools },
                            { id: "compliance", name: "Compliance", icon: FaCertificate },
                            { id: "incidents", name: "Incidents", icon: FaExclamationTriangle },
                            { id: "profile", name: "Profile", icon: FaUserShield }
                        ].map( ( tab ) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab( tab.id )}
                                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition ${activeTab === tab.id
                                    ? 'border-cyan-400 text-cyan-400'
                                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-300'
                                    }`}
                            >
                                <tab.icon className="text-lg" />
                                <span>{tab.name}</span>
                            </button>
                        ) )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
                <div className="w-full">
                    {renderContent()}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 border-t border-gray-700 mt-auto w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center mb-4 md:mb-0">
                            <FaShieldAlt className="text-cyan-400 text-xl mr-2" />
                            <span className="text-white font-semibold">Webifant Security</span>
                        </div>

                        <div className="flex items-center space-x-6 text-sm text-gray-400">
                            <span>© 2024 Webifant Security. All rights reserved.</span>
                            <span>24/7 Support: support@webifant.com</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
} 