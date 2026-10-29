export interface WeightOption {
  grams: string;
  price: number;
}

export interface Product {
  id: string;
  title: string;
  category: string;
  tag?: string;
  subtitle: string;
  description: string;
  bouquet?: string;
  price: number;
  baseWeight: string;
  images: string[];
  weightOptions: WeightOption[];
  sweetness: number; // 0 to 4
  sourness: number; // 0 to 4
  composition?: string;
  calories?: string;
  shelfLife?: string;
  storage?: string;
}

export interface CartItem {
  id: string; // unique cart entry id
  productId: string;
  selectedWeight: string;
  quantity: number;
  unitPrice: number;
  product: Product;
}

export type OrderStatus = 'preparing' | 'with_courier' | 'on_the_way' | 'delivered';

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  recipientName: string;
  recipientPhone: string;
  recipientAddress: string;
  recipientLandmark?: string;
  comment?: string;
  paymentMethod: 'kaspi' | 'card' | 'cash';
  estimatedMinutes: number;
}

export type AppScreen = 
  | 'catalog' 
  | 'product-detail' 
  | 'cart' 
  | 'checkout' 
  | 'order-confirmation'
  | 'orders'
  | 'search';
