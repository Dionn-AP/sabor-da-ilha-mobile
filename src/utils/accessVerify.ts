export function hasOrderPermission(role?: string): boolean {
  return ["atendente", "gerente", "master"].includes(role || "");
}
