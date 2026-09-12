export type Screen =
  | 'splash'
  | 'onboarding'
  | 'auth'
  | 'home'
  | 'rooms'
  | 'chat'
  | 'stories'
  | 'story-player'
  | 'rewards'
  | 'profile'
  | 'settings';

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatarUrl: string;
  level: number;
  storyCoins: number;
  equippedFrame?: string;
  equippedTheme?: string;
  unlockedFrames: string[];
  unlockedThemes: string[];
  unlockedBadges: string[];
  stats: {
    storiesCompleted: number;
    choicesMade: number;
    challengesCompleted: number;
    totalRoomsJoined: number;
  };
  settings: {
    notifications: boolean;
    soundEffects: boolean;
    hapticFeedback: boolean;
    offlineMode: boolean;
  };
  blockedUsers: string[];
  mutedRooms: string[];
}

export interface Choice {
  id: string;
  text: string;
  tag?: string; // e.g. 'Friendship', 'Bravery', 'Analysis'
  nextSceneId: string;
  rewardCoins?: number;
  clueGained?: string;
  friendshipPoints?: number;
}

export interface Scene {
  id: string;
  chapterNumber: number;
  title: string;
  speaker?: string;
  speakerRole?: string;
  narrative: string;
  illustrationType: 'library' | 'clocktower' | 'train' | 'robotics' | 'island' | 'detective';
  choices: Choice[];
  isEnding?: boolean;
  endingType?: 'victory' | 'discovery' | 'teamwork' | 'cliffhanger';
}

export interface Story {
  id: string;
  title: string;
  tagline: string;
  genre: 'Mystery' | 'Adventure' | 'Comedy' | 'Fantasy' | 'Friendship' | 'Detective';
  difficulty: 'Easy' | 'Medium' | 'Challenging';
  totalChapters: number;
  coverGradient: string;
  coverIcon: string;
  illustrationType: 'library' | 'clocktower' | 'train' | 'robotics' | 'island' | 'detective';
  description: string;
  featured?: boolean;
  scenes: Record<string, Scene>;
  initialSceneId: string;
}

export interface StoryProgress {
  storyId: string;
  currentSceneId: string;
  completedScenes: string[];
  clues: string[];
  isCompleted: boolean;
  lastPlayed: number;
  percent: number;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isCurrentUser: boolean;
  isModerator?: boolean;
}

export interface ChatRoom {
  id: string;
  name: string;
  category: 'Popular' | 'New' | 'Gaming' | 'Stories' | 'Hobbies' | 'Study' | 'Creative';
  description: string;
  iconName: string;
  activeUsers: number;
  tags: string[];
  isMuted?: boolean;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  rewardCoins: number;
  claimed: boolean;
  type: 'choices' | 'stories' | 'rooms' | 'chat';
}

export interface RewardItem {
  id: string;
  name: string;
  type: 'frame' | 'theme' | 'badge' | 'title';
  description: string;
  price: number;
  previewColor?: string;
  icon?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  rewardCoins: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  type: 'challenge' | 'story' | 'reward' | 'community';
  read: boolean;
}
