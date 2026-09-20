import React from 'react';
import { NavTab } from '../types';
import { Sliders, ArrowRight, LayoutDashboard, Sparkles, Leaf } from 'lucide-react';

interface PitchFooterProps {
  setCurrentTab: (tab: NavTab) => void;
}

export const PitchFooter: React.FC<PitchFooterProps> = ({ setCurrentTab }) => {
  return (
    <footer className="mt-16 pt-10 pb-12 border-t border-emerald-500/15">
      <div className="relative glass-card rounded-3xl p-8 sm:p-10 border border-emerald-500/30 overflow-hidden text-center mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-2xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>Autonomous Thermal Intelligence</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            “Don’t just cool the data center.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
              Cool it intelligently.”
            </span>
          </h2>

          <p className="text-sm text-slate-300 leading-relaxed">
            Green AI Monitor helps data centers predict thermal demand, optimize cooling decisions and evaluate their environmental impact across water, energy and carbon.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              onClick={() => {
                setCurrentTab('what-if-simulator');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-extrabold text-xs shadow-glow-sm hover:scale-[1.02] transition-all"
            >
              <Sliders className="w-4 h-4" />
              <span>Launch Simulator →</span>
            </button>
            <button
              onClick={() => {
                setCurrentTab('dashboard');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>View Live Dashboard</span>
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 px-2 font-mono">
        <div className="flex items-center gap-2">
          <Leaf className="w-4 h-4 text-emerald-400" />
          <span className="text-slate-400 font-sans font-bold">GREEN AI MONITOR</span>
          <span>— Hackathon Prototype</span>
        </div>
        <div className="flex items-center gap-4">
          <span>● Simulated Telemetry Engine</span>
          <span>Potential / Estimated Savings</span>
        </div>
      </div>
    </footer>
  );
};
