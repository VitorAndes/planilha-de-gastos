import { handleNewBalance } from "@/functions/handleNewBalanceAndExpense";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wallet } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const createUserFormSchema = z.object({
  balance: z
    .string()
    .nonempty("Digite um valor")
    .regex(
      /^-?\d+([.,]\d+)?$/,
      "Deve ser um número válido e sem letras, exemplo: 333,33"
    ),
});

type createUserFormData = z.infer<typeof createUserFormSchema>;

interface AddNewBalanceProps {
  updateBalance: (newBalance: number) => void;
}

export function AddNewBalance({ updateBalance }: AddNewBalanceProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const onSubmit = (data: createUserFormData) => {
    handleNewBalance(data.balance);
    updateBalance(Number.parseFloat(data.balance.replace(",", ".")));
    toast.success("Novo saldo adicionado!");
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className="text-sm flex flex-col gap-2 transition-all text-zinc-100 md:text-base hover:text-lime-500"
        >
          <span>
            <Wallet size={40} className="text-lime-600" />
          </span>
          Novo saldo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[525px] bg-zinc-950/80 text-zinc-100 border border-zinc-400 backdrop-blur">
        <DialogHeader>
          <DialogTitle>Novo saldo</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 py-4 "
        >
          <div className="flex flex-col w-full gap-2">
            <input
              className="bg-zinc-950 rounded-lg p-2 w-full border border-zinc-400"
              type="text"
              placeholder="Adicionar Saldo"
              {...register("balance")}
            />
            {errors.balance && (
              <span className="text-red-600">{errors.balance.message}</span>
            )}
          </div>
          <DialogFooter className="w-full">
            <Button
              type="submit"
              onClick={() => {}}
              className="bg-zinc-950 rounded-lg p-2 w-full border border-zinc-400"
            >
              Atualizar Saldo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
