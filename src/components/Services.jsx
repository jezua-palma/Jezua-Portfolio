import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Monitor, Sparkles, Cpu, Zap, Briefcase, FileCode } from 'lucide-react';

const Services = () => {
  const servicesList = [
    {
      icon: <Layers className="w-6 h-6 text-neon-cyan" />,
      title: 'Web Development & Design',
      desc: 'Building robust, highly secure backend services in Python (Flask/Django) paired with cutting-edge frontend interfaces in React and Next.js.'
    },
    {
      icon: <Monitor className="w-6 h-6 text-neon-violet" />,
      title: 'Responsive Website Design',
      desc: 'Creating human-centric websites that work seamlessly across desktop, tablet, and mobile with rapid responsive stylesheet velocity.'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-neon-fuchsia" />,
      title: 'UI/UX Enhancement',
      desc: 'Refining software with interactive physics, smooth animations, glassmorphic elements, and premium dark/light interfaces.'
    },
    {
      icon: <Cpu className="w-6 h-6 text-neon-rose" />,
      title: 'AI-Assisted Development',
      desc: 'Integrating Large Language Model APIs (Gemini/OpenAI), structuring prompt chains, and speeding up cycles with prompt-efficiency.'
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: 'Automation Solutions',
      desc: 'Structuring bulk blast programs, Zapier synchronizations, and event-trigger workflows to save businesses manual labor.'
    },
    {
      icon: <FileCode className="w-6 h-6 text-emerald-400" />,
      title: 'Portfolio Websites',
      desc: 'Building premium recruiter-focused portfolios designed to show creative capabilities and capture client leads instantly.'
    },
    {
      icon: <Briefcase className="w-6 h-6 text-blue-400" />,
      title: 'Business Systems (Bubble.io)',
      desc: 'Scaffolding high-performance custom CRM systems, checkout flows, and operational dashboards visual-first in Bubble.io.'
    }
  ];

  return (
    <section id="services" className="relative py-24 border-t border-white/5 overflow-hidden">
      <div className="glow-sphere w-[300px] h-[300px] bg-neon-cyan/5 bottom-10 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional <span className="gradient-text">Services</span>
          </h2>
          <div className="mt-2 text-sm text-gray-500 font-mono">
            WHAT I CAN DELIVER FOR YOUR TEAM OR BUSINESS
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-cyan to-neon-violet mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((srv, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between space-y-4 hover:border-neon-cyan/30 glass-panel-hover group relative cursor-default"
            >
              {/* Highlight top hover overlay */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="space-y-4">
                {/* Icon box */}
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-neon-cyan/20 group-hover:bg-neon-cyan/5 transition-all duration-300">
                  {srv.icon}
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-neon-cyan transition-colors duration-200">
                  {srv.title}
                </h3>
                
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="text-[10px] font-mono text-gray-500 group-hover:text-neon-cyan uppercase tracking-widest pt-4 border-t border-white/5 transition-colors duration-200">
                Premium Delivery
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
