import type { ExpenseType } from "./addNewExpense";
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
    <div className="rounded-md py-4 shadow shadow-white md:w-[580px] flex flex-1 w-full h-full border border-zinc-500 bg-gray-950/70">
      <Table>
        <TableHeader>
          <TableRow className="flex">
            <TableHead className="flex-1 text-white">Lugar</TableHead>
            <TableHead className="flex-1 text-white">Tag</TableHead>
            <TableHead className="flex-1 text-white">Gasto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map(({ expense, local, tag }, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <TableRow key={index} className="flex">
              <TableCell className="text-zinc-400 text-xs flex-1">
                <span>{local}</span>
              </TableCell>
              <TableCell className="flex-1">
                <span className="font-medium text-zinc-400 text-xs">{tag}</span>
              </TableCell>
              <TableCell className="font-medium flex-1 text-red-600 text-xs">
                <span>R$ {expense.replace(".", ",")}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
