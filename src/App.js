import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import FAQ from "./pages/FAQ";
import Blog from "./pages/Blog";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Legal from "./pages/Legal";
import Footer from "./pages/Footer";
import BlogPost from "./pages/BlogPost";
import Admin from "./pages/Admin";

function Layout( { children } ) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <div className="font-bold text-xl">Webifant Security</div>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-cyan-400">Home</Link>
          <Link to="/about" className="hover:text-cyan-400">About</Link>
          <Link to="/services" className="hover:text-cyan-400">Services</Link>
          <Link to="/faq" className="hover:text-cyan-400">FAQ</Link>
          <Link to="/blog" className="hover:text-cyan-400">Blog</Link>
          <Link to="/contact" className="hover:text-cyan-400">Contact</Link>
          <Link to="/careers" className="hover:text-cyan-400">Careers</Link>
          <Link to="/legal" className="hover:text-cyan-400">Legal</Link>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

function Placeholder( { title } ) {
  return <div className="text-2xl font-bold text-center mt-20">{title} Page (Content coming soon)</div>;
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
