import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { StoryLoopLogo } from './Illustrations';

interface AuthScreenProps {
  onSuccess: (email: string, username: string) => void;
  onGuestLogin: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess, onGuestLogin }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('alex.explorer@storyloop.app');
  const [password, setPassword] = useState('adventure2026');
  const [username, setUsername] = useState('Alex_Explorer');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forgotSent, setForgotSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (isSignUp && (!username || username.trim().length < 3)) {
      setError('Username must be at least 3 characters.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onSuccess(email, isSignUp ? username : email.split('@')[0]);
    }, 600);
  };

  const handleForgotPassword = () => {
    if (!email) {
      setError('Enter your email above to receive a reset link.');
      return;
    }
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 4000);
  };

  return (
    <div className="w-full h-full flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-[#150D32] via-[#0F0A25] to-[#0A061B] text-white overflow-y-auto">
      {/* Top Header Branding */}
      <div className="flex flex-col items-center text-center pt-2">
        <StoryLoopLogo size={56} className="mb-2" />
        <h2 className="text-2xl font-bold font-['Outfit'] text-white">
          {isSignUp ? 'Join StoryLoop' : 'Welcome Back'}
        </h2>
        <p className="text-xs text-violet-300/80 mt-1">
          {isSignUp
            ? 'Create an account to save choices & story badges'
            : 'Sign in to resume your interactive adventures'}
        </p>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="w-full my-4 flex flex-col gap-3.5">
        {error && (
          <div className="p-3 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 text-xs flex items-center gap-2">
            <AlertCircle size={15} className="shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        {forgotSent && (
          <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 size={15} className="shrink-0 text-emerald-400" />
            <span>Password reset instructions dispatched to your email!</span>
          </div>
        )}

        {/* Username field if Sign Up */}
        {isSignUp && (
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Explorer Username
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Maya_Sleuth"
                className="w-full px-3.5 py-3 rounded-xl bg-[#1D163A] border border-violet-800/40 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
              />
            </div>
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#1D163A] border border-violet-800/40 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-xs font-semibold text-slate-300">
              Password
            </label>
            {!isSignUp && (
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-[11px] text-violet-400 hover:text-violet-300"
              >
                Forgot Password?
              </button>
            )}
          </div>
          <div className="relative">
            <Lock size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#1D163A] border border-violet-800/40 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-200"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-700 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-md shadow-violet-900/40 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          {isLoading ? (
            <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>{isSignUp ? 'Create Account' : 'Continue'}</span>
              <ArrowRight size={16} />
            </>
          )}
        </button>

        {/* Google / Quick Login */}
        <button
          type="button"
          onClick={() => onSuccess('demo.google@storyloop.app', 'Google_Explorer')}
          className="w-full py-3 rounded-xl bg-[#16102E] hover:bg-[#1E173E] border border-slate-700/50 text-xs font-medium text-slate-200 flex items-center justify-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.4l3.7 2.9C6.5 7.4 9 5 12 5z"
            />
            <path
              fill="#4285F4"
              d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
            />
            <path
              fill="#FBBC05"
              d="M5.6 14.7c-.2-.7-.4-1.4-.4-2.2s.2-1.5.4-2.2L1.9 7.4C.7 9.8 0 12.4 0 15.2s.7 5.4 1.9 7.8l3.7-2.9z"
            />
            <path
              fill="#34A853"
              d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.3L1.9 16.4C3.7 20.2 7.5 23.5 12 23.5z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>

        {/* Quick Guest Explorer */}
        <button
          type="button"
          onClick={onGuestLogin}
          className="text-xs text-slate-400 hover:text-violet-300 py-1"
        >
          Or continue as <strong className="text-violet-300">Guest Explorer</strong>
        </button>
      </form>

      {/* Bottom Switch between Sign In / Sign Up */}
      <div className="pt-2 text-center text-xs text-slate-400 border-t border-violet-900/30">
        {isSignUp ? (
          <p>
            Already have an account?{' '}
            <button
              onClick={() => {
                setIsSignUp(false);
                setError(null);
              }}
              className="text-violet-400 font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
        ) : (
          <p>
            New to StoryLoop?{' '}
            <button
              onClick={() => {
                setIsSignUp(true);
                setError(null);
              }}
              className="text-violet-400 font-bold hover:underline"
            >
              Create Account
            </button>
          </p>
        )}
      </div>
    </div>
  );
};
