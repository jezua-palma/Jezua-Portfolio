import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Cpu, Play } from 'lucide-react';

const IntroLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [bootStep, setBootStep] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isGlitching, setIsGlitching] = useState(false);
  const videoRef = useRef(null);

  // Simulated cyber logs
  const logMessages = [
    'CORPUS CONNECTION ESTABLISHED [PORT: 8080]',
    'DECRYPTING PORTFOLIO SECURE DECK...',
    'INJECTING DESIGN SYSTEM CONFIGS...',
    'LOADING HIGH-FIDELITY PARALLAX LAYERS...',
    'ESTABLISHING GLITCH CORE ALIGNMENTS...',
    'NEURAL LINK ONLINE: READY FOR INITIALIZATION'
  ];

  // Mouse tilt logic for 3D card
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Coordinates normalized between -0.5 and 0.5
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      
      setMousePos({ x: e.clientX, y: e.clientY });
      setRotation({
        x: -y * 18, // tilt on horizontal axis (pitch)
        y: x * 18   // tilt on vertical axis (yaw)
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Progress loader timer
  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Add random progress step for a realistic loading feel
      const increment = Math.floor(Math.random() * 8) + 4;
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      // Advance log steps based on progress milestones
      if (currentProgress > 85) setBootStep(5);
      else if (currentProgress > 65) setBootStep(4);
      else if (currentProgress > 45) setBootStep(3);
      else if (currentProgress > 25) setBootStep(2);
      else if (currentProgress > 10) setBootStep(1);

      if (currentProgress === 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsReady(true);
        }, 300);
      }
    }, 120);

    return () => clearInterval(interval);
  }, []);

  // Handle entry boot click with a brief digital glitch before transition
  const handleBoot = () => {
    setIsGlitching(true);
    // Play any audio sync if needed or proceed directly after visual glitch duration
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#02000c] flex items-center justify-center font-mono select-none">
      
      {/* 1. Holographic Scanline & Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.12)_0%,rgba(0,0,0,0)_75%)] pointer-events-none z-10" />
      
      {/* Subtle background tech symbols */}
      <div className="absolute inset-0 opacity-10 flex flex-wrap gap-12 p-8 justify-around items-center pointer-events-none text-neon-cyan/20 text-xs">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.4}s` }}>
            {`0x${(i * 47).toString(16).toUpperCase()} // LINK_OK`}
          </div>
        ))}
      </div>

      {/* Skip Button */}
      <button 
        onClick={onComplete}
        className="absolute top-6 right-6 z-50 text-[10px] sm:text-xs text-gray-500 hover:text-neon-cyan border border-white/10 hover:border-neon-cyan/40 bg-white/5 hover:bg-neon-cyan/5 px-3 py-1.5 rounded-md transition-all duration-300 tracking-widest cursor-pointer select-none"
      >
        SKIP_BOOT_SEQUENCE &rarr;
      </button>

      {/* 2. Interactive 3D Perspective Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[92vw] max-w-[550px] aspect-[4/3] rounded-2xl border border-white/10 bg-black/60 shadow-[0_0_50px_rgba(0,240,255,0.05)] overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_60px_rgba(0,240,255,0.1)] flex flex-col p-6 cursor-default"
      >
        
        {/* Holographic glowing borders & corners in 3D */}
        <div className="absolute inset-0 border border-neon-cyan/20 rounded-2xl pointer-events-none" />
        
        {/* Diagnostic crosshairs */}
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-neon-cyan/50 pointer-events-none" style={{ transform: 'translateZ(20px)' }} />
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-neon-cyan/50 pointer-events-none" style={{ transform: 'translateZ(20px)' }} />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-neon-cyan/50 pointer-events-none" style={{ transform: 'translateZ(20px)' }} />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-neon-cyan/50 pointer-events-none" style={{ transform: 'translateZ(20px)' }} />

        {/* 3. Looping Matroska (.mkv) Video Display Block */}
        <div className="absolute inset-0 w-full h-full opacity-40 z-0 pointer-events-none mix-blend-screen overflow-hidden rounded-2xl">
          <video
            ref={videoRef}
            src="/assets/video.mkv"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
          {/* Cyan/Rose screen gradient tint */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
        </div>

        {/* 4. Interactive HUD Layout (Floating on translate-Z) */}
        <div className="relative z-10 flex flex-col h-full justify-between" style={{ transform: 'translateZ(30px)' }}>
          
          {/* Loader Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-neon-cyan animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold text-white tracking-widest uppercase">
                JEZUA_PORTFOLIO_SYSTEM
              </span>
            </div>
            <div className="flex items-center space-x-1.5 bg-neon-cyan/10 border border-neon-cyan/30 px-2 py-0.5 rounded text-[8px] sm:text-[10px] text-neon-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping inline-block" />
              <span>ONLINE</span>
            </div>
          </div>

          {/* Main Content Area: Logs Console */}
          <div className="flex-grow flex flex-col justify-center space-y-3 py-4">
            <div className="bg-black/40 border border-white/5 rounded-lg p-3 sm:p-4 text-[9px] sm:text-xs space-y-1.5 max-h-[140px] overflow-hidden">
              <div className="text-gray-500 font-bold flex items-center space-x-1">
                <Terminal className="w-3.5 h-3.5 text-neon-violet" />
                <span>TERMINAL_OUTPUT // SYSTEM_BOOT:</span>
              </div>
              
              {/* Display boot logs sequentially */}
              {logMessages.slice(0, bootStep + 1).map((log, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center space-x-1.5 font-mono ${idx === bootStep ? 'text-neon-cyan font-semibold' : 'text-gray-400'}`}
                >
                  <span className="text-neon-violet">&gt;</span>
                  <span className="truncate">{log}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom Area: Progress Bar or Enter Button */}
          <div className="border-t border-white/5 pt-4 flex flex-col justify-end">
            <AnimatePresence mode="wait">
              {!isReady ? (
                // Loading Progress State
                <motion.div 
                  key="loader-progress"
                  exit={{ opacity: 0, y: 10 }}
                  className="space-y-2.5"
                >
                  <div className="flex items-center justify-between text-[10px] sm:text-xs">
                    <span className="text-gray-400 tracking-wider">SYSTEM DECRYPT STATUS:</span>
                    <span className="text-neon-cyan font-bold font-mono">{progress}%</span>
                  </div>
                  {/* Progress track */}
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-fuchsia shadow-[0_0_10px_rgba(0,240,255,0.4)]"
                      style={{ width: `${progress}%` }}
                      layoutId="loading-bar-fill"
                    />
                  </div>
                </motion.div>
              ) : (
                // Boot Initialization Button
                <motion.button
                  key="boot-button"
                  initial={{ opacity: 0, scale: 0.9, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBoot}
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-lg bg-gradient-to-r from-neon-cyan/20 to-neon-violet/20 border border-neon-cyan/40 hover:border-neon-cyan text-white text-[11px] sm:text-xs font-bold tracking-[0.2em] hover:bg-gradient-to-r hover:from-neon-cyan/35 hover:to-neon-violet/35 hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all duration-300 cursor-pointer select-none uppercase"
                >
                  <Shield className="w-4 h-4 text-neon-cyan animate-pulse" />
                  <span>INITIALIZE SYSTEM DECK</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* 5. Cyber Glitch Screen Overlay during transition */}
        {isGlitching && (
          <div className="absolute inset-0 bg-neon-cyan/10 z-[999] pointer-events-none animate-ping flex items-center justify-center">
            <div className="absolute inset-0 bg-repeat bg-center mix-blend-difference opacity-20 bg-[linear-gradient(90deg,red,blue,green)]" />
          </div>
        )}

      </motion.div>
    </div>
  );
};

export default IntroLoader;
