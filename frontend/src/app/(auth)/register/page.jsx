"use client";

import React from "react";
import { useForm } from "react-hook-form";
import InputField from "@/components/ui/InputField";
import SelectField from "@/components/ui/SelectField";
import Button from "@/components/ui/Button";
import AddressForm from "@/components/forms/AddressForm";
import {
  User,
  Mail,
  Phone,
  Calendar,
  UserCircle,
  ArrowLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Register({ mobile }) {
  const router = useRouter(); // ✅ correct place

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      mobile: mobile,
    },
  });

  const onSubmit = async (data) => {
    console.log("Registering User:", data);

    // ✅ future: API call yaha karega
    // await fetch("/api/register", { method: "POST", body: JSON.stringify(data) })

    // ✅ success ke baad redirect
    router.push("/login");
  };

  const genderOptions = [
    { label: "Select Gender", value: "" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ];

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-50/50">
      <div className="max-w-2xl w-full bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-slate-100 relative">
        
        {/* ✅ Back Button */}
        <button
          onClick={() => router.back()}
          className="group mb-6 flex items-center gap-2 text-slate-500 hover:text-[#2A4150] transition-colors text-sm font-semibold"
        >
          <div className="p-1.5 rounded-full group-hover:bg-slate-100 transition-colors">
            <ArrowLeft size={18} />
          </div>
          Back 
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-[#2A4150] p-3 rounded-2xl text-white shadow-lg shadow-blue-900/20">
            <UserCircle size={28} />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">
              Create Account
            </h2>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              icon={User}
              placeholder="Enter your name"
              {...register("name", {
                required: "Full name is required",
                minLength: { value: 3, message: "Name too short" },
              })}
              error={errors.name?.message}
            />

            <InputField
              label="Email Address"
              type="email"
              icon={Mail}
              placeholder="example@mail.com"
              {...register("email", {
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={errors.email?.message}
            />
          </div>

          {/* Mobile + DOB */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              type="tel"
              label="Mobile Number"
              icon={Phone}
              readOnly
              className="bg-slate-50 font-mono text-slate-500"
              {...register("mobile")}
            />

            <InputField
              label="Date of Birth"
              type="date"
              icon={Calendar}
              {...register("dob", {
                required: "Date of birth is required",
              })}
              error={errors.dob?.message}
            />
          </div>

          {/* Gender */}
          <SelectField
            label="Gender"
            options={genderOptions}
            {...register("gender", {
              required: "Selection required",
            })}
            error={errors.gender?.message}
          />

          {/* Address */}
          <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-200/60">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-5">
              Secure Delivery Address
            </h3>
            <AddressForm register={register} errors={errors} />
          </div>

          {/* Submit */}
          <div className="pt-6">
            <Button
              text={isSubmitting ? "Processing..." : "Create My Profile"}
              type="submit"
              className="w-full py-4 text-lg font-bold shadow-xl shadow-blue-900/20"
              disabled={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}