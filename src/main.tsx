import { Analytics } from "@vercel/analytics/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import { App } from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster
      richColors
      visibleToasts={2}
      theme="dark"
      expand
      toastOptions={{
        className: "p-5 text-base",
      }}
    />
    <Analytics />
  </StrictMode>
);
