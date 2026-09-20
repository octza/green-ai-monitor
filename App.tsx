import React, { useState } from 'react';
import { NavTab } from './types';
import { TelemetryProvider, useTelemetry } from './context/TelemetryContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { LiveMonitorView } from './components/LiveMonitorView';
import { AIPredictionView } from './components/AIPredictionView';
import { CoolingOptimizerView } from './components/CoolingOptimizerView';
import { WhatIfSimulatorView } from './components/WhatIfSimulatorView';
import { SustainabilityView } from './components/SustainabilityView';
import { AlertsView } from './components/AlertsView';
import { ExplainabilityView } from './components/ExplainabilityView';
import { AboutLandingView } from './components/AboutLandingView';
import { ZoneModal } from './components/ZoneModal';
import { ToastContainer } from './components/ToastContainer';
import { PitchFooter } from './components/PitchFooter';

const MainAppContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<NavTab>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { selectedZone, setSelectedZone } = useTelemetry();

  const renderTabContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return <DashboardView setCurrentTab={setCurrentTab} />;
      case 'live-monitor':
        return <LiveMonitorView />;
      case 'ai-prediction':
        return <AIPredictionView />;
      case 'cooling-optimizer':
        return <CoolingOptimizerView />;
      case 'what-if-simulator':
        return <WhatIfSimulatorView />;
      case 'sustainability':
        return <SustainabilityView />;
      case 'alerts':
        return <AlertsView />;
      case 'explainability':
        return <ExplainabilityView />;
      case 'about':
        return <AboutLandingView setCurrentTab={setCurrentTab} />;
      default:
        return <DashboardView setCurrentTab={setCurrentTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050b10] text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-black">
      {/* Fixed Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <div className="flex-1 flex w-full">
        {/* Sidebar */}
        <Sidebar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full transition-all">
          {renderTabContent()}

          {/* Persistent pitch footer across views */}
          {currentTab !== 'about' && <PitchFooter setCurrentTab={setCurrentTab} />}
        </main>
      </div>

      {/* Zone Detail Modal */}
      {selectedZone && (
        <ZoneModal
          zone={selectedZone}
          onClose={() => setSelectedZone(null)}
        />
      )}

      {/* Interactive Toasts */}
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <TelemetryProvider>
      <MainAppContent />
    </TelemetryProvider>
  );
}

export default App;
