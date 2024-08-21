import { CircleDollarSign } from "lucide-react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  Table,
  TableCell,
} from "./components/ui/table";
import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "./components/ui/dialog";
import { Button } from "./components/ui/button";

export function App() {
  return (
    <>
      <div className="flex flex-col p-4 m-auto h-screen space-y-2">
        <form action="" className="flex gap-2 items-center">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-zinc-950 rounded-md p-2 w-60 border border-zinc-400">
                Adicionar Saldo
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-950 border border-zinc-400">
              <DialogHeader>
                <DialogTitle>Novo saldo</DialogTitle>
              </DialogHeader>
              <form
                action=""
                className="flex flex-col items-center gap-4 py-4 "
              >
                <div className="flex flex-col self-start gap-2">
                  <input
                    className="bg-zinc-950 rounded-md p-2 w-60 border border-zinc-400"
                    type="text"
                    placeholder="Adicionar Saldo"
                  />
                </div>
                <DialogFooter className="w-full">
                  <Button
                    type="submit"
                    className="bg-zinc-950 rounded-md p-2 w-full border border-zinc-400"
                  >
                    Atualizar Saldo
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-zinc-950 rounded-md p-2 w-60 border border-zinc-400">
                Adicionar novo gasto
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-zinc-950 border border-zinc-400">
              <DialogHeader>
                <DialogTitle>Novo gasto</DialogTitle>
              </DialogHeader>
              <form
                action=""
                className="flex flex-col items-center gap-4 py-4 "
              >
                <div className="flex flex-col self-start gap-2">
                  <input
                    className="bg-zinc-950 rounded-md p-2 w-60 border border-zinc-400"
                    type="text"
                    placeholder="Digite onde gastou..."
                  />
                  <input
                    className="bg-zinc-950 rounded-md p-2 w-60 border border-zinc-400"
                    type="text"
                    placeholder="Digite quanto gastou..."
                  />
                </div>
                <DialogFooter className="w-full">
                  <Button
                    type="submit"
                    className="bg-zinc-950 rounded-md p-2 w-full border border-zinc-400"
                  >
                    Atualizar gastos
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </form>
        <div className="flex gap-2">
          <div className="flex flex-col space-y-2 rounded-md w-60 h-28 p-4 border border-zinc-500">
            <h1 className="text-xl font-bold tracking-wider flex justify-between items-center">
              Saldo{" "}
              <span>
                {" "}
                <CircleDollarSign className="size-5" />{" "}
              </span>
            </h1>
            <span className="text-xl text-zinc-400">
              R$ <strong className="text-lime-400">1600</strong>
            </span>
          </div>
          <div className="flex flex-col space-y-2 rounded-md w-60 h-28 p-4 border border-zinc-500">
            <h1 className="text-xl font-bold tracking-wider flex justify-between items-center">
              Despesas{" "}
              <span>
                <CircleDollarSign className="size-5" />
              </span>
            </h1>
            <span className="text-xl text-zinc-400">
              R$ <strong className="text-red-600">1600</strong>
            </span>
          </div>
          <div className="grid grid-cols-6 gap-1 content-center rounded-md w-80 h-28 p-4 border border-zinc-500">
            <Button>JAN</Button>
            <Button>FEV</Button>
            <Button>MAR</Button>
            <Button>ABR</Button>
            <Button>MAI</Button>
            <Button>JUN</Button>
            <Button>JUL</Button>
            <Button>AGO</Button>
            <Button>SET</Button>
            <Button>OUT</Button>
            <Button>NOV</Button>
            <Button>DEZ</Button>
          </div>
        </div>
        <div className="flex gap-2 w-[840px] h-full">
          <div className="rounded-md w-[488px] h-full p-4 border border-zinc-500">
            <div className="flex flex-col gap-4">
              <h1 className="text-xl font-bold tracking-wider">Gastos</h1>
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
          <div className="flex flex-col items-center gap-4 p-4 rounded-md h-full w-80 border border-zinc-500">
            <h1 className="text-xl font-bold tracking-wider">
              Total de gastos
            </h1>
            <img
              src="https://user-images.githubusercontent.com/17594777/87848893-9bc99700-c8e4-11ea-992d-8980cf562b1b.png"
              alt=""
              className="rounded-full "
            />
          </div>
        </div>
      </div>
    </>
  );
}
