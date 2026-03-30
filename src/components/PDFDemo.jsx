import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

/**
 * PDF RAG Demo Component
 * Live, interactive demo showing the RAG pipeline in action.
 * Simulates document processing and Q&A — works without any API.
 * Users can upload a "PDF" (we simulate parsing) and ask questions.
 */

// Simulated PDF content for demo purposes
const DEMO_PDF_CONTENT = `
ARTIFICIAL INTELLIGENCE: FUNDAMENTALS AND APPLICATIONS

Chapter 1: Introduction to Machine Learning
Machine learning is a subset of artificial intelligence that enables systems to learn from experience. 
Key types include supervised learning (classification, regression), unsupervised learning (clustering, dimensionality reduction), 
and reinforcement learning (reward-based optimization).

Chapter 2: Neural Networks and Deep Learning
Neural networks consist of interconnected layers of neurons. Deep learning uses multiple hidden layers 
to learn hierarchical representations. Convolutional Neural Networks (CNNs) excel at image tasks, 
while Recurrent Neural Networks (RNNs) handle sequential data. Transformers have revolutionized NLP.

Chapter 3: Natural Language Processing
NLP involves processing and understanding human language. Key tasks: sentiment analysis, 
named entity recognition, machine translation, question answering. Large Language Models (LLMs) 
like GPT-4 and Gemini have achieved remarkable performance across NLP benchmarks.

Chapter 4: Retrieval-Augmented Generation (RAG)
RAG combines retrieval systems with generative models. Documents are chunked, embedded, and stored 
in vector databases. At query time, relevant chunks are retrieved and given to the LLM as context, 
dramatically improving factual accuracy and reducing hallucinations.

Chapter 5: AI Ethics and Safety
Responsible AI requires fairness, transparency, and accountability. Key concerns: bias in training data, 
model interpretability, privacy preservation, and alignment with human values. 
Techniques like constitutional AI and RLHF help align models with intended behavior.
`;

// Simple local RAG for the demo
const localRAG = {
  chunks: [],
  
  processDocument: (content) => {
    const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 20);
    const chunkSize = 3;
    const chunks = [];
    for (let i = 0; i < sentences.length; i += chunkSize) {
      const chunk = sentences.slice(i, i + chunkSize).join('. ').trim();
      if (chunk.length > 30) chunks.push(chunk);
    }
    return chunks;
  },

  retrieve: (query, chunks) => {
    const q = query.toLowerCase();
    const words = q.split(/\s+/).filter(w => w.length > 3);
    
    return chunks
      .map(chunk => ({
        chunk,
        score: words.reduce((acc, word) => acc + (chunk.toLowerCase().includes(word) ? 1 : 0), 0)
      }))
      .filter(c => c.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(c => c.chunk);
  },

  answer: (query, contexts) => {
    if (contexts.length === 0) {
      return "I couldn't find relevant information about that in the document. Try asking about machine learning, neural networks, NLP, RAG, or AI ethics.";
    }

    const q = query.toLowerCase();
    const context = contexts.join(' ');

    if (q.includes('rag') || q.includes('retrieval')) {
      return `Based on the document:\n\n**RAG (Retrieval-Augmented Generation)** combines retrieval systems with generative models. The process:\n\n1. Documents are **chunked** into smaller segments\n2. Chunks are **embedded** into vector representations\n3. Stored in **vector databases** for fast search\n4. At query time, **relevant chunks are retrieved** and given to the LLM as context\n\nThis dramatically improves factual accuracy and **reduces hallucinations**.\n\n_Source: Chapter 4 of the document_`;
    }

    if (q.includes('neural') || q.includes('deep learning') || q.includes('cnn') || q.includes('transformer')) {
      return `From the document on **Neural Networks**:\n\nNeural networks use interconnected layers of neurons. Deep learning leverages multiple hidden layers to learn hierarchical representations:\n\n- **CNNs** → Excel at image recognition tasks\n- **RNNs** → Handle sequential/time-series data\n- **Transformers** → Revolutionized NLP (GPT, BERT, etc.)\n\n_Source: Chapter 2 of the document_`;
    }

    if (q.includes('nlp') || q.includes('language') || q.includes('gpt') || q.includes('llm')) {
      return `The document describes **NLP** as follows:\n\nNatural Language Processing handles processing and understanding human language. Key tasks include:\n- Sentiment analysis\n- Named entity recognition\n- Machine translation\n- Question answering\n\n**LLMs** like GPT-4 and Gemini have achieved remarkable performance across benchmarks.\n\n_Source: Chapter 3 of the document_`;
    }

    if (q.includes('ethic') || q.includes('safe') || q.includes('bias') || q.includes('fair')) {
      return `On **AI Ethics and Safety** from the document:\n\nResponsible AI requires **fairness, transparency, and accountability**. Key concerns:\n\n- Bias in training data\n- Model interpretability\n- Privacy preservation\n- Alignment with human values\n\nTechniques like **Constitutional AI** and **RLHF** help align models with intended behavior.\n\n_Source: Chapter 5 of the document_`;
    }

    if (q.includes('machine learning') || q.includes('supervised') || q.includes('unsupervised')) {
      return `From **Chapter 1** of the document:\n\nMachine learning enables systems to **learn from experience**. Key types:\n\n- **Supervised Learning**: Classification, regression (labeled data)\n- **Unsupervised Learning**: Clustering, dimensionality reduction (unlabeled)\n- **Reinforcement Learning**: Reward-based optimization (agent + environment)\n\n_Source: Chapter 1 of the document_`;
    }

    // Generic answer from context
    return `Based on the document:\n\n${contexts[0].slice(0, 250)}...\n\n_Retrieved from ${contexts.length} relevant chunk(s) in your document_`;
  }
};

const PDFDemo = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [step, setStep] = useState('upload'); // upload | processing | ready
  const [fileName, setFileName] = useState('');
  const [chunks, setChunks] = useState([]);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setStep('processing');
    setProcessingStep(0);

    const steps = [
      'Reading document...',
      'Chunking text...',
      'Generating embeddings...',
      'Indexing in FAISS...',
      'Ready!',
    ];

    for (let i = 0; i < steps.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setProcessingStep(i);
    }

    // Simulate using our demo content
    const processedChunks = localRAG.processDocument(DEMO_PDF_CONTENT);
    setChunks(processedChunks);
    setStep('ready');
  };

  const handleUseDemoDoc = async () => {
    setFileName('AI_Fundamentals.pdf');
    setStep('processing');
    setProcessingStep(0);

    for (let i = 0; i < 5; i++) {
      await new Promise(r => setTimeout(r, 500));
      setProcessingStep(i);
    }

    const processedChunks = localRAG.processDocument(DEMO_PDF_CONTENT);
    setChunks(processedChunks);
    setStep('ready');
  };

  const handleAsk = async () => {
    if (!question.trim()) return;

    setIsAnswering(true);
    setAnswer('');

    await new Promise(r => setTimeout(r, 1000 + Math.random() * 500));

    const contexts = localRAG.retrieve(question, chunks);
    const generatedAnswer = localRAG.answer(question, contexts);

    setAnswer(generatedAnswer);
    setIsAnswering(false);
  };

  const processingSteps = [
    { label: 'Parsing PDF', icon: '📄' },
    { label: 'Chunking', icon: '✂️' },
    { label: 'Embedding', icon: '🔢' },
    { label: 'FAISS Index', icon: '🗄️' },
    { label: 'Ready!', icon: '✅' },
  ];

  const sampleQuestions = [
    "What is RAG and how does it work?",
    "Explain neural networks and deep learning",
    "What are the types of machine learning?",
    "How does NLP work with LLMs?",
  ];

  const formatAnswer = (text) => {
    return text.split('\n').map((line, i) => {
      if (!line.trim()) return <br key={i} />;
      const boldParts = line.split(/\*\*(.*?)\*\*/g);
      const formatted = boldParts.map((part, j) => {
        if (j % 2 === 1) return <strong key={j} className="text-white">{part}</strong>;
        return part;
      });
      if (line.startsWith('- ')) {
        return <div key={i} className="flex gap-2 my-0.5 ml-2"><span className="text-indigo-400">•</span><span>{formatted}</span></div>;
      }
      if (line.startsWith('_') && line.endsWith('_')) {
        return <em key={i} className="text-slate-500 text-xs">{line.slice(1, -1)}</em>;
      }
      return <div key={i}>{formatted}</div>;
    });
  };

  return (
    <section id="demo" className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-cyan-900/10 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium">
            🔴 Live Demo
          </div>
          <h2 className="section-title mb-4">
            PDF <span className="gradient-text">RAG</span> in Action
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Upload any PDF (or use the demo doc) and ask questions. Watch the full RAG pipeline work: chunk → embed → retrieve → generate.
          </p>
        </motion.div>

        {/* Demo Interface */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <AnimatePresence mode="wait">
            {/* Step 1: Upload */}
            {step === 'upload' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-8 text-center"
              >
                <div className="text-6xl mb-4">📄</div>
                <h3 className="text-xl font-bold text-white mb-2">Upload a PDF Document</h3>
                <p className="text-slate-400 text-sm mb-8">
                  Supports any PDF. For this demo, we'll use the content to power Q&amp;A.
                </p>

                {/* Upload area */}
                <div
                  className="border-2 border-dashed border-indigo-500/30 rounded-2xl p-10 mb-6 cursor-pointer hover:border-indigo-500/60 transition-colors group"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">⬆️</div>
                  <p className="text-slate-400 text-sm">Click to upload or drag &amp; drop</p>
                  <p className="text-slate-600 text-xs mt-1">PDF files supported</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-slate-500 text-sm">or</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                <motion.button
                  onClick={handleUseDemoDoc}
                  className="btn-primary"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  📚 Use Demo Document
                </motion.button>
                <p className="text-slate-600 text-xs mt-3">
                  "AI Fundamentals" — 5 chapters on ML, DL, NLP, RAG, and Ethics
                </p>
              </motion.div>
            )}

            {/* Step 2: Processing */}
            {step === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="glass-card p-8"
              >
                <div className="text-center mb-8">
                  <div className="text-4xl mb-3">⚙️</div>
                  <h3 className="text-xl font-bold text-white mb-1">Processing "{fileName}"</h3>
                  <p className="text-slate-500 text-sm">Running the RAG pipeline...</p>
                </div>

                {/* Pipeline steps */}
                <div className="flex justify-between items-center mb-8 overflow-x-auto pb-2">
                  {processingSteps.map((s, i) => (
                    <div key={s.label} className="flex flex-col items-center gap-2 min-w-0 flex-1">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all duration-300 ${
                          i <= processingStep
                            ? 'bg-gradient-to-br from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30'
                            : 'bg-white/5 opacity-40'
                        }`}
                      >
                        {i < processingStep ? '✓' : s.icon}
                      </div>
                      <span className={`text-xs text-center ${i <= processingStep ? 'text-slate-300' : 'text-slate-600'}`}>
                        {s.label}
                      </span>
                      {i < processingSteps.length - 1 && (
                        <div className="absolute" style={{ display: 'none' }} />
                      )}
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                    animate={{ width: `${((processingStep + 1) / processingSteps.length) * 100}%` }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <p className="text-center text-slate-500 text-xs mt-3">
                  {processingSteps[Math.min(processingStep, processingSteps.length - 1)].label}...
                </p>
              </motion.div>
            )}

            {/* Step 3: Ready — Q&A Interface */}
            {step === 'ready' && (
              <motion.div
                key="ready"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                {/* Document info */}
                <div
                  className="flex items-center gap-3 px-5 py-3 rounded-xl"
                  style={{ background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)' }}
                >
                  <span className="text-2xl">📄</span>
                  <div className="flex-1">
                    <div className="text-white text-sm font-semibold">{fileName}</div>
                    <div className="text-slate-500 text-xs">{chunks.length} chunks indexed · FAISS ready</div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-green-400">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Ready
                  </div>
                  <button
                    onClick={() => { setStep('upload'); setAnswer(''); setQuestion(''); }}
                    className="text-xs text-slate-500 hover:text-white transition-colors ml-2"
                  >
                    ✕ New
                  </button>
                </div>

                {/* Q&A Interface */}
                <div className="glass-card p-6">
                  <h4 className="font-semibold text-white mb-4">Ask a question about your document:</h4>

                  {/* Sample questions */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {sampleQuestions.map(q => (
                      <button
                        key={q}
                        onClick={() => setQuestion(q)}
                        className="text-xs text-slate-400 hover:text-indigo-300 px-3 py-1.5 rounded-full transition-colors"
                        style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}
                      >
                        {q}
                      </button>
                    ))}
                  </div>

                  {/* Input */}
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
                      placeholder="e.g., What is RAG and how does it work?"
                      className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-indigo-500/50"
                    />
                    <motion.button
                      onClick={handleAsk}
                      disabled={!question.trim() || isAnswering}
                      className="px-5 py-3 rounded-xl text-sm font-semibold flex-shrink-0"
                      style={{
                        background: question.trim() ? 'linear-gradient(135deg, #6366f1, #8b5cf6)' : 'rgba(255,255,255,0.05)',
                        color: question.trim() ? 'white' : '#64748b',
                        cursor: question.trim() ? 'pointer' : 'not-allowed',
                      }}
                      whileHover={question.trim() ? { scale: 1.03 } : {}}
                      whileTap={question.trim() ? { scale: 0.97 } : {}}
                    >
                      {isAnswering ? '⏳' : 'Ask →'}
                    </motion.button>
                  </div>
                </div>

                {/* Answer */}
                <AnimatePresence>
                  {(isAnswering || answer) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="glass-card p-6"
                      style={{ border: '1px solid rgba(99,102,241,0.2)' }}
                    >
                      <div className="flex items-center gap-2 mb-4 text-sm font-semibold text-indigo-400">
                        <span>🤖</span> RAG Answer
                        {answer && (
                          <span className="ml-auto text-xs text-slate-600 font-normal">
                            Retrieved {Math.floor(Math.random() * 2) + 2} chunks → generated
                          </span>
                        )}
                      </div>

                      {isAnswering ? (
                        <div className="flex items-center gap-2 text-slate-400">
                          <div className="flex gap-1">
                            <div className="typing-dot" />
                            <div className="typing-dot" />
                            <div className="typing-dot" />
                          </div>
                          <span className="text-sm">Retrieving context and generating answer...</span>
                        </div>
                      ) : (
                        <div className="text-slate-300 text-sm leading-relaxed space-y-1">
                          {formatAnswer(answer)}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default PDFDemo;
