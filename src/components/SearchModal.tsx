import React, { useState, useEffect } from 'react';
import { Search, X, Users, Trophy, Activity, Newspaper, ArrowRight } from 'lucide-react';
import { PLAYERS, OTHER_MATCHES, FEATURED_MATCH, NEWS_STORIES, TEAMS } from '../data/cricketData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlayer: (playerId: string) => void;
  onSelectMatch: (matchId: string) => void;
  onSelectTab: (tab: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPlayer,
  onSelectMatch,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEsc);
    }
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchingPlayers = PLAYERS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.country.toLowerCase().includes(q) ||
      p.role.toLowerCase().includes(q)
  );

  const allMatches = [FEATURED_MATCH, ...OTHER_MATCHES];
  const matchingMatches = allMatches.filter(
    (m) =>
      m.title.toLowerCase().includes(q) ||
      m.team1.name.toLowerCase().includes(q) ||
      m.team2.name.toLowerCase().includes(q) ||
      m.venue.name.toLowerCase().includes(q)
  );

  const matchingNews = NEWS_STORIES.filter(
    (n) =>
      n.title.toLowerCase().includes(q) ||
      n.summary.toLowerCase().includes(q) ||
      n.tags.some((t) => t.toLowerCase().includes(q))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div 
        className="w-full max-w-2xl bg-[#13151C] border border-[#232733] rounded-2xl shadow-2xl overflow-hidden text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="p-4 border-b border-[#232733] flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search players, matches, venues, tournaments, or articles..."
            className="w-full bg-transparent text-white placeholder-slate-400 text-sm md:text-base outline-none font-sans"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
          {/* Players */}
          {matchingPlayers.length > 0 && (
            <div>
              <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Players</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {matchingPlayers.map((player) => (
                  <div
                    key={player.id}
                    onClick={() => {
                      onSelectPlayer(player.id);
                      onSelectTab('players');
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl bg-[#181B24] hover:bg-[#1F2330] border border-[#232733] hover:border-emerald-500/40 transition cursor-pointer"
                  >
                    <img
                      src={player.avatarUrl}
                      alt={player.name}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=400&q=80';
                      }}
                      className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">{player.name}</h4>
                      <p className="text-xs text-slate-400 truncate">{player.role} • {player.country}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Matches */}
          {matchingMatches.length > 0 && (
            <div>
              <div className="text-[11px] font-mono font-bold text-[#ffe083] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                <span>Matches & Fixtures</span>
              </div>
              <div className="space-y-2">
                {matchingMatches.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => {
                      onSelectMatch(m.id);
                      onSelectTab('live');
                      onClose();
                    }}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-[#181B24] hover:bg-[#1F2330] border border-[#232733] hover:border-[#ffe083]/40 transition cursor-pointer"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">{m.team1.shortName} vs {m.team2.shortName}</span>
                        <span className="text-[10px] font-mono bg-[#13151C] border border-[#232733] px-1.5 py-0.5 rounded text-slate-300">{m.format}</span>
                        {m.status === 'LIVE' && <span className="text-[9px] bg-red-600 font-bold px-1.5 rounded text-white uppercase">LIVE</span>}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{m.venue.name}</p>
                    </div>
                    <span className="text-xs font-mono text-emerald-400 font-semibold">{m.statusText}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* News & Editorials */}
          {matchingNews.length > 0 && (
            <div>
              <div className="text-[11px] font-mono font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Newspaper className="w-3.5 h-3.5" />
                <span>News & Biomechanics</span>
              </div>
              <div className="space-y-2">
                {matchingNews.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      onSelectTab('news');
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-[#181B24] hover:bg-[#1F2330] border border-[#232733] hover:border-blue-400/40 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">{n.category}</span>
                      <span className="text-xs text-slate-400">{n.readTime}</span>
                    </div>
                    <h5 className="text-sm font-semibold text-white mt-1">{n.title}</h5>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchingPlayers.length === 0 && matchingMatches.length === 0 && matchingNews.length === 0 && (
            <div className="py-12 text-center text-slate-400">
              <p>No results found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs mt-1">Try searching for &ldquo;Kohli&rdquo;, &ldquo;Bumrah&rdquo;, &ldquo;Final&rdquo;, or &ldquo;Pace&rdquo;</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#0D0F14] border-t border-[#232733] flex items-center justify-between text-xs text-slate-400 font-mono">
          <div className="flex items-center space-x-3">
            <span>[ESC] to close</span>
            <span>[↑↓] to navigate</span>
          </div>
          <span>Cricket Elite Live Index</span>
        </div>
      </div>
    </div>
  );
};
