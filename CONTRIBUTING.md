# Contributing to Green AI Monitor

Thank you for your interest in contributing to **Green AI Monitor**! We welcome contributions from developers, data center engineers, researchers, and sustainability advocates.

This document provides guidelines for contributing to the repository.

---

## 🌟 Code of Conduct

All contributors are expected to follow our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before participating in our community.

---

## 🛠️ Getting Started

### 1. Fork and Clone
Fork the repository on GitHub and clone your fork locally:
```bash
git clone https://github.com/<YOUR_USERNAME>/green-ai-monitor.git
cd green-ai-monitor
```

### 2. Install Dependencies
Ensure you have **Node.js (v18+)** installed:
```bash
npm install
```

### 3. Run Locally
Start the development server:
```bash
npm run dev
```
Navigate to `http://localhost:3000` in your web browser.

---

## 📁 Project Structure

```
├── src/
│   ├── components/            # UI Views & Interactive Widgets
│   │   ├── DashboardView.tsx       # Primary 4-KPI Overview & AI Cooling Status
│   │   ├── LiveMonitorView.tsx     # Virtual Data Center & 4-Zone Matrix
│   │   ├── AIPredictionView.tsx    # 15-min Forward Thermal Forecasting
│   │   ├── CoolingOptimizerView.tsx# Pareto Multi-Strategy Selector
│   │   ├── WhatIfSimulatorView.tsx # ⭐ Interactive What-if Slider Sandbox
│   │   ├── SustainabilityView.tsx  # Green Score (87/100) & 7-Day Water Chart
│   │   ├── AlertsView.tsx          # Real-time Operations Incident Stream
│   │   ├── ExplainabilityView.tsx  # 5-step Reasoning Chain & Cooling Loop
│   │   ├── AboutLandingView.tsx    # Positioning, Pitch & Hackathon Disclaimers
│   │   ├── Navbar.tsx              # Brand Header, Live Status, Feed Toggle
│   │   ├── Sidebar.tsx             # Fixed Desktop Navigation & Mobile Drawer
│   │   ├── ZoneModal.tsx           # Deep-dive Server Rack Thermal Inspector
│   │   ├── PitchFooter.tsx         # Persistent CTA Section
│   │   └── ToastContainer.tsx      # Tactile Feedback Notifications
│   ├── context/
│   │   └── TelemetryContext.tsx    # Global Telemetry Provider & Simulation Tick
│   ├── utils/
│   │   ├── simulationLogic.ts      # Thermodynamic Physics & Pareto Solver
│   │   └── sound.ts                # Web Audio API Synthesizer Feedback
│   ├── types.ts                    # TypeScript Definitions & Enums
│   ├── App.tsx                     # Main App Shell
│   ├── index.css                   # Tailwind Base, Glassmorphic Classes & Keyframes
│   └── main.tsx                    # Root React Entry Point
├── index.html                      # HTML Template with Google Fonts
├── tailwind.config.js              # Theme Palettes, Glows & Cyber Colors
├── vite.config.ts                  # Vite Bundler Configuration
├── LICENSE                         # MIT License
├── CODE_OF_CONDUCT.md              # Contributor Covenant Code of Conduct
└── README.md                       # Comprehensive Project Documentation
```

---

## 🌿 Development Guidelines

1. **TypeScript**: Keep code strictly typed. Avoid `any`. All shared data interfaces should be defined in `src/types.ts`.
2. **Styling**:
   - Use Tailwind CSS utility classes.
   - Maintain the futuristic **Green Tech + AI** theme (dark background `#050b10`, emerald/cyan accents, glassmorphic cards `glass-card`, glowing borders).
   - Ensure complete responsiveness across mobile (375px), tablet (768px), and desktop (1280px+).
3. **Simulation Logic**:
   - Keep thermodynamic calculations in `src/utils/simulationLogic.ts` modular so real ML models or Modbus/BACnet BMS APIs can be easily plugged in.
   - Clearly label all savings outputs as **“Potential / Estimated Savings”**.
4. **Performance**: Keep bundle size lightweight and charts smoothly rendered with Recharts.

---

## 🔍 Verification Before Submitting

Always verify that the TypeScript compiler passes and the production bundle builds without errors:

```bash
npm run build
```

---

## 🚀 Pull Request Process

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Commit your changes with a descriptive commit message:
   ```bash
   git commit -m "Add: interactive thermal throttling indicator"
   ```
3. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Open a Pull Request against the `main` branch of the upstream repository.
5. In your PR description, explain:
   - What changed and why.
   - Any relevant screenshots or screen recordings.
   - Confirmation that `npm run build` succeeds.

---

## 💬 Questions & Support

If you have questions or ideas, feel free to open an Issue on GitHub. Thank you for making green AI cooling more accessible and sustainable!
