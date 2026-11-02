// ============================================================
//  SCRAPBOOK DATA — Centralized Media & Story Configuration
//  Contains all 12 personal photographs & 6 personal video clips
//  Carefully art-directed with individual object-positions to
//  guarantee heads and faces are NEVER cropped.
// ============================================================

export const scrapbookConfig = {
  recipientName: "My Love",
  senderName: "Always Yours ♡",
  subtitle: "A tiny world made just for you ♡",
  coverPhoto: "/images/7.jpeg", // Their couple cafe selfie
  coverPhotoPosition: "center 18%", // Focus on both faces
  featureVideo: "/videos/2.mp4", // Cafe date memory video
};

// ── PHOTO POSITION REGISTRY (Prevents face cropping) ────────
export const photoFocus = {
  "/images/7.jpeg": "center 16%", // Couple selfie - both heads in upper portion
  "/images/8.jpeg": "center 22%", // Childhood portrait - baby face in upper-mid
  "/images/9.jpeg": "center 18%", // Brown dress mirror selfie - face & smile
  "/images/10.jpeg": "center 18%", // Traditional mint green - radiant smile & face
  "/images/11.jpeg": "center 22%", // Daisy dress moon filter - face & expression
  "/images/12.jpeg": "center 24%", // Denim dress mirror reflection - face
  "/images/13.jpeg": "center 18%", // Terrace sunlit portrait - face in sunlight
  "/images/14.jpeg": "center 16%", // Holding red roses - head & upper torso
  "/images/15.jpeg": "center center", // Close up of eyes & bindi
  "/images/16.jpeg": "center 22%", // Cheek on hand cozy selfie - face
  "/images/17.jpeg": "center 14%", // Traditional mint full portrait - head & jewellery
  "/images/18.jpeg": "68% 22%",   // Daisy dress selfie with bracelet - face & smile
};

// ── MEMORIES (Page 2) ──────────────────────────────────────
export const memories = [
  {
    id: 1,
    image: "/images/14.jpeg",
    objectPosition: "center 16%",
    video: null,
    caption: "The Day of Roses 🌹",
    note: "You holding those red roses with that gentle smile made my whole world stop. Pure perfection.",
    date: "A special day",
    tape: "pink",
    rotation: -3,
  },
  {
    id: 2,
    image: "/images/7.jpeg",
    objectPosition: "center 16%",
    video: "/videos/2.mp4",
    videoPoster: "/video-thumbs/2.jpg",
    caption: "Our Cafe Conversations ☕",
    note: "Two coffee cups at Lentini Social, your hands in mine, and laughter that made hours feel like seconds.",
    date: "Lentini Social 50",
    tape: "yellow",
    rotation: 2,
  },
  {
    id: 3,
    image: "/images/11.jpeg",
    objectPosition: "center 22%",
    video: "/videos/6.mp4",
    videoPoster: "/video-thumbs/6.jpg",
    caption: "That Unstoppable Smile ✨",
    note: "Twirling around in your daisy dress without a care in the world. Your joy is genuinely contagious.",
    date: "Carefree Days",
    tape: "lavender",
    rotation: -4,
  },
  {
    id: 4,
    image: "/images/13.jpeg",
    objectPosition: "center 18%",
    video: null,
    caption: "Sunlit & Serene ☀️",
    note: "Bathed in the warm sun, softer and sweeter than any poem I could ever write.",
    date: "Golden Hour Magic",
    tape: "sage",
    rotation: 3,
  },
  {
    id: 5,
    image: "/images/10.jpeg",
    objectPosition: "center 18%",
    video: null,
    caption: "Elegance & Tradition 🌸",
    note: "Dressed in that gorgeous mint green attire, your smile outshone every piece of golden embroidery.",
    date: "Celebration Day",
    tape: "pink",
    rotation: -2,
  },
  {
    id: 6,
    image: "/images/12.jpeg",
    objectPosition: "center 24%",
    video: "/videos/3.mp4",
    videoPoster: "/video-thumbs/3.jpg",
    caption: "Tu Te Taareyan… ⭐",
    note: "'You are even more beautiful than the stars.' Kicking your heels up playfully, lighting up the entire room.",
    date: "Evening Out",
    tape: "yellow",
    rotation: 4,
  },
  {
    id: 7,
    image: "/images/16.jpeg",
    objectPosition: "center 22%",
    video: null,
    caption: "Cozy & Thoughtful 💕",
    note: "Resting your cheek in your hand with that tender, knowing look. My absolute favorite gaze.",
    date: "Quiet Hours",
    tape: "lavender",
    rotation: -3,
  },
  {
    id: 8,
    image: "/video-thumbs/1.jpg",
    objectPosition: "center 20%",
    video: "/videos/1.mp4",
    videoPoster: "/video-thumbs/1.jpg",
    caption: "Joy in Motion 🎶",
    note: "Your spontaneous cute dances never fail to make my day. Never lose that playful spirit.",
    date: "Fun Times",
    tape: "sage",
    rotation: 3,
  },
];

// ── LOVE REASONS (Page 3) ──────────────────────────────────
export const loveReasons = [
  {
    id: 1,
    message: "The way your eyes light up when you talk about something you love.",
    color: "#F6DDE5",
    tape: "yellow",
    rotation: -4,
    sticker: "🌸",
    featuredImage: "/images/15.jpeg", // Her actual eyes close-up
    featuredPosition: "center center",
  },
  {
    id: 2,
    message: "Your laugh — it's the most beautiful sound in my world.",
    color: "#F7E7A9",
    tape: "pink",
    rotation: 3,
    sticker: "✨",
  },
  {
    id: 3,
    message: "How you make every ordinary moment feel extraordinary.",
    color: "#E8DFF5",
    tape: "sage",
    rotation: -2,
    sticker: "💜",
  },
  {
    id: 4,
    message: "The tiny kindnesses you show without even realising.",
    color: "#DCE8D5",
    tape: "pink",
    rotation: 5,
    sticker: "🌿",
  },
  {
    id: 5,
    message: "Your heart — so open, so warm, so wonderfully you.",
    color: "#FFF0F5",
    tape: "lavender",
    rotation: -3,
    sticker: "💖",
  },
  {
    id: 6,
    message: "The way you see the good in everyone and everything.",
    color: "#FFFBE6",
    tape: "yellow",
    rotation: 2,
    sticker: "⭐",
  },
  {
    id: 7,
    message: "How you always know exactly what to say.",
    color: "#F6DDE5",
    tape: "pink",
    rotation: -5,
    sticker: "🌷",
  },
  {
    id: 8,
    message: "Your curiosity — the way you're endlessly interested in the world.",
    color: "#E8DFF5",
    tape: "sage",
    rotation: 4,
    sticker: "🔮",
  },
];

// ── TIMELINE (Page 4) ─────────────────────────────────────
export const timelineEvents = [
  {
    id: 1,
    date: "The Beginning",
    title: "Before Our Paths Crossed 🌟",
    description: "Long before our stories intertwined, the universe was already gently shaping the sweetest, most wonderful person for me.",
    image: "/images/8.jpeg",
    objectPosition: "center 20%",
    video: null,
    side: "left",
  },
  {
    id: 2,
    date: "First Steps Together",
    title: "Lentini Social & Coffee Dates ☕",
    description: "Two cups of warm coffee, gentle conversations, and that feeling where time completely lost its meaning.",
    image: "/images/7.jpeg",
    objectPosition: "center 16%",
    video: "/videos/2.mp4",
    videoPoster: "/video-thumbs/2.jpg",
    side: "right",
  },
  {
    id: 3,
    date: "A Day to Cherish",
    title: "A Bouquet of Red Roses 🌹",
    description: "The moment you held those fresh red roses. Seeing your eyes shine with sheer happiness is a memory etched in my heart forever.",
    image: "/images/14.jpeg",
    objectPosition: "center 16%",
    video: null,
    side: "left",
  },
  {
    id: 4,
    date: "Celebrations",
    title: "Festive Grace & Traditional Radiance 🌸",
    description: "When tradition met your timeless beauty. Dressed in vibrant colors, sparkling bangles and effortless elegance.",
    image: "/images/17.jpeg",
    objectPosition: "center 14%",
    video: "/videos/4.mp4",
    videoPoster: "/video-thumbs/4.jpg",
    side: "right",
  },
  {
    id: 5,
    date: "Today & Always",
    title: "Twirling Through Life With You ✨",
    description: "From spontaneous laughter to playful dances, every single ordinary day becomes extraordinary just by having you by my side.",
    image: "/images/11.jpeg",
    objectPosition: "center 22%",
    video: "/videos/6.mp4",
    videoPoster: "/video-thumbs/6.jpg",
    side: "left",
  },
];

// ── OPEN-WHEN LETTERS (Page 5) ────────────────────────────
export const openWhenLetters = [
  {
    id: 1,
    label: "Open when you miss me",
    emoji: "💌",
    color: "#F6DDE5",
    subject: "You're never really far away…",
    content: `My darling,

I know the distance feels heavy right now. But close your eyes and remember — every time you've thought of me and smiled, I was thinking of you too. 

Distance is just a test of how far love can travel. And ours? It travels endlessly.

Put on your favourite song. Make yourself a warm cup of something. Know that I'm out there, probably thinking of you at this exact moment.

You're loved more than words can hold. 

Always,  
Me ♡`,
  },
  {
    id: 2,
    label: "Open when you need a smile",
    emoji: "😊",
    color: "#F7E7A9",
    subject: "Here comes your smile…",
    content: `Hey, you.

Yes, you — the one reading this with maybe a tiny frown. This letter has one job: to make you smile.

So here goes:

🐥 You are someone's favourite person.  
🌈 You've survived 100% of your hard days so far.  
⭐ Somewhere, a dog is wagging its tail just because life is good.  
💛 And I think you're absolutely wonderful.

Better? Good. Now go do something nice for yourself today. You've earned it.

Smiling right back at you,  
Me 😄`,
  },
  {
    id: 3,
    label: "Open when you feel sad",
    emoji: "🫂",
    color: "#E8DFF5",
    subject: "I've got you, always.",
    content: `Sweet one,

Sad days are allowed. You don't have to be okay every single day. Some days just ask you to feel, and that's okay.

Cry if you need to. Rest if you need to. Let yourself be human.

But when the tears slow, I want you to remember:
— You are not alone in this.
— This feeling is real, and it will pass.
— You are stronger than you currently believe.

I wish I could be there to hold your hand right now. Consider this letter my hand, reaching across everything, just to say: I see you. I love you. I'm here.

It gets softer. I promise.

Holding you close always,  
Me 💜`,
  },
  {
    id: 4,
    label: "Open when you need motivation",
    emoji: "🔥",
    color: "#DCE8D5",
    subject: "You've got this. Really.",
    content: `Hey, champion.

Feeling stuck? That's okay. Even the bravest people pause sometimes.

But here's what I know about you:
You are capable of so much more than you think.
You have already done hard things.
You have already surprised yourself before.

This time is no different.

Take one small step. Then another. Don't look at the whole mountain — just the next stone. 

I believe in you with every piece of me. Now go show the world what you're made of.

Your biggest fan,  
Me 🌟`,
  },
  {
    id: 5,
    label: "Open when you want a little surprise",
    emoji: "🎁",
    color: "#FFF0F5",
    subject: "Surprise! ✨",
    content: `Surprise!! 🎉

Okay, I thought about sending you a glitter bomb but decided against it (you're welcome).

Instead, here's your surprise:

TODAY IS YOUR DAY. Do something completely for yourself. Something frivolous, joyful, and a little silly if you like.

Buy the fancy treat. Watch the guilty-pleasure film. Take the long bath. Dance badly in the kitchen.

Life is too short not to savour the tiny delights.

And just so you know — you deserve every single one of them.

With all the confetti and sparkle,  
Me 🎊✨🥳`,
  },
  {
    id: 6,
    label: "Open when you want to feel loved",
    emoji: "💖",
    color: "#F6DDE5",
    subject: "You are so, so loved.",
    content: `Dearest you,

Let me be very clear about something:

You are loved.

Not conditionally, not quietly, not with reservations.
Loudly, completely, wholeheartedly — loved.

You are loved in the way that Sunday mornings are loved. In the way that the first warm day of spring is loved. In the way that a perfect song at the right moment is loved.

You matter. Your presence changes things for the better. The world is genuinely better with you in it.

I hope you feel that today, and every single day.

With all my heart — every last piece of it,  
Me 💖`,
  },
];

// ── ALBUM: ALL 12 PHOTOGRAPHS & ALL 6 VIDEOS ───────────────
// Art-directed with individual aspect ratios & focus points
export const albumPhotos = [
  // 1. Couple Cafe Selfie (Portrait 9:16)
  {
    id: 1,
    type: "photo",
    image: "/images/7.jpeg",
    objectPosition: "center 16%",
    aspectRatio: "3/4",
    caption: "Us together, always ☕💕",
    category: "Special",
  },
  // 2. Lentini Social Video Clip (Portrait 9:16)
  {
    id: 2,
    type: "video",
    video: "/videos/2.mp4",
    image: "/video-thumbs/2.jpg",
    objectPosition: "center top",
    aspectRatio: "3/4",
    caption: "Cafe moments & holding hands ☕",
    category: "Date",
  },
  // 3. Red Roses Portrait (Portrait 9:16)
  {
    id: 3,
    type: "photo",
    image: "/images/14.jpeg",
    objectPosition: "center 16%",
    aspectRatio: "3/4",
    caption: "Roses for the prettiest smile 🌹",
    category: "Portrait",
  },
  // 4. Daisy Dress Twirl Video (Portrait 9:16)
  {
    id: 4,
    type: "video",
    video: "/videos/6.mp4",
    image: "/video-thumbs/6.jpg",
    objectPosition: "center top",
    aspectRatio: "3/4",
    caption: "Twirling in the daisy dress ✨",
    category: "Joy",
  },
  // 5. Traditional mint green close-up (Portrait 4:5)
  {
    id: 5,
    type: "photo",
    image: "/images/10.jpeg",
    objectPosition: "center 18%",
    aspectRatio: "3/4",
    caption: "Pure radiance in green 🌸",
    category: "Festive",
  },
  // 6. Childhood memory (~4:5)
  {
    id: 6,
    type: "photo",
    image: "/images/8.jpeg",
    objectPosition: "center 22%",
    aspectRatio: "3/4",
    caption: "The sweetest little beginning 👶✨",
    category: "Nostalgia",
  },
  // 7. Tu te taareyan cafe video (Portrait 9:16)
  {
    id: 7,
    type: "video",
    video: "/videos/3.mp4",
    image: "/video-thumbs/3.jpg",
    objectPosition: "center top",
    aspectRatio: "3/4",
    caption: "Tu te taareyan toh vi sohna ae ⭐",
    category: "Music",
  },
  // 8. Sunlit terrace portrait (Portrait 4:5)
  {
    id: 8,
    type: "photo",
    image: "/images/13.jpeg",
    objectPosition: "center 18%",
    aspectRatio: "3/4",
    caption: "Golden hour glow ☀️",
    category: "Portrait",
  },
  // 9. Black & white dance video (Portrait 9:16)
  {
    id: 9,
    type: "video",
    video: "/videos/1.mp4",
    image: "/video-thumbs/1.jpg",
    objectPosition: "center top",
    aspectRatio: "3/4",
    caption: "Playful moves & happy vibes 🎶",
    category: "Playful",
  },
  // 10. Brown dress mirror selfie (Portrait 9:16)
  {
    id: 10,
    type: "photo",
    image: "/images/9.jpeg",
    objectPosition: "center 18%",
    aspectRatio: "3/4",
    caption: "Chic & effortlessly stunning 🤎",
    category: "Style",
  },
  // 11. Festive celebration video (Portrait 9:16)
  {
    id: 11,
    type: "video",
    video: "/videos/4.mp4",
    image: "/video-thumbs/4.jpg",
    objectPosition: "center top",
    aspectRatio: "3/4",
    caption: "Festive sparkle & bangles 💖",
    category: "Festive",
  },
  // 12. Daisy dress portrait with moon filter (Portrait 9:16)
  {
    id: 12,
    type: "photo",
    image: "/images/11.jpeg",
    objectPosition: "center 22%",
    aspectRatio: "3/4",
    caption: "Moonlit charm 🌙",
    category: "Portrait",
  },
  // 13. Denim mirror reflection video (Portrait 9:16)
  {
    id: 13,
    type: "video",
    video: "/videos/5.mp4",
    image: "/video-thumbs/5.jpg",
    objectPosition: "center top",
    aspectRatio: "3/4",
    caption: "Boutique mirror moments ✨",
    category: "Style",
  },
  // 14. Denim dress mirror reflection photo (Portrait 9:16)
  {
    id: 14,
    type: "photo",
    image: "/images/12.jpeg",
    objectPosition: "center 24%",
    aspectRatio: "3/4",
    caption: "Reflected beauty 🪞",
    category: "Portrait",
  },
  // 15. Traditional full portrait (Portrait 3:4)
  {
    id: 15,
    type: "photo",
    image: "/images/17.jpeg",
    objectPosition: "center 14%",
    aspectRatio: "3/4",
    caption: "Grace in every detail 🌿",
    category: "Festive",
  },
  // 16. Cozy cheek-on-hand selfie (Portrait 9:16)
  {
    id: 16,
    type: "photo",
    image: "/images/16.jpeg",
    objectPosition: "center 22%",
    aspectRatio: "3/4",
    caption: "Warm smiles & quiet comfort 📚💕",
    category: "Cozy",
  },
  // 17. Close up of eyes and bindi (Landscape 2:1)
  {
    id: 17,
    type: "photo",
    image: "/images/15.jpeg",
    objectPosition: "center center",
    aspectRatio: "16/9",
    span: "wide",
    caption: "Those eyes that hold my universe 👁️✨",
    category: "Intimate",
  },
  // 18. Daisy dress mirror selfie with bracelet (Portrait 5:6)
  {
    id: 18,
    type: "photo",
    image: "/images/18.jpeg",
    objectPosition: "68% 22%",
    aspectRatio: "3/4",
    caption: "Delicate details & sweet vibes 🌼",
    category: "Style",
  },
];

// ── FINAL SURPRISE (Page 7) ───────────────────────────────
export const finalSurprise = {
  heading: "One Last Little Surprise…",
  buttonLabel: "Open Your Final Gift 💌",
  featuredVideo: "/videos/1.mp4", // Daisy dress twirl
  featuredPoster: "/video-thumbs/6.jpg",
  featuredPhoto: "/images/14.jpeg", // Red roses bouquet
  featuredPhotoPosition: "center 16%",
  message: `To my favourite person in the whole world,

If you've made it all the way here — through every memory, every note, every video clip and every little surprise — I hope you know just how much thought, care, and love went into every single page.

This scrapbook is just a small window into everything I feel. The real thing is immeasurable.

You make ordinary days feel like gifts. You make the world softer, warmer, and so much more wonderful just by being in it. And I am so incredibly lucky to have you in my life.

No matter how many pages I fill, there will always be more memories for us to make.

Thank you for being you.
Thank you for everything.
I love you — always, without end.`,
  signature: "Forever and always yours ♡",
  closingLine: "No matter how many pages I fill, there will always be more memories to make.",
};
