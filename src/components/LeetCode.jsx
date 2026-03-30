import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * Real-time LeetCode Stats Panel
 *
 * Fetch strategy (cascade — first success wins):
 *  1. alfa-leetcode-api.onrender.com  (CORS-enabled, most complete)
 *  2. LeetCode-Stats-API (heroku mirror)
 *  3. Hardcoded fallback (always works)
 */

const USERNAME  = 'yuvrajkag14';
const LC_URL    = 'https://leetcode.com/u/yuvrajkag14/';

// Verified from real profile screenshot — always shown if API down
const FALLBACK = {
  totalSolved : 163,
  easySolved  : 73,  easyTotal  : 935,
  medSolved   : 74,  medTotal   : 2033,
  hardSolved  : 11,  hardTotal  : 919,
  rank        : 947818,
  maxStreak   : 73,
  activeDays  : 89,
  submissions : 274,
  badges      : 1,
  languages   : [
    { lang: 'Python', count: 151 },
    { lang: 'MySQL',  count: 9   },
    { lang: 'Bash',   count: 2   },
  ],
};

// ── Helpers ─────────────────────────────────────────────────────────────────
async function fetchAlfa(username) {
  // Full profile (rank, streak, solved breakdown)
  const [profileRes, solvedRes] = await Promise.all([
    fetch(`https://alfa-leetcode-api.onrender.com/${username}`,        { signal: AbortSignal.timeout(7000) }),
    fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`, { signal: AbortSignal.timeout(7000) }),
  ]);
  if (!profileRes.ok || !solvedRes.ok) throw new Error('alfa failed');
  const profile = await profileRes.json();
  const solved  = await solvedRes.json();

  // alfa returns: totalSolved, easySolved, mediumSolved, hardSolved in /solved
  // profile returns: ranking, totalActiveDays, streak, submissionCalendar...
  return {
    totalSolved : solved.solvedProblem        ?? FALLBACK.totalSolved,
    easySolved  : solved.easySolved           ?? FALLBACK.easySolved,
    medSolved   : solved.mediumSolved         ?? FALLBACK.medSolved,
    hardSolved  : solved.hardSolved           ?? FALLBACK.hardSolved,
    easyTotal   : FALLBACK.easyTotal,
    medTotal    : FALLBACK.medTotal,
    hardTotal   : FALLBACK.hardTotal,
    rank        : profile.ranking             ?? FALLBACK.rank,
    maxStreak   : profile.streak              ?? FALLBACK.maxStreak,
    activeDays  : profile.totalActiveDays     ?? FALLBACK.activeDays,
    submissions : profile.totalSubmissions?.[0]?.count ?? FALLBACK.submissions,
    badges      : FALLBACK.badges,
    languages   : profile.languageProblemCount?.slice(0, 3).map(l => ({
      lang : l.languageName,
      count: l.problemsSolved,
    })) ?? FALLBACK.languages,
  };
}

// ── SVG Donut ────────────────────────────────────────────────────────────────
const DonutRing = ({ easy, med, hard, total, animate }) => {
  const R = 54, C = 2 * Math.PI * R;
  const eLen = total ? Math.max(0, (C * easy / total) - 2) : 0;
  const mLen = total ? Math.max(0, (C * med  / total) - 2) : 0;
  const hLen = total ? Math.max(0, (C * hard / total) - 2) : 0;
  const mOff = -(C * (easy / total + 0.012));
  const hOff = -(C * ((easy + med) / total + 0.024));

  return (
    <div className="relative w-40 h-40 flex-shrink-0">
      <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
        <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10"/>
        {/* Easy */}
        <motion.circle cx="60" cy="60" r={R} fill="none" stroke="#22c55e" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${eLen} ${C}`} strokeDashoffset={0}
          initial={{ strokeDasharray: `0 ${C}` }}
          animate={animate ? { strokeDasharray: `${eLen} ${C}` } : {}}
          transition={{ duration: 1.2, ease:'easeOut', delay: 0.3 }} />
        {/* Medium */}
        <motion.circle cx="60" cy="60" r={R} fill="none" stroke="#f59e0b" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${mLen} ${C}`} strokeDashoffset={mOff}
          initial={{ strokeDasharray: `0 ${C}` }}
          animate={animate ? { strokeDasharray: `${mLen} ${C}` } : {}}
          transition={{ duration: 1.2, ease:'easeOut', delay: 0.6 }} />
        {/* Hard */}
        <motion.circle cx="60" cy="60" r={R} fill="none" stroke="#ef4444" strokeWidth="10" strokeLinecap="round"
          strokeDasharray={`${hLen} ${C}`} strokeDashoffset={hOff}
          initial={{ strokeDasharray: `0 ${C}` }}
          animate={animate ? { strokeDasharray: `${hLen} ${C}` } : {}}
          transition={{ duration: 1.2, ease:'easeOut', delay: 0.9 }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span className="text-3xl font-black text-white"
          initial={{ scale: 0 }} animate={animate ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.2 }}>
          {total}
        </motion.span>
        <span className="text-xs text-slate-500 font-medium">Solved</span>
      </div>
    </div>
  );
};

const DiffBar = ({ label, solved, total, color, delay, animate }) => {
  const pct = total ? Math.round((solved / total) * 100) : 0;
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={animate ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.5, delay }}>
      <div className="flex justify-between mb-1">
        <span className="text-xs font-semibold" style={{ color }}>{label}</span>
        <span className="text-xs text-slate-500 font-mono">{solved}<span className="text-slate-700">/{total}</span></span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ background: color }}
          initial={{ width: 0 }} animate={animate ? { width:`${pct}%` } : {}}
          transition={{ duration: 1, ease:'easeOut', delay: delay + 0.2 }} />
      </div>
    </motion.div>
  );
};

// ── Main ─────────────────────────────────────────────────────────────────────
const LeetCode = () => {
  const [stats,  setStats]  = useState(FALLBACK);
  const [status, setStatus] = useState('loading'); // loading | live | fallback
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const data = await fetchAlfa(USERNAME);
        if (!cancelled) { setStats(data); setStatus('live'); }
      } catch {
        if (!cancelled) setStatus('fallback');
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const langMax = Math.max(...stats.languages.map(l => l.count), 1);

  return (
    <section id="leetcode" className="section-padding relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-yellow-900/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-64 h-64 bg-orange-900/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div ref={ref}
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }} className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium">
            ⚡ Problem Solving
          </div>
          <h2 className="section-title mb-4">
            LeetCode <span className="gradient-text">Stats</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Real-time stats from my LeetCode profile — consistently sharpening algorithmic thinking.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="glass-card p-6 sm:p-8 max-w-4xl mx-auto">

          {/* Header row */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-black text-white flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #ffa116, #ff6b35)' }}>
                LC
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg font-bold text-white">@{USERNAME}</span>
                  {status === 'loading' && (
                    <span className="flex items-center gap-1 text-xs text-yellow-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse inline-block" />
                      Fetching live…
                    </span>
                  )}
                  {status === 'live' && (
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                      Live
                    </span>
                  )}
                  {status === 'fallback' && (
                    <span className="text-xs text-slate-600">· cached</span>
                  )}
                </div>
                <span className="text-xs text-slate-500">LeetCode · India</span>
              </div>
            </div>

            <div className="flex gap-6 text-center">
              {[
                { v: `#${stats.rank.toLocaleString()}`, l: 'Global Rank' },
                { v: stats.badges,                       l: 'Badge'       },
                { v: stats.submissions,                  l: 'Submissions/yr' },
              ].map(s => (
                <div key={s.l}>
                  <div className="text-xl font-black text-white">{s.v}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Donut + bars */}
          <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
            <DonutRing easy={stats.easySolved} med={stats.medSolved} hard={stats.hardSolved}
              total={stats.totalSolved} animate={inView} />
            <div className="flex-1 w-full space-y-4">
              <DiffBar label="Easy"   solved={stats.easySolved} total={stats.easyTotal} color="#22c55e" delay={0.3} animate={inView} />
              <DiffBar label="Medium" solved={stats.medSolved}  total={stats.medTotal}  color="#f59e0b" delay={0.5} animate={inView} />
              <DiffBar label="Hard"   solved={stats.hardSolved} total={stats.hardTotal} color="#ef4444" delay={0.7} animate={inView} />
            </div>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { icon:'📅', v: stats.activeDays,    l:'Active Days'    },
              { icon:'🔥', v:`${stats.maxStreak}d`, l:'Max Streak'    },
              { icon:'✅', v: stats.totalSolved,   l:'Problems Solved' },
              { icon:'🏅', v:'2025',               l:'50-Day Badge'   },
            ].map((s,i) => (
              <motion.div key={s.l}
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                className="rounded-xl p-4 text-center"
                style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xl font-black text-white">{s.v}</div>
                <div className="text-xs text-slate-600 mt-0.5">{s.l}</div>
              </motion.div>
            ))}
          </div>

          {/* Language breakdown */}
          <div className="mb-6">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-widest mb-3">Languages Used</p>
            <div className="space-y-2.5">
              {stats.languages.map((l, i) => (
                <motion.div key={l.lang} className="flex items-center gap-3"
                  initial={{ opacity:0, x:-20 }} animate={inView ? { opacity:1, x:0 } : {}}
                  transition={{ duration:0.5, delay: 0.6 + i * 0.1 }}>
                  <span className="text-sm text-slate-300 w-16 font-medium">{l.lang}</span>
                  <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                    <motion.div className="h-full rounded-full"
                      style={{ background:'linear-gradient(90deg, #6366f1, #8b5cf6)' }}
                      initial={{ width:0 }}
                      animate={inView ? { width:`${(l.count / langMax)*100}%` } : {}}
                      transition={{ duration:1, ease:'easeOut', delay: 0.7 + i*0.1 }} />
                  </div>
                  <span className="text-xs text-slate-500 font-mono w-10 text-right">{l.count}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <motion.a href={LC_URL} target="_blank" rel="noopener noreferrer"
            initial={{ opacity:0 }} animate={inView ? { opacity:1 } : {}} transition={{ delay:1 }}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white transition-all"
            style={{ background:'linear-gradient(135deg,rgba(255,161,22,0.15),rgba(255,107,53,0.15))', border:'1px solid rgba(255,161,22,0.25)' }}
            whileHover={{ background:'linear-gradient(135deg,rgba(255,161,22,0.25),rgba(255,107,53,0.25))', borderColor:'rgba(255,161,22,0.5)' }}>
            <span className="font-black text-lg" style={{ color:'#ffa116' }}>LC</span>
            View Full Profile on LeetCode →
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default LeetCode;
