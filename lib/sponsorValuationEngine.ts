import { VideoMetadata, SentimentBreakdown, ToxicityReport, SponsorValuationData } from '@/types';

export function calculateSponsorValuation(
  video: VideoMetadata,
  sentiment: SentimentBreakdown,
  health: ToxicityReport
): SponsorValuationData {
  const views = video.viewCount || 85000;
  const score = sentiment.overallScore || 75;
  const healthScore = health.communityHealthScore || 85;

  // Base calculation factoring view volume, sentiment quality, and clean community score
  const baseRatePerThousandViewsINR = 650; // Average Indian tech/creator CPM in INR
  const sentimentMultiplier = (score / 70) * (healthScore / 80);
  
  const estimatedBaseINR = Math.round((views / 1000) * baseRatePerThousandViewsINR * sentimentMultiplier);
  const minINR = Math.max(25000, Math.round(estimatedBaseINR * 0.85));
  const maxINR = Math.max(45000, Math.round(estimatedBaseINR * 1.35));
  const usdVal = Math.round(((minINR + maxINR) / 2) / 84);

  const tier = score >= 80 
    ? 'High-Demand Commercial Asset ⭐⭐⭐' 
    : score >= 60 
      ? 'Solid Growth Niche ⭐⭐' 
      : 'Developing Reach ⭐';

  const brandPitchSnippet = `Our audience engagement on "${video.title}" demonstrated an exceptional ${score}/100 net sentiment score with ${sentiment.positive}% positive endorsement and a ${healthScore}/100 clean community safety index. With strong viewer trust and zero brand risk, partnering on our upcoming video offers high commercial conversion.`;

  return {
    estimatedValueMinINR: minINR,
    estimatedValueMaxINR: maxINR,
    estimatedValueUSD: usdVal,
    tier,
    cpmRange: `₹${Math.round(baseRatePerThousandViewsINR * 0.8)} – ₹${Math.round(baseRatePerThousandViewsINR * 1.4)} CPM`,
    brandPitchSnippet,
    brandFitCategories: ['Tech & Gadgets', 'SaaS & AI Software', 'Consumer Electronics', 'Productivity Tools']
  };
}
