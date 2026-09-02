'use client';

import React, { useState } from 'react';
import { Sparkles, Copy, Check, Target, TrendingUp, Zap, Image as ImageIcon, Flame } from 'lucide-react';
import { ViralTitleHook } from '@/types';

interface ViralTitleGeneratorProps {
  titles: ViralTitleHook[];
}

export const ViralTitleGenerator: React.FC<ViralTitleGeneratorProps> = ({ titles }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedBadge, setCopiedBadge] = useState<string | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyBadge = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedBadge(text);
    setTimeout(() => setCopiedBadge(null), 2000);
  };

  const thumbnailStickers = [
    { text: 'DONT BUY YET! ⚠️', color: 'from-amber-500 to-rose-500' },
    { text: 'THE $0 FIX! 💎', color: 'from-emerald-500 to-teal-500' },
    { text: 'SHOCKING TRUTH 🔥', color: 'from-purple-500 to-indigo-500' }
  ];

  return (
    <div className="w-full bg-dark-surface/90 border border-dark-border/80 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">AI Viral Title & Thumbnail CTR Generator</h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase">
                High CTR Hooks
              </span>
            </div>
            <p className="text-xs text-dark-muted">5 high-converting YouTube titles & thumbnail badges synthesized from audience sentiment</p>
          </div>
        </div>
      </div>

      {/* 5 Viral Titles List */}
      <div className="space-y-3">
        {titles.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-2xl bg-dark-card/80 hover:bg-dark-card border border-dark-border/70 hover:border-brand-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
          >
            <div className="space-y-1.5 flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2 py-0.5 rounded-md bg-brand-500/15 text-brand-300 border border-brand-500/25 text-[10px] font-bold">
                  {item.hookType}
                </span>
                <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold flex items-center gap-1">
                  <TrendingUp className="w-2.5 h-2.5" /> {item.estimatedCtr}% Est. CTR
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white group-hover:text-brand-300 transition-colors">
                {item.title}
              </h4>
              <p className="text-[11px] text-dark-muted">{item.reason}</p>
            </div>

            <button
              onClick={() => handleCopy(item.title, index)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-dark-base hover:bg-brand-600/30 text-xs font-semibold text-gray-200 hover:text-white border border-dark-border transition-all flex-shrink-0"
            >
              {copiedIndex === index ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Title</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Thumbnail Text Overlay Stickers */}
      <div className="pt-4 border-t border-dark-border/60 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-gray-200">
          <ImageIcon className="w-4 h-4 text-brand-400" />
          <span>High-Converting Thumbnail Text Overlay Stickers:</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {thumbnailStickers.map((sticker, idx) => (
            <button
              key={idx}
              onClick={() => handleCopyBadge(sticker.text)}
              className={`p-3.5 rounded-2xl bg-gradient-to-r ${sticker.color} text-white font-extrabold text-xs shadow-lg hover:scale-102 active:scale-98 transition-all flex items-center justify-between group`}
            >
              <span>{sticker.text}</span>
              {copiedBadge === sticker.text ? (
                <Check className="w-3.5 h-3.5" />
              ) : (
                <Copy className="w-3.5 h-3.5 opacity-75 group-hover:opacity-100 transition-opacity" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
