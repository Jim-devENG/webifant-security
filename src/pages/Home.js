import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaShieldAlt, FaUsers, FaChartLine, FaAward, FaArrowRight, FaPlay, FaInstagram, FaLinkedin, FaEye, FaClock, FaCheckCircle, FaExclamationTriangle, FaRocket, FaGlobe, FaLock, FaUnlock, FaNetworkWired, FaDatabase, FaMobile, FaDesktop, FaCloud, FaShieldVirus, FaUserSecret, FaUserTie, FaUserGraduate, FaUserCog, FaUserCheck, FaUserTimes, FaUserPlus, FaUserMinus, FaUserEdit, FaUserLock, FaUserUnlock, FaUserClock, FaBell, FaCog, FaSignOutAlt, FaEdit, FaPlus, FaTrash, FaSearch, FaFilter, FaSort, FaCalendar, FaMapMarkerAlt, FaPhone, FaEnvelope, FaIndustry, FaBuilding, FaChartBar, FaExclamationCircle, FaCheckDouble, FaArrowLeft, FaRedo, FaSync, FaInfoCircle, FaQuestionCircle, FaBook, FaGraduationCap, FaTools, FaCertificate, FaClipboard, FaFileMedical, FaBug, FaHackerrank, FaPause } from "react-icons/fa";
import imageConfig from '../assets/images/imageConfig.json';
import CyberAnimations from '../components/CyberAnimations';
import Logo from '../components/Logo';
import ServiceAnimations from '../components/ServiceAnimations';
import Header from './Header';
import Footer from './Footer';

export default function Home() {
    const [isVideoPlaying, setIsVideoPlaying] = useState( false );
    const [videoProgress, setVideoProgress] = useState( 0 );
    const [videoDuration, setVideoDuration] = useState( 0 );
    const [videoError, setVideoError] = useState( false );
    const videoRef = useRef( null );

    const handleVideoPlay = () => {
        const video = videoRef.current;
        if ( video ) {
            const playPromise = video.play();
            if ( playPromise && typeof playPromise.then === 'function' ) {
                playPromise.then( () => setIsVideoPlaying( true ) ).catch( () => setVideoError( true ) );
            } else {
                setIsVideoPlaying( true );
            }
        }
    };

    const handleVideoPause = () => {
        const video = videoRef.current;
        if ( video ) {
            video.pause();
            setIsVideoPlaying( false );
        }
    };

    const handleVideoReset = () => {
        const video = videoRef.current;
        if ( video ) {
            video.currentTime = 0;
            setVideoProgress( 0 );
            setIsVideoPlaying( false );
        }
    };

    const formatTime = ( seconds ) => {
        const mins = Math.floor( seconds / 60 );
        const secs = Math.floor( seconds % 60 );
        return `${mins.toString().padStart( 2, '0' )}:${secs.toString().padStart( 2, '0' )}`;
    };

    const progressPercentage = videoDuration > 0 ? ( videoProgress / videoDuration ) * 100 : 0;

    return (
        <div className="bg-gray-950 text-white">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(${imageConfig.imageMap['hero-bg.jpg'].url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}
                >
                    <div className="absolute inset-0 bg-black bg-opacity-90"></div>
                </div>

                {/* Cybersecurity Animations */}
                <CyberAnimations />

                <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mb-8"
                        >
                            <Logo size="text-6xl md:text-8xl" />
                        </motion.div>
                        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
                            Experience unbeatable online protection of your legacy
                        </p>
                        <p className="text-sm text-gray-400 mb-6">RC Number: 8842347</p>
                        <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
                            We designed our cutting-edge security assessment services to shield your startup from today's ever-evolving threats.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                            <Link
                                to="/contact"
                                className="bg-cyan-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-300 transition duration-300 flex items-center gap-2"
                            >
                                Get Started <FaArrowRight />
                            </Link>
                            <button
                                onClick={handleVideoPlay}
                                className="bg-transparent border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transition duration-300 flex items-center gap-2"
                            >
                                <FaPlay /> Watch Video
                            </button>
                        </div>
                        {/* Video moved to dedicated section below */}

                        {/* Social Media Icons */}
                        <div className="flex justify-center space-x-6">
                            <a href="https://instagram.com/webifant" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition duration-300">
                                <FaInstagram className="text-2xl" />
                            </a>
                            <a href="https://linkedin.com/company/webifant" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition duration-300">
                                <FaLinkedin className="text-2xl" />
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* YouTube-Style Information Section (relocated below About) */}
            <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
            {/* Animated Background Elements */}
                <div className="absolute inset-0">
                    <motion.div
                        animate={{
                            x: [0, 100, 0],
                            y: [0, -50, 0],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-20 left-10 w-32 h-32 bg-cyan-400/10 rounded-full blur-xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, -80, 0],
                            y: [0, 60, 0],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute bottom-20 right-10 w-40 h-40 bg-blue-400/10 rounded-full blur-xl"
                    />
                    <motion.div
                        animate={{
                            x: [0, 60, 0],
                            y: [0, -40, 0],
                        }}
                        transition={{
                            duration: 18,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                        className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-400/10 rounded-full blur-xl"
                    />
                </div>

                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl font-bold text-cyan-400 mb-6">
                            Why Choose Webifant Security?
                        </h2>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto">
                            Discover the cutting-edge cybersecurity solutions that protect businesses worldwide
                        </p>
                    </motion.div>

                    {/* Video-Style Information Cards */}
                    <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
                        {/* Left Side - Video Player Style */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl border border-gray-700">
                                {/* Video Header */}
                                <div className="bg-gray-900 p-4 border-b border-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                        <div className="flex-1"></div>
                                        <FaPlay className="text-gray-400" />
                                    </div>
                                </div>

                                {/* Video Content */}
                                <div className="relative h-96 bg-black rounded-lg overflow-hidden">
                                    {/* YouTube Video Player */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="relative w-full h-full">
                                            {/* YouTube Embedded Video */}
                                            <div className="w-full h-full bg-black rounded-lg overflow-hidden">
                                                <iframe
                                                    width="100%"
                                                    height="100%"
                                                    src="https://www.youtube.com/embed/JIJslcA8Q5g?si=BFiszYKJjbx3q5Nh"
                                                    title="YouTube video player"
                                                    frameBorder="0"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                    referrerPolicy="strict-origin-when-cross-origin"
                                                    allowFullScreen
                                                    className="w-full h-full rounded-lg"
                                                ></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </motion.div>

                        {/* Right Side - Information Cards */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-6"
                        >
                            {[
                                {
                                    icon: FaRocket,
                                    title: "Lightning Fast Response",
                                    description: "Our AI-powered systems detect and respond to threats in milliseconds, ensuring your business stays protected 24/7.",
                                    color: "text-orange-400",
                                    bgColor: "bg-orange-400/10"
                                },
                                {
                                    icon: FaGlobe,
                                    title: "Global Threat Intelligence",
                                    description: "Access to real-time threat data from our global network of security researchers and AI systems.",
                                    color: "text-blue-400",
                                    bgColor: "bg-blue-400/10"
                                },
                                {
                                    icon: FaUserSecret,
                                    title: "Expert Security Team",
                                    description: "Certified cybersecurity professionals with decades of combined experience in threat detection and prevention.",
                                    color: "text-purple-400",
                                    bgColor: "bg-purple-400/10"
                                },
                                {
                                    icon: FaShieldAlt,
                                    title: "Zero False Positives",
                                    description: "Advanced machine learning algorithms ensure accurate threat detection with minimal false alerts.",
                                    color: "text-green-400",
                                    bgColor: "bg-green-400/10"
                                }
                            ].map( ( feature, index ) => (
                                <motion.div
                                    key={feature.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-cyan-400 transition-all duration-300 group"
                                >
                                    <div className="flex items-start space-x-4">
                                        <div className={`p-3 rounded-lg ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                                            <feature.icon className={`text-2xl ${feature.color}`} />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-300 leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ) )}
                        </motion.div>
                    </div>

                    {/* Statistics Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="grid md:grid-cols-4 gap-8"
                    >
                        {[
                            { number: "99.9%", label: "Uptime Guarantee", icon: FaCheckCircle, color: "text-green-400" },
                            { number: "< 50ms", label: "Response Time", icon: FaRocket, color: "text-orange-400" },
                            { number: "24/7", label: "Monitoring", icon: FaClock, color: "text-blue-400" },
                            { number: "0", label: "Data Breaches", icon: FaShieldAlt, color: "text-cyan-400" }
                        ].map( ( stat, index ) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="text-center group"
                            >
                                <div className={`text-4xl font-bold mb-2 ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                    {stat.number}
                                </div>
                                <div className="text-gray-400 mb-3">{stat.label}</div>
                                <stat.icon className={`text-2xl mx-auto ${stat.color} opacity-60`} />
                            </motion.div>
                        ) )}
                    </motion.div>
                </div>
            </section>

            {/* Short Video Section */}
            <section className="py-16 bg-gray-950 border-t border-gray-800">
                <div className="max-w-5xl mx-auto px-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-cyan-400 mb-4 text-center">Watch: Secure Your Business in 5 Steps</h3>
                    <div className="relative rounded-2xl overflow-hidden border border-gray-800 bg-black shadow-2xl">
                        <video
                            ref={videoRef}
                            className="w-full h-64 md:h-80 lg:h-96 object-cover"
                            muted
                            loop
                            playsInline
                            onTimeUpdate={(e)=>setVideoProgress(e.target.currentTime)}
                            onLoadedMetadata={(e)=>setVideoDuration(e.target.duration)}
                            onError={()=>setVideoError(true)}
                        >
                            <source src="/videos/intro.mp4" type="video/mp4" />
                            <source src="/videos/intro.webm" type="video/webm" />
                        </video>
                        {videoError && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/70 text-gray-200 text-sm px-4 text-center">
                                Video not available. Please add intro.mp4 to /public/videos or provide a link.
                            </div>
                        )}
                        <div className="flex items-center justify-center gap-3 p-3 bg-gray-900/60">
                            <button onClick={handleVideoPlay} className="text-cyan-400 hover:text-cyan-300"><FaPlay /></button>
                            <button onClick={handleVideoPause} className="text-gray-300 hover:text-white"><FaPause /></button>
                            <button onClick={handleVideoReset} className="text-gray-300 hover:text-white"><FaRedo /></button>
                            <div className="ml-auto text-xs text-gray-400">{formatTime(videoProgress)} / {formatTime(videoDuration)}</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Free Video Email Capture CTA */}
            <section className="py-16 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border-t border-gray-700">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-3xl font-bold text-cyan-400 mb-6">
                            Want to secure your business without spending a dime?
                        </h3>
                        <p className="text-lg text-gray-300 mb-6">
                            We made a video showing the step by steps to do that. Get it here:
                        </p>
                        <form className="flex flex-col sm:flex-row gap-3 justify-center">
                            <input
                                type="email"
                                required
                                placeholder="Enter your email"
                                className="flex-1 bg-gray-800 border border-gray-700 rounded px-4 py-3 text-white focus:border-cyan-400 focus:outline-none"
                            />
                            <button type="submit" className="bg-cyan-400 text-gray-900 px-6 py-3 rounded font-semibold hover:bg-cyan-300 transition">
                                Get the Video
                            </button>
                        </form>
                        <p className="text-xs text-gray-500 mt-3">You'll also join our newsletter. Unsubscribe anytime.</p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-gray-900">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-gray-800 p-8 rounded-lg"
                        >
                            <div className="text-4xl font-bold text-cyan-400 mb-2">120+</div>
                            <div className="text-gray-400">Clients Served Globally</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="bg-gray-800 p-8 rounded-lg"
                        >
                            <div className="text-4xl font-bold text-cyan-400 mb-2">11+</div>
                            <div className="text-gray-400">Cyber Security Experts</div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="bg-gray-800 p-8 rounded-lg"
                        >
                            <div className="text-4xl font-bold text-cyan-400 mb-2">0+</div>
                            <div className="text-gray-400">Cyber Security Projects</div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl font-bold text-cyan-400 mb-6">
                                Your Safety in the Cyber Jungle
                            </h2>
                            <p className="text-lg text-gray-300 mb-6">
                                Cyber-attacks don't happen out of nowhere. Your daily emails, file share, sign ins, and transactions open the door. Threat actors may also be attracted to your customer growth and business success. But here is the silver lining. Every threat starts with a whisper. The key is catching it before it turns into a shout.
                            </p>
                            <p className="text-lg text-gray-300 mb-8">
                                And that's what we do with our expertise in threat detection and prevention. Our security assessments are designed to find these early signs and neutralize threats before danger slips through the crack. We also secure your endpoints going forward so you never have to worry. Cyber threats don't wait – neither should you. With Webifant Security, peace of mind guaranteed.
                            </p>
                            <Link
                                to="/contact"
                                className="bg-cyan-400 text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-cyan-300 transition duration-300 inline-flex items-center gap-2"
                            >
                                Contact Us <FaArrowRight />
                            </Link>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <img
                                src={imageConfig.imageMap['about-image.jpg'].url}
                                alt="Cybersecurity protection"
                                className="w-full h-96 object-cover rounded-lg shadow-2xl"
                                onError={( e ) => {
                                    e.target.src = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop";
                                }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="relative py-20 bg-gray-900 overflow-hidden">
                <ServiceAnimations />
                <div className="max-w-6xl mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-cyan-400 mb-6">
                            We Offer Professional Security Solutions
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Comprehensive cybersecurity services designed to protect your business from modern threats
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
                        {[
                            {
                                title: "Cybersecurity Assessments",
                                description: "Security assessment is about reviewing your operations to spot vulnerable areas for threat actors to exploit. We conduct comprehensive evaluations to identify and address security gaps.",
                                icon: FaShieldAlt,
                                image: imageConfig.imageMap['cybersecurity-assessments.jpg'].url
                            },
                            {
                                title: "Digital Forensics",
                                description: "In the event of a cyber attack, digital forensics is crucial to understand what happened, how it happened, and how to prevent it from happening again.",
                                icon: FaUsers,
                                image: imageConfig.imageMap['digital-forensics.jpg'].url
                            },
                            {
                                title: "Security Management",
                                description: "Real-Time Monitoring: Protect your business proactively with our 24/7 continuous monitoring services. We identify and respond to threats before they can cause damage.",
                                icon: FaChartLine,
                                image: imageConfig.imageMap['security-management.jpg'].url
                            },
                            {
                                title: "Consulting and Training",
                                description: "We offer expert advice and strategic guidance to enhance your cybersecurity strategy. When you need specialized knowledge, we're here to help.",
                                icon: FaAward,
                                image: imageConfig.imageMap['consulting-training.jpg'].url
                            },
                            {
                                title: "Tailored Security Solutions",
                                description: "No two organizations have the same security needs, and we get that. That's why we create customized security solutions that fit your specific requirements.",
                                icon: FaShieldAlt,
                                image: imageConfig.imageMap['tailored-solutions.jpg'].url
                            },
                            {
                                title: "AI Scanner",
                                description: "Automatically scan your website and get real-time updates on your website's safety.",
                                icon: FaShieldAlt,
                                image: imageConfig.imageMap['cybersecurity-assessments.jpg'].url,
                                externalLink: "https://www.webifant.ai"
                            }
                        ].map( ( service, index ) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 relative z-10 cursor-pointer"
                            >
                                <div className="h-48 overflow-hidden">
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                        onError={( e ) => {
                                            e.target.src = "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop";
                                        }}
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="text-cyan-400 mb-4">
                                        <service.icon className="text-3xl" />
                                    </div>
                                    <h3 className="text-xl font-bold text-cyan-300 mb-3">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-400 mb-4">
                                        {service.description}
                                    </p>
                                    <Link
                                        to="/contact"
                                        className="text-cyan-400 hover:text-cyan-300 transition duration-300 flex items-center gap-2 relative z-20"
                                    >
                                        Discuss Your Security <FaArrowRight className="text-sm" />
                                    </Link>
                                </div>
                            </motion.div>
                        ) )}
                    </div>
                </div>
            </section>

            {/* Client Dashboard Section */}
            <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-cyan-400 mb-6">
                            Client Dashboard
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                            Existing clients can access their personalized dashboard to view service progress, security updates, and project status.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-gray-800 rounded-lg p-8 text-center"
                    >
                        <div className="max-w-2xl mx-auto">
                            <h3 className="text-2xl font-bold text-white mb-4">
                                Track Your Security Services
                            </h3>
                            <p className="text-gray-300 mb-6">
                                Monitor the progress of your cybersecurity assessments, view real-time security updates, and access detailed reports from our team of certified experts.
                            </p>
                            <Link
                                to="/dashboard"
                                className="bg-cyan-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-300 transition duration-300 inline-flex items-center gap-2"
                            >
                                Access Dashboard <FaArrowRight />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
                <div className="max-w-6xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold text-cyan-400 mb-6">
                            Certified Experts, Unmatched Security
                        </h2>
                        <p className="text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
                            Our team of certified cybersecurity professionals brings decades of combined experience in protecting businesses from evolving digital threats. Every security engineer on our team is rigorously trained, industry-certified, and battle-tested in real-world security scenarios.
                        </p>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-2xl">
                                <h3 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center">
                                    <FaShieldAlt className="mr-3 text-cyan-400" />
                                    Professional Certifications
                                </h3>
                                <p className="text-gray-300 mb-8 leading-relaxed">
                                    Our cybersecurity team holds industry-recognized certifications from leading organizations, ensuring you receive expert-level protection and guidance for your business.
                                </p>
                                <div className="space-y-4">
                                    {[
                                        {
                                            cert: "Certified Ethical Hacker (CEH)",
                                            org: "EC-Council",
                                            id: "ЕСС6079245318",
                                            description: "Advanced penetration testing and ethical hacking methodologies"
                                        },
                                        {
                                            cert: "Certified in Cybersecurity (CC)",
                                            org: "ISC²",
                                            id: "ISC2-CC",
                                            description: "Comprehensive cybersecurity fundamentals and best practices"
                                        },
                                        {
                                            cert: "IBM Certified Associate Analyst",
                                            org: "IBM Security QRadar SIEM V7.2.6",
                                            id: "IBM-QRADAR",
                                            description: "Advanced security information and event management"
                                        },
                                        {
                                            cert: "InsightVM Certified Administrator",
                                            org: "Rapid7",
                                            id: "RAPID7-INSIGHTVM",
                                            description: "Vulnerability management and risk assessment"
                                        },
                                        {
                                            cert: "Splunk Enterprise Troubleshooting",
                                            org: "Splunk",
                                            id: "SPLUNK-ENT",
                                            description: "Security monitoring and threat detection"
                                        }
                                    ].map( ( certification, index ) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            className="bg-gray-700 rounded-lg p-4 border-l-4 border-cyan-400"
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="text-cyan-300 font-semibold mb-1">
                                                        {certification.cert}
                                                    </h4>
                                                    <p className="text-gray-400 text-sm mb-2">
                                                        {certification.org}
                                                    </p>
                                                    <p className="text-gray-300 text-sm">
                                                        {certification.description}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <span className="text-xs text-gray-500 bg-gray-600 px-2 py-1 rounded">
                                                        ID: {certification.id}
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) )}
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 shadow-2xl">
                                <h3 className="text-2xl font-bold text-cyan-300 mb-6 flex items-center">
                                    <FaAward className="mr-3 text-cyan-400" />
                                    Why Choose Our Experts?
                                </h3>
                                <div className="space-y-6">
                                    {[
                                        {
                                            title: "Industry Experience",
                                            description: "Combined decades of experience across Fortune 500 companies, government agencies, and critical infrastructure protection.",
                                            icon: FaUsers
                                        },
                                        {
                                            title: "Continuous Training",
                                            description: "Regular updates on emerging threats, new attack vectors, and evolving security technologies to stay ahead of cybercriminals.",
                                            icon: FaChartLine
                                        },
                                        {
                                            title: "Proven Track Record",
                                            description: "Successfully protected businesses from sophisticated attacks, with zero major security breaches among our clients.",
                                            icon: FaShieldAlt
                                        },
                                        {
                                            title: "24/7 Support",
                                            description: "Round-the-clock monitoring and incident response capabilities to ensure your business is protected at all times.",
                                            icon: FaAward
                                        }
                                    ].map( ( feature, index ) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            className="flex items-start"
                                        >
                                            <div className="text-cyan-400 mr-4 mt-1">
                                                <feature.icon className="text-xl" />
                                            </div>
                                            <div>
                                                <h4 className="text-cyan-300 font-semibold mb-2">
                                                    {feature.title}
                                                </h4>
                                                <p className="text-gray-300 text-sm leading-relaxed">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ) )}
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-xl p-6 text-center">
                                <h4 className="text-gray-900 font-bold text-lg mb-2">
                                    Ready to Work with Certified Experts?
                                </h4>
                                <p className="text-gray-800 text-sm mb-4">
                                    Get the peace of mind that comes with professional cybersecurity protection
                                </p>
                                <Link
                                    to="/contact"
                                    className="bg-gray-900 text-cyan-400 px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 inline-flex items-center gap-2"
                                >
                                    Schedule Consultation <FaArrowRight />
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gray-900">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-bold text-cyan-400 mb-6">
                            Discuss Your Security Needs
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Contact our team to plan an assessment or digital forensics engagement
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link
                                to="/contact"
                                className="bg-cyan-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-300 transition duration-300 inline-flex items-center gap-2"
                            >
                                Discuss Your Security <FaArrowRight />
                            </Link>
                            <Link
                                to="/services"
                                className="bg-transparent border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transition duration-300 inline-flex items-center gap-2"
                            >
                                Book an Assessment <FaEye />
                            </Link>
                            <Link
                                to="/services"
                                className="bg-transparent border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-lg font-semibold hover:bg-cyan-400 hover:text-gray-900 transition duration-300 inline-flex items-center gap-2"
                            >
                                Book a Digital Forensics <FaEye />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
            {/* Footer */}
            <Footer />
        </div>
    );
} 