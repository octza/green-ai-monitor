import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  Server, 
  Cpu, 
  Thermometer, 
  Wind, 
  Activity, 
  Fan, 
  AlertTriangle, 
  CheckCircle2, 
  ExternalLink,
  Layers
} from 'lucide-react';

export const LiveMonitorView: React.FC = () => {
  const { zones, setSelectedZone, isSimulating, simulationTick } = useTelemetry();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              Virtual Facility
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-mono text-cyan-400">Cluster Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Live Data Center Monitor
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Simplified virtual data center monitoring real-time zonal heat, workload density, and active fan airflow.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Sim Cycle: #{simulationTick}</span>
            <span className="text-slate-600">|</span>
            <span className={isSimulating ? 'text-emerald-400' : 'text-amber-400'}>
              {isSimulating ? 'Auto-Update 3.5s' : 'Paused'}
            </span>
          </div>
        </div>
      </div>

      {/* Facility Environmental Sensors Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="glass-card p-4 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-medium">Monitored Servers</span>
            <div className="text-xl font-mono font-bold text-white">1,240 Nodes</div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Thermometer className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-medium">Facility Inlet Temp</span>
            <div className="text-xl font-mono font-bold text-cyan-300">19.2°C</div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
            <Wind className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-medium">Total Airflow</span>
            <div className="text-xl font-mono font-bold text-teal-300">42,300 CFM</div>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-slate-400 uppercase font-medium">Average GPU Load</span>
            <div className="text-xl font-mono font-bold text-amber-300">63.8%</div>
          </div>
        </div>
      </div>

      {/* 4 Main Virtual Data Center Zone Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {zones.map((zone) => {
          // Status styling
          const isStable = zone.status === 'Stable';
          const isWatch = zone.status === 'Watch';
          const isHigh = zone.status === 'High Load';

          const cardBorder = 
            isStable ? 'border-emerald-500/30 hover:border-emerald-400/60' :
            isWatch ? 'border-amber-500/40 hover:border-amber-400/70 shadow-glow-sm' :
            'border-rose-500/50 hover:border-rose-400/80 shadow-glow-danger';

          const statusBadge = 
            isStable ? <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">🟢 Stable</span> :
            isWatch ? <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 animate-pulse">🟡 Watch</span> :
            <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400 animate-pulse">🔴 High Load</span>;

          const fanSpeedClass = 
            zone.cooling === 'High' ? 'animate-spin' :
            zone.cooling === 'Medium' ? 'animate-spin-slow' : 'animate-pulse';

          const fanStyle = zone.cooling === 'High' ? { animationDuration: '0.8s' } : zone.cooling === 'Medium' ? { animationDuration: '2.5s' } : undefined;

          return (
            <div
              key={zone.id}
              onClick={() => setSelectedZone(zone)}
              className={`glass-card rounded-2xl p-6 border ${cardBorder} transition-all duration-300 cursor-pointer hover:scale-[1.01] relative overflow-hidden group`}
            >
              {/* Subtle top indicator bar */}
              <div 
                className={`absolute top-0 left-0 right-0 h-1 ${
                  isHigh ? 'bg-rose-500' : isWatch ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
              />

              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {zone.name.split('—')[0]}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                      ({zone.serverCount} servers)
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {zone.name.split('—')[1] || 'Compute Cluster'}
                  </p>
                </div>
                {statusBadge}
              </div>

              {/* Central Telemetry Grid */}
              <div className="grid grid-cols-3 gap-3 my-6">
                {/* Temperature */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center justify-center gap-1">
                    <Thermometer className="w-3 h-3 text-cyan-400" />
                    Temperature
                  </span>
                  <div className="text-2xl font-mono font-extrabold text-white mt-1">
                    {zone.temperature.toFixed(1)}°C
                  </div>
                  <span className="text-[10px] text-slate-500">
                    Target: {zone.targetTemp}°C
                  </span>
                </div>

                {/* GPU Load */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center justify-center gap-1">
                    <Cpu className="w-3 h-3 text-emerald-400" />
                    GPU Load
                  </span>
                  <div className={`text-2xl font-mono font-extrabold mt-1 ${
                    zone.gpuLoad > 90 ? 'text-rose-400' : zone.gpuLoad > 75 ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {zone.gpuLoad}%
                  </div>
                  <span className="text-[10px] text-slate-500">
                    CPU: {zone.cpuLoad}%
                  </span>
                </div>

                {/* Cooling */}
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400 flex items-center justify-center gap-1">
                    <Wind className="w-3 h-3 text-cyan-400" />
                    Cooling
                  </span>
                  <div className="text-2xl font-mono font-extrabold text-cyan-300 mt-1 flex items-center justify-center gap-1.5">
                    <Fan className={`w-5 h-5 text-cyan-400 ${fanSpeedClass}`} style={fanStyle} />
                    <span>{zone.cooling}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">
                    {(zone.airflowCFM / 1000).toFixed(1)}k CFM
                  </span>
                </div>
              </div>

              {/* Progress bars: Temperature thermal headroom and Workload */}
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                    <span>Thermal Load Limit (Max 85°C)</span>
                    <span className="text-slate-300">{Math.round((zone.temperature / 85) * 100)}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        zone.temperature > 76 ? 'bg-gradient-to-r from-amber-500 to-rose-500' :
                        zone.temperature > 68 ? 'bg-gradient-to-r from-teal-400 to-amber-400' :
                        'bg-gradient-to-r from-teal-400 to-emerald-400'
                      }`}
                      style={{ width: `${Math.min(100, (zone.temperature / 85) * 100)}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                    <span>GPU Compute Saturation</span>
                    <span className="text-slate-300">{zone.gpuLoad}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        zone.gpuLoad > 90 ? 'bg-rose-500' : zone.gpuLoad > 75 ? 'bg-amber-400' : 'bg-emerald-400'
                      }`}
                      style={{ width: `${zone.gpuLoad}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer action */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <span className="text-slate-400 flex items-center gap-1 font-mono">
                  <Layers className="w-3.5 h-3.5 text-slate-500" />
                  4 Server Racks Monitored
                </span>
                <span className="text-emerald-400 group-hover:text-emerald-300 font-semibold flex items-center gap-1">
                  <span>Inspect Zone Racks</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Real-time simulation notice */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>Values update automatically every 3.5 seconds using simulated thermodynamic models.</span>
        </div>
        <span className="text-slate-500 font-mono">Sensors: Ambient Temp, Relative Humidity, Core Tj, CFM Airflow</span>
      </div>
    </div>
  );
};
