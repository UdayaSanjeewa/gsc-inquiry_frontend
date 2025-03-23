// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import ChannelContext from "../../../context/channelContext";
// import AddChannelPage from "@/ui-core/components/atoms/AddChannelPage";
// import UpdateChannelPage from "@/ui-core/components/atoms/UpdateChannelPage";
// import { Trash2 } from "lucide-react";

// function ChannelsList() {
//   const { channels, getAllChannels, deleteChannel } = useContext(ChannelContext);

//   useEffect(() => {
//     // Fetch all channels when the component is mounted
//     getAllChannels();
//   }, [getAllChannels]);

//   return (
//     <div className="p-6">
//       <AddChannelPage />
//       <h1 className="mt-4 mb-6 text-3xl font-bold">Channels</h1>
//       <div className="overflow-hidden border rounded-lg shadow-md">
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="px-4 py-2 text-left">Title</th>
//               <th className="px-4 py-2 text-left">Sales Person</th>
//               <th className="px-4 py-2 text-left">Authorized Branch</th>
//               <th className="px-4 py-2 text-left">Created At</th>
//               <th className="px-4 py-2 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {channels.length > 0 ? (
//               channels.map((channel) => (
//                 <tr key={channel._id}>
//                   <td className="px-4 py-2">{channel.title}</td>
//                   <td className="px-4 py-2">{channel.salesPerson}</td>
//                   <td className="px-4 py-2">{channel.authorizedBranch}</td>
//                   <td className="px-4 py-2">
//                     {new Date(channel.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="flex items-center gap-2 px-4 py-2 text-right">
//                     {/* Add any action buttons you need here */}
//                     {/* <a
//                       href={`/channelDetails/${channel._id}`}
//                       className="px-4 py-2 text-blue-500 hover:text-blue-700"
//                     >
//                       Details
//                     </a> */}
//                     <UpdateChannelPage channelId={channel._id} title={channel.title} salesPerson={channel.salesPerson} authorizedBranch={channel.authorizedBranch} />
//                     <Trash2 className="text-sm text-red-600" />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="py-4 text-center">
//                   No channels available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ChannelsList;

// ================================================

// "use client";
// import React, { useContext, useEffect, useState } from "react";
// import ChannelContext from "../../../context/channelContext";
// import AddChannelPage from "@/ui-core/components/atoms/AddChannelPage";
// import UpdateChannelPage from "@/ui-core/components/atoms/UpdateChannelPage";
// import { Trash2 } from "lucide-react";
// import InquiryContext from "../../../context/InquiryContext";

// function ChannelsList() {
//   const { channels, getAllChannels, deleteChannel } = useContext(ChannelContext);
//   const {getChannelOwners} = useContext(InquiryContext);

//   useEffect(() => {
//     // Fetch all channels when the component is mounted
//     getAllChannels();
//   }, [getAllChannels]);

//   // Handle channel deletion
//   const handleDelete = (channelId) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this channel?");
//     if (confirmDelete) {
//       deleteChannel(channelId);
//     }
//   };

//   return (
//     <div className="p-6">
//       <AddChannelPage />
//       <h1 className="mt-4 mb-6 text-3xl font-bold">Channels</h1>
//       <div className="overflow-hidden border rounded-lg shadow-md">
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="px-4 py-2 text-left">Title</th>
//               <th className="px-4 py-2 text-left">Sales Person</th>
//               <th className="px-4 py-2 text-left">Authorized Branch</th>
//               <th className="px-4 py-2 text-left">Created At</th>
//               <th className="px-4 py-2 text-right">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {channels.length > 0 ? (
//               channels.map((channel) => (
//                 <tr key={channel._id}>
//                   <td className="px-4 py-2">{channel.title}</td>
//                   <td className="px-4 py-2">{channel.salesPerson}</td>
//                   <td className="px-4 py-2">{channel.authorizedBranch}</td>
//                   <td className="px-4 py-2">
//                     {new Date(channel.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="flex items-center justify-end gap-2 px-4 py-2">
//                     {/* Update Channel Button */}
//                     <UpdateChannelPage
//                       channelId={channel._id}
//                       title={channel.title}
//                       salesPerson={channel.salesPerson}
//                       authorizedBranch={channel.authorizedBranch}
//                     />
//                     {/* Trash Icon to delete the channel */}
//                     <Trash2
//                       className="text-sm text-red-600 cursor-pointer"
//                       onClick={() => handleDelete(channel._id)}
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="py-4 text-center">
//                   No channels available
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default ChannelsList;

// ======================================================

"use client";
import React, { useContext, useEffect, useState } from "react";
import ChannelContext from "../../../context/channelContext";
import AddChannelPage from "@/ui-core/components/atoms/AddChannelPage";
import UpdateChannelPage from "@/ui-core/components/atoms/UpdateChannelPage";
import { Trash2 } from "lucide-react";
import InquiryContext from "../../../context/InquiryContext";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

function ChannelsList() {
    // Getting User Role
    const { isSignedIn = false, user } = useUser();
    const [isClient, setIsClient] = useState(false);
    const userRole = user?.publicMetadata?.role;
    const router = useRouter();
  
    useEffect(() => {
      if (userRole === "channelOwner" || userRole === "salesPerson") {
        // Redirect to "/users" if the userRole is "channelOwner" or "salesPerson"
        router.push("/inquiries");
      }
    }, [userRole, router]);
  
    // =============================================

  const { channels, getAllChannels, deleteChannel } = useContext(ChannelContext);
  const { getChannelOwners } = useContext(InquiryContext);
  const [channelOwners, setChannelOwners] = useState([]);

  useEffect(() => {
    // Fetch all channels when the component is mounted
    getAllChannels();
    // Fetch all channel owners
    const fetchChannelOwners = async () => {
      const owners = await getChannelOwners();
      if (owners) {
        setChannelOwners(owners);
      }
    };
    fetchChannelOwners();
  }, [getAllChannels, getChannelOwners]);

  // Handle channel deletion
  const handleDelete = (channelId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this channel?");
    if (confirmDelete) {
      deleteChannel(channelId);
    }
  };

  // For a given channel ID, find the channel owner (if any)
  const getChannelOwnerForChannel = (channelId) => {
    const owner = channelOwners.find(
      (owner) =>
        owner.public_metadata?.channel &&
        owner.public_metadata.channel.includes(channelId)
    );
    return owner ? owner.first_name : "N/A";
  };

  if (userRole === undefined) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <h1 className="text-2xl font-semibold text-gray-700 animate-pulse">
          Role Must Be Assigned by Admin...
        </h1>
      </div>
    );
  }

  return (
    <div className="p-6">
      <AddChannelPage />
      <h1 className="mt-4 mb-6 text-3xl font-bold">Channels</h1>
      <div className="overflow-hidden border rounded-lg shadow-md">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Sales Person</th>
              <th className="px-4 py-2 text-left">Authorized Branch</th>
              <th className="px-4 py-2 text-left">Channel Owner</th>
              <th className="px-4 py-2 text-left">Created At</th>
              <th className="px-4 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {channels.length > 0 ? (
              channels.map((channel) => (
                <tr key={channel._id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">{channel.title}</td>
                  <td className="px-4 py-2">{channel.salesPerson}</td>
                  <td className="px-4 py-2">{channel.authorizedBranch}</td>
                  <td className="px-4 py-2">{getChannelOwnerForChannel(channel._id)}</td>
                  <td className="px-4 py-2">
                    {new Date(channel.createdAt).toLocaleDateString()}
                  </td>
                  <td className="flex items-center justify-end gap-2 px-4 py-2">
                    <UpdateChannelPage
                      channelId={channel._id}
                      title={channel.title}
                      salesPerson={channel.salesPerson}
                      authorizedBranch={channel.authorizedBranch}
                    />
                    <Trash2
                      className="text-sm text-red-600 cursor-pointer"
                      onClick={() => handleDelete(channel._id)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  No channels available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ChannelsList;
