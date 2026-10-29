import React, { useState } from 'react';
import { Order, OrderStatus } from '../types';

interface OrderConfirmationScreenProps {
  order: Order;
  onNavigateToCatalog: () => void;
  onOpenMap: (order: Order) => void;
  onUpdateStatus?: (status: OrderStatus) => void;
}

export const OrderConfirmationScreen: React.FC<OrderConfirmationScreenProps> = ({
  order,
  onNavigateToCatalog,
  onOpenMap,
  onUpdateStatus,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true);
  const [callAlert, setCallAlert] = useState(false);

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case 'preparing':
        return 'Готовится к отправке';
      case 'with_courier':
        return 'Передан курьеру';
      case 'on_the_way':
        return 'Курьер в пути';
      case 'delivered':
        return 'Успешно доставлен';
      default:
        return 'В обработке';
    }
  };

  const getStatusProgress = (status: OrderStatus) => {
    switch (status) {
      case 'preparing':
        return 'w-1/3';
      case 'with_courier':
        return 'w-2/3';
      case 'on_the_way':
        return 'w-5/6';
      case 'delivered':
        return 'w-full';
      default:
        return 'w-1/4';
    }
  };

  const handleSimulateNextStep = () => {
    if (!onUpdateStatus) return;
    if (order.status === 'preparing') onUpdateStatus('with_courier');
    else if (order.status === 'with_courier') onUpdateStatus('on_the_way');
    else if (order.status === 'on_the_way') onUpdateStatus('delivered');
    else onUpdateStatus('preparing');
  };

  const handleCallCourier = () => {
    setCallAlert(true);
    setTimeout(() => setCallAlert(false), 3000);
  };

  return (
    <div className="flex flex-col w-full px-4 pb-28 pt-2 max-w-2xl mx-auto space-y-5 relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-80 h-80 bg-gradient-to-b from-[#ff5451]/20 to-transparent blur-3xl pointer-events-none rounded-full"></div>

      {/* Celebratory Gothic Sigil & Heading */}
      <div className="flex flex-col items-center text-center pt-3 relative z-10">
        <div className="relative flex items-center justify-center w-24 h-24 mb-3">
          {/* Pulsing Aura Halo */}
          <div className="absolute inset-0 rounded-full bg-[#8f1019]/40 animate-ping opacity-75"></div>

          {/* Central Wax Seal / Gothic Crest */}
          <div className="relative w-20 h-20 rounded-full bg-[#2a2a2c] flex items-center justify-center shadow-[0_0_30px_rgba(255,84,81,0.35)] border border-[#ff5451]/50">
            <div className="w-16 h-16 rounded-full bg-[#8f1019] flex items-center justify-center shadow-inner">
              <svg className="w-10 h-10 text-[#ffdad7]" fill="none" viewBox="0 0 48 48">
                {/* Stylized Bat Wings */}
                <path
                  d="M6 22C11 16 17 21 24 16C31 21 37 16 42 22C39 30 33 34 24 38C15 34 9 30 6 22Z"
                  fill="currentColor"
                  fillOpacity="0.3"
                ></path>
                {/* Checkmark */}
                <path
                  d="M15 25L21 31L33 19"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3.5"
                ></path>
              </svg>
            </div>
          </div>

          {/* Floating Embers */}
          <span className="absolute top-1 right-2 w-1.5 h-1.5 rounded-full bg-[#ffdad7] animate-pulse"></span>
          <span className="absolute bottom-2 left-1 w-2 h-2 rounded-full bg-[#ff5451] animate-pulse delay-75"></span>
        </div>

        <span className="font-montserrat text-[11px] uppercase tracking-widest text-[#ffb3ad] mb-1 font-bold">
          Тайный ритуал свершен
        </span>
        <h2 className="font-serif-gothic text-[26px] sm:text-[30px] font-bold text-[#e5e1e4] mb-1">
          Благодарим за заказ!
        </h2>
        <p className="font-serif-gothic text-[15px] text-[#e8bcb9] italic">
          Ваш темный десертный сет готовится
        </p>
      </div>

      {/* Live Status Card */}
      <div className="bg-[#201f21] border border-[#2a181c] rounded-xl p-4 shadow-lg space-y-4 relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-montserrat text-[10px] text-[#ae8784] uppercase tracking-wider font-semibold">
              Номер ритуала
            </span>
            <span className="font-montserrat text-[17px] font-bold text-[#e5e1e4] tracking-wide">
              #{order.orderNumber}
            </span>
          </div>

          <div
            onClick={handleSimulateNextStep}
            title="Нажмите для симуляции смены статуса курьера"
            className="flex items-center gap-2 bg-[#2a2a2c] hover:bg-[#353437] px-3 py-1.5 rounded-full cursor-pointer transition-colors border border-[#3f1d22]"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffb3ad] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ff5451]"></span>
            </span>
            <span className="font-montserrat text-[11px] text-[#ffb3ad] font-bold">
              {getStatusText(order.status)}
            </span>
          </div>
        </div>

        {/* Timeline Progress Indicator */}
        <div className="space-y-1.5">
          <div className="w-full bg-[#2a2a2c] h-2 rounded-full overflow-hidden">
            <div
              className={`bg-[#ff5451] h-full ${getStatusProgress(
                order.status
              )} rounded-full shadow-[0_0_12px_rgba(255,84,81,0.8)] transition-all duration-700`}
            ></div>
          </div>
          <div className="flex items-center justify-between text-[#ae8784] font-montserrat text-[11px]">
            <span className="flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-[14px]">timer</span>
              Ожидание: через ~35-45 минут
            </span>
            <span className="text-[#ff5451] font-bold">г. Астана</span>
          </div>
        </div>

        {/* Confectionery Artisan Preview Pill */}
        <div className="bg-[#1b1b1d] p-3 rounded-lg border border-[#2a181c] flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-[#2a2a2c] flex-shrink-0 overflow-hidden">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvtBSF1vEwZs5UvMHCGLZBcwK_DD_UzKeSggzZeLX2gTd1tTvaYNRthpolpDK8N7GItPBJVX4YhVgi7wO5nr6fj7MTnCgdTO_XvTBT4wyhKAcWrX5pZ43L7B6DQpgzkeR2bIYlfCXdPXxLLiiFE1VZ6ac32DTCvFiLOu8scfzF31ttvKwI6yL-SFdZhFakY8lvxHUy2deCSqd5yzbNXHo-8mfDbEWrFUAXy0IQdEJk"
              alt="Artisan box"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-inter text-[13px] font-semibold text-[#e5e1e4] truncate">
              Шеф-кондитер собирает ваш сет
            </p>
            <p className="font-montserrat text-[11px] text-[#ae8784]">
              Кондитерская Nocturne • ул. Сыганак
            </p>
          </div>
        </div>
      </div>

      {/* Delivery Information Block */}
      <div className="bg-[#201f21] border border-[#2a181c] rounded-xl p-4 space-y-3">
        <h3 className="font-montserrat text-[12px] text-[#ffb3ad] font-bold uppercase tracking-wider flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[18px]">local_shipping</span>
          Детали курьерской доставки
        </h3>

        <div className="space-y-3 text-[13px] font-inter">
          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#ae8784] text-[18px] mt-0.5">
              location_on
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#ae8784] font-montserrat uppercase font-semibold">
                Адрес назначения
              </span>
              <span className="text-[#e5e1e4] font-medium">
                {order.recipientAddress}
                {order.recipientLandmark ? ` (${order.recipientLandmark})` : ''}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#ae8784] text-[18px] mt-0.5">
              call
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#ae8784] font-montserrat uppercase font-semibold">
                Контакт получателя
              </span>
              <span className="text-[#e5e1e4] font-medium font-montserrat">
                {order.recipientName} • {order.recipientPhone}
              </span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#ae8784] text-[18px] mt-0.5">
              two_wheeler
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#ae8784] font-montserrat uppercase font-semibold">
                Логистика
              </span>
              <span className="text-[#e5e1e4]">Экспресс-курьер Nocturne (Термобокс)</span>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="material-symbols-outlined text-[#ae8784] text-[18px] mt-0.5">
              qr_code_2
            </span>
            <div className="flex flex-col">
              <span className="text-[11px] text-[#ae8784] font-montserrat uppercase font-semibold">
                Статус транзакции
              </span>
              <span className="font-montserrat text-[13px] font-bold text-[#ffb3ad]">
                {order.paymentMethod === 'kaspi'
                  ? `Оплачено через Kaspi QR (${order.total.toLocaleString('ru-RU')} ₸)`
                  : order.paymentMethod === 'card'
                  ? `Оплачено картой онлайн (${order.total.toLocaleString('ru-RU')} ₸)`
                  : `Оплата наличными курьеру (${order.total.toLocaleString('ru-RU')} ₸)`}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ordered Items Accordion / Collapsible */}
      <div className="bg-[#201f21] border border-[#2a181c] rounded-xl overflow-hidden">
        <button
          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-[#2a2a2c]/40 transition-colors"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ff5451] text-[20px]">
              inventory_2
            </span>
            <span className="font-serif-gothic text-[16px] font-bold text-[#e5e1e4]">
              Содержимое сета ({order.items.length})
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
          <div className="px-4 pb-4 space-y-2">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between py-2 bg-[#1b1b1d] px-3 rounded-lg border border-[#2a181c]"
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <div className="w-9 h-9 rounded bg-[#2a2a2c] flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-inter text-[13px] font-semibold text-[#e5e1e4] truncate">
                      {item.product.title}
                    </p>
                    <p className="font-montserrat text-[10px] text-[#ae8784]">
                      {item.selectedWeight} • {item.quantity} шт
                    </p>
                  </div>
                </div>
                <span className="font-montserrat text-[13px] font-bold text-[#ffb3ad] flex-shrink-0">
                  {(item.unitPrice * item.quantity).toLocaleString('ru-RU')} ₸
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call Alert Toast */}
      {callAlert && (
        <div className="p-3 bg-[#8f1019] text-[#ffdad7] rounded-xl text-center font-montserrat text-[12px] font-bold shadow-lg animate-bounce">
          Связываемся с курьером Nocturne Astana... (+7 775 800-44-11)
        </div>
      )}

      {/* Interactive Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-2">
        <button
          onClick={() => onOpenMap(order)}
          className="w-full py-3.5 bg-[#8f1019] hover:bg-[#ff5451] text-[#ffdad7] hover:text-[#5c0008] font-montserrat text-[12px] font-bold uppercase tracking-wider rounded-xl transition-all shadow-[0_0_16px_rgba(143,16,25,0.6)] flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined text-[18px]">map</span>
          <span>Отслеживать курьера на карте Астаны</span>
        </button>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={handleCallCourier}
            className="py-3 bg-[#1b1b1d] hover:bg-[#201f21] border border-[#2a181c] text-[#e5e1e4] font-montserrat text-[11px] font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">call</span>
            <span>Курьер</span>
          </button>

          <button
            onClick={onNavigateToCatalog}
            className="py-3 bg-[#201f21] hover:bg-[#2a2a2c] border border-[#ff5451]/40 text-[#ffb3ad] font-montserrat text-[11px] font-bold uppercase tracking-wider rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">storefront</span>
            <span>В каталог</span>
          </button>
        </div>
      </div>
    </div>
  );
};
