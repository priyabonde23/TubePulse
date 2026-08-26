import { User, SavedAnalysis, VideoAnalysisResult, CustomAnalysisResult } from '@/types';

const USERS_KEY = 'tubepulse_users_db';
const SESSION_KEY = 'tubepulse_current_session';
const HISTORY_KEY_PREFIX = 'tubepulse_user_history_';

interface StoredAccount {
  user: User;
  passwordHash: string;
}

/**
 * Get all registered accounts
 */
function getAccounts(): StoredAccount[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Get currently authenticated user
 */
export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

/**
 * Register a new user
 */
export function registerUser(name: string, email: string, password: string): { success: boolean; user?: User; error?: string } {
  if (!name.trim() || !email.trim() || !password.trim()) {
    return { success: false, error: 'All fields are required.' };
  }
  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return { success: false, error: 'Please enter a valid email address.' };
  }

  const accounts = getAccounts();
  const existing = accounts.find(a => a.user.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return { success: false, error: 'An account with this email already exists.' };
  }

  const newUser: User = {
    id: `usr_${Date.now()}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    createdAt: new Date().toISOString(),
    role: 'creator'
  };

  accounts.push({
    user: newUser,
    passwordHash: btoa(password) // Basic obfuscation for client-side storage
  });

  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(accounts));
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    return { success: true, user: newUser };
  } catch (err: any) {
    return { success: false, error: 'Failed to save account locally.' };
  }
}

/**
 * Login user
 */
export function loginUser(email: string, password: string): { success: boolean; user?: User; error?: string } {
  if (!email.trim() || !password.trim()) {
    return { success: false, error: 'Please enter email and password.' };
  }

  const accounts = getAccounts();
  const account = accounts.find(
    a => a.user.email.toLowerCase() === email.toLowerCase().trim() && a.passwordHash === btoa(password)
  );

  if (!account) {
    return { success: false, error: 'Invalid email or password.' };
  }

  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(account.user));
    return { success: true, user: account.user };
  } catch {
    return { success: false, error: 'Failed to create user session.' };
  }
}

/**
 * 1-Click Instant Demo Login
 */
export function demoLogin(): User {
  const demoUser: User = {
    id: 'usr_demo_vip',
    name: 'Alex Morgan',
    email: 'alex.creator@tubepulse.ai',
    createdAt: new Date().toISOString(),
    role: 'pro_member'
  };

  if (typeof window !== 'undefined') {
    localStorage.setItem(SESSION_KEY, JSON.stringify(demoUser));
  }
  return demoUser;
}

/**
 * Logout user
 */
export function logoutUser(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SESSION_KEY);
  }
}

/**
 * Get user analysis history
 */
export function getUserHistory(userId: string): SavedAnalysis[] {
  if (typeof window === 'undefined' || !userId) return [];
  try {
    const raw = localStorage.getItem(`${HISTORY_KEY_PREFIX}${userId}`);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Save an analysis to the user's history
 */
export function saveAnalysisToHistory(
  userId: string,
  result: VideoAnalysisResult | CustomAnalysisResult,
  mode: 'youtube' | 'compare' | 'custom'
): SavedAnalysis[] {
  if (typeof window === 'undefined' || !userId || !result) return [];

  const isVideo = 'video' in result;
  const title = isVideo ? (result as VideoAnalysisResult).video.title : (result as CustomAnalysisResult).title;
  const thumb = isVideo ? (result as VideoAnalysisResult).video.thumbnail : '';
  const url = isVideo ? (result as VideoAnalysisResult).video.url : '';

  const item: SavedAnalysis = {
    id: `hist_${Date.now()}`,
    userId,
    title,
    thumbnailUrl: thumb,
    overallScore: result.sentiment.overallScore,
    verdict: result.sentiment.verdict,
    positiveRatio: result.sentiment.positive,
    analyzedAt: new Date().toISOString(),
    videoUrl: url,
    mode
  };

  try {
    const current = getUserHistory(userId);
    // Prevent duplicate consecutive entries
    const filtered = current.filter(h => h.title !== title);
    const updated = [item, ...filtered].slice(0, 30); // Keep last 30 items
    localStorage.setItem(`${HISTORY_KEY_PREFIX}${userId}`, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

/**
 * Delete a history item
 */
export function deleteHistoryItem(userId: string, historyId: string): SavedAnalysis[] {
  if (typeof window === 'undefined' || !userId) return [];
  try {
    const current = getUserHistory(userId);
    const updated = current.filter(h => h.id !== historyId);
    localStorage.setItem(`${HISTORY_KEY_PREFIX}${userId}`, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}
