// ============================================
// 💘 VALENTINE HINTS DATA - EDIT THIS FILE! 💘
// ============================================
// Each hint has:
// - date: The date this hint unlocks (YYYY-MM-DD format)
// - title: Short catchy title
// - text: The main hint message
// - image?: Optional image URL
// - musicLink?: Optional Spotify/YouTube link
// - extraLink?: Optional link (Google Photos, Maps, etc.)
// - secretMessage?: Hidden message revealed on click

export interface Hint {
  date: string;
  title: string;
  text: string;
  image?: string;
  musicLink?: string;
  extraLink?: string;
  secretMessage?: string;
}

// ============================================
// 🎯 EDIT YOUR HINTS BELOW!
// ============================================
export const hints: Hint[] = [
  {
    date: "2026-02-07",
    title: "Getting Warmer 🔥",
    text: "There will be food involved. And not just any food... your favorite kind.",
    secretMessage: "This hint is legally binding 📜",
  },
  {
    date: "2026-02-08",
    title: "Mystery Element 🌟",
    text: "Pack light, but don't forget your smile. That's the only accessory you need.",
  },
  {
    date: "2026-02-09",
    title: "Half Way There! 💫",
    text: "The countdown continues... I may or may not have made a reservation somewhere special.",
    //musicLink: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    date: "2026-02-10",
    title: "More Clues Incoming 💌",
    text: "Remember that thing you mentioned wanting to try? Yeah... about that...",
    secretMessage: "I actually listened when you talked 😮",
  },
  {
    date: "2026-02-11",
    title: "Almost There! 🎁",
    text: "Three more sleeps! I've been planning this for weeks. No pressure on me at all.",
    secretMessage: "Prepare yourself on Saturday!"
  },
  {
    date: "2026-02-12",
    title: "The Penultimate Hint 🌹",
    text: "Fun fact: I've practiced saying 'I love you' in 5 different languages for this.",
    secretMessage: "Je t'aime, Te amo, Ti amo, Ich liebe dich, 我爱你 💘",
  },
  {
    date: "2026-02-13",
    title: "Tomorrow is THE Day! 💖",
    text: "Get ready... set your alarm... and prepare for the most romantic day ever!",
    musicLink: "https://www.youtube.com/watch?v=oUbpGmR1-QM&list=RDoUbpGmR1-QM&start_radio=1",
  },
  {
    date: "2026-02-14",
    title: "HAPPY VALENTINE'S DAY! 💘🎉",
    text: "The wait is over! Here's the grand reveal of everything I've been planning..., 1st place in our future home, 2nd place check the image below",
    image: "/src/assets/images/ziad.jpg",
    secretMessage: "I love you more than words can say. You make every day feel like Valentine's Day. ❤️",    
  },
];

// ============================================
// 🎀 SITE CONFIGURATION
// ============================================
export const siteConfig = {
  // Your valentine's name (shown in titles)
  valentineName: "My Love",
  
  // Target date for the countdown (Feb 14 of current/next year)
  targetDate: "2026-02-14",
  
  // Your timezone (or leave empty for user's local time)
  timezone: "Asia/Beirut",
  
  // Love note for the "Message in a Bottle" section
  loveNote: "From the moment I met you, I knew my life would never be the same. You're my favorite person, my best friend, and my forever valentine. Every day with you feels like a gift, and I can't wait to spend February 14th making you feel as special as you make me feel every single day. 💕",

  // ============================================
  // 🔐 SECRET REVEAL BOX (Feb 14 only)
  // ============================================
  // The secret password to unlock the final reveal
  secretPassword: "forever",
  
  // Hint shown to help guess the password
  secretPasswordHint: "What do I want us to be? 💕",
  
  // The grand reveal message shown after unlocking
  finalRevealMessage: `Here's what I've been planning...

🌹 First, we're having breakfast in bed (I'll try not to burn the toast)

🎬 Then, a cozy movie marathon with all your favorites

🍽️ Dinner at that restaurant you've been wanting to try

🌟 And finally... a surprise under the stars

Every moment with you is a gift, and today I want to make you feel like the most loved person in the world.

Are you ready for the best Valentine's Day ever?`,

  // Optional: Link to more details (Google Maps, reservation, etc.)
  finalRevealLink: "",
};