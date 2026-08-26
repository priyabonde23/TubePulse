'use client';

import React from 'react';
import { AiSummary } from '@/types';
import { Sparkles, ThumbsUp, AlertTriangle, HelpCircle, Target, Zap } from 'lucide-react';

interface AiSummaryCardProps {
  summary: AiSummary;
}

export const AiSummaryCard: React.FC<AiSummaryCardProps> = ({ summary }) => {
  const getHypeBadge = () => {
    switch (summary.hypeLevel) {
      case 'Viral':
        return { label: 'Viral Hype 🔥', color: 'bg-rose-500/20 text-rose-300 border-rose-500/40' };
      case 'High':
        return { label: 'High Excitement 🚀', color: 'bg-amber-500/20 text-amber-300 border-amber-500/40' };
      case 'Moderate':
        return { label: 'Steady Interest ⚡', color: 'bg-blue-500/20 text-blue-300 border-blue-500/40' };
      default:
        return { label: 'Low Energy ⚠️', color: 'bg-gray-500/20 text-gray-300 border-gray-500/40' };
    }
  };

  const hype = getHypeBadge();

  return (
    <div className="w-full bg-dark-surface border border-dark-border rounded-2xl p-5 sm:p-6 shadow-xl space-y-6">
      {/* Header & Executive Summary */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">AI Executive Audience Intelligence</h3>
          </div>
          <span className={`px-3 py-1 text-xs font-bold rounded-full border ${hype.color}`}>
            {hype.label}
          </span>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-brand-950/40 via-dark-card to-dark-card border border-brand-500/20 text-sm text-gray-200 leading-relaxed">
          {summary.executiveSummary}
        </div>
      </div>

      {/* 4 Quadrants Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1. What Viewers Loved */}
        <div className="bg-dark-card/60 border border-emerald-500/20 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2.5">
              <ThumbsUp className="w-4 h-4" />
              <span>What Viewers Loved</span>
            </div>
            <ul className="space-y-2 text-xs text-gray-300">
              {summary.topPraises.map((praise, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold mt-0.5">•</span>
                  <span className="leading-snug">{praise}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 2. Critical Feedback */}
        <div className="bg-dark-card/60 border border-rose-500/20 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-2.5">
              <AlertTriangle className="w-4 h-4" />
              <span>Criticisms & Pain Points</span>
            </div>
            <ul className="space-y-2 text-xs text-gray-300">
              {summary.topCriticisms.map((crit, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-400 font-bold mt-0.5">•</span>
                  <span className="leading-snug">{crit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 3. Audience Questions */}
        <div className="bg-dark-card/60 border border-blue-500/20 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-blue-400 text-xs font-bold uppercase tracking-wider mb-2.5">
              <HelpCircle className="w-4 h-4" />
              <span>Common Questions & Confusions</span>
            </div>
            <ul className="space-y-2 text-xs text-gray-300">
              {summary.commonQuestions.map((q, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-400 font-bold mt-0.5">•</span>
                  <span className="leading-snug">{q}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 4. Creator Action Plan */}
        <div className="bg-dark-card/60 border border-brand-500/30 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2.5">
              <Target className="w-4 h-4" />
              <span>Actionable Next Steps</span>
            </div>
            <ul className="space-y-2 text-xs text-gray-300">
              {summary.creatorActionItems.map((act, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-brand-400 font-bold mt-0.5">•</span>
                  <span className="leading-snug">{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
