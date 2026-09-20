import React, { useState, useMemo } from 'react';
import { SimulatorInputs } from '../types';
import { calculateSimulation } from '../utils/simulationLogic';
import { 
  Sliders, 
  Sparkles, 
  Thermometer, 
  Droplet, 
  Zap, 
  Globe2, 
  ArrowRight, 
  RotateCcw, 
  Sun, 
  CloudRain, 
  Cpu, 
  Wind,
  ShieldCheck,
  AlertTriangle,
  Info
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { playClickSound } from '../utils/sound';

export const WhatIfSimulatorView: React.FC = () => {
  // Simulator inputs state (with user's exact default values)
  const [inputs, setInputs] = useState<SimulatorInputs>({
    gpuWorkload: 70,
    ambientTemp: 30,
    humidity: 55,
    coolingIntensity: 65,
  });

  // Calculate live results instantaneously on slider changes
  const results = useMemo(() => {
    return calculateSimulation(inputs);
  }, [inputs]);

  // Preset scenarios
  const applyPreset = (presetName: string) => {
    playClickSound();
    switch (presetName) {
      case 'heatwave':
        setInputs({ gpuWorkload: 85, ambientTemp: 38, humidity: 40, coolingIntensity: 88 });
        break;
      case 'training':
        setInputs({ gpuWorkload: 96, ambientTemp: 28, humidity: 50, coolingIntensity: 75 });
        break;
      case 'night':
        setInputs({ gpuWorkload: 32, ambientTemp: 19, humidity: 62, coolingIntensity: 42 });
        break;
      case 'balanced':
      default:
        setInputs({ gpuWorkload: 70, ambientTemp: 30, humidity: 55, coolingIntensity: 65 });
        break;
    }
  };

  // Prepare comparison data for side-by-side visualization
  const comparisonData = [
    {
      name: 'Water (L/100)',
      Current: Math.round(results.waterConsumptionLiters / 100),
      Optimized: Math.round(results.aiWaterLiters / 100),
      unit: 'x100 L/day',
      savings: `${results.waterSavingsPct}%`
    },
    {
      name: 'Energy (MWh)',
      Current: results.energyConsumptionMWh,
      Optimized: results.aiEnergyMWh,
      unit: 'MWh/day',
      savings: `${results.energySavingsPct}%`
    },
    {
      name: 'CO₂ (kg/10)',
      Current: Math.round(results.co2ImpactKg / 10),
      Optimized: Math.round(results.aiCo2Kg / 10),
      unit: 'x10 kg/day',
      savings: `${results.co2SavingsPct}%`
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Tagline */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              ⭐ KEY USP FEATURE
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-mono text-cyan-400">Interactive Model Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            What-if Cooling Simulator
          </h1>
          <p className="text-sm font-medium text-emerald-300/90 mt-1">
            “See how workload changes affect temperature, water, energy and carbon.”
          </p>
        </div>

        {/* Preset scenario shortcuts */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-mono mr-1">Presets:</span>
          <button
            onClick={() => applyPreset('balanced')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
          >
            Default (70%)
          </button>
          <button
            onClick={() => applyPreset('training')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-500/15 hover:bg-purple-500/25 text-purple-300 border border-purple-500/30 transition-all"
          >
            🔥 AI Training Spike
          </button>
          <button
            onClick={() => applyPreset('heatwave')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 transition-all"
          >
            ☀️ Summer Heatwave
          </button>
          <button
            onClick={() => applyPreset('night')}
            className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500/15 hover:bg-cyan-500/25 text-cyan-300 border border-cyan-500/30 transition-all"
          >
            🌙 Night Eco Idle
          </button>
        </div>
      </div>

      {/* Main Grid: Interactive Sliders on Left, Live Predicted Impact on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Sliders */}
        <div className="lg:col-span-5 glass-card rounded-2xl p-6 border border-emerald-500/25 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-400" />
              <span>Operational Simulation Controls</span>
            </h3>
            <button
              onClick={() => applyPreset('balanced')}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 font-mono transition-colors"
              title="Reset to default settings"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Slider 1: GPU Workload */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-emerald-400" />
                GPU Workload:
              </span>
              <span className="font-mono text-sm font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                {inputs.gpuWorkload}%
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="100"
              step="1"
              value={inputs.gpuWorkload}
              onChange={(e) => setInputs({ ...inputs, gpuWorkload: Number(e.target.value) })}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400 transition-all"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>10% (Idle)</span>
              <span>50% (Normal)</span>
              <span>100% (Full Tensor Saturation)</span>
            </div>
          </div>

          {/* Slider 2: Ambient Temperature */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                Ambient Temperature:
              </span>
              <span className="font-mono text-sm font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                {inputs.ambientTemp}°C
              </span>
            </div>
            <input
              type="range"
              min="15"
              max="45"
              step="1"
              value={inputs.ambientTemp}
              onChange={(e) => setInputs({ ...inputs, ambientTemp: Number(e.target.value) })}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400 transition-all"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>15°C (Cool Autumn)</span>
              <span>30°C (Standard)</span>
              <span>45°C (Extreme Desert)</span>
            </div>
          </div>

          {/* Slider 3: Humidity */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <CloudRain className="w-3.5 h-3.5 text-cyan-400" />
                Humidity:
              </span>
              <span className="font-mono text-sm font-bold text-cyan-300 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
                {inputs.humidity}%
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="90"
              step="1"
              value={inputs.humidity}
              onChange={(e) => setInputs({ ...inputs, humidity: Number(e.target.value) })}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 transition-all"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>20% (Dry / High Evaporation)</span>
              <span>55% (Nominal)</span>
              <span>90% (Saturated)</span>
            </div>
          </div>

          {/* Slider 4: Cooling Intensity */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Wind className="w-3.5 h-3.5 text-teal-400" />
                Cooling Intensity:
              </span>
              <span className="font-mono text-sm font-bold text-teal-300 bg-teal-500/10 px-2 py-0.5 rounded border border-teal-500/30">
                {inputs.coolingIntensity}%
              </span>
            </div>
            <input
              type="range"
              min="20"
              max="100"
              step="1"
              value={inputs.coolingIntensity}
              onChange={(e) => setInputs({ ...inputs, coolingIntensity: Number(e.target.value) })}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-teal-400 transition-all"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono">
              <span>20% (Eco Free Air)</span>
              <span>65% (Modulated VFD)</span>
              <span>100% (Emergency Max)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              Real-time physics calculation executes instantly upon slider movement.
            </span>
          </div>
        </div>

        {/* Right Column: Predicted Impact & AI Recommendation */}
        <div className="lg:col-span-7 space-y-6">
          {/* Predicted Impact Card */}
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/30 shadow-glow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                <h3 className="text-base font-extrabold text-white tracking-wide uppercase">
                  Predicted Impact
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Thermodynamic Steady State
              </span>
            </div>

            {/* 4 Impact Output Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {/* Temperature */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-xs text-slate-400 flex items-center justify-center gap-1">
                  <Thermometer className="w-3.5 h-3.5 text-cyan-400" />
                  Temperature
                </span>
                <div className={`text-2xl font-black font-mono mt-1 ${
                  results.temperature > 78 ? 'text-rose-400' :
                  results.temperature > 72 ? 'text-amber-300' : 'text-emerald-400'
                }`}>
                  {results.temperature.toFixed(1)}°C
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Safe limit &lt; 80°C
                </span>
              </div>

              {/* Water Consumption */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-xs text-slate-400 flex items-center justify-center gap-1">
                  <Droplet className="w-3.5 h-3.5 text-teal-400" />
                  Water Consumption
                </span>
                <div className="text-2xl font-black font-mono text-teal-300 mt-1">
                  {results.waterConsumptionLiters.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  L/day
                </span>
              </div>

              {/* Energy Consumption */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-xs text-slate-400 flex items-center justify-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-400" />
                  Energy Consumption
                </span>
                <div className="text-2xl font-black font-mono text-emerald-400 mt-1">
                  {results.energyConsumptionMWh.toFixed(2)}
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  MWh/day
                </span>
              </div>

              {/* CO2 Impact */}
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                <span className="text-xs text-slate-400 flex items-center justify-center gap-1">
                  <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
                  CO₂ Impact
                </span>
                <div className="text-2xl font-black font-mono text-cyan-300 mt-1">
                  {results.co2ImpactKg.toLocaleString()}
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  kg/day
                </span>
              </div>
            </div>
          </div>

          {/* AI Recommendation Banner */}
          <div className="glass-card rounded-2xl p-6 border border-cyan-500/40 bg-gradient-to-r from-[#0b2426] via-[#091b24] to-[#07191e] relative overflow-hidden">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 shrink-0">
                <Sparkles className="w-5 h-5 text-cyan-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                    AI Recommendation
                  </h4>
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Target Intensity: {results.aiSuggestedIntensity}%
                  </span>
                </div>
                <p className="text-base font-bold text-white mt-1.5 leading-snug">
                  “{results.aiCoolingRecommendation}”
                </p>

                {/* Potential Savings Badges */}
                <div className="mt-4 pt-4 border-t border-cyan-500/20">
                  <div className="text-xs font-semibold text-slate-300 mb-2">
                    Potential savings:
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-2.5 rounded-xl bg-black/40 border border-cyan-500/20 text-center">
                      <span className="text-xs text-slate-400 flex items-center justify-center gap-1">
                        <Droplet className="w-3 h-3 text-cyan-400" />
                        Water
                      </span>
                      <div className="text-xl font-black font-mono text-cyan-300 mt-0.5">
                        {results.waterSavingsPct}%
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black/40 border border-emerald-500/20 text-center">
                      <span className="text-xs text-slate-400 flex items-center justify-center gap-1">
                        <Zap className="w-3 h-3 text-emerald-400" />
                        Energy
                      </span>
                      <div className="text-xl font-black font-mono text-emerald-400 mt-0.5">
                        {results.energySavingsPct}%
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-black/40 border border-teal-500/20 text-center">
                      <span className="text-xs text-slate-400 flex items-center justify-center gap-1">
                        <Globe2 className="w-3 h-3 text-teal-400" />
                        CO₂
                      </span>
                      <div className="text-xl font-black font-mono text-teal-300 mt-0.5">
                        {results.co2SavingsPct}%
                      </div>
                    </div>
                  </div>

                  {/* Explicit Required Label */}
                  <div className="mt-3 text-center">
                    <span className="inline-block px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/30 text-amber-300 text-[11px] font-mono font-bold tracking-tight">
                      Potential Savings — Simulation Estimate
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Comparison: Current Strategy vs AI Optimized Strategy */}
          <div className="glass-card rounded-2xl p-6 border border-emerald-500/20">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">
                  Visual Comparison: Current Strategy vs AI Optimized Strategy
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Normalized daily resource demand under current slider parameters
                </p>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="flex items-center gap-1 text-slate-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-500"></span>
                  Current Strategy
                </span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
                  AI Optimized Strategy
                </span>
              </div>
            </div>

            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="name" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0c1722',
                      borderColor: '#10b981',
                      borderRadius: '0.75rem',
                      color: '#fff',
                    }}
                    formatter={(val: number, name: string) => [
                      val,
                      name === 'Current' ? 'Current Strategy' : 'AI Optimized Strategy'
                    ]}
                  />
                  <Bar dataKey="Current" fill="#475569" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Optimized" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
