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
  BarChart2Icon,
  Cog,
  GitPullRequestCreate,
  LandmarkIcon,
  LifeBuoy,
  MessageSquareText,
  Plus,
  UsersIcon,
} from "lucide-react";
import Link from "next/link";
import { FeedbackForm } from "../feedback";
import useSession from "@/utils/supabase/use-session";
import { NavUser } from "./nav-user";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
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
    title: "Features",
    url: "/features",
    icon: GitPullRequestCreate,
  },
];

export function AppSidebar() {
  const user = useSession();
  const fullName = user?.user.user_metadata.full_name;
  const fallback = fullName?.slice(0, 2);
  const data = {
    user: {
      name: fullName,
      email: user?.user.user_metadata.email,
      avatar: user?.user.user_metadata.picture,
      fallback: fallback,
    },
  };
  return (
    <>
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
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    {/* <Link href={item.url}> */}
                    {/* <item.icon /> */}
                    <Link href="/projects">
                      <Plus />
                      <span>Add Project</span>
                    </Link>
                    {/* </Link> */}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
