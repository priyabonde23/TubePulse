import { VideoMetadata, CommentItem } from '@/types';
import { analyzeSentiment } from './nlpEngine';
import { classifyEmotion, detectIsQuestion } from './emotionClassifier';
import { evaluateSafety, extractTimestamp } from './toxicityEngine';

export interface SampleVideoPackage {
  id: string;
  metadata: VideoMetadata;
  rawComments: { author: string; text: string; likes: number; date: string }[];
}

export const SAMPLE_VIDEOS: Record<string, SampleVideoPackage> = {
  'trailer-demo': {
    id: 'trailer-demo',
    metadata: {
      id: 'trailer-demo',
      title: 'Marvel Studios\' Avengers: Secret Wars | Official Teaser Trailer',
      channelTitle: 'Marvel Entertainment',
      thumbnail: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      viewCount: 48200500,
      likeCount: 2450000,
      commentCount: 89400,
      publishedAt: '2026-08-15T16:00:00Z',
      url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    },
    rawComments: [
      { author: 'CinemaLover99', text: 'THAT FINAL SHOT GAVE ME LITERAL CHILLS! 🔥🔥 Marvel is so back!!', likes: 1450, date: '2 days ago' },
      { author: 'Alex Rivera', text: 'The background score when the portal opened was pure cinematic gold. 10/10 masterpiece trailer!', likes: 980, date: '2 days ago' },
      { author: 'NerdCultureHQ', text: 'Wait, at 01:42 is that Magneto standing next to Doctor Doom?? Can someone confirm? 🤔', likes: 620, date: '1 day ago' },
      { author: 'Sarah_Vfx', text: 'The CGI looks significantly better than the recent phase 4 projects. Props to the VFX team! 👏', likes: 450, date: '2 days ago' },
      { author: 'GamerGuy2024', text: 'Honestly expected more action scenes. Felt a bit too short for a 3-year wait.', likes: 85, date: '1 day ago' },
      { author: 'David K.', text: 'I literally cried at 02:15 when the original theme kicked in 😭❤️ Legendary moment!', likes: 890, date: '2 days ago' },
      { author: 'PopcornCritic', text: 'Why are they releasing this in November instead of summer? Makes no sense.', likes: 110, date: '20 hours ago' },
      { author: 'MarvelTheorist', text: 'Notice at 00:48 how the multiverse sky is fracturing exactly like in the comics! 🐐', likes: 540, date: '1 day ago' },
      { author: 'TechieSam', text: 'Best trailer Marvel has dropped since Infinity War. Pure hype 🔥🚀', likes: 720, date: '2 days ago' },
      { author: 'Rohit Verma', text: 'Bhai ek number trailer! Dil khush ho gaya dekh kar, full paisa wasool feel! 🔥', likes: 410, date: '1 day ago' },
      { author: 'Emily Watson', text: 'Who is playing the variant in the red armor at 01:05? Is it Tom Cruise or someone new?', likes: 310, date: '18 hours ago' },
      { author: 'SpamBot99', text: 'Check my channel for free movie tickets giveaway telegram: t.me/free_tickets', likes: 2, date: '2 hours ago' }
    ]
  },
  'iphone-review': {
    id: 'iphone-review',
    metadata: {
      id: 'iphone-review',
      title: 'iPhone 16 Pro Max - 1 Month Later! The Honest Truth',
      channelTitle: 'MKBHD Tech Reviews',
      thumbnail: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80',
      viewCount: 3200400,
      likeCount: 145000,
      commentCount: 12400,
      publishedAt: '2026-08-10T14:30:00Z',
      url: 'https://www.youtube.com/watch?v=iPhone16Review'
    },
    rawComments: [
      { author: 'Dave Tech', text: 'The battery life on this thing is an absolute beast! Lasts me almost 2 full days without charging 🔥', likes: 1200, date: '3 days ago' },
      { author: 'Marcus V.', text: 'Clear and honest review as always. Saved me $1200 since my 14 Pro is still going strong.', likes: 890, date: '3 days ago' },
      { author: 'PixelFanatic', text: 'The new Camera Control button at 04:30 feels awkward in portrait mode. Anyone else finding it hard to press?', likes: 450, date: '2 days ago' },
      { author: 'Amit Sharma', text: 'Bhai camera toh lajawab hai, but price bohot zyada overpriced hai India me 💀', likes: 620, date: '2 days ago' },
      { author: 'BudgetTechie', text: '$1200 and still no 120Hz on the base model is criminal Apple greed 💀', likes: 1420, date: '3 days ago' },
      { author: 'AudioEngineerDan', text: 'The studio microphones test you did at 06:20 was super helpful! Amazing audio quality.', likes: 280, date: '1 day ago' },
      { author: 'Kevin Ramos', text: 'Does it overheat while recording 4K 120fps video for longer than 15 minutes at 08:15?', likes: 195, date: '1 day ago' },
      { author: 'Elena Rostova', text: 'Sleek design and blazing fast performance, but Siri AI is still disappointing.', likes: 390, date: '2 days ago' },
      { author: 'Zack Reviews', text: 'Great breakdown! Would love to see a battery comparison against S25 Ultra next.', likes: 410, date: '2 days ago' }
    ]
  },
  's24-ultra-review': {
    id: 's24-ultra-review',
    metadata: {
      id: 's24-ultra-review',
      title: 'Samsung Galaxy S24 Ultra - The King of Android Smartphones',
      channelTitle: 'Mrwhosetheboss',
      thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      viewCount: 2900100,
      likeCount: 162000,
      commentCount: 14100,
      publishedAt: '2026-08-05T12:00:00Z',
      url: 'https://www.youtube.com/watch?v=S24UltraReview'
    },
    rawComments: [
      { author: 'AndroidKing', text: 'The anti-reflective flat display is the single best smartphone upgrade in 5 years! 🔥👏', likes: 1600, date: '4 days ago' },
      { author: 'Devin Cole', text: 'The 100x zoom demonstration at 03:45 blew my mind completely. Nothing beats Galaxy zoom 🐐', likes: 940, date: '3 days ago' },
      { author: 'Priyanka N.', text: 'S-Pen stylus is super convenient for signing documents and quick notes! Loved the review ❤️', likes: 480, date: '2 days ago' },
      { author: 'SammyFan', text: 'Galaxy AI features like Circle to Search at 05:10 are actually useful every single day.', likes: 710, date: '3 days ago' },
      { author: 'TechCritique', text: 'The shutter lag when taking photos of moving pets is still slightly noticeable compared to Pixel.', likes: 210, date: '2 days ago' },
      { author: 'BudgetBuyer', text: 'Price is high, but the trade-in deals and 7 years of OS updates make it 100% worth it.', likes: 530, date: '1 day ago' }
    ]
  },
  'ai-tutorial': {
    id: 'ai-tutorial',
    metadata: {
      id: 'ai-tutorial',
      title: 'Build a Full-Stack AI SaaS App with Next.js 14, Tailwind & Python',
      channelTitle: 'Code With Antonio',
      thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      viewCount: 450200,
      likeCount: 38000,
      commentCount: 2900,
      publishedAt: '2026-08-01T10:00:00Z',
      url: 'https://www.youtube.com/watch?v=NextjsAiTutorial'
    },
    rawComments: [
      { author: 'DevJunior99', text: 'This tutorial is better than paid $200 courses! Everything is explained so clearly. Thank you so much! ❤️🚀', likes: 620, date: '1 week ago' },
      { author: 'Priya Sharma', text: 'The architecture diagram at 02:10 helped me finally understand how Next.js API routes connect to Python! 💡', likes: 340, date: '5 days ago' },
      { author: 'CodeNinja_X', text: 'Where can we find the GitHub repository link for the starter code?', likes: 210, date: '4 days ago' },
      { author: 'Lucas Meyer', text: 'Getting a CORS error on line 45 when calling the FastAPI endpoint at 12:40. Anyone have a quick fix?', likes: 145, date: '3 days ago' },
      { author: 'Sarah_Codes', text: 'Loved the modern UI styling and clean component structure. Absolute gold content 💯', likes: 410, date: '1 week ago' },
      { author: 'WebDevSam', text: 'Cleanest code walkthrough on YouTube. Subscribed immediately! 🐐', likes: 375, date: '6 days ago' }
    ]
  },
  'gaming-launch': {
    id: 'gaming-launch',
    metadata: {
      id: 'gaming-launch',
      title: 'Grand Theft Auto VI - Gameplay Reveal & World Deep Dive',
      channelTitle: 'Rockstar Games',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
      viewCount: 112000000,
      likeCount: 8900000,
      commentCount: 420000,
      publishedAt: '2026-08-18T18:00:00Z',
      url: 'https://www.youtube.com/watch?v=GTA6Gameplay'
    },
    rawComments: [
      { author: 'ViceCityOG', text: 'The physics and water reflections at 01:15 look completely next-gen! Rockstar never misses 👑🔥', likes: 5800, date: '4 days ago' },
      { author: 'GamerGirl92', text: 'Lucia and Jason\'s chemistry already feels so natural. Cannot wait for 2026!!', likes: 3200, date: '4 days ago' },
      { author: 'PCMasterRace', text: 'Please tell me the PC version won\'t be delayed by a whole year 😭💔', likes: 4100, date: '3 days ago' },
      { author: 'CyberSamurai', text: 'The crowd density on the beach at 02:40 was insane! Every single NPC had unique animations.', likes: 2100, date: '3 days ago' },
      { author: 'SpeedrunnerPro', text: '12 years of waiting was 100% worth every single second. Masterpiece in the making!', likes: 2700, date: '4 days ago' }
    ]
  }
};

/**
 * Helper to process raw comments with NLP engine & Safety analyzer
 */
export function buildProcessedComments(
  rawList: { author: string; text: string; likes: number; date: string }[]
): CommentItem[] {
  return rawList.map((item, index) => {
    const sentimentRes = analyzeSentiment(item.text);
    const emotionRes = classifyEmotion(item.text, sentimentRes.score);
    const isQuestion = detectIsQuestion(item.text);
    const safety = evaluateSafety(item.text);
    const ts = extractTimestamp(item.text);

    return {
      id: `comm-${index + 1}`,
      author: item.author,
      text: item.text,
      likes: item.likes,
      publishedAt: item.date,
      sentiment: sentimentRes.sentiment,
      sentimentScore: sentimentRes.score,
      emotion: emotionRes.emotion,
      emotionScore: emotionRes.score,
      isQuestion,
      isToxic: safety.isToxic,
      isSpam: safety.isSpam,
      timestamp: ts.timestamp
    };
  });
}
