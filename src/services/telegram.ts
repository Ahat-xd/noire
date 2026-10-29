export const TOKEN = "9158974919:AAFR1a1cV0dDHxfFatkqBssrumrBBMOqa3E";
export const CHAT_ID = "7380013629";

export interface SendOrderParams {
  orderNumber: string;
  items: Array<{
    title: string;
    weight: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  total: number;
  name: string;
  phone: string;
  address: string;
  comment?: string;
  dateTime: string;
}

export async function sendOrderToTelegram(params: SendOrderParams): Promise<{ ok: boolean; description?: string }> {
  const itemsText = params.items
    .map(
      (item, idx) =>
        `${idx + 1}. ${item.title} (${item.weight}) — ${item.quantity} шт. × ${item.price.toLocaleString('ru-RU')} ₸ = ${item.total.toLocaleString('ru-RU')} ₸`
    )
    .join('\n');

  const message = [
    `🛒 Новый заказ #${params.orderNumber}`,
    ``,
    `📦 Состав заказа:`,
    itemsText,
    ``,
    `💰 Итого к оплате: ${params.total.toLocaleString('ru-RU')} ₸`,
    ``,
    `👤 Получатель: ${params.name}`,
    `📞 Телефон: ${params.phone}`,
    `📍 Адрес: ${params.address || 'Не указан'}`,
    `💬 Комментарий: ${params.comment?.trim() || 'Без комментария'}`,
    `🕒 Дата и время: ${params.dateTime}`,
  ].join('\n');

  try {
    const response = await fetch("https://api.telegram.org/bot" + TOKEN + "/sendMessage", {
      method: "POST",
      body: new URLSearchParams({
        chat_id: CHAT_ID,
        text: message,
      }),
    });

    const data = await response.json();
    return { ok: Boolean(data?.ok), description: data?.description };
  } catch (err: any) {
    return { ok: false, description: err?.message || 'Сетевая ошибка при отправке в Telegram' };
  }
}
