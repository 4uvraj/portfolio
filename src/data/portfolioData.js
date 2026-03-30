// ============================================================
// Portfolio Data - Yuvraj's Profile Information
// ============================================================

export const personalInfo = {
  name: "Yuvraj Kag",
  title: "AI Developer | Problem Solver",
  subtitle: "Building Intelligent Systems",
  tagline: "I craft intelligent systems that bridge the gap between cutting-edge AI research and real-world impact.",
  email: "yuvrajkag2003@gmail.com",
  emailCollege: "23u01051@iiitbhopal.ac.in",
  github: "https://github.com/4uvraj",
  linkedin: "https://www.linkedin.com/in/4uvraj",
  leetcode: "https://leetcode.com/u/yuvrajkag14/",
  location: "India",
};

export const projects = [
  {
    id: 1,
    title: "Weather-AI-Streamlit",
    emoji: "🌤️",
    image: "/img-weather.png",
    description: "An AI-powered weather intelligence dashboard that goes beyond basic forecasts. Uses machine learning to analyze weather patterns, predict anomalies, and provide actionable insights through a beautiful Streamlit interface.",
    longDescription: "This project combines real-time weather APIs with ML models trained on historical meteorological data to provide intelligent forecasting. Features include pattern anomaly detection, climate trend analysis, and natural language weather summaries.",
    techStack: ["Python", "Streamlit", "Scikit-learn", "Pandas", "OpenWeatherMap API", "Plotly"],
    github: "https://github.com/4uvraj/Weather-AI-Streamlit",
    demoUrl: "https://weather-ai-4uvraj.streamlit.app/",
    demo: "live",
    tags: ["AI", "ML", "Data Viz"],
    color: "from-blue-600 to-cyan-500",
    featured: true,
  },
  {
    id: 2,
    title: "Movie Recommender",
    emoji: "🎬",
    image: "/img-movie.png",
    description: "A sophisticated ML-based movie recommendation engine that understands your taste. Implements collaborative filtering, content-based filtering, and hybrid recommendation strategies for highly personalized suggestions.",
    longDescription: "Built on a dataset of 10,000+ movies, this system uses matrix factorization and cosine similarity to recommend movies. Features include genre-based filtering, rating predictions, and explainable recommendations.",
    techStack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Streamlit", "TMDB API"],
    github: "https://github.com/4uvraj/Movie_Recommender",
    demoUrl: "https://movie-recommender-4uvraj.streamlit.app/",
    demo: "live",
    tags: ["ML", "NLP", "Recommendation"],
    color: "from-purple-600 to-pink-500",
    featured: true,
  },
  {
    id: 3,
    title: "PDF-RAG",
    emoji: "📄",
    image: "/img-pdf.png",
    description: "A production-ready Retrieval-Augmented Generation system that transforms any PDF into an intelligent knowledge base. Ask natural language questions and get accurate, context-aware answers with source citations.",
    longDescription: "Implements a complete RAG pipeline: document chunking, embedding generation with sentence transformers, FAISS vector storage, and LLM-powered answer generation. Supports multi-document queries and maintains conversation context.",
    techStack: ["Python", "LangChain", "FAISS", "OpenAI", "Sentence Transformers", "Streamlit"],
    github: "https://github.com/4uvraj/PDF-RAG",
    demoUrl: "https://rag-pdf-4uvraj.streamlit.app/",
    demo: "live",
    tags: ["RAG", "LLM", "NLP"],
    color: "from-indigo-600 to-purple-600",
    featured: true,
  },
  {
    id: 4,
    title: "AI Travel Agent",
    emoji: "✈️",
    image: "/img-travel.png",
    description: "An agent-based intelligent travel planning system powered by LLMs. Provide your destination and preferences, and the AI agent autonomously researches, plans, and generates a comprehensive personalized itinerary.",
    longDescription: "Built using LangChain agents with tool-use capabilities. The agent searches for attractions, checks weather, estimates costs, and compiles a detailed day-by-day itinerary with restaurant recommendations and local tips.",
    techStack: ["Python", "LangChain", "OpenAI", "FastAPI", "React", "TailwindCSS"],
    github: "https://github.com/4uvraj/AL-TRAVEL-AGENT",
    demoUrl: "https://al-travel-agent.vercel.app/",
    demo: "live",
    tags: ["AI Agents", "LLM", "Planning"],
    color: "from-emerald-600 to-teal-500",
    featured: true,
  },
];

export const skills = {
  aiml: {
    label: "AI / ML",
    icon: "🧠",
    color: "from-purple-500 to-indigo-600",
    items: [
      { name: "Machine Learning", level: 90 },
      { name: "Deep Learning", level: 80 },
      { name: "Natural Language Processing", level: 85 },
      { name: "RAG Systems", level: 90 },
      { name: "LLM Orchestration", level: 85 },
      { name: "Computer Vision", level: 70 },
      { name: "AI Agents", level: 85 },
    ]
  },
  programming: {
    label: "Programming",
    icon: "💻",
    color: "from-blue-500 to-cyan-600",
    items: [
      { name: "Python", level: 92 },
      { name: "JavaScript", level: 78 },
      { name: "React.js", level: 75 },
      { name: "SQL", level: 72 },
      { name: "Bash/Shell", level: 65 },
    ]
  },
  tools: {
    label: "Tools & Frameworks",
    icon: "🛠️",
    color: "from-cyan-500 to-teal-600",
    items: [
      { name: "LangChain", level: 88 },
      { name: "Streamlit", level: 92 },
      { name: "FastAPI", level: 80 },
      { name: "FAISS", level: 85 },
      { name: "Scikit-learn", level: 88 },
      { name: "Git & GitHub", level: 85 },
      { name: "Docker", level: 65 },
    ]
  },
  core: {
    label: "Core Concepts",
    icon: "⚡",
    color: "from-amber-500 to-orange-600",
    items: [
      { name: "Data Structures", level: 85 },
      { name: "Algorithms", level: 82 },
      { name: "System Design", level: 75 },
      { name: "Problem Solving", level: 90 },
      { name: "Math for ML", level: 80 },
    ]
  }
};

export const buildProcess = [
  {
    step: "01",
    title: "Problem Understanding",
    description: "Deep-dive into the problem space. I ask 'why' before 'how' — mapping requirements, edge cases, and user needs before writing a single line.",
    icon: "🎯",
    color: "from-blue-500 to-indigo-600"
  },
  {
    step: "02",
    title: "System Design",
    description: "Architect the solution holistically. I design data flows, choose the right tools (not trendy ones), and plan for scalability from day one.",
    icon: "🏗️",
    color: "from-indigo-500 to-purple-600"
  },
  {
    step: "03",
    title: "Model Building",
    description: "Implement iteratively with clean, documented code. Start with baselines, validate assumptions, then advance to sophisticated solutions.",
    icon: "⚙️",
    color: "from-purple-500 to-pink-600"
  },
  {
    step: "04",
    title: "Optimization",
    description: "Profile, benchmark, and optimize. Whether it's inference latency or retrieval accuracy, I push systems to their performance ceiling.",
    icon: "🚀",
    color: "from-pink-500 to-rose-600"
  },
  {
    step: "05",
    title: "Real-World Usability",
    description: "Deploy and validate with real users. AI that doesn't reach users is just research. I focus on practical deployment and impact.",
    icon: "🌍",
    color: "from-rose-500 to-orange-600"
  },
];

export const dsaMindset = [
  {
    title: "Pattern Recognition",
    description: "I see algorithms as patterns — sliding windows, two pointers, graph traversal. Once you see the pattern, the solution emerges naturally.",
    icon: "🔍",
  },
  {
    title: "Consistent Practice",
    description: "DSA is a discipline, not a sprint. Daily practice builds intuition that transfers to system design challenges.",
    icon: "📅",
  },
  {
    title: "Optimization Thinking",
    description: "My default question is 'can we do better?' — from O(n²) to O(n log n), from brute force to elegant solutions.",
    icon: "⚡",
  },
];

export const futureVision = [
  {
    title: "Scalable AI Systems",
    description: "Building production-grade AI infrastructure that serves millions of users reliably and efficiently.",
    icon: "🏛️",
    gradient: "from-blue-600 to-indigo-700"
  },
  {
    title: "LLMs & Agents",
    description: "Pushing the frontier of autonomous AI agents that can reason, plan, and act in complex environments.",
    icon: "🤖",
    gradient: "from-indigo-600 to-purple-700"
  },
  {
    title: "Real-World Impact",
    description: "From research papers to production deployments — AI that actually moves the needle for real people.",
    icon: "🌍",
    gradient: "from-purple-600 to-pink-700"
  },
];

// ============================================================
// RAG Knowledge Base - Used for chatbot context
// ============================================================
export const knowledgeBase = `
ABOUT YUVRAJ KAG:
Yuvraj Kag is an AI Developer and Problem Solver, a college student passionate about building intelligent systems that bridge cutting-edge AI research and real-world impact. He specializes in AI/ML, RAG systems, LLM orchestration, and AI agents.

PROJECTS:

1. Weather-AI-Streamlit:
Title: Weather-AI-Streamlit
Description: An AI-powered weather intelligence dashboard that goes beyond basic forecasts using machine learning to analyze weather patterns and predict anomalies.
Tech Stack: Python, Streamlit, Scikit-learn, Pandas, OpenWeatherMap API, Plotly
Features: Real-time weather data, ML-based pattern analysis, anomaly detection, climate trend analysis, natural language weather summaries
GitHub: https://github.com/4uvraj/Weather-AI-Streamlit
Live Demo: https://weather-ai-4uvraj.streamlit.app/

2. Movie Recommender:
Title: Movie Recommender
Description: A sophisticated ML-based movie recommendation engine that understands taste using collaborative filtering and content-based filtering.
Tech Stack: Python, Scikit-learn, Pandas, NumPy, Streamlit, TMDB API
Features: Matrix factorization, cosine similarity, 10000+ movies dataset, explainable recommendations, genre filtering
GitHub: https://github.com/4uvraj/Movie_Recommender
Live Demo: https://movie-recommender-4uvraj.streamlit.app/

3. PDF-RAG:
Title: PDF-RAG
Description: A production-ready Retrieval-Augmented Generation system that transforms any PDF into an intelligent knowledge base for natural language Q&A.
Tech Stack: Python, LangChain, FAISS, OpenAI, Sentence Transformers, Streamlit
Features: Document chunking, embedding generation, FAISS vector storage, LLM-powered answers, source citations, multi-document support, conversation context
GitHub: https://github.com/4uvraj/PDF-RAG
Live Demo: https://rag-pdf-4uvraj.streamlit.app/
This project demonstrates RAG pipeline implementation from scratch.

4. AI Travel Agent:
Title: AI Travel Agent
Description: An agent-based intelligent travel planning system powered by LLMs that autonomously researches and plans personalized itineraries.
Tech Stack: Python, LangChain, OpenAI, FastAPI, React, TailwindCSS
Features: Autonomous agent with tool-use, destination research, weather checking, cost estimation, day-by-day itinerary, restaurant recommendations
GitHub: https://github.com/4uvraj/AL-TRAVEL-AGENT
Live Demo: https://al-travel-agent.vercel.app/

SKILLS:
AI/ML Skills: Machine Learning (90%), Deep Learning (80%), Natural Language Processing (85%), RAG Systems (90%), LLM Orchestration (85%), Computer Vision (70%), AI Agents (85%)
Programming Skills: Python (92%), JavaScript (78%), React.js (75%), SQL (72%)
Tools: LangChain (88%), Streamlit (92%), FastAPI (80%), FAISS (85%), Scikit-learn (88%), Git (85%)
Core: Data Structures (85%), Algorithms (82%), System Design (75%), Problem Solving (90%)

HOW YUVRAJ BUILDS:
1. Problem Understanding: Deep-dive into the problem space, map requirements, edge cases, and user needs
2. System Design: Architect holistically, design data flows, choose right tools, plan for scalability
3. Model Building: Implement iteratively with clean code, start with baselines, validate assumptions
4. Optimization: Profile, benchmark, and optimize — inference latency, retrieval accuracy
5. Real-World Usability: Deploy and validate with real users, focus on practical deployment and impact

DSA APPROACH:
Yuvraj Kag approaches DSA with pattern recognition, consistent practice, and optimization thinking. He sees algorithms as patterns (sliding windows, two pointers, graph traversal) and always asks "can we do better?"

FUTURE VISION:
Building scalable AI systems for millions of users, pushing frontiers of autonomous LLM agents, focused on real-world AI impact.

CONTACT:
Email: yuvrajkag@gmail.com
GitHub: https://github.com/4uvraj
LinkedIn: https://www.linkedin.com/in/4uvraj
`;
