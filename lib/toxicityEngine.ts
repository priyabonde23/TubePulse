import { CommentItem, ToxicityReport, TimestampPoint } from '@/types';

// Toxic patterns & abusive markers
const TOXIC_PATTERNS = [
  /\b(idiot|stupid|moron|loser|dumbass|retard|stfu|f\*ck|bitch|bastard|asshole|trash|scam|fraud)\b/i,
  /\b(chutiya|bhenchod|madarchod|gandu|harami|bawasir|kamine|suar|kutte|chutiyapa)\b/i,
  /\b(kill yourself|kys|hate you|die|ugly|disgusting|unfollow this clown)\b/i
];

// Spam patterns (links, telegram/crypto bots, sub4sub, whatsapp promo)
const SPAM_PATTERNS = [
  /\b(telegram|t\.me\/|whatsapp|wa\.me\/|crypto|bitcoin|forex|invest with|daily profit)\b/i,
  /\b(sub\s*4\s*sub|sub\s*back|check\s*my\s*channel|free\s*subscribers|free\s*vbucks|free\s*robux)\b/i,
  /\b(dm\s*me\s*on\s*insta|click\s*link\s*in\s*bio|dating\s*site|cashapp|money\s*generator)\b/i,
  /https?:\/\/[^\s]+/i
];

/**
 * Checks a single comment for toxicity and spam
 */
export function evaluateSafety(text: string): { isToxic: boolean; isSpam: boolean } {
  if (!text) return { isToxic: false, isSpam: false };

  let isToxic = false;
  let isSpam = false;

  for (const pattern of TOXIC_PATTERNS) {
    if (pattern.test(text)) {
      isToxic = true;
      break;
    }
  }

  for (const pattern of SPAM_PATTERNS) {
    if (pattern.test(text)) {
      isSpam = true;
      break;
    }
  }

  return { isToxic, isSpam };
}

/**
 * Extracts timestamp mentions (e.g. 01:23, 10:45) from comments
 */
export function extractTimestamp(text: string): { timestamp?: string; seconds?: number } {
  if (!text) return {};

  const match = text.match(/\b([0-5]?[0-9]):([0-5][0-9])\b/);
  if (match) {
    const minutes = parseInt(match[1], 10);
    const secs = parseInt(match[2], 10);
    return {
      timestamp: `${match[1].padStart(2, '0')}:${match[2].padStart(2, '0')}`,
      seconds: minutes * 60 + secs
    };
  }

  return {};
}

/**
 * Computes overall community health & safety index
 */
export function calculateCommunityHealth(comments: CommentItem[]): ToxicityReport {
  if (!comments.length) {
    return {
      communityHealthScore: 100,
      toxicCount: 0,
      spamCount: 0,
      toxicityRatio: 0,
      safetyStatus: 'Exceptional & Safe'
    };
  }

  let toxicCount = 0;
  let spamCount = 0;

  for (const comment of comments) {
    if (comment.isToxic) toxicCount++;
    if (comment.isSpam) spamCount++;
  }

  const total = comments.length;
  const toxicRatio = Math.round((toxicCount / total) * 100);
  const spamRatio = Math.round((spamCount / total) * 100);

  // Health Score: 100 - (toxic% * 1.5 + spam% * 1.0)
  const penalty = toxicRatio * 1.6 + spamRatio * 1.0;
  const communityHealthScore = Math.max(10, Math.min(100, Math.round(100 - penalty)));

  let safetyStatus: ToxicityReport['safetyStatus'] = 'Healthy Community';
  if (communityHealthScore >= 92) {
    safetyStatus = 'Exceptional & Safe';
  } else if (communityHealthScore >= 78) {
    safetyStatus = 'Healthy Community';
  } else if (communityHealthScore >= 60) {
    safetyStatus = 'Moderate Trolling';
  } else {
    safetyStatus = 'High Hostility Warning';
  }

  return {
    communityHealthScore,
    toxicCount,
    spamCount,
    toxicityRatio: toxicRatio,
    safetyStatus
  };
}

/**
 * Aggregates all timestamp reaction points from comments
 */
export function extractTimestampPoints(comments: CommentItem[]): TimestampPoint[] {
  const points: TimestampPoint[] = [];

  for (const comment of comments) {
    const ts = extractTimestamp(comment.text);
    if (ts.timestamp && typeof ts.seconds === 'number') {
      points.push({
        timestamp: ts.timestamp,
        seconds: ts.seconds,
        text: comment.text,
        author: comment.author,
        sentiment: comment.sentiment,
        emotion: comment.emotion,
        likes: comment.likes
      });
    }
  }

  return points.sort((a, b) => a.seconds - b.seconds);
}
