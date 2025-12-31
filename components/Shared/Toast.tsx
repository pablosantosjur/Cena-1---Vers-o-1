
import React from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: (
      <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 text-[#FF0000]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 text-[#AAAAAA]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  const bgColors = {
    success: 'bg-[#272727] border-emerald-500/20',
    error: 'bg-[#272727] border-[#FF0000]/20',
    info: 'bg-[#272727] border-[#3F3F3F]',
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-right-10 fade-in duration-300">
      <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl ${bgColors[type]} min-w-[280px]`}>
        <div className="flex-shrink-0">{icons[type]}</div>
        <p className="text-sm font-bold text-[#F1F1F1] flex-1">{message}</p>
        <button onClick={onClose} className="text-[#AAAAAA] hover:text-[#F1F1F1] transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// Helper global para disparar toasts
export const notify = (message: string, type: ToastType = 'success') => {
  window.dispatchEvent(new CustomEvent('app-toast', { detail: { message, type } }));
};
