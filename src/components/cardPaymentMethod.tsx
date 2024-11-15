import { CreditCard } from "lucide-react";

interface CardPaymentMethodProps {
  revenue: string;
  value: string;
}

export function CardPaymentMethod({ revenue, value }: CardPaymentMethodProps) {
  return (
    <>
      <div className="flex flex-col flex-1 md:h-28 gap-4 bg-color-card text-color-text border-b border-color-secondary rounded-md p-4  ">
        <h1 className="text-base md:text-xl font-bold -tracking-tighter flex items-center justify-between gap-2">
          {revenue} <CreditCard className="size-5" />{" "}
        </h1>
        {value === "0,00" ? (
          <span className="text-sm md:text-lg text-color-accent font-semibold tracking-tight ">
            {value}$
          </span>
        ) : (
          <span className="text-sm md:text-lg text-color-accent font-semibold tracking-tight ">
            -{value}$
          </span>
        )}
      </div>
    </>
  );
}
