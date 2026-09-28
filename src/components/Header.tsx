import React, { useState } from 'react';
import { TabType, UserRole, Language } from '../types';
import { translations } from '../utils/translations';

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  chamberTemp: number;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  userRole,
  onRoleChange,
  chamberTemp,
  language,
  onLanguageChange,
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const t = translations[language];

  const roles: { key: UserRole; label: string }[] = [
    { key: 'Farmer', label: t.roleFarmer },
    { key: 'Supervisor', label: t.roleSupervisor },
    { key: 'FPO Lead', label: t.roleFPOLike },
    { key: 'Field Tech', label: t.roleFieldTech },
  ];

  // Subtitle based on active tab
  const getSubtitle = () => {
    switch (currentTab) {
      case 'home':
        return t.subHome;
      case 'telemetry':
        return t.subTelemetry;
      case 'alerts':
        return t.subAlerts;
      case 'settings':
        return t.subSettings;
      case 'intake':
        return t.subIntake;
      default:
        return t.brandName;
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'Farmer':
        return t.roleFarmer;
      case 'Supervisor':
        return t.roleSupervisor;
      case 'FPO Lead':
        return t.roleFPOLike;
      case 'Field Tech':
        return t.roleFieldTech;
      default:
        return role;
    }
  };

  // For the batch intake screen, render the dedicated intake header as in Screen 1
  if (currentTab === 'intake') {
    return (
      <header className="fixed top-0 w-full z-50 pt-safe bg-[#f9f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-4 flex items-center justify-between max-w-xl mx-auto">
          <div className="flex items-center gap-2">
            <button
              className="w-11 h-11 rounded-full flex items-center justify-center text-[#141b2b] hover:bg-[#e9edff] active:bg-[#e1e8fd] transition-colors"
              onClick={() => onTabChange('home')}
              type="button"
              aria-label={language === 'hi' ? 'डैशबोर्ड पर वापस जाएं' : 'Back to dashboard'}
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <img
              alt="VeggieCare Logo"
              className="h-9 w-9 rounded-xl object-cover bg-white shadow-xs border border-[#0d631b]/20"
              src="/veggiecare-logo.png"
              referrerPolicy="no-referrer"
            />
            <h1 className="font-headline-md text-headline-md font-bold text-[#141b2b] truncate max-w-[150px]">
              {t.subIntake}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Quick Language Toggle */}
            <button
              onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e9edff] text-[#0d631b] hover:bg-[#dce2f7] transition-all font-label-sm text-label-sm font-bold border border-[#0d631b]/20 shadow-xs"
              type="button"
              title={language === 'en' ? 'Switch to Hindi (हिंदी)' : 'Switch to English'}
              aria-label="Toggle language"
            >
              <span className="material-symbols-outlined text-[16px]">translate</span>
              <span>{language === 'en' ? 'हिंदी' : 'EN'}</span>
            </button>

            <button
              type="button"
              className="w-8 h-8 rounded-full bg-[#0d631b] flex items-center justify-center shrink-0 shadow-sm cursor-pointer hover:bg-[#005312] transition-colors"
              onClick={() => onTabChange('settings')}
              aria-label={language === 'hi' ? 'सेटिंग्स' : 'Settings'}
            >
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </button>
          </div>
        </div>
      </header>
    );
  }

  // Standard Header for Home, Telemetry, Alerts, Settings
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#f9f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-28 px-4 flex flex-col justify-center gap-1 max-w-xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              alt="VeggieCare Logo"
              className="h-9 w-9 rounded-xl object-cover bg-white shadow-xs border border-[#0d631b]/20"
              src="/veggiecare-logo.png"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg font-bold text-[#141b2b] leading-tight">
                {t.brandName}
              </span>
              <span className="font-label-sm text-label-sm text-[#40493d] font-medium">
                {getSubtitle()}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 relative">
            {/* High-Visibility Language Switcher Pill */}
            <div className="flex items-center bg-[#e9edff] p-0.5 rounded-full border border-[#0d631b]/20 shadow-xs">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-2 py-0.5 text-xs font-bold rounded-full transition-all ${
                  language === 'en'
                    ? 'bg-[#0d631b] text-white shadow-xs'
                    : 'text-[#445963] hover:text-[#141b2b]'
                }`}
                aria-label="English"
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('hi')}
                className={`px-2 py-0.5 text-xs font-bold rounded-full transition-all ${
                  language === 'hi'
                    ? 'bg-[#0d631b] text-white shadow-xs'
                    : 'text-[#445963] hover:text-[#141b2b]'
                }`}
                aria-label="हिंदी (Hindi)"
              >
                हिंदी
              </button>
            </div>

            {/* Role Switcher */}
            <div className="relative">
              <button
                className="min-h-[38px] px-2.5 py-1 rounded-full bg-[#e9edff] flex items-center gap-1.5 focus:outline-none hover:bg-[#e1e8fd] transition-colors"
                type="button"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                aria-label="Select role"
              >
                <span className="w-2 h-2 rounded-full bg-[#0d631b] animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-[#0d631b] font-bold">
                  {getRoleLabel(userRole)}
                </span>
                <span className="material-symbols-outlined text-[16px] text-[#445963]">
                  unfold_more
                </span>
              </button>

              {roleMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setRoleMenuOpen(false)}
                  />
                  <div className="absolute right-0 top-full mt-1.5 w-40 bg-white rounded-xl shadow-lg border border-[#e0e6ed] py-1.5 z-50">
                    {roles.map((r) => (
                      <button
                        key={r.key}
                        onClick={() => {
                          onRoleChange(r.key);
                          setRoleMenuOpen(false);
                        }}
                        className={`w-full px-3 py-1.5 text-left text-xs font-semibold flex items-center justify-between ${
                          userRole === r.key ? 'bg-[#e9edff] text-[#0d631b]' : 'text-[#141b2b] hover:bg-[#f1f3ff]'
                        }`}
                      >
                        <span>{r.label}</span>
                        {userRole === r.key && (
                          <span className="material-symbols-outlined text-[16px] text-[#0d631b]">check</span>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              className="w-8 h-8 rounded-full bg-[#0d631b] flex items-center justify-center shrink-0 shadow-sm cursor-pointer hover:bg-[#005312] transition-colors"
              onClick={() => onTabChange('settings')}
              title={language === 'hi' ? 'सेटिंग्स' : 'Settings'}
              aria-label={language === 'hi' ? 'सेटिंग्स' : 'Settings'}
            >
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </button>
          </div>
        </div>

        {/* Ambient status pill */}
        <div className="flex items-center justify-between bg-white/80 px-3 py-1 rounded-full border border-[#e9edff]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#0d631b]"></span>
            <span className="font-label-sm text-label-sm text-[#141b2b] font-semibold tracking-wide">
              {t.chamberOnline}{chamberTemp.toFixed(1)}°C
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#445963]">
            <span className="material-symbols-outlined text-[14px]">sensors</span>
            <span className="font-label-sm text-label-sm font-medium">{t.iotSyncLive}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
