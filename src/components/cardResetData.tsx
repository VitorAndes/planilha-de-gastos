import { RotateCwIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
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
          className="text-sm flex flex-col gap-2 transition-all text-zinc-100 md:text-base hover:text-zinc-500"
        >
          <span>
            <RotateCwIcon size={40} className="text-zinc-500" />
          </span>
          Resetar
        </Button>
      </DialogTrigger>
      <DialogContent className="md:max-w-[525px] bg-zinc-950/80 text-zinc-100 border border-zinc-400 backdrop-blur p-8 space-y-6">
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja resetar os dados?</DialogTitle>
        </DialogHeader>
          <DialogFooter className="flex gap-2 w-full">
            <DialogClose
              className="bg-red-600 hover:bg-red-500 rounded-md p-2 w-full border border-zinc-400"
            >
              Cancelar
            </DialogClose>
            <DialogClose
              type="button"
              onClick={handleResetData}
              className="bg-zinc-950 hover:bg-zinc-800 rounded-md p-2 w-full border border-zinc-400"
            >
              Sim
            </DialogClose>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
