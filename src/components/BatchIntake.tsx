import React, { useState } from 'react';
import { CROP_PRESETS } from '../data/initialData';
import { BatchItem, TabType, Language } from '../types';
import { translations } from '../utils/translations';

interface BatchIntakeProps {
  onBatchCreated: (newBatch: BatchItem) => void;
  onNavigateTab: (tab: TabType) => void;
  onShowToast: (msg: string, icon?: string) => void;
  language: Language;
}

export const BatchIntake: React.FC<BatchIntakeProps> = ({
  onBatchCreated,
  onNavigateTab,
  onShowToast,
  language,
}) => {
  const [selectedCropIndex, setSelectedCropIndex] = useState(0);
  const [cropDropdownOpen, setCropDropdownOpen] = useState(false);
  const [crates, setCrates] = useState(6);
  const [weightKg, setWeightKg] = useState(150);
  const [conditions, setConditions] = useState<{ [key: string]: boolean }>({
    'Fresh Harvest': true,
    'Grade A': true,
    'Pre-cooled': true,
  });

  const [calculating, setCalculating] = useState(false);
  const [calculatedDone, setCalculatedDone] = useState(false);
  const [fallbackOpen, setFallbackOpen] = useState(false);
  const [monitoringStarting, setMonitoringStarting] = useState(false);
  const [monitoringStarted, setMonitoringStarted] = useState(false);

  const t = translations[language];
  const currentCrop = CROP_PRESETS[selectedCropIndex];

  const getCropDisplayName = (cropName: string) => {
    if (language === 'hi') {
      if (cropName.toLowerCase().includes('tomato')) return 'टमाटर (Tomatoes)';
      if (cropName.toLowerCase().includes('spinach')) return 'पालक (Spinach)';
      if (cropName.toLowerCase().includes('pepper')) return 'शिमला मिर्च (Bell Pepper)';
      if (cropName.toLowerCase().includes('strawberr')) return 'स्ट्रॉबेरी (Strawberries)';
    }
    return cropName;
  };

  const handleAdjustCrates = (delta: number) => {
    const nextCrates = Math.max(1, crates + delta);
    setCrates(nextCrates);
    setWeightKg(nextCrates * currentCrop.defaultWeightPerCrate);
  };

  const handleCropSelect = (idx: number) => {
    setSelectedCropIndex(idx);
    const crop = CROP_PRESETS[idx];
    setWeightKg(crates * crop.defaultWeightPerCrate);
    setCropDropdownOpen(false);
  };

  const toggleCondition = (tag: string) => {
    setConditions((prev) => ({
      ...prev,
      [tag]: !prev[tag],
    }));
  };

  const handleCalculateOptimalConditions = () => {
    setCalculating(true);
    setTimeout(() => {
      setCalculating(false);
      setCalculatedDone(true);
      const msg =
        language === 'hi'
          ? `इष्टतम परिस्थितियाँ निर्धारित: ${currentCrop.temp}, ${currentCrop.humidity} RH, ${currentCrop.safeDays} दिन सुरक्षित शेल्फ-लाइफ।`
          : `Optimal conditions calculated: ${currentCrop.temp}, ${currentCrop.humidity} RH, ${currentCrop.safeDays} Days shelf-life.`;
      onShowToast(msg, 'auto_awesome');
    }, 1000);
  };

  const handleStartMonitoringLoop = () => {
    setMonitoringStarting(true);
    setTimeout(() => {
      setMonitoringStarting(false);
      setMonitoringStarted(true);
      const newBatch: BatchItem = {
        id: `b-${Date.now()}`,
        batchNumber: '#TG-9021',
        cropName: currentCrop.name.split(' ')[0],
        scientificName: currentCrop.scientific,
        cultivar: currentCrop.cultivar,
        storedDate: language === 'hi' ? '21 सितं, 2026' : 'Sep 21, 2026',
        weightKg: weightKg,
        crates: crates,
        shelfLifeDaysTotal: currentCrop.safeDays,
        shelfLifeDaysLeft: currentCrop.safeDays,
        freshnessPercent: 100,
        targetTemp: currentCrop.temp,
        targetHumidity: currentCrop.humidity,
        status: 'safe',
        rackBay: 'Rack B-03',
        chamberId: 'chamber-1',
        imageUrl:
          'https://lh3.googleusercontent.com/aida-public/AB6AXuAjCGwuxAhTFWhoOIJKAvxWPGQVqkhSuI7g1lZrshdYuMMoOyYPaapHq397UOVMK2_VJdygHh3ZBdIHqKgxjSYam03wBaG-VPni45YOehc-f5QA2vY_Z8aOLtkYZW3xk0qLOeCxnX6QP1x_pXciu1lMgDRZmpnuqBcwCc4MuGPQJ9h0QyIFTao_MbNIbu77EWHW7p_zuyoxFcbLrIYOQUeJVoeMxvHl7ffRnQx0HBJbdeR52p9ki45RJA',
        conditionTags: Object.keys(conditions).filter((k) => conditions[k]),
      };
      onBatchCreated(newBatch);
      onShowToast(
        language === 'hi'
          ? 'चैंबर B-03 सक्रिय और सुरक्षित। लाइव निगरानी प्रारंभ हुई!'
          : 'Chamber B-03 active & guarded. Live loop started!',
        'verified'
      );
      setTimeout(() => {
        onNavigateTab('telemetry');
      }, 1200);
    }, 1500);
  };

  return (
    <div className="flex flex-col w-full pb-8 space-y-4 max-w-xl mx-auto">
      {/* Stepper Progress Header */}
      <div className="w-full bg-[#f1f3ff] rounded-xl p-4 shadow-sm border border-[#e0e6ed]/60">
        <div className="flex items-center justify-between relative">
          {/* Connection bar behind */}
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-[#dce2f7] z-0">
            <div
              className="h-full bg-[#0d631b] transition-all duration-500"
              style={{ width: calculatedDone || monitoringStarted ? '100%' : '50%' }}
            ></div>
          </div>

          {/* Step 1: Done/Active */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-[#0d631b] text-white flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[18px]">check</span>
            </div>
            <span className="font-label-sm text-label-sm text-[#0d631b] mt-1 font-bold">
              {t.step1}
            </span>
          </div>

          {/* Step 2: IoT Active */}
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-9 h-9 rounded-full bg-[#2e7d32] text-[#cbffc2] flex items-center justify-center shadow-md">
              <span
                className="material-symbols-outlined text-[18px] animate-spin"
                style={{ animationDuration: '4s' }}
              >
                sensors
              </span>
            </div>
            <span className="font-label-sm text-label-sm text-[#2e7d32] mt-1 font-bold">
              {t.step2}
            </span>
          </div>

          {/* Step 3: Registration Ready */}
          <div className="relative z-10 flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${
                monitoringStarted
                  ? 'bg-[#0d631b] text-white shadow-md'
                  : 'bg-[#dce2f7] text-[#40493d]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">app_registration</span>
            </div>
            <span
              className={`font-label-sm text-label-sm mt-1 ${
                monitoringStarted ? 'text-[#0d631b] font-bold' : 'text-[#40493d]'
              }`}
            >
              {t.step3}
            </span>
          </div>
        </div>
      </div>

      {/* STEP 1: Input Form Section */}
      <div className="w-full bg-white rounded-xl p-4 shadow-sm flex flex-col space-y-4 border border-[#e0e6ed]/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#e1e8fd] flex items-center justify-center text-[#0d631b]">
              <span className="material-symbols-outlined text-[18px]">agriculture</span>
            </div>
            <h2 className="font-headline-md text-headline-md text-[#141b2b] font-bold">
              {t.cropInflowIntake}
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-[#0d631b] font-semibold bg-[#e9edff] px-2 py-0.5 rounded-full">
            {t.intakePortA2}
          </span>
        </div>

        {/* Product Search/Input Field */}
        <div className="flex flex-col space-y-1.5 relative">
          <label className="font-label-lg text-label-lg text-[#40493d]">
            {t.enterCropName}
          </label>
          <div
            className="relative flex items-center cursor-pointer"
            onClick={() => setCropDropdownOpen(!cropDropdownOpen)}
          >
            <span className="material-symbols-outlined absolute left-3 text-[#0d631b] text-[20px] pointer-events-none">
              eco
            </span>
            <input
              className="w-full h-12 pl-10 pr-10 bg-[#f1f3ff] text-[#141b2b] font-body-md text-body-md rounded-lg focus:outline-none focus:bg-[#e9edff] transition-all cursor-pointer font-medium"
              type="text"
              readOnly
              value={getCropDisplayName(currentCrop.name)}
            />
            <span
              className={`material-symbols-outlined absolute right-3 text-[#707a6c] text-[20px] transition-transform ${
                cropDropdownOpen ? 'rotate-180' : ''
              }`}
            >
              arrow_drop_down
            </span>
          </div>

          {cropDropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-20"
                onClick={() => setCropDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-[#e0e6ed] py-2 z-30">
                {CROP_PRESETS.map((crop, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleCropSelect(idx)}
                    className={`px-4 py-2.5 hover:bg-[#f1f3ff] cursor-pointer flex items-center justify-between ${
                      idx === selectedCropIndex ? 'bg-[#e9edff] text-[#0d631b] font-bold' : 'text-[#141b2b]'
                    }`}
                  >
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{getCropDisplayName(crop.name)}</span>
                      <span className="text-xs text-[#40493d] italic">{crop.scientific}</span>
                    </div>
                    {idx === selectedCropIndex && (
                      <span className="material-symbols-outlined text-[#0d631b] text-[20px]">
                        check
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Quantity & Bag Counter */}
        <div className="flex flex-col space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="font-label-lg text-label-lg text-[#40493d]">
              {t.quantityAndBags}
            </label>
            <span className="font-label-sm text-label-sm text-[#707a6c]">
              {t.tareCalibrated}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Mass Input */}
            <div className="h-12 bg-[#f1f3ff] rounded-lg px-3 flex items-center justify-between border border-transparent focus-within:border-[#0d631b]">
              <span className="material-symbols-outlined text-[#707a6c] text-[20px]">
                scale
              </span>
              <input
                className="w-20 bg-transparent text-right font-headline-md text-headline-md text-[#141b2b] font-bold focus:outline-none"
                id="weight-input"
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value) || 0)}
              />
              <span className="font-telemetry-unit text-telemetry-unit text-[#40493d] ml-1 font-semibold">
                {language === 'hi' ? 'किग्रा' : 'kg'}
              </span>
            </div>

            {/* Stepper Toggles */}
            <div className="h-12 bg-[#f1f3ff] rounded-lg px-2 flex items-center justify-between">
              <button
                className="w-8 h-8 rounded-lg bg-[#e9edff] hover:bg-[#e1e8fd] active:scale-95 flex items-center justify-center text-[#141b2b] transition-transform"
                onClick={() => handleAdjustCrates(-1)}
                type="button"
                aria-label="Decrease crates"
              >
                <span className="material-symbols-outlined text-[18px]">remove</span>
              </button>

              <div className="flex flex-col items-center">
                <span className="font-headline-md text-headline-md text-[#141b2b] font-bold leading-none">
                  {crates}
                </span>
                <span className="font-label-sm text-label-sm text-[#707a6c] leading-tight">
                  {t.cratesLabel}
                </span>
              </div>

              <button
                className="w-8 h-8 rounded-lg bg-[#e9edff] hover:bg-[#e1e8fd] active:scale-95 flex items-center justify-center text-[#141b2b] transition-transform"
                onClick={() => handleAdjustCrates(1)}
                type="button"
                aria-label="Increase crates"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Condition Selector Tags */}
        <div className="flex flex-col space-y-1.5">
          <label className="font-label-lg text-label-lg text-[#40493d]">
            {t.harvestCondition}
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => toggleCondition('Fresh Harvest')}
              className={`px-3 py-1.5 rounded-full font-label-lg text-label-lg flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform ${
                conditions['Fresh Harvest']
                  ? 'bg-[#0d631b] text-white'
                  : 'bg-[#e9edff] text-[#141b2b]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">verified</span>
              {t.freshHarvest}
            </button>

            <button
              onClick={() => toggleCondition('Grade A')}
              className={`px-3 py-1.5 rounded-full font-label-lg text-label-lg flex items-center gap-1.5 shadow-sm active:scale-95 transition-transform ${
                conditions['Grade A']
                  ? 'bg-[#00639a] text-white'
                  : 'bg-[#e9edff] text-[#141b2b]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">grade</span>
              {t.gradeA}
            </button>

            <button
              onClick={() => toggleCondition('Pre-cooled')}
              className={`px-3 py-1.5 rounded-full font-label-lg text-label-lg flex items-center gap-1.5 active:scale-95 transition-transform ${
                conditions['Pre-cooled']
                  ? 'bg-[#00639a] text-white'
                  : 'bg-[#e9edff] text-[#141b2b]'
              }`}
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">ac_unit</span>
              {t.preCooled}
            </button>
          </div>
        </div>

        {/* Verify & Calculate Button */}
        <button
          className={`w-full h-12 rounded-lg font-headline-md text-headline-md font-semibold flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] ${
            calculatedDone
              ? 'bg-[#0d631b] text-white'
              : 'bg-[#00639a] text-white hover:bg-[#004a75]'
          }`}
          onClick={handleCalculateOptimalConditions}
          disabled={calculating}
          type="button"
        >
          {calculating ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
              <span>{t.runningAnalysis}</span>
            </>
          ) : calculatedDone ? (
            <>
              <span className="material-symbols-outlined text-[20px]">check_circle</span>
              <span>{t.optimalCalibrated}</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px] animate-pulse">auto_awesome</span>
              <span>{t.verifyCalculate}</span>
            </>
          )}
        </button>
      </div>

      {/* STEP 2: Crop Recognition Logic Display */}
      <div className="w-full bg-white rounded-xl p-4 shadow-sm space-y-3 border border-[#e0e6ed]/60">
        {/* Success Banner */}
        <div className="bg-[#f1f3ff] rounded-lg p-3 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0d631b] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="font-label-sm text-label-sm text-[#0d631b] font-bold tracking-wider uppercase">
                {t.recognitionValidated}
              </span>
            </div>
            <p className="font-headline-md text-headline-md text-[#141b2b] font-bold truncate">
              {currentCrop.scientific}
            </p>
            <p className="font-body-sm text-body-sm text-[#40493d]">
              {language === 'hi' ? 'किस्म:' : 'Cultivar:'} {currentCrop.cultivar}
            </p>
          </div>

          {/* Mini Visual Avatar */}
          <div className="w-12 h-12 rounded-lg bg-[#e9edff] shrink-0 overflow-hidden shadow-sm border border-[#e0e6ed]">
            <img
              className="w-full h-full object-cover"
              alt="Intake crate with fresh produce"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAjCGwuxAhTFWhoOIJKAvxWPGQVqkhSuI7g1lZrshdYuMMoOyYPaapHq397UOVMK2_VJdygHh3ZBdIHqKgxjSYam03wBaG-VPni45YOehc-f5QA2vY_Z8aOLtkYZW3xk0qLOeCxnX6QP1x_pXciu1lMgDRZmpnuqBcwCc4MuGPQJ9h0QyIFTao_MbNIbu77EWHW7p_zuyoxFcbLrIYOQUeJVoeMxvHl7ffRnQx0HBJbdeR52p9ki45RJA"
            />
          </div>
        </div>

        {/* Calculated Parameters Summary */}
        <div className="bg-[#2e7d32]/10 rounded-lg p-3 flex items-center justify-between border border-[#2e7d32]/20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0d631b] text-[22px]">hourglass_top</span>
            <span className="font-headline-md text-headline-md text-[#141b2b] font-semibold">
              {t.safeStorageWindow}
            </span>
          </div>
          <span className="font-headline-lg text-headline-lg text-[#0d631b] font-bold">
            {currentCrop.safeDays} {t.daysUnit}
          </span>
        </div>

        {/* Prescribed Hardware Targets (3 Mini Tiles) */}
        <div className="grid grid-cols-3 gap-2">
          {/* Target Temp */}
          <div className="bg-[#f1f3ff] rounded-lg p-2.5 flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-[#00639a]">
              <span className="material-symbols-outlined text-[16px]">thermostat</span>
              <span className="font-label-sm text-label-sm uppercase font-bold">{t.tempLabel}</span>
            </div>
            <span className="font-telemetry-num text-[24px] leading-tight text-[#141b2b] font-bold mt-1">
              {currentCrop.temp}
            </span>
            <span className="font-label-sm text-label-sm text-[#707a6c]">±0.5°C</span>
          </div>

          {/* Target Humidity */}
          <div className="bg-[#f1f3ff] rounded-lg p-2.5 flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-[#0d631b]">
              <span className="material-symbols-outlined text-[16px]">humidity_mid</span>
              <span className="font-label-sm text-label-sm uppercase font-bold">{t.humidityLabel}</span>
            </div>
            <span className="font-telemetry-num text-[24px] leading-tight text-[#141b2b] font-bold mt-1">
              {currentCrop.humidity}
            </span>
            <span className="font-label-sm text-label-sm text-[#707a6c]">±3% RH</span>
          </div>

          {/* Ethylene */}
          <div className="bg-[#f1f3ff] rounded-lg p-2.5 flex flex-col items-center text-center">
            <div className="flex items-center gap-1 text-[#445963]">
              <span className="material-symbols-outlined text-[16px]">air</span>
              <span className="font-label-sm text-label-sm uppercase font-bold">{t.ethyleneLabel}</span>
            </div>
            <span className="font-headline-md text-headline-md text-[#141b2b] font-bold mt-1">
              {language === 'hi' ? t.medLabel : currentCrop.ethylene}
            </span>
            <span className="font-label-sm text-label-sm text-[#707a6c]">&lt;0.05 ppm</span>
          </div>
        </div>

        {/* Fallback Handler Accordion / Sub-card */}
        <div className="bg-[#f1f3ff] rounded-lg overflow-hidden border border-[#e0e6ed]">
          <button
            className="w-full p-2.5 flex items-center justify-between text-left hover:bg-[#e9edff] transition-colors"
            onClick={() => setFallbackOpen(!fallbackOpen)}
            type="button"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#707a6c] text-[18px]">build_circle</span>
              <span className="font-label-sm text-label-sm text-[#40493d] font-medium">
                {t.fallbackHandlingMode}
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-[#707a6c] text-[18px] transition-transform ${
                fallbackOpen ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {fallbackOpen && (
            <div className="p-3 pt-0 bg-[#f1f3ff] space-y-2">
              <div className="p-2.5 bg-[#ffdad6] text-[#93000a] rounded-lg flex items-start gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#ba1a1a] shrink-0">
                  warning
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-label-lg text-label-lg font-bold">
                    {t.unknownVariety}
                  </p>
                  <p className="font-body-sm text-body-sm text-[#93000a]/80">
                    {t.fallbackDesc}
                  </p>
                </div>
              </div>
              <button
                className="w-full py-2 bg-[#e9edff] text-[#141b2b] rounded font-label-lg text-label-lg font-semibold flex items-center justify-center gap-1.5 hover:bg-[#e1e8fd] active:scale-95 transition-all"
                type="button"
                onClick={() => {
                  onShowToast(
                    language === 'hi'
                      ? 'पोर्ट A2 लोड सेंसर पर मैनुअल कैलिब्रेशन लागू किया गया।'
                      : 'Manual calibration applied to port A2 load sensor.',
                    'tune'
                  );
                }}
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                {t.quickManualCalib}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* STEP 3: Database Registration Confirmation & Master Control */}
      <div className="w-full bg-white rounded-xl p-4 shadow-sm space-y-3 border border-[#e0e6ed]/60">
        {/* Storage Record Card */}
        <div className="p-3 bg-[#e1e8fd] rounded-lg flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#0d631b] shadow-xs">
              <span className="material-symbols-outlined text-[22px]">inventory_2</span>
            </div>
            <div className="min-w-0">
              <p className="font-label-sm text-label-sm text-[#707a6c] uppercase font-semibold">
                {t.coldCellDestination}
              </p>
              <p className="font-headline-md text-headline-md text-[#141b2b] font-bold truncate">
                {language === 'hi' ? 'रिकॉर्ड #TG-9021' : 'Record #TG-9021'}
              </p>
            </div>
          </div>
          <div className="bg-white px-3 py-1.5 rounded-lg flex flex-col items-end shadow-xs">
            <span className="font-label-sm text-label-sm text-[#707a6c] uppercase">{t.rackBayLabel}</span>
            <span className="font-headline-md text-headline-md text-[#0d631b] font-bold">
              Rack B-03
            </span>
          </div>
        </div>

        {/* Confirmation status line */}
        <div className="flex items-center gap-1.5 px-1">
          <span className="w-2 h-2 rounded-full bg-[#0d631b] animate-ping"></span>
          <span className="font-label-sm text-label-sm text-[#0d631b] font-medium">
            {t.iotSyncVerified}
          </span>
        </div>

        {/* Master Launch CTA Button */}
        <button
          className={`w-full h-14 rounded-xl font-headline-md text-headline-md font-bold flex items-center justify-center gap-2.5 shadow-md transition-all active:scale-[0.98] ${
            monitoringStarted
              ? 'bg-[#2e7d32] text-white'
              : 'bg-[#0d631b] text-white hover:bg-[#005312]'
          }`}
          onClick={handleStartMonitoringLoop}
          disabled={monitoringStarting}
          type="button"
        >
          {monitoringStarting ? (
            <>
              <span className="material-symbols-outlined text-[24px] animate-spin">cyclone</span>
              <span>{t.actuatingLoop}</span>
            </>
          ) : monitoringStarted ? (
            <>
              <span className="material-symbols-outlined text-[24px]">verified</span>
              <span>{t.chamberActiveGuarded}</span>
            </>
          ) : (
            <>
              <span
                className="material-symbols-outlined text-[24px] animate-spin"
                style={{ animationDuration: '3s' }}
              >
                sync
              </span>
              <span>{t.startMonitoringLoop}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
