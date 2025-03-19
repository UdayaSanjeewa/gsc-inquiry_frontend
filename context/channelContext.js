"use client";

import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

const ChannelContext = createContext();

export const ChannelProvider = ({ children }) => {
  const [channels, setChannels] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch all channels
  const getAllChannels = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/channel`
      );
      if (response) {
        // console.log("Fetched Channels:", response.data); // Log response data
        setChannels(response.data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
      setError("Failed to fetch channels");
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
        newChannel,
        updateChannel,
        deleteChannel,
        setLoading,
        clearErrors,
      }}
    >
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelContext;
