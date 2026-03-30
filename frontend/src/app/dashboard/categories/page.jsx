'use client';

import AddCategoryModal from '@/components/modals/AddCategoryModal';
import CategoriesTable from '@/components/table/CategoriesTable'
import Button from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

export default function Categories() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full bg-white min-h-screen">
      
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#2A4150]">
            Categories
          </h1>
          <p className="text-sm text-slate-500">
            Manage your product categories and organization.
          </p>
        </div>
        
        <div className="w-full sm:w-auto">
          <Button 
            text="Add Category" 
            icon={<Plus size={18} />} 
            className="w-full sm:w-auto flex justify-center items-center gap-2"
            onClick={() => setOpen(true)}
          />
        </div>
      </header>

      <section className="mt-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full scrollbar-hide">
          <div className="inline-block min-w-full align-middle">
            <CategoriesTable />
          </div>
        </div>
      </section>

      <AddCategoryModal
        open={open}
        onClose={() => setOpen(false)}
      />
      
    </div>
  )
}