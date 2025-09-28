import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ReferrerTracker from './components/ReferrerTracker';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import Legal from './pages/Legal';
import Careers from './pages/Careers';

// Authentication Pages
import AdminLogin from './pages/AdminLogin';
import ClientLogin from './pages/ClientLogin';
import ClientRegistration from './pages/ClientRegistration';

// Dashboard Pages
import Admin from './pages/Admin';
import AdminDashboard from './pages/AdminDashboard';
import LeadManagement from './pages/LeadManagement';
import ClientDashboard from './pages/ClientDashboard';
import TestDashboard from './pages/TestDashboard';
import ClientMessages from './pages/ClientMessages';

// Referrer System Pages
import ReferrerDashboard from './pages/ReferrerDashboard';
import ReferrerManagement from './pages/ReferrerManagement';
import ReferrerRegistration from './pages/ReferrerRegistration';
import ReferrerLogin from './pages/ReferrerLogin';

// Protected Route Component
const ProtectedRoute = ( { children, userType } ) => {
  const isAuthenticated = localStorage.getItem( `${userType}Authenticated` ) === 'true';
  console.log( `ProtectedRoute check for ${userType}:`, isAuthenticated );
  return isAuthenticated ? children : <Navigate to={`/${userType}-login`} replace />;
};

function App() {
  // Add debug logging
  console.log( 'ClientLogin component imported:', ClientLogin );

  return (
    <Router>
      <ReferrerTracker>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/test" element={<div>Test page working!</div>} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/legal" element={<Legal />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/test-dashboard" element={<TestDashboard />} />

            {/* Authentication Routes */}
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/client-login" element={<ClientLogin />} />
            <Route path="/client-registration" element={<ClientRegistration />} />
            <Route path="/referrer-login" element={<ReferrerLogin />} />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute userType="admin">
                  <Admin />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute userType="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/lead-management"
              element={
                <ProtectedRoute userType="admin">
                  <LeadManagement />
                </ProtectedRoute>
              }
            />

            {/* Protected Client Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute userType="client">
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/client-dashboard"
              element={
                <ProtectedRoute userType="client">
                  <ClientDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute userType="client">
                  <ClientMessages />
                </ProtectedRoute>
              }
            />

            {/* Referrer System Routes */}
            <Route path="/referrer-registration" element={<ReferrerRegistration />} />
            <Route path="/referrer-dashboard" element={<ReferrerDashboard />} />
            <Route
              path="/referrer-management"
              element={
                <ProtectedRoute userType="admin">
                  <ReferrerManagement />
                </ProtectedRoute>
              }
            />

            {/* Catch-all route for unmatched paths */}
            <Route path="*" element={
              <div style={{
                padding: '50px',
                textAlign: 'center',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>404 - Page Not Found</h1>
                <p style={{ marginBottom: '2rem' }}>The page you're looking for doesn't exist.</p>
                <a
                  href="/"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '5px'
                  }}
                >
                  Go Home
                </a>
              </div>
            } />
          </Routes>
        </div>
      </ReferrerTracker>
    </Router>
  );
}

export default App;
