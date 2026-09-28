import React from 'react';
import { BatchItem, ChamberTelemetry, ViewMode, TabType, Language } from '../types';
import { translations } from '../utils/translations';

interface HomeDashboardProps {
  batch: BatchItem;
  chamber: ChamberTelemetry;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onNavigateTab: (tab: TabType) => void;
  onOpenBatchDetails: () => void;
  onOpenMandiRates: () => void;
  language: Language;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  batch,
  chamber,
  viewMode,
  onViewModeChange,
  onNavigateTab,
  onOpenBatchDetails,
  onOpenMandiRates,
  language,
}) => {
  const t = translations[language];

  const getCropDisplayName = (crop: string) => {
    if (language === 'hi') {
      if (crop.toLowerCase().includes('tomato')) return 'टमाटर';
      if (crop.toLowerCase().includes('spinach')) return 'पालक';
      if (crop.toLowerCase().includes('pepper')) return 'शिमला मिर्च';
      if (crop.toLowerCase().includes('strawberr')) return 'स्ट्रॉबेरी';
    }
    return crop;
  };

  return (
    <div className="flex flex-col w-full gap-4 max-w-xl mx-auto pb-6">
      {/* Role Selector & Cold Chamber Status Pill */}
      <section className="flex items-center justify-between gap-2 bg-white p-2 rounded-xl shadow-sm border border-[#e0e6ed]/60">
        <div className="flex items-center bg-[#e1e8fd] p-1 rounded-full">
          <button
            className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-bold transition-all focus:outline-none ${
              viewMode === 'Smallholder View'
                ? 'bg-[#0d631b] text-white shadow-sm'
                : 'text-[#40493d] hover:text-[#141b2b]'
            }`}
            onClick={() => onViewModeChange('Smallholder View')}
            type="button"
          >
            {t.smallholderView}
          </button>
          <button
            className={`px-3 py-1.5 rounded-full font-label-sm text-label-sm font-medium transition-colors focus:outline-none ${
              viewMode === 'FPO View'
                ? 'bg-[#0d631b] text-white shadow-sm font-bold'
                : 'text-[#40493d] hover:text-[#141b2b]'
            }`}
            onClick={() => onViewModeChange('FPO View')}
            type="button"
          >
            {t.fpoView}
          </button>
        </div>

        <div className="flex items-center gap-1.5 bg-[#2e7d32]/10 px-3 py-1.5 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0d631b] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0d631b]"></span>
          </span>
          <span className="font-label-sm text-label-sm font-bold text-[#0d631b] tracking-tight">
            {t.chamberStable}
          </span>
        </div>
      </section>

      {/* Main Hero Card: Active Batch Status */}
      <section className="bg-white rounded-xl p-4 shadow-sm relative overflow-hidden flex flex-col gap-4 border border-[#e0e6ed]/60">
        {/* Top Status Banner */}
        <div className="flex items-center justify-between gap-1">
          <div className="inline-flex items-center gap-1.5 bg-[#cbffc2] px-3 py-1 rounded-full text-[#005312] shadow-sm">
            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span className="font-label-sm text-label-sm font-bold tracking-wider uppercase">
              {t.batchSafe}
            </span>
          </div>
          <span className="font-label-sm text-label-sm font-bold text-[#445963]">
            {t.batchRef} {batch.batchNumber}
          </span>
        </div>

        {/* Crop Identity & Visual Presentation */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-xl overflow-hidden shadow-sm shrink-0 bg-[#e9edff] border border-[#e0e6ed]">
            <img
              alt="Cluster of ripe red hydroponic greenhouse tomatoes fresh on the vine"
              className="w-full h-full object-cover"
              src={batch.imageUrl}
            />
            <div className="absolute bottom-1 right-1 bg-white/90 rounded-full p-0.5 shadow-sm">
              <span className="material-symbols-outlined text-[#0d631b] text-[14px] block">
                eco
              </span>
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-label-sm text-[#445963] uppercase font-bold tracking-wider">
              {t.freshProduceLot}
            </span>
            <h2 className="font-headline-lg text-headline-lg text-[#141b2b] truncate font-bold">
              {getCropDisplayName(batch.cropName)}
            </h2>
            <p className="font-body-sm text-body-sm text-[#40493d] italic truncate">
              {batch.scientificName}
            </p>
            <span className="font-label-sm text-label-sm text-[#445963] mt-0.5 font-medium">
              {t.storedDate} {batch.storedDate}
            </span>
          </div>
        </div>

        {/* High-Impact Shelf-Life Gauge & Countdown */}
        <div className="bg-[#f1f3ff] rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm font-bold text-[#40493d] uppercase tracking-wider">
                {t.optimalMarketWindow}
              </span>
              <div className="flex items-baseline gap-1 mt-0.5">
                <span className="font-display-lg-mobile text-display-lg-mobile text-[#0d631b] leading-none font-extrabold">
                  {batch.shelfLifeDaysLeft} {t.daysUnit}
                </span>
                <span className="font-label-lg text-label-lg font-bold text-[#0d631b]">
                  {t.daysLeft}
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-[#40493d] mt-1">
                {t.targetShelfLife}
              </span>
            </div>

            {/* Inline Visual Progress Gauge */}
            <div className="relative w-20 h-20 shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 72 72">
                <circle
                  className="text-[#dce2f7]"
                  cx="36"
                  cy="36"
                  fill="transparent"
                  r="30"
                  stroke="currentColor"
                  strokeWidth="7"
                />
                <circle
                  className="text-[#0d631b] transition-all duration-1000 ease-out"
                  cx="36"
                  cy="36"
                  fill="transparent"
                  r="30"
                  stroke="currentColor"
                  strokeDasharray="188.4"
                  strokeDashoffset={188.4 - (188.4 * batch.freshnessPercent) / 100}
                  strokeLinecap="round"
                  strokeWidth="7"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-label-lg text-label-lg font-bold text-[#141b2b]">
                  {batch.freshnessPercent}%
                </span>
                <span className="font-label-sm text-label-sm text-[#445963] uppercase">
                  {t.fresh}
                </span>
              </div>
            </div>
          </div>

          {/* Safe Condition Indicator Pill */}
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-[#e0e6ed]/60">
            <span className="material-symbols-outlined text-[#0d631b] text-[18px]">
              device_thermostat
            </span>
            <div className="flex flex-wrap items-center gap-x-1.5 font-body-sm text-body-sm text-[#141b2b]">
              <span className="font-bold text-[#141b2b]">{chamber.currentTemp.toFixed(1)}°C</span>
              <span className="text-[#40493d] font-label-sm text-label-sm">{t.targetRange}</span>
              <span className="text-[#445963]">•</span>
              <span className="font-bold text-[#00639a]">{chamber.humidityRh}% RH</span>
              <span className="text-[#40493d] font-label-sm text-label-sm">{t.humidity}</span>
            </div>
          </div>
        </div>

        {/* Quick Action CTA Pair */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            onClick={() => onNavigateTab('intake')}
            className="w-full h-12 px-4 rounded-xl bg-[#0d631b] text-white flex items-center justify-center gap-2 font-label-lg text-label-lg font-bold shadow-md hover:bg-[#005312] active:scale-[0.98] transition-all focus:outline-none"
            type="button"
          >
            <span className="material-symbols-outlined text-[22px]">add_circle</span>
            <span>{t.addCropBatch}</span>
          </button>
          <button
            onClick={onOpenBatchDetails}
            className="w-full h-12 px-4 rounded-xl bg-[#e9edff] text-[#00639a] flex items-center justify-center gap-2 font-label-lg text-label-lg font-bold hover:bg-[#e1e8fd] active:scale-[0.98] transition-colors focus:outline-none"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
            <span>{t.viewBatchDetailsQR}</span>
          </button>
        </div>
      </section>

      {/* Quick Chamber Health Stats Bar */}
      <section className="flex flex-col gap-2">
        <div className="flex items-center justify-between px-1">
          <h3 className="font-label-lg text-label-lg font-bold text-[#141b2b]">
            {t.chamberHealthTelemetry}
          </h3>
          <span className="font-label-sm text-label-sm font-bold text-[#0d631b] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d631b]"></span>
            {t.operational}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Cooling System */}
          <div
            onClick={() => onNavigateTab('telemetry')}
            className="bg-white p-3 rounded-xl shadow-sm border border-[#e0e6ed]/60 flex flex-col justify-between gap-1 min-h-[96px] cursor-pointer hover:border-[#0d631b] transition-colors"
          >
            <div className="flex items-center justify-between text-[#445963]">
              <span className="material-symbols-outlined text-[20px] text-[#00639a]">mode_fan</span>
              <span className="font-label-sm text-label-sm font-bold text-[#0d631b] bg-[#2e7d32]/10 px-2 py-0.5 rounded-full">
                {t.activeStatus}
              </span>
            </div>
            <div>
              <span className="font-body-sm text-body-sm text-[#141b2b] font-bold block">{t.coolingPlant}</span>
              <span className="font-label-sm text-label-sm text-[#40493d] font-medium">
                {t.compressorDuty} {chamber.compressorDuty}%
              </span>
            </div>
          </div>

          {/* Air Circulation */}
          <div
            onClick={() => onNavigateTab('telemetry')}
            className="bg-white p-3 rounded-xl shadow-sm border border-[#e0e6ed]/60 flex flex-col justify-between gap-1 min-h-[96px] cursor-pointer hover:border-[#0d631b] transition-colors"
          >
            <div className="flex items-center justify-between text-[#445963]">
              <span className="material-symbols-outlined text-[20px] text-[#00639a]">air</span>
              <span className="font-label-sm text-label-sm font-bold text-[#0d631b] bg-[#2e7d32]/10 px-2 py-0.5 rounded-full">
                {t.optimalStatus}
              </span>
            </div>
            <div>
              <span className="font-body-sm text-body-sm text-[#141b2b] font-bold block">{t.airCirculation}</span>
              <span className="font-label-sm text-label-sm text-[#40493d] font-medium">
                {t.airflowSpeed} {chamber.airflowSpeed} m/s
              </span>
            </div>
          </div>

          {/* Backup Battery */}
          <div
            onClick={() => onNavigateTab('telemetry')}
            className="bg-white p-3 rounded-xl shadow-sm border border-[#e0e6ed]/60 flex flex-col justify-between gap-1 min-h-[96px] cursor-pointer hover:border-[#0d631b] transition-colors"
          >
            <div className="flex items-center justify-between text-[#445963]">
              <span className="material-symbols-outlined text-[20px] text-[#0d631b]">solar_power</span>
              <span className="font-label-sm text-label-sm font-bold text-[#141b2b]">
                {chamber.batteryPercent}%
              </span>
            </div>
            <div>
              <span className="font-body-sm text-body-sm text-[#141b2b] font-bold block">{t.backupBattery}</span>
              <span className="font-label-sm text-label-sm text-[#40493d] font-medium">
                {t.solarLinkedReady}
              </span>
            </div>
          </div>

          {/* Door Seal */}
          <div
            onClick={() => onNavigateTab('telemetry')}
            className="bg-white p-3 rounded-xl shadow-sm border border-[#e0e6ed]/60 flex flex-col justify-between gap-1 min-h-[96px] cursor-pointer hover:border-[#0d631b] transition-colors"
          >
            <div className="flex items-center justify-between text-[#445963]">
              <span className="material-symbols-outlined text-[20px] text-[#445963]">sensor_door</span>
              <span className="font-label-sm text-label-sm font-bold text-[#40493d] bg-[#e9edff] px-2 py-0.5 rounded-full">
                {language === 'hi' ? 'बंद' : chamber.doorState}
              </span>
            </div>
            <div>
              <span className="font-body-sm text-body-sm text-[#141b2b] font-bold block">{t.chamberDoor}</span>
              <span className="font-label-sm text-label-sm text-[#40493d] font-medium">
                {chamber.doorClosedDuration}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Farmer Advisory / Regional Market Insight */}
      <section className="bg-[#e1e8fd] rounded-xl p-4 shadow-sm flex flex-col gap-2 relative overflow-hidden border border-[#cee5ff]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-lg bg-[#0d631b] flex items-center justify-center text-white shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[16px]">trending_up</span>
            </div>
            <span className="font-label-lg text-label-lg font-bold text-[#141b2b]">
              {t.regionalMandiAdvisory}
            </span>
          </div>
          <span className="font-label-sm text-label-sm font-bold text-[#0d631b] bg-white px-2 py-0.5 rounded-full shadow-sm">
            {t.mandiPriceBadge}
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-[#40493d] leading-relaxed">
          {t.mandiAdvisoryText}
        </p>
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-1 text-[#445963] font-label-sm text-label-sm">
            <span className="material-symbols-outlined text-[15px]">schedule</span>
            <span>{t.updatedAgo}</span>
          </div>
          <button
            onClick={onOpenMandiRates}
            className="font-label-sm text-label-sm font-bold text-[#0d631b] flex items-center gap-0.5 hover:underline focus:outline-none"
            type="button"
          >
            <span>{t.viewMandiRates}</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>
      </section>
    </div>
  );
};
