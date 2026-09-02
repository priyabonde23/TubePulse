'use client';

import React, { useState } from 'react';
import { Search, Trophy, TrendingUp, Sparkles, AlertCircle, Eye, Calendar, Award, ThumbsUp, ThumbsDown, ShieldCheck, Flame } from 'lucide-react';
import { analyzeChannelSpy, ChannelSpyProfile } from '@/lib/channelSpyEngine';

export const ChannelSpyTab: React.FC = () => {
  const [handle, setHandle] = useState('@MrBeast');
  const [profile, setProfile] = useState<ChannelSpyProfile>(analyzeChannelSpy('@MrBeast'));
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = (targetHandle?: string) => {
    const query = targetHandle || handle;
    if (!query.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      const res = analyzeChannelSpy(query);
      setProfile(res);
      setIsLoading(false);
    }, 400);
  };

  const presetChannels = [
    { name: 'MrBeast', handle: '@MrBeast' },
    { name: 'MKBHD Tech', handle: '@mkbhd' },
    { name: 'Tech Burner', handle: '@TechBurner' },
    { name: 'Veritasium', handle: '@veritasium' }
  ];

  return (
    <div className="w-full space-y-7 animate-in fade-in duration-300">
      {/* Search Header Banner */}
      <div className="w-full bg-gradient-to-r from-dark-surface via-dark-card to-brand-950/40 border border-brand-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-2xl space-y-6">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase">
            <Trophy className="w-3.5 h-3.5 text-amber-400" /> Competitor Spy & Channel Leaderboard
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Benchmark Multi-Video Sentiment & Retention
          </h2>
          <p className="text-xs sm:text-sm text-dark-muted">
            Enter any creator handle to rank their last 5 videos from best-received to worst-received with audience praise & friction points.
          </p>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="flex items-center gap-2 max-w-xl"
        >
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-dark-muted absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
              placeholder="e.g. @MrBeast, @mkbhd, @TechBurner"
              className="w-full pl-11 pr-4 py-3 bg-dark-base border border-dark-border focus:border-brand-500 rounded-2xl text-xs sm:text-sm text-white placeholder-dark-muted focus:outline-none transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-2xl shadow-lg shadow-brand-500/25 transition-all disabled:opacity-50"
          >
            {isLoading ? 'Scanning...' : 'Analyze Channel'}
          </button>
        </form>

        {/* Preset Chips */}
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-dark-muted font-semibold">Popular Channels:</span>
          {presetChannels.map((c, i) => (
            <button
              key={i}
              type="button"
              onClick={() => {
                setHandle(c.handle);
                handleSearch(c.handle);
              }}
              className="px-3 py-1 rounded-xl bg-dark-base hover:bg-brand-600/30 text-gray-300 hover:text-brand-300 border border-dark-border transition-all font-medium"
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* Channel Profile Banner */}
      <div className="w-full bg-dark-surface/90 border border-dark-border/80 rounded-3xl p-6 shadow-2xl flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatar}
            alt={profile.channelName}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-brand-500/40 shadow-lg"
          />
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-bold text-white">{profile.channelName}</h3>
              <span className="text-xs font-semibold text-brand-300">{profile.channelHandle}</span>
            </div>
            <p className="text-xs text-dark-muted mt-0.5">{profile.subscriberCount} Subscribers • Channel Overview</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-[10px] text-dark-muted font-semibold uppercase block">Avg Sentiment</span>
            <span className="text-lg font-extrabold text-emerald-400">{profile.averageSentiment}/100</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-dark-muted font-semibold uppercase block">Community Health</span>
            <span className="text-lg font-extrabold text-brand-300">{profile.overallHealthScore}/100</span>
          </div>
        </div>
      </div>

      {/* 5-Video Ranked Leaderboard */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>5-Video Sentiment Leaderboard (Ranked Performance)</span>
          </h3>
          <span className="text-xs text-dark-muted">Ranked from highest to lowest viewer satisfaction</span>
        </div>

        <div className="space-y-3">
          {profile.videos.map((vid, index) => (
            <div
              key={vid.id}
              className="p-5 rounded-3xl bg-dark-surface/90 border border-dark-border/80 hover:border-brand-500/40 transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-5 group shadow-xl"
            >
              {/* Left: Rank & Video Info */}
              <div className="flex items-start gap-4 flex-1 min-w-0">
                {/* Rank Badge */}
                <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-extrabold text-sm flex-shrink-0 shadow-md ${
                  index === 0
                    ? 'bg-gradient-to-tr from-amber-400 to-amber-600 text-black'
                    : index === 1
                      ? 'bg-gradient-to-tr from-slate-200 to-slate-400 text-black'
                      : index === 2
                        ? 'bg-gradient-to-tr from-amber-700 to-amber-900 text-white'
                        : 'bg-dark-card border border-dark-border text-dark-muted'
                }`}>
                  #{index + 1}
                </div>

                {/* Thumbnail */}
                <img
                  src={vid.thumbnail}
                  alt={vid.title}
                  className="w-24 h-14 rounded-xl object-cover ring-1 ring-dark-border flex-shrink-0"
                />

                {/* Title & Metadata */}
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2 py-0.5 rounded-md bg-brand-500/15 text-brand-300 border border-brand-500/25 text-[10px] font-bold">
                      {vid.viralityBadge}
                    </span>
                    <span className="text-[10px] text-dark-muted flex items-center gap-1">
                      <Eye className="w-3 h-3" /> {vid.views}
                    </span>
                    <span className="text-[10px] text-dark-muted flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> {vid.publishedDate}
                    </span>
                  </div>

                  <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand-300 transition-colors line-clamp-1">
                    {vid.title}
                  </h4>

                  {/* Praise & Friction */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-[11px]">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <ThumbsUp className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate"><strong>Win:</strong> {vid.topPraise}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-rose-400">
                      <ThumbsDown className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate"><strong>Fix:</strong> {vid.topCriticism}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Score Gauge Badge */}
              <div className="text-right flex-shrink-0 lg:pl-4 lg:border-l lg:border-dark-border/60">
                <span className="text-xs text-dark-muted font-medium block">Net Sentiment</span>
                <div className="text-xl sm:text-2xl font-black text-emerald-400">
                  {vid.sentimentScore}<span className="text-xs text-dark-muted font-normal">/100</span>
                </div>
                <span className="text-[10px] font-bold text-brand-300 uppercase block">{vid.verdict}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
