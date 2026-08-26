'use client';

import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Sparkles, Eye, EyeOff, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { registerUser, loginUser, demoLogin } from '@/lib/authService';
import { User } from '@/types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (tab === 'signup') {
      const res = registerUser(name, email, password);
      if (!res.success) {
        setError(res.error || 'Registration failed.');
        return;
      }
      setSuccessMsg('Account created successfully! Logging you in...');
      setTimeout(() => {
        onAuthSuccess(res.user!);
        onClose();
      }, 700);
    } else {
      const res = loginUser(email, password);
      if (!res.success) {
        setError(res.error || 'Invalid credentials.');
        return;
      }
      setSuccessMsg('Logged in successfully!');
      setTimeout(() => {
        onAuthSuccess(res.user!);
        onClose();
      }, 700);
    }
  };

  const handleDemoLogin = () => {
    const demoUser = demoLogin();
    setSuccessMsg('Logged in with Demo VIP Account!');
    setTimeout(() => {
      onAuthSuccess(demoUser);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-md bg-dark-surface border border-dark-border rounded-2xl p-6 sm:p-7 shadow-2xl space-y-5 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-dark-muted hover:text-white rounded-lg hover:bg-dark-card transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Branding */}
        <div className="text-center space-y-1">
          <div className="inline-flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 shadow-lg shadow-brand-500/30 mb-2">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight">
            {tab === 'signin' ? 'Welcome Back to TubePulse' : 'Create Your Free Account'}
          </h3>
          <p className="text-xs text-dark-muted">
            {tab === 'signin'
              ? 'Access your saved video intelligence history & reports'
              : 'Unlock personalized analytics, saved analyses & exports'}
          </p>
        </div>

        {/* 1-Click Demo Login Banner */}
        <button
          type="button"
          onClick={handleDemoLogin}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-brand-600/20 via-indigo-600/20 to-brand-600/20 border border-brand-500/40 hover:border-brand-400 text-xs font-semibold text-brand-200 hover:text-white transition-all shadow-md group"
        >
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>⚡ 1-Click Instant Demo Login</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>

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

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3.5">
          {tab === 'signup' && (
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Full Name</label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-dark-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. John Doe"
                  className="w-full pl-9 pr-3 py-2 bg-dark-card border border-dark-border focus:border-brand-500 rounded-xl text-xs text-white placeholder-dark-muted focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-dark-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-9 pr-3 py-2 bg-dark-card border border-dark-border focus:border-brand-500 rounded-xl text-xs text-white placeholder-dark-muted focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-dark-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-9 pr-9 py-2 bg-dark-card border border-dark-border focus:border-brand-500 rounded-xl text-xs text-white placeholder-dark-muted focus:outline-none"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dark-muted hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-500/25 transition-all mt-2"
          >
            {tab === 'signin' ? 'Sign In to Account' : 'Create Account & Start Analyzing'}
          </button>
        </form>
      </div>
    </div>
  );
};
