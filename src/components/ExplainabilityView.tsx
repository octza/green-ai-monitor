import React, { useState } from 'react';
import { 
  BrainCircuit, 
  ArrowRight, 
  RotateCw, 
  Server, 
  Cpu, 
  Thermometer, 
  Droplet, 
  Zap, 
  Globe2, 
  Layers, 
  CheckCircle2, 
  Activity, 
  Gauge, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const ExplainabilityView: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const loopSteps = [
    { name: 'MONITOR', desc: 'Ingests thermal, CFM, workload & weather sensors continuously at 1 Hz' },
    { name: 'PREDICT', desc: 'Surrogate neural net projects 15-min forward heat accumulation curve' },
    { name: 'OPTIMIZE', desc: 'Pareto solver evaluates water, energy & carbon trade-offs' },
    { name: 'COOL', desc: 'Modulates chilled water flow & zonal airflow CFM without over-cooling' },
    { name: 'MEASURE', desc: 'Validates actual thermal drops against simulation estimates' },
    { name: 'IMPROVE', desc: 'Updates surrogate neural weights via continuous online calibration' },
  ];

  const reasoningSteps = [
    { num: 1, title: 'GPU workload increased by 18%', detail: 'Distributed transformer training run initiated on Zone 03 cluster, saturating tensor cores to 94%.' },
    { num: 2, title: 'Ambient temperature increased by 3°C', detail: 'Outdoor wet-bulb conditions shifted from 27°C to 30°C, slightly lowering evaporative cooling tower efficiency.' },
    { num: 3, title: 'Zone 03 is approaching the thermal threshold', detail: 'Surrogate predictor flagged 80°C threshold breach within 15 minutes under static cooling rules.' },
    { num: 4, title: 'Zone 01 has low workload', detail: 'Zone 01 inference clusters running at 48% with a 64°C operating temperature, leaving an 11°C safe buffer.' },
    { num: 5, title: 'Cooling can be redistributed without compromising safety', detail: 'Dynamic variable dampers throttle Zone 01 by 12% CFM while redirecting high-velocity chilled airflow directly to Zone 03.' },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
            Explainable AI (XAI)
          </span>
          <span className="text-slate-600">/</span>
          <span className="text-xs font-mono text-cyan-400">Decision Traceability</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          AI Explainability & System Architecture
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Demystifying algorithmic choices: transparent reasoning steps, closed-loop telemetry, and system architecture.
        </p>
      </div>

      {/* Section 1: Why did AI make this decision? */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-cyan-500/30">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <BrainCircuit className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Why did AI make this decision?</h2>
            <p className="text-xs text-slate-400">Human-readable causal chain of the latest cooling strategy recommendation</p>
          </div>
        </div>

        {/* 5 Reasoning Steps */}
        <div className="space-y-3">
          {reasoningSteps.map((step) => (
            <div
              key={step.num}
              className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-4 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-mono font-bold text-sm shrink-0">
                {step.num}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-white">{step.title}</h4>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{step.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Final Conclusion Box */}
        <div className="mt-6 p-5 rounded-xl bg-gradient-to-r from-emerald-950/40 via-teal-950/30 to-[#0c1722] border-2 border-emerald-500/40 shadow-glow-sm">
          <div className="text-xs uppercase font-mono font-bold tracking-wider text-emerald-400 mb-1">
            Synthesized Decision
          </div>
          <p className="text-base sm:text-lg font-extrabold text-white leading-snug">
            “The AI increased cooling in Zone 03 and reduced unnecessary cooling in Zone 01.”
          </p>
          <p className="text-xs text-slate-300 mt-2">
            Result: Prevented potential thermal throttling in Zone 03 while saving an estimated 8% water and 11% energy facility-wide.
          </p>
        </div>
      </div>

      {/* Section 2: Sustainable AI Cooling Loop */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-emerald-500/30">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>Sustainable AI Cooling Loop</span>
              <RotateCw className="w-4 h-4 text-emerald-400 animate-spin-slow" />
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Continuous adaptive closed loop adjusting dynamically to operational changes
            </p>
          </div>
        </div>

        {/* Circular / Flow visualization */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 my-6">
          {loopSteps.map((step, idx) => {
            const isCurrent = activeStep === idx;
            return (
              <div
                key={step.name}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isCurrent
                    ? 'border-emerald-400 bg-emerald-500/15 shadow-glow-sm scale-[1.02]'
                    : 'border-slate-800 bg-slate-900/60 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-slate-500">Step 0{idx + 1}</span>
                    {idx < 5 ? (
                      <ArrowRight className="w-3.5 h-3.5 text-slate-600 hidden lg:block" />
                    ) : (
                      <RotateCw className="w-3.5 h-3.5 text-emerald-400 hidden lg:block" />
                    )}
                  </div>
                  <h4 className={`text-sm font-black tracking-wider ${isCurrent ? 'text-emerald-300' : 'text-white'}`}>
                    {step.name}
                  </h4>
                </div>
                <p className="text-[11px] text-slate-400 mt-2 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Required Caption */}
        <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 text-center">
          <p className="text-xs text-emerald-300 font-medium">
            “Green AI Monitor continuously learns from operational data to improve cooling efficiency.”
          </p>
        </div>
      </div>

      {/* Section 3: System Architecture Diagram */}
      <div className="glass-card rounded-2xl p-6 sm:p-8 border border-emerald-500/20">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-cyan-400" />
            <span>End-to-End System Architecture</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Data pipeline mapping raw hardware telemetry to multi-objective environmental control
          </p>
        </div>

        {/* Diagram Flow Nodes */}
        <div className="flex flex-col space-y-3 relative">
          {/* Node 1 */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Server className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-white">Sensors & Existing Data</h4>
                <p className="text-xs text-slate-400">Temperature / Workload / Humidity / Water / Energy</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 px-2.5 py-1 bg-emerald-500/10 rounded border border-emerald-500/20">
              Inlet, Outlet, BMC IPMI, Flowmeters, Weather API
            </span>
          </div>

          <div className="flex justify-center text-emerald-400/80">
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Node 2 */}
          <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                <Cpu className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-cyan-300">AI Thermal Predictor</h4>
                <p className="text-xs text-slate-300">Future Heat Prediction (5m, 10m, 15m, 30m Horizons)</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 px-2.5 py-1 bg-cyan-500/10 rounded border border-cyan-500/20">
              LSTM Surrogate Model · 94% Confidence
            </span>
          </div>

          <div className="flex justify-center text-cyan-400/80">
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Node 3 */}
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-4 shadow-glow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                <Globe2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-emerald-300">Water + Energy + Carbon Optimizer</h4>
                <p className="text-xs text-slate-300">Cooling Recommendation (Pareto Frontier Evaluation)</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-300 px-2.5 py-1 bg-emerald-500/20 rounded border border-emerald-500/30">
              Multi-Objective Genetic Algorithm & Rules
            </span>
          </div>

          <div className="flex justify-center text-emerald-400/80">
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Node 4 */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-white">Simulation / Control Layer</h4>
                <p className="text-xs text-slate-400">Direct actuator setpoint modulation & operator approval</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-amber-400 px-2.5 py-1 bg-amber-500/10 rounded border border-amber-500/20">
              Modbus/BACnet BMS Integration Ready
            </span>
          </div>

          <div className="flex justify-center text-emerald-400/80">
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </div>

          {/* Node 5 */}
          <div className="p-4 rounded-xl bg-teal-950/20 border border-teal-500/30 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-mono font-bold uppercase text-teal-300">Savings Dashboard & Continuous Feedback Loop</h4>
                <p className="text-xs text-slate-400">Verifies actual kilowatt-hours & water gallons saved; updates surrogate models</p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-teal-300 px-2.5 py-1 bg-teal-500/10 rounded border border-teal-500/20">
              Closed Loop Self-Learning
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
