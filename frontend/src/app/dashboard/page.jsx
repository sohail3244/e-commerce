import StatCard from "@/components/common/StatCard";
import { IndianRupee, ShoppingCart, Box, Users } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className=" bg-gray-00 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2A4150]">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back! Here's what's happening with your store.</p>
      </div>

      {/* Direct StatCards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <StatCard 
          title="Total Revenue" 
          value="₹0.00" 
          icon={IndianRupee} 
          trendValue="-100.0" 
          isUp={false} 
        />

        <StatCard 
          title="Orders" 
          value="2" 
          icon={ShoppingCart} 
          trendValue="-98.0" 
          isUp={false} 
        />

        <StatCard 
          title="Products" 
          value="12" 
          icon={Box} 
          trendValue="-76.0" 
          isUp={false} 
        />

        <StatCard 
          title="Active Users" 
          value="4" 
          icon={Users} 
          trendValue="-98.0" 
          isUp={false} 
        />

      </div>
    </div>
  );
}