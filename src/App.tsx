/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, UserRole, ViewMode, BatchItem, ChamberTelemetry, SystemAlert, Language } from './types';
import { INITIAL_BATCH, INITIAL_CHAMBERS, INITIAL_ALERTS } from './data/initialData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeDashboard } from './components/HomeDashboard';
import { BatchIntake } from './components/BatchIntake';
import { LiveTelemetry } from './components/LiveTelemetry';
import { SystemAlerts } from './components/SystemAlerts';
import { HardwareSettings } from './components/HardwareSettings';
import { BatchDetailModal } from './components/BatchDetailModal';
import { MandiRatesModal } from './components/MandiRatesModal';
import { Toast } from './components/Toast';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [userRole, setUserRole] = useState<UserRole>('Farmer');
  const [viewMode, setViewMode] = useState<ViewMode>('Smallholder View');
  const [language, setLanguage] = useState<Language>('en');
  
  const [batch, setBatch] = useState<BatchItem>(INITIAL_BATCH);
  const [chambers, setChambers] = useState<ChamberTelemetry[]>(INITIAL_CHAMBERS);
  const [selectedChamberId, setSelectedChamberId] = useState<string>('chamber-1');
  const [alerts, setAlerts] = useState<SystemAlert[]>(INITIAL_ALERTS);

  const [batchModalOpen, setBatchModalOpen] = useState(false);
  const [mandiModalOpen, setMandiModalOpen] = useState(false);
  const [toastInfo, setToastInfo] = useState<{ message: string; icon: string } | null>(null);

  const currentChamber = chambers.find((c) => c.chamberId === selectedChamberId) || chambers[0];

  const showToast = (message: string, icon = 'check_circle') => {
    setToastInfo({ message, icon });
  };

  const handleUpdateChamber = (updated: Partial<ChamberTelemetry>) => {
    setChambers((prev) =>
      prev.map((c) => (c.chamberId === currentChamber.chamberId ? { ...c, ...updated } : c))
    );
  };

  const handleResolveAlert = (alertId: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, resolved: true } : a))
    );
  };

  const handleBatchCreated = (newBatch: BatchItem) => {
    setBatch(newBatch);
    // Also increase chamber active load and crates
    handleUpdateChamber({
      currentLoadKg: Math.min(1000, currentChamber.currentLoadKg + newBatch.weightKg),
      activeCrates: currentChamber.activeCrates + newBatch.crates,
    });
  };

  // Auto hide toast after 3.5 seconds
  useEffect(() => {
    if (toastInfo) {
      const timer = setTimeout(() => {
        setToastInfo(null);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toastInfo]);

  const unresolvedAlertsCount = alerts.filter((a) => !a.resolved).length;

  return (
    <div className="bg-[#f9f9ff] text-[#141b2b] min-h-screen flex flex-col antialiased selection:bg-[#cbffc2] selection:text-[#005312]">
      {/* Fixed Header with Language Selector */}
      <Header
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        userRole={userRole}
        onRoleChange={setUserRole}
        chamberTemp={currentChamber.currentTemp}
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Main Content View Container */}
      <main
        className={`flex-1 flex flex-col relative w-full px-4 pb-24 ${
          currentTab === 'intake' ? 'pt-20' : 'pt-32'
        }`}
      >
        {currentTab === 'home' && (
          <HomeDashboard
            batch={batch}
            chamber={currentChamber}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onNavigateTab={setCurrentTab}
            onOpenBatchDetails={() => setBatchModalOpen(true)}
            onOpenMandiRates={() => setMandiModalOpen(true)}
            language={language}
          />
        )}

        {currentTab === 'intake' && (
          <BatchIntake
            onBatchCreated={handleBatchCreated}
            onNavigateTab={setCurrentTab}
            onShowToast={showToast}
            language={language}
          />
        )}

        {currentTab === 'telemetry' && (
          <LiveTelemetry
            chamber={currentChamber}
            chambers={chambers}
            onSelectChamber={(ch) => setSelectedChamberId(ch.chamberId)}
            onUpdateChamber={handleUpdateChamber}
            onShowToast={showToast}
            language={language}
          />
        )}

        {currentTab === 'alerts' && (
          <SystemAlerts
            alerts={alerts}
            onResolveAlert={handleResolveAlert}
            onShowToast={showToast}
            onNavigateIntake={() => setCurrentTab('intake')}
            language={language}
          />
        )}

        {currentTab === 'settings' && (
          <HardwareSettings
            userRole={userRole}
            onShowToast={showToast}
            language={language}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav
        currentTab={currentTab}
        onTabChange={setCurrentTab}
        unresolvedAlertsCount={unresolvedAlertsCount}
        language={language}
      />

      {/* Traceability & QR Code Modal */}
      <BatchDetailModal
        batch={batch}
        isOpen={batchModalOpen}
        onClose={() => setBatchModalOpen(false)}
        onShowToast={showToast}
        language={language}
      />

      {/* Mandi Intelligence Modal */}
      <MandiRatesModal
        isOpen={mandiModalOpen}
        onClose={() => setMandiModalOpen(false)}
        onShowToast={showToast}
        language={language}
      />

      {/* Floating Feedback Toast */}
      <Toast
        message={toastInfo?.message || null}
        icon={toastInfo?.icon}
        onClose={() => setToastInfo(null)}
      />
    </div>
  );
}
