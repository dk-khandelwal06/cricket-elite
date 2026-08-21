import React, { useState } from 'react';
import { NEWS_STORIES } from '../data/cricketData';
import { NewsArticle } from '../types';
import { Newspaper, Flame, Clock, Tag, ArrowRight, Share2, ThumbsUp, MessageSquare } from 'lucide-react';

export const NewsHubView: React.FC = () => {
  const [selectedStory, setSelectedStory] = useState<NewsArticle>(NEWS_STORIES[0]);
  const [pollVoted, setPollVoted] = useState<number | null>(null);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. HERO FEATURED MAGAZINE STORY ("PACE LIKE FIRE") */}
      <div className="relative rounded-2xl overflow-hidden border border-[#232733] bg-gradient-to-r from-[#181A24] via-[#13151C] to-[#0A0B0E] shadow-2xl p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-red-600 text-white uppercase flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" />
                {selectedStory.category}
              </span>
              <span className="text-xs font-mono text-slate-400 bg-white/10 px-2 py-0.5 rounded flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedStory.readTime}
              </span>
            </div>

            <h1 className="font-headline text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-wide leading-tight">
              {selectedStory.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 font-sans leading-relaxed">
              {selectedStory.summary}
            </p>

            <div className="flex items-center space-x-3 pt-2">
              <img
                src={selectedStory.author.avatarUrl}
                alt={selectedStory.author.name}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=400&q=80';
                }}
                className="w-9 h-9 rounded-full object-cover border border-[#232733]"
              />
              <div>
                <span className="text-xs font-bold text-white block">{selectedStory.author.name}</span>
                <span className="text-[10px] text-slate-400 font-mono">{selectedStory.author.role}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#232733] shadow-2xl">
              <img
                src={selectedStory.imageUrl}
                alt={selectedStory.title}
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80';
                }}
                className="w-full h-full object-cover filter contrast-110 hover:scale-105 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E]/90 via-transparent to-transparent"></div>
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
                {selectedStory.tags.map((t, idx) => (
                  <span key={idx} className="text-[10px] font-mono bg-black/60 backdrop-blur-sm text-emerald-400 px-2 py-0.5 rounded-lg border border-[#232733]">
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Selected Story Extended Body */}
        <div className="mt-8 pt-6 border-t border-[#232733] space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans max-w-4xl">
          {selectedStory.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>
      </div>

      {/* 2. OTHER STORIES & INTERACTIVE FAN POLL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 8 Cols: Stories List */}
        <div className="lg:col-span-8 space-y-4">
          <h3 className="font-headline text-lg font-bold text-white flex items-center gap-2">
            <Newspaper className="w-5 h-5 text-emerald-400" />
            MORE EDITORIALS & BIOMECHANICS
          </h3>

          <div className="space-y-3">
            {NEWS_STORIES.map((story) => (
              <div
                key={story.id}
                onClick={() => setSelectedStory(story)}
                className={`p-4 rounded-2xl border transition cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  selectedStory.id === story.id
                    ? 'bg-[#181B24] border-emerald-500 shadow-[0_0_15px_rgba(34,197,94,0.15)]'
                    : 'bg-[#13151C] border-[#232733] hover:border-emerald-500/40 hover:bg-[#181B24]'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-[#ffe083]">
                      {story.category}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{story.publishedAt}</span>
                  </div>
                  <h4 className="text-sm font-bold text-white hover:text-emerald-400 transition">
                    {story.title}
                  </h4>
                  <p className="text-xs text-slate-400 line-clamp-2 mt-1">{story.summary}</p>
                </div>

                <img
                  src={story.imageUrl}
                  alt={story.title}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=400&q=80';
                  }}
                  className="w-24 h-16 sm:w-28 sm:h-20 rounded-xl object-cover border border-[#232733] shrink-0"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 Cols: Interactive Poll & Video Highlights */}
        <div className="lg:col-span-4 space-y-6">
          {/* Interactive Fan Poll */}
          <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-5 shadow-xl space-y-3">
            <span className="text-[10px] font-mono font-bold text-[#ffe083] bg-[#ffe083]/10 px-2 py-0.5 rounded uppercase block w-fit">
              Fan Poll of the Day
            </span>
            <h4 className="font-headline text-base font-bold text-white">
              Who will clinch the T20 World Cup Final?
            </h4>
            <p className="text-xs text-slate-400">AUS need 21 runs off the final 10 deliveries.</p>

            <div className="space-y-2 pt-2">
              {[
                { id: 1, label: '🇮🇳 India (Defending 197)', pct: 58 },
                { id: 2, label: '🇦🇺 Australia (Chasing)', pct: 42 },
              ].map((opt) => {
                const isSelected = pollVoted === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setPollVoted(opt.id)}
                    className={`w-full p-3 rounded-xl border text-left text-xs font-mono font-semibold transition cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                        : 'bg-[#0A0B0E] border-[#232733] hover:border-emerald-500/40 text-white'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {pollVoted !== null && <span className="font-bold">{opt.pct}%</span>}
                  </button>
                );
              })}
            </div>

            {pollVoted !== null && (
              <p className="text-[11px] font-mono text-emerald-400 text-center pt-1">
                ✓ Your vote has been recorded!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
