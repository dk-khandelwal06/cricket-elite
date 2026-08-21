import React from 'react';
import { Match } from '../types';
import { Radio, ChevronRight } from 'lucide-react';

interface LiveScoreTickerProps {
  matches: Match[];
  activeMatchId: string;
  onSelectMatch: (matchId: string) => void;
}

export const LiveScoreTicker: React.FC<LiveScoreTickerProps> = ({
  matches,
  activeMatchId,
  onSelectMatch,
}) => {
  return (
    <div className="w-full bg-[#08090C] border-b border-[#232733] py-2 overflow-x-auto scrollbar-thin">
      <div className="max-w-7xl mx-auto px-4 flex items-center space-x-3 min-w-max">
        <div className="flex items-center gap-1.5 text-xs uppercase font-condensed font-bold text-emerald-400 pl-1 pr-3 border-r border-[#232733] shrink-0">
          <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
          <span>Live Matches</span>
        </div>

        {matches.map((m) => {
          const isSelected = m.id === activeMatchId;
          const inn1 = m.innings[0];
          const inn2 = m.innings[1];

          return (
            <div
              key={m.id}
              onClick={() => onSelectMatch(m.id)}
              className={`flex items-center gap-3 px-3 py-1.5 rounded-lg border transition cursor-pointer select-none ${
                isSelected
                  ? 'bg-[#181B24] border-emerald-500 shadow-[0_0_12px_rgba(34,197,94,0.2)]'
                  : 'bg-[#13151C] border-[#232733] hover:border-[#2f3545] hover:bg-[#1A1D26]'
              }`}
            >
              {/* Format & Stage Badge */}
              <div className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#1C1F2B] text-slate-400 border border-[#232733]">
                {m.format}
              </div>

              {/* Teams & Scores */}
              <div className="flex flex-col text-xs leading-tight">
                <div className="flex items-center justify-between gap-4 font-semibold text-white">
                  <span className="flex items-center gap-1">
                    <span>{m.team1.flag}</span>
                    <span>{m.team1.shortName}</span>
                  </span>
                  <span className="font-mono-score text-slate-300">
                    {inn1 ? `${inn1.runs}/${inn1.wickets}` : 'Yet to Bat'}
                    {inn1 && <span className="text-[10px] text-slate-500 ml-1">({inn1.overs})</span>}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 font-semibold text-white mt-0.5">
                  <span className="flex items-center gap-1">
                    <span>{m.team2.flag}</span>
                    <span className={m.currentInningIndex === 1 ? 'text-emerald-400' : ''}>{m.team2.shortName}</span>
                  </span>
                  <span className="font-mono-score text-emerald-400">
                    {inn2 ? `${inn2.runs}/${inn2.wickets}` : 'Yet to Bat'}
                    {inn2 && <span className="text-[10px] text-slate-400 ml-1">({inn2.overs})</span>}
                  </span>
                </div>
              </div>

              {/* Status Indicator */}
              <div className="pl-2 border-l border-[#232733] text-right">
                <span className={`text-[10px] font-semibold block uppercase ${
                  m.status === 'LIVE' ? 'text-red-400' : 'text-emerald-400'
                }`}>
                  {m.status === 'LIVE' ? '● LIVE' : m.status}
                </span>
                <span className="text-[9px] text-slate-400 font-medium block max-w-[110px] truncate">
                  {m.statusText}
                </span>
              </div>

              <ChevronRight className="w-3.5 h-3.5 text-slate-500 ml-1" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
