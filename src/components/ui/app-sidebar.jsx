// "use client";
// import {
//   GalleryThumbnails,
//   UsersRound,
//   CalendarCheck,
//   Calendar,
//   TvMinimal,
// } from "lucide-react";

// import {
//   Sidebar,
//   SidebarContent,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
// } from "@/components/ui/sidebar";
// import UserDetails from "@/ui-core/components/organisms/UserDetails";
// import gscLogo from "/public/gcs-logo.png";
// import Image from "next/image";
// import { UserButton, useUser } from "@clerk/nextjs";
// import { useContext, useEffect, useState } from "react";
// import ChannelContext from "../../../context/channelContext";

// // Menu items.
// const items = [
//   {
//     title: "All Inquiries",
//     url: "/",
//     icon: GalleryThumbnails,
//     onlyForAdmin: true,
//   },
//   {
//     title: "Users",
//     url: "/users",
//     icon: UsersRound,
//     onlyForAdmin: true,
//   },
//   {
//     title: "Inquiries",
//     url: "/inquiries",
//     icon: GalleryThumbnails,
//     restrictedToAdmin: true,
//   },
//   {
//     title: "Daily Inquiries",
//     url: "/dailyInquiries",
//     icon: CalendarCheck,
//   },
//   {
//     title: "Monthly Inquiries",
//     url: "/monthlyInquiries",
//     icon: Calendar,
//   },
//   {
//     title: "Inquiries by Channel",
//     url: "/channelInquiries",
//     icon: TvMinimal,
//     restrictedToChannelOwner: true,
//   },
// ];

// export function AppSidebar() {
//   const { isSignedIn = false, user } = useUser();
//   const [isClient, setIsClient] = useState(false);
//   const { getChannelById } = useContext(ChannelContext);
//   const [channels, setChannels] = useState([]);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     const fetchChannels = async () => {
//       if (!user) return;
      
//       let channelIds = user?.publicMetadata?.channel; // Correctly accessing "channel"
//       // console.log("Channel IDs from metadata:", channelIds);
  
//       if (Array.isArray(channelIds) && channelIds.length > 0) {
//         const fetchedChannels = await Promise.all(
//           channelIds.map(async (id) => {
//             const channel = await getChannelById(id);
//             // console.log("Fetched channel:", channel);
//             return channel;
//           })
//         );
  
//         setChannels(fetchedChannels.filter(Boolean)); // Remove null values
//       }
//     };
  
//     fetchChannels();
//   }, [user, getChannelById]);
  
  

//   if (!isClient) return null;

//   const userRole = user?.publicMetadata?.role;  

//   if (userRole === undefined) {
//     return(
//       <div className="px-10 pt-10">
//         <UserDetails />
//       </div>
//     )
//   }

//   return (
//     <Sidebar>
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>
//             <Image className="w-6 h-6 mr-2" src={gscLogo} alt="gsc-logo" />
//             <h1 className="font-bold">Global Stanford Campus</h1>
//           </SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {items
//                 .filter(
//                   (item) =>
//                     !(item.onlyForAdmin && userRole !== "admin") &&
//                     !(item.restrictedToAdmin && userRole === "admin")
//                 )
//                 .map((item) => (
//                   <SidebarMenuItem key={item.title}>
//                     <SidebarMenuButton asChild>
//                       <a href={item.url}>
//                         <item.icon />
//                         <span>{item.title}</span>
//                       </a>
//                     </SidebarMenuButton>
//                   </SidebarMenuItem>
//                 ))}
//               {/* Display fetched channels */}
//               {channels.length > 0 && (
//                 <div className="p-4 mt-4 bg-gray-100 rounded-md">
//                   <h2 className="text-lg font-semibold">Channels</h2>
//                   {channels.map((channel) => (
//                     <div key={channel._id} className="mt-2">
//                       <h3 className="font-medium">{channel.title}</h3>
//                     </div>
//                   ))}
//                 </div>
//               )}
//               <UserDetails />
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>
//       </SidebarContent>
//     </Sidebar>
//   );
// }

// ==============================================

"use client";
import {
  GalleryThumbnails,
  UsersRound,
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
import { UserButton, useUser } from "@clerk/nextjs";
import { useContext, useEffect, useState } from "react";
import ChannelContext from "../../../context/channelContext";

// Menu items.
const items = [
  {
    title: "All Inquiries",
    url: "/",
    icon: GalleryThumbnails,
    onlyForAdmin: true,
  },
  {
    title: "Users",
    url: "/users",
    icon: UsersRound,
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
    restrictedToChannelOwner: true,
  },
];

export function AppSidebar() {
  const { isSignedIn = false, user } = useUser();
  const [isClient, setIsClient] = useState(false);
  const { getChannelById } = useContext(ChannelContext);
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchChannels = async () => {
      if (!user) return;

      let channelIds = user?.publicMetadata?.channel; // Correctly accessing "channel"
      // console.log("Channel IDs from metadata:", channelIds);

      if (Array.isArray(channelIds) && channelIds.length > 0) {
        const fetchedChannels = await Promise.all(
          channelIds.map(async (id) => {
            const channel = await getChannelById(id);
            // console.log("Fetched channel:", channel);
            return channel;
          })
        );

        setChannels(fetchedChannels.filter(Boolean)); // Remove null values
      }
    };

    fetchChannels();
  }, [user, getChannelById]);

  if (!isClient) return null;

  const userRole = user?.publicMetadata?.role;

  if (userRole === undefined) {
    return (
      <div className="px-10 pt-10">
        <UserDetails />
      </div>
    );
  }

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
                    !(item.restrictedToAdmin && userRole === "admin") &&
                    !(item.restrictedToChannelOwner && userRole === "channelOwner") // Exclude this item for channelOwner
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
              {/* Display fetched channels */}
              {channels.length > 0 && (
                <div className="p-4 mt-4 bg-gray-100 rounded-md">
                  <h2 className="text-lg font-semibold">Channels</h2>
                  {channels.map((channel) => (
                    <div key={channel._id} className="mt-2">
                      <h3 className="font-medium">{channel.title}</h3>
                    </div>
                  ))}
                </div>
              )}
              <UserDetails />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
