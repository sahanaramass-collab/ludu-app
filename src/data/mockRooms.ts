import { ChatRoom, ChatMessage } from '../types';

export const INITIAL_ROOMS: ChatRoom[] = [
  {
    id: 'room-mystery-club',
    name: 'Mystery Club',
    category: 'Popular',
    description: 'Discuss clues, share theories, and solve fictional mysteries together.',
    iconName: 'Search',
    activeUsers: 142,
    tags: ['Detective', 'Puzzles', 'Clues']
  },
  {
    id: 'room-gaming-corner',
    name: 'Gaming Corner',
    category: 'Gaming',
    description: 'Strategy discussions, cooperative quest planning, and puzzle games.',
    iconName: 'Gamepad2',
    activeUsers: 98,
    tags: ['Co-op', 'RPG', 'Puzzles']
  },
  {
    id: 'room-movie-talk',
    name: 'Movie Talk',
    category: 'Creative',
    description: 'Analyze plot twists, cinematography, and favorite adventure film tropes.',
    iconName: 'Film',
    activeUsers: 65,
    tags: ['Cinema', 'Storytelling', 'Reviews']
  },
  {
    id: 'room-study-lounge',
    name: 'Study Lounge',
    category: 'Study',
    description: 'Focus sessions, sharing science notes, and collaborative homework tips.',
    iconName: 'BookOpenCheck',
    activeUsers: 112,
    tags: ['Productivity', 'STEM', 'Campus']
  },
  {
    id: 'room-creative-hub',
    name: 'Creative Hub',
    category: 'Creative',
    description: 'Share character designs, worldbuilding lore, and collaborative writing prompts.',
    iconName: 'Palette',
    activeUsers: 84,
    tags: ['Art', 'Writing', 'Ideas']
  },
  {
    id: 'room-stories-hangout',
    name: 'Story Crafters',
    category: 'Stories',
    description: 'Theory-crafting choices in StoryLoop and finding hidden Easter eggs.',
    iconName: 'BookMarked',
    activeUsers: 76,
    tags: ['Lore', 'Choices', 'StoryLoop']
  },
  {
    id: 'room-astronomy-club',
    name: 'Stargazers Guild',
    category: 'Hobbies',
    description: 'Stargazing schedules, telescope setups, and celestial mythology.',
    iconName: 'Compass',
    activeUsers: 43,
    tags: ['Science', 'Space', 'Observation']
  },
  {
    id: 'room-new-recruits',
    name: 'Loopers Welcome',
    category: 'New',
    description: 'New to StoryLoop? Introduce your avatar and find story co-adventurers!',
    iconName: 'Sparkles',
    activeUsers: 130,
    tags: ['Beginners', 'Social', 'Tips']
  }
];

export const INITIAL_MESSAGES: Record<string, ChatMessage[]> = {
  'room-mystery-club': [
    {
      id: 'm1',
      roomId: 'room-mystery-club',
      senderId: 'u-elena',
      senderName: 'Elena_Sherlock',
      senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      text: 'Did anyone pick Choice A on chapter 2 of The Missing Notebook? The chalk arrow clues lead directly to the archives!',
      timestamp: '12:04 PM',
      isCurrentUser: false
    },
    {
      id: 'm2',
      roomId: 'room-mystery-club',
      senderId: 'u-tariq',
      senderName: 'Tariq_Code',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      text: 'Yes! If you inspect the return cart you unlock the district fair sticker clue as well. Super fun branch.',
      timestamp: '12:05 PM',
      isCurrentUser: false
    },
    {
      id: 'm3',
      roomId: 'room-mystery-club',
      senderId: 'u-mod',
      senderName: 'LoopModerator',
      senderAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      text: 'Welcome detectives! Remember to keep discussions respectful, spoiler-tag major twists, and enjoy solving riddles together!',
      timestamp: '12:06 PM',
      isCurrentUser: false,
      isModerator: true
    }
  ],
  'room-gaming-corner': [
    {
      id: 'g1',
      roomId: 'room-gaming-corner',
      senderId: 'u-kaz',
      senderName: 'Kaz_Pixel',
      senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      text: 'Anyone up for deciphering the clocktower gears in Midnight Mystery?',
      timestamp: '11:45 AM',
      isCurrentUser: false
    },
    {
      id: 'g2',
      roomId: 'room-gaming-corner',
      senderId: 'u-rina',
      senderName: 'RinaGamer',
      senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      text: 'Count me in! Teamwork choices award double friendship points this weekend.',
      timestamp: '11:48 AM',
      isCurrentUser: false
    }
  ]
};

export const BOT_REPLIES = [
  'Great insight! That choice definitely shifts the team dynamic!',
  'I tried that branch earlier, loved the surprise clue at the end.',
  'Thanks for sharing with the group! What do others think?',
  'Nice idea! Teamwork makes solving these mysteries so much smoother.',
  'Welcome to the room! Let us know if you find all the hidden badges.',
  'Agreed! The sound design and art choices are on point too.'
];
