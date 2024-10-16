"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowLeftRightIcon,
  HomeIcon,
  LandmarkIcon,
  Package2Icon,
  UsersIcon,
  BellIcon,
  SettingsIcon,
  BookOpenIcon,
  PackageIcon,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

import Link from "next/link";
import { useEffect, useState } from "react";

export function NavBar() {
  const notifications = [
    {
      title: "Pago recibido de Juan Pérez",
      active: true,
      id: 1,
    },
    {
      title: "Pago recibido de María Gómez",
      active: true,
      id: 2,
    },
    {
      title: "Pago recibido de Carlos Rodríguez",
      active: true,
      id: 3,
    },
  ];
  const links = [
    {
      href: "/in/dashboard",
      icon: HomeIcon,
      label: "Home",
    },
    {
      href: "/in/customers",
      icon: UsersIcon,
      label: "Customers",
    },
    {
      href: "/in/products",
      icon: PackageIcon,
      label: "Products",
    },
    {
      href: "/in/billing",
      icon: LandmarkIcon,
      label: "Billing",
    },
    {
      href: "/in/settings",
      icon: SettingsIcon,
      label: "Settings",
    },
  ];
  const router = useRouter();
  const pathname = usePathname();

  const [notificationsList, setNotificationsList] = useState(notifications);

  const confirmNotification = (notificationId: any) => {
    const updatedNotifications = notificationsList.map((notification) => {
      if (notification.id === notificationId) {
        return { ...notification, active: notification.active ? false : true };
      }

      return notification;
    });
    setNotificationsList(updatedNotifications);
  };

  return (
    <div className="hidden border-r bg-gray-100/40 lg:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="hidden h-[60px] items-center border-b px-6 lg:flex">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <Package2Icon className="hidden h-6 w-6" />
            <span className="">Deelfy Inc</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="relative ml-auto h-8 w-8 border bg-white hover:bg-gray-100/40"
                size="icon"
                variant="ghost"
              >
                <BellIcon className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
                {notificationsList.filter((notification) => notification.active)
                  .length > 0 && (
                  <span className="absolute right-0 top-0 h-2 w-2 rounded-full bg-red-500"></span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notificationsList.map((notification, index) => (
                <DropdownMenuItem
                  key={index}
                  onClick={() => confirmNotification(notification.id)}
                >
                  <span
                    className={`h-2 w-2 ${notification.active ? "bg-blue-500" : "bg-transparent"} mr-2 inline-block rounded-full`}
                  ></span>
                  {notification.title}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex flex-1 flex-col overflow-auto py-2">
          <nav className="flex flex-1 flex-col items-start px-4 text-sm font-medium">
            {/* Sección con los links */}
            <div className="w-full">
              {links.map((link, index) => (
                <div key={index}>
                  <Link
                    className={`${
                      pathname == link.href && "bg-[#f2f2f2] text-gray-900"
                    } flex items-center gap-3 rounded-lg px-3 py-3 text-gray-500 transition-all hover:bg-[#f2f2f2] hover:text-gray-900`}
                    href={link.href}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>

            {/* Sección "Get Started" al fondo */}
            <div className="mt-auto w-full">
              <Link
                className={`${
                  pathname == "/in/get-started" && "bg-[#f2f2f2] text-gray-900"
                } flex items-center gap-3 rounded-lg px-3 py-3 text-gray-500 transition-all hover:bg-[#f2f2f2] hover:text-gray-900`}
                href="/in/get-started"
              >
                <BookOpenIcon className="h-4 w-4" />
                Introduction
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
