"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

export default function HeroSlider({
  images = [],
  autoSlide = true,
  interval = 4000,
}) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!autoSlide || images.length <= 1) return;

    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(slider);
  }, [images, autoSlide, interval]);

  const prevSlide = () => {
    setCurrent(current === 0 ? images.length - 1 : current - 1);
  };

  const nextSlide = () => {
    setCurrent((current + 1) % images.length);
  };

  if (!images.length) return null;

  return (
    <div className="relative w-full h-50 sm:h-87.5 md:h-112.5 lg:h-137.5 overflow-hidden bg-slate-100">
      {/* Images */}
      {images.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Link
            href={typeof item.link === "string" ? item.link : "/"}
            className="block w-full h-full"
          >
            <img
              src={item.src}
              alt={`Slide ${index}`}
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      ))}

      {images.length > 1 && (
        <div className="absolute inset-0 z-20 hidden md:flex items-center justify-between px-4">
          <button
            onClick={prevSlide}
            className="bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-md border border-[#e0e0e0]"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-slate-800" />
          </button>

          <button
            onClick={nextSlide}
            className="bg-white/90 hover:bg-white p-2 md:p-3 rounded-full shadow-md border border-[#e0e0e0]"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-slate-800" />
          </button>
        </div>
      )}

      {/* Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-6 w-full flex justify-center gap-3 z-30">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 rounded-full ${
                current === i ? "w-8 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
