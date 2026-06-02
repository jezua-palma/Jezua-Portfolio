import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, ArrowRight, Mail } from 'lucide-react';
import { gsap } from 'gsap';

const Hero = () => {
  const [typedTitle, setTypedTitle] = useState('');
  const titles = [
    "Developer & Designer",
    "AI-Assisted Developer",
    "UI/UX Enthusiast",
    "Full Stack Builder"
  ];
  const [titleIdx, setTitleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  
  useEffect(() => {
    let timer;
    const currentFullTitle = titles[titleIdx];
    
    if (isDeleting) {
      // Deleting character by character
      timer = setTimeout(() => {
        setTypedTitle(prev => prev.substring(0, prev.length - 1));
      }, 30);
    } else {
      // Typing character by character
      timer = setTimeout(() => {
        setTypedTitle(currentFullTitle.substring(0, typedTitle.length + 1));
      }, 60);
    }

    // Handle typing state transitions
    if (!isDeleting && typedTitle === currentFullTitle) {
      // Pause at the end of typing before deleting
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, 2000);
    } else if (isDeleting && typedTitle === '') {
      // Switch to next title index once erased
      setIsDeleting(false);
      setTitleIdx(prev => (prev + 1) % titles.length);
    }

    return () => clearTimeout(timer);
  }, [typedTitle, isDeleting, titleIdx]);

  // GSAP 3D Hover & Parallax Mouse Tracking Effect
  useEffect(() => {
    const deck = document.querySelector('.hero-right-deck');
    const stack = document.querySelector('.preserve-3d-stack');
    const portrait = document.querySelector('.hero-portrait-wrapper');
    const terminal = document.querySelector('.hero-terminal-wrapper');
    const scanner = document.querySelector('.scanner-container');
    const tag1 = document.querySelector('.telemetry-tag-1');
    const tag2 = document.querySelector('.telemetry-tag-2');
    const tag3 = document.querySelector('.telemetry-tag-3');

    const handleMouseMove = (e) => {
      if (!deck) return;
      const rect = deck.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Holographic card sheen percentage
      const percentX = ((e.clientX - rect.left) / rect.width) * 100;
      const percentY = ((e.clientY - rect.top) / rect.height) * 100;

      // Update glossy reflection coordinates
      const terminalEl = document.querySelector('.hero-terminal-wrapper .glass-panel');
      if (terminalEl) {
        terminalEl.style.setProperty('--shine-x', `${percentX}%`);
        terminalEl.style.setProperty('--shine-y', `${percentY}%`);
      }

      // Max 14 degrees tilting on the main plane
      const tiltX = -(y / (rect.height / 2)) * 14;
      const tiltY = (x / (rect.width / 2)) * 14;

      // Tilt entire structural deck
      gsap.to(stack, {
        rotateX: tiltX,
        rotateY: tiltY,
        duration: 0.35,
        ease: 'power2.out',
      });

      // Parallax shearing offset speeds on separate depth levels
      gsap.to(portrait, {
        x: x * 0.05,
        y: y * 0.05,
        duration: 0.35,
        ease: 'power2.out',
      });

      gsap.to(terminal, {
        x: x * 0.11,
        y: y * 0.11,
        duration: 0.35,
        ease: 'power2.out',
      });

      gsap.to(scanner, {
        x: x * 0.02,
        y: y * 0.02,
        duration: 0.35,
        ease: 'power2.out',
      });

      // Hologram depth tags move in negative or different directions
      if (tag1) gsap.to(tag1, { x: -x * 0.03, y: -y * 0.03, duration: 0.35, ease: 'power2.out' });
      if (tag2) gsap.to(tag2, { x: x * 0.07, y: -y * 0.07, duration: 0.35, ease: 'power2.out' });
      if (tag3) gsap.to(tag3, { x: -x * 0.05, y: y * 0.05, duration: 0.35, ease: 'power2.out' });
    };

    const handleMouseLeave = () => {
      gsap.to([stack, portrait, terminal, scanner, tag1, tag2, tag3], {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.85,
        ease: 'elastic.out(1, 0.65)',
      });
    };

    if (deck) {
      deck.addEventListener('mousemove', handleMouseMove);
      deck.addEventListener('mouseleave', handleMouseLeave);
    }

    // Magnetic buttons and social icons
    const magneticListeners = [];
    const magneticElements = document.querySelectorAll('.magnetic-target');
    magneticElements.forEach(btn => {
      const handleMagnetMove = (e) => {
        const bound = btn.getBoundingClientRect();
        const mouseX = e.clientX - (bound.left + bound.width / 2);
        const mouseY = e.clientY - (bound.top + bound.height / 2);
        
        gsap.to(btn, {
          x: mouseX * 0.35,
          y: mouseY * 0.35,
          duration: 0.3,
          ease: 'power2.out'
        });
      };
      
      const handleMagnetLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: 'elastic.out(1.1, 0.5)'
        });
      };

      btn.addEventListener('mousemove', handleMagnetMove);
      btn.addEventListener('mouseleave', handleMagnetLeave);
      magneticListeners.push({ btn, handleMagnetMove, handleMagnetLeave });
    });

    return () => {
      if (deck) {
        deck.removeEventListener('mousemove', handleMouseMove);
        deck.removeEventListener('mouseleave', handleMouseLeave);
      }
      magneticListeners.forEach(({ btn, handleMagnetMove, handleMagnetLeave }) => {
        if (btn) {
          btn.removeEventListener('mousemove', handleMagnetMove);
          btn.removeEventListener('mouseleave', handleMagnetLeave);
        }
      });
    };
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
      color: 'hover:text-white hover:border-white shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
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
      color: 'hover:text-neon-cyan hover:border-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.15)]' 
    },
    { 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ), 
      href: 'https://www.facebook.com/jezua.palma', 
      label: 'Facebook', 
      color: 'hover:text-blue-500 hover:border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.15)]' 
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
      color: 'hover:text-neon-rose hover:border-neon-rose shadow-[0_0_15px_rgba(244,63,94,0.15)]' 
    },
    { icon: <Mail className="w-5 h-5" />, href: 'mailto:jezuapalma@gmail.com', label: 'Email', color: 'hover:text-neon-violet hover:border-neon-violet shadow-[0_0_15px_rgba(139,92,246,0.15)]' }
  ];

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

  const handleScrollToSection = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden">
      {/* Grid overlay mask background */}
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
              className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-xs font-semibold uppercase tracking-wider mb-6 cursor-default"
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
              I'm <span className="gradient-text text-glow-cyan">Jezua Palma</span>
            </motion.h1>

            {/* Career/Role typing tag */}
            <div className="h-16 sm:h-12 flex items-center mt-3 mb-6">
              <p className="text-lg sm:text-xl md:text-2xl font-medium text-gray-300 max-w-lg leading-relaxed font-sans">
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
                onClick={(e) => handleScrollToSection(e, '#projects')}
                className="magnetic-target gradient-btn px-6 py-3 rounded-lg flex items-center justify-center space-x-2 group text-sm sm:text-base cursor-pointer shadow-indigo-500/20 hover:shadow-indigo-500/40"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
              <a 
                href="assets/cv.pdf" 
                download
                className="magnetic-target px-6 py-3 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 flex items-center justify-center space-x-2 transition-all duration-300 text-sm sm:text-base cursor-pointer"
              >
                <FileText className="w-4 h-4 text-neon-violet" />
                <span>Download Resume</span>
              </a>
              <a 
                href="#contact" 
                onClick={(e) => handleScrollToSection(e, '#contact')}
                className="magnetic-target px-6 py-3 rounded-lg border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan hover:bg-neon-cyan/10 transition-all duration-300 text-sm sm:text-base flex items-center justify-center cursor-pointer"
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
                  className={`magnetic-target p-2.5 rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${item.color}`}
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
              ))}
            </motion.div>

          </div>

          {/* Interactive Code Terminal & Portrait (Right Column redesigned as overlapping 3D Parallax Deck) */}
          <div className="hero-right-deck lg:col-span-5 relative flex justify-center items-center perspective-1000 w-full min-h-[520px] py-12 select-none">
            
            {/* Cybernetic 3D perspective background grid */}
            <div className="cyber-grid-3d absolute inset-0 z-0 pointer-events-none" />

            {/* Orbiting Tech SVG Icons */}
            <div className="absolute inset-0 z-10 pointer-events-none hidden sm:block">
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

            {/* Main 3D Parallax Stack Container */}
            <div className="preserve-3d-stack relative z-20 w-full max-w-[420px] h-[480px] flex items-center justify-center preserve-3d">
              
              {/* Holographic scanner laser sweep wrapped in a drift coordinate helper */}
              <div className="scanner-container absolute w-[320px] h-[320px] flex items-center justify-center z-0 preserve-3d pointer-events-none -translate-y-12">
                <div className="cyber-scanner-ring w-[290px] h-[290px]" />
                <div className="cyber-scanner-ring w-[240px] h-[240px] border-solid opacity-20" />
                <div className="cyber-scanner-sweep w-[290px] h-[290px]" />
              </div>

              {/* Floating holographic hardware metrics */}
              <div className="telemetry-tag-1 absolute top-2 left-[-10px] depth-layer-base text-neon-cyan/60 font-mono text-[10px] tracking-widest border border-neon-cyan/25 px-2 py-0.5 rounded bg-neon-cyan/5 uppercase animate-pulse">
                Sys.Status: Active
              </div>
              <div className="telemetry-tag-2 absolute top-14 right-[-10px] depth-layer-high text-neon-rose/60 font-mono text-[10px] tracking-widest border border-neon-rose/25 px-2 py-0.5 rounded bg-neon-rose/5 uppercase">
                AI.Nodes: Online
              </div>
              <div className="telemetry-tag-3 absolute bottom-36 left-[-20px] depth-layer-mid text-neon-violet/60 font-mono text-[10px] tracking-widest border border-neon-violet/25 px-2 py-0.5 rounded bg-neon-violet/5 uppercase">
                Sec.Bridge: SSL_v3
              </div>

              {/* Circular Portrait with Neon Orbit */}
              <div className="hero-portrait-wrapper absolute top-4 w-[230px] h-[230px] z-10 flex justify-center items-center depth-card preserve-3d">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="relative group mx-auto flex justify-center items-center preserve-3d"
                >
                  {/* Neon blur orbit halo */}
                  <div className="absolute w-[236px] h-[236px] rounded-full bg-gradient-to-tr from-neon-cyan via-neon-violet to-neon-fuchsia opacity-40 blur-xl group-hover:scale-115 transition-transform duration-500" />
                  <div className="absolute w-[230px] h-[230px] rounded-full bg-gradient-to-tr from-neon-cyan via-neon-violet to-neon-fuchsia animate-spin-slow" />
                  
                  {/* Portrait Mask */}
                  <div className="depth-layer-mid w-[220px] h-[220px] rounded-full overflow-hidden border-[4px] border-[#030014] z-10 bg-dark-card flex items-center justify-center">
                    <img 
                      src="/assets/profile.jpg" 
                      alt="Jezua Palma Portrait" 
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                      onError={(e) => { e.target.src = "https://placehold.co/400x400/1e1e2f/ffffff?text=Jezua+Palma" }}
                    />
                  </div>
                </motion.div>
              </div>

              {/* Interactive Code Terminal (Absolute overlay translated forward with sheen & scanlines) */}
              <div className="hero-terminal-wrapper absolute bottom-2 w-full z-20 depth-card shadow-[0_20px_50px_rgba(3,0,20,0.85)] border border-white/10 rounded-xl overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="w-full glass-panel rounded-xl overflow-hidden text-left preserve-3d relative"
                >
                  {/* Interactive glossy mirror reflection overlay */}
                  <div className="card-shine-overlay" />
                  <div className="scanlines-overlay" />

                  {/* Terminal Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-[#0c0a24]/90 border-b border-white/5 depth-layer-base">
                    <div className="flex space-x-2">
                      <span className="w-3 h-3 rounded-full bg-red-500/80" />
                      <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                      <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[11px] font-mono text-gray-500 select-none">jezua@portfolio:~$</span>
                  </div>
                  
                  {/* Terminal Body */}
                  <div className="p-5 font-mono text-[12px] sm:text-[13px] leading-relaxed text-gray-300 space-y-2 select-none depth-layer-high">
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
      </div>
    </section>
  );
};

export default Hero;
