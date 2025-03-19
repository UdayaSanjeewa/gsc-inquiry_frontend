"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";

const userRoles = ["admin", "channelOwner", "salesPerson"];

export default function UserDetailsModal({ user, fetchUsers }) {
    const [selectedRole, setSelectedRole] = useState(user?.public_metadata?.role || "N/A");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // State to control modal visibility

    if (!user) return null;

    const updateUserRole = async () => {
        setLoading(true);
        setMessage(null);
    
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/users/${user.id}/role`, {
                role: selectedRole
            });

            setMessage({ type: "success", text: "User role updated successfully!" });

            // Refresh users list
            fetchUsers();

            // Close modal after a short delay
            setTimeout(() => {
                setIsOpen(false);
            }, 500);
        } catch (error) {
            setMessage({ type: "error", text: error.response?.data?.error || "Failed to update role." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="px-3 py-1 text-white bg-blue-600 rounded hover:bg-blue-700" onClick={() => setIsOpen(true)}>
                    View Details
                </button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>User Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p><strong>Name:</strong> {user.first_name} {user.last_name}</p>
                    <p><strong>Email:</strong> {user.email_addresses?.[0]?.email_address}</p>
                    <p><strong>Channel:</strong> {user.public_metadata?.channel || "N/A"}</p>

                    {/* Role Selection Combobox */}
                    <div>
                        <p><strong>Role:</strong></p>
                        <Select value={selectedRole} onValueChange={setSelectedRole}>
                            <SelectTrigger className="w-full mt-1">
                                <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                                {userRoles.map((role) => (
                                    <SelectItem key={role} value={role}>
                                        {role}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Update Role Button */}
                    <Button onClick={updateUserRole} disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
                        {loading ? "Updating..." : "Update Role"}
                    </Button>

                    {/* Success/Error Message */}
                    {message && (
                        <p className={`text-sm mt-2 ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                            {message.text}
                        </p>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
