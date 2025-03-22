"use client";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import InquiryContext from "../../../context/InquiryContext";
import ChannelContext from "../../../context/channelContext";
import InquiriesTable from "@/ui-core/components/organisms/InquiriesTable"; // Import your InquiriesTable component

export default function InquiriesByChannelPage() {
  const { isSignedIn = false, user } = useUser();
  const userRole = user?.publicMetadata?.role;
  const { getInquiriesByChannel, deleteInquiry } = useContext(InquiryContext);
  const { channels, getAllChannels } = useContext(ChannelContext);
  const [channelInquiries, setChannelInquiries] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState(""); // Store the selected channel ID
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const router = useRouter();

  useEffect(() => {
    if (userRole === "channelOwner") {
      // Redirect to "/users" if the userRole is "channelOwner" or "salesPerson"
      router.push("/inquiries");
    }
  }, [userRole, router]);

  useEffect(() => {
    getAllChannels();
  }, []);

  useEffect(() => {
    if (selectedChannel) {
      getInquiriesByChannel(selectedChannel).then((data) => {
        setChannelInquiries(data);
      });
    }
  }, [selectedChannel]);

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const handleDeleteInquiry = async (id) => {
    const result = await deleteInquiry(id);
    if (result) {
      setChannelInquiries(channelInquiries.filter((inq) => inq._id !== id));
      router.refresh();
    }
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
      <h1 className="mt-4 mb-6 text-3xl font-bold">Inquiries by Channel</h1>

      {/* Channel Select Dropdown */}
      <div className="mb-6">
        <label htmlFor="channelSelect" className="block text-lg font-medium">
          Select Channel
        </label>
        <select
          id="channelSelect"
          className="w-full p-2 border rounded-md"
          onChange={(e) => setSelectedChannel(e.target.value)}
          value={selectedChannel}
        >
          <option value="">-- Select a Channel --</option>
          {channels?.map((channel) => (
            <option key={channel._id} value={channel._id}>
              {channel.title}
            </option>
          ))}
        </select>
      </div>

      {/* Use InquiriesTable component here */}
      <InquiriesTable
        inquiries={channelInquiries}
        userRole={userRole}
        handleDeleteInquiry={handleDeleteInquiry}
        sortBy={sortBy}
        sortOrder={sortOrder}
        handleSort={handleSort}
      />
    </div>
  );
}
