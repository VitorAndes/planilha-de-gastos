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
    <div className="rounded-xl shadow shadow-white md:w-[580px] flex flex-1 h-full border border-zinc-500 bg-zinc-950/60">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="flex-1 text-white">Lugar</TableHead>
            <TableHead className="flex-1 text-white">Tag</TableHead>
            <TableHead className="flex-1 text-white">Gasto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map(({ expense, local, tag }, index) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <TableRow key={index}>
              <TableCell className="text-zinc-400">{local}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-zinc-400">{tag}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium text-red-600">
                R$ {expense.replace(".", ",")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
