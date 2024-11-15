import { Analytics } from "@vercel/analytics/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import { App } from "./App.tsx";
import { AppSidebar } from "./components/app-sidebar.tsx";
import { ThemedToaster } from "./components/themedToaster.tsx";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar.tsx";
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ThemedToaster />
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="hidden md:flex" />
        <App />
      </SidebarProvider>
    </ThemeProvider>
    <Analytics />
  </StrictMode>
);
