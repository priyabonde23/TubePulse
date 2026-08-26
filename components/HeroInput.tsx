'use client';

import React, { useState } from 'react';
import { Search, Sparkles, Flame, Smartphone, Code, Gamepad2, Loader2, Link2, Clipboard } from 'lucide-react';

interface HeroInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

export const HeroInput: React.FC<HeroInputProps> = ({ onAnalyze, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || isLoading) return;
    onAnalyze(url.trim());
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
      }
    } catch (err) {
      console.warn('Clipboard read failed:', err);
    }
  };

  const demoPresets = [
    {
      id: 'trailer-demo',
      title: 'Avengers: Secret Wars Trailer',
      category: 'Movies & Teasers',
      icon: Flame,
      color: 'from-amber-500/20 to-red-500/20 border-red-500/30 text-red-400 hover:border-red-400',
    },
    {
      id: 'iphone-review',
      title: 'iPhone 16 Pro Max Honest Review',
      category: 'Tech & Gadgets',
      icon: Smartphone,
      color: 'from-blue-500/20 to-cyan-500/20 border-cyan-500/30 text-cyan-400 hover:border-cyan-400',
    },
    {
      id: 'ai-tutorial',
      title: 'Full-Stack AI App Tutorial',
      category: 'Education & Code',
      icon: Code,
      color: 'from-emerald-500/20 to-teal-500/20 border-emerald-500/30 text-emerald-400 hover:border-emerald-400',
    },
    {
      id: 'gaming-launch',
      title: 'GTA VI Gameplay World Reveal',
      category: 'Gaming & Hype',
      icon: Gamepad2,
      color: 'from-purple-500/20 to-pink-500/20 border-purple-500/30 text-purple-400 hover:border-purple-400',
    },
  ];

  return (
    <div className="relative w-full max-w-4xl mx-auto text-center py-6 px-4">
      {/* Decorative Glow */}
      <div className="absolute inset-0 -top-10 flex items-center justify-center -z-10 pointer-events-none">
        <div className="w-[500px] h-[300px] bg-gradient-to-tr from-brand-600/20 via-indigo-500/15 to-rose-500/10 blur-[100px] rounded-full" />
      </div>

      {/* Headings */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-300 text-xs font-medium mb-4 animate-pulse-slow">
        <Sparkles className="w-3.5 h-3.5 text-brand-400" />
        <span>Next-Gen Video Audience & Sentiment Intelligence</span>
      </div>

      <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight sm:leading-tight">
        Decode What Viewers <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-indigo-300 to-rose-400">Really Think & Feel</span>
      </h1>

      <p className="mt-3 text-sm sm:text-base text-dark-muted max-w-2xl mx-auto">
        Paste any YouTube video link to instantly extract overall sentiment, multi-emotion radar, top praise/complaint clusters, and AI-powered creator insights.
      </p>

      {/* Search Input Box */}
      <form onSubmit={handleSubmit} className="mt-8 relative max-w-3xl mx-auto">
        <div className="relative flex items-center p-1.5 sm:p-2 bg-dark-surface/90 border border-dark-border/80 focus-within:border-brand-500/80 rounded-2xl shadow-2xl backdrop-blur-xl transition-all group focus-within:ring-2 focus-within:ring-brand-500/20">
          <div className="pl-3 pr-2 text-dark-muted flex items-center">
            <Link2 className="w-5 h-5 group-focus-within:text-brand-400 transition-colors" />
          </div>

          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste YouTube Video URL (e.g. https://www.youtube.com/watch?v=... or shorts)"
            className="w-full bg-transparent text-sm sm:text-base text-white placeholder-dark-muted/60 focus:outline-none px-2 py-2"
          />

          <div className="flex items-center gap-1.5 pr-1">
            {!url && (
              <button
                type="button"
                onClick={handlePaste}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs text-dark-muted hover:text-white bg-dark-card hover:bg-dark-border/60 border border-dark-border rounded-lg transition-all"
                title="Paste from clipboard"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>Paste</span>
              </button>
            )}

            <button
              type="submit"
              disabled={isLoading || !url.trim()}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white text-sm font-semibold rounded-xl shadow-lg shadow-brand-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  <span>Analyze</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      {/* 1-Click Demo Presets */}
      <div className="mt-6 text-center">
        <div className="text-xs text-dark-muted uppercase tracking-wider font-semibold mb-3 flex items-center justify-center gap-2">
          <span>⚡ Instant 1-Click Live Demos</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-3xl mx-auto">
          {demoPresets.map((demo) => {
            const Icon = demo.icon;
            return (
              <button
                key={demo.id}
                onClick={() => {
                  setUrl(demo.id);
                  onAnalyze(demo.id);
                }}
                disabled={isLoading}
                className={`flex flex-col items-start p-3 rounded-xl border bg-gradient-to-b ${demo.color} transition-all hover:scale-[1.02] active:scale-[0.98] text-left group`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon className="w-4 h-4 group-hover:rotate-6 transition-transform" />
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-80">{demo.category}</span>
                </div>
                <span className="text-xs font-semibold text-white line-clamp-1 group-hover:text-brand-300">
                  {demo.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
