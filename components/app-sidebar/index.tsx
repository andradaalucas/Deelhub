import {
  ArchiveIcon,
  BarChart2Icon,
  ChevronUp,
  Cog,
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
import { SignOutButton } from "../auth";
import Image from "next/image";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: LifeBuoy,
  },
  {
    title: "Customers",
    url: "/customers",
    icon: UsersIcon,
  },
  {
    title: "Insights AI",
    url: "/insights",
    icon: BarChart2Icon,
  },
  {
    title: "Automation",
    url: "/automation",
    icon: Cog,
  },
  {
    title: "Billing",
    url: "/billing",
    icon: LandmarkIcon,
  },
  {
    title: "Vault",
    url: "/vault",
    icon: ArchiveIcon,
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
        <SidebarGroup className="flex px-4 pb-0">
          <div className="font-semibold">Deelhub</div>
        </SidebarGroup>
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
                <SignOutButton />
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
