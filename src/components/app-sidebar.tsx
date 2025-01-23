import {
  Github,
  Home,
  Instagram,
  Linkedin,
  Moon,
  Settings,
  Sun,
} from 'lucide-react'

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
} from '@/components/ui/sidebar'
import { useTheme } from '@/context/ThemeContext'
import { Button } from './ui/button'

const navigationItem = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
]

const clientHandleItem = [
  {
    title: 'Settings',
    icon: Settings,
  },
]

export function AppSidebar() {
  const { theme, toggleTheme } = useTheme()
  return (
    <Sidebar>
      <SidebarContent className="flex flex-col justify-between">
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl md:text-3xl text-color-text font-bold mb-5">
            AndesFinance
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItem.map(item => (
                <SidebarMenuItem
                  key={item.title}
                  className="text-color-primary mb-1"
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url} aria-disabled>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <span className="border-b my-2 border-color-secondary" />
              {clientHandleItem.map(item => (
                <SidebarMenuItem
                  key={item.title}
                  className="text-color-primary mb-1"
                >
                  <SidebarMenuButton asChild>
                    <a href="/" aria-disabled>
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
          <ul className="flex items-center text-color-accent w-full gap-4 ">
            <li className="hover:text-sky-500 hover:scale-110 transition-all">
              <a href="https://www.linkedin.com/in/vitor-andes-dos-santos-3265ba243/">
                <Linkedin size={24} className="" />
              </a>
            </li>
            <li className="hover:text-violet-500 hover:scale-110 transition-all">
              <a href="https://github.com/VitorAndes">
                <Github size={24} className="" />
              </a>
            </li>
            <li className="hover:text-rose-500 hover:scale-110 transition-all">
              <a href="https://www.instagram.com/vtr_andes/">
                <Instagram size={24} className="" />
              </a>
            </li>
          </ul>
          <Button
            variant={'secondary'}
            type="button"
            onClick={toggleTheme}
            className="hover:scale-110 dark:hover:text-yellow-500 hover:text-color-text transition-all"
          >
            {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
          </Button>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
