import { useCallback, useState } from "react";
import { AddNewBalance } from "./components/addNewBalance";
import { AddNewExpense } from "./components/addNewExpense";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { CardChart } from "./components/cardChart";
import { CardChartPayments } from "./components/cardChartPayments";
import { CardMoney } from "./components/cardMoney";
import { CardPaymentMethod } from "./components/cardPaymentMethod";
import { CardResetData } from "./components/cardResetData";
import { ExpenseTable } from "./components/expenseTable";
import {
  getAllExpenses,
  getTotalExpenses,
} from "./functions/balanceAndExpenses";
import type { ExpenseData, ExpenseType } from "./types/Types";

export function useLocalStorageState(key: string, initialValue = 0) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? Number.parseFloat(stored) : initialValue;
  });

  const updateValue = useCallback(
    (amount: number) => {
      setValue((prev) => {
        const newValue = prev + amount;
        localStorage.setItem(key, newValue.toString());
        return newValue;
      });
    },
    [key]
  );

  return [value, setValue, updateValue] as const;
}

export function useExpenses() {
  const [expenses, setExpenses] = useState<ExpenseData[]>(() =>
    getTotalExpenses()
  );
  const [expensesList, setExpensesList] = useState<ExpenseType[]>(() =>
    getAllExpenses()
  );

  const addExpense = useCallback((newExpense: ExpenseType) => {
    setExpensesList((prev) => [...prev, newExpense]);
  }, []);

  const refreshExpenses = useCallback(() => {
    setExpenses(getTotalExpenses());
    setExpensesList(getAllExpenses());
  }, []);

  const calculateTotalExpenses = useCallback(() => {
    return expenses
      .reduce((sum, item) => sum + Number(item.expense.replace(",", ".")), 0)
      .toFixed(2)
      .replace(".", ",");
  }, [expenses]);

  const calculateExpensesByType = useCallback(
    (type: string) => {
      return expenses
        .filter((item) => item.paymentMethod === type)
        .reduce((sum, item) => sum + Number(item.expense.replace(",", ".")), 0)
        .toFixed(2)
        .replace(".", ",");
    },
    [expenses]
  );

  return {
    setExpenses,
    expensesList,
    addExpense,
    refreshExpenses,
    calculateTotalExpenses,
    calculateExpensesByType,
  };
}

// App.tsx
export function App() {
  const [balance, setBalance, updateBalance] = useLocalStorageState("balance");

  const {
    setExpenses,
    expensesList,
    addExpense,
    refreshExpenses,
    calculateTotalExpenses,
    calculateExpensesByType,
  } = useExpenses();

  const handleResetData = useCallback(() => {
    localStorage.clear();
    setBalance(0);
    setExpenses([]);
    refreshExpenses();
    toast.success("Os dados foram resetados");
  }, [setBalance, setExpenses, refreshExpenses]);

  const descountBalance = useCallback(
    (amount: number) => {
      updateBalance(-amount);
    },
    [updateBalance]
  );

  const totalExpensesValue = calculateTotalExpenses();
  const totalExpensesCredit = calculateExpensesByType("crédito");
  const totalExpenseDebit = calculateExpensesByType("débito");

  return (
    <div className="flex flex-col justify-start items-center m-auto w-full md:max-w-7xl pb-28 min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-center lg:justify-between bg-gradient-to-t from-my-tertiary to-text-secondary w-full md:h-24 rounded-xl p-4 mb-8 shadow-md shadow-white"
      >
        <h1 className="text-xl md:text-3xl -tracking-tighter font-bold">
          AndesFinance
        </h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className=" flex gap-2 px-2 py-10 lg:gap-2 h-16 justify-center lg:justify-end items-center flex-1 lg:static bottom-0 left-0 fixed z-10 rounded-t-md lg:rounded-t-none bg-my-primary/70 border-t-[#C2D2F2] border-t backdrop-blur lg:backdrop-blur-none lg:bg-transparent lg:border-none w-full lg:w-0"
        >
          <AddNewBalance updateBalance={updateBalance} />
          <CardResetData handleResetData={handleResetData} />
          <AddNewExpense
            setExpense={setExpenses}
            updateBalance={descountBalance}
            addNewExpense={addExpense}
          />
        </motion.div>
      </motion.div>

      <div className="flex flex-col w-full">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex-1"
          >
            <CardMoney
              revenue="Saldo"
              value={balance.toFixed(2).replace(".", ",")}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex-1"
          >
            <CardMoney revenue="Pagamentos" value={totalExpensesValue} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1"
          >
            <CardPaymentMethod revenue="Fatura" value={totalExpensesCredit} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex-1"
          >
            <CardPaymentMethod revenue="Débito" value={totalExpenseDebit} />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="col-span-2"
          >
            <ExpenseTable expenses={expensesList} />
          </motion.div>

          <div className="grid grid-cols-2 col-span-2 gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="col-span-2"
            >
              <CardChart />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="col-span-2"
            >
              <CardChartPayments />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
