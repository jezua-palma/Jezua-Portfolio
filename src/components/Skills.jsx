import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laptop, Database, Cpu, Wrench, Palette, Code2 } from 'lucide-react';
import { skillCategories, skillsByCategory } from '../data/portfolio';

const Skills = () => {
  const [activeTab, setActiveTab] = useState('frontend');

  const categoryIcons = {
    frontend: <Laptop className="w-4 h-4" />,
    backend: <Database className="w-4 h-4" />,
    design: <Palette className="w-4 h-4" />,
    tools: <Wrench className="w-4 h-4" />,
    ai: <Cpu className="w-4 h-4" />,
  };
  const categories = skillCategories.map((category) => ({
    ...category,
    icon: categoryIcons[category.id],
  }));

  const getThemeColor = (tab) => {
    switch (tab) {
      case 'frontend': return 'from-neon-cyan to-blue-500';
      case 'backend': return 'from-neon-violet to-indigo-500';
      case 'design': return 'from-neon-fuchsia to-purple-500';
      case 'tools': return 'from-purple-500 to-pink-500';
      case 'ai': return 'from-neon-rose to-red-500';
      default: return 'from-neon-cyan to-neon-violet';
    }
  };

  const getMeterColor = (tab) => {
    switch (tab) {
      case 'frontend': return 'bg-neon-cyan shadow-[0_0_12px_rgba(0,240,255,0.6)]';
      case 'backend': return 'bg-neon-violet shadow-[0_0_12px_rgba(139,92,246,0.6)]';
      case 'design': return 'bg-neon-fuchsia shadow-[0_0_12px_rgba(217,70,239,0.6)]';
      case 'tools': return 'bg-purple-500 shadow-[0_0_12px_rgba(168,85,247,0.6)]';
      case 'ai': return 'bg-neon-rose shadow-[0_0_12px_rgba(244,63,94,0.6)]';
      default: return 'bg-indigo-500';
    }
  };

  return (
    <section id="skills" className="relative py-16 sm:py-20 lg:py-24 border-t border-white/5 overflow-hidden">
      <div className="glow-sphere w-[400px] h-[400px] bg-neon-fuchsia/10 bottom-0 right-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          
          {/* Skills List Panel (Left/Main) */}
          <div className="lg:col-span-7 w-full perspective-1000">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="skills-panel glass-panel p-5 sm:p-8 rounded-2xl border border-white/10 shadow-2xl relative group preserve-3d overflow-hidden"
              >
                {/* Card glossy light reflection */}
                <div className="card-shine-overlay" />

                {/* Glowing header bar based on active theme color */}
                <div className={`absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r ${getThemeColor(activeTab)} pointer-events-none`} />

                <div className="space-y-6 depth-layer-mid pointer-events-none">
                  {skillsByCategory[activeTab].map((skill, idx) => (
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

          {/* 3D Floating Programming Languages Icon illustration (Right) */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="skills-highlights glass-panel w-full max-w-[420px] min-h-[300px] rounded-2xl border border-white/10 p-8 flex flex-col justify-center">
              <div className="skills-highlights-icon" aria-hidden="true"><Code2 size={30} /></div>
              <h3 className="mt-5 text-xl font-bold text-white">Programming &amp; Design</h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {['React / Next.js', 'Python (Flask / Django)', 'Figma (UI/UX Design)', 'Bubble.io (Low-Code)'].map((skill) => (
                  <span key={skill} className="skills-highlight-tag">{skill}</span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Skills;
