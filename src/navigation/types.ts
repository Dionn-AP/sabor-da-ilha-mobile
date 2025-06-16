import { Order } from "../types/orders";

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Kitchen: undefined;
  OrderDetails: { order: Order };
  Orders: undefined;
  NewOrders: undefined;
  Unauthorized: undefined;
  Profile: undefined;
  Dashboard: undefined;
  Home: undefined;
  History: undefined;
  Products: undefined;
  ProductsForm: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
