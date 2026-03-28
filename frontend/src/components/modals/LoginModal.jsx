"use client";

import Login from "@/app/(auth)/login/page";

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  if (!isOpen) return null;

  const handleLoginSuccess = () => {
    if (onLoginSuccess) onLoginSuccess();
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-9999 grid place-items-center p-4 backdrop-blur-sm">
      {/* Container with overflow-hidden to clip the inner component's corners */}
      <div className="relative w-full max-w-112.5 bg-white rounded-4xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Close Button - Positioned absolutely inside the modal */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-50 p-2 text-slate-400 hover:text-black transition-colors rounded-full hover:bg-slate-100"
        >
          ✕
        </button>

        {/* Form Content - Scrolling enabled for small screens */}
        <div className="overflow-y-auto w-full">
          <Login
            title="Login"
            onSuccess={handleLoginSuccess}
            isModal={true} // CRITICAL: This prevents the double-card look
          />
        </div>
      </div>
    </div>
  );
}