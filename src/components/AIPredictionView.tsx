import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { 
  TrendingUp, 
  BrainCircuit, 
  Sparkles, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  ShieldAlert,
  Sliders,
  Cpu
} from 'lucide-react';
import { generatePredictionTrajectory } from '../utils/simulationLogic';

export const AIPredictionView: React.FC = () => {
  const { zones, telemetry } = useTelemetry();
  const [selectedZoneId, setSelectedZoneId] = useState<string>('zone-03');

  const activeZone = zones.find(z => z.id === selectedZoneId) || zones[2];

  // Generate trajectory points for this zone
  const trajectory = generatePredictionTrajectory(
    activeZone.temperature,
    activeZone.gpuLoad,
    telemetry.ambientTemp
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              Surrogate Neural Forecasting
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-mono text-cyan-400">Thermal Dynamics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            AI Thermal Predictor
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Anticipates thermal inertia up to 30 minutes in advance, allowing preemptive cooling optimization before heat builds up.
          </p>
        </div>

        {/* Zone switcher pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800">
          {zones.map(z => (
            <button
              key={z.id}
              onClick={() => setSelectedZoneId(z.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedZoneId === z.id
                  ? 'bg-emerald-500 text-black font-bold shadow-glow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {z.id.replace('zone-', 'Zone ')}
            </button>
          ))}
        </div>
      </div>

      {/* Trajectory Highlights Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="glass-card p-4 rounded-xl border border-slate-800">
          <div className="text-xs text-slate-400 font-medium">Current Temperature</div>
          <div className="text-3xl font-black font-mono text-white mt-1">
            {activeZone.temperature.toFixed(1)}°C
          </div>
          <div className="mt-2 text-[11px] text-emerald-400 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Live Sensor Reading</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-cyan-500/20">
          <div className="text-xs text-slate-400 font-medium">Predicted in 5 min</div>
          <div className="text-3xl font-black font-mono text-cyan-300 mt-1">
            {trajectory[1]?.predictedTemp.toFixed(1)}°C
          </div>
          <div className="mt-2 text-[11px] text-cyan-400 flex items-center gap-1 font-mono">
            <span>+{((trajectory[1]?.predictedTemp || 0) - activeZone.temperature).toFixed(1)}°C rise</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-amber-500/20">
          <div className="text-xs text-slate-400 font-medium">Predicted in 10 min</div>
          <div className="text-3xl font-black font-mono text-amber-300 mt-1">
            {trajectory[2]?.predictedTemp.toFixed(1)}°C
          </div>
          <div className="mt-2 text-[11px] text-amber-400 flex items-center gap-1 font-mono">
            <span>+{((trajectory[2]?.predictedTemp || 0) - activeZone.temperature).toFixed(1)}°C rise</span>
          </div>
        </div>

        <div className="glass-card p-4 rounded-xl border border-rose-500/30">
          <div className="text-xs text-slate-400 font-medium">Predicted in 15 min</div>
          <div className="text-3xl font-black font-mono text-rose-400 mt-1">
            {trajectory[3]?.predictedTemp.toFixed(1)}°C
          </div>
          <div className="mt-2 text-[11px] text-rose-400 flex items-center gap-1 font-mono">
            <span>Approaching 78°C ceiling</span>
          </div>
        </div>
      </div>

      {/* Main Chart Card */}
      <div className="glass-card p-6 rounded-2xl border border-emerald-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>Current Temperature → Predicted Temperature</span>
              <span className="text-xs font-normal text-slate-400 font-mono">({activeZone.name})</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comparison between static baseline cooling and AI-optimized preemptive cooling trajectory
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-500"></span>
              Predicted Baseline
            </span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
              AI Preemptively Cooled
            </span>
          </div>
        </div>

        {/* Recharts Area Chart */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trajectory} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="predictedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0.0}/>
                </linearGradient>
                <linearGradient id="optimizedGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.35}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="timeLabel" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis domain={[60, 85]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} unit="°C" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0c1722',
                  borderColor: '#10b981',
                  borderRadius: '0.75rem',
                  color: '#fff',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                }}
                formatter={(val: number, name: string) => [
                  `${val.toFixed(1)}°C`,
                  name === 'predictedTemp' ? 'Predicted Baseline Temp' :
                  name === 'optimalCoolingTemp' ? 'AI Optimized Setpoint' : name
                ]}
              />
              <ReferenceLine y={80} stroke="#ef4444" strokeDasharray="4 4" label={{ value: 'Warning Limit 80°C', fill: '#ef4444', fontSize: 11 }} />
              <Area
                type="monotone"
                dataKey="predictedTemp"
                stroke="#f43f5e"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#predictedGrad)"
              />
              <Area
                type="monotone"
                dataKey="optimalCoolingTemp"
                stroke="#10b981"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#optimizedGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <span>Simulation horizon: +30 minutes</span>
          <span className="font-mono text-emerald-400">Thermal Time Constant τ: 4.8 minutes</span>
        </div>
      </div>

      {/* AI Insight Box & Model Confidence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AI Insight Box */}
        <div className="md:col-span-2 glass-card p-6 rounded-2xl border border-cyan-500/30 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <BrainCircuit className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white flex items-center gap-1.5">
                <span>🤖 AI Insight</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  Real-time Inference
                </span>
              </h4>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 text-sm text-cyan-100 font-medium leading-relaxed">
            “Zone 03 is expected to experience increased thermal load within the next 10 minutes due to rising GPU utilization and ambient temperature.”
          </div>

          <p className="text-xs text-slate-300 mt-3 leading-relaxed">
            Instead of reactive emergency chilling (which spikes water evaporation and peak electric demand charges), the optimizer triggers a gentle pre-cooling ramp 6 minutes ahead of the peak.
          </p>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-cyan-400" />
              Generated 32 seconds ago
            </span>
            <span className="text-emerald-400 font-mono">Action: Strategy B Recommended</span>
          </div>
        </div>

        {/* Prediction Confidence Card */}
        <div className="glass-card p-6 rounded-2xl border border-emerald-500/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 font-medium mb-2">
              <span className="uppercase tracking-wider">Prediction Confidence</span>
              <Sparkles className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-4xl font-black font-mono text-emerald-400 tracking-tight">
              94%
            </div>
            <p className="text-xs text-slate-400 mt-2">
              High confidence based on continuous sensor telemetry convergence across 1,240 nodes.
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-300">
              <span>Model MAE:</span>
              <span className="font-mono text-emerald-400 font-semibold">0.4°C</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>R² Goodness of Fit:</span>
              <span className="font-mono text-emerald-400 font-semibold">0.98</span>
            </div>
            <div className="flex justify-between text-slate-300">
              <span>Surrogate Type:</span>
              <span className="font-mono text-cyan-300">LSTM + Physics</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
