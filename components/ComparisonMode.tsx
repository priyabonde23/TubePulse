'use client';

import React, { useState } from 'react';
import { ComparisonBattleResult } from '@/types';
import { Swords, Trophy, Sparkles, Loader2, ArrowRight, TrendingUp, CheckCircle2, ShieldCheck, Flame, Laugh } from 'lucide-react';

interface ComparisonModeProps {
  onRunComparison: (urlA: string, urlB: string) => void;
  isLoading: boolean;
  battleResult: ComparisonBattleResult | null;
}

export const ComparisonMode: React.FC<ComparisonModeProps> = ({
  onRunComparison,
  isLoading,
  battleResult,
}) => {
  const [urlA, setUrlA] = useState('iphone-review');
  const [urlB, setUrlB] = useState('s24-ultra-review');

  const battlePresets = [
    {
      title: 'iPhone 16 Pro vs Galaxy S24 Ultra',
      tag: 'Smartphone Flagship Battle',
      urlA: 'iphone-review',
      urlB: 's24-ultra-review',
    },
    {
      title: 'Avengers Teaser vs GTA VI Reveal',
      tag: 'Hype & Pop Culture Showdown',
      urlA: 'trailer-demo',
      urlB: 'gaming-launch',
    }
  ];

  const handlePreset = (preset: typeof battlePresets[0]) => {
    setUrlA(preset.urlA);
    setUrlB(preset.urlB);
    onRunComparison(preset.urlA, preset.urlB);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlA.trim() || !urlB.trim() || isLoading) return;
    onRunComparison(urlA.trim(), urlB.trim());
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-4 px-4 space-y-8">
      {/* Title & Presets */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium mb-3">
          <Swords className="w-3.5 h-3.5 text-rose-400" />
          <span>Side-by-Side Video Battle Arena</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Compare Audience Sentiment Head-to-Head
        </h2>
        <p className="text-xs sm:text-sm text-dark-muted mt-2 max-w-xl mx-auto">
          Pit two YouTube videos, product launches, or trailers against each other to see which one won public approval.
        </p>

        {/* 1-Click Battle Presets */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
          <span className="text-xs text-dark-muted font-semibold">1-Click Battles:</span>
          {battlePresets.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handlePreset(preset)}
              disabled={isLoading}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-dark-card hover:bg-dark-border border border-dark-border text-xs font-semibold text-white transition-all shadow-sm"
            >
              <Swords className="w-3.5 h-3.5 text-rose-400" />
              <span>{preset.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Dual Inputs Form */}
      <form onSubmit={handleSubmit} className="bg-dark-surface border border-dark-border rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Video A */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
              <span>🔵 Video A (URL / Topic)</span>
            </label>
            <input
              type="text"
              value={urlA}
              onChange={(e) => setUrlA(e.target.value)}
              placeholder="Paste Video A URL (e.g. iPhone 16 Review)"
              className="w-full bg-dark-card border border-dark-border focus:border-cyan-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-dark-muted focus:outline-none"
            />
          </div>

          {/* Video B */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
              <span>🟣 Video B (URL / Topic)</span>
            </label>
            <input
              type="text"
              value={urlB}
              onChange={(e) => setUrlB(e.target.value)}
              placeholder="Paste Video B URL (e.g. Galaxy S24 Review)"
              className="w-full bg-dark-card border border-dark-border focus:border-purple-500 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-dark-muted focus:outline-none"
            />
          </div>
        </div>

        <div className="text-center pt-2">
          <button
            type="submit"
            disabled={isLoading || !urlA.trim() || !urlB.trim()}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-rose-600 to-indigo-600 hover:from-rose-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-rose-500/25 disabled:opacity-50 transition-all"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Running Comparative Battle...</span>
              </>
            ) : (
              <>
                <Swords className="w-4 h-4" />
                <span>Start Head-to-Head Battle</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Battle Results */}
      {battleResult && (
        <div className="space-y-6 animate-in fade-in">
          {/* Winner Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-500/20 via-brand-600/20 to-rose-500/20 border border-amber-500/40 text-center space-y-2 shadow-2xl relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-extrabold uppercase tracking-wider border border-amber-500/30">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>
                {battleResult.winner === 'tie'
                  ? 'Battle Result: Dead Heat Tie!'
                  : `Winner: ${battleResult.winner === 'videoA' ? battleResult.videoA.video.title : battleResult.videoB.video.title}`}
              </span>
            </div>

            <p className="text-sm sm:text-base text-gray-100 font-medium max-w-2xl mx-auto pt-1">
              {battleResult.verdictSummary}
            </p>
          </div>

          {/* Side-by-Side Comparison Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card A */}
            <div className={`p-5 rounded-2xl bg-dark-surface border ${battleResult.winner === 'videoA' ? 'border-cyan-500/80 ring-2 ring-cyan-500/20 shadow-cyan-500/10' : 'border-dark-border'} shadow-xl space-y-4`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                  Video A
                </span>
                {battleResult.winner === 'videoA' && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" /> Higher Sentiment Winner
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-white line-clamp-2">
                {battleResult.videoA.video.title}
              </h3>

              <div className="flex items-center justify-between p-3 rounded-xl bg-dark-card border border-dark-border">
                <span className="text-xs text-dark-muted font-medium">Overall Sentiment</span>
                <span className="text-2xl font-black text-cyan-400">
                  {battleResult.videoA.sentiment.overallScore}
                  <span className="text-xs text-dark-muted">/100</span>
                </span>
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-emerald-400">Positive: {battleResult.videoA.sentiment.positive}%</span>
                  <span className="text-amber-400">Neutral: {battleResult.videoA.sentiment.neutral}%</span>
                  <span className="text-rose-400">Negative: {battleResult.videoA.sentiment.negative}%</span>
                </div>
              </div>
            </div>

            {/* Card B */}
            <div className={`p-5 rounded-2xl bg-dark-surface border ${battleResult.winner === 'videoB' ? 'border-purple-500/80 ring-2 ring-purple-500/20 shadow-purple-500/10' : 'border-dark-border'} shadow-xl space-y-4`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                  Video B
                </span>
                {battleResult.winner === 'videoB' && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                    <Trophy className="w-3.5 h-3.5" /> Higher Sentiment Winner
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-white line-clamp-2">
                {battleResult.videoB.video.title}
              </h3>

              <div className="flex items-center justify-between p-3 rounded-xl bg-dark-card border border-dark-border">
                <span className="text-xs text-dark-muted font-medium">Overall Sentiment</span>
                <span className="text-2xl font-black text-purple-400">
                  {battleResult.videoB.sentiment.overallScore}
                  <span className="text-xs text-dark-muted">/100</span>
                </span>
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-emerald-400">Positive: {battleResult.videoB.sentiment.positive}%</span>
                  <span className="text-amber-400">Neutral: {battleResult.videoB.sentiment.neutral}%</span>
                  <span className="text-rose-400">Negative: {battleResult.videoB.sentiment.negative}%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Aspect-by-Aspect Battle Table */}
          <div className="bg-dark-surface border border-dark-border rounded-2xl p-5 shadow-xl space-y-3">
            <h4 className="text-sm font-bold text-white">Head-to-Head Aspect Comparison</h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="text-[11px] text-dark-muted uppercase border-b border-dark-border">
                  <tr>
                    <th className="py-2.5 px-3">Metric Dimension</th>
                    <th className="py-2.5 px-3 text-cyan-400">Video A Score</th>
                    <th className="py-2.5 px-3 text-purple-400">Video B Score</th>
                    <th className="py-2.5 px-3 text-emerald-400">Dimension Leader</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-dark-border/50">
                  {battleResult.aspectScores.map((row, idx) => (
                    <tr key={idx} className="hover:bg-dark-card/40">
                      <td className="py-2.5 px-3 font-semibold text-white">{row.aspect}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-gray-200">{row.scoreA}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-gray-200">{row.scoreB}</td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                          row.winner === 'A' ? 'bg-cyan-500/20 text-cyan-300' : (row.winner === 'B' ? 'bg-purple-500/20 text-purple-300' : 'bg-gray-500/20 text-gray-300')
                        }`}>
                          {row.winner === 'A' ? 'Video A' : (row.winner === 'B' ? 'Video B' : 'Tie')}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
