"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  TableShell,
  TableHead,
  TableBody,
  TablePagination,
} from "./core";

// 👇 Dummy Data (replace with API later)
const categoriesData = [
  {
    id: 1,
    image: "https://via.placeholder.com/40",
    name: "Electronics",
    sku: "CAT-001",
    description: "Devices and gadgets",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/40",
    name: "Clothing",
    sku: "CAT-002",
    description: "Men & Women apparel",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/40",
    name: "Furniture",
    sku: "CAT-003",
    description: "Home & office furniture",
  },
];

export default function CategoriesTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 10;

  // ✅ Columns
  const columns = [
    {
      label: "Image",
      accessor: "image",
      render: (value) => (
        <img
          src={value}
          alt="category"
          className="w-10 h-10 rounded-lg object-cover border border-slate-200"
        />
      ),
    },
    { label: "Name", accessor: "name" },
    { label: "SKU", accessor: "sku" },
    {
      label: "Description",
      accessor: "description",
      render: (value) => (
        <span className="text-slate-500 text-sm line-clamp-1">
          {value}
        </span>
      ),
    },
  ];

  // ✅ FILTER (Search only)
  const filteredData = useMemo(() => {
    return categoriesData.filter((item) =>
      item.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  // ✅ AUTO PAGE RESET
  useEffect(() => {
    setPage(1);
  }, [search]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, page]);

  // ✅ RESET
  const handleReset = () => {
    setSearch("");
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
        showSearch={false}
        showFilter={false}
        showDate={false}
        showReset={false}
      
      />

      {/* 📊 Body */}
      <TableBody
        data={paginatedData}
        columns={columns}
        actions={[
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