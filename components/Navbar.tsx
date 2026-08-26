'use client';

import React from 'react';
import { Sparkles, Youtube, Settings, HelpCircle, BarChart3, Swords, User as UserIcon, Lock } from 'lucide-react';
import { UserProfileDropdown } from '@/components/UserProfileDropdown';
import { User } from '@/types';

interface NavbarProps {
  user: User | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
  activeMode: 'youtube' | 'compare' | 'custom';
  setActiveMode: (mode: 'youtube' | 'compare' | 'custom') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  onOpenAuth,
  onLogout,
  onOpenHistory,
  onOpenSettings,
  onOpenHelp,
  activeMode,
  setActiveMode,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-dark-border/60 bg-dark-base/80 backdrop-blur-md print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div onClick={() => setActiveMode('youtube')} className="flex items-center gap-3 cursor-pointer">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 shadow-lg shadow-brand-500/25">
            <Youtube className="w-5 h-5 text-white" />
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-dark-base">
              <Sparkles className="w-2 h-2 text-white" />
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight text-white">Tube<span className="text-brand-400">Pulse</span></span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/30 rounded-md">Pro SaaS</span>
            </div>
            <p className="text-[11px] text-dark-muted hidden sm:block">YouTube & Video Sentiment Intelligence</p>
          </div>
        </div>

        {/* 3-Mode Switcher */}
        <div className="flex items-center p-1 bg-dark-surface/90 border border-dark-border rounded-xl">
          <button
            onClick={() => setActiveMode('youtube')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeMode === 'youtube'
                ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-md'
                : 'text-dark-muted hover:text-white hover:bg-dark-card/50'
            }`}
          >
            <Youtube className="w-3.5 h-3.5" />
            <span>Single Video</span>
          </button>

          <button
            onClick={() => setActiveMode('compare')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeMode === 'compare'
                ? 'bg-gradient-to-r from-rose-600 to-indigo-600 text-white shadow-md'
                : 'text-dark-muted hover:text-white hover:bg-dark-card/50'
            }`}
          >
            <Swords className="w-3.5 h-3.5 text-rose-300" />
            <span>Battle Mode</span>
          </button>

          <button
            onClick={() => setActiveMode('custom')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              activeMode === 'custom'
                ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white shadow-md'
                : 'text-dark-muted hover:text-white hover:bg-dark-card/50'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Custom/CSV</span>
          </button>
        </div>

        {/* User Auth & Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenHelp}
            className="p-2 text-dark-muted hover:text-white hover:bg-dark-card rounded-lg border border-transparent hover:border-dark-border transition-all"
            title="How it works"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {user ? (
            <UserProfileDropdown
              user={user}
              onLogout={onLogout}
              onOpenHistory={onOpenHistory}
              onOpenSettings={onOpenSettings}
            />
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white rounded-xl shadow-md shadow-brand-500/20 transition-all"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Sign In / Register</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
