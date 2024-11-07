import { useEffect, useState } from "react";
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
} from "./functions/getBalanceAndExpense";
import type { ExpenseData, ExpenseType } from "./types/Types";

export function App() {
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState<ExpenseData[]>([]);
  const [expensesList, setExpensesList] = useState<ExpenseType[]>([]);

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    setBalance(storedBalance ? Number(storedBalance) : 0);

    const expenseValue: ExpenseData[] = getTotalExpenses();
    setExpense(expenseValue);

    const allExpenses = getAllExpenses();
    setExpensesList(allExpenses);
  }, []);

  const handleResetData = () => {
    localStorage.clear();
    setBalance(0);
    setExpense([]);
    setExpensesList([]);

    toast.success("Os dados foram resetados");
  };

  const updateBalance = (newExpense: number) => {
    setBalance((prevBalance) => {
      const updatedBalance = prevBalance + newExpense;
      localStorage.setItem("balance", updatedBalance.toString());
      return updatedBalance;
    });
  };

  const descountBalance = (newExpense: number) => {
    setBalance((prevBalance) => {
      const updatedBalance = prevBalance - newExpense;
      localStorage.setItem("balance", updatedBalance.toString());
      return updatedBalance;
    });
  };

  const addNewExpense = (newExpense: ExpenseType) => {
    setExpensesList((prevExpenses) => [...prevExpenses, newExpense]);
  };

  const totalExpensesValue = expense
    .reduce((sum, item) => sum + Number(item.expense.replace(",", ".")), 0)
    .toFixed(2)
    .replace(".", ",");

  const totalCredit = expense
    .filter((item) => item.paymentMethod === "crédito")
    .reduce((sum, item) => sum + Number(item.expense.replace(",", ".")), 0)
    .toFixed(2)
    .replace(".", ",");

  const totalDebit = expense
    .filter((item) => item.paymentMethod === "débito")
    .reduce((sum, item) => sum + Number(item.expense.replace(",", ".")), 0)
    .toFixed(2)
    .replace(".", ",");

  return (
    <div className="flex flex-col justify-start items-center m-auto max-w-7xl min-h-screen">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between bg-gradient-to-t from-my-primary to-text-secondary w-full h-24 rounded-xl p-4 mb-8 shadow-sm shadow-violet-300"
      >
        <h1 className="text-3xl -tracking-tighter font-bold">AndesFinance</h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className=" flex gap-2 px-2 py-10 lg:gap-2 h-16 justify-center lg:justify-end items-center flex-1 lg:static bottom-0 left-0 fixed z-10 rounded-t-md lg:rounded-t-none bg-my-primary/70 border-t-[#C2D2F2] border-t backdrop-blur lg:backdrop-blur-none lg:bg-transparent lg:border-none w-full lg:w-0"
        >
          <AddNewBalance updateBalance={updateBalance} />
          <CardResetData handleResetData={handleResetData} />
          <AddNewExpense
            setExpense={setExpense}
            updateBalance={descountBalance}
            addNewExpense={addNewExpense}
          />
        </motion.div>
      </motion.div>

      <div className="flex flex-col w-full">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
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
            <CardMoney revenue="Gastos" value={totalExpensesValue} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1"
          >
            <CardPaymentMethod revenue="Débito" value={totalDebit} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex-1"
          >
            <CardPaymentMethod revenue="Crédito" value={totalCredit} />
          </motion.div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="col-span-2"
          >
            <ExpenseTable expenses={expensesList} />
          </motion.div>

          <div className="grid grid-cols-2 col-span-2 gap-2">
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
