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
        <div className="flex flex-1 h-28 flex-col gap-4 bg-gradient-to-b from-emerald-500 via-emerald-500 to-emerald-700 text-primary rounded-md p-4 shadow-md shadow-white">
          <h1 className="text-lg md:text-xl font-bold -tracking-tighter flex items-center justify-between gap-2">
            {props.revenue} <CircleArrowUp className="size-5" />{" "}
          </h1>
          {props.value === "0,00" ? (
            <span className="text-base md:text-lg text-secondary font-semibold tracking-tight ">
              {props.value}$
            </span>
          ) : (
            <span className="text-base md:text-lg text-secondary font-semibold tracking-tight ">
              +{props.value}$
            </span>
          )}
        </div>
      ) : (
        <div className="flex flex-1 h-28 flex-col gap-4 bg-gradient-to-b from-rose-500 via-rose-500 to-rose-700 text-primary rounded-md p-4 shadow-md shadow-white">
          <h1 className="text-lg md:text-xl font-bold -tracking-tighter flex items-center justify-between gap-2">
            {props.revenue} <CircleArrowDown className="size-5" />{" "}
          </h1>{" "}
          {props.value === "0,00" ? (
            <span className="text-base md:text-lg text-secondary font-semibold tracking-tight ">
              {props.value}$
            </span>
          ) : (
            <span className="text-base md:text-lg text-secondary font-semibold tracking-tight ">
              -{props.value}$
            </span>
          )}
        </div>
      )}
    </>
  );
}
