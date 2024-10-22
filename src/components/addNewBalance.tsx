import { handleNewBalance } from "@/functions/handleNewBalanceAndExpense";
import { Wallet } from "lucide-react";
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
    updateBalance(Number.parseFloat(data.balance.replace(',', '.')));
    // console.log(data.balance);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="text-sm flex flex-col md:gap-1 text-black hover:bg-zinc-950 hover:text-white w-32 transition-all md:text-white md:text-base py-8 px-4 rounded-t-xl md:rounded-xl md:p-9 md:hover:bg-zinc-100 md:hover:text-black"
        >
          <span>
            <Wallet size={40} />
          </span>
          Novo saldo
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
