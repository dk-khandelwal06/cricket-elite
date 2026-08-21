import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Flame, 
  Activity, 
  Users, 
  Radio, 
  Compass, 
  Newspaper, 
  Sparkles, 
  Search, 
  Sun, 
  Moon, 
  Volume2, 
  VolumeX,
  Play,
  Pause,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  onOpenAiStrategist: () => void;
  isSimulating: boolean;
  setIsSimulating: (val: boolean | ((prev: boolean) => boolean)) => void;
  isAudioEnabled: boolean;
  setIsAudioEnabled: (val: boolean | ((prev: boolean) => boolean)) => void;
  theme: 'dark' | 'light';
  setTheme: (t: 'dark' | 'light') => void;
  liveMatchScoreText?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenSearch,
  onOpenAiStrategist,
  isSimulating,
  setIsSimulating,
  isAudioEnabled,
  setIsAudioEnabled,
  theme,
  setTheme,
  liveMatchScoreText = 'AUS 177/4 (18.2) • Need 21 off 10',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  const navItems = [
    { id: 'live', label: 'Live Center', icon: Radio, isLive: true },
    { id: 'match', label: 'Match Center', icon: Activity },
    { id: 'players', label: 'Players & Stats', icon: Users },
    { id: 'tournaments', label: 'Tournaments', icon: Trophy },
    { id: 'stadium', label: 'Pitch & Venue', icon: Compass },
    { id: 'news', label: 'News & Tech', icon: Newspaper },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0B0E]/95 backdrop-blur-md border-b border-[#232733] text-white select-none">
      {/* Top micro-banner for live grand final */}
      <div className="bg-gradient-to-r from-[#004b91]/80 via-[#0A0B0E] to-[#00471b]/80 border-b border-[#232733]/80 py-1 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1.5 bg-red-500/90 text-white font-bold px-2 py-0.5 rounded text-[10px] tracking-wider uppercase animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
              Live Final
            </span>
            <span className="text-slate-200 font-medium hidden sm:inline">
              ICC Men&apos;s T20 World Cup 2026 Grand Final: India vs Australia @ MCG
            </span>
            <span className="text-emerald-400 font-mono-score font-bold">
              {liveMatchScoreText}
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsSimulating((prev) => !prev)}
              className={`flex items-center gap-1 text-[11px] font-mono-score font-semibold px-2.5 py-0.5 rounded transition-all cursor-pointer ${
                isSimulating 
                  ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(34,197,94,0.5)]' 
                  : 'bg-[#181B24] text-slate-300 border border-[#232733] hover:bg-[#1F2330] hover:text-white'
              }`}
              title="Simulate live ball-by-ball deliveries in real-time"
            >
              {isSimulating ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3 fill-current" />}
              <span>{isSimulating ? 'SIMULATING' : 'START SIM'}</span>
            </button>

            <button
              onClick={() => onOpenAiStrategist()}
              className="flex items-center gap-1.5 text-xs text-[#ffe083] hover:text-white bg-[#ffe083]/10 hover:bg-[#ffe083]/20 border border-[#ffe083]/30 px-2.5 py-0.5 rounded font-medium transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ffe083]" />
              <span className="hidden md:inline">AI Match Strategist</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => setActiveTab('live')}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-[#13151C] to-[#1A1D26] border border-emerald-500/40 p-1 flex items-center justify-center shadow-[0_0_15px_rgba(34,197,94,0.15)] group-hover:border-emerald-400 transition">
              <Flame className="w-6 h-6 text-emerald-400 transition transform group-hover:scale-110" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-headline text-2xl font-bold tracking-wider text-white">
                  CRICKET
                </span>
                <span className="font-headline text-2xl font-bold tracking-wider text-emerald-400">
                  ELITE
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-slate-400 uppercase font-condensed font-semibold">
                Official Live Arena
              </p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-medium transition cursor-pointer ${
                    isActive
                      ? 'text-emerald-400 bg-[#13151C] border border-[#232733]'
                      : 'text-slate-300 hover:text-white hover:bg-[#13151C]/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.isLive && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-400 shadow-[0_0_8px_#22c55e]"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Actions & Tools */}
          <div className="flex items-center space-x-2.5">
            {/* Quick Search Button */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 bg-[#13151C] hover:bg-[#1A1D26] border border-[#232733] text-slate-300 text-xs px-3 py-2 rounded-lg transition group cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-400" />
              <span className="hidden sm:inline">Search players, teams...</span>
              <kbd className="hidden sm:inline-block bg-[#0A0B0E] text-[10px] text-slate-400 border border-[#232733] px-1.5 py-0.5 rounded font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Audio Commentary FX Toggle */}
            <button
              onClick={() => setIsAudioEnabled((prev) => !prev)}
              className="p-2 rounded-lg bg-[#13151C] hover:bg-[#1A1D26] border border-[#232733] text-slate-300 transition cursor-pointer"
              title={isAudioEnabled ? 'Commentary Audio FX On' : 'Commentary Audio FX Muted'}
            >
              {isAudioEnabled ? (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              ) : (
                <VolumeX className="w-4 h-4 text-slate-400" />
              )}
            </button>

            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-lg bg-[#13151C] hover:bg-[#1A1D26] border border-[#232733] text-slate-300 transition cursor-pointer"
              title={`Switch to ${theme === 'dark' ? 'True Light' : 'Stadium Night'} Theme`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#ffe083]" />
              ) : (
                <Moon className="w-4 h-4 text-emerald-600" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-[#13151C] border border-[#232733] text-white cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#13151C] border-b border-[#232733] px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition ${
                  isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.isLive && (
                  <span className="text-[10px] bg-red-600 font-bold px-1.5 py-0.5 rounded text-white uppercase">
                    Live
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
