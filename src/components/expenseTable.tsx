import type { ExpenseType } from "@/types/Types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

interface ExpenseTableProps {
  expenses: ExpenseType[];
}

export function ExpenseTable({ expenses }: ExpenseTableProps) {
  return (
    <div className="rounded-md py-4 bg-gradient-to-b from-text-secondary to-my-primary text-primary flex flex-col flex-1 gap-2 max-w-7xl h-full shadow-sm shadow-violet-300">
      <div className="pb-6 px-4">
        <h1 className="text-lg font-bold -tracking-tighter">Transações</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="flex">
            <TableHead className="flex-1 font-bold text-base text-primary">
              Lugar
            </TableHead>
            <TableHead className="flex-1 font-bold text-base text-primary">
              Tag
            </TableHead>
            <TableHead className="flex-1 font-bold text-base text-primary">
              Gasto
            </TableHead>
            <TableHead className="flex-1 font-bold text-base text-primary">
              Método de pagamento
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map(({ expense, local, tag, paymentMethod }, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <TableRow key={index} className="flex">
              <TableCell className="flex-1">
                <span className="font-regular text-base text-primary">
                  {local}
                </span>
              </TableCell>
              <TableCell className="flex-1">
                <span className="font-regular text-base text-primary">
                  {tag}
                </span>
              </TableCell>
              <TableCell className="flex-1">
                <span className="font-regular text-base text-red-800">
                  R$ {expense.replace(".", ",")}
                </span>
              </TableCell>
              {paymentMethod === "débito" ? (
                <TableCell className="flex-1">
                  <span className="font-regular text-base text-violet-900">
                    {paymentMethod}
                  </span>
                </TableCell>
              ) : paymentMethod === "crédito" ? (
                <TableCell className="flex-1">
                  <span className="font-regular text-base text-indigo-900">
                    {paymentMethod}
                  </span>
                </TableCell>
              ) : (
                <TableCell className="flex-1">
                  <span className="font-regular text-base text-emerald-900">
                    {paymentMethod}
                  </span>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
