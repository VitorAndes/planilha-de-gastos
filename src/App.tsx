import { useEffect, useState } from "react";
import { AddNewBalance } from "./components/addNewBalance";
import { AddNewExpense } from "./components/addNewExpense";
import { CardChart } from "./components/cardChart";
import { CardMoney } from "./components/cardMoney";
import { ExpenseTable } from "./components/expenseTable";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { CardChartPayments } from "./components/cardChartPayments";
import { CardPaymentMethod } from "./components/cardPaymentMethod";
import { CardResetData } from "./components/cardResetData";
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
    <div className="text-zinc-100 pb-28 min-h-screen w-full space-y-3">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col lg:flex-row items-center px-2 w-full bg-[#0A1626]/70 shadow rounded-b-md shadow-white"
      >
        <div className="flex gap-2 p-2 items-center">
          <img src="/assets/logo.png" alt="logo do site" className="w-10" />
          <h1 className="font-extrabold tracking-wider gap-2 text-lg md:text-xl bg-gradient-to-r from-[#79F297] to-rose-600 bg-clip-text text-transparent">
            AndesFinance
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex gap-2 px-2 py-10 lg:gap-2 h-16 justify-center lg:justify-end items-center flex-1 lg:static bottom-0 fixed z-10 rounded-t-lg lg:rounded=t-none bg-[#0A1626]/70 border-t-[#C2D2F2] border-t backdrop-blur lg:backdrop-blur-none lg:bg-transparent lg:border-none w-full lg:w-0"
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

      <div className="flex flex-col gap-3 p-0 md:p-4 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row gap-2">
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
          </motion.div>{" "}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex-1"
          >
            <CardPaymentMethod revenue="Débito" value={totalDebit} />
          </motion.div>{" "}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex-1"
          >
            <CardPaymentMethod revenue="Crédito" value={totalCredit} />
          </motion.div>
        </div>

        <div className="flex flex-col gap-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex-1 flex"
          >
            <ExpenseTable expenses={expensesList} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-1 flex-col md:flex-row gap-2"
          >
            <CardChart />
            <CardChartPayments />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
