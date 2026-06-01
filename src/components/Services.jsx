import React, { useEffect } from 'react';
import { Layers, Monitor, Sparkles, Cpu, Zap, Briefcase, FileCode } from 'lucide-react';
import { gsap } from 'gsap';

const Services = () => {
  const servicesList = [
    {
      icon: <Layers className="w-6 h-6 text-neon-cyan" />,
      title: 'Web Development & Design',
      desc: 'Building robust, highly secure backend services in Python (Flask/Django) paired with cutting-edge frontend interfaces in React and Next.js.',
      accent: 'via-neon-cyan',
      glowColor: 'from-neon-cyan/10 to-transparent'
    },
    {
      icon: <Monitor className="w-6 h-6 text-neon-violet" />,
      title: 'Responsive Website Design',
      desc: 'Creating human-centric websites that work seamlessly across desktop, tablet, and mobile with rapid responsive stylesheet velocity.',
      accent: 'via-neon-violet',
      glowColor: 'from-neon-violet/10 to-transparent'
    },
    {
      icon: <Sparkles className="w-6 h-6 text-neon-fuchsia" />,
      title: 'UI/UX Enhancement',
      desc: 'Refining software with interactive physics, smooth animations, glassmorphic elements, and premium dark/light interfaces.',
      accent: 'via-neon-fuchsia',
      glowColor: 'from-neon-fuchsia/10 to-transparent'
    },
    {
      icon: <Cpu className="w-6 h-6 text-neon-rose" />,
      title: 'AI-Assisted Development',
      desc: 'Integrating Large Language Model APIs (Gemini/OpenAI), structuring prompt chains, and speeding up cycles with prompt-efficiency.',
      accent: 'via-neon-rose',
      glowColor: 'from-neon-rose/10 to-transparent'
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      title: 'Automation Solutions',
      desc: 'Structuring bulk blast programs, Zapier synchronizations, and event-trigger workflows to save businesses manual labor.',
      accent: 'via-yellow-400',
      glowColor: 'from-yellow-400/10 to-transparent'
    },
    {
      icon: <FileCode className="w-6 h-6 text-emerald-400" />,
      title: 'Portfolio Websites',
      desc: 'Building premium recruiter-focused portfolios designed to show creative capabilities and capture client leads instantly.',
      accent: 'via-emerald-400',
      glowColor: 'from-emerald-400/10 to-transparent'
    },
    {
      icon: <Briefcase className="w-6 h-6 text-blue-400" />,
      title: 'Business Systems (Bubble.io)',
      desc: 'Scaffolding high-performance custom CRM systems, checkout flows, and operational dashboards visual-first in Bubble.io.',
      accent: 'via-blue-400',
      glowColor: 'from-blue-400/10 to-transparent'
    }
  ];

  // GSAP staggered entrance reveals
  useEffect(() => {
    gsap.fromTo('.service-card',
      { opacity: 0, scale: 0.94, y: 25 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#services',
          start: 'top 75%',
        }
      }
    );
  }, []);

  return (
    <section id="services" className="relative py-24 border-t border-white/5 overflow-hidden">
      <div className="glow-sphere w-[300px] h-[300px] bg-neon-cyan/5 bottom-10 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional <span className="gradient-text">Services</span>
          </h2>
          <div className="mt-2 text-sm text-gray-500 font-mono uppercase">
            WHAT I CAN DELIVER FOR YOUR TEAM OR BUSINESS
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-cyan to-neon-violet mx-auto mt-4 rounded-full" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((srv, idx) => (
            <div
              key={idx}
              className="service-card glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between space-y-4 hover:border-white/15 glass-panel-hover group relative cursor-default overflow-hidden"
            >
              {/* Inner glowing panel background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${srv.glowColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none rounded-2xl`} />

              {/* Highlight top hover overlay styled by HSL index accent */}
              <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent ${srv.accent} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
              
              <div className="space-y-4 relative z-10 pointer-events-none">
                {/* Icon box */}
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-300">
                  {srv.icon}
                </div>
                
                <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-white transition-colors duration-200">
                  {srv.title}
                </h3>
                
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {srv.desc}
                </p>
              </div>

              <div className="text-[10px] font-mono text-gray-500 group-hover:text-white uppercase tracking-widest pt-4 border-t border-white/5 transition-colors duration-200 relative z-10 pointer-events-none">
                Premium Delivery
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
