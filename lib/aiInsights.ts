import { CommentItem, SentimentBreakdown, EmotionBreakdown, TopicItem, AiSummary } from '@/types';

export function generateAiSummary(
  title: string,
  comments: CommentItem[],
  sentiment: SentimentBreakdown,
  emotions: EmotionBreakdown,
  topics: TopicItem[]
): AiSummary {
  // 1. Determine Hype Level
  let hypeLevel: AiSummary['hypeLevel'] = 'Moderate';
  if (emotions.hype >= 35 || (sentiment.positive >= 75 && comments.length > 20)) {
    hypeLevel = 'Viral';
  } else if (emotions.hype >= 20 || sentiment.positive >= 60) {
    hypeLevel = 'High';
  } else if (sentiment.negative > 40) {
    hypeLevel = 'Low';
  }

  // 2. Extract Top Praises from positive comments
  const positiveComments = comments
    .filter(c => c.sentiment === 'positive')
    .sort((a, b) => (b.likes * 2 + b.sentimentScore) - (a.likes * 2 + a.sentimentScore));

  const topPraises: string[] = [];
  const praiseSnippets = positiveComments.slice(0, 4).map(c => {
    // Trim and clean
    const t = c.text.length > 90 ? c.text.substring(0, 87) + '...' : c.text;
    return `"${t}"`;
  });
  if (praiseSnippets.length > 0) {
    topPraises.push(...praiseSnippets);
  } else {
    topPraises.push('Audience appreciated the overall presentation and structure.');
    topPraises.push('Positive reception towards the creator\'s explanation style.');
  }

  // 3. Extract Criticisms / Disappointments
  const negativeComments = comments
    .filter(c => c.sentiment === 'negative' || c.emotion === 'disappointment')
    .sort((a, b) => b.likes - a.likes);

  const topCriticisms: string[] = [];
  const criticismSnippets = negativeComments.slice(0, 3).map(c => {
    const t = c.text.length > 90 ? c.text.substring(0, 87) + '...' : c.text;
    return `"${t}"`;
  });
  if (criticismSnippets.length > 0) {
    topCriticisms.push(...criticismSnippets);
  } else {
    topCriticisms.push('Minimal friction found in viewer feedback.');
    topCriticisms.push('Some minor requests for deeper technical walk-throughs.');
  }

  // 4. Extract Questions & Confusions
  const questionComments = comments
    .filter(c => c.isQuestion || c.emotion === 'confusion')
    .sort((a, b) => b.likes - a.likes);

  const commonQuestions: string[] = [];
  const questionSnippets = questionComments.slice(0, 3).map(c => {
    const t = c.text.length > 85 ? c.text.substring(0, 82) + '...' : c.text;
    return t;
  });
  if (questionSnippets.length > 0) {
    commonQuestions.push(...questionSnippets);
  } else {
    commonQuestions.push('Viewers are asking for follow-up parts and source code repository.');
    commonQuestions.push('Questions regarding compatibility and pricing details.');
  }

  // 5. Creator Action Items
  const creatorActionItems: string[] = [];
  if (sentiment.positive >= 70) {
    creatorActionItems.push('Double down on this format: High engagement signals strong viewer retention.');
    creatorActionItems.push('Pin a top helpful comment or FAQ to capture early comment momentum.');
  } else if (sentiment.negative >= 35) {
    creatorActionItems.push('Address the main criticism highlighted above in a community post or pinned reply.');
    creatorActionItems.push('Check audio levels, pacing, or subtitle clarity based on viewer notes.');
  } else {
    creatorActionItems.push('Clarify the top asked questions in a follow-up video or pinned comment.');
    creatorActionItems.push('Engage directly with the constructive feedback to build audience trust.');
  }
  
  if (topics.length > 0) {
    creatorActionItems.push(`Focus upcoming content around trending viewer interest: "${topics.slice(0, 2).map(t => t.keyword).join(', ')}".`);
  }

  // 6. Executive Synthesis Summary
  let executiveSummary = '';
  if (sentiment.overallScore >= 75) {
    executiveSummary = `The video "${title}" has received enthusiastic and overwhelmingly positive engagement (${sentiment.positive}% positive sentiment). Viewers showed high excitement (${emotions.hype}% hype) and praised the clarity and quality.`;
  } else if (sentiment.overallScore >= 55) {
    executiveSummary = `The audience reaction to "${title}" is generally positive with solid viewer interest (${sentiment.positive}% positive, ${sentiment.neutral}% neutral). Key topics like ${topics.slice(0, 3).map(t => t.keyword).join(', ')} are driving discussions.`;
  } else {
    executiveSummary = `The reception for "${title}" is polarized (${sentiment.negative}% negative vs ${sentiment.positive}% positive). Constructive feedback centers on pacing, clarity, and specific expectations.`;
  }

  return {
    executiveSummary,
    topPraises,
    topCriticisms,
    commonQuestions,
    creatorActionItems,
    hypeLevel
  };
}
