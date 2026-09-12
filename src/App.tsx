import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Screen,
  UserProfile,
  Story,
  StoryProgress,
  DailyChallenge,
  RewardItem,
  Achievement,
  ChatMessage,
  NotificationItem,
  Choice
} from './types';
import { INITIAL_STORIES } from './data/mockStories';
import { INITIAL_ROOMS, BOT_REPLIES } from './data/mockRooms';
import {
  INITIAL_REWARDS,
  INITIAL_ACHIEVEMENTS
} from './data/mockRewards';
import {
  loadUser,
  saveUser,
  loadAllProgress,
  saveProgress,
  loadChallenges,
  saveChallenges,
  loadRoomMessages,
  saveRoomMessages,
  loadNotifications,
  saveNotifications,
  DEFAULT_USER
} from './services/storage';

import { AndroidFrame } from './components/AndroidFrame';
import { BottomNavBar } from './components/BottomNavBar';
import { SplashScreen } from './components/SplashScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { AuthScreen } from './components/AuthScreen';
import { HomeScreen } from './components/HomeScreen';
import { RoomsScreen } from './components/RoomsScreen';
import { ChatRoomScreen } from './components/ChatRoomScreen';
import { StoriesScreen } from './components/StoriesScreen';
import { StoryPlayerScreen } from './components/StoryPlayerScreen';
import { RewardsScreen } from './components/RewardsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { NotificationsModal } from './components/NotificationsModal';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [user, setUser] = useState<UserProfile>(loadUser);
  const [stories] = useState<Story[]>(INITIAL_STORIES);
  const [progressMap, setProgressMap] = useState<Record<string, StoryProgress>>(loadAllProgress);
  const [rooms] = useState(INITIAL_ROOMS);
  const [roomMessages, setRoomMessages] = useState<Record<string, ChatMessage[]>>(loadRoomMessages);
  const [challenges, setChallenges] = useState<DailyChallenge[]>(loadChallenges);
  const [rewardsStore] = useState<RewardItem[]>(INITIAL_REWARDS);
  const [achievements, setAchievements] = useState<Achievement[]>(INITIAL_ACHIEVEMENTS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(loadNotifications);

  // Active navigation sub-states
  const [activeStoryId, setActiveStoryId] = useState<string>('story-missing-notebook');
  const [activeRoomId, setActiveRoomId] = useState<string>('room-mystery-club');
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save changes
  useEffect(() => {
    saveUser(user);
  }, [user]);

  useEffect(() => {
    saveProgress(progressMap);
  }, [progressMap]);

  useEffect(() => {
    saveChallenges(challenges);
  }, [challenges]);

  useEffect(() => {
    saveRoomMessages(roomMessages);
  }, [roomMessages]);

  useEffect(() => {
    saveNotifications(notifications);
  }, [notifications]);

  // Trigger brief visual toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Auth handling
  const handleAuthSuccess = (email: string, username: string) => {
    const updated: UserProfile = {
      ...user,
      email,
      username
    };
    setUser(updated);
    setCurrentScreen('home');
    showToast(`Welcome to StoryLoop, ${username}!`);
  };

  const handleGuestLogin = () => {
    setCurrentScreen('home');
    showToast('Welcome, Guest Explorer!');
  };

  // Story action handlers
  const handleStartStory = (storyId: string) => {
    setActiveStoryId(storyId);
    setCurrentScreen('story-player');
  };

  const handleMakeChoice = (choice: Choice, nextSceneId: string, isEnding?: boolean) => {
    const activeStory = stories.find((s) => s.id === activeStoryId);
    if (!activeStory) return;

    const nextScene = activeStory.scenes[nextSceneId];
    const prevProgress = progressMap[activeStoryId] || {
      storyId: activeStoryId,
      currentSceneId: activeStory.initialSceneId,
      completedScenes: [],
      clues: [],
      isCompleted: false,
      lastPlayed: Date.now(),
      percent: 0
    };

    const newClues = choice.clueGained && !prevProgress.clues.includes(choice.clueGained)
      ? [...prevProgress.clues, choice.clueGained]
      : prevProgress.clues;

    const completed = isEnding || nextScene?.isEnding || false;
    const coinsReward = (choice.rewardCoins || 10) + (completed ? 25 : 0);

    const nextChapter = nextScene ? nextScene.chapterNumber : activeStory.totalChapters;
    const newPercent = completed ? 100 : Math.min(100, Math.round((nextChapter / activeStory.totalChapters) * 100));

    const updatedProgress: StoryProgress = {
      ...prevProgress,
      currentSceneId: nextSceneId,
      completedScenes: [...prevProgress.completedScenes, prevProgress.currentSceneId],
      clues: newClues,
      isCompleted: completed,
      lastPlayed: Date.now(),
      percent: newPercent
    };

    setProgressMap((prev) => ({
      ...prev,
      [activeStoryId]: updatedProgress
    }));

    // Update User Coins & Stats
    setUser((prev) => ({
      ...prev,
      storyCoins: prev.storyCoins + coinsReward,
      stats: {
        ...prev.stats,
        choicesMade: prev.stats.choicesMade + 1,
        storiesCompleted: completed ? prev.stats.storiesCompleted + 1 : prev.stats.storiesCompleted
      }
    }));

    // Advance daily challenge for choices
    setChallenges((prev) =>
      prev.map((ch) => {
        if (ch.type === 'choices') {
          return {
            ...ch,
            currentCount: Math.min(ch.targetCount, ch.currentCount + 1)
          };
        }
        if (completed && ch.type === 'stories') {
          return {
            ...ch,
            currentCount: Math.min(ch.targetCount, ch.currentCount + 1)
          };
        }
        return ch;
      })
    );

    showToast(`Choice saved! +${coinsReward} Story Coins`);
  };

  const handleRestartStory = (storyId: string) => {
    const story = stories.find((s) => s.id === storyId);
    if (!story) return;

    setProgressMap((prev) => ({
      ...prev,
      [storyId]: {
        storyId,
        currentSceneId: story.initialSceneId,
        completedScenes: [],
        clues: [],
        isCompleted: false,
        lastPlayed: Date.now(),
        percent: 10
      }
    }));
    showToast('Story choices reset for a new branch!');
  };

  // Rooms & Chat Handlers
  const handleOpenRoom = (roomId: string) => {
    setActiveRoomId(roomId);
    setCurrentScreen('chat');

    // Advance daily challenge for rooms
    setChallenges((prev) =>
      prev.map((ch) => {
        if (ch.type === 'rooms') {
          return {
            ...ch,
            currentCount: Math.min(ch.targetCount, ch.currentCount + 1)
          };
        }
        return ch;
      })
    );
  };

  const handleSendMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      roomId: activeRoomId,
      senderId: user.id,
      senderName: user.username,
      senderAvatar: user.avatarUrl,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCurrentUser: true
    };

    setRoomMessages((prev) => ({
      ...prev,
      [activeRoomId]: [...(prev[activeRoomId] || []), newMessage]
    }));

    // Advance daily challenge for chat
    setChallenges((prev) =>
      prev.map((ch) => {
        if (ch.type === 'chat') {
          return {
            ...ch,
            currentCount: Math.min(ch.targetCount, ch.currentCount + 1)
          };
        }
        return ch;
      })
    );

    // Simulate friendly bot response
    setTimeout(() => {
      const randomReply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        roomId: activeRoomId,
        senderId: 'bot-peer',
        senderName: 'Nova_Detective',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        text: randomReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: false
      };

      setRoomMessages((prev) => ({
        ...prev,
        [activeRoomId]: [...(prev[activeRoomId] || []), botMessage]
      }));
    }, 1800);
  };

  const handleReportMessage = (messageId: string, reason: string) => {
    showToast(`Message flagged: "${reason}". Sent to moderators.`);
  };

  const handleBlockUser = (username: string) => {
    if (!user.blockedUsers.includes(username)) {
      setUser((prev) => ({
        ...prev,
        blockedUsers: [...prev.blockedUsers, username]
      }));
      showToast(`User ${username} has been blocked.`);
    }
  };

  const handleToggleMuteRoom = (roomId: string) => {
    const isMuted = user.mutedRooms.includes(roomId);
    const updated = isMuted
      ? user.mutedRooms.filter((id) => id !== roomId)
      : [...user.mutedRooms, roomId];

    setUser((prev) => ({
      ...prev,
      mutedRooms: updated
    }));

    showToast(isMuted ? 'Room unmuted' : 'Room notifications muted');
  };

  // Rewards handlers
  const handleClaimChallenge = (challengeId: string) => {
    const ch = challenges.find((c) => c.id === challengeId);
    if (!ch || ch.claimed) return;

    setUser((prev) => ({
      ...prev,
      storyCoins: prev.storyCoins + ch.rewardCoins,
      stats: {
        ...prev.stats,
        challengesCompleted: prev.stats.challengesCompleted + 1
      }
    }));

    setChallenges((prev) =>
      prev.map((c) => (c.id === challengeId ? { ...c, claimed: true } : c))
    );

    showToast(`Claimed +${ch.rewardCoins} Story Coins!`);
  };

  const handleBuyReward = (reward: RewardItem) => {
    if (user.storyCoins < reward.price) {
      showToast('Not enough Story Coins!');
      return;
    }

    setUser((prev) => {
      const newCoins = prev.storyCoins - reward.price;
      const newFrames =
        reward.type === 'frame' && !prev.unlockedFrames.includes(reward.id)
          ? [...prev.unlockedFrames, reward.id]
          : prev.unlockedFrames;

      const newThemes =
        reward.type === 'theme' && !prev.unlockedThemes.includes(reward.id)
          ? [...prev.unlockedThemes, reward.id]
          : prev.unlockedThemes;

      const newBadges =
        reward.type === 'badge' && !prev.unlockedBadges.includes(reward.id)
          ? [...prev.unlockedBadges, reward.id]
          : prev.unlockedBadges;

      return {
        ...prev,
        storyCoins: newCoins,
        unlockedFrames: newFrames,
        unlockedThemes: newThemes,
        unlockedBadges: newBadges
      };
    });

    showToast(`Unlocked ${reward.name}!`);
  };

  const handleEquipFrame = (frameId: string) => {
    setUser((prev) => ({
      ...prev,
      equippedFrame: frameId
    }));
    showToast('Avatar frame equipped!');
  };

  const handleEquipTheme = (themeId: string) => {
    setUser((prev) => ({
      ...prev,
      equippedTheme: themeId
    }));
    showToast('Chat theme updated!');
  };

  // Primary navigation check
  const isPrimaryScreen = ['home', 'rooms', 'stories', 'rewards', 'profile'].includes(
    currentScreen
  );

  const featuredStory =
    stories.find((s) => s.featured) || stories[0];

  const featuredProgress = progressMap[featuredStory.id];
  const activeStory = stories.find((s) => s.id === activeStoryId) || featuredStory;
  const activeRoom = rooms.find((r) => r.id === activeRoomId) || rooms[0];

  const unreadNotifsCount = notifications.filter((n) => !n.read).length;
  const unclaimedRewardsCount = challenges.filter(
    (c) => c.currentCount >= c.targetCount && !c.claimed
  ).length;

  return (
    <AndroidFrame isOffline={user.settings.offlineMode}>
      {/* Toast Notification Alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-12 left-4 right-4 z-50 bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 text-white px-4 py-2.5 rounded-2xl shadow-2xl text-xs font-bold text-center border border-violet-400/30"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Screen Switcher */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {currentScreen === 'splash' && (
          <SplashScreen onFinish={() => setCurrentScreen('onboarding')} />
        )}

        {currentScreen === 'onboarding' && (
          <OnboardingScreen onComplete={() => setCurrentScreen('auth')} />
        )}

        {currentScreen === 'auth' && (
          <AuthScreen
            onSuccess={handleAuthSuccess}
            onGuestLogin={handleGuestLogin}
          />
        )}

        {currentScreen === 'home' && (
          <HomeScreen
            user={user}
            featuredStory={featuredStory}
            featuredProgress={featuredProgress}
            challenge={challenges[0]}
            recommendedRooms={rooms}
            unreadNotifsCount={unreadNotifsCount}
            onOpenNotifications={() => setShowNotificationsModal(true)}
            onContinueStory={handleStartStory}
            onOpenRoom={handleOpenRoom}
            onNavigateToRooms={() => setCurrentScreen('rooms')}
            onNavigateToStories={() => setCurrentScreen('stories')}
            onNavigateToRewards={() => setCurrentScreen('rewards')}
            onNavigateToProfile={() => setCurrentScreen('profile')}
          />
        )}

        {currentScreen === 'rooms' && (
          <RoomsScreen rooms={rooms} onSelectRoom={handleOpenRoom} />
        )}

        {currentScreen === 'chat' && (
          <ChatRoomScreen
            room={activeRoom}
            messages={(roomMessages[activeRoom.id] || []).filter(
              (m) => !user.blockedUsers.includes(m.senderName)
            )}
            user={user}
            onBack={() => setCurrentScreen('rooms')}
            onSendMessage={handleSendMessage}
            onReportMessage={handleReportMessage}
            onBlockUser={handleBlockUser}
            onToggleMuteRoom={handleToggleMuteRoom}
          />
        )}

        {currentScreen === 'stories' && (
          <StoriesScreen
            stories={stories}
            progressMap={progressMap}
            onPlayStory={handleStartStory}
          />
        )}

        {currentScreen === 'story-player' && (
          <StoryPlayerScreen
            story={activeStory}
            currentProgress={progressMap[activeStory.id]}
            onBack={() => setCurrentScreen('stories')}
            onMakeChoice={handleMakeChoice}
            onRestartStory={handleRestartStory}
          />
        )}

        {currentScreen === 'rewards' && (
          <RewardsScreen
            user={user}
            challenges={challenges}
            rewardsStore={rewardsStore}
            achievements={achievements}
            onClaimChallenge={handleClaimChallenge}
            onBuyReward={handleBuyReward}
            onEquipFrame={handleEquipFrame}
            onEquipTheme={handleEquipTheme}
          />
        )}

        {currentScreen === 'profile' && (
          <ProfileScreen
            user={user}
            stories={stories}
            progressMap={progressMap}
            onOpenSettings={() => setCurrentScreen('settings')}
            onPlayStory={handleStartStory}
          />
        )}

        {currentScreen === 'settings' && (
          <SettingsScreen
            user={user}
            onBack={() => setCurrentScreen('profile')}
            onUpdateSettings={(newSettings) =>
              setUser((prev) => ({ ...prev, settings: newSettings }))
            }
            onUnblockUser={(name) =>
              setUser((prev) => ({
                ...prev,
                blockedUsers: prev.blockedUsers.filter((u) => u !== name)
              }))
            }
            onLogout={() => {
              setCurrentScreen('auth');
              showToast('Logged out of StoryLoop');
            }}
          />
        )}
      </div>

      {/* Bottom Navigation Bar (Visible on primary screens) */}
      {isPrimaryScreen && (
        <BottomNavBar
          currentScreen={currentScreen}
          onNavigate={(screen) => setCurrentScreen(screen)}
          unreadCount={unreadNotifsCount}
          unclaimedRewardsCount={unclaimedRewardsCount}
        />
      )}

      {/* Notifications Drawer Modal */}
      {showNotificationsModal && (
        <NotificationsModal
          notifications={notifications}
          onClose={() => setShowNotificationsModal(false)}
          onMarkAllAsRead={() => {
            setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
            showToast('All notifications marked as read');
          }}
        />
      )}
    </AndroidFrame>
  );
}
