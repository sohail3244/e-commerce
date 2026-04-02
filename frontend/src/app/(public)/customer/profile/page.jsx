"use client";

import { useState } from "react";
import { 
  User, Mail, Phone, ArrowLeft, 
  Camera, ShieldCheck, MapPin, 
  LogOut, Settings, Bell, CreditCard, 
  ShoppingBag, Lock, ShieldAlert 
} from "lucide-react";
import { useRouter } from "next/navigation";

import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import AuthGuard from "@/components/common/AuthGuard";

export default function ProfilePage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "Faisal Khan",
    email: "faisal@email.com",
    phone: "9876543210",
    location: "Jaipur, India",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const getInitials = (name) => {
    return name.split(" ").map((word) => word[0]).join("").toUpperCase();
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.replace("/login");
  };

  return (
    <AuthGuard>
      <div className="min-h-screen bg-[#F8FAFC] pb-20">
        
        {/* --- TOP NAVBAR --- */}
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 px-6 py-4">
          <div className="w-full  mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.back()}
                className="p-2.5 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all border border-slate-100"
              >
                <ArrowLeft size={18} />
              </button>
              <div>
                <h1 className="text-lg font-bold text-slate-900 leading-tight">Account Settings</h1>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.15em]">Personal Dashboard</p>
              </div>
            </div>
            
          </div>
        </header>

        <main className="w-full mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* --- LEFT SIDEBAR (Sticky) --- */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="h-24 bg-[#2A4150]"></div>
                <div className="px-8 pb-8 -mt-12 text-center">
                  <div className="relative inline-block group">
                    <div className="w-24 h-24 rounded-3xl bg-white p-1.5 shadow-xl">
                      <div className="w-full h-full rounded-[1.2rem] bg-[#2A4150] text-white flex items-center justify-center text-2xl font-bold shadow-inner">
                        {getInitials(form.name)}
                      </div>
                    </div>
                    
                  </div>

                  <div className="mt-4">
                    <h2 className="text-xl font-bold text-slate-800 capitalize">{form.name}</h2>
                    <p className="text-sm text-slate-400 flex items-center justify-center gap-1 mt-1 font-medium">
                      <MapPin size={14} className="text-slate-300" /> {form.location}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100/50">
                     <ShieldCheck size={14} /> Verified Member
                  </div>

                  <div className="mt-8 pt-6 border-t border-slate-50 grid grid-cols-2 gap-4">
                     <div className="flex flex-col items-center gap-1">
                        <ShoppingBag size={18} className="text-[#2A4150]" />
                        <span className="text-lg font-black text-slate-800">12</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Orders</span>
                     </div>
                     <div className="flex flex-col items-center gap-1 border-l border-slate-50">
                        <CreditCard size={18} className="text-[#2A4150]" />
                        <span className="text-lg font-black text-slate-800">₹0.0</span>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Wallet</span>
                     </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 p-4 text-slate-400 font-bold text-[11px] bg-white rounded-2xl hover:text-red-500 hover:bg-red-50/50 transition-all border border-slate-100 hover:border-red-100 uppercase tracking-widest"
              >
                <LogOut size={16} /> Sign Out from Account
              </button>
            </aside>

            {/* --- RIGHT CONTENT AREA --- */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* PROFILE INFORMATION FORM */}
              <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-10">
                <div className="mb-10">
                  <h2 className="text-xl font-bold text-slate-800">Personal Information</h2>
                  <p className="text-sm text-slate-400 mt-1">Manage your account identity and contact details.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {[
                    { label: "Full Name", name: "name", icon: User, type: "text" },
                    { label: "Email Address", name: "email", icon: Mail, type: "email" },
                    { label: "Phone Number", name: "phone", icon: Phone, type: "tel" },
                    { label: "Current Location", name: "location", icon: MapPin, type: "text" }
                  ].map((field) => (
                    <div key={field.name} className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
                        {field.label}
                      </label>
                      <InputField
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        icon={field.icon}
                        className="h-12 rounded-2xl border-slate-100 bg-slate-50/30 focus:bg-white focus:border-[#2A4150] transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex items-center justify-end gap-4 border-t border-slate-50 pt-8">
                  <button className="px-6 py-2 text-[11px] font-bold text-slate-400 hover:text-slate-600 transition-colors uppercase tracking-widest">
                    Discard Changes
                  </button>
                  <Button 
                    text="Save Profile" 
                    className="px-10 py-4 bg-[#2A4150] text-white rounded-2xl font-bold shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20 transition-all active:scale-95"
                  />
                </div>
              </section>
              
              {/* PASSWORD CHANGE SECTION */}
              <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-4 mb-10">
                    <div className="p-3 bg-blue-50 rounded-2xl text-[#2A4150]">
                      <ShieldAlert size={24} />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-slate-800">Security & Password</h2>
                      <p className="text-sm text-slate-400 mt-0.5">Regularly updating your password enhances account safety.</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
                        Current Password
                      </label>
                      <InputField
                        type="password"
                        placeholder="••••••••"
                        icon={Lock}
                        className="h-12 rounded-2xl border-slate-100 bg-slate-50/30 focus:bg-white focus:border-[#2A4150]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
                        New Password
                      </label>
                      <InputField
                        type="password"
                        placeholder="At least 8 characters"
                        icon={Lock}
                        className="h-12 rounded-2xl border-slate-100 bg-slate-50/30 focus:bg-white focus:border-[#2A4150]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em] ml-1">
                        Confirm New Password
                      </label>
                      <InputField
                        type="password"
                        placeholder="Re-type new password"
                        icon={Lock}
                        className="h-12 rounded-2xl border-slate-100 bg-slate-50/30 focus:bg-white focus:border-[#2A4150]"
                      />
                    </div>
                  </div>

                  <div className="mt-12 flex items-center justify-between border-t border-slate-50 pt-8">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Security Level: <span className="text-emerald-500">High</span>
                    </p>
                    <Button 
                      text="Update Password" 
                      className="px-8 py-4 bg-[#2A4150] text-white rounded-2xl font-bold shadow-lg shadow-blue-900/10 hover:shadow-blue-900/20 transition-all active:scale-95"
                    />
                  </div>
                </div>
                
                
              </section>

            </div>
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}