import React from 'react';
import {
  Bell,
  Coins,
  Play,
  ArrowRight,
  Flame,
  Search,
  Gamepad2,
  Film,
  BookOpenCheck,
  Palette,
  Sparkles,
  Users,
  Download,
  Archive
} from 'lucide-react';
import { UserProfile, Story, StoryProgress, DailyChallenge, ChatRoom } from '../types';
import { StorySceneIllustration } from './Illustrations';

interface HomeScreenProps {
  user: UserProfile;
  featuredStory: Story;
  featuredProgress?: StoryProgress;
  challenge: DailyChallenge;
  recommendedRooms: ChatRoom[];
  unreadNotifsCount: number;
  onOpenNotifications: () => void;
  onContinueStory: (storyId: string) => void;
  onOpenRoom: (roomId: string) => void;
  onNavigateToRooms: () => void;
  onNavigateToStories: () => void;
  onNavigateToRewards: () => void;
  onNavigateToProfile: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  featuredStory,
  featuredProgress,
  challenge,
  recommendedRooms,
  unreadNotifsCount,
  onOpenNotifications,
  onContinueStory,
  onOpenRoom,
  onNavigateToRooms,
  onNavigateToStories,
  onNavigateToRewards,
  onNavigateToProfile
}) => {
  // Helper for room icon
  const getRoomIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return <Search size={18} className="text-amber-400" />;
      case 'Gamepad2':
        return <Gamepad2 size={18} className="text-purple-400" />;
      case 'Film':
        return <Film size={18} className="text-pink-400" />;
      case 'BookOpenCheck':
        return <BookOpenCheck size={18} className="text-emerald-400" />;
      case 'Palette':
        return <Palette size={18} className="text-cyan-400" />;
      default:
        return <Sparkles size={18} className="text-violet-400" />;
    }
  };

  const progressPercent = featuredProgress ? featuredProgress.percent : 0;

  return (
    <div className="w-full h-full flex-1 overflow-y-auto pb-6 bg-[#0E0824] text-white select-none">
      {/* Top Header Section */}
      <div className="px-5 pt-4 pb-4 bg-gradient-to-b from-[#1B113B] to-[#0E0824] border-b border-violet-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToProfile}
              className="relative group transition-transform active:scale-95"
            >
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="w-12 h-12 rounded-2xl object-cover ring-2 ring-violet-500/70 shadow-md shadow-violet-950"
              />
              <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 bg-violet-600 text-[10px] font-bold text-white rounded-full border border-violet-900">
                Lv.{user.level}
              </span>
            </button>

            <div>
              <span className="text-xs text-violet-300/80 font-medium">
                Good afternoon!
              </span>
              <h1 className="text-lg font-bold text-white tracking-tight leading-tight">
                {user.username}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Story Coins pill */}
            <button
              onClick={onNavigateToRewards}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-bold shadow-inner"
            >
              <Coins size={14} className="text-amber-400 fill-amber-400" />
              <span>{user.storyCoins}</span>
            </button>

            {/* Notification Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2.5 rounded-2xl bg-[#1D1440] hover:bg-[#281C58] border border-violet-800/40 text-slate-300 transition-colors"
            >
              <Bell size={18} />
              {unreadNotifsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-pink-500 rounded-full ring-2 ring-[#1D1440]" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="px-5 space-y-5 mt-4">
        {/* Quick ZIP Download Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-violet-900/50 via-indigo-900/40 to-violet-900/50 border border-violet-700/50 flex items-center justify-between shadow-lg">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Archive size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-white">Project ZIP File</span>
                <span className="px-1.5 py-0.2 bg-amber-400 text-slate-950 rounded text-[9px] font-extrabold">.ZIP</span>
              </div>
              <p className="text-[11px] text-slate-300">একটি ফাইলে সম্পূর্ণ প্রজেক্টের কোড</p>
            </div>
          </div>
          <a
            href="/storyloop-app.zip"
            download="storyloop-app.zip"
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-amber-950/40 active:scale-95 transition-all"
          >
            <Download size={13} />
            <span>জিপ ডাউনলোড</span>
          </a>
        </div>

        {/* Featured Story Card */}
        <section>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-violet-300">
              <Sparkles size={14} className="text-yellow-400" />
              <span>Featured Story</span>
            </div>
            <button
              onClick={onNavigateToStories}
              className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-0.5"
            >
              <span>Library</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="relative rounded-3xl bg-gradient-to-b from-[#21164D] to-[#160E36] border border-violet-800/30 shadow-xl overflow-hidden p-4 group">
            {/* Original Vector Artwork */}
            <div className="w-full mb-3 rounded-2xl overflow-hidden shadow-md">
              <StorySceneIllustration
                type={featuredStory.illustrationType}
                title={featuredStory.title}
              />
            </div>

            {/* Title & Badge */}
            <div className="flex items-start justify-between gap-2 mb-1">
              <div>
                <span className="inline-block text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md mb-1 border border-amber-400/20">
                  {featuredStory.genre} • {featuredStory.difficulty}
                </span>
                <h2 className="text-lg font-bold text-white font-['Outfit']">
                  {featuredStory.title}
                </h2>
              </div>
            </div>

            {/* Short Description */}
            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-3">
              {featuredStory.description}
            </p>

            {/* Progress and Continue Button */}
            <div className="pt-2 border-t border-violet-900/40 flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span>Story Progress</span>
                  <span className="font-bold text-violet-300">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-violet-950 rounded-full overflow-hidden border border-violet-900/40">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full transition-all duration-500"
                    style={{ width: `${Math.max(10, progressPercent)}%` }}
                  />
                </div>
              </div>

              <button
                onClick={() => onContinueStory(featuredStory.id)}
                className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs flex items-center gap-1.5 shadow-md shadow-violet-900/50 active:scale-95 transition-all shrink-0"
              >
                <Play size={13} className="fill-white" />
                <span>{progressPercent > 0 ? 'Continue' : 'Start'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Daily Challenge Card */}
        <section>
          <div className="rounded-2xl bg-gradient-to-r from-[#2B1B48] via-[#211642] to-[#1C1236] border border-violet-700/30 p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <div className="p-1.5 rounded-lg bg-orange-500/20 text-orange-400">
                  <Flame size={16} />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-orange-400">
                    Today's Challenge
                  </span>
                  <h3 className="text-sm font-bold text-white leading-tight">
                    {challenge.description}
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-amber-400/10 text-amber-300 text-xs font-bold border border-amber-400/20">
                <Coins size={12} className="fill-amber-400" />
                <span>+{challenge.rewardCoins}</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-3 flex items-center justify-between gap-3">
              <div className="flex-1">
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Progress</span>
                  <span className="font-semibold text-slate-200">
                    {challenge.currentCount} / {challenge.targetCount}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-900/80 rounded-full overflow-hidden border border-violet-900/30">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                    style={{
                      width: `${Math.min(
                        100,
                        (challenge.currentCount / challenge.targetCount) * 100
                      )}%`
                    }}
                  />
                </div>
              </div>

              <button
                onClick={() => onContinueStory(featuredStory.id)}
                className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs shadow-md shadow-orange-900/40 active:scale-95 transition-all shrink-0"
              >
                Play Now
              </button>
            </div>
          </div>
        </section>

        {/* Recommended Rooms Horizontal Cards */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-bold text-white font-['Outfit']">
                Recommended Rooms
              </h3>
              <p className="text-xs text-slate-400">Safe, public community chats</p>
            </div>
            <button
              onClick={onNavigateToRooms}
              className="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-0.5"
            >
              <span>View All</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* Horizontal scroll carousel */}
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none snap-x">
            {recommendedRooms.slice(0, 5).map((room) => (
              <div
                key={room.id}
                onClick={() => onOpenRoom(room.id)}
                className="w-48 shrink-0 snap-start p-3.5 rounded-2xl bg-[#1A1238] hover:bg-[#22184A] border border-violet-800/30 cursor-pointer transition-all active:scale-[0.98] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-xl bg-violet-900/40 border border-violet-700/30">
                      {getRoomIcon(room.iconName)}
                    </div>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {room.activeUsers}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1">
                    {room.name}
                  </h4>
                  <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                    {room.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-violet-900/30 flex items-center justify-between text-[11px] text-violet-300 font-medium">
                  <span className="flex items-center gap-1">
                    <Users size={12} />
                    <span>Join Discussion</span>
                  </span>
                  <ArrowRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
