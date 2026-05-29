import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Award, Code2, Users, Calendar } from 'lucide-react';

const About = () => {
  // Dynamic Age Calculator increments on October 11
  const age = useMemo(() => {
    const birthDate = new Date('2003-10-11');
    const today = new Date();
    let currentAge = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      currentAge--;
    }
    return currentAge;
  }, []);

  const stats = [
    { icon: <Code2 className="w-6 h-6 text-neon-cyan" />, number: '15+', label: 'Projects Completed' },
    { icon: <Award className="w-6 h-6 text-neon-violet" />, number: '12+', label: 'Technologies Mastered' },
    { icon: <Terminal className="w-6 h-6 text-neon-fuchsia" />, number: 'SP Madrid', label: 'Internship Experience' },
    { icon: <Users className="w-6 h-6 text-neon-rose" />, number: '100%', label: 'Freelance Client Satisfaction' }
  ];

  const highlights = [
    { title: 'Development & Design', desc: 'Crafting robust and highly secure server architectures using Python (Flask & Django) and modern frontends in React and Next.js.' },
    { title: 'Low-Code & Visual Systems', desc: 'Developing rapid internal CRM infrastructures and workflow blast systems using visual engines like Bubble.io.' },
    { title: 'AI-Assisted Efficiency', desc: 'Integrating machine learning APIs, advanced prompt engineering, and visual automation scripts into corporate systems.' },
    { title: 'UX & Motion Design', desc: 'Creating smooth, human-centric responsive layouts optimized for fast load times and spectacular visual feedback.' }
  ];

  return (
    <section id="about" className="relative py-24 overflow-hidden border-t border-white/5">
      <div className="glow-sphere w-[300px] h-[300px] bg-neon-violet/10 top-1/3 left-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="mt-2 text-sm text-gray-500 font-mono">
            GET TO KNOW THE DEVELOPER BEHIND THE SCREENS
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-cyan to-neon-violet mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Narrative description (Left) */}
          <div className="lg:col-span-7 space-y-6 text-gray-400">
            <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug">
              Bridging Elegant Visual Designs with Complex Dynamic Systems
            </h3>
            <p className="text-sm sm:text-base leading-relaxed">
              Hey, I'm <strong className="text-white">Jezua Palma</strong> (Jezua Errol C. Palma). I am a <span className="text-neon-cyan font-medium">{age}-year-old</span> Developer and Designer. I focus heavily on writing clean, highly optimized code while integrating automation and AI systems to simplify workflows.
            </p>
            <p className="text-sm sm:text-base leading-relaxed">
              Currently in my fourth year of pursuing a Bachelor's Degree in Information Technology at <strong className="text-white">Laguna State Polytechnic University</strong>, I have worked across a variety of technologies. From custom software solutions built with Flask and React, to enterprise-ready CRM logic built visual-first using Bubble.io, I love translating abstract business ideas into working production code.
            </p>

            {/* Quick Profile Meta glass card */}
            <div className="glass-panel p-6 rounded-xl space-y-4 border border-white/10 select-none">
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider font-mono">Profile Details</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="flex items-center space-x-2.5">
                  <Calendar className="w-4 h-4 text-neon-cyan" />
                  <span><strong>Birthday:</strong> October 11 (Age {age})</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Terminal className="w-4 h-4 text-neon-violet" />
                  <span><strong>Email:</strong> jezuapalma@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Award className="w-4 h-4 text-neon-fuchsia" />
                  <span><strong>Education:</strong> LSPU (4th Year IT)</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <Users className="w-4 h-4 text-neon-rose" />
                  <span><strong>Location:</strong> Siniloan, Laguna, PH</span>
                </div>
              </div>
            </div>

            {/* Highlighted Strengths Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {highlights.map((hl, idx) => (
                <div key={idx} className="flex flex-col space-y-2 border-l border-white/10 pl-4 py-1 hover:border-neon-cyan/50 transition-colors duration-300">
                  <span className="text-sm font-bold text-white">{hl.title}</span>
                  <span className="text-xs text-gray-500 leading-normal">{hl.desc}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Stats & Cards Grid (Right) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            {stats.map((st, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel p-6 rounded-2xl flex flex-col justify-between items-center text-center glass-panel-hover border border-white/5 relative group cursor-default h-[160px]"
              >
                {/* Glowing neon top outline on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-indigo-500/20 group-hover:bg-indigo-500/5 transition-all duration-300">
                  {st.icon}
                </div>
                
                <div className="mt-3">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:scale-105 transition-transform block">
                    {st.number}
                  </span>
                  <span className="text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider block mt-1">
                    {st.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default About;
