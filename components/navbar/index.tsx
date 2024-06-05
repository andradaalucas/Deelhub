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
} from "lucide-react";

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
      href: "/in/banks_accounts",
      icon: LandmarkIcon,
      label: "Bank",
    },
    {
      href: "/in/customers",
      icon: UsersIcon,
      label: "Customers",
    },
    {
      href: "/in/settings",
      icon: SettingsIcon,
      label: "Settings",
    },
  ];
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

  useEffect(() => {}, [notificationsList]);
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

        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium">
            {links.map((link, index) => (
              <Link
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-gray-500 transition-all hover:bg-[#f2f2f2] hover:text-gray-900"
                href={link.href}
                key={index}
              >
                <link.icon className="h-4 w-4" />
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
