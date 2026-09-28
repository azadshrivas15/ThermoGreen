import React from 'react';
import { MANDI_RATES } from '../data/initialData';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface MandiRatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowToast: (msg: string, icon?: string) => void;
  language: Language;
}

export const MandiRatesModal: React.FC<MandiRatesModalProps> = ({
  isOpen,
  onClose,
  onShowToast,
  language,
}) => {
  if (!isOpen) return null;
  const t = translations[language];

  const getMarketName = (market: string) => {
    if (language === 'hi') {
      if (market.includes('Nashik')) return 'नासिक APMC';
      if (market.includes('Pune')) return 'पुणे मार्केट यार्ड';
      if (market.includes('Vashi')) return 'वाशी (नवी मुंबई) APMC';
      if (market.includes('Surat')) return 'सूरत APMC';
    }
    return market;
  };

  const getCommodityName = (commodity: string) => {
    if (language === 'hi') {
      if (commodity.includes('Tomato')) return 'टमाटर (हाइब्रिड)';
      if (commodity.includes('Spinach')) return 'हरी पालक';
      if (commodity.includes('Capsicum')) return 'हरी शिमला मिर्च';
      if (commodity.includes('Strawberry')) return 'स्ट्रॉबेरी (ग्रेड A)';
    }
    return commodity;
  };

  const getRecommendationText = (rec: string) => {
    if (language === 'hi') {
      if (rec === 'Dispatch Now') return 'अभी भेजें';
      if (rec === 'Sell') return 'बिक्री करें';
      if (rec === 'Hold / Store') return 'रोकें / स्टोर रखें';
      if (rec === 'Local Demand') return 'स्थानीय मांग';
    }
    return rec;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col animate-in fade-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm px-5 py-4 border-b border-[#e9edff] flex items-center justify-between z-10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#0d631b] flex items-center justify-center text-white">
              <span className="material-symbols-outlined text-[18px]">trending_up</span>
            </div>
            <div>
              <h2 className="font-headline-md text-headline-md font-bold text-[#141b2b]">
                {t.regionalMandiIntelligence}
              </h2>
              <p className="text-xs text-[#40493d]">
                {t.mandiIntelligenceSubtitle}
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
          <div className="bg-[#e1e8fd] p-3.5 rounded-xl border border-[#cee5ff] text-xs">
            <div className="flex items-center justify-between font-bold text-[#004a75] mb-1">
              <span>{t.arbitrageTimingWindow}</span>
              <span className="bg-[#0d631b] text-white px-2 py-0.5 rounded-full text-[10px]">
                {t.optimalNow}
              </span>
            </div>
            <p className="text-[#141b2b] leading-relaxed">
              {t.arbitrageTimingText}
            </p>
          </div>

          <div className="space-y-2.5">
            <h3 className="text-xs font-bold text-[#445963] uppercase tracking-wider">
              {t.wholesaleRealizations}
            </h3>
            {MANDI_RATES.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#f9f9ff] border border-[#e0e6ed] rounded-xl p-3 flex items-center justify-between hover:border-[#0d631b] transition-colors"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#141b2b]">
                      {getMarketName(item.market)}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                        item.changePercent > 0
                          ? 'bg-[#cbffc2] text-[#005312]'
                          : 'bg-[#ffdad6] text-[#ba1a1a]'
                      }`}
                    >
                      {item.changePercent > 0 ? `+${item.changePercent}%` : `${item.changePercent}%`}
                    </span>
                  </div>
                  <div className="text-xs text-[#40493d] mt-0.5">
                    {getCommodityName(item.commodity)} •{' '}
                    {language === 'hi'
                      ? `दैनिक आवक: ${item.arrivalTons} मीट्रिक टन`
                      : `Daily Arrivals: ${item.arrivalTons} MT`}
                  </div>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-base font-bold text-[#141b2b]">
                    ₹{item.modalPricePerKg.toFixed(1)}/{language === 'hi' ? 'किग्रा' : 'kg'}
                  </span>
                  <span
                    className={`text-[11px] font-semibold ${
                      item.recommendation === 'Dispatch Now'
                        ? 'text-[#0d631b]'
                        : item.recommendation === 'Sell'
                        ? 'text-[#00639a]'
                        : 'text-[#445963]'
                    }`}
                  >
                    {getRecommendationText(item.recommendation)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action Footer */}
          <div className="pt-2">
            <button
              onClick={() => {
                onShowToast(
                  language === 'hi'
                    ? 'FPO परिवहन लॉजिस्टिक्स को वाहन आरक्षण हेतु सूचित किया गया!'
                    : 'FPO Transport logistics partner notified for pickup reservation!',
                  'local_shipping'
                );
                onClose();
              }}
              className="w-full h-12 bg-[#0d631b] text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-98 transition-transform"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              {t.reserveReeferVehicle}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
