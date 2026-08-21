import React, { useState } from 'react';
import { PitchMap } from '../components/PitchMap';
import { Compass, Wind, Droplets, Sun, MapPin, Activity, Flame, ShieldAlert } from 'lucide-react';

interface VenueData {
  id: string;
  name: string;
  city: string;
  country: string;
  capacity: string;
  pitchType: string;
  hardness: number; // 0-100
  grassCover: number; // 0-100
  moisture: number; // 0-100
  bounceRating: 'High & True' | 'Low & Variable' | 'Steep Seam';
  turnRating: 'Minimal' | 'Moderate' | 'Heavy Turn';
  swingRating: 'Late Reverse' | 'High Conventional' | 'Low Swing';
  avgFirstInnings: number;
  chaseWinPercentage: number;
  paceWicketsShare: number;
  spinWicketsShare: number;
  weather: {
    temp: string;
    humidity: string;
    wind: string;
    dewRisk: string;
  };
  verdict: string;
  imageUrl: string;
}

const VENUES: VenueData[] = [
  {
    id: 'mcg',
    name: 'Melbourne Cricket Ground (MCG)',
    city: 'Melbourne',
    country: 'Australia',
    capacity: '100,024',
    pitchType: 'Hard Drop-in with High True Carry',
    hardness: 88,
    grassCover: 15,
    moisture: 22,
    bounceRating: 'High & True',
    turnRating: 'Minimal',
    swingRating: 'Late Reverse',
    avgFirstInnings: 174,
    chaseWinPercentage: 54,
    paceWicketsShare: 72,
    spinWicketsShare: 28,
    weather: {
      temp: '19°C',
      humidity: '54%',
      wind: '14 km/h S',
      dewRisk: 'Low (Dry Outfield)',
    },
    verdict: 'Excellent sporting surface offering genuine bounce to express quicks and pure reward for batters trusting the carry through the line.',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB70vc5fSs8W7odsUuPPCEE2wo8svLib2tLmbh4SdIoeelR6CePX92UiLqPwluhPcDBYXnzArtmO-pEH6Ki5yWUPRodmK7sf7tPUW2e-P01dykGf0ceF4u1k-H4HcJbKdtsV0liBDxEnYq0cmXuXg8VWq_VsUc9tDuoo7LFL3JfX61reKRWScH-i0JZAOEFqKUG84FQ8Mhp6ETE2LrZF9Zjr2p7XHq71iIjJIvNKg-KrRaUEWHuqeYPlQ',
  },
  {
    id: 'lords',
    name: 'Lord\'s Cricket Ground',
    city: 'London',
    country: 'England',
    capacity: '31,100',
    pitchType: 'Natural Turf with 2.5m Sloped Incline',
    hardness: 75,
    grassCover: 38,
    moisture: 35,
    bounceRating: 'Steep Seam',
    turnRating: 'Moderate',
    swingRating: 'High Conventional',
    avgFirstInnings: 162,
    chaseWinPercentage: 48,
    paceWicketsShare: 78,
    spinWicketsShare: 22,
    weather: {
      temp: '16°C',
      humidity: '68%',
      wind: '18 km/h NW',
      dewRisk: 'Moderate',
    },
    verdict: 'The famous Lord\'s slope creates steep deviation into right-handers. Early moisture aids seam movement before flattening out.',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'gaddafi',
    name: 'Gaddafi Stadium',
    city: 'Lahore',
    country: 'Pakistan',
    capacity: '27,000',
    pitchType: 'Red Soil Flat Track',
    hardness: 92,
    grassCover: 5,
    moisture: 12,
    bounceRating: 'High & True',
    turnRating: 'Moderate',
    swingRating: 'Late Reverse',
    avgFirstInnings: 184,
    chaseWinPercentage: 58,
    paceWicketsShare: 55,
    spinWicketsShare: 45,
    weather: {
      temp: '24°C',
      humidity: '42%',
      wind: '9 km/h NE',
      dewRisk: 'High Dew (2nd Innings)',
    },
    verdict: 'Run heaven under floodlights. High scores standard; spinners become critical during the middle overs.',
    imageUrl: 'https://images.unsplash.com/photo-1531415074868-036b1c57e329?auto=format&fit=crop&w=800&q=80',
  },
];

export const StadiumPitchView: React.FC = () => {
  const [selectedVenue, setSelectedVenue] = useState<VenueData>(VENUES[0]);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* 1. VENUE SELECTOR */}
      <div className="bg-[#13151C] border border-[#232733] rounded-2xl p-4 shadow-xl">
        <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider block mb-3">
          Select International Venue
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {VENUES.map((v) => {
            const isSelected = v.id === selectedVenue.id;
            return (
              <div
                key={v.id}
                onClick={() => setSelectedVenue(v)}
                className={`p-3.5 rounded-xl border transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#181B24] border-emerald-500 shadow-[0_0_15px_rgba(34,197,94,0.2)]'
                    : 'bg-[#0A0B0E] border-[#232733] hover:border-emerald-500/40'
                }`}
              >
                <div className="flex items-center gap-2">
                  <MapPin className={`w-4 h-4 ${isSelected ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <h4 className="text-sm font-bold text-white leading-tight">{v.name}</h4>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-1">{v.city}, {v.country}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. HERO VENUE SPOTLIGHT */}
      <div className="relative rounded-2xl overflow-hidden border border-[#232733] bg-gradient-to-r from-[#181A24] via-[#13151C] to-[#0A0B0E] shadow-2xl p-6 sm:p-8">
        <div 
          className="absolute inset-0 opacity-20 mix-blend-screen bg-cover bg-center pointer-events-none"
          style={{ backgroundImage: `url('${selectedVenue.imageUrl}')` }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 uppercase">
                {selectedVenue.pitchType}
              </span>
              <span className="text-xs font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded">
                Capacity: {selectedVenue.capacity}
              </span>
            </div>

            <h1 className="font-headline text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
              {selectedVenue.name.toUpperCase()}
            </h1>

            <p className="text-sm text-slate-300 max-w-2xl font-sans leading-relaxed">
              {selectedVenue.verdict}
            </p>

            {/* Environmental Weather Grid */}
            <div className="pt-2 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="bg-[#0A0B0E]/90 p-2.5 rounded-xl border border-[#232733]">
                <span className="text-slate-400 block text-[10px]">TEMPERATURE</span>
                <span className="text-white font-bold">{selectedVenue.weather.temp}</span>
              </div>
              <div className="bg-[#0A0B0E]/90 p-2.5 rounded-xl border border-[#232733]">
                <span className="text-slate-400 block text-[10px]">HUMIDITY</span>
                <span className="text-[#38bdf8] font-bold">{selectedVenue.weather.humidity}</span>
              </div>
              <div className="bg-[#0A0B0E]/90 p-2.5 rounded-xl border border-[#232733]">
                <span className="text-slate-400 block text-[10px]">WIND VECTOR</span>
                <span className="text-white font-bold">{selectedVenue.weather.wind}</span>
              </div>
              <div className="bg-[#0A0B0E]/90 p-2.5 rounded-xl border border-[#232733]">
                <span className="text-slate-400 block text-[10px]">DEW FACTOR</span>
                <span className="text-[#ffe083] font-bold">{selectedVenue.weather.dewRisk}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 bg-[#181B24]/90 p-5 rounded-2xl border border-[#232733] space-y-3">
            <h4 className="font-headline text-sm font-bold text-white tracking-wide border-b border-[#232733] pb-2">
              HISTORICAL VENUE METRICS
            </h4>

            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-400">Avg 1st Innings:</span>
                <span className="text-white font-bold">{selectedVenue.avgFirstInnings} runs</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Chasing Win %:</span>
                <span className="text-emerald-400 font-bold">{selectedVenue.chaseWinPercentage}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Pace vs Spin Wkts:</span>
                <span className="text-white font-bold">{selectedVenue.paceWicketsShare}% / {selectedVenue.spinWicketsShare}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 3D PITCH MAP INSPECTOR */}
      <PitchMap bowlerName="Jasprit Bumrah (MCG Spell)" />
    </div>
  );
};
