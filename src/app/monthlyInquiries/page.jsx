"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InquiryContext from "../../../context/InquiryContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useUser } from "@clerk/nextjs";
import InquiriesTable from "@/ui-core/components/organisms/InquiriesTable"; // Import the InquiriesTable component

const statusColors = {
  Open: "bg-green-500",
  Pending: "bg-yellow-500",
  Resolved: "bg-gray-500",
};

export default function MonthlyInquiriesPage() {
  // Getting User Role
  const { isSignedIn = false, user } = useUser();
  const [isClient, setIsClient] = useState(false);
  const userRole = user?.publicMetadata?.role;

    const router = useRouter();

  const { getMonthlyInquiries, deleteInquiry } = useContext(InquiryContext);
  const [monthlyInquiries, setMonthlyInquiries] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const formattedMonth = format(selectedMonth, "MM-yyyy");
    getMonthlyInquiries(formattedMonth).then((data) => {
      setMonthlyInquiries(Array.isArray(data) ? data : []);
    });
  }, [selectedMonth]);

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
      setMonthlyInquiries((prev) => prev.filter((inq) => inq._id !== id));
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
      <h1 className="mt-4 mb-6 text-3xl font-bold">Monthly Inquiries</h1>

      {/* Month Picker */}
      <div className="mb-4">
        <label className="font-semibold">Select Month:</label>
        <DatePicker
          selected={selectedMonth}
          onChange={(date) => setSelectedMonth(date)}
          dateFormat="MM-yyyy"
          showMonthYearPicker
          className="p-2 border rounded-md shadow-sm"
        />
      </div>

      {/* Use the InquiriesTable component here */}
      <InquiriesTable
        inquiries={monthlyInquiries}
        userRole={userRole}
        handleDeleteInquiry={handleDeleteInquiry}
        sortBy={sortBy}
        sortOrder={sortOrder}
        handleSort={handleSort}
      />
    </div>
  );
}
