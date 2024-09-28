import { useEffect, useState } from "react";
import { AddNewBalance } from "./components/addNewBalance";
import { AddNewExpense, type ExpenseType } from "./components/addNewExpense";
import { CardMoney } from "./components/cardMoney";
import { ExpenseTable } from "./components/expenseTable";
import { TotalExpenses } from "./components/totalExpenses";
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
      <div className="flex flex-col text-zinc-100 p-4 m-auto w-[1200px] h-screen space-y-2">
        <div className="w-full space-y-3">
          <div className="flex justify-between border-b p-4 border-zinc-400">
            <h1 className="font-bold text-3xl">Planilha de gastos</h1>
            <div className="flex gap-2">
              <div>
                <Button onClick={handleResetData}>Resetar</Button>
                <AddNewBalance updateBalance={updateBalance} />
                <AddNewExpense
                  setExpense={setExpense}
                  updateBalance={descountBalance}
                  addNewExpense={addNewExpense}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-2 p-4">
            <ExpenseTable expenses={expensesList} />
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex gap-2">
                <CardMoney revenue="Saldo" value={balance} />
                <CardMoney revenue="Despesas" value={expense} />
              </div>
              <TotalExpenses />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
