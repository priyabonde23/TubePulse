import { SentimentBreakdown, EmotionBreakdown, AiSummary, AspectBreakdownItem, VoiceBriefingData } from '@/types';

export function generateVoiceBriefing(
  title: string,
  sentiment: SentimentBreakdown,
  emotions: EmotionBreakdown,
  summary: AiSummary,
  aspects: AspectBreakdownItem[]
): VoiceBriefingData {
  const score = sentiment.overallScore;
  const topPraise = summary.topPraises[0] || 'high production value';
  const topCriticism = summary.topCriticisms[0] || 'minor pacing issues';
  const topAspect = aspects[0]?.aspect || 'presentation';

  const script = `Hey creator! Here is your 60-second TubePulse audio briefing for ${title}. ` +
    `Your video scored a solid ${score} out of 100 on the sentiment index. ` +
    `Audience energy is high with ${emotions.hype}% hype and ${emotions.joy}% positive excitement. ` +
    `Viewers particularly loved the ${topPraise} and gave strong praise for ${topAspect}. ` +
    `On the flip side, the main area for improvement is ${topCriticism}. ` +
    `Our AI recommendation for your next video: ${summary.creatorActionItems[0] || 'keep this momentum and double down on visual storytelling'}. Keep crushing it!`;

  return {
    script,
    durationEst: '45 sec',
    keyHighlights: [
      `Overall Sentiment Index: ${score}/100`,
      `Audience Hype: ${emotions.hype}%`,
      `Core Win: ${topPraise}`,
      `Key Fix: ${topCriticism}`
    ]
  };
}
