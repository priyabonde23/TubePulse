import { TopicItem, AiSummary, ViralTitleHook } from '@/types';

export function generateViralTitles(
  videoTitle: string,
  topics: TopicItem[],
  summary: AiSummary
): ViralTitleHook[] {
  const topKw = topics[0]?.keyword || 'This';
  const secondKw = topics[1]?.keyword || 'Secret';
  const cleanTitle = videoTitle.replace(/[|•-].*$/, '').trim();

  return [
    {
      title: `I Tested ${cleanTitle} (The Truth Nobody Told You)`,
      hookType: 'Curiosity 🔍',
      estimatedCtr: 15.8,
      reason: 'Triggers open curiosity loop by challenging common assumptions.'
    },
    {
      title: `Why Everyone Is WRONG About ${topKw.toUpperCase()}!`,
      hookType: 'Controversy ⚡',
      estimatedCtr: 17.4,
      reason: 'Leverages debate and polarizing emotion detected in viewer comments.'
    },
    {
      title: `The $0 Mistake Ruining Your ${secondKw} (How to Fix It)`,
      hookType: 'Extreme Value 💎',
      estimatedCtr: 14.2,
      reason: 'Offers direct financial / practical value addressing top audience pain points.'
    },
    {
      title: `How ${cleanTitle} Changed Everything in 24 Hours`,
      hookType: 'Storytelling 📖',
      estimatedCtr: 13.9,
      reason: 'High narrative tension and time-bound curiosity hook.'
    },
    {
      title: `Don't Buy ${topKw} Until You Watch This!`,
      hookType: 'Curiosity 🔍',
      estimatedCtr: 16.5,
      reason: 'Urgency-driven protective advice converting passive scrollers.'
    }
  ];
}
