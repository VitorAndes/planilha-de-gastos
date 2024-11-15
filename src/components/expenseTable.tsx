import type { ExpenseType } from "@/types/Types";
import { Card } from "./ui/card";
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
    <Card className="py-4 flex flex-col rounded-md gap-2 flex-1 h-full  ">
      <div className="pb-6 px-4">
        <h1 className="text-lg font-bold -tracking-tighter">Transações</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="flex">
            <TableHead className="flex-1">Lugar</TableHead>
            <TableHead className="flex-1">Tag</TableHead>
            <TableHead className="flex-1">Gasto</TableHead>
            <TableHead className="flex-1">Método de pagamento</TableHead>
            <TableHead className="flex-1">Data de pagamento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-color-secondary">
          {expenses.map(
            ({ expense, local, tag, paymentMethod, paymentDate }, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <TableRow key={index} className="flex">
                <TableCell className="flex-1">
                  <span className="font-regular text-base ">{local}</span>
                </TableCell>
                <TableCell className="flex-1">
                  <span className="font-regular text-base ">{tag}</span>
                </TableCell>
                <TableCell className="flex-1">
                  <span className="font-regular text-base text-red-600">
                    ${expense.replace(".", ",")}
                  </span>
                </TableCell>
                {paymentMethod === "débito" ? (
                  <TableCell className="flex-1">
                    <span className="font-regular text-base text-cyan-600">
                      {paymentMethod}
                    </span>
                  </TableCell>
                ) : paymentMethod === "crédito" ? (
                  <TableCell className="flex-1">
                    <span className="font-regular text-base text-indigo-600">
                      {paymentMethod}
                    </span>
                  </TableCell>
                ) : (
                  <TableCell className="flex-1">
                    <span className="font-regular text-base text-emerald-600">
                      {paymentMethod}
                    </span>
                  </TableCell>
                )}
                <TableCell className="flex-1">
                  <span className="font-regular text-base ">{paymentDate}</span>
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
