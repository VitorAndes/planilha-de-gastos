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
        <div className="flex flex-1 flex-col gap-1 border bg-[#79F297]/70 backdrop-blur-xl border-[#C2D2F2] rounded-md p-4 shadow shadow-black">
          <h1 className="text-lg font-bold tracking-wider flex items-center justify-between gap-2">
            {props.revenue} <CircleArrowUp className="size-5" />{" "}
          </h1>
          <span className="bg-gradient-to-b to-white from-lime-400 via-lime-200 text-transparent text-lg bg-clip-text font-bold tracking-wide">
            {" "}
            +{props.value} $
          </span>
        </div>
      ) : (
        <div className="flex flex-1 flex-col gap-1 bg-rose-800/70 backdrop-blur-xl border border-[#C2D2F2] rounded-md p-4 shadow shadow-black">
          <h1 className="text-lg font-bold tracking-wider flex items-center justify-between gap-2">
            {props.revenue} <CircleArrowDown className="size-5" />{" "}
          </h1>
          <span className="bg-gradient-to-b to-white from-rose-400 via-rose-200 text-transparent text-lg bg-clip-text font-bold tracking-wide ">
            {" "}
            -{props.value} $
          </span>
        </div>
      )}
    </>
  );
}
