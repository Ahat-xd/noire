import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailScreenProps {
  product: Product;
  onAddToCart: (product: Product, selectedWeight: string, quantity: number) => void;
  favorites: string[];
  onToggleFavorite: (productId: string, e: React.MouseEvent) => void;
  onBack: () => void;
}

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onAddToCart,
  favorites,
  onToggleFavorite,
  onBack,
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [selectedWeightIndex, setSelectedWeightIndex] = useState(
    Math.min(1, product.weightOptions.length - 1)
  );
  const [quantity, setQuantity] = useState(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState(false);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const currentOption = product.weightOptions[selectedWeightIndex] || {
    grams: product.baseWeight,
    price: product.price,
  };

  const isFavorite = favorites.includes(product.id);
  const unitPrice = currentOption.price;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    onAddToCart(product, currentOption.grams, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
    }, 1500);
  };

  const images = product.images.length > 0 ? product.images : [product.images[0]];

  return (
    <div className="flex flex-col w-full pb-32">
      {/* Visual Showcase / Gallery Slider Area */}
      <div className="relative w-full overflow-hidden bg-[#0e0e10]">
        {/* Ambient Blood Mist Background Glow */}
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8f1019] via-[#0e0e10] to-transparent"></div>

        {/* Media Stage */}
        <div className="relative w-full aspect-[4/5] max-h-[460px]">
          <img
            src={images[activeSlide] || images[0]}
            alt={product.title}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {/* Dark Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-transparent to-[#131315]/40 pointer-events-none"></div>

          {/* Top Badges Floating Overlay */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="px-2.5 py-1 rounded bg-[#8f1019]/90 text-[#ffdad7] font-montserrat text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-lg shadow-black/60 flex items-center gap-1 border border-[#ff5451]/30">
                <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  local_fire_department
                </span>
                {product.tag || 'Gothic Special'}
              </span>
              <span className="px-2.5 py-1 rounded bg-[#2a2a2c]/90 text-[#ffb3ad] font-montserrat text-[10px] font-semibold uppercase tracking-wider backdrop-blur-md border border-[#3f1d22]">
                Свежий завоз
              </span>
            </div>

            <button
              onClick={(e) => onToggleFavorite(product.id, e)}
              aria-label="В избранное"
              className={`pointer-events-auto w-9 h-9 rounded-full bg-[#1b1b1d]/80 backdrop-blur-md flex items-center justify-center transition-all active:scale-90 border border-[#2a181c] ${
                isFavorite
                  ? 'text-[#ff5451] shadow-[0_0_10px_rgba(255,84,81,0.6)]'
                  : 'text-[#e5e1e4] hover:text-[#ffb3ad]'
              }`}
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={isFavorite ? { fontVariationSettings: "'FILL' 1" } : undefined}
              >
                favorite
              </span>
            </button>
          </div>

          {/* Gallery Thumbnail Dots / Stepper */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center gap-2 z-10">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  aria-label={`Слайд ${idx + 1}`}
                  onClick={() => setActiveSlide(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    activeSlide === idx
                      ? 'w-6 h-1.5 bg-[#ff5451] shadow-[0_0_8px_rgba(255,84,81,0.8)]'
                      : 'w-2 h-1.5 bg-[#39393b] hover:bg-[#ae8784]'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Section */}
      <div className="px-4 pt-3 flex flex-col gap-5">
        {/* Title & Sensory Indicators */}
        <div className="flex flex-col gap-2">
          <h2 className="font-serif-gothic text-[24px] sm:text-[28px] font-bold text-[#e5e1e4] leading-tight">
            {product.title}
          </h2>

          {/* Sensory Scale Indicators */}
          <div className="flex items-center gap-3 pt-1 flex-wrap">
            <div className="flex items-center gap-1.5">
              <span className="font-montserrat text-[10px] uppercase font-semibold text-[#ae8784]">
                Сладость
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className={`w-3 h-1.5 rounded-full transition-all ${
                      level <= product.sweetness
                        ? 'bg-[#ff5451] shadow-[0_0_6px_rgba(255,84,81,0.5)]'
                        : 'bg-[#353437]'
                    }`}
                  />
                ))}
              </div>
            </div>

            <span className="text-[#353437]">•</span>

            <div className="flex items-center gap-1.5">
              <span className="font-montserrat text-[10px] uppercase font-semibold text-[#ae8784]">
                {product.sourness > 0 ? 'Кислинка' : 'Горчинка'}
              </span>
              <div className="flex gap-1">
                {[1, 2, 3, 4].map((level) => (
                  <span
                    key={level}
                    className={`w-3 h-1.5 rounded-full transition-all ${
                      level <= Math.max(product.sourness, 2)
                        ? 'bg-[#ff5451] shadow-[0_0_6px_rgba(255,84,81,0.5)]'
                        : 'bg-[#353437]'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Price Focus */}
          <div className="flex items-baseline gap-2 pt-2 border-t border-[#2a181c] mt-1">
            <span className="font-montserrat text-[24px] font-bold text-[#ff5451] drop-shadow-[0_0_12px_rgba(255,84,81,0.4)] tracking-wide">
              {unitPrice.toLocaleString('ru-RU')} ₸
            </span>
            <span className="font-montserrat text-[13px] text-[#ae8784]">
              за {currentOption.grams}
            </span>
          </div>
        </div>

        {/* Weight / Grammage Selector */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="font-montserrat text-[12px] font-bold text-[#e5e1e4] uppercase tracking-wider">
              Фасовка
            </span>
            <span className="font-montserrat text-[10px] text-[#ae8784]">
              Герметичный лакированный тубус
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {product.weightOptions.map((opt, idx) => {
              const isSelected = selectedWeightIndex === idx;
              return (
                <button
                  key={opt.grams}
                  onClick={() => setSelectedWeightIndex(idx)}
                  className={`py-3 px-2 rounded text-left flex flex-col justify-between transition-all duration-200 border ${
                    isSelected
                      ? 'bg-[#8f1019]/35 border-[#ff5451] shadow-[0_0_16px_rgba(255,84,81,0.35)]'
                      : 'bg-[#201f21] border-[#2a181c] hover:border-[#3f1d22]'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`font-montserrat text-[12px] ${
                        isSelected ? 'text-[#e5e1e4] font-bold' : 'text-[#e5e1e4]'
                      }`}
                    >
                      {opt.grams}
                    </span>
                    {isSelected && (
                      <span
                        className="material-symbols-outlined text-[#ff5451] text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                    )}
                  </div>
                  <span
                    className={`font-montserrat text-[13px] font-bold mt-1.5 ${
                      isSelected ? 'text-[#ff5451]' : 'text-[#ae8784]'
                    }`}
                  >
                    {opt.price.toLocaleString('ru-RU')} ₸
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Taste Experience Description Card */}
        <div className="p-4 rounded-lg bg-[#1b1b1d] border border-[#2a181c] flex flex-col gap-2 relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-[#8f1019]/10 blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-2 text-[#ffb3ad]">
            <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            <span className="font-montserrat text-[10px] uppercase font-bold tracking-widest">
              Букет и Консистенция
            </span>
          </div>
          <p className="font-inter text-[13px] text-[#e5e1e4] leading-relaxed">
            {product.bouquet || product.description}
          </p>
        </div>

        {/* Composition & Characteristics Accordion */}
        <div className="rounded-lg bg-[#201f21] border border-[#2a181c] overflow-hidden">
          <button
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#2a2a2c]/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ff5451] text-[18px]">
                science
              </span>
              <span className="font-montserrat text-[12px] font-bold text-[#e5e1e4] uppercase tracking-wider">
                Состав и Характеристики
              </span>
            </div>
            <span
              className={`material-symbols-outlined text-[#ae8784] transition-transform duration-300 ${
                isAccordionOpen ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {isAccordionOpen && (
            <div className="p-3.5 pt-0 border-t border-[#2a181c]/60 flex flex-col gap-2.5 font-inter text-[12px] text-[#e8bcb9]">
              <div>
                <span className="font-semibold text-[#e5e1e4]">Состав: </span>
                {product.composition || 'Элитное какао, тростниковый сахар, натуральные экстракты, пектин.'}
              </div>
              {product.calories && (
                <div>
                  <span className="font-semibold text-[#e5e1e4]">Пищевая ценность: </span>
                  {product.calories}
                </div>
              )}
              {product.shelfLife && (
                <div>
                  <span className="font-semibold text-[#e5e1e4]">Срок годности: </span>
                  {product.shelfLife}
                </div>
              )}
              {product.storage && (
                <div>
                  <span className="font-semibold text-[#e5e1e4]">Условия хранения: </span>
                  {product.storage}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Astana Delivery Info Card */}
        <div className="p-3.5 rounded-lg bg-[#1b1b1d] border border-[#2a181c] flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#8f1019]/30 flex items-center justify-center flex-shrink-0 text-[#ff5451]">
            <span className="material-symbols-outlined text-[20px]">two_wheeler</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#e5e1e4]">
              Доставка в термобоксе по Астане
            </span>
            <span className="font-inter text-[12px] text-[#ae8784]">
              Бережная транспортировка при температуре +16°C
            </span>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0e0e10]/95 backdrop-blur-xl border-t border-[#2a181c] px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.8)] safe-pb">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          {/* Quantity Stepper */}
          <div className="flex items-center bg-[#1b1b1d] border border-[#2a181c] rounded-lg p-1">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded flex items-center justify-center text-[#ae8784] hover:text-[#e5e1e4] disabled:opacity-30 disabled:hover:text-[#ae8784] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">remove</span>
            </button>
            <span className="font-montserrat text-[14px] font-bold px-3 text-[#e5e1e4] min-w-[28px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 rounded flex items-center justify-center text-[#ae8784] hover:text-[#e5e1e4] transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">add</span>
            </button>
          </div>

          {/* Total & Add Button */}
          <div className="flex items-center gap-3 flex-grow justify-end">
            <div className="flex flex-col text-right">
              <span className="font-montserrat text-[9px] uppercase tracking-wider text-[#ae8784]">
                Итого к оплате
              </span>
              <span className="font-montserrat text-[16px] font-bold text-[#ffb3ad]">
                {totalPrice.toLocaleString('ru-RU')} ₸
              </span>
            </div>

            <button
              onClick={handleAdd}
              className={`px-5 py-3 rounded-lg font-montserrat text-[12px] font-bold uppercase tracking-wider flex items-center gap-2 transition-all duration-200 active:scale-95 ${
                isAddedFeedback
                  ? 'bg-[#8f1019] text-[#ffdad7] shadow-[0_0_16px_rgba(143,16,25,0.8)]'
                  : 'bg-[#ff5451] hover:bg-[#8f1019] text-[#5c0008] hover:text-[#ffdad7] shadow-[0_0_16px_rgba(255,84,81,0.4)]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {isAddedFeedback ? 'done' : 'shopping_bag'}
              </span>
              <span>{isAddedFeedback ? 'В корзине!' : 'В корзину'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
