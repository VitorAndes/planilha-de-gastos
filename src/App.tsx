import { AddNewBalance } from "./components/addNewBalance";
import { AddNewExpense } from "./components/addNewExpense";
import { CardMoney } from "./components/cardMoney";
import { ExpenseTable } from "./components/expenseTable";
import { TotalExpenses } from "./components/totalExpenses";

export function App() {
  return (
    <>
      <div className="flex flex-col text-zinc-100 p-4 m-auto w-[1200px] h-screen space-y-2">
        <div className="w-full space-y-3">
          <div className="flex justify-between border-b p-4 border-zinc-400">
            <h1 className="font-bold text-3xl ">Planilha de gastos</h1>
            <div className="flex gap-2">
              <div>
                <AddNewBalance />
                <AddNewExpense />
              </div>

              <div className="flex gap-9"></div>
            </div>
          </div>

          <div className="flex gap-2 p-4">
            <ExpenseTable />
            <div className="flex flex-col flex-1 gap-2">
              <div className="flex gap-2">
                <CardMoney revenue="Saldo" value={1600}/>
                <CardMoney revenue="Despesas" value={200}/>
              </div>
              <TotalExpenses />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
