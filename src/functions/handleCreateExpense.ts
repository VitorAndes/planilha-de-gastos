import type { ExpenseType } from "@/components/addNewExpense";

export function handleCreateExpense(
  tag: string,
  expense: string,
  local: string,
  paymentMethod: string,
) {
  const dataExpense = localStorage.getItem("dataExpense");
  const DataExpense: ExpenseType[] = dataExpense ? JSON.parse(dataExpense) : [];
  DataExpense.push({ tag: tag, expense: expense, local: local, paymentMethod: paymentMethod });
  localStorage.setItem("dataExpense", JSON.stringify(DataExpense));
}
