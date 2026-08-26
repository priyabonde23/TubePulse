import { SentimentBreakdown, DriftDataPoint } from '@/types';

export function generateSentimentDrift(sentiment: SentimentBreakdown): DriftDataPoint[] {
  const basePos = sentiment.positive;
  const baseNeg = sentiment.negative;
  const baseScore = sentiment.overallScore;

  return [
    {
      timeframe: 'Launch (Day 1)',
      positive: Math.min(95, basePos + 6),
      neutral: Math.max(5, sentiment.neutral - 3),
      negative: Math.max(2, baseNeg - 3),
      score: Math.min(100, baseScore + 4)
    },
    {
      timeframe: 'Day 3',
      positive: basePos,
      neutral: sentiment.neutral,
      negative: baseNeg,
      score: baseScore
    },
    {
      timeframe: 'Day 7 (Peak Buzz)',
      positive: Math.max(10, basePos - 2),
      neutral: sentiment.neutral + 3,
      negative: baseNeg - 1,
      score: Math.max(10, baseScore - 1)
    },
    {
      timeframe: 'Day 14',
      positive: Math.max(10, basePos - 4),
      neutral: sentiment.neutral + 5,
      negative: baseNeg - 1,
      score: Math.max(10, baseScore - 3)
    },
    {
      timeframe: 'Day 30 (Long Tail)',
      positive: Math.max(10, basePos - 2),
      neutral: sentiment.neutral + 4,
      negative: Math.max(2, baseNeg - 2),
      score: Math.max(10, baseScore - 1)
    }
  ];
}
