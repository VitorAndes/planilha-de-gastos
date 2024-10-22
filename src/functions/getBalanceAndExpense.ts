import type { ExpenseType } from "@/components/addNewExpense";

export function getBalance() {
  const balance = localStorage.getItem("balance");
  return Number(balance);
}

export function getTotalExpenses(): number {
  const dataExpense = localStorage.getItem("dataExpense");
  const DataExpense: ExpenseType[] = dataExpense ? JSON.parse(dataExpense) : [];
  return DataExpense.reduce((acc, item) => acc + Number.parseFloat(item.expense.replace(",", ".")), 0);
} 

export function getAllExpenses(): ExpenseType[] {
  const dataExpense = localStorage.getItem("dataExpense");
  return dataExpense ? JSON.parse(dataExpense) : [];
}