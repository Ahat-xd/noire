import React, { useState, useEffect } from 'react';
import { Order } from '../types';

interface AstanaMapModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AstanaMapModal: React.FC<AstanaMapModalProps> = ({
  order,
  isOpen,
  onClose,
}) => {
  const [courierProgress, setCourierProgress] = useState(0.35); // 0 to 1 along path

  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setCourierProgress((prev) => (prev < 0.95 ? prev + 0.05 : 0.3));
    }, 2500);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen || !order) return null;

  // Courier coordinates along an Astana road vector
  // Start: Patisserie at Syganak (x=80, y=240)
  // Waypoint: Near Baiterek (x=160, y=170)
  // Waypoint: Mangilik El (x=240, y=130)
  // End: Delivery target (x=280, y=90)
  const courierX = 80 + courierProgress * (280 - 80);
  const courierY = 240 + courierProgress * (90 - 240) + Math.sin(courierProgress * Math.PI) * -20;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#141418] border border-[#ff5451]/50 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(255,84,81,0.25)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-[#1b1b1d] border-b border-[#2a181c]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5451] animate-ping"></span>
            <div className="flex flex-col">
              <span className="font-serif-gothic text-[16px] font-bold text-[#e5e1e4]">
                Курьер Nocturne • г. Астана
              </span>
              <span className="font-montserrat text-[10px] text-[#ae8784] uppercase font-semibold">
                Заказ #{order.orderNumber} • Маршрут активен
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="w-8 h-8 rounded-full bg-[#201f21] hover:bg-[#2a2a2c] text-[#ae8784] hover:text-[#e5e1e4] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Map Canvas */}
        <div className="relative w-full h-[320px] bg-[#0c0c0e] overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 360 300" fill="none">
            {/* Grid Lines */}
            <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#1f1b20" strokeWidth="0.5" />
            </pattern>
            <rect width="360" height="300" fill="url(#grid)" />

            {/* Ishim (Yesil) River */}
            <path
              d="M0 80 C 100 70, 140 120, 220 100 C 270 85, 310 120, 360 110"
              stroke="#1a2530"
              strokeWidth="24"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M0 80 C 100 70, 140 120, 220 100 C 270 85, 310 120, 360 110"
              stroke="#223344"
              strokeWidth="14"
              fill="none"
              strokeLinecap="round"
            />
            <text x="290" y="105" fill="#3f556b" fontSize="9" fontFamily="Inter" fontStyle="italic">
              р. Есиль
            </text>

            {/* Main Astana Avenues / Streets */}
            {/* Syganak street */}
            <line x1="60" y1="280" x2="160" y2="40" stroke="#252429" strokeWidth="4" />
            <text x="75" y="270" fill="#5e5b66" fontSize="8" fontFamily="Montserrat" transform="rotate(-67 75 270)">
              ул. Сыганак
            </text>

            {/* Turan ave */}
            <line x1="30" y1="220" x2="330" y2="200" stroke="#252429" strokeWidth="4" />
            <text x="180" y="215" fill="#5e5b66" fontSize="8" fontFamily="Montserrat">
              пр. Туран
            </text>

            {/* Kabanbay Batyr ave */}
            <line x1="30" y1="180" x2="330" y2="160" stroke="#252429" strokeWidth="4" />
            <text x="210" y="175" fill="#5e5b66" fontSize="8" fontFamily="Montserrat">
              пр. Кабанбай батыра
            </text>

            {/* Mangilik El ave */}
            <line x1="120" y1="280" x2="330" y2="80" stroke="#352e33" strokeWidth="5" />
            <text x="250" y="145" fill="#8f7a84" fontSize="8" fontFamily="Montserrat" transform="rotate(-43 250 145)">
              пр. Мәңгілік Ел
            </text>

            {/* Landmarks */}
            {/* Khan Shatyr */}
            <circle cx="85" cy="210" r="14" fill="#1b1b20" stroke="#3a3036" strokeWidth="1.5" />
            <text x="85" y="213" fill="#ae8784" fontSize="7" fontFamily="Montserrat" textAnchor="middle">
              Хан Шатыр
            </text>

            {/* Baiterek */}
            <circle cx="165" cy="165" r="10" fill="#201f26" stroke="#ffb3ad" strokeWidth="1" />
            <text x="165" y="168" fill="#ffb3ad" fontSize="7" fontFamily="Montserrat" textAnchor="middle">
              Байтерек
            </text>

            {/* Courier Route Path */}
            <path
              d="M 80 240 Q 140 180 280 90"
              stroke="#ff5451"
              strokeWidth="2.5"
              strokeDasharray="4 4"
              fill="none"
              className="animate-pulse"
            />

            {/* Start point: Nocturne Patisserie */}
            <circle cx="80" cy="240" r="8" fill="#8f1019" stroke="#ff5451" strokeWidth="2" />
            <text x="80" y="260" fill="#e5e1e4" fontSize="8" fontFamily="Montserrat" fontWeight="bold" textAnchor="middle">
              Nocturne Sweets
            </text>

            {/* Destination Target Marker */}
            <circle cx="280" cy="90" r="10" fill="#8f1019" fillOpacity="0.4" />
            <circle cx="280" cy="90" r="6" fill="#ff5451" />
            <text x="280" y="75" fill="#ffb3ad" fontSize="8" fontFamily="Montserrat" fontWeight="bold" textAnchor="middle">
              {order.recipientLandmark || 'Адрес получателя'}
            </text>

            {/* Animated Courier Marker */}
            <g transform={`translate(${courierX - 14}, ${courierY - 14})`}>
              <circle cx="14" cy="14" r="14" fill="#ff5451" fillOpacity="0.3" className="animate-ping" />
              <rect x="2" y="2" width="24" height="24" rx="12" fill="#8f1019" stroke="#ffdad7" strokeWidth="2" />
              <text x="14" y="18" fill="white" fontSize="12" textAnchor="middle" fontFamily="Material Symbols Outlined">
                two_wheeler
              </text>
            </g>
          </svg>

          {/* Telemetry Overlay Pill */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-xl bg-[#131315]/90 border border-[#2a181c] backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff5451] text-[18px]">
                thermostat
              </span>
              <div className="flex flex-col">
                <span className="font-montserrat text-[9px] uppercase tracking-wider text-[#ae8784]">
                  Термобокс
                </span>
                <span className="font-montserrat text-[12px] font-bold text-[#e5e1e4]">
                  +16.2 °C (Идеал)
                </span>
              </div>
            </div>

            <div className="h-6 w-px bg-[#2a2a2c]"></div>

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ffb3ad] text-[18px]">
                speed
              </span>
              <div className="flex flex-col">
                <span className="font-montserrat text-[9px] uppercase tracking-wider text-[#ae8784]">
                  Скорость
                </span>
                <span className="font-montserrat text-[12px] font-bold text-[#e5e1e4]">
                  34 км/ч
                </span>
              </div>
            </div>

            <div className="h-6 w-px bg-[#2a2a2c]"></div>

            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff5451] text-[18px]">
                schedule
              </span>
              <div className="flex flex-col">
                <span className="font-montserrat text-[9px] uppercase tracking-wider text-[#ae8784]">
                  Прибытие
                </span>
                <span className="font-montserrat text-[12px] font-bold text-[#ff5451]">
                  ~ 25 мин
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="p-3.5 bg-[#1b1b1d] border-t border-[#2a181c] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#201f21] flex items-center justify-center text-[#ffb3ad]">
              <span className="material-symbols-outlined text-[16px]">person</span>
            </div>
            <div className="flex flex-col">
              <span className="font-montserrat text-[12px] font-bold text-[#e5e1e4]">
                Курьер Руслан
              </span>
              <span className="font-inter text-[11px] text-[#ae8784]">
                Электроскутер Nocturne #04
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#ff5451] hover:bg-[#8f1019] text-[#5c0008] hover:text-[#ffdad7] font-montserrat text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors"
          >
            Понятно
          </button>
        </div>
      </div>
    </div>
  );
};
