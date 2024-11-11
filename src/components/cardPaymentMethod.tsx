import { CreditCard } from "lucide-react";

interface CardPaymentMethodProps {
  revenue: string;
  value: string;
}

export function CardPaymentMethod({ revenue, value }: CardPaymentMethodProps) {
  return (
    <>
      {revenue === "Fatura" ? (
        <div className="flex flex-col flex-1 h-28 gap-4 bg-gradient-to-b from-indigo-500 via-indigo-500 to-indigo-700 text-primary rounded-md p-4 shadow-md shadow-white">
          <h1 className="text-lg md:text-xl font-bold -tracking-tighter flex items-center justify-between gap-2">
            {revenue} <CreditCard className="size-5" />{" "}
          </h1>
          {value === "0,00" ? (
            <span className="text-base md:text-lg text-secondary font-semibold tracking-tight ">
              {value}$
            </span>
          ) : (
            <span className="text-base md:text-lg text-secondary font-semibold tracking-tight ">
              -{value}$
            </span>
          )}
        </div>
      ) : (
        <div className="flex flex-col flex-1 h-28 gap-4 bg-gradient-to-b from-cyan-500 via-cyan-500 to-cyan-700 text-primary rounded-md p-4 shadow-md shadow-white">
          <h1 className="text-lg md:text-xl font-bold -tracking-tighter flex items-center justify-between gap-2">
            {revenue} <CreditCard className="size-5" />{" "}
          </h1>
          {value === "0,00" ? (
            <span className="text-base md:text-lg text-secondary font-semibold tracking-tight ">
              {value}$
            </span>
          ) : (
            <span className="text-base md:text-lg text-secondary font-semibold tracking-tight ">
              -{value}$
            </span>
          )}
        </div>
      )}
    </>
  );
}
