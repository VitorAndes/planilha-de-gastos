import { RotateCwIcon } from "lucide-react";
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
      <div className="flex flex-col text-zinc-100 p-4 items-center md:w-[1200px] min-h-screen w-full space-y-4">
        <div className="w-full space-y-3">
          <div className="flex flex-col md:flex-row justify-between border-b md:p-4 p-2 border-zinc-700">
            <h1 className="font-bold text-lg md:text-3xl">
              Planilha de gastos
            </h1>
            <div className="flex gap-10 md:gap-7 backdrop-blur h-20 justify-center items-center flex-1 md:static bottom-0 left-0 fixed z-10 rounded-t-xl md:rounded=t-none bg-white/90 md:bg-transparent w-full md:w-0">
              <AddNewBalance updateBalance={updateBalance} />
              <Button
                onClick={handleResetData}
                variant={"link"}
                className="text-sm flex flex-col gap-2 md:text-white text-black md:text-base p-0 md:p-4"
              >
                <span>
                  <RotateCwIcon size={50} />
                </span>
                Resetar
              </Button>
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
                <CardMoney
                  revenue="Saldo"
                  value={String(balance.toFixed(2)).replace(".", ",")}
                />
                <CardMoney
                  revenue="Despesas"
                  value={expense.toFixed(2).replace(".", ",")}
                />
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
