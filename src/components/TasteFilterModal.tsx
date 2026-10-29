import React, { useState } from 'react';
import { CATEGORIES } from '../data/products';

interface TasteFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  maxPrice: number;
  onSelectMaxPrice: (price: number) => void;
  sweetnessFilter: number | null;
  onSelectSweetness: (val: number | null) => void;
  sournessFilter: number | null;
  onSelectSourness: (val: number | null) => void;
}

export const TasteFilterModal: React.FC<TasteFilterModalProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  maxPrice,
  onSelectMaxPrice,
  sweetnessFilter,
  onSelectSweetness,
  sournessFilter,
  onSelectSourness,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-sm bg-[#1b1b1d] border border-[#2a181c] rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#2a181c]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff5451] text-[20px]">
              tune
            </span>
            <h3 className="font-serif-gothic text-[18px] font-bold text-[#e5e1e4]">
              Фильтры и Вкусовой Профиль
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="w-8 h-8 rounded-full bg-[#201f21] hover:bg-[#2a2a2c] text-[#ae8784] hover:text-[#e5e1e4] flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Categories */}
        <div className="flex flex-col gap-2">
          <span className="font-montserrat text-[11px] uppercase font-bold tracking-wider text-[#ae8784]">
            Категория
          </span>
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-1.5 rounded-lg font-montserrat text-[11px] font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#ff5451] text-[#5c0008] shadow-[0_0_10px_rgba(255,84,81,0.4)]'
                    : 'bg-[#201f21] text-[#ae8784] border border-[#2a181c] hover:text-[#e5e1e4]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Sweetness */}
        <div className="flex flex-col gap-2">
          <span className="font-montserrat text-[11px] uppercase font-bold tracking-wider text-[#ae8784]">
            Уровень сладости
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onSelectSweetness(null)}
              className={`py-2 rounded-lg font-montserrat text-[11px] font-semibold border transition-all ${
                sweetnessFilter === null
                  ? 'bg-[#8f1019]/40 border-[#ff5451] text-[#ffdad7]'
                  : 'bg-[#201f21] border-[#2a181c] text-[#ae8784]'
              }`}
            >
              Любой
            </button>
            <button
              onClick={() => onSelectSweetness(2)}
              className={`py-2 rounded-lg font-montserrat text-[11px] font-semibold border transition-all ${
                sweetnessFilter === 2
                  ? 'bg-[#8f1019]/40 border-[#ff5451] text-[#ffdad7]'
                  : 'bg-[#201f21] border-[#2a181c] text-[#ae8784]'
              }`}
            >
              Умеренная (1-2)
            </button>
            <button
              onClick={() => onSelectSweetness(3)}
              className={`py-2 rounded-lg font-montserrat text-[11px] font-semibold border transition-all ${
                sweetnessFilter === 3
                  ? 'bg-[#8f1019]/40 border-[#ff5451] text-[#ffdad7]'
                  : 'bg-[#201f21] border-[#2a181c] text-[#ae8784]'
              }`}
            >
              Насыщенная (3-4)
            </button>
          </div>
        </div>

        {/* Sourness / Tartness */}
        <div className="flex flex-col gap-2">
          <span className="font-montserrat text-[11px] uppercase font-bold tracking-wider text-[#ae8784]">
            Кислинка / Горчинка
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => onSelectSourness(null)}
              className={`py-2 rounded-lg font-montserrat text-[11px] font-semibold border transition-all ${
                sournessFilter === null
                  ? 'bg-[#8f1019]/40 border-[#ff5451] text-[#ffdad7]'
                  : 'bg-[#201f21] border-[#2a181c] text-[#ae8784]'
              }`}
            >
              Все
            </button>
            <button
              onClick={() => onSelectSourness(1)}
              className={`py-2 rounded-lg font-montserrat text-[11px] font-semibold border transition-all ${
                sournessFilter === 1
                  ? 'bg-[#8f1019]/40 border-[#ff5451] text-[#ffdad7]'
                  : 'bg-[#201f21] border-[#2a181c] text-[#ae8784]'
              }`}
            >
              Мягкая
            </button>
            <button
              onClick={() => onSelectSourness(3)}
              className={`py-2 rounded-lg font-montserrat text-[11px] font-semibold border transition-all ${
                sournessFilter === 3
                  ? 'bg-[#8f1019]/40 border-[#ff5451] text-[#ffdad7]'
                  : 'bg-[#201f21] border-[#2a181c] text-[#ae8784]'
              }`}
            >
              Яркая / Экстра
            </button>
          </div>
        </div>

        {/* Max Price */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="font-montserrat text-[11px] uppercase font-bold tracking-wider text-[#ae8784]">
              Максимальная цена
            </span>
            <span className="font-montserrat text-[13px] font-bold text-[#ffb3ad]">
              до {maxPrice.toLocaleString('ru-RU')} ₸
            </span>
          </div>
          <input
            type="range"
            min={400}
            max={1000}
            step={50}
            value={maxPrice}
            onChange={(e) => onSelectMaxPrice(Number(e.target.value))}
            className="w-full accent-[#ff5451] bg-[#201f21] h-1.5 rounded-lg cursor-pointer"
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2 pt-2 border-t border-[#2a181c]">
          <button
            onClick={() => {
              onSelectCategory('Все');
              onSelectMaxPrice(1000);
              onSelectSweetness(null);
              onSelectSourness(null);
            }}
            className="flex-1 py-2.5 rounded-lg border border-[#2a181c] bg-[#201f21] hover:bg-[#2a2a2c] font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#ae8784] hover:text-[#e5e1e4] transition-colors"
          >
            Сбросить
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg bg-[#ff5451] hover:bg-[#8f1019] text-[#5c0008] hover:text-[#ffdad7] font-montserrat text-[11px] font-bold uppercase tracking-wider shadow-[0_0_12px_rgba(255,84,81,0.4)] transition-all"
          >
            Применить
          </button>
        </div>
      </div>
    </div>
  );
};
