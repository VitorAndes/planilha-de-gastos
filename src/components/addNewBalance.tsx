import { handleNewBalance } from "@/functions/expenseAndBalanceHandlers";
import { zodResolver } from "@hookform/resolvers/zod";
import { Wallet } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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

  const onSubmit = ({ balance }: createUserFormData) => {
    const formattedBalance = Number.parseFloat(balance.replace(",", "."));

    handleNewBalance(balance);
    updateBalance(formattedBalance);
    toast.success(`Novo saldo adicionado! ${balance}`);

    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className="text-sm md:text-lg flex flex-col gap-2 transition-all text-my-body hover:text-emerald-600"
        >
          <span>
            <Wallet size={34} className="text-emerald-700" />
          </span>
          Novo saldo
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[525px] text-my-body backdrop-blur">
        <DialogHeader>
          <DialogTitle>Novo saldo</DialogTitle>
          <DialogDescription>
            Adicione um novo saldo para começar a gastar.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 py-4 "
        >
          <div className="flex flex-col w-full gap-2">
            <input
              className="rounded-lg p-2 w-full border"
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
              className="bg-my-body text-secondary rounded-lg p-2 w-full border"
            >
              Atualizar Saldo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
