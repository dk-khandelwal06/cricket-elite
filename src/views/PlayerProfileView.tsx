import React, { useState } from 'react';
import { PLAYERS } from '../data/cricketData';
import { Player } from '../types';
import { WagonWheel } from '../components/WagonWheel';
import { 
  Trophy, 
  Award, 
  Flame, 
  TrendingUp, 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  Scale, 
  ChevronRight,
  Target,
  Sparkles
} from 'lucide-react';

interface PlayerProfileViewProps {
  selectedPlayerId?: string;
  onSelectPlayer: (id: string) => void;
}

export const PlayerProfileView: React.FC<PlayerProfileViewProps> = ({
  selectedPlayerId = 'p-kohli',
  onSelectPlayer,
}) => {
  const [activeFormat, setActiveFormat] = useState<'t20' | 'odi' | 'test'>('t20');
  const [comparisonPlayerId, setComparisonPlayerId] = useState<string>('p-babar');
  const [isComparing, setIsComparing] = useState(false);

  const player = PLAYERS.find((p) => p.id === selectedPlayerId) || PLAYERS[0];
  const comparePlayer = PLAYERS.find((p) => p.id === comparisonPlayerId) || PLAYERS[1];
  const currentFormatStats = player.stats[activeFormat];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. PLAYER SELECTOR HORIZONTAL CHIPS */}
      <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
            Featured International Stars
          </span>
          <button
            onClick={() => setIsComparing(!isComparing)}
            className={`flex items-center gap-1.5 text-xs font-mono font-bold px-3 py-1.5 rounded-xl transition cursor-pointer ${
              isComparing ? 'bg-[#ffe083] text-black' : 'bg-[#181B24] border border-[#232733] text-white hover:bg-[#1F2330]'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{isComparing ? 'Exit Comparison' : 'Head-to-Head Compare'}</span>
          </button>
        </div>

        <div className="flex items-center space-x-3 overflow-x-auto pb-1 scrollbar-thin">
          {PLAYERS.map((p) => {
            const isSelected = p.id === player.id;
            return (
              <div
                key={p.id}
                onClick={() => onSelectPlayer(p.id)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border transition cursor-pointer shrink-0 select-none ${
                  isSelected
                    ? 'bg-[#181B24] border-emerald-500 shadow-[0_0_15px_rgba(34,197,94,0.25)]'
                    : 'bg-[#0A0B0E] border-[#232733] hover:border-emerald-500/40 hover:bg-[#181B24]'
                }`}
              >
                <img
                  src={p.avatarUrl}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=400&q=80';
                  }}
                  className="w-8 h-8 rounded-full object-cover border border-white/20"
                />
                <div>
                  <h4 className="text-xs font-bold text-white leading-tight">{p.name}</h4>
                  <span className="text-[10px] text-slate-400 font-mono">{p.country} • #{p.jerseyNumber}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. HERO PLAYER BANNER WITH CUTOUT PORTRAIT */}
      {!isComparing ? (
        <div className="relative rounded-2xl overflow-hidden border border-[#232733] bg-gradient-to-r from-[#181A24] via-[#13151C] to-[#0A0B0E] shadow-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Info & Bio (7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  ICC #{player.iccRanking[activeFormat]} IN {activeFormat.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                  {player.country}
                </span>
                <span className="text-xs font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                  Jersey #{player.jerseyNumber}
                </span>
              </div>

              <div>
                <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide">
                  {player.fullName.toUpperCase()}
                </h1>
                <p className="text-sm font-condensed font-semibold text-[#ffe083] uppercase tracking-wider mt-1">
                  {player.role} • {player.battingStyle} {player.bowlingStyle !== 'None' ? `• ${player.bowlingStyle}` : ''}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-xl">
                {player.bio}
              </p>

              {/* Format Switcher Pills */}
              <div className="pt-2 flex items-center space-x-2">
                <span className="text-xs font-mono text-slate-400 mr-2">Format Stats:</span>
                {(['t20', 'odi', 'test'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setActiveFormat(fmt)}
                    className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer ${
                      activeFormat === fmt
                        ? 'bg-emerald-400 text-black shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                        : 'bg-[#181B24] text-slate-400 hover:text-white border border-[#232733]'
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Right Hero Cutout Image (5 Cols) */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-64 h-80 sm:w-72 sm:h-96 rounded-2xl overflow-hidden border-2 border-[#232733] shadow-2xl bg-gradient-to-b from-transparent to-black/80">
                <img
                  src={player.heroImageUrl || player.avatarUrl}
                  alt={player.name}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = player.avatarUrl;
                  }}
                  className="w-full h-full object-cover object-top filter contrast-110 drop-shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <span className="text-[10px] font-mono text-emerald-400 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full border border-[#232733] uppercase tracking-widest">
                    Verified Elite Athlete
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* HEAD TO HEAD COMPARISON PANEL */
        <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#232733] pb-4">
            <h3 className="font-headline text-xl font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#ffe083]" />
              HEAD-TO-HEAD STATISTICAL RADAR
            </h3>
            <div className="flex items-center space-x-2">
              <select
                value={comparisonPlayerId}
                onChange={(e) => setComparisonPlayerId(e.target.value)}
                className="bg-[#0A0B0E] border border-[#232733] rounded-xl px-3 py-1.5 text-xs text-white outline-none font-mono"
              >
                {PLAYERS.filter((p) => p.id !== player.id).map((p) => (
                  <option key={p.id} value={p.id}>
                    vs {p.name} ({p.country})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
            {/* Player 1 Card */}
            <div className="md:col-span-5 bg-[#181B24] p-4 rounded-2xl border border-emerald-500/40 text-center">
              <img
                src={player.avatarUrl}
                alt={player.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=400&q=80';
                }}
                className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-emerald-400"
              />
              <h4 className="font-headline text-lg font-bold text-white mt-2">{player.name}</h4>
              <p className="text-xs text-slate-400 font-mono">{player.country} • {player.role}</p>
            </div>

            <div className="md:col-span-1 text-center font-headline text-xl font-bold text-[#ffe083]">
              VS
            </div>

            {/* Player 2 Card */}
            <div className="md:col-span-5 bg-[#181B24] p-4 rounded-2xl border border-amber-500/40 text-center">
              <img
                src={comparePlayer.avatarUrl}
                alt={comparePlayer.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=400&q=80';
                }}
                className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-amber-500"
              />
              <h4 className="font-headline text-lg font-bold text-white mt-2">{comparePlayer.name}</h4>
              <p className="text-xs text-slate-400 font-mono">{comparePlayer.country} • {comparePlayer.role}</p>
            </div>
          </div>

          {/* Comparative Metrics Table */}
          <div className="space-y-3 font-mono text-xs">
            {[
              { label: 'Batting Average', v1: player.stats.t20.battingAverage || 0, v2: comparePlayer.stats.t20.battingAverage || 0 },
              { label: 'Strike Rate', v1: player.stats.t20.strikeRate || 0, v2: comparePlayer.stats.t20.strikeRate || 0 },
              { label: 'T20 Runs', v1: player.stats.t20.runs || 0, v2: comparePlayer.stats.t20.runs || 0 },
              { label: 'Clutch Factor Index', v1: player.radarMetrics.clutchFactor, v2: comparePlayer.radarMetrics.clutchFactor },
              { label: 'Pace Handling %', v1: player.radarMetrics.paceHandling, v2: comparePlayer.radarMetrics.paceHandling },
            ].map((metric, idx) => (
              <div key={idx} className="bg-[#0A0B0E] border border-[#232733] p-3 rounded-xl flex items-center justify-between">
                <span className={`font-bold text-sm ${metric.v1 >= metric.v2 ? 'text-emerald-400' : 'text-white'}`}>
                  {metric.v1}
                </span>
                <span className="text-slate-400">{metric.label}</span>
                <span className={`font-bold text-sm ${metric.v2 >= metric.v1 ? 'text-amber-400' : 'text-white'}`}>
                  {metric.v2}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. MULTI-FORMAT CAREER NUMBERS & RADAR MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Career Numbers Grid (7 Cols) */}
        <div className="lg:col-span-7 bg-[#13151C] border border-[#232733] rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#232733] pb-2">
            <h3 className="font-headline text-base font-bold text-white tracking-wide">
              CAREER NUMBERS • {activeFormat.toUpperCase()}
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              {currentFormatStats.matches} Matches Played
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {currentFormatStats.runs !== undefined && (
              <div className="bg-[#181B24] p-3 rounded-xl border border-[#232733]">
                <span className="text-[10px] text-slate-400 font-mono block">RUNS</span>
                <span className="text-2xl font-bold text-white font-mono-score">{currentFormatStats.runs}</span>
              </div>
            )}
            {currentFormatStats.battingAverage !== undefined && (
              <div className="bg-[#181B24] p-3 rounded-xl border border-[#232733]">
                <span className="text-[10px] text-slate-400 font-mono block">AVERAGE</span>
                <span className="text-2xl font-bold text-emerald-400 font-mono-score">{currentFormatStats.battingAverage}</span>
              </div>
            )}
            {currentFormatStats.strikeRate !== undefined && (
              <div className="bg-[#181B24] p-3 rounded-xl border border-[#232733]">
                <span className="text-[10px] text-slate-400 font-mono block">STRIKE RATE</span>
                <span className="text-2xl font-bold text-[#ffe083] font-mono-score">{currentFormatStats.strikeRate}</span>
              </div>
            )}
            {currentFormatStats.highestScore && (
              <div className="bg-[#181B24] p-3 rounded-xl border border-[#232733]">
                <span className="text-[10px] text-slate-400 font-mono block">HIGH SCORE</span>
                <span className="text-2xl font-bold text-white font-mono-score">{currentFormatStats.highestScore}</span>
              </div>
            )}
            {currentFormatStats.hundreds !== undefined && (
              <div className="bg-[#181B24] p-3 rounded-xl border border-[#232733]">
                <span className="text-[10px] text-slate-400 font-mono block">100s / 50s</span>
                <span className="text-2xl font-bold text-white font-mono-score">
                  {currentFormatStats.hundreds}/{currentFormatStats.fifties}
                </span>
              </div>
            )}
            {currentFormatStats.wickets !== undefined && (
              <div className="bg-[#181B24] p-3 rounded-xl border border-[#232733]">
                <span className="text-[10px] text-slate-400 font-mono block">WICKETS</span>
                <span className="text-2xl font-bold text-emerald-400 font-mono-score">{currentFormatStats.wickets}</span>
              </div>
            )}
            {currentFormatStats.economyRate !== undefined && (
              <div className="bg-[#181B24] p-3 rounded-xl border border-[#232733]">
                <span className="text-[10px] text-slate-400 font-mono block">ECONOMY</span>
                <span className="text-2xl font-bold text-[#38bdf8] font-mono-score">{currentFormatStats.economyRate}</span>
              </div>
            )}
            {currentFormatStats.fours !== undefined && (
              <div className="bg-[#181B24] p-3 rounded-xl border border-[#232733]">
                <span className="text-[10px] text-slate-400 font-mono block">4s / 6s</span>
                <span className="text-2xl font-bold text-white font-mono-score">
                  {currentFormatStats.fours}/{currentFormatStats.sixes}
                </span>
              </div>
            )}
          </div>

          {/* Recent Match Form Log */}
          <div className="pt-2">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Recent Form Log
            </span>
            <div className="space-y-2 font-mono text-xs">
              {player.recentForm.map((rf, idx) => (
                <div key={idx} className="bg-[#181B24] p-2.5 rounded-xl border border-[#232733] flex items-center justify-between">
                  <div>
                    <span className="text-white font-semibold block">{rf.opponent}</span>
                    <span className="text-slate-500 text-[10px]">{rf.date} • {rf.matchType}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold text-sm block">{rf.scoreOrWickets}</span>
                    <span className="text-slate-400 text-[10px]">{rf.ballsOrOvers}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tactical Performance Radar (5 Cols) */}
        <div className="lg:col-span-5 bg-[#13151C] border border-[#232733] rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-[#232733] pb-2">
            <h3 className="font-headline text-base font-bold text-white tracking-wide">
              SKILL RADAR & ATTRIBUTES
            </h3>
            <span className="text-xs font-mono text-[#ffe083]">Score / 100</span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            {[
              { label: 'Clutch Match Winner Factor', val: player.radarMetrics.clutchFactor, color: '#22c55e' },
              { label: 'Pace Handling (145+ km/h)', val: player.radarMetrics.paceHandling, color: '#38bdf8' },
              { label: 'Spin Mastery & Decryption', val: player.radarMetrics.spinMastery, color: '#ffe083' },
              { label: 'Boundary Striking %', val: player.radarMetrics.boundaryPercentage, color: '#f87171' },
              { label: 'Strike Rotation & Running', val: player.radarMetrics.strikeRotation, color: '#a78bfa' },
              { label: 'Consistency Rating', val: player.radarMetrics.consistency, color: '#4ade80' },
            ].map((m, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-300">{m.label}</span>
                  <span className="text-white font-bold">{m.val}</span>
                </div>
                <div className="h-2 w-full bg-[#0A0B0E] rounded-full overflow-hidden border border-[#232733]">
                  <div
                    style={{ width: `${m.val}%`, backgroundColor: m.color }}
                    className="h-full rounded-full transition-all duration-700"
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <WagonWheel selectedBatter={player.name} />
          </div>
        </div>
      </div>
    </div>
  );
};
