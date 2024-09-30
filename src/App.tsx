import { useEffect, useState } from "react";
import { AddNewBalance } from "./components/addNewBalance";
import { AddNewExpense, type ExpenseType } from "./components/addNewExpense";
import { CardChart } from "./components/cardChart";
import { CardMoney } from "./components/cardMoney";
import { ExpenseTable } from "./components/expenseTable";
import { Button } from "./components/ui/button";
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
      <div className="flex flex-col text-zinc-100 p-4 items-center md:w-[1200px] w-full h-screen space-y-4">
        <div className="w-full space-y-3">
          <div className="flex flex-col md:flex-row justify-between border-b p-4 border-zinc-400">
            <h1 className="font-bold text-lg md:text-3xl">
              Planilha de gastos
            </h1>
            <div className="flex gap-5 justify-center">
              <Button
                onClick={handleResetData}
                variant={"ghost"}
                className="text-sm md:text-base"
              >
                Resetar
              </Button>
                <AddNewBalance updateBalance={updateBalance} />
                <AddNewExpense
                  setExpense={setExpense}
                  updateBalance={descountBalance}
                  addNewExpense={addNewExpense}
                />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-2 justify-center md:p-4">
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex gap-2">
                <CardMoney revenue="Saldo" value={balance} />
                <CardMoney revenue="Despesas" value={expense} />
              </div>
              <CardChart />
            </div>
            <div>
              <ExpenseTable expenses={expensesList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
