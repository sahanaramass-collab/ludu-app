import React from 'react';
import { Home, MessageSquare, BookOpen, Award, User } from 'lucide-react';
import { Screen } from '../types';

interface BottomNavBarProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
  unreadCount?: number;
  unclaimedRewardsCount?: number;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({
  currentScreen,
  onNavigate,
  unreadCount = 0,
  unclaimedRewardsCount = 1
}) => {
  const tabs: { id: Screen; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'home',
      label: 'Home',
      icon: <Home size={20} />
    },
    {
      id: 'rooms',
      label: 'Rooms',
      icon: <MessageSquare size={20} />,
      badge: unreadCount > 0 ? unreadCount : undefined
    },
    {
      id: 'stories',
      label: 'Stories',
      icon: <BookOpen size={20} />
    },
    {
      id: 'rewards',
      label: 'Rewards',
      icon: <Award size={20} />,
      badge: unclaimedRewardsCount > 0 ? unclaimedRewardsCount : undefined
    },
    {
      id: 'profile',
      label: 'Profile',
      icon: <User size={20} />
    }
  ];

  return (
    <nav className="w-full bg-[#130E29]/95 backdrop-blur-lg border-t border-violet-900/30 px-3 py-2 flex items-center justify-around z-30 select-none">
      {tabs.map((tab) => {
        const isActive = currentScreen === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all duration-200 ${
              isActive
                ? 'text-violet-300 font-bold scale-105'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {/* Active Pill Indicator */}
            {isActive && (
              <div className="absolute -top-1 w-8 h-1 bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full shadow-sm shadow-violet-500/50" />
            )}

            <div className="relative">
              <div
                className={`p-1.5 rounded-xl transition-colors ${
                  isActive ? 'bg-violet-600/30 text-violet-300' : ''
                }`}
              >
                {tab.icon}
              </div>

              {/* Notification Badge */}
              {tab.badge && (
                <span className="absolute -top-1 -right-1.5 min-w-4 h-4 px-1 rounded-full bg-pink-500 text-[10px] text-white font-bold flex items-center justify-center ring-2 ring-[#130E29]">
                  {tab.badge}
                </span>
              )}
            </div>

            <span className="text-[11px] mt-0.5 tracking-tight font-medium">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
