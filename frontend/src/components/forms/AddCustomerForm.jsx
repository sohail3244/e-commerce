"use client";

import { useForm } from "react-hook-form";
import InputField from "../ui/InputField";
import Button from "../ui/Button";
import { User, Mail, Lock, Phone, MapPin, Calendar, CheckCircle } from "lucide-react";

export default function AddCustomerForm({
  title = "",
  submitText = "Add Customer",
  onSuccess,
  onCancel,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      status: "active",
      joinDate: new Date().toISOString().split("T")[0],
    },
  });

  const onSubmit = (data) => {
    console.log("Customer Data:", data);
    onSuccess?.();
    reset();
  };

  return (
    <div className="w-full">
      {title && <h2 className="text-xl font-bold text-slate-800 mb-6">{title}</h2>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        {/* Personal Details Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Full Name"
            placeholder="John Doe"
            icon={User}
            isRequired
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />

          <InputField
            label="Email Address"
            type="email"
            placeholder="john@example.com"
            icon={Mail}
            isRequired
            error={errors.email?.message}
            {...register("email", { required: "Email is required" })}
          />
        </div>

        {/* Contact & Security Group */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Phone Number"
            placeholder="+91 8696258578"
            icon={Phone}
            isRequired
            error={errors.phone?.message}
            {...register("phone", { required: "Phone is required" })}
          />

          <InputField
            label="Account Password"
            type="password"
            placeholder="********"
            icon={Lock}
            isRequired
            error={errors.password?.message}
            {...register("password", { required: "Password is required" })}
          />
        </div>

        <InputField
          label="Residential Location"
          placeholder="Jaipur, India"
          icon={MapPin}
          isRequired
          error={errors.location?.message}
          {...register("location", { required: "Location is required" })}
        />

        {/* Account Settings Group */}
        <div className="bg-slate-50 p-5 rounded-2xl grid grid-cols-1 md:grid-cols-2 gap-5 border border-slate-100">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block items-center gap-2">
              <CheckCircle size={14} /> Account Status
            </label>
            <select
              {...register("status")}
              className="w-full h-11.25 bg-white border border-slate-200 rounded-xl px-4 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all cursor-pointer"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block items-center gap-2">
              <Calendar size={14} /> Registration Date
            </label>
            <input
              type="date"
              {...register("joinDate")}
              className="w-full h-11.25 bg-white border border-slate-200 rounded-xl px-4 text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <Button
            type="button"
            text="Cancel"
            variant="secondary"
            onClick={onCancel || (() => reset())}
            className="px-6 border-none text-slate-500 hover:bg-slate-100"
          />
          <Button 
            type="submit" 
            text={submitText} 
            className="px-8 bg-[#2A4150] hover:bg-[#1a2b36] text-white shadow-xl shadow-blue-900/10"
          />
        </div>
      </form>
    </div>
  );
}