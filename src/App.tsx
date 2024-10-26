import { useEffect, useState } from "react";
import { AddNewBalance } from "./components/addNewBalance";
import { AddNewExpense, type ExpenseType } from "./components/addNewExpense";
import { CardChart } from "./components/cardChart";
import { CardMoney } from "./components/cardMoney";
import { ExpenseTable } from "./components/expenseTable";

import { motion } from "framer-motion";
import { toast } from "sonner";
import { CardResetData } from "./components/cardResetData";
import {
  getAllExpenses,
  getTotalExpenses,
} from "./functions/getBalanceAndExpense";

export function App() {
  const [balance, setBalance] = useState(0);
  const [expense, setExpense] = useState(0);
  const [expensesList, setExpensesList] = useState<ExpenseType[]>([]);

  useEffect(() => {
    const storedBalance = localStorage.getItem("balance");
    setBalance(storedBalance ? Number(storedBalance) : 0);

    const expenseValue = getTotalExpenses();
    setExpense(expenseValue);

    const allExpenses = getAllExpenses();
    setExpensesList(allExpenses);
  }, []);

  const handleResetData = () => {
    localStorage.clear();
    setBalance(0);
    setExpense(0);
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

  return (
    <>
      <div className="flex flex-col m-auto text-zinc-100 p-4 pb-28 max-w-7xl min-h-screen w-full space-y-3 items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row items-center w-full bg-gray-950/70 border-b md:p-4 p-2 border-zinc-500 shadow-md shadow-zinc-400 rounded-lg"
        >
          <div className="flex gap-2 items-center">
            <img src="/assets/logo.png" alt="logo do site" className="rounded-full w-[70px]"/>
            <h1 className="font-extrabold tracking-wider gap-2 text-lg md:text-3xl bg-gradient-to-r from-lime-500 to-rose-500 bg-clip-text text-transparent">
              AndesFinance
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="flex gap-2 px-2 py-10 lg:gap-2 h-16 justify-center lg:justify-end items-center flex-1 lg:static bottom-0 fixed z-10 rounded-t-lg lg:rounded=t-none bg-gray-950/70 border-t-zinc-300 border-t backdrop-blur lg:backdrop-blur-none lg:bg-transparent lg:border-none lg:bg- w-full lg:w-0"
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

        <div className="flex flex-col md:flex-wrap md:flex-row gap-3 p-0 md:p-4 w-full">
          <div className="flex flex-1 flex-col gap-3">
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
                <CardMoney
                  revenue="Despesas"
                  value={expense.toFixed(2).replace(".", ",")}
                />
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex-1"
            >
              <CardChart />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex-1 flex"
          >
            <ExpenseTable expenses={expensesList} />
          </motion.div>
        </div>
      </div>
    </>
  );
}
