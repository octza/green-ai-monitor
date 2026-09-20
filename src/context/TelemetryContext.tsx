import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ZoneData, TelemetryState, CoolingStrategy, AlertItem } from '../types';
import { playClickSound, playSuccessChime, playAlertPulse } from '../utils/sound';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface TelemetryContextType {
  zones: ZoneData[];
  telemetry: TelemetryState;
  strategies: CoolingStrategy[];
  activeStrategyId: 'A' | 'B' | 'C';
  alerts: AlertItem[];
  isSimulating: boolean;
  simulationTick: number;
  toasts: ToastMessage[];
  selectedZone: ZoneData | null;
  setSelectedZone: (zone: ZoneData | null) => void;
  toggleSimulation: () => void;
  applyStrategy: (strategyId: 'A' | 'B' | 'C') => void;
  acknowledgeAlert: (id: string) => void;
  dismissAlert: (id: string) => void;
  triggerSimulatedMitigation: (zoneId: string) => void;
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const INITIAL_ZONES: ZoneData[] = [
  {
    id: 'zone-01',
    name: 'Zone 01 — Inference Cluster Alpha',
    serverCount: 320,
    temperature: 64.0,
    gpuLoad: 48,
    cpuLoad: 42,
    cooling: 'Low',
    status: 'Stable',
    targetTemp: 65,
    airflowCFM: 8400,
    racks: [
      { id: 'Rack A1', temp: 63.2, load: 46 },
      { id: 'Rack A2', temp: 64.8, load: 51 },
      { id: 'Rack A3', temp: 64.1, load: 48 },
      { id: 'Rack A4', temp: 63.9, load: 47 },
    ]
  },
  {
    id: 'zone-02',
    name: 'Zone 02 — Data Ingestion & Storage',
    serverCount: 280,
    temperature: 72.0,
    gpuLoad: 82,
    cpuLoad: 76,
    cooling: 'Medium',
    status: 'Watch',
    targetTemp: 70,
    airflowCFM: 11200,
    racks: [
      { id: 'Rack B1', temp: 71.4, load: 80 },
      { id: 'Rack B2', temp: 73.1, load: 85 },
      { id: 'Rack B3', temp: 72.2, load: 81 },
      { id: 'Rack B4', temp: 71.8, load: 82 },
    ]
  },
  {
    id: 'zone-03',
    name: 'Zone 03 — LLM Distributed Training',
    serverCount: 450,
    temperature: 77.0,
    gpuLoad: 94,
    cpuLoad: 91,
    cooling: 'High',
    status: 'High Load',
    targetTemp: 72,
    airflowCFM: 16500,
    racks: [
      { id: 'Rack C1', temp: 76.5, load: 93 },
      { id: 'Rack C2', temp: 78.4, load: 96 },
      { id: 'Rack C3', temp: 77.2, load: 95 },
      { id: 'Rack C4', temp: 76.1, load: 92 },
    ]
  },
  {
    id: 'zone-04',
    name: 'Zone 04 — Edge Cache & Internal Services',
    serverCount: 190,
    temperature: 58.0,
    gpuLoad: 31,
    cpuLoad: 28,
    cooling: 'Low',
    status: 'Stable',
    targetTemp: 60,
    airflowCFM: 6200,
    racks: [
      { id: 'Rack D1', temp: 57.5, load: 30 },
      { id: 'Rack D2', temp: 58.6, load: 33 },
      { id: 'Rack D3', temp: 57.9, load: 31 },
      { id: 'Rack D4', temp: 58.2, load: 30 },
    ]
  }
];

const INITIAL_STRATEGIES: CoolingStrategy[] = [
  {
    id: 'A',
    name: 'Strategy A — Maximum Cooling',
    subtitle: 'Over-provisioned chillers for absolute cold margin',
    energyUnits: 100,
    waterUnits: 20,
    co2Kg: 40,
    tempSafety: 99,
    isRecommended: false,
    reason: 'Maintains extreme safety margin but incurs heavy water and electricity waste.',
    breakdown: {
      chillerLoad: '100% capacity (4 units online)',
      coolingTowerFan: 'Maximum RPM',
      pumpSpeed: 'Full variable flow (60 Hz)'
    }
  },
  {
    id: 'B',
    name: 'Strategy B — Balanced Cooling',
    subtitle: 'Pareto-optimal AI setpoint with zonal dynamic fan modulation',
    energyUnits: 86,
    waterUnits: 14,
    co2Kg: 34,
    tempSafety: 97,
    isRecommended: true,
    reason: 'Maintains safe temperature limits while reducing environmental impact.',
    breakdown: {
      chillerLoad: '82% capacity (3 units online + 1 standby)',
      coolingTowerFan: 'Modulated variable frequency drive (44 Hz)',
      pumpSpeed: 'Zone-aware dynamic differential pressure'
    }
  },
  {
    id: 'C',
    name: 'Strategy C — Eco Cooling',
    subtitle: 'Aggressive free-air economizer and minimal evaporative water',
    energyUnits: 78,
    waterUnits: 10,
    co2Kg: 30,
    tempSafety: 91,
    isRecommended: false,
    reason: 'Minimizes power & water, but leaves tighter thermal headroom during unexpected GPU spikes.',
    breakdown: {
      chillerLoad: '68% capacity (direct economizer priority)',
      coolingTowerFan: 'Low speed eco mode',
      pumpSpeed: 'Reduced flow rate'
    }
  }
];

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alert-1',
    timestamp: '2 min ago',
    severity: 'warning',
    title: 'High Thermal Load',
    message: 'Zone 03 workload increased to 94%.',
    zoneId: 'zone-03'
  },
  {
    id: 'alert-2',
    timestamp: '5 min ago',
    severity: 'info',
    title: 'Optimization Opportunity',
    message: 'Zone 01 is currently receiving more cooling than required.',
    zoneId: 'zone-01'
  },
  {
    id: 'alert-3',
    timestamp: '11 min ago',
    severity: 'saving',
    title: 'Water Saving Detected',
    message: 'AI optimization reduced simulated cooling-water demand.',
    zoneId: 'zone-04'
  },
  {
    id: 'alert-4',
    timestamp: '16 min ago',
    severity: 'critical',
    title: 'Temperature Risk',
    message: 'Zone 03 predicted to reach 80°C within 15 minutes if cooling is not redistributed.',
    zoneId: 'zone-03'
  }
];

const TelemetryContext = createContext<TelemetryContextType | undefined>(undefined);

export const TelemetryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [zones, setZones] = useState<ZoneData[]>(INITIAL_ZONES);
  const [activeStrategyId, setActiveStrategyId] = useState<'A' | 'B' | 'C'>('B');
  const [strategies, setStrategies] = useState<CoolingStrategy[]>(INITIAL_STRATEGIES);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [simulationTick, setSimulationTick] = useState<number>(0);
  const [selectedZone, setSelectedZone] = useState<ZoneData | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const [telemetry, setTelemetry] = useState<TelemetryState>({
    avgTemperature: 68.4,
    tempDelta: -1.2,
    energyUsageMWh: 1.82,
    energyDeltaPct: -9.4,
    waterUsageLiters: 8420,
    waterDeltaPct: -7.8,
    co2Kg: 742,
    co2DeltaKg: -68,
    ambientTemp: 30.2,
    humidity: 55,
    coolingSafetyScore: 96,
    waterEfficiencyScore: 89,
    energyEfficiencyScore: 92,
    carbonEfficiencyScore: 86,
    overallGreenScore: 87,
    pue: 1.14,
    wue: 0.28
  });

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev.slice(-3), { id, title, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Real-time tick simulation engine
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setSimulationTick(t => t + 1);

      setZones(prevZones => {
        return prevZones.map(zone => {
          // Small realistic fluctuations
          const tempWiggle = (Math.random() - 0.48) * 0.4;
          const loadWiggle = Math.round((Math.random() - 0.48) * 2);

          let newTemp = Math.round((zone.temperature + tempWiggle) * 10) / 10;
          let newLoad = Math.max(10, Math.min(100, zone.gpuLoad + loadWiggle));

          // Bound temperatures realistically
          if (zone.id === 'zone-01') newTemp = Math.max(62, Math.min(67, newTemp));
          if (zone.id === 'zone-02') newTemp = Math.max(70, Math.min(75, newTemp));
          if (zone.id === 'zone-03') newTemp = Math.max(75, Math.min(81, newTemp));
          if (zone.id === 'zone-04') newTemp = Math.max(56, Math.min(61, newTemp));

          const newRacks = zone.racks.map(r => ({
            ...r,
            temp: Math.round((newTemp + (Math.random() - 0.5) * 1.2) * 10) / 10,
            load: Math.max(10, Math.min(100, newLoad + Math.round((Math.random() - 0.5) * 4)))
          }));

          return {
            ...zone,
            temperature: newTemp,
            gpuLoad: newLoad,
            racks: newRacks
          };
        });
      });

      // Update telemetry aggregates
      setTelemetry(prev => {
        const tempFluct = (Math.random() - 0.5) * 0.1;
        const waterFluct = Math.round((Math.random() - 0.4) * 4);
        const energyFluct = (Math.random() - 0.5) * 0.005;

        return {
          ...prev,
          avgTemperature: Math.round((prev.avgTemperature + tempFluct) * 10) / 10,
          waterUsageLiters: Math.max(7000, prev.waterUsageLiters + waterFluct),
          energyUsageMWh: Math.round((prev.energyUsageMWh + energyFluct) * 100) / 100,
          co2Kg: Math.round((prev.energyUsageMWh * 412) + (Math.random() - 0.5) * 2)
        };
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const toggleSimulation = () => {
    playClickSound();
    setIsSimulating(prev => !prev);
    addToast(
      isSimulating ? 'Simulation Paused' : 'Simulation Resumed',
      isSimulating ? 'Real-time telemetry stream frozen.' : 'Real-time telemetry stream resumed.',
      'info'
    );
  };

  const applyStrategy = (strategyId: 'A' | 'B' | 'C') => {
    setActiveStrategyId(strategyId);
    playSuccessChime();

    const strat = strategies.find(s => s.id === strategyId);
    const stratName = strat ? strat.name : strategyId;

    if (strategyId === 'B') {
      // Balanced AI strategy
      setTelemetry(prev => ({
        ...prev,
        coolingSafetyScore: 97,
        waterEfficiencyScore: 92,
        energyEfficiencyScore: 94,
        carbonEfficiencyScore: 89,
        overallGreenScore: 91,
      }));
      addToast(
        'AI Strategy Applied ✓',
        `Activated ${stratName}. Cooling reallocated to Zone 03 while optimizing Water & Energy consumption.`,
        'success'
      );
    } else if (strategyId === 'A') {
      setTelemetry(prev => ({
        ...prev,
        coolingSafetyScore: 99,
        waterEfficiencyScore: 78,
        energyEfficiencyScore: 81,
        carbonEfficiencyScore: 76,
        overallGreenScore: 82,
      }));
      addToast(
        'Max Cooling Applied',
        `Activated ${stratName}. Temperature margin maximized, environmental cost elevated.`,
        'warning'
      );
    } else {
      setTelemetry(prev => ({
        ...prev,
        coolingSafetyScore: 91,
        waterEfficiencyScore: 96,
        energyEfficiencyScore: 96,
        carbonEfficiencyScore: 95,
        overallGreenScore: 94,
      }));
      addToast(
        'Eco Cooling Applied',
        `Activated ${stratName}. Water & energy minimized; operating closer to thermal boundaries.`,
        'info'
      );
    }
  };

  const acknowledgeAlert = (id: string) => {
    playClickSound();
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, acknowledged: true } : a));
    addToast('Alert Acknowledged', 'Logged in data center operations history.', 'info');
  };

  const dismissAlert = (id: string) => {
    playClickSound();
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  const triggerSimulatedMitigation = (zoneId: string) => {
    playAlertPulse();
    setZones(prev => prev.map(z => {
      if (z.id === zoneId) {
        return {
          ...z,
          temperature: Math.max(65, z.temperature - 3.5),
          cooling: 'High',
          status: 'Stable'
        };
      }
      return z;
    }));
    addToast(
      'Targeted Redistribution Executed',
      `Cooling increased for ${zoneId.toUpperCase()}. Simulated chip temperature reduced by 3.5°C.`,
      'success'
    );
  };

  return (
    <TelemetryContext.Provider
      value={{
        zones,
        telemetry,
        strategies,
        activeStrategyId,
        alerts,
        isSimulating,
        simulationTick,
        toasts,
        selectedZone,
        setSelectedZone,
        toggleSimulation,
        applyStrategy,
        acknowledgeAlert,
        dismissAlert,
        triggerSimulatedMitigation,
        addToast,
        removeToast
      }}
    >
      {children}
    </TelemetryContext.Provider>
  );
};

export const useTelemetry = () => {
  const context = useContext(TelemetryContext);
  if (!context) {
    throw new Error('useTelemetry must be used within a TelemetryProvider');
  }
  return context;
};
