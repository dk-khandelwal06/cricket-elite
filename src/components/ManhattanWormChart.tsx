import React, { useState } from 'react';
import { Inning } from '../types';
import { BarChart3, TrendingUp } from 'lucide-react';

interface ManhattanWormChartProps {
  inning1: Inning;
  inning2: Inning;
  team1Short: string;
  team2Short: string;
}

export const ManhattanWormChart: React.FC<ManhattanWormChartProps> = ({
  inning1,
  inning2,
  team1Short,
  team2Short,
}) => {
  const [chartMode, setChartMode] = useState<'MANHATTAN' | 'WORM'>('MANHATTAN');
  const [hoveredOver, setHoveredOver] = useState<number | null>(null);

  const maxOver = Math.max(
    inning1.runRateByOver.length || 20,
    inning2.runRateByOver.length || 20
  );

  const oversList = Array.from({ length: 20 }, (_, i) => i + 1);

  // Maximum over score for scale
  const maxRunsInOver = Math.max(
    ...inning1.runRateByOver.map((o) => o.runs),
    ...inning2.runRateByOver.map((o) => o.runs),
    18
  );

  const targetScore = inning1.runs || 197;

  return (
    <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-4 shadow-xl">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-4">
        <div>
          <h3 className="font-headline text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <span>{chartMode === 'MANHATTAN' ? 'MANHATTAN (OVERS BREAKDOWN)' : 'CUMULATIVE WORM CURVE'}</span>
          </h3>
          <p className="text-xs text-slate-400">
            {chartMode === 'MANHATTAN'
              ? 'Runs per over comparative bars & wicket fall markers'
              : 'Progressive chase progression comparison across 20 overs'}
          </p>
        </div>

        <div className="flex items-center space-x-1 bg-[#0A0B0E] p-1 rounded-lg border border-[#232733] text-xs font-mono">
          <button
            onClick={() => setChartMode('MANHATTAN')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md cursor-pointer transition ${
              chartMode === 'MANHATTAN' ? 'bg-emerald-400 text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Manhattan</span>
          </button>
          <button
            onClick={() => setChartMode('WORM')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md cursor-pointer transition ${
              chartMode === 'WORM' ? 'bg-[#ffe083] text-black font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Worm Curve</span>
          </button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-6 mb-3 text-xs font-mono">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-[#0284c7] border border-white/20"></span>
          <span className="text-white font-semibold">{team1Short} (Innings 1)</span>
          <span className="text-slate-400">({inning1.runs}/{inning1.wickets})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded bg-emerald-400 border border-black"></span>
          <span className="text-white font-semibold">{team2Short} (Innings 2)</span>
          <span className="text-emerald-400">({inning2.runs}/{inning2.wickets})</span>
        </div>
      </div>

      {/* Chart Canvas */}
      {chartMode === 'MANHATTAN' ? (
        /* MANHATTAN BARS */
        <div className="h-64 w-full flex items-end justify-between pt-6 pb-6 px-2 bg-[#0A0B0E] rounded-xl border border-[#232733] relative select-none">
          {/* Y-Axis Grid Lines */}
          <div className="absolute inset-x-2 inset-y-6 flex flex-col justify-between pointer-events-none opacity-20">
            <div className="border-b border-white text-[9px] font-mono text-slate-400">20 rpo</div>
            <div className="border-b border-white text-[9px] font-mono text-slate-400">15 rpo</div>
            <div className="border-b border-white text-[9px] font-mono text-slate-400">10 rpo</div>
            <div className="border-b border-white text-[9px] font-mono text-slate-400">5 rpo</div>
            <div className="border-b border-white text-[9px] font-mono text-slate-400">0</div>
          </div>

          {oversList.map((overNum) => {
            const ov1 = inning1.runRateByOver.find((o) => o.over === overNum);
            const ov2 = inning2.runRateByOver.find((o) => o.over === overNum);

            const r1 = ov1 ? ov1.runs : 0;
            const r2 = ov2 ? ov2.runs : 0;
            const w1 = ov1 ? ov1.wickets : 0;
            const w2 = ov2 ? ov2.wickets : 0;

            const h1Percent = Math.min(100, (r1 / 20) * 100);
            const h2Percent = ov2 ? Math.min(100, (r2 / 20) * 100) : 0;
            const isHovered = hoveredOver === overNum;

            return (
              <div
                key={overNum}
                onMouseEnter={() => setHoveredOver(overNum)}
                onMouseLeave={() => setHoveredOver(null)}
                className="flex-1 flex flex-col items-center h-full justify-end group relative cursor-pointer px-0.5"
              >
                {/* Tooltip on Hover */}
                {isHovered && (
                  <div className="absolute -top-12 z-30 bg-[#181B24] border border-emerald-500 text-white p-1.5 rounded-lg text-[10px] font-mono shadow-2xl whitespace-nowrap">
                    <span className="text-[#ffe083] font-bold">Over {overNum}:</span> {team1Short} {r1}r | {team2Short} {ov2 ? `${r2}r` : '-'}
                  </div>
                )}

                {/* Over Bar Pair */}
                <div className="w-full flex items-end justify-center gap-0.5 h-full max-h-48">
                  {/* Innings 1 Bar */}
                  <div
                    style={{ height: `${h1Percent}%` }}
                    className={`w-2 sm:w-2.5 bg-[#0284c7] rounded-t-sm transition-all relative ${
                      isHovered ? 'bg-[#38bdf8] ring-1 ring-white' : ''
                    }`}
                  >
                    {w1 > 0 && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
                    )}
                  </div>

                  {/* Innings 2 Bar */}
                  {ov2 && (
                    <div
                      style={{ height: `${h2Percent}%` }}
                      className={`w-2 sm:w-2.5 bg-emerald-400 rounded-t-sm transition-all relative ${
                        isHovered ? 'brightness-125 ring-1 ring-white' : ''
                      }`}
                    >
                      {w2 > 0 && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
                      )}
                    </div>
                  )}
                </div>

                {/* Over Number Label */}
                <span className={`text-[10px] font-mono mt-1 ${isHovered ? 'text-emerald-400 font-bold' : 'text-slate-400'}`}>
                  {overNum}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        /* WORM CURVE CHART */
        <div className="h-64 w-full bg-[#0A0B0E] rounded-xl border border-[#232733] p-4 relative select-none flex flex-col justify-between">
          <svg className="w-full h-48 overflow-visible">
            {/* Target line */}
            <line x1="0" y1="20" x2="100%" y2="20" stroke="#ffe083" strokeDasharray="4 4" strokeWidth="1.5" />
            <text x="98%" y="15" textAnchor="end" fill="#ffe083" fontSize="10" fontWeight="bold" className="font-mono">
              Target: {targetScore + 1}
            </text>

            {/* Innings 1 Curve Points */}
            <polyline
              fill="none"
              stroke="#0284c7"
              strokeWidth="3"
              strokeLinecap="round"
              points={inning1.runRateByOver
                .map((o) => {
                  const x = (o.over / maxOver) * 100;
                  const y = 100 - (o.cumulativeRuns / (targetScore + 20)) * 100;
                  return `${x}%,${y}%`;
                })
                .join(' ')}
            />

            {/* Innings 2 Curve Points */}
            <polyline
              fill="none"
              stroke="#22c55e"
              strokeWidth="3"
              strokeLinecap="round"
              points={inning2.runRateByOver
                .map((o) => {
                  const x = (o.over / maxOver) * 100;
                  const y = 100 - (o.cumulativeRuns / (targetScore + 20)) * 100;
                  return `${x}%,${y}%`;
                })
                .join(' ')}
            />

            {/* Wicket fall markers for Innings 2 */}
            {inning2.fallOfWickets.map((w, idx) => {
              const x = (w.over / maxOver) * 100;
              const y = 100 - (w.runs / (targetScore + 20)) * 100;
              return (
                <g key={idx}>
                  <circle cx={`${x}%`} cy={`${y}%`} r="4.5" fill="#ef4444" stroke="#ffffff" strokeWidth="1.5" />
                </g>
              );
            })}
          </svg>

          {/* X Axis labels */}
          <div className="flex justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-[#232733]">
            <span>Over 1</span>
            <span>Over 5 (PP)</span>
            <span>Over 10</span>
            <span>Over 15</span>
            <span className="text-emerald-400 font-bold">Over 20 (Target)</span>
          </div>
        </div>
      )}
    </div>
  );
};
