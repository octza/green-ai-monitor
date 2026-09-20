import React from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid,
  LineChart,
  Line
} from 'recharts';
import { 
  Leaf, 
  Droplet, 
  Zap, 
  Globe2, 
  ShieldCheck, 
  TrendingDown, 
  Award, 
  Sparkles,
  CheckCircle2,
  Info
} from 'lucide-react';
import { SEVEN_DAY_WATER_DATA } from '../utils/simulationLogic';

export const SustainabilityView: React.FC = () => {
  const { telemetry } = useTelemetry();

  // Circular gauge calculations for 87/100
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (telemetry.overallGreenScore / 100) * circumference;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
            ESG & Environmental Impact
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-xs font-mono text-cyan-400">Resource Accounting</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Sustainability & Water Conservation
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Quantified metrics evaluating water consumption, electric draw, carbon emissions, and operational safety.
        </p>
      </div>

      {/* Top Section: Circular Green Score & 4 Pillar Breakdowns */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-emerald-500/30 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Circular Green Score */}
          <div className="flex flex-col items-center text-center shrink-0">
            <div className="relative flex items-center justify-center">
              <svg className="w-48 h-48 transform -rotate-90">
                {/* Background Track */}
                <circle
                  cx="96"
                  cy="96"
                  r={radius}
                  stroke="#1e293b"
                  strokeWidth="12"
                  fill="transparent"
                />
                {/* Progress Circle with Gradient */}
                <circle
                  cx="96"
                  cy="96"
                  r={radius}
                  stroke="url(#greenScoreGrad)"
                  strokeWidth="12"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="greenScoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Central Text */}
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold">
                  GREEN SCORE
                </span>
                <div className="text-4xl font-black font-mono text-white tracking-tight flex items-baseline">
                  <span>{telemetry.overallGreenScore}</span>
                  <span className="text-lg text-emerald-400 font-medium">/100</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-semibold mt-0.5">Top Decile</span>
              </div>
            </div>

            {/* Explanation Quote */}
            <p className="text-xs text-slate-300 max-w-xs mt-3 leading-relaxed font-medium">
              “Higher score means lower environmental impact while maintaining safe operating conditions.”
            </p>
          </div>

          {/* 4 Pillar Breakdown */}
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Water Efficiency */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <Droplet className="w-4 h-4 text-cyan-400" />
                  Water Efficiency
                </span>
                <span className="font-mono font-bold text-cyan-300 text-sm">84 / 100</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: '84%' }} />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                WUE: 0.28 L/kWh · Evaporative bleed recovery active
              </span>
            </div>

            {/* Energy Efficiency */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  Energy Efficiency
                </span>
                <span className="font-mono font-bold text-emerald-400 text-sm">91 / 100</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '91%' }} />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                PUE: 1.14 · Variable chiller staging active
              </span>
            </div>

            {/* Carbon Efficiency */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <Globe2 className="w-4 h-4 text-teal-400" />
                  Carbon Efficiency
                </span>
                <span className="font-mono font-bold text-teal-300 text-sm">86 / 100</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-teal-400 rounded-full" style={{ width: '86%' }} />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Grid carbon intensity matched to hourly renewable peaks
              </span>
            </div>

            {/* Thermal Safety */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="flex items-center gap-1.5 text-slate-200 font-semibold">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Thermal Safety
                </span>
                <span className="font-mono font-bold text-emerald-400 text-sm">94 / 100</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '94%' }} />
              </div>
              <span className="text-[10px] text-slate-400 mt-1 block">
                Zero SLA thermal excursions recorded
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Dedicated Section: Cooling Water Consumption (7-Day Chart) */}
      <div className="glass-card rounded-2xl p-6 border border-cyan-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Cooling Water Consumption</h3>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              7-day benchmark comparison: Traditional Static Cooling vs AI-Optimized Adaptive Cooling
            </p>
          </div>

          {/* Highlight Badge */}
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-400/40 text-right">
              <span className="text-[10px] uppercase font-mono font-semibold text-slate-300 block">
                Efficiency Delta
              </span>
              <span className="text-base font-extrabold text-emerald-400 font-mono">
                Potential Water Saved: 6–8%
              </span>
            </div>
          </div>
        </div>

        {/* 7-Day Bar Chart */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={SEVEN_DAY_WATER_DATA} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
              <YAxis domain={[8000, 11000]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} unit=" L" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0c1722',
                  borderColor: '#06b6d4',
                  borderRadius: '0.75rem',
                  color: '#fff',
                }}
                formatter={(val: number, name: string) => [
                  `${val.toLocaleString()} Liters`,
                  name === 'traditional' ? 'Traditional Cooling' : 'AI Optimized Cooling'
                ]}
              />
              <Legend 
                verticalAlign="top" 
                height={36}
                formatter={(val) => val === 'traditional' ? 'Traditional Cooling' : 'AI Optimized Cooling'}
              />
              <Bar dataKey="traditional" fill="#475569" radius={[4, 4, 0, 0]} name="traditional" />
              <Bar dataKey="optimized" fill="#06b6d4" radius={[4, 4, 0, 0]} name="optimized" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Required Disclaimer */}
        <div className="mt-4 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              Simulated demonstration data for hackathon prototype evaluation. Potential savings are simulation estimates, not guaranteed real-world results.
            </span>
          </div>
          <span className="font-mono text-cyan-400 shrink-0">Cumulative Saved: 5,100 Liters / week</span>
        </div>
      </div>
    </div>
  );
};
