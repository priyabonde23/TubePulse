'use client';

import React from 'react';
import { EmotionBreakdown } from '@/types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Tooltip } from 'recharts';
import { Activity, Flame, Laugh, HelpCircle, AlertCircle, Lightbulb, Scale } from 'lucide-react';

interface EmotionRadarProps {
  emotions: EmotionBreakdown;
}

export const EmotionRadar: React.FC<EmotionRadarProps> = ({ emotions }) => {
  const radarData = [
    { subject: 'Joy & Humor', value: emotions.joy, fullMark: 100, icon: '😂' },
    { subject: 'Hype / Energy', value: emotions.hype, fullMark: 100, icon: '🔥' },
    { subject: 'Confusion', value: emotions.confusion, fullMark: 100, icon: '🤔' },
    { subject: 'Criticism', value: emotions.disappointment, fullMark: 100, icon: '😡' },
    { subject: 'Suggestions', value: emotions.constructive, fullMark: 100, icon: '💡' },
    { subject: 'Neutral', value: emotions.neutral, fullMark: 100, icon: '⚖️' },
  ];

  const emotionList = [
    { label: 'Hype & Excitement', value: emotions.hype, icon: Flame, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
    { label: 'Joy & Humor', value: emotions.joy, icon: Laugh, color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20' },
    { label: 'Questions & Confusion', value: emotions.confusion, icon: HelpCircle, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
    { label: 'Criticism & Disappointment', value: emotions.disappointment, icon: AlertCircle, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    { label: 'Constructive Ideas', value: emotions.constructive, icon: Lightbulb, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
  ];

  return (
    <div className="w-full bg-dark-surface border border-dark-border rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-dark-muted flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-brand-400" />
            Audience Emotion Spectrum
          </span>
          <span className="text-[11px] text-dark-muted">6-Axis Vector</span>
        </div>

        {/* Recharts Radar */}
        <div className="w-full h-52 sm:h-56 -my-2">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
              <PolarGrid stroke="#2A364F" />
              <PolarAngleAxis
                dataKey="subject"
                tick={{ fill: '#8E9BAE', fontSize: 11, fontWeight: 500 }}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-dark-card border border-dark-border px-3 py-1.5 rounded-lg shadow-xl text-xs">
                        <span className="text-white font-bold">{data.icon} {data.subject}:</span>{' '}
                        <span className="text-brand-400 font-semibold">{data.value}%</span>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Radar
                name="Emotions"
                dataKey="value"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.45}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Mini Grid of Emotion Chips */}
      <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-dark-border/60">
        {emotionList.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className={`flex items-center justify-between p-2 rounded-xl border text-xs ${item.color}`}
            >
              <div className="flex items-center gap-1.5 truncate">
                <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate font-medium">{item.label}</span>
              </div>
              <span className="font-bold ml-1">{item.value}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
