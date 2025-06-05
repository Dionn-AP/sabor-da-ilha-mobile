export type OrderStatus =
  | "pendente"
  | "preparando"
  | "pronto"
  | "entregue"
  | "cancelado";

export interface OrderItem {
  productId: number;
  quantity: number;
  unitPrice: number;
  observations?: string;
}

export interface Order {
  id: number;
  items: OrderItem[];
  status: OrderStatus;
  tableNumber?: number;
  attendantId: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}
