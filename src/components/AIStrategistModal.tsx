import React, { useState } from 'react';
import { Sparkles, X, ShieldAlert, Cpu, ArrowRight, CheckCircle2, ChevronRight, Zap } from 'lucide-react';

interface AIStrategistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ScenarioOption {
  id: string;
  title: string;
  question: string;
  recommendation: string;
  probabilityOfSuccess: string;
  keyActionPoints: string[];
  fieldPlacements: string[];
  riskFactor: 'LOW' | 'MEDIUM' | 'HIGH';
}

const STRATEGY_SCENARIOS: ScenarioOption[] = [
  {
    id: 'sc-1',
    title: '19th & 20th Over Death Pace Tactics',
    question: 'Australia require 21 runs off 10 balls. Glenn Maxwell on 46* (23). How should India deploy Jasprit Bumrah & Mohammed Shami?',
    recommendation: 'Deploy wide-line yorkers angled across Maxwell\'s stance to eliminate his 360° switch-hit arc, keeping deep backward point and fine third man back.',
    probabilityOfSuccess: '74% Victory Defense Rate',
    keyActionPoints: [
      'Over 19.3 - 19.6: Bumrah must target the 5th stump channel at 145+ km/h with 0.8m length (blockhole).',
      'Deny leg-side whip by packing off-side infield (Extra cover and short cover close for mis-hits).',
      'Over 20: Shami to mix hard back-of-length slower off-cutters (122 km/h) into pitch surface.',
    ],
    fieldPlacements: ['Deep Backward Point', 'Long-off (Straight)', 'Deep Square Leg (Saving 2)', 'Extra Cover (Inside Ring)'],
    riskFactor: 'LOW',
  },
  {
    id: 'sc-2',
    title: 'Neutralizing Travis Head\'s Powerplay Attack',
    question: 'Travis Head strike rate in first 6 overs exceeds 175. What bowling length and angle curtails his boundary percentage?',
    recommendation: 'Left-arm seam angle around the wicket cramping his hips with tight inswing, followed by back-of-a-length delivery outside off with slip and deep point.',
    probabilityOfSuccess: '68% Dot Ball Rate',
    keyActionPoints: [
      'Bowl 7.5m - 8.2m back-of-length directly at rib-cage height to deny room for his horizontal bat slash.',
      'Bring backward point 5 yards deeper to cut off his aerial upper-cut.',
      'Introduce off-spin in 5th over with deep mid-wicket and long-on protection.',
    ],
    fieldPlacements: ['Deep Third Man', 'Fly Slip', 'Deep Backward Point', 'Deep Mid-Wicket'],
    riskFactor: 'MEDIUM',
  },
  {
    id: 'sc-3',
    title: 'Rashid Khan 100 km/h Googly Decryption',
    question: 'How can top-order batters read and counter Rashid Khan\'s quick wrist release before the pitch break?',
    recommendation: 'Watch the back of the hand at release point (knuckles facing towards sky = googly) and play with soft hands off the back foot through mid-wicket.',
    probabilityOfSuccess: '62% Boundary Neutralization',
    keyActionPoints: [
      'Do not lunge forward on front foot; the high pace (101 km/h) eliminates reaction time for late adjustments.',
      'Use depth in the crease to turn deliveries with the spin into vacant gap between long-on and deep mid-wicket.',
      'Target straight boundary when full; avoid cross-bat sweeps against straight trajectories.',
    ],
    fieldPlacements: ['Deep Mid-Wicket', 'Long On', 'Deep Cover', 'Short Fine Leg'],
    riskFactor: 'HIGH',
  },
];

export const AIStrategistModal: React.FC<AIStrategistModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioOption>(STRATEGY_SCENARIOS[0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [customQuestion, setCustomQuestion] = useState('');

  if (!isOpen) return null;

  const handleSimulate = (scenario: ScenarioOption) => {
    setIsAnalyzing(true);
    setSelectedScenario(scenario);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-4xl bg-[#13151C] border border-[#232733] rounded-2xl shadow-2xl overflow-hidden text-white flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#181A22] via-[#13151C] to-[#0D0F14] border-b border-[#232733] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#ffe083]/10 border border-[#ffe083]/30 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#ffe083]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-headline text-xl font-bold tracking-wide text-white">
                  MATCH STRATEGIST & TACTICS ENGINE
                </h3>
                <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded border border-amber-500/30 uppercase">
                  Interactive Demo Mode
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Pre-calibrated tactical scenario analysis, field deployment matrices & delivery vector models
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Preset Scenarios */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Select Live Match Scenarios
            </span>

            {STRATEGY_SCENARIOS.map((sc) => {
              const isSelected = sc.id === selectedScenario.id;
              return (
                <div
                  key={sc.id}
                  onClick={() => handleSimulate(sc)}
                  className={`p-3.5 rounded-xl border transition cursor-pointer ${
                    isSelected
                      ? 'bg-[#1C1F2B] border-[#ffe083] shadow-[0_0_15px_rgba(255,224,131,0.15)]'
                      : 'bg-[#181B24] border-[#232733] hover:border-[#2f3545] hover:bg-[#1F2330]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-white/10 text-[#ffe083]">
                      Scenario #{sc.id.slice(-1)}
                    </span>
                    <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                      sc.riskFactor === 'LOW' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'
                    }`}>
                      {sc.riskFactor} RISK
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white leading-tight">{sc.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{sc.question}</p>
                </div>
              );
            })}

            {/* Custom Query Box */}
            <div className="pt-2">
              <span className="text-xs font-mono text-slate-400 block mb-1">Custom Tactical Inquiry</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="e.g. Should India bowl spin in 19th over?"
                  className="flex-1 bg-[#181B24] border border-[#232733] rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-[#ffe083]"
                />
                <button
                  onClick={() => {
                    if (customQuestion.trim()) {
                      handleSimulate({
                        id: 'sc-custom',
                        title: 'Custom Query Assessment',
                        question: customQuestion,
                        recommendation: 'Hold back spin against settled power hitters with under 24 balls left unless turning track exhibits >4.5° deviation.',
                        probabilityOfSuccess: '71% Predictive Confidence',
                        keyActionPoints: [
                          'Pace off the ball into the pitch body prevents clean arc swing.',
                          'Maintain 5-4 off-side field boundary split.',
                          'Enforce yorker accuracy with deep mid-wicket protection.',
                        ],
                        fieldPlacements: ['Long-on', 'Deep Mid-wicket', 'Deep Extra Cover', 'Third Man'],
                        riskFactor: 'MEDIUM',
                      });
                    }
                  }}
                  className="bg-[#ffe083] text-black px-3 py-2 rounded-lg font-bold text-xs hover:bg-[#ffcd00] transition cursor-pointer"
                >
                  Ask
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Tactical Output & Field Map */}
          <div className="lg:col-span-7 space-y-4">
            {isAnalyzing ? (
              <div className="h-64 flex flex-col items-center justify-center space-y-3 bg-[#181B24] rounded-xl border border-[#232733]">
                <Cpu className="w-8 h-8 text-[#ffe083] animate-spin" />
                <p className="text-sm font-mono text-slate-300">Simulating 10,000 ball outcomes & field vectors...</p>
              </div>
            ) : (
              <div className="space-y-4 animate-fade-in">
                {/* Recommendation Banner */}
                <div className="bg-[#181B24] p-4 rounded-xl border border-[#ffe083]/40 shadow-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-mono text-[#ffe083] font-bold uppercase tracking-wider flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5" />
                      Tactical Recommendation
                    </span>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                      {selectedScenario.probabilityOfSuccess}
                    </span>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed font-medium">
                    {selectedScenario.recommendation}
                  </p>
                </div>

                {/* Key Action Points */}
                <div className="bg-[#181B24] p-4 rounded-xl border border-[#232733] space-y-2">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-bold">
                    Key Bowling & Execution Directives:
                  </span>
                  <div className="space-y-2">
                    {selectedScenario.keyActionPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Field Deployment Blueprint */}
                <div className="bg-[#181B24] p-4 rounded-xl border border-[#232733]">
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block font-bold mb-2">
                    Recommended Boundary Protection:
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedScenario.fieldPlacements.map((pos, idx) => (
                      <div key={idx} className="bg-[#13151C] p-2 rounded-lg border border-[#232733] text-xs flex items-center justify-between">
                        <span className="text-slate-200 font-semibold">{pos}</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0D0F14] border-t border-[#232733] flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>Tactical Simulation: Demo Preset Engine</span>
          <button
            onClick={onClose}
            className="bg-white/10 hover:bg-white/20 text-white px-4 py-1.5 rounded-lg font-semibold transition cursor-pointer"
          >
            Close Strategist
          </button>
        </div>
      </div>
    </div>
  );
};
