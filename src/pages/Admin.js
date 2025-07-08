import React, { useState, useEffect } from "react";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import { onAuthStateChange } from "../firebase/authService";

export default function Admin() {
    const [isAuthenticated, setIsAuthenticated] = useState( false );
    const [isLoading, setIsLoading] = useState( true );

    useEffect( () => {
        const unsubscribe = onAuthStateChange( ( user ) => {
            setIsAuthenticated( !!user );
            setIsLoading( false );
        } );

        return () => unsubscribe();
    }, [] );

    const handleLogin = ( success ) => {
        setIsAuthenticated( success );
    };

    const handleLogout = () => {
        setIsAuthenticated( false );
    };

    if ( isLoading ) {
        return (
            <div className="bg-gray-950 text-white min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {isAuthenticated ? (
                <AdminDashboard onLogout={handleLogout} />
            ) : (
                <AdminLogin onLogin={handleLogin} />
            )}
        </>
    );
} 