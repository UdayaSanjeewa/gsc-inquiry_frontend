// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import React, { useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import InputField from "../atoms/InputField";
// import SubmitButton from "../atoms/SubmitButton";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import ChannelContext from "../../../../context/channelContext";

// // Initial form values
// const initialValues = {
//   title: "",
//   salesPerson: "",
//   authorizedBranch: "",
// };

// // Yup validation schema
// const schema = yup.object().shape({
//   title: yup.string().required("Channel Title is Required"),
//   salesPerson: yup
//     .string()
//     .email("Please enter a valid email address")
//     .required("Sales Person is Required"),
//   authorizedBranch: yup.string().required("Authorized Branch is Required"),
// });

// function UpdateChannelPage({ channelId, title, salesPerson, authorizedBranch }) {
//   const { updateChannel, setWorking, getChannelById } = useContext(ChannelContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [channelData, setChannelData] = useState(null);
//   const router = useRouter();

//   const {
//     values,
//     handleBlur,
//     handleChange,
//     handleSubmit,
//     errors,
//     setFieldValue,
//     resetForm,
//   } = useFormik({
//     initialValues,
//     validationSchema: schema,
//     enableReinitialize: true,
//     onSubmit: (values) => {
//       // Submitting the updated channel data
//       const submissionValues = {
//         ...values,
//       };

//       const result = updateChannel(channelId, submissionValues);
//       if (result) {
//         setIsOpen(false);
//         setWorking(true);
//         router.refresh();
//         resetForm();
//       }
//     },
//   });

//   useEffect(() => {
//       setFieldValue("title", title);
//       setFieldValue("salesPerson", salesPerson);
//       setFieldValue("authorizedBranch", authorizedBranch);
//   }, []);

//   return (
//     <div>
//       <Dialog
//         open={isOpen}
//         onOpenChange={(state) => {
//           setIsOpen(state);
//           if (!state) resetForm();
//         }}
//       >
//         <DialogTrigger className="bg-[#16a085] hover:bg-[#1abc9c] transition-all duration-300 px-4 py-2 rounded-md text-white">
//           Update Channel
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Update Channel</DialogTitle>
//             <DialogDescription>
//                 <form className="flex flex-col gap-6 w-[60%] pt-6" onSubmit={handleSubmit}>
//                   {/* Channel Title */}
//                   <InputField
//                     title="Channel Title"
//                     type="text"
//                     name="title"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.title}
//                     disabled={true}
//                   />
//                   {errors.title && <p className="text-red-600">{errors.title}</p>}

//                   {/* Sales Person */}
//                   <InputField
//                     title="Sales Person (Email)"
//                     type="email"
//                     name="salesPerson"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.salesPerson}
//                   />
//                   {errors.salesPerson && <p className="text-red-600">{errors.salesPerson}</p>}

//                   {/* Authorized Branch */}
//                   <InputField
//                     title="Authorized Branch"
//                     type="text"
//                     name="authorizedBranch"
//                     onBlur={handleBlur}
//                     onChange={handleChange}
//                     value={values.authorizedBranch}
//                   />
//                   {errors.authorizedBranch && <p className="text-red-600">{errors.authorizedBranch}</p>}

//                   {/* Submit Button */}
//                   <SubmitButton title="Submit" type="submit" />
//                 </form>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default UpdateChannelPage;

// =========================================

// "use client";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import React, { useContext, useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import InputField from "../atoms/InputField";
// import SubmitButton from "../atoms/SubmitButton";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import ChannelContext from "../../../../context/channelContext";
// import InquiryContext from "../../../../context/InquiryContext";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// // Initial form values
// const initialValues = {
//   title: "",
//   salesPerson: "",
//   authorizedBranch: "",
// };

// // Yup validation schema
// const schema = yup.object().shape({
//   title: yup.string().required("Channel Title is Required"),
//   salesPerson: yup
//     .string()
//     .email("Please enter a valid email address")
//     .required("Sales Person is Required"),
//   authorizedBranch: yup.string().required("Authorized Branch is Required"),
// });

// function UpdateChannelPage({ channelId, title, salesPerson, authorizedBranch }) {
//   const { updateChannel, setWorking } = useContext(ChannelContext);
//   const { getSalesPersons } = useContext(InquiryContext);
//   const [isOpen, setIsOpen] = useState(false);
//   const [salesPersons, setSalesPersons] = useState([]);
//   const router = useRouter();

//   const {
//     values,
//     handleSubmit,
//     errors,
//     resetForm,
//     setFieldValue,
//   } = useFormik({
//     initialValues,
//     validationSchema: schema,
//     enableReinitialize: true,
//     onSubmit: (values) => {
//       const submissionValues = { ...values };
//       const result = updateChannel(channelId, submissionValues);
//       if (result) {
//         setIsOpen(false);
//         setWorking(true);
//         router.refresh();
//         resetForm();
//       }
//     },
//   });

//   const branchOptions = ["Ampara", "Kandy", "Badulla", "Mathara", "Colombo"];

//   useEffect(() => {
//     setFieldValue("title", title);
//     setFieldValue("salesPerson", salesPerson);
//     setFieldValue("authorizedBranch", authorizedBranch);
//   }, [title, salesPerson, authorizedBranch, setFieldValue]);

//   useEffect(() => {
//     const fetchSalesPersons = async () => {
//       const data = await getSalesPersons();
//       if (data) {
//         setSalesPersons(data);
//       }
//     };
//     fetchSalesPersons();
//   }, [getSalesPersons]);

//   return (
//     <div>
//       <Dialog
//         open={isOpen}
//         onOpenChange={(state) => {
//           setIsOpen(state);
//           if (!state) resetForm();
//         }}
//       >
//         <DialogTrigger className="bg-[#16a085] hover:bg-[#1abc9c] transition-all duration-300 px-4 py-2 rounded-md text-white">
//           Update Channel
//         </DialogTrigger>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Update Channel</DialogTitle>
//             <DialogDescription>
//               <form className="flex flex-col gap-6 w-[60%] pt-6" onSubmit={handleSubmit}>
//                 <InputField title="Channel Title" type="text" name="title" value={values.title} disabled={true} />

//                 <div>
//                   <p><strong>Sales Person:</strong></p>
//                   <Select
//                     name="salesPerson"
//                     value={values.salesPerson}
//                     onValueChange={(value) => setFieldValue("salesPerson", value)}
//                   >
//                     <SelectTrigger className="w-full mt-1">
//                       <SelectValue placeholder="Select Sales Person" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {salesPersons.length > 0 ? (
//                         salesPersons.map((sp) => (
//                           <SelectItem key={sp.id} value={sp.email_addresses[0].email_address}>
//                             {sp.first_name} : {sp.email_addresses[0].email_address}
//                           </SelectItem>
//                         ))
//                       ) : (
//                         <SelectItem value="none" disabled>
//                           No Sales Persons Found
//                         </SelectItem>
//                       )}
//                     </SelectContent>
//                   </Select>
//                   {errors.salesPerson && <p className="text-red-600">{errors.salesPerson}</p>}
//                 </div>

//                 <div>
//                   <p><strong>Authorized Branch:</strong></p>
//                   <Select
//                     name="authorizedBranch"
//                     value={values.authorizedBranch}
//                     onValueChange={(value) => setFieldValue("authorizedBranch", value)}
//                   >
//                     <SelectTrigger className="w-full mt-1">
//                       <SelectValue placeholder="Select Authorized Branch" />
//                     </SelectTrigger>
//                     <SelectContent>
//                       {branchOptions.map((branch) => (
//                         <SelectItem key={branch} value={branch}>{branch}</SelectItem>
//                       ))}
//                     </SelectContent>
//                   </Select>
//                   {errors.authorizedBranch && <p className="text-red-600">{errors.authorizedBranch}</p>}
//                 </div>

//                 <SubmitButton title="Submit" type="submit" />
//               </form>
//             </DialogDescription>
//           </DialogHeader>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// export default UpdateChannelPage;

// =================================================

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
import ChannelContext from "../../../../context/channelContext";
import InquiryContext from "../../../../context/InquiryContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Initial form values
const initialValues = {
  title: "",
  salesPerson: "",
  authorizedBranch: "",
};

// Yup validation schema
const schema = yup.object().shape({
  title: yup.string().required("Channel Title is Required"),
  salesPerson: yup
    .string()
    .email("Please enter a valid email address")
    .required("Sales Person is Required"),
  authorizedBranch: yup.string().required("Authorized Branch is Required"),
});

function UpdateChannelPage({ channelId, title, salesPerson, authorizedBranch }) {
  const { updateChannel, setWorking } = useContext(ChannelContext);
  const { getSalesPersons } = useContext(InquiryContext);
  const [isOpen, setIsOpen] = useState(false);
  const [salesPersons, setSalesPersons] = useState([]);
  const router = useRouter();

  const {
    values,
    handleSubmit,
    errors,
    resetForm,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: schema,
    enableReinitialize: true,
    onSubmit: (values) => {
      const submissionValues = { ...values };
      const result = updateChannel(channelId, submissionValues);
      if (result) {
        setIsOpen(false);
        setWorking(true);
        router.refresh();
        resetForm();
      }
    },
  });

  const branchOptions = ["Ampara", "Kandy", "Badulla", "Mathara", "Colombo"];

  useEffect(() => {
    setFieldValue("title", title);
    setFieldValue("salesPerson", salesPerson);
    setFieldValue("authorizedBranch", authorizedBranch);
  }, [title, salesPerson, authorizedBranch, setFieldValue]);

  useEffect(() => {
    const fetchSalesPersons = async () => {
      const data = await getSalesPersons();
      if (data) {
        setSalesPersons(data);
      }
    };
    fetchSalesPersons();
  }, [getSalesPersons]);

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
          Update Channel
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Channel</DialogTitle>
            <DialogDescription>
              <form className="flex flex-col gap-6 w-[60%] pt-6" onSubmit={handleSubmit}>
                <InputField title="Channel Title" type="text" name="title" value={values.title} disabled={true} />

                <div>
                  <p><strong>Sales Person:</strong></p>
                  <Select
                    name="salesPerson"
                    value={values.salesPerson}
                    onValueChange={(value) => setFieldValue("salesPerson", value)}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select Sales Person">{values.salesPerson}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {salesPersons.length > 0 ? (
                        salesPersons.map((sp) => (
                          <SelectItem key={sp.id} value={sp.email_addresses[0].email_address}>
                            {sp.first_name} : {sp.email_addresses[0].email_address}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="none" disabled>
                          No Sales Persons Found
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {errors.salesPerson && <p className="text-red-600">{errors.salesPerson}</p>}
                </div>

                <div>
                  <p><strong>Authorized Branch:</strong></p>
                  <Select
                    name="authorizedBranch"
                    value={values.authorizedBranch}
                    onValueChange={(value) => setFieldValue("authorizedBranch", value)}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue placeholder="Select Authorized Branch">{values.authorizedBranch}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {branchOptions.map((branch) => (
                        <SelectItem key={branch} value={branch}>{branch}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.authorizedBranch && <p className="text-red-600">{errors.authorizedBranch}</p>}
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

export default UpdateChannelPage;
