import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '../firebase/clientService';
import { createReferral } from '../firebase/referrerService';
import { useReferrer, ReferrerInfo } from '../components/ReferrerTracker';
import { signInWithGoogle } from '../firebase/authService';
import { emailService } from '../firebase/emailService';
import Header from './Header';

const ClientRegistration = () => {
    const navigate = useNavigate();
    const { referrer, clearReferrer } = useReferrer();

    const [formData, setFormData] = useState( {
        name: '',
        email: '',
        phone: '',
        company: '',
        serviceType: '',
        message: ''
    } );
    const [isLoading, setIsLoading] = useState( false );
    const [isGoogleLoading, setIsGoogleLoading] = useState( false );
    const [error, setError] = useState( '' );
    const [success, setSuccess] = useState( '' );

    const serviceTypes = [
        { value: 'consulting', label: 'Cybersecurity Consulting' },
        { value: 'assessment', label: 'Security Assessment' },
        { value: 'forensics', label: 'Digital Forensics' },
        { value: 'training', label: 'Security Training' },
        { value: 'compliance', label: 'Compliance Services' }
    ];

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
        setSuccess( '' );

        try {
            // Validate required fields
            if ( !formData.name || !formData.email || !formData.serviceType ) {
                setError( 'Please fill in all required fields.' );
                return;
            }

            // Create client
            const clientResult = await createClient( formData );
            console.log( 'Client created successfully:', clientResult );

            // If referrer is detected, create referral
            if ( referrer ) {
                try {
                    await createReferral( {
                        referrerId: referrer.id,
                        referrerCode: referrer.code,
                        clientId: clientResult.id,
                        clientName: formData.name,
                        clientEmail: formData.email,
                        serviceType: formData.serviceType,
                        status: 'pending'
                    } );
                    console.log( 'Referral created successfully for referrer:', referrer.id );
                } catch ( referralError ) {
                    console.error( 'Error creating referral:', referralError );
                    // Don't fail the registration if referral creation fails
                }
            } else {
                console.log( 'No referrer detected during registration' );
            }

            setSuccess( 'Registration successful! We will contact you soon.' );

            // Send welcome email
            try {
                await emailService.sendWelcomeNotification(
                    formData.email,
                    formData.name,
                    'client'
                );
                console.log( 'Welcome email sent successfully' );
            } catch ( emailError ) {
                console.error( 'Error sending welcome email:', emailError );
                // Don't fail registration if email fails
            }

            // Clear form
            setFormData( {
                name: '',
                email: '',
                phone: '',
                company: '',
                serviceType: '',
                message: ''
            } );

            // Clear referrer info
            if ( referrer ) {
                clearReferrer();
            }

            // Redirect to home after 3 seconds
            setTimeout( () => {
                navigate( '/' );
            }, 3000 );

        } catch ( error ) {
            console.error( 'Client registration error:', error );
            setError( error.message || 'Registration failed. Please try again.' );
        } finally {
            setIsLoading( false );
        }
    };

    const handleGoogleSignUp = async () => {
        setIsGoogleLoading( true );
        setError( '' );
        setSuccess( '' );

        try {
            const { user, error: googleError } = await signInWithGoogle( 'client' );

            if ( googleError ) {
                setError( googleError );
                return;
            }

            if ( user ) {
                // If referrer is detected, create referral
                if ( referrer ) {
                    try {
                        await createReferral( {
                            referrerId: referrer.id,
                            referrerCode: referrer.code,
                            clientId: user.uid,
                            clientName: user.displayName || 'Google User',
                            clientEmail: user.email,
                            serviceType: 'consulting', // Default service type
                            status: 'pending'
                        } );
                        console.log( 'Referral created successfully for Google user with referrer:', referrer.id );
                    } catch ( referralError ) {
                        console.error( 'Error creating referral for Google user:', referralError );
                    }
                } else {
                    console.log( 'No referrer detected during Google sign-up' );
                }

                setSuccess( 'Google sign-up successful! Welcome to WebInfant.' );

                // Clear referrer info
                if ( referrer ) {
                    clearReferrer();
                }

                // Redirect to dashboard after 2 seconds
                setTimeout( () => {
                    navigate( '/client-dashboard' );
                }, 2000 );
            }
        } catch ( error ) {
            console.error( 'Google sign-up error:', error );
            setError( 'Google sign-up failed. Please try again.' );
        } finally {
            setIsGoogleLoading( false );
        }
    };

    return (
        <div className="bg-gray-950 text-white min-h-screen">
            <Header />
            <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 pt-24">
                {/* Background with cyber effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
                    <div className="absolute inset-0 bg-black bg-opacity-80"></div>
                    {/* Animated grid pattern */}
                    <div className="absolute inset-0 opacity-20">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                                              radial-gradient(circle at 75% 75%, rgba(0, 255, 255, 0.1) 0%, transparent 50%)`,
                            backgroundSize: '100px 100px'
                        }}></div>
                    </div>
                </div>

                <div className="relative z-10 max-w-2xl w-full">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <div className="mb-4">
                            <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-400/20 rounded-full border border-cyan-400/30 mb-3">
                                <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h1 className="text-3xl font-bold text-cyan-400 mb-1">
                                Get Started with WebInfant
                            </h1>
                            <p className="text-gray-300 text-sm">
                                Join our cybersecurity services and protect your digital assets
                            </p>
                        </div>
                    </div>

                    {/* Referrer Info */}
                    {referrer && (
                        <div className="mb-4 p-3 bg-green-900/20 border border-green-400/30 rounded-lg backdrop-blur-sm">
                            <ReferrerInfo />
                        </div>
                    )}

                    {/* Registration Form */}
                    <div className="bg-gray-900/50 backdrop-blur-lg border border-cyan-400/20 rounded-2xl p-6 shadow-2xl">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-cyan-400 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    required
                                    value={formData.name}
                                    onChange={( e ) => handleInputChange( 'name', e.target.value )}
                                    className="w-full px-3 py-2 bg-gray-800/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-cyan-400 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    required
                                    value={formData.email}
                                    onChange={( e ) => handleInputChange( 'email', e.target.value )}
                                    className="w-full px-3 py-2 bg-gray-800/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
                                    placeholder="Enter your email address"
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-cyan-400 mb-1">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    id="phone"
                                    value={formData.phone}
                                    onChange={( e ) => handleInputChange( 'phone', e.target.value )}
                                    className="w-full px-3 py-2 bg-gray-800/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
                                    placeholder="Enter your phone number"
                                />
                            </div>

                            {/* Company */}
                            <div>
                                <label htmlFor="company" className="block text-sm font-medium text-cyan-400 mb-1">
                                    Company
                                </label>
                                <input
                                    type="text"
                                    id="company"
                                    value={formData.company}
                                    onChange={( e ) => handleInputChange( 'company', e.target.value )}
                                    className="w-full px-3 py-2 bg-gray-800/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
                                    placeholder="Enter your company name"
                                />
                            </div>

                            {/* Service Type */}
                            <div>
                                <label htmlFor="serviceType" className="block text-sm font-medium text-cyan-400 mb-1">
                                    Service Type *
                                </label>
                                <select
                                    id="serviceType"
                                    required
                                    value={formData.serviceType}
                                    onChange={( e ) => handleInputChange( 'serviceType', e.target.value )}
                                    className="w-full px-3 py-2 bg-gray-800/50 border border-cyan-400/30 rounded-lg text-white focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300"
                                >
                                    <option value="" className="bg-gray-800">Select a service</option>
                                    {serviceTypes.map( service => (
                                        <option key={service.value} value={service.value} className="bg-gray-800">
                                            {service.label}
                                        </option>
                                    ) )}
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-cyan-400 mb-1">
                                    Additional Information
                                </label>
                                <textarea
                                    id="message"
                                    rows={3}
                                    value={formData.message}
                                    onChange={( e ) => handleInputChange( 'message', e.target.value )}
                                    className="w-full px-3 py-2 bg-gray-800/50 border border-cyan-400/30 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all duration-300 resize-none"
                                    placeholder="Tell us about your cybersecurity needs..."
                                />
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-4 bg-red-900/20 border border-red-400/30 rounded-lg backdrop-blur-sm">
                                    <p className="text-red-300">{error}</p>
                                </div>
                            )}

                            {/* Success Message */}
                            {success && (
                                <div className="p-4 bg-green-900/20 border border-green-400/30 rounded-lg backdrop-blur-sm">
                                    <p className="text-green-300">{success}</p>
                                    <p className="text-green-400 text-sm mt-1">Redirecting to homepage...</p>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-gradient-to-r from-cyan-400 to-blue-500 text-gray-900 py-3 px-6 rounded-lg font-bold hover:from-cyan-300 hover:to-blue-400 focus:ring-4 focus:ring-cyan-400/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-cyan-400/25"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                                        Processing...
                                    </div>
                                ) : (
                                    'Get Started'
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-cyan-400/30"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-gray-900/50 text-cyan-400 backdrop-blur-sm">Or continue with</span>
                                </div>
                            </div>

                            {/* Google Sign Up Button */}
                            <button
                                type="button"
                                onClick={handleGoogleSignUp}
                                disabled={isGoogleLoading}
                                className="w-full bg-white text-gray-900 py-3 px-6 rounded-lg font-bold hover:bg-gray-100 focus:ring-4 focus:ring-white/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/25 flex items-center justify-center gap-3"
                            >
                                {isGoogleLoading ? (
                                    <div className="flex items-center justify-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-900 mr-2"></div>
                                        Signing up...
                                    </div>
                                ) : (
                                    <>
                                        <svg className="w-6 h-6" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        Sign up with Google
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="mt-6 text-center">
                            <p className="text-gray-400">
                                Already have an account?{' '}
                                <a href="/client-login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                                    Sign in here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClientRegistration; 