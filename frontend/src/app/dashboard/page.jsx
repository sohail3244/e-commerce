import StatCard from '@/components/common/StatCard'
import { IndianRupee, ShoppingBag } from 'lucide-react'
import React from 'react'

export default function dashboard() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full bg-white min-h-screen">
      {/* Header Section */}
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#2A4150]">
          Dashboard Overview
        </h1>
        <p className="text-sm md:text-base text-slate-500">
          Track and manage your customer orders and fulfillment status.
        </p>
      </header>
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
      </section>
    </div>
  )
}
