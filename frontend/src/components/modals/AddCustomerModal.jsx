"use client";

import { X } from "lucide-react";
import AddCustomerForm from "../forms/AddCustomerForm";

export default function AddCustomerModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-white rounded-4xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        <div className="bg-[#2A4150] px-8 py-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-white">Add Customer</h2>
            <p className="text-xs text-slate-300 mt-0.5">Register a new customer to the system</p>
          </div>

          <button 
            onClick={onClose}
            className="p-2 hover:bg-white rounded-full shadow-sm transition-all text-slate-400 hover:text-slate-600"
          >
            <X size={20} />
          </button>
        </div>

        <div className="overflow-y-auto p-8 custom-scrollbar">
          <AddCustomerForm
            title="" // Header modal mein de diya hai
            submitText="Create Customer"
            onSuccess={onClose}
            onCancel={onClose}
          />
        </div>
      </div>
    </div>
  );
}