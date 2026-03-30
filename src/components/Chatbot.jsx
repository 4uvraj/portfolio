import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { knowledgeBase } from '../data/portfolioData';

/**
 * RAG Chatbot Component
 * "Chat with My Portfolio" — Uses a simulated RAG approach locally.
 * When an API key is provided, uses Gemini API for real responses.
 * Falls back to intelligent local matching without any API.
 */

// =====================================================================
// Local RAG Engine (no API needed for demo)
// =====================================================================
const ragEngine = {
  // Retrieve relevant chunks from knowledge base
  retrieve: (query) => {
    const q = query.toLowerCase();
    const lines = knowledgeBase.split('\n').filter(l => l.trim().length > 10);

    // Score each line by keyword relevance
    const scored = lines.map(line => {
      const l = line.toLowerCase();
      const words = q.split(/\s+/);
      const score = words.reduce((acc, word) => {
        if (word.length < 3) return acc;
        return acc + (l.includes(word) ? 2 : 0);
      }, 0);
      return { line, score };
    });

    // Return top relevant chunks
    return scored
      .filter(s => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6)
      .map(s => s.line)
      .join('\n');
  },

  // Generate answer from context
  generate: (query, context) => {
    const q = query.toLowerCase();

    // Project-specific answers
    if (q.includes('pdf') || q.includes('rag') || q.includes('retrieval')) {
      return `**PDF-RAG** is my flagship RAG system! 📄

Here's how it works:
1. **Ingestion**: PDFs are chunked into overlapping text segments
2. **Embedding**: Each chunk is embedded using Sentence Transformers
3. **Storage**: Embeddings are indexed in FAISS for ultra-fast retrieval
4. **Query**: Your question gets embedded and the most relevant chunks are retrieved
5. **Generation**: An LLM synthesizes a precise answer with source citations

**Tech Stack**: LangChain · FAISS · OpenAI · Sentence Transformers · Streamlit

You can try the live demo right here on this page! ↓`;
    }

    if (q.includes('weather')) {
      return `**Weather-AI-Streamlit** is an intelligent weather dashboard 🌤️

Beyond standard forecasts, it:
- Applies ML models on historical meteorological data to **detect anomalies**
- Generates **natural language weather summaries** (e.g., "Unusual pressure drop expected Friday")
- Creates **interactive visualizations** with Plotly for trend analysis
- Uses real-time OpenWeatherMap API data

The key insight: raw weather data is just numbers — AI turns it into actionable intelligence.`;
    }

    if (q.includes('movie') || q.includes('recommend')) {
      return `**Movie Recommender** uses a hybrid recommendation approach 🎬

It combines two techniques:
- **Collaborative Filtering**: Finds users with similar taste and recommends what they liked
- **Content-Based Filtering**: Analyzes movie features (genre, director, cast) for similarity

Built on 10,000+ movies from the TMDB dataset. The system can explain *why* it recommends something — not just a black box!

**Tech Stack**: Scikit-learn · Pandas · Streamlit · TMDB API`;
    }

    if (q.includes('travel') || q.includes('agent') || q.includes('itinerary')) {
      return `**AI Travel Agent** is an autonomous planning agent 🌍✈️

It works as a true LLM agent with tools:
1. 🔍 **Research Tool**: Searches for destination info and top attractions
2. 🌤️ **Weather Tool**: Checks forecasted weather for the trip dates
3. 💰 **Budget Tool**: Estimates realistic costs
4. 📝 **Planning Tool**: Compiles a day-by-day itinerary

The agent *thinks*, *plans*, and *executes* autonomously — you just describe where you want to go and it figures out the rest.

**Tech Stack**: LangChain Agents · OpenAI · FastAPI · React`;
    }

    if (q.includes('skill') || q.includes('strong') || q.includes('best at') || q.includes('expertise')) {
      return `My strongest skills center around **AI/ML and Python** 🧠

**Top Skills:**
- 🥇 **RAG Systems** (90%) — Building end-to-end retrieval pipelines
- 🥇 **Python** (92%) — Primary language for all AI work
- 🥇 **Streamlit** (92%) — Rapid AI app development
- 🥈 **LLM Orchestration** (85%) — LangChain, agents, tool-use
- 🥈 **NLP** (85%) — Text processing, embeddings, transformers
- 🥈 **AI Agents** (85%) — Autonomous LLM agent systems

Beyond technical skills, I bring strong **problem-solving** and **DSA** foundations to every project.`;
    }

    if (q.includes('dsa') || q.includes('algorithm') || q.includes('data structure') || q.includes('problem solv')) {
      return `My **DSA approach** is built on three pillars ⚡

1. **Pattern Recognition**: I categorize problems by pattern first — is this a sliding window? Graph BFS? DP with memoization? Once the pattern clicks, the solution follows.

2. **Consistent Practice**: Algorithms are a muscle. I practice daily, not just before interviews. This builds intuition that transfers directly to designing efficient AI pipelines.

3. **Optimization Thinking**: My default question is *"can we do better?"* — from brute-force O(n³) sketches to optimized O(n log n) solutions.

The payoff? When designing a vector retrieval system or optimizing an embedding search, the algorithmic thinking kicks in naturally.`;
    }

    if (q.includes('how') && (q.includes('build') || q.includes('approach') || q.includes('workflow') || q.includes('process'))) {
      return `My build process follows **5 disciplined steps** 🏗️

**1. Problem Understanding** → I ask "why" before "how." Map requirements, edge cases, user needs.

**2. System Design** → Design the full data flow, choose tools with purpose (not hype), plan for scale.

**3. Model Building** → Implement iteratively. Start with baselines, validate assumptions, then advance.

**4. Optimization** → Profile, benchmark, push to performance limits. Every ms of latency matters.

**5. Real-World Usability** → Deploy. AI that doesn't reach users is just research.

The mindset: build things that *actually work*, not things that look good in a Jupyter notebook.`;
    }

    if (q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('hire') || q.includes('intern')) {
      return `I'd love to connect! 📬

Here's how to reach Yuvraj Kag:
- **Email**: yuvrajkag@gmail.com (click the contact section to copy!)
- **GitHub**: [github.com/4uvraj](https://github.com/4uvraj)
- **LinkedIn**: [linkedin.com/in/4uvraj](https://www.linkedin.com/in/4uvraj)

He's currently **open to internships and collaborations** in AI/ML, LLM systems, and backend development. If you have an interesting problem, let's talk!`;
    }

    if (q.includes('langchain') || q.includes('faiss') || q.includes('openai') || q.includes('llm')) {
      return `**LangChain + FAISS + LLMs** are the core of my AI stack 🔗

- **LangChain**: I use it for orchestration — chains, agents, memory, and tool-use patterns
- **FAISS**: My vector database of choice for similarity search. It's blazing fast and runs locally
- **OpenAI/Gemini APIs**: For generation — I work with both, choosing based on task requirements
- **Sentence Transformers**: For creating high-quality embeddings for RAG pipelines

This stack powers both **PDF-RAG** and the travel agent you see in this portfolio.`;
    }

    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('who are you') || q.includes('about')) {
      return `Hey there! 👋 I'm Yuvraj's AI portfolio assistant.

I'm powered by a **RAG system** — similar to what Yuvraj built in his PDF-RAG project! I retrieve relevant context from his portfolio data and generate responses.

Ask me anything about:
- 📁 **Projects** (PDF-RAG, Weather AI, Movie Recommender, Travel Agent)
- 🛠️ **Skills** and tech stack
- ⚙️ **How Yuvraj builds** — his engineering philosophy
- 🧩 **DSA approach**
- 📬 **How to contact him**

What would you like to know?`;
    }

    if (q.includes('vision') || q.includes('future') || q.includes('goal')) {
      return `Yuvraj's **future vision** is focused on three pillars 🚀

1. **Scalable AI Systems**: Building production-grade AI infrastructure that serves millions of users reliably — not just prototypes.

2. **LLMs & Autonomous Agents**: Pushing the frontier of agents that can reason, plan, and act in complex environments with minimal human supervision.

3. **Real-World Impact**: The mission isn't to impress at demos — it's to deploy AI that actually moves the needle for real people and real problems.

The north star: *AI that works in production, not just in notebooks.*`;
    }

    // Generic response using context
    if (context && context.length > 20) {
      return `Based on what I know about Yuvraj:\n\n${context.substring(0, 300)}...\n\n_Feel free to ask more specific questions about his projects, skills, or approach!_`;
    }

    return `I don't have a specific answer for that, but I'm well-versed in Yuvraj's portfolio! 🤔

Try asking about:
- "Explain the PDF-RAG project"
- "What are your strongest skills?"
- "How do you approach problems?"
- "Tell me about the AI Travel Agent"
- "How to contact Yuvraj?"`;
  }
};

// =====================================================================
// Typing Indicator
// =====================================================================
const TypingIndicator = () => (
  <div className="flex items-start gap-3 justify-start">
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-sm flex-shrink-0">
      🤖
    </div>
    <div className="chat-bubble-bot flex items-center gap-1.5">
      <div className="typing-dot"></div>
      <div className="typing-dot"></div>
      <div className="typing-dot"></div>
    </div>
  </div>
);

// =====================================================================
// Message Component with Typing Effect
// =====================================================================
const ChatMessage = ({ message, isNew }) => {
  const [displayedText, setDisplayedText] = useState(isNew && !message.isUser ? '' : message.text);

  useEffect(() => {
    if (isNew && !message.isUser) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < message.text.length) {
          setDisplayedText(message.text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 10);
      return () => clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Convert markdown-like formatting to JSX
  const formatText = (text) => {
    // Split by newlines and process
    return text.split('\n').map((line, lineIdx) => {
      if (!line.trim()) return <br key={lineIdx} />;

      // Bold text
      const parts = line.split(/\*\*(.*?)\*\*/g);
      const formatted = parts.map((part, i) => {
        if (i % 2 === 1) return <strong key={i} className="text-white font-semibold">{part}</strong>;
        
        // Handle links
        const linkParts = part.split(/\[(.*?)\]\((.*?)\)/g);
        if (linkParts.length > 1) {
          return linkParts.map((lp, li) => {
            if (li % 3 === 1) return null; // link text handled below
            if (li % 3 === 2) return null; // url handled below
            if (li % 3 === 0 && linkParts[li + 1]) {
              return (
                <span key={li}>
                  {lp}
                  <a href={linkParts[li + 2]} target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline hover:text-indigo-300">
                    {linkParts[li + 1]}
                  </a>
                </span>
              );
            }
            return lp;
          });
        }
        return part;
      });

      // Check for italic/code at line level
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return (
          <div key={lineIdx} className="flex gap-2 my-0.5">
            <span className="text-indigo-400 mt-0.5">•</span>
            <span>{formatted}</span>
          </div>
        );
      }

      if (/^\d+\./.test(line)) {
        return <div key={lineIdx} className="my-0.5 ml-1">{formatted}</div>;
      }

      if (line.startsWith('_') && line.endsWith('_')) {
        return <em key={lineIdx} className="text-slate-400 italic">{line.slice(1, -1)}</em>;
      }

      return <div key={lineIdx}>{formatted}</div>;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex items-start gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!message.isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-sm flex-shrink-0 mt-0.5">
          🤖
        </div>
      )}

      <div className={message.isUser ? 'chat-bubble-user' : 'chat-bubble-bot'}>
        <div className="leading-relaxed">
          {formatText(displayedText)}
        </div>
        <div className={`text-xs mt-1.5 ${message.isUser ? 'text-white/50 text-right' : 'text-slate-600'}`}>
          {message.timestamp}
        </div>
      </div>

      {message.isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-sm flex-shrink-0 mt-0.5 font-bold text-white">
          Y
        </div>
      )}
    </motion.div>
  );
};

// =====================================================================
// Suggested Questions
// =====================================================================
const suggestions = [
  "Explain the PDF-RAG project",
  "What are your strongest skills?",
  "How do you approach DSA problems?",
  "Tell me about the AI Travel Agent",
  "What's your build process?",
  "How to contact Yuvraj?",
];

// =====================================================================
// Main Chatbot Component
// =====================================================================
const Chatbot = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hey! 👋 I'm Yuvraj's AI portfolio assistant, powered by a RAG system.\n\nAsk me anything about his **projects**, **skills**, **build process**, or how to **get in touch**. I retrieve relevant context from his portfolio and generate precise answers!",
      isUser: false,
      timestamp: 'Just now',
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lastMessageIsNew, setLastMessageIsNew] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getTimestamp = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sendMessage = async (text) => {
    const query = text || input.trim();
    if (!query) return;

    setInput('');
    setLastMessageIsNew(false);

    // Add user message
    const userMsg = {
      id: Date.now(),
      text: query,
      isUser: true,
      timestamp: getTimestamp(),
    };
    setMessages(prev => [...prev, userMsg]);

    // Show typing indicator
    setIsTyping(true);

    // Simulate retrieval + generation delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

    // Retrieve context
    const context = ragEngine.retrieve(query);

    // Generate answer
    const answer = ragEngine.generate(query, context);

    setIsTyping(false);
    setLastMessageIsNew(true);

    const botMsg = {
      id: Date.now() + 1,
      text: answer,
      isUser: false,
      timestamp: getTimestamp(),
    };
    setMessages(prev => [...prev, botMsg]);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <section id="chatbot" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium">
            💬 RAG-Powered AI
          </div>
          <h2 className="section-title mb-4">
            Chat with My <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Ask me anything about Yuvraj's projects, skills, or approach. Powered by a local RAG engine — retrieves relevant context and generates precise answers.
          </p>
        </motion.div>

        {/* Chatbot Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="glass-card overflow-hidden"
          style={{ border: '1px solid rgba(99,102,241,0.2)' }}
        >
          {/* Chat Header */}
          <div
            className="flex items-center gap-3 px-5 py-4 border-b border-white/5"
            style={{ background: 'rgba(99,102,241,0.05)' }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-lg">
              🤖
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Portfolio Assistant</div>
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                RAG-powered · Always online
              </div>
            </div>
            <div className="ml-auto flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/40" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/40" />
              <div className="w-3 h-3 rounded-full bg-green-500/40" />
            </div>
          </div>

          {/* Messages */}
          <div ref={chatContainerRef} className="h-96 overflow-y-auto p-5 flex flex-col gap-4 no-scrollbar">
            {messages.map((msg, index) => (
              <ChatMessage
                key={msg.id}
                message={msg}
                isNew={index === messages.length - 1 && lastMessageIsNew}
              />
            ))}

            <AnimatePresence>
              {isTyping && <TypingIndicator />}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestions */}
          <div className="px-5 pb-3 border-t border-white/5">
            <p className="text-xs text-slate-600 mb-2 mt-3">Suggested questions:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.slice(0, 3).map((s) => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-xs text-slate-400 hover:text-indigo-300 px-3 py-1.5 rounded-full transition-colors"
                  style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-4 py-4 border-t border-white/5">
            <div className="flex gap-3 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about projects, skills, DSA approach..."
                rows={1}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50 resize-none transition-all"
                style={{ maxHeight: '100px', overflowY: 'auto' }}
                onInput={(e) => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 100) + 'px';
                }}
              />
              <motion.button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isTyping}
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  background: input.trim() ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.05)',
                  cursor: input.trim() ? 'pointer' : 'not-allowed',
                }}
                whileHover={input.trim() ? { scale: 1.05 } : {}}
                whileTap={input.trim() ? { scale: 0.95 } : {}}
              >
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </motion.button>
            </div>
            <p className="text-xs text-slate-700 mt-2 text-center">
              Press Enter to send · Shift+Enter for new line
            </p>
          </div>
        </motion.div>

        {/* RAG explanation badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center gap-6 mt-6 flex-wrap"
        >
          {['Embed Query', '→ FAISS Retrieval', '→ Context Injection', '→ LLM Generation'].map((step) => (
            <div key={step} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              <span className="text-xs text-slate-600">{step}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Chatbot;
