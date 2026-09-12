import React, { useState, useRef, useEffect } from 'react';
import {
  ArrowLeft,
  MoreVertical,
  Send,
  Smile,
  ShieldAlert,
  VolumeX,
  Volume2,
  UserX,
  LogOut,
  Check,
  AlertTriangle,
  Users
} from 'lucide-react';
import { ChatRoom, ChatMessage, UserProfile } from '../types';
import { BOT_REPLIES } from '../data/mockRooms';

interface ChatRoomScreenProps {
  room: ChatRoom;
  messages: ChatMessage[];
  user: UserProfile;
  onBack: () => void;
  onSendMessage: (text: string) => void;
  onReportMessage: (messageId: string, reason: string) => void;
  onBlockUser: (userName: string) => void;
  onToggleMuteRoom: (roomId: string) => void;
}

export const ChatRoomScreen: React.FC<ChatRoomScreenProps> = ({
  room,
  messages,
  user,
  onBack,
  onSendMessage,
  onReportMessage,
  onBlockUser,
  onToggleMuteRoom
}) => {
  const [inputText, setInputText] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedMessageForReport, setSelectedMessageForReport] = useState<ChatMessage | null>(null);
  const [reportReason, setReportReason] = useState('Inappropriate tone');
  const [reportSuccess, setReportSuccess] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isMuted = user.mutedRooms.includes(room.id);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(inputText.trim());
    setInputText('');
    setShowEmojiPicker(false);
  };

  const quickEmojis = ['💡', '🔍', '🙌', '✨', '📖', '🚀', '🔥', '👏'];

  const submitReport = () => {
    if (selectedMessageForReport) {
      onReportMessage(selectedMessageForReport.id, reportReason);
      setReportSuccess(true);
      setTimeout(() => {
        setReportSuccess(false);
        setSelectedMessageForReport(null);
      }, 1500);
    }
  };

  return (
    <div className="w-full h-full flex-1 flex flex-col bg-[#0B061D] text-white relative overflow-hidden select-none">
      {/* Top Header */}
      <header className="px-4 py-3 bg-[#170E33] border-b border-violet-900/30 flex items-center justify-between z-20">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1.5 rounded-xl hover:bg-violet-900/30 text-slate-300 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-white font-['Outfit'] truncate max-w-[170px]">
                {room.name}
              </h2>
              {isMuted && <VolumeX size={13} className="text-amber-400" />}
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{room.activeUsers} members online</span>
            </div>
          </div>
        </div>

        {/* Room Menu Toggle */}
        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-xl hover:bg-violet-900/30 text-slate-300 transition-colors"
          >
            <MoreVertical size={18} />
          </button>

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="absolute right-0 top-10 w-48 bg-[#1F1445] border border-violet-700/40 rounded-2xl shadow-2xl p-1.5 z-40 text-xs text-slate-200">
              <button
                onClick={() => {
                  onToggleMuteRoom(room.id);
                  setShowMenu(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-violet-800/40 text-left transition-colors"
              >
                {isMuted ? <Volume2 size={15} /> : <VolumeX size={15} />}
                <span>{isMuted ? 'Unmute Room' : 'Mute Notifications'}</span>
              </button>

              <button
                onClick={() => {
                  setShowMenu(false);
                  onBack();
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl hover:bg-violet-800/40 text-left transition-colors"
              >
                <LogOut size={15} />
                <span>Leave Room</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Safety Banner */}
      <div className="px-4 py-1.5 bg-violet-950/40 border-b border-violet-900/20 text-[10px] text-violet-300 flex items-center justify-between">
        <span className="flex items-center gap-1">
          <ShieldAlert size={12} className="text-violet-400" />
          <span>StoryLoop Safe Zone • Respectful, friendly mystery discussions</span>
        </span>
      </div>

      {/* Message List Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <Users size={36} className="text-violet-500/40 mb-2" />
            <p className="text-sm font-semibold text-slate-300">No messages yet</p>
            <p className="text-xs text-slate-500 max-w-xs mt-1">
              Be the first to share your thoughts on choices or ask for puzzle clues!
            </p>
          </div>
        ) : (
          messages.map((msg) => {
            const isMe = msg.isCurrentUser;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                {/* Sender name for other users */}
                {!isMe && (
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[11px] font-bold text-violet-300">
                      {msg.senderName}
                    </span>
                    {msg.isModerator && (
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-violet-600 text-white">
                        MOD
                      </span>
                    )}
                  </div>
                )}

                <div
                  className={`group relative max-w-[82%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    isMe
                      ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-br-sm'
                      : 'bg-[#1C143B] text-slate-200 border border-violet-800/30 rounded-bl-sm'
                  }`}
                >
                  <p className="whitespace-pre-wrap break-words">{msg.text}</p>

                  <div
                    className={`mt-1 flex items-center gap-1.5 text-[10px] ${
                      isMe ? 'text-violet-200 justify-end' : 'text-slate-400'
                    }`}
                  >
                    <span>{msg.timestamp}</span>
                    {isMe && <Check size={11} className="text-violet-200" />}

                    {/* Report action for other users */}
                    {!isMe && (
                      <button
                        onClick={() => setSelectedMessageForReport(msg)}
                        title="Report inappropriate message"
                        className="opacity-0 group-hover:opacity-100 hover:text-red-400 ml-1 transition-opacity"
                      >
                        <ShieldAlert size={11} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Emoji Drawer if open */}
      {showEmojiPicker && (
        <div className="px-4 py-2 bg-[#170E33] border-t border-violet-900/30 flex items-center gap-2 overflow-x-auto">
          {quickEmojis.map((emoji) => (
            <button
              key={emoji}
              onClick={() => setInputText((prev) => prev + emoji)}
              className="text-lg hover:scale-125 transition-transform p-1"
            >
              {emoji}
            </button>
          ))}
        </div>
      )}

      {/* Bottom Text Input Bar */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-[#130B2B] border-t border-violet-900/30 flex items-center gap-2"
      >
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="p-2 rounded-xl text-slate-400 hover:text-violet-300 hover:bg-violet-900/20 transition-colors"
        >
          <Smile size={20} />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Write a message..."
          className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#1D143D] border border-violet-800/40 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-violet-500 transition-colors"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className="p-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:opacity-40 disabled:hover:bg-violet-600 text-white shadow-md shadow-violet-900/40 active:scale-95 transition-all"
        >
          <Send size={16} />
        </button>
      </form>

      {/* Safety Report Modal */}
      {selectedMessageForReport && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-5">
          <div className="w-full max-w-sm bg-[#1A103A] border border-violet-700/50 rounded-3xl p-5 text-white shadow-2xl">
            <div className="flex items-center gap-2 text-amber-400 mb-2">
              <AlertTriangle size={18} />
              <h3 className="text-sm font-bold">Report Community Message</h3>
            </div>

            <p className="text-xs text-slate-300 mb-3">
              Reporting keeps StoryLoop safe and friendly for all ages. What is the
              issue with this message?
            </p>

            <div className="p-2.5 rounded-xl bg-[#120A2B] border border-violet-900/40 text-xs text-slate-300 mb-3 italic">
              "{selectedMessageForReport.text}"
            </div>

            <div className="space-y-2 mb-4">
              {[
                'Inappropriate tone',
                'Unwanted contact',
                'Spoilers without warning',
                'Spam / Advertising'
              ].map((reason) => (
                <label
                  key={reason}
                  className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer p-1.5 rounded-lg hover:bg-violet-900/20"
                >
                  <input
                    type="radio"
                    name="reportReason"
                    value={reason}
                    checked={reportReason === reason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="accent-violet-500"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>

            {reportSuccess ? (
              <div className="p-3 bg-emerald-500/20 text-emerald-300 rounded-xl text-xs font-semibold text-center">
                Report submitted! Our safety moderators have been notified.
              </div>
            ) : (
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    onBlockUser(selectedMessageForReport.senderName);
                    setSelectedMessageForReport(null);
                  }}
                  className="px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10 rounded-xl"
                >
                  Block User
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMessageForReport(null)}
                  className="px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={submitReport}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  Submit Report
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
