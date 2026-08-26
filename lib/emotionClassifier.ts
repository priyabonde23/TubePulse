import { EmotionType, EmotionBreakdown, CommentItem } from '@/types';

interface EmotionPattern {
  type: EmotionType;
  keywords: string[];
  emojis: string[];
  weight: number;
}

const EMOTION_PATTERNS: EmotionPattern[] = [
  {
    type: 'joy',
    keywords: [
      'haha', 'lmao', 'lol', 'funny', 'hilarious', 'laugh', 'crying laughing',
      'wholesome', 'smile', 'joy', 'happy', 'blessed', 'cute', 'sweet', 'beautiful',
      'gem', 'love this', 'adore', 'pure joy'
    ],
    emojis: ['😂', '🤣', '❤️', '💖', '🥰', '😍', '✨', '🥹', '😊', '😁'],
    weight: 1.2
  },
  {
    type: 'hype',
    keywords: [
      'fire', 'banger', 'goat', 'peak', 'insane', 'hyped', 'epic', 'legendary',
      'masterpiece', 'goosebumps', 'cant wait', "can't wait", 'chills', 'unreal',
      'mindblowing', 'let\'s go', 'lets go', 'crushed it', 'slaps', 'wild'
    ],
    emojis: ['🔥', '🚀', '⚡', '🤯', '🤩', '🐐', '👑', '💯', '🎉', '💥', '🙌'],
    weight: 1.3
  },
  {
    type: 'confusion',
    keywords: [
      'why', 'how', 'what', 'where', 'when', 'confused', 'dont understand',
      "don't understand", 'explain', 'meaning', 'anyone know', 'is this',
      'timestamp', 'wait what', 'lost me', 'does anyone', 'could you explain'
    ],
    emojis: ['🤔', '🤨', '❓', '❔', '🧐', '🤷', '🤷‍♂️', '🤷‍♀️'],
    weight: 1.1
  },
  {
    type: 'disappointment',
    keywords: [
      'disappointed', 'disappointing', 'expected more', 'waste of time', 'letdown',
      'ruined', 'worst', 'trash', 'fell off', 'cringe', 'annoying', 'hate',
      'poor', 'boring', 'unsubbed', 'clickbait', 'sucks', 'downgrade', 'overrated'
    ],
    emojis: ['🤮', '🤢', '😡', '🤬', '👎', '💔', '💩', '🤦', '🤦‍♂️', '🥱'],
    weight: 1.3
  },
  {
    type: 'constructive',
    keywords: [
      'should have', 'could have', 'suggestion', 'next time', 'better if',
      'would be cool', 'recommend', 'feedback', 'improve', 'tip', 'instead of',
      'please add', 'would love to see', 'try to', 'audio could be', 'fix the'
    ],
    emojis: ['💡', '📌', '✍️', '🛠️', '⚙️', '📝'],
    weight: 1.2
  }
];

export function detectIsQuestion(text: string): boolean {
  if (text.includes('?')) return true;
  const lower = text.toLowerCase().trim();
  return (
    lower.startsWith('why ') ||
    lower.startsWith('how ') ||
    lower.startsWith('what ') ||
    lower.startsWith('where ') ||
    lower.startsWith('when ') ||
    lower.startsWith('who ') ||
    lower.startsWith('is there ') ||
    lower.startsWith('can anyone ')
  );
}

export function classifyEmotion(
  text: string,
  sentimentScore: number
): { emotion: EmotionType; score: number } {
  if (!text) return { emotion: 'neutral', score: 0.5 };

  const lower = text.toLowerCase();
  const scores: Record<EmotionType, number> = {
    joy: 0,
    hype: 0,
    confusion: 0,
    disappointment: 0,
    constructive: 0,
    neutral: 0.2
  };

  const isQuestion = detectIsQuestion(text);
  if (isQuestion) {
    scores.confusion += 1.5;
  }

  for (const pattern of EMOTION_PATTERNS) {
    // Check keywords
    for (const kw of pattern.keywords) {
      if (lower.includes(kw)) {
        scores[pattern.type] += pattern.weight;
      }
    }
    // Check emojis
    for (const em of pattern.emojis) {
      if (text.includes(em)) {
        scores[pattern.type] += pattern.weight * 1.2;
      }
    }
  }

  // Correlate with sentiment score
  if (sentimentScore > 0.4) {
    scores.hype += sentimentScore * 0.8;
    scores.joy += sentimentScore * 0.8;
  } else if (sentimentScore < -0.3) {
    scores.disappointment += Math.abs(sentimentScore) * 1.2;
  }

  // Find max emotion
  let bestEmotion: EmotionType = 'neutral';
  let maxScore = scores.neutral;

  (Object.keys(scores) as EmotionType[]).forEach((emo) => {
    if (scores[emo] > maxScore) {
      maxScore = scores[emo];
      bestEmotion = emo;
    }
  });

  const normalizedConfidence = Math.min(1.0, Math.round((maxScore / 3.0) * 100) / 100);

  return {
    emotion: bestEmotion,
    score: Math.max(0.4, normalizedConfidence)
  };
}

export function calculateEmotionBreakdown(
  emotionsList: EmotionType[]
): EmotionBreakdown {
  if (!emotionsList.length) {
    return { joy: 0, hype: 0, confusion: 0, disappointment: 0, constructive: 0, neutral: 100 };
  }

  const counts: Record<EmotionType, number> = {
    joy: 0,
    hype: 0,
    confusion: 0,
    disappointment: 0,
    constructive: 0,
    neutral: 0
  };

  for (const emo of emotionsList) {
    counts[emo] = (counts[emo] || 0) + 1;
  }

  const total = emotionsList.length;

  return {
    joy: Math.round((counts.joy / total) * 100),
    hype: Math.round((counts.hype / total) * 100),
    confusion: Math.round((counts.confusion / total) * 100),
    disappointment: Math.round((counts.disappointment / total) * 100),
    constructive: Math.round((counts.constructive / total) * 100),
    neutral: Math.round((counts.neutral / total) * 100)
  };
}
