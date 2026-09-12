import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft,
  Coins,
  Sparkles,
  Trophy,
  Users,
  Compass,
  RotateCcw,
  CheckCircle2,
  Bookmark
} from 'lucide-react';
import { Story, Choice, StoryProgress } from '../types';
import { StorySceneIllustration } from './Illustrations';

interface StoryPlayerScreenProps {
  story: Story;
  currentProgress?: StoryProgress;
  onBack: () => void;
  onMakeChoice: (choice: Choice, nextSceneId: string, isEnding?: boolean) => void;
  onRestartStory: (storyId: string) => void;
}

export const StoryPlayerScreen: React.FC<StoryPlayerScreenProps> = ({
  story,
  currentProgress,
  onBack,
  onMakeChoice,
  onRestartStory
}) => {
  const currentSceneId = currentProgress?.currentSceneId || story.initialSceneId;
  const currentScene = story.scenes[currentSceneId] || story.scenes[story.initialSceneId];

  const [selectedChoiceId, setSelectedChoiceId] = useState<string | null>(null);
  const [animatingScene, setAnimatingScene] = useState(false);
  const [clueNotice, setClueNotice] = useState<string | null>(null);

  const chapterNum = currentScene?.chapterNumber || 1;
  const totalChapters = story.totalChapters;
  const progressPercent = Math.round((chapterNum / totalChapters) * 100);

  const handleChoiceClick = (choice: Choice) => {
    if (animatingScene || selectedChoiceId) return;

    setSelectedChoiceId(choice.id);

    if (choice.clueGained) {
      setClueNotice(choice.clueGained);
    }

    // Short animation delay for selection feedback
    setTimeout(() => {
      setAnimatingScene(true);
      setTimeout(() => {
        onMakeChoice(choice, choice.nextSceneId, false);
        setSelectedChoiceId(null);
        setAnimatingScene(false);
        setClueNotice(null);
      }, 400);
    }, 600);
  };

  const choiceLetter = (index: number) => String.fromCharCode(65 + index); // A, B, C, D

  return (
    <div className="w-full h-full flex-1 flex flex-col justify-between bg-[#0B061D] text-white select-none relative overflow-hidden">
      {/* Top Gameplay Header */}
      <header className="px-4 py-3 bg-[#160E33] border-b border-violet-900/30 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl hover:bg-violet-900/30 text-slate-300 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="text-sm font-bold text-white font-['Outfit'] truncate max-w-[170px]">
              {story.title}
            </h2>
            <span className="text-[11px] text-violet-300">
              Chapter {chapterNum} of {totalChapters}
            </span>
          </div>
        </div>

        {/* Progress Pill */}
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-violet-950 rounded-full overflow-hidden border border-violet-800/30">
            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-400 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs font-bold text-violet-300">{progressPercent}%</span>
        </div>
      </header>

      {/* Floating Clue Notification Notice */}
      <AnimatePresence>
        {clueNotice && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-14 left-4 right-4 z-40 bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold"
          >
            <Bookmark size={15} />
            <span>New Clue Unlocked: "{clueNotice}"</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scene Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Large Original Illustration */}
        <div className="w-full rounded-2xl overflow-hidden shadow-xl border border-violet-800/40">
          <StorySceneIllustration
            type={currentScene.illustrationType}
            title={currentScene.title}
          />
        </div>

        {/* Speaker & Scene Title Badge */}
        {currentScene.speaker && (
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-violet-900/40 border border-violet-700/40 text-xs font-bold text-violet-300">
              {currentScene.speaker}
              {currentScene.speakerRole && ` • ${currentScene.speakerRole}`}
            </span>
            <span className="text-xs text-slate-400 font-medium">
              {currentScene.title}
            </span>
          </div>
        )}

        {/* Narrative Text Box */}
        <div className="p-4 rounded-2xl bg-[#18103A] border border-violet-800/40 shadow-inner">
          <p className="text-sm text-slate-100 leading-relaxed font-normal">
            {currentScene.narrative}
          </p>
        </div>

        {/* Clues accumulated so far in this story */}
        {currentProgress && currentProgress.clues.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto py-1 text-[11px] text-slate-400">
            <span className="shrink-0 font-semibold text-violet-300 flex items-center gap-1">
              <Sparkles size={12} className="text-yellow-400" />
              Journal Clues:
            </span>
            {currentProgress.clues.map((c, i) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-lg bg-violet-950/80 border border-violet-800/40 text-violet-200 shrink-0"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Area: Choices or Victory Ending */}
      <div className="p-4 bg-[#140C30] border-t border-violet-900/30">
        {currentScene.isEnding ? (
          /* Ending Victory / Resolution Screen */
          <div className="flex flex-col items-center text-center py-2 space-y-3">
            <div className="w-14 h-14 rounded-3xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 animate-bounce">
              <Trophy size={28} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white font-['Outfit']">
                Chapter Complete!
              </h3>
              <p className="text-xs text-violet-300/90 mt-0.5">
                Outcome: {currentScene.endingType?.toUpperCase()} • Safe & Triumphant
              </p>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-400/10 border border-amber-400/20 rounded-full text-amber-300 text-xs font-bold">
              <Coins size={14} className="fill-amber-400" />
              <span>+35 Story Coins Earned!</span>
            </div>

            <div className="w-full flex items-center gap-2 pt-2">
              <button
                onClick={() => onRestartStory(story.id)}
                className="flex-1 py-3 rounded-xl bg-[#22164A] hover:bg-[#2C1D60] text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw size={14} />
                <span>Replay Other Choices</span>
              </button>

              <button
                onClick={onBack}
                className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md shadow-violet-900/40 flex items-center justify-center gap-1.5 transition-all"
              >
                <CheckCircle2 size={14} />
                <span>Story Library</span>
              </button>
            </div>
          </div>
        ) : (
          /* Branching Choices 2-4 buttons */
          <div className="space-y-2.5">
            <span className="block text-[11px] font-bold text-violet-300/80 uppercase tracking-wider mb-1">
              What do you do next?
            </span>

            {currentScene.choices.map((choice, index) => {
              const isSelected = selectedChoiceId === choice.id;
              const letter = choiceLetter(index);

              return (
                <button
                  key={choice.id}
                  onClick={() => handleChoiceClick(choice)}
                  disabled={Boolean(selectedChoiceId)}
                  className={`w-full text-left p-3.5 rounded-2xl transition-all duration-200 flex items-start gap-3 border ${
                    isSelected
                      ? 'bg-violet-600 border-yellow-400 scale-[0.99] shadow-lg shadow-violet-900/50 text-white'
                      : 'bg-[#1D143D] hover:bg-[#251A4D] border-violet-800/40 text-slate-200 active:scale-[0.98]'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected
                        ? 'bg-yellow-400 text-slate-950 font-extrabold'
                        : 'bg-violet-900/50 text-violet-300 border border-violet-700/50'
                    }`}
                  >
                    {letter}
                  </div>

                  <div className="flex-1">
                    <p className="text-xs font-semibold leading-snug">
                      {choice.text}
                    </p>

                    <div className="flex items-center gap-2 mt-1">
                      {choice.tag && (
                        <span className="text-[10px] font-bold text-violet-300/80">
                          [{choice.tag}]
                        </span>
                      )}
                      {choice.rewardCoins && (
                        <span className="flex items-center gap-0.5 text-[10px] text-amber-400 font-medium">
                          <Coins size={10} className="fill-amber-400" />
                          +{choice.rewardCoins} coins
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
