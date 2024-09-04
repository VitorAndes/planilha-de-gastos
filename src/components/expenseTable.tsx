import { DataExpenses } from "@/data/dataExpenses";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "./ui/table";

export function ExpenseTable() {
  return (
    <div className="rounded-md w-[700px] border border-zinc-500">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px] text-white">Lugar</TableHead>
            <TableHead className="w-[180px] text-white">Tag</TableHead>
            <TableHead className="w-[140px] text-white">Gasto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DataExpenses.map((expense, i) => {
            return (
              <TableRow key={i}>
                <TableCell className="text-zinc-400">
                  {expense.local}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-zinc-400">
                      {expense.tag}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-medium text-red-500">
                  R$ {expense.value}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
