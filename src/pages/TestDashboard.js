import React from "react";
import { FaShieldAlt, FaChartLine, FaTools, FaCertificate, FaSignOutAlt } from "react-icons/fa";

export default function TestDashboard() {
    console.log( 'TestDashboard: Component rendering' );

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0f0f23', display: 'flex', flexDirection: 'column' }}>
            {/* Header - BRIGHT RED FOR TESTING */}
            <header style={{ backgroundColor: '#dc2626', borderBottom: '1px solid #ef4444', width: '100%', padding: '1rem' }}>
                <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FaShieldAlt style={{ color: '#06b6d4', fontSize: '1.5rem', marginRight: '0.75rem' }} />
                            <h1 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>Webifant Security</h1>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ color: 'white' }}>Test User</span>
                            <button style={{ padding: '0.5rem', color: '#9ca3af' }}>
                                <FaSignOutAlt />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation - BRIGHT BLUE FOR TESTING */}
            <nav style={{ backgroundColor: '#2563eb', borderBottom: '1px solid #3b82f6', width: '100%', padding: '1rem' }}>
                <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
                    <div style={{ display: 'flex', gap: '2rem' }}>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 0.25rem', borderBottom: '2px solid #06b6d4', color: '#06b6d4', fontWeight: '500', fontSize: '0.875rem' }}>
                            <FaChartLine style={{ fontSize: '1.125rem' }} />
                            <span>Overview</span>
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 0.25rem', borderBottom: '2px solid transparent', color: '#9ca3af', fontWeight: '500', fontSize: '0.875rem' }}>
                            <FaTools style={{ fontSize: '1.125rem' }} />
                            <span>Services</span>
                        </button>
                        <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 0.25rem', borderBottom: '2px solid transparent', color: '#9ca3af', fontWeight: '500', fontSize: '0.875rem' }}>
                            <FaCertificate style={{ fontSize: '1.125rem' }} />
                            <span>Compliance</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content - BRIGHT GREEN FOR TESTING */}
            <main style={{ flex: 1, maxWidth: '80rem', margin: '0 auto', padding: '2rem 1rem', width: '100%' }}>
                <div style={{ width: '100%' }}>
                    <div style={{ backgroundColor: '#374151', borderRadius: '0.5rem', padding: '1.5rem', border: '1px solid #4b5563' }}>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>Dashboard Test</h2>
                        <p style={{ color: '#9ca3af' }}>This is a test to see if the layout is working.</p>
                        <p style={{ color: '#9ca3af', marginTop: '0.5rem' }}>Header and footer should be visible.</p>
                        <p style={{ color: '#10b981', marginTop: '0.5rem', fontWeight: 'bold' }}>✅ If you see this green text, the component is rendering!</p>
                    </div>
                </div>
            </main>

            {/* Footer - BRIGHT YELLOW FOR TESTING */}
            <footer style={{ backgroundColor: '#ca8a04', borderTop: '1px solid #eab308', marginTop: 'auto', width: '100%', padding: '1.5rem' }}>
                <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                            <FaShieldAlt style={{ color: '#06b6d4', fontSize: '1.25rem', marginRight: '0.5rem' }} />
                            <span style={{ color: 'white', fontWeight: '600' }}>Webifant Security</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', fontSize: '0.875rem', color: '#fef3c7' }}>
                            <span>© 2024 Webifant Security. All rights reserved.</span>
                            <span>24/7 Support: support@webinfant.com</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
} 