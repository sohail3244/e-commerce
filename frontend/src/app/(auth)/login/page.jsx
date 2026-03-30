"use client";

import { useState } from "react";
import { Smartphone } from "lucide-react";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { closeLogin, setUser } from "@/store/slices/authSlice";
import toast from "react-hot-toast";
import { useLogin } from "@/lib/mutations/useLogin";
import { useRouter } from "next/navigation";

export default function Login({ title, onSuccess, isModal = false }) {
  const { mutate, isLoading } = useLogin();
  const dispatch = useDispatch();
  const router = useRouter();

  const [error, setError] = useState("");
  const [form, setForm] = useState({ email: "", password: "" });

  const handleLogin = () => {
    setError("");
    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    mutate(form, {
      onSuccess: (res) => {
        const user = res?.data?.data?.user;
        dispatch(setUser(user));
        localStorage.setItem("user", JSON.stringify(user));
        toast.success("Login Successful!");
        if (onSuccess) onSuccess();
        dispatch(closeLogin());
        if (user?.role?.toLowerCase?.() === "admin") {
          router.push("/dashboard");
        } else {
          router.push("/");
        }
      },
      onError: (err) => {
        setError(err?.response?.data?.message || "Invalid credentials");
      },
    });
  };

  return (
    <div
      className={`w-full ${!isModal ? "max-w-md mx-auto my-10 border border-slate-200 rounded-3xl shadow-lg" : ""} bg-white`}
    >
      {/* Header Section */}
      <div className="bg-red-50/50 px-8 py-8 border-b border-slate-100">
        <h2 className="text-2xl font-bold text-[#2A4150]">
          {title || "Login"}
        </h2>
        <p className="text-slate-500 text-sm mt-1">Please enter your details</p>
      </div>

      <div className="p-8 sm:p-10">
        {/* Branding Icon */}
        <div className="flex justify-center mb-8">
          <div className="bg-[#2A4150]/5 p-6 rounded-3xl text-[#2A4150]">
            <Smartphone size={40} />
          </div>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-semibold">
            {error}
          </div>
        )}

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Email Address
            </label>
            <InputField
              type="email"
              placeholder="name@company.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">
              Password
            </label>
            <InputField
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
          </div>

          <Button
            text={isLoading ? "Logging in..." : "LOGIN TO ACCOUNT"}
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full font-bold py-4 rounded-2xl bg-[#2A4150] text-white hover:bg-[#1a2a35] transition-all shadow-xl shadow-blue-900/10"
          />

          <div className="flex justify-between items-center text-xs pt-2">
            <span className="text-slate-400 hover:text-[#2A4150] cursor-pointer transition-colors font-medium">
              Forgot Password?
            </span>
            <Link
              href="/sign-up"
              className="text-[#2A4150] font-bold hover:underline"
              onClick={() => dispatch(closeLogin())}
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
