import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  CheckCircle2, 
  Sparkles, 
  Zap, 
  Droplet, 
  Globe2, 
  ShieldCheck, 
  Sliders, 
  ArrowRight,
  Info,
  Check,
  RotateCcw
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const CoolingOptimizerView: React.FC = () => {
  const { strategies, activeStrategyId, applyStrategy } = useTelemetry();
  const [isApplying, setIsApplying] = useState(false);

  const handleApply = (id: 'A' | 'B' | 'C') => {
    setIsApplying(true);
    applyStrategy(id);
    if (id === 'B') {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.75 },
          colors: ['#10b981', '#06b6d4', '#34d399']
        });
      } catch {
        // Ignore confetti error
      }
    }
    setTimeout(() => {
      setIsApplying(false);
    }, 600);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
            Multi-Objective Pareto Engine
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-xs font-mono text-cyan-400">Resource Optimization</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Water–Energy–Carbon Cooling Optimizer
        </h1>
        {/* Required explanation quote */}
        <div className="mt-3 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/25 max-w-3xl">
          <p className="text-sm text-emerald-200 font-medium leading-relaxed">
            “Instead of simply increasing cooling whenever temperature rises, Green AI Monitor evaluates multiple cooling strategies and selects the safest strategy with the lowest environmental cost.”
          </p>
        </div>
      </div>

      {/* 3 Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {strategies.map((strategy) => {
          const isSelected = activeStrategyId === strategy.id;
          const isAIRecommended = strategy.isRecommended;

          return (
            <div
              key={strategy.id}
              className={`relative glass-card rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between ${
                isAIRecommended
                  ? 'border-2 border-emerald-400 shadow-glow-md bg-gradient-to-b from-[#0c221e] to-[#0a1722]'
                  : isSelected
                    ? 'border-cyan-500/60 shadow-glow-cyan/20'
                    : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Badge for AI Recommended */}
              {isAIRecommended && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-emerald-500 text-black font-extrabold text-xs flex items-center gap-1 shadow-glow-sm">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>AI Recommended ✓</span>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-white">
                    {strategy.name}
                  </h3>
                  {isSelected && (
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      Active Strategy
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-400 min-h-[32px] leading-relaxed">
                  {strategy.subtitle}
                </p>

                {/* Metrics Breakdown Grid */}
                <div className="my-5 p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                  {/* Energy */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Zap className="w-3.5 h-3.5 text-emerald-400" />
                        Energy
                      </span>
                      <span className="font-mono font-bold text-white">{strategy.energyUnits} units</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-400 rounded-full"
                        style={{ width: `${strategy.energyUnits}%` }}
                      />
                    </div>
                  </div>

                  {/* Water */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Droplet className="w-3.5 h-3.5 text-cyan-400" />
                        Water
                      </span>
                      <span className="font-mono font-bold text-white">{strategy.waterUnits} units</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-cyan-400 rounded-full"
                        style={{ width: `${(strategy.waterUnits / 20) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* CO2 */}
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Globe2 className="w-3.5 h-3.5 text-teal-400" />
                        CO₂
                      </span>
                      <span className="font-mono font-bold text-white">{strategy.co2Kg} kg</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-400 rounded-full"
                        style={{ width: `${(strategy.co2Kg / 40) * 100}%` }}
                      />
                    </div>
                  </div>

                  {/* Temperature Safety */}
                  <div className="pt-2 border-t border-slate-800">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Temperature Safety
                      </span>
                      <span className="font-mono text-emerald-400">{strategy.tempSafety}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          strategy.tempSafety >= 95 ? 'bg-emerald-400' : 'bg-amber-400'
                        }`}
                        style={{ width: `${strategy.tempSafety}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Strategy Reason */}
                <div className="text-xs text-slate-300 p-3 rounded-lg bg-slate-900/50 border border-slate-800/80 leading-relaxed mb-4">
                  <span className="text-slate-400 font-semibold block mb-0.5">Rationale:</span>
                  {strategy.reason}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleApply(strategy.id)}
                disabled={isApplying}
                className={`w-full py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  isAIRecommended
                    ? isSelected
                      ? 'bg-emerald-500 text-black shadow-glow-sm cursor-default'
                      : 'bg-emerald-400 hover:bg-emerald-300 text-black shadow-glow-sm hover:scale-[1.02]'
                    : isSelected
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 cursor-default'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                }`}
              >
                {isSelected ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Applied to System</span>
                  </>
                ) : isAIRecommended ? (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Apply Recommendation</span>
                  </>
                ) : (
                  <>
                    <span>Select {strategy.name.split('—')[0]}</span>
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Decision Engine Methodology Notice */}
      <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            Applying recommendation triggers simulated chiller loop modulation and zonal CFM valve redistribution in this hackathon prototype.
          </span>
        </div>
        <span className="font-mono text-emerald-400 shrink-0">Pareto Frontier: Non-Dominated Solutions</span>
      </div>
    </div>
  );
};
