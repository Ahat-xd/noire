export const TOKEN = "9158974919:AAFR1a1cV0dDHxfFatkqBssrumrBBMOqa3E";
export const CHAT_ID = "7380013629";

import React, { useState, useEffect } from 'react';
import { AppScreen, CartItem, Order, OrderStatus, Product } from './types';
import { PRODUCTS, INITIAL_CART_ITEMS } from './data/products';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { CatalogScreen } from './components/CatalogScreen';
import { ProductDetailScreen } from './components/ProductDetailScreen';
import { CartScreen } from './components/CartScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { OrderConfirmationScreen } from './components/OrderConfirmationScreen';
import { OrdersScreen } from './components/OrdersScreen';
import { AstanaMapModal } from './components/AstanaMapModal';
import { TasteFilterModal } from './components/TasteFilterModal';
import { UserProfileModal } from './components/UserProfileModal';

const CART_STORAGE_KEY = 'nocturne_gothic_cart_v1';
const ORDERS_STORAGE_KEY = 'nocturne_gothic_orders_v1';
const FAVORITES_STORAGE_KEY = 'nocturne_gothic_favs_v1';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('catalog');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[4]); // Vampire Blood Marmalade default

  // Cart state persisted in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
    }
    return INITIAL_CART_ITEMS;
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return ['kinder-dark', 'vampire-blood-marmalade'];
  });

  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
    } catch {}
  }, [favorites]);

  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(1000);
  const [sweetnessFilter, setSweetnessFilter] = useState<number | null>(null);
  const [sournessFilter, setSournessFilter] = useState<number | null>(null);

  // Initial orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return [
      {
        id: 'order-init-1',
        orderNumber: 'NS-7842',
        date: '28.10.2026 23:42',
        status: 'preparing' as OrderStatus,
        items: INITIAL_CART_ITEMS,
        subtotal: 2300,
        discount: 230,
        deliveryFee: 0,
        total: 2070,
        recipientName: 'Камила',
        recipientPhone: '+7 (707) 123-45-67',
        recipientAddress: 'г. Астана, ул. Достык 18, кв. 45',
        comment: 'Оставить у консьержа',
        paymentMethod: 'kaspi',
        estimatedMinutes: 40,
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch {}
  }, [orders]);

  const [activeOrder, setActiveOrder] = useState<Order>(orders[0]);
  const [appliedCheckoutDiscount, setAppliedCheckoutDiscount] = useState<number>(0);
  const [appliedPromoCode, setAppliedPromoCode] = useState<string>('');

  // Modals
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [mapOrder, setMapOrder] = useState<Order | null>(null);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // Navigation with scroll to top
  const navigateTo = (screen: AppScreen) => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    navigateTo('product-detail');
  };

  // Add item to cart
  const handleAddToCart = (product: Product, selectedWeight?: string, quantity: number = 1) => {
    const weight = selectedWeight || product.weightOptions[0]?.grams || product.baseWeight;
    const option = product.weightOptions.find((o) => o.grams === weight) || {
      grams: weight,
      price: product.price,
    };

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.selectedWeight === weight
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      } else {
        const newItem: CartItem = {
          id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          productId: product.id,
          selectedWeight: weight,
          quantity,
          unitPrice: option.price,
          product,
        };
        return [...prev, newItem];
      }
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleToggleFavorite = (productId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const handleProceedToCheckout = (discount: number, promo: string) => {
    setAppliedCheckoutDiscount(discount);
    setAppliedPromoCode(promo);
    navigateTo('checkout');
  };

  // Called when Telegram returns ok: true
  const handleOrderPlaced = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
    setActiveOrder(order);
    // Clear cart both in state and localStorage
    setCartItems([]);
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
    } catch {}
    navigateTo('order-confirmation');
  };

  const handleOpenMap = (order: Order) => {
    setMapOrder(order);
    setIsMapModalOpen(true);
  };

  const handleUpdateActiveOrderStatus = (newStatus: OrderStatus) => {
    if (!activeOrder) return;
    const updated = { ...activeOrder, status: newStatus };
    setActiveOrder(updated);
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
  };

  const cartTotalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Filter catalog products
  const filteredCatalog = PRODUCTS.filter((p) => {
    const matchesPrice = p.price <= maxPrice;
    const matchesSweetness = sweetnessFilter === null || p.sweetness <= sweetnessFilter;
    const matchesSourness = sournessFilter === null || p.sourness >= sournessFilter;
    return matchesPrice && matchesSweetness && matchesSourness;
  });

  return (
    <div className="min-h-screen bg-[#131315] text-[#e5e1e4] flex flex-col font-inter selection:bg-[#ff5451] selection:text-white">
      {/* Top Header */}
      <Header
        currentScreen={currentScreen}
        cartCount={cartTotalItems}
        onNavigate={navigateTo}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onBack={() => {
          if (currentScreen === 'checkout') navigateTo('cart');
          else if (currentScreen === 'order-confirmation') navigateTo('catalog');
          else if (currentScreen === 'orders') navigateTo('catalog');
          else navigateTo('catalog');
        }}
      />

      {/* Mobile-First Centered Container */}
      <main className="flex-1 w-full max-w-md mx-auto pt-16 flex flex-col">
        {currentScreen === 'catalog' && (
          <CatalogScreen
            products={filteredCatalog}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onSelectProduct={handleSelectProduct}
            onAddToCart={(product, weight, e) => handleAddToCart(product, weight, 1)}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onOpenFilterModal={() => setIsFilterModalOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {currentScreen === 'product-detail' && (
          <ProductDetailScreen
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onBack={() => navigateTo('catalog')}
          />
        )}

        {currentScreen === 'cart' && (
          <CartScreen
            items={cartItems}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onNavigateToCatalog={() => navigateTo('catalog')}
            onProceedToCheckout={handleProceedToCheckout}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentScreen === 'checkout' && (
          <CheckoutScreen
            cartItems={cartItems}
            discount={appliedCheckoutDiscount}
            promoCode={appliedPromoCode}
            onOrderPlaced={handleOrderPlaced}
            onBack={() => navigateTo('cart')}
          />
        )}

        {currentScreen === 'order-confirmation' && (
          <OrderConfirmationScreen
            order={activeOrder}
            onNavigateToCatalog={() => navigateTo('catalog')}
            onOpenMap={handleOpenMap}
            onUpdateStatus={handleUpdateActiveOrderStatus}
          />
        )}

        {currentScreen === 'orders' && (
          <OrdersScreen
            orders={orders}
            onViewOrder={(order) => {
              setActiveOrder(order);
              navigateTo('order-confirmation');
            }}
            onNavigateToCatalog={() => navigateTo('catalog')}
          />
        )}

        {currentScreen === 'search' && (
          <div className="px-4 py-4 flex flex-col gap-4">
            <div className="pt-2">
              <h1 className="font-serif-gothic text-[24px] font-bold text-[#e5e1e4]">
                Поиск по каталогу
              </h1>
              <p className="font-montserrat text-[11px] text-[#ae8784] uppercase font-semibold">
                Найдите десерты по вкусу, названию или ингредиентам
              </p>
            </div>
            <CatalogScreen
              products={filteredCatalog}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              onSelectProduct={handleSelectProduct}
              onAddToCart={(product, weight, e) => handleAddToCart(product, weight, 1)}
              favorites={favorites}
              onToggleFavorite={handleToggleFavorite}
              onOpenFilterModal={() => setIsFilterModalOpen(true)}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        currentScreen={currentScreen}
        cartCount={cartTotalItems}
        onNavigate={navigateTo}
      />

      {/* Astana Live Courier Map Modal */}
      <AstanaMapModal
        isOpen={isMapModalOpen}
        order={mapOrder}
        onClose={() => setIsMapModalOpen(false)}
      />

      {/* Taste & Sensory Filter Modal */}
      <TasteFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        maxPrice={maxPrice}
        onSelectMaxPrice={setMaxPrice}
        sweetnessFilter={sweetnessFilter}
        onSelectSweetness={setSweetnessFilter}
        sournessFilter={sournessFilter}
        onSelectSourness={setSournessFilter}
      />

      {/* User Profile Modal */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => {
          setSelectedCategory('Все');
          setSearchQuery('');
          navigateTo('catalog');
        }}
        ordersCount={orders.length}
        onOpenOrders={() => navigateTo('orders')}
      />
    </div>
  );
}
