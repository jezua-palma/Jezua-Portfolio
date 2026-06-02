import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrintableCV from './components/PrintableCV';
import IntroLoader from './components/IntroLoader';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// 🌌 Holographic 3D Floating Tech Symbols Aligning to Developer & Designer Job (Awwwards-Inspired full-bleed parallax grid)
const techItems = [
  { text: '{ }', top: '10vh', left: '15vw', size: 'text-5xl font-black rotate-[15deg]', depthLayer: 1, color: 'text-neon-cyan/45' },
  { text: '</>', top: '25vh', left: '80vw', size: 'text-6xl font-black -rotate-[12deg]', depthLayer: 2, color: 'text-neon-violet/50' },
  { text: 'React', top: '40vh', left: '48vw', size: 'text-lg font-mono tracking-widest font-black rotate-[8deg]', depthLayer: 3, color: 'text-neon-cyan/40' },
  { text: 'Python', top: '55vh', left: '20vw', size: 'text-2xl font-black font-mono -rotate-[15deg]', depthLayer: 2, color: 'text-neon-violet/45' },
  { text: '=>', top: '70vh', left: '60vw', size: 'text-6xl font-black rotate-[25deg]', depthLayer: 4, color: 'text-neon-fuchsia/60' },
  { text: 'db', top: '85vh', left: '12vw', size: 'text-5xl font-black font-mono -rotate-[8deg]', depthLayer: 1, color: 'text-neon-rose/40' },
  { text: 'ai', top: '18vh', left: '38vw', size: 'text-5xl font-black font-mono rotate-[12deg]', depthLayer: 3, color: 'text-neon-cyan/50' },
  { text: 'Bubble', top: '62vh', left: '85vw', size: 'text-sm font-mono font-black tracking-widest rotate-[5deg]', depthLayer: 2, color: 'text-neon-fuchsia/40' },
  { text: 'JSON', top: '30vh', left: '68vw', size: 'text-sm font-mono font-bold -rotate-[20deg]', depthLayer: 1, color: 'text-neon-rose/35' },
  { text: '[ ]', top: '78vh', left: '32vw', size: 'text-5xl font-black rotate-[18deg]', depthLayer: 3, color: 'text-neon-cyan/45' },
  { text: 'Next.js', top: '48vh', left: '86vw', size: 'text-sm font-black font-mono tracking-widest -rotate-[10deg]', depthLayer: 4, color: 'text-neon-violet/50' },
  { text: 'Flask', top: '88vh', left: '42vw', size: 'text-lg font-bold font-mono rotate-[6deg]', depthLayer: 2, color: 'text-neon-cyan/40' },
  { text: 'TypeScript', top: '72vh', left: '18vw', size: 'text-xs font-black font-mono tracking-widest -rotate-[12deg]', depthLayer: 3, color: 'text-neon-fuchsia/35' },
  { text: 'API', top: '5vh', left: '55vw', size: 'text-3xl font-black font-mono rotate-[15deg]', depthLayer: 1, color: 'text-neon-violet/45' },
  { text: 'CSS', top: '92vh', left: '72vw', size: 'text-4xl font-black -rotate-[15deg]', depthLayer: 1, color: 'text-neon-rose/35' },
  { text: 'HTML', top: '12vh', left: '82vw', size: 'text-2xl font-black font-mono rotate-[10deg]', depthLayer: 3, color: 'text-neon-cyan/40' }
];

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState('dark-dashboard'); // 'dark-dashboard' vs 'white-cv'
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 }); // Fraction coordinates (-0.5 to 0.5) for smooth 3D tilt
  const [cursorHovered, setCursorHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const canvasRef = useRef(null);

  // Scroll Parallax Hooks (for viewport-fixed glowing spheres)
  const { scrollYProgress } = useScroll();
  const floatY1 = useTransform(scrollYProgress, [0, 1], [-150, 450]);
  const floatY2 = useTransform(scrollYProgress, [0, 1], [400, -400]);
  const floatY3 = useTransform(scrollYProgress, [0, 1], [-300, 600]);
  const rotateGlow = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const opacityGlow = useTransform(scrollYProgress, [0, 0.5, 1], [0.35, 0.7, 0.4]);
  const scale1 = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.4, 0.95]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 0.85, 1.45]);

  // Deep Parallax Scroll Layers (variance speeds for 3D layout simulation)
  const scrollDepth1 = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const scrollDepth2 = useTransform(scrollYProgress, [0, 1], [-200, 200]);
  const scrollDepth3 = useTransform(scrollYProgress, [0, 1], [-400, 400]);
  const scrollDepth4 = useTransform(scrollYProgress, [0, 1], [-600, 600]);

  // Scroll wire drawing height motion value
  const scrollWireHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Top-level hooks for glowing section junction nodes to comply with Rules of Hooks
  const nodeOpacity1 = useTransform(scrollYProgress, [0.05, 0.1, 0.15], [0.15, 1, 0.15]);
  const nodeScale1 = useTransform(scrollYProgress, [0.05, 0.1, 0.15], [0.8, 1.4, 0.8]);

  const nodeOpacity2 = useTransform(scrollYProgress, [0.17, 0.22, 0.27], [0.15, 1, 0.15]);
  const nodeScale2 = useTransform(scrollYProgress, [0.17, 0.22, 0.27], [0.8, 1.4, 0.8]);

  const nodeOpacity3 = useTransform(scrollYProgress, [0.3, 0.35, 0.4], [0.15, 1, 0.15]);
  const nodeScale3 = useTransform(scrollYProgress, [0.3, 0.35, 0.4], [0.8, 1.4, 0.8]);

  const nodeOpacity4 = useTransform(scrollYProgress, [0.45, 0.5, 0.55], [0.15, 1, 0.15]);
  const nodeScale4 = useTransform(scrollYProgress, [0.45, 0.5, 0.55], [0.8, 1.4, 0.8]);

  const nodeOpacity5 = useTransform(scrollYProgress, [0.6, 0.65, 0.7], [0.15, 1, 0.15]);
  const nodeScale5 = useTransform(scrollYProgress, [0.6, 0.65, 0.7], [0.8, 1.4, 0.8]);

  const nodeOpacity6 = useTransform(scrollYProgress, [0.73, 0.78, 0.83], [0.15, 1, 0.15]);
  const nodeScale6 = useTransform(scrollYProgress, [0.73, 0.78, 0.83], [0.8, 1.4, 0.8]);

  const nodeOpacity7 = useTransform(scrollYProgress, [0.87, 0.92, 0.97], [0.15, 1, 0.15]);
  const nodeScale7 = useTransform(scrollYProgress, [0.87, 0.92, 0.97], [0.8, 1.4, 0.8]);

  const nodes = [
    { pct: 0.1, opacity: nodeOpacity1, scale: nodeScale1 },
    { pct: 0.22, opacity: nodeOpacity2, scale: nodeScale2 },
    { pct: 0.35, opacity: nodeOpacity3, scale: nodeScale3 },
    { pct: 0.5, opacity: nodeOpacity4, scale: nodeScale4 },
    { pct: 0.65, opacity: nodeOpacity5, scale: nodeScale5 },
    { pct: 0.78, opacity: nodeOpacity6, scale: nodeScale6 },
    { pct: 0.92, opacity: nodeOpacity7, scale: nodeScale7 },
  ];

  const getScrollTransform = (layer) => {
    switch (layer) {
      case 1: return scrollDepth1;
      case 2: return scrollDepth2;
      case 3: return scrollDepth3;
      case 4: return scrollDepth4;
      default: return scrollDepth2;
    }
  };

  // Global HTML5 Cybernetic Particle Canvas Engine
  useEffect(() => {
    if (isLoading || theme !== 'dark-dashboard') return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let animationFrameId;
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Scroll velocity tracking
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      scrollVelocity += currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Cyber particle configuration
    const particles = [];
    const particleCount = 75; // increased for screen-wide coverage
    const connectionDistance = 120;
    
    const colors = [
      'rgba(0, 240, 255, ',   // Neon Cyan
      'rgba(139, 92, 246, ',  // Neon Violet
      'rgba(244, 63, 94, ',   // Neon Rose
    ];

    class Particle {
      constructor() {
        this.reset(true);
      }

      reset(init = false) {
        this.x = Math.random() * width;
        this.y = init ? Math.random() * height : (Math.random() > 0.5 ? -10 : height + 10);
        this.vx = (Math.random() - 0.5) * 0.45;
        this.vy = (Math.random() - 0.5) * 0.45;
        this.radius = Math.random() * 1.5 + 1; // 1px to 2.5px
        this.colorPrefix = colors[Math.floor(Math.random() * colors.length)];
        this.baseAlpha = Math.random() * 0.3 + 0.12;
        this.alpha = this.baseAlpha;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Apply scroll drift velocity page-wide
        this.y -= scrollVelocity * 0.08;

        // Mouse gravity pull
        if (mouse.active) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200) {
            const force = (200 - dist) / 200;
            this.vx += (dx / dist) * force * 0.035;
            this.vy += (dy / dist) * force * 0.035;
            
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (speed > 1.6) {
              this.vx = (this.vx / speed) * 1.6;
              this.vy = (this.vy / speed) * 1.6;
            }
            this.alpha = Math.min(0.85, this.baseAlpha + force * 0.45);
          } else {
            this.vx *= 0.96;
            this.vy *= 0.96;
            this.alpha += (this.baseAlpha - this.alpha) * 0.06;
          }
        } else {
          this.alpha += (this.baseAlpha - this.alpha) * 0.06;
        }

        // Screen boundary safety wrap (fixed coords)
        if (this.x < -30 || this.x > width + 30 || this.y < -30 || this.y > height + 30) {
          this.reset(false);
        }
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${this.colorPrefix}${this.alpha})`;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      scrollVelocity *= 0.92;

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      // Render networking vector lines
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDistance) {
            const force = (connectionDistance - dist) / connectionDistance;
            const opacity = Math.min(p1.alpha, p2.alpha) * force * 0.3;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.lineWidth = 0.5;
            ctx.strokeStyle = `rgba(139, 92, 246, ${opacity})`;
            ctx.stroke();
          }
        }

        // Starburst cursor connection page-wide
        if (mouse.active) {
          const dx = p1.x - mouse.x;
          const dy = p1.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const force = (150 - dist) / 150;
            const opacity = force * 0.35;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.lineWidth = 0.55;
            ctx.strokeStyle = `rgba(0, 240, 255, ${opacity})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isLoading, theme]);

  // GSAP ScrollTrigger dynamic scroll circuit path wire & node pulse triggers
  useEffect(() => {
    if (isLoading || theme !== 'dark-dashboard') return;

    const ctx = gsap.context(() => {
      // 1. Draw circuit line based on page scroll progress
      gsap.fromTo('.scroll-wire-active',
        { height: '0%' },
        {
          height: '100%',
          ease: 'none',
          scrollTrigger: {
            trigger: '.dashboard-content',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.5,
          }
        }
      );

      // 2. Animate nodes as they scroll into view
      const nodeElements = gsap.utils.toArray('.circuit-node');
      nodeElements.forEach((node) => {
        gsap.fromTo(node.querySelector('.pulse-glow'),
          { opacity: 0.15, scale: 0.9 },
          {
            opacity: 1,
            scale: 1.4,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: node,
              start: 'top 75%',
              end: 'top 45%',
              scrub: true,
            }
          }
        );
      });
    });

    return () => ctx.revert();
  }, [isLoading, theme]);

  useEffect(() => {
    // 1. Loader is managed by IntroLoader component, no auto-dismiss timer.

    // 2. Cursor position tracking
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      // Fractional centering for smooth 3D parallax shifts
      setMouseOffset({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5
      });
    };

    // 3. Mobile screen match check
    const mediaCheck = window.matchMedia('(max-width: 1024px)');
    setIsMobile(mediaCheck.matches);
    const handleMediaChange = (e) => setIsMobile(e.matches);

    window.addEventListener('mousemove', handleMouseMove);
    mediaCheck.addEventListener('change', handleMediaChange);

    // 4. Global Hover & Magnetic listeners
    const addHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, [role="button"], select, textarea, input, .project-card, .glass-panel-hover');
      targets.forEach(tar => {
        tar.addEventListener('mouseenter', () => setCursorHovered(true));
        tar.addEventListener('mouseleave', () => setCursorHovered(false));
      });

      // Central magnetic hover physics tracking
      const magneticTargets = document.querySelectorAll('.magnetic-target');
      magneticTargets.forEach(btn => {
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
      });
    };

    // Delay a bit to wait for DOM nodes to print
    const hoverTimer = setTimeout(addHoverListeners, 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hoverTimer);
      window.removeEventListener('mousemove', handleMouseMove);
      mediaCheck.removeEventListener('change', handleMediaChange);
    };
  }, [isLoading, theme]);

  return (
    <>
      {/* Dynamic Custom Liquid Cursor (Desktop only, Dashboard only) */}
      {!isMobile && !isLoading && theme === 'dark-dashboard' && (
        <>
          <div 
            className="custom-cursor" 
            style={{ 
              left: `${mousePosition.x}px`, 
              top: `${mousePosition.y}px`,
              width: cursorHovered ? '45px' : '20px',
              height: cursorHovered ? '45px' : '20px',
              background: cursorHovered 
                ? 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, rgba(217,70,239,0.15) 70%, rgba(0,0,0,0) 100%)' 
                : 'radial-gradient(circle, rgba(0,240,255,0.4) 0%, rgba(139,92,246,0.2) 60%, rgba(0,0,0,0) 100%)',
              border: cursorHovered ? '1px solid rgba(217,70,239,0.3)' : '1px solid rgba(0,240,255,0.2)'
            }}
          />
          <div 
            className="custom-cursor-dot"
            style={{ 
              left: `${mousePosition.x}px`, 
              top: `${mousePosition.y}px`
            }}
          />
        </>
      )}

      {/* Entry Loading Animation */}
      <AnimatePresence>
        {isLoading && (
          <IntroLoader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Core Content Wrapper */}
      {!isLoading && (
        <AnimatePresence mode="wait">
          {theme === 'dark-dashboard' ? (
            
            // 🌌 1. IMMERSIVE CYBER-DECK DASHBOARD THEME (Dark Mode Default)
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
              className="relative min-h-screen"
            >
              {/* Global Cybernetic Particle Canvas Background */}
              <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none opacity-45 mix-blend-screen" />

              {/* Scroll-linked glowing background mesh elements */}
              <motion.div 
                style={{ y: floatY1, scale: scale1, rotate: rotateGlow, opacity: opacityGlow }}
                className="fixed w-[600px] h-[600px] rounded-full bg-neon-indigo/20 blur-[130px] -top-20 -left-20 pointer-events-none z-[-1]" 
              />
              <motion.div 
                style={{ y: floatY2, scale: scale2, rotate: rotateGlow, opacity: opacityGlow }}
                className="fixed w-[700px] h-[700px] rounded-full bg-neon-cyan/15 blur-[150px] top-[15%] -right-40 pointer-events-none z-[-1]" 
              />
              <motion.div 
                style={{ y: floatY3, scale: scale2, rotate: rotateGlow, opacity: opacityGlow }}
                className="fixed w-[500px] h-[500px] rounded-full bg-neon-fuchsia/12 blur-[120px] bottom-[25%] left-10 pointer-events-none z-[-1]" 
              />
              <motion.div 
                style={{ y: floatY1, scale: scale1, rotate: rotateGlow, opacity: opacityGlow }}
                className="fixed w-[600px] h-[600px] rounded-full bg-neon-rose/8 blur-[140px] bottom-[-100px] right-[10%] pointer-events-none z-[-1]" 
              />

              <div className="dashboard-content w-full relative">
                {/* Scroll-Drawing Neon Circuit Path Wire & Junction Nodes using native GSAP ScrollTrigger */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-[-1]">
                  <div className="absolute left-[4%] sm:left-[6%] top-0 bottom-0 w-[2px] bg-white/[0.03]" />
                  <div 
                    className="scroll-wire-active absolute left-[4%] sm:left-[6%] top-0 w-[2px] bg-gradient-to-b from-neon-cyan via-neon-violet to-neon-fuchsia shadow-[0_0_15px_rgba(0,240,255,0.7),_0_0_5px_rgba(139,92,246,0.5)] origin-top h-0"
                  />

                  {/* Glowing circuit junction nodes positioned accurately relative to full height */}
                  {nodes.map((node, idx) => (
                    <div 
                      key={idx}
                      style={{ top: `${node.pct * 100}%` }}
                      className="circuit-node absolute left-[4%] sm:left-[6%] -translate-x-[4px] w-2.5 h-2.5 rounded-full bg-[#030014] border border-white/20"
                    >
                      <div 
                        className="pulse-glow w-full h-full rounded-full bg-neon-cyan shadow-[0_0_8px_#00F0FF,0_0_15px_#00F0FF] opacity-15 scale-90 transition-all duration-300"
                      />
                    </div>
                  ))}
                </div>

                {/* 3D Holographic Parallax Tech Stack Symbols (Viewport-Fixed Field) */}
                {!isMobile && (
                  <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] select-none">
                    {techItems.map((item, idx) => {
                      const scrollTransform = getScrollTransform(item.depthLayer);
                      const mouseMultiplier = item.depthLayer * 35;
                      const translateX = -mouseOffset.x * mouseMultiplier;
                      const translateY = -mouseOffset.y * mouseMultiplier;
                      return (
                        <div
                          key={idx}
                          style={{
                            position: 'fixed',
                            top: item.top,
                            left: item.left,
                            transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                            transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                            willChange: 'transform',
                            zIndex: -1
                          }}
                          className="hidden md:block pointer-events-none select-none"
                        >
                          <motion.div
                            style={{
                              y: scrollTransform
                            }}
                            className={`${item.size} ${item.color} text-glow-neon select-none font-sans`}
                          >
                            {item.text}
                          </motion.div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Floating Dock Header */}
                <Navbar theme={theme} setTheme={setTheme} />

                {/* Interactive Dashboard stack */}
                <main>
                  <Hero />
                  <About />
                  <Skills />
                  <Projects />
                  <Experience />
                  <Certificates />
                  <Services />
                  <Testimonials />
                  <Contact />
                </main>

                {/* Footer */}
                <Footer />
              </div>
            </motion.div>
          ) : (
            
            // 📄 2. MINIMALIST FACT-SHEET PRINTABLE CV THEME (White Mode Switch)
            <motion.div
              key="cv"
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, filter: 'blur(10px)' }}
              transition={{ duration: 0.5 }}
            >
              {/* Back Nav controls */}
              <Navbar theme={theme} setTheme={setTheme} />
              
              <main className="pt-20">
                <PrintableCV onBack={() => setTheme('dark-dashboard')} />
              </main>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}

export default App;
