import { handleNewBalance } from "@/functions/handleNewBalanceAndExpense";
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

type formInputType = {
  balance: string;
};

interface AddNewBalanceProps {
  updateBalance: (newBalance: number) => void; // Adiciona a prop
}

export function AddNewBalance({ updateBalance }: AddNewBalanceProps) {
  const { register, handleSubmit, reset } = useForm<formInputType>();

  const onSubmit = (data: formInputType) => {
    handleNewBalance(data.balance);
    updateBalance(Number(data.balance));
    // console.log(data.balance);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"link"} className="text-xs text-black md:text-white md:text-base p-0 md:p-4">
          Novo Saldo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 text-zinc-100 border border-zinc-400">
        <DialogHeader>
          <DialogTitle>Novo saldo</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 py-4 "
        >
          <div className="flex flex-col w-full gap-2">
            <input
              className="bg-zinc-950 rounded-md p-2 w-full border border-zinc-400"
              type="text"
              placeholder="Adicionar Saldo"
              {...register("balance")}
            />
          </div>
          <DialogFooter className="w-full">
            <Button
              type="submit"
              className="bg-zinc-950 rounded-md p-2 w-full border border-zinc-400"
            >
              Atualizar Saldo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
