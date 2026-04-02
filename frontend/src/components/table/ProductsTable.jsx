"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  TableShell,
  TableHead,
  TableBody,
  TablePagination,
} from "@/components/table/core";
import { useDeleteProduct } from "@/lib/mutations/useProducts";

export default function ProductsTable({
  data = [],
  isLoading,
  onEdit,
  onView,
}) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const itemsPerPage = 10;
  const { mutate: deleteProduct } = useDeleteProduct();

  const productsData = useMemo(() => {
    return data.map((item) => ({
      id: item.id,
      product: item.name,
      category: item.category?.name || "N/A",
      price: item.price,
      stock: item.stock,
      status: item.stock === 0 ? "Out of Stock" : item.status,
    }));
  }, [data]);

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

  const filteredData = useMemo(() => {
    return productsData.filter((item) => {
      const matchesSearch =
        item.product?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase());

      const matchesStatus = status === "All" || item.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [search, status, productsData]);

  useEffect(() => {
    setPage(1);
  }, [search, status, productsData]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const paginatedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, page]);

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

      <TableBody
        data={paginatedData}
        columns={columns}
        actions={[
          {
            label: "View",
            onClick: (row) => onView?.(row),
          },
          {
            label: "Edit",
            onClick: (row) => onEdit?.(row),
          },
          {
            label: "Delete",
            onClick: (row) => {
              if (confirm("Delete this product?")) {
                deleteProduct(row.id);
              }
            },
          },
        ]}
      />
    </TableShell>
  );
}
