import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
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

  useEffect(() => {
    // 1. Initial page loader mock
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1850);

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

    // 4. Global Hover listeners
    const addHoverListeners = () => {
      const targets = document.querySelectorAll('a, button, [role="button"], select, textarea, input, .project-card, .glass-panel-hover');
      targets.forEach(tar => {
        tar.addEventListener('mouseenter', () => setCursorHovered(true));
        tar.addEventListener('mouseleave', () => setCursorHovered(false));
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
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            className="fixed inset-0 z-[9999] bg-[#030014] flex flex-col items-center justify-center font-mono select-none"
          >
            <div className="space-y-4 text-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                className="w-12 h-12 rounded-full border-[3px] border-neon-cyan/20 border-t-neon-cyan mx-auto"
              />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xs sm:text-sm font-semibold tracking-widest text-gray-500 uppercase mt-4"
              >
                Initializing Systems...
              </motion.div>
            </div>
          </motion.div>
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

              {/* Scroll-Drawing Neon Circuit Path Wire */}
              <div className="absolute left-[4%] sm:left-[6%] top-0 bottom-0 w-[2px] bg-white/[0.03] pointer-events-none z-[-1]" />
              <motion.div 
                style={{ height: scrollWireHeight }}
                className="absolute left-[4%] sm:left-[6%] top-0 w-[2px] bg-gradient-to-b from-neon-cyan via-neon-violet to-neon-fuchsia shadow-[0_0_15px_rgba(0,240,255,0.7),_0_0_5px_rgba(139,92,246,0.5)] z-[-1] pointer-events-none"
              />

              {/* Glowing circuit junction nodes that pulse as user scrolls past */}
              {nodes.map((node, idx) => (
                <div 
                  key={idx}
                  style={{ top: `${node.pct * 100}%` }}
                  className="absolute left-[4%] sm:left-[6%] -translate-x-[4px] w-2.5 h-2.5 rounded-full bg-[#030014] border border-white/20 z-[-1] pointer-events-none"
                >
                  <motion.div 
                    style={{
                      opacity: node.opacity,
                      scale: node.scale
                    }}
                    className="w-full h-full rounded-full bg-neon-cyan shadow-[0_0_8px_#00F0FF,0_0_15px_#00F0FF]"
                  />
                </div>
              ))}

              {/* 3D Holographic Parallax Tech Stack Symbols (Viewport-Fixed Field) */}
              {!isMobile && (
                <div className="fixed inset-0 pointer-events-none overflow-hidden z-[-1] select-none">
                  {techItems.map((item, idx) => {
                    const scrollTransform = getScrollTransform(item.depthLayer);
                    const mouseMultiplier = item.depthLayer * 35;
                    const translateX = -mouseOffset.x * mouseMultiplier;
                    const translateY = -mouseOffset.y * mouseMultiplier;
                    return (
                      <motion.div
                        key={idx}
                        style={{
                          y: scrollTransform,
                          position: 'fixed',
                          top: item.top,
                          left: item.left,
                          transform: `translate3d(${translateX}px, ${translateY}px, 0)`,
                          transition: 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                          willChange: 'transform'
                        }}
                        className={`hidden md:block ${item.size} ${item.color} text-glow-neon select-none font-sans`}
                      >
                        {item.text}
                      </motion.div>
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
