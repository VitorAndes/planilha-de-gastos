import { CreditCard } from "lucide-react";

interface CardPaymentMethodProps {
  revenue: string;
  value: string;
}

export function CardPaymentMethod({ revenue, value }: CardPaymentMethodProps) {
  return (
    <>
      {revenue === "Crédito" ? (
        <div className="flex flex-col gap-1 flex-1 bg-[#203359]/70 rounded-md p-4 shadow-white shadow">
          <h1 className="text-lg font-bold tracking-wider flex items-center justify-between gap-2">
            {revenue} <CreditCard className="size-5" />{" "}
          </h1>
          <span className="text-lg text-slate-300  font-bold tracking-wide">
            {" "}
            -{value} $
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-1 flex-1 bg-[#C2D2F2]/70 rounded-md p-4 shadow shadow-black">
          <h1 className="text-lg font-bold tracking-wider flex items-center justify-between gap-2">
            {revenue} <CreditCard className="size-5" />{" "}
          </h1>
          <span className=" text-lg text-slate-700 font-bold tracking-wide ">
            {" "}
            -{value} $
          </span>
        </div>
      )}
    </>
  );
}
