import React from 'react';
import { BatchItem, Language } from '../types';
import { translations } from '../utils/translations';

interface BatchDetailModalProps {
  batch: BatchItem;
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, icon?: string) => void;
  language: Language;
}

export const BatchDetailModal: React.FC<BatchDetailModalProps> = ({
  batch,
  isOpen,
  onClose,
  onShowToast,
  language,
}) => {
  if (!isOpen) return null;
  const t = translations[language];

  const getCropDisplayName = (crop: string) => {
    if (language === 'hi') {
      const lower = crop.toLowerCase();
      if (lower.includes('tomato')) return 'टमाटर';
      if (lower.includes('spinach')) return 'पालक';
      if (lower.includes('pepper') || lower.includes('capsicum')) return 'शिमला मिर्च';
      if (lower.includes('strawberr')) return 'स्ट्रॉबेरी';
    }
    return crop;
  };

  const lotCode = `LOT-${batch.batchNumber.replace(/[^A-Za-z0-9]/g, '')}-${batch.cropName.substring(0, 3).toUpperCase()}-0926`;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-5 py-4 border-b border-[#e9edff] flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0d631b] text-[24px]">qr_code_scanner</span>
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-[#141b2b]">
                {t.batchTraceabilityTitle}
              </h2>
              <p className="text-xs text-[#40493d]">
                {batch.batchNumber} • {t.certifiedColdChain}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#f1f3ff] text-[#141b2b] flex items-center justify-center hover:bg-[#e9edff] transition-colors"
            type="button"
            aria-label="Close"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {/* QR Code Presentation */}
          <div className="bg-[#f9f9ff] border-2 border-dashed border-[#0d631b]/30 rounded-xl p-5 flex flex-col items-center justify-center text-center">
            {/* Visual SVG QR Code */}
            <div className="w-40 h-40 bg-white p-3 rounded-lg shadow-sm border border-[#e0e6ed] flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#141b2b]">
                <rect x="0" y="0" width="100" height="100" fill="white" />
                {/* Corner markers */}
                <path d="M5,5 h25 v25 h-25 z M10,10 v15 h15 v-15 z M14,14 h7 v7 h-7 z" fill="currentColor" />
                <path d="M70,5 h25 v25 h-25 z M75,10 v15 h15 v-15 z M79,14 h7 v7 h-7 z" fill="currentColor" />
                <path d="M5,70 h25 v25 h-25 z M10,75 v15 h15 v-15 z M14,79 h7 v7 h-7 z" fill="currentColor" />
                {/* Simulated QR data grid */}
                <rect x="35" y="10" width="5" height="5" fill="currentColor" />
                <rect x="45" y="10" width="10" height="5" fill="currentColor" />
                <rect x="60" y="10" width="5" height="5" fill="currentColor" />
                <rect x="35" y="20" width="15" height="5" fill="currentColor" />
                <rect x="55" y="20" width="10" height="5" fill="currentColor" />
                <rect x="10" y="35" width="20" height="5" fill="currentColor" />
                <rect x="35" y="35" width="30" height="5" fill="currentColor" />
                <rect x="70" y="35" width="20" height="5" fill="currentColor" />
                <rect x="15" y="45" width="10" height="10" fill="currentColor" />
                <rect x="30" y="45" width="15" height="5" fill="currentColor" />
                <rect x="50" y="45" width="25" height="5" fill="currentColor" />
                <rect x="80" y="45" width="10" height="5" fill="currentColor" />
                <rect x="35" y="55" width="10" height="10" fill="currentColor" />
                <rect x="50" y="55" width="15" height="10" fill="currentColor" />
                <rect x="70" y="55" width="15" height="5" fill="currentColor" />
                <rect x="35" y="70" width="25" height="5" fill="currentColor" />
                <rect x="65" y="70" width="10" height="5" fill="currentColor" />
                <rect x="80" y="70" width="10" height="15" fill="currentColor" />
                <rect x="35" y="80" width="10" height="10" fill="currentColor" />
                <rect x="50" y="80" width="20" height="10" fill="currentColor" />
              </svg>
            </div>
            <span className="font-mono text-xs text-[#0d631b] font-bold mt-2 tracking-wider">
              {lotCode}
            </span>
            <span className="text-[11px] text-[#445963] mt-0.5">
              {t.scanAtMandiGate}
            </span>
          </div>

          {/* Details list */}
          <div className="bg-[#f1f3ff] rounded-xl p-3.5 space-y-2 text-sm">
            <div className="flex justify-between py-1 border-b border-[#e9edff]">
              <span className="text-[#40493d]">{t.cropCultivar}</span>
              <span className="font-bold text-[#141b2b]">
                {getCropDisplayName(batch.cropName)} ({batch.cultivar})
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#e9edff]">
              <span className="text-[#40493d]">{t.netWeightCrates}</span>
              <span className="font-bold text-[#141b2b]">
                {batch.weightKg} {language === 'hi' ? 'किग्रा' : 'kg'} • {batch.crates} {t.cratesLabel}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#e9edff]">
              <span className="text-[#40493d]">{t.storageDestination}</span>
              <span className="font-bold text-[#0d631b]">
                {batch.rackBay} ({language === 'hi' ? (batch.chamberId === 'chamber-2' ? 'चैंबर #2' : 'चैंबर #1') : (batch.chamberId === 'chamber-2' ? 'Chamber #2' : 'Chamber #1')})
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-[#e9edff]">
              <span className="text-[#40493d]">{t.intakeTimestamp}</span>
              <span className="font-semibold text-[#141b2b]">
                {batch.storedDate} • 09:30 AM
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#40493d]">{t.shelfLifePrediction}</span>
              <span className="font-bold text-[#00639a]">
                {language === 'hi'
                  ? `कुल ${batch.shelfLifeDaysTotal} दिन (${batch.shelfLifeDaysLeft} दिन / ${batch.shelfLifeDaysLeft * 24} घंटे शेष)`
                  : `${batch.shelfLifeDaysTotal} Days Total (${batch.shelfLifeDaysLeft * 24}h Optimal Window Left)`}
              </span>
            </div>
          </div>

          {/* Quality Telemetry Certification Pass */}
          <div className="p-3 bg-[#cbffc2]/30 border border-[#0d631b]/20 rounded-xl flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[#0d631b] text-[20px] mt-0.5">verified_user</span>
            <div className="text-xs">
              <span className="font-bold text-[#0d631b] block">{t.thermalGuaranteed}</span>
              <p className="text-[#40493d] mt-0.5 leading-relaxed">
                {t.thermalGuaranteedDesc}
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => {
                onShowToast(
                  language === 'hi'
                    ? 'डिस्पैच QR लेबल थर्मल प्रिंटर पर भेजा गया!'
                    : 'Dispatch QR label sent to thermal printer!',
                  'print'
                );
                onClose();
              }}
              className="h-11 bg-[#0d631b] text-white rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 shadow-sm active:scale-95 transition-transform"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">print</span>
              {t.printCrateTags}
            </button>
            <button
              onClick={() => {
                navigator.clipboard?.writeText?.(`https://veggiecare.app/verify/${lotCode}`);
                onShowToast(
                  language === 'hi'
                    ? 'ट्रेसेबिलिटी लिंक क्लिपबोर्ड पर कॉपी किया गया!'
                    : 'Traceability link copied to clipboard!',
                  'share'
                );
                onClose();
              }}
              className="h-11 bg-[#e9edff] text-[#00639a] rounded-xl font-semibold text-xs flex items-center justify-center gap-1.5 hover:bg-[#e1e8fd] active:scale-95 transition-transform"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">share</span>
              {t.shareCertificate}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
