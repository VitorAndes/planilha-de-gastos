import { CreditCard } from "lucide-react";

interface CardPaymentMethodProps {
  revenue: string;
  value: string;
}

export function CardPaymentMethod({ revenue, value }: CardPaymentMethodProps) {
  return (
    <>
      {revenue === "Crédito" ? (
        <div className="flex flex-col gap-1 flex-1 border bg-[#203359]/70 backdrop-blur-xl border-[#C2D2F2] rounded-md p-4 shadow shadow-black">
          <h1 className="text-lg font-bold tracking-wider flex items-center justify-between gap-2">
            {revenue} <CreditCard className="size-5" />{" "}
          </h1>
          <span className="bg-gradient-to-b to-white from-violet-400 via-violet-200 text-transparent text-lg bg-clip-text font-bold tracking-wide">
            {" "}
            -{value} $
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-1 flex-1 bg-[#C2D2F2]/70 backdrop-blur-xl border border-[#C2D2F2] rounded-md p-4 shadow shadow-black">
          <h1 className="text-lg font-bold tracking-wider flex items-center justify-between gap-2">
            {revenue} <CreditCard className="size-5" />{" "}
          </h1>
          <span className="bg-gradient-to-b to-white from-sky-400 via-sky-200 text-transparent text-lg bg-clip-text font-bold tracking-wide ">
            {" "}
            -{value} $
          </span>
        </div>
      )}
    </>
  );
}
