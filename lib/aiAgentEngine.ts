import { VideoAnalysisResult, CustomAnalysisResult } from '@/types';

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  timestamp: string;
  actionSuggestions?: string[];
}

export function generateAgentResponse(
  query: string,
  analysisData: VideoAnalysisResult | CustomAnalysisResult | null
): string {
  if (!analysisData) {
    return "Please analyze a video or dataset first, and I'll be ready to give you deep audience intelligence, script recommendations, and retention strategies!";
  }

  const isVideo = 'video' in analysisData;
  const title = isVideo ? (analysisData as VideoAnalysisResult).video.title : (analysisData as CustomAnalysisResult).title;
  const sentiment = analysisData.sentiment;
  const emotions = analysisData.emotions;
  const summary = analysisData.summary;
  const aspects = analysisData.aspects || [];
  const virality = analysisData.virality;

  const lower = query.toLowerCase();

  // 1. Pacing & Retention questions
  if (lower.includes('pacing') || lower.includes('retention') || lower.includes('drop') || lower.includes('slow')) {
    const pacingAspect = aspects.find(a => a.aspect.toLowerCase().includes('clarity') || a.aspect.toLowerCase().includes('content'));
    return `📊 **Retention & Pacing Breakdown for "${title}":**\n\n` +
      `• **Current Score:** Overall sentiment is **${sentiment.overallScore}/100** with **${emotions.confusion}% confusion** detected in comments.\n` +
      `• **Key Friction Point:** ${summary.topCriticisms[0] || 'Minor dips during technical explanation sections.'}\n` +
      `• **PulseAgent Action Plan:**\n` +
      `  1. Trim intro hooks to under 15 seconds to maximize the initial 30-second retention curve.\n` +
      `  2. Insert visual B-roll / zoom cuts every 4-6 seconds during complex explanations.\n` +
      `  3. Use on-screen progress chapters so viewers know what's coming next!`;
  }

  // 2. Next Video Ideas / Viral Strategy
  if (lower.includes('idea') || lower.includes('next video') || lower.includes('viral') || lower.includes('growth')) {
    const topKeywords = analysisData.topics.slice(0, 3).map(t => t.keyword).join(', ');
    return `🚀 **3 Viral Content Angles for Your Next Release:**\n\n` +
      `1. **The Deep-Dive Follow Up:** *"We Tested What Viewers Said About ${topKeywords || 'This'} (The Real Truth)"*\n` +
      `   ➔ *Why:* Viewers had high excitement (${emotions.hype}% hype) and want deeper answers to unanswered questions.\n\n` +
      `2. **Comparison Showdown:** *"${title} vs The #1 Alternative (Unbiased Winner)"*\n` +
      `   ➔ *Why:* Audience loves head-to-head comparisons to make purchase/learning decisions.\n\n` +
      `3. **Behind the Scenes / Bug Fix:** *"Addressing the #1 Viewer Complaint from Last Video"*\n` +
      `   ➔ *Why:* Directly builds immense community loyalty (${summary.creatorActionItems[0] || 'engages audience trust'}).`;
  }

  // 3. Script Fix / Outline
  if (lower.includes('script') || lower.includes('outline') || lower.includes('fix') || lower.includes('hook')) {
    return `📝 **Optimized 3-Part Video Script Blueprint:**\n\n` +
      `• **[00:00 - 00:20] High-Stakes Hook:** State the core payoff immediately. Highlight the most praised aspect (${summary.topPraises[0] || 'visual clarity'}) within the first 10 seconds.\n` +
      `• **[00:20 - 05:00] Core Delivery:** Address viewer questions (${summary.commonQuestions[0] || 'key technical details'}) with crisp on-screen annotations.\n` +
      `• **[05:00 - 07:00] High Energy Climax & CTA:** Ask viewers a specific question in comments to trigger YouTube algorithm engagement momentum!`;
  }

  // 4. Brand Deal / Sponsor Pitch
  if (lower.includes('brand') || lower.includes('sponsor') || lower.includes('pitch') || lower.includes('deal') || lower.includes('monetiz')) {
    return `💼 **Executive Brand Deal & Sponsor Pitch:**\n\n` +
      `> *"Our audience engagement for '${title}' is exceptionally strong, generating an **${sentiment.overallScore}/100 net sentiment index** with **${sentiment.positive}% positive sentiment** and an **${analysisData.health.communityHealthScore}/100 clean community safety score**. Our viewers demonstrated high commercial intent around ${aspects[0]?.aspect || 'production quality'}, making our channel a high-converting sponsorship vehicle."*`;
  }

  // 5. Why did viewers like/dislike?
  if (lower.includes('why') || lower.includes('complaint') || lower.includes('like') || lower.includes('hate')) {
    return `🎯 **Audience Perception Breakdown:**\n\n` +
      `• 💚 **Top Praises:** ${summary.topPraises.join(' | ')}\n` +
      `• 💔 **Criticisms:** ${summary.topCriticisms.join(' | ')}\n` +
      `• ❓ **Unanswered Questions:** ${summary.commonQuestions.join(' | ')}`;
  }

  // Default intelligent synthesis
  return `🤖 **PulseAgent Analysis for "${title}":**\n\n` +
    `• **Sentiment Index:** ${sentiment.overallScore}/100 (${sentiment.verdict})\n` +
    `• **Dominant Emotion:** ${emotions.hype > emotions.joy ? '🔥 High Hype (' + emotions.hype + '%)' : '😂 Joy & Humor (' + emotions.joy + '%)'}\n` +
    `• **Virality Potential:** ${virality?.viralityTier || 'High Growth 🚀'} (${virality?.viralityIndex || 85}/100)\n` +
    `• **Key Recommendation:** ${summary.creatorActionItems[0] || 'Double down on this format for maximum retention.'}\n\n` +
    `*Feel free to ask me for script outlines, pacing fixes, title variations, or brand pitches!*`;
}
