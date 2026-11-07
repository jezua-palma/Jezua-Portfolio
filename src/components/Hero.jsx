import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Briefcase,
  Camera,
  Code,
  FileText,
  Mail,
  UsersRound,
} from 'lucide-react';
import { CONTACT_EMAIL } from '../contact';
import { portfolioHighlights } from '../data/portfolio';

const titles = [
  'Developer & Designer',
  'AI-Assisted Developer',
  'UI/UX Enthusiast',
  'Full Stack Builder',
];

const socials = [
  { icon: Code, href: 'https://github.com/jezua-palma', label: 'GitHub' },
  { icon: Briefcase, href: 'https://www.linkedin.com/in/jezua-errol-palma-30b1561bb/', label: 'LinkedIn' },
  { icon: UsersRound, href: 'https://www.facebook.com/jezua.palma', label: 'Facebook' },
  { icon: Camera, href: 'https://www.instagram.com/jezua.errol_/', label: 'Instagram' },
  { icon: Mail, href: `mailto:${CONTACT_EMAIL}`, label: 'Email' },
];

const Hero = ({ setTheme, isPaused }) => {
  const [typedTitle, setTypedTitle] = useState(titles[0]);
  const [titleIdx, setTitleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const currentTitle = titles[titleIdx];
    let timer;

    if (!isDeleting && typedTitle === currentTitle) {
      timer = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && typedTitle.length === 0) {
      timer = setTimeout(() => {
        setIsDeleting(false);
        setTitleIdx((index) => (index + 1) % titles.length);
      }, 120);
    } else {
      timer = setTimeout(() => {
        setTypedTitle((value) => (
          isDeleting ? value.slice(0, -1) : currentTitle.slice(0, value.length + 1)
        ));
      }, isDeleting ? 32 : 64);
    }

    return () => clearTimeout(timer);
  }, [isDeleting, isPaused, titleIdx, typedTitle]);

  const handleScrollToSection = (event, selector) => {
    event.preventDefault();
    const target = document.querySelector(selector);
    if (!target) return;

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - 80,
      behavior: 'smooth',
    });
  };

  return (
    <section id="home" className="hero-editorial relative flex items-center overflow-hidden">
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="hero-orb hero-orb-one" />
        <span className="hero-orb hero-orb-two" />
        <span className="hero-grid" />
      </div>

      <div className="hero-layout relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 pb-16 pt-16 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-10 lg:pb-20 lg:pt-14">
        <div className="hero-copy flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="hero-status"
          >
            <span className="hero-status-dot" />
            Available for Freelance & Full-time Hire
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="hero-name-wrap"
          >
            <p className="hero-eyebrow">I&apos;m</p>
            <h1 className="hero-name">
              <span>Jezua</span>
              <span className="hero-name-second">
                Palma<span className="hero-name-period">.</span>
              </span>
            </h1>
          </motion.div>

          <div className="hero-role" aria-live="polite">
            <span className="hero-role-line" />
            <p>{typedTitle}<span className="hero-caret" aria-hidden="true" /></p>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.24 }}
            className="hero-description"
          >
            Passionate Developer & Designer and low-code expert creating premium system architectures.
            Leveraging advanced AI tools and prompt engineering to deliver elegant, secure, and
            lightning-fast web services that drive business growth.
          </motion.p>

          <div className="hero-trust-metrics" aria-label="Portfolio highlights">
            {portfolioHighlights.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.32 + index * 0.08 }}
              >
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.48 }}
            className="hero-actions"
          >
            <a
              href="#projects"
              onClick={(event) => handleScrollToSection(event, '#projects')}
              className="hero-primary-cta"
            >
              View Projects
              <ArrowRight size={17} aria-hidden="true" />
            </a>
            <button
              type="button"
              onClick={() => setTheme?.('white-cv')}
              className="hero-secondary-cta"
            >
              <FileText size={17} aria-hidden="true" />
              Download CV
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.58 }}
            className="hero-socials"
            aria-label="Social profiles"
          >
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target={label === 'Email' ? undefined : '_blank'}
                rel={label === 'Email' ? undefined : 'noreferrer'}
                aria-label={label}
                title={label}
              >
                <Icon size={17} aria-hidden="true" />
              </a>
            ))}
            <a
              href="#contact"
              onClick={(event) => handleScrollToSection(event, '#contact')}
              className="hero-contact-link"
            >
              Contact Me <ArrowUpRight size={14} aria-hidden="true" />
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.16 }}
          className="hero-portrait-scene"
        >
          <div className="hero-portrait-frame">
            <img
              src="/assets/profile.jpg?v=20260605"
              alt="Jezua Palma"
              fetchPriority="high"
            />
            <div className="hero-photo-wash" aria-hidden="true" />
            <div className="hero-photo-caption">
              <span>Developer &amp; Designer</span>
              <ArrowDownRight size={19} aria-hidden="true" />
            </div>
          </div>

          <div className="hero-glass-note">
            <span className="hero-glass-note-icon" aria-hidden="true">JP</span>
            <span>
              <strong>Full Stack Web Developer</strong>
              <small>UI/UX Enthusiast</small>
            </span>
          </div>
          <div className="hero-floating-label" aria-hidden="true">
            <span>AI</span> AI &amp; Automation
          </div>
          <span className="hero-visual-index" aria-hidden="true">01</span>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
