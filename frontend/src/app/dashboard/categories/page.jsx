import CategoriesTable from '@/components/table/CategoriesTable'
import Button from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import React from 'react'

export default function Categories() {
  return (
    // p-4 (mobile) se p-6 (desktop) transition aur min-h-screen for full height
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full bg-white min-h-screen">
      
      {/* Header Section: Mobile par stack hoga (flex-col), Tablet/Laptop par side-by-side (sm:flex-row) */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#2A4150]">
            Categories
          </h1>
          <p className="text-sm text-slate-500">
            Manage your product categories and organization.
          </p>
        </div>
        
        {/* Button: Mobile par full width aur Laptop par auto width */}
        <div className="w-full sm:w-auto">
          <Button 
            text="Add Category" 
            icon={<Plus size={18} />} 
            className="w-full sm:w-auto flex justify-center items-center gap-2"
          />
        </div>
      </header>

      {/* Table Section: Tablet aur Mobile par Horizontal Scroll enable karne ke liye wrapper */}
      <section className="mt-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full scrollbar-hide">
          <div className="inline-block min-w-full align-middle">
            <CategoriesTable />
          </div>
        </div>
      </section>
      
    </div>
  )
}