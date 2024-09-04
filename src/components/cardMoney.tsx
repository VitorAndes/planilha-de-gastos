import { CircleDollarSign } from "lucide-react";

interface CardMoneyProps {
  revenue: string;
  value: number;
}

export function CardMoney(props: CardMoneyProps) {
  return (
    <div className="flex flex-col justify-center items-center w-32">
      <h1 className="text-xl font-medium gap-1 tracking-wider flex justify-between items-center">
        {props.revenue}{" "}
        <span className="flex  items-center gap-2 text-lg text-zinc-400">
          {props.revenue == "Saldo" ? (
            <strong className="text-lime-500"> +{props.value}</strong>
          ) : (
            <strong className="text-red-500"> -{props.value}</strong>
          )}
          <CircleDollarSign className="size-5" />{" "}
        </span>
      </h1>
    </div>
  );
}
