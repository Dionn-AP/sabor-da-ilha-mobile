import { theme } from "../constants/theme";
import { Order } from "../types/orders";

export const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "pendente":
      return "#FFA500"; // laranja
    case "preparando":
      return "#1E90FF"; // azul
    case "pronto":
      return "#32CD32"; // verde claro
    case "entregue":
      return "#808080"; // cinza
    case "cancelado":
      return "#FF0000"; // vermelho
    default:
      return theme.colors.text; // fallback
  }
};
