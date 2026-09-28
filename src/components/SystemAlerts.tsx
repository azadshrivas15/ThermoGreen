import React, { useState } from 'react';
import { SystemAlert, Language } from '../types';
import { translations } from '../utils/translations';

interface SystemAlertsProps {
  alerts: SystemAlert[];
  onResolveAlert: (id: string) => void;
  onShowToast: (msg: string, icon?: string) => void;
  onNavigateIntake: () => void;
  language: Language;
}

export const SystemAlerts: React.FC<SystemAlertsProps> = ({
  alerts,
  onResolveAlert,
  onShowToast,
  onNavigateIntake,
  language,
}) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'warning' | 'resolved'>('all');
  const [relayResetting, setRelayResetting] = useState(false);
  const [testingDiagnostics, setTestingDiagnostics] = useState(false);

  const t = translations[language];

  const activeAlerts = alerts.filter((a) => !a.resolved);
  const criticalCount = activeAlerts.filter((a) => a.category === 'critical').length;
  const warningCount = activeAlerts.filter((a) => a.category === 'warning').length;
  const resolvedCount = alerts.filter((a) => a.resolved).length;

  const filteredAlerts = alerts.filter((alert) => {
    if (filter === 'all') return !alert.resolved;
    if (filter === 'resolved') return alert.resolved;
    return !alert.resolved && alert.category === filter;
  });

  const getLocalizedAlertTitle = (id: string, defaultTitle: string) => {
    if (language !== 'hi') return defaultTitle;
    switch (id) {
      case 'alt-1':
        return 'तापमान विचलन: चैंबर #1';
      case 'alt-2':
        return 'शेल्फ-लाइफ समाप्त होने के करीब';
      case 'alt-3':
        return 'खाली जगह उपलब्ध';
      case 'alt-4':
        return 'अज्ञात फसल किस्म';
      default:
        return defaultTitle;
    }
  };

  const getLocalizedAlertDesc = (id: string, defaultDesc: string) => {
    if (language !== 'hi') return defaultDesc;
    switch (id) {
      case 'alt-1':
        return 'चैंबर #1 का तापमान 15 मिनट से अधिक समय तक 10.4°C पर रहा। कंप्रेसर रीसेट द्वारा समस्या हल हो गई।';
      case 'alt-2':
        return 'बैच #TG-8810 के लिए तत्काल मंडी प्रेषण शेड्यूल सफलतापूर्वक दर्ज किया गया।';
      case 'alt-3':
        return 'चैंबर #1 में नया इनटेक बैच सफलतापूर्वक पंजीकृत किया गया।';
      case 'alt-4':
        return 'फसल प्रोफ़ाइल को मैनुअल विनिर्देशों के साथ सफलतापूर्वक सत्यापित किया गया।';
      default:
        return defaultDesc;
    }
  };

  const handleRelayReset = (alertId: string) => {
    setRelayResetting(true);
    setTimeout(() => {
      setRelayResetting(false);
      onResolveAlert(alertId);
      onShowToast(
        language === 'hi'
          ? 'कंप्रेसर रिले रीसेट चक्र पूरा हुआ। चैंबर 8.0°C पर पुनः कूलिंग शुरू कर रहा है।'
          : 'Compressor relay reset cycle signaled. Chamber cooling resuming at 8.0°C.',
        'verified'
      );
    }, 1500);
  };

  const handleEmergencyCall = () => {
    onShowToast(
      language === 'hi'
        ? '24/7 कोल्ड-चेन फील्ड तकनीशियन से संपर्क किया जा रहा है...'
        : 'Connecting to 24/7 Agro-Cold Chain Field Technician hotline...',
      'call'
    );
  };

  const handleScheduleDispatch = (alertId: string) => {
    onResolveAlert(alertId);
    onShowToast(
      language === 'hi'
        ? 'पालक बैच #TG-8810 तत्काल APMC प्रेषण के लिए चिह्नित किया गया।'
        : 'Spinach batch #TG-8810 marked for expedited APMC dispatch.',
      'local_shipping'
    );
  };

  const handleOpenIntakeSlot = (alertId: string) => {
    onResolveAlert(alertId);
    onShowToast(
      language === 'hi'
        ? 'क्षेत्रीय FPO किसानों के लिए 180 किग्रा इनटेक स्लॉट खोला गया।'
        : '180 kg intake reservation opened for regional FPO farmers.',
      'add_box'
    );
    setTimeout(() => {
      onNavigateIntake();
    }, 1000);
  };

  const handleManualOverride = (alertId: string) => {
    onResolveAlert(alertId);
    onShowToast(
      language === 'hi'
        ? 'बैच #TG-8994 प्रोफाइल मानक सोलनम लाइकोपर्सिकम पर अपडेट की गई।'
        : 'Batch #TG-8994 profile updated to Standard Solanum Lycopersicum.',
      'edit_note'
    );
  };

  const handleRunDiagnostics = () => {
    setTestingDiagnostics(true);
    setTimeout(() => {
      setTestingDiagnostics(false);
      onShowToast(
        language === 'hi'
          ? 'डायग्नोस्टिक स्कैन पूर्ण: सभी 7 हार्डवेयर प्रोब सामान्य रूप से कार्य कर रहे हैं।'
          : 'Diagnostic scan finished: All 7 hardware probes responding with normal impedance.',
        'check_circle'
      );
    }, 1800);
  };

  return (
    <div className="flex flex-col w-full pb-6 space-y-4 max-w-xl mx-auto">
      {/* Status & Quick Pulse Header */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a] animate-ping"></div>
            <h1 className="font-headline-lg text-headline-lg text-[#141b2b] tracking-tight font-bold">
              {t.alertsSystemStatus}
            </h1>
          </div>
          {criticalCount > 0 && (
            <span className="font-label-sm text-label-sm bg-[#ffdad6] text-[#93000a] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider flex items-center gap-1 shadow-sm">
              <span className="material-symbols-outlined text-[14px]">warning</span>
              {criticalCount} {t.actionRequired}
            </span>
          )}
        </div>
        <p className="font-body-sm text-body-sm text-[#40493d]">
          {t.alertsSubtitle}
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          className={`shrink-0 px-4 py-2 rounded-full font-label-lg text-label-lg transition-all flex items-center gap-1.5 min-h-[40px] ${
            filter === 'all'
              ? 'bg-[#0d631b] text-white shadow-sm font-bold'
              : 'bg-[#e1e8fd] text-[#40493d] hover:bg-[#dce2f7]'
          }`}
          onClick={() => setFilter('all')}
          type="button"
        >
          <span>{t.filterAll}</span>
          <span className="bg-black/10 px-1.5 py-0.5 rounded-full text-[11px] font-bold">
            {activeAlerts.length}
          </span>
        </button>

        <button
          className={`shrink-0 px-4 py-2 rounded-full font-label-lg text-label-lg transition-all flex items-center gap-1.5 min-h-[40px] ${
            filter === 'critical'
              ? 'bg-[#0d631b] text-white shadow-sm font-bold'
              : 'bg-[#e1e8fd] text-[#40493d] hover:bg-[#dce2f7]'
          }`}
          onClick={() => setFilter('critical')}
          type="button"
        >
          <span>{t.filterCritical}</span>
          <span className="bg-[#ba1a1a] text-white px-1.5 py-0.5 rounded-full text-[11px] font-bold">
            {criticalCount}
          </span>
        </button>

        <button
          className={`shrink-0 px-4 py-2 rounded-full font-label-lg text-label-lg transition-all flex items-center gap-1.5 min-h-[40px] ${
            filter === 'warning'
              ? 'bg-[#0d631b] text-white shadow-sm font-bold'
              : 'bg-[#e1e8fd] text-[#40493d] hover:bg-[#dce2f7]'
          }`}
          onClick={() => setFilter('warning')}
          type="button"
        >
          <span>{t.filterWarnings}</span>
          <span className="bg-[#d3daef] text-[#141b2b] px-1.5 py-0.5 rounded-full text-[11px] font-bold">
            {warningCount}
          </span>
        </button>

        <button
          className={`shrink-0 px-4 py-2 rounded-full font-label-lg text-label-lg transition-all flex items-center gap-1.5 min-h-[40px] ${
            filter === 'resolved'
              ? 'bg-[#0d631b] text-white shadow-sm font-bold'
              : 'bg-[#e1e8fd] text-[#40493d] hover:bg-[#dce2f7]'
          }`}
          onClick={() => setFilter('resolved')}
          type="button"
        >
          <span>{t.filterResolved}</span>
          <span className="bg-white text-[#40493d] px-1.5 py-0.5 rounded-full text-[11px] font-bold">
            {resolvedCount}
          </span>
        </button>
      </div>

      {/* Notification Feed */}
      <div className="flex flex-col space-y-3.5">
        {filteredAlerts.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 bg-white rounded-xl text-center space-y-3 shadow-xs border border-[#e0e6ed]">
            <div className="w-14 h-14 rounded-full bg-[#e1e8fd] flex items-center justify-center text-[#0d631b]">
              <span className="material-symbols-outlined text-[32px]">task_alt</span>
            </div>
            <div className="space-y-1 max-w-xs">
              <h3 className="font-headline-md text-headline-md text-[#141b2b] font-bold">
                {filter === 'resolved' ? t.noResolvedAlerts : t.allClearTitle}
              </h3>
              <p className="font-body-sm text-body-sm text-[#40493d]">
                {filter === 'resolved'
                  ? language === 'hi'
                    ? 'अलर्ट का समाधान होने के बाद वे अनुपालन इतिहास में यहाँ दिखेंगे।'
                    : 'Active cold-room alarms will move here once cleared and logged into the compliance registry.'
                  : t.allClearDesc}
              </p>
            </div>
          </div>
        ) : (
          filteredAlerts.map((alert) => {
            // Card 1: Critical Fault
            if (alert.category === 'critical' && !alert.resolved) {
              return (
                <article
                  key={alert.id}
                  className="bg-white rounded-xl p-4 shadow-md flex flex-col gap-3 transition-all relative overflow-hidden border border-[#e0e6ed]/60"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#ba1a1a]"></div>
                  <div className="flex items-start justify-between gap-2 pl-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdad6] text-[#93000a] font-label-sm text-label-sm font-bold tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a] animate-ping"></span>
                      {language === 'hi' ? 'गंभीर हार्डवेयर खराबी' : alert.severityTag}
                    </span>
                    <span className="font-label-sm text-label-sm text-[#40493d] shrink-0 flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {language === 'hi' ? '8 मिनट पहले' : alert.timeAgo}
                    </span>
                  </div>

                  <div className="pl-2 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a] shrink-0">
                        <span className="material-symbols-outlined text-[20px]">severe_cold</span>
                      </div>
                      <h2 className="font-headline-md text-headline-md text-[#141b2b] leading-tight font-bold">
                        {language === 'hi' ? 'चैंबर #1 में समस्या पाई गई' : alert.title}
                      </h2>
                    </div>

                    <p className="font-body-sm text-body-sm text-[#40493d] leading-relaxed">
                      {language === 'hi'
                        ? 'कंप्रेसर थर्मल ओवरलोड चेतावनी शुरू हुई। तापमान लक्ष्य से +1.8°C ऊपर बढ़ा। सहायक वायु प्रवाह सक्रिय किया गया।'
                        : alert.description}
                    </p>

                    {/* Inline Telemetry Box */}
                    <div className="bg-[#f1f3ff] rounded-lg p-2.5 flex items-center justify-between mt-2">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-[#445963]">
                          {language === 'hi' ? 'चैंबर परिवेश' : 'Chamber Ambient'}
                        </span>
                        <div className="flex items-baseline gap-1">
                          <span className="font-telemetry-num text-telemetry-num text-[#ba1a1a]">
                            {alert.ambientTemp || 9.8}
                          </span>
                          <span className="font-telemetry-unit text-telemetry-unit text-[#141b2b]">°C</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="font-label-sm text-label-sm text-[#93000a] font-semibold">
                          {language === 'hi' ? 'अधिकतम सीमा: ' : 'Max Threshold: '}
                          {alert.maxThreshold || 8.0}°C
                        </span>
                        <span className="font-label-sm text-label-sm text-[#ba1a1a] flex items-center gap-0.5 mt-0.5">
                          <span className="material-symbols-outlined text-[14px]">arrow_upward</span>{' '}
                          {language === 'hi' ? 'तापमान वृद्धि' : 'Thermal Surge'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Tactile CTAs */}
                  <div className="pl-2 pt-1 flex flex-col sm:flex-row gap-2">
                    <button
                      className="min-h-[48px] px-4 py-2 rounded-lg bg-[#ba1a1a] text-white font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-all hover:bg-[#93000a]"
                      onClick={() => handleRelayReset(alert.id)}
                      disabled={relayResetting}
                      type="button"
                    >
                      {relayResetting ? (
                        <>
                          <span className="material-symbols-outlined text-[20px] animate-spin">sync</span>
                          <span>{language === 'hi' ? 'रीसेट सिग्नल भेजा जा रहा है...' : 'Sending Reset Signal...'}</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[20px]">restart_alt</span>
                          <span>{t.resetCompressorRelay}</span>
                        </>
                      )}
                    </button>
                    <button
                      className="min-h-[48px] px-4 py-2 rounded-lg bg-[#e1e8fd] text-[#141b2b] font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#dce2f7] transition-colors active:scale-[0.98]"
                      onClick={handleEmergencyCall}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px] text-[#ba1a1a]">
                        phone_in_talk
                      </span>
                      <span>{t.emergencySupport}</span>
                    </button>
                  </div>

                  <div className="pl-2 pt-1 flex items-center gap-1.5 text-[#ba1a1a] font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[15px]">error</span>
                    <span>
                      {language === 'hi'
                        ? 'स्थिति: अनसुलझा (12 मिनट में तकनीकी टीम को ऑटो-सूचना)'
                        : alert.statusText}
                    </span>
                  </div>
                </article>
              );
            }

            // Card 2: Expiry Alert
            if (alert.id === 'alt-2' && !alert.resolved) {
              return (
                <article
                  key={alert.id}
                  className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-3 transition-all relative overflow-hidden border border-[#e0e6ed]/60"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#51b2fe]"></div>
                  <div className="flex items-start justify-between gap-2 pl-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#cee5ff] text-[#00436a] font-label-sm text-label-sm font-bold tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00639a]"></span>
                      {language === 'hi' ? 'जल्द समाप्त होने वाला' : alert.severityTag}
                    </span>
                    <span className="font-label-sm text-label-sm text-[#40493d] shrink-0 flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {language === 'hi' ? '42 मिनट पहले' : alert.timeAgo}
                    </span>
                  </div>

                  <div className="pl-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#cee5ff] flex items-center justify-center text-[#00639a] shrink-0">
                        <span className="material-symbols-outlined text-[20px]">hourglass_bottom</span>
                      </div>
                      <div>
                        <h2 className="font-headline-md text-headline-md text-[#141b2b] leading-tight font-bold">
                          {language === 'hi' ? 'शेल्फ-लाइफ समाप्त होने के करीब' : alert.title}
                        </h2>
                        <span className="font-label-sm text-label-sm text-[#445963]">
                          {language === 'hi' ? 'उपज गुणवत्ता जोखिम विंडो' : alert.statusText}
                        </span>
                      </div>
                    </div>

                    <p className="font-body-sm text-body-sm text-[#40493d] leading-relaxed">
                      {language === 'hi'
                        ? 'बैच #TG-8810 (हरी पालक - 60 किग्रा) सुरक्षित शेल्फ-लाइफ के 90% स्तर पर पहुंच गया है। ताज़गी बनाए रखने के लिए 18 घंटे शेष हैं।'
                        : alert.description}
                    </p>

                    {/* Visual Shelf Life Progress Bar */}
                    <div className="space-y-1 bg-[#f1f3ff] p-2.5 rounded-lg">
                      <div className="flex justify-between font-label-sm text-label-sm font-semibold">
                        <span className="text-[#40493d]">
                          {language === 'hi' ? 'बैच आयु: 4.8 / 5.0 दिन' : 'Batch Age: 4.8 / 5.0 Days'}
                        </span>
                        <span className="text-[#00639a] font-bold">
                          {language === 'hi' ? '18 घंटे शेष' : '18 hrs left'}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-[#dce2f7] overflow-hidden">
                        <div className="h-full bg-[#00639a] rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="pl-2 pt-1">
                    <button
                      className="w-full min-h-[48px] px-4 py-2 rounded-lg bg-[#00639a] text-white font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 shadow-sm active:scale-[0.98] transition-transform hover:bg-[#004a75]"
                      onClick={() => handleScheduleDispatch(alert.id)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px]">local_shipping</span>
                      <span>{t.scheduleImmediateDispatch}</span>
                    </button>
                  </div>
                </article>
              );
            }

            // Card 3: Capacity Alert
            if (alert.id === 'alt-3' && !alert.resolved) {
              return (
                <article
                  key={alert.id}
                  className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-3 transition-all relative overflow-hidden border border-[#e0e6ed]/60"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#0d631b]"></div>
                  <div className="flex items-start justify-between gap-2 pl-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#e1e8fd] text-[#40493d] font-label-sm text-label-sm font-bold tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0d631b]"></span>
                      {language === 'hi' ? 'क्षमता अलर्ट' : alert.severityTag}
                    </span>
                    <span className="font-label-sm text-label-sm text-[#40493d] shrink-0 flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {language === 'hi' ? '2 घंटे पहले' : alert.timeAgo}
                    </span>
                  </div>

                  <div className="pl-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#e1e8fd] flex items-center justify-center text-[#0d631b] shrink-0">
                        <span className="material-symbols-outlined text-[20px]">inventory_2</span>
                      </div>
                      <div>
                        <h2 className="font-headline-md text-headline-md text-[#141b2b] leading-tight font-bold">
                          {language === 'hi' ? 'खाली जगह उपलब्ध' : alert.title}
                        </h2>
                        <span className="font-label-sm text-label-sm text-[#445963]">
                          {language === 'hi' ? 'चैंबर रैक सेक्शन B खाली' : alert.statusText}
                        </span>
                      </div>
                    </div>

                    <p className="font-body-sm text-body-sm text-[#40493d] leading-relaxed">
                      {language === 'hi'
                        ? 'चैंबर #1 में अब 180 किग्रा जगह उपलब्ध है। नई फसल के प्री-कूलिंग और इनटेक के लिए तैयार।'
                        : alert.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 bg-[#f1f3ff] p-2.5 rounded-lg">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-[#445963]">
                          {language === 'hi' ? 'वर्तमान भरा हुआ' : 'Current Occupancy'}
                        </span>
                        <span className="font-label-lg text-label-lg font-bold text-[#141b2b]">
                          320 / 500 kg (64%)
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-[#445963]">
                          {language === 'hi' ? 'अगला प्री-कूल चक्र' : 'Next Pre-chill Cycle'}
                        </span>
                        <span className="font-label-lg text-label-lg font-bold text-[#0d631b]">
                          {language === 'hi' ? '45 मिनट में' : 'In 45 Mins'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pl-2 pt-1">
                    <button
                      className="w-full min-h-[48px] px-4 py-2 rounded-lg bg-[#e1e8fd] text-[#141b2b] font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#dce2f7] transition-colors active:scale-[0.98]"
                      onClick={() => handleOpenIntakeSlot(alert.id)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px] text-[#0d631b]">add_box</span>
                      <span>{t.openIntakeSlot}</span>
                    </button>
                  </div>
                </article>
              );
            }

            // Card 4: Verification Alert
            if (alert.id === 'alt-4' && !alert.resolved) {
              return (
                <article
                  key={alert.id}
                  className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-3 transition-all relative overflow-hidden border border-[#e0e6ed]/60"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#5c717b]"></div>
                  <div className="flex items-start justify-between gap-2 pl-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#dce2f7] text-[#40493d] font-label-sm text-label-sm font-bold tracking-wider uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#445963]"></span>
                      {language === 'hi' ? 'सत्यापन आवश्यक' : alert.severityTag}
                    </span>
                    <span className="font-label-sm text-label-sm text-[#40493d] shrink-0 flex items-center gap-1 font-medium">
                      <span className="material-symbols-outlined text-[14px]">schedule</span>
                      {language === 'hi' ? 'कल, 18:20' : alert.timeAgo}
                    </span>
                  </div>

                  <div className="pl-2 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#dce2f7] flex items-center justify-center text-[#40493d] shrink-0">
                        <span className="material-symbols-outlined text-[20px]">qr_code_scanner</span>
                      </div>
                      <div>
                        <h2 className="font-headline-md text-headline-md text-[#141b2b] leading-tight font-bold">
                          {language === 'hi' ? 'सत्यापन विफल - फसल जानकारी पुनः दर्ज करें' : alert.title}
                        </h2>
                        <span className="font-label-sm text-label-sm text-[#445963]">
                          {language === 'hi' ? 'इनटेक बे रजिस्ट्री गेट' : alert.statusText}
                        </span>
                      </div>
                    </div>

                    <p className="font-body-sm text-body-sm text-[#40493d] leading-relaxed">
                      {language === 'hi'
                        ? 'आवक बैच #TG-8994 पर बारकोड स्कैन मानक फसल प्रोफ़ाइल से मेल नहीं खाया। सेंसर प्रोफ़ाइल सामान्य उत्पाद पर सेट है।'
                        : alert.description}
                    </p>

                    <div className="bg-[#f1f3ff] p-2 rounded-lg flex items-center gap-2 text-[#40493d]">
                      <span className="material-symbols-outlined text-[18px] text-[#445963]">info</span>
                      <span className="font-label-sm text-label-sm">
                        {language === 'hi'
                          ? 'मैनुअल फसल किस्म, वजन सत्यापन और इष्टतम आर्द्रता टैग आवश्यक है।'
                          : 'Requires manual crop variety, weight verification, and optimal humidity tag.'}
                      </span>
                    </div>
                  </div>

                  <div className="pl-2 pt-1">
                    <button
                      className="w-full min-h-[48px] px-4 py-2 rounded-lg bg-[#e1e8fd] text-[#141b2b] font-label-lg text-label-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#dce2f7] transition-colors active:scale-[0.98]"
                      onClick={() => handleManualOverride(alert.id)}
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[20px] text-[#445963]">edit_note</span>
                      <span>{t.resubmitProductData}</span>
                    </button>
                  </div>
                </article>
              );
            }

            // Default fallback for resolved alerts
            return (
              <article
                key={alert.id}
                className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-2 border border-[#e0e6ed]/60"
              >
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm bg-[#a3f69c] text-[#005312] px-2 py-0.5 rounded-full font-bold">
                    {language === 'hi' ? 'हल किया गया (RESOLVED)' : 'RESOLVED'}
                  </span>
                  <span className="text-xs text-[#445963]">{alert.timeAgo}</span>
                </div>
                <h3 className="font-bold text-[#141b2b]">
                  {getLocalizedAlertTitle(alert.id, alert.title)}
                </h3>
                <p className="text-xs text-[#40493d]">
                  {getLocalizedAlertDesc(alert.id, alert.description)}
                </p>
              </article>
            );
          })
        )}
      </div>

      {/* System Diagnostics Summary Card */}
      <section className="mt-4 bg-[#f1f3ff] rounded-xl p-4 shadow-xs space-y-3 border border-[#e0e6ed]/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0d631b] animate-pulse"></span>
            <h3 className="font-label-lg text-label-lg text-[#141b2b] font-bold">
              {t.systemDiagnosticsSummary}
            </h3>
          </div>
          <span className="font-label-sm text-label-sm text-[#0d631b] font-bold bg-white px-2 py-0.5 rounded-full shadow-xs">
            {t.hardwareHealthy}
          </span>
        </div>

        {/* Probe Cluster Matrix */}
        <div className="grid grid-cols-3 gap-2">
          <div className="bg-white p-2.5 rounded-lg flex flex-col items-center text-center shadow-xs border border-[#e0e6ed]/40">
            <span className="material-symbols-outlined text-[20px] text-[#0d631b] mb-0.5">
              device_thermostat
            </span>
            <span className="font-telemetry-num text-headline-md text-[#141b2b] leading-tight font-bold">
              4/4
            </span>
            <span className="font-label-sm text-label-sm text-[#40493d]">{t.tempProbes}</span>
          </div>

          <div className="bg-white p-2.5 rounded-lg flex flex-col items-center text-center shadow-xs border border-[#e0e6ed]/40">
            <span className="material-symbols-outlined text-[20px] text-[#00639a] mb-0.5">
              humidity_mid
            </span>
            <span className="font-telemetry-num text-headline-md text-[#141b2b] leading-tight font-bold">
              2/2
            </span>
            <span className="font-label-sm text-label-sm text-[#40493d]">{t.humidityProbes}</span>
          </div>

          <div className="bg-white p-2.5 rounded-lg flex flex-col items-center text-center shadow-xs border border-[#e0e6ed]/40">
            <span className="material-symbols-outlined text-[20px] text-[#005312] mb-0.5">
              solar_power
            </span>
            <span className="font-telemetry-num text-headline-md text-[#141b2b] leading-tight font-bold">
              1/1
            </span>
            <span className="font-label-sm text-label-sm text-[#40493d]">{t.solarInverter}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-white/70 p-2 rounded-lg text-[#40493d] font-label-sm text-label-sm border border-[#e0e6ed]/40">
          <span className="material-symbols-outlined text-[16px] text-[#0d631b]">verified_user</span>
          <span>
            {t.probesPassText}
          </span>
        </div>

        <div className="pt-1 flex justify-end">
          <button
            className="min-h-[40px] px-3 py-1.5 rounded-lg bg-[#e1e8fd] text-[#141b2b] font-label-sm text-label-sm font-semibold flex items-center gap-1.5 hover:bg-[#dce2f7] transition-colors active:scale-95"
            onClick={handleRunDiagnostics}
            disabled={testingDiagnostics}
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[16px] text-[#445963] ${
                testingDiagnostics ? 'animate-spin' : ''
              }`}
            >
              refresh
            </span>
            <span>{testingDiagnostics ? t.testingBus : t.runSelfTest}</span>
          </button>
        </div>
      </section>
    </div>
  );
};
