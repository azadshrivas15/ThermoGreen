import React, { useState, useEffect } from 'react';
import { ChamberTelemetry, Language } from '../types';
import { translations } from '../utils/translations';

interface LiveTelemetryProps {
  chamber: ChamberTelemetry;
  chambers: ChamberTelemetry[];
  onSelectChamber: (ch: ChamberTelemetry) => void;
  onUpdateChamber: (updated: Partial<ChamberTelemetry>) => void;
  onShowToast: (msg: string, icon?: string) => void;
  language: Language;
}

export const LiveTelemetry: React.FC<LiveTelemetryProps> = ({
  chamber,
  chambers,
  onSelectChamber,
  onUpdateChamber,
  onShowToast,
  language,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [targetTemp, setTargetTemp] = useState(chamber.targetTemp || 8.0);
  const [autoCooling, setAutoCooling] = useState(chamber.autoCoolingEnabled);
  const [camMode, setCamMode] = useState<'mist' | 'ir' | 'day'>('mist');

  // Synchronize state when chamber selection or props change
  useEffect(() => {
    setTargetTemp(chamber.targetTemp ?? 8.0);
    setAutoCooling(chamber.autoCoolingEnabled);
  }, [chamber.chamberId, chamber.targetTemp, chamber.autoCoolingEnabled]);

  const t = translations[language];

  const handleToggleCooling = () => {
    const nextVal = !autoCooling;
    setAutoCooling(nextVal);
    onUpdateChamber({ autoCoolingEnabled: nextVal });
    onShowToast(
      nextVal
        ? language === 'hi'
          ? 'PID स्वचालित कूलिंग नियंत्रण सक्रिय।'
          : 'PID closed-loop cooling active.'
        : language === 'hi'
          ? 'ऑटो-कूलिंग रोकी गई। मैनुअल होल्ड सक्रिय।'
          : 'Auto-cooling suspended. Manual hold active.',
      'tune'
    );
  };

  const handleTargetChange = (val: number) => {
    setTargetTemp(val);
    onUpdateChamber({ targetTemp: val });
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      'Timestamp,Parameter,Value,Status,Operator\n' +
      '2026-09-21 14:02:00,Compressor Duty,62%,Nominal,System PID\n' +
      '2026-09-21 13:45:00,Door Status,Opened (42s),Logged,Operator Ramesh\n' +
      '2026-09-21 12:30:00,Defrost Cycle,Completed,Cleared,Automated\n' +
      '2026-09-21 11:15:00,Humidity Pulse,85% RH,Synchronized,IoT Gateway';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `veggiecare_telemetry_${chamber.chamberId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onShowToast(
      language === 'hi' ? 'टेलीमेट्री इवेंट लॉग CSV डाउनलोड हो गया।' : 'Telemetry event log exported to CSV.',
      'download'
    );
  };

  return (
    <div className="flex flex-col w-full gap-4 max-w-xl mx-auto pb-6">
      {/* Unit Selector Dropdown Bar */}
      <section className="bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-2 border border-[#e0e6ed]/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[#0d631b] text-[20px]">
              warehouse
            </span>
            <span className="font-label-sm text-label-sm text-[#445963] uppercase tracking-wider">
              {t.activeMonitoringZone}
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#f1f3ff] text-[#0d631b]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0d631b] animate-ping"></span>
            <span className="font-label-sm text-label-sm font-semibold">{t.liveAgo}</span>
          </div>
        </div>

        <div className="relative">
          <button
            className="w-full bg-[#f1f3ff] hover:bg-[#e9edff] transition-colors py-2 px-3 rounded-xl flex items-center justify-between text-left focus:outline-none"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            type="button"
          >
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md text-[#141b2b] font-bold">
                {language === 'hi' ? chamber.name.replace('Chamber', 'चैंबर') : chamber.name}
              </span>
              <span className="font-body-sm text-body-sm text-[#445963]">
                {language === 'hi' ? 'ज़ोन A • सोलर माइक्रो-कोल्ड रूम' : chamber.zone}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex px-2 py-1 rounded-full font-label-sm text-label-sm font-bold ${
                  chamber.status === 'ONLINE'
                    ? 'bg-[#a3f69c] text-[#005312]'
                    : 'bg-[#e1e8fd] text-[#445963]'
                }`}
              >
                {language === 'hi'
                  ? chamber.status === 'ONLINE'
                    ? 'चालू (ONLINE)'
                    : 'स्टैंडबाय'
                  : chamber.status}
              </span>
              <span
                className={`material-symbols-outlined text-[#40493d] transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180' : ''
                }`}
              >
                expand_more
              </span>
            </div>
          </button>

          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setDropdownOpen(false)}
              />
              <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl z-20 overflow-hidden flex flex-col border border-[#e0e6ed]">
                {chambers.map((ch) => (
                  <div
                    key={ch.chamberId}
                    className={`p-3 hover:bg-[#f1f3ff] cursor-pointer flex items-center justify-between transition-colors ${
                      ch.chamberId === chamber.chamberId ? 'bg-[#f1f3ff]/60' : ''
                    }`}
                    onClick={() => {
                      onSelectChamber(ch);
                      setDropdownOpen(false);
                    }}
                  >
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg text-[#141b2b] font-bold">
                        {language === 'hi' ? ch.name.replace('Chamber', 'चैंबर') : ch.name}
                      </span>
                      <span className="font-body-sm text-body-sm text-[#445963]">
                        {language === 'hi'
                          ? `वर्तमान वजन: ${ch.currentLoadKg} किग्रा (${Math.round((ch.currentLoadKg / ch.maxCapacityKg) * 100)}%)`
                          : `Current load: ${ch.currentLoadKg} kg (${Math.round((ch.currentLoadKg / ch.maxCapacityKg) * 100)}%)`}
                      </span>
                    </div>
                    {ch.chamberId === chamber.chamberId ? (
                      <span className="material-symbols-outlined text-[#0d631b] text-[20px]">
                        check_circle
                      </span>
                    ) : (
                      <span className="inline-flex px-2 py-0.5 rounded-full bg-[#e1e8fd] text-[#445963] font-label-sm text-label-sm">
                        {ch.status}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Environment Telemetry Grid */}
      <section className="grid grid-cols-1 gap-4">
        {/* Temperature Hero Widget */}
        <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col justify-between relative overflow-hidden border border-[#e0e6ed]/60">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-[#0d631b]">
                <span className="material-symbols-outlined text-[20px]">thermostat</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-[#445963] font-bold uppercase tracking-wider">
                  {t.storageTemp}
                </span>
                <span className="font-label-sm text-label-sm text-[#40493d]">
                  Sensor Array #T-01
                </span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#a3f69c] text-[#005312] font-label-sm text-label-sm font-bold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0d631b]"></span>
              {t.safeZone} ({t.targetTempPrefix} {targetTemp.toFixed(1)}°C)
            </span>
          </div>

          <div className="flex items-baseline gap-1 my-1">
            <span className="font-telemetry-num text-telemetry-num text-[#141b2b]">
              {chamber.currentTemp.toFixed(1)}
            </span>
            <span className="font-telemetry-unit text-telemetry-unit text-[#445963]">°C</span>
            <span className="font-body-sm text-body-sm text-[#0d631b] font-semibold ml-2">
              {chamber.tempVariance}
            </span>
          </div>

          {/* 12h Sparkline Graph */}
          <div className="mt-1">
            <div className="flex items-center justify-between text-[#445963] mb-1">
              <span className="font-label-sm text-label-sm">{t.trendLine12h}</span>
              <span className="font-label-sm text-label-sm">{t.minMaxRange}</span>
            </div>
            <div className="w-full h-14 relative flex items-end">
              <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 320 50">
                <defs>
                  <linearGradient id="tempGlow" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0d631b" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#0d631b" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d="M 0,26 Q 25,28 50,24 T 100,25 T 150,22 T 200,28 T 250,24 T 300,23 L 320,22 L 320,50 L 0,50 Z"
                  fill="url(#tempGlow)"
                />
                <path
                  d="M 0,26 Q 25,28 50,24 T 100,25 T 150,22 T 200,28 T 250,24 T 300,23 L 320,22"
                  fill="none"
                  stroke="#0d631b"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                />
                <circle className="animate-pulse" cx="320" cy="22" fill="#0d631b" r="4" />
              </svg>
            </div>
          </div>
        </div>

        {/* Humidity & Dual Gauge Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Humidity Widget */}
          <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col justify-between border border-[#e0e6ed]/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-[#00639a]">
                  <span className="material-symbols-outlined text-[20px]">humidity_mid</span>
                </div>
                <span className="font-label-sm text-label-sm text-[#445963] font-bold uppercase tracking-wider">
                  {t.relativeRH}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#cee5ff] text-[#004a75] font-label-sm text-label-sm font-semibold">
                {t.optimalPill}
              </span>
            </div>

            <div className="flex items-center justify-center my-3 gap-4">
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" fill="transparent" r="40" stroke="#e9edff" strokeWidth="9" />
                  <circle
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="40"
                    stroke="#00639a"
                    strokeDasharray="251.2"
                    strokeDashoffset={251.2 - (251.2 * chamber.humidityRh) / 100}
                    strokeLinecap="round"
                    strokeWidth="9"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-headline-lg text-headline-lg text-[#141b2b] font-bold">
                    {chamber.humidityRh}%
                  </span>
                  <span className="font-label-sm text-label-sm text-[#445963]">RH</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="font-body-sm text-body-sm font-medium text-[#141b2b]">
                  {t.safeRangeRH}
                </span>
                <div className="flex items-center gap-1 font-label-sm text-label-sm text-[#445963]">
                  <span className="w-2 h-2 rounded-full bg-[#00639a]"></span>
                  <span>80% - 90% RH</span>
                </div>
                <span className="font-label-sm text-label-sm text-[#40493d]">
                  {t.preventsDecay}
                </span>
              </div>
            </div>
          </div>

          {/* Power Systems Widget */}
          <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col justify-between border border-[#e0e6ed]/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-[#0d631b]">
                  <span className="material-symbols-outlined text-[20px]">solar_power</span>
                </div>
                <span className="font-label-sm text-label-sm text-[#445963] font-bold uppercase tracking-wider">
                  {t.powerGrid}
                </span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#a3f69c] text-[#005312] font-label-sm text-label-sm font-semibold">
                {t.selfSustained}
              </span>
            </div>

            <div className="flex flex-col gap-2 my-1">
              {/* Solar Input */}
              <div className="p-2 bg-[#f1f3ff] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0d631b] text-[22px]">wb_sunny</span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-[#445963]">{t.solarArrayInput}</span>
                    <span className="font-label-lg text-label-lg text-[#141b2b] font-bold">
                      {chamber.solarWatts.toLocaleString()} W
                    </span>
                  </div>
                </div>
                <span className="font-label-sm text-label-sm text-[#0d631b] font-bold">{t.peakHigh}</span>
              </div>

              {/* Battery Storage */}
              <div className="p-2 bg-[#f1f3ff] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#00639a] text-[22px]">
                    battery_charging_full
                  </span>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-[#445963]">{t.lifePO4Storage}</span>
                    <span className="font-label-lg text-label-lg text-[#141b2b] font-bold">
                      {chamber.batteryPercent}% ({chamber.batteryHours}
                      {language === 'hi' ? ' घंटे बैकअप' : 'h backup'})
                    </span>
                  </div>
                </div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#00639a]"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Automatic Cooling Control Tactile Card */}
        <div className="bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-2 border border-[#e0e6ed]/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-[#0d631b]">
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </div>
              <div>
                <span className="font-headline-md text-headline-md text-[#141b2b] font-bold">
                  {t.autoCoolingTitle}
                </span>
                <span className="block font-label-sm text-label-sm text-[#445963]">
                  {t.pidControl}
                </span>
              </div>
            </div>

            {/* Tactile Slider Switch */}
            <button
              className={`w-14 h-8 rounded-full p-1 transition-colors relative flex items-center focus:outline-none ${
                autoCooling ? 'bg-[#0d631b]' : 'bg-[#e1e8fd]'
              }`}
              onClick={handleToggleCooling}
              type="button"
              aria-label="Toggle auto cooling"
            >
              <div
                className={`w-6 h-6 bg-white rounded-full shadow-md transform transition-transform flex items-center justify-center ${
                  autoCooling ? 'translate-x-6' : 'translate-x-0'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[14px] ${
                    autoCooling ? 'text-[#0d631b]' : 'text-[#445963]'
                  }`}
                >
                  {autoCooling ? 'check' : 'close'}
                </span>
              </div>
            </button>
          </div>

          <div className="bg-[#f1f3ff] p-3 rounded-xl flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-[#445963]">{t.coolingTargetSetpoint}</span>
              <span className="font-label-lg text-label-lg text-[#141b2b] font-bold">
                {targetTemp.toFixed(1)}°C
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-label-sm text-label-sm text-[#445963]">0°C</span>
              <input
                className="w-full h-2 bg-[#e9edff] rounded-lg appearance-none cursor-pointer accent-[#0d631b]"
                max="15"
                min="0"
                step="0.5"
                type="range"
                value={targetTemp}
                onChange={(e) => handleTargetChange(parseFloat(e.target.value))}
              />
              <span className="font-label-sm text-label-sm text-[#445963]">15°C</span>
            </div>
          </div>
        </div>
      </section>

      {/* Chamber Capacity Gauge */}
      <section className="bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-2 border border-[#e0e6ed]/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#445963] text-[20px]">inventory_2</span>
            <span className="font-headline-md text-headline-md text-[#141b2b] font-bold">
              {t.chamberCapacityTitle}
            </span>
          </div>
          <span className="font-label-sm text-label-sm font-bold text-[#40493d] bg-[#e9edff] px-2.5 py-1 rounded-full">
            {Math.round((chamber.currentLoadKg / chamber.maxCapacityKg) * 100)}% {t.loadedBadge}
          </span>
        </div>

        {/* Storage Progress Visual Bar */}
        <div className="flex flex-col gap-1.5">
          <div className="w-full h-4 bg-[#e9edff] rounded-full overflow-hidden flex">
            <div
              className="bg-[#0d631b] h-full transition-all duration-500 rounded-l-full"
              style={{ width: `${(chamber.currentLoadKg / chamber.maxCapacityKg) * 100}%` }}
            ></div>
            <div
              className="bg-[#e1e8fd] h-full transition-all duration-500 rounded-r-full"
              style={{ width: `${100 - (chamber.currentLoadKg / chamber.maxCapacityKg) * 100}%` }}
            ></div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0d631b]"></span>
              <span className="font-label-sm text-label-sm text-[#141b2b] font-semibold">
                {t.currentKg} {chamber.currentLoadKg} {language === 'hi' ? 'किग्रा' : 'kg'}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e1e8fd]"></span>
              <span className="font-label-sm text-label-sm text-[#445963]">
                {t.availableKg} {chamber.maxCapacityKg - chamber.currentLoadKg} {language === 'hi' ? 'किग्रा' : 'kg'}
              </span>
            </div>
          </div>
        </div>

        {/* Capacity Card Details */}
        <div className="grid grid-cols-2 gap-3 mt-1">
          <div className="bg-[#f1f3ff] p-3 rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0d631b] text-[24px]">scale</span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-[#445963] truncate">{t.maxRating}</span>
              <span className="font-label-lg text-label-lg text-[#141b2b] font-bold">
                {chamber.maxCapacityKg.toLocaleString()} {language === 'hi' ? 'किग्रा' : 'kg'}
              </span>
            </div>
          </div>
          <div className="bg-[#f1f3ff] p-3 rounded-xl flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00639a] text-[24px]">category</span>
            <div className="flex flex-col min-w-0">
              <span className="font-label-sm text-label-sm text-[#445963] truncate">{t.activeCratesCount}</span>
              <span className="font-label-lg text-label-lg text-[#141b2b] font-bold">
                {chamber.activeCrates} {language === 'hi' ? 'क्रेट्स' : 'Crates'}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Produce Inspection Placeholder */}
      <section className="bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-2 border border-[#e0e6ed]/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#445963] text-[20px]">
              nest_cam_outdoor
            </span>
            <span className="font-headline-md text-headline-md text-[#141b2b] font-bold">
              {t.interiorCamTitle}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-[#f1f3ff] rounded-lg p-0.5 text-xs font-semibold">
              <button
                onClick={() => setCamMode('mist')}
                className={`px-2 py-0.5 rounded ${camMode === 'mist' ? 'bg-[#0d631b] text-white' : 'text-[#445963]'}`}
              >
                {language === 'hi' ? 'मिस्ट' : 'Mist'}
              </button>
              <button
                onClick={() => setCamMode('ir')}
                className={`px-2 py-0.5 rounded ${camMode === 'ir' ? 'bg-[#0d631b] text-white' : 'text-[#445963]'}`}
              >
                {language === 'hi' ? 'नाइट विज़न' : 'IR'}
              </button>
              <button
                onClick={() => setCamMode('day')}
                className={`px-2 py-0.5 rounded ${camMode === 'day' ? 'bg-[#0d631b] text-white' : 'text-[#445963]'}`}
              >
                {language === 'hi' ? 'सामान्य' : 'Day'}
              </button>
            </div>
            <span className="font-label-sm text-label-sm text-[#0d631b] font-bold">
              {t.zoneAHD}
            </span>
          </div>
        </div>

        <div className="relative w-full h-44 rounded-xl overflow-hidden shadow-inner bg-black">
          <img
            alt="Interior of produce cold room"
            className={`w-full h-full object-cover transition-all duration-300 ${
              camMode === 'ir' ? 'contrast-125 brightness-110 hue-rotate-90 saturate-50' : ''
            }`}
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuADymD-tV_1E_YPwxH_mvUT97fipXu7oU7c94_MnrgOPdpPieomt6Ew5Op1r47EejldGUzZV8mRH_88ZRCgyVKFBRssyHnTsmaFGWI7vWAzPxtQ0HzySC8lPa7-a6-2ipACNDxu3Fh6LFNeXHOlOaTgFxnP-RJlcF1PBQ9SbGC_PFg2vty3qX7riwdgCPrXYy2tdXQqQtCW3xlLjSY91Ctg0Ak1b2DY_zyqbsSpdCaU0GohjpWO1CNNVA"
          />
          <div className="absolute bottom-2 left-2 px-2 py-1 bg-white/90 backdrop-blur-md rounded-lg flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#0d631b] animate-pulse"></span>
            <span className="font-label-sm text-label-sm font-semibold text-[#141b2b]">
              {t.irNightMist}
            </span>
          </div>
        </div>
      </section>

      {/* Live Activity & Telemetry Feed */}
      <section className="bg-white p-4 rounded-2xl shadow-sm flex flex-col gap-2 border border-[#e0e6ed]/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#445963] text-[20px]">history</span>
            <span className="font-headline-md text-headline-md text-[#141b2b] font-bold">
              {t.eventLogTitle}
            </span>
          </div>
          <button
            onClick={handleExportCSV}
            className="font-label-sm text-label-sm text-[#00639a] font-bold cursor-pointer hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            {t.exportCSV}
          </button>
        </div>

        <div className="flex flex-col gap-1">
          {/* Item 1 */}
          <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#f1f3ff] transition-colors">
            <div className="w-7 h-7 rounded-full bg-[#cee5ff] flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px] text-[#001d32]">mode_fan</span>
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-label-lg text-label-lg text-[#141b2b] font-semibold truncate">
                  {language === 'hi' ? 'कंप्रेसर इको चक्र सक्रिय' : 'Compressor low-power eco cycle'}
                </span>
                <span className="font-label-sm text-label-sm text-[#445963] ml-2 shrink-0">14:02</span>
              </div>
              <span className="font-body-sm text-body-sm text-[#40493d]">
                {language === 'hi'
                  ? 'सोलर बैटरी रिज़र्व सुरक्षित रखने के लिए PID द्वारा 65% गति पर समायोजित किया गया।'
                  : 'PID adjusted to 65% duty cycle to preserve battery reserve.'}
              </span>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#f1f3ff] transition-colors">
            <div className="w-7 h-7 rounded-full bg-[#e1e8fd] flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px] text-[#141b2b]">meeting_room</span>
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-label-lg text-label-lg text-[#141b2b] font-semibold truncate">
                  {language === 'hi' ? 'चैंबर का दरवाज़ा खोला गया' : 'Chamber access door opened'}
                </span>
                <span className="font-label-sm text-label-sm text-[#445963] ml-2 shrink-0">13:45</span>
              </div>
              <span className="font-body-sm text-body-sm text-[#40493d]">
                {language === 'hi'
                  ? 'ऑपरेटर रमेश द्वारा (अवधि: 42s • तापमान वृद्धि: +0.3°C)।'
                  : 'By Operator Ramesh (Duration: 42s • Temp delta: +0.3°C).'}
              </span>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#f1f3ff] transition-colors">
            <div className="w-7 h-7 rounded-full bg-[#a3f69c] flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px] text-[#002204]">ac_unit</span>
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-label-lg text-label-lg text-[#141b2b] font-semibold truncate">
                  {language === 'hi' ? 'ऑटो डिफ्रॉस्ट चक्र पूर्ण' : 'Auto defrost completed'}
                </span>
                <span className="font-label-sm text-label-sm text-[#445963] ml-2 shrink-0">12:30</span>
              </div>
              <span className="font-body-sm text-body-sm text-[#40493d]">
                {language === 'hi'
                  ? 'इवेपोरेटर कॉइल साफ़ हुई; मानक 8.0°C प्रोफाइल पर वापस आया।'
                  : 'Evaporator coils cleared; returned to standard 8.0°C profile.'}
              </span>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-start gap-3 p-2 rounded-xl hover:bg-[#f1f3ff] transition-colors">
            <div className="w-7 h-7 rounded-full bg-[#cee5ff] flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[16px] text-[#001d32]">water_drop</span>
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-label-lg text-label-lg text-[#141b2b] font-semibold truncate">
                  {language === 'hi' ? 'बैच #TG-8842 आर्द्रता संतुलित' : 'Batch #TG-8842 RH calibrated'}
                </span>
                <span className="font-label-sm text-label-sm text-[#445963] ml-2 shrink-0">11:15</span>
              </div>
              <span className="font-body-sm text-body-sm text-[#40493d]">
                {language === 'hi'
                  ? 'अल्ट्रासोनिक ह्यूमिडिफिकेशन पल्स 85% RH पर स्थिर की गई।'
                  : 'Ultrasonic humidification pulse synchronized to 85% RH.'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
