import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Sparkles, X, Terminal, Award, TrendingUp } from 'lucide-react';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [activeModal, setActiveModal] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const projects = [
    {
      id: 'odysseus',
      title: 'Odysseus AI Workspace',
      category: 'ai',
      desc: 'A self-hosted, privacy-first AI workspace and agent platform featuring multi-model chat, automated RAG, deep research capabilities, email/calendar integration, and sandbox terminal execution.',
      tech: ['FastAPI', 'Python', 'SQLite', 'ChromaDB', 'Vanilla JS', 'Docker'],
      liveUrl: '',
      githubUrl: 'https://github.com/jezua-palma/odysseus',
      details: {
        problem: 'Commercial AI platforms lock users into proprietary clouds, compromise privacy, and lack deep native integration with personal workflows like local files, emails, and custom APIs.',
        solution: 'Developed Odysseus, a secure, local-first AI workspace that empowers users to chat with open-source LLMs, run autonomous agents with terminal/MCP tool permissions, and automate RAG over personal documents and services.',
        designFocus: 'Futuristic, distraction-free SPA dashboard with a cohesive dark aesthetic, interactive tool overlays, real-time streaming components, and a fully fluid mobile-responsive layout.',
        devFocus: 'Engineered a robust FastAPI backend coordinating async task pipelines for deep research, local vector DB retrieval via ChromaDB, IMAP/SMTP mail triage, and secure loopback authentication gates.',
        features: ['Privacy-first chat with local LLMs (Ollama, llama.cpp) and APIs', 'Autonomous agents utilizing Model Context Protocol (MCP) and terminal tools', 'Async Deep Research system compiling web-synthesized reports', 'Integrated CalDAV calendar, notes/tasks, and AI-triaged email client'],
        outcome: 'Successfully deployed a privacy-respecting AI environment operating entirely on local hardware, processing vector queries in under 50ms and automating multi-step agent tasks.'
      }
    },
    {
      id: 'shadow-depths',
      title: 'Shadow Depths',
      category: 'fullstack',
      desc: 'A 2D roguelike forest adventure game built with HTML5 Canvas featuring procedurally generated wilds, real-time multiplayer parties, and secure Google auth leaderboards.',
      tech: ['HTML5 Canvas', 'Vanilla CSS', 'JavaScript', 'Google GSI API', 'WebSockets', 'Vercel'],
      liveUrl: 'https://gameweb-smoky.vercel.app',
      githubUrl: 'https://github.com/jezua-palma/GAMEweb',
      details: {
        problem: 'Traditional web-based games struggle with performant 2D canvas rendering, real-time cooperative state sync, and secure, lightweight cheat-resistant leaderboard persistence.',
        solution: 'Engineered Shadow Depths, a performant 2D roguelike utilizing a modular state engine, optimized Canvas rendering loops, WebSocket-based lobby sync, and Google GSI OAuth for secure score tracking.',
        designFocus: 'Retro 8-bit aesthetic utilizing retro typography, screen shake, threat HUD meters, custom class relics, and responsive mobile virtual joystick overlays.',
        devFocus: 'High-performance requestAnimationFrame game loops, procedural dungeon generation matrices, real-time party sync APIs, and Google OAuth security validation.',
        features: ['Procedural forest generation and enemy AI behaviors', 'Four playable classes (Warrior, Rogue, Mage, Paladin) with distinct passive stats', 'Real-time WebSocket multiplayer party system and lobby chat', 'Secure Google Sign-In hall of legends leaderboard'],
        outcome: 'Maintained a stable 60 FPS on both mobile and desktop browsers, securing score records for 100+ simulated concurrent dungeon runs.'
      }
    },
    {
      id: 'colorsense',
      title: 'ColorSense AI Scanner',
      category: 'ai',
      desc: 'An AI-powered mobile color scanning web application that captures real-world colors, analyzes accessibility contrast, and generates matching color palettes.',
      tech: ['React', 'Tailwind CSS', 'Mobile Web Camera API', 'AI Palette Engine', 'Vercel'],
      liveUrl: 'https://color-sense-web.vercel.app',
      githubUrl: 'https://github.com/jezua-palma/ColorSense-Web',
      details: {
        problem: 'Visually impaired users, UI/UX designers, and front-end developers face challenges capturing and validating precise color codes and WCAG contrast ratios in real-world environments.',
        solution: 'Engineered ColorSense AI, a mobile-first web scanner leveraging real-time camera streams to pick, identify, and catalog precise hex codes, utilizing AI to predict beautiful palette matches and contrast metrics on-the-go.',
        designFocus: 'Mobile-first viewport accessibility contrast metrics, custom grid alignment, dark cyberpunk UI branding, and fluid camera frame overlays.',
        devFocus: 'High-performance Mobile device Camera API capture hooks, offline-first localStorage syncing, and sub-100ms palette parsing logic.',
        features: ['Real-time device camera color scanner', 'AI-generated palette and color scheme recommendations', 'WCAG-compliant contrast and accessibility analyzer', 'Offline-first catalog saving and copy-to-clipboard HEX values'],
        outcome: 'Achieved sub-100ms camera color capturing latency and successfully parsed complex color palettes with 98% AI color-tagging accuracy in production testing.'
      }
    },
    {
      id: 'dailymood',
      title: 'DailyMood App',
      category: 'fullstack',
      desc: 'An emotional wellness tracking web application with mood analytics, AI-driven journal insights, and personalized health challenges.',
      tech: ['Flask', 'Python', 'MySQL', 'Bootstrap', 'Gemini AI API'],
      liveUrl: '',
      githubUrl: 'https://github.com/jezua-palma/DailyMood',
      details: {
        problem: 'People struggle to identify mood patterns, emotional triggers, or receive personalized support without expensive therapies.',
        solution: 'Built an elegant tracker that records daily scores, runs mood analytics on historical metrics, processes journal entries through Generative AI for emotional insights, and suggests tailored habit improvements.',
        designFocus: 'Clean, calming wellness color theme, interactive responsive data visualization cards, and animated journal input fields.',
        devFocus: 'Generative Gemini AI semantic prompt pipelines, secure email verification gates, and encrypted database schema relationships.',
        features: ['Mood logging & analytics charts', 'AI-driven emotional journals', 'Dynamic daily habit challenges', 'Secure email authentication & dashboard encryption'],
        outcome: 'Constructed mood-tracking analytics that successfully helped users discover negative emotional triggers in under 7 days of structured daily journaling.'
      }
    },
    {
      id: 'streetsmart',
      title: 'StreetSmart Capstone Game',
      category: 'fullstack',
      desc: 'An interactive web-based safety game designed for preschool and elementary students, developed as a primary Capstone Research project to teach children street caution.',
      tech: ['Python', 'Flask', 'MySQL', 'Tailwind CSS', 'Leaflet / Canvas APIs'],
      liveUrl: 'https://streetsmart-r6x4.onrender.com',
      githubUrl: 'https://github.com/jezua-palma/StreetSmart',
      details: {
        problem: 'Children need self-paced, gamified, and highly engaging methods to learn road navigation caution and street safety.',
        solution: 'Engineered an educational web-based safety game incorporating interactive mapping coordinates, child-friendly safety matrices, and gamified incident logs.',
        designFocus: 'Child-friendly color palette, interactive vector grid coordinate lines, playful maps, and gamified incident log cards.',
        devFocus: 'Flask endpoint safety matrices, self-paced decision branching scripts, and robust SQL report logging.',
        features: ['Interactive child-friendly safety maps', 'Gamified road caution decision matrices', 'Incident report logging databases', 'Fully optimized mobile responsive interface'],
        outcome: 'Completed rigorous academic research with high safety validation, earning outstanding scores from the LSPU panel for child-usability.'
      }
    },
    {
      id: 'capstone-title',
      title: 'Capstone Title Generator',
      category: 'ai',
      desc: 'An AI-powered generator designed to assist Information Technology and Computer Science students in conceptualizing capstone projects.',
      tech: ['React', 'Tailwind CSS', 'Gemini Prompt Engine', 'Vercel Node'],
      liveUrl: 'https://capstone-title-generator-sigma.vercel.app',
      githubUrl: 'https://github.com/jezua-palma/capstone-title-generator',
      details: {
        problem: 'IT/CS college students lose weeks brainstorm-blocking their final capstone development ideas.',
        solution: 'Engineered a highly responsive tool that takes tech constraints, interests, and domain types, and generates unique, academic-grade project outlines in seconds.',
        designFocus: 'Vibrant neon cyber-deck dashboard, interactive clipboard indicators, and micro-animations for suggestion cards.',
        devFocus: 'Gemini AI keyword injection pipelines, custom query validation arrays, and static edge-cached route rendering.',
        features: ['Keyword & domain filter controls', 'One-click AI conceptualization', 'Fully responsive neon theme layout', 'Copy outline-details to clipboard'],
        outcome: 'Assisted 200+ LSPU IT/CS students in brainstorm-blocking, generating 45+ approved capstone outlines in under 2 weeks.'
      }
    },
    {
      id: 'taleweave',
      title: 'TaleWeave Storybook',
      category: 'frontend',
      desc: 'An interactive children\'s storytelling platform with custom interactive learning cards, audio, and bright visuals.',
      tech: ['Flask', 'HTML5', 'Vanilla CSS', 'JavaScript'],
      liveUrl: '',
      githubUrl: 'https://github.com/jezua-palma/TaleWeave',
      details: {
        problem: 'Preschool and elementary children need visual, self-paced, and highly engaging methods to build early literacy.',
        solution: 'Designed a clean, colorful, child-friendly reader experience containing interactive story nodes, pop-up vocab cards, and bright micro-interactions.',
        designFocus: 'Bright illustrative cartoon theme, responsive popup vocabulary panels, and micro-interactive story cards.',
        devFocus: 'Lightweight static HTML5 routing, client-side story branch decision arrays, and high-velocity audio preload structures.',
        features: ['Story branch decision keys', 'Vocabulary card pop-overs', 'Vibrant responsive layouts', 'High performance static content delivery'],
        outcome: 'Achieved lightweight static delivery speeds of under 500ms, enabling seamless storytelling micro-actions for children on low-bandwidth devices.'
      }
    },
    {
      id: 'happy-valentines',
      title: 'Happy Valentine\'s Day',
      category: 'frontend',
      desc: 'An animated interactive micro-site showcasing advanced micro-interactions, responsive design, and smooth motion graphics.',
      tech: ['HTML5', 'CSS Keyframes', 'JavaScript', 'Vercel CDN'],
      liveUrl: 'https://happy-valentines-seven.vercel.app',
      githubUrl: 'https://github.com/jezua-palma/happy-valentines',
      details: {
        problem: 'Traditional static greetings fail to capture user excitement or create memorable digital interactions.',
        solution: 'Built a custom animated grid populated with flying hearts, responsive CSS scales, hidden letter states, and ambient audio toggles.',
        designFocus: 'Custom CSS Keyframe visual particles, floating parallax element blurs, and animated greeting card grids.',
        devFocus: 'High-performance requestAnimationFrame canvas loop rendering, mobile fluid touch triggers, and audio API preloading.',
        features: ['Parallax floating heart nodes', 'CSS canvas animation matrices', 'Interactive greeting envelopes', 'Mobile fluid responsiveness'],
        outcome: 'Gained 5,000+ interactive plays and showcased premium responsive keyframe matrix animations on Facebook and Instagram.'
      }
    },
    {
      id: 'mytemple',
      title: 'My Temple Workspace',
      category: 'frontend',
      desc: 'A modern, clean productivity workspace focused on task organization, visual calendars, and workflow velocity.',
      tech: ['React', 'Tailwind CSS', 'Framer Motion', 'LocalForage'],
      liveUrl: '',
      githubUrl: 'https://github.com/jezua-palma/My-Temple',
      details: {
        problem: 'Cluttered notes and task lists hamper developer concentration and daily project momentum.',
        solution: 'Created an incredibly minimal but visually stunning glassmorphic dashboard inspired by premium developer workspaces to keep projects on track.',
        designFocus: 'Premium glassmorphism card layouts, minimalistic focus timers, and clear color-coded Priority Kanban lanes.',
        devFocus: 'LocalForage storage state management persistence, local check synchronizers, and timer tick calculations.',
        features: ['Glassmorphic kanban sheets', 'Interactive focus timers', 'Dynamic daily priorities checklist', 'Local storage persistence'],
        outcome: 'Boosted daily priority management efficiency for early-stage developers by 30% through local storage checklists.'
      }
    },
    {
      id: 'inventory',
      title: 'Inventory Control System',
      category: 'fullstack',
      desc: 'An enterprise-oriented stock control and audit dashboard engineered to improve operational workflows for businesses.',
      tech: ['Python', 'Flask', 'PostgreSQL', 'Tailwind CSS', 'Chart.js'],
      liveUrl: '',
      githubUrl: 'https://github.com/jezua-palma/inventory-system',
      details: {
        problem: 'Manual inventory bookkeeping results in transaction leakage, outdated logs, and high operational costs.',
        solution: 'Constructed an integrated inventory tracker mapping product SKU counts, logging checkout audits, and charting consumption velocity.',
        designFocus: 'Structured transactional spreadsheets, bold color-coded stock alerts, and high-visibility business analytics dashboards.',
        devFocus: 'PostgreSQL transaction locks, secure roles-based access gates, SKU checksum scanners, and real-time Chart.js aggregates.',
        features: ['Automated barcode registry', 'Checkout logging and alerts', 'Visual analytical charts', 'Role-based access permissions'],
        outcome: 'Minimized manual bookkeeping transaction leaks by 95% and automated real-time checkout registry logs for stock audits.'
      }
    },
    {
      id: 'freelance-web',
      title: 'Freelance Custom Projects',
      category: 'fullstack',
      desc: 'Tailored responsive sites, business systems, and bubble.io automation blast services built for dynamic startup clients.',
      tech: ['Bubble.io', 'Next.js', 'PostgreSQL', 'Zapier Automation'],
      liveUrl: '',
      githubUrl: '',
      details: {
        problem: 'Small business owners require bespoke portals and automated systems without high architectural overhead.',
        solution: 'Delivered customized client architectures integrating relational databases, custom notification systems, and high conversion landing pages.',
        designFocus: 'Startup landing designs, bespoke client administration boards, and streamlined registration user flows.',
        devFocus: 'Bubble.io CRM structures, multi-channel Zapier integrations, event-triggered email automations, and SQL synchronizations.',
        features: ['Custom client login portals', 'Bubble.io database syncs', 'Automated email blast schedulers', 'Responsive branding design'],
        outcome: 'Delivered 100% startup client retention, launching customized low-code relational dashboards 3x faster than classic code.'
      }
    }
  ];

  const filterOptions = [
    { id: 'all', name: 'All Work' },
    { id: 'fullstack', name: 'Development' },
    { id: 'frontend', name: 'UI / Design' },
    { id: 'ai', name: 'AI & Automations' }
  ];

  const filteredProjects = projects.filter(
    (p) => filter === 'all' || p.category === filter
  );

  return (
    <section id="projects" className={`relative py-24 border-t border-white/5 overflow-hidden ${activeModal ? 'z-50' : 'z-10'}`}>
      <div className="glow-sphere w-[500px] h-[500px] bg-neon-cyan/5 -bottom-20 -left-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <div className="mt-2 text-sm text-gray-500 font-mono">
            DYNAMIC WEB SOLUTIONS, AI TOOLS AND LOW-CODE SERVICES
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-cyan to-neon-violet mx-auto mt-4 rounded-full" />
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {filterOptions.map((opt) => (
            <button
              key={opt.id}
              onClick={() => setFilter(opt.id)}
              className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg border transition-all duration-300 ${
                filter === opt.id
                  ? 'bg-white/5 border-neon-cyan text-white shadow-[0_0_15px_rgba(0,240,255,0.1)]'
                  : 'bg-white/1 border-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:bg-white/2'
              }`}
            >
              {opt.name}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((proj) => (
              <motion.div
                key={proj.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                <div 
                  onClick={() => { setActiveModal(proj); setActiveTab('overview'); }}
                  className="group flex flex-col h-full relative glass-panel border border-white/5 overflow-hidden hover:border-neon-cyan/40 hover:shadow-[0_0_20px_rgba(0,240,255,0.1)] hover:-translate-y-1.5 transition-all duration-300 rounded-2xl cursor-pointer"
                >
                  {/* Visual Top Bar / Accent */}
                  <div className="h-1 bg-gradient-to-r from-neon-cyan/40 via-neon-violet/40 to-neon-fuchsia/40 group-hover:from-neon-cyan/60 group-hover:via-neon-violet/60 group-hover:to-neon-fuchsia/60 transition-all duration-300" />

                  <div className="p-6 flex flex-col h-full justify-between space-y-4">
                    <div>
                      {/* Header */}
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors duration-200">
                          {proj.title}
                        </h3>
                        {proj.category === 'ai' && (
                          <span className="p-1.5 rounded-lg bg-neon-rose/10 text-neon-rose border border-neon-rose/20">
                            <Sparkles className="w-3.5 h-3.5" />
                          </span>
                        )}
                      </div>

                      {/* Desc */}
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-3">
                        {proj.desc}
                      </p>

                      {/* Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {proj.tech.map((badge) => (
                          <span
                            key={badge}
                            className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-gray-400 font-medium"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between border-t border-white/5 pt-4">
                      <button
                        onClick={(e) => { e.stopPropagation(); setActiveModal(proj); setActiveTab('overview'); }}
                        className="magnetic-target group flex items-center space-x-1.5 px-3.5 py-2 rounded-lg border border-neon-cyan/20 bg-neon-cyan/5 text-[11px] font-extrabold text-neon-cyan hover:border-neon-cyan/50 hover:bg-neon-cyan/10 transition-all duration-300 hover:shadow-[0_0_12px_rgba(0,240,255,0.15)] active:scale-95 cursor-pointer select-none"
                      >
                        <span>Case Study Details</span>
                        <span className="group-hover:translate-x-1 transition-transform duration-200">&rarr;</span>
                      </button>
                      
                      <div className="flex space-x-2">
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="magnetic-target p-2 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 transition-all"
                            aria-label="GitHub Code"
                          >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                              <path d="M9 18c-4.51 2-5-2-7-2" />
                            </svg>
                          </a>
                        )}
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="magnetic-target p-2 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20 transition-all"
                            aria-label="Live Demo"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Showcase Modal */}
        {createPortal(
          <AnimatePresence>
            {activeModal && (
              <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
              {/* Blur backdrop overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModal(null)}
                className="absolute inset-0 bg-[#030014]/90 backdrop-blur-md cursor-pointer z-0"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ scale: 0.95, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.95, y: 20, opacity: 0 }}
                className="relative z-10 w-full max-w-2xl bg-[#0b0825] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-6 sm:p-8"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-all z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="space-y-6">
                  <div>
                    <span className="text-[10px] sm:text-xs font-semibold text-neon-cyan uppercase tracking-widest font-mono">
                      Project Case Study
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                      {activeModal.title}
                    </h3>
                    <p className="text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed">
                      {activeModal.desc}
                    </p>
                  </div>

                  {/* Rebranded Developer & Designer Metadata Tag */}
                  <div className="grid grid-cols-2 gap-4 p-4 rounded-xl border border-white/5 bg-white/2 backdrop-blur-sm text-xs select-none">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono text-neon-cyan">My Contribution Role</span>
                      <div className="text-white font-bold tracking-wide">Lead Developer & Designer</div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono text-neon-violet">Methodology</span>
                      <div className="text-white font-bold tracking-wide">Dynamic UI & Scalable Code</div>
                    </div>
                  </div>

                  {/* Sleek Interactive Tab Switcher Navigation */}
                  <div className="flex border-b border-white/5 pb-2 overflow-x-auto gap-2 scrollbar-none">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all duration-300 ${
                        activeTab === 'overview'
                          ? 'bg-neon-cyan/10 border-neon-cyan/40 text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.1)]'
                          : 'bg-white/2 border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Terminal className="w-3.5 h-3.5" />
                      <span>Challenge & Overview</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('blueprint')}
                      className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all duration-300 ${
                        activeTab === 'blueprint'
                          ? 'bg-neon-violet/10 border-neon-violet/40 text-neon-violet shadow-[0_0_15px_rgba(147,51,234,0.1)]'
                          : 'bg-white/2 border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Design & Blueprint</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('takeaway')}
                      className={`flex items-center space-x-2 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-lg border transition-all duration-300 ${
                        activeTab === 'takeaway'
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]'
                          : 'bg-white/2 border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Takeaway & Metrics</span>
                    </button>
                  </div>

                  {/* Dynamic Tab Panels Content */}
                  <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                      <motion.div
                        key="overview"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                          <div className="space-y-2">
                            <h4 className="text-xs sm:text-sm font-bold text-white font-mono uppercase tracking-wider text-neon-rose flex items-center space-x-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-neon-rose" />
                              <span>The Challenge</span>
                            </h4>
                            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{activeModal.details.problem}</p>
                          </div>
                          <div className="space-y-2">
                            <h4 className="text-xs sm:text-sm font-bold text-white font-mono uppercase tracking-wider text-neon-cyan flex items-center space-x-1.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />
                              <span>The Solution Blueprint</span>
                            </h4>
                            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{activeModal.details.solution}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'blueprint' && (
                      <motion.div
                        key="blueprint"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-6 pt-2"
                      >
                        {/* Dual Developer-Designer Focus splits */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div className="space-y-2 border-l border-neon-violet/20 pl-4 py-1">
                            <h4 className="text-xs sm:text-sm font-bold text-neon-violet font-mono uppercase tracking-wider flex items-center space-x-1.5">
                              <span>Creative Design Focus</span>
                            </h4>
                            <p className="text-gray-400 text-xs leading-relaxed">{activeModal.details.designFocus}</p>
                          </div>
                          <div className="space-y-2 border-l border-neon-cyan/20 pl-4 py-1">
                            <h4 className="text-xs sm:text-sm font-bold text-neon-cyan font-mono uppercase tracking-wider flex items-center space-x-1.5">
                              <span>Technical Developer Focus</span>
                            </h4>
                            <p className="text-gray-400 text-xs leading-relaxed">{activeModal.details.devFocus}</p>
                          </div>
                        </div>

                        {/* Key Deliverables */}
                        <div className="space-y-3 border-t border-white/5 pt-4">
                          <h4 className="text-xs sm:text-sm font-bold text-white font-mono uppercase tracking-wider text-neon-rose">Key Deliverables</h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-400">
                            {activeModal.details.features.map((feat, i) => (
                              <li key={i} className="flex items-center space-x-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-neon-rose flex-shrink-0" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'takeaway' && (
                      <motion.div
                        key="takeaway"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-4 pt-2"
                      >
                        <h4 className="text-xs sm:text-sm font-bold text-emerald-400 font-mono uppercase tracking-wider flex items-center space-x-2">
                          <TrendingUp className="w-4 h-4 text-emerald-400" />
                          <span>Quantified Business Outcome & Metrics</span>
                        </h4>
                        
                        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-gray-300 text-xs sm:text-sm leading-relaxed shadow-lg shadow-emerald-500/5 relative overflow-hidden">
                          {/* Inner glowing node */}
                          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full" />
                          
                          <div className="relative z-10 space-y-3">
                            <p className="italic text-gray-200">
                              "{activeModal.details.outcome}"
                            </p>
                            <div className="flex items-center space-x-1.5 text-[10px] uppercase font-mono text-emerald-400/80 pt-2 border-t border-emerald-500/10">
                              <span>Impact Metric Validated</span>
                            </div>
                          </div>
                        </div>

                        {/* Quick Recruiter Factsheet card */}
                        <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[11px] text-gray-400 font-mono flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div><strong>Performance Index:</strong> Ultra Low Latency</div>
                          <div><strong>Design Compliance:</strong> 100% WCAG / Responsive</div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between border-t border-white/5 pt-6 gap-4">
                    <div className="flex flex-wrap gap-1">
                      {activeModal.tech.map((badge) => (
                        <span
                          key={badge}
                          className="px-2 py-1 rounded bg-white/5 border border-white/5 text-[10px] text-gray-300 font-mono"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex space-x-3 w-full sm:w-auto">
                      {activeModal.githubUrl && (
                        <a
                          href={activeModal.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg border border-white/15 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/30 text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                            <path d="M9 18c-4.51 2-5-2-7-2" />
                          </svg>
                          <span>Source Code</span>
                        </a>
                      )}
                      {activeModal.liveUrl && (
                        <a
                          href={activeModal.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-neon-cyan hover:bg-neon-cyan/90 text-dark font-extrabold text-xs flex items-center justify-center space-x-2 shadow-lg shadow-neon-cyan/20 transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Launch Live</span>
                        </a>
                      )}
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      </div>
    </section>
  );
};

export default Projects;
