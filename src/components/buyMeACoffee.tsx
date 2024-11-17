import { Coffee } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

export function BuyMeACoffee() {
  function commingSoon() {
    toast.info("disponivel em breve.");
  }
  return (
    <Button
      variant={"outline"}
      onClick={commingSoon}
      className="md:text-lg text-color-text dark:bg-color-accent bg-color-primary md:p-6 transition-all"
    >
      <a
        className="flex items-center gap-2"
        href="#soon"
        // href="https://donate.stripe.com/6oE16l3PMf4o9cA8ww"
        // target="_blank"
        aria-disabled
        rel="noreferrer"
      >
        Buy me a coffee <Coffee />
      </a>
    </Button>
  );
}
