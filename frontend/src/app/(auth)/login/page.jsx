"use client";

import { useState } from "react";
import { dummyUsers } from "@/lib/DummyData";
import { ChevronLeft, ShieldCheck, Smartphone } from "lucide-react";
import InputField from "@/components/ui/InputField";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@/store/authSlice";
import toast from "react-hot-toast";

export default function Login({ title, onSuccess }) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSendOtp = () => {
    setError("");
    if (mobile.length !== 10) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const user = dummyUsers.find((u) => u.mobile === mobile);
      if (user) setStep(2);
      else setError("User not found. Please check the number.");
      setLoading(false);
    }, 800);
  };

  const handleVerifyOtp = () => {
  setError("");

  if (otp.length !== 4) {
    toast.error("Enter valid 4-digit OTP ❌");
    return;
  }

  const user = dummyUsers.find(
    (u) => u.mobile === mobile && u.otp === otp
  );

  if (user) {
    dispatch(loginSuccess(user));

    // ✅ success toast
    toast.success("Login Successful");

    if (onSuccess) onSuccess(user);

  } else {
    toast.error("Invalid OTP");
  }
};

  return (
    <div className="w-full bg-white rounded-2xl overflow-hidden">
      {/* Progress Header - Updated Text Color */}
      <div className="bg-slate-50 px-6 py-4 flex items-center border-b border-slate-100">
        {step === 2 && (
          <button
            onClick={() => setStep(1)}
            className="mr-4 hover:bg-slate-200 p-1 rounded-full transition-colors"
          >
            <ChevronLeft size={20} className="text-slate-600" />
          </button>
        )}
        <h2 className="text-lg font-bold text-[#2A4150]">
          {step === 1 ? title || "Login" : "Verify Details"}
        </h2>
      </div>

      <div className="p-8">
        {/* Visual Icon - Updated to match theme palette */}
        <div className="flex justify-center mb-6">
          <div className="bg-[#2A4150]/10 p-4 rounded-full text-[#2A4150]">
            {step === 1 ? <Smartphone size={32} /> : <ShieldCheck size={32} />}
          </div>
        </div>

        <div className="text-center mb-8">
          <p className="text-slate-500 text-sm">
            {step === 1
              ? "Enter your mobile number to get started with your organic journey."
              : `We've sent a 4-digit code to +91 ${mobile}`}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs font-medium">
            {error}
          </div>
        )}

        {step === 1 ? (
          <div className="space-y-6">
            <div className="relative group">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-sm border-r pr-3 z-10">
                +91
              </span>
              <InputField
                inputMode="numeric"
                type="tel"
                maxLength={10}
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                className="w-full pl-16 pr-4 py-3 border border-slate-200 rounded-xl outline-none text-sm font-semibold focus:border-[#2A4150] transition-all"
              />
            </div>

            <Button
              text={loading ? "" : "CONTINUE"}
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full font-bold py-3.5 rounded-xl shadow-lg shadow-slate-200 flex justify-center items-center"
              icon={
                loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : null
              }
            />
            <div className="flex justify-between text-xs text-slate-500 pt-2">
              <span className="cursor-pointer hover:text-[#2A4150] font-semibold">
                Forgot Password?
              </span>

              <span>
                <Link href="/register">New User? Register</Link>
              </span>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <InputField
              type="text"
              placeholder="Enter 4-Digit OTP"
              value={otp}
              maxLength={4}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-center text-xl tracking-[1em] font-bold outline-none focus:border-[#2A4150] transition-all"
            />

            <Button
              text="VERIFY & LOGIN"
              onClick={handleVerifyOtp}
              variant="primary" // Automatically uses #2A4150 from Button component
              className="w-full font-bold py-3.5 rounded-xl shadow-lg shadow-slate-200"
            />

            <p className="text-center text-xs text-slate-400">
              Didn't receive the code?{" "}
              <span className="text-[#2A4150] cursor-pointer font-bold hover:underline">
                Resend OTP
              </span>
            </p>
          </div>
        )}

        <p className="mt-8 text-[10px] text-center text-slate-400 px-4">
          By continuing, you agree to Mamaearth's{" "}
          <span className="underline cursor-pointer hover:text-[#2A4150]">
            Terms
          </span>{" "}
          and{" "}
          <span className="underline cursor-pointer hover:text-[#2A4150]">
            Privacy Policy
          </span>
          .
        </p>
      </div>
    </div>
  );
}
