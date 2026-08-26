'use client';

import React from 'react';
import { DriftDataPoint } from '@/types';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { LineChart, Clock } from 'lucide-react';

interface SentimentDriftGraphProps {
  drift: DriftDataPoint[];
}

export const SentimentDriftGraph: React.FC<SentimentDriftGraphProps> = ({ drift }) => {
  if (!drift || drift.length === 0) return null;

  return (
    <div className="w-full bg-dark-surface border border-dark-border rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-brand-400" />
          <h3 className="text-sm font-bold text-white">Sentiment Drift Over Time (Day 1 → Day 30)</h3>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-dark-muted">Positive</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span className="text-dark-muted">Negative</span>
          </div>
        </div>
      </div>

      <div className="w-full h-64 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={drift} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="posGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="negGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A364F" vertical={false} />
            <XAxis
              dataKey="timeframe"
              tick={{ fill: '#8E9BAE', fontSize: 11 }}
              axisLine={{ stroke: '#2A364F' }}
            />
            <YAxis
              tick={{ fill: '#8E9BAE', fontSize: 11 }}
              axisLine={{ stroke: '#2A364F' }}
              domain={[0, 100]}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-dark-card border border-dark-border px-3.5 py-2.5 rounded-xl shadow-xl text-xs space-y-1">
                      <span className="text-white font-bold block mb-1">{label}</span>
                      <span className="text-emerald-400 font-semibold block">Positive: {payload[0]?.value}%</span>
                      <span className="text-rose-400 font-semibold block">Negative: {payload[1]?.value}%</span>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="positive"
              stroke="#10b981"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#posGradient)"
            />
            <Area
              type="monotone"
              dataKey="negative"
              stroke="#f43f5e"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#negGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
