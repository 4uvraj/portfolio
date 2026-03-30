import React from 'react';
import { motion } from 'framer-motion';

/**
 * Footer Component
 * Clean, minimal footer with back-to-top and social links
 */
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative py-12 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="text-center md:text-left">
            <div className="text-2xl font-black font-poppins gradient-text mb-1">Yuvraj Kag</div>
            <p className="text-slate-600 text-sm">AI Developer · Problem Solver</p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-slate-600">
            {['Projects', 'Skills', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => document.getElementById(item.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })}
                className="hover:text-slate-300 transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          {/* Back to top */}
          <motion.button
            onClick={scrollToTop}
            className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
            whileHover={{ y: -3, scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            ↑
          </motion.button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center text-xs text-slate-700">
          Built with React · TailwindCSS · Framer Motion · Powered by a local RAG engine
        </div>
      </div>
    </footer>
  );
};

export default Footer;
