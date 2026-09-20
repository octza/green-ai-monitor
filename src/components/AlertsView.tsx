import React, { useState } from 'react';
import { useTelemetry } from '../context/TelemetryContext';
import { 
  BellRing, 
  AlertTriangle, 
  ShieldAlert, 
  Info, 
  Droplet, 
  CheckCircle2, 
  X, 
  Filter, 
  Check, 
  Clock,
  ArrowRight
} from 'lucide-react';

export const AlertsView: React.FC = () => {
  const { alerts, acknowledgeAlert, dismissAlert, triggerSimulatedMitigation } = useTelemetry();
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'info' | 'saving'>('all');

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'all') return true;
    return alert.severity === filter;
  });

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0" />;
      case 'warning':
        return <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0" />;
      case 'info':
        return <Info className="w-5 h-5 text-cyan-400 shrink-0" />;
      case 'saving':
        return <Droplet className="w-5 h-5 text-emerald-400 shrink-0" />;
      default:
        return <BellRing className="w-5 h-5 text-slate-400 shrink-0" />;
    }
  };

  const getAlertStyles = (severity: string) => {
    switch (severity) {
      case 'critical':
        return {
          border: 'border-rose-500/40',
          badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
          indicator: '🔴 Critical Risk',
          bg: 'bg-[#180e12]'
        };
      case 'warning':
        return {
          border: 'border-amber-500/40',
          badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          indicator: '🟡 High Thermal Load',
          bg: 'bg-[#18150a]'
        };
      case 'info':
        return {
          border: 'border-cyan-500/40',
          badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
          indicator: '🔵 Optimization Opportunity',
          bg: 'bg-[#09151e]'
        };
      case 'saving':
        return {
          border: 'border-emerald-500/40',
          badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
          indicator: '🟢 Water Saving Detected',
          bg: 'bg-[#091a16]'
        };
      default:
        return {
          border: 'border-slate-800',
          badge: 'bg-slate-800 text-slate-300',
          indicator: 'Notice',
          bg: 'bg-slate-900'
        };
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400">
              Operations Center
            </span>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-mono text-cyan-400">Diagnostic Stream</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Thermal & Efficiency Alerts
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time automated incident detection, predictive thermal spikes, and automated savings opportunities.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-900/80 border border-slate-800">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === 'all' ? 'bg-emerald-500 text-black font-bold shadow-glow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            All ({alerts.length})
          </button>
          <button
            onClick={() => setFilter('critical')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === 'critical' ? 'bg-rose-500 text-white font-bold' : 'text-rose-400 hover:text-rose-300'
            }`}
          >
            Critical
          </button>
          <button
            onClick={() => setFilter('warning')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === 'warning' ? 'bg-amber-500 text-black font-bold' : 'text-amber-400 hover:text-amber-300'
            }`}
          >
            Warnings
          </button>
          <button
            onClick={() => setFilter('info')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === 'info' ? 'bg-cyan-500 text-black font-bold' : 'text-cyan-400 hover:text-cyan-300'
            }`}
          >
            Optimization
          </button>
          <button
            onClick={() => setFilter('saving')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === 'saving' ? 'bg-emerald-500 text-black font-bold' : 'text-emerald-400 hover:text-emerald-300'
            }`}
          >
            Water Savings
          </button>
        </div>
      </div>

      {/* Alert Feed */}
      <div className="space-y-3">
        {filteredAlerts.length === 0 ? (
          <div className="glass-card p-12 rounded-2xl text-center border border-slate-800">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white">All Clear</h3>
            <p className="text-xs text-slate-400 mt-1">No alerts matching the selected filter.</p>
          </div>
        ) : (
          filteredAlerts.map(alert => {
            const styles = getAlertStyles(alert.severity);

            return (
              <div
                key={alert.id}
                className={`glass-card rounded-2xl p-5 border ${styles.border} ${styles.bg} transition-all duration-300 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
              >
                <div className="flex items-start gap-3.5">
                  <div className="mt-0.5">{getAlertIcon(alert.severity)}</div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${styles.badge}`}>
                        {styles.indicator}
                      </span>
                      {alert.zoneId && (
                        <span className="text-xs font-mono text-slate-400 uppercase bg-slate-800/80 px-2 py-0.5 rounded">
                          {alert.zoneId}
                        </span>
                      )}
                      <span className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                        <Clock className="w-3 h-3" />
                        {alert.timestamp}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-white mt-1.5">{alert.title}</h4>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{alert.message}</p>
                  </div>
                </div>

                {/* Alert Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  {alert.zoneId && (
                    <button
                      onClick={() => triggerSimulatedMitigation(alert.zoneId!)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 border border-emerald-500/30 text-emerald-300 text-xs font-semibold flex items-center gap-1 transition-all"
                    >
                      <span>Simulate Fix</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {!alert.acknowledged ? (
                    <button
                      onClick={() => acknowledgeAlert(alert.id)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
                    >
                      Acknowledge
                    </button>
                  ) : (
                    <span className="text-[11px] font-mono text-emerald-400 px-2 py-1 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" />
                      Acknowledged
                    </span>
                  )}

                  <button
                    onClick={() => dismissAlert(alert.id)}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-800/60 transition-colors"
                    title="Dismiss alert"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
