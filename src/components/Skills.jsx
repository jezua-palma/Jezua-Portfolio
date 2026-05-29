import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop, Database, Cpu, Wrench } from 'lucide-react';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('frontend');

  const categories = [
    { id: 'frontend', name: 'Frontend Dev', icon: <Laptop className="w-4 h-4" /> },
    { id: 'backend', name: 'Backend & DB', icon: <Database className="w-4 h-4" /> },
    { id: 'tools', name: 'Platforms & Tools', icon: <Wrench className="w-4 h-4" /> },
    { id: 'ai', name: 'AI & Automation', icon: <Cpu className="w-4 h-4" /> }
  ];

  const skillData = {
    frontend: [
      { name: 'React / Next.js', level: 90 },
      { name: 'JavaScript / TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 94 },
      { name: 'HTML5 & CSS3', level: 95 },
      { name: 'Bootstrap', level: 90 }
    ],
    backend: [
      { name: 'Python (Flask / Django)', level: 86 },
      { name: 'Node.js / Express', level: 80 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MySQL', level: 88 }
    ],
    tools: [
      { name: 'Bubble.io (Low-Code)', level: 92 },
      { name: 'Git & GitHub', level: 90 },
      { name: 'Figma (UI/UX Design)', level: 80 },
      { name: 'VS Code & XAMPP', level: 85 }
    ],
    ai: [
      { name: 'AI-Assisted Development', level: 95 },
      { name: 'Prompt Engineering', level: 94 },
      { name: 'Workflow Blast Systems', level: 90 },
      { name: 'Visual Automations', level: 88 }
    ]
  };

  const getThemeColor = (tab) => {
    switch(tab) {
      case 'frontend': return 'from-neon-cyan to-blue-500';
      case 'backend': return 'from-neon-violet to-indigo-500';
      case 'tools': return 'from-neon-fuchsia to-purple-500';
      case 'ai': return 'from-neon-rose to-red-500';
      default: return 'from-neon-cyan to-neon-violet';
    }
  };

  const getBorderGlow = (tab) => {
    switch(tab) {
      case 'frontend': return 'border-neon-cyan/20 group-hover:border-neon-cyan/50';
      case 'backend': return 'border-neon-violet/20 group-hover:border-neon-violet/50';
      case 'tools': return 'border-neon-fuchsia/20 group-hover:border-neon-fuchsia/50';
      case 'ai': return 'border-neon-rose/20 group-hover:border-neon-rose/50';
      default: return 'border-white/10';
    }
  };

  const getMeterColor = (tab) => {
    switch(tab) {
      case 'frontend': return 'bg-neon-cyan';
      case 'backend': return 'bg-neon-violet';
      case 'tools': return 'bg-neon-fuchsia';
      case 'ai': return 'bg-neon-rose';
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
          <div className="mt-2 text-sm text-gray-500 font-mono">
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
              className={`flex items-center space-x-2 px-5 py-3 rounded-xl border text-sm font-semibold tracking-wide transition-all duration-300 ${
                activeTab === cat.id
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
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className={`glass-panel p-8 rounded-2xl border border-white/10 shadow-2xl relative group`}
            >
              {/* Glowing header bar based on active theme color */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${getThemeColor(activeTab)}`} />
              
              <div className="space-y-6">
                {skillData[activeTab].map((skill, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-semibold">
                      <span className="text-gray-200 group-hover:text-white">{skill.name}</span>
                      <span className="text-gray-400 font-mono">{skill.level}%</span>
                    </div>
                    
                    {/* Meter channel */}
                    <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={`h-full rounded-full ${getMeterColor(activeTab)} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
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
