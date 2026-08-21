import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { LiveScoreTicker } from './components/LiveScoreTicker';
import { SearchModal } from './components/SearchModal';
import { AIStrategistModal } from './components/AIStrategistModal';
import { LiveCenterView } from './views/LiveCenterView';
import { MatchCenterView } from './views/MatchCenterView';
import { PlayerProfileView } from './views/PlayerProfileView';
import { TournamentHubView } from './views/TournamentHubView';
import { StadiumPitchView } from './views/StadiumPitchView';
import { NewsHubView } from './views/NewsHubView';
import { FEATURED_MATCH, OTHER_MATCHES, PLAYERS } from './data/cricketData';
import { Match } from './types';
import { Trophy, Radio, Activity, Sparkles, Flame, Volume2, ShieldCheck, Github } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('live');
  const [selectedPlayerId, setSelectedPlayerId] = useState<string>('p-kohli');
  const [activeMatchId, setActiveMatchId] = useState<string>('m-wc26-final');
  const [liveMatch, setLiveMatch] = useState<Match>(FEATURED_MATCH);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [isAudioEnabled, setIsAudioEnabled] = useState<boolean>(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAiStrategistOpen, setIsAiStrategistOpen] = useState<boolean>(false);

  const allMatches = [liveMatch, ...OTHER_MATCHES];

  // Sound Synthesizer using Web Audio API
  const playSoundEffect = (type: 'bat' | 'four' | 'six' | 'wicket' | 'dot') => {
    if (!isAudioEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'six' || type === 'four') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.35);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.35);
      } else if (type === 'wicket') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(440, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(180, audioCtx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
      } else {
        // standard bat tap
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.1);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.1);
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  // Ball-by-ball simulation engine
  const handleTriggerNextBall = () => {
    setLiveMatch((prevMatch) => {
      const inn2 = { ...prevMatch.innings[1] };
      const currentBallsRemaining = prevMatch.ballsRemaining !== undefined ? prevMatch.ballsRemaining : 10;
      const currentRunsNeeded = prevMatch.runsNeeded !== undefined ? prevMatch.runsNeeded : 21;

      if (currentBallsRemaining <= 0 || currentRunsNeeded <= 0) {
        setIsSimulating(false);
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 },
        });
        return prevMatch;
      }

      // Outcome scenarios
      const outcomes = [
        { runs: 4, isBoundary: true, isSix: false, isWicket: false, shot: 'Square Cut', commentary: 'Bumrah to Maxwell, FOUR! Slashed over backward point with ferocious speed!' },
        { runs: 1, isBoundary: false, isSix: false, isWicket: false, shot: 'Cover Single', commentary: 'Bumrah to Maxwell, 1 run, driven firmly down to long-off.' },
        { runs: 2, isBoundary: false, isSix: false, isWicket: false, shot: 'Flick 2 Runs', commentary: 'Bumrah to David, 2 runs, clipped into the deep mid-wicket pocket.' },
        { runs: 6, isBoundary: false, isSix: true, isWicket: false, shot: 'Monster Pull', commentary: 'Bumrah to Maxwell, SIX! INCREDIBLE! Picked off the hips and sailed into the Great Southern Stand!' },
        { runs: 0, isBoundary: false, isSix: false, isWicket: false, shot: 'Dot Ball', commentary: 'Bumrah to David, NO RUN. Searing 147 km/h yorker right on the base of leg stump.' },
        { runs: 0, isBoundary: false, isSix: false, isWicket: true, shot: 'Caught behind', commentary: 'Bumrah to Maxwell, OUT! CAUGHT! Edged and taken cleanly by the keeper! Huge twist in the final!' },
      ];

      const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

      if (outcome.isSix) playSoundEffect('six');
      else if (outcome.isBoundary) playSoundEffect('four');
      else if (outcome.isWicket) playSoundEffect('wicket');
      else playSoundEffect('bat');

      const nextRunsNeeded = Math.max(0, currentRunsNeeded - outcome.runs);
      const nextBallsRemaining = currentBallsRemaining - 1;
      const nextRuns = inn2.runs + outcome.runs;
      const nextWickets = outcome.isWicket ? inn2.wickets + 1 : inn2.wickets;

      // Update current over
      const updatedOvers = [...inn2.oversData];
      const lastOver = updatedOvers[updatedOvers.length - 1];
      if (lastOver) {
        lastOver.balls.push({
          ballNumber: lastOver.balls.length + 1,
          runs: outcome.runs,
          isWicket: outcome.isWicket,
          isBoundary: outcome.isBoundary,
          isSix: outcome.isSix,
          isExtra: false,
          commentary: outcome.commentary,
          shotType: outcome.shot,
          ballSpeed: 144.2,
          pitchZone: 'Good Length',
          lineZone: 'Outside Off',
        });
      }

      // Recompute win probability
      let nextTeam2Prob = Math.min(95, Math.max(5, Math.round((nextRuns / (prevMatch.target || 198)) * 100 - (nextWickets * 8))));
      if (nextRunsNeeded === 0) nextTeam2Prob = 100;
      const nextTeam1Prob = 100 - nextTeam2Prob;

      const updatedStatusText = nextRunsNeeded === 0 
        ? 'Australia won the ICC T20 World Cup 2026!'
        : nextBallsRemaining === 0 
        ? 'India won the ICC T20 World Cup 2026 by ' + nextRunsNeeded + ' runs!'
        : `AUS need ${nextRunsNeeded} runs in ${nextBallsRemaining} balls`;

      if (nextRunsNeeded === 0 || nextBallsRemaining === 0) {
        confetti({
          particleCount: 150,
          spread: 90,
          origin: { y: 0.5 },
        });
      }

      return {
        ...prevMatch,
        statusText: updatedStatusText,
        ballsRemaining: nextBallsRemaining,
        runsNeeded: nextRunsNeeded,
        winProbability: {
          team1Percent: nextTeam1Prob,
          team2Percent: nextTeam2Prob,
        },
        innings: [prevMatch.innings[0], { ...inn2, runs: nextRuns, wickets: nextWickets, oversData: updatedOvers }],
      };
    });
  };

  // Automated ticker timer for live simulation
  useEffect(() => {
    let interval: any = null;
    if (isSimulating) {
      interval = setInterval(() => {
        handleTriggerNextBall();
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className={`min-h-screen ${theme === 'light' ? 'theme-light bg-[#f1f5f9] text-[#0f172a]' : 'bg-[#0A0B0E] text-[#f1f5f9]'} flex flex-col font-sans transition-colors duration-300`}>
      {/* 1. Global Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAiStrategist={() => setIsAiStrategistOpen(true)}
        isSimulating={isSimulating}
        setIsSimulating={setIsSimulating}
        isAudioEnabled={isAudioEnabled}
        setIsAudioEnabled={setIsAudioEnabled}
        theme={theme}
        setTheme={setTheme}
        liveMatchScoreText={`AUS ${liveMatch.innings[1]?.runs || 177}/${liveMatch.innings[1]?.wickets || 4} (${liveMatch.innings[1]?.overs || 18.2}) • Need ${liveMatch.runsNeeded || 21} off ${liveMatch.ballsRemaining || 10}`}
      />

      {/* 2. Continuous Live Score Ticker Ribbon */}
      <LiveScoreTicker
        matches={allMatches}
        activeMatchId={activeMatchId}
        onSelectMatch={(id) => {
          setActiveMatchId(id);
          setActiveTab('live');
        }}
      />

      {/* 3. Main Dynamic Content Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {activeTab === 'live' && (
          <LiveCenterView
            match={liveMatch}
            onSelectPlayer={(id) => {
              setSelectedPlayerId(id);
              setActiveTab('players');
            }}
            onNavigateTab={(tab) => setActiveTab(tab)}
            isSimulating={isSimulating}
            onTriggerBall={handleTriggerNextBall}
          />
        )}

        {activeTab === 'match' && (
          <MatchCenterView
            match={liveMatch}
            onSelectPlayer={(id) => {
              setSelectedPlayerId(id);
              setActiveTab('players');
            }}
          />
        )}

        {activeTab === 'players' && (
          <PlayerProfileView
            selectedPlayerId={selectedPlayerId}
            onSelectPlayer={(id) => setSelectedPlayerId(id)}
          />
        )}

        {activeTab === 'tournaments' && (
          <TournamentHubView
            onSelectPlayer={(id) => {
              setSelectedPlayerId(id);
              setActiveTab('players');
            }}
            onSelectMatch={(id) => {
              setActiveMatchId(id);
              setActiveTab('live');
            }}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'stadium' && <StadiumPitchView />}

        {activeTab === 'news' && <NewsHubView />}
      </main>

      {/* 4. Global Search Modal (Cmd+K / Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectPlayer={(id) => setSelectedPlayerId(id)}
        onSelectMatch={(id) => setActiveMatchId(id)}
        onSelectTab={(tab) => setActiveTab(tab)}
      />

      {/* 5. AI Cricket Strategist Modal */}
      <AIStrategistModal
        isOpen={isAiStrategistOpen}
        onClose={() => setIsAiStrategistOpen(false)}
      />

      {/* 6. Footer */}
      <footer className="w-full bg-[#08090C] border-t border-[#232733] py-6 text-xs text-slate-400 font-mono">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
            <span className="text-white font-bold tracking-wider">CRICKET ELITE ARENA</span>
            <span className="text-slate-600">•</span>
            <span>Real-time Telemetry & Hawk-Eye Optical Feed</span>
          </div>

          <div className="flex items-center space-x-6">
            <button 
              onClick={() => setIsAiStrategistOpen(true)}
              className="text-[#ffe083] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Match Strategist
            </button>
            <button
              onClick={() => setActiveTab('tournaments')}
              className="hover:text-white transition cursor-pointer"
            >
              Standings
            </button>
            <button
              onClick={() => setActiveTab('stadium')}
              className="hover:text-white transition cursor-pointer"
            >
              Pitch Maps
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
