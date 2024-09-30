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
    <div className="rounded-md md:w-[780px] border border-zinc-500">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="flex-1 text-white">Lugar</TableHead>
            <TableHead className="flex-1 text-white">Tag</TableHead>
            <TableHead className="flex-1 text-white">Gasto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <TableRow key={index}>
              <TableCell className="text-zinc-400">{expense.local}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-zinc-400">
                    {expense.tag}
                  </span>
                </div>
              </TableCell>
              <TableCell className="font-medium text-red-500">
                R$ {expense.expense}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
