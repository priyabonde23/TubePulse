'use client';

import React, { useState } from 'react';
import { Youtube, Sparkles, Lock, Mail, User as UserIcon, Eye, EyeOff, ArrowRight, Zap, CheckCircle2, ShieldCheck, Activity, Layers, MessageSquare, Swords } from 'lucide-react';
import { registerUser, loginUser, demoLogin } from '@/lib/authService';
import { User } from '@/types';

interface AuthGateProps {
  onAuthSuccess: (user: User) => void;
}

export const AuthGate: React.FC<AuthGateProps> = ({ onAuthSuccess }) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setIsLoading(true);

    setTimeout(() => {
      if (tab === 'signup') {
        const res = registerUser(name, email, password);
        setIsLoading(false);
        if (!res.success) {
          setError(res.error || 'Registration failed.');
          return;
        }
        setSuccessMsg('Account created successfully! Logging you in...');
        setTimeout(() => {
          onAuthSuccess(res.user!);
        }, 600);
      } else {
        const res = loginUser(email, password);
        setIsLoading(false);
        if (!res.success) {
          setError(res.error || 'Invalid email or password.');
          return;
        }
        setSuccessMsg('Welcome back! Loading your dashboard...');
        setTimeout(() => {
          onAuthSuccess(res.user!);
        }, 600);
      }
    }, 400);
  };

  const handleDemoLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      const demoUser = demoLogin();
      setSuccessMsg('Logged in with Demo VIP Account!');
      setTimeout(() => {
        onAuthSuccess(demoUser);
      }, 500);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-dark-base flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-gradient-to-tr from-brand-600/20 via-indigo-500/15 to-transparent blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-bl from-rose-500/15 via-purple-600/15 to-transparent blur-[130px] pointer-events-none rounded-full" />

      {/* Main Container: Split Grid */}
      <div className="w-full max-w-5xl bg-dark-surface/90 border border-dark-border/80 rounded-3xl shadow-2xl backdrop-blur-2xl grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative z-10">
        
        {/* Left Side: Brand Showcase & Features (5 Cols) */}
        <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 bg-gradient-to-br from-dark-card/90 via-dark-surface to-brand-950/40 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-dark-border/70">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8">
              <div className="relative flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 shadow-xl shadow-brand-500/30">
                <Youtube className="w-6 h-6 text-white" />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-dark-base">
                  <Sparkles className="w-2.5 h-2.5 text-white" />
                </span>
              </div>
              <div>
                <span className="text-2xl font-extrabold tracking-tight text-white">Tube<span className="text-brand-400">Pulse</span></span>
                <span className="ml-2 px-2 py-0.5 text-[10px] font-bold bg-brand-500/20 text-brand-300 border border-brand-500/30 rounded-md">Pro SaaS</span>
              </div>
            </div>

            {/* Tagline */}
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              Unlock Deep AI Video & Audience <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-400 via-indigo-300 to-rose-400">Sentiment Intelligence</span>
            </h1>

            <p className="text-xs sm:text-sm text-dark-muted mt-3 leading-relaxed">
              Login to access YouTube video sentiment gauges, 6-axis emotion radars, battle mode comparisons, and automated creator AI summaries.
            </p>

            {/* Feature Bullets */}
            <div className="mt-8 space-y-3.5">
              <div className="flex items-center gap-3 text-xs text-gray-200">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Activity className="w-4 h-4" />
                </div>
                <span><strong>Multi-Dimensional Sentiment & Emotion Radars</strong></span>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-200">
                <div className="p-2 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20">
                  <Layers className="w-4 h-4" />
                </div>
                <span><strong>Aspect-Based Sentiment Matrix (ABSA)</strong></span>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-200">
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  <Swords className="w-4 h-4" />
                </div>
                <span><strong>Head-to-Head Video Battle Comparisons</strong></span>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-200">
                <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <span><strong>1-Click AI Smart Replies & Saved Project History</strong></span>
              </div>
            </div>
          </div>

          {/* Trust Banner */}
          <div className="pt-8 mt-8 border-t border-dark-border/60 flex items-center justify-between text-[11px] text-dark-muted">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <ShieldCheck className="w-4 h-4" /> End-to-End Session Security
            </span>
            <span>TubePulse AI v3.0</span>
          </div>
        </div>

        {/* Right Side: Auth Card Form (6 Cols) */}
        <div className="lg:col-span-6 p-8 sm:p-10 lg:p-12 flex flex-col justify-center space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {tab === 'signin' ? 'Sign In to Your Account' : 'Create a New Account'}
            </h2>
            <p className="text-xs text-dark-muted">
              {tab === 'signin' ? 'Enter your credentials to access your dashboard' : 'Join thousands of creators analyzing audience sentiment'}
            </p>
          </div>

          {/* 1-Click Instant Demo Login */}
          <button
            type="button"
            onClick={handleDemoLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-brand-600/25 via-indigo-600/20 to-brand-600/25 border border-brand-500/40 hover:border-brand-400 text-xs font-bold text-brand-200 hover:text-white transition-all shadow-lg shadow-brand-500/10 group"
          >
            <div className="flex items-center gap-2.5">
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400 group-hover:scale-110 transition-transform" />
              <span>⚡ 1-Click Instant Demo Account Login</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-brand-300 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-dark-border/80" />
            <span className="text-[11px] text-dark-muted uppercase font-bold tracking-wider">or continue with email</span>
            <div className="flex-1 h-px bg-dark-border/80" />
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center p-1 bg-dark-card border border-dark-border rounded-xl">
            <button
              type="button"
              onClick={() => {
                setTab('signin');
                setError(null);
              }}
              className={`w-1/2 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === 'signin'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-dark-muted hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setTab('signup');
                setError(null);
              }}
              className={`w-1/2 py-2 text-xs font-bold rounded-lg transition-all ${
                tab === 'signup'
                  ? 'bg-brand-600 text-white shadow-md'
                  : 'text-dark-muted hover:text-white'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Alerts */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium animate-in fade-in">
              {error}
            </div>
          )}
          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-medium flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-dark-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Doe"
                    className="w-full pl-10 pr-3 py-2.5 bg-dark-card border border-dark-border focus:border-brand-500 rounded-xl text-xs text-white placeholder-dark-muted focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-dark-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-10 pr-3 py-2.5 bg-dark-card border border-dark-border focus:border-brand-500 rounded-xl text-xs text-white placeholder-dark-muted focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-dark-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-10 py-2.5 bg-dark-card border border-dark-border focus:border-brand-500 rounded-xl text-xs text-white placeholder-dark-muted focus:outline-none transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-dark-muted hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-500/25 transition-all disabled:opacity-50 mt-2"
            >
              {isLoading ? 'Processing...' : (tab === 'signin' ? 'Sign In & Access Dashboard' : 'Create Free Account')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
