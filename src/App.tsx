import { CircleDollarSign } from "lucide-react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableCell,
} from "./components/ui/table";

export function App() {
  return (
    <>
      <div className="flex flex-col p-4 m-auto h-screen space-y-4 text-zinc-100">
        <div className="flex gap-2">
          <input
            className="bg-zinc-950 b-1 rounded-lg p-2 w-80 border border-white"
            type="text"
            placeholder="Digite onde gastou..."
          />
          <input
            className="bg-zinc-950 b-1 rounded-lg p-2 w-80 border border-white"
            type="text"
            placeholder="Digite quanto gastou..."
          />
          <button className="bg-zinc-950 rounded-lg h-14 w-32 border border-white">
            Adicionar
          </button>
        </div>
        <div className="flex gap-2 items-start">
          <div className="flex flex-col bg-slate-950 space-y-4 rounded-3xl w-80 h-40 p-7 border border-zinc-500">
            <h1 className="text-3xl flex justify-between items-center">
              Saldo{" "}
              <span>
                {" "}
                <CircleDollarSign className="size-7" />{" "}
              </span>
            </h1>
            <span className="text-2xl text-zinc-400">
              R$ <strong className="text-lime-400">1600</strong>
            </span>
          </div>
          <div className="flex flex-col bg-slate-950 space-y-4 rounded-3xl w-80 h-40 p-7 border border-zinc-500">
            <h1 className="text-3xl flex justify-between items-center">
              Despesas{" "}
              <span>
                <CircleDollarSign className="size-7" />
              </span>
            </h1>
            <span className="text-2xl text-zinc-400">
              R$ <strong className="text-red-600">1600</strong>
            </span>
          </div>
        </div>
        <div className="flex gap-2 h-full">
          <div className="bg-slate-950 rounded-3xl w-[1028px] h-full p-4 border border-zinc-500">
            <div className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold tracking-tight">Gastos</h1>
              <div className="space-y-2.5 ">
                <div className="rounded-md border border-zinc-500">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[140px]">Lugar</TableHead>
                        <TableHead className="w-[180px]">Tag</TableHead>
                        <TableHead className="w-[140px]">Gasto</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="text-muted-foreground">
                          Mercadinho
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-muted-foreground">
                              Alimentação
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">R$ 333,33</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center p-4 bg-slate-950 rounded-3xl h-full w-80 border border-zinc-500">
            <h1 className="text-3xl">Total de gastos</h1>
          </div>
        </div>
      </div>
    </>
  );
}
