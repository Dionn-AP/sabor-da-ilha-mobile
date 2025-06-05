export type OrderStatus =
  | "pendente"
  | "preparando"
  | "pronto"
  | "entregue"
  | "cancelado";

export interface OrderProduct {
  id: number;
  name: string;
  price: string;
}

export interface OrderItem {
  quantity: number;
  observations?: string;
  itemTotal: number;
  product: OrderProduct;
}

export interface Order {
  id: number;
  items: OrderItem[];
  status: string;
  tableNumber?: number;
  attendantId: number;
  total: string;
  createdAt: string;
  updatedAt: string;
  startedAt?: string | null;
  readyAt?: string | null;
  deliveredAt?: string | null;
  closedAt?: string | null;
  customerName: string;
  observations: string;
  attendant?: { name: string };
  kitchenUser?: { name: string };
  kitchenUserId?: number;
}
