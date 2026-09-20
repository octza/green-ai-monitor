import React from 'react';
import { NavTab } from '../types';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  LayoutDashboard, 
  Server, 
  TrendingUp, 
  Cpu, 
  Sliders, 
  Leaf, 
  BellRing, 
  GitBranch, 
  Info,
  ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  currentTab: NavTab;
  setCurrentTab: (tab: NavTab) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  setCurrentTab,
  mobileMenuOpen,
  setMobileMenuOpen
}) => {
  const { alerts, telemetry } = useTelemetry();
  const alertCount = alerts.length;

  const navItems = [
    { id: 'dashboard' as NavTab, label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'live-monitor' as NavTab, label: 'Live Monitor', icon: Server, badge: '4 Zones' },
    { id: 'ai-prediction' as NavTab, label: 'AI Prediction', icon: TrendingUp, badge: '94% Conf' },
    { id: 'cooling-optimizer' as NavTab, label: 'Cooling Optimizer', icon: Cpu, badge: 'AI Rec' },
    { 
      id: 'what-if-simulator' as NavTab, 
      label: 'What-if Simulator', 
      icon: Sliders, 
      badge: '⭐ KEY USP', 
      highlight: true 
    },
    { id: 'sustainability' as NavTab, label: 'Sustainability', icon: Leaf, badge: `${telemetry.overallGreenScore}/100` },
    { id: 'alerts' as NavTab, label: 'Alerts', icon: BellRing, badge: alertCount > 0 ? `${alertCount}` : null },
    { id: 'explainability' as NavTab, label: 'AI & Architecture', icon: GitBranch, badge: 'Loop' },
    { id: 'about' as NavTab, label: 'About & Pitch', icon: Info, badge: null },
  ];

  const handleSelect = (id: NavTab) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 border-r border-emerald-500/15 bg-[#071018]/95 backdrop-blur-xl flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-4 overflow-y-auto flex-1 space-y-6">
          {/* Main Navigation */}
          <div>
            <div className="px-3 mb-2 flex items-center justify-between">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-slate-400">
                Decision Systems
              </span>
              <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            </div>

            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                const isHighlight = item.highlight;

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                      isActive
                        ? isHighlight
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-black font-semibold shadow-glow-sm'
                          : 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-glow-sm'
                        : isHighlight
                          ? 'text-emerald-300 hover:bg-emerald-500/10 border border-emerald-500/25'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                        isActive 
                          ? isHighlight ? 'text-black' : 'text-emerald-400' 
                          : isHighlight ? 'text-emerald-400' : 'text-slate-400 group-hover:text-emerald-300'
                      }`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? isHighlight
                              ? 'bg-black text-emerald-300'
                              : 'bg-emerald-500/30 text-emerald-200'
                            : isHighlight
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Mini Real-Time Thermal Gauge Widget */}
          <div className="p-3.5 rounded-xl bg-gradient-to-b from-[#0d1e2a] to-[#08151f] border border-emerald-500/20 shadow-inner">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Thermal Safety
              </span>
              <span className="font-mono font-bold text-emerald-400">{telemetry.coolingSafetyScore}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${telemetry.coolingSafetyScore}%` }}
              ></div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-700/40 flex items-center justify-between text-[11px] text-slate-400">
              <span>Avg Facility Temp</span>
              <span className="font-mono font-bold text-cyan-300">{telemetry.avgTemperature.toFixed(1)}°C</span>
            </div>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-emerald-500/15 bg-[#050c13] text-[11px] text-slate-400">
          <div className="flex items-center justify-between mb-1 font-mono text-[10px]">
            <span className="text-emerald-400">PUE {telemetry.pue}</span>
            <span className="text-cyan-400">WUE {telemetry.wue} L/kWh</span>
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Water · Energy · Carbon Aware Decision Engine
          </p>
        </div>
      </aside>
    </>
  );
};
