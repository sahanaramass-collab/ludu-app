import React, { useState, useEffect } from 'react';
import {
  Coins,
  Flame,
  Award,
  Sparkles,
  CheckCircle2,
  Clock,
  Palette,
  ShoppingBag,
  Trophy,
  Check
} from 'lucide-react';
import { UserProfile, DailyChallenge, RewardItem, Achievement } from '../types';

interface RewardsScreenProps {
  user: UserProfile;
  challenges: DailyChallenge[];
  rewardsStore: RewardItem[];
  achievements: Achievement[];
  onClaimChallenge: (challengeId: string) => void;
  onBuyReward: (reward: RewardItem) => void;
  onEquipFrame: (frameId: string) => void;
  onEquipTheme: (themeId: string) => void;
}

type TabType = 'challenges' | 'store' | 'achievements';

export const RewardsScreen: React.FC<RewardsScreenProps> = ({
  user,
  challenges,
  rewardsStore,
  achievements,
  onClaimChallenge,
  onBuyReward,
  onEquipFrame,
  onEquipTheme
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('challenges');
  const [timeLeft, setTimeLeft] = useState('08h 24m');

  // Simulated daily countdown
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(`${hours.toString().padStart(2, '0')}h ${mins.toString().padStart(2, '0')}m`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full flex-1 overflow-y-auto pb-6 bg-[#0E0824] text-white select-none">
      {/* Top Header with Story Coins Card */}
      <div className="px-5 pt-4 pb-4 bg-gradient-to-b from-[#1C113C] to-[#0E0824] border-b border-violet-900/20">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-extrabold text-white font-['Outfit']">
              Rewards & Quests
            </h1>
            <p className="text-xs text-slate-400">
              Earn virtual Story Coins to customize your profile
            </p>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-bold text-sm shadow-inner">
            <Coins size={16} className="text-amber-400 fill-amber-400" />
            <span>{user.storyCoins}</span>
          </div>
        </div>

        {/* Sub-tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#140D2E] border border-violet-900/30 text-xs">
          <button
            onClick={() => setActiveTab('challenges')}
            className={`py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'challenges'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Flame size={14} />
            <span>Daily</span>
          </button>

          <button
            onClick={() => setActiveTab('store')}
            className={`py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'store'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShoppingBag size={14} />
            <span>Shop</span>
          </button>

          <button
            onClick={() => setActiveTab('achievements')}
            className={`py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'achievements'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Trophy size={14} />
            <span>Badges</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Daily Challenges */}
      {activeTab === 'challenges' && (
        <div className="px-5 mt-4 space-y-4">
          {/* Daily Reset Countdown banner */}
          <div className="p-3 rounded-2xl bg-violet-950/40 border border-violet-800/30 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-violet-300">
              <Clock size={15} />
              <span className="font-semibold">Reset countdown</span>
            </div>
            <span className="font-bold text-amber-300 bg-amber-950/60 px-2.5 py-0.5 rounded-full border border-amber-500/20">
              {timeLeft}
            </span>
          </div>

          <div className="space-y-3">
            {challenges.map((ch) => {
              const isDone = ch.currentCount >= ch.targetCount;
              const isClaimed = ch.claimed;

              return (
                <div
                  key={ch.id}
                  className="p-4 rounded-2xl bg-[#170E33] border border-violet-800/30 flex flex-col justify-between gap-3 shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-bold text-white mb-0.5">
                        {ch.title}
                      </h3>
                      <p className="text-xs text-slate-300">{ch.description}</p>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold shrink-0">
                      <Coins size={12} className="fill-amber-400" />
                      <span>+{ch.rewardCoins}</span>
                    </div>
                  </div>

                  {/* Progress & Claim button */}
                  <div className="pt-2 border-t border-violet-900/30 flex items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                        <span>Progress</span>
                        <span className="font-bold text-slate-200">
                          {ch.currentCount} / {ch.targetCount}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-violet-900/30">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              (ch.currentCount / ch.targetCount) * 100
                            )}%`
                          }}
                        />
                      </div>
                    </div>

                    {isClaimed ? (
                      <span className="px-3.5 py-1.5 rounded-xl bg-emerald-950 text-emerald-400 border border-emerald-800/40 text-xs font-bold flex items-center gap-1">
                        <Check size={13} />
                        Claimed
                      </span>
                    ) : isDone ? (
                      <button
                        onClick={() => onClaimChallenge(ch.id)}
                        className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-900/40 active:scale-95 transition-all animate-pulse"
                      >
                        Claim!
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-xl bg-violet-950/60 text-slate-400 text-xs font-semibold">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Collectibles Shop */}
      {activeTab === 'store' && (
        <div className="px-5 mt-4 space-y-4">
          <p className="text-xs text-slate-300">
            Customize your avatar frame, chat theme, and social cards with Story Coins.
            Virtual only — never real money.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {rewardsStore.map((item) => {
              const isUnlocked =
                user.unlockedFrames.includes(item.id) ||
                user.unlockedThemes.includes(item.id) ||
                user.unlockedBadges.includes(item.id);

              const isEquipped =
                user.equippedFrame === item.id || user.equippedTheme === item.id;

              const canAfford = user.storyCoins >= item.price;

              return (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-[#170E33] border border-violet-800/30 flex flex-col justify-between gap-3 shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase bg-violet-900/30 text-violet-300 border border-violet-700/30">
                        {item.type}
                      </span>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-300">
                        <Coins size={12} className="fill-amber-400" />
                        <span>{item.price}</span>
                      </div>
                    </div>

                    <h3 className="text-sm font-bold text-white mb-1">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-violet-900/30 flex items-center justify-end">
                    {isEquipped ? (
                      <span className="px-3 py-1.5 rounded-xl bg-violet-950 text-violet-300 border border-violet-700/40 text-xs font-bold flex items-center gap-1">
                        <Check size={12} />
                        Equipped
                      </span>
                    ) : isUnlocked ? (
                      <button
                        onClick={() => {
                          if (item.type === 'frame') onEquipFrame(item.id);
                          if (item.type === 'theme') onEquipTheme(item.id);
                        }}
                        className="px-3.5 py-1.5 rounded-xl bg-[#281B52] hover:bg-[#322368] text-white text-xs font-bold transition-colors"
                      >
                        Equip
                      </button>
                    ) : (
                      <button
                        onClick={() => onBuyReward(item)}
                        disabled={!canAfford}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shadow-md transition-all ${
                          canAfford
                            ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 active:scale-95'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Unlock' : 'Need Coins'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 3: Achievements */}
      {activeTab === 'achievements' && (
        <div className="px-5 mt-4 space-y-3">
          {achievements.map((ach) => {
            return (
              <div
                key={ach.id}
                className="p-4 rounded-2xl bg-[#170E33] border border-violet-800/30 flex items-start gap-3.5 shadow-md"
              >
                <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-violet-900/30 border border-amber-500/30 text-amber-300 shrink-0">
                  <Trophy size={20} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h3 className="text-sm font-bold text-white truncate">
                      {ach.title}
                    </h3>
                    <span className="flex items-center gap-1 text-xs font-bold text-amber-300 shrink-0">
                      <Coins size={12} className="fill-amber-400" />
                      <span>+{ach.rewardCoins}</span>
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-2">
                    {ach.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                    <span>Progress</span>
                    <span className="font-semibold text-slate-200">
                      {ach.progress} / {ach.maxProgress}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full"
                      style={{
                        width: `${Math.min(
                          100,
                          (ach.progress / ach.maxProgress) * 100
                        )}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
