"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  TableShell,
  TableHead,
  TableBody,
  TablePagination,
} from "@/components/table/core";

// 👇 Dummy Data (replace with API later)
const productsData = [
  {
    id: 1,
    product: "iPhone 14",
    category: "Electronics",
    price: 79999,
    stock: 12,
    status: "Active",
  },
  {
    id: 2,
    product: "Nike Shoes",
    category: "Footwear",
    price: 4999,
    stock: 0,
    status: "Out of Stock",
  },
  {
    id: 3,
    product: "Office Chair",
    category: "Furniture",
    price: 8999,
    stock: 5,
    status: "Active",
  },
];

export default function ProductsTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const itemsPerPage = 10;

  // ✅ Columns
  const columns = [
    { label: "Product", accessor: "product" },
    { label: "Category", accessor: "category" },
    {
      label: "Price",
      accessor: "price",
      render: (value) => `₹${value}`,
    },
    {
      label: "Stock",
      accessor: "stock",
      render: (value) => (
        <span
          className={`font-medium ${
            value === 0 ? "text-red-500" : "text-slate-700"
          }`}
        >
          {value === 0 ? "Out of Stock" : value}
        </span>
      ),
    },
    {
      label: "Status",
      accessor: "status",
      render: (value) => (
        <span
          className={`px-2 py-1 text-xs rounded-full font-medium ${
            value === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  // ✅ FILTER LOGIC
  const filteredData = useMemo(() => {
    return productsData.filter((item) => {
      const matchesSearch =
        item.product?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "All" || item.status === status;

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
          placeholder: "Search products...",
          onChange: (e) => setSearch(e.target.value),
        }}
        filterProps={{
          value: status,
          options: [
            { label: "All", value: "All" },
            { label: "Active", value: "Active" },
            { label: "Out of Stock", value: "Out of Stock" },
          ],
          onChange: setStatus,
        }}
        dateProps={{}} // not needed
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
            label: "Edit",
            onClick: (row) => console.log("Edit", row),
          },
          {
            label: "Delete",
            onClick: (row) => console.log("Delete", row),
          },
        ]}
      />
    </TableShell>
  );
}
