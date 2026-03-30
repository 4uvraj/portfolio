import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { skills } from '../data/portfolioData';

/**
 * Skills Section — Click a category to reveal skill chips with icons.
 * No progress bars or percentages — clean tag-grid layout.
 */

// Emoji/icon map for each skill name
const skillIcons = {
  // AI/ML
  'Machine Learning':       '🤖',
  'Deep Learning':          '🧠',
  'Natural Language Processing': '💬',
  'RAG Systems':            '📚',
  'LLM Orchestration':      '🔗',
  'Computer Vision':        '👁️',
  'AI Agents':              '🕵️',
  // Programming
  'Python':                 '🐍',
  'JavaScript':             '⚡',
  'React.js':               '⚛️',
  'SQL':                    '🗄️',
  'Bash/Shell':             '🖥️',
  // Tools & Frameworks
  'LangChain':              '🔗',
  'Streamlit':              '🌊',
  'FastAPI':                '🚀',
  'FAISS':                  '🔍',
  'Scikit-learn':           '📊',
  'Git & GitHub':           '🐙',
  'Docker':                 '🐳',
  // Core Concepts
  'Data Structures':        '🏗️',
  'Algorithms':             '⚙️',
  'System Design':          '📐',
  'Problem Solving':        '🧩',
  'Math for ML':            '📐',
};

const chipVariants = {
  hidden: { opacity: 0, scale: 0.75, y: 10 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.35, delay: i * 0.06, ease: 'easeOut' },
  }),
  exit: { opacity: 0, scale: 0.75, y: -8, transition: { duration: 0.2 } },
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const categoryKeys = Object.keys(skills);

  const allBadges = [
    'Python', 'LangChain', 'FAISS', 'RAG', 'LLMs', 'NLP',
    'Scikit-learn', 'Streamlit', 'FastAPI', 'React', 'TensorFlow',
    'PyTorch', 'Transformers', 'Git', 'Docker', 'NumPy', 'Pandas',
    'Matplotlib', 'OpenAI', 'Gemini', 'Algorithms', 'DSA',
  ];

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Decorative orbs */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-indigo-900/15 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-purple-900/15 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
            🛠️ Technical Arsenal
          </div>
          <h2 className="section-title mb-4">
            Skills &amp; <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            A carefully curated stack focused on AI, machine learning, and building production-ready intelligent systems.
          </p>
        </motion.div>

        {/* Skill Badges Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-wrap gap-2 justify-center mb-16"
        >
          {allBadges.map((badge, index) => (
            <motion.span
              key={badge}
              className="skill-badge"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.03 }}
              whileHover={{ scale: 1.1, y: -2 }}
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>

        {/* Category Buttons + Skill Chip Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — category buttons */}
          <div className="flex flex-row lg:flex-col gap-3 overflow-x-auto pb-2 lg:pb-0">
            {categoryKeys.map((key, index) => {
              const cat = skills[key];
              const isActive = activeCategory === key;
              return (
                <motion.button
                  key={key}
                  onClick={() => setActiveCategory(isActive ? null : key)}
                  className={`flex-shrink-0 flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-300 text-left ${
                    isActive
                      ? 'bg-indigo-600/25 border border-indigo-500/50 text-indigo-200 shadow-lg shadow-indigo-500/10'
                      : 'text-slate-400 border border-white/6 hover:text-slate-200 hover:bg-white/5 hover:border-white/12'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: isActive ? 0 : 4 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <div className="font-bold text-sm">{cat.label}</div>
                    <div className="text-xs text-slate-600 mt-0.5">{cat.items.length} skills</div>
                  </div>
                  {/* Arrow indicator */}
                  <motion.span
                    className="ml-auto text-indigo-400 text-lg"
                    animate={{ rotate: isActive ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              );
            })}

            {/* Hint when nothing selected */}
            <AnimatePresence>
              {activeCategory === null && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="hidden lg:block text-xs text-slate-600 mt-4 text-center"
                >
                  ↑ Tap a category
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Right — skill chips panel */}
          <div className="lg:col-span-2 min-h-[200px]">
            <AnimatePresence mode="wait">
              {activeCategory ? (
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  className="glass-card p-6 h-full"
                >
                  {/* Panel header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${skills[activeCategory].color} flex items-center justify-center text-2xl shadow-lg`}
                    >
                      {skills[activeCategory].icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-lg leading-tight">{skills[activeCategory].label}</h3>
                      <p className="text-xs text-slate-500">{skills[activeCategory].items.length} technologies</p>
                    </div>
                  </div>

                  {/* Skill chips grid */}
                  <div className="flex flex-wrap gap-3">
                    {skills[activeCategory].items.map((skill, i) => (
                      <motion.div
                        key={skill.name}
                        custom={i}
                        variants={chipVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm text-white cursor-default select-none"
                        style={{
                          background: 'rgba(99,102,241,0.12)',
                          border: '1px solid rgba(99,102,241,0.25)',
                        }}
                        whileHover={{
                          scale: 1.06,
                          background: 'rgba(99,102,241,0.22)',
                          borderColor: 'rgba(99,102,241,0.5)',
                          transition: { duration: 0.15 },
                        }}
                      >
                        <span className="text-lg">{skillIcons[skill.name] || '✦'}</span>
                        <span>{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center gap-3 text-slate-600 glass-card p-6 min-h-[220px]"
                >
                  <span className="text-5xl">👆</span>
                  <p className="text-sm font-medium">Select a category to explore skills</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
