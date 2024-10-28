import {
  BarChart2Icon,
  ChevronUp,
  Command,
  LandmarkIcon,
  LifeBuoy,
  MessageSquareText,
  SettingsIcon,
  Tags,
  User2,
  UsersIcon,
  Workflow,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ModeToggle } from "../ui/toggle";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/in/dashboard",
    icon: LifeBuoy,
  },
  {
    title: "Customers",
    url: "/in/customers",
    icon: UsersIcon,
  },
  {
    title: "Products",
    url: "/in/products",
    icon: Tags,
  },
  {
    title: "Insights AI",
    url: "/in/insights",
    icon: BarChart2Icon,
  },
  {
    title: "Automation",
    url: "/in/automation",
    icon: SettingsIcon,
  },
  {
    title: "Billing",
    url: "/in/billing",
    icon: LandmarkIcon,
  },
];

export async function AppSidebar() {
  const supabase = createClient();

  // Obtén el usuario del servidor
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <Sidebar>
      <SidebarHeader></SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="get-started">
                <MessageSquareText />
                <span>Help</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Account
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span className="cursor-pointer">Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="cursor-pointer text-red-600">Sign out</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Preferences</DropdownMenuLabel>
                <ModeToggle />
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
