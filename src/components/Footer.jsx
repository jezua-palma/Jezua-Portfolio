import React from 'react';
import { Mail, Heart } from 'lucide-react';

const Footer = () => {
  const socials = [
    { 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      ), 
      href: 'https://github.com/jezua-palma', 
      label: 'GitHub', 
      color: 'hover:text-white hover:border-white' 
    },
    { 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      ), 
      href: 'https://www.linkedin.com/in/jezua-errol-palma-30b1561bb/', 
      label: 'LinkedIn', 
      color: 'hover:text-neon-cyan hover:border-neon-cyan' 
    },
    { 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
        </svg>
      ), 
      href: 'https://www.facebook.com/jezua.palma', 
      label: 'Facebook', 
      color: 'hover:text-blue-500 hover:border-blue-500' 
    },
    { 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      ), 
      href: 'https://www.instagram.com/jezua.errol_/', 
      label: 'Instagram', 
      color: 'hover:text-neon-rose hover:border-neon-rose' 
    },
    { icon: <Mail className="w-5 h-5" />, href: 'mailto:jezuapalma@gmail.com', label: 'Email', color: 'hover:text-neon-violet hover:border-neon-violet' }
  ];

  const currentYear = new Date().getFullYear();

  const handleQuickLink = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="relative border-t border-white/5 bg-[#030014]/80 py-12 overflow-hidden">
      {/* Background radial highlight */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-neon-indigo/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          
          {/* Logo / Brand */}
          <div className="text-center md:text-left">
            <a 
              href="#home" 
              onClick={(e) => handleQuickLink(e, '#home')}
              className="text-xl font-bold tracking-tight text-white"
            >
              <span className="gradient-text">Jezua Palma</span>
            </a>
            <p className="text-sm text-gray-500 mt-2">
              Developer & Designer | AI-Assisted Developer
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6">
            <a href="#about" onClick={(e) => handleQuickLink(e, '#about')} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">About</a>
            <a href="#skills" onClick={(e) => handleQuickLink(e, '#skills')} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Skills</a>
            <a href="#projects" onClick={(e) => handleQuickLink(e, '#projects')} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Projects</a>
            <a href="#experience" onClick={(e) => handleQuickLink(e, '#experience')} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Experience</a>
            <a href="#certificates" onClick={(e) => handleQuickLink(e, '#certificates')} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Credentials</a>
            <a href="#contact" onClick={(e) => handleQuickLink(e, '#contact')} className="text-sm text-gray-400 hover:text-white transition-colors duration-200">Contact</a>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-3">
            {socials.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={`p-2 rounded-lg border border-white/10 bg-white/5 text-gray-400 transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 ${item.color}`}
                aria-label={item.label}
              >
                {item.icon}
              </a>
            ))}
          </div>

        </div>

        <div className="border-t border-white/5 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 space-y-4 md:space-y-0">
          <p>
            &copy; {currentYear} Jezua Errol C. Palma. All rights reserved.
          </p>
          <p className="flex items-center space-x-1">
            <span>Crafted with</span>
            <Heart className="w-3 h-3 text-neon-rose fill-neon-rose animate-pulse" />
            <span>using React, Tailwind & Vite</span>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
