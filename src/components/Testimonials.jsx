import React from 'react';
import { motion } from 'framer-motion';
import { Quote, MessageSquare } from 'lucide-react';

const Testimonials = () => {
  const reviews = [
    {
      quote: 'Jezua demonstrated exceptional problem-solving and self-learning agility during CRM visual configurations. His bulk automation features optimized our operations significantly.',
      author: 'Internship Supervisor',
      role: 'IT Coordinator, SP Madrid & Associates',
      avatar: 'https://placehold.co/100x100/1e1e2f/ffffff?text=IS'
    },
    {
      quote: 'Excellent software standards and swift response. Jezua understood our exact database specifications, delivered secure authentication, and made the dashboard look incredible.',
      author: 'Freelance Client',
      role: 'Startup Founder, E-Commerce',
      avatar: 'https://placehold.co/100x100/1e1e2f/ffffff?text=FC'
    },
    {
      quote: 'A stellar collaborator and development/design talent. In our academic project developments, Jezua led the system architectures and integrated modern styling. His AI prompts are top-tier!',
      author: 'Capstone Team Member',
      role: 'LSPU IT Senior Student',
      avatar: 'https://placehold.co/100x100/1e1e2f/ffffff?text=TM'
    }
  ];

  return (
    <section id="testimonials" className="relative py-24 border-t border-white/5 overflow-hidden bg-[#030014]/30">
      <div className="glow-sphere w-[300px] h-[300px] bg-neon-fuchsia/5 top-1/4 left-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Recommendations & <span className="gradient-text">Testimonials</span>
          </h2>
          <div className="mt-2 text-sm text-gray-500 font-mono">
            WHAT RECRUITERS, CLASSMATES AND CLIENTS HAVE TO SAY
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-cyan to-neon-violet mx-auto mt-4 rounded-full" />
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-6 rounded-2xl border border-white/5 flex flex-col justify-between space-y-6 hover:border-white/10 transition-all duration-300 relative group cursor-default"
            >
              {/* Quote Mark accent */}
              <div className="absolute top-4 right-4 p-2 rounded-xl bg-white/3 border border-white/5 text-gray-600 group-hover:text-neon-cyan transition-colors duration-200">
                <Quote className="w-5 h-5 fill-current" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-neon-cyan">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-[10px] font-semibold uppercase tracking-widest font-mono">Feedback Review</span>
                </div>
                
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center space-x-3 border-t border-white/5 pt-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10 flex-shrink-0 bg-dark-card flex items-center justify-center">
                  <img src={rev.avatar} alt={rev.author} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-white leading-none">{rev.author}</h4>
                  <p className="text-[10px] sm:text-xs text-gray-500 font-medium mt-1 leading-tight">{rev.role}</p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
