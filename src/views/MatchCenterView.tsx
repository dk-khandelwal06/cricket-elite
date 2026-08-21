import React, { useState } from 'react';
import { Match } from '../types';
import { WagonWheel } from '../components/WagonWheel';
import { PitchMap } from '../components/PitchMap';
import { ManhattanWormChart } from '../components/ManhattanWormChart';
import { Activity, ShieldCheck, MapPin, Award, Calendar, Users } from 'lucide-react';

interface MatchCenterViewProps {
  match: Match;
  onSelectPlayer: (playerId: string) => void;
}

export const MatchCenterView: React.FC<MatchCenterViewProps> = ({
  match,
  onSelectPlayer,
}) => {
  const [selectedInningTab, setSelectedInningTab] = useState<1 | 2>(1);

  const inn1 = match.innings[0];
  const inn2 = match.innings[1];
  const activeInning = selectedInningTab === 1 ? inn1 : inn2;
  const battingTeam = selectedInningTab === 1 ? match.team1 : match.team2;
  const bowlingTeam = selectedInningTab === 1 ? match.team2 : match.team1;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Banner */}
      <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-4 sm:p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#232733] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-slate-300">
                {match.stage}
              </span>
              <span className="text-xs text-slate-600">•</span>
              <span className="text-xs text-slate-300">{match.venue.name}</span>
            </div>
            <h1 className="font-headline text-2xl sm:text-3xl font-bold text-white tracking-wide mt-1">
              {match.title}
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{match.toss.text}</p>
          </div>

          {/* Quick Score Summaries */}
          <div className="flex items-center space-x-6 text-right font-mono">
            <div>
              <span className="text-xs text-slate-400 block">{match.team1.shortName} (1st Inn)</span>
              <span className="text-xl font-bold text-white font-mono-score">{inn1.runs}/{inn1.wickets}</span>
              <span className="text-xs text-slate-400 block">({inn1.overs} ov)</span>
            </div>
            <div className="h-8 w-px bg-[#232733]"></div>
            <div>
              <span className="text-xs text-emerald-400 block">{match.team2.shortName} (2nd Inn)</span>
              <span className="text-xl font-bold text-emerald-400 font-mono-score">{inn2.runs}/{inn2.wickets}</span>
              <span className="text-xs text-slate-400 block">({inn2.overs} ov)</span>
            </div>
          </div>
        </div>

        {/* Inning Tab Switcher */}
        <div className="flex items-center space-x-2 pt-4">
          <button
            onClick={() => setSelectedInningTab(1)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer ${
              selectedInningTab === 1
                ? 'bg-[#0284c7] text-white shadow-[0_0_12px_rgba(2,132,199,0.5)]'
                : 'bg-[#181B24] border border-[#232733] text-slate-400 hover:text-white'
            }`}
          >
            <span>{match.team1.name} Innings</span>
            <span className="bg-black/30 px-1.5 py-0.5 rounded font-mono text-[11px]">{inn1.runs}/{inn1.wickets}</span>
          </button>

          <button
            onClick={() => setSelectedInningTab(2)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition cursor-pointer ${
              selectedInningTab === 2
                ? 'bg-emerald-400 text-black shadow-[0_0_12px_rgba(34,197,94,0.5)]'
                : 'bg-[#181B24] border border-[#232733] text-slate-400 hover:text-white'
            }`}
          >
            <span>{match.team2.name} Innings</span>
            <span className="bg-black/30 px-1.5 py-0.5 rounded font-mono text-[11px]">{inn2.runs}/{inn2.wickets}</span>
          </button>
        </div>
      </div>

      {/* FULL SCORECARD TABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          {/* Batting Scorecard Table */}
          <div className="bg-[#13151C] border border-[#232733] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 bg-[#181B24] border-b border-[#232733] flex items-center justify-between">
              <h3 className="font-headline text-base font-bold text-white tracking-wide">
                BATTING • {battingTeam.name.toUpperCase()}
              </h3>
              <span className="text-xs font-mono text-slate-400">
                Total: <strong className="text-white">{activeInning.runs}/{activeInning.wickets}</strong> ({activeInning.overs} Ov)
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-[#0A0B0E] text-slate-400 border-b border-[#232733]">
                    <th className="py-2.5 px-4 font-semibold">BATSMAN</th>
                    <th className="py-2.5 px-3 font-semibold">DISMISSAL</th>
                    <th className="py-2.5 px-3 text-right font-semibold">R</th>
                    <th className="py-2.5 px-3 text-right font-semibold">B</th>
                    <th className="py-2.5 px-3 text-right font-semibold">4s</th>
                    <th className="py-2.5 px-3 text-right font-semibold">6s</th>
                    <th className="py-2.5 px-4 text-right font-semibold">SR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#232733]">
                  {activeInning.batting.map((batter, idx) => (
                    <tr 
                      key={idx}
                      onClick={() => onSelectPlayer(batter.playerId)}
                      className="hover:bg-[#181B24] transition cursor-pointer group"
                    >
                      <td className="py-3 px-4 font-bold text-white group-hover:text-emerald-400 transition">
                        <div className="flex items-center gap-1.5">
                          <span>{batter.playerName}</span>
                          {batter.isNotOut && <span className="text-emerald-400">*</span>}
                        </div>
                      </td>
                      <td className="py-3 px-3 text-slate-400 text-[11px] max-w-[160px] truncate">
                        {batter.dismissal}
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-white font-mono-score text-sm">
                        {batter.runs}
                      </td>
                      <td className="py-3 px-3 text-right text-slate-400">{batter.balls}</td>
                      <td className="py-3 px-3 text-right text-slate-300">{batter.fours}</td>
                      <td className="py-3 px-3 text-right text-[#ffe083] font-semibold">{batter.sixes}</td>
                      <td className="py-3 px-4 text-right text-emerald-400 font-bold">{batter.strikeRate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Extras and Totals Footer */}
            <div className="p-4 bg-[#181B24] border-t border-[#232733] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
              <div className="text-slate-400">
                <span>Extras: </span>
                <strong className="text-white">{activeInning.extras.total}</strong>
                <span className="text-slate-500 text-[11px] ml-1">
                  (b {activeInning.extras.byes}, lb {activeInning.extras.legByes}, w {activeInning.extras.wides}, nb {activeInning.extras.noBalls})
                </span>
              </div>
              <div className="text-white">
                <span>TOTAL: </span>
                <strong className="text-base text-emerald-400 font-mono-score ml-1">
                  {activeInning.runs}/{activeInning.wickets}
                </strong>
                <span className="text-slate-400 ml-1">({activeInning.overs} Overs, RR: {(activeInning.runs / activeInning.overs).toFixed(2)})</span>
              </div>
            </div>
          </div>

          {/* Bowling Scorecard Table */}
          <div className="bg-[#13151C] border border-[#232733] rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 bg-[#181B24] border-b border-[#232733] flex items-center justify-between">
              <h3 className="font-headline text-base font-bold text-white tracking-wide">
                BOWLING • {bowlingTeam.name.toUpperCase()}
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-[#0A0B0E] text-slate-400 border-b border-[#232733]">
                    <th className="py-2.5 px-4 font-semibold">BOWLER</th>
                    <th className="py-2.5 px-3 text-right font-semibold">O</th>
                    <th className="py-2.5 px-3 text-right font-semibold">M</th>
                    <th className="py-2.5 px-3 text-right font-semibold">R</th>
                    <th className="py-2.5 px-3 text-right font-semibold">W</th>
                    <th className="py-2.5 px-3 text-right font-semibold">ECON</th>
                    <th className="py-2.5 px-4 text-right font-semibold">DOTS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#232733]">
                  {activeInning.bowling.map((bowler, idx) => (
                    <tr 
                      key={idx}
                      onClick={() => onSelectPlayer(bowler.playerId)}
                      className="hover:bg-[#181B24] transition cursor-pointer group"
                    >
                      <td className="py-3 px-4 font-bold text-white group-hover:text-emerald-400 transition">
                        {bowler.playerName}
                      </td>
                      <td className="py-3 px-3 text-right text-slate-300">{bowler.overs}</td>
                      <td className="py-3 px-3 text-right text-slate-400">{bowler.maidens}</td>
                      <td className="py-3 px-3 text-right text-slate-300">{bowler.runs}</td>
                      <td className="py-3 px-3 text-right font-bold text-emerald-400 font-mono-score text-sm">
                        {bowler.wickets}
                      </td>
                      <td className="py-3 px-3 text-right text-white font-bold">{bowler.economy}</td>
                      <td className="py-3 px-4 text-right text-slate-400">{bowler.dots}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Fall of Wickets */}
          {activeInning.fallOfWickets.length > 0 && (
            <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-4 shadow-xl">
              <h3 className="font-headline text-sm font-bold text-white tracking-wide mb-3">
                FALL OF WICKETS
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 text-xs font-mono">
                {activeInning.fallOfWickets.map((fow) => (
                  <div key={fow.wicketNumber} className="bg-[#181B24] p-2.5 rounded-xl border border-[#232733]">
                    <span className="text-[#ffe083] font-bold block">{fow.runs}-{fow.wicketNumber}</span>
                    <span className="text-slate-300 text-[11px] block truncate">{fow.playerName}</span>
                    <span className="text-slate-500 text-[10px] block">Over {fow.over}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right 4 Cols: Analytics & Match Details */}
        <div className="lg:col-span-4 space-y-6">
          <ManhattanWormChart
            inning1={inn1}
            inning2={inn2}
            team1Short={match.team1.shortName}
            team2Short={match.team2.shortName}
          />

          {/* Match Information Panel */}
          <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-4 shadow-xl space-y-3">
            <h4 className="font-headline text-sm font-bold text-white tracking-wide border-b border-[#232733] pb-2">
              MATCH INFO & OFFICIALS
            </h4>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[#232733]">
                <span className="text-slate-400">Match:</span>
                <span className="text-white font-semibold">{match.title}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#232733]">
                <span className="text-slate-400">Series:</span>
                <span className="text-white font-semibold">{match.series}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#232733]">
                <span className="text-slate-400">Toss:</span>
                <span className="text-white font-semibold">{match.team2.name} (Bowl)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#232733]">
                <span className="text-slate-400">Venue:</span>
                <span className="text-white font-semibold">{match.venue.name}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#232733]">
                <span className="text-slate-400">Capacity:</span>
                <span className="text-white font-semibold">{match.venue.capacity}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#232733]">
                <span className="text-slate-400">Umpires:</span>
                <span className="text-white font-semibold">Richard Illingworth, Nitin Menon</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">TV Umpire:</span>
                <span className="text-white font-semibold">Rod Tucker</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
