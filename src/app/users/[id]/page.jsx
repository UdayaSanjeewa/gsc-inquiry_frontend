// 'use client';

// import { useParams } from 'next/navigation';
// import { useContext, useEffect, useState } from 'react';
// import ChannelContext from '../../../../context/channelContext';
// import { toast } from 'react-toastify';

// const UserChannelsDetails = ({ params }) => {
//   const { id } = params; // Get the user ID from the URL
//   const { getUserById, getAllChannels, channels, updateUserChannels } = useContext(ChannelContext);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedChannels, setSelectedChannels] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (id) {
//         const userData = await getUserById(id);
//         setUser(userData);

//         // Store the user's current channels in state
//         if (userData?.publicMetadata?.channel) {
//           setSelectedChannels(userData.publicMetadata.channel);
//         }
//       }

//       // Fetch all available channels
//       await getAllChannels();
//       setLoading(false);
//     };

//     fetchData();
//   }, []);

//   const handleChannelChange = (channelId) => {
//     setSelectedChannels((prevSelected) =>
//       prevSelected.includes(channelId)
//         ? prevSelected.filter((id) => id !== channelId) // Remove if already selected
//         : [...prevSelected, channelId] // Add if not selected
//     );
//   };

//   const handleUpdateChannels = async () => {
//     if (!user) {
//       toast.error("User not found!");
//       return;
//     }

//     const success = await updateUserChannels(user.id, selectedChannels);
//     if (success) {
//       toast.success("User channels updated successfully!");
//     } else {
//       toast.error("Failed to update channels.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
//       <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
//         <h1 className="mb-4 text-2xl font-semibold text-gray-800">User Channels Details</h1>

//         {loading ? (
//           <p className="text-gray-600">Loading...</p>
//         ) : user ? (
//           <div>
//             <div className="mb-6">
//               <p className="text-lg"><strong className="text-gray-700">User ID:</strong> {user.id}</p>
//               <p className="text-lg"><strong className="text-gray-700">Name:</strong> {user.firstName} {user.lastName}</p>
//               <p className="text-lg"><strong className="text-gray-700">Email:</strong> {user.email}</p>
//             </div>

//             <h2 className="mb-3 text-xl font-medium text-gray-700">All Channels</h2>
//             {channels.length > 0 ? (
//               <ul className="grid grid-cols-2 gap-4 p-4 border border-gray-200 rounded-md bg-gray-50">
//                 {channels.map((channel) => (
//                   <li key={channel._id} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       value={channel._id}
//                       checked={selectedChannels.includes(channel._id)}
//                       onChange={() => handleChannelChange(channel._id)}
//                       className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
//                     />
//                     <label className="text-gray-700 cursor-pointer">{channel.title}</label>
//                   </li>
//                 ))}
//               </ul>
//             ) : (
//               <p className="text-gray-600">No channels available.</p>
//             )}

//             {/* Update Channels Button */}
//             <button
//               onClick={handleUpdateChannels}
//               disabled={loading}
//               className="w-full px-4 py-2 mt-6 font-semibold text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
//             >
//               Update Channels
//             </button>
//           </div>
//         ) : (
//           <p className="text-red-500">User not found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default UserChannelsDetails;

// =====================================================

'use client';

import { useParams, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import ChannelContext from '../../../../context/channelContext';
import { toast } from 'react-toastify';

const UserChannelsDetails = ({ params }) => {
  const { id } = params; // Get the user ID from the URL
  const router = useRouter(); // Initialize the router
  const { getUserById, getAllChannels, channels, updateUserChannels } = useContext(ChannelContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedChannels, setSelectedChannels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const userData = await getUserById(id);
        setUser(userData);

        // Store the user's current channels in state
        if (userData?.publicMetadata?.channel) {
          setSelectedChannels(userData.publicMetadata.channel);
        }
      }

      // Fetch all available channels
      await getAllChannels();
      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChannelChange = (channelId) => {
    setSelectedChannels((prevSelected) =>
      prevSelected.includes(channelId)
        ? prevSelected.filter((id) => id !== channelId) // Remove if already selected
        : [...prevSelected, channelId] // Add if not selected
    );
  };

  const handleUpdateChannels = async () => {
    if (!user) {
      toast.error("User not found!");
      return;
    }

    const success = await updateUserChannels(user.id, selectedChannels);
    if (success) {
      toast.success("User channels updated successfully!");
      router.push('/users'); // Redirect to "/users" after successful update
    } else {
      toast.error("Failed to update channels.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
        <h1 className="mb-4 text-2xl font-semibold text-gray-800">User Channels Details</h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : user ? (
          <div>
            <div className="mb-6">
              <p className="text-lg"><strong className="text-gray-700">User ID:</strong> {user.id}</p>
              <p className="text-lg"><strong className="text-gray-700">Name:</strong> {user.firstName} {user.lastName}</p>
              <p className="text-lg"><strong className="text-gray-700">Email:</strong> {user.email}</p>
            </div>

            <h2 className="mb-3 text-xl font-medium text-gray-700">All Channels</h2>
            {channels.length > 0 ? (
              <ul className="grid grid-cols-2 gap-4 p-4 border border-gray-200 rounded-md bg-gray-50">
                {channels.map((channel) => (
                  <li key={channel._id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      value={channel._id}
                      checked={selectedChannels.includes(channel._id)}
                      onChange={() => handleChannelChange(channel._id)}
                      className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                    />
                    <label className="text-gray-700 cursor-pointer">{channel.title}</label>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">No channels available.</p>
            )}

            {/* Update Channels Button */}
            <button
              onClick={handleUpdateChannels}
              disabled={loading}
              className="w-full px-4 py-2 mt-6 font-semibold text-white transition duration-200 bg-blue-600 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Update Channels
            </button>
          </div>
        ) : (
          <p className="text-red-500">User not found.</p>
        )}
      </div>
    </div>
  );
};

export default UserChannelsDetails;
