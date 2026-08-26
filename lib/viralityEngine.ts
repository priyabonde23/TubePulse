import { SentimentBreakdown, EmotionBreakdown, VideoMetadata, ViralityMetrics } from '@/types';

export function calculateViralityMetrics(
  video: VideoMetadata,
  sentiment: SentimentBreakdown,
  emotions: EmotionBreakdown
): ViralityMetrics {
  // 1. Calculate Virality Index (0-100)
  // Combines Hype %, Joy %, Like-to-View ratio, and High Positive Sentiment
  const hypeFactor = emotions.hype * 0.45;
  const joyFactor = emotions.joy * 0.25;
  const sentimentFactor = (sentiment.overallScore / 100) * 20;
  const engagementFactor = Math.min(10, (video.likeCount / Math.max(video.viewCount, 1)) * 100 * 2);

  const rawIndex = Math.round(hypeFactor + joyFactor + sentimentFactor + engagementFactor);
  const viralityIndex = Math.max(15, Math.min(98, rawIndex));

  // 2. Virality Tier
  let viralityTier: ViralityMetrics['viralityTier'] = 'Moderate Reach ⚡';
  if (viralityIndex >= 82) {
    viralityTier = 'Viral Phenomenon 🔥';
  } else if (viralityIndex >= 68) {
    viralityTier = 'High Growth 🚀';
  } else if (viralityIndex < 45) {
    viralityTier = 'Niche / Steady 🎯';
  }

  // 3. Shareability Score
  const shareabilityScore = Math.min(99, Math.round(emotions.hype * 0.6 + emotions.joy * 0.4 + (sentiment.positive > 70 ? 20 : 5)));

  // 4. Retention Prediction
  let retentionPrediction = 'Strong audience retention expected throughout the middle section.';
  if (emotions.confusion > 25) {
    retentionPrediction = 'High drop-off risk around complex or ambiguous scenes; simplify early pacing.';
  } else if (emotions.hype > 35) {
    retentionPrediction = 'Exceptional watch-time momentum with high re-watch likelihood for the climax.';
  }

  // 5. Creator SEO & Growth Tips
  const seoTips: string[] = [
    'Pin a top discussion question in comments to boost the YouTube algorithm recommendation score.',
    `Highlight the most praised element (${emotions.hype > emotions.joy ? 'the climax & BGM' : 'visual clarity'}) directly in your thumbnail text.`,
    'Create a 30-second YouTube Short from the top timestamp reaction scene to drive 3x subscriber discovery.'
  ];

  return {
    viralityIndex,
    viralityTier,
    shareabilityScore,
    retentionPrediction,
    seoTips
  };
}
