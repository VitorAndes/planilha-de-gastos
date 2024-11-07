import { CreditCard } from "lucide-react";

interface CardPaymentMethodProps {
  revenue: string;
  value: string;
}

export function CardPaymentMethod({ revenue, value }: CardPaymentMethodProps) {
  return (
    <>
      <div className="flex flex-col flex-1 h-28 gap-4 bg-gradient-to-b from-text-secondary to-my-primary text-primary rounded-md p-4 shadow-sm shadow-violet-300">
        <h1 className="text-xl font-bold -tracking-tighter flex items-center justify-between gap-2">
          {revenue} <CreditCard className="size-5" />{" "}
        </h1>
        {revenue === "Débito" ? (
          <span className="text-lg text-cyan-900 font-semibold tracking-tight">
            {" "}
            -{value} $
          </span>
        ) : (
          <span className="text-lg text-indigo-900 font-semibold tracking-tight">
            {" "}
            -{value} $
          </span>
        )}
      </div>
    </>
  );
}
