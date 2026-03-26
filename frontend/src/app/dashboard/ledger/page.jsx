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
    <div className="flex flex-col gap-4 p-6 w-full ">
      {/* Header Section */}
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900"> Ledger</h1>
        <p className="text-muted-foreground">Monitor your revenue, orders, and inventory performance.</p>
      </header>

      {/* Stats Grid */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Table Section */}
      <section className="rounded-xl  bg-card text-card-foreground shadow-sm">
        
          
          <LedgerTable data={ledgerData} />
      </section>
    </div>
  )
}