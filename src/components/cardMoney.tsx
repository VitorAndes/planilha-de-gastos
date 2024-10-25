import { CircleArrowDown, CircleArrowUp } from "lucide-react";
import type { ComponentProps } from "react";

interface CardMoneyProps extends ComponentProps<"div"> {
  revenue: string;
  value: string;
}

export function CardMoney(props: CardMoneyProps) {
  return (
    <>
      {props.revenue === "Saldo" ? (
        <div className="flex flex-col gap-1 flex-1 border bg-green-800/80 backdrop-blur-xl border-zinc-500 rounded-md p-4 shadow shadow-white">
          <h1 className="text-lg font-bold tracking-wider flex items-center justify-between gap-2">
            {props.revenue} <CircleArrowUp className="size-5" />{" "}
          </h1>
          <span className="bg-gradient-to-b to-white from-lime-500 via-lime-600 text-transparent bg-clip-text font-bold tracking-wide"> +{props.value} $</span>
        </div>
      ) : (
        <div className="flex flex-col gap-1 flex-1 bg-red-800/80 backdrop-blur-xl border border-zinc-500 rounded-md p-4 shadow shadow-white">
          <h1 className="text-lg font-bold tracking-wider flex items-center justify-between gap-2">
            {props.revenue} <CircleArrowDown className="size-5" />{" "}
          </h1>
          <span className="bg-gradient-to-b to-white from-rose-500 via-rose-600 text-transparent text-lg bg-clip-text font-bold tracking-wide "> -{props.value} $</span>
        </div>
      )}
    </>
  );
}
