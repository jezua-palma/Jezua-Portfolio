import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Mail } from 'lucide-react';

const Hero = () => {
  const [typedTitle, setTypedTitle] = useState('');
  const fullTitle = "Developer & Designer | AI-Assisted Developer | UI/UX Enthusiast";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedTitle(fullTitle.substring(0, index));
      index++;
      if (index > fullTitle.length) {
        clearInterval(interval);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const socials = [
    { 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ), 
      href: 'https://github.com/jezua-palma', 
      label: 'GitHub', 
      color: 'hover:text-white hover:border-white' 
    },
    { 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ), 
      href: 'https://www.linkedin.com/in/jezua-errol-palma-30b1561bb/', 
      label: 'LinkedIn', 
      color: 'hover:text-neon-cyan hover:border-neon-cyan' 
    },
    { 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ), 
      href: 'https://www.facebook.com/jezua.palma', 
      label: 'Facebook', 
      color: 'hover:text-blue-500 hover:border-blue-500' 
    },
    { 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" />
        </svg>
      ), 
      href: 'https://www.instagram.com/jezua.errol_/', 
      label: 'Instagram', 
      color: 'hover:text-neon-rose hover:border-neon-rose' 
    },
    { icon: <Mail className="w-5 h-5" />, href: 'mailto:jezuapalma@gmail.com', label: 'Email', color: 'hover:text-neon-violet hover:border-neon-violet' }
  ];

  // Orbiting Tech Icons as direct SVGs
  const techIcons = [
    { 
      name: 'React', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="2" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" transform="rotate(30 12 12)" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" transform="rotate(90 12 12)" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" transform="rotate(150 12 12)" />
        </svg>
      ),
      color: 'text-sky-400 border-sky-400/30 hover:border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.2)]', 
      delay: 0 
    },
    { 
      name: 'Python', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v10H2" />
          <path d="M12 22V12h10" />
          <path d="M12 12m-9 0a9 9 0 1 1 18 0 9 9 0 1 1-18 0" />
        </svg>
      ),
      color: 'text-amber-400 border-amber-400/30 hover:border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.2)]', 
      delay: 5 
    },
    { 
      name: 'Next.js', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18V6l6 12V6" />
        </svg>
      ),
      color: 'text-white border-white/20 hover:border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]', 
      delay: 10 
    },
    { 
      name: 'Bubble', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="7" r="4" />
          <circle cx="6" cy="17" r="3" />
          <circle cx="17" cy="16" r="3" />
        </svg>
      ),
      color: 'text-indigo-400 border-indigo-400/30 hover:border-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.2)]', 
      delay: 15 
    },
    { 
      name: 'Flask', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10 2h4M12 2v7M8.5 7.5h7" />
          <path d="M14 9.3v8.2a2.5 2.5 0 1 1-4 0V9.3C10 7.8 14 7.8 14 9.3z" />
        </svg>
      ),
      color: 'text-emerald-400 border-emerald-400/30 hover:border-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.2)]', 
      delay: 20 
    },
    { 
      name: 'Postgres', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="12" cy="5" rx="9" ry="3" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
        </svg>
      ),
      color: 'text-blue-400 border-blue-400/30 hover:border-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.2)]', 
      delay: 25 
    }
  ];

  const handleScroll = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-vh-100 flex items-center pt-28 pb-16 overflow-hidden">
      {/* Space Background & Glowing nodes */}
      <div className="grid-bg" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Copy (Left) */}
          <div className="lg:col-span-7 flex flex-col text-center lg:text-left items-center lg:items-start">
            
            {/* Animated Greeting Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-xs font-semibold uppercase tracking-wider mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
              <span>Available for Freelance & Full-time Hire</span>
            </motion.div>

            {/* Name Header */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight"
            >
              I'm <span className="gradient-text">Jezua Palma</span>
            </motion.h1>

            {/* Career/Role typing tag */}
            <div className="h-16 sm:h-12 flex items-center mt-3 mb-6">
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-400 max-w-lg leading-relaxed">
                {typedTitle}
                <span className="inline-block w-[3px] h-[18px] bg-neon-cyan ml-1 animate-pulse" />
              </p>
            </div>

            {/* Professional Summary */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mb-8"
            >
              Passionate Developer & Designer and low-code expert creating premium system architectures. Leveraging advanced AI tools and prompt engineering to deliver elegant, secure, and lightning-fast web services that drive business growth.
            </motion.p>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 mb-8 w-full sm:w-auto"
            >
              <a 
                href="#projects" 
                onClick={(e) => handleScroll(e, '#projects')}
                className="gradient-btn px-6 py-3 rounded-lg flex items-center justify-center space-x-2 group text-sm sm:text-base"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a 
                href="assets/cv.pdf" 
                download
                className="px-6 py-3 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 flex items-center justify-center space-x-2 transition-all duration-300 text-sm sm:text-base"
              >
                <FileText className="w-4 h-4 text-neon-violet" />
                <span>Download Resume</span>
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleScroll(e, '#contact')}
                className="px-6 py-3 rounded-lg border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300 text-sm sm:text-base flex items-center justify-center"
              >
                <span>Contact Me</span>
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex space-x-4"
            >
              {socials.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-2.5 rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${item.color}`}
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </motion.div>

          </div>

          {/* Interactive Code Terminal & Portrait (Right) */}
          <div className="lg:col-span-5 relative flex justify-center items-center">
            
            {/* Orbiting Tech SVG Icons */}
            <div className="absolute inset-0 z-0 pointer-events-none hidden sm:block">
              {techIcons.map((ico, idx) => (
                <div
                  key={idx}
                  className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center bg-[#030014]/95 border text-xs font-semibold select-none pointer-events-auto hover:scale-125 transition-transform duration-200 cursor-default ${ico.color} ${
                    idx % 3 === 0 ? 'animate-orbit-1' : idx % 3 === 1 ? 'animate-orbit-2' : 'animate-orbit-3'
                  }`}
                  style={{ animationDelay: `-${ico.delay}s` }}
                  title={ico.name}
                >
                  {ico.icon}
                </div>
              ))}
            </div>

            {/* Profile & Code Terminal Stack */}
            <div className="relative z-10 w-full max-w-[420px] flex flex-col space-y-6">
              
              {/* Circular Portrait with Neon Orbit */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative group mx-auto flex justify-center items-center"
              >
                {/* Neon blur orbit halo */}
                <div className="absolute w-[210px] h-[210px] rounded-full bg-gradient-to-tr from-neon-cyan via-neon-violet to-neon-fuchsia opacity-40 blur-xl group-hover:scale-115 transition-transform duration-500" />
                <div className="absolute w-[204px] h-[204px] rounded-full bg-gradient-to-tr from-neon-cyan via-neon-violet to-neon-fuchsia animate-spin-slow" />
                
                {/* Actual Portrait Mask */}
                <div className="w-[196px] h-[196px] rounded-full overflow-hidden border-[4px] border-[#030014] z-10 bg-dark-card flex items-center justify-center">
                  <img 
                    src="/assets/profile.jpg" 
                    alt="Jezua Palma Portrait" 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => { e.target.src = "https://placehold.co/400x400/1e1e2f/ffffff?text=Jezua+Palma" }}
                  />
                </div>
              </motion.div>

              {/* Developer Terminal Box */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="w-full glass-panel rounded-xl shadow-2xl border border-white/10 overflow-hidden text-left"
              >
                {/* Terminal Header */}
                <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                  <div className="flex space-x-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-[11px] font-mono text-gray-500">jezua@portfolio:~$</span>
                </div>
                
                {/* Terminal Body */}
                <div className="p-5 font-mono text-[12px] sm:text-[13px] leading-relaxed text-gray-300 space-y-2 select-none">
                  <div>
                    <span className="text-neon-cyan">const</span> <span className="text-amber-400">developer</span> = &#123;
                  </div>
                  <div className="pl-4">
                    <span className="text-neon-violet">name</span>: <span className="text-emerald-400">"Jezua Palma"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-neon-violet">title</span>: <span className="text-emerald-400">"Developer & Designer"</span>,
                  </div>
                  <div className="pl-4">
                    <span className="text-neon-violet">skills</span>: [
                    <span className="text-emerald-400">"React"</span>, 
                    <span className="text-emerald-400">"Python"</span>, 
                    <span className="text-emerald-400">"Bubble"</span>
                    ],
                  </div>
                  <div className="pl-4">
                    <span className="text-neon-violet">inquiries</span>: <span className="text-emerald-400">"Open for Business"</span>
                  </div>
                  <div>&#125;;</div>
                  <div className="pt-2 text-gray-500">
                    // Ready to build the future...
                  </div>
                  <div className="flex items-center text-neon-cyan">
                    <span>&gt; console.log(developer.name);</span>
                    <span className="w-1.5 h-4 bg-neon-cyan ml-1 animate-pulse" />
                  </div>
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
