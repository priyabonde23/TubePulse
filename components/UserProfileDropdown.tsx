'use client';

import React, { useState, useRef, useEffect } from 'react';
import { User } from '@/types';
import { LogOut, History, Settings, ChevronDown, Sparkles, User as UserIcon, Shield } from 'lucide-react';

interface UserProfileDropdownProps {
  user: User;
  onLogout: () => void;
  onOpenHistory: () => void;
  onOpenSettings: () => void;
}

export const UserProfileDropdown: React.FC<UserProfileDropdownProps> = ({
  user,
  onLogout,
  onOpenHistory,
  onOpenSettings,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-dark-card hover:bg-dark-border/80 border border-dark-border transition-all group"
      >
        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-md shadow-brand-500/20">
          {user.name.charAt(0).toUpperCase()}
        </div>
        <div className="text-left hidden sm:block">
          <span className="text-xs font-bold text-white block leading-tight">{user.name}</span>
          <span className="text-[10px] text-brand-300 font-medium capitalize">{user.role || 'Member'}</span>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-dark-muted group-hover:text-white transition-transform" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-dark-surface border border-dark-border rounded-2xl shadow-2xl p-2 z-50 space-y-1 animate-in fade-in">
          {/* User Info Header */}
          <div className="p-2.5 border-b border-dark-border/60">
            <span className="text-xs font-bold text-white block truncate">{user.name}</span>
            <span className="text-[11px] text-dark-muted block truncate">{user.email}</span>
          </div>

          {/* Actions */}
          <button
            onClick={() => {
              setIsOpen(false);
              onOpenHistory();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-gray-200 hover:text-white hover:bg-dark-card transition-all text-left"
          >
            <History className="w-4 h-4 text-brand-400" />
            <span>Saved History & Projects</span>
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              onOpenSettings();
            }}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-gray-200 hover:text-white hover:bg-dark-card transition-all text-left"
          >
            <Settings className="w-4 h-4 text-dark-muted" />
            <span>API Settings</span>
          </button>

          <div className="pt-1 border-t border-dark-border/60">
            <button
              onClick={() => {
                setIsOpen(false);
                onLogout();
              }}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition-all text-left"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
