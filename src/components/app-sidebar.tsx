import {
  Github,
  Home,
  Instagram,
  Linkedin,
  Moon,
  Settings,
  Sun,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTheme } from "@/context/ThemeContext";

// Menu items.
const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
export function AppSidebar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <Sidebar>
      <SidebarContent className="flex flex-col justify-between">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl md:text-3xl text-color-text font-bold mb-5">
            AndesFinance
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="text-color-secondary"
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url} aria-disabled>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="flex flex-row items-center justify-between">
          <ul className="flex items-center text-color-secondary w-full justify-between md:justify-normal gap-4 ">
            <li className="hover:text-sky-500 hover:scale-110 transition-all">
              <a href="https://www.linkedin.com/in/vitor-andes-dos-santos-3265ba243/">
                <Linkedin size={32} className="" />
              </a>
            </li>
            <li className="hover:text-violet-500 hover:scale-110 transition-all">
              <a href="https://github.com/VitorAndes">
                <Github size={32} className="" />
              </a>
            </li>
            <li className="hover:text-rose-500 hover:scale-110 transition-all">
              <a href="https://www.instagram.com/vtr_andes/">
                <Instagram size={32} className="" />
              </a>
            </li>
          </ul>
          <button
            type="button"
            onClick={toggleTheme}
            className="hover:scale-110 dark:hover:text-yellow-500 hover:text-color-text transition-all"
          >
            {theme === "dark" ? <Sun size={32} /> : <Moon size={32} />}
          </button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
