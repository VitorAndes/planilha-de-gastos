import { Toaster } from "sonner";
import { useTheme } from "../context/ThemeContext";

export function ThemedToaster() {
  const { theme } = useTheme();

  return (
    <Toaster
      richColors
      visibleToasts={3}
      theme={theme === "dark" ? "dark" : "light"}
      expand
      toastOptions={{
        className: "p-5 text-base",
      }}
    />
  );
}
