export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  profileImageUrl?: string; // URL da imagem armazenada no Firebase Storage
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}
