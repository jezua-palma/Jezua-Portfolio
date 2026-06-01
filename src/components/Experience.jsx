import React, { useEffect } from 'react';
import { Briefcase, GraduationCap, Calendar, Star } from 'lucide-react';
import { gsap } from 'gsap';

const Experience = () => {
  const events = [
    {
      type: 'work',
      date: 'April 2026 - Present',
      role: 'IT Developer Intern',
      company: 'SP Madrid & Associates Law Firm',
      desc: 'Engineered robust visual CRM features and high-volume email blasting logic. Designed relational databases and optimized internal workflows, drastically improving bulk client notification velocity.',
      tech: ['Bubble.io', 'PostgreSQL', 'JavaScript', 'Email Automations'],
      highlights: ['Streamlined massive bulk email blast pipelines', 'Structured clean visual CRM modules', 'Integrated low-latency API hooks']
    },
    {
      type: 'work',
      date: '2024 - Present',
      role: 'Freelance Developer & Designer',
      company: 'Bespoke Software Services',
      desc: 'Translating client ideas into high-performance web products. Designing fluid visual layouts and configuring backend database systems with robust user access permissions.',
      tech: ['Flask', 'Django', 'React', 'Tailwind CSS', 'PostgreSQL'],
      highlights: ['Delivered 100% responsive modern web solutions', 'Configured secure payment & dashboard gates', 'Achieved 100% client satisfaction score']
    },
    {
      type: 'work',
      date: '2025 - Present',
      role: 'AI & UI/UX Specialist',
      company: 'AI-Assisted Operations',
      desc: 'Integrating advanced Generative AI APIs (Gemini/OpenAI) and orchestrating workflow blast systems. Prototyping premium responsive interfaces in Figma and coding custom animations.',
      tech: ['Gemini API', 'Framer Motion', 'Figma', 'Prompt Engineering'],
      highlights: ['Cut coding cycles in half using prompt setups', 'Built high-fidelity dynamic glassmorphism UIs', 'Designed interactive system wireframes']
    },
    {
      type: 'education',
      date: '2022 - Present',
      role: 'Bachelor\'s Degree in Information Technology',
      company: 'Laguna State Polytechnic University',
      desc: '4th year IT student maintaining a stellar General Weighted Average (GWA) of 1.73. Successfully completed academic Capstone Research developing **StreetSmart**, a web-based educational safety game designed to teach children navigation and street caution.',
      tech: ['Capstone Research', 'Relational DBs', 'Algorithms', 'Game Development'],
      highlights: ['Maintained an outstanding GWA academic score of 1.73', 'Researched road safety matrices for children', 'Developed interactive path decision vectors', 'Lead system designer & developer']
    },
    {
      type: 'education',
      date: '2020 - 2022',
      role: 'Senior High School (Pandemic Era)',
      company: 'Siniloan Integrated National High School',
      desc: 'Successfully adapted to visual e-learning grids and digital workspaces. Cultivated strict self-discipline and task scheduling routines.',
      tech: ['Remote Systems', 'Self-Discipline', 'E-Learning Tools'],
      highlights: ['Mastered independent study & timeline scheduling', 'Academic excellence across virtual core modules']
    },
    {
      type: 'education',
      date: '2016 - 2020',
      role: 'Junior High School',
      company: 'Siniloan Integrated National High School',
      desc: 'Explored core technology foundations and built strong peer collaboration dynamics.',
      tech: ['Core Science', 'Group Projects', 'Presentation Skills'],
      highlights: ['Developed strong interpersonal teamwork skills', 'Participated in collaborative science fairs']
    }
  ];

  // GSAP self-drawing timeline, node lighting, and card staggers
  useEffect(() => {
    // 1. Vertical timeline line drawing synchrony
    gsap.fromTo('.experience-timeline-line',
      { height: '0%' },
      {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: '#experience',
          start: 'top 65%',
          end: 'bottom 85%',
          scrub: 0.6,
        }
      }
    );

    // 2. Timeline nodes expansion and coloration triggers
    const timelineNodes = gsap.utils.toArray('.timeline-node');
    timelineNodes.forEach((node) => {
      gsap.fromTo(node,
        { scale: 0.85, borderColor: 'rgba(255,255,255,0.15)', backgroundColor: '#030014' },
        {
          scale: 1.25,
          borderColor: 'rgba(0, 240, 255, 0.85)',
          backgroundColor: '#0c0a24',
          duration: 0.45,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: node,
            start: 'top 60%',
            end: 'top 45%',
            scrub: true,
          }
        }
      );
    });

    // 3. Staggered experience cards slide-in
    const cardWrappers = gsap.utils.toArray('.experience-card-wrapper');
    cardWrappers.forEach((card, idx) => {
      const isEven = idx % 2 === 0;
      gsap.fromTo(card,
        { opacity: 0, x: isEven ? 45 : -45 },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
          }
        }
      );
    });
  }, []);

  return (
    <section id="experience" className="relative py-24 border-t border-white/5 overflow-hidden">
      <div className="glow-sphere w-[400px] h-[400px] bg-neon-violet/5 bottom-1/4 left-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Professional <span className="gradient-text">Journey</span>
          </h2>
          <div className="mt-2 text-sm text-gray-500 font-mono uppercase">
            EXPERIENCE AND ACADEMIC TIMELINE
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-cyan to-neon-violet mx-auto mt-4 rounded-full" />
        </div>

        {/* Timeline Engine */}
        <div className="relative max-w-4xl mx-auto">
          {/* Static background track line */}
          <div className="absolute left-4 sm:left-1/2 top-2 bottom-2 w-[2px] bg-white/[0.04]" />
          
          {/* Dynamic tracer line */}
          <div className="experience-timeline-line absolute left-4 sm:left-1/2 top-2 w-[2px] bg-gradient-to-b from-neon-cyan via-neon-violet to-neon-fuchsia origin-top h-0 shadow-[0_0_12px_rgba(0,240,255,0.55)]" />

          <div className="space-y-12">
            {events.map((event, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`experience-card-wrapper relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  
                  {/* central Timeline Node indicator */}
                  <div className="timeline-node absolute left-4 sm:left-1/2 -translate-x-[15px] sm:-translate-x-1/2 w-8 h-8 rounded-full border-[3px] border-[#030014] bg-dark-card flex items-center justify-center z-10 shadow-lg">
                    {event.type === 'work' ? (
                      <Briefcase className="w-3.5 h-3.5 text-neon-cyan" />
                    ) : (
                      <GraduationCap className="w-3.5 h-3.5 text-neon-violet" />
                    )}
                  </div>

                  {/* Empty Spacer Side (Desktop only) */}
                  <div className="hidden sm:block w-1/2" />

                  {/* Card Content Side */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                    <div className="glass-panel p-6 rounded-2xl border border-white/5 hover:border-white/10 shadow-xl relative group select-none">
                      
                      {/* Hover top border gradient */}
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      {/* Date label */}
                      <div className="flex items-center space-x-2 text-[10px] sm:text-xs font-semibold text-gray-500 font-mono mb-2">
                        <Calendar className="w-3.5 h-3.5 text-neon-fuchsia" />
                        <span>{event.date}</span>
                      </div>

                      {/* Header */}
                      <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-neon-cyan transition-colors duration-200">
                        {event.role}
                      </h3>
                      
                      <div className="text-xs sm:text-sm font-medium text-neon-violet mt-1">
                        {event.company}
                      </div>

                      {/* Body Description */}
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mt-3">
                        {event.desc}
                      </p>

                      {/* Achievements List */}
                      <div className="mt-4 space-y-2 border-t border-white/5 pt-3">
                        {event.highlights.map((high, i) => (
                          <div key={i} className="flex items-start space-x-2 text-xs text-gray-400">
                            <Star className="w-3.5 h-3.5 text-neon-cyan flex-shrink-0 mt-0.5" />
                            <span>{high}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stack badges */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {event.tech.map((badge) => (
                          <span
                            key={badge}
                            className="px-2 py-0.5 rounded bg-white/5 text-[9px] sm:text-[10px] text-gray-500 font-mono border border-white/5"
                          >
                            {badge}
                          </span>
                        ))}
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

export default Experience;
