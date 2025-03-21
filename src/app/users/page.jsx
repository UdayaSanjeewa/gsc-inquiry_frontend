// // pages/UsersList.js
// "use client";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import UserDetailsModal from "@/ui-core/components/organisms/UserDetailsModal";
// import UserChannelsDialog from "@/ui-core/components/organisms/UserChannelsDialog";

// export default function UsersList() {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [userChannels, setUserChannels] = useState([]);
//   const [allChannels, setAllChannels] = useState([]);

//   // Fetch Users Function
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
//       setUsers(res.data);
//     } catch (err) {
//       setError(err.response?.data?.error || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Fetch user's assigned channels
//   const fetchUserChannels = async (channelIds) => {
//     if (!channelIds || channelIds.length === 0) {
//       setUserChannels([]);
//       return;
//     }
//     try {
//       const channelResponses = await Promise.all(
//         channelIds.map((id) =>
//           axios.get(`${process.env.NEXT_PUBLIC_API_URL}/channel/${id}`)
//         )
//       );
//       setUserChannels(channelResponses.map((res) => res.data));
//     } catch (error) {
//       console.error("Error fetching user channels", error);
//       setError("Failed to fetch channels");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h1 className="mb-4 text-2xl font-bold">Users List</h1>
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100 border-b">
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Channel</th>
//               <th className="px-4 py-2 text-left">Role</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map((user) => (
//                 <tr key={user.id} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-2">
//                     {user.first_name} {user.last_name}
//                   </td>
//                   <td className="px-4 py-2">
//                     {user.email_addresses?.[0]?.email_address}
//                   </td>
//                   <td className="px-4 py-2">
//                     <a href="">user channels details</a>
//                     <UserChannelsDialog
//                       user={user}
//                       fetchUserChannels={fetchUserChannels}
//                       fetchUsers={fetchUsers}
//                       allChannels={allChannels}
//                       userChannels={userChannels}
//                       setUserChannels={setUserChannels}
//                     />
//                   </td>
//                   <td className="px-4 py-2">
//                     {user.public_metadata?.role || "N/A"}
//                   </td>
//                   <td className="px-4 py-2">
//                     <UserDetailsModal user={user} fetchUsers={fetchUsers} />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="px-4 py-2 text-center">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
// =========================================
// "use client";
// import { useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation"; // Import useRouter to handle navigation
// import UserDetailsModal from "@/ui-core/components/organisms/UserDetailsModal";
// import UserChannelsDialog from "@/ui-core/components/organisms/UserChannelsDialog";
// import { Trash2 } from "lucide-react";
// import ChannelContext from "../../../context/channelContext";

// export default function UsersList() {
//   const [users, setUsers] = useState([]);
//   const [error, setError] = useState(null);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [userChannels, setUserChannels] = useState([]);
//   const [allChannels, setAllChannels] = useState([]);
//   const router = useRouter(); // Initialize router for navigation
//   const {deleteUser} = useContext(ChannelContext);

//   // Fetch Users Function
//   const fetchUsers = async () => {
//     try {
//       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
//       setUsers(res.data);
//     } catch (err) {
//       setError(err.response?.data?.error || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // Fetch user's assigned channels
//   const fetchUserChannels = async (channelIds) => {
//     if (!channelIds || channelIds.length === 0) {
//       setUserChannels([]);
//       return;
//     }
//     try {
//       const channelResponses = await Promise.all(
//         channelIds.map((id) =>
//           axios.get(`${process.env.NEXT_PUBLIC_API_URL}/channel/${id}`)
//         )
//       );
//       setUserChannels(channelResponses.map((res) => res.data));
//     } catch (error) {
//       console.error("Error fetching user channels", error);
//       setError("Failed to fetch channels");
//     }
//   };

//   // Handle navigation to UserChannelsDetails page with user data
//   const navigateToUserChannels = (user) => {
//     // console.log(user.id);
    
//     router.push(`/users/${user.id}`);
//   };
  

//   return (
//     <div className="p-6">
//       <h1 className="mb-4 text-2xl font-bold">Users List</h1>
//       {error && <p className="text-red-500">{error}</p>}

//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300">
//           <thead>
//             <tr className="bg-gray-100 border-b">
//               <th className="px-4 py-2 text-left">Name</th>
//               <th className="px-4 py-2 text-left">Email</th>
//               <th className="px-4 py-2 text-left">Channel</th>
//               <th className="px-4 py-2 text-left">Role</th>
//               <th className="px-4 py-2 text-left">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.length > 0 ? (
//               users.map((user) => (
//                 <tr key={user.id} className="border-b hover:bg-gray-50">
//                   <td className="px-4 py-2">
//                     {user.first_name} {user.last_name}
//                   </td>
//                   <td className="px-4 py-2">
//                     {user.email_addresses?.[0]?.email_address}
//                   </td>
//                   <td className="px-4 py-2">
//                     <a
//                       href="#"
//                       onClick={() => navigateToUserChannels(user)} // Navigate on click
//                     >
//                       View Channels
//                     </a>
//                   </td>
//                   <td className="px-4 py-2">
//                     {user.public_metadata?.role || "N/A"}
//                   </td>
//                   <td className="flex gap-2 px-4 py-2">
//                     <UserDetailsModal user={user} fetchUsers={fetchUsers} />
//                     <button><Trash2 /></button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="px-4 py-2 text-center">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// ======================================================

"use client";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter to handle navigation
import UserDetailsModal from "@/ui-core/components/organisms/UserDetailsModal";
import UserChannelsDialog from "@/ui-core/components/organisms/UserChannelsDialog";
import { Trash2 } from "lucide-react";
import ChannelContext from "../../../context/channelContext";
import { toast } from "react-toastify"; // For toast notifications

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userChannels, setUserChannels] = useState([]);
  const [allChannels, setAllChannels] = useState([]);
  const router = useRouter(); // Initialize router for navigation
  const { deleteUser } = useContext(ChannelContext);

  // Fetch Users Function
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch user's assigned channels
  const fetchUserChannels = async (channelIds) => {
    if (!channelIds || channelIds.length === 0) {
      setUserChannels([]);
      return;
    }
    try {
      const channelResponses = await Promise.all(
        channelIds.map((id) =>
          axios.get(`${process.env.NEXT_PUBLIC_API_URL}/channel/${id}`)
        )
      );
      setUserChannels(channelResponses.map((res) => res.data));
    } catch (error) {
      console.error("Error fetching user channels", error);
      setError("Failed to fetch channels");
    }
  };

  // Handle navigation to UserChannelsDetails page with user data
  const navigateToUserChannels = (user) => {
    router.push(`/users/${user.id}`);
  };

  // Handle deleting a user
  const handleDeleteUser = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        const success = await deleteUser(userId);
        if (success) {
          // Remove the deleted user from the state to update the UI
          setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
          toast.success("User deleted successfully!");
        }
      } catch (error) {
        toast.error("Failed to delete user.");
      }
    }
  };

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-bold">Users List</h1>
      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Channel</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="px-4 py-2">
                    {user.email_addresses?.[0]?.email_address}
                  </td>
                  <td className="px-4 py-2">
                    <a
                      href="#"
                      onClick={() => navigateToUserChannels(user)} // Navigate on click
                    >
                      View Channels
                    </a>
                  </td>
                  <td className="px-4 py-2">
                    {user.public_metadata?.role || "N/A"}
                  </td>
                  <td className="flex gap-2 px-4 py-2">
                    <UserDetailsModal user={user} fetchUsers={fetchUsers} />
                    <button
                      onClick={() => handleDeleteUser(user.id)} // Trigger delete on click
                    >
                      <Trash2 />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
