import { CircleDollarSign } from "lucide-react";

interface CardMoneyProps {
  revenue: string;
  value: string;
}

export function CardMoney(props: CardMoneyProps) {
  return (
    <div className="flex flex-col gap-1 flex-1 border border-zinc-500 rounded-xl p-4 shadow shadow-white">
      <h1 className="text-lg font-medium tracking-wider flex items-center justify-between gap-2">
        {props.revenue} <CircleDollarSign className="size-5" />{" "}
      </h1>
      <span className="flex items-center text-zinc-400">
        {props.revenue === "Saldo" ? (
          <span className="text-lime-500 font-bold"> +{props.value} $</span>
        ) : (
          <span className="text-red-600 font-bold"> -{props.value} $</span>
        )}
      </span>
    </div>
  );
}
