"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Calendar, Package, Truck, 
  MapPin, CreditCard, ShieldCheck, 
  Download, HelpCircle, ChevronRight,
  CheckCircle2, Clock
} from "lucide-react";

export default function OrderDetailsPage({ params }) {
  const router = useRouter();
  
  // Next.js 15+ Fix
  const { id: orderId } = React.use(params);

  const orderData = {
    id: orderId,
    date: "10 Mar 2024",
    status: "In Transit",
    total: 1200,
    shippingAddress: "Plot No. 45, Sector 3, Mansarovar, Jaipur, Rajasthan - 302020",
    paymentMethod: "UPI (PhonePe)",
    items: [
      { name: "Face Wash", price: 500, qty: 1, image: "https://via.placeholder.com/150" },
      { name: "Shampoo", price: 700, qty: 1, image: "https://via.placeholder.com/150" },
    ],
    tracking: [
      { label: "Order Placed", date: "10 Mar, 10:00 AM", completed: true },
      { label: "Packed", date: "10 Mar, 02:30 PM", completed: true },
      { label: "Shipped", date: "11 Mar, 09:00 AM", completed: true },
      { label: "Out for Delivery", date: "Pending", completed: false },
    ]
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-20 font-sans">
      
      {/* --- TOP NAVBAR (Exactly Synced with Orders/Profile Page) --- */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
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
                Order Details
              </h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">
                Reference: {orderId}
              </p>
            </div>
          </div>
          {/* Action Button styled like your existing project */}
          <button className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-[#2A4150] text-white rounded-xl text-xs font-bold hover:bg-[#1e2f3a] transition-all shadow-lg shadow-blue-900/10">
            <Download size={14} /> Download Invoice
          </button>
        </div>
      </header>

      {/* --- CONTENT AREA (max-w-7xl to match header) --- */}
      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        
        {/* --- TRACKING TIMELINE --- */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 shadow-sm">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-10 flex items-center gap-2">
            <Truck size={14} className="text-[#2A4150]" /> Live Tracking Progress
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative px-2">
            {orderData.tracking.map((step, index) => (
              <div key={index} className="flex md:flex-col items-center gap-4 md:text-center flex-1 relative group">
                {/* Line Connector */}
                {index !== orderData.tracking.length - 1 && (
                  <div className="hidden md:block absolute top-5 left-1/2 w-full h-0.5 bg-slate-100 z-0">
                    <div className={`h-full bg-[#2A4150] transition-all duration-700 ${step.completed ? 'w-full' : 'w-0'}`}></div>
                  </div>
                )}
                
                {/* Step Circle */}
                <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-md transition-all duration-500 ${step.completed ? 'bg-[#2A4150] text-white' : 'bg-slate-100 text-slate-400'}`}>
                  {step.completed ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                </div>
                
                <div className="space-y-1">
                  <p className={`text-[11px] font-black uppercase tracking-wider ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>
                    {step.label}
                  </p>
                  <p className="text-[10px] text-slate-400 font-bold">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* --- LEFT COLUMN: ITEMS & BILLING --- */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* ITEMS LIST */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 shadow-sm">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Order Items</h2>
              <div className="space-y-6">
                {orderData.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between group p-3 hover:bg-slate-50/50 rounded-3xl transition-all border border-transparent hover:border-slate-100">
                    <div className="flex items-center gap-5">
                      <div className="w-20 h-20 bg-slate-100 rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-slate-800">{item.name}</h3>
                        <p className="text-[10px] text-[#2A4150] font-black uppercase opacity-60 mt-1">Qty: {item.qty}</p>
                      </div>
                    </div>
                    <p className="text-sm font-black text-[#2A4150]">₹{item.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* BILLING SUMMARY */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 shadow-sm">
              <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Billing Summary</h2>
              <div className="space-y-4 px-2">
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-slate-900">₹{(orderData.total - 100).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-emerald-600 font-black">FREE</span>
                </div>
                <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-widest">
                  <span>Taxes</span>
                  <span className="text-slate-900">₹100</span>
                </div>
                <div className="pt-6 mt-6 border-t border-slate-100 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Bill</p>
                    <p className="text-xs text-slate-400 font-bold">via {orderData.paymentMethod}</p>
                  </div>
                  <p className="text-4xl font-black text-[#2A4150] tracking-tighter">
                    ₹{orderData.total.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: SHIPPING INFO --- */}
          <div className="space-y-6">
            
            {/* SHIPPING ADDRESS */}
            <div className="bg-[#2A4150] rounded-[2.5rem] p-8 shadow-2xl shadow-blue-900/20 text-white relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    <MapPin className="text-white/40" size={18} />
                    <h2 className="text-[10px] font-black uppercase tracking-widest text-white/60">Delivery Address</h2>
                </div>
                <p className="text-sm font-bold leading-relaxed">{orderData.shippingAddress}</p>
              </div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            </div>

            {/* STATUS CARD */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200/60 p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck className="text-emerald-500" size={20} />
                <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Order Security</h2>
              </div>
              <p className="text-xs font-bold text-slate-500 leading-relaxed mb-6">
                This order is protected by our buyer safety policy.
              </p>
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-center">
                 <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Status: Fully Paid</p>
              </div>
            </div>

            {/* HELP ACTION */}
            <button className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 transition-all rounded-4xl border border-slate-200/60 group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:rotate-6 transition-transform">
                    <HelpCircle size={18} className="text-[#2A4150]" />
                </div>
                <div className="text-left">
                    <p className="text-xs font-black text-slate-900 leading-tight uppercase tracking-wide">Support</p>
                    <p className="text-[10px] text-slate-400 font-bold">Need help with order?</p>
                </div>
              </div>
              <ChevronRight size={18} className="text-slate-300 group-hover:translate-x-1 transition-transform" />
            </button>
            
          </div>
        </div>
      </main>
    </div>
  );
}