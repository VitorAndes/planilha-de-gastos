import { getTotalExpenses } from "@/functions/getBalanceAndExpense";
import { handleCreateExpense } from "@/functions/handleCreateExpense";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export type ExpenseType = {
  local: string;
  expense: number;
  tag: string;
};

interface AddNewExpenseProps {
  setExpense: React.Dispatch<React.SetStateAction<number>>;
  updateBalance: (newExpense: number) => void;
  addNewExpense: (newExpense: ExpenseType) => void;
}

export function AddNewExpense({
  updateBalance,
  setExpense,
  addNewExpense,
}: AddNewExpenseProps) {
  const { register, handleSubmit, reset } = useForm<ExpenseType>();

  const onSubmit = (data: ExpenseType) => {
    handleCreateExpense(data.tag, data.expense, data.local);

    const newTotal = getTotalExpenses();
    setExpense(newTotal);

    updateBalance(data.expense);

    addNewExpense(data);

    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="text-xs md:text-base p-0">
          Adicionar gasto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 text-zinc-100 border border-zinc-400">
        <DialogHeader>
          <DialogTitle>Novo gasto</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 py-4 "
        >
          <div className="flex flex-col w-full items-center gap-2">
            <input
              className="bg-zinc-950 rounded-md p-2 w-full border border-zinc-400"
              type="text"
              placeholder="Digite onde gastou..."
              {...register("local")}
              required
            />
            <input
              className="bg-zinc-950 rounded-md p-2 w-full border border-zinc-400"
              type="number"
              placeholder="Digite quanto gastou..."
              {...register("expense")}
              required
            />
            <select
              id="tag"
              className="bg-zinc-950 rounded-md p-2 w-full border border-zinc-400"
              {...register("tag")}
              required
            >
              <option value="">-- Escolha uma das opções abaixo --</option>
              <option value="alimentação">alimentação</option>
              <option value="transporte">transporte</option>
              <option value="assinatura">assinatura</option>
              <option value="lazer">lazer</option>
            </select>
          </div>
          <DialogFooter className="w-full">
            <Button
              type="submit"
              className="bg-zinc-950 rounded-md p-2 w-full border border-zinc-400"
            >
              Atualizar gastos
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
