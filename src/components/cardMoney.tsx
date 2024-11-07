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
        <div className="flex flex-1 h-28 flex-col gap-4 bg-gradient-to-t from-my-primary to-emerald-400 text-primary rounded-md p-4 shadow-sm shadow-violet-300">
          <h1 className="text-xl font-bold -tracking-tighter flex items-center justify-between gap-2">
            {props.revenue} <CircleArrowUp className="size-5" />{" "}
          </h1>
          <span className="text-lg text-emerald-100 font-semibold tracking-tight ">
            {" "}
            +{props.value} $
          </span>
        </div>
      ) : (
        <div className="flex flex-1 h-28 flex-col gap-4 bg-gradient-to-t   from-my-primary to-rose-400 text-primary rounded-md p-4 shadow-sm shadow-violet-300">
          <h1 className="text-xl font-bold -tracking-tighter flex items-center justify-between gap-2">
            {props.revenue} <CircleArrowDown className="size-5" />{" "}
          </h1>
          <span className="text-lg text-rose-100 font-semibold tracking-tight ">
            {" "}
            -{props.value} $
          </span>
        </div>
      )}
    </>
  );
}
