import React from 'react';
import { TabType, Language } from '../types';
import { translations } from '../utils/translations';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  unresolvedAlertsCount: number;
  language: Language;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onTabChange,
  unresolvedAlertsCount,
  language,
}) => {
  const t = translations[language];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-safe bg-[#f9f9ff]/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.06)] border-t border-[#e9edff]">
      <div className="flex justify-between items-center h-20 px-2 max-w-xl mx-auto">
        {/* Home */}
        <button
          onClick={() => onTabChange('home')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 transition-all ${
            currentTab === 'home'
              ? 'text-[#0d631b] font-bold bg-[#e1e8fd] rounded-xl'
              : 'text-[#40493d] hover:text-[#141b2b]'
          }`}
          type="button"
          aria-label={t.navHome}
        >
          <span className="material-symbols-outlined text-[24px]">dashboard</span>
          <span className="font-label-sm text-label-sm mt-0.5">{t.navHome}</span>
        </button>

        {/* Telemetry */}
        <button
          onClick={() => onTabChange('telemetry')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 transition-all ${
            currentTab === 'telemetry'
              ? 'text-[#0d631b] font-bold bg-[#e1e8fd] rounded-xl'
              : 'text-[#40493d] hover:text-[#141b2b]'
          }`}
          type="button"
          aria-label={t.navTelemetry}
        >
          <span className="material-symbols-outlined text-[24px]">ssid_chart</span>
          <span className="font-label-sm text-label-sm mt-0.5">{t.navTelemetry}</span>
        </button>

        {/* New Entry (Intake) */}
        <button
          onClick={() => onTabChange('intake')}
          className="flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 rounded-lg text-[#40493d] transition-all group"
          type="button"
          aria-label={t.navNewEntry}
        >
          <div className="w-11 h-11 -mt-3 rounded-full bg-[#0d631b] flex items-center justify-center text-white shadow-md group-hover:scale-105 active:scale-95 transition-transform">
            <span className="material-symbols-outlined text-[24px]">add</span>
          </div>
          <span className={`font-label-sm text-label-sm mt-0.5 ${currentTab === 'intake' ? 'text-[#0d631b] font-bold' : ''}`}>
            {t.navNewEntry}
          </span>
        </button>

        {/* Alerts */}
        <button
          onClick={() => onTabChange('alerts')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 relative transition-all ${
            currentTab === 'alerts'
              ? 'text-[#0d631b] font-bold bg-[#e1e8fd] rounded-xl'
              : 'text-[#40493d] hover:text-[#141b2b]'
          }`}
          type="button"
          aria-label={t.navAlerts}
        >
          <div className="relative flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">notifications</span>
            {unresolvedAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#ba1a1a] rounded-full ring-2 ring-[#f9f9ff]"></span>
            )}
          </div>
          <span className="font-label-sm text-label-sm mt-0.5">{t.navAlerts}</span>
        </button>

        {/* Settings */}
        <button
          onClick={() => onTabChange('settings')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[48px] py-1 px-2 transition-all ${
            currentTab === 'settings'
              ? 'text-[#0d631b] font-bold bg-[#e1e8fd] rounded-xl'
              : 'text-[#40493d] hover:text-[#141b2b]'
          }`}
          type="button"
          aria-label={t.navSettings}
        >
          <span className="material-symbols-outlined text-[24px]">tune</span>
          <span className="font-label-sm text-label-sm mt-0.5">{t.navSettings}</span>
        </button>
      </div>
    </nav>
  );
};
