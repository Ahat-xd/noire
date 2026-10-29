import React, { useState, useEffect } from 'react';
import { CartItem, Product } from '../types';
import { PROMO_CODES } from '../data/products';

interface CartScreenProps {
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onNavigateToCatalog: () => void;
  onProceedToCheckout: (appliedDiscount: number, promoCode: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onNavigateToCatalog,
  onProceedToCheckout,
  onSelectProduct,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>('GOTHIC10');
  const [promoError, setPromoError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(900); // 15:00 min reservation timer

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s} мин`;
  };

  const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);

  let discount = 0;
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const promo = PROMO_CODES[appliedPromo];
    if (promo.discountPercent) {
      discount = Math.round((subtotal * promo.discountPercent) / 100);
    } else if (promo.discountAmount) {
      discount = Math.min(promo.discountAmount, subtotal);
    }
  }

  const deliveryFee = 0; // Free night courier in Astana
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handleApplyPromo = () => {
    const clean = promoInput.trim().toUpperCase();
    if (!clean) return;
    if (PROMO_CODES[clean]) {
      setAppliedPromo(clean);
      setPromoError(null);
      setPromoInput('');
    } else {
      setPromoError('Неверный код. Попробуйте GOTHIC10 или ASTANA');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
  };

  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col w-full pb-28 pt-2 px-4 gap-5">
      {/* Header & Mini Delight Badge */}
      <div className="flex items-baseline justify-between pt-2">
        <div>
          <h1 className="font-serif-gothic text-[26px] sm:text-[30px] font-bold text-[#e5e1e4] tracking-tight">
            Ваша Корзина
          </h1>
          <p className="font-montserrat text-[11px] uppercase tracking-wider text-[#ae8784] font-semibold mt-0.5">
            {totalItemCount}{' '}
            {totalItemCount === 1
              ? 'редкое сокровище'
              : totalItemCount > 1 && totalItemCount < 5
              ? 'редких сокровища'
              : 'редких сокровищ'}
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 bg-[#2a2a2c] border border-[#3f1d22] rounded-full shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ff5451] animate-pulse"></span>
          <span className="font-montserrat text-[11px] text-[#ffdad7] font-bold">
            Бронь {formatTimer(timeLeft)}
          </span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center text-center p-6 bg-[#1b1b1d] rounded-xl border border-[#2a181c]">
          <div className="w-16 h-16 rounded-full bg-[#201f21] border border-[#2a181c] flex items-center justify-center text-[#ae8784] mb-3">
            <span className="material-symbols-outlined text-[32px]">shopping_bag</span>
          </div>
          <h2 className="font-serif-gothic text-[20px] font-bold text-[#e5e1e4] mb-1">
            Корзина пуста
          </h2>
          <p className="font-inter text-[13px] text-[#ae8784] mb-5 max-w-xs">
            Тайные десерты ждут вас в каталоге. Выберите готические сладости для полуночного наслаждения.
          </p>
          <button
            onClick={onNavigateToCatalog}
            className="px-6 py-3 bg-[#ff5451] hover:bg-[#8f1019] text-[#5c0008] hover:text-[#ffdad7] font-montserrat text-[12px] font-bold uppercase tracking-wider rounded-lg shadow-[0_0_16px_rgba(255,84,81,0.4)] active:scale-95 transition-all"
          >
            Перейти в каталог
          </button>
        </div>
      ) : (
        <>
          {/* Cart Items List */}
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="relative flex gap-3 p-3 bg-[#201f21] border border-[#2a181c] rounded-xl shadow-md overflow-hidden group hover:border-[#3f1d22] transition-all"
              >
                {/* Thumbnail */}
                <div
                  onClick={() => onSelectProduct(item.product)}
                  className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-[#0e0e10] cursor-pointer"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10]/80 via-transparent to-transparent"></div>
                </div>

                {/* Details */}
                <div className="flex flex-col justify-between flex-grow min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <div
                      onClick={() => onSelectProduct(item.product)}
                      className="min-w-0 cursor-pointer"
                    >
                      <h2 className="font-serif-gothic text-[15px] font-bold text-[#e5e1e4] truncate leading-tight hover:text-[#ffb3ad] transition-colors">
                        {item.product.title}
                      </h2>
                      <span className="font-montserrat text-[10px] text-[#ae8784] block truncate mt-0.5">
                        {item.selectedWeight} • {item.unitPrice.toLocaleString('ru-RU')} ₸ / шт
                      </span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      aria-label="Удалить позицию"
                      className="text-[#ae8784] hover:text-[#ff5451] p-1 transition-colors flex-shrink-0"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>

                  {/* Quantity Stepper & Line Total */}
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-[#0e0e10] border border-[#2a181c] rounded-md p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#ae8784] hover:text-[#e5e1e4] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[14px]">remove</span>
                      </button>
                      <span className="font-montserrat text-[13px] font-bold px-2 min-w-[20px] text-center text-[#e5e1e4]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#ae8784] hover:text-[#e5e1e4] transition-colors"
                      >
                        <span className="material-symbols-outlined text-[14px]">add</span>
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-montserrat text-[15px] font-bold text-[#ffb3ad]">
                        {(item.unitPrice * item.quantity).toLocaleString('ru-RU')} ₸
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Promo Code Input Group */}
          <div className="flex flex-col gap-1.5 p-3.5 bg-[#1b1b1d] border border-[#2a181c] rounded-xl shadow-sm">
            <span className="font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#ae8784]">
              Промокод или сертификат
            </span>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
                placeholder="GOTHIC10, ASTANA, NOCTURNE"
                className="w-full bg-[#131315] text-[#e5e1e4] placeholder:text-[#ae8784]/60 px-3 py-2 rounded-lg font-montserrat text-[12px] uppercase tracking-wider border border-[#2a181c] focus:outline-none focus:border-[#ff5451]"
              />
              <button
                onClick={handleApplyPromo}
                className="px-4 py-2 bg-[#2a2a2c] hover:bg-[#8f1019] text-[#ffdad7] font-montserrat text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors flex-shrink-0"
              >
                Применить
              </button>
            </div>

            {promoError && (
              <span className="text-[11px] text-[#ff5451] font-inter mt-0.5">{promoError}</span>
            )}

            {appliedPromo && (
              <div className="flex items-center justify-between px-2.5 py-1.5 bg-[#8f1019]/25 border border-[#ff5451]/40 rounded mt-1">
                <div className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#ff5451]">
                    local_activity
                  </span>
                  <span className="font-montserrat text-[11px] font-bold text-[#ffdad7]">
                    {appliedPromo}: {PROMO_CODES[appliedPromo]?.description}
                  </span>
                </div>
                <button
                  onClick={handleRemovePromo}
                  className="text-[#ae8784] hover:text-[#ff5451] text-[11px]"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Order Summary Card */}
          <div className="p-4 bg-[#201f21] border border-[#2a181c] rounded-xl flex flex-col gap-2.5 shadow-md">
            <h3 className="font-montserrat text-[12px] font-bold uppercase tracking-wider text-[#ae8784] mb-1">
              Сводка заказа
            </h3>

            <div className="flex justify-between items-center text-[13px] font-inter text-[#e8bcb9]">
              <span>Сумма заказа ({totalItemCount} поз.)</span>
              <span className="font-montserrat font-bold text-[#e5e1e4]">
                {subtotal.toLocaleString('ru-RU')} ₸
              </span>
            </div>

            <div className="flex justify-between items-center text-[13px] font-inter text-[#e8bcb9]">
              <span>Ночная доставка (г. Астана)</span>
              <div className="flex items-center gap-1.5">
                <span className="line-through text-[#ae8784] text-[11px] font-montserrat">
                  1 200 ₸
                </span>
                <span className="font-montserrat font-bold text-[#ff5451] uppercase text-[11px]">
                  0 ₸ (Бесплатно)
                </span>
              </div>
            </div>

            {discount > 0 && (
              <div className="flex justify-between items-center text-[13px] font-inter text-[#ffb3ad]">
                <span>Скидка по промокоду</span>
                <span className="font-montserrat font-bold">
                  -{discount.toLocaleString('ru-RU')} ₸
                </span>
              </div>
            )}

            <div className="pt-3 border-t border-[#2a181c] flex justify-between items-baseline">
              <span className="font-serif-gothic text-[18px] font-bold text-[#e5e1e4]">
                Итого к оплате
              </span>
              <span className="font-montserrat text-[22px] font-bold text-[#ff5451] drop-shadow-[0_0_12px_rgba(255,84,81,0.4)]">
                {total.toLocaleString('ru-RU')} ₸
              </span>
            </div>
          </div>

          {/* Courier Guarantee Note */}
          <div className="p-3 bg-[#1b1b1d] border border-[#2a181c] rounded-xl flex items-center gap-3">
            <span className="material-symbols-outlined text-[#ff5451] text-[20px] flex-shrink-0">
              lock
            </span>
            <p className="font-inter text-[12px] text-[#ae8784] leading-relaxed">
              Астана: экспресс-доставка курьером в герметичном термобоксе с контролем влажности. Никаких повреждений глазури.
            </p>
          </div>

          {/* Checkout Button */}
          <button
            onClick={() => onProceedToCheckout(discount, appliedPromo || '')}
            className="w-full py-4 bg-[#ff5451] hover:bg-[#8f1019] text-[#5c0008] hover:text-[#ffdad7] font-montserrat text-[13px] font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,84,81,0.5)] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <span>Перейти к оформлению</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </>
      )}
    </div>
  );
};
