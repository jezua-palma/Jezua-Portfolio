import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Download, Award, ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';

const Certificates = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImg, setLightboxImg] = useState(null);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isPaused, setIsPaused] = useState(false);

  const certs = [
    {
      title: 'Fundamentals of Pitching and Startup Projects',
      issuer: 'DICT Region IV-A',
      date: 'March 3-4, 2025',
      img: '/assets/cert_dict.png',
      verifyUrl: 'https://dict.gov.ph/',
      id: 'R4A_IIDB_DICT-R4A-2026184'
    },
    {
      title: 'Elevate Your Security Career: Mastering Microsoft Security',
      issuer: 'Trainocate (Microsoft Gold Partner)',
      date: 'May 23, 2025',
      img: '/assets/cert_trainocate.png',
      verifyUrl: 'https://trainocate.com/',
      id: 'VILT-Microsoft-Security'
    },
    {
      title: 'Building Your Digital Backbone: Unlocking Secrets of Network Communication',
      issuer: 'LSPU College of Computer Studies',
      date: 'May 28, 2024',
      img: '/assets/cert_lspu_networking.png',
      verifyUrl: 'https://lspu.edu.ph/',
      id: 'LSPU-CCS-Network-Communication'
    },
    {
      title: 'Prompt Engineering Certification',
      issuer: 'Sololearn',
      date: 'March 11, 2026',
      img: '/assets/cert_prompt_engineering.jpg',
      verifyUrl: 'https://www.sololearn.com/certificates/CC-IYS7IPY3',
      id: 'CC-IYS7IPY3'
    },
    {
      title: 'Vibe Coding Certification',
      issuer: 'Sololearn',
      date: 'March 11, 2026',
      img: '/assets/cert_vibe_coding.jpg',
      verifyUrl: 'https://www.sololearn.com/certificates/CC-GQ4FCDTJ',
      id: 'CC-GQ4FCDTJ'
    },
    {
      title: 'Introduction to C#',
      issuer: 'Sololearn',
      date: 'January 12, 2026',
      img: '/assets/cert_csharp.jpg',
      verifyUrl: 'https://www.sololearn.com/certificates/CC-HV212WPI',
      id: 'CC-HV212WPI'
    },
    {
      title: 'Introduction to HTML',
      issuer: 'Sololearn',
      date: 'January 31, 2026',
      img: '/assets/cert_html.jpg',
      verifyUrl: 'https://www.sololearn.com/certificates/CC-5ULFDOUI',
      id: 'CC-5ULFDOUI'
    }
  ];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % certs.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + certs.length) % certs.length);
  };

  const handleDotClick = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused || lightboxImg) return;
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % certs.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused, lightboxImg]);

  return (
    <section id="certificates" className="relative py-24 border-t border-white/5 overflow-hidden">
      <div className="glow-sphere w-[350px] h-[350px] bg-neon-cyan/5 top-10 right-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Credentials & <span className="gradient-text">Certificates</span>
          </h2>
          <div className="mt-2 text-sm text-gray-500 font-mono">
            VERIFIED INDUSTRY SKILLS AND SPECIALIZATIONS
          </div>
          <div className="w-16 h-1 bg-gradient-to-r from-neon-cyan to-neon-violet mx-auto mt-4 rounded-full" />
        </div>

        {/* Certificate Display Slider Row */}
        <div className="max-w-4xl mx-auto relative group px-6 sm:px-12">
          
          {/* Main Slide Card Container */}
          <div 
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="glass-panel rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl p-6 sm:p-8 min-h-[360px] flex items-center"
          >
            
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full flex flex-col md:flex-row items-center gap-8"
              >
                
                {/* Visual preview */}
                <div className="w-full md:w-1/2 relative group/img overflow-hidden rounded-2xl border border-white/5 aspect-[4/3] bg-dark-card flex justify-center items-center">
                  <img 
                    src={certs[currentIndex].img} 
                    alt={certs[currentIndex].title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
                    onError={(e) => { e.target.src = "https://placehold.co/600x450/1e1e2f/ffffff?text=Course+Certificate" }}
                  />
                  {/* Image hover preview mask */}
                  <div className="absolute inset-0 bg-[#030014]/60 opacity-0 group-hover/img:opacity-100 flex items-center justify-center space-x-3 transition-opacity duration-300 pointer-events-none group-hover/img:pointer-events-auto">
                    <button
                      onClick={() => setLightboxImg(certs[currentIndex])}
                      className="p-3 rounded-full bg-neon-cyan hover:bg-neon-cyan/95 text-dark font-bold shadow-lg transform translate-y-4 group-hover/img:translate-y-0 transition-all duration-300 pointer-events-auto"
                      aria-label="View Full"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <a
                      href={certs[currentIndex].img}
                      download={`${certs[currentIndex].title.replace(/\s+/g, '_')}_Certificate.jpg`}
                      className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-lg transform translate-y-4 group-hover/img:translate-y-0 transition-all duration-300 pointer-events-auto"
                      aria-label="Download File"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Description Info */}
                <div className="w-full md:w-1/2 flex flex-col justify-between space-y-6 text-left">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2 text-neon-violet">
                      <Award className="w-5 h-5" />
                      <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider font-mono">
                        {certs[currentIndex].issuer} Academy
                      </span>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                      {certs[currentIndex].title}
                    </h3>
                    
                    <div className="text-xs sm:text-sm text-gray-500 font-mono">
                      <span>Issued Date: </span>
                      <span className="text-gray-300">{certs[currentIndex].date}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5 w-full">
                    <button
                      onClick={() => setLightboxImg(certs[currentIndex])}
                      className="flex-1 px-4 py-2.5 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 text-xs font-semibold flex items-center justify-center space-x-2 transition-all"
                    >
                      <Eye className="w-4 h-4 text-neon-cyan" />
                      <span>Quick View</span>
                    </button>
                    <a
                      href={certs[currentIndex].verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 px-4 py-2.5 rounded-lg bg-neon-violet hover:bg-neon-violet/90 text-white text-xs font-semibold flex items-center justify-center space-x-2 shadow-lg shadow-neon-violet/20 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Verify Skill</span>
                    </a>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

          {/* Navigation keys (Float on hover) */}
          <button
            onClick={handlePrev}
            className="absolute left-[-10px] sm:left-[-20px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0b0825]/90 border border-white/10 text-gray-400 hover:text-white shadow-xl hover:scale-105 active:scale-95 transition-all z-20"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-[-10px] sm:right-[-20px] top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0b0825]/90 border border-white/10 text-gray-400 hover:text-white shadow-xl hover:scale-105 active:scale-95 transition-all z-20"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Carousel indicators */}
        <div className="flex justify-center space-x-2 mt-8">
          {certs.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === i 
                  ? 'bg-neon-cyan w-6' 
                  : 'bg-white/10 hover:bg-white/20'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {lightboxImg && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxImg(null)}
                className="fixed inset-0 bg-[#030014]/95 backdrop-blur-md cursor-pointer"
              />
              
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative z-10 w-full max-w-4xl bg-[#0b0825] border border-white/15 rounded-2xl overflow-hidden p-3 shadow-2xl flex flex-col items-center"
              >
                <button
                  onClick={() => setLightboxImg(null)}
                  className="absolute top-4 right-4 p-1.5 rounded-lg border border-white/10 bg-white/5 text-gray-400 hover:text-white transition-all z-20"
                >
                  <X className="w-5 h-5" />
                </button>
                
                <img 
                  src={lightboxImg.img} 
                  alt={lightboxImg.title} 
                  className="w-full h-auto rounded-lg max-h-[80vh] object-contain"
                  onError={(e) => { e.target.src = "https://placehold.co/800x600/1e1e2f/ffffff?text=Course+Certificate" }}
                />
                
                <div className="w-full px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4 bg-white/1.5 border-t border-white/5 mt-3 rounded-b-lg">
                  <div className="text-center sm:text-left">
                    <h4 className="text-base font-bold text-white">{lightboxImg.title}</h4>
                    <p className="text-xs text-gray-500 font-mono mt-0.5">{lightboxImg.issuer} — Code: {lightboxImg.id}</p>
                  </div>
                  
                  <div className="flex space-x-3">
                    <a
                      href={lightboxImg.img}
                      download={`${lightboxImg.title.replace(/\s+/g, '_')}_Certificate.jpg`}
                      className="px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-gray-300 hover:text-white text-xs font-semibold flex items-center space-x-2 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download File</span>
                    </a>
                    <a
                      href={lightboxImg.verifyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-lg bg-neon-cyan hover:bg-neon-cyan/95 text-dark font-extrabold text-xs flex items-center space-x-2 transition-all shadow-md"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Verify Live</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default Certificates;
