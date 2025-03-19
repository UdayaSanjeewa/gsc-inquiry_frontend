// "use client";
// import { useUser } from "@clerk/nextjs";
// import { useRouter } from "next/navigation";
// import React, { useContext, useEffect, useState } from "react";
// import InquiryContext from "../../../context/InquiryContext";
// import InquiriesTable from "@/ui-core/components/organisms/InquiriesTable";
// import AddInquiryPage from "@/ui-core/components/atoms/AddInquiryPage";

// const statusColors = {
//   Open: "bg-green-500",
//   Pending: "bg-yellow-500",
//   Resolved: "bg-gray-500",
// };

// function Inquiries() {
//   // Getting User Role
//   const { isSignedIn = false, user } = useUser();
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   console.log("USER ROLE : ", user?.publicMetadata?.role);
//   console.log("USER CHANNEL : ", user?.publicMetadata?.channel);
//   const userRole = user?.publicMetadata?.role || "";
//   const { getInquiriesByChannel, deleteInquiry } = useContext(InquiryContext);
//   const [channelInquiries, setChannelInquiries] = useState([]);
//   const [selectedChannel, setSelectedChannel] = useState(
//     "67d51f1e410b63846447e364"
//   ); // Store the selected channel ID
//   const [sortBy, setSortBy] = useState(null);
//   const [sortOrder, setSortOrder] = useState("asc");

//   // Fetch inquiries when a channel is selected
//   useEffect(() => {
//     getInquiriesByChannel(selectedChannel).then((data) => {
//       setChannelInquiries(data);
//     });
//   }, []);

//   const handleSort = (key) => {
//     if (sortBy === key) {
//       setSortOrder(sortOrder === "asc" ? "desc" : "asc");
//     } else {
//       setSortBy(key);
//       setSortOrder("asc");
//     }
//   };

//   const sortedInquiries = [...channelInquiries].sort((a, b) => {
//     if (!sortBy) return 0;
//     return sortOrder === "asc"
//       ? a[sortBy].localeCompare(b[sortBy])
//       : b[sortBy].localeCompare(a[sortBy]);
//   });

//   return (
//     <div className="p-6">
//       <AddInquiryPage />
//       <h1 className="mt-4 mb-6 text-3xl font-bold">Inquiries</h1>

//       {/* Passing inquiries and userRole as props */}
//       <InquiriesTable
//         inquiries={sortedInquiries}
//         userRole={userRole}
//         handleDeleteInquiry={() => {}}
//         sortBy={sortBy}
//         sortOrder={sortOrder}
//         handleSort={handleSort}
//       />
//     </div>
//   );
// }

// export default Inquiries;

// ===========================================
"use client";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import InquiryContext from "../../../context/InquiryContext";
import InquiriesTable from "@/ui-core/components/organisms/InquiriesTable";
import AddInquiryPage from "@/ui-core/components/atoms/AddInquiryPage";

const statusColors = {
  Open: "bg-green-500",
  Pending: "bg-yellow-500",
  Resolved: "bg-gray-500",
};

function Inquiries() {
  // Getting User Role
  const { isSignedIn = false, user } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  console.log("USER ROLE : ", user?.publicMetadata?.role);
  console.log("USER CHANNEL : ", user?.publicMetadata?.channel);
  const userRole = user?.publicMetadata?.role || "";
  const { getInquiriesByChannel, deleteInquiry } = useContext(InquiryContext);
  const [channelInquiries, setChannelInquiries] = useState([]); // Ensure default is an empty array
  const [selectedChannel, setSelectedChannel] = useState(
    "67d51f1e410b63846447e364"
  ); // Store the selected channel ID
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  // Fetch inquiries when a channel is selected
  useEffect(() => {
    getInquiriesByChannel(selectedChannel).then((data) => {
      setChannelInquiries(data || []);  // Ensure data is always an array
    });
  }, [selectedChannel]);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const sortedInquiries = [...channelInquiries].sort((a, b) => {
    if (!sortBy) return 0;
    return sortOrder === "asc"
      ? a[sortBy].localeCompare(b[sortBy])
      : b[sortBy].localeCompare(a[sortBy]);
  });

  return (
    <div className="p-6">
      <AddInquiryPage />
      <h1 className="mt-4 mb-6 text-3xl font-bold">Inquiries</h1>

      {/* Passing inquiries and userRole as props */}
      <InquiriesTable
        inquiries={sortedInquiries}
        userRole={userRole}
        handleDeleteInquiry={() => {}}
        sortBy={sortBy}
        sortOrder={sortOrder}
        handleSort={handleSort}
      />
    </div>
  );
}

export default Inquiries;
