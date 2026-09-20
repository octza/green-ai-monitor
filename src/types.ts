export type CoolingLevel = 'Low' | 'Medium' | 'High';
export type ZoneStatus = 'Stable' | 'Watch' | 'High Load';

export interface ZoneData {
  id: string;
  name: string;
  serverCount: number;
  temperature: number; // in °C
  gpuLoad: number; // in %
  cpuLoad: number; // in %
  cooling: CoolingLevel;
  status: ZoneStatus;
  targetTemp: number;
  airflowCFM: number;
  racks: Array<{ id: string; temp: number; load: number }>;
}

export interface TelemetryState {
  avgTemperature: number; // °C
  tempDelta: number;
  energyUsageMWh: number;
  energyDeltaPct: number;
  waterUsageLiters: number;
  waterDeltaPct: number;
  co2Kg: number;
  co2DeltaKg: number;
  ambientTemp: number; // °C
  humidity: number; // %
  coolingSafetyScore: number; // 96%
  waterEfficiencyScore: number; // 89%
  energyEfficiencyScore: number; // 92%
  carbonEfficiencyScore: number; // 86%
  overallGreenScore: number; // 87
  pue: number; // Power Usage Effectiveness (e.g. 1.14)
  wue: number; // Water Usage Effectiveness (e.g. 0.28 L/kWh)
}

export interface PredictionPoint {
  timeLabel: string;
  minutes: number;
  baselineTemp: number;
  predictedTemp: number;
  lowerBound: number;
  upperBound: number;
  optimalCoolingTemp: number;
}

export interface CoolingStrategy {
  id: 'A' | 'B' | 'C';
  name: string;
  subtitle: string;
  energyUnits: number;
  waterUnits: number;
  co2Kg: number;
  tempSafety: number; // %
  isRecommended: boolean;
  reason: string;
  breakdown: {
    chillerLoad: string;
    coolingTowerFan: string;
    pumpSpeed: string;
  };
}

export interface AlertItem {
  id: string;
  timestamp: string;
  severity: 'critical' | 'warning' | 'info' | 'saving';
  title: string;
  message: string;
  zoneId?: string;
  acknowledged?: boolean;
}

export interface SimulatorInputs {
  gpuWorkload: number; // 10% - 100%
  ambientTemp: number; // 15°C - 45°C
  humidity: number; // 20% - 90%
  coolingIntensity: number; // 20% - 100%
}

export interface SimulatorOutputs {
  temperature: number;
  waterConsumptionLiters: number;
  energyConsumptionMWh: number;
  co2ImpactKg: number;
  waterSavingsPct: number;
  energySavingsPct: number;
  co2SavingsPct: number;
  aiCoolingRecommendation: string;
  aiSuggestedIntensity: number;
  aiPredictedTemp: number;
  aiWaterLiters: number;
  aiEnergyMWh: number;
  aiCo2Kg: number;
  thermalSafetyRating: 'Safe' | 'Marginal' | 'Risk';
}

export type NavTab = 
  | 'dashboard'
  | 'live-monitor'
  | 'ai-prediction'
  | 'cooling-optimizer'
  | 'what-if-simulator'
  | 'sustainability'
  | 'alerts'
  | 'explainability'
  | 'about';
