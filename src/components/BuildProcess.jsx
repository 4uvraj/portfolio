import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { buildProcess, dsaMindset } from '../data/portfolioData';

/**
 * Build Process Section
 * Shows how Yuvraj approaches building AI systems — step by step workflow
 */

const ProcessStep = ({ step, index, total }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative flex flex-col items-center text-center group"
    >
      {/* Step connector line (not for last item) */}
      {index < total - 1 && (
        <div
          className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5"
          style={{
            background: 'linear-gradient(90deg, rgba(99,102,241,0.4), rgba(139,92,246,0.2))',
            zIndex: 0,
          }}
        />
      )}

      {/* Icon bubble */}
      <motion.div
        className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-3xl mb-4 shadow-lg`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
      >
        {step.icon}
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.color} opacity-50 blur-lg -z-10`} />
      </motion.div>

      {/* Step number */}
      <div className="text-xs font-mono text-slate-500 mb-1">{step.step}</div>

      {/* Title */}
      <h3 className="text-base font-bold text-white mb-2 group-hover:gradient-text transition-all">
        {step.title}
      </h3>

      {/* Description */}
      <p className="text-slate-500 text-sm leading-relaxed max-w-[180px]">
        {step.description}
      </p>
    </motion.div>
  );
};

const DSACard = ({ item, index }) => {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="glass-card p-6 text-center hover:border-indigo-500/30"
    >
      <div className="text-4xl mb-4">{item.icon}</div>
      <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
    </motion.div>
  );
};

const BuildProcess = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [dsaRef, dsaInView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <>
      {/* How I Build Section */}
      <section id="process" className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-900/10 rounded-full filter blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium">
              ⚙️ My Workflow
            </div>
            <h2 className="section-title mb-4">
              How I <span className="gradient-text">Build</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Every project follows a disciplined process — from understanding the problem to shipping something that actually works in the real world.
            </p>
          </motion.div>

          {/* Steps — Desktop: horizontal row, Mobile: vertical */}
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative">
            {buildProcess.map((step, index) => (
              <ProcessStep key={step.step} step={step} index={index} total={buildProcess.length} />
            ))}
          </div>
        </div>
      </section>

      {/* DSA Mindset Section */}
      <section id="dsa" className="section-padding relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            ref={dsaRef}
            initial={{ opacity: 0, y: 30 }}
            animate={dsaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium">
              ⚡ DSA Philosophy
            </div>
            <h2 className="section-title mb-4">
              The <span className="gradient-text">DSA Mindset</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Strong algorithmic thinking is the foundation under every AI system I build. It's not just about passing interviews — it's about thinking clearly.
            </p>
          </motion.div>

          {/* DSA Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dsaMindset.map((item, index) => (
              <DSACard key={item.title} item={item} index={index} />
            ))}
          </div>

          {/* Quote / highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={dsaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="mt-16 glass-card p-8 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-indigo-900/10" />
            <div className="relative">
              <div className="text-5xl mb-4">"</div>
              <p className="text-slate-300 text-xl font-medium leading-relaxed max-w-3xl mx-auto italic">
                Every complex AI problem is just a well-composed set of simpler algorithmic problems. Master the fundamentals, and the rest follows naturally.
              </p>
              <div className="mt-4 text-slate-500 text-sm">— Yuvraj's approach to problem-solving</div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default BuildProcess;
