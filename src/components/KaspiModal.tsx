import React, { useState, useEffect } from 'react';

interface KaspiModalProps {
  amount: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirmPayment: () => void;
}

export const KaspiModal: React.FC<KaspiModalProps> = ({
  amount,
  isOpen,
  onClose,
  onConfirmPayment,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(300);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setSecondsLeft(300);
    const interval = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirmPayment();
    }, 1000);
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-[#1b1b1d] border border-[#ff5451]/50 rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,84,81,0.2)] flex flex-col items-center text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#201f21] hover:bg-[#2a2a2c] text-[#ae8784] hover:text-[#e5e1e4] flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Kaspi Brand Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-7 h-7 rounded-lg bg-[#f14635] flex items-center justify-center text-white font-bold text-[14px]">
            K
          </div>
          <span className="font-montserrat text-[16px] font-bold text-white tracking-wide">
            Kaspi QR
          </span>
        </div>

        <p className="font-inter text-[13px] text-[#ae8784] mb-3">
          Отсканируйте QR-код в приложении Kaspi.kz
        </p>

        {/* Amount */}
        <div className="mb-4 py-1.5 px-4 rounded-full bg-[#201f21] border border-[#2a181c]">
          <span className="font-montserrat text-[11px] text-[#ae8784] uppercase tracking-wider mr-2">
            К оплате:
          </span>
          <span className="font-montserrat text-[18px] font-bold text-[#ff5451]">
            {amount.toLocaleString('ru-RU')} ₸
          </span>
        </div>

        {/* Styled Gothic QR Box */}
        <div className="relative p-3.5 bg-white rounded-xl shadow-[0_0_20px_rgba(255,84,81,0.3)] mb-4">
          <svg className="w-48 h-48" viewBox="0 0 160 160" fill="none">
            {/* Corner Markers */}
            <rect x="10" y="10" width="40" height="40" rx="4" fill="#131315" />
            <rect x="18" y="18" width="24" height="24" rx="2" fill="white" />
            <rect x="24" y="24" width="12" height="12" fill="#8f1019" />

            <rect x="110" y="10" width="40" height="40" rx="4" fill="#131315" />
            <rect x="118" y="18" width="24" height="24" rx="2" fill="white" />
            <rect x="124" y="24" width="12" height="12" fill="#8f1019" />

            <rect x="10" y="110" width="40" height="40" rx="4" fill="#131315" />
            <rect x="18" y="118" width="24" height="24" rx="2" fill="white" />
            <rect x="24" y="124" width="12" height="12" fill="#8f1019" />

            {/* Pattern Dots */}
            <rect x="58" y="14" width="8" height="8" rx="1" fill="#131315" />
            <rect x="74" y="14" width="8" height="8" rx="1" fill="#131315" />
            <rect x="90" y="14" width="8" height="8" rx="1" fill="#8f1019" />

            <rect x="58" y="30" width="8" height="8" rx="1" fill="#8f1019" />
            <rect x="74" y="30" width="8" height="8" rx="1" fill="#131315" />
            <rect x="90" y="30" width="8" height="8" rx="1" fill="#131315" />

            <rect x="14" y="58" width="8" height="8" rx="1" fill="#131315" />
            <rect x="30" y="58" width="8" height="8" rx="1" fill="#131315" />
            <rect x="46" y="58" width="8" height="8" rx="1" fill="#8f1019" />
            <rect x="62" y="58" width="8" height="8" rx="1" fill="#131315" />
            <rect x="78" y="58" width="8" height="8" rx="1" fill="#8f1019" />
            <rect x="94" y="58" width="8" height="8" rx="1" fill="#131315" />
            <rect x="110" y="58" width="8" height="8" rx="1" fill="#131315" />
            <rect x="126" y="58" width="8" height="8" rx="1" fill="#8f1019" />
            <rect x="138" y="58" width="8" height="8" rx="1" fill="#131315" />

            {/* Center Gothic Bat Sigil in QR */}
            <circle cx="80" cy="80" r="16" fill="#131315" />
            <path
              d="M72 82C74 79 77 81 80 79C83 81 86 79 88 82C87 86 84 88 80 89C76 88 73 86 72 82Z"
              fill="#ff5451"
            />

            {/* Bottom matrix patterns */}
            <rect x="58" y="114" width="8" height="8" rx="1" fill="#131315" />
            <rect x="74" y="114" width="8" height="8" rx="1" fill="#8f1019" />
            <rect x="90" y="114" width="8" height="8" rx="1" fill="#131315" />
            <rect x="58" y="130" width="8" height="8" rx="1" fill="#8f1019" />
            <rect x="74" y="130" width="8" height="8" rx="1" fill="#131315" />
            <rect x="90" y="130" width="8" height="8" rx="1" fill="#8f1019" />
            <rect x="110" y="94" width="8" height="8" rx="1" fill="#131315" />
            <rect x="126" y="94" width="8" height="8" rx="1" fill="#131315" />
            <rect x="110" y="126" width="8" height="8" rx="1" fill="#8f1019" />
            <rect x="126" y="126" width="8" height="8" rx="1" fill="#131315" />
          </svg>
        </div>

        {/* Timer */}
        <div className="flex items-center gap-1.5 text-[#ae8784] font-montserrat text-[11px] mb-4">
          <span className="material-symbols-outlined text-[15px]">timer</span>
          <span>
            QR-код действителен: {minutes}:{seconds < 10 ? '0' : ''}
            {seconds}
          </span>
        </div>

        {/* Confirm Payment button */}
        <button
          onClick={handlePay}
          disabled={isProcessing}
          className="w-full py-3.5 bg-[#f14635] hover:bg-[#d63424] text-white font-montserrat text-[12px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_16px_rgba(241,70,53,0.5)] active:scale-95 flex items-center justify-center gap-2"
        >
          {isProcessing ? (
            <span className="animate-pulse">Проверка платежа...</span>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">check_circle</span>
              <span>Оплачено в приложении Kaspi</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
