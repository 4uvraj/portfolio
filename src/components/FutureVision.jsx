import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { futureVision } from '../data/portfolioData';

/**
 * Future Vision Section
 * Animated cards outlining Yuvraj's goals and direction
 */

const FutureVision = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="vision" className="section-padding relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.05) 0%, transparent 70%)',
      }} />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium">
            🚀 What's Next
          </div>
          <h2 className="section-title mb-4">
            Future <span className="gradient-text">Vision</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Not just a developer — a builder with a mission. Here's where I'm heading.
          </p>
        </motion.div>

        {/* Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {futureVision.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="relative overflow-hidden rounded-2xl group"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              {/* Gradient background overlay that reveals on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              {/* Top accent bar */}
              <div className={`h-1 bg-gradient-to-r ${item.gradient}`} />

              <div className="p-8">
                {/* Icon */}
                <motion.div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-2xl mb-6 shadow-lg`}
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {item.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Bottom corner decoration */}
              <div
                className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl ${item.gradient} opacity-5 rounded-tl-full`}
              />
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.7 }}
          className="relative overflow-hidden rounded-2xl p-8 md:p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(139,92,246,0.05), rgba(6,182,212,0.1))',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          {/* Decorative elements */}
          <div className="absolute top-4 left-4 w-20 h-20 bg-indigo-500/10 rounded-full filter blur-xl" />
          <div className="absolute bottom-4 right-4 w-20 h-20 bg-purple-500/10 rounded-full filter blur-xl" />

          <div className="relative">
            <div className="text-6xl mb-4">🎯</div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              The <span className="gradient-text">Mission</span>
            </h3>
            <p className="text-slate-300 text-lg leading-relaxed max-w-3xl mx-auto">
              To build AI systems that don't just impress in demos — they <strong className="text-white">actually work</strong> in the real world, at scale, for real people solving real problems.
            </p>

            {/* Metrics */}
            <div className="flex flex-wrap gap-8 justify-center mt-8">
              {[
                { value: '∞', label: 'Problems to Solve' },
                { value: '100%', label: 'Real-World Focus' },
                { value: '0', label: 'Limits' },
              ].map((metric) => (
                <div key={metric.label} className="text-center">
                  <div className="text-3xl font-black gradient-text">{metric.value}</div>
                  <div className="text-xs text-slate-500 mt-1">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FutureVision;
