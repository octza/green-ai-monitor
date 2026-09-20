import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { NavTab } from '../types';
import { 
  Play, 
  Pause, 
  Leaf, 
  Cpu, 
  Activity, 
  Sliders, 
  ShieldAlert, 
  Sparkles,
  Menu,
  X
} from 'lucide-react';

interface NavbarProps {
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const { isSimulating, toggleSimulation, alerts } = useTelemetry();
  const unacknowledgedAlerts = alerts.filter(a => !a.acknowledged).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-emerald-500/20 bg-[#050b10]/90 backdrop-blur-xl transition-all">
      {/* Top micro-banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-cyan-950/40 to-emerald-950/40 border-b border-emerald-500/10 px-4 py-1 text-[11px] font-mono flex items-center justify-between text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            AI System Online
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:flex items-center gap-1.5 text-cyan-400/90">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400"></span>
            Surrogate Neural Predictor: Active (94% Conf.)
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium tracking-tight">
            ● DEMO MODE — Simulated Data
          </span>
          <button
            onClick={toggleSimulation}
            className={`flex items-center gap-1 px-2.5 py-0.5 rounded transition-colors text-xs ${
              isSimulating
                ? 'bg-emerald-500/15 text-emerald-300 hover:bg-emerald-500/25 border border-emerald-500/30'
                : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40'
            }`}
            title={isSimulating ? 'Pause live telemetry simulation' : 'Resume live telemetry simulation'}
          >
            {isSimulating ? (
              <>
                <Pause className="w-3 h-3" />
                <span>Live Feed</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3" />
                <span>Paused</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div 
          onClick={() => setCurrentTab('dashboard')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 via-cyan-500/15 to-emerald-900/30 border border-emerald-500/40 shadow-glow-sm group-hover:border-emerald-400 transition-all duration-300">
            <Leaf className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-transform" />
            <Cpu className="w-3 h-3 text-cyan-300 absolute -bottom-0.5 -right-0.5 bg-[#050b10] rounded-full p-0.5 border border-cyan-500/40" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 text-lg sm:text-xl font-sans">
                GREEN AI MONITOR
              </span>
              <span className="hidden md:inline-block px-1.5 py-0.2 text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded">
                v2.4 Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block tracking-tight font-medium">
              “Predict the heat. Optimize the cooling. Minimize the environmental cost.”
            </p>
          </div>
        </div>

        {/* Desktop Quick USP Action */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => setCurrentTab('what-if-simulator')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
              currentTab === 'what-if-simulator'
                ? 'bg-emerald-500 text-black shadow-glow-md'
                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Launch What-if Simulator</span>
            <Sparkles className="w-3 h-3 text-emerald-200 animate-pulse" />
          </button>

          <button
            onClick={() => setCurrentTab('alerts')}
            className="relative p-2 rounded-lg bg-slate-900/60 border border-slate-700/60 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-all"
            title="System Alerts"
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            {unacknowledgedAlerts > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow">
                {unacknowledgedAlerts}
              </span>
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg bg-slate-900 border border-emerald-500/30 text-slate-300 hover:text-white"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>
    </header>
  );
};
