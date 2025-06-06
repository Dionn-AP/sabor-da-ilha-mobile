export interface Product {
  id: number;
  name: string;
  description: string;
  price: string; // ou number, se quiser converter logo ao carregar
  category: "comida" | "bebida" | "sobremesa" | "outro";
  isActive: boolean;
  imageUrl: string;
  preparationTime: number;
  createdAt: string;
  updatedAt: string;
}
