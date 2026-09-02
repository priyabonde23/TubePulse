import { GeoSentimentItem, SentimentBreakdown } from '@/types';

export function calculateGeoSentiment(sentiment: SentimentBreakdown): GeoSentimentItem[] {
  const basePositive = sentiment.positive || 75;

  return [
    {
      country: 'India',
      code: 'IN',
      flag: '🇮🇳',
      positiveRatio: Math.min(96, Math.max(65, Math.round(basePositive + 4))),
      sharePercentage: 54,
      topBuzzword: 'Paisa Wasool / Bawaal 🔥',
      culturalNote: 'High engagement on entertainment value, visual punch, and local relatable humor.'
    },
    {
      country: 'United States',
      code: 'US',
      flag: '🇺🇸',
      positiveRatio: Math.min(94, Math.max(60, Math.round(basePositive - 2))),
      sharePercentage: 24,
      topBuzzword: 'High Production / Sleek ⚡',
      culturalNote: 'Viewers focused on pacing, technical cinematography, and sound design.'
    },
    {
      country: 'United Kingdom',
      code: 'UK',
      flag: '🇬🇧',
      positiveRatio: Math.min(92, Math.max(58, Math.round(basePositive - 1))),
      sharePercentage: 11,
      topBuzzword: 'Great Delivery / Clean 👌',
      culturalNote: 'Appreciated structured storytelling and honest comparisons.'
    },
    {
      country: 'Canada & Others',
      code: 'CA',
      flag: '🇨🇦',
      positiveRatio: Math.min(95, Math.max(62, Math.round(basePositive + 1))),
      sharePercentage: 11,
      topBuzzword: 'Quality Content / Subscribed 🎯',
      culturalNote: 'Active comment discussions and high repeat subscriber intent.'
    }
  ];
}
