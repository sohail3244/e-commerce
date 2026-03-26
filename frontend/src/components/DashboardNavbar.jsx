"use client";

import { Bell, Search, User, ChevronDown } from "lucide-react";

export default function DashboardNavbar() {
  return (
    <header className="h-16 bg-white border-b border-[#e0e0e0] flex items-center  justify-end px-6 sticky top-0 z-10">
      <div className="flex items-center gap-5">
        <button className="flex items-center gap-3 pl-2 group">
          <div className="flex-col items-end hidden sm:flex">
            <span className="text-sm font-bold text-[#2A4150]">Alex Admin</span>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider">
              Superuser
            </span>
          </div>
          <div className="p-1 border-2 border-[#e0e0e0] rounded-full group-hover:border-[#2A4150] transition-colors">
            <div className="h-8 w-8 bg-[#2A4150] rounded-full flex items-center justify-center text-white">
              <User size={18} />
            </div>
          </div>
          <ChevronDown size={14} className="text-slate-400" />
        </button>
      </div>
    </header>
  );
}
