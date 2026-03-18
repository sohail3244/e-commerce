"use client";

import React from "react";
import { Star, BadgeCheck } from "lucide-react";
import Button from "../ui/Button";
import Link from "next/link";

export default function ProductCard({
  id,
  image,
  title,
  description,
  size,
  rating,
  reviews,
  price,
  badge,
}) {
  return (
    <Link href={`/product/${id}`}>
      <div className="relative bg-white border border-slate-200 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col w-75">
        {badge && (
          /* Badge color updated to match primary theme or a complementary deep shade */
          <div className="absolute top-0 left-0 bg-[#2A4150] text-white text-[10px] font-bold px-2 py-1 rounded-br-lg z-10 uppercase">
            {badge}
          </div>
        )}

        <div className="w-full">
          <img src={image} alt={title} className="w-full h-64 object-cover" />
        </div>

        <div className="px-4 pb-2 flex flex-col items-center text-center gap-2 flex-1 bg-[#e0e0e0]">
          <h3 className="text-[17px] leading-tight font-medium text-slate-800">
            {title}
          </h3>

          {/* Organic green color remains for natural feel, but slate works for text context */}
          <p className="text-[15px] font-medium text-[#689F38]">
            {description}
          </p>

          <span className="text-[16px] text-slate-700 font-medium mt-1">
            {size}
          </span>

          <div className="flex items-center justify-center gap-1 text-[14px] font-semibold text-slate-700 mt-1">
            <Star size={14} className="text-[#FFC107] fill-[#FFC107]" />
            <span>{rating}</span>
            {/* Badge color updated to match theme context */}
            <BadgeCheck size={16} className="text-[#2A4150] ml-1" />
            <span className="text-[#2A4150]">{reviews} Reviews</span>
          </div>

          <div className="text-2xl font-bold text-slate-900 mt-1">₹{price}</div>
        </div>

        <div className="px-2 pb-2 bg-[#e0e0e0]">
          {/* Button will now pick up the primary variant styles from your Button component */}
          <Button
            text="ADD TO CART"
            className="w-full font-bold py-3 rounded-md text-lg tracking-wide"
            onClick={(e) => {
              e.preventDefault();
              console.log("Add to cart", id);
            }}
          />
        </div>
      </div>
    </Link>
  );
}
