import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import {
  OnboardingIllustration1,
  OnboardingIllustration2,
  OnboardingIllustration3
} from './Illustrations';

interface OnboardingScreenProps {
  onComplete: () => void;
}

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({ onComplete }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const pages = [
    {
      title: 'Meet New Stories',
      description:
        'Immerse yourself in original branching mysteries, school adventures, sci-fi inventions, and playful team challenges designed for everyone.',
      illustration: <OnboardingIllustration1 />
    },
    {
      title: 'Your Choices Matter',
      description:
        'Every decision unlocks new clues, deepens team friendships, alters narrative paths, and leads toward distinct triumphant endings.',
      illustration: <OnboardingIllustration2 />
    },
    {
      title: 'Play Together',
      description:
        'Join safe, respectful public chat rooms to discuss puzzle clues, brainstorm theories, and celebrate shared story milestones together.',
      illustration: <OnboardingIllustration3 />
    }
  ];

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage((prev) => prev + 1);
    } else {
      onComplete();
    }
  };

  const page = pages[currentPage];

  return (
    <div className="w-full h-full flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-[#130B2E] via-[#0F0824] to-[#0A0618] text-white select-none relative overflow-hidden">
      {/* Top Header with Skip Button */}
      <div className="flex items-center justify-between z-10 pt-2">
        <div className="flex items-center gap-1.5 text-xs text-violet-300 font-semibold uppercase tracking-wider">
          <Sparkles size={14} className="text-yellow-400" />
          <span>StoryLoop Guide</span>
        </div>

        {currentPage < pages.length - 1 && (
          <button
            onClick={onComplete}
            className="text-xs font-medium text-slate-400 hover:text-white px-3 py-1 rounded-full bg-white/5 border border-white/10 transition-colors"
          >
            Skip
          </button>
        )}
      </div>

      {/* Main Carousel Area with Motion */}
      <div className="flex-1 flex flex-col items-center justify-center my-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -25 }}
            transition={{ duration: 0.3 }}
            className="w-full flex flex-col items-center text-center"
          >
            {/* Visual Illustration */}
            <div className="w-full mb-6">
              {page.illustration}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-white mb-3 tracking-tight font-['Outfit']">
              {page.title}
            </h2>

            {/* Description */}
            <p className="text-sm text-slate-300 max-w-xs leading-relaxed">
              {page.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Controls: Indicators + Action Button */}
      <div className="w-full flex flex-col gap-4 z-10 pb-2">
        {/* Page Indicators */}
        <div className="flex items-center justify-center gap-2">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? 'w-7 bg-violet-400'
                  : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={handleNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-base shadow-lg shadow-violet-900/40 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <span>{currentPage === pages.length - 1 ? 'Get Started' : 'Next'}</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};
