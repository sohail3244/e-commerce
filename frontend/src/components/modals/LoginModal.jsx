"use client";

import Login from "@/app/(auth)/login/page";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const handleLoginSuccess = () => {
    if (onLoginSuccess) onLoginSuccess();
    onClose(); // modal close
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-9999 grid place-items-center p-4">

      <div className="relative w-full max-w-md bg-white rounded-2xl overflow-hidden">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-slate-500 hover:text-black text-xl"
        >
          ✕
        </button>

        <Login
          title="Login"
          onSuccess={handleLoginSuccess}
        />

      </div>

    </div>
  );
}