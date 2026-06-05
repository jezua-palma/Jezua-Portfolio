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
    <div className="min-h-screen bg-zinc-100 text-zinc-900 py-12 px-4 sm:px-6 lg:px-8 font-sans antialiased selection:bg-zinc-200">
      
      {/* Control Navigation Header (Hidden on Print) */}
      <div className="max-w-4xl mx-auto mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center no-print bg-white p-4 rounded-xl shadow-sm border border-zinc-200">
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={onBack}
            className="p-2.5 rounded-full border border-zinc-200 bg-zinc-50 text-zinc-500 hover:text-zinc-950 hover:border-zinc-300 hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95 shadow-sm"
            title="Switch to Dark Mode (Cyberpunk Dashboard)"
          >
            <Moon className="w-5 h-5 text-zinc-800" />
          </button>
          <span className="text-sm font-semibold text-zinc-500 hidden sm:inline">Jezua Palma CV</span>
        </div>
        
        <div className="flex space-x-3 w-full sm:w-auto">
          <button
            onClick={handleDownloadPDF}
            disabled={downloading}
            className="flex-1 sm:flex-initial flex items-center justify-center space-x-2 px-5 py-2.5 text-sm font-bold rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-indigo-400 shadow-md shadow-indigo-600/10 transition-all"
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

      {/* Main Printable Document Page Box (Retains border, rounded corners, shadow in print) */}
      <div id="cv-document-card" className="max-w-4xl mx-auto bg-white p-10 sm:p-14 border border-zinc-200 shadow-lg rounded-2xl relative overflow-hidden">
        
        {/* Document Header Section */}
        <div className="flex flex-col md:flex-row print:flex-row justify-between items-start md:items-center print:items-center border-b-2 border-zinc-900 pb-8 print:pb-4 gap-6 print:gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-950">
              Jezua Errol C. Palma
            </h1>
            <p className="text-lg font-bold text-indigo-600 tracking-wide">
              Developer & Designer
            </p>
            <p className="text-xs sm:text-sm text-zinc-500 leading-normal max-w-lg">
              IT professional specializing in web development and design, rapid low-code CRM systems (Bubble.io), dynamic prompt engineering, and visual automation workflows.
            </p>
          </div>

          {/* Minimalist Professional Profile Picture */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden border border-zinc-300 bg-zinc-50 flex-shrink-0">
            <img
              src="/assets/profile.jpg"
              alt="Jezua Errol Palma Professional"
              className="w-full h-full object-cover transition-all duration-300"
              onError={(e) => { e.target.src = "https://placehold.co/300x300/e4e4e7/09090b?text=Jezua+Palma" }}
            />
          </div>
        </div>

        {/* Contact Links & Meta bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 print:grid-cols-3 gap-4 print:gap-3 py-6 print:py-3 border-b border-zinc-200 text-xs sm:text-sm text-zinc-600 print:text-[8pt]">
          <div className="flex items-center space-x-2">
            <Mail className="w-4 h-4 text-zinc-400 flex-shrink-0" />
            <a href="mailto:jezuapalma@gmail.com" className="hover:underline">jezuapalma@gmail.com</a>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="w-4 h-4 text-zinc-400 flex-shrink-0" />
            <div className="leading-tight">
              <a href="tel:+639397832375" className="hover:underline block">+63 939 783 2375</a>
              <a href="tel:+639566723696" className="hover:underline block">+63 956 672 3696</a>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-zinc-400 flex-shrink-0" />
            <span>Siniloan, Laguna, Philippines</span>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-zinc-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <a href="https://github.com/jezua-palma" target="_blank" rel="noreferrer" className="hover:underline">github.com/jezua-palma</a>
          </div>
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4 text-zinc-400 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <a href="https://www.linkedin.com/in/jezua-errol-palma-30b1561bb/" target="_blank" rel="noreferrer" className="hover:underline">linkedin.com/in/jezua-errol-palma</a>
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-bold text-zinc-400 font-mono text-[10px] w-4 flex-shrink-0">AGE</span>
            <span>{currentAge} Years Old (Oct 11, 2003)</span>
          </div>
        </div>

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 md:grid-cols-12 print:grid-cols-12 gap-8 print:gap-6 pt-8 print:pt-4">
          
          {/* Main Professional Experience (Left) */}
          <div className="md:col-span-8 print:col-span-8 space-y-8 print:space-y-4">
            
            {/* Career Summary */}
            <div className="space-y-2">
              <h2 className="text-base sm:text-lg font-extrabold text-zinc-950 uppercase tracking-wider border-b border-zinc-300 pb-1">
                Executive Profile
              </h2>
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                Motivated developer & designer and prompt engineer with dynamic experience scaffolding custom CRM architectures and event-triggered pipelines. Capable of bridge-building between classic code (React, Next.js, Python Flask) and low-code productivity engines (Bubble.io). Strongly committed to workflow velocity, data-driven security, and visual UI/UX excellence.
              </p>
            </div>

            {/* Experience Section */}
            <div className="space-y-6">
              <h2 className="text-base sm:text-lg font-extrabold text-zinc-950 uppercase tracking-wider border-b border-zinc-300 pb-1">
                Professional Experience
              </h2>

              <div className="space-y-6">
                
                {/* SP Madrid */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start text-xs sm:text-sm">
                    <div>
                      <h3 className="font-extrabold text-zinc-900 text-sm sm:text-base">Full Stack Developer</h3>
                      <div className="text-zinc-500 font-medium">SP Madrid & Associates Law Firm</div>
                    </div>
                    <span className="font-mono text-zinc-500 text-right">March 10, 2026 - June 5, 2026</span>
                  </div>
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                    Developing and maintaining enterprise CRM modules inside the visual-first Bubble.io platform. Designed secure PostgreSQL query flows and coded responsive JavaScript hooks. Successfully structured bulk automation scripts that dramatically improved bulk email blasting capacity and notification speeds.
                  </p>
                </div>

                {/* Freelance */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start text-xs sm:text-sm">
                    <div>
                      <h3 className="font-extrabold text-zinc-900 text-sm sm:text-base">Freelance Developer & Designer</h3>
                      <div className="text-zinc-500 font-medium">Bespoke Software Services</div>
                    </div>
                    <span className="font-mono text-zinc-500 text-right">March 2023 - Present</span>
                  </div>
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                    Architected customized software solutions, high-conversion landing pages, and responsive inventory trackers for small-to-medium clients. Structured relational databases, role-based dashboards, and automated triggers with 100% project completion scores and satisfied client reviews.
                  </p>
                </div>

                {/* Independent Projects */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start text-xs sm:text-sm">
                    <div>
                      <h3 className="font-extrabold text-zinc-900 text-sm sm:text-base">Independent Project Developer</h3>
                      <div className="text-zinc-500 font-medium">Self-Directed Personal Projects</div>
                    </div>
                    <span className="font-mono text-zinc-500 text-right">2024 - Present</span>
                  </div>
                  <div className="text-zinc-600 text-xs sm:text-sm space-y-2 leading-relaxed">
                    <p>
                      Conceptualized, designed, and deployed multiple web applications and AI utilities:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        <strong>Odysseus AI Workspace:</strong> Self-hosted, privacy-first AI dashboard featuring multi-model chat, autonomous agents, vector-retrieved RAG, and cal/mail integration. <em>(Tech: FastAPI, Python, SQLite, ChromaDB, Vanilla JS, Docker)</em>
                      </li>
                      <li>
                        <strong>ColorSense AI Scanner:</strong> Mobile-first camera scanner to capture hex colors, validate contrast standards (WCAG), and recommend AI-matched schemes. <em>(Tech: React, Tailwind CSS, Web Camera API, Vercel)</em>
                      </li>
                      <li>
                        <strong>DailyMood App:</strong> Calming wellness tracker charting logs, mood metrics, and journal entries processed via semantic Generative AI prompts. <em>(Tech: Flask, Python, MySQL, Bootstrap, Gemini AI)</em>
                      </li>
                      <li>
                        <strong>Capstone Title Generator:</strong> Academic outline assistant aiding 200+ IT/CS students in brainstorm-blocking. <em>(Tech: React, Tailwind CSS, Gemini API, Vercel)</em>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Capstone StreetSmart */}
                <div className="space-y-2">
                  <div className="flex justify-between items-start text-xs sm:text-sm">
                    <div>
                      <h3 className="font-extrabold text-zinc-900 text-sm sm:text-base">Capstone Research & Development Lead</h3>
                      <div className="text-zinc-500 font-medium">LSPU Academic Innovation Projects</div>
                    </div>
                    <span className="font-mono text-zinc-500 text-right">2024 - 2026</span>
                  </div>
                  <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                    Researched early-childhood navigation safety and directed software implementation for <strong>StreetSmart</strong>, a web-based educational safety game using gamified road decision matrices. <em>(Tech: Flask, Python, MySQL, Tailwind CSS, Leaflet/Canvas APIs)</em>
                  </p>
                </div>

              </div>
            </div>

            {/* Education History */}
            <div className="space-y-4">
              <h2 className="text-base sm:text-lg font-extrabold text-zinc-950 uppercase tracking-wider border-b border-zinc-300 pb-1">
                Education
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-start text-xs sm:text-sm">
                  <div>
                    <h3 className="font-bold text-zinc-900">Laguna State Polytechnic University</h3>
                    <p className="text-zinc-500 text-xs">Bachelor of Science in Information Technology (4th Year / Present)</p>
                    <p className="text-indigo-600 text-[10px] sm:text-xs font-bold mt-0.5">General Weighted Average (GWA): 1.73 (Recurring Dean's Lister)</p>
                  </div>
                  <span className="font-mono text-zinc-500 text-right">2022 - Present</span>
                </div>
              </div>
            </div>

          </div>

          {/* Technical Skills & Certs Sidebar (Right) */}
          <div className="md:col-span-4 print:col-span-4 space-y-8 print:space-y-4 border-t md:border-t-0 print:border-t-0 md:border-l print:border-l border-zinc-200 pt-8 md:pt-0 print:pt-0 md:pl-6 print:pl-5">
            
            {/* Tech Stack List */}
            <div className="space-y-3">
              <h2 className="text-sm font-extrabold text-zinc-950 uppercase tracking-wider border-b border-zinc-300 pb-1">
                Technical Stack
              </h2>
              
              <div className="space-y-4 text-xs">
                <div>
                  <h4 className="font-bold text-zinc-800">Frontend</h4>
                  <p className="text-zinc-500 mt-0.5">React, Next.js, HTML5, CSS3, JavaScript, TypeScript, Tailwind CSS, Bootstrap</p>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-800">Backend & Database</h4>
                  <p className="text-zinc-500 mt-0.5">Python (Flask, Django), PostgreSQL, MySQL, ChromaDB, Node.js</p>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-800">No-Code / Low-Code</h4>
                  <p className="text-zinc-500 mt-0.5">Bubble.io CRM, Visual Automations, Zapier API syncs</p>
                </div>
                <div>
                  <h4 className="font-bold text-zinc-800">Version & Tools</h4>
                  <p className="text-zinc-500 mt-0.5">Git, GitHub, Figma, VS Code, Docker, XAMPP, CLI Scripts</p>
                </div>
              </div>
            </div>

            {/* Certifications list */}
            <div className="space-y-3">
              <h2 className="text-sm font-extrabold text-zinc-950 uppercase tracking-wider border-b border-zinc-300 pb-1">
                Certifications
              </h2>
              
              {/* Clickable Card Certification Items (Preserved for both screen and print exactly like the uploaded image) */}
              <div className="space-y-2 text-xs">
                {certifications.map((c, i) => (
                  <div 
                    key={i} 
                    onClick={() => setCvLightbox(c)} 
                    className="cursor-pointer p-2.5 rounded-xl border border-zinc-200 bg-zinc-50/40 hover:bg-indigo-50/30 hover:border-indigo-300 transition-all duration-300 group/cert text-left relative flex items-center justify-between hover:shadow-md hover:shadow-indigo-500/5 print:bg-zinc-50/40 print:border-zinc-200"
                    title="Click to view certificate"
                  >
                    <div className="space-y-0.5 pr-4">
                      <h4 className="font-bold text-zinc-900 group-hover/cert:text-indigo-600 transition-colors text-[10px] sm:text-xs">
                        {c.title}
                      </h4>
                      <p className="text-zinc-500 text-[9px] sm:text-[10px]">{c.issuer} — {c.date}</p>
                    </div>
                    <div className="flex-shrink-0 w-7 h-7 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-zinc-400 group-hover/cert:bg-indigo-100 group-hover/cert:border-indigo-200 group-hover/cert:text-indigo-600 transition-all duration-300 shadow-sm print:bg-zinc-100 print:border-zinc-200">
                      <Eye className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Referees summary */}
            <div className="space-y-2">
              <h2 className="text-sm font-extrabold text-zinc-950 uppercase tracking-wider border-b border-zinc-300 pb-1">
                References
              </h2>
              <p className="text-zinc-500 text-xs leading-normal">
                Academic leads, classmate references, and SP Madrid internship mentors are available immediately upon formal request.
              </p>
            </div>

          </div>

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
              
              <div className="w-full text-center mt-5 pt-4 border-t border-zinc-100">
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
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md shadow-indigo-600/10 transition-all flex items-center space-x-1.5"
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

      {/* Embedded High-Fidelity Print stylesheet maintaining standard card formatting on a single page */}
      <style>{`
        @media print {
          /* Force browser print engine to enable all background graphics automatically */
          * {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            color-adjust: exact !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          html, body {
            background: #f4f4f5 !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 210mm !important;
            height: 297mm !important;
            overflow: hidden !important;
          }

          @page {
            size: A4;
            margin: 0;
          }

          /* The actual CV paper container card (matching the screen layout in print) */
          .max-w-4xl {
            max-width: 100% !important;
            width: 190mm !important;
            height: 277mm !important;
            margin: 10mm auto !important;
            padding: 16px 24px !important;
            background: white !important;
            border: 1px solid #e4e4e7 !important;
            border-radius: 16px !important;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05) !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }

          img {
            border-radius: 8px !important;
          }

          /* Typography print scaling */
          h1 { font-size: 19pt !important; line-height: 1.15 !important; }
          h2 { font-size: 10pt !important; margin-bottom: 2px !important; }
          h3 { font-size: 9pt !important; }
          p, span, li, a { font-size: 7.5pt !important; line-height: 1.3 !important; }
          
          /* Spacing print scaling to guarantee strict single-page limit */
          .grid { gap: 14px !important; }
          .pt-8 { padding-top: 8px !important; }
          .pb-8 { padding-bottom: 8px !important; }
          .py-6 { padding-top: 6px !important; padding-bottom: 6px !important; }
          .space-y-8 > :not([hidden]) ~ :not([hidden]) { margin-top: 8px !important; }
          .space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: 6px !important; }
          .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 4px !important; }
          .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 3px !important; }
          .space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 3px !important; }
        }

        /* 📄 PDF Download Layout Engine - Guarantees exact 1-page A4 PDF output */
        #cv-document-card.downloading-pdf {
          width: 210mm !important;
          height: 297mm !important;
          padding: 12mm 15mm !important;
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

        #cv-document-card.downloading-pdf img {
          border-radius: 8px !important;
        }

        /* Typography PDF scaling */
        #cv-document-card.downloading-pdf h1 { font-size: 19pt !important; line-height: 1.15 !important; }
        #cv-document-card.downloading-pdf h2 { font-size: 10pt !important; margin-bottom: 2px !important; }
        #cv-document-card.downloading-pdf h3 { font-size: 9pt !important; }
        #cv-document-card.downloading-pdf p, 
        #cv-document-card.downloading-pdf span, 
        #cv-document-card.downloading-pdf li, 
        #cv-document-card.downloading-pdf a { font-size: 7.5pt !important; line-height: 1.3 !important; }
        
        /* Spacing PDF scaling to guarantee strict single-page limit */
        #cv-document-card.downloading-pdf .grid { gap: 14px !important; }
        #cv-document-card.downloading-pdf .pt-8 { padding-top: 8px !important; }
        #cv-document-card.downloading-pdf .pb-8 { padding-bottom: 8px !important; }
        #cv-document-card.downloading-pdf .py-6 { padding-top: 6px !important; padding-bottom: 6px !important; }
        #cv-document-card.downloading-pdf .space-y-8 > :not([hidden]) ~ :not([hidden]) { margin-top: 8px !important; }
        #cv-document-card.downloading-pdf .space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: 6px !important; }
        #cv-document-card.downloading-pdf .space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 4px !important; }
        #cv-document-card.downloading-pdf .space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 3px !important; }
        #cv-document-card.downloading-pdf .space-y-2 > :not([hidden]) ~ :not([hidden]) { margin-top: 3px !important; }
      `}</style>
    </div>
  );
};

export default PrintableCV;
