"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useContext, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import InputField from "../atoms/InputField";
import SubmitButton from "../atoms/SubmitButton";
import NewComboBox from "./NewComboBox";
import InquiryContext from "../../../../context/InquiryContext";
import { useRouter } from "next/navigation";

// Yup validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  mobileNumber: yup
    .string()
    .matches(/^\d{10}$/, "Mobile Number must be 10 digits")
    .required("Mobile Number is required"),
  degree: yup.string().required("Degree is required"),
  status: yup.string().required("Status is required"),
});

function InquiryDetail({ inquiry }) {
  const [isOpen, setIsOpen] = useState(false);
  const { updateInquiryStatus, setWorking } = useContext(InquiryContext);
  const router = useRouter();
  const { values, handleBlur, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name: inquiry?.name || "",
      mobileNumber: inquiry?.mobileNumber || "",
      degree: inquiry?.degree || "",
      status: inquiry?.status || "",
    },
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const data = { status: values.status };
      await updateInquiryStatus(data, inquiry._id);
      setIsOpen(false);
    },
  });

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger>More</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inquiry Details</DialogTitle>
            <DialogDescription>
              <form
                className="flex flex-col gap-6 w-[60%] pt-6"
                onSubmit={handleSubmit}
              >
                <div className="flex flex-col gap-3">
                  <InputField
                    title={"Name"}
                    type={"text"}
                    placeholder={"Enter Name"}
                    name={"name"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.name}
                  />
                  {errors.name && <p className="text-red-600">{errors.name}</p>}
                </div>
                <div className="flex flex-col gap-3">
                  <InputField
                    title={"Mobile Number"}
                    type={"text"}
                    placeholder={"Enter Mobile Number"}
                    name={"mobileNumber"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.mobileNumber}
                  />
                  {errors.mobileNumber && (
                    <p className="text-red-600">{errors.mobileNumber}</p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <InputField
                    title={"Degree"}
                    type={"text"}
                    placeholder={"Enter Degree"}
                    name={"degree"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.degree}
                  />
                  {errors.degree && (
                    <p className="text-red-600">{errors.degree}</p>
                  )}
                </div>
                <div className="flex flex-col gap-3">
                  <NewComboBox
                    title={"Status"}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.status}
                    options={["Pending", "Completed", "Closed"]}
                  />
                  {errors.status && (
                    <p className="text-red-600">{errors.status}</p>
                  )}
                </div>
                <SubmitButton title={"Update"} type={"submit"} />
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default InquiryDetail;
