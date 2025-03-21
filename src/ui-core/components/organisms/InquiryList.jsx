"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InquiryContext from "../../../../context/InquiryContext";
import AddInquiryPage from "../atoms/AddInquiryPage";
import InquiriesTable from "./InquiriesTable";
import { useUser } from "@clerk/nextjs";

export default function InquiryList() {
  // Getting User Role
  const { isSignedIn = false, user } = useUser();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const userRole = user?.publicMetadata?.role;

  const { inquiries, getAllInquries, deleteInquiry, working, setWorking } =
    useContext(InquiryContext);
  const router = useRouter();

  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder("asc");
    }
  };

  const sortedInquiries = [...inquiries].sort((a, b) => {
    if (!sortBy) return 0;
    return sortOrder === "asc"
      ? a[sortBy].localeCompare(b[sortBy])
      : b[sortBy].localeCompare(a[sortBy]);
  });

  // Fetch inquiries only on mount or when userRole changes (no dependency on 'working')
  useEffect(() => {
    getAllInquries();  // Fetch inquiries only when component mounts or userRole changes
  }, [userRole]);  // Added userRole as a dependency, so the effect runs when the user role is updated

  const handleDeleteInquiry = (id) => {
    const result = deleteInquiry(id);
    if (result) {
      router.refresh();
      setWorking(true); // This should not trigger re-fetch, but set the working state for other purposes
    }
  };

  return (
    <div className="p-6">
      <AddInquiryPage />
      <h1 className="mt-4 mb-6 text-3xl font-bold">Inquiries</h1>

      {/* Passing inquiries and userRole as props */}
      <InquiriesTable
        inquiries={sortedInquiries}
        userRole={userRole}
        handleDeleteInquiry={handleDeleteInquiry}
        sortBy={sortBy}
        sortOrder={sortOrder}
        handleSort={handleSort}
      />
    </div>
  );
}
