import StatCard from '@/components/common/StatCard'
import OrdersTable from '@/components/table/OrdersTable'
import { IndianRupee, ShoppingBag, Clock, CheckCircle } from 'lucide-react'
import React from 'react'

export default function Orders() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full bg-white min-h-screen">
      {/* Header Section */}
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#2A4150]">
          Orders
        </h1>
        <p className="text-sm md:text-base text-slate-500">
          Track and manage your customer orders and fulfillment status.
        </p>
      </header>

      {/* Stats Grid - Tablet tak 1 card, Laptop/Desktop par 2 cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 w-full max-w-400">
        <StatCard 
          title="Total Orders" 
          value="450" 
          icon={ShoppingBag} 
          trendValue="+5.2%" 
          isUp={true} 
        />
        <StatCard 
          title="Total Revenue" 
          value="₹0.00" 
          icon={IndianRupee} 
          trendValue="-100.0" 
          isUp={false} 
        />
        <StatCard 
          title="Pending Orders" 
          value="12" 
          icon={Clock} 
          trendValue="+2" 
          isUp={false} 
        />
        <StatCard 
          title="Completed" 
          value="438" 
          icon={CheckCircle} 
          trendValue="+15.0%" 
          isUp={true} 
        />
      </section>

      {/* Orders Table Section */}
      <section className="mt-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-[#2A4150]">Order History</h2>
        </div>

        {/* Responsive Wrapper: Tablet aur Mobile par swipe karne ke liye */}
        <div className="overflow-x-auto w-full scrollbar-hide">
          <div className="inline-block min-w-full align-middle">
            <OrdersTable />
          </div>
        </div>
      </section>
    </div>
  )
}