import React from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-24 left-4 right-4 z-50 max-w-md mx-auto animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-[#293040] text-[#edf0ff] px-4 py-3 rounded-xl shadow-xl flex items-center justify-between gap-3 border border-white/10">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[20px] text-[#a3f69c]">
            {icon}
          </span>
          <span className="font-body-sm text-body-sm font-medium">
            {message}
          </span>
        </div>
        <button
          className="text-[#edf0ff]/80 hover:text-[#edf0ff] p-1 rounded-lg focus:outline-none"
          onClick={onClose}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>
    </div>
  );
};
