import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Volume2,
  Vibrate,
  Globe,
  Lock,
  UserX,
  HelpCircle,
  Info,
  LogOut,
  AlertCircle,
  Check,
  WifiOff,
  Download,
  FileText,
  Archive
} from 'lucide-react';
import { UserProfile } from '../types';

interface SettingsScreenProps {
  user: UserProfile;
  onBack: () => void;
  onUpdateSettings: (newSettings: UserProfile['settings']) => void;
  onUnblockUser: (username: string) => void;
  onLogout: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  user,
  onBack,
  onUpdateSettings,
  onUnblockUser,
  onLogout
}) => {
  const [notifications, setNotifications] = useState(user.settings.notifications);
  const [soundEffects, setSoundEffects] = useState(user.settings.soundEffects);
  const [hapticFeedback, setHapticFeedback] = useState(user.settings.hapticFeedback);
  const [offlineMode, setOfflineMode] = useState(user.settings.offlineMode);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  const toggleNotifs = () => {
    const val = !notifications;
    setNotifications(val);
    onUpdateSettings({ ...user.settings, notifications: val });
  };

  const toggleSound = () => {
    const val = !soundEffects;
    setSoundEffects(val);
    onUpdateSettings({ ...user.settings, soundEffects: val });
  };

  const toggleHaptic = () => {
    const val = !hapticFeedback;
    setHapticFeedback(val);
    onUpdateSettings({ ...user.settings, hapticFeedback: val });
  };

  const toggleOffline = () => {
    const val = !offlineMode;
    setOfflineMode(val);
    onUpdateSettings({ ...user.settings, offlineMode: val });
  };

  return (
    <div className="w-full h-full flex-1 overflow-y-auto pb-6 bg-[#0E0824] text-white select-none relative">
      {/* Header */}
      <header className="px-4 py-3 bg-[#170E33] border-b border-violet-900/30 flex items-center gap-3 sticky top-0 z-20 backdrop-blur-md">
        <button
          onClick={onBack}
          className="p-1.5 rounded-xl hover:bg-violet-900/30 text-slate-300 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-base font-bold text-white font-['Outfit']">
          Settings & Safety
        </h1>
      </header>

      <div className="px-5 mt-4 space-y-5">
        {/* Account Summary */}
        <section className="p-4 rounded-2xl bg-[#170E33] border border-violet-800/30">
          <span className="text-[10px] uppercase font-bold text-violet-300 tracking-wider">
            Connected Account
          </span>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white">{user.username}</h3>
              <p className="text-xs text-slate-400">{user.email}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800/40 text-[10px] font-bold">
              Active
            </span>
          </div>
        </section>

        {/* Preferences Switches (Material 3 Toggle Style) */}
        <section className="space-y-2">
          <span className="text-[11px] font-bold text-violet-300/80 uppercase tracking-wider px-1">
            Preferences & Hardware
          </span>

          <div className="rounded-2xl bg-[#170E33] border border-violet-800/30 divide-y divide-violet-900/30">
            {/* Notifications */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-violet-900/30 text-violet-300">
                  <Bell size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Push Notifications</h4>
                  <p className="text-[11px] text-slate-400">Daily challenges and story chapters</p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleNotifs}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  notifications ? 'bg-violet-600 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md" />
              </button>
            </div>

            {/* Sound Effects */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-violet-900/30 text-violet-300">
                  <Volume2 size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Sound Effects</h4>
                  <p className="text-[11px] text-slate-400">Audio clicks and choice cues</p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleSound}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  soundEffects ? 'bg-violet-600 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md" />
              </button>
            </div>

            {/* Haptic Feedback */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-violet-900/30 text-violet-300">
                  <Vibrate size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Haptic Feedback</h4>
                  <p className="text-[11px] text-slate-400">Vibrations on decision clicks</p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleHaptic}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  hapticFeedback ? 'bg-violet-600 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md" />
              </button>
            </div>

            {/* Offline Simulation Mode */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-900/30 text-amber-300">
                  <WifiOff size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Simulate Offline Mode</h4>
                  <p className="text-[11px] text-slate-400">Test local cache & story offline reading</p>
                </div>
              </div>
              <button
                type="button"
                onClick={toggleOffline}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors ${
                  offlineMode ? 'bg-amber-500 justify-end' : 'bg-slate-700 justify-start'
                }`}
              >
                <div className="w-4 h-4 rounded-full bg-white shadow-md" />
              </button>
            </div>
          </div>
        </section>

        {/* Content Moderation & Blocked Users */}
        <section className="space-y-2">
          <span className="text-[11px] font-bold text-violet-300/80 uppercase tracking-wider px-1">
            Safety & Moderation
          </span>

          <div className="p-4 rounded-2xl bg-[#170E33] border border-violet-800/30 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <UserX size={16} className="text-slate-400" />
                <h4 className="text-xs font-bold text-white">Blocked Users</h4>
              </div>
              <span className="text-xs text-slate-400">
                {user.blockedUsers.length} blocked
              </span>
            </div>

            {user.blockedUsers.length === 0 ? (
              <p className="text-xs text-slate-400">No users blocked. Your chat feed is clean.</p>
            ) : (
              <div className="space-y-1.5 pt-1">
                {user.blockedUsers.map((u) => (
                  <div
                    key={u}
                    className="flex items-center justify-between p-2 rounded-xl bg-[#130B2A] text-xs"
                  >
                    <span className="text-slate-300">{u}</span>
                    <button
                      onClick={() => onUnblockUser(u)}
                      className="text-violet-400 hover:text-violet-300 font-semibold"
                    >
                      Unblock
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Download All Files Section */}
        <section className="space-y-2">
          <span className="text-[11px] font-bold text-violet-300/80 uppercase tracking-wider px-1">
            Download Project Files (জিপ ও সোর্স ফাইল ডাউনলোড)
          </span>

          <div className="rounded-2xl bg-[#170E33] border border-violet-800/30 divide-y divide-violet-900/30 overflow-hidden">
            {/* Direct ZIP Download */}
            <a
              href="/storyloop-app.zip"
              download="storyloop-app.zip"
              className="w-full p-4 flex items-center justify-between text-left bg-gradient-to-r from-violet-900/40 via-indigo-900/30 to-violet-900/40 hover:from-violet-900/60 hover:to-indigo-900/50 transition-all border-b border-violet-700/40"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Archive size={22} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">Project ZIP File (storyloop-app.zip)</h4>
                    <span className="px-1.5 py-0.5 rounded bg-amber-400 text-slate-950 font-extrabold text-[9px]">
                      ZIP
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 mt-0.5">সব ফাইল একসাথে একটি মাত্র জিপ ফাইলের মধ্যে (~169 KB)</p>
                </div>
              </div>
              <span className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shrink-0 shadow-lg shadow-amber-950/40 flex items-center gap-1.5">
                <Download size={14} />
                <span>Download ZIP</span>
              </span>
            </a>

            {/* Single Text File */}
            <a
              href="/ALL_PROJECT_FILES.txt"
              download="ALL_PROJECT_FILES.txt"
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-violet-900/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-violet-900/40 text-violet-300">
                  <FileText size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Single Text File (ALL_PROJECT_FILES.txt)</h4>
                  <p className="text-[11px] text-slate-400">প্রতিটি কোড ফাইল পরপর সাজানো টেক্সট ফাইল</p>
                </div>
              </div>
              <span className="p-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white shrink-0 shadow-md">
                <Download size={15} />
              </span>
            </a>
          </div>
        </section>

        {/* Support, About & Log out */}
        <section className="space-y-2">
          <span className="text-[11px] font-bold text-violet-300/80 uppercase tracking-wider px-1">
            About & Community
          </span>

          <div className="rounded-2xl bg-[#170E33] border border-violet-800/30 divide-y divide-violet-900/30">
            <button
              onClick={() => setShowHelpModal(true)}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-violet-900/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <HelpCircle size={18} className="text-violet-400" />
                <div>
                  <h4 className="text-xs font-bold text-white">Help & Safety Guidelines</h4>
                  <p className="text-[11px] text-slate-400">Age-safe community standards</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setShowAboutModal(true)}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-violet-900/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Info size={18} className="text-violet-400" />
                <div>
                  <h4 className="text-xs font-bold text-white">About StoryLoop</h4>
                  <p className="text-[11px] text-slate-400">Version 1.0.0 • Clean Architecture</p>
                </div>
              </div>
            </button>
          </div>

          <button
            onClick={onLogout}
            className="w-full mt-3 p-3.5 rounded-2xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 font-bold text-xs flex items-center justify-center gap-2 transition-colors active:scale-95"
          >
            <LogOut size={16} />
            <span>Log Out</span>
          </button>
        </section>
      </div>

      {/* Safety Help Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-5">
          <div className="w-full max-w-sm bg-[#1A103A] border border-violet-700/50 rounded-3xl p-5 text-white shadow-2xl space-y-3">
            <h3 className="text-base font-bold font-['Outfit']">
              Community Safety Guidelines
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              StoryLoop is designed as a friendly, cooperative environment focused on
              mysteries, team challenges, science puzzles, and creative storytelling.
            </p>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc pl-4">
              <li>No romantic, sexual, or intimate roleplay.</li>
              <li>Respect all community members in chat rooms.</li>
              <li>Use the Report button for disruptive or inappropriate content.</li>
            </ul>
            <button
              onClick={() => setShowHelpModal(false)}
              className="w-full mt-2 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-xl text-xs font-bold"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* About Modal */}
      {showAboutModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-5">
          <div className="w-full max-w-sm bg-[#1A103A] border border-violet-700/50 rounded-3xl p-5 text-white shadow-2xl space-y-3">
            <h3 className="text-base font-bold font-['Outfit']">About StoryLoop</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong>StoryLoop</strong> ("Chat. Choose. Discover.") is an original
              social interactive-story application built with Jetpack Compose & Clean
              Architecture design principles, local persistence, and real-time chat
              rooms.
            </p>
            <p className="text-[11px] text-slate-400">
              Completely original artwork, narrative scripts, and branding.
            </p>
            <button
              onClick={() => setShowAboutModal(false)}
              className="w-full mt-2 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-xl text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
