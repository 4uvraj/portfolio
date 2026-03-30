import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { personalInfo } from '../data/portfolioData';

/**
 * Contact Section Component
 * Clean minimal contact with social links and a copy-to-clipboard email
 */

const ContactLink = ({ icon, label, value, href, index, inView }) => {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    if (href === '#copy') {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
    >
      {href === '#copy' ? (
        <button
          onClick={handleClick}
          className="contact-link w-full text-left"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.2)' }}
          >
            {icon}
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wide font-medium">{label}</div>
            <div className="text-white text-sm font-medium">{value}</div>
          </div>
          <div className="text-slate-500 text-xs">
            {copied ? (
              <span className="text-green-400">✓ Copied!</span>
            ) : (
              'Copy'
            )}
          </div>
        </button>
      ) : (
        <a href={href} target="_blank" rel="noopener noreferrer" className="contact-link">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.2)' }}
          >
            {icon}
          </div>
          <div className="flex-1">
            <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wide font-medium">{label}</div>
            <div className="text-white text-sm font-medium">{value}</div>
          </div>
          <span className="text-slate-600">→</span>
        </a>
      )}
    </motion.div>
  );
};

const Contact = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const contacts = [
    {
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Personal Email',
      value: 'yuvrajkag2003@gmail.com',
      href: '#copy',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      ),
      label: 'College Email · IIIT Bhopal',
      value: '23u01051@iiitbhopal.ac.in',
      href: '#copy',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
      label: 'GitHub',
      value: '@4uvraj',
      href: 'https://github.com/4uvraj',
    },
    {
      icon: (
        <svg className="w-5 h-5 text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
      label: 'LinkedIn',
      value: 'Yuvraj Kag',
      href: 'https://www.linkedin.com/in/4uvraj',
    },
  ];

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-indigo-900/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
              📬 Let's Connect
            </div>
            <h2 className="section-title mb-6">
              Get in <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed mb-8">
              Whether you're looking to collaborate on an AI project, have an interesting problem to solve, or just want to talk tech — I'm always up for a conversation.
            </p>

            {/* Availability chip */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-slate-300">Open to internships &amp; collaborations</span>
            </div>
          </motion.div>

          {/* Right — Contact Links */}
          <div className="flex flex-col gap-3">
            {contacts.map((contact, index) => (
              <ContactLink
                key={contact.label}
                {...contact}
                index={index}
                inView={inView}
              />
            ))}

            {/* Resume Download */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="contact-link group"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.2)' }}
              >
                <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wide font-medium">Resume</div>
                <div className="text-white text-sm font-medium">Yuvraj_Kag_Resume.pdf</div>
              </div>
              <span className="text-xs text-indigo-400 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">↓ Download</span>
            </motion.a>

            {/* Quick CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="mt-4 p-6 rounded-2xl text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05))',
                border: '1px solid rgba(99,102,241,0.2)',
              }}
            >
              <p className="text-slate-300 text-sm mb-3">Or chat instantly with my AI portfolio assistant →</p>
              <button
                onClick={() => document.getElementById('chatbot')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary text-sm"
                style={{ padding: '10px 24px' }}
              >
                💬 Chat with Portfolio AI
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
