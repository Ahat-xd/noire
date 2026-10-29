export const TOKEN = "9158974919:AAFR1a1cV0dDHxfFatkqBssrumrBBMOqa3E";
export const CHAT_ID = "7380013629";

import React, { useState } from 'react';
import { CartItem, Order } from '../types';

interface CheckoutScreenProps {
  cartItems: CartItem[];
  discount: number;
  promoCode: string;
  onOrderPlaced: (order: Order) => void;
  onBack: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cartItems,
  discount,
  promoCode,
  onOrderPlaced,
  onBack,
}) => {
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('г. Астана, ул. Достык 18, кв. 45');
  const [recipientComment, setRecipientComment] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const deliveryFee = 0;
  const total = Math.max(0, subtotal - discount + deliveryFee);

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!recipientName.trim()) {
      setErrorMessage('Пожалуйста, введите ваше имя (обязательно)');
      return;
    }
    if (!recipientPhone.trim()) {
      setErrorMessage('Пожалуйста, введите номер телефона (обязательно)');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    const now = new Date();
    const dateTime = `${now.toLocaleDateString('ru-RU')} ${now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}`;
    const orderNumber = `NS-${Math.floor(1000 + Math.random() * 9000)}`;

    const itemsText = cartItems
      .map(
        (item, idx) =>
          `${idx + 1}. ${item.product.title} (${item.selectedWeight}) — ${item.quantity} шт. × ${item.unitPrice.toLocaleString('ru-RU')} ₸ = ${(item.unitPrice * item.quantity).toLocaleString('ru-RU')} ₸`
      )
      .join('\n');

    const message = [
      `🛒 Новый заказ #${orderNumber}`,
      ``,
      `📦 Состав заказа:`,
      itemsText,
      ``,
      `💰 Итого к оплате: ${total.toLocaleString('ru-RU')} ₸`,
      promoCode ? `🏷️ Промокод: ${promoCode} (-${discount.toLocaleString('ru-RU')} ₸)` : '',
      ``,
      `👤 Имя: ${recipientName.trim()}`,
      `📞 Телефон: ${recipientPhone.trim()}`,
      `📍 Адрес: ${recipientAddress.trim() || 'Не указан'}`,
      `💬 Комментарий: ${recipientComment.trim() || 'Без комментария'}`,
      `🕒 Дата и время: ${dateTime}`,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const response = await fetch("https://api.telegram.org/bot" + TOKEN + "/sendMessage", {
        method: "POST",
        body: new URLSearchParams({
          chat_id: CHAT_ID,
          text: message,
        }),
      });

      const data = await response.json();

      if (data && data.ok === true) {
        const newOrder: Order = {
          id: `order-${Date.now()}`,
          orderNumber,
          date: dateTime,
          status: 'preparing',
          items: [...cartItems],
          subtotal,
          discount,
          deliveryFee,
          total,
          recipientName: recipientName.trim(),
          recipientPhone: recipientPhone.trim(),
          recipientAddress: recipientAddress.trim(),
          comment: recipientComment.trim(),
          paymentMethod: 'kaspi',
          estimatedMinutes: 40,
        };
        setIsSubmitting(false);
        onOrderPlaced(newOrder);
      } else {
        setIsSubmitting(false);
        setErrorMessage(
          data?.description
            ? `Ошибка Telegram: ${data.description}`
            : 'Не удалось отправить заказ через Telegram Bot API. Попробуйте еще раз.'
        );
      }
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMessage(
        err?.message
          ? `Ошибка соединения: ${err.message}`
          : 'Сетевая ошибка при отправке заказа в Telegram. Проверьте интернет-соединение.'
      );
    }
  };

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 max-w-md mx-auto">
      {/* Progress / Step Indicator */}
      <div className="mt-2 mb-4 flex flex-col gap-1.5">
        <div className="flex items-center justify-between font-montserrat text-[11px] font-bold uppercase tracking-wider text-[#ae8784]">
          <span>Шаг 1 из 2</span>
          <span className="text-[#ff5451]">Оформление Заказа</span>
        </div>
        <div className="w-full h-1.5 bg-[#201f21] rounded-full overflow-hidden flex">
          <div className="w-1/2 h-full bg-[#ff5451] shadow-[0_0_12px_rgba(255,84,81,0.7)] transition-all duration-500"></div>
          <div className="w-1/2 h-full bg-[#353437]/40"></div>
        </div>
      </div>

      {/* Delivery Constraint Banner */}
      <div className="bg-[#1b1b1d] border border-[#2a181c] rounded-xl p-3.5 mb-5 relative overflow-hidden shadow-lg shadow-black/40">
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#8f1019]/15 rounded-full blur-2xl pointer-events-none"></div>
        <div className="flex items-start gap-3 relative z-10">
          <div className="w-9 h-9 rounded-full bg-[#8f1019] flex items-center justify-center flex-shrink-0 text-[#ffdad7] mt-0.5">
            <span className="material-symbols-outlined text-[20px]">local_shipping</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-montserrat text-[11px] font-bold text-[#ffb3ad] tracking-wide uppercase">
              Способ получения
            </span>
            <p className="font-inter text-[13px] text-[#e5e1e4] mt-0.5">
              Только курьерская доставка по г. Астана{' '}
              <span className="text-[#ae8784] font-medium">(Без самовывоза)</span>
            </p>
            <span className="font-montserrat text-[10px] text-[#ffdad7] mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff5451] inline-block animate-pulse"></span>
              Конфиденциальная передача в черной бархатной упаковке
            </span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmitOrder} className="flex flex-col gap-3.5">
        <div className="flex items-center gap-2 mb-1">
          <span className="material-symbols-outlined text-[#ff5451] text-[20px]">
            person_pin
          </span>
          <h2 className="font-serif-gothic text-[18px] font-bold text-[#e5e1e4]">
            Данные получателя
          </h2>
        </div>

        {/* Field: Name (Required) */}
        <div className="flex flex-col gap-1">
          <label className="font-montserrat text-[10px] uppercase font-bold tracking-wider text-[#ae8784] flex items-center gap-1">
            <span>Ваше Имя</span>
            <span className="text-[#ff5451]">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              required
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              placeholder="Алихан или Камила"
              className="w-full bg-[#141418] border border-[#2a181c] text-[#e5e1e4] font-inter text-[14px] rounded-lg px-3.5 py-3 placeholder:text-[#5e3f3c] focus:outline-none focus:border-[#ff5451] shadow-inner transition-all"
            />
            <span className="material-symbols-outlined absolute right-3.5 text-[#5e3f3c] pointer-events-none text-[20px]">
              badge
            </span>
          </div>
        </div>

        {/* Field: Phone (Required) */}
        <div className="flex flex-col gap-1">
          <label className="font-montserrat text-[10px] uppercase font-bold tracking-wider text-[#ae8784] flex items-center gap-1">
            <span>Номер телефона</span>
            <span className="text-[#ff5451]">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="tel"
              required
              value={recipientPhone}
              onChange={(e) => setRecipientPhone(e.target.value)}
              placeholder="+7 (707) 000-00-00"
              className="w-full bg-[#141418] border border-[#2a181c] text-[#e5e1e4] font-montserrat font-bold text-[14px] rounded-lg px-3.5 py-3 placeholder:text-[#5e3f3c] focus:outline-none focus:border-[#ff5451] shadow-inner transition-all"
            />
            <span className="material-symbols-outlined absolute right-3.5 text-[#5e3f3c] pointer-events-none text-[20px]">
              call
            </span>
          </div>
        </div>

        {/* Field: Address */}
        <div className="flex flex-col gap-1">
          <label className="font-montserrat text-[10px] uppercase font-bold tracking-wider text-[#ae8784]">
            Адрес доставки в г. Астана
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="ул. Достык 18, кв. 45"
              className="w-full bg-[#141418] border border-[#2a181c] text-[#e5e1e4] font-inter text-[14px] rounded-lg px-3.5 py-3 placeholder:text-[#5e3f3c] focus:outline-none focus:border-[#ff5451] shadow-inner transition-all"
            />
            <span className="material-symbols-outlined absolute right-3.5 text-[#5e3f3c] pointer-events-none text-[20px]">
              location_on
            </span>
          </div>
        </div>

        {/* Field: Comment */}
        <div className="flex flex-col gap-1">
          <label className="font-montserrat text-[10px] uppercase font-bold tracking-wider text-[#ae8784]">
            Комментарий к заказу
          </label>
          <textarea
            value={recipientComment}
            onChange={(e) => setRecipientComment(e.target.value)}
            placeholder="Оставить у консьержа / домофон 45 / упаковать в подарок"
            rows={2}
            className="w-full bg-[#141418] border border-[#2a181c] text-[#e5e1e4] font-inter text-[13px] rounded-lg p-3 placeholder:text-[#5e3f3c] focus:outline-none focus:border-[#ff5451] shadow-inner resize-none transition-all"
          />
        </div>

        {/* Error Message Box */}
        {errorMessage && (
          <div className="p-3 bg-[#8f1019]/40 border border-[#ff5451] rounded-lg text-[#ffdad7] font-inter text-[13px] flex items-start gap-2 shadow-lg">
            <span className="material-symbols-outlined text-[18px] text-[#ff5451] mt-0.5 flex-shrink-0">
              error
            </span>
            <div className="flex flex-col">
              <span className="font-bold text-[#ffb3ad]">Не удалось отправить заказ</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Order Summary & Final Total */}
        <div className="p-4 bg-[#201f21] border border-[#2a181c] rounded-xl flex flex-col gap-2 my-2">
          <div className="flex justify-between items-center text-[13px] text-[#ae8784] font-inter">
            <span>Позиций в заказе ({cartItems.length})</span>
            <span className="font-montserrat font-bold text-[#e5e1e4]">
              {subtotal.toLocaleString('ru-RU')} ₸
            </span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between items-center text-[13px] text-[#ffb3ad] font-inter">
              <span>Скидка ({promoCode})</span>
              <span className="font-montserrat font-bold">
                -{discount.toLocaleString('ru-RU')} ₸
              </span>
            </div>
          )}

          <div className="flex justify-between items-center text-[13px] text-[#ae8784] font-inter">
            <span>Курьерская доставка по Астане</span>
            <span className="font-montserrat font-bold text-[#ff5451]">0 ₸ (Бесплатно)</span>
          </div>

          <div className="pt-2 border-t border-[#2a181c] flex justify-between items-baseline">
            <span className="font-serif-gothic text-[18px] font-bold text-[#e5e1e4]">
              Итого
            </span>
            <span className="font-montserrat text-[22px] font-bold text-[#ff5451]">
              {total.toLocaleString('ru-RU')} ₸
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 bg-[#ff5451] hover:bg-[#8f1019] text-[#5c0008] hover:text-[#ffdad7] font-montserrat text-[13px] font-bold uppercase tracking-wider rounded-xl shadow-[0_0_20px_rgba(255,84,81,0.5)] active:scale-[0.99] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isSubmitting ? (
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></span>
              <span>Отправка заказа в Telegram...</span>
            </div>
          ) : (
            <>
              <span className="material-symbols-outlined text-[18px]">shopping_cart_checkout</span>
              <span>Оформить заказ</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={onBack}
          className="w-full py-2.5 text-center text-[#ae8784] hover:text-[#e5e1e4] font-montserrat text-[11px] uppercase tracking-wider transition-colors"
        >
          Вернуться в корзину
        </button>
      </form>
    </div>
  );
};
