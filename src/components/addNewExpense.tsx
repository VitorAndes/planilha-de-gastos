import { getTotalExpenses } from "@/functions/getBalanceAndExpense";
import { handleCreateExpense } from "@/functions/handleCreateExpense";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDollarSign } from "lucide-react";
import { useForm } from "react-hook-form";
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

export type ExpenseType = {
  local: string;
  expense: string;
  tag: string;
};

const createUserFormSchema = z.object({
  local: z
    .string()
    .nonempty("Digite um local")
    .regex(/^[a-zA-ZÀ-ÿ\s\.,'-]+$/, "Apenas letras são permitidas"),
  expense: z.string().nonempty("Digite um valor"),
  tag: z.string().nonempty("Escolha uma tag"),
});

type createUserFormData = z.infer<typeof createUserFormSchema>;

interface AddNewExpenseProps {
  setExpense: React.Dispatch<React.SetStateAction<number>>;
  updateBalance: (newExpense: number) => void;
  addNewExpense: (newExpense: createUserFormData) => void;
}

export function AddNewExpense({
  updateBalance,
  setExpense,
  addNewExpense,
}: AddNewExpenseProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const onSubmit = (data: createUserFormData) => {
    handleCreateExpense(data.tag, data.expense, data.local);

    const newTotal = getTotalExpenses();
    setExpense(newTotal);

    updateBalance(Number(data.expense));

    addNewExpense(data);

    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="flex flex-col md:gap-1 text-black md:text-white md:text-base p-8 rounded-t-xl md:rounded-xl md:p-9"
        >
          <span>
            <CircleDollarSign size={40} />
          </span>
          Novo gasto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-zinc-950 text-zinc-100 border border-zinc-400">
        <DialogHeader>
          <DialogTitle>Novo gasto</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 py-4 "
        >
          <div className="flex flex-col w-full items-center gap-4">
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="local">Com oque gastou ?</label>
              <input
                className="bg-zinc-950 rounded-md p-2 w-full border border-zinc-400"
                type="text"
                placeholder="Digite com oque gastou..."
                {...register("local")}
                required
              />
              {errors.local && (
                <span className="text-red-600">{errors.local.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="expense">Quanto gastou ?</label>
              <input
                className="bg-zinc-950 rounded-md p-2 w-full border border-zinc-400"
                type="text"
                placeholder="Digite quanto gastou..."
                {...register("expense")}
                required
              />
              {errors.expense && (
                <span className="text-red-600">{errors.expense.message}</span>
              )}
            </div>
            <select
              id="tag"
              className="bg-zinc-950 rounded-md p-2 w-full border border-zinc-400"
              {...register("tag")}
              required
            >
              <option value="">-- Selecione onde gastou --</option>
              <option value="alimentação">alimentação</option>
              <option value="cosméticos">cosméticos</option>
              <option value="transporte">transporte</option>
              <option value="assinatura">assinatura</option>
              <option value="eletrônicos">eletrônicos</option>
              <option value="jogos">jogos</option>
              <option value="emergências">emergências</option>
              <option value="consultas">consultas de saúde</option>
              <option value="lazer">lazer</option>
              <option value="outros">outros</option>
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
