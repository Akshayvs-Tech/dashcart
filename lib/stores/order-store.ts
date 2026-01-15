import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface OrderItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  total: number;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    zipCode: string;
  };
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
  cancelOrder: (orderId: string) => void;
  getOrders: () => Order[];
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `ORD-${Date.now()}`,
          date: new Date().toISOString(),
        };
        set((state) => ({
          orders: [newOrder, ...state.orders],
        }));
      },
      cancelOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== orderId),
        }));
      },
      getOrders: () => get().orders,
    }),
    {
      name: 'order-storage',
    }
  )
);
