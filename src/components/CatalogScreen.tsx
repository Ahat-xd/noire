import React, { useState } from 'react';
import { Product } from '../types';
import { CATEGORIES, HERO_BANNER_IMG } from '../data/products';

interface CatalogScreenProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, selectedWeight?: string, e?: React.MouseEvent) => void;
  favorites: string[];
  onToggleFavorite: (productId: string, e: React.MouseEvent) => void;
  onOpenFilterModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CatalogScreen: React.FC<CatalogScreenProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  favorites,
  onToggleFavorite,
  onOpenFilterModal,
  searchQuery,
  onSearchChange,
}) => {
  const [addedProductId, setAddedProductId] = useState<string | null>(null);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, product.weightOptions[0]?.grams, e);
    setAddedProductId(product.id);
    setTimeout(() => {
      setAddedProductId((current) => (current === product.id ? null : current));
    }, 1400);
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'Все' || p.category === selectedCategory;
    const matchesSearch =
      !searchQuery.trim() ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col w-full pb-24 pt-2">
      {/* Search Bar Section */}
      <section className="px-4 pt-2 pb-1">
        <div className="relative flex items-center w-full">
          <span className="material-symbols-outlined absolute left-3.5 text-[#ae8784] pointer-events-none text-[20px]">
            search
          </span>
          <input
            aria-label="Поиск сладостей"
            className="w-full bg-[#1b1b1d] text-[#e5e1e4] placeholder:text-[#ae8784]/70 pl-11 pr-11 py-3 rounded-lg font-inter text-[14px] focus:outline-none focus:bg-[#201f21] focus:ring-1 focus:ring-[#ff5451] transition-all shadow-inner border border-[#2a181c]"
            placeholder="Поиск сладостей (шоколад, мармелад, Kinder)..."
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button
            onClick={onOpenFilterModal}
            aria-label="Фильтры вкуса"
            className="absolute right-2.5 text-[#ae8784] hover:text-[#ffb3ad] transition-colors flex items-center justify-center p-1.5 rounded-md hover:bg-[#2a2a2c]"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </button>
        </div>
      </section>

      {/* Atmospheric Hero Showcase Banner */}
      <section className="px-4 py-3">
        <div className="relative overflow-hidden rounded-xl bg-[#201f21] border border-[#2a181c] shadow-[0_16px_36px_rgba(0,0,0,0.85)] group">
          <div
            className="bg-cover bg-center w-full min-h-[220px] relative flex flex-col justify-end p-4 transition-transform duration-700 group-hover:scale-[1.02]"
            style={{ backgroundImage: `url('${HERO_BANNER_IMG}')` }}
          >
            {/* Dark Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-[#0e0e10]/70 to-transparent"></div>

            <div className="relative z-10 flex flex-col gap-1.5">
              <div className="inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded bg-[#8f1019]/90 text-[#ffdad7] font-montserrat text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-[0_0_12px_rgba(255,84,81,0.35)]">
                <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                <span>Сезонное затмение</span>
              </div>
              <h2 className="font-serif-gothic text-[22px] sm:text-[26px] text-[#e5e1e4] font-bold tracking-tight leading-tight drop-shadow-md">
                Хэллоуинский Kinder и Темная Коллекция
              </h2>
              <p className="font-inter text-[13px] text-[#e8bcb9] line-clamp-1 drop-shadow">
                Лимитированные угощения из глубин ночной Астаны
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    const special = products.find((p) => p.id === 'kinder-dark');
                    if (special) onSelectProduct(special);
                  }}
                  className="inline-flex items-center gap-2 bg-[#ff5451] hover:bg-[#8f1019] text-[#5c0008] hover:text-[#ffdad7] font-montserrat text-[12px] font-bold uppercase tracking-wider px-4 py-2.5 rounded shadow-[0_0_18px_rgba(255,84,81,0.4)] active:scale-95 transition-all"
                >
                  <span>Смотреть спецвыпуск</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Express Floating Pill */}
      <section className="px-4 py-1">
        <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-lg bg-[#1b1b1d] border border-[#2a181c] shadow-sm">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#8f1019]/40 flex items-center justify-center flex-shrink-0 text-[#ffb3ad]">
              <span className="material-symbols-outlined text-[18px]">electric_moped</span>
            </div>
            <div className="flex flex-col truncate">
              <span className="font-montserrat text-[12px] font-semibold text-[#e5e1e4] truncate">
                Доставка курьером по всей Астане
              </span>
              <span className="font-inter text-[12px] text-[#ae8784]">
                Прибытие от 45 минут в термобоксе
              </span>
            </div>
          </div>
          <span className="font-montserrat text-[13px] font-bold text-[#ff5451] flex-shrink-0">
            45 мин
          </span>
        </div>
      </section>

      {/* Horizontal Filter Categories */}
      <section className="py-3">
        <div className="flex items-center gap-2 overflow-x-auto px-4 scrollbar-none">
          {CATEGORIES.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`flex-shrink-0 px-3.5 py-2 rounded font-montserrat text-[11px] font-semibold uppercase tracking-wider transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#ff5451] text-[#5c0008] shadow-[0_0_16px_rgba(255,84,81,0.45)]'
                    : 'bg-[#1b1b1d] text-[#ae8784] border border-[#2a181c] hover:text-[#e5e1e4] hover:bg-[#201f21]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* Catalog Section Header */}
      <section className="px-4 pt-1 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-4 bg-[#ff5451] rounded-full"></span>
          <h3 className="font-serif-gothic text-[20px] font-semibold text-[#e5e1e4]">
            {selectedCategory === 'Все' ? 'Мистический каталог' : selectedCategory}
          </h3>
        </div>
        <span className="font-montserrat text-[11px] text-[#ae8784] uppercase tracking-wider font-semibold">
          {filteredProducts.length} позиций
        </span>
      </section>

      {/* Product Grid (2 columns on mobile, responsive) */}
      <section className="px-4 py-1">
        {filteredProducts.length === 0 ? (
          <div className="py-12 flex flex-col items-center justify-center text-center p-6 bg-[#1b1b1d] rounded-xl border border-[#2a181c]">
            <span className="material-symbols-outlined text-[48px] text-[#ae8784] mb-2">
              search_off
            </span>
            <h4 className="font-serif-gothic text-[18px] text-[#e5e1e4] mb-1">
              Ничего не найдено
            </h4>
            <p className="font-inter text-[13px] text-[#ae8784] mb-4 max-w-xs">
              Попробуйте изменить запрос или очистить фильтр категорий.
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                onSelectCategory('Все');
              }}
              className="px-4 py-2 bg-[#201f21] border border-[#3f1d22] text-[#ffb3ad] rounded text-[12px] font-montserrat font-bold uppercase tracking-wider hover:border-[#ff5451]"
            >
              Сбросить поиск
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {filteredProducts.map((product) => {
              const isFavorite = favorites.includes(product.id);
              const isJustAdded = addedProductId === product.id;

              return (
                <article
                  key={product.id}
                  onClick={() => onSelectProduct(product)}
                  className="flex flex-col bg-[#201f21] rounded-lg overflow-hidden border border-[#2a181c] shadow-lg hover:border-[#8f1019] transition-all duration-300 active:scale-[0.98] cursor-pointer group"
                >
                  {/* Product Image Stage */}
                  <div className="relative w-full aspect-square bg-[#1b1b1d] overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#201f21] via-transparent to-transparent opacity-80 pointer-events-none"></div>

                    {/* Tag badge */}
                    {product.tag && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#ff5451] text-[#5c0008] font-montserrat text-[9px] font-bold uppercase tracking-wider shadow-[0_0_10px_rgba(255,84,81,0.5)]">
                        {product.tag}
                      </span>
                    )}

                    {/* Favorite Button */}
                    <button
                      onClick={(e) => onToggleFavorite(product.id, e)}
                      aria-label="В избранное"
                      className={`absolute top-2 right-2 w-7 h-7 rounded-full bg-[#0e0e10]/75 backdrop-blur-sm flex items-center justify-center transition-all ${
                        isFavorite
                          ? 'text-[#ff5451] shadow-[0_0_8px_rgba(255,84,81,0.6)]'
                          : 'text-[#e5e1e4] hover:text-[#ffb3ad]'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : undefined}
                      >
                        favorite
                      </span>
                    </button>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-grow p-2.5 sm:p-3 justify-between">
                    <div>
                      <span className="font-montserrat text-[10px] text-[#ae8784] uppercase tracking-wider block truncate font-medium">
                        {product.subtitle}
                      </span>
                      <h4 className="font-serif-gothic text-[15px] sm:text-[16px] leading-snug font-semibold text-[#e5e1e4] line-clamp-2 mt-1 group-hover:text-[#ffb3ad] transition-colors">
                        {product.title}
                      </h4>
                    </div>

                    <div className="mt-3 flex flex-col gap-2">
                      <div className="flex items-baseline justify-between">
                        <span className="font-montserrat text-[16px] font-bold text-[#ffb3ad]">
                          {product.price.toLocaleString('ru-RU')} ₸
                        </span>
                        <span className="font-montserrat text-[10px] text-[#ae8784]">
                          {product.baseWeight}
                        </span>
                      </div>

                      {/* Add to Cart button */}
                      <button
                        onClick={(e) => handleQuickAdd(product, e)}
                        className={`w-full py-2 px-2 rounded flex items-center justify-center gap-1.5 font-montserrat text-[11px] font-bold uppercase tracking-wider transition-all duration-200 active:scale-95 ${
                          isJustAdded
                            ? 'bg-[#8f1019] text-[#ffdad7] shadow-[0_0_12px_rgba(143,16,25,0.7)]'
                            : 'bg-[#ff5451] hover:bg-[#8f1019] text-[#5c0008] hover:text-[#ffdad7] shadow-[0_0_12px_rgba(255,84,81,0.3)]'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {isJustAdded ? 'done' : 'shopping_bag'}
                        </span>
                        <span>{isJustAdded ? 'Добавлено' : 'В корзину'}</span>
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Astanian Night Courier Guarantee Note */}
      <section className="px-4 pt-4">
        <div className="p-4 rounded-xl bg-[#1b1b1d] border border-[#2a181c] flex flex-col gap-2 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff5451] text-[22px]">
              verified
            </span>
            <h4 className="font-serif-gothic text-[17px] font-semibold text-[#e5e1e4]">
              Быстрая доставка по Астане
            </h4>
          </div>
          <p className="font-inter text-[13px] text-[#e8bcb9] leading-relaxed">
            Все сладости перевозятся в специализированных затемненных термобоксах с контролем температуры, сохраняя форму шоколада и безупречный глянец глазури в любую погоду столицы.
          </p>
          <div className="flex items-center justify-between pt-1 border-t border-[#2a181c] mt-1">
            <div className="flex items-center gap-1.5 text-[#ae8784]">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span className="font-montserrat text-[11px] font-medium">Ежедневно: 11:00 — 02:00</span>
            </div>
            <span className="font-montserrat text-[11px] text-[#ff5451] uppercase font-bold tracking-wider">
              Ночной тариф 0₸
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
