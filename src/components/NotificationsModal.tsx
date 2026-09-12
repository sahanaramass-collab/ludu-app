import React from 'react';
import { X, Bell, Sparkles, Trophy, MessageSquare, CheckCircle } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsModalProps {
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notifications,
  onClose,
  onMarkAllAsRead
}) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'challenge':
        return <Sparkles size={16} className="text-yellow-400" />;
      case 'reward':
        return <Trophy size={16} className="text-amber-400" />;
      case 'community':
        return <MessageSquare size={16} className="text-cyan-400" />;
      default:
        return <Bell size={16} className="text-violet-400" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="w-full sm:max-w-md bg-[#160E33] border border-violet-700/50 rounded-t-3xl sm:rounded-3xl p-5 text-white shadow-2xl max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-violet-900/30">
          <div className="flex items-center gap-2">
            <Bell size={18} className="text-violet-400" />
            <h3 className="text-base font-bold font-['Outfit']">Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-violet-300 hover:text-white font-medium"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-xl hover:bg-violet-900/40 text-slate-400 transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto py-3 space-y-2.5">
          {notifications.length === 0 ? (
            <p className="text-center text-xs text-slate-400 py-8">
              No notifications at the moment.
            </p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3.5 rounded-2xl border transition-colors flex items-start gap-3 ${
                  n.read
                    ? 'bg-[#120A2B] border-violet-950/60 opacity-80'
                    : 'bg-[#1C1240] border-violet-800/40 shadow-sm'
                }`}
              >
                <div className="p-2 rounded-xl bg-violet-900/30 shrink-0">
                  {getIcon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <h4 className="text-xs font-bold text-white truncate">
                      {n.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 shrink-0">
                      {n.timeAgo}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {n.message}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
