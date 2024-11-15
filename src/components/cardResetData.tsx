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
          className="text-sm md:text-lg flex flex-col gap-2 transition-all "
        >
          <RotateCwIcon
            size={34}
            className="text-zinc-700 hover:text-zinc-300 hover:scale-110"
          />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja resetar os dados?</DialogTitle>
          <DialogDescription>
            Resete seus dados para iniciar um novo mês
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex gap-2 w-full">
          <DialogClose className="bg-red-500 hover:bg-red-600 rounded-md p-2 w-full border border-zinc-400">
            Cancelar
          </DialogClose>
          <DialogClose
            type="button"
            onClick={handleResetData}
            className="bg-color-card text-color-accent rounded-md p-2 w-full border border-color-secondary"
          >
            Sim
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
