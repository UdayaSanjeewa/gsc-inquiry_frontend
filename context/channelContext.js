"use client";

import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [working, setWorking] = useState(false);

  // Fetch all channels
  const getAllChannels = async () => {
    setWorking(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/channel`
      );
      if (response) {
        // console.log("Fetched Channels:", response.data); // Log response data
        setChannels(response.data);
        setWorking(false);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setError("Failed to fetch channels");
      setWorking(false);
    }
  };

  // Get a single channel by ID
  const getChannelById = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/channel/${id}`
      );
      if (response) {
        return response.data; // Return channel data
      }
    } catch (error) {
      console.error("Error fetching channel by ID", error);
      setError(error?.response?.data?.message || "Failed to fetch channel");
      return null;
    }
  };

  // Get a user by ID
  const getUserById = async (userId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`
      );
      if (response) {
        return response.data; // Return user data
      }
    } catch (error) {
      console.error("Error fetching user by ID", error);
      setError(error?.response?.data?.message || "Failed to fetch user");
      return null;
    }
  };

  // Add a new channel
  const newChannel = async (channel) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/channel`,
        channel
      );
      if (data) {
        await getAllChannels();
        toast.success("Channel added successfully!");
        return true;
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to create channel");
    }
  };

  // Update a channel
  const updateChannel = async (id, updatedChannel) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/channel/${id}`,
        updatedChannel
      );
      if (data) {
        setChannels((prevChannels) =>
          prevChannels.map((channel) =>
            channel._id === id ? { ...channel, ...updatedChannel } : channel
          )
        );
        toast.success("Channel updated successfully!");
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to update channel");
    }
  };

  // Add this function inside ChannelProvider
  const updateUserChannels = async (userId, selectedChannels) => {
    setWorking(true);
    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/channels`,
        { channels: selectedChannels }
      );

      if (response.data) {
        toast.success("User channels updated successfully!");
        return true;
      }
    } catch (error) {
      console.error("Error updating user channels", error);
      setError(
        error?.response?.data?.message || "Failed to update user channels"
      );
    } finally {
      setWorking(false);
    }
  };

  // Delete a channel
  const deleteChannel = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/channel/${id}`
      );
      if (data?.success) {
        await getAllChannels();
        toast.success("Channel deleted successfully!");
        return true;
      }
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to delete channel");
    }
  };

  // Add this function inside ChannelProvider
  const deleteUser = async (userId) => {
    setWorking(true); // Set working state to true while performing the operation
    try {
      // Send a DELETE request to the API to delete the user by ID
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`
      );

      if (response.data) {
        toast.success("User deleted successfully!");
        return true; // Return true if the user was deleted successfully
      }
    } catch (error) {
      console.error("Error deleting user", error);
      setError(error?.response?.data?.message || "Failed to delete user");
    } finally {
      setWorking(false); // Set working state to false after the operation
    }
  };

  // Clear errors
  const clearErrors = () => {
    setError(null);
  };

  return (
    <ChannelContext.Provider
      value={{
        error,
        loading,
        channels,
        getAllChannels,
        getChannelById,
        getUserById,
        newChannel,
        updateChannel,
        updateUserChannels,
        deleteChannel,
        deleteUser,
        setLoading,
        clearErrors,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelContext;
