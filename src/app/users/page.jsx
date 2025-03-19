"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import UserDetailsModal from "@/ui-core/components/organisms/UserDetailsModal";

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    // Fetch Users Function
    const fetchUsers = () => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`)
            .then((res) => setUsers(res.data))
            .catch((err) => setError(err.response?.data?.error || err.message));
    };

    useEffect(() => {
        fetchUsers();
    }, []);

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
                                    <td className="px-4 py-2">{user.first_name} {user.last_name}</td>
                                    <td className="px-4 py-2">{user.email_addresses?.[0]?.email_address}</td>
                                    <td className="px-4 py-2">{user.public_metadata?.channel || "N/A"}</td>
                                    <td className="px-4 py-2">{user.public_metadata?.role || "N/A"}</td>
                                    <td className="px-4 py-2">
                                        <UserDetailsModal user={user} fetchUsers={fetchUsers} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="px-4 py-2 text-center">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
