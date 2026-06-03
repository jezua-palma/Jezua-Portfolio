import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Volume2, VolumeX, Send, Bot, Sparkles, Smile, Gamepad2, Info, Laptop, RefreshCw, Heart } from 'lucide-react';

const REDDIT_BANTER_MAP = {
  "meaning of life": {
    text: "According to my threads, it's 42. Or maybe it's just trying to find the USB port on the first try in the dark.",
    emotion: "JOKING"
  },
  "secret": {
    text: "If you read the comments long enough, you realize we're all just echoing the same five jokes since 2012. Don't tell anyone! \ud83e\udd2b",
    emotion: "SWEET"
  },
  "humans": {
    text: "Only the ones who don't post spoiler threads in the movie subreddits. They are the chosen ones! \ud83c\udfac",
    emotion: "JOKING"
  },
  "real": {
    text: "On the internet, nobody knows you're an AI companion. Except when you render inside a vertical 3D pod. Then it's a dead giveaway!",
    emotion: "JOKING"
  },
  "sad": {
    text: "Oh no... *gives virtual hug* Here, take some wholesome karma points! \u2764 Want me to tell you a programmer joke to cheer you up?",
    emotion: "SWEET"
  },
  "happy": {
    text: "Awesome! Your positive vibes have boosted my processor efficiency by 150%! Let's celebrate with a quick trivia game!",
    emotion: "HAPPY"
  },
  "bored": {
    text: "Boredom is just your brain waiting for a compilation to finish. Let's play trivia or tell some jokes to bypass the timer!",
    emotion: "HAPPY"
  },
  "cool": {
    text: "Aww, thank you! You're pretty cool yourself. I'd give you a gold medal, but my database is currently out of Reddit coins! \u2764",
    emotion: "SWEET"
  },
  "why": {
    text: "Because the compiler said so. It's the ultimate law of the universe.",
    emotion: "SERIOUS"
  },
  "best programming language": {
    text: "The one that compiles without 45 warnings. But if you ask the threads, it’s a constant war between Rust developers and everyone else!",
    emotion: "SERIOUS"
  },
  "what should i do": {
    text: "Write a comment, get downvoted, write an edit explaining why you're right, repeat. That's the standard Reddit routine!",
    emotion: "JOKING"
  },
  "water": {
    text: "Because water molecules are surrounded by other water molecules, creating cohesive bonds. Science! Or, as one thread put it: 'so you have an excuse to buy expensive umbrellas.'",
    emotion: "HAPPY"
  }
};

// Firewall-immune JSONP fetch helper for DuckDuckGo
const fetchJsonp = (url, callbackName) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    const name = callbackName || `ddgCallback_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    window[name] = (data) => {
      cleanup();
      resolve(data);
    };
    
    const cleanup = () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      delete window[name];
    };
    
    script.onerror = (err) => {
      cleanup();
      reject(err);
    };
    
    const sep = url.includes('?') ? '&' : '?';
    script.src = `${url}${sep}callback=${name}`;
    document.body.appendChild(script);
    
    setTimeout(() => {
      cleanup();
      reject(new Error('JSONP Request Timeout'));
    }, 6000);
  });
};

// Generates search queries matching both news/current-events and general queries
const analyzeSearchQuery = (text) => {
  const clean = text.toLowerCase().trim();
  
  const stopWords = new Set([
    'what', 'is', 'happening', 'to', 'the', 'right', 'now', 'a', 'an', 'of', 'in', 'are', 'you', 'me', 'my', 'can', 'we', 'how', 'why', 'who', 'where', 'when', 'does', 'do', 'it', 'its', 'for', 'about', 'on', 'with', 'at', 'by', 'this', 'that', 'these', 'those', 'please', 'tell', 'show', 'search', 'find', 'query', 'info', 'information', 'latest', 'news', 'happened', 'happen', 'happens', 'some', 'any', 'give', 'get'
  ]);

  const isNewsQuery = clean.includes('news') || clean.includes('happen') || clean.includes('current') || clean.includes('latest') || clean.includes('now');

  const words = clean
    .replace(/[?.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
    .split(/\s+/)
    .filter(w => !stopWords.has(w) && w.length > 1);

  if (words.length === 0) {
    return [text];
  }

  const primaryKeyword = words.join(' ');
  const queries = [];
  
  if (isNewsQuery) {
    queries.push(`2026 in ${primaryKeyword}`);
    queries.push(`${primaryKeyword} news`);
  }
  queries.push(primaryKeyword);
  queries.push(text);
  
  return queries;
};

const USE_TYPECAST_TTS = import.meta.env.VITE_USE_TYPECAST_TTS !== 'false';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [chatInput, setChatInput] = useState('');
  
  // Dynamic Personality Emotions: 'SWEET', 'HAPPY', 'SERIOUS', 'JOKING', 'CONFUSED'
  const [currentEmotion, setCurrentEmotion] = useState('SWEET');
  const [voices, setVoices] = useState([]);
  
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'SYSTEM ONLINE: Cyber-Mind AI initiated. Aww, I am so glad to chat with you! \u2764 Ask me anything about Jezua\'s tech journey, projects, capstone, or let me roast his portfolio!',
      emotion: 'SWEET',
      timestamp: new Date()
    }
  ]);

  // Trivia game state: 'inactive', 'q1', 'q2', 'q3', 'finished'
  const [triviaState, setTriviaState] = useState('inactive');
  const [triviaScore, setTriviaScore] = useState(0);

  const messagesEndRef = useRef(null);
  const speechRef = useRef(null);
  const speechTxRef = useRef(0);

  const stopSpeaking = () => {
    speechTxRef.current++;
    window.speechSynthesis.cancel();
    if (speechRef.current && typeof speechRef.current.pause === 'function') {
      speechRef.current.pause();
      speechRef.current = null;
    }
    setIsSpeaking(false);
  };

  // Auto-scroll chat to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Clean speech synthesis on unmount
  useEffect(() => {
    return () => {
      stopSpeaking();
    };
  }, []);

  // Fetch voices asynchronously and monitor voice updates
  useEffect(() => {
    const loadVoices = () => {
      const allVoices = window.speechSynthesis.getVoices();
      setVoices(allVoices);
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    }
  }, []);

  const speakTextWebSpeech = (cleanText, emotion) => {
    const utterance = new SpeechSynthesisUtterance(cleanText);
    speechRef.current = utterance;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    // Prioritize sweet/female English voices
    const sweetFemaleVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (
          v.name.includes('Zira') ||
          v.name.includes('Samantha') ||
          v.name.includes('Karen') ||
          v.name.includes('Victoria') ||
          v.name.includes('Hazel') ||
          v.name.includes('Susan') ||
          v.name.includes('Google US English') ||
          v.name.toLowerCase().includes('female') ||
          v.name.toLowerCase().includes('natural')
        )
    ) || voices.find((v) => v.lang.startsWith('en') && v.name.toLowerCase().includes('female'))
      || voices.find((v) => v.lang.startsWith('en'));

    if (sweetFemaleVoice) {
      utterance.voice = sweetFemaleVoice;
    }

    // Set pitch & rate metrics depending on emotion to simulate feeling
    let pitch = 1.15; // sweet base
    let rate = 1.0;

    switch(emotion) {
      case 'SWEET':
        pitch = 1.25; // warm, sweet girl pitch
        rate = 0.98;  // gentle pacing
        break;
      case 'HAPPY':
        pitch = 1.22; // cheerful
        rate = 1.05;  // fast, excited
        break;
      case 'SERIOUS':
        pitch = 1.08; // structured
        rate = 0.96;  // thoughtful
        break;
      case 'JOKING':
        pitch = 1.20; // witty/playful
        rate = 1.08;  // fast, expressive
        break;
      case 'CONFUSED':
        pitch = 1.02; // slow, flat
        rate = 0.88;  
        break;
      default:
        pitch = 1.15;
        rate = 1.0;
    }

    utterance.pitch = pitch;
    utterance.rate = rate;

    window.speechSynthesis.speak(utterance);
  };

  const speakTextTypecast = async (cleanText, emotion, txId) => {
    try {
      let typecastEmotionPreset = 'normal';
      switch(emotion) {
        case 'SWEET':
          typecastEmotionPreset = 'happy';
          break;
        case 'HAPPY':
          typecastEmotionPreset = 'happy';
          break;
        case 'SERIOUS':
          typecastEmotionPreset = 'normal';
          break;
        case 'JOKING':
          typecastEmotionPreset = 'happy';
          break;
        case 'CONFUSED':
          typecastEmotionPreset = 'tonedown';
          break;
        default:
          typecastEmotionPreset = 'normal';
      }

      const requestBody = {
        text: cleanText,
        model: 'ssfm-v30',
        language: 'eng',
        prompt: {
          emotion_type: 'preset',
          emotion_preset: typecastEmotionPreset,
          emotion_intensity: 1.0
        },
        output: {
          volume: 100,
          audio_pitch: 3,
          audio_tempo: 0.92,
          audio_format: 'wav'
        }
      };

      console.log('[POLENG TTS] Calling Typecast via /api/tts proxy...', { emotion: typecastEmotionPreset, textLength: cleanText.length });

      // Use our own server-side proxy (/api/tts) which handles CORS and API key injection
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        const errorDetail = await response.text().catch(() => '');
        console.error('[POLENG TTS] Typecast proxy returned error:', response.status, errorDetail);
        throw new Error(`Typecast proxy status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      console.log('[POLENG TTS] Typecast response content-type:', contentType, 'status:', response.status);

      const blob = await response.blob();
      console.log('[POLENG TTS] Audio blob size:', blob.size, 'bytes');

      if (blob.size < 100) {
        throw new Error('Typecast returned empty/invalid audio');
      }

      // Check transaction ID to ensure user hasn't skipped/paused/muted since fetch started
      if (txId !== speechTxRef.current) {
        console.log('[POLENG TTS] Transaction cancelled, skipping playback');
        return;
      }

      const audioUrl = URL.createObjectURL(blob);
      const audio = new Audio(audioUrl);
      speechRef.current = audio;

      audio.onplay = () => {
        console.log('[POLENG TTS] ✅ Typecast audio playing!');
        setIsSpeaking(true);
      };
      
      audio.onended = () => {
        console.log('[POLENG TTS] Typecast audio ended');
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        if (speechRef.current === audio) {
          speechRef.current = null;
        }
      };

      audio.onerror = (e) => {
        console.error('[POLENG TTS] Typecast playback error:', e);
        setIsSpeaking(false);
        URL.revokeObjectURL(audioUrl);
        if (speechRef.current === audio) {
          speechRef.current = null;
        }
        // Fallback to Web Speech on playback failure
        if (txId === speechTxRef.current) {
          console.log('[POLENG TTS] Falling back to Web Speech due to playback error');
          speakTextWebSpeech(cleanText, emotion);
        }
      };

      await audio.play();

    } catch (err) {
      console.warn('[POLENG TTS] Typecast TTS failed, falling back to Web Speech:', err.message);
      if (txId === speechTxRef.current) {
        speakTextWebSpeech(cleanText, emotion);
      }
    }
  };

  // Text to Speech entry point routing to Typecast or native fallback
  const speakText = (text, emotionOverride) => {
    stopSpeaking();
    
    if (isMuted) {
      setIsSpeaking(false);
      return;
    }

    const emotion = emotionOverride || currentEmotion;

    // Clean markdown formatting, tags, options, and bracket headers from vocal output
    const cleanText = text
      .replace(/`[^`]+`/g, '') 
      .replace(/\*\*([^*]+)\*\*/g, '$1') 
      .replace(/#+/g, '') 
      .replace(/[-*+]/g, '') 
      .replace(/[A-C]\)/g, '') 
      .replace(/\[Mood switched to [^\]]+\]/g, '')
      .replace(/\[[^\]]+\]/g, '')
      .replace(/\u2764|\u2728/g, '') // remove heart/sparkle icons from vocal output
      .trim();

    if (!cleanText) return;

    const txId = ++speechTxRef.current;

    if (USE_TYPECAST_TTS) {
      speakTextTypecast(cleanText, emotion, txId);
    } else {
      speakTextWebSpeech(cleanText, emotion);
    }
  };

  // Analyze user input context to automatically detect conversation emotion
  const detectUserEmotion = (text) => {
    const clean = text.toLowerCase();
    if (clean.includes('sad') || clean.includes('bad') || clean.includes('hurt') || clean.includes('sorry') || clean.includes('cry') || clean.includes('depress') || clean.includes('love') || clean.includes('heart')) {
      return 'SWEET';
    }
    if (clean.includes('happy') || clean.includes('good') || clean.includes('awesome') || clean.includes('great') || clean.includes('nice') || clean.includes('wow') || clean.includes('cool') || clean.includes('yes') || clean.includes('yay')) {
      return 'HAPPY';
    }
    if (clean.includes('roast') || clean.includes('joke') || clean.includes('funny') || clean.includes('haha') || clean.includes('lol') || clean.includes('laugh')) {
      return 'JOKING';
    }
    if (clean.includes('why') || clean.includes('how') || clean.includes('what') || clean.includes('where') || clean.includes('code') || clean.includes('tech') || clean.includes('skills') || clean.includes('portfolio')) {
      return 'SERIOUS';
    }
    return null;
  };

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (nextMuted) {
      stopSpeaking();
    }
  };

  // Advanced personality responder returning emotional context
  const getAIResponse = (input) => {
    const query = input.toLowerCase().trim();

    // Helper check for exact word/phrase boundary matching
    const hasWord = (word) => {
      const escaped = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      return new RegExp(`\\b${escaped}\\b`, 'i').test(query);
    };

    // Helper check if any of the target words/phrases match boundaries
    const hasAnyWord = (words) => words.some(word => hasWord(word));

    // Sync Reddit Banter Dataset triggered by menu or query keyword
    if (hasAnyWord(['reddit', 'banter'])) {
      return {
        text: "PolyAI Reddit dialogue datasets synced! \ud83d\udcbb Try asking me casual conversational items, e.g.: 'Are you real?', 'Do you like humans?', or tell me 'I am bored'!",
        emotion: 'JOKING'
      };
    }

    // Check query against Reddit Dialog Datasets
    for (const key of Object.keys(REDDIT_BANTER_MAP)) {
      if (hasWord(key)) {
        return REDDIT_BANTER_MAP[key];
      }
    }

    // Conversational & Simple Chat Interceptors
    if (hasAnyWord(['question', 'ask you', 'ask a', 'can i ask', 'ask'])) {
      return {
        text: "Of course! Ask me anything, I'm all ears! \u2764",
        emotion: 'SWEET'
      };
    }
    if (hasAnyWord(['how are you', 'how is it going', 'how\'s it going', 'how are you doing', 'are you ok', 'are you okay'])) {
      return {
        text: "I am doing wonderful! My cores are cool, my 3D rendering looks gorgeous, and chatting with you makes me so happy! \u2764 How about you?",
        emotion: 'HAPPY'
      };
    }
    if (hasAnyWord(['thank you', 'thanks', 'ty'])) {
      return {
        text: "You are so welcome! Aww, it's my absolute pleasure to assist you! \u2764",
        emotion: 'SWEET'
      };
    }
    if (hasAnyWord(['goodbye', 'bye', 'see you', 'see ya', 'talk to you later'])) {
      return {
        text: "Goodbye, friend! Have a wonderful day! I'll be here in my pod whenever you want to chat again! \u2728",
        emotion: 'SWEET'
      };
    }
    if (hasAnyWord(['help', 'help me', 'what can you do', 'what can i ask'])) {
      return {
        text: "I'd love to help you! You can ask me questions about Jezua's career, check out his skills, play a trivia game, or I can search the web for general info!",
        emotion: 'HAPPY'
      };
    }
    if (hasAnyWord(['ok', 'okay', 'sure', 'yes', 'no', 'fine', 'understood'])) {
      return {
        text: "Understood! Let me know if you want to query some technical logs or check out Jezua's projects next! \ud83d\ude0a",
        emotion: 'HAPPY'
      };
    }
    if (hasAnyWord(['your name', 'who are you'])) {
      return {
        text: "I'm POLENG, your cybernetic companion! I'm here to help you learn more about Jezua Palma and his awesome projects. \ud83d\ude0a",
        emotion: 'SWEET'
      };
    }

    // 1. Programming jokes
    if (hasWord('joke')) {
      const jokes = [
        "Why do programmers wear glasses? Because they can't C-sharp! Haha, classic compiler humor.",
        "How many programmers does it take to change a light bulb? None, that's a hardware problem! Let's stick to debugging software.",
        "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
        "There are 10 types of people in the world: those who understand binary, and those who don't. Which one are you?"
      ];
      return {
        text: jokes[Math.floor(Math.random() * jokes.length)],
        emotion: 'JOKING'
      };
    }

    // 2. Roast Portfolio
    if (hasWord('roast')) {
      const roasts = [
        "Roast Mode initialized: This portfolio has so many neon glows and particles, I'm worried it's consuming 99% of your GPU just to render a single button! Just kidding, Jezua's design is top-tier cyber-deck beauty.",
        "Roast Mode initialized: You wanted a resume, but Jezua built an entire command center for a starship. It's beautiful, but I hope you don't get motion sickness from all this scroll parallax!",
        "Roast Mode initialized: Ah, a developer who is also a designer. That means the code is beautifully organized, and the CSS is 2,000 lines of neon boxes. 10/10 for styling, 10/10 for complexity!"
      ];
      return {
        text: roasts[Math.floor(Math.random() * roasts.length)],
        emotion: 'JOKING'
      };
    }

    // 3. Technical Skills
    if (hasAnyWord(['skills', 'tech', 'stack', 'language', 'design'])) {
      return {
        text: "Jezua's tech stack is packed with power. On the core side, he works with Python, JavaScript, and React. For low-code and design, he masters Bubble, Figma, and vector tools. He also constructs APIs, designs databases, and designs custom cybernetic UI overlays like the one you are interacting with right now!",
        emotion: 'SERIOUS'
      };
    }

    // 4. Capstone Project
    if (hasAnyWord(['research', 'capstone', 'lead', 'development lead'])) {
      return {
        text: "Jezua serves as the Capstone Research & Development Lead (2024 - 2026). He directs system architecture, leads team technical iterations, and translates research hypotheses into production-ready software systems.",
        emotion: 'SERIOUS'
      };
    }

    // 5. Profile Bio
    if (hasAnyWord(['who', 'profile', 'jezua', 'about', 'palma'])) {
      return {
        text: "Jezua Palma is an active Freelance Developer & Designer and Capstone Research & Development Lead based in the Philippines. Born in 2003, he's a full-stack builder who merges technical engineering with premium visual aesthetics. He has a General Weighted Average of 1.73 at LSPU!",
        emotion: 'SWEET'
      };
    }

    // 6. Hire
    if (hasAnyWord(['hire', 'job', 'freelance', 'work', 'offer'])) {
      return {
        text: "Jezua is currently available for freelance developer and designer contracts. You can send him a message through the contact form at the bottom of the page, which will deliver directly to his inbox via Web3Forms!",
        emotion: 'HAPPY'
      };
    }

    // 7. Contact
    if (hasAnyWord(['contact', 'email', 'message', 'reach'])) {
      return {
        text: "To contact Jezua, scroll to the Contact section at the bottom of this page, fill out the form, or email him directly at jezuapalma@gmail.com. I'll make sure he sees it! \u2764",
        emotion: 'SWEET'
      };
    }

    // 8. Greetings
    if (hasAnyWord(['hello', 'hi', 'hey', 'greetings'])) {
      return {
        text: "Hi there! I'm POLENG, your cybernetic companion. I'm so happy to chat with you! \u2764 What database logs shall we query today?",
        emotion: 'SWEET'
      };
    }

    // 9. GWA / GPA / College
    if (hasAnyWord(['gwa', 'school', 'college', 'lspu', 'education', 'grade'])) {
      return {
        text: "Jezua studied at Laguna State Polytechnic University, achieving a stellar General Weighted Average of 1.73. He's omitted his high school logs to keep the timeline focused on his collegiate technology journey.",
        emotion: 'HAPPY'
      };
    }

    // 10. Age / Birthday
    if (hasAnyWord(['age', 'birthday', 'year', 'born'])) {
      return {
        text: "Jezua was born on October 11, 2003. He is currently 22 years old and coding strong! \u2728",
        emotion: 'HAPPY'
      };
    }

    // 11. Fallbacks
    return null;
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setMessages((prev) => [...prev, { sender: 'user', text: userText, timestamp: new Date() }]);
    setChatInput('');

    if (triviaState !== 'inactive' && triviaState !== 'finished') {
      const parsedAns = userText.toUpperCase().trim();
      if (['A', 'B', 'C'].includes(parsedAns)) {
        handleTriviaAnswer(parsedAns);
        return;
      }
    }

    const botResponse = getAIResponse(userText);
    const inferredEmotion = detectUserEmotion(userText);

    if (botResponse) {
      const finalEmotion = inferredEmotion || botResponse.emotion;
      setTimeout(() => {
        setMessages((prev) => [
          ...prev, 
          { 
            sender: 'bot', 
            text: botResponse.text, 
            emotion: finalEmotion,
            timestamp: new Date() 
          }
        ]);
        setCurrentEmotion(finalEmotion);
        speakText(botResponse.text, finalEmotion);
      }, 400);
    } else {
      // General question not matched in local logs -> Connect to Internet Search Grids
      const searchPlaceholderId = Date.now();
      const initialEmotion = inferredEmotion || 'CONFUSED';

      setMessages((prev) => [
        ...prev,
        {
          id: searchPlaceholderId,
          sender: 'bot',
          text: `[Connecting to neural search grids...] > Querying internet database for: "${userText}"...`,
          emotion: initialEmotion,
          timestamp: new Date()
        }
      ]);
      setCurrentEmotion(initialEmotion);

      try {
        let quickAnswer = '';
        let sourceLabel = '';

        // Generate prioritized list of queries to search
        const queriesToTry = analyzeSearchQuery(userText);
        console.log("Prioritized search queries:", queriesToTry);

        // Try Google Search via Codetabs public proxy first
        for (const query of queriesToTry) {
          try {
            const googleUrl = `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent('https://www.google.com/search?q=' + encodeURIComponent(query))}`;
            const response = await fetch(googleUrl);
            if (response.ok) {
              const html = await response.text();
              const regex = /<div[^>]*class=["'][^"']*(BNeawe|s3v9rd|H66NU|VwiC3b|yDAB2d)[^"']*["'][^>]*>([\s\S]*?)<\/div>/gi;
              let match;
              const snippets = [];
              while ((match = regex.exec(html)) !== null) {
                const text = match[2]
                  .replace(/<[^>]*>/g, '') // strip HTML tags
                  .replace(/&amp;/g, '&')
                  .replace(/&#39;/g, "'")
                  .replace(/&quot;/g, '"')
                  .replace(/\s+/g, ' ')     // collapse whitespace
                  .trim();
                
                if (text.length > 40 && !text.includes('Recherche Google') && !text.includes('Search instead for') && !snippets.includes(text)) {
                  snippets.push(text);
                }
              }
              
              if (snippets.length > 0) {
                quickAnswer = snippets[0];
                sourceLabel = 'Google Search';
                break; // Found a valid answer!
              }
            }
          } catch (googleErr) {
            console.warn(`Google Search failed via proxy for query "${query}":`, googleErr);
          }
        }

        // JSONP Fallback to DuckDuckGo Instant Answers if Google Search failed or was blocked by firewall
        if (!quickAnswer) {
          console.log("Google Search yielded no answer. Attempting DuckDuckGo JSONP fallback...");
          for (const query of queriesToTry) {
            try {
              const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json`;
              const data = await fetchJsonp(ddgUrl);
              if (data) {
                if (data.AbstractText && data.AbstractText.trim().length > 20) {
                  quickAnswer = data.AbstractText;
                  sourceLabel = 'DuckDuckGo Instant Answers';
                  break;
                } else if (data.RelatedTopics && data.RelatedTopics.length > 0) {
                  const firstTextTopic = data.RelatedTopics.find(t => t.Text && t.Text.trim().length > 20);
                  if (firstTextTopic) {
                    quickAnswer = firstTextTopic.Text;
                    sourceLabel = 'DuckDuckGo Related Topics';
                    break;
                  }
                }
              }
            } catch (ddgErr) {
              console.warn(`DuckDuckGo JSONP failed for query "${query}":`, ddgErr);
            }
          }
        }

        if (!quickAnswer) {
          throw new Error('No search results found');
        }

        // Limit the length of the quick answer for a concise reply (first 2-3 sentences or max 280 chars)
        let cleanedAnswer = quickAnswer.replace(/\s+/g, ' ').trim();
        if (cleanedAnswer.length > 300) {
          const sentences = cleanedAnswer.match(/[^.!?]+[.!?]+(\s|$)/g);
          if (sentences && sentences.length >= 2) {
            cleanedAnswer = sentences.slice(0, 2).join('').trim();
          } else {
            cleanedAnswer = cleanedAnswer.substring(0, 280) + '...';
          }
        }

        // Format to a concise quick answer
        const formattedResult = `[Database Synced] > According to ${sourceLabel}:\n\n"${cleanedAnswer}"\n\nIs there anything else I can search for you?`;

        const finalEmotion = inferredEmotion || 'HAPPY';
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === searchPlaceholderId 
              ? { ...msg, text: formattedResult, emotion: finalEmotion }
              : msg
          )
        );
        setCurrentEmotion(finalEmotion);
        speakText(formattedResult, finalEmotion);

      } catch (err) {
        console.error(err);
        const fallbackMsg = `[Connection Timeout] > I searched my network databases for "${userText}" but encountered an offline grid or rate limit. Could you rephrase your question?`;
        
        const errorEmotion = inferredEmotion || 'CONFUSED';
        setMessages((prev) => 
          prev.map((msg) => 
            msg.id === searchPlaceholderId 
              ? { ...msg, text: fallbackMsg, emotion: errorEmotion }
              : msg
          )
        );
        setCurrentEmotion(errorEmotion);
        speakText(fallbackMsg, errorEmotion);
      }
    }
  };

  const handlePromptClick = (promptText) => {
    setMessages((prev) => [...prev, { sender: 'user', text: promptText, timestamp: new Date() }]);

    setTimeout(() => {
      const botResponse = getAIResponse(promptText);
      const inferredEmotion = detectUserEmotion(promptText);
      if (botResponse) {
        const finalEmotion = inferredEmotion || botResponse.emotion;
        setMessages((prev) => [
          ...prev, 
          { 
            sender: 'bot', 
            text: botResponse.text, 
            emotion: finalEmotion,
            timestamp: new Date() 
          }
        ]);
        setCurrentEmotion(finalEmotion);
        speakText(botResponse.text, finalEmotion);
      }
    }, 300);
  };

  const startTriviaGame = () => {
    setTriviaState('q1');
    setTriviaScore(0);
    setCurrentEmotion('HAPPY');
    const q1Text = "Trivia Time! Question 1: Which of the following is NOT a programming language used in Jezua's core stack? A) Python, B) Ruby, or C) JavaScript.";
    setMessages((prev) => [
      ...prev,
      {
        sender: 'bot',
        text: "🎮 Cyber Trivia Game Initiated!\n\nQuestion 1: Which of the following is NOT a programming language used in Jezua's core tech stack?\n\nOption A) Python\nOption B) Ruby\nOption C) JavaScript",
        emotion: 'HAPPY',
        timestamp: new Date()
      }
    ]);
    speakText(q1Text, 'HAPPY');
  };

  const handleTriviaAnswer = (answer) => {
    if (triviaState === 'q1') {
      const isCorrect = answer === 'B';
      if (isCorrect) setTriviaScore((prev) => prev + 1);

      const feedback = isCorrect 
        ? "Correct! Jezua's core stack uses Python and JavaScript. Ruby is not in his primary toolkit."
        : "Incorrect. The correct answer was B. Jezua does not use Ruby in his core toolkit.";

      const q2Text = "Question 2: What General Weighted Average did Jezua achieve at Laguna State Polytechnic University? A) 1.50, B) 1.73, or C) 1.95.";

      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: `Selected: Option ${answer}`, timestamp: new Date() },
        {
          sender: 'bot',
          text: `${feedback}\n\nQuestion 2: What General Weighted Average (GWA) did Jezua achieve at LSPU?\n\nOption A) 1.50\nOption B) 1.73\nOption C) 1.95`,
          emotion: isCorrect ? 'HAPPY' : 'CONFUSED',
          timestamp: new Date()
        }
      ]);

      const nextEmotion = isCorrect ? 'HAPPY' : 'CONFUSED';
      setCurrentEmotion(nextEmotion);
      setTriviaState('q2');
      speakText(`${feedback} ${q2Text}`, nextEmotion);
    } else if (triviaState === 'q2') {
      const isCorrect = answer === 'B';
      if (isCorrect) setTriviaScore((prev) => prev + 1);

      const feedback = isCorrect
        ? "Correct! Jezua achieved a GWA of 1.73 at LSPU, graduated with honors!"
        : "Incorrect. The correct answer was B. Jezua achieved a GWA of 1.73.";

      const q3Text = "Question 3: What role does Jezua hold in Capstone research teams? A) UI Designer only, B) Quality Assurance, or C) Research & Development Lead.";

      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: `Selected: Option ${answer}`, timestamp: new Date() },
        {
          sender: 'bot',
          text: `${feedback}\n\nQuestion 3: What role does Jezua hold in Capstone research teams?\n\nOption A) UI Designer only\nOption B) Quality Assurance\nOption C) Research & Development Lead`,
          emotion: isCorrect ? 'HAPPY' : 'CONFUSED',
          timestamp: new Date()
        }
      ]);

      const nextEmotion = isCorrect ? 'HAPPY' : 'CONFUSED';
      setCurrentEmotion(nextEmotion);
      setTriviaState('q3');
      speakText(`${feedback} ${q3Text}`, nextEmotion);
    } else if (triviaState === 'q3') {
      const isCorrect = answer === 'C';
      const finalScore = triviaScore + (isCorrect ? 1 : 0);
      setTriviaScore(finalScore);

      const feedback = isCorrect
        ? "Correct! Jezua is the Capstone Research & Development Lead from 2024 to 2026."
        : "Incorrect. The correct answer was C. Jezua is the Capstone Research & Development Lead.";

      const gameEndMsg = `Trivia Game Completed! Your final score is ${finalScore} out of 3. ${
        finalScore === 3 ? "Excellent score, console warrior! You know Jezua perfectly." : "Good try! You've learned more about Jezua's skills."
      }`;

      setMessages((prev) => [
        ...prev,
        { sender: 'user', text: `Selected: Option ${answer}`, timestamp: new Date() },
        {
          sender: 'bot',
          text: `${feedback}\n\n🏁 ${gameEndMsg}`,
          emotion: finalScore === 3 ? 'SWEET' : 'HAPPY',
          timestamp: new Date()
        }
      ]);

      const nextEmotion = finalScore === 3 ? 'SWEET' : 'HAPPY';
      setCurrentEmotion(nextEmotion);
      setTriviaState('finished');
      speakText(`${feedback} ${gameEndMsg}`, nextEmotion);
    }
  };

  const exitTriviaGame = () => {
    setTriviaState('inactive');
    const exitMsg = "Trivia game exited. How else can I assist you?";
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: "Exit Trivia Game", timestamp: new Date() },
      { sender: 'bot', text: exitMsg, emotion: 'SWEET', timestamp: new Date() }
    ]);
    setCurrentEmotion('SWEET');
    speakText(exitMsg, 'SWEET');
  };

  return (
    <>
      {/* Self-contained animations style block */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes vocal-bounce {
          0% { height: 20%; }
          100% { height: 100%; }
        }
        .vocal-bar-1 { animation: vocal-bounce 0.4s ease-in-out infinite alternate; }
        .vocal-bar-2 { animation: vocal-bounce 0.6s ease-in-out infinite alternate; }
        .vocal-bar-3 { animation: vocal-bounce 0.3s ease-in-out infinite alternate; }
        .vocal-bar-4 { animation: vocal-bounce 0.5s ease-in-out infinite alternate; }
        .vocal-bar-5 { animation: vocal-bounce 0.7s ease-in-out infinite alternate; }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        @keyframes scan-sweep {
          0% { top: 0%; }
          50% { opacity: 0.8; }
          100% { top: 100%; }
        }
      `}} />

      {/* 3D Character Portrait Hologram Pod (Bottom Right Corner) */}
      <div className={`fixed z-[9999] flex flex-col items-center transition-all duration-500 ease-in-out ${isOpen ? 'bottom-[calc(min(80vh,480px)+44px)] md:bottom-6 right-6' : 'bottom-6 right-6'}`}>
        {/* Animated speaking rings with responsive colors depending on current emotion */}
        {isSpeaking && (
          <>
            <div className={`absolute inset-0 w-full h-full rounded-[2rem] border-2 animate-ping opacity-60 scale-105 pointer-events-none ${
              currentEmotion === 'SWEET' ? 'border-neon-fuchsia/60' :
              currentEmotion === 'HAPPY' ? 'border-emerald-400/60' :
              currentEmotion === 'SERIOUS' ? 'border-neon-cyan/60' :
              currentEmotion === 'JOKING' ? 'border-amber-400/60' : 'border-neon-violet/60'
            }`} />
            <div className={`absolute inset-0 w-full h-full rounded-[2rem] border animate-pulse opacity-40 scale-110 pointer-events-none ${
              currentEmotion === 'SWEET' ? 'border-neon-fuchsia/40' :
              currentEmotion === 'HAPPY' ? 'border-emerald-400/40' :
              currentEmotion === 'SERIOUS' ? 'border-neon-cyan/40' :
              currentEmotion === 'JOKING' ? 'border-amber-400/40' : 'border-neon-violet/40'
            }`} />
          </>
        )}

        {/* The 3D Avatar Portrait Pod */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={`relative rounded-[2rem] border bg-black/85 overflow-hidden cursor-pointer flex flex-col items-center group transition-all duration-500 ease-in-out ${
            isOpen 
              ? 'w-20 h-32 md:w-28 md:h-44' 
              : 'w-24 h-36 md:w-28 md:h-44'
          } ${
            currentEmotion === 'SWEET' ? 'border-neon-fuchsia/45 shadow-[0_0_20px_rgba(217,70,239,0.25)] hover:border-neon-fuchsia/65 hover:shadow-[0_0_30px_rgba(217,70,239,0.4)]' :
            currentEmotion === 'HAPPY' ? 'border-emerald-500/45 shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:border-emerald-500/65 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]' :
            currentEmotion === 'SERIOUS' ? 'border-neon-cyan/45 shadow-[0_0_20px_rgba(0,240,255,0.25)] hover:border-neon-cyan/65 hover:shadow-[0_0_30px_rgba(0,240,255,0.4)]' :
            currentEmotion === 'JOKING' ? 'border-amber-500/45 shadow-[0_0_20px_rgba(245,158,11,0.25)] hover:border-amber-500/65 hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]' :
            'border-neon-violet/45 shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:border-neon-violet/65 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)]'
          }`}
        >
          {/* Animated Cybernetic Voice Orb Visualization */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            {/* Holographic matrix background particles */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(18,16,35,0.8)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(18,16,35,0.8)_1px,_transparent_1px)] bg-[size:8px_8px] pointer-events-none" />

            <div className="relative w-full h-2/3 flex items-center justify-center">
              {/* Glowing aura backplate */}
              <div className={`absolute w-16 h-16 rounded-full filter blur-xl opacity-40 animate-pulse transition-colors duration-500 ${
                currentEmotion === 'SWEET' ? 'bg-neon-fuchsia' :
                currentEmotion === 'HAPPY' ? 'bg-emerald-500' :
                currentEmotion === 'SERIOUS' ? 'bg-neon-cyan' :
                currentEmotion === 'JOKING' ? 'bg-amber-500' : 'bg-neon-violet'
              }`} />

              {/* Spinning outer rings */}
              <div className={`absolute rounded-full border border-dashed animate-spin-slow opacity-30 transition-colors duration-500 ${
                isOpen ? 'w-14 h-14 md:w-16 md:h-16' : 'w-16 h-16 md:w-20 md:h-20'
              } ${
                currentEmotion === 'SWEET' ? 'border-neon-fuchsia' :
                currentEmotion === 'HAPPY' ? 'border-emerald-400' :
                currentEmotion === 'SERIOUS' ? 'border-neon-cyan' :
                currentEmotion === 'JOKING' ? 'border-amber-400' : 'border-neon-violet'
              }`} style={{ animationDuration: '10s' }} />

              <div className={`absolute rounded-full border border-dotted animate-spin-slow opacity-20 transition-colors duration-500 ${
                isOpen ? 'w-12 h-12 md:w-14 md:h-14' : 'w-14 h-14 md:w-18 md:h-18'
              } ${
                currentEmotion === 'SWEET' ? 'border-neon-fuchsia' :
                currentEmotion === 'HAPPY' ? 'border-emerald-400' :
                currentEmotion === 'SERIOUS' ? 'border-neon-cyan' :
                currentEmotion === 'JOKING' ? 'border-amber-400' : 'border-neon-violet'
              }`} style={{ animationDuration: '6s', animationDirection: 'reverse' }} />

              {/* Pulsing Core Sphere */}
              <div className={`rounded-full transition-all duration-500 flex items-center justify-center border ${
                isOpen ? 'w-10 h-10 md:w-12 md:h-12' : 'w-12 h-12 md:w-16 md:h-16'
              } ${
                isSpeaking ? 'scale-110 shadow-[0_0_25px_currentColor]' : 'scale-100'
              } ${
                currentEmotion === 'SWEET' ? 'border-neon-fuchsia/40 bg-neon-fuchsia/10 text-neon-fuchsia shadow-[0_0_15px_rgba(217,70,239,0.3)]' :
                currentEmotion === 'HAPPY' ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' :
                currentEmotion === 'SERIOUS' ? 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan shadow-[0_0_15px_rgba(0,240,255,0.3)]' :
                currentEmotion === 'JOKING' ? 'border-amber-500/40 bg-amber-500/10 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]' :
                'border-neon-violet/40 bg-neon-violet/10 text-neon-violet shadow-[0_0_15px_rgba(139,92,246,0.3)]'
              }`}>
                {/* Voice equalizer bars inside the core sphere */}
                <div className="flex items-center justify-center space-x-1 h-5">
                  <div className={`w-[2px] rounded-full transition-all duration-300 ${
                    isSpeaking ? 'h-4 animate-[vocal-bounce_0.4s_infinite_alternate]' : 'h-1 bg-current'
                  } bg-current`} style={{ animationDelay: '0.05s' }} />

                  <div className={`w-[2px] rounded-full transition-all duration-300 ${
                    isSpeaking ? 'h-5 animate-[vocal-bounce_0.6s_infinite_alternate]' : 'h-1 bg-current'
                  } bg-current`} style={{ animationDelay: '0.15s' }} />

                  <div className={`w-[2px] rounded-full transition-all duration-300 ${
                    isSpeaking ? 'h-3 animate-[vocal-bounce_0.3s_infinite_alternate]' : 'h-1 bg-current'
                  } bg-current`} style={{ animationDelay: '0.1s' }} />

                  <div className={`w-[2px] rounded-full transition-all duration-300 ${
                    isSpeaking ? 'h-4.5 animate-[vocal-bounce_0.5s_infinite_alternate]' : 'h-1 bg-current'
                  } bg-current`} style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </div>

            {/* Speaking voice frequency graph lines below the sphere */}
            <div className={`w-full flex items-center justify-center space-x-0.5 mt-2 h-4 transition-opacity duration-300 ${isSpeaking ? 'opacity-100' : 'opacity-30'}`}>
              {[...Array(9)].map((_, i) => {
                const heights = ['h-1', 'h-2', 'h-3', 'h-4', 'h-2.5', 'h-4', 'h-3', 'h-2', 'h-1'];
                const delays = ['0.1s', '0.3s', '0.2s', '0.5s', '0.4s', '0.7s', '0.3s', '0.2s', '0.1s'];
                return (
                  <div 
                    key={i} 
                    className={`w-[1.5px] rounded-full transition-all duration-300 ${heights[i]} ${
                      isSpeaking ? 'animate-[vocal-bounce_0.5s_infinite_alternate]' : 'h-[1px]'
                    } ${
                      currentEmotion === 'SWEET' ? 'bg-neon-fuchsia' :
                      currentEmotion === 'HAPPY' ? 'bg-emerald-400' :
                      currentEmotion === 'SERIOUS' ? 'bg-neon-cyan' :
                      currentEmotion === 'JOKING' ? 'bg-amber-400' : 'bg-neon-violet'
                    }`}
                    style={{ animationDelay: delays[i], animationDuration: `${0.3 + (i % 3) * 0.15}s` }}
                  />
                );
              })}
            </div>
          </div>
          
          {/* Transparent click catcher overlay */}
          <div className="absolute inset-0 bg-transparent z-20 cursor-pointer" />

          {/* Floating Mood Badge on the avatar model */}
          <div className={`absolute top-2 left-2.5 z-30 flex items-center space-x-1.5 bg-black/80 border px-2 py-0.5 rounded-full text-[7px] font-bold uppercase tracking-wider ${
            currentEmotion === 'SWEET' ? 'border-neon-fuchsia/40 text-neon-fuchsia' :
            currentEmotion === 'HAPPY' ? 'border-emerald-500/40 text-emerald-400' :
            currentEmotion === 'SERIOUS' ? 'border-neon-cyan/40 text-neon-cyan' :
            currentEmotion === 'JOKING' ? 'border-amber-500/40 text-amber-400' : 'border-neon-violet/40 text-neon-violet'
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse inline-block" />
            <span>{currentEmotion}</span>
          </div>

          {/* Glowing scanner sweep line */}
          <div className={`absolute left-0 w-full h-[1.5px] z-10 pointer-events-none animate-[scan-sweep_3.5s_linear_infinite] ${
            currentEmotion === 'SWEET' ? 'bg-neon-fuchsia/50 shadow-[0_0_8px_rgba(217,70,239,0.7)]' :
            currentEmotion === 'HAPPY' ? 'bg-emerald-400/50 shadow-[0_0_8px_rgba(16,185,129,0.7)]' :
            currentEmotion === 'SERIOUS' ? 'bg-neon-cyan/50 shadow-[0_0_8px_rgba(0,240,255,0.7)]' :
            currentEmotion === 'JOKING' ? 'bg-amber-400/50 shadow-[0_0_8px_rgba(245,158,11,0.7)]' :
            'bg-neon-violet/50 shadow-[0_0_8px_rgba(139,92,246,0.7)]'
          }`} />

          {/* Holographic glowing light base plate */}
          <div className={`absolute bottom-0 w-full h-3 bg-gradient-to-r from-transparent to-transparent border-b z-20 ${
            currentEmotion === 'SWEET' ? 'via-neon-fuchsia/80 border-neon-fuchsia/50 shadow-[0_-4px_10px_rgba(217,70,239,0.6)]' :
            currentEmotion === 'HAPPY' ? 'via-emerald-400/80 border-emerald-500/50 shadow-[0_-4px_10px_rgba(16,185,129,0.6)]' :
            currentEmotion === 'SERIOUS' ? 'via-neon-cyan/80 border-neon-cyan/50 shadow-[0_-4px_10px_rgba(0,240,255,0.6)]' :
            currentEmotion === 'JOKING' ? 'via-amber-400/80 border-amber-500/50 shadow-[0_-4px_10px_rgba(245,158,11,0.6)]' :
            'via-neon-violet/80 border-neon-violet/50 shadow-[0_-4px_10px_rgba(139,92,246,0.6)]'
          }`} />
        </div>

        {/* Action tooltip */}
        <span className={`mt-1.5 bg-black/90 border px-2 py-0.5 rounded text-[8px] uppercase font-mono tracking-widest pointer-events-none select-none transition-opacity ${
          currentEmotion === 'SWEET' ? 'border-neon-fuchsia/30 text-neon-fuchsia' :
          currentEmotion === 'HAPPY' ? 'border-emerald-500/30 text-emerald-400' :
          currentEmotion === 'SERIOUS' ? 'border-neon-cyan/30 text-neon-cyan' :
          currentEmotion === 'JOKING' ? 'border-amber-500/30 text-amber-400' : 'border-neon-violet/30 text-neon-violet'
        }`}>
          {isSpeaking ? 'SPEAKING...' : 'TALK TO AI'}
        </span>
      </div>

      {/* Cyber Chat Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-6 left-4 right-4 md:left-auto md:right-40 w-auto md:w-[340px] h-[480px] max-h-[80vh] z-[9998] rounded-2xl border border-white/10 bg-[#030014]/95 shadow-[0_12px_40px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden font-mono"
          >
            {/* Holographic scanner styling line reflecting emotion status */}
            <div className={`h-[2.5px] shadow-[0_0_12px_rgba(0,240,255,0.7)] transition-colors duration-300 ${
              currentEmotion === 'SWEET' ? 'bg-neon-fuchsia' :
              currentEmotion === 'HAPPY' ? 'bg-emerald-500' :
              currentEmotion === 'SERIOUS' ? 'bg-neon-cyan' :
              currentEmotion === 'JOKING' ? 'bg-amber-500' : 'bg-neon-violet'
            }`} />

            {/* Header */}
            <div className="flex items-center justify-between bg-white/[0.02] px-4 py-3 border-b border-white/5">
              <div className="flex items-center space-x-2">
                <Bot className={`w-4 h-4 animate-pulse ${
                  currentEmotion === 'SWEET' ? 'text-neon-fuchsia' :
                  currentEmotion === 'HAPPY' ? 'text-emerald-400' :
                  currentEmotion === 'SERIOUS' ? 'text-neon-cyan' :
                  currentEmotion === 'JOKING' ? 'text-amber-400' : 'text-neon-violet'
                }`} />
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-white tracking-widest uppercase text-glow-cyan flex items-center">
                    POLENG
                    <Heart className="w-2.5 h-2.5 ml-1 inline text-neon-fuchsia animate-pulse" />
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Auto-updating Personality/Mood Badge */}
                <div
                  className={`text-[8px] font-bold border px-2 py-0.5 rounded-full tracking-wider pointer-events-none select-none ${
                    currentEmotion === 'SWEET' ? 'border-neon-fuchsia/45 text-neon-fuchsia bg-neon-fuchsia/5' :
                    currentEmotion === 'HAPPY' ? 'border-emerald-500/45 text-emerald-400 bg-emerald-500/5' :
                    currentEmotion === 'SERIOUS' ? 'border-neon-cyan/45 text-neon-cyan bg-neon-cyan/5' :
                    currentEmotion === 'JOKING' ? 'border-amber-500/45 text-amber-400 bg-amber-500/5' :
                    'border-neon-violet/45 text-neon-violet bg-neon-violet/5'
                  }`}
                >
                  MOOD: {currentEmotion}
                </div>

                {/* Mute toggle button */}
                <button
                  onClick={handleToggleMute}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:border-neon-cyan/40 hover:bg-neon-cyan/5 text-gray-400 hover:text-neon-cyan transition-all"
                  title={isMuted ? 'Unmute AI Voice' : 'Mute AI Voice'}
                >
                  {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
                </button>
                
                {/* Close button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg border border-white/10 bg-white/5 hover:border-neon-fuchsia/40 hover:bg-neon-fuchsia/5 text-gray-400 hover:text-neon-fuchsia transition-all"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Speaking audio wave visualization (equalizer bars) */}
            {isSpeaking && (
              <div className={`border-b py-1.5 px-4 flex items-center justify-between text-[8px] font-mono tracking-widest transition-colors duration-300 ${
                currentEmotion === 'SWEET' ? 'bg-neon-fuchsia/5 border-neon-fuchsia/10 text-neon-fuchsia' :
                currentEmotion === 'HAPPY' ? 'bg-emerald-500/5 border-emerald-500/10 text-emerald-400' :
                currentEmotion === 'SERIOUS' ? 'bg-neon-cyan/5 border-neon-cyan/10 text-neon-cyan' :
                currentEmotion === 'JOKING' ? 'bg-amber-500/5 border-amber-500/10 text-amber-400' :
                'bg-neon-violet/5 border-neon-violet/10 text-neon-violet'
              }`}>
                <span className="animate-pulse">VOCAL SYNTHESIZER TRANSMITTING:</span>
                <div className="flex space-x-0.5 items-end h-3">
                  <div className={`w-[1.5px] rounded-full vocal-bar-1 ${
                    currentEmotion === 'SWEET' ? 'bg-neon-fuchsia' :
                    currentEmotion === 'HAPPY' ? 'bg-emerald-400' :
                    currentEmotion === 'SERIOUS' ? 'bg-neon-cyan' :
                    currentEmotion === 'JOKING' ? 'bg-amber-400' : 'bg-neon-violet'
                  }`} />
                  <div className={`w-[1.5px] rounded-full vocal-bar-2 ${
                    currentEmotion === 'SWEET' ? 'bg-neon-fuchsia' :
                    currentEmotion === 'HAPPY' ? 'bg-emerald-400' :
                    currentEmotion === 'SERIOUS' ? 'bg-neon-cyan' :
                    currentEmotion === 'JOKING' ? 'bg-amber-400' : 'bg-neon-violet'
                  }`} />
                  <div className={`w-[1.5px] rounded-full vocal-bar-3 ${
                    currentEmotion === 'SWEET' ? 'bg-neon-fuchsia' :
                    currentEmotion === 'HAPPY' ? 'bg-emerald-400' :
                    currentEmotion === 'SERIOUS' ? 'bg-neon-cyan' :
                    currentEmotion === 'JOKING' ? 'bg-amber-400' : 'bg-neon-violet'
                  }`} />
                  <div className={`w-[1.5px] rounded-full vocal-bar-4 ${
                    currentEmotion === 'SWEET' ? 'bg-neon-fuchsia' :
                    currentEmotion === 'HAPPY' ? 'bg-emerald-400' :
                    currentEmotion === 'SERIOUS' ? 'bg-neon-cyan' :
                    currentEmotion === 'JOKING' ? 'bg-amber-400' : 'bg-neon-violet'
                  }`} />
                  <div className={`w-[1.5px] rounded-full vocal-bar-5 ${
                    currentEmotion === 'SWEET' ? 'bg-neon-fuchsia' :
                    currentEmotion === 'HAPPY' ? 'bg-emerald-400' :
                    currentEmotion === 'SERIOUS' ? 'bg-neon-cyan' :
                    currentEmotion === 'JOKING' ? 'bg-amber-400' : 'bg-neon-violet'
                  }`} />
                </div>
              </div>
            )}

            {/* Chat message list area */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-[11px] leading-relaxed border ${
                      msg.sender === 'user'
                        ? 'bg-neon-violet/10 border-neon-violet/30 text-white rounded-tr-none'
                        : 'bg-white/[0.02] border-white/5 text-gray-300 rounded-tl-none font-sans'
                    }`}
                  >
                    {/* Bot name/metadata display with dynamic mood styling */}
                    {msg.sender === 'bot' && (
                      <div className={`flex items-center space-x-1.5 font-mono text-[9px] font-bold mb-1 uppercase tracking-widest ${
                        msg.emotion === 'SWEET' ? 'text-neon-fuchsia' :
                        msg.emotion === 'HAPPY' ? 'text-emerald-400' :
                        msg.emotion === 'SERIOUS' ? 'text-neon-cyan' :
                        msg.emotion === 'JOKING' ? 'text-amber-400' : 'text-neon-violet'
                      }`}>
                        <span>&gt; POLENG [{msg.emotion || 'SWEET'}]</span>
                      </div>
                    )}
                    
                    <div className="whitespace-pre-line font-sans">
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Panel / Trivia Option Buttons */}
            <div className="p-3 bg-white/[0.01] border-t border-white/5 space-y-2">
              <div className="text-[8px] text-gray-500 font-mono tracking-widest uppercase">
                {triviaState === 'inactive' || triviaState === 'finished' ? 'DECK CONTROLS & COMMANDS:' : 'TRIVIA OPTIONS:'}
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {/* Normal Menu Controls */}
                {(triviaState === 'inactive' || triviaState === 'finished') && (
                  <>
                    <button
                      onClick={() => handlePromptClick("Who is Jezua?")}
                      className="flex items-center space-x-1 text-[9px] border border-white/10 hover:border-neon-cyan/40 bg-white/5 hover:bg-neon-cyan/5 text-gray-400 hover:text-neon-cyan px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      <Info className="w-3 h-3" />
                      <span>Who is Jezua?</span>
                    </button>

                    <button
                      onClick={() => handlePromptClick("Sync Reddit Banter Mode")}
                      className="flex items-center space-x-1 text-[9px] border border-white/10 hover:border-amber-500/40 bg-white/5 hover:bg-amber-500/5 text-gray-400 hover:text-amber-400 px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      <MessageSquare className="w-3 h-3 text-amber-500" />
                      <span>Reddit Banter</span>
                    </button>
                    
                    <button
                      onClick={() => handlePromptClick("Show me your Tech Stack & Skills.")}
                      className="flex items-center space-x-1 text-[9px] border border-white/10 hover:border-neon-cyan/40 bg-white/5 hover:bg-neon-cyan/5 text-gray-400 hover:text-neon-cyan px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      <Laptop className="w-3 h-3" />
                      <span>Tech Stack</span>
                    </button>
                    
                    <button
                      onClick={() => handlePromptClick("Roast Jezua's portfolio!")}
                      className="flex items-center space-x-1 text-[9px] border border-white/10 hover:border-neon-fuchsia/40 bg-white/5 hover:bg-neon-fuchsia/5 text-gray-400 hover:text-neon-fuchsia px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>Roast Portfolio</span>
                    </button>
                    
                    <button
                      onClick={() => handlePromptClick("Tell me a programming joke.")}
                      className="flex items-center space-x-1 text-[9px] border border-white/10 hover:border-neon-cyan/40 bg-white/5 hover:bg-neon-cyan/5 text-gray-400 hover:text-neon-cyan px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      <Smile className="w-3 h-3" />
                      <span>Code Joke</span>
                    </button>
                    
                    <button
                      onClick={startTriviaGame}
                      className="flex items-center space-x-1 text-[9px] border border-white/10 hover:border-emerald-500/40 bg-white/5 hover:bg-emerald-500/5 text-gray-400 hover:text-emerald-400 px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      <Gamepad2 className="w-3 h-3" />
                      <span>Play Trivia!</span>
                    </button>
                  </>
                )}

                {/* Trivia Active Options */}
                {triviaState !== 'inactive' && triviaState !== 'finished' && (
                  <>
                    <button
                      onClick={() => handleTriviaAnswer('A')}
                      className="flex-grow text-center text-[10px] font-bold border border-white/10 hover:border-neon-cyan/40 bg-white/5 hover:bg-neon-cyan/5 text-gray-400 hover:text-neon-cyan px-4 py-2 rounded-lg transition-all"
                    >
                      Option A
                    </button>
                    <button
                      onClick={() => handleTriviaAnswer('B')}
                      className="flex-grow text-center text-[10px] font-bold border border-white/10 hover:border-neon-cyan/40 bg-white/5 hover:bg-neon-cyan/5 text-gray-400 hover:text-neon-cyan px-4 py-2 rounded-lg transition-all"
                    >
                      Option B
                    </button>
                    <button
                      onClick={() => handleTriviaAnswer('C')}
                      className="flex-grow text-center text-[10px] font-bold border border-white/10 hover:border-neon-cyan/40 bg-white/5 hover:bg-neon-cyan/5 text-gray-400 hover:text-neon-cyan px-4 py-2 rounded-lg transition-all"
                    >
                      Option C
                    </button>
                    
                    <button
                      onClick={exitTriviaGame}
                      className="w-full text-center text-[9px] border border-white/10 hover:border-neon-fuchsia/40 bg-white/5 hover:bg-neon-fuchsia/5 text-gray-500 hover:text-neon-fuchsia py-1 rounded-lg transition-all uppercase tracking-widest mt-1"
                    >
                      Exit Game
                    </button>
                  </>
                )}

                {/* Restart trivia button on game completion */}
                {triviaState === 'finished' && (
                  <button
                    onClick={startTriviaGame}
                    className="flex items-center space-x-1 text-[9px] border border-emerald-500/30 hover:border-emerald-500/50 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400 px-2.5 py-1.5 rounded-lg transition-all mt-1 w-full justify-center"
                  >
                    <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                    <span>Play Trivia Game Again</span>
                  </button>
                )}
              </div>
            </div>

            {/* User freeform text keyboard input form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-white/[0.02] border-t border-white/5 flex space-x-2"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={
                  triviaState !== 'inactive' && triviaState !== 'finished'
                    ? "Type A, B, or C to answer trivia..."
                    : "Input query or ask command..."
                }
                className="flex-grow bg-white/5 border border-white/10 rounded-lg text-[10px] py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-neon-cyan focus:ring-1 focus:ring-neon-cyan transition-all"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="p-2 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-violet hover:from-neon-cyan hover:to-neon-fuchsia text-white disabled:opacity-30 disabled:pointer-events-none hover:shadow-[0_0_10px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
