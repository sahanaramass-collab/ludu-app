import { DailyChallenge, RewardItem, Achievement, NotificationItem } from '../types';

export const INITIAL_CHALLENGES: DailyChallenge[] = [
  {
    id: 'ch-choices',
    title: 'Decision Maker',
    description: 'Complete 3 story choices',
    targetCount: 3,
    currentCount: 2,
    rewardCoins: 50,
    claimed: false,
    type: 'choices'
  },
  {
    id: 'ch-rooms',
    title: 'Community Explorer',
    description: 'Join 2 community rooms',
    targetCount: 2,
    currentCount: 1,
    rewardCoins: 30,
    claimed: false,
    type: 'rooms'
  },
  {
    id: 'ch-story',
    title: 'Page Turner',
    description: 'Complete 1 interactive story chapter',
    targetCount: 1,
    currentCount: 1,
    rewardCoins: 40,
    claimed: false,
    type: 'stories'
  },
  {
    id: 'ch-chat',
    title: 'Friendly Voice',
    description: 'Send 2 messages in any discussion room',
    targetCount: 2,
    currentCount: 1,
    rewardCoins: 25,
    claimed: false,
    type: 'chat'
  }
];

export const INITIAL_REWARDS: RewardItem[] = [
  {
    id: 'frame-starlight',
    name: 'Cosmic Violet Ring',
    type: 'frame',
    description: 'Glow with animated celestial violet stardust around your avatar.',
    price: 120,
    previewColor: 'ring-4 ring-violet-500 shadow-violet-500/50',
    icon: 'Sparkles'
  },
  {
    id: 'frame-detective',
    name: 'Brass Sleuth Monocle',
    type: 'frame',
    description: 'A polished brass frame reserved for observant riddle solvers.',
    price: 150,
    previewColor: 'ring-4 ring-amber-400 shadow-amber-500/50',
    icon: 'Search'
  },
  {
    id: 'frame-emerald',
    name: 'Verdant Forest Crest',
    type: 'frame',
    description: 'Lush emerald foliage designed for wilderness expeditions.',
    price: 100,
    previewColor: 'ring-4 ring-emerald-400 shadow-emerald-500/50',
    icon: 'Compass'
  },
  {
    id: 'theme-indigo',
    name: 'Twilight Deep Indigo',
    type: 'theme',
    description: 'Sleek dark violet chat bubbles with soft glowing edges.',
    price: 80,
    previewColor: 'bg-indigo-950 text-indigo-100',
    icon: 'Palette'
  },
  {
    id: 'theme-cyber',
    name: 'Electric Neon Mint',
    type: 'theme',
    description: 'Futuristic high-contrast cyan-mint accents for chat bubbles.',
    price: 90,
    previewColor: 'bg-teal-950 text-teal-200',
    icon: 'Zap'
  },
  {
    id: 'badge-sleuth',
    name: 'Master Cluefinder',
    type: 'badge',
    description: 'Excellence in solving multiple branch mysteries.',
    price: 60,
    icon: 'Award'
  },
  {
    id: 'badge-collaborator',
    name: 'Teamwork Champion',
    type: 'badge',
    description: 'High affinity in collaborative decisions with story peers.',
    price: 60,
    icon: 'Users'
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-story',
    title: 'First Story',
    description: 'Complete your first interactive story chapter.',
    icon: 'Trophy',
    unlocked: true,
    progress: 1,
    maxProgress: 1,
    rewardCoins: 50
  },
  {
    id: 'ach-explorer',
    title: 'Explorer',
    description: 'Try 5 different stories in the library.',
    icon: 'Compass',
    unlocked: false,
    progress: 3,
    maxProgress: 5,
    rewardCoins: 100
  },
  {
    id: 'ach-room-visitor',
    title: 'Room Visitor',
    description: 'Join 5 public community chat rooms.',
    icon: 'MessageSquare',
    unlocked: false,
    progress: 2,
    maxProgress: 5,
    rewardCoins: 75
  },
  {
    id: 'ach-daily-player',
    title: 'Daily Player',
    description: 'Complete daily challenges 3 days in a row.',
    icon: 'Flame',
    unlocked: false,
    progress: 2,
    maxProgress: 3,
    rewardCoins: 150
  },
  {
    id: 'ach-clue-collector',
    title: 'Clue Hunter',
    description: 'Collect 6 distinct story clues in your journal.',
    icon: 'KeyRound',
    unlocked: false,
    progress: 4,
    maxProgress: 6,
    rewardCoins: 120
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n1',
    title: 'Daily Challenge Ready',
    message: 'New challenge refreshed! Earn up to 145 Story Coins today.',
    timeAgo: '10m ago',
    type: 'challenge',
    read: false
  },
  {
    id: 'n2',
    title: 'Story Update',
    message: 'Chapter 2 unlocked in "The Missing Notebook". Follow the chalk trail!',
    timeAgo: '1h ago',
    type: 'story',
    read: false
  },
  {
    id: 'n3',
    title: 'Coin Bonus',
    message: 'You earned +50 Story Coins for completing your First Story!',
    timeAgo: '3h ago',
    type: 'reward',
    read: true
  }
];
