"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InquiryContext from "../../../context/InquiryContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import InquiriesTable from "@/ui-core/components/organisms/InquiriesTable";
import { useUser } from "@clerk/nextjs";

export default function DailyInquiriesPage() {
    // Getting User Role
    const { isSignedIn = false, user } = useUser();
    const [isClient, setIsClient] = useState(false);
    const userRole = user?.publicMetadata?.role;

  const { getDailyInquiries, deleteInquiry } = useContext(InquiryContext);
  const [dailyInquiries, setDailyInquiries] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const router = useRouter();

  useEffect(() => {
    const formattedDate = format(selectedDate, "dd-MM-yyyy");
    getDailyInquiries(formattedDate).then((data) => {
      setDailyInquiries(Array.isArray(data) ? data : []);
    });
  }, [selectedDate]);

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
      setDailyInquiries(dailyInquiries.filter((inq) => inq._id !== id));
      router.refresh();
    }
  };

  useEffect(() => {
    if (userRole === "channelOwner" || userRole === "salesPerson") {
      // Redirect to "/users" if the userRole is "channelOwner" or "salesPerson"
      router.push("/inquiries");
    }
  }, [userRole, router]);

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
      <h1 className="mt-4 mb-6 text-3xl font-bold">Daily Inquiries</h1>

      {/* Date Picker */}
      <div className="mb-4">
        <label className="font-semibold">Select Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd-MM-yyyy"
          className="p-2 border rounded-md shadow-sm"
        />
      </div>

      {/* Include the InquiriesTable Component */}
      <InquiriesTable
        inquiries={dailyInquiries}
        userRole="admin" // Or pass dynamic user role if necessary
        handleDeleteInquiry={handleDeleteInquiry}
        sortBy={sortBy}
        sortOrder={sortOrder}
        handleSort={handleSort}
      />
    </div>
  );
}
