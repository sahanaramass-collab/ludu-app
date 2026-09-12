import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { StoryLoopLogo } from './Illustrations';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowTagline(true), 800);
    const timer2 = setTimeout(() => onFinish(), 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onFinish]);

  return (
    <div className="w-full h-full min-h-[500px] flex-1 flex flex-col items-center justify-center bg-gradient-to-b from-[#190F3B] via-[#120B2E] to-[#0A061B] relative overflow-hidden px-6 text-center select-none">
      {/* Background ambient orbs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Center Animated Brand Elements */}
      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-5">
          <StoryLoopLogo size={96} className="filter drop-shadow-2xl" />
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute inset-0 bg-violet-500/20 rounded-full blur-xl -z-10"
          />
        </div>

        {/* App Name */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-4xl font-extrabold tracking-tight text-white mb-2 font-['Outfit']"
        >
          Story<span className="text-violet-400">Loop</span>
        </motion.h1>

        {/* Small Tagline */}
        {showTagline && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium tracking-wide text-violet-200/80 uppercase"
          >
            Chat. Choose. Discover.
          </motion.p>
        )}
      </motion.div>

      {/* Bottom Loading Progress Pill */}
      <div className="absolute bottom-12 flex flex-col items-center gap-2">
        <div className="w-36 h-1.5 bg-violet-950/60 rounded-full overflow-hidden border border-violet-800/30">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-violet-500 via-indigo-400 to-pink-500 rounded-full"
          />
        </div>
        <span className="text-[11px] text-slate-500">Loading original stories...</span>
      </div>

      {/* Skip button for quick dev preview */}
      <button
        onClick={onFinish}
        className="absolute top-4 right-4 text-xs text-slate-400 hover:text-white px-3 py-1 rounded-full bg-white/5 border border-white/10"
      >
        Skip
      </button>
    </div>
  );
};
