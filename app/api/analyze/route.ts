import { NextRequest, NextResponse } from 'next/server';
import { fetchYouTubeData } from '@/lib/youtubeService';
import { calculateOverallSentiment, analyzeSentiment } from '@/lib/nlpEngine';
import { calculateEmotionBreakdown, classifyEmotion, detectIsQuestion } from '@/lib/emotionClassifier';
import { extractTopics } from '@/lib/topicExtractor';
import { generateAiSummary } from '@/lib/aiInsights';
import { calculateCommunityHealth, extractTimestampPoints, evaluateSafety, extractTimestamp } from '@/lib/toxicityEngine';
import { extractAspectBreakdown } from '@/lib/aspectEngine';
import { calculateViralityMetrics } from '@/lib/viralityEngine';
import { generateSentimentDrift } from '@/lib/timeDriftEngine';
import { CommentItem, VideoAnalysisResult, CustomAnalysisResult, ComparisonBattleResult } from '@/types';

async function processSingleVideo(url: string, apiKey?: string): Promise<VideoAnalysisResult> {
  const { video, comments } = await fetchYouTubeData(url, apiKey);
  const sentiment = calculateOverallSentiment(comments);
  const emotions = calculateEmotionBreakdown(comments.map(c => c.emotion));
  const topics = extractTopics(comments);
  const summary = generateAiSummary(video.title, comments, sentiment, emotions, topics);
  const health = calculateCommunityHealth(comments);
  const timestamps = extractTimestampPoints(comments);
  const aspects = extractAspectBreakdown(comments);
  const virality = calculateViralityMetrics(video, sentiment, emotions);
  const drift = generateSentimentDrift(sentiment);

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
    totalAnalyzed: comments.length
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, apiKey, customText, customComments, title, isCompare, urlA, urlB } = body;

    // Mode 1: Side-by-Side Video Battle / Comparison Mode
    if (isCompare && urlA && urlB) {
      const [resA, resB] = await Promise.all([
        processSingleVideo(urlA, apiKey),
        processSingleVideo(urlB, apiKey)
      ]);

      const delta = resA.sentiment.overallScore - resB.sentiment.overallScore;
      let winner: 'videoA' | 'videoB' | 'tie' = 'tie';
      if (delta > 2) winner = 'videoA';
      else if (delta < -2) winner = 'videoB';

      const winnerTitle = winner === 'videoA' ? resA.video.title : (winner === 'videoB' ? resB.video.title : 'Both Videos');
      const verdictSummary = winner === 'tie'
        ? `Both videos received virtually identical audience sentiment (${resA.sentiment.overallScore}/100 vs ${resB.sentiment.overallScore}/100).`
        : `"${winnerTitle}" outperformed the competition by +${Math.abs(delta)} net points in overall audience positivity and reception.`;

      const aspectScores = [
        {
          aspect: 'Net Sentiment Score',
          scoreA: resA.sentiment.overallScore,
          scoreB: resB.sentiment.overallScore,
          winner: (resA.sentiment.overallScore > resB.sentiment.overallScore ? 'A' : (resB.sentiment.overallScore > resA.sentiment.overallScore ? 'B' : 'Tie')) as 'A' | 'B' | 'Tie'
        },
        {
          aspect: 'Audience Hype & Energy',
          scoreA: resA.emotions.hype,
          scoreB: resB.emotions.hype,
          winner: (resA.emotions.hype > resB.emotions.hype ? 'A' : (resB.emotions.hype > resA.emotions.hype ? 'B' : 'Tie')) as 'A' | 'B' | 'Tie'
        },
        {
          aspect: 'Community Joy / Approval',
          scoreA: resA.emotions.joy,
          scoreB: resB.emotions.joy,
          winner: (resA.emotions.joy > resB.emotions.joy ? 'A' : (resB.emotions.joy > resA.emotions.joy ? 'B' : 'Tie')) as 'A' | 'B' | 'Tie'
        },
        {
          aspect: 'Community Safety & Cleanliness',
          scoreA: resA.health.communityHealthScore,
          scoreB: resB.health.communityHealthScore,
          winner: (resA.health.communityHealthScore > resB.health.communityHealthScore ? 'A' : (resB.health.communityHealthScore > resA.health.communityHealthScore ? 'B' : 'Tie')) as 'A' | 'B' | 'Tie'
        }
      ];

      const battleResult: ComparisonBattleResult = {
        videoA: resA,
        videoB: resB,
        winner,
        deltaScore: Math.abs(delta),
        verdictSummary,
        aspectScores
      };

      return NextResponse.json({ success: true, mode: 'compare', data: battleResult });
    }

    // Mode 2: Custom Text or CSV Comments Analysis
    if (customComments && Array.isArray(customComments) && customComments.length > 0) {
      const processed: CommentItem[] = customComments.map((text: string, idx: number) => {
        const sentimentRes = analyzeSentiment(text);
        const emotionRes = classifyEmotion(text, sentimentRes.score);
        const isQuestion = detectIsQuestion(text);
        const safety = evaluateSafety(text);
        const ts = extractTimestamp(text);

        return {
          id: `custom-${idx + 1}`,
          author: `Reviewer #${idx + 1}`,
          text,
          likes: Math.floor(Math.random() * 20),
          publishedAt: 'Recently',
          sentiment: sentimentRes.sentiment,
          sentimentScore: sentimentRes.score,
          emotion: emotionRes.emotion,
          emotionScore: emotionRes.score,
          isQuestion,
          isToxic: safety.isToxic,
          isSpam: safety.isSpam,
          timestamp: ts.timestamp
        };
      });

      const sentiment = calculateOverallSentiment(processed);
      const emotions = calculateEmotionBreakdown(processed.map(c => c.emotion));
      const topics = extractTopics(processed);
      const summary = generateAiSummary(title || 'Custom Feedback Dataset', processed, sentiment, emotions, topics);
      const health = calculateCommunityHealth(processed);
      const timestamps = extractTimestampPoints(processed);
      const aspects = extractAspectBreakdown(processed);
      const virality = calculateViralityMetrics(
        {
          id: 'custom-ds',
          title: title || 'Custom Dataset',
          channelTitle: 'Internal Data',
          thumbnail: '',
          viewCount: processed.length * 100,
          likeCount: processed.length * 15,
          commentCount: processed.length,
          publishedAt: new Date().toISOString(),
          url: ''
        },
        sentiment,
        emotions
      );
      const drift = generateSentimentDrift(sentiment);

      const result: CustomAnalysisResult = {
        title: title || 'Custom Feedback Analysis',
        comments: processed,
        sentiment,
        emotions,
        topics,
        summary,
        health,
        timestamps,
        aspects,
        virality,
        drift,
        totalAnalyzed: processed.length
      };

      return NextResponse.json({ success: true, mode: 'custom', data: result });
    }

    // Mode 3: YouTube Video Analysis (Default)
    if (!url) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid YouTube URL or Demo selection.' },
        { status: 400 }
      );
    }

    const result = await processSingleVideo(url, apiKey);
    return NextResponse.json({ success: true, mode: 'youtube', data: result });
  } catch (error: any) {
    console.error('Analysis error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to process analysis' },
      { status: 500 }
    );
  }
}
