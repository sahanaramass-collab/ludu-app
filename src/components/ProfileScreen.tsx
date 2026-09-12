import React, { useState } from 'react';
import {
  Coins,
  Settings as SettingsIcon,
  Award,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Palette,
  Clock,
  ChevronRight,
  Shield,
  Zap
} from 'lucide-react';
import { UserProfile, Story, StoryProgress } from '../types';

interface ProfileScreenProps {
  user: UserProfile;
  stories: Story[];
  progressMap: Record<string, StoryProgress>;
  onOpenSettings: () => void;
  onPlayStory: (storyId: string) => void;
}

type ProfileTab = 'badges' | 'collections' | 'history';

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  stories,
  progressMap,
  onOpenSettings,
  onPlayStory
}) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>('badges');

  // Find frame ring styling
  const frameClass =
    user.equippedFrame === 'frame-starlight'
      ? 'ring-4 ring-violet-500 shadow-violet-500/50'
      : user.equippedFrame === 'frame-detective'
      ? 'ring-4 ring-amber-400 shadow-amber-500/50'
      : user.equippedFrame === 'frame-emerald'
      ? 'ring-4 ring-emerald-400 shadow-emerald-500/50'
      : 'ring-2 ring-violet-600/40';

  return (
    <div className="w-full h-full flex-1 overflow-y-auto pb-6 bg-[#0E0824] text-white select-none">
      {/* Top Profile Header */}
      <div className="px-5 pt-4 pb-6 bg-gradient-to-b from-[#1C113C] to-[#0E0824] border-b border-violet-900/20">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-extrabold text-white font-['Outfit']">
            Explorer Profile
          </h1>
          <button
            onClick={onOpenSettings}
            className="p-2.5 rounded-2xl bg-[#1D1440] hover:bg-[#281C58] border border-violet-800/40 text-slate-300 transition-colors"
          >
            <SettingsIcon size={18} />
          </button>
        </div>

        {/* User Identity Card */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user.avatarUrl}
              alt={user.username}
              className={`w-16 h-16 rounded-2xl object-cover shadow-xl ${frameClass}`}
            />
            <span className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 bg-violet-600 text-[10px] font-extrabold text-white rounded-full border-2 border-[#1C113C]">
              Lv.{user.level}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-white font-['Outfit'] truncate">
              {user.username}
            </h2>
            <p className="text-xs text-violet-300/80 mb-2 truncate">
              {user.email}
            </p>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-inner">
              <Coins size={13} className="fill-amber-400" />
              <span>{user.storyCoins} Story Coins</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-2 mt-5 p-3 rounded-2xl bg-[#150D30] border border-violet-900/30 text-center">
          <div>
            <span className="block text-base font-extrabold text-violet-300">
              {user.stats.storiesCompleted}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Stories</span>
          </div>
          <div>
            <span className="block text-base font-extrabold text-violet-300">
              {user.stats.choicesMade}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Choices</span>
          </div>
          <div>
            <span className="block text-base font-extrabold text-violet-300">
              {user.stats.challengesCompleted}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Quests</span>
          </div>
          <div>
            <span className="block text-base font-extrabold text-violet-300">
              {user.unlockedBadges.length}
            </span>
            <span className="text-[10px] text-slate-400 font-medium">Badges</span>
          </div>
        </div>
      </div>

      {/* Sections Sub-tabs */}
      <div className="px-5 mt-4">
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#140D2E] border border-violet-900/30 text-xs mb-4">
          <button
            onClick={() => setActiveTab('badges')}
            className={`py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'badges'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Award size={14} />
            <span>Badges</span>
          </button>

          <button
            onClick={() => setActiveTab('collections')}
            className={`py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'collections'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Palette size={14} />
            <span>Items</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Clock size={14} />
            <span>History</span>
          </button>
        </div>

        {/* Tab 1: Badges */}
        {activeTab === 'badges' && (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-[#170E33] border border-violet-800/30 flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Award size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Master Cluefinder</h4>
                <p className="text-xs text-slate-300">
                  Unlocked by discovering 5+ hidden mystery clues in StoryLoop.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#170E33] border border-violet-800/30 flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Sparkles size={22} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Teamwork Champion</h4>
                <p className="text-xs text-slate-300">
                  Earned by choosing cooperative friendship branches in stories.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Collections */}
        {activeTab === 'collections' && (
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-[#170E33] border border-violet-800/30">
              <span className="text-[10px] uppercase font-bold text-violet-300 tracking-wider">
                Equipped Avatar Frame
              </span>
              <h4 className="text-sm font-bold text-white mt-1">Cosmic Violet Ring</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Animated celestial violet stardust around your profile avatar.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#170E33] border border-violet-800/30">
              <span className="text-[10px] uppercase font-bold text-violet-300 tracking-wider">
                Equipped Chat Theme
              </span>
              <h4 className="text-sm font-bold text-white mt-1">Twilight Deep Indigo</h4>
              <p className="text-xs text-slate-300 mt-0.5">
                Dark violet message bubbles with soft glowing edges.
              </p>
            </div>
          </div>
        )}

        {/* Tab 3: Story History */}
        {activeTab === 'history' && (
          <div className="space-y-3">
            {stories.map((story) => {
              const progress = progressMap[story.id];
              const percent = progress?.percent || 0;
              return (
                <div
                  key={story.id}
                  onClick={() => onPlayStory(story.id)}
                  className="p-3.5 rounded-2xl bg-[#170E33] hover:bg-[#1E1342] border border-violet-800/30 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-violet-900/40 text-violet-300">
                      <BookOpen size={18} />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{story.title}</h4>
                      <p className="text-[11px] text-slate-400">
                        {percent > 0 ? `${percent}% Completed` : 'Not started'}
                      </p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </div>
              );
            })}
          </div>
        )}

        {/* Direct Settings Entry Card */}
        <button
          onClick={onOpenSettings}
          className="w-full mt-4 p-4 rounded-2xl bg-[#150D30] hover:bg-[#1E1342] border border-violet-900/40 flex items-center justify-between text-left transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-violet-900/30 text-violet-300">
              <SettingsIcon size={16} />
            </div>
            <div>
              <span className="text-xs font-bold text-white block">
                Account & Preferences
              </span>
              <span className="text-[11px] text-slate-400">
                Notifications, audio, safety and moderation
              </span>
            </div>
          </div>
          <ChevronRight size={16} className="text-slate-400" />
        </button>
      </div>
    </div>
  );
};
