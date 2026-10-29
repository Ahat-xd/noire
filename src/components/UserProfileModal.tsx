import React from 'react';
import { Product } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
  ordersCount: number;
  onOpenOrders: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  favoritesCount,
  onOpenFavorites,
  ordersCount,
  onOpenOrders,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-[#1b1b1d] border border-[#2a181c] rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col gap-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Закрыть"
          className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-[#201f21] hover:bg-[#2a2a2c] text-[#ae8784] hover:text-[#e5e1e4] flex items-center justify-center transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* Profile Card Header */}
        <div className="flex items-center gap-3 pt-1">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#8f1019] to-[#ff5451] flex items-center justify-center text-[#ffdad7] font-serif-gothic text-[22px] font-bold shadow-[0_0_16px_rgba(255,84,81,0.4)]">
            К
          </div>
          <div className="flex flex-col">
            <h3 className="font-serif-gothic text-[18px] font-bold text-[#e5e1e4] leading-tight">
              Камила
            </h3>
            <span className="font-montserrat text-[11px] text-[#ffb3ad] font-semibold">
              +7 (707) 842-13-13
            </span>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5451]"></span>
              <span className="font-montserrat text-[9px] uppercase tracking-wider text-[#ae8784] font-bold">
                Nocturne Black VIP
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-2">
          <div
            onClick={() => {
              onClose();
              onOpenOrders();
            }}
            className="p-3 bg-[#201f21] hover:bg-[#2a2a2c] border border-[#2a181c] rounded-xl cursor-pointer transition-colors flex flex-col"
          >
            <span className="font-montserrat text-[10px] text-[#ae8784] uppercase font-bold">
              Заказы
            </span>
            <span className="font-montserrat text-[18px] font-bold text-[#e5e1e4] mt-0.5">
              {ordersCount}
            </span>
          </div>

          <div
            onClick={() => {
              onClose();
              onOpenFavorites();
            }}
            className="p-3 bg-[#201f21] hover:bg-[#2a2a2c] border border-[#2a181c] rounded-xl cursor-pointer transition-colors flex flex-col"
          >
            <span className="font-montserrat text-[10px] text-[#ae8784] uppercase font-bold">
              В избранном
            </span>
            <span className="font-montserrat text-[18px] font-bold text-[#ff5451] mt-0.5">
              {favoritesCount}
            </span>
          </div>
        </div>

        {/* Saved Astana Addresses */}
        <div className="flex flex-col gap-2">
          <span className="font-montserrat text-[11px] uppercase font-bold tracking-wider text-[#ae8784]">
            Сохраненные адреса (Астана)
          </span>
          <div className="flex flex-col gap-1.5 text-[12px] font-inter">
            <div className="p-2.5 rounded-lg bg-[#201f21] border border-[#2a181c] flex items-center justify-between">
              <div className="flex items-center gap-2 truncate">
                <span className="material-symbols-outlined text-[#ff5451] text-[16px]">
                  home
                </span>
                <span className="text-[#e5e1e4] truncate">
                  ул. Достык 18, ЖК Северное Сияние, кв. 45
                </span>
              </div>
              <span className="font-montserrat text-[9px] px-1.5 py-0.5 bg-[#8f1019]/40 text-[#ffdad7] rounded uppercase font-bold ml-1 flex-shrink-0">
                Осн.
              </span>
            </div>

            <div className="p-2.5 rounded-lg bg-[#201f21] border border-[#2a181c] flex items-center gap-2 text-[#ae8784]">
              <span className="material-symbols-outlined text-[16px]">work</span>
              <span className="truncate">пр. Мәңгілік Ел 55/2, БЦ Экспо</span>
            </div>
          </div>
        </div>

        {/* Concierge Hotline */}
        <div className="p-3 rounded-lg bg-[#141418] border border-[#2a181c] flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-montserrat text-[9px] uppercase tracking-wider text-[#ae8784] font-bold">
              Консьерж-сервис Астана
            </span>
            <span className="font-montserrat text-[13px] font-bold text-[#ffb3ad]">
              +7 (7172) 99-88-77
            </span>
          </div>
          <span className="font-montserrat text-[10px] text-[#ae8784] bg-[#201f21] px-2 py-1 rounded">
            24/7
          </span>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-lg bg-[#201f21] hover:bg-[#2a2a2c] border border-[#2a181c] font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#e5e1e4] transition-colors"
        >
          Закрыть
        </button>
      </div>
    </div>
  );
};
