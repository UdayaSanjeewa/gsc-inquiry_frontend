"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import React, { useState } from "react";

function UserDetails() {
  const { isSignedIn = false, user } = useUser();
  const [isClient, setIsClient] = useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  const userRole = user?.publicMetadata?.role;

  return (
    <div className="flex flex-col gap-2 mt-4">
      <div className="flex items-center gap-2">
        <UserButton />
        <span className="text-xl font-bold">{user?.firstName}</span>
      </div>
      <span className="pl-8 text-xl font-bold uppercase text-slate-600">
        {userRole}
      </span>
    </div>
  );
}

export default UserDetails;
