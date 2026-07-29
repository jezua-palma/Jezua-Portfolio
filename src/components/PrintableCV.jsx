import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Printer, Moon, Eye, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PrintableCV = ({ onBack, autoDownload, clearAutoDownload }) => {
  const [cvLightbox, setCvLightbox] = useState(null);

  const certifications = [
    { title: 'Prompt Engineering', issuer: 'Sololearn Academy', date: 'March 2026', img: '/assets/cert_prompt_engineering.jpg' },
    { title: 'Vibe Coding', issuer: 'Sololearn Academy', date: 'March 2026', img: '/assets/cert_vibe_coding.jpg' },
    { title: 'Introduction to C#', issuer: 'Sololearn Academy', date: 'January 2026', img: '/assets/cert_csharp.jpg' },
    { title: 'Introduction to HTML', issuer: 'Sololearn Academy', date: 'January 2026', img: '/assets/cert_html.jpg' }
  ];

  const currentAge = (() => {
    const birthDate = new Date('2003-10-11');
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  })();

  const [downloading, setDownloading] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = () => {
    const element = document.getElementById('cv-document-card');
    if (!element) return;
    
    setDownloading(true);
    element.classList.add('downloading-pdf');
    
    const opt = {
      margin:       0,
      filename:     'Jezua_Errol_Palma_CV.pdf',
      image:        { type: 'jpeg', quality: 0.98 },
      html2canvas:  { 
        scale: 2, 
        useCORS: true,
        logging: false
      },
      jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    const runHtml2Pdf = () => {
      window.html2pdf().from(element).set(opt).save()
        .then(() => {
          element.classList.remove('downloading-pdf');
          setDownloading(false);
        })
        .catch(() => {
          element.classList.remove('downloading-pdf');
          setDownloading(false);
        });
    };

    if (window.html2pdf) {
      runHtml2Pdf();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      script.onload = runHtml2Pdf;
      script.onerror = () => {
        element.classList.remove('downloading-pdf');
        setDownloading(false);
      };
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    if (autoDownload) {
      handleDownloadPDF();
      if (clearAutoDownload) {
        clearAutoDownload();
      }
    }
  }, [autoDownload]);

  return (
    <div className="harvard-cv-page min-h-screen bg-zinc-100 text-zinc-900 py-12 px-4 sm:px-6 lg:px-8 antialiased selection:bg-zinc-200" style={{ fontFamily: "'Georgia', 'Times New Roman', 'Times', serif" }}>
      
      {/* Control Navigation Header (Hidden on Print) */}
      <div className="max-w-3xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center no-print bg-white p-4 rounded-xl shadow-sm border border-zinc-200">
        <div className="flex items-center w-full sm:w-auto">
          <span className="text-sm font-semibold text-zinc-500" style={{ fontFamily: "'Inter', 'Helvetica', sans-serif" }}>Jezua Palma CV</span>
        </div>
        
        <div className="flex space-x-3 w-full sm:w-auto" style={{ fontFamily: "'Inter', 'Helvetica', sans-serif" }}>
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-5 py-2.5 text-sm font-bold rounded-lg bg-zinc-900 text-white hover:bg-zinc-800 disabled:bg-zinc-400 shadow-md transition-all"
          >
            {downloading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download CV as PDF</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-5 py-2.5 text-sm font-bold rounded-lg border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print CV</span>
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          HARVARD CV DOCUMENT — Single Column, No Picture, Serif
      ═══════════════════════════════════════════════════════════════ */}
      <div id="cv-document-card" className="harvard-cv-card max-w-3xl mx-auto bg-white py-10 px-10 sm:px-14 border border-zinc-200 shadow-lg rounded-2xl relative overflow-hidden">
        
        {/* ── NAME (Centered, Large) ── */}
        <div className="harvard-header text-center border-b-2 border-black pb-4">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-black" style={{ fontFamily: "'Georgia', 'Times New Roman', serif", fontWeight: 700 }}>
            JEZUA ERROL C. PALMA
          </h1>

          {/* ── CONTACT ROW ── */}
          <div className="harvard-contact mt-3 flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-zinc-700">
            <a href="mailto:jezuapalma@gmail.com" className="hover:underline flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              jezuapalma@gmail.com
            </a>
            <span className="text-zinc-300 hidden sm:inline">|</span>
            <a href="tel:+639397832375" className="hover:underline flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              +63 939 783 2375
            </a>
            <span className="text-zinc-300 hidden sm:inline">|</span>
            <a href="tel:+639566723696" className="hover:underline flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-zinc-400" />
              +63 956 672 3696
            </a>
          </div>
          <div className="harvard-contact-row2 mt-1.5 flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-zinc-700">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              Siniloan, Laguna, Philippines
            </span>
            <span className="text-zinc-300 hidden sm:inline">|</span>
            <a href="https://github.com/jezua-palma" target="_blank" rel="noreferrer" className="hover:underline">
              github.com/jezua-palma
            </a>
            <span className="text-zinc-300 hidden sm:inline">|</span>
            <a href="https://www.linkedin.com/in/jezua-errol-palma-30b1561bb/" target="_blank" rel="noreferrer" className="hover:underline">
              linkedin.com/in/jezua-errol-palma
            </a>
          </div>
        </div>

        {/* ── SUMMARY ── */}
        <div className="harvard-section mt-6">
          <h2 className="harvard-heading text-sm sm:text-base font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1 mb-3">
            Summary
          </h2>
          <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed">
            Motivated developer &amp; designer and prompt engineer with dynamic experience scaffolding custom CRM architectures and event-triggered pipelines. Capable of bridge-building between classic code (React, Next.js, Python Flask) and low-code productivity engines (Bubble.io). Strongly committed to workflow velocity, data-driven security, and visual UI/UX excellence.
          </p>
        </div>

        {/* ── EDUCATION ── */}
        <div className="harvard-section mt-6">
          <h2 className="harvard-heading text-sm sm:text-base font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1 mb-3">
            Education
          </h2>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
            <div>
              <h3 className="font-bold text-zinc-950 text-sm sm:text-base">Laguna State Polytechnic University</h3>
              <p className="text-zinc-600 text-xs sm:text-sm italic">Bachelor of Science in Information Technology — Specialized in Animation &amp; Motion Graphics</p>
            </div>
            <span className="text-zinc-500 text-xs sm:text-sm whitespace-nowrap mt-1 sm:mt-0">2022 – 2026</span>
          </div>
          <ul className="harvard-bullets mt-1.5 list-disc pl-5 text-zinc-700 text-xs sm:text-sm space-y-0.5">
            <li>Graduated Batch 2026 with an Overall General Weighted Average (GWA) of <strong>1.73</strong></li>
            <li>Recurring <strong>Dean's Lister</strong> throughout academic tenure</li>
          </ul>
        </div>

        {/* ── EXPERIENCE ── */}
        <div className="harvard-section mt-6">
          <h2 className="harvard-heading text-sm sm:text-base font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1 mb-3">
            Experience
          </h2>

          {/* SP Madrid */}
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
              <div>
                <h3 className="font-bold text-zinc-950 text-sm sm:text-base">Full Stack Developer</h3>
                <p className="text-zinc-600 text-xs sm:text-sm italic">SP Madrid &amp; Associates Law Firm</p>
              </div>
              <span className="text-zinc-500 text-xs sm:text-sm whitespace-nowrap mt-1 sm:mt-0">March 2026 – June 2026</span>
            </div>
            <ul className="harvard-bullets mt-1.5 list-disc pl-5 text-zinc-700 text-xs sm:text-sm space-y-0.5">
              <li>Developed and maintained enterprise CRM modules inside the Bubble.io visual-first platform</li>
              <li>Designed secure PostgreSQL query flows and coded responsive JavaScript hooks</li>
              <li>Structured bulk automation scripts that dramatically improved email blasting capacity and notification speeds</li>
            </ul>
          </div>

          {/* Freelance */}
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
              <div>
                <h3 className="font-bold text-zinc-950 text-sm sm:text-base">Freelance Developer &amp; Designer</h3>
                <p className="text-zinc-600 text-xs sm:text-sm italic">Bespoke Software Services</p>
              </div>
              <span className="text-zinc-500 text-xs sm:text-sm whitespace-nowrap mt-1 sm:mt-0">March 2023 – Present</span>
            </div>
            <ul className="harvard-bullets mt-1.5 list-disc pl-5 text-zinc-700 text-xs sm:text-sm space-y-0.5">
              <li>Architected customized software solutions, high-conversion landing pages, and responsive inventory trackers for small-to-medium clients</li>
              <li>Structured relational databases, role-based dashboards, and automated triggers</li>
              <li>Achieved 100% project completion scores and satisfied client reviews</li>
            </ul>
          </div>

          {/* Capstone */}
          <div>
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
              <div>
                <h3 className="font-bold text-zinc-950 text-sm sm:text-base">Capstone Research &amp; Development Lead</h3>
                <p className="text-zinc-600 text-xs sm:text-sm italic">LSPU Academic Innovation Projects</p>
              </div>
              <span className="text-zinc-500 text-xs sm:text-sm whitespace-nowrap mt-1 sm:mt-0">2024 – 2026</span>
            </div>
            <ul className="harvard-bullets mt-1.5 list-disc pl-5 text-zinc-700 text-xs sm:text-sm space-y-0.5">
              <li>Researched early-childhood navigation safety and directed software implementation for <strong>StreetSmart</strong></li>
              <li>Built a web-based educational safety game using gamified road decision matrices (Flask, Python, MySQL, Tailwind CSS, Leaflet/Canvas APIs)</li>
            </ul>
          </div>
        </div>

        {/* ── PROJECTS ── */}
        <div className="harvard-section mt-6">
          <h2 className="harvard-heading text-sm sm:text-base font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1 mb-3">
            Projects
          </h2>

          <div className="space-y-3 text-xs sm:text-sm text-zinc-700">
            <div>
              <h3 className="font-bold text-zinc-950 inline">Shadow Depths Game</h3>
              <span className="text-zinc-500 italic"> — Canvas, CSS, JS, Google GSI, WebSockets</span>
              <ul className="harvard-bullets mt-1 list-disc pl-5 space-y-0.5">
                <li>Engineered a performant 2D Canvas roguelike featuring procedural maps, Google OAuth leaderboard, and WebSocket multiplayer</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-zinc-950 inline">Odysseus AI Workspace</h3>
              <span className="text-zinc-500 italic"> — FastAPI, Python, SQLite, ChromaDB, JS, Docker</span>
              <ul className="harvard-bullets mt-1 list-disc pl-5 space-y-0.5">
                <li>Created a privacy-first workspace with multi-model chat, autonomous agents, ChromaDB RAG, and mail/calendar sync</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-zinc-950 inline">ColorSense AI Scanner</h3>
              <span className="text-zinc-500 italic"> — React, Tailwind, Camera API, Vercel</span>
              <ul className="harvard-bullets mt-1 list-disc pl-5 space-y-0.5">
                <li>Developed a mobile camera tool that scans real-world colors, analyzes WCAG contrast, and recommends AI-generated palettes</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-zinc-950 inline">DailyMood App</h3>
              <span className="text-zinc-500 italic"> — Flask, Python, MySQL, Bootstrap, Gemini API</span>
              <ul className="harvard-bullets mt-1 list-disc pl-5 space-y-0.5">
                <li>Built a calming wellness tracker analyzing mood metrics and journal entries via Generative Gemini AI prompts</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-zinc-950 inline">Capstone Title Generator</h3>
              <span className="text-zinc-500 italic"> — React, Tailwind, Gemini API, Vercel</span>
              <ul className="harvard-bullets mt-1 list-disc pl-5 space-y-0.5">
                <li>Launched an outline generator that helped 200+ students bypass brainstorm blocks</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── TECHNICAL SKILLS ── */}
        <div className="harvard-section mt-6">
          <h2 className="harvard-heading text-sm sm:text-base font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1 mb-3">
            Technical Skills
          </h2>
          <div className="text-xs sm:text-sm text-zinc-700 space-y-1.5">
            <p><strong>Frontend:</strong> React, Next.js, HTML5, CSS3, JavaScript, TypeScript, Tailwind CSS, Bootstrap</p>
            <p><strong>Backend &amp; Database:</strong> Python (Flask, Django), PostgreSQL, MySQL, ChromaDB, Node.js</p>
            <p><strong>No-Code / Low-Code:</strong> Bubble.io CRM, Visual Automations, Zapier API Syncs</p>
            <p><strong>Tools &amp; Version Control:</strong> Git, GitHub, Figma, VS Code, Docker, XAMPP, CLI Scripts</p>
          </div>
        </div>

        {/* ── CERTIFICATIONS ── */}
        <div className="harvard-section mt-6">
          <h2 className="harvard-heading text-sm sm:text-base font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1 mb-3">
            Certifications
          </h2>
          <div className="space-y-1.5 text-xs sm:text-sm">
            {certifications.map((c, i) => (
              <div 
                key={i} 
                onClick={() => setCvLightbox(c)} 
                className="harvard-cert-item cursor-pointer flex justify-between items-center py-1.5 px-2 -mx-2 rounded-lg hover:bg-zinc-50 transition-colors group"
                title="Click to view certificate"
              >
                <div>
                  <span className="font-bold text-zinc-900 group-hover:text-zinc-950 transition-colors">{c.title}</span>
                  <span className="text-zinc-500"> — {c.issuer}</span>
                </div>
                <div className="flex items-center gap-2 text-zinc-400">
                  <span className="text-xs">{c.date}</span>
                  <Eye className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── REFERENCES ── */}
        <div className="harvard-section mt-6">
          <h2 className="harvard-heading text-sm sm:text-base font-bold uppercase tracking-widest text-black border-b-2 border-black pb-1 mb-3">
            References
          </h2>
          <p className="text-zinc-600 text-xs sm:text-sm italic">
            Academic leads, classmate references, and SP Madrid internship mentors are available immediately upon formal request.
          </p>
        </div>

      </div>

      {/* Lightbox Modal (Screen Only) */}
      <AnimatePresence>
        {cvLightbox && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm no-print">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCvLightbox(null)} 
              className="fixed inset-0 cursor-pointer" 
            />
            <motion.div 
              initial={{ scale: 0.92, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 10 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="relative z-10 w-full max-w-2xl bg-white border border-zinc-200 rounded-3xl p-6 shadow-2xl flex flex-col items-center"
            >
              
              <button
                onClick={() => setCvLightbox(null)}
                className="absolute top-4 right-4 p-2 rounded-full border border-zinc-100 bg-zinc-50 text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all shadow-sm"
                aria-label="Close modal"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="w-full relative mt-6 rounded-2xl overflow-hidden border border-zinc-150 shadow-inner bg-zinc-50 aspect-[4/3] flex items-center justify-center">
                <img 
                  src={cvLightbox.img} 
                  alt={cvLightbox.title} 
                  className="max-w-full max-h-full object-contain rounded-xl"
                  onError={(e) => { e.target.src = "https://placehold.co/800x600/e4e4e7/09090b?text=Course+Certificate" }}
                />
              </div>
              
              <div className="w-full text-center mt-5 pt-4 border-t border-zinc-100" style={{ fontFamily: "'Inter', 'Helvetica', sans-serif" }}>
                <h4 className="font-extrabold text-zinc-950 text-base">{cvLightbox.title}</h4>
                <p className="text-zinc-500 text-xs mt-1">{cvLightbox.issuer} — Verified Academic Credential</p>
                <div className="mt-4 flex justify-center space-x-3">
                  <button 
                    onClick={() => setCvLightbox(null)}
                    className="px-5 py-2 rounded-xl border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:text-zinc-950 text-xs font-bold transition-all"
                  >
                    Close Viewer
                  </button>
                  <a
                    href={cvLightbox.img}
                    download={`${cvLightbox.title.replace(/\s+/g, '_')}_Certificate.jpg`}
                    className="px-5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold shadow-md transition-all flex items-center space-x-1.5"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Download Certificate</span>
                  </a>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════
          PRINT & PDF STYLES — Harvard Single-Column Layout
      ═══════════════════════════════════════════════════════════════ */}
      <style>{`
        @media print {
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          html, body, #root, main, .min-h-screen, .harvard-cv-page {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            height: 100% !important;
            overflow: hidden !important;
          }

          @page {
            size: portrait;
            margin: 0 !important;
          }

          .harvard-cv-card {
            max-width: 100% !important;
            width: 100vw !important;
            height: 100vh !important;
            margin: 0 !important;
            padding: 8mm 12mm !important;
            background: white !important;
            border: none !important;
            border-radius: 0 !important;
            box-shadow: none !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }

          .harvard-header {
            padding-bottom: 4px !important;
          }

          .harvard-section {
            margin-top: 10px !important;
          }

          .harvard-heading {
            font-size: 9pt !important;
            padding-bottom: 2px !important;
            margin-bottom: 4px !important;
          }

          .harvard-contact, .harvard-contact-row2 {
            margin-top: 2px !important;
            gap: 8px !important;
          }

          .harvard-bullets {
            margin-top: 2px !important;
          }

          .harvard-cert-item {
            padding: 2px 0 !important;
            margin: 0 !important;
            border-radius: 0 !important;
          }

          h1 { font-size: 16pt !important; line-height: 1.1 !important; }
          h2 { font-size: 9pt !important; }
          h3 { font-size: 8.5pt !important; }
          p, span, li, a { font-size: 7pt !important; line-height: 1.3 !important; }

          .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 4px !important; }
          .space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) { margin-top: 3px !important; }
          .mb-4 { margin-bottom: 8px !important; }
        }

        /* 📄 PDF Download Layout — Exact 1-page A4 */
        #cv-document-card.downloading-pdf {
          display: block !important;
          width: 210mm !important;
          height: 295mm !important;
          padding: 8mm 12mm !important;
          background: white !important;
          border: none !important;
          border-radius: 0 !important;
          box-shadow: none !important;
          box-sizing: border-box !important;
          overflow: hidden !important;
          margin: 0 !important;
        }

        #cv-document-card.downloading-pdf * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        #cv-document-card.downloading-pdf .harvard-header {
          padding-bottom: 4px !important;
        }

        #cv-document-card.downloading-pdf .harvard-section {
          margin-top: 10px !important;
        }

        #cv-document-card.downloading-pdf .harvard-heading {
          font-size: 9pt !important;
          padding-bottom: 2px !important;
          margin-bottom: 4px !important;
        }

        #cv-document-card.downloading-pdf .harvard-contact,
        #cv-document-card.downloading-pdf .harvard-contact-row2 {
          margin-top: 2px !important;
          gap: 8px !important;
        }

        #cv-document-card.downloading-pdf .harvard-bullets {
          margin-top: 2px !important;
        }

        #cv-document-card.downloading-pdf .harvard-cert-item {
          padding: 2px 0 !important;
          margin: 0 !important;
          border-radius: 0 !important;
        }

        #cv-document-card.downloading-pdf h1 { font-size: 16pt !important; line-height: 1.1 !important; }
        #cv-document-card.downloading-pdf h2 { font-size: 9pt !important; }
        #cv-document-card.downloading-pdf h3 { font-size: 8.5pt !important; }
        #cv-document-card.downloading-pdf p, 
        #cv-document-card.downloading-pdf span, 
        #cv-document-card.downloading-pdf li, 
        #cv-document-card.downloading-pdf a { font-size: 7pt !important; line-height: 1.3 !important; }

        #cv-document-card.downloading-pdf .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 4px !important; }
        #cv-document-card.downloading-pdf .space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) { margin-top: 3px !important; }
        #cv-document-card.downloading-pdf .mb-4 { margin-bottom: 8px !important; }
      `}</style>
    </div>
  );
};

export default PrintableCV;
