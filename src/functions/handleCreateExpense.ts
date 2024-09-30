import type { ExpenseType } from "@/components/addNewExpense";

export function handleCreateExpense(
  tag: string,
  expense: number,
  local: string
) {
  const dataExpense = localStorage.getItem("dataExpense");
  const DataExpense: ExpenseType[] = dataExpense ? JSON.parse(dataExpense) : [];
  DataExpense.push({ tag: tag, expense: expense, local: local });
  localStorage.setItem("dataExpense", JSON.stringify(DataExpense));
}
