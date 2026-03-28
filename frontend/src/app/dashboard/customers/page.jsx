import StatCard from "@/components/common/StatCard";
import CustomerTable from "@/components/table/CustomerTable";
import { IndianRupee, Users, UserCheck, UserMinus } from "lucide-react";
import React from "react";

export default function Customers() {
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full bg-white min-h-screen">
      {/* Header Section */}
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#2A4150]">
          Customers
        </h1>
        <p className="text-sm md:text-base text-slate-500">
          Manage and monitor your customer database and their activities.
        </p>
      </header>

      {/* Stats Grid - Tablet tak 1 card, Laptop/Desktop par 2 cards */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 max-w-5xl">
        <StatCard
          title="Total Customers"
          value="1,250"
          icon={Users}
          trendValue="+12.5"
          isUp={true}
        />
        <StatCard
          title="Active Now"
          value="42"
          icon={UserCheck}
          trendValue="+5.2"
          isUp={true}
        />
        <StatCard
          title="New This Month"
          value="156"
          icon={Users}
          trendValue="-2.4"
          isUp={false}
        />
        <StatCard
          title="Churn Rate"
          value="1.2%"
          icon={UserMinus}
          trendValue="-0.5"
          isUp={true} // Churn rate kam hona achha hai, isliye true
        />
      </section>

      {/* Table Section - Responsive with Horizontal Scroll */}
      <section className="mt-4 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100">
          <h2 className="font-semibold text-[#2A4150]">All Customers</h2>
        </div>

        {/* Wrapper for Horizontal Scroll on Mobile/Tablet */}
        <div className="overflow-x-auto w-full scrollbar-hide">
          <div className="inline-block min-w-full align-middle">
            <CustomerTable />
          </div>
        </div>
      </section>
    </div>
  );
}