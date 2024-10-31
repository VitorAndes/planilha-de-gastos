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
    <div className="rounded-md py-4 shadow shadow-white flex flex-col flex-1 gap-2 max-w-7xl h-full  bg-[#0A1626]/70">
      <div className="pb-6 px-4">
        <h1 className="text-lg font-bold">Transações</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="flex">
            <TableHead className="flex-1 text-white">Lugar</TableHead>
            <TableHead className="flex-1 text-white">Tag</TableHead>
            <TableHead className="flex-1 text-white">Gasto</TableHead>
            <TableHead className="flex-1 text-white">
              Método de pagamento
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map(({ expense, local, tag, paymentMethod }, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <TableRow key={index} className="flex">
              <TableCell className="text-zinc-400 flex-1">
                <span>{local}</span>
              </TableCell>
              <TableCell className="flex-1">
                <span className="font-medium text-zinc-400">{tag}</span>
              </TableCell>
              <TableCell className="font-medium flex-1 text-red-600">
                <span>R$ {expense.replace(".", ",")}</span>
              </TableCell>
              {paymentMethod === "débito" ? (
                <TableCell className="font-medium flex-1 text-[#C2D2F2]">
                  <span>{paymentMethod}</span>
                </TableCell>
              ) : paymentMethod === "crédito" ? (
                <TableCell className="font-medium flex-1 text-blue-500">
                  <span>{paymentMethod}</span>
                </TableCell>
              ) : (
                <TableCell className="font-medium flex-1 text-[#79F297]">
                  <span>{paymentMethod}</span>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
