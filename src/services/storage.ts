import {
  UserProfile,
  StoryProgress,
  DailyChallenge,
  ChatMessage,
  NotificationItem
} from '../types';
import { INITIAL_CHALLENGES, INITIAL_NOTIFICATIONS } from '../data/mockRewards';
import { INITIAL_MESSAGES } from '../data/mockRooms';

const STORAGE_KEY_USER = 'storyloop_user_v1';
const STORAGE_KEY_PROGRESS = 'storyloop_progress_v1';
const STORAGE_KEY_CHALLENGES = 'storyloop_challenges_v1';
const STORAGE_KEY_MESSAGES = 'storyloop_messages_v1';
const STORAGE_KEY_NOTIFS = 'storyloop_notifs_v1';

export const DEFAULT_USER: UserProfile = {
  id: 'user-default-1',
  username: 'Alex_Explorer',
  email: 'alex.explorer@storyloop.app',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  level: 4,
  storyCoins: 210,
  equippedFrame: 'frame-starlight',
  equippedTheme: 'theme-indigo',
  unlockedFrames: ['frame-starlight'],
  unlockedThemes: ['theme-indigo'],
  unlockedBadges: ['badge-sleuth'],
  stats: {
    storiesCompleted: 2,
    choicesMade: 14,
    challengesCompleted: 5,
    totalRoomsJoined: 4
  },
  settings: {
    notifications: true,
    soundEffects: true,
    hapticFeedback: true,
    offlineMode: false
  },
  blockedUsers: [],
  mutedRooms: []
};

export const loadUser = (): UserProfile => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USER);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load user from localStorage', e);
  }
  return DEFAULT_USER;
};

export const saveUser = (user: UserProfile) => {
  try {
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
  } catch (e) {
    console.error('Failed to save user', e);
  }
};

export const loadAllProgress = (): Record<string, StoryProgress> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PROGRESS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load progress', e);
  }
  // Default initial progress
  return {
    'story-missing-notebook': {
      storyId: 'story-missing-notebook',
      currentSceneId: 'mn-1',
      completedScenes: [],
      clues: ['Blue Bookmark'],
      isCompleted: false,
      lastPlayed: Date.now() - 3600000,
      percent: 33
    }
  };
};

export const saveProgress = (progressMap: Record<string, StoryProgress>) => {
  try {
    localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(progressMap));
  } catch (e) {
    console.error('Failed to save progress', e);
  }
};

export const loadChallenges = (): DailyChallenge[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CHALLENGES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load challenges', e);
  }
  return INITIAL_CHALLENGES;
};

export const saveChallenges = (challenges: DailyChallenge[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_CHALLENGES, JSON.stringify(challenges));
  } catch (e) {
    console.error('Failed to save challenges', e);
  }
};

export const loadRoomMessages = (): Record<string, ChatMessage[]> => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_MESSAGES);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load messages', e);
  }
  return INITIAL_MESSAGES;
};

export const saveRoomMessages = (messages: Record<string, ChatMessage[]>) => {
  try {
    localStorage.setItem(STORAGE_KEY_MESSAGES, JSON.stringify(messages));
  } catch (e) {
    console.error('Failed to save messages', e);
  }
};

export const loadNotifications = (): NotificationItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_NOTIFS);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Failed to load notifications', e);
  }
  return INITIAL_NOTIFICATIONS;
};

export const saveNotifications = (notifs: NotificationItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY_NOTIFS, JSON.stringify(notifs));
  } catch (e) {
    console.error('Failed to save notifications', e);
  }
};
