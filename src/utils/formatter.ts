// Formatar data ISO para dd/mm/aaaa hh:mm
export function formatDateBR(dateString: string | null): string {
  if (!dateString) return "—";
  const date = new Date(dateString);
  return (
    date.toLocaleDateString("pt-BR") +
    " " +
    date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

// Formatar valor numérico para moeda BRL
export function formatCurrencyBR(value: number | string): string {
  const numberValue = typeof value === "string" ? parseFloat(value) : value;
  if (isNaN(numberValue)) return "R$ 0,00";

  return numberValue.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
