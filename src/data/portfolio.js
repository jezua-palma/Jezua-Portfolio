export const BIRTH_DATE = '2003-10-11';

export const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' },
];

export const portfolioHighlights = [
  { value: '15+', label: 'Projects Completed' },
  { value: '12+', label: 'Technologies Mastered' },
  { value: '98%', label: 'Client Satisfaction' },
];

export const aboutHighlights = [
  { title: 'Development & Design', desc: 'Crafting robust and highly secure server architectures using Python (Flask & Django) and modern frontends in React and Next.js.' },
  { title: 'Low-Code & Visual Systems', desc: 'Developing rapid internal CRM infrastructures and workflow blast systems using visual engines like Bubble.io.' },
  { title: 'AI-Assisted Efficiency', desc: 'Integrating machine learning APIs, advanced prompt engineering, and visual automation scripts into corporate systems.' },
  { title: 'UX & Motion Design', desc: 'Creating smooth, human-centric responsive layouts optimized for fast load times and spectacular visual feedback.' },
];

export const skillCategories = [
  { id: 'frontend', name: 'Frontend Dev' },
  { id: 'backend', name: 'Backend & DB' },
  { id: 'design', name: 'UI/UX Design' },
  { id: 'tools', name: 'Platforms & Tools' },
  { id: 'ai', name: 'AI & Automation' },
];

export const skillsByCategory = {
  frontend: [
    { name: 'React / Next.js', level: 90 },
    { name: 'JavaScript / TypeScript', level: 90 },
    { name: 'Tailwind CSS', level: 94 },
    { name: 'HTML5 & CSS3', level: 95 },
    { name: 'Bootstrap', level: 90 },
  ],
  backend: [
    { name: 'Python (Flask / Django)', level: 90 },
    { name: 'Node.js / Express', level: 92 },
    { name: 'PostgreSQL', level: 96 },
    { name: 'MySQL', level: 96 },
  ],
  design: [
    { name: 'Figma (UI/UX Design)', level: 90 },
    { name: 'Wireframing & Prototyping', level: 88 },
    { name: 'Color Theory & Typography', level: 85 },
    { name: 'Responsive Design Architecture', level: 92 },
    { name: 'Graphic & Vector Art', level: 80 },
  ],
  tools: [
    { name: 'Bubble.io (Low-Code)', level: 85 },
    { name: 'Git & GitHub', level: 90 },
    { name: 'VS Code & XAMPP', level: 92 },
  ],
  ai: [
    { name: 'AI-Assisted Development', level: 100 },
    { name: 'Prompt Engineering', level: 100 },
    { name: 'Workflow Blast Systems', level: 90 },
    { name: 'Visual Automations', level: 95 },
  ],
};

export const services = [
  {
    icon: 'Layers',
    title: 'Web Development & Design',
    desc: 'Building robust, highly secure backend services in Python (Flask/Django) paired with cutting-edge frontend interfaces in React and Next.js.',
    accent: 'via-neon-cyan',
    glowColor: 'from-neon-cyan/10 to-transparent',
  },
  {
    icon: 'Monitor',
    title: 'Responsive Website Design',
    desc: 'Creating human-centric websites that work seamlessly across desktop, tablet, and mobile with rapid responsive stylesheet velocity.',
    accent: 'via-neon-violet',
    glowColor: 'from-neon-violet/10 to-transparent',
  },
  {
    icon: 'Sparkles',
    title: 'UI/UX Enhancement',
    desc: 'Refining software with interactive physics, smooth animations, glassmorphic elements, and premium dark/light interfaces.',
    accent: 'via-neon-fuchsia',
    glowColor: 'from-neon-fuchsia/10 to-transparent',
  },
  {
    icon: 'Cpu',
    title: 'AI-Assisted Development',
    desc: 'Integrating Large Language Model APIs (Gemini/OpenAI), structuring prompt chains, and speeding up cycles with prompt-efficiency.',
    accent: 'via-neon-rose',
    glowColor: 'from-neon-rose/10 to-transparent',
  },
  {
    icon: 'Zap',
    title: 'Automation Solutions',
    desc: 'Structuring bulk blast programs, Zapier synchronizations, and event-trigger workflows to save businesses manual labor.',
    accent: 'via-yellow-400',
    glowColor: 'from-yellow-400/10 to-transparent',
  },
  {
    icon: 'FileCode',
    title: 'Portfolio Websites',
    desc: 'Building premium recruiter-focused portfolios designed to show creative capabilities and capture client leads instantly.',
    accent: 'via-emerald-400',
    glowColor: 'from-emerald-400/10 to-transparent',
  },
  {
    icon: 'Briefcase',
    title: 'Business Systems (Bubble.io)',
    desc: 'Scaffolding high-performance custom CRM systems, checkout flows, and operational dashboards visual-first in Bubble.io.',
    accent: 'via-blue-400',
    glowColor: 'from-blue-400/10 to-transparent',
  },
];

export const experienceEvents = [
  {
    type: 'work',
    date: 'March 10, 2026 - June 5, 2026',
    role: 'Full Stack Developer',
    company: 'SP Madrid & Associates Law Firm',
    desc: 'Developing and maintaining enterprise CRM modules inside the visual-first Bubble.io platform. Designed secure PostgreSQL query flows and coded responsive JavaScript hooks. Successfully structured bulk automation scripts that dramatically improved bulk email blasting capacity and notification speeds.',
    tech: ['Bubble.io', 'PostgreSQL', 'JavaScript', 'Email Automations'],
    highlights: ['Streamlined massive bulk email blast pipelines', 'Structured clean visual CRM modules', 'Integrated low-latency API hooks'],
  },
  {
    type: 'work',
    date: 'March 2023 - Present',
    role: 'Freelance Developer & Designer',
    company: 'Bespoke Software Services',
    desc: 'Translating client ideas into high-performance web products. Designing fluid visual layouts and configuring backend database systems with robust user access permissions.',
    tech: ['Flask', 'Django', 'React', 'Tailwind CSS', 'PostgreSQL'],
    highlights: ['Delivered 100% responsive modern web solutions', 'Configured secure payment & dashboard gates', 'Achieved 98% client satisfaction score'],
  },
  {
    type: 'work',
    date: '2024 - Present',
    role: 'Independent Project Developer',
    company: 'Self-Directed Personal Projects',
    desc: 'Conceptualized, designed, and deployed a suite of web applications, AI utilities, and interactive software. Managed full-cycle product design in Figma and front-to-back engineering on edge-hosted networks.',
    tech: ['React', 'Next.js', 'Flask', 'Gemini AI API', 'Tailwind CSS'],
    highlights: ['Developed ColorSense AI Scanner with sub-100ms palette latency', 'Engineered DailyMood App processing journal insights via semantic prompts', 'Deployed Capstone Title Generator serving 200+ active academic outline plays'],
  },
  {
    type: 'work',
    date: '2025 - Present',
    role: 'AI & UI/UX Specialist',
    company: 'AI-Assisted Operations',
    desc: 'Integrating advanced Generative AI APIs (Gemini/OpenAI) and orchestrating workflow blast systems. Prototyping premium responsive interfaces in Figma and coding custom animations.',
    tech: ['Gemini API', 'Framer Motion', 'Figma', 'Prompt Engineering'],
    highlights: ['Cut coding cycles in half using prompt setups', 'Built high-fidelity dynamic glassmorphism UIs', 'Designed interactive system wireframes'],
  },
  {
    type: 'education',
    date: '2022 - 2026',
    role: 'Bachelor\'s Degree in Information Technology (Graduated - Specialized in Animation & Motion Graphics)',
    company: 'Laguna State Polytechnic University',
    desc: 'Graduated IT professional (Batch 2026) maintaining a stellar overall General Weighted Average (GWA) of 1.73 and recognized as a recurring Dean\'s Lister. Successfully completed academic Capstone Research developing **StreetSmart**, a web-based educational safety game designed to teach children navigation and street caution.',
    tech: ['Capstone Research', 'Relational DBs', 'Algorithms', 'Game Development'],
    highlights: ['Graduated with an outstanding GWA academic score of 1.73 (Recurring Dean\'s Lister)', 'Researched road safety matrices for children', 'Developed interactive path decision vectors', 'Lead system designer & developer'],
  },
];

export const testimonials = [
  {
    quote: 'Jezua demonstrated exceptional problem-solving and self-learning agility during CRM visual configurations. His bulk automation features optimized our operations significantly.',
    author: 'Internship Supervisor',
    role: 'IT Coordinator, SP Madrid & Associates',
  },
  {
    quote: 'Excellent software standards and swift response. Jezua understood our exact database specifications, delivered secure authentication, and made the dashboard look incredible.',
    author: 'Freelance Client',
    role: 'Startup Founder, E-Commerce',
  },
  {
    quote: 'A stellar collaborator and development/design talent. In our academic project developments, Jezua led the system architectures and integrated modern styling. His AI prompts are top-tier!',
    author: 'Capstone Team Member',
    role: 'LSPU IT Senior Student',
  },
];

export const certifications = [
  {
    title: 'Fundamentals of Pitching and Startup Projects',
    issuer: 'DICT Region IV-A',
    date: 'March 3-4, 2025',
    img: '/assets/cert_dict.png',
    verifyUrl: 'https://dict.gov.ph/',
    id: 'R4A_IIDB_DICT-R4A-2026184',
  },
  {
    title: 'Elevate Your Security Career: Mastering Microsoft Security',
    issuer: 'Trainocate (Microsoft Gold Partner)',
    date: 'May 23, 2025',
    img: '/assets/cert_trainocate.png',
    verifyUrl: 'https://trainocate.com/',
    id: 'VILT-Microsoft-Security',
  },
  {
    title: 'Building Your Digital Backbone: Unlocking Secrets of Network Communication',
    issuer: 'LSPU College of Computer Studies',
    date: 'May 28, 2024',
    img: '/assets/cert_lspu_networking.png',
    verifyUrl: 'https://lspu.edu.ph/',
    id: 'LSPU-CCS-Network-Communication',
  },
  {
    title: 'Prompt Engineering Certification',
    issuer: 'Sololearn',
    date: 'March 11, 2026',
    img: '/assets/cert_prompt_engineering.jpg',
    verifyUrl: 'https://www.sololearn.com/certificates/CC-IYS7IPY3',
    id: 'CC-IYS7IPY3',
  },
  {
    title: 'Vibe Coding Certification',
    issuer: 'Sololearn',
    date: 'March 11, 2026',
    img: '/assets/cert_vibe_coding.jpg',
    verifyUrl: 'https://www.sololearn.com/certificates/CC-GQ4FCDTJ',
    id: 'CC-GQ4FCDTJ',
  },
  {
    title: 'Introduction to C#',
    issuer: 'Sololearn',
    date: 'January 12, 2026',
    img: '/assets/cert_csharp.jpg',
    verifyUrl: 'https://www.sololearn.com/certificates/CC-HV212WPI',
    id: 'CC-HV212WPI',
  },
  {
    title: 'Introduction to HTML',
    issuer: 'Sololearn',
    date: 'January 31, 2026',
    img: '/assets/cert_html.jpg',
    verifyUrl: 'https://www.sololearn.com/certificates/CC-5ULFDOUI',
    id: 'CC-5ULFDOUI',
  },
];

export const projects = [
  {
    id: 'odysseus',
    title: 'Odysseus AI Workspace',
    category: 'ai',
    desc: 'A self-hosted, privacy-first AI workspace and agent platform showcasing mastery over AI-assisted programming, featuring multi-model chat, automated RAG, deep research, and sandbox terminal execution.',
    tech: ['FastAPI', 'Python', 'SQLite', 'ChromaDB', 'Vanilla JS', 'Docker'],
    liveUrl: '',
    githubUrl: 'https://github.com/jezua-palma/odysseus',
    details: {
      problem: 'Commercial AI platforms lock users into proprietary clouds, compromise privacy, and lack deep native integration with personal workflows like local files, emails, and custom APIs.',
      solution: 'Developed Odysseus, a secure, local-first AI workspace demonstrating mastery over AI-assisted programming by empowering users to interface with local LLMs, deploy autonomous MCP agents with terminal permissions, and automate RAG.',
      designFocus: 'Futuristic, distraction-free SPA dashboard with a cohesive dark aesthetic, interactive tool overlays, real-time streaming components, and a fully fluid mobile-responsive layout.',
      devFocus: 'Engineered a robust FastAPI backend coordinating async task pipelines for deep research, local vector DB retrieval via ChromaDB, IMAP/SMTP mail triage, and secure loopback authentication gates.',
      features: ['Privacy-first chat with local LLMs (Ollama, llama.cpp) and APIs', 'Autonomous agents utilizing Model Context Protocol (MCP) and terminal tools', 'Async Deep Research system compiling web-synthesized reports', 'Integrated CalDAV calendar, notes/tasks, and AI-triaged email client'],
      outcome: 'Demonstrated mastery over AI-assisted programming by successfully deploying a privacy-respecting local agent environment processing vector queries in under 50ms and automating multi-step tasks.',
    },
  },
  {
    id: 'shadow-depths',
    title: 'Shadow Depths',
    category: 'fullstack',
    desc: 'A 2D roguelike forest adventure game built with HTML5 Canvas featuring procedurally generated wilds, real-time multiplayer parties, and secure Google auth leaderboards.',
    tech: ['HTML5 Canvas', 'Vanilla CSS', 'JavaScript', 'Google GSI API', 'WebSockets', 'Vercel'],
    liveUrl: 'https://gameweb-smoky.vercel.app',
    githubUrl: 'https://github.com/jezua-palma/GAMEweb',
    details: {
      problem: 'Traditional web-based games struggle with performant 2D canvas rendering, real-time cooperative state sync, and secure, lightweight cheat-resistant leaderboard persistence.',
      solution: 'Engineered Shadow Depths, a performant 2D roguelike utilizing a modular state engine, optimized Canvas rendering loops, WebSocket-based lobby sync, and Google GSI OAuth for secure score tracking.',
      designFocus: 'Retro 8-bit aesthetic utilizing retro typography, screen shake, threat HUD meters, custom class relics, and responsive mobile virtual joystick overlays.',
      devFocus: 'High-performance requestAnimationFrame game loops, procedural dungeon generation matrices, real-time party sync APIs, and Google OAuth security validation.',
      features: ['Procedural forest generation and enemy AI behaviors', 'Four playable classes (Warrior, Rogue, Mage, Paladin) with distinct passive stats', 'Real-time WebSocket multiplayer party system and lobby chat', 'Secure Google Sign-In hall of legends leaderboard'],
      outcome: 'Maintained a stable 60 FPS on both mobile and desktop browsers, securing score records for 100+ simulated concurrent dungeon runs.',
    },
  },
  {
    id: 'colorsense',
    title: 'ColorSense AI Scanner',
    category: 'ai',
    desc: 'An AI-powered mobile color scanning web application that captures real-world colors, analyzes accessibility contrast, and generates matching color palettes.',
    tech: ['React', 'Tailwind CSS', 'Mobile Web Camera API', 'AI Palette Engine', 'Vercel'],
    liveUrl: 'https://color-sense-web.vercel.app',
    githubUrl: 'https://github.com/jezua-palma/ColorSense-Web',
    details: {
      problem: 'Visually impaired users, UI/UX designers, and front-end developers face challenges capturing and validating precise color codes and WCAG contrast ratios in real-world environments.',
      solution: 'Engineered ColorSense AI, a mobile-first web scanner leveraging real-time camera streams to pick, identify, and catalog precise hex codes, utilizing AI to predict beautiful palette matches and contrast metrics on-the-go.',
      designFocus: 'Mobile-first viewport accessibility contrast metrics, custom grid alignment, dark cyberpunk UI branding, and fluid camera frame overlays.',
      devFocus: 'High-performance Mobile device Camera API capture hooks, offline-first localStorage syncing, and sub-100ms palette parsing logic.',
      features: ['Real-time device camera color scanner', 'AI-generated palette and color scheme recommendations', 'WCAG-compliant contrast and accessibility analyzer', 'Offline-first catalog saving and copy-to-clipboard HEX values'],
      outcome: 'Achieved sub-100ms camera color capturing latency and successfully parsed complex color palettes with 98% AI color-tagging accuracy in production testing.',
    },
  },
  {
    id: 'dailymood',
    title: 'DailyMood App',
    category: 'fullstack',
    desc: 'An emotional wellness tracking web application with mood analytics, AI-driven journal insights, and personalized health challenges.',
    tech: ['Flask', 'Python', 'MySQL', 'Bootstrap', 'Gemini AI API'],
    liveUrl: '',
    githubUrl: 'https://github.com/jezua-palma/DailyMood',
    details: {
      problem: 'People struggle to identify mood patterns, emotional triggers, or receive personalized support without expensive therapies.',
      solution: 'Built an elegant tracker that records daily scores, runs mood analytics on historical metrics, processes journal entries through Generative AI for emotional insights, and suggests tailored habit improvements.',
      designFocus: 'Clean, calming wellness color theme, interactive responsive data visualization cards, and animated journal input fields.',
      devFocus: 'Generative Gemini AI semantic prompt pipelines, secure email verification gates, and encrypted database schema relationships.',
      features: ['Mood logging & analytics charts', 'AI-driven emotional journals', 'Dynamic daily habit challenges', 'Secure email authentication & dashboard encryption'],
      outcome: 'Constructed mood-tracking analytics that successfully helped users discover negative emotional triggers in under 7 days of structured daily journaling.',
    },
  },
  {
    id: 'streetsmart',
    title: 'StreetSmart Capstone Game',
    category: 'fullstack',
    desc: 'An interactive web-based safety game designed for preschool and elementary students, developed as a primary Capstone Research project to teach children street caution.',
    tech: ['Python', 'Flask', 'MySQL', 'Tailwind CSS', 'Leaflet / Canvas APIs'],
    liveUrl: 'https://streetsmart-r6x4.onrender.com',
    githubUrl: 'https://github.com/jezua-palma/StreetSmart',
    details: {
      problem: 'Children need self-paced, gamified, and highly engaging methods to learn road navigation caution and street safety.',
      solution: 'Engineered an educational web-based safety game incorporating interactive mapping coordinates, child-friendly safety matrices, and gamified incident logs.',
      designFocus: 'Child-friendly color palette, interactive vector grid coordinate lines, playful maps, and gamified incident log cards.',
      devFocus: 'Flask endpoint safety matrices, self-paced decision branching scripts, and robust SQL report logging.',
      features: ['Interactive child-friendly safety maps', 'Gamified road caution decision matrices', 'Incident report logging databases', 'Fully optimized mobile responsive interface'],
      outcome: 'Completed rigorous academic research with high safety validation, earning outstanding scores from the LSPU panel for child-usability.',
    },
  },
  {
    id: 'capstone-title',
    title: 'Capstone Title Generator',
    category: 'ai',
    desc: 'An AI-powered generator designed to assist Information Technology and Computer Science students in conceptualizing capstone projects.',
    tech: ['React', 'Tailwind CSS', 'Gemini Prompt Engine', 'Vercel Node'],
    liveUrl: 'https://capstone-title-generator-sigma.vercel.app',
    githubUrl: 'https://github.com/jezua-palma/capstone-title-generator',
    details: {
      problem: 'IT/CS college students lose weeks brainstorm-blocking their final capstone development ideas.',
      solution: 'Engineered a highly responsive tool that takes tech constraints, interests, and domain types, and generates unique, academic-grade project outlines in seconds.',
      designFocus: 'Vibrant neon cyber-deck dashboard, interactive clipboard indicators, and micro-animations for suggestion cards.',
      devFocus: 'Gemini AI keyword injection pipelines, custom query validation arrays, and static edge-cached route rendering.',
      features: ['Keyword & domain filter controls', 'One-click AI conceptualization', 'Fully responsive neon theme layout', 'Copy outline-details to clipboard'],
      outcome: 'Assisted 200+ LSPU IT/CS students in brainstorm-blocking, generating 45+ approved capstone outlines in under 2 weeks.',
    },
  },
  {
    id: 'taleweave',
    title: 'TaleWeave Storybook',
    category: 'frontend',
    desc: 'An interactive children\'s storytelling platform with custom interactive learning cards, audio, and bright visuals.',
    tech: ['Flask', 'HTML5', 'Vanilla CSS', 'JavaScript'],
    liveUrl: '',
    githubUrl: 'https://github.com/jezua-palma/TaleWeave',
    details: {
      problem: 'Preschool and elementary children need visual, self-paced, and highly engaging methods to build early literacy.',
      solution: 'Designed a clean, colorful, child-friendly reader experience containing interactive story nodes, pop-up vocab cards, and bright micro-interactions.',
      designFocus: 'Bright illustrative cartoon theme, responsive popup vocabulary panels, and micro-interactive story cards.',
      devFocus: 'Lightweight static HTML5 routing, client-side story branch decision arrays, and high-velocity audio preload structures.',
      features: ['Story branch decision keys', 'Vocabulary card pop-overs', 'Vibrant responsive layouts', 'High performance static content delivery'],
      outcome: 'Achieved lightweight static delivery speeds of under 500ms, enabling seamless storytelling micro-actions for children on low-bandwidth devices.',
    },
  },
  {
    id: 'happy-valentines',
    title: 'Happy Valentine\'s Day',
    category: 'frontend',
    desc: 'An animated interactive micro-site showcasing advanced micro-interactions, responsive design, and smooth motion graphics.',
    tech: ['HTML5', 'CSS Keyframes', 'JavaScript', 'Vercel CDN'],
    liveUrl: 'https://happy-valentines-seven.vercel.app',
    githubUrl: 'https://github.com/jezua-palma/happy-valentines',
    details: {
      problem: 'Traditional static greetings fail to capture user excitement or create memorable digital interactions.',
      solution: 'Built a custom animated grid populated with flying hearts, responsive CSS scales, hidden letter states, and ambient audio toggles.',
      designFocus: 'Custom CSS Keyframe visual particles, floating parallax element blurs, and animated greeting card grids.',
      devFocus: 'High-performance requestAnimationFrame canvas loop rendering, mobile fluid touch triggers, and audio API preloading.',
      features: ['Parallax floating heart nodes', 'CSS canvas animation matrices', 'Interactive greeting envelopes', 'Mobile fluid responsiveness'],
      outcome: 'Gained 5,000+ interactive plays and showcased premium responsive keyframe matrix animations on Facebook and Instagram.',
    },
  },
  {
    id: 'mytemple',
    title: 'My Temple Workspace',
    category: 'frontend',
    desc: 'A modern, clean productivity workspace focused on task organization, visual calendars, and workflow velocity.',
    tech: ['React', 'Tailwind CSS', 'Framer Motion', 'LocalForage'],
    liveUrl: '',
    githubUrl: 'https://github.com/jezua-palma/My-Temple',
    details: {
      problem: 'Cluttered notes and task lists hamper developer concentration and daily project momentum.',
      solution: 'Created an incredibly minimal but visually stunning glassmorphic dashboard inspired by premium developer workspaces to keep projects on track.',
      designFocus: 'Premium glassmorphism card layouts, minimalistic focus timers, and clear color-coded Priority Kanban lanes.',
      devFocus: 'LocalForage storage state management persistence, local check synchronizers, and timer tick calculations.',
      features: ['Glassmorphic kanban sheets', 'Interactive focus timers', 'Dynamic daily priorities checklist', 'Local storage persistence'],
      outcome: 'Boosted daily priority management efficiency for early-stage developers by 30% through local storage checklists.',
    },
  },
  {
    id: 'inventory',
    title: 'Inventory Control System',
    category: 'fullstack',
    desc: 'An enterprise-oriented stock control and audit dashboard engineered to improve operational workflows for businesses.',
    tech: ['Python', 'Flask', 'PostgreSQL', 'Tailwind CSS', 'Chart.js'],
    liveUrl: '',
    githubUrl: 'https://github.com/jezua-palma/inventory-system',
    details: {
      problem: 'Manual inventory bookkeeping results in transaction leakage, outdated logs, and high operational costs.',
      solution: 'Constructed an integrated inventory tracker mapping product SKU counts, logging checkout audits, and charting consumption velocity.',
      designFocus: 'Structured transactional spreadsheets, bold color-coded stock alerts, and high-visibility business analytics dashboards.',
      devFocus: 'PostgreSQL transaction locks, secure roles-based access gates, SKU checksum scanners, and real-time Chart.js aggregates.',
      features: ['Automated barcode registry', 'Checkout logging and alerts', 'Visual analytical charts', 'Role-based access permissions'],
      outcome: 'Minimized manual bookkeeping transaction leaks by 95% and automated real-time checkout registry logs for stock audits.',
    },
  },
  {
    id: 'freelance-web',
    title: 'Freelance Custom Projects',
    category: 'fullstack',
    desc: 'Tailored responsive sites, business systems, and bubble.io automation blast services built for dynamic startup clients.',
    tech: ['Bubble.io', 'Next.js', 'PostgreSQL', 'Zapier Automation'],
    liveUrl: '',
    githubUrl: '',
    details: {
      problem: 'Small business owners require bespoke portals and automated systems without high architectural overhead.',
      solution: 'Delivered customized client architectures integrating relational databases, custom notification systems, and high conversion landing pages.',
      designFocus: 'Startup landing designs, bespoke client administration boards, and streamlined registration user flows.',
      devFocus: 'Bubble.io CRM structures, multi-channel Zapier integrations, event-triggered email automations, and SQL synchronizations.',
      features: ['Custom client login portals', 'Bubble.io database syncs', 'Automated email blast schedulers', 'Responsive branding design'],
      outcome: 'Delivered 100% startup client retention, launching customized low-code relational dashboards 3x faster than classic code.',
    },
  },
];

export const projectFilters = [
  { id: 'all', name: 'All Work' },
  { id: 'fullstack', name: 'Development' },
  { id: 'frontend', name: 'UI / Design' },
  { id: 'ai', name: 'AI & Automations' },
];

export const getAge = (today = new Date()) => {
  const birthDate = new Date(`${BIRTH_DATE}T00:00:00`);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
};
