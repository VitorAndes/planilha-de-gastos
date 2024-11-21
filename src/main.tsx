import { Analytics } from "@vercel/analytics/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "../index.css";
import { App } from "./App.tsx";
import { AppSidebar } from "./components/app-sidebar.tsx";
import { ThemedToaster } from "./components/themedToaster.tsx";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar.tsx";
import { ThemeProvider } from "./context/ThemeContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/login",
    element: <h1>Login</h1>,
  },
  {
    path: "/logout",
    element: <h1>LogOut</h1>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ThemedToaster />
      <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="hidden md:flex" />
        <RouterProvider router={router} />
      </SidebarProvider>
    </ThemeProvider>
    <Analytics />
  </StrictMode>
);
