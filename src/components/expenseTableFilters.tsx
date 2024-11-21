import { getAllExpenses } from "@/functions/balanceAndExpenses";
import type { ExpenseType } from "@/types/Types";
import { ListRestart, Search } from "lucide-react";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ExpenseTableFiltersProps {
  onFilterChange: React.Dispatch<React.SetStateAction<ExpenseType[]>>;
}

const createUserFormSchema = z.object({
  local: z.string(),
  tag: z.string(),
  paymentMethod: z.string(),
});

type createUserFormData = z.infer<typeof createUserFormSchema>;

export function ExpenseTableFilters({
  onFilterChange,
}: ExpenseTableFiltersProps) {
  const expenses = getAllExpenses();
  const uniqueTags = [...new Set(expenses.map((expense) => expense.tag))];

  const { register, handleSubmit, setValue, reset } =
    useForm<createUserFormData>({
      defaultValues: {
        local: "",
        tag: "all",
        paymentMethod: "all",
      },
    });

  const filterExpenses = useCallback(
    (formData: { local: string; tag: string; paymentMethod: string }) => {
      const filteredExpenses = expenses.filter((expense) => {
        const matchLocal = expense.local
          .toLowerCase()
          .includes(formData.local.toLowerCase());
        const matchTag = formData.tag === "all" || expense.tag === formData.tag;
        const matchPayment =
          formData.paymentMethod === "all" ||
          expense.paymentMethod.toLowerCase() === formData.paymentMethod;

        return matchLocal && matchTag && matchPayment;
      });

      onFilterChange(filteredExpenses);
    },
    [expenses, onFilterChange]
  );

  const onSubmit = (data: createUserFormData) => {
    filterExpenses(data);
  };

  const clearFilters = useCallback(() => {
    reset();
    onFilterChange(expenses);
  }, [expenses, onFilterChange, reset]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex items-center gap-2 flex-wrap w-full"
    >
      <span className="text-sm font-semibold">Filtros</span>

      <Input
        placeholder="Nome do local"
        className="h-8 w-auto flex-1"
        {...register("local")}
      />

      <Select
        defaultValue="all"
        onValueChange={(value) => setValue("tag", value)}
      >
        <SelectTrigger className="h-8 flex-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as tags</SelectItem>
          {uniqueTags.map((tag, index) => (
            <SelectItem
              key={`${tag}-${
                // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                index
              }`}
              value={tag}
            >
              {tag}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select
        defaultValue="all"
        onValueChange={(value) => setValue("paymentMethod", value)}
      >
        <SelectTrigger className="h-8 flex-1">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os métodos de pagamento</SelectItem>
          <SelectItem value="débito">Débito</SelectItem>
          <SelectItem value="crédito">Crédito</SelectItem>
          <SelectItem value="dinheiro">Dinheiro</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" variant="link">
        <Search className="mr-2 h-4 flex-1" />
        Filtrar resultados
      </Button>
      <Button type="button" variant="outline" onClick={clearFilters}>
        <ListRestart className="mr-2 h-4 flex-1" />
        Atualizar lista
      </Button>
    </form>
  );
}
