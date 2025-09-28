import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/config';
import { signInWithGoogle } from '../firebase/authService';
import Header from './Header';

const AdminLogin = () => {
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
            navigate( '/admin-dashboard' );
        } catch ( error ) {
            console.error( 'Admin login error:', error );
            setError( 'Invalid credentials. Please check your email and password.' );
        } finally {
            setIsLoading( false );
        }
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading( true );
        setError( '' );

        try {
            const { user, error: googleError } = await signInWithGoogle( 'admin' );

            if ( googleError ) {
                setError( googleError );
                return;
            }

            if ( user ) {
                navigate( '/admin-dashboard' );
            }
        } catch ( error ) {
            console.error( 'Google sign-in error:', error );
            setError( 'Google sign-in failed. Please try again.' );
        } finally {
            setIsGoogleLoading( false );
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
            <Header />
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24">
                <div className="max-w-md w-full">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="mx-auto w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Admin Portal
                        </h1>
                        <p className="text-blue-200">
                            Secure access to WebInfant administration
                        </p>
                    </div>

                    {/* Login Form */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">
                                    Admin Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={( e ) => handleInputChange( 'email', e.target.value )}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                                    placeholder="Enter admin email"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-white mb-2">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    required
                                    value={formData.password}
                                    onChange={( e ) => handleInputChange( 'password', e.target.value )}
                                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-colors"
                                    placeholder="Enter password"
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-4 bg-red-500/20 border border-red-400/30 rounded-lg">
                                    <p className="text-red-200">{error}</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:ring-blue-400/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                        Authenticating...
                                    </div>
                                ) : (
                                    'Access Admin Panel'
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/30"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white/10 text-white backdrop-blur-sm">Or continue with</span>
                                </div>
                            </div>

                            {/* Google Sign In Button */}
                            <button
                                type="button"
                                onClick={handleGoogleSignIn}
                                disabled={isGoogleLoading}
                                className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-semibold hover:bg-gray-100 focus:ring-4 focus:ring-white/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                            >
                                {isGoogleLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                                        Authenticating...
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
                        <div className="mt-8 text-center">
                            <p className="text-blue-200">
                                <a href="/" className="text-blue-300 hover:text-white font-medium transition-colors">
                                    ← Back to Homepage
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div className="mt-8 text-center">
                        <div className="flex items-center justify-center text-blue-200 text-sm">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Restricted access - Admin credentials required
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin; 