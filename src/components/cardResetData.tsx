import { RotateCwIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

interface CardResetDataProps {
  handleResetData: () => void;
}

export function CardResetData({ handleResetData }: CardResetDataProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          className="text-sm flex flex-col gap-2 transition-all text-zinc-100 hover:text-zinc-500"
        >
          <span>
            <RotateCwIcon size={34} className="text-zinc-500" />
          </span>
          Resetar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[525px]  text-zinc-100 backdrop-blur p-8 space-y-6">
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja resetar os dados?</DialogTitle>
          <DialogDescription>
            Resete seus dados para iniciar um novo mês
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 w-full">
          <DialogClose className="bg-red-600 hover:bg-red-500 rounded-md p-2 w-full border border-zinc-400">
            Cancelar
          </DialogClose>
          <DialogClose
            type="button"
            onClick={handleResetData}
            className="bg-[#0A1626] hover:bg-zinc-800 rounded-md p-2 w-full border border-zinc-400"
          >
            Sim
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
