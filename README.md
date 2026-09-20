# 🌱 Green AI Monitor — Data Center Cooling Sustainability Decision Engine

> **“Predict the heat. Optimize the cooling. Minimize the environmental cost.”**

Green AI Monitor is an AI-powered **Data Center Cooling Sustainability Decision Engine**. The system monitors data-center conditions (server/GPU/CPU temperature, workload, ambient temperature and humidity, cooling system status, water consumption, energy consumption, and estimated CO₂ emissions), predicts future thermal demand, and recommends the safest cooling strategy with the lowest possible combined **Water + Energy + Carbon impact**.

---

## 🌟 Key Features

1. **📊 Sustainability Overview Dashboard**
   - 4 Real-time KPI Cards:
     - 🌡️ Average Temperature: **68.4°C**
     - ⚡ Energy Usage: **1.82 MWh**
     - 💧 Water Usage: **8,420 L**
     - 🌍 Estimated CO₂: **742 kg CO₂e**
   - **AI Cooling Status**: Autonomous multi-objective Pareto solver tracking Temperature Safety (96%), Water Efficiency (89%), Energy Efficiency (92%), and Carbon Efficiency (86%).

2. **🖥️ Live Virtual Data Center Monitor**
   - 4-Zone Facility Topology:
     - **Zone 01 (Inference Alpha)**: 64°C · GPU 48% · Cooling Low · 🟢 Stable
     - **Zone 02 (Data Ingestion)**: 72°C · GPU 82% · Cooling Medium · 🟡 Watch
     - **Zone 03 (LLM Training)**: 77°C · GPU 94% · Cooling High · 🔴 High Load
     - **Zone 04 (Edge Cache)**: 58°C · GPU 31% · Cooling Low · 🟢 Stable
   - Animated cooling fan spinners with dynamic rotational velocities.
   - Interactive server rack matrix inspector.

3. **🔮 AI Thermal Predictor**
   - 15-to-30 minute forward neural heat forecasting.
   - Comparison between baseline static cooling and AI preemptively cooled trajectory.
   - Prediction Confidence: **94%** (MAE: 0.4°C, R²: 0.98).
   - AI Insight generation anticipating thermal inertia.

4. **⚡ Water–Energy–Carbon Cooling Optimizer**
   - Compares 3 operational strategies:
     - **Strategy A — Maximum Cooling**: Energy 100, Water 20, CO₂ 40, Safety 99%
     - **Strategy B — Balanced Cooling** (**AI Recommended ✓**): Energy 86, Water 14, CO₂ 34, Safety 97%
     - **Strategy C — Eco Cooling**: Energy 78, Water 10, CO₂ 30, Safety 91%
   - Interactive "Apply Recommendation" simulation.

5. **🎛️ ⭐ What-if Cooling Simulator (Key USP)**
   - Interactive sliders for:
     - **GPU Workload** (10% – 100%)
     - **Ambient Temperature** (15°C – 45°C)
     - **Relative Humidity** (20% – 90%)
     - **Cooling Intensity** (20% – 100%)
   - Instant dynamic thermodynamic recalculation of Temperature, Water, Energy, and CO₂.
   - Dynamic AI recommendation banner with estimated savings badges (**Water: 8%**, **Energy: 11%**, **CO₂: 7%**).
   - Side-by-side visual comparison bar chart (*Current Strategy vs AI Optimized Strategy*).

6. **🌿 Sustainability Score & 7-Day Water Chart**
   - Circular **GREEN SCORE (87 / 100)** with 4-pillar efficiency breakdown.
   - 7-Day Cooling Water Consumption comparison chart (Traditional vs AI Optimized, **6–8% Potential Water Saved**).

7. **🔔 Diagnostic Alerts Operations Center**
   - Real-time incident list with severity filtering (Critical, Warning, Optimization, Water Savings), timestamps, and simulated remediation.

8. **🧠 Explainable AI & Architecture**
   - Human-readable 5-step causal reasoning breakdown (*“The AI increased cooling in Zone 03 and reduced unnecessary cooling in Zone 01”*).
   - **Sustainable AI Cooling Loop**: `MONITOR` → `PREDICT` → `OPTIMIZE` → `COOL` → `MEASURE` → `IMPROVE` ↺.
   - Complete end-to-end data pipeline architecture diagram.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS (custom dark green-tech palette, glassmorphism, glowing accents)
- **Icons**: Lucide React
- **Charts**: Recharts
- **Audio Feedback**: Client-side Web Audio API synthesizer
- **Animation / FX**: Canvas Confetti, Tailwind keyframe animations

---

## 🚀 Quick Start

### 1. Clone or Download Repository
```bash
git clone https://github.com/<YOUR_USERNAME>/green-ai-monitor.git
cd green-ai-monitor
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 📌 Product Positioning & Hackathon Disclaimer

- **Positioning**: Green AI Monitor is a lightweight, explainable Water–Energy–Carbon aware Cooling Decision Engine with an interactive What-if Simulator.
- **Disclaimer**: This is a hackathon prototype using simulated thermodynamic approximations. All savings metrics are labeled as **“Potential / Estimated Savings”**, not guaranteed real-world deployment telemetry.

---

## 📄 License
MIT License.
