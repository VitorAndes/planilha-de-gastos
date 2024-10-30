import type { ExpenseType } from "@/types/Types";

export function getBalance() {
  const balance = localStorage.getItem("balance");
  return Number(balance);
}

export function getTotalExpenses() {
  const dataExpense = localStorage.getItem("dataExpense");
  const DataExpense: ExpenseType[] = dataExpense ? JSON.parse(dataExpense) : [];

  const totals = DataExpense.reduce<{ [key: string]: number }>((acc, item) => {
    const formattedExpense = item.expense.replace(",", ".");
    const expense = Number.parseFloat(formattedExpense);

    if (acc[item.paymentMethod]) {
      acc[item.paymentMethod] += expense;
    } else {
      acc[item.paymentMethod] = expense;
    }
    return acc;
  }, {});

  return Object.entries(totals).map(([paymentMethod, expense]) => ({
    paymentMethod,
    expense: expense.toFixed(2),
  }));
}

export function getAllExpenses(): ExpenseType[] {
  const dataExpense = localStorage.getItem("dataExpense");
  return dataExpense ? JSON.parse(dataExpense) : [];
}
