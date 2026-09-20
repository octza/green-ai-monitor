import React from 'react';
import { ZoneData } from '../types';
import { useTelemetry } from '../context/TelemetryContext';
import { X, Thermometer, Cpu, Wind, ShieldCheck, Zap, ArrowDownRight } from 'lucide-react';

interface ZoneModalProps {
  zone: ZoneData | null;
  onClose: () => void;
}

export const ZoneModal: React.FC<ZoneModalProps> = ({ zone, onClose }) => {
  const { triggerSimulatedMitigation } = useTelemetry();

  if (!zone) return null;

  const getStatusBadge = () => {
    switch (zone.status) {
      case 'Stable':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">🟢 Stable</span>;
      case 'Watch':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300">🟡 Watch</span>;
      case 'High Load':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-400">🔴 High Load</span>;
    }
  };

  const tempColor = 
    zone.temperature < 65 ? 'text-emerald-400' :
    zone.temperature < 75 ? 'text-amber-400' : 'text-rose-400';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#091520] border border-emerald-500/30 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-700/50">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{zone.id.toUpperCase()}</span>
              {getStatusBadge()}
            </div>
            <h3 className="text-xl font-bold text-white mt-1">{zone.name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">High-density liquid + forced-air hybrid thermal zone</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Real-time telemetry metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Temp</span>
            </div>
            <div className={`text-2xl font-mono font-bold mt-1 ${tempColor}`}>
              {zone.temperature.toFixed(1)}°C
            </div>
            <span className="text-[10px] text-slate-500">Target: {zone.targetTemp}°C</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-emerald-400" />
              <span>GPU Load</span>
            </div>
            <div className="text-2xl font-mono font-bold mt-1 text-emerald-400">
              {zone.gpuLoad}%
            </div>
            <span className="text-[10px] text-slate-500">CPU: {zone.cpuLoad}%</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Wind className="w-3.5 h-3.5 text-cyan-400" />
              <span>Airflow</span>
            </div>
            <div className="text-2xl font-mono font-bold mt-1 text-slate-200">
              {(zone.airflowCFM / 1000).toFixed(1)}k
            </div>
            <span className="text-[10px] text-slate-500">CFM delivered</span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Cooling Tier</span>
            </div>
            <div className="text-2xl font-mono font-bold mt-1 text-amber-300">
              {zone.cooling}
            </div>
            <span className="text-[10px] text-slate-500">{zone.serverCount} Blades</span>
          </div>
        </div>

        {/* Rack Distribution Visualization */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Server Rack Thermal Matrix
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Cold-Aisle Plenum: 19.4°C</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {zone.racks.map(rack => (
              <div
                key={rack.id}
                className="p-3 rounded-lg bg-black/40 border border-slate-800 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>{rack.id}</span>
                  <span className={rack.temp > 75 ? 'text-rose-400 font-bold' : 'text-emerald-400'}>
                    {rack.temp}°C
                  </span>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Utilization</span>
                    <span>{rack.load}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        rack.load > 90 ? 'bg-rose-500' : rack.load > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${rack.load}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AI Predictive Dynamic Setpoint Active</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                triggerSimulatedMitigation(zone.id);
                onClose();
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black text-xs font-bold transition-all shadow-glow-sm"
            >
              <ArrowDownRight className="w-4 h-4" />
              <span>Simulate Cooling Boost (-3.5°C)</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
