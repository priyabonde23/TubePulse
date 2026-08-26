import { CommentItem } from '@/types';

export interface SmartReplies {
  grateful: string;
  professional: string;
  witty: string;
  helpful: string;
}

export function generateSmartReplies(comment: CommentItem): SmartReplies {
  const { text, sentiment, isQuestion, emotion } = comment;

  if (isQuestion) {
    return {
      grateful: `Thank you for asking! Really appreciate you taking the time to watch and dive into the details. ❤️`,
      professional: `Great question! We will be covering this exact topic with step-by-step documentation in our upcoming release.`,
      witty: `Asking the real million-dollar question right here! Keep your eyes peeled for the next video 😉🚀`,
      helpful: `Check the pinned comment and description link for all timestamps, resource links, and direct FAQs!`
    };
  }

  if (sentiment === 'positive') {
    return {
      grateful: `Thank you so much for the love and support! Comments like this truly make all the effort worth it ❤️✨`,
      professional: `Much appreciated! We spent countless hours refining this, and I'm thrilled to hear it resonated with you.`,
      witty: `W viewer right here! Appreciate you rocking with us, legend 🐐🔥`,
      helpful: `Glad this was valuable! Don't forget to bookmark it or check out our related playlist for more deep dives.`
    };
  }

  if (sentiment === 'negative' || emotion === 'disappointment') {
    return {
      grateful: `Thank you for the candid feedback! We always aim to improve and will definitely keep your notes in mind for next time. 🙏`,
      professional: `Thanks for sharing your perspective. We hear your criticism regarding pacing/pricing and are taking it on board for the next iteration.`,
      witty: `Fair point! Can't please everyone every single time, but challenge accepted for the next one! 🫡`,
      helpful: `We noticed this pain point and have updated the description with alternative recommendations to help solve it!`
    };
  }

  // Neutral / General
  return {
    grateful: `Thanks for tuning in and dropping your thoughts! Hope you enjoyed the video ❤️`,
    professional: `Thank you for watching and participating in the discussion. More insights coming soon.`,
    witty: `Appreciate the vibe check! Stay tuned for more heat coming your way 🔥`,
    helpful: `Let us know if you'd like to see a follow-up comparison or dedicated breakdown on this!`
  };
}

export function translateComment(text: string): string {
  const lower = text.toLowerCase();

  // Common Hinglish translations
  if (lower.includes('paisa wasool')) return text + ' ➜ [Translation: "Totally worth every penny / Great value!"]';
  if (lower.includes('ek number') || lower.includes('bawaal')) return text + ' ➜ [Translation: "Top tier / Phenomenal quality!"]';
  if (lower.includes('bakwas') || lower.includes('ghatiya')) return text + ' ➜ [Translation: "Poor quality / Very disappointing."]';
  if (lower.includes('dil jeet liya')) return text + ' ➜ [Translation: "Won my heart completely!"]';
  if (lower.includes('maza aa gaya')) return text + ' ➜ [Translation: "Thoroughly enjoyed it / Super fun experience!"]';

  // Generic translation enhancement
  return text + ' ➜ [English Cleaned: "' + text.replace(/[^\w\s.,!?'-]/g, '').trim() + '"]';
}
