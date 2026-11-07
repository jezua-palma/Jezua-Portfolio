import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Certificates from './components/Certificates';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';
import PrintableCV from './components/PrintableCV';
import IntroLoader from './components/IntroLoader';

const AIAssistant = lazy(() => import('./components/AIAssistant'));

const hasSeenIntro = () => {
  try {
    return window.sessionStorage.getItem('portfolio-intro-seen') === 'true';
  } catch (error) {
    console.warn('Unable to access session storage for the intro screen:', error);
  }
  return false;
};

function App() {
  const [theme, setTheme] = useState('dark-dashboard');
  const [aiAssistantActive, setAiAssistantActive] = useState(false);
  const [showIntro, setShowIntro] = useState(() => !hasSeenIntro());
  const finishIntro = useCallback(() => setShowIntro(false), []);

  useEffect(() => {
    if (showIntro) {
      try {
        window.sessionStorage.setItem('portfolio-intro-seen', 'true');
      } catch (error) {
        console.warn('Unable to save the intro screen session state:', error);
      }
    }
  }, [showIntro]);

  return (
    <MotionConfig reducedMotion="user">
      <div className={`app-shell ${theme === 'dark-dashboard' ? 'dashboard-theme' : 'cv-theme'}`}>
      {showIntro && <IntroLoader onComplete={finishIntro} />}

      <AnimatePresence mode="wait">
        {theme === 'dark-dashboard' ? (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="min-h-screen"
          >
            <Navbar theme={theme} setTheme={setTheme} />
            <main>
              <Hero setTheme={setTheme} isPaused={aiAssistantActive} />
              <About isPaused={aiAssistantActive} />
              <Skills isPaused={aiAssistantActive} />
              <Projects />
              <Experience />
              <Certificates />
              <Services />
              <Testimonials />
              <Contact />
            </main>
            <Footer />
          </motion.div>
        ) : (
          <motion.div
            key="cv"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Navbar theme={theme} setTheme={setTheme} />
            <main className="pt-20">
              <PrintableCV />
            </main>
          </motion.div>
        )}
      </AnimatePresence>

      {theme === 'dark-dashboard' && (
        aiAssistantActive ? (
          <div className="ai-assistant-container">
            <Suspense fallback={<div className="ai-loading" role="status">Loading POLENG…</div>}>
              <AIAssistant initialOpen onClose={() => setAiAssistantActive(false)} />
            </Suspense>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setAiAssistantActive(true)}
            className="assistant-launcher"
            aria-label="Open POLENG AI assistant"
          >
            <span className="assistant-launcher-mark" aria-hidden="true">P</span>
            <span className="assistant-launcher-label">Ask POLENG</span>
          </button>
        )
      )}
      </div>
    </MotionConfig>
  );
}

export default App;
