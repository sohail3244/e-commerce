"use client";

import React, { useState, useRef, useEffect } from "react";
import { User, ChevronDown, Menu, LogOut, Settings, UserCircle } from "lucide-react";

export default function DashboardNavbar({ toggleSidebar }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    // 1. Bahar click karne par band karne ka logic
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // 2. Scroll karne par band karne ka logic
    const handleScroll = () => {
      if (isDropdownOpen) {
        setIsDropdownOpen(false);
      }
    };

    // Event listeners add karein
    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true); // 'true' capture phase ke liye taaki inner scroll bhi detect ho

    return () => {
      // Clean up listeners
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
    };
  }, [isDropdownOpen]); // isDropdownOpen dependency zaroori hai handleScroll logic ke liye

  return (
    <header className="h-16 bg-white border-b border-[#e0e0e0] flex items-center justify-between md:justify-end px-6 sticky top-0 z-30">
      {/* Mobile Menu Trigger */}
      <button 
        onClick={toggleSidebar} 
        className="md:hidden p-2 text-[#2A4150] hover:bg-slate-100 rounded-lg"
      >
        <Menu size={24} />
      </button>

      <div className="flex items-center gap-5 relative" ref={dropdownRef}>
        {/* Profile Button */}
        <button 
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="flex-col items-end hidden sm:flex text-right">
            <span className="text-sm font-bold text-[#2A4150]">Alex Admin</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">
              Superuser
            </span>
          </div>
          
          <div className={`p-1 border-2 rounded-full transition-colors ${
            isDropdownOpen ? "border-[#2A4150]" : "border-[#e0e0e0] group-hover:border-[#2A4150]"
          }`}>
            <div className="h-8 w-8 bg-[#2A4150] rounded-full flex items-center justify-center text-white">
              <User size={18} />
            </div>
          </div>
          
        </button>

        {/* --- DROPDOWN MENU --- */}
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in duration-200 origin-top-right">
            <div className="px-4 py-2 border-b border-slate-100 mb-1 sm:hidden">
              <p className="text-sm font-bold text-[#2A4150]">Alex Admin</p>
              <p className="text-[10px] text-slate-500">Superuser</p>
            </div>

            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#2A4150] transition-colors">
              <UserCircle size={16} />
              My Profile
            </button>
            
            <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-[#2A4150] transition-colors">
              <Settings size={16} />
              Settings
            </button>

            <div className="h-px bg-slate-100 my-1" />

            <button 
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
              onClick={() => console.log("Logging out...")}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}