import React from 'react';

// Original abstract speech-bubble + looping-arrow logo
export const StoryLoopLogo: React.FC<{ size?: number; className?: string }> = ({ size = 64, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="bubbleGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8B5CF6" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
        <linearGradient id="arrowGrad" x1="30" y1="20" x2="80" y2="70" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
        <filter id="softGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#4F46E5" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Main speech bubble body */}
      <path
        d="M20 22C20 15.3726 25.3726 10 32 10H68C74.6274 10 80 15.3726 80 22V58C80 64.6274 74.6274 70 68 70H42L26 84V70H32C25.3726 70 20 64.6274 20 58V22Z"
        fill="url(#bubbleGrad)"
        filter="url(#softGlow)"
      />

      {/* Inner looped dynamic arrow */}
      <path
        d="M36 34C40 28 58 26 64 34C70 42 66 52 56 54C48 56 42 50 42 46"
        stroke="url(#arrowGrad)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <polygon
        points="34,48 44,46 41,37"
        fill="#F59E0B"
      />

      {/* Sparkle loop elements */}
      <circle cx="34" cy="30" r="3" fill="#FDE047" />
      <circle cx="68" cy="52" r="3.5" fill="#FFFFFF" />
      <circle cx="50" cy="40" r="4" fill="#FFFFFF" />
    </svg>
  );
};

// Onboarding 1: Meet New Stories (Multiple characters talking around floating message bubbles)
export const OnboardingIllustration1: React.FC = () => {
  return (
    <div className="relative w-full h-56 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-violet-600/20 to-indigo-900/40 rounded-2xl blur-xl" />
      <svg viewBox="0 0 320 200" className="w-full h-full max-w-[300px]">
        <defs>
          <linearGradient id="chGrad1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
          <linearGradient id="chGrad2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#DB2777" />
          </linearGradient>
          <linearGradient id="bubble1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>

        {/* Character 1 (Left - Friendly reader) */}
        <ellipse cx="80" cy="165" rx="35" ry="12" fill="#1E1B4B" opacity="0.6" />
        <rect x="55" y="105" width="50" height="60" rx="16" fill="url(#chGrad1)" />
        <circle cx="80" cy="80" r="22" fill="#FDE047" />
        {/* Hair and spectacles */}
        <path d="M60 78C60 62 100 62 100 78C90 68 70 68 60 78Z" fill="#312E81" />
        <circle cx="73" cy="82" r="4" fill="#1E1B4B" />
        <circle cx="87" cy="82" r="4" fill="#1E1B4B" />
        <path d="M76 92C78 95 82 95 84 92" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />

        {/* Character 2 (Right - Adventurer with cap) */}
        <ellipse cx="240" cy="165" rx="35" ry="12" fill="#1E1B4B" opacity="0.6" />
        <rect x="215" y="105" width="50" height="60" rx="16" fill="url(#chGrad2)" />
        <circle cx="240" cy="80" r="22" fill="#FCD34D" />
        <path d="M218 72H262L270 76H218V72Z" fill="#047857" />
        <circle cx="233" cy="82" r="4" fill="#1E1B4B" />
        <circle cx="247" cy="82" r="4" fill="#1E1B4B" />
        <path d="M236 91C238 94 242 94 244 91" stroke="#1E1B4B" strokeWidth="2" strokeLinecap="round" />

        {/* Floating animated message cards / story bubbles */}
        <g className="animate-bounce" style={{ animationDuration: '4s' }}>
          <rect x="110" y="30" width="100" height="42" rx="14" fill="#6366F1" />
          <path d="M135 72L140 82L150 72H135Z" fill="#6366F1" />
          <circle cx="130" cy="51" r="5" fill="#FFFFFF" opacity="0.9" />
          <line x1="144" y1="46" x2="192" y2="46" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <line x1="144" y1="56" x2="175" y2="56" stroke="#C7D2FE" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Secondary floating bubble */}
        <g className="animate-pulse" style={{ animationDuration: '3s' }}>
          <rect x="125" y="105" width="70" height="34" rx="12" fill="url(#bubble1)" />
          <circle cx="145" cy="122" r="3" fill="#FFFFFF" />
          <circle cx="160" cy="122" r="3" fill="#FFFFFF" />
          <circle cx="175" cy="122" r="3" fill="#FFFFFF" />
        </g>

        {/* Star highlights */}
        <circle cx="100" cy="25" r="2" fill="#FDE047" />
        <circle cx="220" cy="35" r="3" fill="#FDE047" />
        <circle cx="160" cy="180" r="2.5" fill="#A78BFA" />
      </svg>
    </div>
  );
};

// Onboarding 2: Your Choices Matter (Character at crossroads with 3 glowing choice cards)
export const OnboardingIllustration2: React.FC = () => {
  return (
    <div className="relative w-full h-56 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-600/20 to-purple-950/40 rounded-2xl blur-xl" />
      <svg viewBox="0 0 320 200" className="w-full h-full max-w-[300px]">
        {/* Crossroads Paths */}
        <path d="M160 200L160 140L60 60" stroke="#4338CA" strokeWidth="12" strokeLinecap="round" opacity="0.5" />
        <path d="M160 140L160 50" stroke="#7C3AED" strokeWidth="12" strokeLinecap="round" opacity="0.7" />
        <path d="M160 140L260 60" stroke="#059669" strokeWidth="12" strokeLinecap="round" opacity="0.5" />

        {/* Hero Character at crossroads */}
        <ellipse cx="160" cy="180" rx="28" ry="8" fill="#0F172A" opacity="0.6" />
        <rect x="146" y="145" width="28" height="32" rx="8" fill="#4F46E5" />
        <circle cx="160" cy="132" r="14" fill="#FDE047" />
        <path d="M150 128C152 120 168 120 170 128" fill="#1E1B4B" />

        {/* Choice Card Left (Mystery) */}
        <g transform="translate(30, 25)">
          <rect width="65" height="45" rx="10" fill="#312E81" stroke="#818CF8" strokeWidth="2" />
          <circle cx="20" cy="22" r="8" fill="#4338CA" />
          <text x="20" y="26" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">A</text>
          <line x1="34" y1="18" x2="56" y2="18" stroke="#C7D2FE" strokeWidth="3" strokeLinecap="round" />
          <line x1="34" y1="26" x2="50" y2="26" stroke="#818CF8" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Choice Card Center (Glowing Choice B) */}
        <g transform="translate(125, 10)">
          <rect width="70" height="50" rx="12" fill="#7C3AED" stroke="#FDE047" strokeWidth="2.5" />
          <circle cx="22" cy="25" r="9" fill="#F59E0B" />
          <text x="22" y="29" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="bold">B</text>
          <line x1="38" y1="20" x2="62" y2="20" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <line x1="38" y1="30" x2="55" y2="30" stroke="#FDE047" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="60" cy="12" r="3" fill="#FDE047" />
        </g>

        {/* Choice Card Right (Teamwork C) */}
        <g transform="translate(225, 25)">
          <rect width="65" height="45" rx="10" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
          <circle cx="20" cy="22" r="8" fill="#059669" />
          <text x="20" y="26" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="bold">C</text>
          <line x1="34" y1="18" x2="56" y2="18" stroke="#A7F3D0" strokeWidth="3" strokeLinecap="round" />
          <line x1="34" y1="26" x2="50" y2="26" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
};

// Onboarding 3: Play Together (Generic avatars connected via chat bubbles & game icons)
export const OnboardingIllustration3: React.FC = () => {
  return (
    <div className="relative w-full h-56 flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-teal-900/40 rounded-2xl blur-xl" />
      <svg viewBox="0 0 320 200" className="w-full h-full max-w-[300px]">
        {/* Network Connection Lines */}
        <line x1="80" y1="70" x2="160" y2="130" stroke="#818CF8" strokeWidth="2.5" strokeDasharray="4 4" />
        <line x1="240" y1="70" x2="160" y2="130" stroke="#34D399" strokeWidth="2.5" strokeDasharray="4 4" />
        <line x1="80" y1="70" x2="240" y2="70" stroke="#F472B6" strokeWidth="2" strokeDasharray="4 4" />

        {/* Center Node / Game Hub */}
        <circle cx="160" cy="130" r="32" fill="#1E1B4B" stroke="#6366F1" strokeWidth="3" />
        <rect x="145" y="120" width="30" height="20" rx="4" fill="#818CF8" />
        <circle cx="152" cy="130" r="3" fill="#FFFFFF" />
        <circle cx="168" cy="130" r="3" fill="#FDE047" />

        {/* Avatar Left */}
        <circle cx="80" cy="70" r="26" fill="#4338CA" stroke="#818CF8" strokeWidth="2" />
        <circle cx="80" cy="62" r="10" fill="#FDE047" />
        <path d="M68 85C68 76 92 76 92 85" fill="#312E81" />

        {/* Avatar Right */}
        <circle cx="240" cy="70" r="26" fill="#047857" stroke="#34D399" strokeWidth="2" />
        <circle cx="240" cy="62" r="10" fill="#FCD34D" />
        <path d="M228 85C228 76 252 76 252 85" fill="#064E3B" />

        {/* Floating Icons */}
        <g transform="translate(145, 30)">
          <circle cx="15" cy="15" r="14" fill="#F59E0B" />
          <path d="M12 9L19 15L12 21V9Z" fill="#FFFFFF" />
        </g>
        <g transform="translate(45, 125)">
          <circle cx="12" cy="12" r="12" fill="#EC4899" />
          <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">💬</text>
        </g>
        <g transform="translate(250, 125)">
          <circle cx="12" cy="12" r="12" fill="#10B981" />
          <text x="12" y="16" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold">🏆</text>
        </g>
      </svg>
    </div>
  );
};

// Story Scene Vector Artwork (Safe, clean, thematic)
export const StorySceneIllustration: React.FC<{ type: string; title: string }> = ({ type, title }) => {
  switch (type) {
    case 'clocktower':
      return (
        <div className="relative w-full h-48 sm:h-56 bg-gradient-to-b from-indigo-950 via-slate-900 to-purple-950 rounded-2xl overflow-hidden flex items-center justify-center border border-violet-500/20">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-violet-600/30 rounded-full blur-2xl" />
          <svg viewBox="0 0 400 220" className="w-full h-full object-cover">
            {/* Moon and Starlit sky */}
            <circle cx="80" cy="60" r="28" fill="#FEF08A" opacity="0.9" />
            <circle cx="90" cy="55" r="24" fill="#0F172A" />
            <circle cx="180" cy="40" r="2" fill="#FFFFFF" />
            <circle cx="280" cy="30" r="2.5" fill="#FFFFFF" />
            <circle cx="340" cy="65" r="1.5" fill="#FFFFFF" />

            {/* Academy Clock Tower Silhouette */}
            <path d="M140 220V120L180 80H220L260 120V220H140Z" fill="#1E1B4B" />
            <path d="M170 80L200 30L230 80H170Z" fill="#312E81" />
            {/* Spire needle */}
            <line x1="200" y1="30" x2="200" y2="10" stroke="#F59E0B" strokeWidth="3" />

            {/* Glowing Clock Dial */}
            <circle cx="200" cy="135" r="35" fill="#F8FAFC" stroke="#D97706" strokeWidth="4" />
            {/* Roman style ticks */}
            <circle cx="200" cy="135" r="30" fill="none" stroke="#64748B" strokeWidth="1" strokeDasharray="2 6" />
            {/* Reverse hands */}
            <line x1="200" y1="135" x2="200" y2="115" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <line x1="200" y1="135" x2="218" y2="142" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
            <circle cx="200" cy="135" r="4" fill="#D97706" />

            {/* Archway windows */}
            <rect x="185" y="180" width="30" height="40" rx="15" fill="#FEF08A" opacity="0.7" />
          </svg>
          <div className="absolute bottom-2 right-3 px-2 py-1 rounded-md bg-black/60 text-[11px] text-violet-300 backdrop-blur-sm">
            {title}
          </div>
        </div>
      );

    case 'train':
      return (
        <div className="relative w-full h-48 sm:h-56 bg-gradient-to-b from-teal-950 via-slate-900 to-indigo-950 rounded-2xl overflow-hidden flex items-center justify-center border border-teal-500/20">
          <svg viewBox="0 0 400 220" className="w-full h-full object-cover">
            {/* Night Viaduct & Stars */}
            <path d="M0 190Q200 170 400 190V220H0Z" fill="#042F2E" />
            {/* Train Tracks */}
            <line x1="0" y1="185" x2="400" y2="185" stroke="#475569" strokeWidth="4" />
            {/* Locomotive silhouette */}
            <rect x="120" y="115" width="160" height="70" rx="10" fill="#064E3B" stroke="#10B981" strokeWidth="2" />
            <rect x="70" y="135" width="60" height="50" rx="6" fill="#065F46" />
            {/* Smokestack */}
            <rect x="85" y="110" width="20" height="25" rx="3" fill="#042F2E" />
            {/* Warm glowing windows */}
            <rect x="140" y="130" width="32" height="28" rx="6" fill="#FEF08A" opacity="0.9" />
            <rect x="185" y="130" width="32" height="28" rx="6" fill="#FEF08A" opacity="0.9" />
            <rect x="230" y="130" width="32" height="28" rx="6" fill="#FEF08A" opacity="0.9" />
            {/* Wheels */}
            <circle cx="100" cy="188" r="12" fill="#334155" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="150" cy="188" r="12" fill="#334155" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="210" cy="188" r="12" fill="#334155" stroke="#F59E0B" strokeWidth="2" />
            <circle cx="260" cy="188" r="12" fill="#334155" stroke="#F59E0B" strokeWidth="2" />
            {/* Lantern headlamp light beam */}
            <polygon points="70,150 0,120 0,180" fill="#FEF08A" opacity="0.3" />
          </svg>
          <div className="absolute bottom-2 right-3 px-2 py-1 rounded-md bg-black/60 text-[11px] text-teal-300 backdrop-blur-sm">
            {title}
          </div>
        </div>
      );

    case 'robotics':
      return (
        <div className="relative w-full h-48 sm:h-56 bg-gradient-to-b from-blue-950 via-slate-900 to-indigo-950 rounded-2xl overflow-hidden flex items-center justify-center border border-blue-500/20">
          <svg viewBox="0 0 400 220" className="w-full h-full object-cover">
            {/* High tech lab grid */}
            <line x1="50" y1="0" x2="50" y2="220" stroke="#1E3A8A" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="150" y1="0" x2="150" y2="220" stroke="#1E3A8A" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="250" y1="0" x2="250" y2="220" stroke="#1E3A8A" strokeWidth="0.5" strokeDasharray="4 4" />
            <line x1="350" y1="0" x2="350" y2="220" stroke="#1E3A8A" strokeWidth="0.5" strokeDasharray="4 4" />

            {/* Workbench */}
            <rect x="60" y="150" width="280" height="50" rx="8" fill="#1E293B" stroke="#3B82F6" strokeWidth="2" />

            {/* Cute Mascot Robot Bolt */}
            <rect x="175" y="90" width="50" height="55" rx="14" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
            <circle cx="190" cy="110" r="5" fill="#1E293B" />
            <circle cx="210" cy="110" r="5" fill="#1E293B" />
            <line x1="192" y1="125" x2="208" y2="125" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            {/* Robot antenna */}
            <line x1="200" y1="90" x2="200" y2="75" stroke="#38BDF8" strokeWidth="3" />
            <circle cx="200" cy="73" r="4" fill="#F59E0B" />
            {/* Robot wheels / tracks */}
            <rect x="170" y="142" width="60" height="12" rx="4" fill="#475569" />

            {/* Blueprints and Tools on table */}
            <rect x="90" y="155" width="45" height="30" rx="3" fill="#2563EB" opacity="0.8" />
            <line x1="95" y1="163" x2="125" y2="163" stroke="#93C5FD" strokeWidth="2" />
            <line x1="95" y1="172" x2="115" y2="172" stroke="#93C5FD" strokeWidth="2" />
          </svg>
          <div className="absolute bottom-2 right-3 px-2 py-1 rounded-md bg-black/60 text-[11px] text-cyan-300 backdrop-blur-sm">
            {title}
          </div>
        </div>
      );

    case 'island':
      return (
        <div className="relative w-full h-48 sm:h-56 bg-gradient-to-b from-cyan-950 via-teal-900 to-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-cyan-500/20">
          <svg viewBox="0 0 400 220" className="w-full h-full object-cover">
            {/* Coastal Cliff & Cavern */}
            <path d="M0 220V120C80 130 130 80 200 90C280 100 320 60 400 70V220H0Z" fill="#042F2E" />
            <path d="M0 220V150C60 160 120 120 180 130C250 140 330 110 400 120V220H0Z" fill="#065F46" />
            {/* Sea Spring Cavern pool */}
            <ellipse cx="200" cy="190" rx="140" ry="25" fill="#06B6D4" opacity="0.7" />
            <ellipse cx="200" cy="190" rx="100" ry="16" fill="#A5F3FC" opacity="0.8" />
            {/* Bioluminescent moss crystals */}
            <circle cx="110" cy="140" r="4" fill="#67E8F9" />
            <circle cx="160" cy="120" r="3" fill="#A7F3D0" />
            <circle cx="260" cy="115" r="4.5" fill="#67E8F9" />
            <circle cx="310" cy="130" r="3" fill="#A7F3D0" />
          </svg>
          <div className="absolute bottom-2 right-3 px-2 py-1 rounded-md bg-black/60 text-[11px] text-emerald-300 backdrop-blur-sm">
            {title}
          </div>
        </div>
      );

    case 'library':
    default:
      return (
        <div className="relative w-full h-48 sm:h-56 bg-gradient-to-b from-amber-950/90 via-slate-900 to-indigo-950 rounded-2xl overflow-hidden flex items-center justify-center border border-amber-500/20">
          <svg viewBox="0 0 400 220" className="w-full h-full object-cover">
            {/* Bookshelves in background */}
            <rect x="30" y="30" width="340" height="130" rx="6" fill="#1C1917" stroke="#78350F" strokeWidth="3" />
            <line x1="30" y1="70" x2="370" y2="70" stroke="#78350F" strokeWidth="3" />
            <line x1="30" y1="110" x2="370" y2="110" stroke="#78350F" strokeWidth="3" />

            {/* Books in shelf */}
            <rect x="45" y="40" width="14" height="28" rx="2" fill="#DC2626" />
            <rect x="62" y="38" width="16" height="30" rx="2" fill="#2563EB" />
            <rect x="81" y="42" width="12" height="26" rx="2" fill="#D97706" />
            <rect x="96" y="38" width="18" height="30" rx="2" fill="#059669" />
            <rect x="120" y="40" width="15" height="28" rx="2" fill="#7C3AED" />

            {/* Study Workbench Desk */}
            <rect x="60" y="145" width="280" height="65" rx="8" fill="#451A03" stroke="#B45309" strokeWidth="3" />

            {/* The Leather Blueprint Notebook & Chalk Arrow */}
            <rect x="150" y="155" width="46" height="34" rx="4" fill="#92400E" stroke="#FDE68A" strokeWidth="1.5" />
            <rect x="175" y="152" width="8" height="12" fill="#2563EB" />
            {/* Chalk arrow on desk */}
            <path d="M215 168L240 168M232 162L240 168L232 174" stroke="#FEF08A" strokeWidth="2.5" strokeLinecap="round" />
            {/* Magnifying glass */}
            <circle cx="115" cy="170" r="12" fill="none" stroke="#F59E0B" strokeWidth="3" />
            <line x1="124" y1="179" x2="135" y2="190" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
          </svg>
          <div className="absolute bottom-2 right-3 px-2 py-1 rounded-md bg-black/60 text-[11px] text-amber-300 backdrop-blur-sm">
            {title}
          </div>
        </div>
      );
  }
};
