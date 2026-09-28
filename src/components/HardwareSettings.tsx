import React, { useState } from 'react';
import { UserRole, Language } from '../types';
import { translations } from '../utils/translations';

interface HardwareSettingsProps {
  userRole: UserRole;
  onShowToast: (msg: string, icon?: string) => void;
  language: Language;
}

export const HardwareSettings: React.FC<HardwareSettingsProps> = ({
  userRole,
  onShowToast,
  language,
}) => {
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [ecoMode, setEcoMode] = useState(true);
  const [tempOffset, setTempOffset] = useState('0.0');
  const [humidityPulse, setHumidityPulse] = useState('15');

  const t = translations[language];

  const handleSave = () => {
    onShowToast(
      language === 'hi'
        ? 'हार्डवेयर सेटपॉइंट और गेटवे कॉन्फ़िगरेशन सुरक्षित की गईं।'
        : 'Hardware setpoints and gateway configurations saved.',
      'save'
    );
  };

  return (
    <div className="flex flex-col w-full pb-8 space-y-4 max-w-xl mx-auto">
      {/* Settings Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-headline-lg text-headline-lg font-bold text-[#141b2b]">
            {t.hardwareSettingsTitle}
          </h1>
          <p className="font-body-sm text-body-sm text-[#40493d]">
            {t.hardwareSubtitle}
          </p>
        </div>
        <span className="font-label-sm text-label-sm font-bold bg-[#cbffc2] text-[#005312] px-2.5 py-1 rounded-full">
          {language === 'hi' ? 'फर्मवेयर v2.4.1' : 'Firmware v2.4.1'}
        </span>
      </div>

      {/* IoT Mesh & Gateway Status */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e0e6ed]/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0d631b] text-[22px]">router</span>
            <span className="font-label-lg text-label-lg font-bold text-[#141b2b]">
              {t.iotGatewayMesh}
            </span>
          </div>
          <span className="font-label-sm text-label-sm text-[#0d631b] font-bold bg-[#e9edff] px-2 py-0.5 rounded-full">
            {t.nodesActive}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 bg-[#f1f3ff] rounded-lg">
            <span className="text-[#445963] block">{t.protocol}</span>
            <span className="font-bold text-[#141b2b]">LoRaWAN 868 MHz</span>
          </div>
          <div className="p-2.5 bg-[#f1f3ff] rounded-lg">
            <span className="text-[#445963] block">{t.signalRssi}</span>
            <span className="font-bold text-[#0d631b]">
              -68 dBm ({language === 'hi' ? 'उत्कृष्ट' : 'Strong'})
            </span>
          </div>
          <div className="p-2.5 bg-[#f1f3ff] rounded-lg">
            <span className="text-[#445963] block">{t.telemetryInterval}</span>
            <span className="font-bold text-[#141b2b]">
              {language === 'hi' ? 'प्रति 10 सेकंड' : 'Every 10 seconds'}
            </span>
          </div>
          <div className="p-2.5 bg-[#f1f3ff] rounded-lg">
            <span className="text-[#445963] block">{t.syncLatency}</span>
            <span className="font-bold text-[#0d631b]">120 ms</span>
          </div>
        </div>
      </div>

      {/* Chamber Calibration */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e0e6ed]/60 space-y-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#00639a] text-[22px]">tune</span>
          <span className="font-label-lg text-label-lg font-bold text-[#141b2b]">
            {t.chamberCalibration}
          </span>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-[#40493d]">
                {t.probeOffset}
              </label>
              <span className="font-bold text-xs text-[#0d631b]">{tempOffset}°C</span>
            </div>
            <select
              value={tempOffset}
              onChange={(e) => setTempOffset(e.target.value)}
              className="w-full h-11 bg-[#f1f3ff] px-3 rounded-lg text-sm font-medium text-[#141b2b] focus:outline-none border border-transparent focus:border-[#0d631b]"
            >
              <option value="-0.5">
                -0.5°C ({language === 'hi' ? 'अधिक ठंडा पूर्वाग्रह' : 'Cooler Bias'})
              </option>
              <option value="0.0">
                0.0°C ({language === 'hi' ? 'फ़ैक्टरी कैलिब्रेटेड' : 'Factory Calibrated'})
              </option>
              <option value="+0.5">
                +0.5°C ({language === 'hi' ? 'गर्म पूर्वाग्रह' : 'Warmer Bias'})
              </option>
            </select>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-[#40493d]">
                {t.humidifierPulse}
              </label>
              <span className="font-bold text-xs text-[#00639a]">
                {humidityPulse} {language === 'hi' ? 'मिनट चक्र' : 'min cycle'}
              </span>
            </div>
            <select
              value={humidityPulse}
              onChange={(e) => setHumidityPulse(e.target.value)}
              className="w-full h-11 bg-[#f1f3ff] px-3 rounded-lg text-sm font-medium text-[#141b2b] focus:outline-none border border-transparent focus:border-[#00639a]"
            >
              <option value="10">
                {language === 'hi'
                  ? '10 मिनट पल्स (पत्तेदार सब्जियों के लिए उच्च नमी)'
                  : '10 min pulse (High mist for leafy greens)'}
              </option>
              <option value="15">
                {language === 'hi'
                  ? '15 मिनट पल्स (मानक फल भंडारण)'
                  : '15 min pulse (Standard fruit storage)'}
              </option>
              <option value="30">
                {language === 'hi'
                  ? '30 मिनट पल्स (कम नमी मोड)'
                  : '30 min pulse (Low humidity mode)'}
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Solar & Battery Management */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e0e6ed]/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0d631b] text-[22px]">battery_saver</span>
            <span className="font-label-lg text-label-lg font-bold text-[#141b2b]">
              {t.ecoPower}
            </span>
          </div>
          <button
            onClick={() => setEcoMode(!ecoMode)}
            className={`w-12 h-7 rounded-full p-1 transition-colors relative flex items-center ${
              ecoMode ? 'bg-[#0d631b]' : 'bg-[#e1e8fd]'
            }`}
            type="button"
            aria-label="Toggle eco power mode"
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                ecoMode ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        <p className="text-xs text-[#40493d] leading-relaxed">
          {t.ecoPowerDesc}
        </p>
      </div>

      {/* Notifications & Mandi Alerts */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#e0e6ed]/60 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#00639a] text-[22px]">notifications_active</span>
            <span className="font-label-lg text-label-lg font-bold text-[#141b2b]">
              {t.mandiPriceAlerts}
            </span>
          </div>
          <button
            onClick={() => setSmsAlerts(!smsAlerts)}
            className={`w-12 h-7 rounded-full p-1 transition-colors relative flex items-center ${
              smsAlerts ? 'bg-[#0d631b]' : 'bg-[#e1e8fd]'
            }`}
            type="button"
            aria-label="Toggle mandi price alerts"
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                smsAlerts ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
        <p className="text-xs text-[#40493d] leading-relaxed">
          {t.mandiPriceAlertsDesc}
        </p>
      </div>

      {/* Operator Info */}
      <div className="bg-[#f1f3ff] rounded-xl p-3.5 space-y-2 border border-[#e0e6ed]/60">
        <span className="text-xs font-bold text-[#445963] uppercase">{t.activeFieldOperator}</span>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-[#0d631b] text-white flex items-center justify-center font-bold">
              R
            </div>
            <div>
              <p className="font-bold text-sm text-[#141b2b]">
                {language === 'hi' ? 'रमेश पाटिल' : 'Ramesh Patil'}
              </p>
              <p className="text-xs text-[#40493d]">
                {language === 'hi'
                  ? `माइक्रो-कोल्ड रूम #1 सुपरवाइज़र (${userRole})`
                  : `Micro-Cold Room #1 Supervisor (${userRole})`}
              </p>
            </div>
          </div>
          <span className="text-xs text-[#0d631b] font-bold bg-white px-2.5 py-1 rounded-full shadow-xs">
            {t.shiftActive}
          </span>
        </div>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full h-12 bg-[#0d631b] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform"
        type="button"
      >
        <span className="material-symbols-outlined text-[20px]">save</span>
        {t.saveHardware}
      </button>
    </div>
  );
};
