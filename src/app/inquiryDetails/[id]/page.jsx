// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import InquiryContext from "../../../../context/InquiryContext";
// import { useUser } from "@clerk/nextjs";

// function Page() {
//   // Getting User Role
//   const { isSignedIn = false, user } = useUser();
//   const [isClient, setIsClient] = useState(false);
//   const userRole = user?.publicMetadata?.role;

//   const { id } = useParams();
//   const { getInquiryById, addCommentToInquiry } = useContext(InquiryContext);
//   const [inquiry, setInquiry] = useState(null);

//   useEffect(() => {
//     if (id) {
//       getInquiryById(id).then((data) => {
//         setInquiry(data);
//       });
//     }
//   }, [id]);

//   if (!inquiry) return <p>Loading...</p>;

//   return (
//     <div className="max-w-2xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
//       <h1 className="pb-2 mb-4 text-2xl font-semibold text-gray-800 border-b">
//         Inquiry Details
//       </h1>
//       <div className="space-y-3">
//         <p className="text-gray-700">
//           <strong className="text-gray-900">ID:</strong> {inquiry._id}
//         </p>
//         <p className="text-gray-700">
//           <strong className="text-gray-900">Name:</strong> {inquiry.name}
//         </p>
//         <p className="text-gray-700">
//           <strong className="text-gray-900">Mobile Number:</strong>{" "}
//           {inquiry.mobileNumber}
//         </p>
//         <p className="text-gray-700">
//           <strong className="text-gray-900">Degree:</strong> {inquiry.degree}
//         </p>
//         <p className="text-gray-700">
//           <strong className="text-gray-900">Status:</strong>
//           <span
//             className={`ml-2 px-2 py-1 rounded-full text-sm font-medium
//             ${
//               inquiry.status === "Pending"
//                 ? "bg-yellow-200 text-yellow-800"
//                 : inquiry.status === "In Progress"
//                 ? "bg-blue-200 text-blue-800"
//                 : inquiry.status === "Completed"
//                 ? "bg-green-200 text-green-800"
//                 : "bg-red-200 text-red-800"
//             }`}
//           >
//             {inquiry.status}
//           </span>
//         </p>
//       </div>

//       {/* Comments Section */}
//       <div className="mt-6">
//         <h2 className="pb-2 mb-2 text-xl font-semibold text-gray-800 border-b">
//           Comments
//         </h2>
//         {inquiry.comments.length > 0 ? (
//           <ul className="space-y-2">
//             {inquiry.comments.map((comment, index) => (
//               <li key={index} className="p-3 bg-gray-100 rounded-md shadow-sm">
//                 <p className="text-gray-700">{comment}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="italic text-gray-500">No comments available.</p>
//         )}
//       </div>

//       {/* Add Comment Form */}
//       <div className="mt-6">
//         <h2 className="pb-2 mb-2 text-xl font-semibold text-gray-800 border-b">
//           Add a Comment
//         </h2>
//         <Formik
//           initialValues={{ comment: "" }}
//           validationSchema={Yup.object({
//             comment: Yup.string().required("Comment is required"),
//           })}
//           onSubmit={async (values, { setSubmitting, resetForm }) => {
//             await addCommentToInquiry(id, values.comment);
//             setInquiry((prev) => ({
//               ...prev,
//               comments: [...prev.comments, values.comment],
//             }));
//             resetForm();
//             setSubmitting(false);
//           }}
//         >
//           {({ isSubmitting }) => (
//             <Form className="space-y-4">
//               <div>
//                 <Field
//                   type="text"
//                   name="comment"
//                   placeholder="Enter your comment"
//                   className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
//                 />
//                 <ErrorMessage
//                   name="comment"
//                   component="div"
//                   className="mt-1 text-sm text-red-500"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
//               >
//                 {isSubmitting ? "Adding..." : "Add Comment"}
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// }

// export default Page;

// ========================================================

// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import InquiryContext from "../../../../context/InquiryContext";
// import { useUser } from "@clerk/nextjs";

// function Page() {
//   // Getting User Role
//   const { isSignedIn = false, user } = useUser();
//   const [isClient, setIsClient] = useState(false);
//   const userRole = user?.publicMetadata?.role;

//   const { id } = useParams();
//   const { getInquiryById, addCommentToInquiry } = useContext(InquiryContext);
//   const [inquiry, setInquiry] = useState(null);

//   useEffect(() => {
//     if (id) {
//       getInquiryById(id).then((data) => {
//         setInquiry(data);
//       });
//     }
//   }, [id]);

//   if (!inquiry) return <p>Loading...</p>;

//   return (
//     <div className="max-w-2xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
//       <h1 className="pb-2 mb-4 text-2xl font-semibold text-gray-800 border-b">
//         Inquiry Details
//       </h1>
//       <div className="space-y-3">
//         <p className="text-gray-700">
//           <strong className="text-gray-900">ID:</strong> {inquiry._id}
//         </p>
//         <p className="text-gray-700">
//           <strong className="text-gray-900">Name:</strong> {inquiry.name}
//         </p>
//         <p className="text-gray-700">
//           <strong className="text-gray-900">Mobile Number:</strong>{" "}
//           {inquiry.mobileNumber}
//         </p>
//         <p className="text-gray-700">
//           <strong className="text-gray-900">Degree:</strong> {inquiry.degree}
//         </p>
//         <p className="text-gray-700">
//           <strong className="text-gray-900">Status:</strong>
//           <span
//             className={`ml-2 px-2 py-1 rounded-full text-sm font-medium
//             ${
//               inquiry.status === "Pending"
//                 ? "bg-yellow-200 text-yellow-800"
//                 : inquiry.status === "In Progress"
//                 ? "bg-blue-200 text-blue-800"
//                 : inquiry.status === "Completed"
//                 ? "bg-green-200 text-green-800"
//                 : "bg-red-200 text-red-800"
//             }`}
//           >
//             {inquiry.status}
//           </span>
//         </p>
//       </div>

//       {/* Comments Section */}
//       <div className="mt-6">
//         <h2 className="pb-2 mb-2 text-xl font-semibold text-gray-800 border-b">
//           Comments
//         </h2>
//         {inquiry.comments.length > 0 ? (
//           <ul className="space-y-2">
//             {inquiry.comments.map((comment, index) => (
//               <li key={index} className="p-3 bg-gray-100 rounded-md shadow-sm">
//                 <p className="text-gray-700">{comment}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="italic text-gray-500">No comments available.</p>
//         )}
//       </div>

//       {/* Conditionally render Add Comment Form for non-channelOwner */}
//       {userRole !== "channelOwner" && (
//         <div className="mt-6">
//           <h2 className="pb-2 mb-2 text-xl font-semibold text-gray-800 border-b">
//             Add a Comment
//           </h2>
//           <Formik
//             initialValues={{ comment: "" }}
//             validationSchema={Yup.object({
//               comment: Yup.string().required("Comment is required"),
//             })}
//             onSubmit={async (values, { setSubmitting, resetForm }) => {
//               await addCommentToInquiry(id, values.comment);
//               setInquiry((prev) => ({
//                 ...prev,
//                 comments: [...prev.comments, values.comment],
//               }));
//               resetForm();
//               setSubmitting(false);
//             }}
//           >
//             {({ isSubmitting }) => (
//               <Form className="space-y-4">
//                 <div>
//                   <Field
//                     type="text"
//                     name="comment"
//                     placeholder="Enter your comment"
//                     className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
//                   />
//                   <ErrorMessage
//                     name="comment"
//                     component="div"
//                     className="mt-1 text-sm text-red-500"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
//                 >
//                   {isSubmitting ? "Adding..." : "Add Comment"}
//                 </button>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Page;

// ==========================================================

// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import InquiryContext from "../../../../context/InquiryContext";
// import { useUser } from "@clerk/nextjs";

// function Page() {
//   // Getting User Role
//   const { isSignedIn = false, user } = useUser();
//   const [isClient, setIsClient] = useState(false);
//   const userRole = user?.publicMetadata?.role;

//   const { id } = useParams();
//   const { getInquiryById, addCommentToInquiry, getCallAttemptsByInquiryId } = useContext(InquiryContext);
//   const [inquiry, setInquiry] = useState(null);

//   useEffect(() => {
//     if (id) {
//       getInquiryById(id).then((data) => {
//         setInquiry(data);
//       });
//     }
//   }, [id]);

//   if (!inquiry) return <p>Loading...</p>;

//   return (
//     <div className="max-w-2xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
//       <h1 className="pb-2 mb-4 text-2xl font-semibold text-gray-800 border-b">
//         Inquiry Details
//       </h1>
//       <div className="space-y-3">
//         <p className="text-gray-700">
//           <strong className="text-gray-900">ID:</strong> {inquiry._id}
//         </p>
//         <p className="text-gray-700">
//           <strong className="text-gray-900">Name:</strong> {inquiry.name}
//         </p>
//         <p className="text-gray-700">
//           <strong className="text-gray-900">Mobile Number:</strong>{" "}
//           {inquiry.mobileNumber}
//         </p>
//         <p className="text-gray-700">
//           <strong className="text-gray-900">Degree:</strong> {inquiry.degree}
//         </p>
//         <p className="text-gray-700">
//           <strong className="text-gray-900">Status:</strong>
//           <span
//             className={`ml-2 px-2 py-1 rounded-full text-sm font-medium
//             ${
//               inquiry.status === "Pending"
//                 ? "bg-yellow-200 text-yellow-800"
//                 : inquiry.status === "In Progress"
//                 ? "bg-blue-200 text-blue-800"
//                 : inquiry.status === "Completed"
//                 ? "bg-green-200 text-green-800"
//                 : "bg-red-200 text-red-800"
//             }`}
//           >
//             {inquiry.status}
//           </span>
//         </p>
//       </div>

//       {/* Comments Section */}
//       <div className="mt-6">
//         <h2 className="pb-2 mb-2 text-xl font-semibold text-gray-800 border-b">
//           Comments
//         </h2>
//         {inquiry.comments.length > 0 ? (
//           <ul className="space-y-2">
//             {inquiry.comments.map((comment, index) => (
//               <li key={index} className="p-3 bg-gray-100 rounded-md shadow-sm">
//                 <p className="text-gray-700">{comment}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="italic text-gray-500">No comments available.</p>
//         )}
//       </div>

//       {/* Conditionally render Add Comment Form for non-channelOwner */}
//       {userRole !== "channelOwner" && (
//         <div className="mt-6">
//           <h2 className="pb-2 mb-2 text-xl font-semibold text-gray-800 border-b">
//             Add a Comment
//           </h2>
//           <Formik
//             initialValues={{ comment: "" }}
//             validationSchema={Yup.object({
//               comment: Yup.string().required("Comment is required"),
//             })}
//             onSubmit={async (values, { setSubmitting, resetForm }) => {
//               await addCommentToInquiry(id, values.comment);
//               setInquiry((prev) => ({
//                 ...prev,
//                 comments: [...prev.comments, values.comment],
//               }));
//               resetForm();
//               setSubmitting(false);
//             }}
//           >
//             {({ isSubmitting }) => (
//               <Form className="space-y-4">
//                 <div>
//                   <Field
//                     type="text"
//                     name="comment"
//                     placeholder="Enter your comment"
//                     className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
//                   />
//                   <ErrorMessage
//                     name="comment"
//                     component="div"
//                     className="mt-1 text-sm text-red-500"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
//                 >
//                   {isSubmitting ? "Adding..." : "Add Comment"}
//                 </button>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       )}

//       {/* Button to Add Call Attempt */}
//       <div className="flex items-center mt-6 space-x-4">
//         <button
//           onClick={() => {}}
//           className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
//         >
//           <span className="mr-2">+</span> Add Call Attempt
//         </button>
//       </div>

//       {/* Call Attempt Table */}
//       <div className="mt-6">
//         <h2 className="pb-2 mb-2 text-xl font-semibold text-gray-800 border-b">
//           Recent Call Attempts
//         </h2>
//         {/* Call attempts table */}
//         <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//           <thead>
//             <tr>
//               <th className="px-4 py-2 text-left">Attempt</th>
//               <th className="px-4 py-2 text-left">Date</th>
//               <th className="px-4 py-2 text-left">Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {/* Add static rows for demonstration */}
//             <tr>
//               <td className="px-4 py-2">1</td>
//               <td className="px-4 py-2">2025-03-21</td>
//               <td className="px-4 py-2">10:30 AM</td>
//             </tr>
//             <tr>
//               <td className="px-4 py-2">2</td>
//               <td className="px-4 py-2">2025-03-20</td>
//               <td className="px-4 py-2">2:15 PM</td>
//             </tr>
//           </tbody>
//         </table>

//         {/* If no call attempts */}
//         <p className="mt-4 italic text-gray-500">No Call Attempts Yet</p>
//       </div>
//     </div>
//   );
// }

// export default Page;

// ====================================================

// "use client";

// import React, { useContext, useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import InquiryContext from "../../../../context/InquiryContext";
// import { useUser } from "@clerk/nextjs";

// function Page() {
//   // Getting User Role
//   const { isSignedIn = false, user } = useUser();
//   const [isClient, setIsClient] = useState(false);
//   const userRole = user?.publicMetadata?.role;

//   const { id } = useParams();
//   const { getInquiryById, addCommentToInquiry, getCallAttemptsByInquiryId, addCallAttempt } =
//     useContext(InquiryContext);
//   const [inquiry, setInquiry] = useState(null);
//   const [callAttempts, setCallAttempts] = useState([]); // New state for call attempts

//   useEffect(() => {
//     if (id) {
//       getInquiryById(id).then((data) => {
//         setInquiry(data);
//       });

//       // Fetch call attempts for the inquiry when the ID is available
//       getCallAttemptsByInquiryId(id).then((data) => {
//         setCallAttempts(data); // Set the fetched call attempts
//       });
//     }
//   }, [id]);

//   console.log("INQUIRY : ", inquiry);
//   console.log("CALL ATTEMPTS : ", callAttempts);

//   if (!inquiry) return <p>Loading...</p>;

//   return (
//     <div className="max-w-2xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
//       <h1 className="pb-2 mb-4 text-2xl font-semibold text-gray-800 border-b">
//         Inquiry Details
//       </h1>
//       <div className="space-y-3">
//         <p className="text-gray-700">
//           <strong className="text-gray-900">ID:</strong> {inquiry._id}
//         </p>
//         <p className="text-gray-700">
//           <strong className="text-gray-900">Name:</strong> {inquiry.name}
//         </p>
//         <p className="text-gray-700">
//           <strong className="text-gray-900">Mobile Number:</strong>{" "}
//           {inquiry.mobileNumber}
//         </p>
//         <p className="text-gray-700">
//           <strong className="text-gray-900">Degree:</strong> {inquiry.degree}
//         </p>
//         <p className="text-gray-700">
//           <strong className="text-gray-900">Status:</strong>
//           <span
//             className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
//               inquiry.status === "Pending"
//                 ? "bg-yellow-200 text-yellow-800"
//                 : inquiry.status === "In Progress"
//                 ? "bg-blue-200 text-blue-800"
//                 : inquiry.status === "Completed"
//                 ? "bg-green-200 text-green-800"
//                 : "bg-red-200 text-red-800"
//             }`}
//           >
//             {inquiry.status}
//           </span>
//         </p>
//       </div>

//       {/* Comments Section */}
//       <div className="mt-6">
//         <h2 className="pb-2 mb-2 text-xl font-semibold text-gray-800 border-b">
//           Comments
//         </h2>
//         {inquiry.comments.length > 0 ? (
//           <ul className="space-y-2">
//             {inquiry.comments.map((comment, index) => (
//               <li key={index} className="p-3 bg-gray-100 rounded-md shadow-sm">
//                 <p className="text-gray-700">{comment}</p>
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <p className="italic text-gray-500">No comments available.</p>
//         )}
//       </div>

//       {/* Conditionally render Add Comment Form for non-channelOwner */}
//       {userRole !== "channelOwner" && (
//         <div className="mt-6">
//           <h2 className="pb-2 mb-2 text-xl font-semibold text-gray-800 border-b">
//             Add a Comment
//           </h2>
//           <Formik
//             initialValues={{ comment: "" }}
//             validationSchema={Yup.object({
//               comment: Yup.string().required("Comment is required"),
//             })}
//             onSubmit={async (values, { setSubmitting, resetForm }) => {
//               await addCommentToInquiry(id, values.comment);
//               setInquiry((prev) => ({
//                 ...prev,
//                 comments: [...prev.comments, values.comment],
//               }));
//               resetForm();
//               setSubmitting(false);
//             }}
//           >
//             {({ isSubmitting }) => (
//               <Form className="space-y-4">
//                 <div>
//                   <Field
//                     type="text"
//                     name="comment"
//                     placeholder="Enter your comment"
//                     className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
//                   />
//                   <ErrorMessage
//                     name="comment"
//                     component="div"
//                     className="mt-1 text-sm text-red-500"
//                   />
//                 </div>
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
//                 >
//                   {isSubmitting ? "Adding..." : "Add Comment"}
//                 </button>
//               </Form>
//             )}
//           </Formik>
//         </div>
//       )}

//       {/* Button to Add Call Attempt */}
//       <div className="flex items-center mt-6 space-x-4">
//         <button
//           onClick={() => {}}
//           className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
//         >
//           <span className="mr-2">+</span> Add Call Attempt
//         </button>
//       </div>

//       {/* Call Attempt Table */}
//       <div className="mt-6">
//         <h2 className="pb-2 mb-2 text-xl font-semibold text-gray-800 border-b">
//           Recent Call Attempts
//         </h2>
//         {/* Call attempts table */}
//         {callAttempts.length > 0 ? (
//           <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 text-left">Attempt</th>
//                 <th className="px-4 py-2 text-left">Date</th>
//                 <th className="px-4 py-2 text-left">Time</th>
//               </tr>
//             </thead>
//             <tbody>
//               {callAttempts.map((attempt, index) => (
//                 <tr key={index}>
//                   <td className="px-4 py-2">{attempt.count}</td>
//                   <td className="px-4 py-2">
//                     {new Date(attempt.createdAt).toISOString().split("T")[0]}
//                   </td>
//                   <td className="px-4 py-2">
//                     {new Date(attempt.createdAt).toLocaleTimeString([], {
//                       hour: "2-digit",
//                       minute: "2-digit",
//                     })}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p className="mt-4 italic text-gray-500">No Call Attempts Yet</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default Page;

// ==============================================================

"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import InquiryContext from "../../../../context/InquiryContext";
import { useUser } from "@clerk/nextjs";

function Page() {
  // Getting User Role
  const { isSignedIn = false, user } = useUser();
  const [isClient, setIsClient] = useState(false);
  const userRole = user?.publicMetadata?.role;

  const { id } = useParams();
  const { getInquiryById, addCommentToInquiry, getCallAttemptsByInquiryId, addCallAttempt } =
    useContext(InquiryContext);
  const [inquiry, setInquiry] = useState(null);
  const [callAttempts, setCallAttempts] = useState([]); // New state for call attempts

  useEffect(() => {
    if (id) {
      getInquiryById(id).then((data) => {
        setInquiry(data);
      });

      // Fetch call attempts for the inquiry when the ID is available
      getCallAttemptsByInquiryId(id).then((data) => {
        setCallAttempts(data); // Set the fetched call attempts
      });
    }
  }, [id]);

  console.log("INQUIRY : ", inquiry);
  console.log("CALL ATTEMPTS : ", callAttempts);

  if (!inquiry) return <p>Loading...</p>;

  const handleAddCallAttempt = async () => {
    // Get the max count from the existing call attempts, or start from 0 if no attempts
    const maxCount = callAttempts.length > 0 ? Math.max(...callAttempts.map(attempt => attempt.count)) : 0;
    const newCount = maxCount + 1;

    // Add the new call attempt with the incremented count
    await addCallAttempt(id, newCount); // Add new attempt with the incremented count

    // Update the callAttempts state with the new call attempt
    const newCallAttempt = {
      inquiryId: id,
      count: newCount,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setCallAttempts((prev) => [...prev, newCallAttempt]); // Append new call attempt
  };

  return (
    <div className="max-w-2xl p-6 mx-auto mt-10 bg-white rounded-lg shadow-lg">
      <h1 className="pb-2 mb-4 text-2xl font-semibold text-gray-800 border-b">
        Inquiry Details
      </h1>
      <div className="space-y-3">
        <p className="text-gray-700">
          <strong className="text-gray-900">ID:</strong> {inquiry._id}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-900">Name:</strong> {inquiry.name}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-900">Mobile Number:</strong>{" "}
          {inquiry.mobileNumber}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-900">Degree:</strong> {inquiry.degree}
        </p>
        <p className="text-gray-700">
          <strong className="text-gray-900">Status:</strong>
          <span
            className={`ml-2 px-2 py-1 rounded-full text-sm font-medium ${
              inquiry.status === "Pending"
                ? "bg-yellow-200 text-yellow-800"
                : inquiry.status === "In Progress"
                ? "bg-blue-200 text-blue-800"
                : inquiry.status === "Completed"
                ? "bg-green-200 text-green-800"
                : "bg-red-200 text-red-800"
            }`}
          >
            {inquiry.status}
          </span>
        </p>
      </div>

      {/* Comments Section */}
      <div className="mt-6">
        <h2 className="pb-2 mb-2 text-xl font-semibold text-gray-800 border-b">
          Comments
        </h2>
        {inquiry.comments.length > 0 ? (
          <ul className="space-y-2">
            {inquiry.comments.map((comment, index) => (
              <li key={index} className="p-3 bg-gray-100 rounded-md shadow-sm">
                <p className="text-gray-700">{comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="italic text-gray-500">No comments available.</p>
        )}
      </div>

      {/* Conditionally render Add Comment Form for non-channelOwner */}
      {userRole !== "channelOwner" && (
        <div className="mt-6">
          <h2 className="pb-2 mb-2 text-xl font-semibold text-gray-800 border-b">
            Add a Comment
          </h2>
          <Formik
            initialValues={{ comment: "" }}
            validationSchema={Yup.object({
              comment: Yup.string().required("Comment is required"),
            })}
            onSubmit={async (values, { setSubmitting, resetForm }) => {
              await addCommentToInquiry(id, values.comment);
              setInquiry((prev) => ({
                ...prev,
                comments: [...prev.comments, values.comment],
              }));
              resetForm();
              setSubmitting(false);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <Field
                    type="text"
                    name="comment"
                    placeholder="Enter your comment"
                    className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-300"
                  />
                  <ErrorMessage
                    name="comment"
                    component="div"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
                >
                  {isSubmitting ? "Adding..." : "Add Comment"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      )}

      {/* Button to Add Call Attempt */}
      <div className="flex items-center mt-6 space-x-4">
        <button
          onClick={handleAddCallAttempt}
          className="px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600"
        >
          <span className="mr-2">+</span> Add Call Attempt
        </button>
      </div>

      {/* Call Attempt Table */}
      <div className="mt-6">
        <h2 className="pb-2 mb-2 text-xl font-semibold text-gray-800 border-b">
          Recent Call Attempts
        </h2>
        {/* Call attempts table */}
        {callAttempts.length > 0 ? (
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Attempt</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Time</th>
              </tr>
            </thead>
            <tbody>
              {callAttempts.map((attempt, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{attempt.count}</td>
                  <td className="px-4 py-2">
                    {new Date(attempt.createdAt).toISOString().split("T")[0]}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(attempt.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4 italic text-gray-500">No Call Attempts Yet</p>
        )}
      </div>
    </div>
  );
}

export default Page;
