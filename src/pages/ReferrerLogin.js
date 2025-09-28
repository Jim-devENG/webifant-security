import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { signInWithGoogle } from '../firebase/authService';
import Header from './Header';

const ReferrerLogin = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState( {
        email: '',
        password: ''
    } );
    const [isLoading, setIsLoading] = useState( false );
    const [isGoogleLoading, setIsGoogleLoading] = useState( false );
    const [error, setError] = useState( '' );

    const handleInputChange = ( field, value ) => {
        setFormData( prev => ( {
            ...prev,
            [field]: value
        } ) );
    };

    const handleSubmit = async ( e ) => {
        e.preventDefault();
        setIsLoading( true );
        setError( '' );

        try {
            await signInWithEmailAndPassword( auth, formData.email, formData.password );
            navigate( '/referrer-dashboard' );
        } catch ( error ) {
            console.error( 'Referrer login error:', error );
            setError( 'Invalid email or password. Please try again.' );
        } finally {
            setIsLoading( false );
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading( true );
        setError( '' );

        try {
            const { user, error: googleError } = await signInWithGoogle( 'client' ); // Use client type for referrers

            if ( googleError ) {
                setError( googleError );
                return;
            }

            if ( user ) {
                navigate( '/referrer-dashboard' );
            }
        } catch ( error ) {
            console.error( 'Google sign-in error:', error );
            setError( 'Google sign-in failed. Please try again.' );
        } finally {
            setIsGoogleLoading( false );
        }
    };

    return (
        <div className="bg-gray-950 text-white min-h-screen">
            <Header />
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24">
                {/* Background with cyber effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900">
                    <div className="absolute inset-0 bg-black bg-opacity-80"></div>
                    {/* Animated grid pattern */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(34, 197, 94, 0.1) 0%, transparent 50%),
                                          radial-gradient(circle at 75% 75%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)`,
                            backgroundSize: '100px 100px'
                        }}></div>
                    </div>
                </div>

                <div className="relative z-10 max-w-md w-full">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mb-6">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-400/20 rounded-full border border-green-400/30 mb-4">
                                <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                            <h1 className="text-4xl font-bold text-green-400 mb-2">
                                Referrer Portal
                            </h1>
                            <p className="text-gray-300">
                                Access your referrer dashboard
                            </p>
                        </div>
                    </div>

                    {/* Login Form */}
                    <div className="bg-gray-900/50 backdrop-blur-lg border border-green-400/20 rounded-2xl p-8 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-green-400 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={( e ) => handleInputChange( 'email', e.target.value )}
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-green-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300"
                                    placeholder="Enter your email"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-green-400 mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    required
                                    value={formData.password}
                                    onChange={( e ) => handleInputChange( 'password', e.target.value )}
                                    className="w-full px-4 py-3 bg-gray-800/50 border border-green-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 focus:border-green-400 transition-all duration-300"
                                    placeholder="Enter your password"
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-4 bg-red-900/20 border border-red-400/30 rounded-lg backdrop-blur-sm">
                                    <p className="text-red-300">{error}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-gray-900 py-3 px-6 rounded-lg font-bold hover:from-green-300 hover:to-emerald-400 focus:ring-4 focus:ring-green-400/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-green-400/25"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    'Access Dashboard'
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-green-400/30"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-gray-900/50 text-green-400 backdrop-blur-sm">Or continue with</span>
                                </div>
                            </div>

                            {/* Google Sign In Button */}
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={isGoogleLoading}
                                className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-bold hover:bg-gray-100 focus:ring-4 focus:ring-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/25 flex items-center justify-center gap-3"
                            >
                                {isGoogleLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                                        Signing in...
                                    </div>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        Sign in with Google
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-8 text-center space-y-4">
                            <p className="text-gray-400">
                                Don't have a referrer account?{' '}
                                <a href="/referrer-registration" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                                    Register here
                                </a>
                            </p>
                            <p className="text-gray-400">
                                <a href="/" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                                    ← Back to Homepage
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div className="mt-8 text-center">
                        <div className="flex items-center justify-center text-green-200 text-sm">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Secure referrer access
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReferrerLogin; 