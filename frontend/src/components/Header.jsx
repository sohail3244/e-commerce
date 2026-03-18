"use client";

import Link from "next/link";
import { ShoppingCart, User, Search, MapPin } from "lucide-react";
import SearchField from "./ui/SearchField";
import LoginModal from "./modals/LoginModal";
import { useState } from "react";
import Button from "./ui/Button";

export default function Header() {
  const [openLogin, setOpenLogin] = useState(false);

  const categories = [
    "HOME", "FACE", "HAIR", "MAKEUP", "BODY",
    "BABY", "COMBOS", "NEW LAUNCHES", "INGREDIENT", "BLOG",
  ];

  return (
    <>
      <header className="w-full sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-[#e0e0e0]">
        
        {/* Main Header Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link href="/" className="text-2xl md:text-3xl font-black tracking-tighter shrink-0">
              <span className="text-[#2A4150]">Azz</span>
              <span className="text-[#9ca0a3]">unique</span>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:block flex-1 max-w-xl mx-8">
              <SearchField showButton={true} />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 md:gap-6">
              <div className="hidden xl:flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer hover:text-[#2A4150] transition-colors group">
                <MapPin size={20} className="group-hover:animate-bounce" />
                <span>Store Locator</span>
              </div>

              <Link href="/cart" className="flex items-center gap-2 text-slate-700 hover:text-[#2A4150] relative">
                <div className="relative">
                  <ShoppingCart size={24} />
                  <span className="absolute -top-2 -right-2 bg-[#2A4150] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    0
                  </span>
                </div>
                <span className="hidden sm:inline font-medium text-sm">Cart</span>
              </Link>

              {/* Mobile User Icon / Desktop Button */}
              <button onClick={() => setOpenLogin(true)} className="md:hidden text-slate-700">
                <User size={24} />
              </button>
              
              <Button
                text="Login"
                onClick={() => setOpenLogin(true)}
                className="hidden md:block px-5 py-2"
              />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <SearchField showButton={false} />
        </div>

        {/* --- NAVIGATION: Horizontal Scroll for Mobile, Justified for Desktop --- */}
        <nav className="border-t border-slate-50 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4">
            {/* scrollbar-hide: custom class (optional) 
                flex-nowrap + overflow-x-auto: Enables swiping on mobile
            */}
            <ul className="flex items-center gap-6 md:justify-between py-3 overflow-x-auto no-scrollbar scroll-smooth whitespace-nowrap">
              {categories.map((item) => {
                const slug = item.toLowerCase().replace(" ", "-");
                return (
                  <li key={item} className="shrink-0">
                    <Link
                      href={item === "HOME" ? "/" : `/category/${slug}`}
                      className="text-[11px] md:text-[12px] font-bold text-slate-600 hover:text-[#2A4150] tracking-widest transition-colors relative group"
                    >
                      {item}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#2A4150] transition-all group-hover:w-full"></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>

      <LoginModal isOpen={openLogin} onClose={() => setOpenLogin(false)} />
      
      {/* Scrollbar hide CSS (Add to your globals.css or use inline) */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}