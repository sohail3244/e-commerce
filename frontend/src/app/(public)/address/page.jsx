"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, removeAddress, selectAddress } from "@/store/addressSlice";
import AddressForm from "@/components/forms/AddressForm";
import Button from "@/components/ui/Button";
import toast from "react-hot-toast";
import { MapPin, Plus, Trash2, CheckCircle2, Home } from "lucide-react";

export default function AddressPage() {
  const dispatch = useDispatch();
  const [showForm, setShowForm] = useState(false); // ✅ Form toggle logic
  const { addresses, selectedAddressId } = useSelector((state) => state.address);

  const [formData, setFormData] = useState({
    pincode: "",
    city: "",
    state: "",
    address: "",
  });

  const handleSave = () => {
    if (!formData.pincode || !formData.city || !formData.state || !formData.address) {
      toast.error("Please fill all fields");
      return;
    }

    dispatch(addAddress({ ...formData, id: Date.now() }));
    toast.success("Address Saved ✅");
    setFormData({ pincode: "", city: "", state: "", address: "" });
    setShowForm(false); // Form close after save
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto min-h-screen bg-slate-50/30">
      
      {/* 🚀 HEADER SECTION */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
            <Home className="text-[#2A4150]" /> My Addresses
          </h1>
          <p className="text-sm text-slate-500">Manage your delivery locations</p>
        </div>
        
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-[#2A4150] text-white px-4 py-2 rounded-lg font-bold text-sm hover:bg-[#1a2a35] transition-all shadow-md"
          >
            <Plus size={18} /> Add New
          </button>
        )}
      </div>

      {/* 📝 ANIMATED FORM SECTION */}
      {showForm && (
        <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 shadow-xl mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-slate-800">Enter Address Details</h2>
            <button onClick={() => setShowForm(false)} className="text-xs text-slate-400 hover:text-red-500 font-bold uppercase tracking-wider">Cancel</button>
          </div>
          
          <AddressForm value={formData} onChange={setFormData} />

          <div className="flex gap-3 mt-6">
            <Button text="Save Address" onClick={handleSave} className="flex-1 py-3" />
          </div>
        </div>
      )}

      {/* 📦 SAVED ADDRESSES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {addresses.length === 0 && !showForm && (
          <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <MapPin className="mx-auto text-slate-300 mb-3" size={48} />
            <p className="text-slate-500 font-medium">No saved addresses found</p>
            <button onClick={() => setShowForm(true)} className="text-[#2A4150] font-bold mt-2 hover:underline">Add your first address</button>
          </div>
        )}

        {addresses.map((addr) => {
          const isSelected = selectedAddressId === addr.id;
          return (
            <div
              key={addr.id}
              onClick={() => dispatch(selectAddress(addr.id))}
              className={`relative group p-5 cursor-pointer transition-all duration-200 rounded-2xl border-2 ${
                isSelected 
                ? "border-[#2A4150] bg-[#2A4150]/5 ring-4 ring-[#2A4150]/5" 
                : "border-white bg-white hover:border-slate-200 shadow-sm"
              }`}
            >
              {/* Selected Badge */}
              {isSelected && (
                <CheckCircle2 className="absolute top-4 right-4 text-[#2A4150]" size={20} />
              )}

              <div className="flex flex-col h-full">
                <span className={`text-[10px] font-black uppercase tracking-widest mb-2 ${isSelected ? 'text-[#2A4150]' : 'text-slate-400'}`}>
                  Shipping Address
                </span>
                
                <p className="font-bold text-slate-800 text-lg leading-tight mb-2 pr-6">
                  {addr.address}
                </p>
                
                <p className="text-slate-500 text-sm mb-4">
                  {addr.city}, {addr.state} - <span className="font-mono">{addr.pincode}</span>
                </p>

                <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className={`text-xs font-bold ${isSelected ? 'text-[#2A4150]' : 'text-slate-400'}`}>
                    {isSelected ? 'Default Selection' : 'Click to select'}
                  </span>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevents selection when clicking delete
                      dispatch(removeAddress(addr.id));
                      toast.success("Address Removed");
                    }}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}