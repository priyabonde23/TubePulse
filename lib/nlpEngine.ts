import { SentimentType, SentimentBreakdown } from '@/types';

// Positive lexicon with weights (English + Internet Slang + Hinglish)
const POSITIVE_LEXICON: Record<string, number> = {
  // Classic positive
  'great': 2.0, 'good': 1.5, 'awesome': 2.5, 'excellent': 2.8, 'amazing': 2.8,
  'love': 2.5, 'loved': 2.5, 'best': 3.0, 'perfect': 3.0, 'helpful': 2.0,
  'useful': 1.8, 'clear': 1.5, 'clean': 1.5, 'easy': 1.5, 'impressive': 2.4,
  'fantastic': 2.7, 'incredible': 2.8, 'brilliant': 2.8, 'superb': 2.6,
  'valuable': 2.0, 'informative': 2.2, 'wonderful': 2.5, 'beautiful': 2.0,
  'favorite': 2.5, 'solid': 1.8, 'cool': 1.5, 'nice': 1.4, 'thank': 1.5,
  'thanks': 1.6, 'appreciate': 2.0, 'gem': 2.5, 'gold': 2.2, 'smart': 1.8,
  'masterpiece': 3.2, 'legendary': 3.0, 'sublime': 2.8, 'worth': 2.0,

  // Internet & Gen-Z Slang
  'fire': 2.8, 'goat': 3.0, 'peak': 2.6, 'underrated': 2.2, 'banger': 2.7,
  'slaps': 2.4, 'w': 2.0, 'huge w': 2.8, 'clutch': 2.3, 'insane': 2.0,
  'chef kiss': 2.8, 'spot on': 2.5, 'based': 2.0, 'epic': 2.4, 'genius': 2.7,
  'crushed it': 2.6, 'nailed it': 2.7, 'blessed': 2.0, 'mindblown': 2.8,

  // 🇮🇳 Hinglish & Indian Slang
  'paisa wasool': 3.2, 'ek number': 3.0, 'bawaal': 2.8, 'gazab': 2.8,
  'lajawab': 3.0, 'shandar': 2.8, 'mast': 2.2, 'jhakaas': 2.8, 'kadak': 2.5,
  'zabardast': 2.8, 'aag laga di': 3.2, 'faad diya': 3.0, 'dil jeet liya': 3.2,
  'op bhai': 2.7, 'kamaal': 2.5, 'sahi hai': 2.0, 'super se upar': 3.0,
  'dhamaal': 2.6, 'khatarnak': 2.4, 'maza aa gaya': 3.0, 'dil khush': 2.8,
  'kamaal kar diya': 3.0, 'tagda': 2.4, 'bhai mast': 2.6, 'solid bhai': 2.4,
  'chha gaye': 2.8, 'att': 2.5, 'sira': 2.6, 'ghaint': 2.6
};

// Negative lexicon with weights (English + Internet Slang + Hinglish)
const NEGATIVE_LEXICON: Record<string, number> = {
  // Classic negative
  'bad': -2.0, 'terrible': -3.0, 'horrible': -3.0, 'awful': -3.0, 'poor': -2.0,
  'worst': -3.5, 'hate': -3.0, 'hated': -3.0, 'waste': -2.8, 'useless': -2.8,
  'boring': -2.0, 'confusing': -1.8, 'hard': -1.2, 'difficult': -1.2,
  'slow': -1.5, 'buggy': -2.4, 'broken': -2.8, 'flawed': -2.0, 'disappointed': -2.6,
  'disappointing': -2.6, 'annoying': -2.2, 'frustrating': -2.4, 'failed': -2.5,
  'wrong': -1.8, 'problem': -1.5, 'issue': -1.4, 'misleading': -2.6, 'clickbait': -2.8,
  'expensive': -1.8, 'overpriced': -2.4, 'sucks': -2.8, 'stupid': -2.5,

  // Internet & Social Media Slang
  'trash': -3.0, 'garbage': -3.0, 'mid': -1.8, 'cringe': -2.4, 'scam': -3.5,
  'l': -2.0, 'huge l': -2.8, 'overrated': -2.0, 'cap': -2.2, 'fell off': -2.5,
  'yawn': -2.0, 'unsubbed': -2.8, 'ruined': -2.8, 'joke': -2.0, 'clown': -2.4,

  // 🇮🇳 Hinglish & Indian Slang
  'bakwas': -3.2, 'ghatiya': -3.2, 'feku': -3.0, 'bekar': -2.6, 'faltu': -2.5,
  'kachra': -3.0, 'barbaad': -3.2, 'dhokha': -3.0, 'time waste': -3.0,
  'bore kiya': -2.4, 'hag diya': -3.4, 'overacting': -2.6, 'fraud': -3.2,
  'loot liya': -3.0, 'dislike': -2.2, 'bawasir': -3.5, 'chutyapa': -3.2,
  'maha bakwas': -3.5, 'bilkul bekar': -3.2, 'chhi': -2.5, 'pakao': -2.4
};

// Emojis mapping
const EMOJI_LEXICON: Record<string, number> = {
  '🔥': 2.5, '❤️': 2.5, '💖': 2.5, '😍': 2.8, '👏': 2.0, '🙌': 2.2, '🚀': 2.5,
  '💯': 2.8, '🎉': 2.2, '✨': 2.0, '🐐': 3.0, '👑': 2.5, '🤩': 2.5, '👌': 1.8,
  '😂': 1.5, '🤣': 1.8, '👍': 1.6, '💪': 2.0, '🙏': 1.8, '🇮🇳': 1.5,

  '💀': -0.8,
  '🤮': -3.2, '🤢': -2.8, '😡': -3.0, '🤬': -3.5, '👎': -2.4, '💩': -3.0,
  '🤡': -2.8, '🤦': -2.0, '🤦‍♂️': -2.0, '🤦‍♀️': -2.0, '🥱': -2.0, '💔': -2.5,
  '😢': -1.8, '😭': -0.5
};

// Intensifiers
const INTENSIFIERS: Record<string, number> = {
  'very': 1.4, 'extremely': 1.8, 'super': 1.6, 'really': 1.5, 'so': 1.4,
  'absolutely': 1.8, 'completely': 1.6, 'totally': 1.6, 'insanely': 1.8,
  'ultra': 1.7, 'barely': 0.4, 'hardly': 0.3, 'kinda': 0.7, 'slightly': 0.6,
  'bohot': 1.6, 'bahut': 1.6, 'ekdam': 1.7, 'pura': 1.5, 'poora': 1.5, 'full': 1.5
};

// Negations
const NEGATIONS = new Set([
  'not', 'no', 'never', 'none', 'neither', 'nor', 'hardly', 'barely',
  "don't", "dont", "didn't", "didnt", "won't", "wont", "can't", "cant",
  "couldn't", "couldnt", "shouldn't", "shouldnt", "isn't", "isnt",
  "aren't", "arent", "wasn't", "wasnt", "without",
  'nahi', 'mat', 'na', 'kabhi nahi'
]);

export interface SentimentAnalysisOutput {
  sentiment: SentimentType;
  score: number; // Normalized -1 to +1
  confidence: number;
}

/**
 * Analyzes sentiment of a single comment text with Hinglish and emoji support
 */
export function analyzeSentiment(text: string): SentimentAnalysisOutput {
  if (!text || typeof text !== 'string') {
    return { sentiment: 'neutral', score: 0, confidence: 0 };
  }

  let totalScore = 0;
  let wordCount = 0;
  const lower = text.toLowerCase();

  // 1. Emoji Sentiment
  for (const [emoji, weight] of Object.entries(EMOJI_LEXICON)) {
    const count = (text.match(new RegExp(emoji, 'g')) || []).length;
    if (count > 0) {
      totalScore += weight * Math.min(count, 3);
      wordCount += count;
    }
  }

  // 2. Multi-word phrase matches (including Hinglish multi-words)
  for (const [phrase, weight] of Object.entries(POSITIVE_LEXICON)) {
    if (phrase.includes(' ') && lower.includes(phrase)) {
      totalScore += weight;
      wordCount += 2;
    }
  }
  for (const [phrase, weight] of Object.entries(NEGATIVE_LEXICON)) {
    if (phrase.includes(' ') && lower.includes(phrase)) {
      totalScore += weight;
      wordCount += 2;
    }
  }

  // 3. Tokenize words & single word lookup
  const words = lower.replace(/[^\w\s'-]/g, ' ').split(/\s+/).filter(Boolean);

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    let multiplier = 1.0;

    const prev1 = words[i - 1];
    const prev2 = words[i - 2];

    let isNegated = false;
    if (prev1 && NEGATIONS.has(prev1)) isNegated = true;
    if (prev2 && NEGATIONS.has(prev2)) isNegated = true;

    if (prev1 && INTENSIFIERS[prev1]) multiplier *= INTENSIFIERS[prev1];
    if (prev2 && INTENSIFIERS[prev2]) multiplier *= INTENSIFIERS[prev2];

    if (!word.includes(' ') && POSITIVE_LEXICON[word]) {
      let val = POSITIVE_LEXICON[word] * multiplier;
      if (isNegated) val = -val * 0.8;
      totalScore += val;
      wordCount++;
    } else if (!word.includes(' ') && NEGATIVE_LEXICON[word]) {
      let val = NEGATIVE_LEXICON[word] * multiplier;
      if (isNegated) val = Math.abs(val) * 0.7;
      totalScore += val;
      wordCount++;
    }
  }

  // Exclamations & caps boost
  const exclamations = (text.match(/!/g) || []).length;
  if (exclamations > 1 && totalScore !== 0) {
    totalScore *= 1 + Math.min(exclamations * 0.1, 0.5);
  }

  const isAllCaps = text.length > 6 && text === text.toUpperCase() && /[A-Z]/.test(text);
  if (isAllCaps && totalScore !== 0) {
    totalScore *= 1.3;
  }

  const normalizedScore = wordCount === 0 && totalScore === 0
    ? 0
    : Math.tanh(totalScore / 3.0);

  let sentiment: SentimentType = 'neutral';
  if (normalizedScore > 0.15) {
    sentiment = 'positive';
  } else if (normalizedScore < -0.15) {
    sentiment = 'negative';
  }

  const confidence = Math.min(Math.abs(normalizedScore) * 1.2 + 0.3, 0.99);

  return {
    sentiment,
    score: Math.round(normalizedScore * 100) / 100,
    confidence: Math.round(confidence * 100) / 100
  };
}

/**
 * Calculates overall sentiment breakdown for a collection of comments
 */
export function calculateOverallSentiment(
  analyzedScores: { sentiment: SentimentType; score?: number; sentimentScore?: number }[]
): SentimentBreakdown {
  if (!analyzedScores.length) {
    return {
      positive: 0,
      neutral: 100,
      negative: 0,
      averageScore: 0,
      overallScore: 50,
      verdict: 'Mixed / Controversial'
    };
  }

  let posCount = 0;
  let neuCount = 0;
  let negCount = 0;
  let totalScore = 0;

  for (const item of analyzedScores) {
    if (item.sentiment === 'positive') posCount++;
    else if (item.sentiment === 'negative') negCount++;
    else neuCount++;
    const itemScore = typeof item.sentimentScore === 'number' ? item.sentimentScore : (item.score || 0);
    totalScore += itemScore;
  }

  const total = analyzedScores.length;
  const positive = Math.round((posCount / total) * 100);
  const negative = Math.round((negCount / total) * 100);
  const neutral = Math.max(0, 100 - positive - negative);

  const averageScore = Math.round((totalScore / total) * 100) / 100;
  const overallScore = Math.min(100, Math.max(0, Math.round(((averageScore + 1) / 2) * 100)));

  let verdict: SentimentBreakdown['verdict'] = 'Mixed / Controversial';
  if (overallScore >= 78) {
    verdict = 'Overwhelmingly Positive';
  } else if (overallScore >= 60) {
    verdict = 'Mostly Positive';
  } else if (overallScore <= 25) {
    verdict = 'Overwhelmingly Negative';
  } else if (overallScore <= 42) {
    verdict = 'Mostly Negative';
  }

  return {
    positive,
    neutral,
    negative,
    averageScore,
    overallScore,
    verdict
  };
}
