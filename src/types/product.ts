export type ProductCategory = "comida" | "bebida" | "sobremesa" | "outro";

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  category: ProductCategory;
  isActive: boolean;
  imageUrl: string;
  preparationTime: number;
  createdAt: string;
  updatedAt: string;
}
