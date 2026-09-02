import { NextRequest, NextResponse } from 'next/server';
import { fetchYouTubeData } from '@/lib/youtubeService';
import { analyzeSentiment, calculateOverallSentiment } from '@/lib/nlpEngine';
import { classifyEmotion, calculateEmotionBreakdown } from '@/lib/emotionClassifier';
import { extractTopics } from '@/lib/topicExtractor';
import { generateAiSummary } from '@/lib/aiInsights';
import { evaluateSafety, calculateCommunityHealth, extractTimestamp, extractTimestampPoints } from '@/lib/toxicityEngine';
import { extractAspectBreakdown } from '@/lib/aspectEngine';
import { calculateViralityMetrics } from '@/lib/viralityEngine';
import { generateSentimentDrift } from '@/lib/timeDriftEngine';
import { generateVoiceBriefing } from '@/lib/voiceBriefingEngine';
import { generateViralTitles } from '@/lib/viralTitleEngine';
import { calculateSponsorValuation } from '@/lib/sponsorValuationEngine';
import { calculateGeoSentiment } from '@/lib/geoSentimentEngine';
import { VideoAnalysisResult, CustomAnalysisResult, ComparisonBattleResult, CommentItem } from '@/types';

async function processSingleVideo(inputUrl: string, apiKey?: string): Promise<VideoAnalysisResult> {
  const { video, comments } = await fetchYouTubeData(inputUrl, apiKey);

  const sentiment = calculateOverallSentiment(comments);
  const emotionsList = comments.map(c => c.emotion);
  const emotions = calculateEmotionBreakdown(emotionsList);
  const topics = extractTopics(comments);
  const summary = generateAiSummary(video.title, comments, sentiment, emotions, topics);
  const health = calculateCommunityHealth(comments);
  const timestamps = extractTimestampPoints(comments);
  const aspects = extractAspectBreakdown(comments);
  const virality = calculateViralityMetrics(video, sentiment, emotions);
  const drift = generateSentimentDrift(sentiment);
  const voiceBriefing = generateVoiceBriefing(video.title, sentiment, emotions, summary, aspects);
  const viralTitles = generateViralTitles(video.title, topics, summary);
  const sponsorValuation = calculateSponsorValuation(video, sentiment, health);
  const geoSentiment = calculateGeoSentiment(sentiment);

  return {
    video,
    comments,
    sentiment,
    emotions,
    topics,
    summary,
    health,
    timestamps,
    aspects,
    virality,
    drift,
    voiceBriefing,
    viralTitles,
    sponsorValuation,
    geoSentiment,
    totalAnalyzed: comments.length
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { isCompare, urlA, urlB, url, customComments, customText, title, apiKey } = body;

    // 1. Comparison Mode
    if (isCompare && urlA && urlB) {
      const [resA, resB] = await Promise.all([
        processSingleVideo(urlA, apiKey),
        processSingleVideo(urlB, apiKey)
      ]);

      const delta = resA.sentiment.overallScore - resB.sentiment.overallScore;
      const winner = delta > 0 ? 'videoA' : delta < 0 ? 'videoB' : 'tie';

      const verdictSummary = winner === 'tie'
        ? 'Both videos received virtually identical positive viewer response across key criteria.'
        : winner === 'videoA'
          ? `"${resA.video.title}" outperformed "${resB.video.title}" with a +${Math.abs(delta)} net audience satisfaction lead.`
          : `"${resB.video.title}" outperformed "${resA.video.title}" with a +${Math.abs(delta)} net audience satisfaction lead.`;

      const aspectScores = (resA.aspects || []).map(a => {
        const matchingB = (resB.aspects || []).find(b => b.aspect === a.aspect);
        const scoreA = a.overallScore;
        const scoreB = matchingB ? matchingB.overallScore : 75;
        return {
          aspect: a.aspect,
          scoreA,
          scoreB,
          winner: (scoreA > scoreB ? 'A' : scoreB > scoreA ? 'B' : 'Tie') as 'A' | 'B' | 'Tie'
        };
      });

      const battleResult: ComparisonBattleResult = {
        videoA: resA,
        videoB: resB,
        winner,
        deltaScore: Math.abs(delta),
        verdictSummary,
        aspectScores
      };

      return NextResponse.json({ success: true, data: battleResult });
    }

    // 2. Custom Text / CSV Mode
    if (customComments || customText) {
      let rawList: { text: string; author?: string }[] = [];

      if (Array.isArray(customComments)) {
        rawList = customComments.map((t: string, i: number) => ({
          text: t,
          author: `Feedback Author #${i + 1}`
        }));
      } else if (typeof customText === 'string') {
        rawList = customText
          .split('\n')
          .map(l => l.trim())
          .filter(l => l.length > 0)
          .map((t, i) => ({ text: t, author: `Customer #${i + 1}` }));
      }

      if (rawList.length === 0) {
        return NextResponse.json({ success: false, error: 'No valid comments found in input text' }, { status: 400 });
      }

      const comments: CommentItem[] = rawList.map((c, i) => {
        const sentimentRes = analyzeSentiment(c.text);
        const emotionRes = classifyEmotion(c.text, sentimentRes.score);
        const safety = evaluateSafety(c.text);
        const ts = extractTimestamp(c.text);
        return {
          id: `cust-${i}`,
          author: c.author || `User #${i + 1}`,
          text: c.text,
          likes: Math.floor(Math.random() * 20),
          publishedAt: new Date().toISOString(),
          sentiment: sentimentRes.sentiment,
          sentimentScore: sentimentRes.score,
          emotion: emotionRes.emotion,
          emotionScore: emotionRes.score,
          isToxic: safety.isToxic,
          isSpam: safety.isSpam,
          timestamp: ts.timestamp
        };
      });

      const sentiment = calculateOverallSentiment(comments);
      const emotionsList = comments.map(c => c.emotion);
      const emotions = calculateEmotionBreakdown(emotionsList);
      const topics = extractTopics(comments);
      const projectTitle = title || 'Custom Feedback Dataset';
      const summary = generateAiSummary(projectTitle, comments, sentiment, emotions, topics);
      const health = calculateCommunityHealth(comments);
      const timestamps = extractTimestampPoints(comments);
      const aspects = extractAspectBreakdown(comments);
      const virality = calculateViralityMetrics(
        { id: 'custom', title: projectTitle, channelTitle: 'User Upload', thumbnail: '', viewCount: 10000, likeCount: 500, commentCount: comments.length, publishedAt: new Date().toISOString(), url: '' },
        sentiment,
        emotions
      );
      const drift = generateSentimentDrift(sentiment);
      const voiceBriefing = generateVoiceBriefing(projectTitle, sentiment, emotions, summary, aspects);
      const viralTitles = generateViralTitles(projectTitle, topics, summary);
      const sponsorValuation = calculateSponsorValuation(
        { id: 'custom', title: projectTitle, channelTitle: 'Custom', thumbnail: '', viewCount: 50000, likeCount: 1000, commentCount: comments.length, publishedAt: '', url: '' },
        sentiment,
        health
      );
      const geoSentiment = calculateGeoSentiment(sentiment);

      const customResult: CustomAnalysisResult = {
        title: projectTitle,
        comments,
        sentiment,
        emotions,
        topics,
        summary,
        health,
        timestamps,
        aspects,
        virality,
        drift,
        voiceBriefing,
        viralTitles,
        sponsorValuation,
        geoSentiment,
        totalAnalyzed: comments.length
      };

      return NextResponse.json({ success: true, data: customResult });
    }

    // 3. Single YouTube Video Mode
    if (!url) {
      return NextResponse.json({ success: false, error: 'URL or Search Query is required' }, { status: 400 });
    }

    const singleResult = await processSingleVideo(url, apiKey);
    return NextResponse.json({ success: true, data: singleResult });

  } catch (error: any) {
    console.error('Analyze API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error while processing feedback' },
      { status: 500 }
    );
  }
}
