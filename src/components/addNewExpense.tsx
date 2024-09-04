import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export function AddNewExpense() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"ghost"} className="text-lg">
          Adicionar novo gasto
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-zinc-950 border border-zinc-400">
        <DialogHeader>
          <DialogTitle>Novo gasto</DialogTitle>
        </DialogHeader>
        <form action="" className="flex flex-col items-center gap-4 py-4 ">
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
  );
}
