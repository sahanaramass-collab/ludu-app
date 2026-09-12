import React, { useState } from 'react';
import {
  Play,
  CheckCircle2,
  Sparkles,
  BookOpen,
  Compass,
  Smile,
  Users,
  Search,
  Zap
} from 'lucide-react';
import { Story, StoryProgress } from '../types';
import { StorySceneIllustration } from './Illustrations';

interface StoriesScreenProps {
  stories: Story[];
  progressMap: Record<string, StoryProgress>;
  onPlayStory: (storyId: string) => void;
}

type StoryGenre = 'All' | 'Mystery' | 'Adventure' | 'Comedy' | 'Fantasy' | 'Friendship' | 'Detective';

export const StoriesScreen: React.FC<StoriesScreenProps> = ({
  stories,
  progressMap,
  onPlayStory
}) => {
  const [selectedGenre, setSelectedGenre] = useState<StoryGenre>('All');

  const genres: StoryGenre[] = [
    'All',
    'Mystery',
    'Detective',
    'Adventure',
    'Fantasy',
    'Comedy',
    'Friendship'
  ];

  const filteredStories = stories.filter((s) => {
    if (selectedGenre === 'All') return true;
    return s.genre === selectedGenre;
  });

  return (
    <div className="w-full h-full flex-1 overflow-y-auto pb-6 bg-[#0E0824] text-white select-none">
      {/* Top Header */}
      <div className="px-5 pt-4 pb-3 bg-gradient-to-b from-[#1A1038] to-[#0E0824] border-b border-violet-900/20 sticky top-0 z-20 backdrop-blur-md">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-xl font-extrabold text-white font-['Outfit']">
              Interactive Stories
            </h1>
            <p className="text-xs text-slate-400">
              Branching narratives shaped purely by your decisions
            </p>
          </div>
          <span className="p-2 rounded-xl bg-violet-900/30 border border-violet-700/30 text-violet-300">
            <BookOpen size={18} />
          </span>
        </div>

        {/* Genre filter chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {genres.map((g) => {
            const isSelected = selectedGenre === g;
            return (
              <button
                key={g}
                onClick={() => setSelectedGenre(g)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-violet-600 text-white shadow-md shadow-violet-900/50'
                    : 'bg-[#181133] hover:bg-[#23184A] text-slate-300 border border-violet-900/30'
                }`}
              >
                {g}
              </button>
            );
          })}
        </div>
      </div>

      {/* Story Cards Grid / List */}
      <div className="px-5 mt-4 space-y-4">
        {filteredStories.map((story) => {
          const progress = progressMap[story.id];
          const percent = progress ? progress.percent : 0;
          const isCompleted = progress?.isCompleted;

          return (
            <div
              key={story.id}
              className="rounded-3xl bg-[#170E33] border border-violet-800/30 shadow-lg overflow-hidden transition-all hover:border-violet-700/50"
            >
              {/* Cover Artwork */}
              <div className="relative">
                <StorySceneIllustration
                  type={story.illustrationType}
                  title={story.title}
                />

                {/* Badges on top of illustration */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-black/70 backdrop-blur-md text-amber-300 border border-amber-400/30">
                    {story.genre}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-black/70 backdrop-blur-md text-slate-300 border border-slate-700">
                    {story.difficulty}
                  </span>
                </div>

                {isCompleted && (
                  <div className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/80 backdrop-blur-md text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>Completed</span>
                  </div>
                )}
              </div>

              {/* Story Details Body */}
              <div className="p-4">
                <h3 className="text-lg font-bold text-white font-['Outfit'] mb-1">
                  {story.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3 line-clamp-2">
                  {story.description}
                </p>

                {/* Progress bar and action */}
                <div className="pt-2 border-t border-violet-900/30 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                      <span>Progress</span>
                      <span className="font-bold text-violet-300">{percent}%</span>
                    </div>
                    <div className="w-full h-2 bg-violet-950 rounded-full overflow-hidden border border-violet-900/40">
                      <div
                        className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => onPlayStory(story.id)}
                    className="px-4 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs shadow-md shadow-violet-900/40 flex items-center gap-1.5 active:scale-95 transition-all shrink-0"
                  >
                    <Play size={13} className="fill-white" />
                    <span>{percent > 0 ? 'Continue' : 'Play'}</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
