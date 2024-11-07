import { getBalance, getTotalExpenses } from "@/functions/getBalanceAndExpense";
import { handleCreateExpense } from "@/functions/handleCreateExpense";
import type { ExpenseData } from "@/types/Types";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleDollarSign } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
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
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const createUserFormSchema = z.object({
  local: z
    .string()
    .nonempty("Digite um local")
    .regex(/^[a-zA-ZÀ-ÿ\s\.,'-]+$/, "Apenas letras são permitidas"),
  expense: z
    .string()
    .nonempty("Digite um valor")
    .regex(
      /^-?\d+([.,]\d+)?$/,
      "Deve ser um número válido e sem letras, exemplo: 333,33"
    ),
  tag: z.string().nonempty("Escolha uma tag"),
  paymentMethod: z.enum(["crédito", "débito", "dinheiro"]),
});

type createUserFormData = z.infer<typeof createUserFormSchema>;

interface AddNewExpenseProps {
  setExpense: React.Dispatch<React.SetStateAction<ExpenseData[]>>;
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
    control,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const onSubmit = (data: createUserFormData) => {
    const balance = getBalance();

    if (Number.parseFloat(data.expense.replace(",", ".")) > balance) {
      toast.error("Não foi possivel finalizar a compra por falta de saldo.");
      return 0;
    }

    handleCreateExpense(data.tag, data.expense, data.local, data.paymentMethod);

    const newTotal = getTotalExpenses();
    setExpense(newTotal);

    updateBalance(Number.parseFloat(data.expense.replace(",", ".")));

    addNewExpense(data);

    toast.success("Novo gasto foi adicionado!");

    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className="text-lg flex flex-col gap-2 transition-all text-primary hover:text-rose-700"
        >
          <span>
            <CircleDollarSign size={34} className="text-rose-700" />
          </span>
          Novo gasto
        </Button>
      </DialogTrigger>
      <DialogContent className="text-primary backdrop-blur">
        <DialogHeader>
          <DialogTitle>Novo gasto</DialogTitle>
          <DialogDescription>
            Adicione um novo gasto para ser gerenciado.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4 py-4"
        >
          <div className="flex flex-col w-full items-center gap-4">
            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="local" className="font-medium">
                Com oque gastou ?
              </label>
              <input
                className=" rounded-lg p-2 w-full border border-[#C2D2F2]"
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
              <label htmlFor="expense" className="font-medium">
                Quanto gastou ?
              </label>
              <input
                className=" rounded-lg p-2 w-full border border-[#C2D2F2]"
                type="text"
                placeholder="Digite quanto gastou..."
                {...register("expense")}
                required
              />
              {errors.expense && (
                <span className="text-red-600">{errors.expense.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-3 w-full">
              <span className="font-medium">Forma de pagamento</span>

              <Controller
                name="paymentMethod"
                control={control}
                defaultValue="débito"
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    className="flex justify-center"
                    onValueChange={(value) => field.onChange(value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="débito"
                        id="debit"
                        className="text-sky-600"
                      />
                      <label htmlFor="debit">Débito</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="crédito"
                        id="credit"
                        className="text-violet-600"
                      />
                      <label htmlFor="credit">Crédito</label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="dinheiro"
                        id="cash"
                        className="text-lime-500"
                      />
                      <label htmlFor="cash">Dinheiro</label>
                    </div>
                  </RadioGroup>
                )}
              />
              {errors.paymentMethod && (
                <span className="text-red-600">
                  {errors.paymentMethod.message}
                </span>
              )}
            </div>
            <select
              id="tag"
              className=" rounded-lg p-2 w-full border border-[#C2D2F2]"
              {...register("tag")}
              required
            >
              <option value="">-- Selecione a tag --</option>
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
              onClick={() => {}}
              className="bg-my-body text-secondary rounded-md p-2 w-full border border-[#C2D2F2]"
            >
              Atualizar gastos
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
