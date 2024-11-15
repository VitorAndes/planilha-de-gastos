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
import { SidebarTrigger } from "./components/ui/sidebar";
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

  function buyMeACoffee() {
    toast.info("Disponivel em breve!");
  }

  const totalExpensesValue = calculateTotalExpenses();
  const totalExpensesCredit = calculateExpensesByType("crédito");
  const totalExpenseDebit = calculateExpensesByType("débito");

  return (
    <div className="flex justify-center gap-2 w-full min-h-screen ">
      <div className=" md:p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between bg-color-card shadow-md shadow-color-secondary w-full md:h-24 md:rounded-lg p-4 mb-8  "
        >
          <SidebarTrigger className="md:hidden" />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className=" flex gap-1 px-2 py-10 h-16 justify-center md:justify-start items-center flex-1 md:static bottom-0 right-0 fixed z-10 rounded-t-md md:rounded-t-none bg-color-card/90 border-t-color-secondary border-t backdrop-blur md:backdrop-blur-none md:bg-transparent md:border-none w-full md:w-0"
          >
            <AddNewBalance updateBalance={updateBalance} />
            <CardResetData handleResetData={handleResetData} />
            <AddNewExpense
              setExpense={setExpenses}
              updateBalance={descountBalance}
              addNewExpense={addExpense}
            />
          </motion.div>
          <button type="button" onClick={() => buyMeACoffee()} className="w-44">
            {/* <a aria-disabled href="https://www.buymeacoffee.com/andescoffee"> */}
            <img
              src="https://img.buymeacoffee.com/button-api/?text=Buymeacoffee&emoji=☕&slug=andescoffee&button_colour=40DCA5&font_colour=ffffff&font_family=Lato&outline_colour=000000&coffee_colour=FFDD00"
              alt="buy me a coffee"
            />
            {/* </a> */}
          </button>
        </motion.div>

        <div className="flex flex-col w-full">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="col-span-1"
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
              className="col-span-1"
            >
              <CardMoney revenue="Pagamentos" value={totalExpensesValue} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="col-span-1"
            >
              <CardPaymentMethod revenue="Fatura" value={totalExpensesCredit} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="col-span-1"
            >
              <CardPaymentMethod revenue="Débito" value={totalExpenseDebit} />
            </motion.div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="grid grid-cols-2 lg:grid-cols-4 col-span-4 h-full gap-3">
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

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="col-span-4"
            >
              <ExpenseTable />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
