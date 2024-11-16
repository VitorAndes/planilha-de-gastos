import { Coffee } from "lucide-react";
import { Button } from "./ui/button";

export function BuyMeACoffee() {
  return (
    <Button
      variant={"outline"}
      className=" text-lg text-color-text dark:bg-color-accent bg-color-primary p-6 transition-all"
    >
      <a
        className="flex items-center gap-2"
        href="https://donate.stripe.com/6oE16l3PMf4o9cA8ww"
        target="_blank"
        rel="noreferrer"
      >
        Buy me a coffee <Coffee />
      </a>
    </Button>
  );
}
