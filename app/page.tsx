'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { HeroInput } from '@/components/HeroInput';
import { VideoInfoCard } from '@/components/VideoInfoCard';
import { SentimentGauge } from '@/components/SentimentGauge';
import { EmotionRadar } from '@/components/EmotionRadar';
import { AspectMatrix } from '@/components/AspectMatrix';
import { ViralityPredictor } from '@/components/ViralityPredictor';
import { SentimentDriftGraph } from '@/components/SentimentDriftGraph';
import { CommunityHealthCard } from '@/components/CommunityHealthCard';
import { TimestampHeatmap } from '@/components/TimestampHeatmap';
import { AiSummaryCard } from '@/components/AiSummaryCard';
import { TopicCloud } from '@/components/TopicCloud';
import { CommentExplorer } from '@/components/CommentExplorer';
import { CustomAnalysisTab } from '@/components/CustomAnalysisTab';
import { ComparisonMode } from '@/components/ComparisonMode';
import { ChannelSpyTab } from '@/components/ChannelSpyTab';
import { VoiceBriefingPlayer } from '@/components/VoiceBriefingPlayer';
import { ViralTitleGenerator } from '@/components/ViralTitleGenerator';
import { SponsorValuationCard } from '@/components/SponsorValuationCard';
import { GeoSentimentMap } from '@/components/GeoSentimentMap';
import { SettingsModal } from '@/components/SettingsModal';
import { HelpModal } from '@/components/HelpModal';
import { ExportReportModal } from '@/components/ExportReportModal';
import { AuthModal } from '@/components/AuthModal';
import { HistoryDrawerModal } from '@/components/HistoryDrawerModal';
import { AuthGate } from '@/components/AuthGate';
import { AiAgentWidget } from '@/components/AiAgentWidget';
import { getCurrentUser, logoutUser, saveAnalysisToHistory, getUserHistory, deleteHistoryItem } from '@/lib/authService';
import { VideoAnalysisResult, CustomAnalysisResult, ComparisonBattleResult, User, SavedAnalysis } from '@/types';
import { AlertCircle, BarChart2 } from 'lucide-react';

export default function Home() {
  const [activeMode, setActiveMode] = useState<'youtube' | 'compare' | 'channel' | 'custom'>('youtube');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Authentication State
  const [user, setUser] = useState<User | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [savedHistory, setSavedHistory] = useState<SavedAnalysis[]>([]);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [youtubeResult, setYoutubeResult] = useState<VideoAnalysisResult | null>(null);
  const [customResult, setCustomResult] = useState<CustomAnalysisResult | null>(null);
  const [battleResult, setBattleResult] = useState<ComparisonBattleResult | null>(null);

  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  // Modals
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);

  // Check login session on startup
  useEffect(() => {
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setSavedHistory(getUserHistory(currentUser.id));
      handleAnalyzeYouTube('trailer-demo');
    }
    setIsAuthChecking(false);
  }, []);

  const handleAuthSuccess = (authenticatedUser: User) => {
    setUser(authenticatedUser);
    const hist = getUserHistory(authenticatedUser.id);
    setSavedHistory(hist);
    handleAnalyzeYouTube('trailer-demo');
  };

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    setSavedHistory([]);
  };

  const handleDeleteHistoryItem = (id: string) => {
    if (user) {
      const updated = deleteHistoryItem(user.id, id);
      setSavedHistory(updated);
    }
  };

  const handleReloadHistory = (item: SavedAnalysis) => {
    if (item.mode === 'youtube' && item.videoUrl) {
      handleAnalyzeYouTube(item.videoUrl);
    } else {
      handleAnalyzeYouTube(item.title);
    }
  };

  const handleAnalyzeYouTube = async (url: string) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSelectedTopic(null);

    try {
      const storedApiKey = typeof window !== 'undefined' ? localStorage.getItem('tubepulse_yt_key') || '' : '';

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url,
          apiKey: storedApiKey,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to analyze video');
      }

      setYoutubeResult(json.data);
      setActiveMode('youtube');

      const currentUser = getCurrentUser();
      if (currentUser) {
        const updated = saveAnalysisToHistory(currentUser.id, json.data, 'youtube');
        setSavedHistory(updated);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while analyzing');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnalyzeCustom = async (payload: { title?: string; customComments?: string[]; customText?: string }) => {
    setIsLoading(true);
    setErrorMessage(null);
    setSelectedTopic(null);

    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to analyze feedback');
      }

      setCustomResult(json.data);
      setActiveMode('custom');

      const currentUser = getCurrentUser();
      if (currentUser) {
        const updated = saveAnalysisToHistory(currentUser.id, json.data, 'custom');
        setSavedHistory(updated);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while analyzing custom data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRunComparison = async (urlA: string, urlB: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const storedApiKey = typeof window !== 'undefined' ? localStorage.getItem('tubepulse_yt_key') || '' : '';

      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          isCompare: true,
          urlA,
          urlB,
          apiKey: storedApiKey,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to run comparison');
      }

      setBattleResult(json.data);
      setActiveMode('compare');
    } catch (err: any) {
      setErrorMessage(err.message || 'An error occurred while running battle comparison');
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthChecking) {
    return <div className="min-h-screen bg-dark-base" />;
  }

  // 🔒 STRICT AUTH GATE: If user is NOT logged in, show AuthGate (Like Instagram/Snapchat)
  if (!user) {
    return <AuthGate onAuthSuccess={handleAuthSuccess} />;
  }

  const currentResult = activeMode === 'youtube' ? youtubeResult : customResult;

  // 🚀 UNLOCKED DASHBOARD FOR AUTHENTICATED USERS
  return (
    <div className="min-h-screen bg-dark-base flex flex-col justify-between animate-in fade-in duration-300">
      {/* Top Navigation */}
      <Navbar
        user={user}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenHistory={() => setIsHistoryOpen(true)}
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Error Alert */}
        {errorMessage && (
          <div className="max-w-3xl mx-auto p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-3 text-rose-300 text-xs sm:text-sm animate-in fade-in print:hidden shadow-lg shadow-rose-500/10">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs text-rose-400 hover:underline font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Input Switcher Section */}
        {activeMode === 'youtube' && (
          <div className="print:hidden">
            <HeroInput onAnalyze={handleAnalyzeYouTube} isLoading={isLoading} />
          </div>
        )}

        {activeMode === 'compare' && (
          <div className="print:hidden">
            <ComparisonMode
              onRunComparison={handleRunComparison}
              isLoading={isLoading}
              battleResult={battleResult}
            />
          </div>
        )}

        {activeMode === 'channel' && (
          <div className="print:hidden">
            <ChannelSpyTab />
          </div>
        )}

        {activeMode === 'custom' && (
          <div className="print:hidden">
            <CustomAnalysisTab onAnalyzeCustom={handleAnalyzeCustom} isLoading={isLoading} />
          </div>
        )}

        {/* Results Dashboard Section for Single / Custom Mode */}
        {activeMode !== 'compare' && activeMode !== 'channel' && currentResult && (
          <section className="space-y-7 animate-in fade-in duration-500">
            {/* Header Video / Dataset Card */}
            {activeMode === 'youtube' && youtubeResult && (
              <VideoInfoCard
                video={youtubeResult.video}
                totalAnalyzed={youtubeResult.totalAnalyzed}
                onExport={() => setIsExportOpen(true)}
              />
            )}

            {activeMode === 'custom' && customResult && (
              <div className="w-full bg-dark-surface/90 border border-dark-border/80 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-3.5 rounded-2xl bg-brand-500/10 border border-brand-500/20 text-brand-400">
                    <BarChart2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{customResult.title}</h2>
                    <p className="text-xs text-dark-muted">
                      Analyzed {customResult.totalAnalyzed} customer feedback entries
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsExportOpen(true)}
                  className="px-5 py-2.5 text-xs font-bold bg-dark-card hover:bg-dark-border text-white border border-dark-border rounded-xl transition-all shadow-md print:hidden"
                >
                  Export Report
                </button>
              </div>
            )}

            {/* 🎙️ 1. AI Voice Audio Briefing (Podcast Mode) */}
            {currentResult.voiceBriefing && (
              <VoiceBriefingPlayer
                briefing={currentResult.voiceBriefing}
                title={'video' in currentResult ? currentResult.video.title : currentResult.title}
              />
            )}

            {/* Side-by-Side Gauges: Sentiment Gauge + Emotion Radar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SentimentGauge sentiment={currentResult.sentiment} />
              <EmotionRadar emotions={currentResult.emotions} />
            </div>

            {/* 🎯 2. Viral Title & Thumbnail CTR Generator */}
            {currentResult.viralTitles && currentResult.viralTitles.length > 0 && (
              <ViralTitleGenerator titles={currentResult.viralTitles} />
            )}

            {/* 💸 3. Creator Sponsor Valuation & ROI Calculator */}
            {currentResult.sponsorValuation && (
              <SponsorValuationCard valuation={currentResult.sponsorValuation} />
            )}

            {/* ABSA: Aspect-Based Sentiment Matrix */}
            {currentResult.aspects && currentResult.aspects.length > 0 && (
              <AspectMatrix aspects={currentResult.aspects} />
            )}

            {/* 🌍 4. Geo-Sentiment & Regional Audience Breakdown */}
            {currentResult.geoSentiment && currentResult.geoSentiment.length > 0 && (
              <GeoSentimentMap geoData={currentResult.geoSentiment} />
            )}

            {/* Virality & Retention Predictor */}
            {currentResult.virality && (
              <ViralityPredictor virality={currentResult.virality} />
            )}

            {/* Sentiment Drift Over Time Graph */}
            {currentResult.drift && currentResult.drift.length > 0 && (
              <SentimentDriftGraph drift={currentResult.drift} />
            )}

            {/* Community Safety Health Shield Card */}
            {currentResult.health && (
              <CommunityHealthCard health={currentResult.health} />
            )}

            {/* Timestamp Scene Reaction Heatmap */}
            {currentResult.timestamps && currentResult.timestamps.length > 0 && (
              <TimestampHeatmap timestamps={currentResult.timestamps} />
            )}

            {/* AI Executive Summary & Action Items */}
            <AiSummaryCard summary={currentResult.summary} />

            {/* Trending Topics & Keyword Tags */}
            <TopicCloud
              topics={currentResult.topics}
              selectedTopic={selectedTopic}
              onSelectTopic={setSelectedTopic}
            />

            {/* Full Interactive Comment Explorer with AI Reply & Translate */}
            <div className="print:hidden">
              <CommentExplorer
                comments={currentResult.comments}
                selectedTopic={selectedTopic}
              />
            </div>
          </section>
        )}
      </main>

      {/* Floating AI Agent Widget (Copilot) */}
      <AiAgentWidget analysisData={currentResult} />

      {/* Footer */}
      <footer className="w-full border-t border-dark-border/60 bg-dark-surface/60 backdrop-blur-xl py-6 mt-12 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-dark-muted">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-white">TubePulse AI Pro SaaS</span>
            <span>•</span>
            <span>Video & Social Sentiment Intelligence Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Powered by <strong>PulseAgent AI</strong>, ABSA Matrix & Voice Briefing</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthSuccess={handleAuthSuccess}
      />
      <HistoryDrawerModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={savedHistory}
        onSelectHistory={handleReloadHistory}
        onDeleteHistory={handleDeleteHistoryItem}
      />
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <ExportReportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        data={currentResult}
      />
    </div>
  );
}
