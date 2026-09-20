import React from 'react';
import { NavTab } from '../types';
import { 
  Leaf, 
  Droplet, 
  Zap, 
  Globe2, 
  BrainCircuit, 
  Sliders, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  Info,
  Layers,
  Sparkles
} from 'lucide-react';

interface AboutLandingViewProps {
  setCurrentTab: (tab: NavTab) => void;
}

export const AboutLandingView: React.FC<AboutLandingViewProps> = ({ setCurrentTab }) => {
  return (
    <div className="space-y-12 animate-fade-in pb-8">
      {/* Hero Pitch Banner */}
      <div className="relative glass-card rounded-3xl p-8 sm:p-12 border border-emerald-500/30 overflow-hidden text-center">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl mx-auto relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Green AI Hackathon Prototype · Next-Gen Decision Engine</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            “Don’t just cool the data center.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Cool it intelligently.”
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Green AI Monitor helps data centers predict thermal demand, optimize cooling decisions and evaluate their environmental impact across water, energy and carbon.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentTab('what-if-simulator')}
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-sm shadow-glow-md hover:scale-[1.02] transition-all"
            >
              <Sliders className="w-4 h-4" />
              <span>Launch Simulator →</span>
            </button>
            <button
              onClick={() => setCurrentTab('dashboard')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-sm font-semibold transition-all"
            >
              <span>View Live Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      {/* Product Positioning & Five Pillar Formula */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-emerald-500/20">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
            System Positioning & Core Thesis
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
            “A lightweight, explainable Water–Energy–Carbon aware Cooling Decision Engine with an interactive What-if Simulator.”
          </h2>
          <p className="text-xs text-slate-400 mt-2">
            Balancing operational thermal safety with environmental resource constraints across three interconnected vectors.
          </p>
        </div>

        {/* 5 Pillar USP Formula */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto mb-2">
              <Droplet className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">💧 Water</h4>
            <p className="text-[11px] text-slate-400 mt-1">Evaporative tower cycle conservation</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto mb-2">
              <Zap className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">⚡ Energy</h4>
            <p className="text-[11px] text-slate-400 mt-1">Chiller & VFD pump work minimization</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/30 flex items-center justify-center mx-auto mb-2">
              <Globe2 className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">🌍 Carbon</h4>
            <p className="text-[11px] text-slate-400 mt-1">Dynamic marginal grid emission matching</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center mx-auto mb-2">
              <BrainCircuit className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-white">🤖 AI Decisions</h4>
            <p className="text-[11px] text-slate-400 mt-1">Transparent Pareto multi-objective search</p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/40 col-span-2 sm:col-span-1 shadow-glow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center justify-center mx-auto mb-2">
              <Sliders className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-bold text-emerald-300">🎛️ What-if Sim</h4>
            <p className="text-[11px] text-slate-300 mt-1">Zero-risk sandbox for facility engineers</p>
          </div>
        </div>
      </div>

      {/* Hackathon Prototype Disclaimers & Ethics */}
      <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-2">
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>Hackathon Prototype & Environmental Transparency Notice</span>
        </div>
        <p className="leading-relaxed">
          Green AI Monitor is an educational and exploratory decision engine prototype developed for hackathon demonstration. All savings figures (such as 6–8% water reduction or 11% energy conservation) are modeled estimates based on thermodynamic approximations and simulated operational profiles, not guaranteed real-world deployment telemetry.
        </p>
        <div className="pt-2 flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-500">
          <span>Engine: TypeScript + React</span>
          <span>Simulation Tick: 3.5s Cyclic</span>
          <span>Open Architecture: Modbus / BACnet Extensible</span>
        </div>
      </div>
    </div>
  );
};
