"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { ChevronUp, ChevronDown } from "lucide-react";
import InquiryDetail from "../atoms/InquiryDetail";

const statusColors = {
  Open: "bg-green-500",
  Pending: "bg-yellow-500",
  Resolved: "bg-gray-500",
};

const InquiriesTable = ({
  inquiries,
  userRole,
  handleDeleteInquiry,
  sortBy,
  sortOrder,
  handleSort,
}) => {
  return (
    <div className="overflow-hidden border rounded-lg shadow-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead
              className="w-1/4 cursor-pointer"
              onClick={() => handleSort("name")}
            >
              Name
              {sortBy === "name" &&
                (sortOrder === "asc" ? (
                  <ChevronUp className="inline ml-1" size={16} />
                ) : (
                  <ChevronDown className="inline ml-1" size={16} />
                ))}
            </TableHead>
            <TableHead className="w-1/4">Mobile Number</TableHead>
            <TableHead
              className="w-1/4 cursor-pointer"
              onClick={() => handleSort("degree")}
            >
              Degree
              {sortBy === "degree" &&
                (sortOrder === "asc" ? (
                  <ChevronUp className="inline ml-1" size={16} />
                ) : (
                  <ChevronDown className="inline ml-1" size={16} />
                ))}
            </TableHead>
            <TableHead className="w-1/6">Status</TableHead>
            <TableHead className="w-1/4 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {inquiries.map((inquiry) => (
            <TableRow key={inquiry.id}>
              <TableCell className="font-semibold">{inquiry.name}</TableCell>
              <TableCell>{inquiry.mobileNumber}</TableCell>
              <TableCell>{inquiry.degree}</TableCell>
              <TableCell>
                <Badge
                  className={`text-white px-3 py-1 ${
                    statusColors[inquiry.status]
                  }`}
                >
                  {inquiry.status}
                </Badge>
              </TableCell>
              <TableCell className="flex items-center justify-end gap-2 text-right">
                {/* Show delete button only if the user is an admin */}
                {userRole === "admin" && (
                  <Trash2
                    className="p-1 text-2xl text-red-600 transition-all duration-300 border rounded-md cursor-pointer hover:bg-slate-300"
                    onClick={() => handleDeleteInquiry(inquiry?._id)}
                  />
                )}
                <div className="flex items-center gap-2 text-xs font-bold">
                  <InquiryDetail inquiry={inquiry} />
                  <a href={`/inquiryDetails/${inquiry?._id}`}>Details</a>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InquiriesTable;
