import React from 'react';
import { AppScreen } from '../types';

interface BottomNavProps {
  currentScreen: AppScreen;
  cartCount: number;
  onNavigate: (screen: AppScreen) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentScreen,
  cartCount,
  onNavigate,
}) => {
  const tabs = [
    {
      id: 'catalog' as AppScreen,
      label: 'Каталог',
      icon: 'auto_stories',
    },
    {
      id: 'search' as AppScreen,
      label: 'Поиск',
      icon: 'search',
    },
    {
      id: 'cart' as AppScreen,
      label: 'Корзина',
      icon: 'shopping_bag',
      badge: cartCount > 0 ? cartCount : undefined,
    },
    {
      id: 'orders' as AppScreen,
      label: 'Заказы',
      icon: 'receipt_long',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0e0e10]/95 backdrop-blur-xl border-t border-[#2a181c] shadow-[0_-4px_24px_rgba(0,0,0,0.7)] safe-pb">
      <div className="max-w-2xl mx-auto flex justify-around items-center h-16 px-2">
        {tabs.map((tab) => {
          const isActive = currentScreen === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center gap-0.5 min-w-[68px] h-full transition-all active:scale-95 ${
                isActive
                  ? 'text-[#ff5451]'
                  : 'text-[#ae8784] hover:text-[#e5e1e4]'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[23px]"
                  style={isActive ? { fontVariationSettings: "'FILL' 1, 'wght' 600" } : undefined}
                >
                  {tab.icon}
                </span>
                {tab.badge !== undefined && (
                  <span className="absolute -top-1 -right-2.5 min-w-[16px] h-[16px] px-1 bg-[#ff5451] text-[#5c0008] font-montserrat text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-[0_0_6px_rgba(255,84,81,0.8)]">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`font-montserrat text-[10px] uppercase tracking-wider font-semibold ${isActive ? 'text-[#ff5451]' : 'text-[#ae8784]'}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
