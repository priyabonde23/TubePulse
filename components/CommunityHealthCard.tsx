'use client';

import React from 'react';
import { ToxicityReport } from '@/types';
import { ShieldCheck, ShieldAlert, Shield, AlertOctagon, Bot, CheckCircle2 } from 'lucide-react';

interface CommunityHealthCardProps {
  health: ToxicityReport;
}

export const CommunityHealthCard: React.FC<CommunityHealthCardProps> = ({ health }) => {
  const { communityHealthScore, toxicCount, spamCount, toxicityRatio, safetyStatus } = health;

  const getStatusTheme = () => {
    if (communityHealthScore >= 88) {
      return {
        icon: ShieldCheck,
        text: 'text-emerald-400',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        bar: 'bg-emerald-500',
        label: 'Safe & Clean'
      };
    }
    if (communityHealthScore >= 70) {
      return {
        icon: Shield,
        text: 'text-amber-400',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        bar: 'bg-amber-500',
        label: 'Mild Toxicity'
      };
    }
    return {
      icon: ShieldAlert,
      text: 'text-rose-400',
      bg: 'bg-rose-500/10',
      border: 'border-rose-500/30',
      bar: 'bg-rose-500',
      label: 'High Toxicity Alert'
    };
  };

  const theme = getStatusTheme();
  const Icon = theme.icon;

  return (
    <div className="w-full bg-dark-surface border border-dark-border rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Community Safety & Health Shield</h3>
          </div>
          <span className={`inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${theme.bg} ${theme.text} ${theme.border}`}>
            <Icon className="w-3 h-3" />
            {safetyStatus}
          </span>
        </div>

        {/* Big Health Score Bar */}
        <div className="p-4 rounded-xl bg-dark-card border border-dark-border/80 my-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-dark-muted font-medium">Community Safety Health Index</span>
            <span className={`text-xl font-extrabold ${theme.text}`}>
              {communityHealthScore}<span className="text-xs text-dark-muted font-normal">/100</span>
            </span>
          </div>
          <div className="w-full h-2.5 bg-dark-base rounded-full overflow-hidden border border-dark-border/40">
            <div
              className={`h-full rounded-full transition-all duration-700 ${theme.bar}`}
              style={{ width: `${communityHealthScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* 3 Metric Pills */}
      <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-dark-border/60 text-xs">
        <div className="p-2.5 rounded-xl bg-dark-card/60 border border-dark-border/60 text-center">
          <span className="text-[10px] text-dark-muted uppercase font-bold block mb-0.5">Toxicity Rate</span>
          <span className="text-white font-bold text-sm">{toxicityRatio}%</span>
        </div>

        <div className="p-2.5 rounded-xl bg-dark-card/60 border border-dark-border/60 text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] text-dark-muted uppercase font-bold mb-0.5">
            <AlertOctagon className="w-3 h-3 text-rose-400" />
            <span>Toxic Flags</span>
          </div>
          <span className="text-rose-400 font-bold text-sm">{toxicCount}</span>
        </div>

        <div className="p-2.5 rounded-xl bg-dark-card/60 border border-dark-border/60 text-center">
          <div className="flex items-center justify-center gap-1 text-[10px] text-dark-muted uppercase font-bold mb-0.5">
            <Bot className="w-3 h-3 text-amber-400" />
            <span>Spam / Bots</span>
          </div>
          <span className="text-amber-400 font-bold text-sm">{spamCount}</span>
        </div>
      </div>
    </div>
  );
};
