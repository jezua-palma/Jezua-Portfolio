import { Briefcase, GraduationCap, Calendar, Star } from 'lucide-react';
import { experienceEvents } from '../data/portfolio';

const Experience = () => {
  return (
    <section id="experience" className="relative py-16 sm:py-20 lg:py-24 border-t border-white/5 overflow-hidden">
      <div className="glow-sphere w-[400px] h-[400px] bg-neon-violet/5 bottom-1/4 left-1/4" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
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
            {experienceEvents.map((event, idx) => {
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
