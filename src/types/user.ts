export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImageUrl?: string;
  role: "atendente" | "cozinha" | "caixa" | "gerente" | "estoque" | "master";
  createdAt: string;
  updatedAt: string;
}

export const userRole = {
  ATTENDANT: "atendente",
  KITCHEN: "cozinha",
  CASHIER: "caixa",
  MANAGER: "gerente",
  STOCK: "estoque",
  MASTER: "master",
};
