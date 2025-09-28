import React, { useEffect, useState } from 'react';
import { getReferrerByCode } from '../firebase/referrerService';

const ReferrerTracker = ( { children, onReferrerDetected } ) => {
    const [referrer, setReferrer] = useState( null );
    const [isLoading, setIsLoading] = useState( true );

    useEffect( () => {
        const trackReferrer = async () => {
            try {
                // Check URL parameters for referrer code
                const urlParams = new URLSearchParams( window.location.search );
                const referrerCode = urlParams.get( 'ref' ) || urlParams.get( 'referrer' );

                console.log( 'ReferrerTracker: URL params:', window.location.search );
                console.log( 'ReferrerTracker: Referrer code from URL:', referrerCode );

                // Check localStorage for existing referrer
                const storedReferrer = localStorage.getItem( 'webinfant_referrer' );
                console.log( 'ReferrerTracker: Stored referrer:', storedReferrer );

                if ( referrerCode && !storedReferrer ) {
                    console.log( 'ReferrerTracker: Validating referrer code:', referrerCode );
                    
                    // Validate referrer code
                    const referrerData = await getReferrerByCode( referrerCode );
                    console.log( 'ReferrerTracker: Referrer data from DB:', referrerData );

                    if ( referrerData && referrerData.status === 'active' ) {
                        // Store referrer information
                        const referrerInfo = {
                            id: referrerData.id,
                            code: referrerCode,
                            name: referrerData.name || referrerData.email,
                            timestamp: new Date().toISOString()
                        };

                        console.log( 'ReferrerTracker: Storing referrer info:', referrerInfo );
                        localStorage.setItem( 'webinfant_referrer', JSON.stringify( referrerInfo ) );
                        setReferrer( referrerInfo );

                        // Track in analytics (if available)
                        if ( window.gtag ) {
                            window.gtag( 'event', 'referrer_detected', {
                                referrer_code: referrerCode,
                                referrer_id: referrerData.id
                            } );
                        }

                        // Callback for parent components
                        if ( onReferrerDetected ) {
                            onReferrerDetected( referrerInfo );
                        }
                    } else {
                        console.log( 'ReferrerTracker: Invalid referrer data or inactive status' );
                    }
                } else if ( storedReferrer ) {
                    // Use stored referrer
                    const referrerInfo = JSON.parse( storedReferrer );
                    console.log( 'ReferrerTracker: Using stored referrer:', referrerInfo );
                    setReferrer( referrerInfo );
                } else {
                    console.log( 'ReferrerTracker: No referrer code found and no stored referrer' );
                }
            } catch ( error ) {
                console.error( 'Error tracking referrer:', error );
            } finally {
                setIsLoading( false );
            }
        };

        trackReferrer();
    }, [onReferrerDetected] );

    // Clean URL parameters after tracking
    useEffect( () => {
        if ( referrer && !isLoading ) {
            const url = new URL( window.location );
            url.searchParams.delete( 'ref' );
            url.searchParams.delete( 'referrer' );

            // Update URL without page reload
            window.history.replaceState( {}, '', url.toString() );
        }
    }, [referrer, isLoading] );

    if ( isLoading ) {
        return null; // Don't render anything while loading
    }

    return children;
};

// Hook for accessing referrer data
export const useReferrer = () => {
    const [referrer, setReferrer] = useState( null );

    useEffect( () => {
        const storedReferrer = localStorage.getItem( 'webinfant_referrer' );
        if ( storedReferrer ) {
            setReferrer( JSON.parse( storedReferrer ) );
        }
    }, [] );

    const clearReferrer = () => {
        localStorage.removeItem( 'webinfant_referrer' );
        setReferrer( null );
    };

    return { referrer, clearReferrer };
};

// Component for displaying referrer information
export const ReferrerInfo = ( { className = '' } ) => {
    const { referrer } = useReferrer();

    if ( !referrer ) {
        return null;
    }

    return (
        <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 ${className}`}>
            <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-blue-900">
                    Referred by: {referrer.name}
                </span>
            </div>
        </div>
    );
};

// Component for generating referrer links
export const ReferrerLink = ( { referrerCode, children, className = '', ...props } ) => {
    const generateReferrerLink = ( baseUrl ) => {
        const url = new URL( baseUrl, window.location.origin );
        url.searchParams.set( 'ref', referrerCode );
        return url.toString();
    };

    const handleClick = ( e ) => {
        if ( props.onClick ) {
            props.onClick( e );
        }

        // Copy link to clipboard
        const link = generateReferrerLink( window.location.pathname );
        navigator.clipboard.writeText( link ).then( () => {
            // Show success message (you can implement a toast notification here)
            console.log( 'Referrer link copied to clipboard:', link );
        } );
    };

    return (
        <button
            className={`inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors ${className}`}
            onClick={handleClick}
            {...props}
        >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
                <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            <span>{children}</span>
        </button>
    );
};

export default ReferrerTracker; 