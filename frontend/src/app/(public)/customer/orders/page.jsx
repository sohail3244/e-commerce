"use client";

import { useRouter } from "next/navigation";
import {
  Package,
  Calendar,
  ChevronRight,
  CheckCircle2,
  Clock,
  XCircle,
  ArrowLeft,
  Search,
  Filter,
  Bell,
  Settings,
} from "lucide-react";
import Button from "@/components/ui/Button";

export default function OrdersPage() {
  const router = useRouter();

  const orders = [
    {
      id: "ORD-882190",
      date: "10 Mar 2024",
      total: 1200,
      status: "Delivered",
      items: [
        { name: "Face Wash", image: "https://images.unsplash.com/photo-1597354984706-fac992d9306f?q=80&w=688&auto=format&fit=crop" },
        { name: "Shampoo", image: "https://img.freepik.com/premium-photo/hair-care-products-isolated-white-background_621955-41132.jpg" },
      ],
    },
    {
      id: "ORD-882191",
      date: "12 Mar 2024",
      total: 800,
      status: "Pending",
      items: [{ name: "Moisturizer", image: "https://img.freepik.com/premium-photo/hair-care-products-isolated-white-background_621955-41132.jpg" }],
    },
  ];

  const getStatusConfig = (status) => {
    switch (status) {
      case "Delivered":
        return {
          style: "text-emerald-600 bg-emerald-50 border-emerald-100",
          icon: <CheckCircle2 size={12} />,
        };
      case "Pending":
        return {
          style: "text-amber-600 bg-amber-50 border-amber-100",
          icon: <Clock size={12} />,
        };
      case "Cancelled":
        return {
          style: "text-red-600 bg-red-50 border-red-100",
          icon: <XCircle size={12} />,
        };
      default:
        return {
          style: "text-slate-500 bg-slate-50 border-slate-100",
          icon: <Package size={12} />,
        };
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20">
      {/* --- TOP NAVBAR (Synced with Profile Page) --- */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30  px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all border border-slate-100"
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-lg font-bold text-slate-900 leading-tight">
                My Orders
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">
                Purchase History
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* --- CONTENT AREA --- */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid gap-8">
          {orders.map((order) => {
            const config = getStatusConfig(order.status);
            return (
              <div
                key={order.id}
                className="group bg-white rounded-[2.5rem] border border-gray-200 shadow-sm hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 overflow-hidden"
              >
                {/* CARD TOP INFO */}
                <div className="p-6 md:p-8 flex flex-wrap justify-between items-center bg-[#e0e0e0] border-b border-slate-100">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        Date Placed
                      </p>
                      <div className="flex items-center gap-2 text-slate-700 font-bold">
                        <Calendar size={16} className="text-slate-400" />
                        <span className="text-sm">{order.date}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        Order ID
                      </p>
                      <p className="text-sm text-slate-700 font-bold">
                        #{order.id}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`flex items-center  gap-2 px-4 py-2 rounded-2xl text-[11px] font-black uppercase tracking-wider border shadow-sm mt-4 sm:mt-0 ${config.style}`}
                  >
                    {config.icon}
                    {order.status}
                  </div>
                </div>

                {/* CARD CENTER - ITEMS LIST */}
                <div className="p-8 ">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                    <div className="flex-1 flex flex-wrap gap-6">
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 bg-[#e0e0e0] pr-6 rounded-3xl border border-slate-100 hover:border-[#2A4150]/20 transition-colors"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded-3xl border-4 border-white shadow-sm object-cover"
                          />
                          <div>
                            <h4 className="text-sm font-bold text-slate-800">
                              {item.name}
                            </h4>
                            <p className="text-xs text-slate-400 font-bold">
                              Qty: 1
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="lg:text-right border-t lg:border-t-0 pt-6 lg:pt-0 border-slate-100">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                        Total Bill
                      </p>
                      <p className="text-3xl font-black text-[#2A4150]">
                        ₹{order.total.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* CARD BOTTOM - ACTIONS */}
                  <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100 pt-8">
                    <div className="flex items-center gap-6">
                      <button className="text-[11px] font-bold text-slate-400 hover:text-[#2A4150] transition-colors uppercase tracking-widest">
                        Invoice PDF
                      </button>
                      <button className="text-[11px] font-bold text-slate-400 hover:text-red-500 transition-colors uppercase tracking-widest">
                        Cancel Order
                      </button>
                    </div>

                    <button
                      onClick={() =>
                        router.push(`/customer/orders/${order.id}`)
                      }
                      className="group/btn flex items-center justify-center gap-3 bg-[#2A4150] text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20 transition-all duration-300 w-full sm:w-auto active:scale-95"
                    >
                      Track My Package
                      <ChevronRight
                        size={18}
                        className="group-hover/btn:translate-x-1 transition-transform"
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}
