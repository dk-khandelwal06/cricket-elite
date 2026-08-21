import React, { useState } from 'react';
import { TOURNAMENT_DATA } from '../data/cricketData';
import { Trophy, Award, Flame, Users, Calendar, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

interface TournamentHubViewProps {
  onSelectPlayer: (playerId: string) => void;
  onSelectMatch: (matchId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const TournamentHubView: React.FC<TournamentHubViewProps> = ({
  onSelectPlayer,
  onSelectMatch,
  onNavigateTab,
}) => {
  const [activeStageTab, setActiveStageTab] = useState<'STANDINGS' | 'BRACKET' | 'LEADERBOARDS' | 'FIXTURES'>('STANDINGS');

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. HERO TOURNAMENT TROPHY BANNER */}
      <div className="relative rounded-2xl overflow-hidden border border-[#232733] bg-gradient-to-r from-[#181A24] via-[#13151C] to-[#0A0B0E] shadow-2xl p-6 sm:p-8">
        <div 
          className="absolute inset-0 opacity-20 mix-blend-screen bg-cover bg-center pointer-events-none"
          style={{
            backgroundImage: `url('${TOURNAMENT_DATA.trophyImageUrl}')`,
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#ffe083]/20 text-[#ffe083] border border-[#ffe083]/30 uppercase flex items-center gap-1">
                <Trophy className="w-3.5 h-3.5" />
                {TOURNAMENT_DATA.edition} • {TOURNAMENT_DATA.season}
              </span>
              <span className="text-xs font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                Host: {TOURNAMENT_DATA.host}
              </span>
            </div>

            <h1 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-wide">
              {TOURNAMENT_DATA.name.toUpperCase()}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-sans leading-relaxed">
              20 nations, 55 high-octane fixtures across 9 premier venues. The battle for world supremacy culminates at the Melbourne Cricket Ground.
            </p>

            <div className="pt-2 flex items-center space-x-3 text-xs font-mono">
              <span className="text-emerald-400 font-bold">Stage: {TOURNAMENT_DATA.currentStage}</span>
              <span className="text-slate-600">•</span>
              <button
                onClick={() => onNavigateTab('live')}
                className="bg-emerald-400 hover:bg-emerald-300 text-black font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 transition cursor-pointer"
              >
                <span>Jump to Live Final</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-2xl bg-gradient-to-b from-white/10 to-transparent p-3 border border-[#ffe083]/30 shadow-2xl flex items-center justify-center">
              <img
                src={TOURNAMENT_DATA.trophyImageUrl}
                alt="ICC Trophy"
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain filter drop-shadow-[0_0_20px_rgba(255,224,131,0.4)]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUB NAVIGATION TABS */}
      <div className="flex items-center space-x-2 border-b border-[#232733] pb-2 overflow-x-auto">
        {[
          { id: 'STANDINGS', label: 'Points Tables & Groups' },
          { id: 'BRACKET', label: 'Knockout Tree Bracket' },
          { id: 'LEADERBOARDS', label: 'Caps & Stat Leaders' },
          { id: 'FIXTURES', label: 'Fixtures & Schedule' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveStageTab(tab.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer whitespace-nowrap ${
              activeStageTab === tab.id
                ? 'bg-emerald-400 text-black shadow-[0_0_12px_rgba(34,197,94,0.4)]'
                : 'bg-[#13151C] border border-[#232733] text-slate-400 hover:text-white hover:bg-[#181B24]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 3. TAB 1: POINTS TABLES */}
      {activeStageTab === 'STANDINGS' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {TOURNAMENT_DATA.groups.map((grp, gIdx) => (
              <div key={gIdx} className="bg-[#13151C] border border-[#232733] rounded-2xl overflow-hidden shadow-xl">
                <div className="p-4 bg-[#181B24] border-b border-[#232733] flex items-center justify-between">
                  <h3 className="font-headline text-base font-bold text-white tracking-wide">
                    {grp.groupName.toUpperCase()}
                  </h3>
                  <span className="text-[11px] font-mono text-emerald-400">Top 2 Qualify for Semis</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead>
                      <tr className="bg-[#0A0B0E] text-slate-400 border-b border-[#232733]">
                        <th className="py-2.5 px-3">POS</th>
                        <th className="py-2.5 px-4">TEAM</th>
                        <th className="py-2.5 px-2 text-center">P</th>
                        <th className="py-2.5 px-2 text-center">W</th>
                        <th className="py-2.5 px-2 text-center">L</th>
                        <th className="py-2.5 px-3 text-right">NRR</th>
                        <th className="py-2.5 px-3 text-right font-bold text-white">PTS</th>
                        <th className="py-2.5 px-4 text-center">FORM</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#232733]">
                      {grp.standings.map((st, idx) => (
                        <tr key={idx} className={`hover:bg-[#181B24] transition ${st.qualified ? 'bg-emerald-950/20' : ''}`}>
                          <td className="py-3 px-3 font-bold text-slate-400">
                            {st.rank}
                            {st.qualified && <span className="text-emerald-400 ml-1">Q</span>}
                          </td>
                          <td className="py-3 px-4 font-bold text-white">
                            <div className="flex items-center gap-2">
                              <span>{st.team.flag}</span>
                              <span>{st.team.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-center text-slate-300">{st.played}</td>
                          <td className="py-3 px-2 text-center text-emerald-400 font-bold">{st.won}</td>
                          <td className="py-3 px-2 text-center text-red-400">{st.lost}</td>
                          <td className={`py-3 px-3 text-right font-semibold ${st.netRunRate >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            {st.netRunRate >= 0 ? `+${st.netRunRate.toFixed(3)}` : st.netRunRate.toFixed(3)}
                          </td>
                          <td className="py-3 px-3 text-right font-bold text-white font-mono-score text-sm">
                            {st.points}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <div className="flex items-center justify-center space-x-1">
                              {st.form.map((f, fIdx) => (
                                <span
                                  key={fIdx}
                                  className={`w-4 h-4 rounded text-[9px] font-bold flex items-center justify-center ${
                                    f === 'W' ? 'bg-emerald-500 text-black' : 'bg-red-500 text-white'
                                  }`}
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. TAB 2: KNOCKOUT TREE BRACKET */}
      {activeStageTab === 'BRACKET' && (
        <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-[#232733] pb-3">
            <h3 className="font-headline text-lg font-bold text-white">
              KNOCKOUT TOURNAMENT TREE
            </h3>
            <span className="text-xs font-mono text-[#ffe083]">Grand Final In Progress</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {/* Semi-Finals Left */}
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Semi-Final 1 (Sydney)
              </span>
              <div className="bg-[#181B24] p-4 rounded-xl border border-[#232733] space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold text-emerald-400">
                  <span>🇮🇳 India</span>
                  <span>184/3 (19.2)</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>🏴󠁧󠁢󠁥󠁮󠁧󠁿 England</span>
                  <span>180/7 (20.0)</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono pt-1 border-t border-[#232733]">
                  India won by 7 wickets
                </p>
              </div>

              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block pt-2">
                Semi-Final 2 (Adelaide)
              </span>
              <div className="bg-[#181B24] p-4 rounded-xl border border-[#232733] space-y-2">
                <div className="flex justify-between text-xs font-mono font-bold text-emerald-400">
                  <span>🇦🇺 Australia</span>
                  <span>172/4 (18.1)</span>
                </div>
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>🇿🇦 South Africa</span>
                  <span>168/8 (20.0)</span>
                </div>
                <p className="text-[10px] text-slate-500 font-mono pt-1 border-t border-[#232733]">
                  Australia won by 6 wickets
                </p>
              </div>
            </div>

            {/* Final Center */}
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#ffe083] uppercase tracking-wider block text-center">
                GRAND FINAL (MCG MELBOURNE)
              </span>
              <div className="bg-gradient-to-b from-[#1E222D] to-[#13151C] p-5 rounded-2xl border-2 border-[#ffe083] shadow-[0_0_25px_rgba(255,224,131,0.2)] space-y-3">
                <div className="flex items-center justify-between text-sm font-bold text-white font-mono">
                  <span className="flex items-center gap-1.5">
                    <span>🇮🇳</span>
                    <span>India</span>
                  </span>
                  <span className="text-slate-300">197/5 (20)</span>
                </div>
                <div className="flex items-center justify-between text-sm font-bold text-emerald-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <span>🇦🇺</span>
                    <span>Australia</span>
                  </span>
                  <span>177/4 (18.2)</span>
                </div>
                <div className="pt-2 border-t border-[#232733] text-center">
                  <span className="text-xs font-mono font-bold text-[#ffe083]">
                    ● LIVE: Need 21 runs off 10 balls
                  </span>
                </div>
              </div>
            </div>

            {/* Trophy Winner Showcase */}
            <div className="text-center space-y-3 bg-[#181B24] p-6 rounded-2xl border border-[#232733]">
              <Trophy className="w-12 h-12 text-[#ffe083] mx-auto animate-bounce" />
              <h4 className="font-headline text-lg font-bold text-white">WORLD CHAMPIONS 2026</h4>
              <p className="text-xs font-mono text-slate-400">
                Awaiting final ball conclusion at the MCG. Trophy presentation will follow match conclusion.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: LEADERBOARDS & STAT LEADERS */}
      {activeStageTab === 'LEADERBOARDS' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Most Runs */}
          <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-[#232733] pb-2">
              <h4 className="font-headline text-sm font-bold text-white">MOST RUNS</h4>
              <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                ORANGE CAP
              </span>
            </div>
            <div className="space-y-3">
              {TOURNAMENT_DATA.statsLeaders.mostRuns.map((player, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#181B24] text-xs font-mono border border-[#232733]">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={player.avatarUrl} 
                      alt={player.playerName} 
                      referrerPolicy="no-referrer" 
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=400&q=80';
                      }}
                      className="w-7 h-7 rounded-full object-cover" 
                    />
                    <div>
                      <span className="text-white font-bold block">{player.playerName}</span>
                      <span className="text-slate-400 text-[10px]">{player.teamShort} • Avg {player.average}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#ffe083] font-mono-score">{player.runs}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Most Wickets */}
          <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-[#232733] pb-2">
              <h4 className="font-headline text-sm font-bold text-white">MOST WICKETS</h4>
              <span className="text-[10px] font-mono bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded font-bold">
                PURPLE CAP
              </span>
            </div>
            <div className="space-y-3">
              {TOURNAMENT_DATA.statsLeaders.mostWickets.map((player, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#181B24] text-xs font-mono border border-[#232733]">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={player.avatarUrl} 
                      alt={player.playerName} 
                      referrerPolicy="no-referrer" 
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=400&q=80';
                      }}
                      className="w-7 h-7 rounded-full object-cover" 
                    />
                    <div>
                      <span className="text-white font-bold block">{player.playerName}</span>
                      <span className="text-slate-400 text-[10px]">{player.teamShort} • Econ {player.economy}</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-emerald-400 font-mono-score">{player.wickets}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highest Strike Rate */}
          <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-[#232733] pb-2">
              <h4 className="font-headline text-sm font-bold text-white">STRIKE RATE</h4>
              <span className="text-[10px] font-mono bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded font-bold">
                MIN 100 BALLS
              </span>
            </div>
            <div className="space-y-3">
              {TOURNAMENT_DATA.statsLeaders.highestStrikeRate.map((player, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#181B24] text-xs font-mono border border-[#232733]">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={player.avatarUrl} 
                      alt={player.playerName} 
                      referrerPolicy="no-referrer" 
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=400&q=80';
                      }}
                      className="w-7 h-7 rounded-full object-cover" 
                    />
                    <div>
                      <span className="text-white font-bold block">{player.playerName}</span>
                      <span className="text-slate-400 text-[10px]">{player.teamShort} • {player.runs}r ({player.balls}b)</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-blue-400 font-mono-score">{player.strikeRate}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Most Sixes */}
          <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-4 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-[#232733] pb-2">
              <h4 className="font-headline text-sm font-bold text-white">MAXIMUM SIXES</h4>
              <span className="text-[10px] font-mono bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded font-bold">
                POWER HITTERS
              </span>
            </div>
            <div className="space-y-3">
              {TOURNAMENT_DATA.statsLeaders.mostSixes.map((player, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 rounded-xl bg-[#181B24] text-xs font-mono border border-[#232733]">
                  <div className="flex items-center gap-2.5">
                    <img 
                      src={player.avatarUrl} 
                      alt={player.playerName} 
                      referrerPolicy="no-referrer" 
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=400&q=80';
                      }}
                      className="w-7 h-7 rounded-full object-cover" 
                    />
                    <div>
                      <span className="text-white font-bold block">{player.playerName}</span>
                      <span className="text-slate-400 text-[10px]">{player.teamShort} • {player.innings} Inns</span>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-red-400 font-mono-score">{player.sixes}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 4: FIXTURES */}
      {activeStageTab === 'FIXTURES' && (
        <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-6 shadow-xl space-y-4">
          <h3 className="font-headline text-lg font-bold text-white">RECENT & UPCOMING FIXTURES</h3>
          <div className="space-y-3">
            {[
              { teams: 'India vs Australia', date: 'Today, 19:00 AEDT', venue: 'MCG, Melbourne', status: 'LIVE FINAL', result: 'AUS need 21 off 10b' },
              { teams: 'England vs South Africa', date: 'Yesterday', venue: 'Lord\'s, London', status: 'LIVE', result: 'SA need 38 runs' },
              { teams: 'Pakistan vs New Zealand', date: '13 Nov 2026', venue: 'Gaddafi Stadium, Lahore', status: 'COMPLETED', result: 'Pakistan won by 5 wickets' },
              { teams: 'India vs England (Semi 1)', date: '11 Nov 2026', venue: 'SCG, Sydney', status: 'COMPLETED', result: 'India won by 7 wickets' },
            ].map((fix, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#181B24] border border-[#232733] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono">
                <div>
                  <h4 className="text-sm font-bold text-white">{fix.teams}</h4>
                  <p className="text-slate-400 text-[11px]">{fix.venue} • {fix.date}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${fix.status === 'LIVE FINAL' ? 'bg-red-600 text-white' : 'bg-white/10 text-slate-300'}`}>
                    {fix.status}
                  </span>
                  <span className="text-xs text-emerald-400 font-semibold block mt-0.5">{fix.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
