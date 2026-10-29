import React from 'react';
import { AppScreen } from '../types';
import { GOTHIC_LOGO_URL } from '../data/products';

interface HeaderProps {
  currentScreen: AppScreen;
  cartCount: number;
  onNavigate: (screen: AppScreen) => void;
  onOpenProfile: () => void;
  onBack?: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  cartCount,
  onNavigate,
  onOpenProfile,
  onBack,
  title,
}) => {
  const isStackScreen = currentScreen === 'product-detail' || currentScreen === 'checkout' || currentScreen === 'order-confirmation';

  const getScreenTitle = () => {
    if (title) return title;
    switch (currentScreen) {
      case 'product-detail':
        return 'Карточка Десерта';
      case 'checkout':
        return 'Оформление Заказа';
      case 'order-confirmation':
        return 'Статус Заказа';
      case 'cart':
        return 'Ваша Корзина';
      case 'orders':
        return 'История Заказов';
      case 'search':
        return 'Поиск Сладостей';
      default:
        return 'Готические Сладости';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#131315]/90 backdrop-blur-xl border-b border-[#2a181c] shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-between gap-3">
        {/* Left side: Back button or Logo + Title */}
        {isStackScreen ? (
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onBack || (() => onNavigate('catalog'))}
              aria-label="Назад"
              className="w-10 h-10 -ml-1 rounded-full flex items-center justify-center text-[#e5e1e4] hover:text-[#ffb3ad] hover:bg-[#201f21] active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
            <img
              src={GOTHIC_LOGO_URL}
              alt="Nocturne Sweets Logo"
              className="h-7 w-auto object-contain flex-shrink-0 cursor-pointer"
              onClick={() => onNavigate('catalog')}
            />
          </div>
        ) : (
          <div
            className="flex items-center gap-3 min-w-0 cursor-pointer group"
            onClick={() => onNavigate('catalog')}
          >
            <img
              src={GOTHIC_LOGO_URL}
              alt="Nocturne Sweets Logo"
              className="h-9 w-auto object-contain flex-shrink-0 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col truncate">
              <span className="font-serif-gothic text-[17px] font-bold text-[#e5e1e4] tracking-tight truncate leading-tight group-hover:text-[#ffb3ad] transition-colors">
                Готические Сладости
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff5451] animate-pulse"></span>
                <span className="font-montserrat text-[10px] uppercase tracking-widest text-[#ae8784] font-semibold">
                  г. Астана • Доставка 45 мин
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Center title if stack screen */}
        {isStackScreen && (
          <h1 className="font-serif-gothic text-[17px] font-semibold text-[#e5e1e4] truncate text-center flex-1 px-2">
            {getScreenTitle()}
          </h1>
        )}

        {/* Right side: Cart Icon & Profile Avatar */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => onNavigate('cart')}
            aria-label="Корзина"
            className={`relative w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              currentScreen === 'cart'
                ? 'text-[#ff5451] bg-[#2a2a2c]'
                : 'text-[#e5e1e4] hover:text-[#ffb3ad] hover:bg-[#201f21]'
            }`}
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-[#ff5451] text-[#5c0008] font-montserrat text-[11px] font-bold rounded-full flex items-center justify-center leading-none shadow-[0_0_8px_rgba(255,84,81,0.6)]">
                {cartCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenProfile}
            aria-label="Профиль"
            className="w-8 h-8 rounded-full bg-gradient-to-br from-[#8f1019] to-[#ff5451] flex items-center justify-center flex-shrink-0 text-[#e5e1e4] hover:ring-2 hover:ring-[#ff5451] active:scale-95 transition-all shadow-[0_0_12px_rgba(255,84,81,0.3)]"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>
        </div>
      </div>
    </header>
  );
};
