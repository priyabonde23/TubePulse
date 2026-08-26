export type SentimentType = 'positive' | 'neutral' | 'negative';

export type EmotionType = 
  | 'joy'
  | 'hype'
  | 'confusion'
  | 'disappointment'
  | 'constructive'
  | 'neutral';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
  role?: 'pro_member' | 'creator' | 'admin';
}

export interface SavedAnalysis {
  id: string;
  userId: string;
  title: string;
  thumbnailUrl: string;
  overallScore: number;
  verdict: string;
  positiveRatio: number;
  analyzedAt: string;
  videoUrl: string;
  mode: 'youtube' | 'compare' | 'custom';
}

export interface CommentItem {
  id: string;
  author: string;
  authorAvatar?: string;
  text: string;
  translatedText?: string;
  likes: number;
  publishedAt: string;
  sentiment: SentimentType;
  sentimentScore: number; // -1.0 to 1.0
  emotion: EmotionType;
  emotionScore: number; // 0 to 1.0
  aspects?: string[];
  isQuestion?: boolean;
  isToxic?: boolean;
  isSpam?: boolean;
  timestamp?: string; // e.g. "02:15"
}

export interface VideoMetadata {
  id: string;
  title: string;
  channelTitle: string;
  channelAvatar?: string;
  thumbnail: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  publishedAt: string;
  url: string;
}

export interface SentimentBreakdown {
  positive: number; // percentage
  neutral: number;
  negative: number;
  averageScore: number; // -1 to 1 normalized
  overallScore: number; // 0 to 100
  verdict: 'Overwhelmingly Positive' | 'Mostly Positive' | 'Mixed / Controversial' | 'Mostly Negative' | 'Overwhelmingly Negative';
}

export interface EmotionBreakdown {
  joy: number;
  hype: number;
  confusion: number;
  disappointment: number;
  constructive: number;
  neutral: number;
}

export interface TopicItem {
  keyword: string;
  count: number;
  sentiment: SentimentType;
  score: number;
}

export interface AiSummary {
  executiveSummary: string;
  topPraises: string[];
  topCriticisms: string[];
  commonQuestions: string[];
  creatorActionItems: string[];
  hypeLevel: 'Low' | 'Moderate' | 'High' | 'Viral';
}

export interface ToxicityReport {
  communityHealthScore: number;
  toxicCount: number;
  spamCount: number;
  toxicityRatio: number;
  safetyStatus: 'Exceptional & Safe' | 'Healthy Community' | 'Moderate Trolling' | 'High Hostility Warning';
}

export interface TimestampPoint {
  timestamp: string;
  seconds: number;
  text: string;
  author: string;
  sentiment: SentimentType;
  emotion: EmotionType;
  likes: number;
}

export interface AspectBreakdownItem {
  aspect: string;
  icon: string;
  positiveRatio: number;
  neutralRatio: number;
  negativeRatio: number;
  overallScore: number; // 0 to 100
  status: 'Praise' | 'Mixed' | 'Friction';
  keyQuote: string;
}

export interface ViralityMetrics {
  viralityIndex: number; // 0 to 100
  viralityTier: 'Viral Phenomenon 🔥' | 'High Growth 🚀' | 'Moderate Reach ⚡' | 'Niche / Steady 🎯';
  shareabilityScore: number; // 0 to 100
  retentionPrediction: string;
  seoTips: string[];
}

export interface DriftDataPoint {
  timeframe: string;
  positive: number;
  neutral: number;
  negative: number;
  score: number;
}

export interface VideoAnalysisResult {
  video: VideoMetadata;
  comments: CommentItem[];
  sentiment: SentimentBreakdown;
  emotions: EmotionBreakdown;
  topics: TopicItem[];
  summary: AiSummary;
  health: ToxicityReport;
  timestamps: TimestampPoint[];
  aspects: AspectBreakdownItem[];
  virality: ViralityMetrics;
  drift: DriftDataPoint[];
  totalAnalyzed: number;
}

export interface CustomAnalysisResult {
  title: string;
  comments: CommentItem[];
  sentiment: SentimentBreakdown;
  emotions: EmotionBreakdown;
  topics: TopicItem[];
  summary: AiSummary;
  health: ToxicityReport;
  timestamps: TimestampPoint[];
  aspects: AspectBreakdownItem[];
  virality: ViralityMetrics;
  drift: DriftDataPoint[];
  totalAnalyzed: number;
}

export interface ComparisonBattleResult {
  videoA: VideoAnalysisResult;
  videoB: VideoAnalysisResult;
  winner: 'videoA' | 'videoB' | 'tie';
  deltaScore: number;
  verdictSummary: string;
  aspectScores: {
    aspect: string;
    scoreA: number;
    scoreB: number;
    winner: 'A' | 'B' | 'Tie';
  }[];
}
