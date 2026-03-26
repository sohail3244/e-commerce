"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Box,
  Layers,
  Notebook,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
    { name: "Ledger", icon: Notebook, path: "/dashboard/ledger" },
    { name: "Categories", icon: Layers, path: "/dashboard/categories" },
    { name: "Customers", icon: Users, path: "/dashboard/customers" },
    { name: "Orders", icon: ShoppingCart, path: "/dashboard/orders" },
    { name: "Products", icon: Box, path: "/dashboard/products" },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-[#e0e0e0] hidden md:flex flex-col sticky top-0">
      <div className="p-6 flex items-center gap-3">
        <span className="text-xl font-bold text-[#2A4150] tracking-tight">
          AdminPanel
        </span>
      </div>

      {/* Navigation */}
      <nav className="mt-4 px-4 flex-1">
        <div className="space-y-1">
          {menu.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                  ${
                    isActive
                      ? "bg-[#2A4150] text-white shadow-lg shadow-[#2A4150]/20"
                      : "text-[#2A4150]/70 hover:bg-[#e0e0e0] hover:text-[#2A4150]"
                  }
                `}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}
