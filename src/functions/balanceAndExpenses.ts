import type { ExpenseData, ExpenseType } from "@/types/Types";

const STORAGE_KEYS = {
  BALANCE: "balance",
  EXPENSES: "dataExpense",
} as const;

const safeParseJSON = <T>(data: string | null, fallback: T): T => {
  if (!data) return fallback;
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return fallback;
  }
};

const parseNumber = (value: string | null): number => {
  if (!value) return 0;
  const number = Number(value);
  return Number.isNaN(number) ? 0 : number;
};

const formatExpense = (value: number): string => {
  return value.toFixed(2);
};

export function getBalance(): number {
  const balance = localStorage.getItem(STORAGE_KEYS.BALANCE);
  return parseNumber(balance);
}

export function getAllExpenses(): ExpenseType[] {
  const data = localStorage.getItem(STORAGE_KEYS.EXPENSES);
  return safeParseJSON<ExpenseType[]>(data, []);
}

export function getTotalExpenses(): ExpenseData[] {
  const expenses = getAllExpenses();

  const totals = expenses.reduce<Record<string, number>>((acc, item) => {
    const expenseValue = parseNumber(item.expense.replace(",", "."));

    acc[item.paymentMethod] = (acc[item.paymentMethod] || 0) + expenseValue;
    return acc;
  }, {});

  return Object.entries(totals).map(([paymentMethod, expense]) => ({
    paymentMethod,
    expense: formatExpense(expense),
  }));
}
