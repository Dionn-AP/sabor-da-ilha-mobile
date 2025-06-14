// src/navigation/types.ts
export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Kitchen: undefined;
  OrderDetails: { orderId: number };
  Orders: undefined;
  NewOrders: undefined;
  Unauthorized: undefined;
  Profile: undefined;
  Dashboard: undefined;
  Home: undefined;
  History: undefined;
};

// Extensão para useNavigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
