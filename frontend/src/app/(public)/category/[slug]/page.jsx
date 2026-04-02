"use client";

import React, { use } from "react";
import ProductCard from "@/components/common/ProductCard";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/lib/queries/useProducts";

export default function CategoryPage({ params }) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const { data: products = [], isLoading } = useProducts();

  const filteredProducts = products.filter((product) => {
    const normalizedSlug = slug.replace(/-/g, " ").toLowerCase();

    if (slug === "best-seller") return product.isBestSeller;

    return product.category?.name?.toLowerCase() === normalizedSlug;
  });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <div className="w-10 h-10 border-4 border-[#2A4150] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-500 font-medium animate-pulse">
          Loading amazing products...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full mx-auto px-4 py-6 md:px-8 lg:px-10 min-h-screen bg-[#fcfcfc]">
      <div className="mb-8 border-b border-slate-100 pb-5">
        <h1 className="text-2xl md:text-3xl font-black uppercase text-[#2A4150] tracking-tight">
          {slug.replace(/-/g, " ")}{" "}
          <span className="text-slate-400 font-light">Collection</span>
        </h1>
        {/* <p className="text-sm text-slate-500 mt-1">
          Showing {filteredProducts.length} items
        </p> */}
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              className="w-full"
              id={product.id}
              image={
                product.images?.[0]?.url
                  ? `http://localhost:8000${product.images[0].url}`
                  : "/placeholder-product.png"
              }
              title={product.name}
              description={product.description}
              price={product.price}
              rating={4.5}
              reviews={10}
              size="Standard"
              badge={product.status === "Active" ? "New" : ""}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="bg-slate-50 p-6 rounded-full mb-4">
            <svg
              className="w-12 h-12 text-slate-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="box-open"
              />
            </svg>
          </div>
          <h3 className="text-xl text-slate-800 font-bold">
            No products found
          </h3>
          <p className="text-slate-500 max-w-xs mt-2">
            We couldn't find any products in the "{slug}" category right now.
          </p>
        </div>
      )}
    </div>
  );
}
