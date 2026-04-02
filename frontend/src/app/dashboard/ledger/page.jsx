import React from 'react'
import { IndianRupee, ShoppingBag, Package, Users } from 'lucide-react'
import StatCard from '@/components/common/StatCard'
import LedgerTable from '@/components/table/LedgerTable'

export default function Ledger() {
   const ledgerData = [
    {
      date: "12 Feb 2026",
      orderId: "ORD12345",
      customer: "Rahul Sharma",
      amount: "₹25,000",
      status: "paid",
    },
    {
      date: "13 Feb 2026",
      orderId: "ORD12346",
      customer: "Amit Verma",
      amount: "₹15,000",
      status: "pending",
    },
    {
      date: "14 Feb 2026",
      orderId: "ORD12347",
      customer: "Neha Singh",
      amount: "₹40,000",
      status: "failed",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full bg-white min-h-screen">
      {/* Header Section */}
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#2A4150]">
          Ledger
        </h1>
        <p className="text-sm md:text-base text-slate-500">
          Monitor your revenue, orders, and inventory performance.
        </p>
      </header>

      {/* Stats Grid - Mobile/Tablet par 1, Laptop par 2 cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 w-full max-w-400">
        <StatCard 
          title="Total Revenue" 
          value="₹0.00" 
          icon={IndianRupee} 
          trendValue="-100.0%" 
          isUp={false} 
        />
        <StatCard 
          title="Orders" 
          value="2" 
          icon={ShoppingBag} 
          trendValue="-98.0%" 
          isUp={false} 
        />
        <StatCard 
          title="Products" 
          value="2" 
          icon={Package} 
          trendValue="-98.0%" 
          isUp={false} 
        />
        <StatCard 
          title="Customers" 
          value="2" 
          icon={Users} 
          trendValue="-98.0%" 
          isUp={false} 
        />
      </section>

      {/* Table Section - Tablet aur Mobile dono par scrollable */}
<section className="mt-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
  <div className="p-4 border-b border-slate-100">
    <h2 className="font-semibold text-[#2A4150]">Recent Transactions</h2>
  </div>
  
  {/* 1. overflow-x-auto: Side scroll enable karta hai.
      2. w-full: Container ki poori width leta hai.
  */}
  <div className="overflow-x-auto w-full">
    <div className="inline-block min-w-full align-middle">
      <LedgerTable data={ledgerData} />
    </div>
  </div>
</section>
    </div>
  )
}