'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Sparkles, Radio, Headphones, FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { VoiceBriefingData } from '@/types';

interface VoiceBriefingPlayerProps {
  briefing: VoiceBriefingData;
  title: string;
}

export const VoiceBriefingPlayer: React.FC<VoiceBriefingPlayerProps> = ({ briefing, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [rate, setRate] = useState(1);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(briefing.script);
      utterance.rate = rate;
      utterance.pitch = 1.05;
      
      utterance.onend = () => {
        setIsPlaying(false);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  return (
    <div className="w-full bg-gradient-to-r from-dark-surface via-dark-card to-brand-950/40 border border-brand-500/30 rounded-3xl p-5 sm:p-6 shadow-2xl backdrop-blur-2xl relative overflow-hidden space-y-4">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white shadow-lg shadow-brand-500/30">
            <Headphones className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-extrabold text-white">AI Voice Audio Briefing (Podcast Mode)</h3>
              <span className="px-2 py-0.5 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-[10px] font-bold uppercase flex items-center gap-1">
                <Radio className="w-2.5 h-2.5 text-rose-400 animate-pulse" /> 60s Brief
              </span>
            </div>
            <p className="text-xs text-dark-muted">Hands-free audio recap synthesized directly from viewer sentiment</p>
          </div>
        </div>

        {/* Play Controls & Speed */}
        <div className="flex items-center gap-2">
          {/* Rate Selector */}
          <button
            onClick={() => setRate(r => r === 1 ? 1.25 : r === 1.25 ? 1.5 : 1)}
            className="px-2.5 py-1.5 rounded-xl bg-dark-base border border-dark-border text-xs font-bold text-gray-300 hover:text-white transition-all"
            title="Speech Speed"
          >
            {rate}x
          </button>

          {/* Reset */}
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-dark-base border border-dark-border text-dark-muted hover:text-white transition-all"
            title="Restart Audio"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Main Play / Pause Button */}
          <button
            onClick={handleTogglePlay}
            className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 hover:from-brand-500 hover:to-indigo-500 text-white text-xs font-bold rounded-2xl shadow-xl shadow-brand-500/30 transition-all hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4" />
                <span>Pause Audio</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>🎧 Listen to Briefing</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Animated Sound Wave Visualizer */}
      <div className="p-4 rounded-2xl bg-dark-base/70 border border-dark-border/80 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 h-8 flex-1">
          {[40, 70, 90, 60, 30, 85, 100, 45, 95, 75, 35, 80, 65, 90, 50, 70, 100, 60, 40, 85, 95, 55, 75, 45, 85, 65].map((height, i) => (
            <span
              key={i}
              className={`w-1.5 rounded-full transition-all duration-300 ${
                isPlaying
                  ? 'bg-gradient-to-t from-brand-500 to-indigo-400 animate-pulse'
                  : 'bg-dark-border'
              }`}
              style={{
                height: isPlaying ? `${Math.max(15, (height * (i % 3 + 1)) % 100)}%` : '20%',
                animationDelay: `${i * 0.05}s`
              }}
            />
          ))}
        </div>

        <div className="text-right flex-shrink-0">
          <span className="text-[11px] font-semibold text-brand-300 block">
            {isPlaying ? '⚡ Voice AI Speaking...' : 'Ready to Play'}
          </span>
          <span className="text-[10px] text-dark-muted">{briefing.durationEst} duration</span>
        </div>
      </div>

      {/* Key Audio Bullet Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
        {briefing.keyHighlights.map((hl, index) => (
          <div
            key={index}
            className="p-2.5 rounded-xl bg-dark-card/60 border border-dark-border/60 text-xs text-gray-300 flex items-center gap-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-400 flex-shrink-0" />
            <span className="truncate">{hl}</span>
          </div>
        ))}
      </div>

      {/* Transcript Toggle */}
      <div>
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="text-xs font-semibold text-dark-muted hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>{showTranscript ? 'Hide Audio Script Transcript' : 'Read Full Audio Script Transcript'}</span>
          {showTranscript ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showTranscript && (
          <div className="mt-2 p-3.5 rounded-xl bg-dark-base border border-dark-border text-xs text-gray-300 leading-relaxed animate-in fade-in">
            {briefing.script}
          </div>
        )}
      </div>
    </div>
  );
};
