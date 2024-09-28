import type { ExpenseType } from "@/components/addNewExpense";

export function getDataExpenses(): ExpenseType[] {
  const data = localStorage.getItem("dataExpense");
  return data ? JSON.parse(data) : [];
}


