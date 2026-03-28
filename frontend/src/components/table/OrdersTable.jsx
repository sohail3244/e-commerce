"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  TableShell,
  TableHead,
  TableBody,
  TablePagination,
} from "./core";

// 👇 Dummy Data
const ordersData = [
  {
    id: 1,
    productImage: "https://via.placeholder.com/40",
    productName: "iPhone 14",
    order: "ORD-1001",
    customer: "Rahul Sharma",
    address: "Delhi, India",
    total: 79999,
    status: "Delivered",
    payment: "Paid",
    transactionId: "TXN123456",
    bankRef: "BANK7890",
  },
  {
    id: 2,
    productImage: "https://via.placeholder.com/40",
    productName: "Nike Shoes",
    order: "ORD-1002",
    customer: "Amit Verma",
    address: "Mumbai, India",
    total: 4999,
    status: "Pending",
    payment: "Unpaid",
    transactionId: "TXN654321",
    bankRef: "BANK4567",
  },
];

export default function OrdersTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const itemsPerPage = 10;

  // ✅ Columns
  const columns = [
    {
      label: "Product Image",
      accessor: "productImage",
      render: (value) => (
        <img
          src={value}
          alt="product"
          className="w-10 h-10 rounded-lg object-cover border"
        />
      ),
    },
    { label: "Product Name", accessor: "productName" },
    { label: "Order", accessor: "order" },
    { label: "Customer", accessor: "customer" },
    {
      label: "Shipping Address",
      accessor: "address",
      render: (value) => (
        <span className="text-slate-500 text-sm line-clamp-1">
          {value}
        </span>
      ),
    },
    {
      label: "Total",
      accessor: "total",
      render: (value) => `₹${value}`,
    },
    {
      label: "Status",
      accessor: "status",
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            value === "Delivered"
              ? "bg-green-100 text-green-600"
              : value === "Pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      label: "Payment",
      accessor: "payment",
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            value === "Paid"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {value}
        </span>
      ),
    },
    { label: "Transaction ID", accessor: "transactionId" },
    { label: "Bank Reference ID", accessor: "bankRef" },
  ];

  // ✅ FILTER LOGIC
  const filteredData = useMemo(() => {
    return ordersData.filter((item) => {
      const matchesSearch =
        item.productName?.toLowerCase().includes(search.toLowerCase()) ||
        item.order?.toLowerCase().includes(search.toLowerCase()) ||
        item.customer?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All" || item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status]);

  // ✅ AUTO PAGE RESET
  useEffect(() => {
    setPage(1);
  }, [search, status]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, page]);

  // ✅ RESET
  const handleReset = () => {
    setSearch("");
    setStatus("All");
  };

  return (
    <TableShell
      pagination={
        <TablePagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      }
    >
      {/* 🔍 Head */}
      <TableHead
        columns={columns}
        onReset={handleReset}
        searchProps={{
          value: search,
          placeholder: "Search orders...",
          onChange: (e) => setSearch(e.target.value),
        }}
        filterProps={{
          value: status,
          options: [
            { label: "All", value: "All" },
            { label: "Delivered", value: "Delivered" },
            { label: "Pending", value: "Pending" },
            { label: "Cancelled", value: "Cancelled" },
          ],
          onChange: setStatus,
        }}
        dateProps={{}}
      />

      {/* 📊 Body */}
      <TableBody
        data={paginatedData}
        columns={columns}
        actions={[
          {
            label: "View",
            onClick: (row) => console.log("View", row),
          },
          {
            label: "Invoice",
            onClick: (row) => console.log("Invoice", row),
          },
          {
            label: "Cancel",
            onClick: (row) => console.log("Cancel", row),
          },
        ]}
      />
    </TableShell>
  );
}