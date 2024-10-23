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
          variant={"ghost"}
          className="text-sm w-32 flex flex-col md:gap-1 md:text-white transition-all hover:bg-zinc-300 hover:text-black text-white md:text-base py-8 px-4 rounded-t-xl md:rounded-xl md:p-9 md:hover:bg-zinc-100 md:hover:text-black"
        >
          <span>
            <RotateCwIcon size={40} className="text-zinc-500" />
          </span>
          Resetar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] bg-zinc-950 text-zinc-100 border border-zinc-400">
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja resetar os dados?</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 py-4 ">
          <DialogFooter className="w-full">
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
        </div>
      </DialogContent>
    </Dialog>
  );
}
