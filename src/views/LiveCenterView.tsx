import React, { useState } from 'react';
import { Match, Player } from '../types';
import { WagonWheel } from '../components/WagonWheel';
import { PitchMap } from '../components/PitchMap';
import { WinPredictorMeter } from '../components/WinPredictorMeter';
import { ManhattanWormChart } from '../components/ManhattanWormChart';
import { 
  Radio, 
  Flame, 
  MapPin, 
  Clock, 
  Zap, 
  ChevronRight, 
  SlidersHorizontal, 
  Volume2, 
  Share2, 
  Bookmark,
  ShieldCheck,
  TrendingUp,
  Award
} from 'lucide-react';

interface LiveCenterViewProps {
  match: Match;
  onSelectPlayer: (playerId: string) => void;
  onNavigateTab: (tab: string) => void;
  isSimulating: boolean;
  onTriggerBall: () => void;
}

export const LiveCenterView: React.FC<LiveCenterViewProps> = ({
  match,
  onSelectPlayer,
  onNavigateTab,
  isSimulating,
  onTriggerBall,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'OVERVIEW' | 'COMMENTARY' | 'WAGON_WHEEL' | 'PITCH_MAP' | 'SCORECARD'>('OVERVIEW');
  const [commentaryFilter, setCommentaryFilter] = useState<'ALL' | 'BOUNDARIES' | 'WICKETS'>('ALL');

  const currentInning = match.innings[match.currentInningIndex] || match.innings[0];
  const firstInning = match.innings[0];

  // Active Batters
  const currentBatters = currentInning.batting.filter((b) => b.isNotOut);
  // Active Bowler
  const currentBowler = currentInning.bowling.find((b) => b.isBowlingNow) || currentInning.bowling[0];

  // Live overs recent deliveries
  const currentOverData = currentInning.oversData[currentInning.oversData.length - 1];
  const recentBalls = currentOverData ? currentOverData.balls : [];

  // All commentary lines
  const allCommentaryBalls = currentInning.oversData
    .slice()
    .reverse()
    .flatMap((ov) => ov.balls.map((b) => ({ ...b, overNum: ov.overNumber })));

  const filteredCommentary = allCommentaryBalls.filter((b) => {
    if (commentaryFilter === 'BOUNDARIES') return b.isBoundary || b.isSix;
    if (commentaryFilter === 'WICKETS') return b.isWicket;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. HERO MATCH BANNER & SCOREBOARD */}
      <div className="relative rounded-2xl overflow-hidden border border-[#232733] bg-gradient-to-br from-[#181A24] via-[#13151C] to-[#0A0B0E] shadow-2xl">
        {/* Background Stadium Atmosphere */}
        <div 
          className="absolute inset-0 opacity-20 mix-blend-screen bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuB70vc5fSs8W7odsUuPPCEE2wo8svLib2tLmbh4SdIoeelR6CePX92UiLqPwluhPcDBYXnzArtmO-pEH6Ki5yWUPRodmK7sf7tPUW2e-P01dykGf0ceF4u1k-H4HcJbKdtsV0liBDxEnYq0cmXuXg8VWq_VsUc9tDuoo7LFL3JfX61reKRWScH-i0JZAOEFqKUG84FQ8Mhp6ETE2LrZF9Zjr2p7XHq71iIjJIvNKg-KrRaUEWHuqeYPlQ')`,
          }}
        />

        {/* Top Stadium & Tournament Header Bar */}
        <div className="relative z-10 px-4 sm:px-6 py-3 border-b border-[#232733] flex flex-wrap items-center justify-between gap-2 bg-black/40 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center gap-1 bg-red-600 text-white font-bold text-xs px-2.5 py-0.5 rounded uppercase font-mono tracking-wider animate-pulse">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              LIVE GRAND FINAL
            </span>
            <span className="text-xs text-slate-300 font-medium">
              {match.series}
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs text-slate-400 font-mono">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              {match.venue.name}
            </span>
            <span className="hidden sm:inline text-slate-600">•</span>
            <span className="hidden sm:inline">{match.weather.condition}, {match.weather.temperature}</span>
          </div>
        </div>

        {/* Main Live Score Card Display */}
        <div className="relative z-10 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Team 1 (India) */}
            <div className="lg:col-span-4 flex items-center space-x-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#0369a1] border-2 border-white/20 flex items-center justify-center text-3xl shadow-xl">
                {match.team1.flag}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-headline text-2xl sm:text-3xl font-bold text-white tracking-wide">
                    {match.team1.name}
                  </h2>
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-white/10 text-slate-300">
                    {match.team1.code}
                  </span>
                </div>
                <div className="font-mono-score text-xl sm:text-2xl font-bold text-slate-300 mt-1">
                  {firstInning.runs}/{firstInning.wickets}
                  <span className="text-sm font-sans text-slate-400 font-normal ml-2">
                    ({firstInning.overs} ov)
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">CRR: {(firstInning.runs / 20).toFixed(2)}</p>
              </div>
            </div>

            {/* Match VS / Live Target & Equations (Center) */}
            <div className="lg:col-span-4 text-center border-y lg:border-y-0 lg:border-x border-[#232733] py-3 lg:py-0 px-4">
              <div className="inline-block bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-mono font-bold text-emerald-400 mb-2">
                TARGET {match.target} RUNS
              </div>
              <h3 className="font-headline text-lg sm:text-xl font-bold text-[#ffe083] tracking-wide">
                {match.statusText}
              </h3>
              <div className="flex items-center justify-center space-x-6 mt-2 text-xs font-mono text-slate-400">
                <span>
                  CRR: <strong className="text-white">{match.currentRunRate}</strong>
                </span>
                <span>
                  REQ: <strong className="text-emerald-400">{match.requiredRunRate}</strong>
                </span>
                <span>
                  Balls: <strong className="text-white">{match.ballsRemaining}</strong>
                </span>
              </div>
            </div>

            {/* Team 2 (Australia - Chasing) */}
            <div className="lg:col-span-4 flex items-center justify-start lg:justify-end space-x-4">
              <div className="text-left lg:text-right order-2 lg:order-1">
                <div className="flex items-center lg:justify-end gap-2">
                  <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {match.team2.code}
                  </span>
                  <h2 className="font-headline text-2xl sm:text-3xl font-bold text-white tracking-wide">
                    {match.team2.name}
                  </h2>
                </div>
                <div className="font-mono-score text-2xl sm:text-3xl font-bold text-emerald-400 mt-1 drop-shadow-[0_0_12px_rgba(34,197,94,0.4)]">
                  {currentInning.runs}/{currentInning.wickets}
                  <span className="text-sm font-sans text-slate-300 font-normal ml-2">
                    ({currentInning.overs} ov)
                  </span>
                </div>
                <p className="text-xs text-[#ffe083] font-mono mt-0.5">Need {match.runsNeeded} off {match.ballsRemaining}b</p>
              </div>

              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#166534] to-[#14532d] border-2 border-emerald-500/40 flex items-center justify-center text-3xl shadow-xl order-1 lg:order-2">
                {match.team2.flag}
              </div>
            </div>
          </div>

          {/* Ball By Ball Live Delivery Strip */}
          <div className="mt-6 pt-4 border-t border-[#232733] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Over 18 Deliveries:
              </span>
              <div className="flex items-center space-x-1.5 overflow-x-auto py-1">
                {recentBalls.map((ball, idx) => {
                  let bgClass = 'bg-[#181B24] text-slate-200 border-[#232733]';
                  if (ball.isSix) bgClass = 'bg-[#ffe083] text-black font-extrabold border-[#ffe083] shadow-[0_0_10px_#ffe083]';
                  else if (ball.isBoundary) bgClass = 'bg-emerald-400 text-black font-extrabold border-emerald-400 shadow-[0_0_10px_#22c55e]';
                  else if (ball.isWicket) bgClass = 'bg-red-500 text-white font-extrabold border-red-400 shadow-[0_0_10px_red]';
                  else if (ball.runs === 0) bgClass = 'bg-[#0A0B0E] text-slate-500 border-[#232733]';

                  return (
                    <div
                      key={idx}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono border ${bgClass} transition transform hover:scale-110`}
                      title={ball.commentary}
                    >
                      {ball.isWicket ? 'W' : ball.runs}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Live Interactive Simulation Button */}
            <div className="flex items-center space-x-2">
              <button
                onClick={onTriggerBall}
                className="bg-emerald-400 hover:bg-emerald-300 text-black text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition shadow-[0_0_15px_rgba(34,197,94,0.3)] cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-current" />
                <span>Next Delivery FX</span>
              </button>

              <button
                onClick={() => onNavigateTab('match')}
                className="bg-[#181B24] hover:bg-[#1F2330] border border-[#232733] text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition cursor-pointer"
              >
                <span>Full Scorecard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIVE ON-FIELD TELEMETRY: BATTERS & BOWLER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Batting Crease Telemetry (Left 7 Cols) */}
        <div className="lg:col-span-7 bg-[#13151C] border border-[#232733] rounded-2xl p-4 sm:p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3 border-b border-[#232733] pb-2">
            <h3 className="font-headline text-base font-bold text-white tracking-wide flex items-center gap-2">
              <span>CURRENT BATTERS</span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded">
                Live at Crease
              </span>
            </h3>
            <div className="text-[11px] font-mono text-slate-400 hidden sm:flex space-x-6 pr-2">
              <span>R</span>
              <span>B</span>
              <span>4s</span>
              <span>6s</span>
              <span>SR</span>
            </div>
          </div>

          <div className="space-y-3">
            {currentBatters.map((batter) => (
              <div
                key={batter.playerId}
                onClick={() => {
                  onSelectPlayer(batter.playerId);
                  onNavigateTab('players');
                }}
                className="p-2.5 rounded-xl bg-[#181B24] hover:bg-[#1F2330] border border-[#232733] hover:border-emerald-500/40 transition cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-slate-800 border border-emerald-500/50 overflow-hidden flex items-center justify-center font-bold text-sm text-white">
                      {batter.playerName.charAt(0)}
                    </div>
                    {batter.isOnStrike && (
                      <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-black animate-pulse" title="On Strike"></span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-white hover:text-emerald-400 transition">
                        {batter.playerName}
                      </h4>
                      {batter.isOnStrike && (
                        <span className="text-[9px] font-mono font-bold px-1 rounded bg-emerald-500/20 text-emerald-400">
                          * STRIKE
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400">Australia • Right-hand bat</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-6 text-xs font-mono">
                  <div className="text-right">
                    <span className="text-base font-bold text-white font-mono-score">{batter.runs}</span>
                    <span className="text-slate-400 text-[11px]"> ({batter.balls})</span>
                  </div>
                  <span className="text-slate-300 sm:w-6 text-center">{batter.fours}</span>
                  <span className="text-[#ffe083] font-bold sm:w-6 text-center">{batter.sixes}</span>
                  <span className="text-emerald-400 font-bold sm:w-12 text-right">{batter.strikeRate}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Current Partnership Ribbon */}
          <div className="mt-3 p-2.5 rounded-xl bg-[#0A0B0E] border border-[#232733] flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Current 5th Wkt Partnership:</span>
            <span className="text-white font-bold">
              15 runs off 8 balls <span className="text-emerald-400 font-normal">(CRR: 11.25)</span>
            </span>
          </div>
        </div>

        {/* Current Bowler Telemetry (Right 5 Cols) */}
        <div className="lg:col-span-5 bg-[#13151C] border border-[#232733] rounded-2xl p-4 sm:p-5 shadow-xl">
          <div className="flex items-center justify-between mb-3 border-b border-[#232733] pb-2">
            <h3 className="font-headline text-base font-bold text-white tracking-wide flex items-center gap-2">
              <span>CURRENT BOWLER</span>
              <span className="text-[10px] font-mono text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded">
                Spell Active
              </span>
            </h3>
            <span className="text-xs font-mono text-emerald-400">O-M-R-W</span>
          </div>

          {currentBowler && (
            <div 
              onClick={() => {
                onSelectPlayer(currentBowler.playerId);
                onNavigateTab('players');
              }}
              className="p-3 rounded-xl bg-[#181B24] hover:bg-[#1F2330] border border-[#232733] hover:border-emerald-500/40 transition cursor-pointer"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-slate-800 border border-red-500/50 overflow-hidden flex items-center justify-center font-bold text-white">
                    {currentBowler.playerName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white hover:text-emerald-400 transition">
                      {currentBowler.playerName}
                    </h4>
                    <p className="text-[11px] text-slate-400">Right-arm fast • Yorker Specialist</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-emerald-400 font-mono-score">
                    {currentBowler.wickets}/{currentBowler.runs}
                  </span>
                  <span className="text-xs text-slate-400 block font-mono">
                    {currentBowler.overs} ov
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#232733] text-center text-xs font-mono">
                <div className="bg-[#0A0B0E] p-1.5 rounded-lg border border-[#232733]">
                  <span className="text-[10px] text-slate-400 block">Economy</span>
                  <span className="text-white font-bold">{currentBowler.economy}</span>
                </div>
                <div className="bg-[#0A0B0E] p-1.5 rounded-lg border border-[#232733]">
                  <span className="text-[10px] text-slate-400 block">Dots</span>
                  <span className="text-emerald-400 font-bold">{currentBowler.dots}</span>
                </div>
                <div className="bg-[#0A0B0E] p-1.5 rounded-lg border border-[#232733]">
                  <span className="text-[10px] text-slate-400 block">Top Speed</span>
                  <span className="text-[#ffe083] font-bold">148.4 km/h</span>
                </div>
              </div>
            </div>
          )}

          {/* Quick Pitch Condition Metric */}
          <div className="mt-3 p-2.5 rounded-xl bg-[#0A0B0E] border border-[#232733] text-xs text-slate-300 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              Pitch Bounce:
            </span>
            <span className="font-bold text-white font-mono">{match.pitchReport.bounce}</span>
          </div>
        </div>
      </div>

      {/* 3. INTERACTIVE MATCH TABS: WAGON WHEEL / PITCH MAP / OVERVIEW / COMMENTARY */}
      <div className="space-y-4">
        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-[#232733] pb-2 overflow-x-auto">
          {[
            { id: 'OVERVIEW', label: 'Match Overview & Worm' },
            { id: 'WAGON_WHEEL', label: '360° Wagon Wheel' },
            { id: 'PITCH_MAP', label: 'Pitch Heatmap & Speed' },
            { id: 'COMMENTARY', label: 'Live Commentary' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'bg-emerald-400 text-black shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                  : 'bg-[#13151C] border border-[#232733] text-slate-400 hover:text-white hover:bg-[#181B24]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Overview & Worm */}
        {activeSubTab === 'OVERVIEW' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <ManhattanWormChart
                inning1={firstInning}
                inning2={currentInning}
                team1Short={match.team1.shortName}
                team2Short={match.team2.shortName}
              />
            </div>
            <div className="lg:col-span-4 space-y-4">
              <WinPredictorMeter
                team1Short={match.team1.shortName}
                team2Short={match.team2.shortName}
                team1Percent={match.winProbability.team1Percent}
                team2Percent={match.winProbability.team2Percent}
              />

              {/* Match Key Stats Card */}
              <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-4 shadow-xl space-y-3">
                <h4 className="font-headline text-sm font-bold text-white tracking-wide">
                  MATCH MILESTONES & IMPACT
                </h4>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between p-2 rounded-lg bg-[#181B24] border border-[#232733]">
                    <span className="text-slate-400">Powerplay 1 (0-6 ov)</span>
                    <span className="text-white font-bold">IND 64/0 vs AUS 61/1</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-[#181B24] border border-[#232733]">
                    <span className="text-slate-400">Highest Individual</span>
                    <span className="text-[#ffe083] font-bold">Virat Kohli 76 (45)</span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-[#181B24] border border-[#232733]">
                    <span className="text-slate-400">Total Match Sixes</span>
                    <span className="text-emerald-400 font-bold">18 Sixes (162 total runs)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Wagon Wheel */}
        {activeSubTab === 'WAGON_WHEEL' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <WagonWheel selectedBatter="All Batters" />
            </div>
            <div className="lg:col-span-4">
              <WinPredictorMeter
                team1Short={match.team1.shortName}
                team2Short={match.team2.shortName}
                team1Percent={match.winProbability.team1Percent}
                team2Percent={match.winProbability.team2Percent}
              />
            </div>
          </div>
        )}

        {/* Tab 3: Pitch Map */}
        {activeSubTab === 'PITCH_MAP' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <PitchMap bowlerName="Jasprit Bumrah" />
            </div>
            <div className="lg:col-span-4">
              <WinPredictorMeter
                team1Short={match.team1.shortName}
                team2Short={match.team2.shortName}
                team1Percent={match.winProbability.team1Percent}
                team2Percent={match.winProbability.team2Percent}
              />
            </div>
          </div>
        )}

        {/* Tab 4: Live Commentary Feed */}
        {activeSubTab === 'COMMENTARY' && (
          <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-4 sm:p-5 shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#232733] pb-3">
              <h3 className="font-headline text-base font-bold text-white tracking-wide">
                BALL-BY-BALL COMMENTARY FEED
              </h3>

              <div className="flex items-center space-x-1 bg-[#0A0B0E] p-1 rounded-lg border border-[#232733] text-xs font-mono">
                <button
                  onClick={() => setCommentaryFilter('ALL')}
                  className={`px-3 py-1 rounded-md cursor-pointer transition ${
                    commentaryFilter === 'ALL' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  All Balls
                </button>
                <button
                  onClick={() => setCommentaryFilter('BOUNDARIES')}
                  className={`px-3 py-1 rounded-md cursor-pointer transition ${
                    commentaryFilter === 'BOUNDARIES' ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'text-slate-400 hover:text-emerald-400'
                  }`}
                >
                  Boundaries (4/6)
                </button>
                <button
                  onClick={() => setCommentaryFilter('WICKETS')}
                  className={`px-3 py-1 rounded-md cursor-pointer transition ${
                    commentaryFilter === 'WICKETS' ? 'bg-red-500/20 text-red-400 font-bold' : 'text-slate-400 hover:text-red-400'
                  }`}
                >
                  Wickets
                </button>
              </div>
            </div>

            {/* Commentary list */}
            <div className="space-y-3">
              {filteredCommentary.map((ball, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border transition ${
                    ball.isWicket
                      ? 'bg-red-950/20 border-red-500/40 text-red-200'
                      : ball.isSix
                      ? 'bg-amber-950/20 border-[#ffe083]/40 text-slate-200'
                      : ball.isBoundary
                      ? 'bg-emerald-950/20 border-emerald-500/40 text-slate-200'
                      : 'bg-[#181B24] border-[#232733] text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="font-bold text-white">Over {ball.overNum}.{ball.ballNumber}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      ball.isWicket
                        ? 'bg-red-600 text-white'
                        : ball.isSix
                        ? 'bg-[#ffe083] text-black'
                        : ball.isBoundary
                        ? 'bg-emerald-400 text-black'
                        : 'bg-white/10 text-slate-300'
                    }`}>
                      {ball.isWicket ? 'WICKET' : ball.isSix ? 'SIX' : ball.isBoundary ? 'FOUR' : `${ball.runs} RUNS`}
                    </span>
                  </div>
                  <p className="text-sm font-sans leading-relaxed text-slate-200">{ball.commentary}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
