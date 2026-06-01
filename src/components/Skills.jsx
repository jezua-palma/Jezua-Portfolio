import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop, Database, Cpu, Wrench } from 'lucide-react';
import { gsap } from 'gsap';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('frontend');

  // GSAP Entrance reveals and active panel tilt effects
  useEffect(() => {
    // 1. Tab buttons staggered entrances on viewport scroll
    gsap.fromTo('.skill-tab-btn',
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.65,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#skills',
          start: 'top 80%',
        }
      }
    );
  }, []);

  // 2. Active Panel 3D Parallax Tilt (Triggered on tab change to re-bind ref elements)
  useEffect(() => {
    const panel = document.querySelector('.skills-panel');
    if (!panel) return;

    const handleMouseMove = (e) => {
      const rect = panel.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Max 6 degrees of gentle tilt for large plate dashboards
      const tiltX = -(y / (rect.height / 2)) * 6;
      const tiltY = (x / (rect.width / 2)) * 6;

      const percentX = ((e.clientX - rect.left) / rect.width) * 100;
      const percentY = ((e.clientY - rect.top) / rect.height) * 100;

      panel.style.setProperty('--shine-x', `${percentX}%`);
      panel.style.setProperty('--shine-y', `${percentY}%`);

      gsap.to(panel, {
        rotateX: tiltX,
        rotateY: tiltY,
        x: x * 0.02,
        y: y * 0.02,
        duration: 0.35,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(panel, {
        rotateX: 0,
        rotateY: 0,
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1.0, 0.6)'
      });
    };

    panel.addEventListener('mousemove', handleMouseMove);
    panel.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      panel.removeEventListener('mousemove', handleMouseMove);
      panel.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [activeTab]);

  const categories = [
    { id: 'frontend', name: 'Frontend Dev', icon: <Laptop className="w-4 h-4" /> },
    { id: 'backend', name: 'Backend & DB', icon: <Database className="w-4 h-4" /> },
    { id: 'tools', name: 'Platforms & Tools', icon: <Wrench className="w-4 h-4" /> },
    { id: 'ai', name: 'AI & Automation', icon: <Cpu className="w-4 h-4" /> }
  ];

  const skillData = {
    frontend: [
      { name: 'React / Next.js', level: 90 },
      { name: 'JavaScript / TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 94 },
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'Bootstrap', level: 90 }
    ],
    backend: [
      { name: 'Python (Flask / Django)', level: 90 },
      { name: 'Node.js / Express', level: 92 },
      { name: 'PostgreSQL', level: 96 },
      { name: 'MySQL', level: 96 }
    ],
    tools: [
      { name: 'Bubble.io (Low-Code)', level: 85 },
      { name: 'Git & GitHub', level: 90 },
      { name: 'Figma (UI/UX Design)', level: 80 },
      { name: 'VS Code & XAMPP', level: 92 }
    ],
    ai: [
      { name: 'AI-Assisted Development', level: 100 },
      { name: 'Prompt Engineering', level: 100 },
      { name: 'Workflow Blast Systems', level: 90 },
      { name: 'Visual Automations', level: 95 }
    ]
  };

  const getThemeColor = (tab) => {
    switch (tab) {
      case 'frontend': return 'from-neon-cyan to-blue-500';
      case 'backend': return 'from-neon-violet to-indigo-500';
      case 'tools': return 'from-neon-fuchsia to-purple-500';
      case 'ai': return 'from-neon-rose to-red-500';
      default: return 'from-neon-cyan to-neon-violet';
    }
  };

  const getMeterColor = (tab) => {
    switch (tab) {
      case 'frontend': return 'bg-neon-cyan shadow-[0_0_12px_rgba(0,240,255,0.6)]';
      case 'backend': return 'bg-neon-violet shadow-[0_0_12px_rgba(139,92,246,0.6)]';
      case 'tools': return 'bg-neon-fuchsia shadow-[0_0_12px_rgba(217,70,239,0.6)]';
      case 'ai': return 'bg-neon-rose shadow-[0_0_12px_rgba(244,63,94,0.6)]';
      default: return 'bg-indigo-500';
    }
  };

  return (
    <section id="skills" className="relative py-24 border-t border-white/5 overflow-hidden">
      <div className="glow-sphere w-[400px] h-[400px] bg-neon-fuchsia/10 bottom-0 right-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <div className="mt-2 text-sm text-gray-500 font-mono uppercase">
            EXPERTISE ACROSS CODE, LOW-CODE AND AUTOMATION
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-cyan to-neon-violet mx-auto mt-4 rounded-full" />
        </div>

        {/* Tab Buttons bar */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`magnetic-target skill-tab-btn flex items-center space-x-2 px-5 py-3 rounded-xl border text-sm font-semibold tracking-wide transition-all duration-300 ${activeTab === cat.id
                ? `bg-white/5 border-indigo-500 text-white shadow-[0_0_20px_rgba(99,102,241,0.15)]`
                : 'bg-white/1.5 border-white/5 text-gray-400 hover:text-white hover:border-white/10 hover:bg-white/3'
                }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Skills display panels */}
        <div className="max-w-3xl mx-auto perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="skills-panel glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative group preserve-3d overflow-hidden"
            >
              {/* Card glossy light reflection */}
              <div className="card-shine-overlay" />

              {/* Glowing header bar based on active theme color */}
              <div className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${getThemeColor(activeTab)} pointer-events-none`} />

              <div className="space-y-6 depth-layer-mid pointer-events-none">
                {skillData[activeTab].map((skill, idx) => (
                  <div key={idx} className="space-y-2 pointer-events-none">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-gray-200 group-hover:text-white">{skill.name}</span>
                      <span className="text-gray-400 font-mono">{skill.level}%</span>
                    </div>

                    {/* Meter channel */}
                    <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.1, ease: 'easeOut' }}
                        className={`h-full rounded-full ${getMeterColor(activeTab)}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default Skills;
