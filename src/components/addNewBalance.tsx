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
    toast.success("Novo saldo adicionado!");

    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className="text-sm md:text-lg flex flex-col gap-2 transition-all hover:scale-110"
        >
          <Wallet
            size={34}
            className="text-emerald-700 hover:text-emerald-300"
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo saldo</DialogTitle>
          <DialogDescription>
            Adicione um novo saldo para começar a gastar.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col text-color-text items-center gap-4 py-4 "
        >
          <div className="flex flex-col w-full gap-2">
            <input
              className="rounded-lg p-2 w-full border text-black"
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
              className="bg-color-card text-color-accent rounded-lg p-2 w-full border border-color-secondary"
            >
              Atualizar Saldo
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
