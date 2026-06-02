import React, { useState, useEffect } from 'react';
import { Code2, Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Scrolled state
      setIsScrolled(window.scrollY > 20);

      // Scroll progress
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress((window.scrollY / totalScroll) * 100);
      }

      // Active Section Highlighter
      if (theme === 'dark-dashboard') {
        const sections = navigation.map(item => item.href.substring(1));
        let currentSection = 'home';
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom >= 120) {
              currentSection = section;
              break;
            }
          }
        }
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theme]);

  const handleClick = (e, href) => {
    e.preventDefault();
    if (theme === 'white-cv') {
      // If we are in printable CV view, switch theme back to dashboard first, then scroll
      setTheme('dark-dashboard');
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({
            top,
            behavior: 'smooth',
          });
        }
      }, 100);
    } else {
      setIsOpen(false);
      const target = document.querySelector(href);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({
          top,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled || theme === 'white-cv' ? 'glass-nav py-3' : 'bg-transparent py-5'
    }`}>
      {/* Scroll Progress Bar (Only visible in Dashboard theme) */}
      {theme === 'dark-dashboard' && (
        <div 
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-neon-cyan via-neon-violet to-neon-fuchsia transition-all duration-100"
          style={{ width: `${scrollProgress}%` }}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleClick(e, '#home')}
            className="magnetic-target flex items-center space-x-2 text-xl font-bold tracking-tight text-white group"
          >
            <Code2 className="w-6 h-6 text-neon-cyan group-hover:rotate-12 transition-transform duration-300" />
            <span className="gradient-text">Jezua.dev</span>
          </a>

          {/* Desktop Navigation */}
          {theme === 'dark-dashboard' && (
            <div className="hidden lg:flex items-center space-x-1">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`magnetic-target relative px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 rounded-lg hover:text-neon-cyan ${
                    activeSection === item.href.substring(1)
                      ? 'text-neon-cyan bg-white/5 border border-white/10'
                      : 'text-gray-400 hover:bg-white/5 border border-transparent'
                  }`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          )}

          {/* Spectacular Cool Feature: Interactive Deck / Printable CV Switcher */}
          <div className="flex items-center space-x-4">
            
            {/* Single Icon Theme Toggle Button */}
            {theme === 'dark-dashboard' ? (
              <button
                onClick={() => setTheme('white-cv')}
                className="magnetic-target p-2.5 rounded-full border border-white/10 bg-white/5 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/5 transition-all hover:scale-105 active:scale-95 group shadow-lg shadow-neon-cyan/5 no-print"
                title="Switch to Printable CV fact-sheet"
              >
                <Sun className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300 text-neon-cyan" />
              </button>
            ) : (
              <button
                onClick={() => setTheme('dark-dashboard')}
                className="magnetic-target p-2.5 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-500 hover:text-zinc-950 hover:border-zinc-400 hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95 shadow-sm no-print"
                title="Switch to Cyberpunk Dashboard"
              >
                <Moon className="w-5 h-5 text-zinc-800" />
              </button>
            )}

            {/* Mobile Menu Button (Only for Dashboard layout) */}
            {theme === 'dark-dashboard' && (
              <div className="lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu (Dashboard only) */}
      {theme === 'dark-dashboard' && (
        <div 
          className={`lg:hidden fixed top-[60px] left-0 w-full h-[calc(100vh-60px)] bg-[#030014]/95 backdrop-blur-2xl transition-all duration-300 transform z-40 ${
            isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
          }`}
        >
          <div className="flex flex-col px-4 py-6 space-y-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`px-4 py-3 text-base font-bold uppercase tracking-wider rounded-xl transition-all ${
                  activeSection === item.href.substring(1)
                    ? 'text-neon-cyan bg-white/5 border border-white/10 pl-6'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white pl-4'
                }`}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
