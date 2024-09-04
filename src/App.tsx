import { CardMoney } from "./components/cardMoney";
import { AddNewBalance } from "./components/addNewBalance";
import { AddNewExpense } from "./components/addNewExpense";
import { ExpenseTable } from "./components/expenseTable";
import { TotalExpenses } from "./components/totalExpenses";

export function App() {
  return (
    <>
      <div className="flex flex-col p-4 m-auto w-[1200px] h-screen space-y-2">
        <div className="w-full space-y-3">
          <div className="flex justify-between items-center border-b p-4 border-zinc-400 rounded-md mb-2">
            <h1 className="font-bold text-3xl ">Planilha de gastos</h1>
            <div className="flex gap-4 mr-4">
              <form action="">
                <AddNewBalance />
                <AddNewExpense />
              </form>

              <div className="flex gap-9">
                <CardMoney revenue="Saldo" value={1600} />
                <CardMoney revenue="Despesas" value={200} />
              </div>
            </div>
          </div>

          <div className="flex gap-2 p-4">
            <ExpenseTable />
            <TotalExpenses />
          </div>
        </div>
      </div>
    </>
  );
}
