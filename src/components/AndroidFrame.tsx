import React, { useState } from 'react';
import { Wifi, Battery, Smartphone, Maximize2 } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
  currentTime?: string;
  isOffline?: boolean;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({
  children,
  currentTime = '12:06',
  isOffline = false
}) => {
  const [deviceMode, setDeviceMode] = useState<'mobile' | 'fluid'>('mobile');

  return (
    <div className="min-h-screen bg-[#070412] text-slate-100 flex flex-col items-center justify-start p-0 md:py-6 md:px-4">
      {/* Top Bar for Desktop Preview / Toggle */}
      <header className="w-full max-w-md md:max-w-xl mb-2 hidden md:flex items-center justify-between px-3 py-1.5 text-xs text-slate-400 bg-violet-950/40 border border-violet-900/40 rounded-xl backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-slate-300">StoryLoop Android Experience</span>
          {isOffline && (
            <span className="px-2 py-0.5 text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
              Offline Cache Mode
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
              deviceMode === 'mobile'
                ? 'bg-violet-600 text-white font-medium shadow-md shadow-violet-600/30'
                : 'hover:bg-violet-900/30 text-slate-400'
            }`}
          >
            <Smartphone size={13} />
            Phone Frame
          </button>
          <button
            onClick={() => setDeviceMode('fluid')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-all ${
              deviceMode === 'fluid'
                ? 'bg-violet-600 text-white font-medium shadow-md shadow-violet-600/30'
                : 'hover:bg-violet-900/30 text-slate-400'
            }`}
          >
            <Maximize2 size={13} />
            Expanded
          </button>
        </div>
      </header>

      {/* Frame Container */}
      <div
        className={`w-full transition-all duration-300 ${
          deviceMode === 'mobile'
            ? 'max-w-[430px] md:h-[870px] md:rounded-[44px] md:border-[10px] md:border-slate-800 md:shadow-2xl md:shadow-violet-950/60 ring-1 ring-white/10'
            : 'max-w-2xl min-h-[90vh] md:rounded-3xl md:border md:border-violet-900/40'
        } relative flex flex-col bg-[#0F0B21] overflow-hidden`}
      >
        {/* Android Status Bar */}
        <div className="w-full h-9 px-6 flex items-center justify-between text-xs text-slate-300 bg-[#0F0B21]/90 backdrop-blur-md z-40 select-none">
          <span className="font-semibold tracking-wide text-xs">{currentTime}</span>

          {/* Camera punch-hole */}
          <div className="w-3.5 h-3.5 rounded-full bg-black/90 border border-slate-700/50 shadow-inner" />

          <div className="flex items-center gap-1.5 text-[11px]">
            <span className="text-[10px] font-bold text-slate-400">5G</span>
            <Wifi size={13} className="text-slate-300" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] font-semibold">98%</span>
              <Battery size={13} className="text-slate-200 fill-slate-200" />
            </div>
          </div>
        </div>

        {/* Offline Banner alert if active */}
        {isOffline && (
          <div className="bg-amber-600 text-slate-950 px-4 py-1.5 text-center text-xs font-semibold flex items-center justify-center gap-1.5">
            <span>⚠️ You're offline — Cached stories and progress active</span>
          </div>
        )}

        {/* Main Screen Content Viewport */}
        <div className="flex-1 flex flex-col overflow-hidden relative">
          {children}
        </div>

        {/* Android Gesture Navigation Bar */}
        <div className="w-full h-5 flex items-center justify-center bg-[#0F0B21] z-40 pb-1">
          <div className="w-32 h-1 bg-slate-500/40 rounded-full" />
        </div>
      </div>
    </div>
  );
};
