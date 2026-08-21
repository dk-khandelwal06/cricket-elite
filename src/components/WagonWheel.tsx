import React, { useState } from 'react';

interface ShotData {
  id: string;
  angle: number; // 0 to 360 deg
  distance: number; // 0.2 to 1.0 (1.0 = boundary)
  runs: number;
  batter: string;
  shotName: string;
}

const DEFAULT_SHOTS: ShotData[] = [
  // Travis Head shots
  { id: '1', angle: 45, distance: 0.95, runs: 4, batter: 'Travis Head', shotName: 'Cover Drive' },
  { id: '2', angle: 60, distance: 1.05, runs: 6, batter: 'Travis Head', shotName: 'Inside-out Loft' },
  { id: '3', angle: 25, distance: 0.8, runs: 4, batter: 'Travis Head', shotName: 'Square Cut' },
  { id: '4', angle: 10, distance: 0.7, runs: 2, batter: 'Travis Head', shotName: 'Late Cut' },
  { id: '5', angle: 340, distance: 0.9, runs: 4, batter: 'Travis Head', shotName: 'Upper Cut' },
  { id: '6', angle: 135, distance: 1.05, runs: 6, batter: 'Travis Head', shotName: 'Mid-wicket Pull' },
  { id: '7', angle: 160, distance: 0.95, runs: 4, batter: 'Travis Head', shotName: 'Square Leg Sweep' },
  { id: '8', angle: 90, distance: 0.6, runs: 1, batter: 'Travis Head', shotName: 'Straight Punch' },
  // Glenn Maxwell shots
  { id: '9', angle: 310, distance: 1.05, runs: 6, batter: 'Glenn Maxwell', shotName: 'Reverse Switch Hit' },
  { id: '10', angle: 120, distance: 1.08, runs: 6, batter: 'Glenn Maxwell', shotName: 'Monster Pull' },
  { id: '11', angle: 80, distance: 0.95, runs: 4, batter: 'Glenn Maxwell', shotName: 'Lofted On Drive' },
  { id: '12', angle: 50, distance: 0.92, runs: 4, batter: 'Glenn Maxwell', shotName: 'Extra Cover Drive' },
  { id: '13', angle: 220, distance: 0.5, runs: 1, batter: 'Glenn Maxwell', shotName: 'Leg Glance' },
  { id: '14', angle: 140, distance: 0.75, runs: 2, batter: 'Glenn Maxwell', shotName: 'Cow Corner Whip' },
  // Virat Kohli shots
  { id: '15', angle: 45, distance: 0.98, runs: 4, batter: 'Virat Kohli', shotName: 'Trademark Cover Drive' },
  { id: '16', angle: 90, distance: 1.06, runs: 6, batter: 'Virat Kohli', shotName: 'Iconic Straight Six' },
  { id: '17', angle: 130, distance: 0.95, runs: 4, batter: 'Virat Kohli', shotName: 'Wristy Flick' },
  { id: '18', angle: 15, distance: 0.85, runs: 4, batter: 'Virat Kohli', shotName: 'Backfoot Punch' },
  { id: '19', angle: 105, distance: 0.65, runs: 2, batter: 'Virat Kohli', shotName: 'Long On Drive' },
];

export const WagonWheel: React.FC<{ selectedBatter?: string }> = ({ selectedBatter }) => {
  const [filterRun, setFilterRun] = useState<number | 'ALL'>('ALL');
  const [hoveredShot, setHoveredShot] = useState<ShotData | null>(null);

  const filteredShots = DEFAULT_SHOTS.filter((s) => {
    if (selectedBatter && selectedBatter !== 'All Batters' && !s.batter.includes(selectedBatter)) {
      return false;
    }
    if (filterRun !== 'ALL' && s.runs !== filterRun) {
      return false;
    }
    return true;
  });

  const getRunColor = (runs: number) => {
    switch (runs) {
      case 6: return '#ffe083'; // Trophy Gold for 6
      case 4: return '#6bfb9a'; // Pitch Neon Green for 4
      case 3: return '#38bdf8';
      case 2: return '#a78bfa';
      default: return '#94a3b8';
    }
  };

  const cx = 160;
  const cy = 160;
  const radius = 135;

  return (
    <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="font-headline text-lg font-bold text-white tracking-wide flex items-center gap-2">
            <span>WAGON WHEEL & SECTOR SPREAD</span>
          </h3>
          <p className="text-xs text-slate-400">360° Shot trajectory & radial scoring distribution</p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center space-x-1 bg-[#0A0B0E] p-1 rounded-lg border border-[#232733] text-xs font-mono">
          <button
            onClick={() => setFilterRun('ALL')}
            className={`px-2 py-0.5 rounded cursor-pointer transition ${filterRun === 'ALL' ? 'bg-white/20 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
          >
            All
          </button>
          <button
            onClick={() => setFilterRun(4)}
            className={`px-2 py-0.5 rounded cursor-pointer transition ${filterRun === 4 ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'text-slate-400 hover:text-emerald-400'}`}
          >
            4s
          </button>
          <button
            onClick={() => setFilterRun(6)}
            className={`px-2 py-0.5 rounded cursor-pointer transition ${filterRun === 6 ? 'bg-[#ffe083]/20 text-[#ffe083] font-bold' : 'text-slate-400 hover:text-[#ffe083]'}`}
          >
            6s
          </button>
          <button
            onClick={() => setFilterRun(1)}
            className={`px-2 py-0.5 rounded cursor-pointer transition ${filterRun === 1 ? 'bg-blue-500/20 text-blue-400 font-bold' : 'text-slate-400 hover:text-blue-400'}`}
          >
            1s/2s
          </button>
        </div>
      </div>

      <div className="relative flex items-center justify-center py-2 overflow-hidden">
        <svg viewBox="0 0 320 320" className="w-full max-w-[280px] sm:max-w-[320px] h-auto aspect-square overflow-visible select-none">
          {/* Ground Outfield Gradient */}
          <defs>
            <radialGradient id="outfieldGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#142e1f" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#0f2217" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#09140e" stopOpacity="1" />
            </radialGradient>
            <linearGradient id="pitchGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b49b6b" />
              <stop offset="50%" stopColor="#c5ad7d" />
              <stop offset="100%" stopColor="#b49b6b" />
            </linearGradient>
          </defs>

          {/* Outfield boundary circle */}
          <circle cx={cx} cy={cy} r={radius} fill="url(#outfieldGrad)" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 2" className="opacity-70" />
          {/* 30-yard circle */}
          <circle cx={cx} cy={cy} r={radius * 0.55} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="2 2" />

          {/* 8 Field sector division lines */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => {
            const rad = (ang * Math.PI) / 180;
            const x2 = cx + radius * Math.cos(rad);
            const y2 = cy + radius * Math.sin(rad);
            return (
              <line
                key={ang}
                x1={cx}
                y1={cy}
                x2={x2}
                y2={y2}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
            );
          })}

          {/* Sector Region Labels */}
          <text x={cx} y={cy - radius - 6} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600" className="uppercase font-condensed">Straight</text>
          <text x={cx + radius + 8} y={cy + 3} textAnchor="start" fill="#94a3b8" fontSize="9" fontWeight="600" className="uppercase font-condensed">Deep Mid-Wicket</text>
          <text x={cx} y={cy + radius + 14} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600" className="uppercase font-condensed">Fine Leg</text>
          <text x={cx - radius - 8} y={cy + 3} textAnchor="end" fill="#94a3b8" fontSize="9" fontWeight="600" className="uppercase font-condensed">Deep Point</text>
          <text x={cx + radius * 0.7} y={cy - radius * 0.7} textAnchor="start" fill="#94a3b8" fontSize="8" fontWeight="600" className="uppercase font-condensed">Long On</text>
          <text x={cx - radius * 0.7} y={cy - radius * 0.7} textAnchor="end" fill="#94a3b8" fontSize="8" fontWeight="600" className="uppercase font-condensed">Long Off</text>

          {/* Pitch rectangle in center */}
          <rect x={cx - 5} y={cy - 16} width="10" height="32" fill="url(#pitchGrad)" rx="1.5" stroke="#ffe083" strokeWidth="0.5" />

          {/* Shot Trajectory Rays */}
          {filteredShots.map((shot) => {
            // angle 0 is straight down, rotate clockwise
            const rad = ((shot.angle - 90) * Math.PI) / 180;
            const targetX = cx + radius * shot.distance * Math.cos(rad);
            const targetY = cy + radius * shot.distance * Math.sin(rad);
            const isHovered = hoveredShot?.id === shot.id;
            const strokeColor = getRunColor(shot.runs);

            return (
              <g
                key={shot.id}
                onMouseEnter={() => setHoveredShot(shot)}
                onMouseLeave={() => setHoveredShot(null)}
                className="cursor-pointer transition-all duration-200"
              >
                <line
                  x1={cx}
                  y1={cy}
                  x2={targetX}
                  y2={targetY}
                  stroke={strokeColor}
                  strokeWidth={isHovered ? 3.5 : shot.runs >= 4 ? 2 : 1.2}
                  strokeOpacity={isHovered ? 1 : 0.75}
                  strokeLinecap="round"
                />
                {/* Landing impact dot */}
                <circle
                  cx={targetX}
                  cy={targetY}
                  r={isHovered ? 4.5 : shot.runs === 6 ? 3.5 : 2.5}
                  fill={strokeColor}
                  stroke="#111316"
                  strokeWidth="1"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Trajectory Details Badge / Legend */}
      <div className="mt-3 pt-3 border-t border-[#232733] flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffe083]"></span>
            <span className="text-slate-300 font-mono">6s (Gold)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-slate-300 font-mono">4s (Green)</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
            <span className="text-slate-300 font-mono">1s/2s</span>
          </span>
        </div>

        {hoveredShot ? (
          <div className="text-right font-mono">
            <span className="text-emerald-400 font-bold">{hoveredShot.runs} Runs</span>
            <span className="text-slate-400 ml-1">({hoveredShot.shotName} by {hoveredShot.batter})</span>
          </div>
        ) : (
          <div className="text-slate-400 font-mono text-[11px]">
            Hover trajectory for telemetry
          </div>
        )}
      </div>
    </div>
  );
};
