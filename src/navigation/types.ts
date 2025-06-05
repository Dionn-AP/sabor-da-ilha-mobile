// src/navigation/types.ts
export type RootStackParamList = {
  Login: undefined;
  Kitchen: undefined;
  OrderDetails: { orderId: number };
  Orders: undefined;
  // Adicione outras rotas conforme necessário
};

// Extensão para useNavigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
