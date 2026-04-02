"use client";

import React from "react";
import { useForm } from "react-hook-form";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import AddressForm from "@/components/forms/AddressForm";
import { User, Mail, Phone, UserCircle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSignup } from "@/lib/mutations/useAuth";

export default function SignUp({ mobile }) {
  const router = useRouter();
  const { mutate, isLoading } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      phone: mobile,
    },
  });

  const onSubmit = (data) => {
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      location: `${data.address}, ${data.city}, ${data.state} - ${data.pincode}`,
    };

    mutate(payload, {
      onSuccess: (res) => {
        toast.success("Signup Successful ");
        router.push("/login");
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || "Signup failed ❌");
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-slate-50/50">
      <div className="max-w-2xl w-full bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-slate-100">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-slate-500 hover:text-[#2A4150]"
        >
          <ArrowLeft size={18} /> Back
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 mb-10">
          <div className="bg-[#2A4150] p-3 rounded-2xl text-white">
            <UserCircle size={28} />
          </div>
          <h2 className="text-2xl md:text-3xl font-black">Sign Up</h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name + Email */}
          <div className="grid md:grid-cols-2 gap-6">
            <InputField
              label="Full Name"
              icon={User}
              {...register("name", {
                required: "Full name is required",
                minLength: { value: 3, message: "Name too short" },
              })}
              error={errors.name?.message}
            />

            <InputField
              label="Email"
              type="email"
              icon={Mail}
              {...register("email", {
                required: "Email is required",
              })}
              error={errors.email?.message}
            />
          </div>

          {/* Phone */}
          <InputField
            label="Mobile Number"
            icon={Phone}
            {...register("phone", { required: "Phone is required" })}
            error={errors.phone?.message}
          />

          {/* Password */}
          <InputField
            label="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 8, message: "Min 8 characters" },
            })}
            error={errors.password?.message}
          />

          {/* Address */}
          <div className="p-6 bg-slate-50 rounded-2xl">
            <h3 className="text-xs font-bold mb-4 text-slate-400">
              SECURE DELIVERY ADDRESS
            </h3>

            <AddressForm register={register} errors={errors} />
          </div>

          {/* Submit */}
          <Button
            text={isLoading ? "Signing up..." : "Sign Up"}
            type="submit"
            disabled={isLoading}
          />
        </form>
      </div>
    </div>
  );
}
