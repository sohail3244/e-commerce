"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "../ui/Button";
import ProductCard from "./ProductCard";

export default function ProductSection({
  title,
  description,
  products = [],
  category,
  subCategory,
}) {

  const scrollRef = useRef();

  // Filter logic
 const filteredProducts = products.filter((p) => {
  if (subCategory) return p.subCategory === subCategory;
  if (category) return p.category === category;
  return true;
});

if (!filteredProducts.length) return null;

  // Scroll functions
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  return (
    <section className="w-full px-4 md:px-8 lg:px-12 py-10">

      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">
            {title}
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            {description}
          </p>
        </div>

        <Button
          text="VIEW ALL"
          variant="primary"
          size="sm"
          className="px-4 py-2"
        />
      </div>

      {/* Slider Container */}
      <div className="relative">

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronRight size={20} />
        </button>

        {/* Products Scroll */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-5 md:gap-6 overflow-x-auto scroll-smooth scrollbar-hide px-2 md:px-0 snap-x snap-mandatory"
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className=" sm:min-w-[48%] md:min-w-70 lg:min-w-75 snap-start first:ml-1 last:mr-1"
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

      </div>

    </section>
  );
}