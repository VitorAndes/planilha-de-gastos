import { RotateCwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { AddNewBalance } from "./components/addNewBalance";
import { AddNewExpense, type ExpenseType } from "./components/addNewExpense";
import { CardChart } from "./components/cardChart";
import { CardMoney } from "./components/cardMoney";
import { ExpenseTable } from "./components/expenseTable";
import { Button } from "./components/ui/button";

import { toast } from "sonner";
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

    toast.success("Os dados foram resetados", {
      className: " text-base p-5"
    })
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
      <div className="flex flex-col text-zinc-100 p-4 pb-20 items-center md:w-[1200px] min-h-screen w-full">
        <div className="w-full space-y-3">
          <div className="flex flex-col md:flex-row justify-between items-center border-b md:p-4 p-2 border-zinc-700">
            <h1 className="font-bold text-lg md:text-3xl">
              Planilha de gastos
            </h1>
            <div className="flex gap-5 px-10 md:gap-2 backdrop-blur h-16 justify-center md:justify-center items-center flex-1 md:static bottom-0 left-0 fixed z-10 rounded-t-xl md:rounded=t-none bg-zinc-100 md:bg-transparent w-full md:w-0">
              <AddNewBalance updateBalance={updateBalance} />

              <Button
                onClick={handleResetData}
                variant={"ghost"}
                className="text-sm w-32 flex flex-col md:gap-1 md:text-white transition-all hover:bg-zinc-950 hover:text-white text-black md:text-base py-8 px-4 rounded-t-xl md:rounded-xl md:p-9 md:hover:bg-zinc-100 md:hover:text-black"
              >
                <span>
                  <RotateCwIcon size={40} />
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

          <div className="flex flex-col md:flex-row gap-4 justify-center p-0 md:p-4">
            <div className="flex flex-col flex-1 gap-4">
              <div className="flex gap-2">
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
            <div>
              <ExpenseTable expenses={expensesList} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
