'use client';

import React, { useState } from 'react';
import { DollarSign, Award, Copy, Check, Briefcase, TrendingUp, CheckCircle, ShieldCheck, Tag } from 'lucide-react';
import { SponsorValuationData } from '@/types';

interface SponsorValuationCardProps {
  valuation: SponsorValuationData;
}

export const SponsorValuationCard: React.FC<SponsorValuationCardProps> = ({ valuation }) => {
  const [copiedPitch, setCopiedPitch] = useState(false);

  const handleCopyPitch = () => {
    navigator.clipboard.writeText(valuation.brandPitchSnippet);
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2000);
  };

  const formatINR = (val: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="w-full bg-gradient-to-br from-dark-surface via-dark-card to-emerald-950/20 border border-emerald-500/30 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-xl space-y-6 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">Creator Sponsor Valuation & Brand ROI</h3>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase">
                Brand Deals
              </span>
            </div>
            <p className="text-xs text-dark-muted">Estimated commercial sponsorship valuation based on engagement quality & viewer trust</p>
          </div>
        </div>

        {/* Tier Badge */}
        <span className="px-3 py-1 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
          {valuation.tier}
        </span>
      </div>

      {/* Pricing Valuation Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* INR Range */}
        <div className="p-4 rounded-2xl bg-dark-base/80 border border-dark-border/80 space-y-1">
          <span className="text-[11px] text-dark-muted font-semibold uppercase block">Est. Sponsorship Rate (INR)</span>
          <div className="text-lg sm:text-xl font-extrabold text-emerald-400">
            {formatINR(valuation.estimatedValueMinINR)} – {formatINR(valuation.estimatedValueMaxINR)}
          </div>
          <span className="text-[10px] text-dark-muted block">Per integrated video sponsorship</span>
        </div>

        {/* USD Val */}
        <div className="p-4 rounded-2xl bg-dark-base/80 border border-dark-border/80 space-y-1">
          <span className="text-[11px] text-dark-muted font-semibold uppercase block">Est. Global Valuation (USD)</span>
          <div className="text-lg sm:text-xl font-extrabold text-white">
            ${valuation.estimatedValueUSD.toLocaleString()} USD
          </div>
          <span className="text-[10px] text-dark-muted block">International sponsor benchmark</span>
        </div>

        {/* CPM */}
        <div className="p-4 rounded-2xl bg-dark-base/80 border border-dark-border/80 space-y-1">
          <span className="text-[11px] text-dark-muted font-semibold uppercase block">Estimated CPM Range</span>
          <div className="text-lg sm:text-xl font-extrabold text-brand-300">
            {valuation.cpmRange}
          </div>
          <span className="text-[10px] text-dark-muted block">Effective cost per 1,000 views</span>
        </div>
      </div>

      {/* Brand Pitch Snippet */}
      <div className="p-4 rounded-2xl bg-dark-base/90 border border-dark-border space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-gray-200 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-brand-400" />
            <span>Ready-to-Send Sponsor Pitch Snippet (Media Kit):</span>
          </span>

          <button
            onClick={handleCopyPitch}
            className="flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            {copiedPitch ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Pitch Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Brand Pitch</span>
              </>
            )}
          </button>
        </div>

        <p className="text-xs text-dark-muted leading-relaxed italic">
          "{valuation.brandPitchSnippet}"
        </p>
      </div>

      {/* Best Brand Fit Categories */}
      <div className="flex items-center gap-2 flex-wrap text-xs">
        <span className="text-dark-muted font-semibold flex items-center gap-1">
          <Tag className="w-3.5 h-3.5" /> Ideal Brand Categories:
        </span>
        {valuation.brandFitCategories.map((cat, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-lg bg-dark-card border border-dark-border text-gray-300 text-xs font-medium"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
};
