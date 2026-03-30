import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolioData';

/**
 * Hero Section — Full-screen background image with gradient overlay
 */
const Hero = () => {
  const canvasRef = useRef(null);
  const [displayedTitle, setDisplayedTitle] = useState('');
  const titles = [
    'AI Developer',
    'Problem Solver',
    'Building Intelligent Systems',
  ];
  const [titleIndex, setTitleIndex] = useState(0);

  // Subtle particle canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const count = 50;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.3 + 0.05,
        color: ['#6366f1', '#8b5cf6', '#06b6d4'][Math.floor(Math.random() * 3)],
      });
    }

    let animId;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x;
          const dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = '#6366f1';
            ctx.globalAlpha = (1 - dist / 100) * 0.1;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
        ctx.globalAlpha = 1;
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Typewriter
  useEffect(() => {
    const current = titles[titleIndex];
    let i = 0;
    setDisplayedTitle('');
    const typeInterval = setInterval(() => {
      if (i < current.length) {
        setDisplayedTitle(current.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typeInterval);
        setTimeout(() => {
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }, 2200);
      }
    }, 60);
    return () => clearInterval(typeInterval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [titleIndex]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Full-screen background photo ── */}
      <div className="absolute inset-0 z-0">
        <picture className="w-full h-full block">
          {/* Portrait photo for mobile — tall image frames the subject better */}
          <source media="(max-width: 767px)" srcSet="/profile-mobile.jpg" />
          {/* Landscape lake photo for desktop */}
          <source media="(min-width: 768px)" srcSet="/profile-bg.jpg" />
          <img
            src="/profile-bg.jpg"
            alt="Yuvraj Kag"
            className="w-full h-full object-cover"
            style={{ objectPosition: 'center top' }}
          />
        </picture>

        {/* ── Desktop gradient: heavy black left → transparent right ── */}
        <div
          className="absolute inset-0 hidden md:block"
          style={{
            background:
              'linear-gradient(100deg, rgba(0,0,0,0.98) 0%, rgba(0,0,0,0.93) 30%, rgba(0,0,0,0.65) 52%, rgba(0,0,0,0.18) 70%, rgba(0,0,0,0.0) 100%)',
          }}
        />

        {/* ── Mobile gradient: fully clear top, heavy dark only at the bottom ~40% ── */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 40%, rgba(0,0,0,0.75) 62%, rgba(0,0,0,0.97) 100%)',
          }}
        />

        {/* Bottom fade to black (both breakpoints) */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 100%)',
          }}
        />
      </div>

      {/* ── Particle canvas (subtle) ── */}
      <canvas ref={canvasRef} className="absolute inset-0 z-[1]" style={{ pointerEvents: 'none', opacity: 0.5 }} />

      {/* ── Grid pattern ── */}
      <div className="absolute inset-0 z-[1] grid-pattern opacity-10 pointer-events-none" />

      {/* ── Content ── */}
      <div className="hero-content-wrapper relative z-10 max-w-6xl mx-auto px-6 sm:px-10 pb-10 md:pb-20 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 mb-6">
            <div className="px-4 py-1.5 rounded-full bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 text-sm font-medium backdrop-blur-sm">
              <span className="mr-2">⚡</span>Available for opportunities
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-black mb-4 leading-tight"
            style={{
              background: 'linear-gradient(135deg, #ffffff 0%, #c4b5fd 50%, #818cf8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Yuvraj Kag
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={itemVariants} className="h-10 mb-6">
            <p className="text-xl sm:text-2xl font-semibold text-violet-300 font-mono">
              {displayedTitle}
              <span className="animate-pulse text-violet-400">|</span>
            </p>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="text-slate-300 text-lg leading-relaxed max-w-lg mb-8"
          >
            {personalInfo.tagline}
          </motion.p>

          {/* Stats row */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-8 mb-10">
            {[
              { label: 'Projects Built', value: '4+' },
              { label: 'AI Models Trained', value: '10+' },
              { label: 'Tech Stack', value: 'Full' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div
                  className="text-2xl font-bold"
                  style={{
                    background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  {stat.value}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <motion.button
              onClick={() => scrollToSection('projects')}
              className="btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              🚀 View Projects
            </motion.button>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary flex items-center gap-2"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Resume
            </motion.a>

            <motion.button
              onClick={() => scrollToSection('contact')}
              className="btn-secondary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Get in Touch →
            </motion.button>
          </motion.div>

          {/* Tech stack pills */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-2 mt-10"
          >
            {['Python', 'LangChain', 'RAG', 'LLMs', 'FastAPI', 'FAISS'].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-semibold rounded-full text-violet-300 backdrop-blur-sm"
                style={{
                  background: 'rgba(99,102,241,0.12)',
                  border: '1px solid rgba(99,102,241,0.25)',
                }}
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          className="w-0.5 h-8 bg-gradient-to-b from-indigo-500 to-transparent"
          animate={{ scaleY: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
