import React from 'react';
import { Order, OrderStatus } from '../types';

interface OrdersScreenProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onNavigateToCatalog: () => void;
}

export const OrdersScreen: React.FC<OrdersScreenProps> = ({
  orders,
  onViewOrder,
  onNavigateToCatalog,
}) => {
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'preparing':
        return {
          text: 'Готовится в кондитерской',
          bg: 'bg-[#ff5451]/20 text-[#ffb3ad] border-[#ff5451]/40',
        };
      case 'with_courier':
        return {
          text: 'Передан курьеру',
          bg: 'bg-[#8f1019]/40 text-[#ffdad7] border-[#ff5451]/60',
        };
      case 'on_the_way':
        return {
          text: 'Курьер в пути по Астане',
          bg: 'bg-[#ff5451] text-[#5c0008] border-transparent font-bold',
        };
      case 'delivered':
        return {
          text: 'Доставлен',
          bg: 'bg-[#2a2a2c] text-[#ae8784] border-[#3f1d22]',
        };
      default:
        return {
          text: 'В обработке',
          bg: 'bg-[#201f21] text-[#ae8784] border-[#2a181c]',
        };
    }
  };

  return (
    <div className="flex flex-col w-full pb-28 pt-2 px-4 gap-4 max-w-2xl mx-auto">
      <div className="pt-2">
        <h1 className="font-serif-gothic text-[26px] font-bold text-[#e5e1e4] tracking-tight">
          Ваши Заказы
        </h1>
        <p className="font-montserrat text-[11px] uppercase tracking-wider text-[#ae8784] font-semibold mt-0.5">
          История тайных доставок в г. Астана
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="py-16 flex flex-col items-center justify-center text-center p-6 bg-[#1b1b1d] rounded-xl border border-[#2a181c]">
          <div className="w-16 h-16 rounded-full bg-[#201f21] border border-[#2a181c] flex items-center justify-center text-[#ae8784] mb-3">
            <span className="material-symbols-outlined text-[32px]">receipt_long</span>
          </div>
          <h2 className="font-serif-gothic text-[20px] font-bold text-[#e5e1e4] mb-1">
            Заказов пока нет
          </h2>
          <p className="font-inter text-[13px] text-[#ae8784] mb-5 max-w-xs">
            Оформите ваш первый мистический сет из нашей коллекции сладостей.
          </p>
          <button
            onClick={onNavigateToCatalog}
            className="px-6 py-3 bg-[#ff5451] hover:bg-[#8f1019] text-[#5c0008] hover:text-[#ffdad7] font-montserrat text-[12px] font-bold uppercase tracking-wider rounded-lg shadow-[0_0_16px_rgba(255,84,81,0.4)] active:scale-95 transition-all"
          >
            Перейти в каталог
          </button>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map((order) => {
            const badge = getStatusBadge(order.status);
            return (
              <div
                key={order.id}
                onClick={() => onViewOrder(order)}
                className="p-4 bg-[#201f21] border border-[#2a181c] hover:border-[#8f1019] rounded-xl shadow-md transition-all cursor-pointer group flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-montserrat text-[15px] font-bold text-[#e5e1e4] tracking-wide group-hover:text-[#ffb3ad] transition-colors">
                      #{order.orderNumber}
                    </span>
                    <span className="text-[11px] text-[#ae8784] font-inter">
                      {order.date}
                    </span>
                  </div>

                  <span
                    className={`font-montserrat text-[10px] uppercase font-bold px-2.5 py-1 rounded-full border ${badge.bg}`}
                  >
                    {badge.text}
                  </span>
                </div>

                {/* Items preview */}
                <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="relative w-12 h-12 rounded-lg bg-[#0e0e10] border border-[#2a181c] flex-shrink-0 overflow-hidden"
                      title={item.product.title}
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                      {item.quantity > 1 && (
                        <span className="absolute bottom-0 right-0 bg-[#ff5451] text-[#5c0008] text-[9px] font-bold font-montserrat px-1 rounded-tl">
                          ×{item.quantity}
                        </span>
                      )}
                    </div>
                  ))}
                  <div className="text-[12px] text-[#e8bcb9] font-inter ml-1 truncate">
                    {order.items[0]?.product.title}
                    {order.items.length > 1 && ` и еще ${order.items.length - 1} поз.`}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#2a181c] flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#ae8784] font-inter">
                    <span className="material-symbols-outlined text-[15px]">location_on</span>
                    <span className="truncate max-w-[180px]">{order.recipientAddress}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-montserrat text-[16px] font-bold text-[#ffb3ad]">
                      {order.total.toLocaleString('ru-RU')} ₸
                    </span>
                    <span className="material-symbols-outlined text-[#ae8784] group-hover:translate-x-1 transition-transform text-[18px]">
                      arrow_forward_ios
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
