# 🔄 Green AI Monitor — System Flowcharts & Architecture Workflows

This document outlines the operational pipelines, closed-loop decision algorithms, and component data flows of the **Green AI Monitor** Data Center Cooling Sustainability Decision Engine.

---

## 1. End-to-End System Architecture Flowchart

```mermaid
flowchart TD
    subgraph SENSORS ["1. Data Acquisition & Sensor Ingestion"]
        S1["🌡️ Core Tj & Rack Temp Sensors"]
        S2["⚡ IPMI / PDU Server Power Draw"]
        S3["🖥️ GPU / CPU Workload Telemetry"]
        S4["🌤️ Ambient Weather API (Dry-Bulb & Humidity)"]
        S5["💧 Chiller Flowmeters & Cooling Tower Bleed"]
    end

    subgraph PREDICTOR ["2. AI Thermal Predictor (Surrogate Model)"]
        P1["Data Normalization & Sliding Window"]
        P2["Physics-Informed LSTM + Surrogate Neural Net"]
        P3["15-to-30 min Forward Heat Projection Curve"]
        P4["Uncertainty Quantification (94% Confidence)"]
    end

    subgraph OPTIMIZER ["3. Multi-Objective Decision Engine"]
        O1{"Threshold Evaluator\n(Temp > 76°C?)"}
        O2["Generate Candidate Strategies (A, B, C)"]
        O3["Calculate Environmental Cost:\nCost = Water + Energy + Carbon"]
        O4["Pareto Frontier Solver:\nSelect Safe Strategy with Lowest Cost"]
        O5["⭐ Strategy B (Balanced AI Recommended)"]
    end

    subgraph ACTUATION ["4. Actuation & Simulation Layer"]
        A1["Zonal CFM Airflow Damper Modulation"]
        A2["VFD Pump Frequency Adjustment"]
        A3["Chiller Staging & Economizer Bypass"]
    end

    subgraph FEEDBACK ["5. Measurement, Verification & Feedback Loop"]
        F1["Savings Dashboard (kWh, Liters, kg CO₂e)"]
        F2["Verification against Baseline"]
        F3["Online Surrogate Weight Fine-Tuning"]
    end

    SENSORS --> PREDICTOR
    P1 --> P2 --> P3 --> P4
    P3 --> OPTIMIZER
    O1 --> O2 --> O3 --> O4 --> O5
    O5 --> ACTUATION
    A1 & A2 & A3 --> FEEDBACK
    F3 -.->|Continuous Calibration| P2
```

---

## 2. Sustainable AI Cooling Closed Loop

```mermaid
flowchart LR
    MONITOR["🔍 MONITOR\n1 Hz Sensor Telemetry"] --> PREDICT["🔮 PREDICT\n15-min Thermal Projections"]
    PREDICT --> OPTIMIZE["⚖️ OPTIMIZE\nPareto Water+Energy+Carbon"]
    OPTIMIZE --> COOL["❄️ COOL\nDynamic Zonal Actuation"]
    COOL --> MEASURE["📊 MEASURE\nValidate Real Savings"]
    MEASURE --> IMPROVE["🧠 IMPROVE\nOnline Surrogate Learning"]
    IMPROVE -->|Continuous Cycle| MONITOR

    style MONITOR fill:#0c1722,stroke:#06b6d4,stroke-width:2px,color:#fff
    style PREDICT fill:#0c1722,stroke:#10b981,stroke-width:2px,color:#fff
    style OPTIMIZE fill:#0c1722,stroke:#34d399,stroke-width:2px,color:#fff
    style COOL fill:#0c1722,stroke:#06b6d4,stroke-width:2px,color:#fff
    style MEASURE fill:#0c1722,stroke:#10b981,stroke-width:2px,color:#fff
    style IMPROVE fill:#0c1722,stroke:#34d399,stroke-width:2px,color:#fff
```

> **Caption**: *“Green AI Monitor continuously learns from operational data to improve cooling efficiency.”*

---

## 3. Decision Logic Flowchart (Pareto Evaluation)

```mermaid
flowchart TD
    Start(["Receive Sensor Sample"]) --> EvaluateWorkload{"GPU Workload\nRising > 85%?"}

    EvaluateWorkload -->|YES| CheckThermalBuffer{"Thermal Buffer\n< 8°C?"}
    EvaluateWorkload -->|NO| CheckIdle{"Cluster Workload\n< 45%?"}

    CheckThermalBuffer -->|YES| PreCool["Preemptive Pre-Cooling Mode\n(Boost Chilled Airflow to High Load Zone)"]
    CheckThermalBuffer -->|NO| StandardModulation["Maintain Balanced Setpoints"]

    CheckIdle -->|YES| EcoMode["Reduce Cooling Intensity\n(Enable Free Economizer Air)"]
    CheckIdle -->|NO| StandardModulation

    PreCool --> ParetoFilter["Evaluate Environmental Cost:\nCost = (Water × w1) + (Energy × w2) + (Carbon × w3)"]
    StandardModulation --> ParetoFilter
    EcoMode --> ParetoFilter

    ParetoFilter --> PickStrategy{"Is Strategy within\nSafety SLA (Temp < 80°C)?"}
    PickStrategy -->|YES| RecommendStrategy["Recommend Strategy B ✓\n(Safest with Lowest Environmental Cost)"]
    PickStrategy -->|NO| Failsafe["Trigger Failsafe Strategy A\n(Emergency Chiller Capacity)"]

    RecommendStrategy --> LogAlert["Broadcast Optimization Opportunity\nor Water Saving Alert"]
```

---

## 4. ⭐ What-if Cooling Simulator Pipeline

```mermaid
flowchart LR
    subgraph INPUTS ["User Interactive Sliders"]
        I1["GPU Workload\n(10% - 100%)"]
        I2["Ambient Temp\n(15°C - 45°C)"]
        I3["Humidity\n(20% - 90%)"]
        I4["Cooling Intensity\n(20% - 100%)"]
    end

    subgraph CALC ["Thermodynamic Physics Engine"]
        C1["Calculate Wet-Bulb Temp\n(Stine approximation)"]
        C2["Compute Heat Dissipation\nQ = IT_load + Amb_load"]
        C3["Simulate Evaporative Water Rate\n& Electric Compressor Work"]
    end

    subgraph OUTPUTS ["Dynamic Live Impact"]
        O1["🌡️ Temperature (°C)"]
        O2["💧 Water Consumption (L/day)"]
        O3["⚡ Energy Usage (MWh/day)"]
        O4["🌍 CO₂ Footprint (kg/day)"]
    end

    subgraph BENCHMARK ["Comparative Analytics"]
        B1["Current Strategy vs. AI Optimized"]
        B2["Potential Savings Badges:\nWater: 8% | Energy: 11% | CO₂: 7%"]
        B3["Label: Potential Savings — Simulation Estimate"]
    end

    INPUTS --> CALC
    C1 & C2 & C3 --> OUTPUTS
    OUTPUTS --> BENCHMARK
```

---

## 5. UI Component & Context State Flow

```mermaid
flowchart TD
    subgraph PROVIDER ["TelemetryContext (Global State)"]
        State["• zones: ZoneData[] (Zones 01 to 04)\n• telemetry: TelemetryState (PUE, WUE, Green Score)\n• strategies: CoolingStrategy[] (A, B, C)\n• alerts: AlertItem[]\n• isSimulating: boolean"]
        Clock["3.5s Simulation Tick Interval"]
        Clock -->|Mutates State| State
    end

    subgraph VIEWS ["Application Views"]
        V1["DashboardView"]
        V2["LiveMonitorView"]
        V3["AIPredictionView"]
        V4["CoolingOptimizerView"]
        V5["WhatIfSimulatorView (USP)"]
        V6["SustainabilityView"]
        V7["AlertsView"]
        V8["ExplainabilityView"]
    end

    subgraph MODALS ["Interactive Modals & Toasts"]
        M1["ZoneModal (Rack Inspector)"]
        T1["ToastContainer (Audio & Visual Toasts)"]
    end

    State --> VIEWS
    VIEWS -->|User Action: Click Zone| M1
    VIEWS -->|User Action: Apply Strategy| T1
    VIEWS -->|User Action: Acknowledge Alert| State
```

---

## 6. ASCII Diagram (Text-Only / CLI Friendly)

```
================================================================================
                    GREEN AI MONITOR — OPERATIONAL FLOW
================================================================================

 [Sensors & Data Center Telemetry]
   │ (Inlet/Outlet Temp, Workload %, Ambient RH %, Chiller Power)
   ▼
 [AI Thermal Predictor (Surrogate Neural Network)]
   │ (Projects 15-min thermal inertia trajectory, 94% Confidence)
   ▼
 [Water + Energy + Carbon Pareto Optimizer]
   │
   ├─► Strategy A: Max Cooling      (Energy: 100 | Water: 20 | Safety: 99%)
   ├─► Strategy B: Balanced [AI Rec] (Energy: 86  | Water: 14 | Safety: 97%)
   └─► Strategy C: Eco Cooling      (Energy: 78  | Water: 10 | Safety: 91%)
   │
   ▼
 [Selected: Strategy B — Lowest Environmental Cost with Safe Headroom]
   │
   ├─► Zone 03 (High GPU Load): Chilled airflow CFM increased by +18%
   ├─► Zone 01 (Low GPU Load):  Excess airflow reduced by -12%
   │
   ▼
 [Simulation & Actuation Control Layer]
   │
   ▼
 [Sustainability Feedback Loop]
   └──> Recorded Potential Savings: 8% Water · 11% Energy · 7% Carbon
================================================================================
```
