import { useEffect, useState } from "react";
import { AddNewBalance } from "./components/addNewBalance";
import { AddNewExpense, type ExpenseType } from "./components/addNewExpense";
import { CardChart } from "./components/cardChart";
import { CardMoney } from "./components/cardMoney";
import { ExpenseTable } from "./components/expenseTable";

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
      <div className="flex flex-col  text-zinc-100 p-4 pb-20 items-center md:w-[1200px] min-h-screen w-full">
        <div className="w-full space-y-3">
          <div className="flex flex-col md:flex-row justify-between items-center bg-zinc-950/60 border-b md:p-4 p-2 border-zinc-500 shadow-sm shadow-zinc-400  rounded-xl">
            <h1 className="font-bold text-lg md:text-3xl bg-gradient-to-r from-zinc-300 via-lime-500 to-red-600 bg-clip-text text-transparent">
              Planilha de gastos
            </h1>
            <div className="flex gap-5 px-2 py-10 md:gap-2 h-16 justify-center items-center flex-1 md:static bottom-0 fixed z-10 rounded-t-2xl md:rounded=t-none bg-zinc-950/90 border-t-zinc-300 border-t backdrop-blur md:bg-transparent min-w-[320px] md:w-0">
              <AddNewBalance updateBalance={updateBalance} />

              <CardResetData handleResetData={handleResetData}/>
              <AddNewExpense
                setExpense={setExpense}
                updateBalance={descountBalance}
                addNewExpense={addNewExpense}
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-3 justify-center p-0 md:p-4">
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex gap-3">
                <CardMoney
                  revenue="Saldo"
                  value={balance.toFixed(2).replace(".", ",")}
                />
                <CardMoney
                  revenue="Despesas"
                  value={expense.toFixed(2).replace(".", ",")}
                />
              </div>
              <CardChart />
            </div>
            <div className="grid col-span-2 row-span-2">
              <ExpenseTable expenses={expensesList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
