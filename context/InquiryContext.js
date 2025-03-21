"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

const InquiryContext = createContext();

export const InquiryProvider = ({ children }) => {
  const [inquiries, setInquiries] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [working, setWorking] = useState(false);

  const router = useRouter();

  const getAllInquries = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiry`
      );
      // setInquiries(response.data);

      if (response) {
        setInquiries(response.data);
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  // New function to get call attempts by inquiry ID
  const getCallAttemptsByInquiryId = async (inquiryId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/call-attempt/inquiry/${inquiryId}`
      );

      if (response) {
        return response.data; // Return the fetched call attempts data
      }
    } catch (error) {
      console.error("Error fetching call attempts", error);
      setError(error?.response?.data?.message);
    }
  };

  const newInquiry = async (inquiry) => {
    // console.log("API_KEY : ", API_KEY);

    try {
      const { data } = await axios.post(
        // `http://localhost:3000/api/priceItem`,
        `${process.env.NEXT_PUBLIC_API_URL}/inquiry`,
        inquiry
      );
      if (data) {
        await getAllInquries();
        return true;
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  // Function to add call attempt
  const addCallAttempt = async (inquiryId, count) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/call-attempt`,
        { inquiryId, count }
      );

      if (response && response.data) {
        // Optionally update the inquiries list or other states if needed
        toast.success("Call attempt added successfully!");
        return response.data;
      }
    } catch (error) {
      console.error("Error adding call attempt", error);
      setError(error?.response?.data?.message);
    }
  };

  const updateInquiryStatus = async (inquiryState, id) => {
    try {
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiry/${id}`,
        inquiryState
      );

      if (data) {
        setInquiries((prevInquiries) =>
          prevInquiries.map((inq) =>
            inq._id === id ? { ...inq, ...inquiryState } : inq
          )
        );
        toast.success("Inquiry status updated!");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const deleteInquiry = async (id) => {
    try {
      const { data } = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiry/${id}`
      );

      if (data?.success) {
        await getAllInquries();
        return data?.success;
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  /* Get an inquiry by id */
  const getInquiryById = async (id) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiry/${id}`
      );

      if (response) {
        return response.data; // Return the fetched inquiry data
      }
    } catch (error) {
      console.error("Error fetching inquiry by ID", error);
      setError(error?.response?.data?.message);
    }
  };

  /* Add a comment to a inquiry */
  const addCommentToInquiry = async (id, comment) => {
    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiry/${id}/comments`,
        { comment }
      );

      if (data) {
        setInquiries((prevInquiries) =>
          prevInquiries.map((inq) =>
            inq._id === id
              ? { ...inq, comments: [...inq.comments, comment] }
              : inq
          )
        );
        toast.success("Comment added successfully!");
      }
    } catch (error) {
      setError(error?.response?.data?.message);
    }
  };

  const getDailyInquiries = async (date) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiry/date/${date}`
      );

      if (response) {
        return response.data; // Return the daily inquiries
      }
    } catch (error) {
      console.error("Error fetching daily inquiries", error);
      setError(error?.response?.data?.message);
    }
  };

  /* Get inquires in a month */
  const getMonthlyInquiries = async (month) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiry/month/${month}`
      );

      if (response) {
        return response.data; // Return the monthly inquiries
      }
    } catch (error) {
      console.error("Error fetching monthly inquiries", error);
      setError(error?.response?.data?.message);
    }
  };

  /* Get inquiries on channel */
  const getInquiriesByChannel = async (channelId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/inquiry/channel/${channelId}`
      );
      if (response) {
        return response.data; // Return the inquiries for the specified channel
      }
    } catch (error) {
      console.error("Error fetching inquiries by channel", error);
      setError(error?.response?.data?.message);
    }
  };

  // Function to generate CSV from the inquiry data
  // const generateCsv = async (data) => {
  //   try {
  //     // Convert JSON data to CSV format
  //     const csv = await parse(data);
  //     return csv;
  //   } catch (err) {
  //     console.error("Error generating CSV:", err);
  //     return null;
  //   }
  // };

  const clearErrors = () => {
    setError(null);
  };

  return (
    <InquiryContext.Provider
      value={{
        error,
        loading,
        working,
        inquiries,
        getAllInquries,
        getInquiryById,
        getDailyInquiries,
        getMonthlyInquiries,
        getInquiriesByChannel,
        getCallAttemptsByInquiryId,
        // generateCsv,
        newInquiry,
        addCommentToInquiry,
        addCallAttempt,
        updateInquiryStatus,
        deleteInquiry,
        setLoading,
        setWorking,
        clearErrors,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
};

export default InquiryContext;
