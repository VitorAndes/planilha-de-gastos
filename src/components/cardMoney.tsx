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
        <div className="flex flex-1 md:h-28 flex-col gap-4 bg-teal-400 dark:bg-teal-700 rounded-md p-4 border-b border-color-secondary ">
          <h1 className="text-base md:text-xl font-bold -tracking-tighter flex items-center justify-between gap-2">
            {props.revenue} <CircleArrowUp className="size-5" />{" "}
          </h1>
          {props.value === "0,00" ? (
            <span className="text-sm md:text-lg text-color-text font-semibold tracking-tight ">
              {props.value}$
            </span>
          ) : (
            <span className="text-sm md:text-lg text-color-text font-semibold tracking-tight ">
              +{props.value}$
            </span>
          )}
        </div>
      ) : (
        <div className="flex flex-1 md:h-28 flex-col gap-4 bg-rose-400 dark:bg-pink-700 rounded-md p-4 border-b border-color-secondary ">
          <h1 className="text-base md:text-xl font-bold -tracking-tighter flex items-center justify-between gap-2 truncate">
            {props.revenue} <CircleArrowDown className="size-5" />{" "}
          </h1>{" "}
          {props.value === "0,00" ? (
            <span className="text-sm md:text-lg text-color-text font-semibold tracking-tight ">
              {props.value}$
            </span>
          ) : (
            <span className="text-sm md:text-lg text-color-text font-semibold tracking-tight ">
              -{props.value}$
            </span>
          )}
        </div>
      )}
    </>
  );
}
