import React from 'react';
import { Activity, Zap } from 'lucide-react';

interface WinPredictorMeterProps {
  team1Short: string;
  team2Short: string;
  team1Color?: string;
  team2Color?: string;
  team1Percent: number;
  team2Percent: number;
}

export const WinPredictorMeter: React.FC<WinPredictorMeterProps> = ({
  team1Short,
  team2Short,
  team1Color = '#00519E',
  team2Color = '#00471b',
  team1Percent,
  team2Percent,
}) => {
  return (
    <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-emerald-400" />
          <h4 className="font-headline text-base font-bold text-white tracking-wide">
            WIN PROBABILITY MATRIX
          </h4>
        </div>
        <span className="text-[10px] font-mono bg-[#181B24] border border-[#232733] px-2 py-0.5 rounded text-slate-300 flex items-center gap-1">
          <Zap className="w-3 h-3 text-[#ffe083]" />
          Live Sim Model
        </span>
      </div>

      <p className="text-xs text-slate-400 mb-3">
        Real-time statistical win probability calibrated per delivery based on run rate, wickets in hand & death overs pace.
      </p>

      {/* Probabilities Row */}
      <div className="flex items-baseline justify-between mb-2 font-headline">
        <div className="flex items-baseline gap-2">
          <span className="text-xl font-bold text-white">{team1Short}</span>
          <span className="font-mono-score text-2xl font-bold text-[#38bdf8]">
            {team1Percent}%
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-mono-score text-2xl font-bold text-emerald-400">
            {team2Percent}%
          </span>
          <span className="text-xl font-bold text-white">{team2Short}</span>
        </div>
      </div>

      {/* Probability Progress Bar */}
      <div className="h-3.5 w-full bg-[#0A0B0E] rounded-full overflow-hidden flex p-0.5 border border-[#232733] relative">
        <div
          style={{ width: `${team1Percent}%`, backgroundColor: '#0284c7' }}
          className="h-full rounded-l-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(2,132,199,0.6)]"
        />
        <div
          style={{ width: `${team2Percent}%`, backgroundColor: '#22c55e' }}
          className="h-full rounded-r-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(34,197,94,0.6)]"
        />
        {/* Center 50% needle */}
        <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white shadow-[0_0_4px_white]"></div>
      </div>

      <div className="flex justify-between items-center mt-2 text-[11px] font-mono text-slate-400">
        <span>Defending 197</span>
        <span className="text-slate-300 font-bold">50-50 Par Line</span>
        <span className="text-emerald-400">Chasing 21 off 10</span>
      </div>
    </div>
  );
};
