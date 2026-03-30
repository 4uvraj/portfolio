import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import LeetCode from './components/LeetCode';
import BuildProcess from './components/BuildProcess';
import FutureVision from './components/FutureVision';
import Contact from './components/Contact';
import Chatbot from './components/Chatbot';
import PDFDemo from './components/PDFDemo';
import Footer from './components/Footer';

/**
 * Main App Component
 * Yuvraj's Premium AI Developer Portfolio
 * 
 * Stack: React.js + TailwindCSS + Framer Motion
 * Features: Hero, Projects, Skills, Build Process, DSA, Vision, Contact, RAG Chatbot, PDF Demo
 */

function App() {
  return (
    <div className="min-h-screen bg-navy-950 text-slate-200 overflow-x-hidden">
      {/* Fixed Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* 1. Hero — First impression */}
        <Hero />

        {/* 2. Projects — Showcase */}
        <Projects />

        {/* 3. Skills — Technical arsenal */}
        <Skills />

        {/* 4. LeetCode — Real-time problem solving stats */}
        <LeetCode />

        {/* 4. How I Build + DSA Mindset */}
        <BuildProcess />

        {/* 5. Future Vision */}
        <FutureVision />

        {/* 6. Live PDF RAG Demo */}
        <PDFDemo />

        {/* 7. RAG Chatbot */}
        <Chatbot />

        {/* 8. Contact */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
