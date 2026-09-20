import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { NavTab } from '../types';
import { 
  Thermometer, 
  Zap, 
  Droplet, 
  Globe2, 
  TrendingDown, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Activity, 
  ChevronRight,
  Server,
  Sliders
} from 'lucide-react';

interface DashboardViewProps {
  setCurrentTab: (tab: NavTab) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ setCurrentTab }) => {
  const { telemetry, zones, setSelectedZone } = useTelemetry();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              Operational Telemetry
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-mono text-slate-400">Decision Engine Feed</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Data Center Sustainability Overview
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Real-time thermal monitoring and Pareto-optimal cooling balancing water, energy, and carbon metrics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentTab('what-if-simulator')}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-bold text-xs shadow-glow-sm hover:shadow-glow-md hover:scale-[1.02] transition-all"
          >
            <Sliders className="w-4 h-4" />
            <span>Open What-if Simulator</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4 Major KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Average Temperature */}
        <div className="glass-card glass-card-hover rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl group-hover:bg-cyan-500/20 transition-all pointer-events-none"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Average Temperature</span>
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 shadow-glow-cyan/20">
              <Thermometer className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black font-mono tracking-tight text-white flex items-baseline gap-1">
              <span>{telemetry.avgTemperature.toFixed(1)}</span>
              <span className="text-lg text-cyan-300 font-sans font-medium">°C</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              <span className="inline-flex items-center text-emerald-400 font-semibold">
                <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                -1.2°C
              </span>
              <span className="text-slate-400">vs previous hour</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Thermal Headroom</span>
            <span className="text-emerald-400 font-semibold">+8.6°C safe buffer</span>
          </div>
        </div>

        {/* Energy Usage */}
        <div className="glass-card glass-card-hover rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all pointer-events-none"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Energy Usage</span>
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-glow-sm">
              <Zap className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black font-mono tracking-tight text-white flex items-baseline gap-1">
              <span>{telemetry.energyUsageMWh.toFixed(2)}</span>
              <span className="text-lg text-emerald-400 font-sans font-medium">MWh</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              <span className="inline-flex items-center text-emerald-400 font-semibold">
                <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                -9.4%
              </span>
              <span className="text-slate-400">vs baseline static cooling</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Instantaneous PUE</span>
            <span className="text-emerald-400 font-semibold">{telemetry.pue}</span>
          </div>
        </div>

        {/* Water Usage */}
        <div className="glass-card glass-card-hover rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl group-hover:bg-teal-500/20 transition-all pointer-events-none"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Water Usage</span>
            <div className="p-2.5 rounded-xl bg-teal-500/10 border border-teal-500/30 text-teal-300">
              <Droplet className="w-5 h-5 animate-bounce" style={{ animationDuration: '2.5s' }} />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black font-mono tracking-tight text-white flex items-baseline gap-1">
              <span>{telemetry.waterUsageLiters.toLocaleString()}</span>
              <span className="text-lg text-teal-300 font-sans font-medium">L</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              <span className="inline-flex items-center text-emerald-400 font-semibold">
                <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                -7.8%
              </span>
              <span className="text-slate-400">vs evaporative benchmark</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>WUE Efficiency</span>
            <span className="text-teal-300 font-semibold">{telemetry.wue} L/kWh</span>
          </div>
        </div>

        {/* Estimated CO2 */}
        <div className="glass-card glass-card-hover rounded-2xl p-5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-600/10 rounded-full blur-2xl group-hover:bg-emerald-600/20 transition-all pointer-events-none"></div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">Estimated CO₂</span>
            <div className="p-2.5 rounded-xl bg-emerald-600/10 border border-emerald-600/30 text-emerald-400">
              <Globe2 className="w-5 h-5 animate-pulse" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-3xl font-black font-mono tracking-tight text-white flex items-baseline gap-1">
              <span>{telemetry.co2Kg.toLocaleString()}</span>
              <span className="text-lg text-emerald-400 font-sans font-medium">kg CO₂e</span>
            </div>
            <div className="mt-2 flex items-center gap-1.5 text-xs">
              <span className="inline-flex items-center text-emerald-400 font-semibold">
                <TrendingDown className="w-3.5 h-3.5 mr-0.5" />
                -68 kg
              </span>
              <span className="text-slate-400">simulated avoided carbon</span>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Grid Emission Factor</span>
            <span className="text-slate-300">412 g/kWh</span>
          </div>
        </div>
      </div>

      {/* Large AI Cooling Status Card */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-emerald-500/30 relative overflow-hidden shadow-glow-sm">
        <div className="absolute top-0 left-0 right-0 h-1 energy-flow-line"></div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                AI Cooling Status
              </div>
              <span className="text-emerald-300 text-sm font-semibold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                Optimized
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white mt-2">
              “Current cooling strategy is maintaining safe thermal conditions while minimizing environmental impact.”
            </h2>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Autonomous multi-objective Pareto solver continuously redistributes chiller airflow and tower water cycles across Zones 01–04 based on 15-minute neural thermal projections.
            </p>

            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300">
                Strategy: Dynamic Balanced (Tier B)
              </span>
              <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700 text-slate-300">
                Inference Latency: 42ms
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                Model: LSTM + Physics Surrogate
              </span>
            </div>
          </div>

          {/* 4 Score Progress Bars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:w-96 shrink-0">
            {/* Temperature Safety */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Temperature Safety</span>
                <span className="font-mono font-bold text-emerald-400">{telemetry.coolingSafetyScore}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-400 rounded-full transition-all duration-700" 
                  style={{ width: `${telemetry.coolingSafetyScore}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">99.98% uptime compliant</span>
            </div>

            {/* Water Efficiency */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Water Efficiency</span>
                <span className="font-mono font-bold text-teal-300">{telemetry.waterEfficiencyScore}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-teal-400 rounded-full transition-all duration-700" 
                  style={{ width: `${telemetry.waterEfficiencyScore}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Cycles of Concentration: 6.2</span>
            </div>

            {/* Energy Efficiency */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Energy Efficiency</span>
                <span className="font-mono font-bold text-cyan-300">{telemetry.energyEfficiencyScore}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-cyan-400 rounded-full transition-all duration-700" 
                  style={{ width: `${telemetry.energyEfficiencyScore}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">PUE 1.14 (Top 5% quartile)</span>
            </div>

            {/* Carbon Efficiency */}
            <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300 font-medium">Carbon Efficiency</span>
                <span className="font-mono font-bold text-emerald-400">{telemetry.carbonEfficiencyScore}%</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-700" 
                  style={{ width: `${telemetry.carbonEfficiencyScore}%` }}
                />
              </div>
              <span className="text-[10px] text-slate-500 mt-1 block">Dynamic marginal grid matching</span>
            </div>
          </div>
        </div>
      </div>

      {/* Virtual Data Center Mini-Preview + Quick Navigation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Virtual Facility Preview */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Facility Thermal Topology</h3>
            </div>
            <button
              onClick={() => setCurrentTab('live-monitor')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 transition-colors"
            >
              <span>View Full Live Monitor</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {zones.map((zone) => {
              const tempColor = 
                zone.temperature < 65 ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' :
                zone.temperature < 75 ? 'text-amber-400 border-amber-500/20 bg-amber-500/5' :
                'text-rose-400 border-rose-500/30 bg-rose-500/10';

              return (
                <div
                  key={zone.id}
                  onClick={() => setSelectedZone(zone)}
                  className="p-4 rounded-xl border border-slate-800 hover:border-emerald-500/40 bg-slate-900/60 cursor-pointer transition-all hover:scale-[1.01] group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-semibold text-slate-300 group-hover:text-emerald-300">
                      {zone.name.split('—')[0]}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${tempColor}`}>
                      {zone.status === 'Stable' && '🟢 Stable'}
                      {zone.status === 'Watch' && '🟡 Watch'}
                      {zone.status === 'High Load' && '🔴 High Load'}
                    </span>
                  </div>

                  <div className="flex items-baseline justify-between mt-3">
                    <div>
                      <span className="text-2xl font-mono font-bold text-white">{zone.temperature.toFixed(1)}°C</span>
                      <span className="text-[11px] text-slate-500 ml-1.5">Target: {zone.targetTemp}°C</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-emerald-400 font-semibold">{zone.gpuLoad}% GPU</span>
                      <span className="block text-[10px] text-slate-500">Cooling: {zone.cooling}</span>
                    </div>
                  </div>

                  <div className="mt-3 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        zone.gpuLoad > 90 ? 'bg-rose-500' : zone.gpuLoad > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${zone.gpuLoad}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explainability Mini Teaser */}
        <div className="glass-card rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Activity className="w-4 h-4 text-cyan-400" />
              <h3 className="text-base font-bold text-white">Why did AI make this decision?</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              The AI increased cooling in Zone 03 and reduced unnecessary cooling in Zone 01.
            </p>

            <div className="space-y-2 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-mono font-bold">1.</span>
                <span>GPU workload increased by 18% in training cluster.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-mono font-bold">2.</span>
                <span>Ambient outdoor temperature increased by 3°C.</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-mono font-bold">3.</span>
                <span>Zone 01 has low workload (48%) and ample thermal reserve.</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
            <button
              onClick={() => setCurrentTab('explainability')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Explore AI Reasoning & Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
