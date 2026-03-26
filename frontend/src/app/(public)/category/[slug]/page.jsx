"use client";
import React, { use } from "react";
import ProductCard from "@/components/common/ProductCard";
import { products } from "@/lib/DummyData";
import { useSearchParams } from "next/navigation";

export default function CategoryPage({ params }) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const filter = searchParams.get("filter");

  const filteredProducts = products.filter((product) => {
    if (slug === "best-seller") return product.isBestSeller;

    return (
      product.category.toLowerCase() === slug.toLowerCase() ||
      product.subCategory.toLowerCase() === slug.toLowerCase()
    );
  });

  return (
    <div className="w-full mx-auto p-6 min-h-screen ">
      <h1 className="text-3xl font-bold mb-8 uppercase text-slate-800 border-b pb-4 tracking-wider">
        {slug} Products
      </h1>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
          {filteredProducts.map((product) => (
            <ProductCard
              className="w-full"
             key={product.id} {...product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <h3 className="text-xl text-slate-500 font-medium">
            No products found in "{slug}" category.
          </h3>
          <p className="text-slate-400 mt-2">
            Try checking other categories like Face or Hair.
          </p>
        </div>
      )}
    </div>
  );
}
