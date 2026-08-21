import React, { useState } from 'react';

interface DeliveryPoint {
  id: string;
  xPercent: number; // 0 (far left) to 100 (far right)
  yPercent: number; // 0 (batsman stumps) to 100 (bowler bowling crease)
  lengthZone: 'Yorker' | 'Full' | 'Good Length' | 'Short';
  lineZone: 'Outside Off' | 'Off Stump' | 'Middle' | 'Leg Stump' | 'Down Leg';
  speedKmH: number;
  outcome: 'Dot' | 'Single' | 'Four' | 'Six' | 'Wicket';
  bowler: string;
  batter: string;
}

const PITCH_DELIVERIES: DeliveryPoint[] = [
  { id: '1', xPercent: 50, yPercent: 92, lengthZone: 'Yorker', lineZone: 'Middle', speedKmH: 146.2, outcome: 'Dot', bowler: 'J. Bumrah', batter: 'G. Maxwell' },
  { id: '2', xPercent: 32, yPercent: 88, lengthZone: 'Full', lineZone: 'Outside Off', speedKmH: 141.0, outcome: 'Four', bowler: 'J. Bumrah', batter: 'G. Maxwell' },
  { id: '3', xPercent: 28, yPercent: 62, lengthZone: 'Good Length', lineZone: 'Outside Off', speedKmH: 142.4, outcome: 'Single', bowler: 'J. Bumrah', batter: 'T. David' },
  { id: '4', xPercent: 68, yPercent: 60, lengthZone: 'Good Length', lineZone: 'Leg Stump', speedKmH: 140.1, outcome: 'Single', bowler: 'J. Bumrah', batter: 'T. David' },
  { id: '5', xPercent: 35, yPercent: 78, lengthZone: 'Full', lineZone: 'Off Stump', speedKmH: 139.5, outcome: 'Single', bowler: 'J. Bumrah', batter: 'G. Maxwell' },
  { id: '6', xPercent: 25, yPercent: 55, lengthZone: 'Good Length', lineZone: 'Outside Off', speedKmH: 118.2, outcome: 'Dot', bowler: 'J. Bumrah', batter: 'G. Maxwell' },
  { id: '7', xPercent: 52, yPercent: 94, lengthZone: 'Yorker', lineZone: 'Middle', speedKmH: 145.8, outcome: 'Single', bowler: 'J. Bumrah', batter: 'G. Maxwell' },
  { id: '8', xPercent: 48, yPercent: 65, lengthZone: 'Good Length', lineZone: 'Off Stump', speedKmH: 144.5, outcome: 'Wicket', bowler: 'J. Bumrah', batter: 'M. Stoinis' },
  { id: '9', xPercent: 20, yPercent: 35, lengthZone: 'Short', lineZone: 'Outside Off', speedKmH: 143.0, outcome: 'Four', bowler: 'M. Shami', batter: 'T. Head' },
  { id: '10', xPercent: 75, yPercent: 40, lengthZone: 'Short', lineZone: 'Down Leg', speedKmH: 138.6, outcome: 'Six', bowler: 'M. Siraj', batter: 'T. Head' },
];

export const PitchMap: React.FC<{ bowlerName?: string }> = ({ bowlerName = 'Jasprit Bumrah' }) => {
  const [hoveredBall, setHoveredBall] = useState<DeliveryPoint | null>(null);
  const [selectedLength, setSelectedLength] = useState<string>('ALL');

  const filteredBalls = PITCH_DELIVERIES.filter((b) => {
    if (selectedLength !== 'ALL' && b.lengthZone !== selectedLength) return false;
    return true;
  });

  const getOutcomeBadge = (outcome: DeliveryPoint['outcome']) => {
    switch (outcome) {
      case 'Wicket': return 'bg-red-500 text-white';
      case 'Six': return 'bg-[#ffe083] text-black';
      case 'Four': return 'bg-[#6bfb9a] text-black';
      case 'Dot': return 'bg-gray-700 text-gray-200';
      default: return 'bg-blue-500 text-white';
    }
  };

  const getOutcomeColor = (outcome: DeliveryPoint['outcome']) => {
    switch (outcome) {
      case 'Wicket': return '#ef4444';
      case 'Six': return '#ffe083';
      case 'Four': return '#6bfb9a';
      case 'Dot': return '#94a3b8';
      default: return '#38bdf8';
    }
  };

  return (
    <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-headline text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <span>PITCH HEATMAP & RADAR SPEED</span>
          </h3>
          <p className="text-xs text-slate-400">Length zones, seam movement & release speed</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1 bg-[#0A0B0E] p-1 rounded-lg border border-[#232733] text-[11px] font-mono">
          {['ALL', 'Yorker', 'Full', 'Good Length', 'Short'].map((len) => (
            <button
              key={len}
              onClick={() => setSelectedLength(len)}
              className={`px-2 py-0.5 rounded-md cursor-pointer transition ${
                selectedLength === len ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              {len}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Pitch Graphic (22 yards) */}
        <div className="md:col-span-7 flex justify-center py-2">
          <div className="relative w-64 h-80 bg-gradient-to-b from-[#251f14] via-[#332918] to-[#251f14] rounded-xl border border-[#4d3e23] shadow-2xl overflow-hidden p-2">
            {/* Crease lines */}
            {/* Bowling Crease (Top) */}
            <div className="absolute top-4 left-4 right-4 h-0.5 bg-white/60"></div>
            {/* Return Crease Top */}
            <div className="absolute top-2 left-6 bottom-auto w-0.5 h-6 bg-white/60"></div>
            <div className="absolute top-2 right-6 bottom-auto w-0.5 h-6 bg-white/60"></div>
            {/* Stumps Top (Bowler end) */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 flex space-x-1">
              <div className="w-1 h-2 bg-[#ffe083] rounded-sm"></div>
              <div className="w-1 h-2 bg-[#ffe083] rounded-sm"></div>
              <div className="w-1 h-2 bg-[#ffe083] rounded-sm"></div>
            </div>

            {/* Length Zones Bands */}
            <div className="absolute top-10 left-0 right-0 h-16 border-b border-dashed border-white/10 flex items-center justify-end pr-2 text-[9px] font-mono text-slate-400">
              SHORT (7m - 10m)
            </div>
            <div className="absolute top-26 left-0 right-0 h-24 border-b border-dashed border-white/10 flex items-center justify-end pr-2 text-[9px] font-mono text-emerald-400/80">
              GOOD LENGTH (4m - 7m)
            </div>
            <div className="absolute top-50 left-0 right-0 h-16 border-b border-dashed border-white/10 flex items-center justify-end pr-2 text-[9px] font-mono text-[#ffe083]/80">
              FULL (2m - 4m)
            </div>
            <div className="absolute top-66 left-0 right-0 h-10 flex items-center justify-end pr-2 text-[9px] font-mono text-red-400">
              YORKER (0m - 2m)
            </div>

            {/* Popping Crease (Bottom - Batsman end) */}
            <div className="absolute bottom-6 left-4 right-4 h-0.5 bg-white/80 shadow-[0_0_8px_white]"></div>
            {/* Stumps Bottom (Batsman end) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1.5">
              <div className="w-1.5 h-3 bg-[#ffe083] rounded-sm shadow-[0_0_6px_#ffe083]"></div>
              <div className="w-1.5 h-3 bg-[#ffe083] rounded-sm shadow-[0_0_6px_#ffe083]"></div>
              <div className="w-1.5 h-3 bg-[#ffe083] rounded-sm shadow-[0_0_6px_#ffe083]"></div>
            </div>

            {/* Balls plotted on pitch */}
            {filteredBalls.map((b) => {
              const isHovered = hoveredBall?.id === b.id;
              const color = getOutcomeColor(b.outcome);
              return (
                <button
                  key={b.id}
                  onMouseEnter={() => setHoveredBall(b)}
                  onMouseLeave={() => setHoveredBall(null)}
                  style={{
                    left: `${b.xPercent}%`,
                    top: `${b.yPercent}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className={`absolute rounded-full transition-all cursor-pointer ${
                    isHovered ? 'scale-150 z-20 ring-2 ring-white' : 'hover:scale-125 z-10'
                  }`}
                >
                  <div
                    style={{ backgroundColor: color }}
                    className="w-3.5 h-3.5 rounded-full flex items-center justify-center shadow-lg border border-black text-[7px] font-bold text-black"
                  >
                    {b.outcome === 'Wicket' ? 'W' : b.outcome === 'Six' ? '6' : b.outcome === 'Four' ? '4' : '•'}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Speed Telemetry & Breakdown */}
        <div className="md:col-span-5 space-y-3">
          <div className="bg-[#181B24] p-3 rounded-xl border border-[#232733]">
            <span className="text-[10px] text-slate-400 uppercase font-mono tracking-wider block">Spell Bowler</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-white font-bold text-sm">{bowlerName}</span>
              <span className="bg-emerald-500/20 text-emerald-400 text-xs font-mono font-bold px-2 py-0.5 rounded">
                Avg 143.2 km/h
              </span>
            </div>
          </div>

          {/* Hovered Ball Telemetry Card */}
          {hoveredBall ? (
            <div className="bg-[#181B24] p-3 rounded-xl border border-emerald-500/40 shadow-[0_0_15px_rgba(34,197,94,0.15)] animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 font-mono">Ball Speed</span>
                <span className="font-mono-score text-base font-bold text-emerald-400">{hoveredBall.speedKmH} km/h</span>
              </div>
              <div className="mt-2 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Length:</span>
                  <span className="text-white font-semibold">{hoveredBall.lengthZone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Line:</span>
                  <span className="text-white font-semibold">{hoveredBall.lineZone}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-[#232733]">
                  <span className="text-slate-400">Outcome:</span>
                  <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${getOutcomeBadge(hoveredBall.outcome)}`}>
                    {hoveredBall.outcome}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-[#181B24] p-3 rounded-xl border border-[#232733] text-xs text-slate-400 space-y-2">
              <p className="font-mono text-[11px] text-slate-300">Length Distribution:</p>
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span>Good Length (4-7m)</span>
                  <span className="font-mono text-emerald-400">50%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0A0B0E] rounded-full overflow-hidden border border-[#232733]">
                  <div className="h-full bg-emerald-400" style={{ width: '50%' }}></div>
                </div>

                <div className="flex justify-between text-[11px]">
                  <span>Yorkers (Toe crushers)</span>
                  <span className="font-mono text-red-400">30%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0A0B0E] rounded-full overflow-hidden border border-[#232733]">
                  <div className="h-full bg-red-400" style={{ width: '30%' }}></div>
                </div>

                <div className="flex justify-between text-[11px]">
                  <span>Full / Short</span>
                  <span className="font-mono text-blue-400">20%</span>
                </div>
                <div className="w-full h-1.5 bg-[#0A0B0E] rounded-full overflow-hidden border border-[#232733]">
                  <div className="h-full bg-blue-400" style={{ width: '20%' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
