"use client";
import {
  GalleryThumbnails,
  CalendarCheck,
  Calendar,
  TvMinimal,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import UserDetails from "@/ui-core/components/organisms/UserDetails";
import gscLogo from "/public/gcs-logo.png";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

// Menu items.
const items = [
  {
    title: "All Inquiries",
    url: "/",
    icon: GalleryThumbnails,
    onlyForAdmin: true,
  },
  {
    title: "Inquiries",
    url: "/inquiries",
    icon: GalleryThumbnails,
    restrictedToAdmin: true,
  },
  {
    title: "Daily Inquiries",
    url: "/dailyInquiries",
    icon: CalendarCheck,
  },
  {
    title: "Monthly Inquiries",
    url: "/monthlyInquiries",
    icon: Calendar,
  },
  {
    title: "Inquiries by Channel",
    url: "/channelInquiries",
    icon: TvMinimal,
  },
];

export function AppSidebar() {
  const { isSignedIn = false, user } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const userRole = user?.publicMetadata?.role;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            <Image className="w-6 h-6 mr-2" src={gscLogo} alt="gsc-logo" />
            <h1 className="font-bold">Global Stanford Campus</h1>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items
                .filter(
                  (item) =>
                    !(item.onlyForAdmin && userRole !== "admin") &&
                    !(item.restrictedToAdmin && userRole === "admin")
                )
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              <UserDetails />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
