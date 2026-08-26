'use client';

import React from 'react';
import { ViralityMetrics } from '@/types';
import { Rocket, Share2, Eye, Sparkles, Lightbulb, TrendingUp } from 'lucide-react';

interface ViralityPredictorProps {
  virality: ViralityMetrics;
}

export const ViralityPredictor: React.FC<ViralityPredictorProps> = ({ virality }) => {
  if (!virality) return null;

  return (
    <div className="w-full bg-dark-surface border border-dark-border rounded-2xl p-5 sm:p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Rocket className="w-4 h-4 text-brand-400" />
          <h3 className="text-sm font-bold text-white">AI Virality & Audience Growth Predictor</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30">
          {virality.viralityTier}
        </span>
      </div>

      {/* Top Two Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Virality Index */}
        <div className="p-4 rounded-xl bg-dark-card border border-dark-border/80 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-dark-muted font-semibold flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-brand-400" />
              Virality Potential Index
            </span>
            <p className="text-[11px] text-gray-300">Algorithmic recommendation likelihood</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-brand-400">{virality.viralityIndex}</span>
            <span className="text-xs text-dark-muted font-semibold">/100</span>
          </div>
        </div>

        {/* Shareability */}
        <div className="p-4 rounded-xl bg-dark-card border border-dark-border/80 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs text-dark-muted font-semibold flex items-center gap-1.5">
              <Share2 className="w-3.5 h-3.5 text-indigo-400" />
              Social Shareability Score
            </span>
            <p className="text-[11px] text-gray-300">Propensity of audience to share & retweet</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-black text-indigo-400">{virality.shareabilityScore}</span>
            <span className="text-xs text-dark-muted font-semibold">/100</span>
          </div>
        </div>
      </div>

      {/* Retention Prediction */}
      <div className="p-3.5 rounded-xl bg-gradient-to-r from-dark-card to-brand-950/20 border border-brand-500/20 flex items-start gap-3 text-xs text-gray-200">
        <Eye className="w-4 h-4 text-brand-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white block mb-0.5">Audience Retention Forecast:</span>
          <span>{virality.retentionPrediction}</span>
        </div>
      </div>

      {/* SEO & Growth Tips */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-dark-muted uppercase tracking-wider flex items-center gap-1.5">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          AI Creator Growth Recommendations
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {virality.seoTips.map((tip, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-dark-card/60 border border-dark-border/60 text-xs text-gray-300 leading-snug">
              <span className="text-brand-400 font-bold mr-1">#{idx + 1}</span>
              {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
