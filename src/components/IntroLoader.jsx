import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Cpu, ShieldAlert } from 'lucide-react';

const IntroLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [bootStep, setBootStep] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  // Simulated cyber logs
  const logMessages = [
    'SYSTEM OK: INIT DECK CORE ASSEMBLY',
    'ENCRYPTED SHELL AUTHENTICATED SUCCESSFULLY',
    'PARALLAX SCENE DEPTH OPTIMIZED',
    'INJECTING NEON DESIGN STYLESHEETS',
    'CLEARING TILT PARALLAX CACHES',
    'NEURAL SYNERGIES MATCHED: LAUNCHING DASHBOARD'
  ];

  // Mouse tilt logic for 3D card
  useEffect(() => {
    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) - 0.5;
      const y = (e.clientY / innerHeight) - 0.5;
      
      setRotation({
        x: -y * 18, // tilt pitch
        y: x * 18   // tilt yaw
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Precise 5-second progress loader timer with auto-complete
  useEffect(() => {
    let currentProgress = 0;
    const duration = 5000; // 5 seconds
    const stepInterval = 50; // increment every 50ms
    
    const timer = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);

      // Advance log steps based on progress milestones
      if (currentProgress > 85) setBootStep(5);
      else if (currentProgress > 65) setBootStep(4);
      else if (currentProgress > 45) setBootStep(3);
      else if (currentProgress > 25) setBootStep(2);
      else if (currentProgress > 10) setBootStep(1);

      if (currentProgress >= 100) {
        clearInterval(timer);
        setIsGlitching(true);
        // Play final glitch fadeout and transition to main app
        setTimeout(() => {
          onComplete();
        }, 550);
      }
    }, stepInterval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] overflow-hidden bg-[#02000c] flex items-center justify-center font-mono select-none">
      
      {/* Self-contained animations style block */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scan-sweep {
          0% { top: 0%; }
          50% { opacity: 1; }
          100% { top: 100%; }
        }
        .animate-scan-sweep {
          animation: scan-sweep 3s linear infinite;
        }
      `}} />

      {/* 1. Holographic Scanline & Cyber Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px] pointer-events-none z-10 opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.15)_0%,rgba(0,0,0,0)_75%)] pointer-events-none z-10" />
      
      {/* Background logs scrolling by */}
      <div className="absolute inset-0 opacity-10 flex flex-wrap gap-12 p-8 justify-around items-center pointer-events-none text-neon-cyan/20 text-xs">
        {Array.from({ length: 15 }).map((_, i) => (
          <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.4}s` }}>
            {`0x${(i * 47).toString(16).toUpperCase()} // BOOT_STEP_${i}`}
          </div>
        ))}
      </div>


      {/* 2. Interactive 3D Perspective Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-[92vw] max-w-[500px] aspect-[4/3] rounded-2xl border border-white/10 bg-black/75 shadow-[0_0_50px_rgba(0,240,255,0.08)] overflow-hidden flex flex-col p-6 cursor-default"
      >
        
        {/* Holographic borders & corner ticks */}
        <div className="absolute inset-0 border border-neon-cyan/20 rounded-2xl pointer-events-none" />
        <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-neon-cyan/50 pointer-events-none" style={{ transform: 'translateZ(20px)' }} />
        <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-neon-cyan/50 pointer-events-none" style={{ transform: 'translateZ(20px)' }} />
        <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-neon-cyan/50 pointer-events-none" style={{ transform: 'translateZ(20px)' }} />
        <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-neon-cyan/50 pointer-events-none" style={{ transform: 'translateZ(20px)' }} />

        {/* Glowing Scan Sweep Line */}
        <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent shadow-[0_0_12px_rgba(0,240,255,0.8)] z-10 pointer-events-none animate-scan-sweep" />

        {/* Animated Cyber Grid Pattern Background */}
        <div className="absolute inset-0 w-full h-full opacity-[0.08] z-0 pointer-events-none overflow-hidden rounded-2xl">
          <svg className="w-full h-full text-neon-cyan" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="loader-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path d="M 24 0 L 0 0 0 24" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#loader-grid)" />
          </svg>
        </div>

        {/* 4. Interactive HUD Layout (Floating in Z-space) */}
        <div className="relative z-10 flex flex-col h-full justify-between" style={{ transform: 'translateZ(30px)' }}>
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/5 pb-3">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-neon-cyan animate-pulse" />
              <span className="text-[10px] sm:text-xs font-bold text-white tracking-widest uppercase">
                PORTFOLIO_SYSTEM_BOOT
              </span>
            </div>
            <div className="flex items-center space-x-1.5 bg-neon-cyan/10 border border-neon-cyan/30 px-2 py-0.5 rounded text-[8px] sm:text-[10px] text-neon-cyan">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-ping inline-block" />
              <span>DECRYPTING</span>
            </div>
          </div>

          {/* Console Output */}
          <div className="flex-grow flex flex-col justify-center space-y-3 py-4">
            <div className="bg-black/50 border border-white/5 rounded-lg p-3 sm:p-4 text-[9px] sm:text-xs space-y-1.5 max-h-[140px] overflow-hidden">
              <div className="text-gray-500 font-bold flex items-center space-x-1">
                <Terminal className="w-3.5 h-3.5 text-neon-violet" />
                <span>BOOT_LOGS // EXECUTION_STREAM:</span>
              </div>
              
              {/* Display boot logs sequentially */}
              {logMessages.slice(0, bootStep + 1).map((log, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex items-center space-x-1.5 font-mono ${idx === bootStep ? 'text-neon-cyan font-semibold animate-pulse' : 'text-gray-400'}`}
                >
                  <span className="text-neon-violet">&gt;</span>
                  <span className="truncate">{log}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Loading Progress tracker */}
          <div className="border-t border-white/5 pt-4 flex flex-col justify-end">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[10px] sm:text-xs">
                <span className="text-gray-400 tracking-wider flex items-center space-x-1">
                  <ShieldAlert className="w-3.5 h-3.5 text-neon-fuchsia animate-pulse inline mr-1" />
                  <span>INITIALIZING DASHBOARD DECK:</span>
                </span>
                <span className="text-neon-cyan font-bold font-mono">{progress}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                <div 
                  className="h-full bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-fuchsia shadow-[0_0_10px_rgba(0,240,255,0.4)] transition-all duration-100 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

        </div>

        {/* Cyber Glitch Transition effect */}
        {isGlitching && (
          <div className="absolute inset-0 bg-neon-cyan/25 z-[999] pointer-events-none animate-pulse flex items-center justify-center">
            <div className="absolute inset-0 bg-repeat bg-center mix-blend-difference opacity-30 bg-[linear-gradient(90deg,red,blue,green)]" />
          </div>
        )}

      </motion.div>
    </div>
  );
};

export default IntroLoader;
