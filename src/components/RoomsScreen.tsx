import React, { useState } from 'react';
import {
  Search,
  Users,
  Gamepad2,
  Film,
  BookOpenCheck,
  Palette,
  BookMarked,
  Compass,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { ChatRoom } from '../types';

interface RoomsScreenProps {
  rooms: ChatRoom[];
  onSelectRoom: (roomId: string) => void;
}

type CategoryType = 'All' | 'Popular' | 'New' | 'Gaming' | 'Stories' | 'Hobbies' | 'Study' | 'Creative';

export const RoomsScreen: React.FC<RoomsScreenProps> = ({ rooms, onSelectRoom }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('All');

  const categories: CategoryType[] = [
    'All',
    'Popular',
    'New',
    'Gaming',
    'Stories',
    'Hobbies',
    'Study',
    'Creative'
  ];

  const getRoomIcon = (iconName: string) => {
    switch (iconName) {
      case 'Search':
        return <Search size={20} className="text-amber-400" />;
      case 'Gamepad2':
        return <Gamepad2 size={20} className="text-purple-400" />;
      case 'Film':
        return <Film size={20} className="text-pink-400" />;
      case 'BookOpenCheck':
        return <BookOpenCheck size={20} className="text-emerald-400" />;
      case 'Palette':
        return <Palette size={20} className="text-cyan-400" />;
      case 'BookMarked':
        return <BookMarked size={20} className="text-indigo-400" />;
      case 'Compass':
        return <Compass size={20} className="text-teal-400" />;
      default:
        return <Sparkles size={20} className="text-violet-400" />;
    }
  };

  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCat =
      selectedCategory === 'All' || room.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="w-full h-full flex-1 overflow-y-auto pb-6 bg-[#0E0824] text-white select-none">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-3 bg-gradient-to-b from-[#1A1038] to-[#0E0824] border-b border-violet-900/20 sticky top-0 z-20 backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-extrabold text-white font-['Outfit']">
              Community Rooms
            </h1>
            <p className="text-xs text-slate-400">
              Safe public rooms to brainstorm and share theories
            </p>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/40">
            <ShieldCheck size={13} />
            <span>Age-Safe</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search rooms by topic, game or tag..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#1C133B] border border-violet-800/40 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>

        {/* Category Horizontal Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-900/50'
                    : 'bg-[#181133] hover:bg-[#23184A] text-slate-300 border border-violet-900/30'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rooms List */}
      <div className="px-5 mt-4 space-y-3">
        {filteredRooms.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-[#170E33] border border-violet-900/30 mt-4">
            <p className="text-sm font-semibold text-slate-300 mb-1">
              No rooms found
            </p>
            <p className="text-xs text-slate-500">
              Try searching with another keyword or pick a different category.
            </p>
          </div>
        ) : (
          filteredRooms.map((room) => (
            <div
              key={room.id}
              className="p-4 rounded-2xl bg-[#170E33] hover:bg-[#1F1445] border border-violet-800/30 transition-all flex flex-col justify-between gap-3 shadow-md"
            >
              <div className="flex items-start gap-3.5">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-[#271B52] to-[#1B113B] border border-violet-700/30 shrink-0">
                  {getRoomIcon(room.iconName)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="text-base font-bold text-white truncate">
                      {room.name}
                    </h3>
                    <span className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40 shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      {room.activeUsers} online
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 mb-2">
                    {room.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {room.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-medium text-violet-300/80 bg-violet-900/20 px-2 py-0.5 rounded-md border border-violet-800/20"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-violet-900/30 flex items-center justify-between">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Users size={13} />
                  <span>Public Group Discussion</span>
                </span>

                <button
                  onClick={() => onSelectRoom(room.id)}
                  className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md shadow-violet-900/40 flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <span>Join</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
