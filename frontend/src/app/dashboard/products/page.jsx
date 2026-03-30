'use client';

import AddProductModal from '@/components/modals/AddProductModal';
import ProductsTable from '@/components/table/ProductsTable'
import Button from '@/components/ui/Button'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'

export default function Products() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 w-full bg-white min-h-screen">
      
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#2A4150] capitalize">
            Products
          </h1>
          <p className="text-sm md:text-base text-slate-500">
            Manage your inventory, pricing, and product details.
          </p>
        </div>
        
        <div className="w-full sm:w-auto">
          <Button 
            onClick={() => setOpen(true)}
            text="Add Product" 
            icon={<Plus size={18} />} 
            className="w-full sm:w-auto flex justify-center items-center gap-2"
          />
        </div>
      </header>

      <section className="mt-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full scrollbar-hide">
          <div className="inline-block min-w-full align-middle">
            <ProductsTable />
          </div>
        </div>
      </section>
       <AddProductModal
        open={open}
        onClose={() => setOpen(false)}
      />
    </div>
  )
}