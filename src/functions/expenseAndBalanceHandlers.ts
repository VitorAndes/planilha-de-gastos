import type { ExpenseType } from "@/types/Types";

const STORAGE_KEYS = {
  BALANCE: "balance",
  EXPENSES: "dataExpense",
} as const;

export function handleCreateExpense(
  tag: string,
  expense: string,
  local: string,
  paymentMethod: string,
  paymentDate: string
) {
  const dataExpense = localStorage.getItem(STORAGE_KEYS.EXPENSES);
  const DataExpense: ExpenseType[] = dataExpense ? JSON.parse(dataExpense) : [];
  DataExpense.push({
    tag: tag,
    expense: expense,
    local: local,
    paymentMethod: paymentMethod,
    paymentDate: paymentDate,
  });
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(DataExpense));
}

export function handleNewBalance(balance: string) {
  localStorage.setItem(STORAGE_KEYS.BALANCE, balance);
}
