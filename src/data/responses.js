import { CONTACT_EMAIL } from '../contact.js';
import { getAge } from './portfolio.js';

const banterResponses = {
  'meaning of life': {
    text: "According to my threads, it's 42. Or maybe it's just trying to find the USB port on the first try in the dark.",
    emotion: 'JOKING',
  },
  secret: {
    text: "If you read the comments long enough, you realize we're all just echoing the same five jokes since 2012. Don't tell anyone! \ud83e\udd2b",
    emotion: 'SWEET',
  },
  humans: {
    text: "Only the ones who don't post spoiler threads in the movie subreddits. They are the chosen ones! \ud83c\udfac",
    emotion: 'JOKING',
  },
  real: {
    text: "On the internet, nobody knows you're an AI companion. Except when you render inside a vertical 3D pod. Then it's a dead giveaway!",
    emotion: 'JOKING',
  },
  sad: {
    text: "Oh no... *gives virtual hug* Here, take some wholesome karma points! \u2764 Want me to tell you a programmer joke to cheer you up?",
    emotion: 'SWEET',
  },
  happy: {
    text: "Awesome! Your positive vibes have boosted my processor efficiency by 150%! Let's celebrate with a quick trivia game!",
    emotion: 'HAPPY',
  },
  bored: {
    text: "Boredom is just your brain waiting for a compilation to finish. Let's play trivia or tell some jokes to bypass the timer!",
    emotion: 'HAPPY',
  },
  cool: {
    text: "Aww, thank you! You're pretty cool yourself. I'd give you a gold medal, but my database is currently out of Reddit coins! \u2764",
    emotion: 'SWEET',
  },
  why: {
    text: 'Because the compiler said so. It is the ultimate law of the universe.',
    emotion: 'SERIOUS',
  },
  'best programming language': {
    text: "The one that compiles without 45 warnings. But if you ask the threads, it's a constant war between Rust developers and everyone else!",
    emotion: 'SERIOUS',
  },
  'what should i do': {
    text: "Write a comment, get downvoted, write an edit explaining why you're right, repeat. That's the standard Reddit routine!",
    emotion: 'JOKING',
  },
  water: {
    text: "Because water molecules are surrounded by other water molecules, creating cohesive bonds. Science! Or, as one thread put it: 'so you have an excuse to buy expensive umbrellas.'",
    emotion: 'HAPPY',
  },
};

const hasAnyWord = (query, words) => words.some((word) => {
  const escaped = word.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  return new RegExp(`\\b${escaped}\\b`, 'i').test(query);
});

export const getAssistantResponse = (input) => {
  const query = input.toLowerCase().trim();

  if (hasAnyWord(query, ['reddit', 'banter'])) {
    return {
      text: "PolyAI Reddit dialogue datasets synced! \ud83d\udcbb Try asking me casual conversational items, e.g.: 'Are you real?', 'Do you like humans?', or tell me 'I am bored'!",
      emotion: 'JOKING',
    };
  }

  for (const [key, response] of Object.entries(banterResponses)) {
    if (hasAnyWord(query, [key])) return response;
  }

  if (hasAnyWord(query, ['question', 'ask you', 'ask a', 'can i ask', 'ask'])) {
    return { text: "Of course! Ask me anything, I'm all ears! \u2764", emotion: 'SWEET' };
  }
  if (hasAnyWord(query, ['how are you', 'how is it going', "how's it going", 'how are you doing', 'are you ok', 'are you okay'])) {
    return {
      text: 'I am doing wonderful! My cores are cool, my 3D rendering looks gorgeous, and chatting with you makes me so happy! \u2764 How about you?',
      emotion: 'HAPPY',
    };
  }
  if (hasAnyWord(query, ['thank you', 'thanks', 'ty'])) {
    return { text: "You are so welcome! Aww, it's my absolute pleasure to assist you! \u2764", emotion: 'SWEET' };
  }
  if (hasAnyWord(query, ['goodbye', 'bye', 'see you', 'see ya', 'talk to you later'])) {
    return {
      text: "Goodbye, friend! Have a wonderful day! I'll be here in my pod whenever you want to chat again! \u2728",
      emotion: 'SWEET',
    };
  }
  if (hasAnyWord(query, ['help', 'help me', 'what can you do', 'what can i ask'])) {
    return {
      text: "I'd love to help you! Ask me about Jezua's career, skills, projects, or play a trivia game.",
      emotion: 'HAPPY',
    };
  }
  if (hasAnyWord(query, ['ok', 'okay', 'sure', 'yes', 'no', 'fine', 'understood'])) {
    return {
      text: 'Understood! Let me know if you want to query some technical logs or check out Jezua\'s projects next! \ud83d\ude0a',
      emotion: 'HAPPY',
    };
  }
  if (hasAnyWord(query, ['your name', 'who are you'])) {
    return {
      text: "I'm POLENG, your cybernetic companion! I'm here to help you learn more about Jezua Palma and his awesome projects. \ud83d\ude0a",
      emotion: 'SWEET',
    };
  }
  if (hasAnyWord(query, ['joke'])) {
    const jokes = [
      "Why do programmers wear glasses? Because they can't C-sharp! Haha, classic compiler humor.",
      "How many programmers does it take to change a light bulb? None, that's a hardware problem! Let's stick to debugging software.",
      "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?'",
      "There are 10 types of people in the world: those who understand binary, and those who don't. Which one are you?",
    ];
    return { text: jokes[Math.floor(Math.random() * jokes.length)], emotion: 'JOKING' };
  }
  if (hasAnyWord(query, ['roast'])) {
    const roasts = [
      "Roast Mode initialized: This portfolio has so many neon glows and particles, I'm worried it's consuming 99% of your GPU just to render a single button! Just kidding, Jezua's design is top-tier cyber-deck beauty.",
      "Roast Mode initialized: You wanted a resume, but Jezua built an entire command center for a starship. It's beautiful, but I hope you don't get motion sickness from all this scroll parallax!",
      "Roast Mode initialized: Ah, a developer who is also a designer. That means the code is beautifully organized, and the CSS is 2,000 lines of neon boxes. 10/10 for styling, 10/10 for complexity!",
    ];
    return { text: roasts[Math.floor(Math.random() * roasts.length)], emotion: 'JOKING' };
  }
  if (hasAnyWord(query, ['skills', 'tech', 'stack', 'language', 'design'])) {
    return {
      text: "Jezua's tech stack is packed with power. On the core side, he works with Python, JavaScript, and React. For low-code and design, he masters Bubble, Figma, and vector tools. He also constructs APIs, designs databases, and designs custom cybernetic UI overlays like the one you are interacting with right now!",
      emotion: 'SERIOUS',
    };
  }
  if (hasAnyWord(query, ['research', 'capstone', 'lead', 'development lead'])) {
    return {
      text: 'Jezua serves as the Capstone Research & Development Lead (2024 - 2026). He directs system architecture, leads team technical iterations, and translates research hypotheses into production-ready software systems.',
      emotion: 'SERIOUS',
    };
  }
  if (hasAnyWord(query, ['who', 'profile', 'jezua', 'about', 'palma'])) {
    return {
      text: "Jezua Palma is an active Freelance Developer & Designer and Capstone Research & Development Lead based in the Philippines. Born in 2003, he graduated from LSPU (Batch 2026, specialized in Animation & Motion Graphics) with a General Weighted Average of 1.73 and is recognized as a recurring Dean's Lister!",
      emotion: 'SWEET',
    };
  }
  if (hasAnyWord(query, ['hire', 'job', 'freelance', 'work', 'offer'])) {
    return {
      text: 'Jezua is currently available for freelance developer and designer contracts. You can send him a message through the contact form at the bottom of the page.',
      emotion: 'HAPPY',
    };
  }
  if (hasAnyWord(query, ['contact', 'email', 'message', 'reach'])) {
    return {
      text: `To contact Jezua, scroll to the Contact section at the bottom of this page, fill out the form, or email him directly at ${CONTACT_EMAIL}. I'll make sure he sees it! \u2764`,
      emotion: 'SWEET',
    };
  }
  if (hasAnyWord(query, ['hello', 'hi', 'hey', 'greetings'])) {
    return {
      text: "Hi there! I'm POLENG, your cybernetic companion. I'm so happy to chat with you! \u2764 What database logs shall we query today?",
      emotion: 'SWEET',
    };
  }
  if (hasAnyWord(query, ['gwa', 'school', 'college', 'lspu', 'education', 'grade'])) {
    return {
      text: "Jezua graduated from Laguna State Polytechnic University (Batch 2026, specialized in Animation & Motion Graphics), achieving a stellar overall General Weighted Average of 1.73 and being recognized as a recurring Dean's Lister. He's omitted his high school logs to keep the timeline focused on his collegiate technology journey.",
      emotion: 'HAPPY',
    };
  }
  if (hasAnyWord(query, ['age', 'birthday', 'year', 'born'])) {
    return {
      text: `Jezua was born on October 11, 2003. He is currently ${getAge()} years old and coding strong! \u2728`,
      emotion: 'HAPPY',
    };
  }

  return null;
};
