import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaShieldAlt, FaBars, FaTimes, FaChevronDown } from "react-icons/fa";
import Logo from '../components/Logo';

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState( false );
    const [isDropdownOpen, setIsDropdownOpen] = useState( false );
    const location = useLocation();

    const mainNavigation = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" }
    ];

    const secondaryNavigation = [
        { name: "FAQ", href: "/faq" },
        { name: "Careers", href: "/careers" },
        { name: "Legal", href: "/legal" },
        { name: "Become a Referrer", href: "/referrer-registration" }
    ];

    const isActive = ( path ) => location.pathname === path;

    return (
        <header className="bg-gray-900 border-b border-gray-700 fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center">
                            <FaShieldAlt className="text-cyan-400 text-2xl mr-3" />
                            <span className="text-xl font-bold text-white">Webifant Security</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-6">
                        {mainNavigation.map( ( item ) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`text-sm font-medium transition-colors ${isActive( item.href )
                                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                                    : 'text-gray-300 hover:text-cyan-400'
                                    }`}
                            >
                                {item.name}
                            </Link>
                        ) )}

                        {/* More Dropdown */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen( !isDropdownOpen )}
                                className="flex items-center text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors"
                            >
                                More
                                <FaChevronDown className={`ml-1 text-xs transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-50">
                                    {secondaryNavigation.map( ( item ) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            className={`block px-4 py-2 text-sm transition-colors ${isActive( item.href )
                                                ? 'text-cyan-400 bg-gray-700'
                                                : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-700'
                                                }`}
                                            onClick={() => setIsDropdownOpen( false )}
                                        >
                                            {item.name}
                                        </Link>
                                    ) )}
                                </div>
                            )}
                        </div>
                    </nav>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        <Link
                            to="/client-login"
                            className="text-gray-300 hover:text-cyan-400 transition-colors text-sm font-medium"
                        >
                            Client Login
                        </Link>
                        <Link
                            to="/referrer-login"
                            className="text-gray-300 hover:text-green-400 transition-colors text-sm font-medium"
                        >
                            Referrer Login
                        </Link>
                        <Link
                            to="/contact"
                            className="bg-cyan-400 text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-300 transition-colors"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen( !isMenuOpen )}
                            className="text-gray-300 hover:text-white p-2"
                        >
                            {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 rounded-lg mt-2">
                            {[...mainNavigation, ...secondaryNavigation].map( ( item ) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive( item.href )
                                        ? 'text-cyan-400 bg-gray-700'
                                        : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-700'
                                        }`}
                                    onClick={() => setIsMenuOpen( false )}
                                >
                                    {item.name}
                                </Link>
                            ) )}
                            <div className="pt-4 border-t border-gray-700">
                                <Link
                                    to="/client-login"
                                    className="block px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors"
                                    onClick={() => setIsMenuOpen( false )}
                                >
                                    Client Login
                                </Link>
                                <Link
                                    to="/referrer-login"
                                    className="block px-3 py-2 text-gray-300 hover:text-green-400 transition-colors"
                                    onClick={() => setIsMenuOpen( false )}
                                >
                                    Referrer Login
                                </Link>
                                <Link
                                    to="/contact"
                                    className="block px-3 py-2 mt-2 bg-cyan-400 text-gray-900 rounded-lg font-semibold hover:bg-cyan-300 transition-colors"
                                    onClick={() => setIsMenuOpen( false )}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
} 