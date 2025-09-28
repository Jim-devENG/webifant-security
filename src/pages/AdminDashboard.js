import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaEye, FaUsers, FaShieldAlt, FaChartLine, FaBell, FaCog, FaSignOutAlt, FaCheckCircle, FaClock, FaExclamationTriangle, FaTools, FaCertificate, FaChartBar, FaExclamationCircle, FaCheckDouble, FaDownload, FaFileAlt, FaUserShield, FaClipboardList, FaClipboardCheck, FaFileContract, FaAward, FaRocket, FaTarget, FaBullseye, FaServer, FaNetworkWired, FaDatabase, FaMobile, FaDesktop, FaCloud, FaShieldVirus, FaLock, FaUnlock, FaTimes, FaChevronLeft, FaChevronRight, FaSearch, FaSort, FaFilter, FaTag, FaBriefcase, FaMapMarkerAlt, FaGraduationCap } from "react-icons/fa";
import { getAllPosts, createPost, updatePost, deletePost } from "../firebase/blogService";
import { getClientServices, updateClientService, addClientService, getClientNotifications, addClientNotification } from "../firebase/clientService";
import { getAllClients } from "../firebase/authService";
import { addComplianceFramework, updateComplianceStatus } from "../firebase/complianceService";
import { addSecurityIncident, updateIncidentStatus } from "../firebase/incidentService";
import { collection, onSnapshot, addDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function AdminDashboard( { onLogout } ) {
    const [activeTab, setActiveTab] = useState( "blog" );
    const [posts, setPosts] = useState( [] );
    const [clients, setClients] = useState( [] );
    const [clientServices, setClientServices] = useState( {} );
    const [selectedClient, setSelectedClient] = useState( null );
    const [isLoading, setIsLoading] = useState( false );
    const [showAddServiceModal, setShowAddServiceModal] = useState( false );
    const [selectedClientForNewService, setSelectedClientForNewService] = useState( null );

    // Blog management states
    const [showCreateForm, setShowCreateForm] = useState( false );
    const [editingPost, setEditingPost] = useState( null );
    const [formData, setFormData] = useState( {
        title: "",
        excerpt: "",
        content: "",
        author: "",
        tags: "",
        image: ""
    } );

    // Blog pagination and filtering states
    const [blogSearchTerm, setBlogSearchTerm] = useState( "" );
    const [blogSelectedTag, setBlogSelectedTag] = useState( "" );
    const [blogSortBy, setBlogSortBy] = useState( "date" );
    const [blogSortOrder, setBlogSortOrder] = useState( "desc" );
    const [blogCurrentPage, setBlogCurrentPage] = useState( 1 );
    const [blogPostsPerPage] = useState( 10 );
    const [blogShowFilters, setBlogShowFilters] = useState( false );

    // Enhanced client service management states
    const [serviceFormData, setServiceFormData] = useState( {
        name: "",
        category: "Assessment",
        description: "",
        status: "pending",
        progress: 0,
        startDate: "",
        endDate: "",
        findings: "",
        nextSteps: "",
        riskScore: 0,
        vulnerabilitiesFound: 0,
        criticalIssues: 0,
        highIssues: 0,
        mediumIssues: 0,
        lowIssues: 0,
        complianceScore: 0,
        recommendations: [],
        teamMembers: [],
        documents: [],
        milestones: [],
        // Enhanced fields
        serviceType: "",
        priority: "Medium",
        estimatedHours: 0,
        actualHours: 0,
        budget: 0,
        costToDate: 0,
        scope: "",
        objectives: "",
        deliverables: [],
        tools: [],
        methodology: "",
        reportFrequency: "Weekly",
        contactPerson: "",
        contactEmail: "",
        contactPhone: "",
        externalVendors: [],
        dependencies: [],
        risks: [],
        mitigationStrategies: [],
        successCriteria: [],
        qualityMetrics: [],
        trainingRequired: false,
        trainingDetails: "",
        certificationRequired: false,
        certificationDetails: "",
        regulatoryRequirements: [],
        auditTrail: [],
        changeRequests: [],
        lessonsLearned: "",
        futureRecommendations: ""
    } );

    // Compliance management states
    const [showAddComplianceModal, setShowAddComplianceModal] = useState( false );
    const [selectedClientForCompliance, setSelectedClientForCompliance] = useState( null );
    const [complianceFormData, setComplianceFormData] = useState( {
        framework: "",
        status: "In Progress",
        score: 0,
        lastAudit: "",
        nextAudit: "",
        description: ""
    } );

    // Incident management states
    const [showAddIncidentModal, setShowAddIncidentModal] = useState( false );
    const [selectedClientForIncident, setSelectedClientForIncident] = useState( null );
    const [incidentFormData, setIncidentFormData] = useState( {
        title: "",
        severity: "Medium",
        status: "Investigating",
        description: "",
        resolution: "",
        affectedSystems: [],
        responseTime: "0 minutes"
    } );

    // Career management states
    const [careers, setCareers] = useState( [] );
    const [showAddCareerModal, setShowAddCareerModal] = useState( false );
    const [editingCareer, setEditingCareer] = useState( null );
    const [careerFormData, setCareerFormData] = useState( {
        title: "",
        department: "Security Operations",
        location: "Remote / New York",
        type: "Full-time",
        experience: "3-5 years",
        description: "",
        responsibilities: [],
        requirements: [],
        benefits: [],
        status: "Open"
    } );

    // Career filtering and pagination states
    const [careerSearchTerm, setCareerSearchTerm] = useState( "" );
    const [careerSelectedDepartment, setCareerSelectedDepartment] = useState( "All" );
    const [careerSortBy, setCareerSortBy] = useState( "date" );
    const [careerSortOrder, setCareerSortOrder] = useState( "desc" );
    const [careerCurrentPage, setCareerCurrentPage] = useState( 1 );
    const [careerJobsPerPage] = useState( 10 );
    const [careerShowFilters, setCareerShowFilters] = useState( false );
    const [careerListCollapsed, setCareerListCollapsed] = useState( false );
    const [expandedJobs, setExpandedJobs] = useState( new Set() );

    // Available service categories
    const serviceCategories = [
        "Assessment",
        "Monitoring",
        "Training",
        "Forensics",
        "Consulting",
        "Management"
    ];

    // Available compliance frameworks
    const complianceFrameworks = [
        "ISO 27001",
        "SOC 2 Type II",
        "GDPR",
        "HIPAA",
        "PCI DSS",
        "NIST Cybersecurity Framework",
        "CIS Controls"
    ];

    // Available team members
    const availableTeamMembers = [
        { name: "Sarah Chen", role: "Lead Security Analyst", email: "sarah.chen@webinfant.com" },
        { name: "Mike Rodriguez", role: "Penetration Tester", email: "mike.rodriguez@webinfant.com" },
        { name: "Alex Thompson", role: "Security Operations Manager", email: "alex.thompson@webinfant.com" },
        { name: "Lisa Park", role: "Threat Analyst", email: "lisa.park@webinfant.com" },
        { name: "David Kim", role: "Incident Responder", email: "david.kim@webinfant.com" },
        { name: "Emma Wilson", role: "Training Coordinator", email: "emma.wilson@webinfant.com" },
        { name: "James Lee", role: "Security Trainer", email: "james.lee@webinfant.com" }
    ];

    // Available departments for careers
    const careerDepartments = [
        "Security Operations",
        "Security Testing",
        "Client Relations",
        "Engineering",
        "Research & Development",
        "Marketing",
        "Sales"
    ];

    useEffect( () => {
        loadPosts();
        setupClientsListener();
        loadCareers();
    }, [] );

    useEffect( () => {
        if ( clients.length > 0 ) {
            loadClientServices();
        }
    }, [clients] );

    // Blog filtering and pagination logic
    const [filteredBlogPosts, setFilteredBlogPosts] = useState( [] );

    useEffect( () => {
        let filtered = posts;

        // Filter by search term
        if ( blogSearchTerm ) {
            filtered = filtered.filter( post =>
                post.frontmatter.title.toLowerCase().includes( blogSearchTerm.toLowerCase() ) ||
                post.frontmatter.excerpt.toLowerCase().includes( blogSearchTerm.toLowerCase() ) ||
                post.frontmatter.author.toLowerCase().includes( blogSearchTerm.toLowerCase() )
            );
        }

        // Filter by tag
        if ( blogSelectedTag ) {
            filtered = filtered.filter( post =>
                post.frontmatter.tags && post.frontmatter.tags.includes( blogSelectedTag )
            );
        }

        // Sort posts
        filtered.sort( ( a, b ) => {
            let aValue, bValue;

            switch ( blogSortBy ) {
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

            if ( blogSortOrder === "asc" ) {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        } );

        setFilteredBlogPosts( filtered );
        setBlogCurrentPage( 1 ); // Reset to first page when filters change
    }, [posts, blogSearchTerm, blogSelectedTag, blogSortBy, blogSortOrder] );

    // Blog pagination logic
    const blogIndexOfLastPost = blogCurrentPage * blogPostsPerPage;
    const blogIndexOfFirstPost = blogIndexOfLastPost - blogPostsPerPage;
    const currentBlogPosts = filteredBlogPosts.slice( blogIndexOfFirstPost, blogIndexOfLastPost );
    const blogTotalPages = Math.ceil( filteredBlogPosts.length / blogPostsPerPage );

    const blogPaginate = ( pageNumber ) => {
        setBlogCurrentPage( pageNumber );
    };

    const getBlogPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5;

        if ( blogTotalPages <= maxVisiblePages ) {
            for ( let i = 1;i <= blogTotalPages;i++ ) {
                pageNumbers.push( i );
            }
        } else {
            if ( blogCurrentPage <= 3 ) {
                for ( let i = 1;i <= 4;i++ ) {
                    pageNumbers.push( i );
                }
                pageNumbers.push( '...' );
                pageNumbers.push( blogTotalPages );
            } else if ( blogCurrentPage >= blogTotalPages - 2 ) {
                pageNumbers.push( 1 );
                pageNumbers.push( '...' );
                for ( let i = blogTotalPages - 3;i <= blogTotalPages;i++ ) {
                    pageNumbers.push( i );
                }
            } else {
                pageNumbers.push( 1 );
                pageNumbers.push( '...' );
                for ( let i = blogCurrentPage - 1;i <= blogCurrentPage + 1;i++ ) {
                    pageNumbers.push( i );
                }
                pageNumbers.push( '...' );
                pageNumbers.push( blogTotalPages );
            }
        }

        return pageNumbers;
    };

    const clearBlogFilters = () => {
        setBlogSearchTerm( "" );
        setBlogSelectedTag( "" );
        setBlogSortBy( "date" );
        setBlogSortOrder( "desc" );
    };

    // Extract unique blog tags
    const blogTags = Array.from( new Set( posts.flatMap( post => post.frontmatter.tags || [] ) ) );

    // Set up real-time listener for clients
    const setupClientsListener = () => {
        const clientsRef = collection( db, 'clients' );

        const unsubscribe = onSnapshot( clientsRef, ( snapshot ) => {
            const clientsData = snapshot.docs.map( doc => ( {
                id: doc.id,
                ...doc.data()
            } ) );

            // Check if there are new clients (clients that weren't in the previous list)
            const previousClientIds = clients.map( client => client.id );
            const newClients = clientsData.filter( client => !previousClientIds.includes( client.id ) );

            if ( newClients.length > 0 && clients.length > 0 ) {
                // Show notification for new clients
                newClients.forEach( client => {
                    // You can add a toast notification here
                    console.log( `New client registered: ${client.name} from ${client.company}` );

                    // Optionally send a welcome notification to the client
                    addClientNotification( client.id, {
                        type: "success",
                        message: "Welcome to Webifant Security! Your account has been created successfully. Our team will contact you soon to discuss your security needs."
                    } );
                } );
            }

            setClients( clientsData );
        }, ( error ) => {
            console.error( 'Error listening to clients:', error );
        } );

        // Cleanup function
        return () => unsubscribe();
    };

    const loadClients = async () => {
        try {
            const clientsData = await getAllClients();
            setClients( clientsData );
        } catch ( error ) {
            console.error( 'Error loading clients:', error );
        }
    };

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

    const loadClientServices = async () => {
        try {
            const services = {};
            for ( const client of clients ) {
                try {
                    const clientServices = await getClientServices( client.id );
                    services[client.id] = clientServices;
                } catch ( error ) {
                    console.error( `Error loading services for ${client.name}:`, error );
                    services[client.id] = [];
                }
            }
            setClientServices( services );
        } catch ( error ) {
            console.error( 'Error loading client services:', error );
        }
    };

    const handleServiceUpdate = async ( clientId, serviceId, updates ) => {
        try {
            // Use the comprehensive service update function
            await updateClientService( serviceId, updates );

            // Update local state
            setClientServices( prev => ( {
                ...prev,
                [clientId]: prev[clientId].map( service =>
                    service.id === serviceId ? { ...service, ...updates } : service
                )
            } ) );

            // Add notification for client
            await addClientNotification( clientId, {
                type: "info",
                message: `Service "${updates.name || 'your service'}" has been updated. Progress: ${updates.progress || 0}%`
            } );

        } catch ( error ) {
            console.error( 'Error updating service:', error );
        }
    };

    const handleAddService = async ( clientId ) => {
        try {
            const newService = await addClientService( clientId, serviceFormData );

            setClientServices( prev => ( {
                ...prev,
                [clientId]: [...( prev[clientId] || [] ), newService]
            } ) );

            // Add notification for client
            await addClientNotification( clientId, {
                type: "success",
                message: `New service "${serviceFormData.name}" has been added to your account`
            } );

            // Reset form and close modal
            setServiceFormData( {
                name: "",
                category: "Assessment",
                description: "",
                status: "pending",
                progress: 0,
                startDate: "",
                endDate: "",
                findings: "",
                nextSteps: "",
                riskScore: 0,
                vulnerabilitiesFound: 0,
                criticalIssues: 0,
                highIssues: 0,
                mediumIssues: 0,
                lowIssues: 0,
                complianceScore: 0,
                recommendations: [],
                teamMembers: [],
                documents: [],
                milestones: [],
                // Enhanced fields
                serviceType: "",
                priority: "Medium",
                estimatedHours: 0,
                actualHours: 0,
                budget: 0,
                costToDate: 0,
                scope: "",
                objectives: "",
                deliverables: [],
                tools: [],
                methodology: "",
                reportFrequency: "Weekly",
                contactPerson: "",
                contactEmail: "",
                contactPhone: "",
                externalVendors: [],
                dependencies: [],
                risks: [],
                mitigationStrategies: [],
                successCriteria: [],
                qualityMetrics: [],
                trainingRequired: false,
                trainingDetails: "",
                certificationRequired: false,
                certificationDetails: "",
                regulatoryRequirements: [],
                auditTrail: [],
                changeRequests: [],
                lessonsLearned: "",
                futureRecommendations: ""
            } );

            setShowAddServiceModal( false );
            setSelectedClientForNewService( null );

        } catch ( error ) {
            console.error( 'Error adding service:', error );
        }
    };

    const handleAddCompliance = async ( clientId ) => {
        try {
            const newCompliance = await addComplianceFramework( clientId, complianceFormData );

            // Add notification for client
            await addClientNotification( clientId, {
                type: "info",
                message: `New compliance framework "${complianceFormData.framework}" has been added to your account`
            } );

            // Reset form and close modal
            setComplianceFormData( {
                framework: "",
                status: "In Progress",
                score: 0,
                lastAudit: "",
                nextAudit: "",
                description: ""
            } );

            setShowAddComplianceModal( false );
            setSelectedClientForCompliance( null );

        } catch ( error ) {
            console.error( 'Error adding compliance framework:', error );
        }
    };

    const handleAddIncident = async ( clientId ) => {
        try {
            const newIncident = await addSecurityIncident( clientId, incidentFormData );

            // Add notification for client
            await addClientNotification( clientId, {
                type: "warning",
                message: `New security incident "${incidentFormData.title}" has been reported and is being investigated`
            } );

            // Reset form and close modal
            setIncidentFormData( {
                title: "",
                severity: "Medium",
                status: "Investigating",
                description: "",
                resolution: "",
                affectedSystems: [],
                responseTime: "0 minutes"
            } );

            setShowAddIncidentModal( false );
            setSelectedClientForIncident( null );

        } catch ( error ) {
            console.error( 'Error adding security incident:', error );
        }
    };

    const openAddServiceModal = () => {
        setShowAddServiceModal( true );
        setSelectedClientForNewService( null );
    };

    const closeAddServiceModal = () => {
        setShowAddServiceModal( false );
        setSelectedClientForNewService( null );
        setServiceFormData( {
            name: "",
            category: "Assessment",
            description: "",
            status: "pending",
            progress: 0,
            startDate: "",
            endDate: "",
            findings: "",
            nextSteps: "",
            riskScore: 0,
            vulnerabilitiesFound: 0,
            criticalIssues: 0,
            highIssues: 0,
            mediumIssues: 0,
            lowIssues: 0,
            complianceScore: 0,
            recommendations: [],
            teamMembers: [],
            documents: [],
            milestones: [],
            // Enhanced fields
            serviceType: "",
            priority: "Medium",
            estimatedHours: 0,
            actualHours: 0,
            budget: 0,
            costToDate: 0,
            scope: "",
            objectives: "",
            deliverables: [],
            tools: [],
            methodology: "",
            reportFrequency: "Weekly",
            contactPerson: "",
            contactEmail: "",
            contactPhone: "",
            externalVendors: [],
            dependencies: [],
            risks: [],
            mitigationStrategies: [],
            successCriteria: [],
            qualityMetrics: [],
            trainingRequired: false,
            trainingDetails: "",
            certificationRequired: false,
            certificationDetails: "",
            regulatoryRequirements: [],
            auditTrail: [],
            changeRequests: [],
            lessonsLearned: "",
            futureRecommendations: ""
        } );
    };

    const openAddComplianceModal = () => {
        setShowAddComplianceModal( true );
        setSelectedClientForCompliance( null );
        setComplianceFormData( {
            framework: "",
            status: "In Progress",
            score: 0,
            lastAudit: "",
            nextAudit: "",
            description: ""
        } );
    };

    const closeAddComplianceModal = () => {
        setShowAddComplianceModal( false );
        setSelectedClientForCompliance( null );
        setComplianceFormData( {
            framework: "",
            status: "In Progress",
            score: 0,
            lastAudit: "",
            nextAudit: "",
            description: ""
        } );
    };

    const openAddIncidentModal = () => {
        setShowAddIncidentModal( true );
        setSelectedClientForIncident( null );
        setIncidentFormData( {
            title: "",
            severity: "Medium",
            status: "Investigating",
            description: "",
            resolution: "",
            affectedSystems: [],
            responseTime: "0 minutes"
        } );
    };

    const closeAddIncidentModal = () => {
        setShowAddIncidentModal( false );
        setSelectedClientForIncident( null );
        setIncidentFormData( {
            title: "",
            severity: "Medium",
            status: "Investigating",
            description: "",
            resolution: "",
            affectedSystems: [],
            responseTime: "0 minutes"
        } );
    };

    const getStatusColor = ( status ) => {
        switch ( status ) {
            case 'completed': return 'text-green-400';
            case 'active': return 'text-cyan-400';
            case 'pending': return 'text-yellow-400';
            case 'in-progress': return 'text-blue-400';
            default: return 'text-gray-400';
        }
    };

    const getStatusIcon = ( status ) => {
        switch ( status ) {
            case 'completed': return <FaCheckCircle className="text-green-400" />;
            case 'active': return <FaClock className="text-cyan-400" />;
            case 'pending': return <FaExclamationTriangle className="text-yellow-400" />;
            case 'in-progress': return <FaTools className="text-blue-400" />;
            default: return <FaClock className="text-gray-400" />;
        }
    };

    const getRiskColor = ( score ) => {
        if ( score >= 80 ) return 'text-red-400';
        if ( score >= 60 ) return 'text-orange-400';
        if ( score >= 40 ) return 'text-yellow-400';
        return 'text-green-400';
    };

    // Career management functions
    const loadCareers = async () => {
        try {
            const careersRef = collection( db, "careers" );
            onSnapshot( careersRef, ( snapshot ) => {
                const careersData = snapshot.docs.map( doc => ( {
                    id: doc.id,
                    ...doc.data()
                } ) );
                setCareers( careersData );
            } );
        } catch ( error ) {
            console.error( "Error loading careers:", error );
        }
    };

    const handleAddCareer = async () => {
        try {
            const careerData = {
                ...careerFormData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const careersRef = collection( db, "careers" );
            await addDoc( careersRef, careerData );

            setShowAddCareerModal( false );
            setCareerFormData( {
                title: "",
                department: "Security Operations",
                location: "Remote / New York",
                type: "Full-time",
                experience: "3-5 years",
                description: "",
                responsibilities: [],
                requirements: [],
                benefits: [],
                status: "Open"
            } );
        } catch ( error ) {
            console.error( "Error adding career:", error );
        }
    };

    const handleUpdateCareer = async ( careerId, updates ) => {
        try {
            const careerRef = doc( db, "careers", careerId );
            await updateDoc( careerRef, {
                ...updates,
                updatedAt: new Date().toISOString()
            } );
        } catch ( error ) {
            console.error( "Error updating career:", error );
        }
    };

    const handleDeleteCareer = async ( careerId ) => {
        if ( window.confirm( "Are you sure you want to delete this job posting?" ) ) {
            try {
                const careerRef = doc( db, "careers", careerId );
                await deleteDoc( careerRef );
            } catch ( error ) {
                console.error( "Error deleting career:", error );
            }
        }
    };

    const openAddCareerModal = () => {
        setShowAddCareerModal( true );
        setEditingCareer( null );
    };

    const closeAddCareerModal = () => {
        setShowAddCareerModal( false );
        setEditingCareer( null );
        setCareerFormData( {
            title: "",
            department: "Security Operations",
            location: "Remote / New York",
            type: "Full-time",
            experience: "3-5 years",
            description: "",
            responsibilities: [],
            requirements: [],
            benefits: [],
            status: "Open"
        } );
    };

    const editCareer = ( career ) => {
        setEditingCareer( career );
        setCareerFormData( {
            title: career.title,
            department: career.department,
            location: career.location,
            type: career.type,
            experience: career.experience,
            description: career.description,
            responsibilities: career.responsibilities || [],
            requirements: career.requirements || [],
            benefits: career.benefits || [],
            status: career.status
        } );
        setShowAddCareerModal( true );
    };

    // Function to add Cybersecurity Analyst job programmatically
    const addCybersecurityAnalystJob = async () => {
        try {
            const cybersecurityAnalystJob = {
                title: "Cybersecurity Analyst",
                department: "Security Operations",
                location: "Remote / New York",
                type: "Full-time",
                experience: "2-4 years",
                description: "Monitor, analyze, and respond to security events and incidents in real-time. You will be responsible for protecting our clients' digital assets and ensuring their systems remain secure against evolving cyber threats.",
                responsibilities: [
                    "Monitor security alerts and investigate potential threats using SIEM tools",
                    "Conduct security assessments and vulnerability scans on client systems",
                    "Analyze security logs and network traffic for suspicious activity",
                    "Respond to security incidents and coordinate with incident response teams",
                    "Develop and maintain security documentation and procedures",
                    "Collaborate with clients to improve their security posture",
                    "Stay current with latest cybersecurity threats and trends",
                    "Provide security recommendations and best practices to clients"
                ],
                requirements: [
                    "Bachelor's degree in Cybersecurity, Computer Science, or related field",
                    "2-4 years of experience in cybersecurity or information security",
                    "Experience with SIEM tools (Splunk, QRadar, or similar)",
                    "Knowledge of security frameworks (NIST, ISO 27001, CIS Controls)",
                    "Strong analytical and problem-solving skills",
                    "Excellent communication and documentation abilities",
                    "Experience with network security and endpoint protection",
                    "Relevant certifications (CompTIA Security+, CISSP, or similar) preferred"
                ],
                benefits: [
                    "Competitive salary with performance bonuses",
                    "Comprehensive health, dental, and vision insurance",
                    "Remote work flexibility with home office setup",
                    "Professional development and certification support",
                    "401(k) with company matching",
                    "Flexible PTO and paid holidays",
                    "Latest cybersecurity tools and training",
                    "Career growth opportunities"
                ],
                status: "Open",
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            const careersRef = collection( db, "careers" );
            await addDoc( careersRef, cybersecurityAnalystJob );

            console.log( "Cybersecurity Analyst job added successfully!" );
        } catch ( error ) {
            console.error( "Error adding Cybersecurity Analyst job:", error );
        }
    };

    // Function to toggle individual job details
    const toggleJobDetails = ( jobId ) => {
        setExpandedJobs( prev => {
            const newSet = new Set( prev );
            if ( newSet.has( jobId ) ) {
                newSet.delete( jobId );
            } else {
                newSet.add( jobId );
            }
            return newSet;
        } );
    };

    return (
        <div className="bg-gray-950 text-white min-h-screen">
            {/* Header */}
            <div className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl font-bold text-cyan-400">Admin Dashboard</h1>
                        <button
                            onClick={onLogout}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition flex items-center gap-2"
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-gray-900 border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex space-x-8">
                        <button
                            onClick={() => setActiveTab( "blog" )}
                            className={`py-4 px-2 border-b-2 transition ${activeTab === "blog"
                                ? "border-cyan-400 text-cyan-400"
                                : "border-transparent text-gray-400 hover:text-white"
                                }`}
                        >
                            <FaEdit className="inline mr-2" />
                            Blog Management
                        </button>
                        <button
                            onClick={() => setActiveTab( "clients" )}
                            className={`py-4 px-2 border-b-2 transition ${activeTab === "clients"
                                ? "border-cyan-400 text-cyan-400"
                                : "border-transparent text-gray-400 hover:text-white"
                                }`}
                        >
                            <FaUsers className="inline mr-2" />
                            Client Services
                        </button>
                        <button
                            onClick={() => setActiveTab( "careers" )}
                            className={`py-4 px-2 border-b-2 transition ${activeTab === "careers"
                                ? "border-cyan-400 text-cyan-400"
                                : "border-transparent text-gray-400 hover:text-white"
                                }`}
                        >
                            <FaBriefcase className="inline mr-2" />
                            Career Management
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                {activeTab === "blog" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        {/* Blog Management Content */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-cyan-400">Blog Management</h2>
                            <button
                                onClick={() => setShowCreateForm( true )}
                                className="bg-cyan-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-cyan-300 transition flex items-center gap-2"
                            >
                                <FaPlus /> Create New Post
                            </button>
                        </div>

                        {/* Blog Posts List */}
                        <div className="bg-gray-900 rounded-lg p-6">
                            <h3 className="text-xl font-semibold text-white mb-4">Blog Posts</h3>

                            {/* Results Summary */}
                            <div className="mb-4 p-4 bg-gray-800 rounded-lg">
                                <div className="flex justify-between items-center text-sm text-gray-400">
                                    <div className="flex items-center gap-4">
                                        <span>Showing {blogIndexOfFirstPost + 1}-{Math.min( blogIndexOfLastPost, filteredBlogPosts.length )} of {filteredBlogPosts.length} posts</span>
                                        {blogSearchTerm && <span>• Search: "{blogSearchTerm}"</span>}
                                        {blogSelectedTag && <span>• Tag: {blogSelectedTag}</span>}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaClock className="text-xs" />
                                        <span>Sorted by {blogSortBy} ({blogSortOrder})</span>
                                    </div>
                                </div>
                            </div>

                            {isLoading ? (
                                <div className="text-center py-8">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto"></div>
                                    <p className="mt-2 text-gray-400">Loading posts...</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {currentBlogPosts.map( ( post ) => (
                                        <div key={post.id} className="border border-gray-800 rounded-lg p-4">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <h4 className="text-lg font-semibold text-white">{post.frontmatter.title}</h4>
                                                    <p className="text-gray-400 text-sm">{post.frontmatter.excerpt}</p>
                                                    <p className="text-gray-500 text-xs mt-1">
                                                        By {post.frontmatter.author} • {post.frontmatter.date}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button className="text-cyan-400 hover:text-cyan-300">
                                                        <FaEdit />
                                                    </button>
                                                    <button className="text-red-400 hover:text-red-300">
                                                        <FaTrash />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ) )}
                                </div>
                            )}
                        </div>

                        {/* Blog Pagination */}
                        <div className="flex justify-center items-center space-x-2 mt-6">
                            <button
                                onClick={() => blogPaginate( blogCurrentPage - 1 )}
                                disabled={blogCurrentPage === 1}
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            {getBlogPageNumbers().map( ( page, index ) => (
                                <span
                                    key={index}
                                    className={`px-3 py-2 rounded-md text-gray-400 cursor-pointer ${page === '...' ? 'opacity-50 cursor-default' :
                                        page === blogCurrentPage ? 'bg-cyan-400 text-gray-900' : 'hover:bg-gray-700'
                                        }`}
                                    onClick={() => {
                                        if ( page !== '...' ) {
                                            blogPaginate( page );
                                        }
                                    }}
                                >
                                    {page}
                                </span>
                            ) )}
                            <button
                                onClick={() => blogPaginate( blogCurrentPage + 1 )}
                                disabled={blogCurrentPage === blogTotalPages || blogTotalPages === 0}
                                className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>

                        {/* Blog Filters */}
                        <div className="mt-6 border-t border-gray-800 pt-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <button
                                    onClick={() => setBlogShowFilters( !blogShowFilters )}
                                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                                >
                                    {blogShowFilters ? 'Hide Filters' : 'Show Filters'}
                                </button>
                                <button
                                    onClick={clearBlogFilters}
                                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                                >
                                    Clear Filters
                                </button>
                            </div>
                            {blogShowFilters && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Search by Title, Excerpt, or Author</label>
                                        <input
                                            type="text"
                                            value={blogSearchTerm}
                                            onChange={( e ) => setBlogSearchTerm( e.target.value )}
                                            placeholder="e.g., security, incident, response"
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Filter by Tag</label>
                                        <select
                                            value={blogSelectedTag}
                                            onChange={( e ) => setBlogSelectedTag( e.target.value )}
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                        >
                                            <option value="">All Tags</option>
                                            {blogTags.map( tag => (
                                                <option key={tag} value={tag}>{tag}</option>
                                            ) )}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Sort By</label>
                                        <select
                                            value={blogSortBy}
                                            onChange={( e ) => setBlogSortBy( e.target.value )}
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                        >
                                            <option value="date">Date (Newest First)</option>
                                            <option value="title">Title (A-Z)</option>
                                            <option value="author">Author (A-Z)</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Sort Order</label>
                                        <select
                                            value={blogSortOrder}
                                            onChange={( e ) => setBlogSortOrder( e.target.value )}
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                        >
                                            <option value="desc">Descending</option>
                                            <option value="asc">Ascending</option>
                                        </select>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {activeTab === "clients" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        {/* Client Services Management */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-cyan-400">Client Services Management</h2>
                            <button
                                onClick={openAddServiceModal}
                                className="bg-cyan-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-cyan-300 transition flex items-center gap-2"
                            >
                                <FaPlus /> Add New Service
                            </button>
                        </div>

                        {/* Clients List */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {clients.map( ( client ) => (
                                <motion.div
                                    key={client.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-cyan-400 transition"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">{client.name}</h3>
                                            <p className="text-cyan-400 text-sm">{client.company}</p>
                                            <p className="text-gray-400 text-sm">{client.email}</p>
                                            <p className="text-gray-400 text-xs mt-1">{client.industry} • {client.companySize}</p>
                                        </div>
                                        <button
                                            onClick={() => setSelectedClient( client )}
                                            className="text-cyan-400 hover:text-cyan-300"
                                        >
                                            <FaEye />
                                        </button>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Risk Level</span>
                                            <span className={`${client.riskLevel === 'High' ? 'text-red-400' : client.riskLevel === 'Medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                                                {client.riskLevel}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Compliance</span>
                                            <span className={`${client.complianceStatus === 'Compliant' ? 'text-green-400' : 'text-yellow-400'}`}>
                                                {client.complianceStatus}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Active Services</span>
                                            <span className="text-cyan-400">
                                                {clientServices[client.id]?.filter( s => s.status === 'active' ).length || 0}
                                            </span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-400">Completed</span>
                                            <span className="text-green-400">
                                                {clientServices[client.id]?.filter( s => s.status === 'completed' ).length || 0}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ) )}
                        </div>

                        {/* Client Services Detail */}
                        {selectedClient && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gray-900 rounded-lg p-6"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">{selectedClient.name}</h3>
                                        <p className="text-cyan-400">{selectedClient.company}</p>
                                        <p className="text-gray-400 text-sm">{selectedClient.industry} • {selectedClient.companySize}</p>
                                    </div>
                                    <button
                                        onClick={() => setSelectedClient( null )}
                                        className="text-gray-400 hover:text-white"
                                    >
                                        ×
                                    </button>
                                </div>

                                {/* Services List */}
                                <div className="space-y-4">
                                    {clientServices[selectedClient.id]?.map( ( service ) => (
                                        <div key={service.id} className="border border-gray-800 rounded-lg p-4">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-2">
                                                        <h4 className="text-lg font-semibold text-white">{service.name}</h4>
                                                        <span className="bg-gray-800 text-cyan-400 text-xs px-2 py-1 rounded">
                                                            {service.category || 'Assessment'}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-400 text-sm">{service.description}</p>
                                                </div>
                                                <div className="flex items-center">
                                                    {getStatusIcon( service.status )}
                                                    <span className={`ml-2 text-sm ${getStatusColor( service.status )}`}>
                                                        {service.status.charAt( 0 ).toUpperCase() + service.status.slice( 1 )}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Enhanced Metrics */}
                                            <div className="grid md:grid-cols-4 gap-4 mb-4">
                                                <div className="text-center">
                                                    <p className="text-gray-400 text-xs">Risk Score</p>
                                                    <p className={`font-bold ${getRiskColor( service.riskScore || 0 )}`}>{service.riskScore || 0}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-gray-400 text-xs">Compliance</p>
                                                    <p className="text-green-400 font-bold">{service.complianceScore || 0}%</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-gray-400 text-xs">Vulnerabilities</p>
                                                    <p className="text-red-400 font-bold">{service.vulnerabilitiesFound || 0}</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-gray-400 text-xs">Team Members</p>
                                                    <p className="text-blue-400 font-bold">{service.teamMembers?.length || 0}</p>
                                                </div>
                                            </div>

                                            {/* Progress Bar */}
                                            <div className="mb-4">
                                                <div className="flex justify-between text-sm mb-2">
                                                    <span className="text-gray-400">Progress</span>
                                                    <span className="text-cyan-400">{service.progress}%</span>
                                                </div>
                                                <div className="w-full bg-gray-800 rounded-full h-2">
                                                    <div
                                                        className="bg-cyan-400 h-2 rounded-full transition-all duration-300"
                                                        style={{ width: `${service.progress}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {/* Enhanced Update Form */}
                                            <div className="grid md:grid-cols-3 gap-4 mb-4">
                                                <div>
                                                    <label className="block text-gray-400 text-sm mb-1">Progress (%)</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={service.progress}
                                                        onChange={( e ) => {
                                                            const updatedServices = clientServices[selectedClient.id].map( s =>
                                                                s.id === service.id ? { ...s, progress: parseInt( e.target.value ) } : s
                                                            );
                                                            setClientServices( prev => ( {
                                                                ...prev,
                                                                [selectedClient.id]: updatedServices
                                                            } ) );
                                                        }}
                                                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-400 text-sm mb-1">Status</label>
                                                    <select
                                                        value={service.status}
                                                        onChange={( e ) => {
                                                            const updatedServices = clientServices[selectedClient.id].map( s =>
                                                                s.id === service.id ? { ...s, status: e.target.value } : s
                                                            );
                                                            setClientServices( prev => ( {
                                                                ...prev,
                                                                [selectedClient.id]: updatedServices
                                                            } ) );
                                                        }}
                                                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="active">Active</option>
                                                        <option value="in-progress">In Progress</option>
                                                        <option value="completed">Completed</option>
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-gray-400 text-sm mb-1">Risk Score</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={service.riskScore || 0}
                                                        onChange={( e ) => {
                                                            const updatedServices = clientServices[selectedClient.id].map( s =>
                                                                s.id === service.id ? { ...s, riskScore: parseInt( e.target.value ) } : s
                                                            );
                                                            setClientServices( prev => ( {
                                                                ...prev,
                                                                [selectedClient.id]: updatedServices
                                                            } ) );
                                                        }}
                                                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                                    />
                                                </div>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                <div>
                                                    <label className="block text-gray-400 text-sm mb-1">Compliance Score (%)</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        max="100"
                                                        value={service.complianceScore || 0}
                                                        onChange={( e ) => {
                                                            const updatedServices = clientServices[selectedClient.id].map( s =>
                                                                s.id === service.id ? { ...s, complianceScore: parseInt( e.target.value ) } : s
                                                            );
                                                            setClientServices( prev => ( {
                                                                ...prev,
                                                                [selectedClient.id]: updatedServices
                                                            } ) );
                                                        }}
                                                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-gray-400 text-sm mb-1">Vulnerabilities Found</label>
                                                    <input
                                                        type="number"
                                                        min="0"
                                                        value={service.vulnerabilitiesFound || 0}
                                                        onChange={( e ) => {
                                                            const updatedServices = clientServices[selectedClient.id].map( s =>
                                                                s.id === service.id ? { ...s, vulnerabilitiesFound: parseInt( e.target.value ) } : s
                                                            );
                                                            setClientServices( prev => ( {
                                                                ...prev,
                                                                [selectedClient.id]: updatedServices
                                                            } ) );
                                                        }}
                                                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                                    />
                                                </div>
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-gray-400 text-sm mb-1">Findings</label>
                                                <textarea
                                                    value={service.findings || ""}
                                                    onChange={( e ) => {
                                                        const updatedServices = clientServices[selectedClient.id].map( s =>
                                                            s.id === service.id ? { ...s, findings: e.target.value } : s
                                                        );
                                                        setClientServices( prev => ( {
                                                            ...prev,
                                                            [selectedClient.id]: updatedServices
                                                        } ) );
                                                    }}
                                                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                                    rows="2"
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-gray-400 text-sm mb-1">Next Steps</label>
                                                <textarea
                                                    value={service.nextSteps || ""}
                                                    onChange={( e ) => {
                                                        const updatedServices = clientServices[selectedClient.id].map( s =>
                                                            s.id === service.id ? { ...s, nextSteps: e.target.value } : s
                                                        );
                                                        setClientServices( prev => ( {
                                                            ...prev,
                                                            [selectedClient.id]: updatedServices
                                                        } ) );
                                                    }}
                                                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                                    rows="2"
                                                />
                                            </div>

                                            <button
                                                onClick={() => handleServiceUpdate( selectedClient.id, service.id, service )}
                                                className="mt-4 bg-cyan-400 text-gray-900 px-4 py-2 rounded hover:bg-cyan-300 transition"
                                            >
                                                Update Service
                                            </button>
                                        </div>
                                    ) )}
                                </div>

                                {/* Enhanced Add New Service Form */}
                                <div className="mt-8 border-t border-gray-800 pt-6">
                                    <h4 className="text-lg font-semibold text-white mb-4">Add New Cybersecurity Service</h4>

                                    {/* Basic Information */}
                                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                                        <h5 className="text-cyan-400 font-semibold mb-4">Basic Information</h5>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Service Name *</label>
                                                <input
                                                    type="text"
                                                    value={serviceFormData.name}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, name: e.target.value } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                    placeholder="e.g., Penetration Testing"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Category *</label>
                                                <select
                                                    value={serviceFormData.category}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, category: e.target.value } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                >
                                                    {serviceCategories.map( category => (
                                                        <option key={category} value={category}>{category}</option>
                                                    ) )}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Service Type</label>
                                                <input
                                                    type="text"
                                                    value={serviceFormData.serviceType}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, serviceType: e.target.value } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                    placeholder="e.g., External, Internal, Web Application"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Priority</label>
                                                <select
                                                    value={serviceFormData.priority}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, priority: e.target.value } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                >
                                                    <option value="Low">Low</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="High">High</option>
                                                    <option value="Critical">Critical</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-gray-400 text-sm mb-1">Description *</label>
                                            <textarea
                                                value={serviceFormData.description}
                                                onChange={( e ) => setServiceFormData( prev => ( { ...prev, description: e.target.value } ) )}
                                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                rows="3"
                                                placeholder="Detailed description of the cybersecurity service..."
                                            />
                                        </div>
                                    </div>

                                    {/* Project Management */}
                                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                                        <h5 className="text-cyan-400 font-semibold mb-4">Project Management</h5>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Status</label>
                                                <select
                                                    value={serviceFormData.status}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, status: e.target.value } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                >
                                                    <option value="pending">Pending</option>
                                                    <option value="active">Active</option>
                                                    <option value="in-progress">In Progress</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="on-hold">On Hold</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Progress (%)</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={serviceFormData.progress}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, progress: parseInt( e.target.value ) } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Start Date</label>
                                                <input
                                                    type="date"
                                                    value={serviceFormData.startDate}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, startDate: e.target.value } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">End Date</label>
                                                <input
                                                    type="date"
                                                    value={serviceFormData.endDate}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, endDate: e.target.value } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Estimated Hours</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={serviceFormData.estimatedHours}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, estimatedHours: parseInt( e.target.value ) } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Actual Hours</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={serviceFormData.actualHours}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, actualHours: parseInt( e.target.value ) } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Budget ($)</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={serviceFormData.budget}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, budget: parseInt( e.target.value ) } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Cost to Date ($)</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={serviceFormData.costToDate}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, costToDate: parseInt( e.target.value ) } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Security Assessment */}
                                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                                        <h5 className="text-cyan-400 font-semibold mb-4">Security Assessment</h5>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Risk Score</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={serviceFormData.riskScore}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, riskScore: parseInt( e.target.value ) } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Compliance Score (%)</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    max="100"
                                                    value={serviceFormData.complianceScore}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, complianceScore: parseInt( e.target.value ) } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Vulnerabilities Found</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={serviceFormData.vulnerabilitiesFound}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, vulnerabilitiesFound: parseInt( e.target.value ) } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Critical Issues</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={serviceFormData.criticalIssues}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, criticalIssues: parseInt( e.target.value ) } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">High Issues</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={serviceFormData.highIssues}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, highIssues: parseInt( e.target.value ) } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Medium Issues</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={serviceFormData.mediumIssues}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, mediumIssues: parseInt( e.target.value ) } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-4 mt-4">
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Low Issues</label>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={serviceFormData.lowIssues}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, lowIssues: parseInt( e.target.value ) } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Report Frequency</label>
                                                <select
                                                    value={serviceFormData.reportFrequency}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, reportFrequency: e.target.value } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                >
                                                    <option value="Daily">Daily</option>
                                                    <option value="Weekly">Weekly</option>
                                                    <option value="Bi-weekly">Bi-weekly</option>
                                                    <option value="Monthly">Monthly</option>
                                                    <option value="Quarterly">Quarterly</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Scope and Objectives */}
                                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                                        <h5 className="text-cyan-400 font-semibold mb-4">Scope and Objectives</h5>
                                        <div className="mt-4">
                                            <label className="block text-gray-400 text-sm mb-1">Scope</label>
                                            <textarea
                                                value={serviceFormData.scope}
                                                onChange={( e ) => setServiceFormData( prev => ( { ...prev, scope: e.target.value } ) )}
                                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                rows="3"
                                                placeholder="Define the scope of the cybersecurity service..."
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-gray-400 text-sm mb-1">Objectives</label>
                                            <textarea
                                                value={serviceFormData.objectives}
                                                onChange={( e ) => setServiceFormData( prev => ( { ...prev, objectives: e.target.value } ) )}
                                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                rows="3"
                                                placeholder="List the main objectives of this service..."
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-gray-400 text-sm mb-1">Methodology</label>
                                            <textarea
                                                value={serviceFormData.methodology}
                                                onChange={( e ) => setServiceFormData( prev => ( { ...prev, methodology: e.target.value } ) )}
                                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                rows="3"
                                                placeholder="Describe the methodology and approach..."
                                            />
                                        </div>
                                    </div>

                                    {/* Contact Information */}
                                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                                        <h5 className="text-cyan-400 font-semibold mb-4">Contact Information</h5>
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Contact Person</label>
                                                <input
                                                    type="text"
                                                    value={serviceFormData.contactPerson}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, contactPerson: e.target.value } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                    placeholder="Primary contact person"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-gray-400 text-sm mb-1">Contact Email</label>
                                                <input
                                                    type="email"
                                                    value={serviceFormData.contactEmail}
                                                    onChange={( e ) => setServiceFormData( prev => ( { ...prev, contactEmail: e.target.value } ) )}
                                                    className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                    placeholder="contact@company.com"
                                                />
                                            </div>
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-gray-400 text-sm mb-1">Contact Phone</label>
                                            <input
                                                type="tel"
                                                value={serviceFormData.contactPhone}
                                                onChange={( e ) => setServiceFormData( prev => ( { ...prev, contactPhone: e.target.value } ) )}
                                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                placeholder="+1 (555) 123-4567"
                                            />
                                        </div>
                                    </div>

                                    {/* Findings and Next Steps */}
                                    <div className="bg-gray-800 rounded-lg p-6 mb-6">
                                        <h5 className="text-cyan-400 font-semibold mb-4">Findings and Next Steps</h5>
                                        <div className="mt-4">
                                            <label className="block text-gray-400 text-sm mb-1">Findings</label>
                                            <textarea
                                                value={serviceFormData.findings}
                                                onChange={( e ) => setServiceFormData( prev => ( { ...prev, findings: e.target.value } ) )}
                                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                rows="4"
                                                placeholder="Document key findings from the security assessment..."
                                            />
                                        </div>
                                        <div className="mt-4">
                                            <label className="block text-gray-400 text-sm mb-1">Next Steps</label>
                                            <textarea
                                                value={serviceFormData.nextSteps}
                                                onChange={( e ) => setServiceFormData( prev => ( { ...prev, nextSteps: e.target.value } ) )}
                                                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white"
                                                rows="4"
                                                placeholder="Outline the next steps and recommendations..."
                                            />
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleAddService( selectedClient.id )}
                                        className="mt-4 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                                    >
                                        <FaPlus /> Add Cybersecurity Service
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {activeTab === "careers" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        {/* Career Management Content */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-cyan-400">Career Management</h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCareerListCollapsed( !careerListCollapsed )}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
                                    title={careerListCollapsed ? "Show job listings" : "Hide job listings"}
                                >
                                    {careerListCollapsed ? (
                                        <>
                                            <FaEye /> Show Jobs
                                        </>
                                    ) : (
                                        <>
                                            <FaEye className="opacity-50" /> Hide Jobs
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={openAddCareerModal}
                                    className="bg-cyan-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-cyan-300 transition flex items-center gap-2"
                                >
                                    <FaPlus /> Add New Job
                                </button>
                            </div>
                        </div>

                        {/* Collapsible Career Content */}
                        {!careerListCollapsed && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Career Filters */}
                                <div className="bg-gray-900 rounded-lg p-6 mb-6">
                                    <div className="flex flex-col md:flex-row gap-4 mb-6">
                                        <div className="flex-1">
                                            <label className="block text-gray-400 text-sm mb-1">Search Jobs</label>
                                            <input
                                                type="text"
                                                value={careerSearchTerm}
                                                onChange={( e ) => setCareerSearchTerm( e.target.value )}
                                                placeholder="Search by title, department, or location..."
                                                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-1">Filter by Department</label>
                                            <select
                                                value={careerSelectedDepartment}
                                                onChange={( e ) => setCareerSelectedDepartment( e.target.value )}
                                                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                            >
                                                <option value="All">All Departments</option>
                                                {careerDepartments.map( dept => (
                                                    <option key={dept} value={dept}>{dept}</option>
                                                ) )}
                                            </select>
                                        </div>
                                        <div>
                                            <label className="block text-gray-400 text-sm mb-1">Sort By</label>
                                            <select
                                                value={careerSortBy}
                                                onChange={( e ) => setCareerSortBy( e.target.value )}
                                                className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                            >
                                                <option value="date">Date Posted</option>
                                                <option value="title">Job Title</option>
                                                <option value="department">Department</option>
                                                <option value="location">Location</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Jobs List */}
                                <div className="bg-gray-900 rounded-lg p-6">
                                    <h3 className="text-xl font-semibold text-white mb-4">Job Postings</h3>

                                    {isLoading ? (
                                        <div className="text-center py-8">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400 mx-auto"></div>
                                            <p className="mt-2 text-gray-400">Loading jobs...</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {careers
                                                .filter( job => {
                                                    const matchesSearch = job.title.toLowerCase().includes( careerSearchTerm.toLowerCase() ) ||
                                                        job.department.toLowerCase().includes( careerSearchTerm.toLowerCase() ) ||
                                                        job.location.toLowerCase().includes( careerSearchTerm.toLowerCase() );
                                                    const matchesDepartment = careerSelectedDepartment === "All" || job.department === careerSelectedDepartment;
                                                    return matchesSearch && matchesDepartment;
                                                } )
                                                .sort( ( a, b ) => {
                                                    switch ( careerSortBy ) {
                                                        case "title":
                                                            return a.title.localeCompare( b.title );
                                                        case "department":
                                                            return a.department.localeCompare( b.department );
                                                        case "location":
                                                            return a.location.localeCompare( b.location );
                                                        default:
                                                            return new Date( b.createdAt ) - new Date( a.createdAt );
                                                    }
                                                } )
                                                .map( ( job ) => (
                                                    <div key={job.id} className="border border-gray-800 rounded-lg p-4 hover:border-cyan-400/50 transition-all duration-300">
                                                        <div className="flex justify-between items-start">
                                                            <div className="flex-1">
                                                                <div className="flex items-center gap-2 mb-2">
                                                                    <h4 className="text-lg font-semibold text-white">{job.title}</h4>
                                                                    <span className={`px-2 py-1 rounded text-xs font-medium ${job.status === 'Open' ? 'bg-green-400/20 text-green-400' :
                                                                        job.status === 'Closed' ? 'bg-red-400/20 text-red-400' :
                                                                            'bg-yellow-400/20 text-yellow-400'
                                                                        }`}>
                                                                        {job.status}
                                                                    </span>
                                                                </div>
                                                                <div className="flex flex-wrap gap-2 mb-2">
                                                                    <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                                                                        {job.department}
                                                                    </span>
                                                                    <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                                                                        {job.location}
                                                                    </span>
                                                                    <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                                                                        {job.type}
                                                                    </span>
                                                                    <span className="bg-gray-800 text-gray-300 text-xs px-2 py-1 rounded">
                                                                        {job.experience}
                                                                    </span>
                                                                </div>
                                                                <p className="text-gray-400 text-sm mb-2">{job.description}</p>
                                                                <p className="text-gray-500 text-xs">
                                                                    Posted: {new Date( job.createdAt ).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                            <div className="flex space-x-2 ml-4">
                                                                <button
                                                                    onClick={() => toggleJobDetails( job.id )}
                                                                    className="text-gray-400 hover:text-cyan-400 p-2 transition-colors"
                                                                    title={expandedJobs.has( job.id ) ? "Hide Details" : "Show Details"}
                                                                >
                                                                    {expandedJobs.has( job.id ) ? <FaChevronLeft /> : <FaChevronRight />}
                                                                </button>
                                                                <button
                                                                    onClick={() => editCareer( job )}
                                                                    className="text-cyan-400 hover:text-cyan-300 p-2"
                                                                    title="Edit Job"
                                                                >
                                                                    <FaEdit />
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteCareer( job.id )}
                                                                    className="text-red-400 hover:text-red-300 p-2"
                                                                    title="Delete Job"
                                                                >
                                                                    <FaTrash />
                                                                </button>
                                                            </div>
                                                        </div>

                                                        {/* Job Details (Expandable) */}
                                                        {expandedJobs.has( job.id ) && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0 }}
                                                                animate={{ opacity: 1, height: "auto" }}
                                                                exit={{ opacity: 0, height: 0 }}
                                                                transition={{ duration: 0.3 }}
                                                                className="mt-4 pt-4 border-t border-gray-800"
                                                            >
                                                                <div className="grid md:grid-cols-2 gap-4">
                                                                    <div>
                                                                        <h5 className="text-sm font-semibold text-cyan-400 mb-2">Responsibilities</h5>
                                                                        <ul className="text-gray-300 text-sm space-y-1">
                                                                            {job.responsibilities?.map( ( resp, idx ) => (
                                                                                <li key={idx} className="flex items-start">
                                                                                    <span className="text-cyan-400 mr-2">•</span>
                                                                                    {resp}
                                                                                </li>
                                                                            ) )}
                                                                        </ul>
                                                                    </div>
                                                                    <div>
                                                                        <h5 className="text-sm font-semibold text-cyan-400 mb-2">Requirements</h5>
                                                                        <ul className="text-gray-300 text-sm space-y-1">
                                                                            {job.requirements?.map( ( req, idx ) => (
                                                                                <li key={idx} className="flex items-start">
                                                                                    <span className="text-cyan-400 mr-2">•</span>
                                                                                    {req}
                                                                                </li>
                                                                            ) )}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                {job.benefits?.length > 0 && (
                                                                    <div className="mt-4">
                                                                        <h5 className="text-sm font-semibold text-cyan-400 mb-2">Benefits</h5>
                                                                        <div className="flex flex-wrap gap-2">
                                                                            {job.benefits.map( ( benefit, idx ) => (
                                                                                <span key={idx} className="bg-cyan-400/10 text-cyan-400 text-xs px-2 py-1 rounded">
                                                                                    {benefit}
                                                                                </span>
                                                                            ) )}
                                                                        </div>
                                                                    </div>
                                                                )}
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                ) )}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Add New Service Modal */}
            {showAddServiceModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-900 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-cyan-400">Add New Service</h2>
                            <button
                                onClick={closeAddServiceModal}
                                className="text-gray-400 hover:text-white"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        {!selectedClientForNewService ? (
                            // Client Selection
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-4">Select Client</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    {clients.map( ( client ) => (
                                        <div
                                            key={client.id}
                                            onClick={() => setSelectedClientForNewService( client )}
                                            className="border border-gray-800 rounded-lg p-4 cursor-pointer hover:border-cyan-400 transition"
                                        >
                                            <h4 className="text-white font-semibold">{client.name}</h4>
                                            <p className="text-cyan-400 text-sm">{client.company}</p>
                                            <p className="text-gray-400 text-sm">{client.email}</p>
                                            <p className="text-gray-400 text-xs mt-1">{client.industry} • {client.companySize}</p>
                                        </div>
                                    ) )}
                                </div>
                            </div>
                        ) : (
                            // Service Form
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-lg font-semibold text-white">Add Service for {selectedClientForNewService.name}</h3>
                                    <button
                                        onClick={() => setSelectedClientForNewService( null )}
                                        className="text-cyan-400 hover:text-cyan-300 text-sm"
                                    >
                                        Change Client
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Service Name</label>
                                        <input
                                            type="text"
                                            value={serviceFormData.name}
                                            onChange={( e ) => setServiceFormData( prev => ( { ...prev, name: e.target.value } ) )}
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Category</label>
                                        <select
                                            value={serviceFormData.category}
                                            onChange={( e ) => setServiceFormData( prev => ( { ...prev, category: e.target.value } ) )}
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                        >
                                            {serviceCategories.map( category => (
                                                <option key={category} value={category}>{category}</option>
                                            ) )}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Status</label>
                                        <select
                                            value={serviceFormData.status}
                                            onChange={( e ) => setServiceFormData( prev => ( { ...prev, status: e.target.value } ) )}
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="active">Active</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Progress (%)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={serviceFormData.progress}
                                            onChange={( e ) => setServiceFormData( prev => ( { ...prev, progress: parseInt( e.target.value ) } ) )}
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Risk Score</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={serviceFormData.riskScore}
                                            onChange={( e ) => setServiceFormData( prev => ( { ...prev, riskScore: parseInt( e.target.value ) } ) )}
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Compliance Score (%)</label>
                                        <input
                                            type="number"
                                            min="0"
                                            max="100"
                                            value={serviceFormData.complianceScore}
                                            onChange={( e ) => setServiceFormData( prev => ( { ...prev, complianceScore: parseInt( e.target.value ) } ) )}
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <label className="block text-gray-400 text-sm mb-1">Description</label>
                                    <textarea
                                        value={serviceFormData.description}
                                        onChange={( e ) => setServiceFormData( prev => ( { ...prev, description: e.target.value } ) )}
                                        className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                        rows="3"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 mt-4">
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">Start Date</label>
                                        <input
                                            type="date"
                                            value={serviceFormData.startDate}
                                            onChange={( e ) => setServiceFormData( prev => ( { ...prev, startDate: e.target.value } ) )}
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-400 text-sm mb-1">End Date</label>
                                        <input
                                            type="date"
                                            value={serviceFormData.endDate}
                                            onChange={( e ) => setServiceFormData( prev => ( { ...prev, endDate: e.target.value } ) )}
                                            className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                        />
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-6">
                                    <button
                                        onClick={() => handleAddService( selectedClientForNewService.id )}
                                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                                    >
                                        Add Service
                                    </button>
                                    <button
                                        onClick={closeAddServiceModal}
                                        className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            )}

            {/* Add New Career Modal */}
            {showAddCareerModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-cyan-400">Add New Job</h2>
                            <button
                                onClick={closeAddCareerModal}
                                className="text-gray-400 hover:text-white"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Job Title</label>
                                <input
                                    type="text"
                                    value={careerFormData.title}
                                    onChange={( e ) => setCareerFormData( prev => ( { ...prev, title: e.target.value } ) )}
                                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Department</label>
                                <select
                                    value={careerFormData.department}
                                    onChange={( e ) => setCareerFormData( prev => ( { ...prev, department: e.target.value } ) )}
                                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                >
                                    {careerDepartments.map( department => (
                                        <option key={department} value={department}>{department}</option>
                                    ) )}
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Location</label>
                                <input
                                    type="text"
                                    value={careerFormData.location}
                                    onChange={( e ) => setCareerFormData( prev => ( { ...prev, location: e.target.value } ) )}
                                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Job Type</label>
                                <select
                                    value={careerFormData.type}
                                    onChange={( e ) => setCareerFormData( prev => ( { ...prev, type: e.target.value } ) )}
                                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Experience Required</label>
                                <input
                                    type="text"
                                    value={careerFormData.experience}
                                    onChange={( e ) => setCareerFormData( prev => ( { ...prev, experience: e.target.value } ) )}
                                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Description</label>
                                <textarea
                                    value={careerFormData.description}
                                    onChange={( e ) => setCareerFormData( prev => ( { ...prev, description: e.target.value } ) )}
                                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                    rows="4"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Responsibilities</label>
                                <textarea
                                    value={careerFormData.responsibilities.join( '\n' )}
                                    onChange={( e ) => setCareerFormData( prev => ( { ...prev, responsibilities: e.target.value.split( '\n' ).map( r => r.trim() ).filter( r => r ) } ) )}
                                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Requirements</label>
                                <textarea
                                    value={careerFormData.requirements.join( '\n' )}
                                    onChange={( e ) => setCareerFormData( prev => ( { ...prev, requirements: e.target.value.split( '\n' ).map( r => r.trim() ).filter( r => r ) } ) )}
                                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Benefits</label>
                                <textarea
                                    value={careerFormData.benefits.join( '\n' )}
                                    onChange={( e ) => setCareerFormData( prev => ( { ...prev, benefits: e.target.value.split( '\n' ).map( b => b.trim() ).filter( b => b ) } ) )}
                                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                    rows="3"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-400 text-sm mb-1">Status</label>
                                <select
                                    value={careerFormData.status}
                                    onChange={( e ) => setCareerFormData( prev => ( { ...prev, status: e.target.value } ) )}
                                    className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
                                >
                                    <option value="Open">Open</option>
                                    <option value="Closed">Closed</option>
                                    <option value="Filled">Filled</option>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <button
                                onClick={handleAddCareer}
                                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
                            >
                                Add Job
                            </button>
                            <button
                                onClick={closeAddCareerModal}
                                className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
} 