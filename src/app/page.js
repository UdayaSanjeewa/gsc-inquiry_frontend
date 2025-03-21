"use client";
import InquiryList from "@/ui-core/components/organisms/InquiryList";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";

export default function Home() {
  // Getting User Role
  const { isSignedIn = false, user } = useUser();
  const [isClient, setIsClient] = useState(false);
  const userRole = user?.publicMetadata?.role;

  if (userRole === undefined) {
    return (
      <div class="flex h-screen items-center justify-center bg-gray-100">
        <h1 class="text-2xl font-semibold text-gray-700 animate-pulse">
          Role Must Be Assigned by Admin...
        </h1>
      </div>
    );
  }

  return (
    <main>
      <InquiryList />
    </main>
  );
}
