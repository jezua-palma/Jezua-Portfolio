import { Layers, Monitor, Sparkles, Cpu, Zap, Briefcase, FileCode } from 'lucide-react';
import { services } from '../data/portfolio';

const Services = () => {
  const serviceIcons = {
    Layers: <Layers className="w-6 h-6 text-neon-cyan" />,
    Monitor: <Monitor className="w-6 h-6 text-neon-violet" />,
    Sparkles: <Sparkles className="w-6 h-6 text-neon-fuchsia" />,
    Cpu: <Cpu className="w-6 h-6 text-neon-rose" />,
    Zap: <Zap className="w-6 h-6 text-yellow-400" />,
    FileCode: <FileCode className="w-6 h-6 text-emerald-400" />,
    Briefcase: <Briefcase className="w-6 h-6 text-blue-400" />,
  };

  return (
    <section id="services" className="relative py-16 sm:py-20 lg:py-24 border-t border-white/5 overflow-hidden">
      <div className="glow-sphere w-[300px] h-[300px] bg-neon-cyan/5 bottom-10 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
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
          {services.map((srv, idx) => (
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
                  {serviceIcons[srv.icon]}
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
