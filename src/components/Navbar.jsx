import { useEffect, useState } from 'react';
import { Code2, Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { navigation } from '../data/portfolio';

const Navbar = ({ theme, setTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let frameId = 0;
    const updateScrollState = () => {
      frameId = 0;
      setIsScrolled(window.scrollY > 12);

      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);

      if (theme === 'dark-dashboard') {
        const currentSection = navigation.find(({ href }) => {
          const element = document.querySelector(href);
          if (!element) return false;
          const bounds = element.getBoundingClientRect();
          return bounds.top <= 150 && bounds.bottom > 150;
        });
        if (currentSection) setActiveSection(currentSection.href.slice(1));
      }
    };

    const handleScroll = () => {
      if (!frameId) frameId = requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [theme]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  const handleClick = (event, href) => {
    event.preventDefault();
    setIsOpen(false);
    if (theme === 'white-cv') {
      setTheme('dark-dashboard');
      window.setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' }), 100);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`site-nav no-print ${isScrolled || theme === 'white-cv' ? 'site-nav-scrolled' : ''}`}
      aria-label="Main navigation"
    >
      {theme === 'dark-dashboard' && (
        <div
          className="scroll-progress"
          role="progressbar"
          aria-label="Page scroll progress"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(scrollProgress)}
        >
          <span style={{ transform: `scaleX(${scrollProgress / 100})` }} />
        </div>
      )}
      <div className="site-nav-inner">
        <a
          href="#home"
          onClick={(event) => handleClick(event, '#home')}
          className="site-brand"
          aria-label="Jezua Palma, home"
        >
          <span className="site-brand-mark" aria-hidden="true"><Code2 size={18} /></span>
          <span>Jezua Palma</span>
        </a>

        {theme === 'dark-dashboard' && (
          <div className="site-nav-links">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleClick(event, item.href)}
                className={activeSection === item.href.slice(1) ? 'active' : ''}
                aria-current={activeSection === item.href.slice(1) ? 'location' : undefined}
              >
                {item.name}
              </a>
            ))}
          </div>
        )}

        <div className="site-nav-actions">
          <a
            href="#contact"
            className="hire-cta"
            onClick={(event) => handleClick(event, '#contact')}
          >
            Hire Me <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => setTheme(theme === 'dark-dashboard' ? 'white-cv' : 'dark-dashboard')}
            className="theme-toggle"
            aria-label={theme === 'dark-dashboard' ? 'Switch to Printable CV' : 'Switch to dark dashboard'}
            title={theme === 'dark-dashboard' ? 'Switch to Printable CV' : 'Switch to dark dashboard'}
          >
            {theme === 'dark-dashboard' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          {theme === 'dark-dashboard' && (
            <button
              type="button"
              onClick={() => setIsOpen((open) => !open)}
              className="mobile-menu-toggle"
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>

      {theme === 'dark-dashboard' && (
        <div
          id="mobile-navigation"
          className={`mobile-navigation ${isOpen ? 'is-open' : ''}`}
          aria-hidden={!isOpen}
          inert={!isOpen}
        >
          {navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => handleClick(event, item.href)}
              className={activeSection === item.href.slice(1) ? 'active' : ''}
            >
              {item.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
