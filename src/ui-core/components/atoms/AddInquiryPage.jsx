"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "../atoms/InputField";
import SubmitButton from "../atoms/SubmitButton";
import { useFormik } from "formik";
import * as yup from "yup";
import InquiryContext from "../../../../context/InquiryContext";
import ChannelContext from "../../../../context/channelContext";

// Degree options
const degreeOptions = ["BED", "PGDE", "MED", "BBA", "MBA", "Nursing", "PhD"];

// Initial values for formik
const initialValues = {
  name: "",
  mobileNumber: "",
  whatsappNumber: "",
  degree: "",
  channelId: "",
  sameAsMobile: false,
};

// Yup validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  mobileNumber: yup
    .string()
    .matches(/^\d{10}$/, "Please enter a valid 10-digit mobile number")
    .required("Mobile Number is Required"),
  whatsappNumber: yup
    .string()
    .nullable()
    .when("sameAsMobile", {
      is: false,
      then: (schema) =>
        schema
          .matches(/^\d{10}$/, "Please enter a valid 10-digit WhatsApp number")
          .required("WhatsApp Number is Required"),
      otherwise: (schema) => schema.notRequired(),
    }),
  degree: yup
    .string()
    .oneOf(degreeOptions, "Please select a valid degree")
    .required("Degree is Required"),
  channelId: yup.string().required("Channel is Required"),
});

function AddInquiryPage() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { newInquiry, setWorking } = useContext(InquiryContext);
  const { channels, getAllChannels, loading } = useContext(ChannelContext);

  useEffect(() => {
    getAllChannels();
  }, []);

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: (values) => {
      const submissionValues = {
        ...values,
        whatsappNumber: values.sameAsMobile
          ? values.mobileNumber
          : values.whatsappNumber,
      };

      const result = newInquiry(submissionValues);
      if (result) {
        setIsOpen(false);
        setWorking(true);
        router.refresh();
        resetForm();
      }
    },
  });

  return (
    <div>
      <Dialog
        open={isOpen}
        onOpenChange={(state) => {
          setIsOpen(state);
          if (!state) resetForm();
        }}
      >
        <DialogTrigger className="bg-[#16a085] hover:bg-[#1abc9c] transition-all duration-300 px-4 py-2 rounded-md text-white">
          Add Inquiry
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Inquiry</DialogTitle>
            <DialogDescription>
              <form
                className="flex flex-col gap-6 w-[60%] pt-6"
                onSubmit={handleSubmit}
              >
                <InputField
                  title="Name"
                  type="text"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                />
                {errors.name && <p className="text-red-600">{errors.name}</p>}

                <InputField
                  title="Mobile Number"
                  type="text"
                  name="mobileNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.mobileNumber}
                />
                {errors.mobileNumber && (
                  <p className="text-red-600">{errors.mobileNumber}</p>
                )}

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="sameAsMobile"
                    name="sameAsMobile"
                    checked={values.sameAsMobile}
                    onChange={(e) => {
                      const isChecked = e.target.checked;
                      setFieldValue("sameAsMobile", isChecked);
                      if (isChecked) {
                        setFieldValue("whatsappNumber", values.mobileNumber);
                      } else {
                        setFieldValue("whatsappNumber", "");
                      }
                    }}
                  />
                  <label htmlFor="sameAsMobile" className="text-sm">
                    Use Mobile Number as WhatsApp Number
                  </label>
                </div>

                <InputField
                  title="WhatsApp Number"
                  type="text"
                  name="whatsappNumber"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.whatsappNumber}
                  disabled={values.sameAsMobile}
                />
                {errors.whatsappNumber && (
                  <p className="text-red-600">{errors.whatsappNumber}</p>
                )}

                {/* Degree Combo Box */}
                <div>
                  <label
                    htmlFor="degree"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Degree
                  </label>
                  <select
                    id="degree"
                    name="degree"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.degree}
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                  >
                    <option value="">Select a degree</option>
                    {degreeOptions.map((degree) => (
                      <option key={degree} value={degree}>
                        {degree}
                      </option>
                    ))}
                  </select>
                  {errors.degree && (
                    <p className="text-red-600">{errors.degree}</p>
                  )}
                </div>

                {/* Channel Selection */}
                <div>
                  <label
                    htmlFor="channelId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Channel
                  </label>
                  {loading ? (
                    <p>Loading channels...</p>
                  ) : (
                    <select
                      id="channelId"
                      name="channelId"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.channelId}
                      className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                      <option value="">Select a channel</option>
                      {channels.length > 0 ? (
                        channels.map((channel) => (
                          <option key={channel._id} value={channel._id}>
                            {channel.title}
                          </option>
                        ))
                      ) : (
                        <option value="" disabled>
                          No channels available
                        </option>
                      )}
                    </select>
                  )}
                  {errors.channelId && (
                    <p className="text-red-600">{errors.channelId}</p>
                  )}
                </div>

                <SubmitButton title="Submit" type="submit" />
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddInquiryPage;
